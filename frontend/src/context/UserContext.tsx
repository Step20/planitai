// src/context/UserContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import type { UserType } from "../constant/type";

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
        return newUserData;
      } else {
        setUserData(null);
        return null;
      }
    } catch (err) {
      console.error("Error fetching user data", err);
      setUserData(null);
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
        // Only update authUser if it's actually different
        setAuthUser((prevAuthUser) => {
          if (prevAuthUser?.uid !== firebaseUser.uid) {
            return firebaseUser;
          }
          return prevAuthUser;
        });

        // Only fetch user data if we don't have it or if the user changed
        if (!userData || userData.id !== firebaseUser.uid) {
          await fetchUserData(firebaseUser);
        }
      } else {
        setAuthUser(null);
        setUserData(null);
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
  const contextValue = {
    authUser,
    userData,
    loading,
    refreshUserData,
  };

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
