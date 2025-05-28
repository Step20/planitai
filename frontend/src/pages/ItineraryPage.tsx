// pages/Itinerary.tsx
import { useState } from "react";
import AccordionDay from "../components/itinerary/AccordionDay";
import NavBar from "../components/nav/NavBar";

export default function Itinerary() {
  const [openDay, setOpenDay] = useState<number | null>(null);

  const itineraryData = [
    {
      day: "Day 1",
      summary: "Explore Tokyo",
      places: ["Tokyo Tower", "Sushi Market", "Hachiko"],
    },
    {
      day: "Day 2",
      summary: "Cultural Kyoto",
      places: ["Fushimi Shrine", "Tea Ceremony", "Bamboo Forest"],
    },
    {
      day: "Day 3",
      summary: "Magical Osaka",
      places: ["Dotonbori", "Osaka Castle", "Street Food"],
    },
  ];

  return (
    <>
      <NavBar />
      <div className="px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">3-Day Itinerary for Japan</h1>
        <p className="text-gray-500 mb-6">
          Based on your preferences and location
        </p>

        {itineraryData.map((item, index) => (
          <AccordionDay
            key={index}
            day={item.day}
            summary={item.summary}
            places={item.places}
            isOpen={openDay === index}
            onToggle={() => setOpenDay(openDay === index ? null : index)}
          />
        ))}
      </div>
    </>
  );
}
