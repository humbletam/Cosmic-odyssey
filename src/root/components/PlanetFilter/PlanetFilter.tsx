import { FC } from "react";

interface PlanetFilterProps {
  origin: string;
  setOrigin: (origin: string) => void;
}

const origins = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

export const PlanetFilter: FC<PlanetFilterProps> = ({ origin, setOrigin }) => {
  return (
    <div className="w-full flex justify-between mb-4 px-4">
      {origins.map((planet) => (
        <button
          key={planet}
          className={`border p-2 rounded ${
            origin === planet ? "bg-blue-600 text-white" : ""
          }`}
          onClick={() => setOrigin(planet)}
        >
          {planet}
        </button>
      ))}
    </div>
  );
};
