import { FC, PropsWithChildren } from "react";
import Link from "next/link";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <nav className="bg-gray-200 p-4">
        <ul className="flex justify-center text-xl font-semibold text-gray-700 space-x-12">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/bookings">Bookings</Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
};
