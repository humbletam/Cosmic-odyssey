export interface PriceList {
  validUntil: string;
  routes: any[];
}

export interface Booking {
  firstName: string;
  lastName: string;
  routeInfo: string;
  company: string;
  totalQuotedPrice: number;
  totalQuotedTravelTime: number;
}

export const saveBooking = (booking: Booking) => {
  const stored = localStorage.getItem("bookings");
  const bookings: Booking[] = stored ? JSON.parse(stored) : [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
};

export const getBookings = (): Booking[] => {
  return JSON.parse(localStorage.getItem("bookings") || "[]");
};

export const savePriceList = (priceList: PriceList) => {
  let priceLists = JSON.parse(localStorage.getItem("priceLists") || "[]");
  priceLists.unshift(priceList);
  if (priceLists.length > 15) {
    priceLists = priceLists.slice(0, 15);
  }
  localStorage.setItem("priceLists", JSON.stringify(priceLists));
};

export const getPriceLists = (): PriceList[] => {
  return JSON.parse(localStorage.getItem("priceLists") || "[]");
};
