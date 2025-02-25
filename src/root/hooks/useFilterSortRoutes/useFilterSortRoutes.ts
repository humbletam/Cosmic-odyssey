import { useEffect, useState } from "react";
import type { Route } from "@/root/types";

export const useFilterSortRoutes = (routes: Route[], origin: string) => {
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>(routes);
  const [filter, setFilter] = useState<string>("");
  const [sortType, setSortType] = useState<string>("price-asc");

  useEffect(() => {
    let updatedRoutes = routes.map((route) => ({ ...route }));
    const inputOrigin = origin.trim().toLowerCase();
    const inputCompanyFilter = filter.trim().toLowerCase();
    if (inputOrigin) {
      updatedRoutes = updatedRoutes.filter((route) =>
        route.providers.some(
          (provider) => (provider.origin || "").toLowerCase() === inputOrigin,
        ),
      );
    }
    if (inputCompanyFilter) {
      updatedRoutes = updatedRoutes
        .map((route) => ({
          ...route,
          providers: route.providers.filter((provider) =>
            provider.company.name.toLowerCase().includes(inputCompanyFilter),
          ),
        }))
        .filter((route) => route.providers.length > 0);
    }
    updatedRoutes = updatedRoutes.map((route) => {
      const sortedProviders = [...route.providers];
      const [type, order] = sortType.split("-");
      sortedProviders.sort((a, b) => {
        const getValue = (provider: any, key: string): number => {
          switch (key) {
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
        const comparison = getValue(a, type) - getValue(b, type);
        return order === "asc" ? comparison : -comparison;
      });
      return { ...route, providers: sortedProviders };
    });
    setFilteredRoutes(updatedRoutes);
  }, [routes, origin, filter, sortType]);

  return { filteredRoutes, filter, setFilter, sortType, setSortType };
};
