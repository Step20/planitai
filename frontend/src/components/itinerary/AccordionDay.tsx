import { FiPhone, FiGlobe, FiMap } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

type Section = {
  title: string;
  items: string[];
};

type AccordionDayProps = {
  day: string;
  summary: string;
  description: string;
  sections: Section[];
  isOpen: boolean;
  onToggle: () => void;
};

export default function AccordionDay({
  day,
  summary,
  description,
  sections,
  isOpen,
  onToggle,
}: AccordionDayProps) {
  return (
    <div className="mb-8 border-b pb-10">
      <div
        className={`grid gap-6 ${
          isOpen
            ? "md:grid-cols-[1fr_4fr] grid-rows-[auto_auto]"
            : "grid-cols-[auto_1fr]"
        }`}
      >
        {/* Left column: image (spans 2 rows when open) */}
        <div className={`${isOpen ? "row-span-2" : ""}`}>
          <img
            src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
            alt="Day"
            className={`rounded-xl shadow-md object-cover ${
              isOpen ? "w-60  h-full max-h-60" : "w-60 h-full max-h-60"
            }`}
          />
        </div>

        {/* Top right: day/summary/description */}
        <div>
          <button
            onClick={onToggle}
            className="w-full text-left text-3xl font-bold flex justify-between items-center py-2 cursor-pointer"
          >
            <div>
              <div className="mb-2">
                {day}: {summary}
              </div>
              <div
                className={`text-lg font-normal text-left ${
                  !isOpen ? "w-190 h-21 overflow-hidden text-ellipsis" : "w-210"
                }`}
                style={
                  !isOpen
                    ? {
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        whiteSpace: "normal",
                      }
                    : {}
                }
              >
                {description}
              </div>
            </div>
            <span className="text-lg">{isOpen ? "▲" : "▼"}</span>
          </button>
        </div>

        {/* Bottom right (sections content) */}
        {isOpen && (
          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((item, j) => (
                    <div key={j}>
                      <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
                        <img
                          src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
                          className="w-full h-full object-cover"
                          alt={item}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-3 text-white flex flex-col justify-between"></div>
                      </div>
                      <h4 className="font-semibold text-md mt-1">{item}</h4>
                      <p className="text-xs">
                        {item} It is a long established fact that a reader will
                        be distracted by the readable...
                      </p>
                      <div className="flex items-center gap-2 mt-2 w-full max-w-full">
                        {/* Action buttons */}
                        <div className="flex gap-2 flex-wrap">
                          {/* <button className="flex items-center border gap-1 border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">
                            <FiPhone /> phone
                          </button> */}
                          <button className="flex items-center border gap-1 border-gray-300 rounded-full px-2 py-1  text-xs text-gray-700 hover:bg-gray-100">
                            <FiGlobe size={11} /> Website
                          </button>
                          {/* <button className="flex items-center border gap-1 border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">
                            <FaTicketAlt /> tickets
                          </button> */}
                          <button className="flex items-center border gap-1 border-gray-300 rounded-full px-2 py-1 text-xs text-gray-700 hover:bg-gray-100">
                            <FiMap size={11} /> Map
                          </button>
                        </div>
                        {/* Star rating */}
                        <div className="flex items-center ml-auto">
                          <FaStar size={12} className="text-black" />
                          <FaStar size={12} className="text-black" />
                          <FaStar size={12} className="text-black" />
                          <FaStar size={12} className="text-black" />
                          <FaStarHalfAlt size={11} className="text-black" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
