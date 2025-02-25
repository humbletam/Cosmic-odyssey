import { FC } from "react";
import { Provider, Route } from "@/root/types";
import { useCalculateTravelDetails } from "@/root/hooks";

const formatDate = (date: Date): string => {
  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${dd}.${mm}.${yyyy} ${hours}:${minutes}`;
};

interface TableProps {
  routes: Route[];
  origin: string;
  onRouteSelect: (route: Route, provider: Provider) => void;
  selectedRouteId: string | null;
  selectedProviderId?: string;
}

export const Table: FC<TableProps> = ({
  routes,
  origin,
  onRouteSelect,
  selectedRouteId,
  selectedProviderId,
}) => {
  const filteredRoutes = origin
    ? routes.filter(
        (route) =>
          route.routeInfo.from.name
            .toLowerCase()
            .includes(origin.toLowerCase()) ||
          route.routeInfo.to.name
            .toLowerCase()
            .includes(origin.toLowerCase()) ||
          route.providers.some((provider) =>
            (provider.origin || "")
              .toLowerCase()
              .includes(origin.toLowerCase()),
          ),
      )
    : routes;
  const rows = filteredRoutes.flatMap((route) =>
    route.providers.map((provider) => ({ route, provider })),
  );
  const calculatedProviders = useCalculateTravelDetails(
    rows.map((row) => row.provider),
  );
  return (
    <table className="w-full bg-white border rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Company</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Travel Time</th>
          <th className="p-2 border">Origin</th>
          <th className="p-2 border">Destination</th>
          <th className="p-2 border">Action</th>
          <th className="p-2 border">Dates</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const calcProvider = calculatedProviders[index];
          const isSelected =
            row.route.id === selectedRouteId &&
            selectedProviderId === row.provider.id;
          const departureISO = calcProvider?.flightStart;
          const arrivalISO = calcProvider?.flightEnd;
          const departureFormatted = departureISO
            ? formatDate(new Date(departureISO))
            : "";
          const arrivalFormatted = arrivalISO
            ? formatDate(new Date(arrivalISO))
            : "";
          return (
            <tr
              key={`${row.route.id}-${row.provider.id}`}
              className="text-center border"
            >
              <td className="p-2 border">{calcProvider?.company.name}</td>
              <td className="p-2 border">
                {calcProvider ? `${calcProvider.price} €` : ""}
              </td>
              <td className="p-2 border">
                {calcProvider ? `${calcProvider.travelTime} hours` : ""}
              </td>
              <td className="p-2 border">{row.route.routeInfo.from.name}</td>
              <td className="p-2 border">{row.route.routeInfo.to.name}</td>
              <td className="p-2 border">
                <button
                  onClick={() =>
                    calcProvider && onRouteSelect(row.route, calcProvider)
                  }
                  className={`p-2 rounded ${isSelected ? "bg-green-600 text-white" : "bg-blue-600 text-white"}`}
                >
                  {isSelected ? "Selected" : "Select Route"}
                </button>
              </td>
              <td className="p-2 border">
                <p>
                  <strong>Departure:</strong> {departureFormatted}
                </p>
                <p>
                  <strong>Arrival:</strong> {arrivalFormatted}
                </p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
