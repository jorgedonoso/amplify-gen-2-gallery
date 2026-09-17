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
const PAGE_SIZE = 1000;

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
    filter = activeFilter,
  ) => {
    setLoading(true);

    const {
      data,
      nextToken: newToken,
      errors,
    } = await dataClient.models.Profile.list({
      limit: PAGE_SIZE,
      nextToken: token ?? undefined,
      filter,
    });

    if (errors) {
      console.error(errors);
    } else {
      const profilesWithUrls: ProfileWithUrl[] = await Promise.all(
        data.map(async (profile) => ({
          ...profile,
          imageUrl: (
            await getUrl({
              path: `public/${profile.image}`,
            })
          ).url.toString(),
        })),
      );

      setProfiles(profilesWithUrls);
      setNextToken(newToken ?? null);
    }

    setLoading(false);
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
