import { FC } from "react";
import { useFetchRoutes, useFilterSortRoutes } from "@/root/hooks";
import { FilterSortControls, PriceTable } from "@/root/components";

export const MainPage: FC = () => {
  const { routes, loading, error } = useFetchRoutes();
  const { filteredRoutes, filter, setFilter, sortType, setSortType } =
    useFilterSortRoutes(routes);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!filteredRoutes || filteredRoutes.length === 0)
    return <p>No routes available</p>;

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl my-10 font-bold text-center text-blue-600">
        Cosmos Odyssey - Travel Deals
      </h1>
      <FilterSortControls
        filter={filter}
        setFilter={setFilter}
        sortType={sortType}
        setSortType={setSortType}
      />
      <PriceTable routes={filteredRoutes} />
    </div>
  );
};
