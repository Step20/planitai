import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";

export default function TripCard() {
  return (
    <div className="relative h-53 rounded-xl overflow-hidden shadow-md group">
      <img
        src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
        alt="Trip"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/50 to-transparent p-4 flex flex-col justify-between text-white">
        <div>
          <h2 className="text-lg font-bold">Trip Name</h2>
          <p className="text-sm">Trip, Location</p>
          <p className="text-xs mt-1">May 1 – 10, 2025 (10 days)</p>
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
