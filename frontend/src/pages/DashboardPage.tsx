import TripCard from "../components/dashboard/TripCard";
import NavBar from "../components/nav/NavBar";

export default function DashboardPage() {
  return (
    <>
      <NavBar />
      <div className="px-6 py-5 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Trips</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <TripCard key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
