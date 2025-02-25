import { useMemo } from "react";
import type { Route } from "@/root/types";

export const useFilterRoutes = (
  routes: Route[],
  selectedOrigin: string,
  companyFilter: string,
  sortType: string,
): Route[] =>
  useMemo(() => {
    let updatedRoutes = routes.map((route) => ({ ...route }));
    const originLower = selectedOrigin.trim().toLowerCase();
    if (originLower) {
      updatedRoutes = updatedRoutes.filter(
        (route) =>
          (
            route.providers[0].origin ||
            route.routeInfo.from.name ||
            ""
          ).toLowerCase() === originLower,
      );
    }
    const companyLower = companyFilter.trim().toLowerCase();
    if (companyLower) {
      updatedRoutes = updatedRoutes
        .map((route) => ({
          ...route,
          providers: route.providers.filter((provider) =>
            provider.company.name.toLowerCase().includes(companyLower),
          ),
        }))
        .filter((route) => route.providers.length > 0);
    }
    updatedRoutes = updatedRoutes.map((route) => {
      const providersSorted = [...route.providers];
      const [key, order] = sortType.split("-");
      providersSorted.sort((a, b) => {
        let diff = 0;
        if (key === "price") {
          diff = a.price - b.price;
        } else if (key === "travelTime") {
          const travelA =
            (new Date(a.flightEnd).getTime() -
              new Date(a.flightStart).getTime()) /
            3600000;
          const travelB =
            (new Date(b.flightEnd).getTime() -
              new Date(b.flightStart).getTime()) /
            3600000;
          diff = travelA - travelB;
        } else if (key === "distance") {
          diff = route.routeInfo.distance;
        }
        return order === "asc" ? diff : -diff;
      });
      return { ...route, providers: providersSorted };
    });
    return updatedRoutes;
  }, [routes, selectedOrigin, companyFilter, sortType]);
