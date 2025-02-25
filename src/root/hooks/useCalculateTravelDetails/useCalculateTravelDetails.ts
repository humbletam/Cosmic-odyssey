import { useMemo } from "react";
import { Provider } from "@/root/types/route-types/route-types";

export const formatDate = (date: Date): string => {
  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${dd}.${mm}.${yyyy} ${hours}:${minutes}`;
};

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
        displayFlightStart: formatDate(start),
        displayFlightEnd: formatDate(end),
      };
    });
  }, [providers]);
