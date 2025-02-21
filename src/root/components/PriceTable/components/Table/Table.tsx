import { FC } from "react";
import { Route } from "@/root/types";
import { useCalculateTravelDetails } from "@/root/hooks";

interface TableProps {
  routes: Route[];
}

export const Table: FC<TableProps> = ({ routes }) => {
  const providers = routes.flatMap((route) => route.providers);
  const calculatedProviders = useCalculateTravelDetails(providers);

  return (
    <table className="w-full bg-white border rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Company</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Distance</th>
          <th className="p-2 border">Travel Time</th>
        </tr>
      </thead>
      <tbody>
        {calculatedProviders.map((provider, index) => (
          <tr key={index} className="text-center border">
            <td className="p-2 border">{provider.company.name}</td>
            <td className="p-2 border">{provider.price} €</td>
            <td className="p-2 border">{provider.distance} km</td>
            <td className="p-2 border">{provider.travelTime} hours</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
