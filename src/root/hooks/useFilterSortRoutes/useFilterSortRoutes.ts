import { useEffect, useState } from "react";
import type { Route } from "@/root/types";

export const useFilterSortRoutes = (routes: Route[]) => {
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sortType, setSortType] = useState<string>("price-asc");

  useEffect(() => {
    let updatedRoutes = routes.map((route) => ({ ...route }));

    if (filter) {
      updatedRoutes = updatedRoutes
        .map((route) => {
          const filteredProviders = route.providers.filter((provider) =>
            provider.company.name
              .toLowerCase()
              .includes(filter.trim().toLowerCase()),
          );
          return { ...route, providers: filteredProviders };
        })
        .filter((route) => route.providers.length > 0);
    }

    updatedRoutes = updatedRoutes.map((route) => {
      const sortedProviders = [...route.providers];
      const [type, order] = sortType.split("-");
      sortedProviders.sort((a, b) => {
        let comparison = 0;
        const getValue = (provider: any, key: string) => {
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
        comparison = getValue(a, type) - getValue(b, type);
        return order === "asc" ? comparison : -comparison;
      });
      return { ...route, providers: sortedProviders };
    });

    setFilteredRoutes(updatedRoutes);
  }, [routes, filter, sortType]);

  return { filteredRoutes, filter, setFilter, sortType, setSortType };
};
