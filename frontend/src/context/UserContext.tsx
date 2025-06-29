// src/context/UserContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import type { UserType } from "../constant/types";

type UserContextType = {
  authUser: FirebaseUser | null;
  userData: UserType | null;
  loading: boolean;
  refreshUserData: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  authUser: null,
  userData: null,
  loading: true,
  refreshUserData: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Use ref to track if auth listener is already set up
  const authListenerSet = useRef(false);

  // 1. Load cached userData immediately on mount
  useEffect(() => {
    const cached = sessionStorage.getItem("userData");
    if (cached) {
      setUserData(JSON.parse(cached));
      setLoading(false); // Don't show loading if we have cached data
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!authUser) return;

    const docRef = doc(db, "users", authUser.uid);

    // Listen for real-time updates to the user document
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const newUserData = {
          id: authUser.uid,
          ...(snap.data() as Omit<UserType, "id">),
        };
        setUserData(newUserData);
        sessionStorage.setItem("userData", JSON.stringify(newUserData));
      } else {
        setUserData(null);
        sessionStorage.removeItem("userData");
      }
    });

    return () => unsubscribe();
  }, [authUser]);

  // Memoized function to fetch user data
  const fetchUserData = useCallback(async (firebaseUser: FirebaseUser) => {
    try {
      const docRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const newUserData = {
          id: firebaseUser.uid,
          ...(snap.data() as Omit<UserType, "id">),
        };
        setUserData(newUserData);
        sessionStorage.setItem("userData", JSON.stringify(newUserData));
        return newUserData;
      } else {
        setUserData(null);
        sessionStorage.removeItem("userData");
        return null;
      }
    } catch (err) {
      console.error("Error fetching user data", err);
      setUserData(null);
      sessionStorage.removeItem("userData");
      return null;
    }
  }, []);

  // Function to refresh user data (can be called from components)
  const refreshUserData = useCallback(async () => {
    if (authUser) {
      await fetchUserData(authUser);
    }
  }, [authUser, fetchUserData]);

  useEffect(() => {
    // Only set up the auth listener once
    if (authListenerSet.current) return;

    authListenerSet.current = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Only show loading on initial load, not on subsequent auth state changes
      if (initialLoad) {
        setLoading(true);
      }

      if (firebaseUser) {
        setAuthUser(firebaseUser);

        // Only fetch user data if we don't have it or if the user changed
        if (!userData || userData?.id !== firebaseUser.uid) {
          await fetchUserData(firebaseUser);
        }
      } else {
        setAuthUser(null);
        setUserData(null);
        sessionStorage.removeItem("userData");
      }

      if (initialLoad) {
        setLoading(false);
        setInitialLoad(false);
      }
    });

    return () => {
      unsubscribe();
      authListenerSet.current = false;
    };
  }, [userData, fetchUserData, initialLoad]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      authUser,
      userData,
      loading,
      refreshUserData,
    }),
    [authUser, userData, loading, refreshUserData]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
