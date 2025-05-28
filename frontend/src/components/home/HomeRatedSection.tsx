const destinations = [
  {
    label: "🏆 SUPERHOST",
    title: "Chic Soho Apartment",
    desc: "A stylish, modern apartment in the heart of Soho. Perfect for nightlife and dining enthusiasts.",
    image: "/img/soho.jpg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Historic Townhouse",
    desc: "Experience classic London charm in this beautifully restored townhouse with elegant interiors.",
    image: "/img/townhouse.jpg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Cosy Flat",
    desc: "A comfortable and cosy flat located in Covent Garden, close to theatres, shopping, and dining.",
    image: "/img/cosyflat.jpg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Contemporary Loft",
    desc: "A hip, open-plan loft with industrial decor and creative vibes in the vibrant district of Shoreditch.",
    image: "/img/loft.jpg",
  },
  {
    label: "🏆 SUPERHOST",
    title: "Riverfront Apartment",
    desc: "Enjoy spectacular Thames River views from this modern apartment near major attractions.",
    image: "/img/riverfront.jpg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Luxury Penthouse",
    desc: "This luxurious penthouse offers stunning city views, high-end furnishings, and proximity to designer boutiques.",
    image: "/img/penthouse.jpg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Family-Friendly Home",
    desc: "A welcoming home perfect for families, with a lovely garden and close to Portobello Market.",
    image: "/img/family.jpg",
  },
];

export default function HomeRatedSection() {
  return (
    <div className="home-rated-section px-10 py-20 pb-30 w-full bg-[#101010] p-6">
      <h2 className="pt-6 text-white font-black text-4xl mb-4">
        Top Rated Destinations
      </h2>
      <p className="text-gray-400 mb-6 w-5xl">
        Discover the most popular destinations among travelers and find your
        next adventure. It is a long established fact that a reader will be
        distracted by the readable content of a page when looking at its layout.
        The point of using Lorem Ipsum.
      </p>
      <button className="bg-white font-semibold rounded-md px-3 py-3 text-base text-black shadow-sm hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600">
        Show All -- Top Trip Itineraries
      </button>

      <div className="mt-17 grid grid-cols-3 grid-rows-3 gap-4">
        {/* Card 1 (Spans 2 rows) */}
        <Card data={destinations[0]} className="row-span-2 col-span-1" />
        {/* Card 2 */}
        <Card data={destinations[1]} className="row-span-1 col-span-1" />
        {/* Card 4 */}
        <Card data={destinations[3]} className="row-span-1 col-span-1" />
        {/* Card 3 */}
        <Card
          data={destinations[2]}
          className="row-span-1 col-start-2 col-span-1"
        />
        {/* Card 5 (Spans 2 rows) */}
        <Card
          data={destinations[4]}
          className="row-span-2 col-start-3 col-span-1"
        />
        {/* Card 6 */}
        <Card data={destinations[5]} className="row-span-1 col-span-1" />
        {/* Card 7 */}
        <Card data={destinations[6]} className="row-span-1 col-span-1" />
      </div>
    </div>
  );
}

function Card({ data, className = "" }) {
  return (
    <div
      className={`bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      <img
        src={data.image}
        alt={data.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <span className="inline-block mb-2 px-2 py-1 text-xs font-semibold rounded bg-white text-black">
          {data.label}
        </span>
        <h3 className="text-white text-lg font-bold mb-1">{data.title}</h3>
        <p className="text-gray-400 text-sm">{data.desc}</p>
      </div>
    </div>
  );
}
