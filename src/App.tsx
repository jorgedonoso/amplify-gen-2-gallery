import { useState } from "react";
import "./App.css";
import { getUrl } from "aws-amplify/storage";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import type { Schema } from "../amplify/data/resource";
import Filters from "./feature/browse/Filters";
import Results from "./feature/browse/Results";

Amplify.configure(outputs);

const dataClient = generateClient<Schema>();
const PAGE_SIZE = 10;

type RawProfile = Schema["Profile"]["type"];

type CleanProfile = {
  [K in keyof RawProfile as string extends K ? never : K]: RawProfile[K];
};

type ProfileWithUrl = CleanProfile & {
  imageUrl: string;
};

function App() {
  const [profiles, setProfiles] = useState<ProfileWithUrl[]>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Record<string, unknown>>({});

  const loadProfiles = async (
    token: string | null = null,
    filter: Record<string, any> = activeFilter,
  ) => {
    setLoading(true);

    // Extract demographic parameters
    const { __demographics, ...remainingFilters } = filter;
    const gender = __demographics?.gender;
    const ethnicity = __demographics?.ethnicity;
    const minAge = __demographics?.minAge;
    const maxAge = __demographics?.maxAge;

    // Build Age Range object for Sort Key
    let ageQuery: Record<string, number | number[]> | undefined;
    if (minAge !== null && maxAge !== null) {
      ageQuery = { between: [minAge, maxAge] };
    } else if (minAge !== null) {
      ageQuery = { ge: minAge };
    } else if (maxAge !== null) {
      ageQuery = { le: maxAge };
    }

    try {
      let rawProfiles: RawProfile[] = [];
      let nextTokenResult: string | null = null;

      // Use GSI query if both Gender and Ethnicity are selected
      if (gender && ethnicity) {
        const compositeKey = `${gender}#${ethnicity.toLowerCase()}`;

        const response =
          await dataClient.models.Profile.listProfilesByDemographicAndAge(
            {
              genderEthnicity: compositeKey,
              ...(ageQuery && { age: ageQuery }),
            },
            {
              limit: PAGE_SIZE,
              nextToken: token ?? undefined,
              filter:
                Object.keys(remainingFilters).length > 0
                  ? remainingFilters
                  : undefined,
            },
          );

        if (response.errors) console.error(response.errors);
        rawProfiles = response.data;
        nextTokenResult = response.nextToken ?? null;
      } else {
        // Fallback to standard table query if demographics aren't fully selected
        const response = await dataClient.models.Profile.list({
          limit: PAGE_SIZE,
          nextToken: token ?? undefined,
          filter:
            Object.keys(remainingFilters).length > 0
              ? remainingFilters
              : undefined,
        });

        if (response.errors) console.error(response.errors);
        rawProfiles = response.data;
        nextTokenResult = response.nextToken ?? null;
      }

      // Resolve Image URLs
      const profilesWithUrls: ProfileWithUrl[] = await Promise.all(
        rawProfiles.map(async (profile) => ({
          ...profile,
          imageUrl: (
            await getUrl({
              path: `public/${profile.image}`,
            })
          ).url.toString(),
        })),
      );

      setProfiles(profilesWithUrls);
      setNextToken(nextTokenResult);
    } catch (err) {
      console.error("Error loading profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (filter: Record<string, unknown>) => {
    setActiveFilter(filter);
    setNextToken(null);
    loadProfiles(null, filter);
  };

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Amplify Gallery</h1>
          <p className="mt-2 text-gray-600">
            Built with AWS Amplify, DynamoDB, S3, Vite and Academic Dataset by
            Generated Photos
          </p>
        </header>

        <section className="grid grid-cols-[240px_1fr] gap-6">
          <Filters loading={loading} onApply={applyFilters} />
          <Results
            profiles={profiles}
            nextToken={nextToken}
            loading={loading}
            loadProfiles={loadProfiles}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
