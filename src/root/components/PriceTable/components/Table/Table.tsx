import { FC } from "react";
import { useFetchPrices } from "@/root/hooks";

export const Table: FC = () => {
  const { routes } = useFetchPrices();
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
        {routes.map((route, routeIndex) =>
          route.providers.map((provider, providerIndex) => (
            <tr
              key={`${routeIndex}-${providerIndex}`}
              className="text-center border"
            >
              <td className="p-2 border">{provider.company.name}</td>
              <td className="p-2 border">{provider.price} €</td>
              <td className="p-2 border">{provider.flightStart}</td>
              <td className="p-2 border">{provider.flightEnd}</td>
            </tr>
          )),
        )}
      </tbody>
    </table>
  );
};
