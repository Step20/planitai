import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { collection, onSnapshot, query, where, or } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUser } from "./UserContext";
import type { ItineraryType } from "../constant/types";

type ItineraryContextType = {
  itineraries: ItineraryType[];
};

const ItineraryContext = createContext<ItineraryContextType | undefined>(
  undefined
);

export const ItineraryProvider = ({ children }: { children: ReactNode }) => {
  const { authUser } = useUser(); // Use authUser instead of userData
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);

  useEffect(() => {
    if (!authUser?.uid) return;

    const q = query(
      collection(db, "itineraries"),
      or(
        where("userId", "==", authUser.uid),
        where("sharedUsersId", "array-contains", authUser.uid)
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const trips: ItineraryType[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as ItineraryType),
        id: doc.id,
      }));
      setItineraries(trips);
    });

    return () => unsubscribe();
  }, [authUser?.uid]);

  return (
    <ItineraryContext.Provider value={{ itineraries }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItineraries = () => {
  const context = useContext(ItineraryContext);
  if (!context)
    throw new Error("useItineraries must be used within ItineraryProvider");
  return context;
};
