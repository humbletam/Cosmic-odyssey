import { Route } from "@/root/types/route-types/route-types";

interface Booking {
  firstName: string;
  lastName: string;
  routeId: string;
  providerId: string;
  totalQuotedPrice: number;
  totalQuotedTravelTime: number;
  companyName: string;
}

interface PriceList {
  validUntil: string;
  routes: Route[];
}

export const saveBooking = (booking: Booking) => {
  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem("bookings") || "[]");
};

export const savePriceList = (priceList: PriceList) => {
  let priceLists = JSON.parse(localStorage.getItem("priceLists") || "[]");

  priceLists.unshift(priceList);

  if (priceLists.length > 15) {
    priceLists = priceLists.slice(0, 15);
  }

  localStorage.setItem("priceLists", JSON.stringify(priceLists));

  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  const validRouteIds = priceLists.flatMap((plist: PriceList) =>
    plist.routes.map((route) => route.id),
  );
  bookings = bookings.filter((booking: Booking) =>
    validRouteIds.includes(booking.routeId),
  );
  localStorage.setItem("bookings", JSON.stringify(bookings));
};

export const getPriceLists = () => {
  return JSON.parse(localStorage.getItem("priceLists") || "[]");
};
