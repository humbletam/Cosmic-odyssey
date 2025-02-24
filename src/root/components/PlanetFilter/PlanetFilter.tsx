import { FC } from "react";
import { origins } from "@/root/consts";
import { TextWithIcon } from "@/root/components";
import { PlanetIcon } from "@/root/ui";
import cn from "classnames";

interface PlanetFilterProps {
  origin: string;
  setOrigin: (origin: string) => void;
}

export const PlanetFilter: FC<PlanetFilterProps> = ({ origin, setOrigin }) => {
  return (
    <div className="w-10/12 flex justify-center gap-10">
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
