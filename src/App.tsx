import "./App.css";
import hero from "./assets/hero.png";

function App() {
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
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
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <section className="rounded bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Results</h2>

            <p className="mt-2 text-gray-600">Content</p>
          </section>
        </section>
      </div>
    </main>
  );
}

export default App;
