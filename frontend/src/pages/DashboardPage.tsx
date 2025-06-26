import TripCard from "../components/dashboard/TripCard";
import HomeFooterSection from "../components/home/HomeFooterSection";
import NavBar from "../components/nav/NavBar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { type ItineraryType } from "../constant/types";
import { useUser } from "../context/UserContext";
import { BarLoader } from "react-spinners";

const EMPTY_WORDS = ["trip", "adventure", "escape", "thrill", "journey"];

export default function DashboardPage() {
  const { userData, loading: userLoading } = useUser();
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "shared">(
    "all"
  );
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (userData && Array.isArray(userData.itinerary)) {
      setItineraries(userData.itinerary as ItineraryType[]);
    }
  }, [userData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % EMPTY_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (userLoading)
    return (
      <div className="min-h-screen bg-white w-full">
        <BarLoader
          color="#432dd7"
          loading={userLoading}
          height={150}
          width={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  if (!userData)
    return (
      <div className="min-h-screen bg-white w-full">
        <BarLoader
          color="#432dd7"
          loading={userLoading}
          height={150}
          width={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  const today = new Date();
  const filtered = itineraries.filter((trip) => {
    const start = new Date(trip.checkIn);
    const end = new Date(trip.checkOut);

    switch (filter) {
      case "upcoming":
        return start >= today || (start <= today && end >= today);
      case "past":
        return end < today;
      case "shared":
        return trip.sharedUsersId?.includes(userData.id);
      default:
        return true;
    }
  });

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <>
      <NavBar />
      <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto flex flex-col">
        <h1 className="text-4xl font-black text-center mb-6">Your Trips</h1>

        <div className="flex justify-center mb-6 flex-wrap gap-1.5">
          <a href="/explore">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-indigo-700">
              <FiPlusCircle className="w-4 h-4" /> Create Trip
            </button>
          </a>
          {["all", "upcoming", "shared", "past"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f as any);
                setPage(1);
              }}
              className={`${
                filter === f
                  ? "bg-black text-white"
                  : "border border-gray-300 text-gray-700"
              } px-4 py-2 rounded-full text-sm`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} Trips
            </button>
          ))}
        </div>

        {userLoading ? (
          <BarLoader />
        ) : paginated.length === 0 ? (
          <div className="text-center mt-10 justify-center items-center flex flex-col">
            <p className="text-xl font-semibold mb-3 text-gray-600 italic">
              Create your next {EMPTY_WORDS[wordIndex]}... 🧭
            </p>

            <a href="/explore">
              <button className="bg-indigo-600 text-white px-5 py-2 flex justify-center items-center gap-1 rounded-full font-semibold hover:bg-indigo-700">
                <FiPlusCircle className="w-4 h-4" /> Create Trip
              </button>
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>

            <div className="mt-6 flex justify-end text-sm items-center gap-2 pr-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
      <HomeFooterSection />
    </>
  );
}
