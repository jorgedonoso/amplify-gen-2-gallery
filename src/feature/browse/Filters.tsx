import { useState } from "react";

type FiltersProps = {
  loading: boolean;
  onApply: (filter: Record<string, unknown>) => void;
};

type FilterGroup = {
  title: string;
  selected: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
  options: string[];
};

function Filters({ loading, onApply }: FiltersProps) {
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

  const applyFilters = () => {
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
      filter.hairColor = { eq: hairColor[0].toLowerCase() };
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

    onApply(filter);
  };

  const filterGroups: FilterGroup[] = [
    {
      title: "Ethnicity",
      selected: ethnicity,
      setter: setEthnicity,
      options: ["Asian", "Black", "Latino", "White"],
    },
    {
      title: "Eye Color",
      selected: eyeColor,
      setter: setEyeColor,
      options: ["Blue", "Brown", "Green", "Grey"],
    },
    {
      title: "Hair Color",
      selected: hairColor,
      setter: setHairColor,
      options: ["Brown", "Black", "Blond", "Red", "Gray", "Other"],
    },
    {
      title: "Hair Length",
      selected: hairLength,
      setter: setHairLength,
      options: ["Short", "Medium", "Long"],
    },
    {
      title: "Facial Hair",
      selected: facialHair,
      setter: setFacialHair,
      options: ["Moustache", "Beard", "Sideburns"],
    },
    {
      title: "Appearance",
      selected: appearance,
      setter: setAppearance,
      options: ["Bald", "Smiling", "Eye Makeup", "Lip Makeup"],
    },
  ];

  return (
    <aside className="rounded bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

      <div className="mt-6 space-y-7">
        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-900">Gender</h3>

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

        {filterGroups.map(({ title, selected, setter, options }) => (
          <div key={title}>
            <h3 className="mb-3 text-sm font-medium text-gray-900">{title}</h3>

            <div className="space-y-2">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => toggleFilter(option, selected, setter)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

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
  );
}

export default Filters;
