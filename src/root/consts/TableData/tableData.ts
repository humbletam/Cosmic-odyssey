import { Provider } from "@/root/types";

export const TABLE_HEADERS = [
  "Company",
  "Price",
  "Distance",
  "Travel Time",
  "Origin",
  "Destination",
  "Action",
  "Time",
];

export const TABLE_COLUMNS = [
  { key: "company", render: (p?: Provider) => (p ? p.company.name : "") },
  { key: "price", render: (p?: Provider) => (p ? `${p.price} €` : "") },
  { key: "distance", render: (p?: Provider) => (p ? `${p.distance} km` : "") },
  {
    key: "travelTime",
    render: (p?: Provider) => (p ? `${p.travelTime} hours` : ""),
  },
  { key: "origin", render: (p?: Provider) => (p ? p.origin || "" : "") },
  {
    key: "destination",
    render: (p?: Provider) => (p ? p.destination || "" : ""),
  },
];
