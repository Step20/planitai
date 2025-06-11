import React from "react";

const destinations = [
  {
    label: "🏆 SUPERHOST",
    title: "Chic Soho Apartment",
    desc: "A stylish, modern apartment in the heart of Soho. Perfect for nightlife and dining enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1624204386084-dd8c05e32226?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Historic Townhouse",
    desc: "Experience classic London charm in this beautifully restored townhouse with elegant interiors.",
    image: "https://www.leveragere.com/assets/137159.jpg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Cosy Flat",
    desc: "A comfortable and cosy flat located in Covent Garden, close to theatres, shopping, and dining.",
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Contemporary Loft",
    desc: "A hip, open-plan loft with industrial decor and creative vibes in the vibrant district of Shoreditch.",
    image:
      "https://amazingarchitecture.com/storage/files/1/architecture-firms/sarah-habib-designs/loft-in-the-woods/05-loft-in-the-woods-%20sarah-habib-designs.jpg",
  },
  {
    label: "🏆 SUPERHOST",
    title: "Riverfront Apartment",
    desc: "Enjoy spectacular Thames River views from this modern apartment near major attractions.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Luxury Penthouse",
    desc: "This luxurious penthouse offers stunning city views, high-end furnishings, and proximity to designer boutiques.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
  },
  {
    label: "🌟 GUEST FAVORITE",
    title: "Family-Friendly Home",
    desc: "A welcoming home perfect for families, with a lovely garden and close to Portobello Market.",
    image:
      "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",
  },
];

type CardProps = {
  data: (typeof destinations)[0];
  className?: string;
};

function Card({ data, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden flex flex-col ${className} group cursor-pointer`}
    >
      <div className="relative h-full rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${data.image})` }}
        />
        <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded z-10">
          {data.label}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-white font-bold text-lg mb-1">{data.title}</h3>
        <p className="text-gray-400 text-sm">{data.desc}</p>
      </div>
    </div>
  );
}

export default function HomeRatedSection() {
  return (
    <div className="px-6 py-16 bg-[#101010] h-full w-full">
      <h2 className="text-4xl font-black text-white mb-4">
        Top Rated Destinations
      </h2>
      <p className="text-gray-400 mb-6 max-w-3xl">
        Discover the most popular destinations among travelers and find your
        next adventure. It is a long established fact that a reader will be
        distracted by the readable content of a page when looking at its layout.
      </p>
      <button className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-indigo-700 hover:text-white transition mb-12">
        Show All — Top Trip Itineraries
      </button>

      <div className="grid grid-cols-3 gap-4">
        <Card data={destinations[0]} className="row-span-2 h-[780px]" />
        {/* 1 - tall */}
        <Card data={destinations[1]} className="h-[380px]" /> {/* 2 */}
        <Card data={destinations[2]} className="h-[380px]" /> {/* 3 */}
        <Card data={destinations[3]} className="h-[380px]" /> {/* 4 */}
        <Card data={destinations[4]} className="row-span-2 h-[780px]" />
        {/* 5 - tall */}
        <Card data={destinations[5]} className="h-[380px]" /> {/* 6 */}
        <Card data={destinations[6]} className="h-[380px]" /> {/* 7 */}
      </div>
    </div>
  );
}
