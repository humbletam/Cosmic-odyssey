export interface Company {
  id: string;
  name: string;
}

export interface Provider {
  company: Company;
  flightEnd: string;
  flightStart: string;
  id: string;
  price: number;
  distance?: number;
  travelTime?: number;
}

export interface Route {
  id: string;
  providers: Provider[];
}
