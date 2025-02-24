import { FC, FormEvent, useState } from "react";
import { Provider, Route } from "@/root/types/route-types/route-types";

interface BookingFormProps {
  selectedRoute: Route | null;
  selectedProvider: Provider | null;
  onBook: (
    firstName: string,
    lastName: string,
    route: Route,
    provider: Provider,
  ) => void;
}

export const BookingForm: FC<BookingFormProps> = ({
  selectedRoute,
  selectedProvider,
  onBook,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedRoute && selectedProvider) {
      onBook(firstName, lastName, selectedRoute, selectedProvider);
      setBookingSuccess(true);
    }
  };

  return (
    <div className="w-full max-w-sm mt-6">
      {bookingSuccess ? (
        <p className="text-green-700 text-xl font-bold">Booking Successful</p>
      ) : !selectedRoute || !selectedProvider ? (
        <p className="text-gray-700">Please select a route to book.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow-md"
        >
          <h2 className="text-2xl mb-4">Book Your Travel</h2>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Departure:</strong>{" "}
              {selectedProvider.displayFlightStart ||
                selectedProvider.flightStart}
            </p>
            <p className="text-gray-700">
              <strong>Arrival:</strong>{" "}
              {selectedProvider.displayFlightEnd || selectedProvider.flightEnd}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Book
          </button>
        </form>
      )}
    </div>
  );
};
