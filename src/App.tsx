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

            <div className="mt-6 space-y-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Male</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Female</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Brown Eyes</span>
              </label>
            </div>
            <img src={hero} className="mt-6" />
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
