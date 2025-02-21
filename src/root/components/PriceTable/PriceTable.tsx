import { FC } from "react";
import { Table } from "@/root/components";
import { Route } from "@/root/types";

interface PriceTableProps {
  routes: Route[];
}

export const PriceTable: FC<PriceTableProps> = ({ routes }) => {
  return (
    <div className="w-11/12 flex justify-center items-center h-3/5">
      <Table routes={routes} />
    </div>
  );
};
