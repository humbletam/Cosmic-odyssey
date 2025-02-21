import { useEffect, useState } from "react";
import { Provider } from "@/root/types/route-types/route-types";

export const useCalculateTravelDetails = (providers: Provider[]) => {
  const [calculatedProviders, setCalculatedProviders] = useState<Provider[]>(
    [],
  );

  useEffect(() => {
    const calculateDetails = (provider: Provider) => {
      const start = new Date(provider.flightStart);
      const end = new Date(provider.flightEnd);
      const travelTime = (end.getTime() - start.getTime()) / 3600000;

      const roundedTravelTime = Math.round(travelTime * 100) / 100;
      const distance = roundedTravelTime * 1000;

      const roundedDistance = Math.round(distance * 100) / 100;

      return {
        ...provider,
        distance: roundedDistance,
        travelTime: roundedTravelTime,
      };
    };

    const updatedProviders = providers.map(calculateDetails);
    setCalculatedProviders(updatedProviders);
  }, [providers]);

  return calculatedProviders;
};
