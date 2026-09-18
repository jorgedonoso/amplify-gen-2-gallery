type Profile = {
  imageUrl: string;
  gender?: string | null;
  age?: number | null;
  ethnicity?: string | null;
  eyeColor?: string | null;
  hairColor?: string | null;
  hairLength?: string | null;
  moustache?: number | null;
  beard?: number | null;
  sideburns?: number | null;
  bald?: number | null;
  smile?: number | null;
  eyeMakeup?: number | null;
  lipMakeup?: number | null;
};

type ProfileCardProps = {
  profile: Profile;
};

function ProfileCard({ profile }: ProfileCardProps) {
  const facialHair = [
    profile.moustache && "Moustache",
    profile.beard && "Beard",
    profile.sideburns && "Sideburns",
  ].filter(Boolean);

  const appearance = [
    profile.bald && "Bald",
    profile.smile && "Smiling",
    profile.eyeMakeup && "Eye Makeup",
    profile.lipMakeup && "Lip Makeup",
  ].filter(Boolean);

  const details = [
    ["Gender", profile.gender],
    ["Age", profile.age != null ? Math.round(profile.age) : null],
    ["Ethnicity", profile.ethnicity],
    ["Eye Color", profile.eyeColor],
    ["Hair Color", profile.hairColor],
    ["Hair Length", profile.hairLength],
  ];

  return (
    <article className="overflow-hidden rounded bg-white shadow-sm ring-1 ring-gray-200 transition hover:shadow-md hover:bg-purple-50">
      <img
        src={profile.imageUrl}
        alt=""
        className="aspect-square w-full object-cover"
      />

      <div className="p-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {details.map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {value ?? "—"}
              </p>
            </div>
          ))}
        </div>

        {false && facialHair.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
              Facial Hair
            </p>

            <div className="flex flex-wrap gap-1.5">
              {facialHair.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {false && appearance.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
              Appearance
            </p>

            <div className="flex flex-wrap gap-1.5">
              {appearance.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProfileCard;
