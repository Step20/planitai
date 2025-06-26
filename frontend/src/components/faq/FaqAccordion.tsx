import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How does PlanIt work?",
    answer:
      "PlanIt uses AI to create personalized travel itineraries. Just enter your destination, travel dates, and preferences—our system will suggest flights, hotels, food spots, and activities for each day of your trip.",
  },
  {
    question: "What’s the difference between Free and Pro?",
    answer:
      "Free users can plan one trip at a time. Pro users unlock unlimited trips, advanced customization, offline access, and PDF exports. It’s perfect for frequent travelers or planners who need more flexibility.",
  },
  {
    question: "Which devices does it work on?",
    answer:
      "PlanIt works on all modern devices—phones, tablets, and desktops. You can access your plans from anywhere, and our responsive layout makes planning seamless across screen sizes.",
  },
  {
    question: "How is it different from other apps?",
    answer:
      "Most travel apps only handle one part of your trip. PlanIt combines everything—AI planning, editing, recommendations, and exporting—into one modern tool, so you can go from idea to itinerary in minutes.",
  },
];

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl text-black font-semibold text-center mb-10">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-gray-300">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full py-4 text-left"
            >
              <span className="text-lg font-medium text-black">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <FaChevronUp className="h-5 w-5 text-indigo-600" />
              ) : (
                <FaChevronDown className="h-5 w-5 text-indigo-600" />
              )}
            </button>
            {activeIndex === index && (
              <div className="py-3 text-black text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
