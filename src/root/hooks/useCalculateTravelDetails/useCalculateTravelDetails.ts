import { useMemo } from "react";
import { Provider } from "@/root/types";

export const useCalculateTravelDetails = (providers: Provider[]): Provider[] =>
  useMemo(() => {
    return providers.map((provider) => {
      const start = new Date(provider.flightStart);
      const end = new Date(provider.flightEnd);
      const travelTime = (end.getTime() - start.getTime()) / 3600000;
      const roundedTravelTime = Math.round(travelTime * 100) / 100;
      const distance = roundedTravelTime * 1000;
      const roundedDistance = Math.round(distance * 100) / 100;
      return {
        ...provider,
        travelTime: roundedTravelTime,
        distance: roundedDistance,
        displayFlightStart: provider.displayFlightStart || start.toISOString(),
        displayFlightEnd: provider.displayFlightEnd || end.toISOString(),
      };
    });
  }, [providers]);
