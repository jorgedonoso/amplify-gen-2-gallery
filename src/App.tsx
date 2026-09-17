import { useState } from "react";
import "./App.css";
import { getUrl } from "aws-amplify/storage";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import type { Schema } from "../amplify/data/resource";
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

  const [gender, setGender] = useState<string[]>([]);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const [ethnicity, setEthnicity] = useState<string[]>([]);
  const [eyeColor, setEyeColor] = useState<string[]>([]);
  const [hairColor, setHairColor] = useState<string[]>([]);
  const [hairLength, setHairLength] = useState<string[]>([]);
  const [facialHair, setFacialHair] = useState<string[]>([]);
  const [appearance, setAppearance] = useState<string[]>([]);

  const toggleFilter = (
    value: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const loadProfiles = async (token: string | null = null) => {
    setLoading(true);

    const filter: Record<string, unknown> = {};

    if (gender.length === 1) {
      filter.gender = { eq: gender[0] };
    }

    if (minAge || maxAge) {
      filter.age = {
        ...(minAge && { ge: Number(minAge) }),
        ...(maxAge && { le: Number(maxAge) }),
      };
    }

    if (ethnicity.length === 1) {
      filter.ethnicity = { eq: ethnicity[0].toLowerCase() };
    }

    if (eyeColor.length === 1) {
      filter.eyeColor = { eq: eyeColor[0] };
    }

    if (hairColor.length === 1) {
      filter.hairColor = { eq: hairColor[0] };
    }

    if (hairLength.length === 1) {
      filter.hairLength = { eq: hairLength[0] };
    }

    if (facialHair.includes("Moustache")) {
      filter.moustache = { gt: 0.5 };
    }

    if (facialHair.includes("Beard")) {
      filter.beard = { gt: 0.5 };
    }

    if (facialHair.includes("Sideburns")) {
      filter.sideburns = { gt: 0.5 };
    }

    if (appearance.includes("Bald")) {
      filter.bald = { gt: 0.5 };
    }

    if (appearance.includes("Smiling")) {
      filter.smile = { gt: 0.5 };
    }

    if (appearance.includes("Eye Makeup")) {
      filter.eyeMakeup = { gt: 0.5 };
    }

    if (appearance.includes("Lip Makeup")) {
      filter.lipMakeup = { gt: 0.5 };
    }

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

  const applyFilters = () => {
    setNextToken(null);
    loadProfiles();
  };

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Amplify Gallery</h1>
          <p className="mt-2 text-gray-600">Search matches</p>
        </header>

        <section className="grid grid-cols-[240px_1fr] gap-6">
          {/* Filters */}
          <aside className="rounded bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

            <div className="mt-6 space-y-7">
              {/* Gender */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Gender
                </h3>

                <div className="space-y-2">
                  {["Male", "Female"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={gender.includes(option)}
                        onChange={() => toggleFilter(option, gender, setGender)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">Age</h3>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />

                  <input
                    type="number"
                    placeholder="Max"
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Ethnicity */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Ethnicity
                </h3>

                <div className="space-y-2">
                  {["Asian", "Black", "Latino", "White"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={ethnicity.includes(option)}
                        onChange={() =>
                          toggleFilter(option, ethnicity, setEthnicity)
                        }
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Eye Color */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Eye Color
                </h3>

                <div className="space-y-2">
                  {["Blue", "Brown", "Green", "Grey"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={eyeColor.includes(option)}
                        onChange={() =>
                          toggleFilter(option, eyeColor, setEyeColor)
                        }
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Hair Color
                </h3>

                <div className="space-y-2">
                  {["Brown", "Black", "Blond", "Red", "Gray", "Other"].map(
                    (option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={hairColor.includes(option)}
                          onChange={() =>
                            toggleFilter(option, hairColor, setHairColor)
                          }
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        {option}
                      </label>
                    ),
                  )}
                </div>
              </div>

              {/* Hair Length */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Hair Length
                </h3>

                <div className="space-y-2">
                  {["Short", "Medium", "Long"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={hairLength.includes(option)}
                        onChange={() =>
                          toggleFilter(option, hairLength, setHairLength)
                        }
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Facial Hair */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Facial Hair
                </h3>

                <div className="space-y-2">
                  {["Moustache", "Beard", "Sideburns"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={facialHair.includes(option)}
                        onChange={() =>
                          toggleFilter(option, facialHair, setFacialHair)
                        }
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Appearance */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Appearance
                </h3>

                <div className="space-y-2">
                  {["Bald", "Smiling", "Eye Makeup", "Lip Makeup"].map(
                    (option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={appearance.includes(option)}
                          onChange={() =>
                            toggleFilter(option, appearance, setAppearance)
                          }
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        {option}
                      </label>
                    ),
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={applyFilters}
                disabled={loading}
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Apply Filters"}
              </button>
            </div>
          </aside>

          {/* Results */}
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
