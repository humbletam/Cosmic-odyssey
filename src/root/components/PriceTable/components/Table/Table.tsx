import { FC } from "react";
import { Provider, Route } from "@/root/types/route-types/route-types";

const calculateDetails = (provider: Provider) => {
  const start = new Date(provider.flightStart);
  const end = new Date(provider.flightEnd);
  const travelTime = (end.getTime() - start.getTime()) / 3600000;
  const roundedTravelTime = Math.round(travelTime * 100) / 100;
  const distance = roundedTravelTime * 1000;
  const roundedDistance = Math.round(distance * 100) / 100;
  return {
    ...provider,
    travelTime: roundedTravelTime,
    distance: roundedDistance,
  };
};

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
    ? routes.filter((route) => route.providers[0].origin === origin)
    : routes;

  return (
    <table className="w-full bg-white border rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Company</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Distance</th>
          <th className="p-2 border">Travel Time</th>
          <th className="p-2 border">Origin</th>
          <th className="p-2 border">Destination</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredRoutes.map((route) => {
          const provider = route.providers[0];
          const calcProvider = calculateDetails(provider);
          const isSelected = route.id === selectedRouteId;
          return (
            <tr key={route.id} className="text-center border">
              <td className="p-2 border">{calcProvider.company.name}</td>
              <td className="p-2 border">{calcProvider.price} €</td>
              <td className="p-2 border">{calcProvider.distance} km</td>
              <td className="p-2 border">{calcProvider.travelTime} hours</td>
              <td className="p-2 border">{calcProvider.origin}</td>
              <td className="p-2 border">{calcProvider.destination}</td>
              <td className="p-2 border">
                <button
                  onClick={() => onRouteSelect(route, calcProvider)}
                  className={`p-2 rounded ${isSelected ? "bg-green-600 text-white" : "bg-blue-600 text-white"}`}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
