import { FiGlobe, FiMap } from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const places = [
  {
    id: 1,
    name: "Colosseum",
    description:
      "Explore one of the greatest works of architecture and engineering.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
    rating: 4.5,
    website: "#",
    mapLink: "#",
  },
  {
    id: 2,
    name: "Colosseum",
    description:
      "Explore one of the greatest works of architecture and engineering.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
    rating: 2.5,
    website: "#",
    mapLink: "#",
  },
  {
    id: 3,
    name: "Colosseum",
    description:
      "Explore one of the greatest works of architecture and engineering.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
    rating: 3,
    website: "#",
    mapLink: "#",
  },
  {
    id: 4,
    name: "Colosseum",
    description:
      "Explore one of the greatest works of architecture and engineering.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
    rating: 3,
    website: "#",
    mapLink: "#",
  },
  {
    id: 5,
    name: "Colosseum",
    description:
      "Explore one of the greatest works of architecture and engineering.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
    rating: 3,
    website: "#",
    mapLink: "#",
  },
  {
    id: 6,
    name: "Colosseum",
    description:
      "Explore one of the greatest works of architecture and engineering.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
    rating: 3,
    website: "#",
    mapLink: "#",
  },
];

function PlaceCard({ place }) {
  return (
    <div className="bg-white rounded-xl  overflow-hidden shadow-md">
      <div className="relative h-48 group">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-3 right-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow transition-opacity opacity-0 group-hover:opacity-100">
          Pick Option
        </button>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg">{place.name}</h4>
        <p className="text-sm text-gray-600 mb-4">{place.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
            >
              <FiGlobe size={12} className="mr-1" />
              Website
            </a>
            <a
              href={place.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
            >
              <FiMap size={12} className="mr-1" />
              Map
            </a>
          </div>
          <div className="flex items-center space-x-1 text-black">
            {Array.from({ length: 5 }, (_, i) => {
              const isHalf = place.rating - i === 0.5;
              return i + 1 <= Math.floor(place.rating) ? (
                <FaStar size={12} key={i} />
              ) : isHalf ? (
                <FaStarHalfAlt size={12} key={i} />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlacesOfInterestSection() {
  return (
    <section className="mx-20 mt-10 mb-40">
      <h2 className="text-4xl font-black mb-10 text-center">
        Places of Interest
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
