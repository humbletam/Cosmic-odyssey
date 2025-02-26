import { FC } from "react";
import { useBookings } from "@/root/hooks";

export const Booking: FC = () => {
  const { bookings } = useBookings();

  if (bookings.length === 0) {
    return <p>No bookings available.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Bookings Page</h1>
      <table className="w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Route</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Travel Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index} className="text-center border">
              <td className="p-2 border">
                {b.firstName} {b.lastName}
              </td>
              <td className="p-2 border">{b.routeInfo}</td>
              <td className="p-2 border">{b.company}</td>
              <td className="p-2 border">{b.date}</td>
              <td className="p-2 border">{b.totalQuotedPrice} €</td>
              <td className="p-2 border">{b.totalQuotedTravelTime} hours</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
