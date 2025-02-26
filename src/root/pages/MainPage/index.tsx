import { FC, useEffect, useMemo, useState } from "react";
import { formatDate, useFetchRoutes, useFilterRoutes } from "@/root/hooks";
import { Provider, Route } from "@/root/types";
import {
  getPriceLists,
  saveBooking,
  savePriceList,
} from "@/root/helpers/booking-storage/storage";
import {
  BookingForm,
  FilterSortControls,
  PlanetFilter,
  PriceTable,
} from "@/root/components";

export const MainPage: FC = () => {
  const { routes: fetchedRoutes, loading, error } = useFetchRoutes();
  const [origin, setOrigin] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [sortType, setSortType] = useState("price-asc");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const generatedRoutes = useMemo(() => fetchedRoutes || [], [fetchedRoutes]);
  const filteredRoutes = useFilterRoutes(
    generatedRoutes,
    origin,
    companyFilter,
    sortType,
  );

  const isPriceListValid = () => {
    const priceLists = getPriceLists();
    if (priceLists.length > 0) {
      const latest = priceLists[0];
      return new Date(latest.validUntil) > new Date();
    }
    return false;
  };

  const handleBook = (
    firstName: string,
    lastName: string,
    route: Route,
    provider: Provider,
  ) => {
    if (!isPriceListValid()) {
      alert(
        "Price list has expired. Please refresh the page to get the latest prices.",
      );
      return;
    }
    const booking = {
      firstName,
      lastName,
      routeInfo: `${route.routeInfo.from.name} - ${route.routeInfo.to.name}`,
      company: provider.company.name,
      totalQuotedPrice: provider.price,
      totalQuotedTravelTime: provider.travelTime || 0,
      date: `${formatDate(new Date(provider.flightStart))} - ${formatDate(new Date(provider.flightEnd))}`,
    };
    saveBooking(booking);
    console.log(
      `Booking made for ${firstName} ${lastName} on route ${route.routeInfo.from.name} - ${route.routeInfo.to.name} with company ${provider.company.name}`,
    );
  };

  useEffect(() => {
    if (fetchedRoutes.length > 0) {
      const validUntil = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      const priceList = { validUntil, routes: fetchedRoutes };
      savePriceList(priceList);
    }
  }, [fetchedRoutes]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!fetchedRoutes || fetchedRoutes.length === 0)
    return <p>No routes available</p>;

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col gap-10 justify-center items-center mb-20">
      <div className="flex justify-center gap-20 w-10/12 my-6 mt-10">
        <h1 className="text-3xl flex items-center font-bold text-center text-gray-700">
          Cosmos Odyssey - Travel Deals
        </h1>
        {selectedRoute && selectedProvider && (
          <BookingForm
            selectedRoute={selectedRoute}
            selectedProvider={selectedProvider}
            onBook={handleBook}
            selectedCompany={selectedProvider.company}
          />
        )}
      </div>
      <PlanetFilter origin={origin} setOrigin={setOrigin} />
      <div className="flex flex-col w-10/12 mb-10">
        <FilterSortControls
          filter={companyFilter}
          setFilter={setCompanyFilter}
          sortType={sortType}
          setSortType={setSortType}
        />
        <PriceTable
          routes={filteredRoutes}
          onRouteSelect={(route, provider) => {
            setSelectedRoute(route);
            setSelectedProvider(provider);
          }}
          selectedRouteId={selectedRoute?.id || null}
          origin={origin}
          selectedProviderId={selectedProvider?.id}
        />
      </div>
    </div>
  );
};
