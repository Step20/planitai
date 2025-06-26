import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import type { ItineraryType } from "../../constant/types";

export default function TripCard({ trip }: { trip?: ItineraryType }) {
  const isActive = trip
    ? new Date(trip.checkIn) <= new Date() &&
      new Date(trip.checkOut) >= new Date()
    : false;

  const formatDate = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    const startStr = start.toLocaleDateString("en-US", options);
    const endDay = end.getDate();
    const year = end.getFullYear();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (start.getMonth() === end.getMonth()) {
      return `${startStr} – ${endDay}, ${year} (${diffDays} days)`;
    }
    const endStr = end.toLocaleDateString("en-US", options);
    return `${startStr} – ${endStr}, ${year} (${diffDays} days)`;
  };
  return (
    <div className="relative h-53 rounded-xl overflow-hidden shadow-md group">
      <img
        src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
        alt="Trip"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/50 to-transparent p-4 flex flex-col justify-between text-white">
        <div>
          <div className="flex flex-row justify-between items-center ">
            <h2 className="text-lg font-bold">Trip Name</h2>
            {isActive && (
              <p
                className="bg-white rounded-xl text-black text-xs flex items-center px-2 py-1 font-semibold transition 
    hover:bg-indigo-600 hover:text-white hover:shadow-lg cursor-pointer"
              >
                Active
              </p>
            )}
          </div>
          <p className="text-sm">{trip?.location}</p>
          <p className="text-xs mt-1">
            {formatDate(trip.checkIn, trip.checkOut)}
          </p>
        </div>
        <div className="flex gap-3 items-center text-xs">
          <button className="bg-white text-black px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium hover:bg-gray-200">
            <RiPencilFill size={20} /> Edit Trip
          </button>
          <button className="text-white flex font-medium text-xs items-center gap-1 hover:underline">
            <IoEllipsisHorizontalCircleOutline size={22} /> More Options
          </button>
        </div>
      </div>
    </div>
  );
}
