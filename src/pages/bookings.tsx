import { FC } from "react";
import { BookingPage } from "@/root/pages";
import { AppLayout } from "@/root/components";

const BookingsPage: FC = () => {
  return (
    <AppLayout>
      <BookingPage />
    </AppLayout>
  );
};

export default BookingsPage;
