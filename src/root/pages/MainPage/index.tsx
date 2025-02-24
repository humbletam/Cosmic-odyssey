import { FC, useEffect, useMemo, useState } from "react";
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
import { useFetchRoutes, useGenerateAndFilterRoutes } from "@/root/hooks";

export const MainPage: FC = () => {
  const { routes: fetchedRoutes, loading, error } = useFetchRoutes();
  const [origin, setOrigin] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [sortType, setSortType] = useState("price-asc");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const providers = useMemo(() => {
    return fetchedRoutes
      ? fetchedRoutes.flatMap((route) => route.providers)
      : [];
  }, [fetchedRoutes]);
  const filteredRoutes = useGenerateAndFilterRoutes(
    providers,
    origin,
    companyFilter,
    sortType,
  );

  const isPriceListValid = () => {
    const priceLists = getPriceLists();
    if (priceLists.length > 0) {
      const latestPriceList = priceLists[0];
      return new Date(latestPriceList.validUntil) > new Date();
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
      routeId: route.id,
      providerId: provider.id,
      totalQuotedPrice: provider.price,
      totalQuotedTravelTime: provider.travelTime || 0,
      companyName: provider.company.name,
    };
    saveBooking(booking);
    console.log(
      `Booking made for ${firstName} ${lastName} on route ${route.id} with provider ${provider.company.name}`,
    );
  };

  useEffect(() => {
    if (providers.length > 0) {
      const validUntil = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      const priceList = { validUntil, routes: fetchedRoutes };
      savePriceList(priceList);
    }
  }, [providers, fetchedRoutes]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!fetchedRoutes || fetchedRoutes.length === 0)
    return <p>No routes available</p>;

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl my-10 font-bold text-center text-blue-600">
        Cosmos Odyssey - Travel Deals
      </h1>
      <PlanetFilter origin={origin} setOrigin={setOrigin} />
      <FilterSortControls
        filter={companyFilter}
        setFilter={setCompanyFilter}
        sortType={sortType}
        setSortType={setSortType}
      />
      {selectedRoute && selectedProvider && (
        <BookingForm
          selectedRoute={selectedRoute}
          selectedProvider={selectedProvider}
          onBook={handleBook}
        />
      )}
      <PriceTable
        routes={filteredRoutes}
        onRouteSelect={(route, provider) => {
          setSelectedRoute(route);
          setSelectedProvider(provider);
        }}
        selectedRouteId={selectedRoute?.id || null}
        origin={origin}
      />
    </div>
  );
};
