import TripCard from "../components/dashboard/TripCard";
import HomeFooterSection from "../components/home/HomeFooterSection";
import NavBar from "../components/nav/NavBar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";

export default function DashboardPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto flex flex-col">
        <h1 className="text-4xl font-black text-center mb-6">Your Trips</h1>

        <div className="flex justify-center space-x-4 mb-6 flex-wrap gap-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-indigo-700 cursor-pointer">
            <FiPlusCircle className="w-4 h-4" /> Add a Trip
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm cursor-pointer">
            Upcoming Trips
          </button>
          <button className="border px-4 py-2 rounded-full text-sm cursor-pointer">
            Shared Trips
          </button>
          <button className="border px-4 py-2 rounded-full text-sm cursor-pointer">
            Past Trips
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <TripCard key={i} />
          ))}
        </div>

        <div className="mt-6 flex justify-end text-sm items-center gap-2 pr-2">
          <FaChevronLeft className="w-4 h-4 cursor-pointer" />
          <span>1 of 2 trips</span>
          <FaChevronRight className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
      <HomeFooterSection />
    </>
  );
}
