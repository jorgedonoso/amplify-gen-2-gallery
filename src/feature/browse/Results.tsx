import ProfileCard from "./ProfileCard";

type Profile = {
  id: string;
  imageUrl: string;
};

type ResultsProps = {
  profiles: Profile[];
  nextToken: string | null;
  loading: boolean;
  loadProfiles: (token: string | null) => void;
};

function Results({ profiles, nextToken, loading, loadProfiles }: ResultsProps) {
  return (
    <section className="rounded bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Results</h2>

      {profiles.length === 0 ? (
        <p className="mt-2 text-gray-600">No results.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!nextToken || loading}
          onClick={() => loadProfiles(nextToken)}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {loading ? "Loading..." : "Next"}
        </button>
      </div>
    </section>
  );
}

export default Results;
