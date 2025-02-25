export interface FromTo {
  id: string;
  name: string;
}

export interface RouteInfo {
  id: string;
  from: FromTo;
  to: FromTo;
  distance: number;
}

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
  origin?: string;
  destination?: string;
  displayFlightStart?: string;
  displayFlightEnd?: string;
}

export interface Route {
  id: string;
  routeInfo: RouteInfo;
  providers: Provider[];
}
