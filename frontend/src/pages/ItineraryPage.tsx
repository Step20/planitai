import { useState } from "react";
import AccordionDay from "../components/itinerary/AccordionDay";
import NavBar from "../components/nav/NavBar";
import HomeFooterSection from "../components/home/HomeFooterSection";
import { FiEdit } from "react-icons/fi";

export default function Itinerary() {
  const [openDay, setOpenDay] = useState<number | null>(null);

  const itineraryData = [
    {
      day: "Day 1",
      summary: "Exploring Tokyo",
      description:
        "Start your adventure in Japan by exploring the vibrant city of Tokyo. Begin your day by visiting the iconic Tokyo Tower, where you can enjoy panoramic views of the city. Next, head to the bustling neighborhood of Shibuya, famous for its busy pedestrian crossing and trendy shops. Don't forget to take a family photo in front of the Hachiko Statue! For lunch, try some delicious sushi at Tsukiji Fish Market, one of the largest seafood markets in the world. Afterward, take a leisurely stroll through the beautiful gardens of the Imperial Palace, where you can enjoy the serene atmosphere and learn about Japan's history.",
      sections: [
        {
          title: "Available Flights",
          items: ["Hotel name", "Hotel name", "Hotel name"],
        },
        {
          title: "Hotel Recommendations",
          items: ["Hotel name", "Hotel name", "Hotel name"],
        },
        {
          title: "Activities & Food",
          items: ["Breakfast at here", "Temple Walk", "Dinner spot"],
        },
      ],
    },
    {
      day: "Day 2",
      summary: "Cultural Kyoto",
      description:
        "Start your second day in Japan by heading to the stunning city of Kyoto. Begin your day by visiting the iconic Tokyo Tower, where you can enjoy panoramic views of the city. Next, head to the bustling neighborhood of Shibuya, famous for its busy pedestrian crossing and trendy shops. Don't forget to take a family photo in front of the Hachiko Statue! For lunch, try some delicious sushi at Tsukiji Fish Market, one of the largest seafood markets in the world. Afterward, take a leisurely stroll through the beautiful gardens of the Imperial Palace, where you can enjoy the serene atmosphere and learn about Japan's history.",
      sections: [
        {
          title: "Activities & Food",
          items: ["Breakfast at here", "Temple Walk", "Dinner spot"],
        },
      ],
    },
    {
      day: "Day 3",
      summary: "Magical Osaka",
      description:
        "End your adventure in Japan by exploring the vibrant city of Osaka. Begin your day by visiting the iconic Tokyo Tower, where you can enjoy panoramic views of the city. Next, head to the bustling neighborhood of Shibuya, famous for its busy pedestrian crossing and trendy shops. Don't forget to take a family photo in front of the Hachiko Statue! For lunch, try some delicious sushi at Tsukiji Fish Market, one of the largest seafood markets in the world. Afterward, take a leisurely stroll through the beautiful gardens of the Imperial Palace, where you can enjoy the serene atmosphere and learn about Japan's history.",
      sections: [
        {
          title: "Activities & Food",
          items: ["Breakfast at here", "Temple Walk", "Dinner spot"],
        },
      ],
    },
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-70 w-[90%] mx-auto rounded-[20px] overflow-hidden">
          <img
            src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
            alt="Japan"
            className="w-full h-full object-cover"
          />
          <div className="absolute justify-center inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-center px-10">
            <div className="text-white ">
              <h1 className="text-4xl font-bold">3 day itinerary for Name</h1>
              <div className="mt-4 flex gap-2 justify-center items-center">
                <button className="bg-white/30 backdrop-blur-md border text-sm font-black border-white/10 shadow-md rounded-full h-7.5 w-7.5">
                  +
                </button>
                <button className="bg-white/30 backdrop-blur-md border text-sm border-white/10 shadow-md rounded-full px-4 py-1">
                  Family friendly
                </button>
                <button className="bg-white/30 backdrop-blur-md border text-sm border-white/10 shadow-md rounded-full px-4 py-1">
                  Total experience
                </button>
              </div>
            </div>
            <button className="absolute top-4 right-6 bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <FiEdit /> Edit Trip
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          {itineraryData.map((item, index) => (
            <AccordionDay
              key={index}
              day={item.day}
              summary={item.summary}
              description={item.description}
              sections={item.sections}
              isOpen={openDay === index}
              onToggle={() => setOpenDay(openDay === index ? null : index)}
            />
          ))}
        </div>
      </div>
      <HomeFooterSection />
    </>
  );
}
