import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import type { ItineraryType } from "../../constant/types";
import { useNavigate } from "react-router-dom";
import MoreOptionsDropdown from "../common/MoreOptionButton";

export default function TripCard({ trip }: { trip?: ItineraryType }) {
  const navigate = useNavigate();

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

  const tripDays = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days;
  };
  return (
    <div className="relative h-53 rounded-xl shadow-md group bg-white">
      {/* Wrap the image only */}
      <div className="rounded-xl overflow-hidden">
        <img
          src={
            trip?.image ??
            "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
          }
          alt="Trip"
          className="object-cover w-full h-53"
        />
      </div>

      {/* Content over image */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/95 via-black/30 to-transparent p-4 flex flex-col justify-between text-white">
        <div>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg font-bold">
              {trip?.title
                ? trip?.title
                : trip?.checkIn && trip?.checkOut && trip.location
                ? `${
                    tripDays(trip.checkIn, trip.checkOut) ??
                    (trip.days?.length || "")
                  } Days in ${trip.location.name}`
                : trip?.days?.length
                ? `${trip?.days.length} Days`
                : "Itinerary"}
            </h2>
            {isActive && (
              <p className="bg-white rounded-xl text-black text-xs flex items-center px-2 py-1 font-semibold  hover:shadow-lg">
                Currently Active
              </p>
            )}
          </div>
          <p className="text-sm">{trip?.location.name}</p>
          <p className="text-xs mt-1">
            {formatDate(trip?.checkIn, trip?.checkOut)}
          </p>
        </div>

        <div className="flex gap-3 items-center text-xs z-20 relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/itinerary/${trip?.id}`);
            }}
            className="bg-white text-black px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium hover:bg-gray-200"
          >
            <RiPencilFill size={20} /> Edit Trip
          </button>
          <MoreOptionsDropdown />
        </div>
      </div>
    </div>
  );
}
