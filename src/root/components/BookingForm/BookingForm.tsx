import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Company, Provider, Route } from "@/root/types/route-types/route-types";
import { SuccessIcon } from "@/root/ui";

interface BookingFormProps {
  selectedRoute: Route;
  selectedProvider: Provider;
  selectedCompany?: Company;
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
  selectedCompany,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onBook(firstName, lastName, selectedRoute, selectedProvider);
    setBookingSuccess(true);
  };

  const renderLabelValue = (label: string, value?: string) => (
    <p className="text-gray-700">
      <strong>{label}: </strong>
      {value || "N/A"}
    </p>
  );

  const nameFields = [
    {
      label: "First Name",
      value: firstName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFirstName(e.target.value),
    },
    {
      label: "Last Name",
      value: lastName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setLastName(e.target.value),
    },
  ];

  return (
    <div className="w-full max-w-sm mt-6">
      {bookingSuccess ? (
        <div className="w-full gap-10 flex flex-col items-center justify-center text-center">
          <SuccessIcon />
          <p className="text-green-700 text-xl w-full font-bold">
            Booking Successful
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white py-10 px-5 gap-3 text-center rounded shadow-md flex flex-col justify-center items-center"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-500">
            Book Your Travel
          </h2>
          <div className="mb-4">
            {renderLabelValue(
              "Departure",
              selectedProvider.displayFlightStart ||
                selectedProvider.flightStart,
            )}
            {renderLabelValue(
              "Arrival",
              selectedProvider.displayFlightEnd || selectedProvider.flightEnd,
            )}
          </div>
          <div className="w-full flex flex-col">
            {renderLabelValue("Departure", selectedProvider.origin)}
            {renderLabelValue("Destination", selectedProvider.destination)}
          </div>
          {renderLabelValue(
            "Travel time",
            `${selectedProvider.travelTime} hours`,
          )}
          {renderLabelValue(
            "Company",
            selectedCompany?.name || selectedProvider.company.name,
          )}
          <div className="flex flex-col w-full my-10 gap-6 border-b border-gray-400 h-60">
            {nameFields.map((field, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label className="block text-gray-700">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
          <p className="text-2xl font-semibold text-gray-700">
            Total: {selectedProvider.price} €
          </p>
          <button
            type="submit"
            className="w-full bg-blue-600 font-semibold text-lg text-white p-2 mt-10 rounded-md"
          >
            Book
          </button>
        </form>
      )}
    </div>
  );
};
