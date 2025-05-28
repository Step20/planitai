// components/TripCard.tsx
export default function TripCard() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white">
      <img
        src="https://source.unsplash.com/featured/?tokyo"
        alt="Tokyo"
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">Tokyo Adventure</h2>
        <p className="text-sm text-gray-500">3-Day Itinerary · June 2024</p>
        <div className="mt-3 flex justify-between text-sm">
          <button className="text-blue-500 hover:underline">Edit Trip</button>
          <button className="text-gray-400">More Options</button>
        </div>
      </div>
    </div>
  );
}
