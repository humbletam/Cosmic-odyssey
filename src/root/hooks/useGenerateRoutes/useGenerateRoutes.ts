import { useMemo } from "react";
import { Provider, Route } from "@/root/types";
import { destinations, origins } from "@/root/consts";

const formatDateTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const useGenerateAndFilterRoutes = (
  providers: Provider[],
  selectedOrigin: string,
  companyFilter: string,
  sortType: string,
): Route[] =>
  useMemo(() => {
    if (!providers || providers.length === 0) return [];
    const now = new Date();

    let genRoutes = providers.map((provider, index) => {
      const offsetMinutes = Math.floor(Math.random() * 60);
      const flightStartDate = new Date(now.getTime() + offsetMinutes * 60000);
      const travelHours = Math.floor(Math.random() * 10) + 1;
      const flightEndDate = new Date(
        flightStartDate.getTime() + travelHours * 3600000,
      );
      let originVal = origins[Math.floor(Math.random() * origins.length)];
      let destinationVal =
        destinations[Math.floor(Math.random() * destinations.length)];
      while (destinationVal === originVal) {
        destinationVal =
          destinations[Math.floor(Math.random() * destinations.length)];
      }
      return {
        id: (index + 1).toString(),
        providers: [
          {
            ...provider,
            flightStart: flightStartDate.toISOString(),
            flightEnd: flightEndDate.toISOString(),
            displayFlightStart: formatDateTime(flightStartDate),
            displayFlightEnd: formatDateTime(flightEndDate),
            origin: originVal,
            destination: destinationVal,
          },
        ],
      };
    });
    if (selectedOrigin.trim() !== "") {
      const lo = selectedOrigin.trim().toLowerCase();
      genRoutes = genRoutes.filter(
        (route) => (route.providers[0].origin || "").toLowerCase() === lo,
      );
    }
    if (companyFilter.trim() !== "") {
      const lcf = companyFilter.trim().toLowerCase();
      genRoutes = genRoutes
        .map((route) => ({
          ...route,
          providers: route.providers.filter((provider) =>
            provider.company.name.toLowerCase().includes(lcf),
          ),
        }))
        .filter((route) => route.providers.length > 0);
    }
    genRoutes = genRoutes.map((route) => {
      const sortedProviders = [...route.providers];
      const [key, order] = sortType.split("-");
      sortedProviders.sort((a, b) => {
        const getVal = (provider: any, k: string): number => {
          switch (k) {
            case "price":
              return provider.price;
            case "distance":
              return provider.distance ?? 0;
            case "travelTime":
              return provider.travelTime ?? 0;
            default:
              return 0;
          }
        };
        const diff = getVal(a, key) - getVal(b, key);
        return order === "asc" ? diff : -diff;
      });
      return { ...route, providers: sortedProviders };
    });
    return genRoutes;
  }, [providers, selectedOrigin, companyFilter, sortType]);
