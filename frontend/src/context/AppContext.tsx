// src/context/AppContext.tsx
import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { ItineraryProvider } from "./ItineraryContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <ItineraryProvider>{children}</ItineraryProvider>
    </UserProvider>
  );
};
