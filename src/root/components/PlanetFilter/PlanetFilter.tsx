import { FC } from "react";
import cn from "classnames";
import { TextWithIcon } from "@/root/components";
import { PlanetIcon } from "@/root/ui";

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
    <div className="w-full flex justify-center gap-10">
      {origins.map((planet) => (
        <button
          className={cn(
            "border w-36 p-2 text-white rounded-md justify-center flex",
            {
              "bg-green-600": origin === planet,
              "bg-blue-600": origin != planet,
            },
          )}
          onClick={() => setOrigin(planet)}
        >
          <TextWithIcon text={planet} icon={<PlanetIcon />} isDefault />
        </button>
      ))}
    </div>
  );
};
