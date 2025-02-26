import { useEffect, useState } from "react";

export interface Booking {
  firstName: string;
  lastName: string;
  routeInfo: string;
  company: string;
  date: string;
  totalQuotedPrice: number;
  totalQuotedTravelTime: number;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const addBooking = (booking: Booking) => {
    const updated = [...bookings, booking];
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return { bookings, addBooking };
};
