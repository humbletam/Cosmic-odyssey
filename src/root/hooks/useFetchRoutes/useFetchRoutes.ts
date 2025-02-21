import { useEffect, useState } from "react";
import type { Route } from "@/root/types";

export const useFetchRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/get?url=https://cosmosodyssey.azurewebsites.net/api/v1.0/TravelPrices",
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const routesData = JSON.parse(data.contents);
        setRoutes(routesData.legs);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { routes, loading, error };
};
