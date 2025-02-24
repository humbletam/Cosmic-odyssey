import { FC } from "react";
import { Provider, Route } from "@/root/types/route-types/route-types";
import { useCalculateTravelDetails } from "@/root/hooks";
import { TABLE_COLUMNS, TABLE_HEADERS } from "@/root/consts";

interface TableProps {
  routes: Route[];
  origin: string;
  onRouteSelect: (route: Route, provider: Provider) => void;
  selectedRouteId: string | null;
}

export const Table: FC<TableProps> = ({
  routes,
  origin,
  onRouteSelect,
  selectedRouteId,
}) => {
  const filteredRoutes = origin
    ? routes.filter(
        (route) =>
          (route.providers[0]?.origin || "").toLowerCase() ===
          origin.toLowerCase(),
      )
    : routes;

  const calcProviders = useCalculateTravelDetails(
    filteredRoutes.map((route) => route.providers[0]),
  );

  return (
    <table className="w-full bg-white border rounded">
      <thead>
        <tr className="bg-gray-200">
          {TABLE_HEADERS.map((header, idx) => (
            <th key={idx} className="p-2 border">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredRoutes.map((route, index) => {
          const calcProvider = calcProviders[index];
          const isSelected = route.id === selectedRouteId;
          return (
            <tr key={route.id} className="text-center border">
              {TABLE_COLUMNS.map((col, idx) => (
                <td key={idx} className="p-2 border">
                  {calcProvider ? col.render(calcProvider) : ""}
                </td>
              ))}
              <td className="p-2 border">
                <button
                  onClick={() =>
                    calcProvider && onRouteSelect(route, calcProvider)
                  }
                  className={`p-2 rounded ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </td>
              <td className="p-2 border">
                {calcProvider ? (
                  <>
                    <p>
                      <strong>Departure:</strong>{" "}
                      {calcProvider.displayFlightStart ??
                        calcProvider.flightStart}
                    </p>
                    <p>
                      <strong>Arrival:</strong>{" "}
                      {calcProvider.displayFlightEnd ?? calcProvider.flightEnd}
                    </p>
                  </>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
