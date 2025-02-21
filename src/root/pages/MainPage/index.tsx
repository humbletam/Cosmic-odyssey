import { FC } from "react";
import { useFetchPrices } from "@/root/hooks";
import { PriceTable } from "@/root/components";

export const MainPage: FC = () => {
  const { routes, loading, error } = useFetchPrices();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!routes || routes.length === 0) return <p>No routes available</p>;

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl my-10 font-bold text-center text-blue-600">
        Cosmos Odyssey - Travel Deals
      </h1>
      <PriceTable />
    </div>
  );
};
