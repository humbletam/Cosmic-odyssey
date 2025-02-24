import { FC } from "react";
import { Provider, Route } from "@/root/types/route-types/route-types";
import { Table } from "@/root/components";

interface PriceTableProps {
  routes: Route[];
  onRouteSelect: (route: Route, provider: Provider) => void;
  selectedRouteId: string | null;
  origin: string;
}

export const PriceTable: FC<PriceTableProps> = ({
  routes,
  onRouteSelect,
  selectedRouteId,
  origin,
}) => {
  return (
    <div className="w-11/12 flex flex-col justify-center items-center h-3/5">
      <Table
        routes={routes}
        origin={origin}
        onRouteSelect={onRouteSelect}
        selectedRouteId={selectedRouteId}
      />
    </div>
  );
};
