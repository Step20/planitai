import { FiGlobe, FiMap, FiTrash2 } from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import type { ItineraryDay } from "../../constant/types";
import { MdStars } from "react-icons/md";
import { useState } from "react";

export default function AccordionDay({
  item,
  isOpen,
  onToggle,
  onDelete,
}: {
  item: ItineraryDay;
  isOpen: boolean;
  onToggle: () => void;
  onDelete?: () => void;
}) {
  // For single-select sections, store selected index; for multi-select, store array of booleans
  const [selectedOptions, setSelectedOptions] = useState(
    item.selectedOptions.map((section) => {
      // Multi-select for "Activities & Food"
      if (section.categoryTitle?.toLowerCase().includes("activities") ?? "") {
        return section.options.map((opt) => !!opt.selected);
      }
      // Single-select for others
      const idx =
        section?.options.findIndex((opt) => opt.selected) !== -1
          ? section.options.findIndex((opt) => opt.selected)
          : 0;
      return idx;
    })
  );

  // Handler for selecting an option
  const onSelected = (sectionIdx: number, optionIdx: number) => {
    setSelectedOptions((prev) =>
      prev.map((sel, idx) => {
        if (idx !== sectionIdx) return sel;
        // Multi-select for "Activities & Food"
        if (
          item.selectedOptions[sectionIdx].categoryTitle
            .toLowerCase()
            .includes("activities")
        ) {
          const arr = Array.isArray(sel) ? [...sel] : [];
          arr[optionIdx] = !arr[optionIdx];
          return arr;
        }
        // Single-select for others: deselect if already selected
        // Use -1 to indicate "none selected" instead of false
        return sel === optionIdx ? -1 : optionIdx;
      })
    );
  };
  const itemChoice =
    item.selectedOptions.find((o) => o.categoryTitle === "Activities & Food")
      ?.options?.[2]?.images?.[1] ??
    "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg";
  return (
    <div className="mb-8 border-b  pb-10">
      <div
        className={`grid gap-6 ${
          isOpen
            ? "md:grid-cols-[1fr_4fr] grid-rows-[auto_auto]"
            : "grid-cols-[auto_1fr]"
        }`}
      >
        {/* Left column: image (spans 2 rows when open) */}
        <div
          onClick={onToggle}
          className={`${isOpen ? "row-span-2" : ""} cursor-pointer`}
        >
          <img
            src={itemChoice}
            alt="Day"
            className={`rounded-xl object-cover ${
              isOpen ? "w-60  h-full max-h-60" : "w-60 h-full max-h-60"
            }`}
          />
        </div>

        {/* Top right: day/summary/description */}
        <div>
          <button
            onClick={onToggle}
            className="w-full text-left relative group text-3xl font-bold flex justify-between items-center py-2 cursor-pointer"
          >
            <div>
              <div className="mb-2 flex flex-row items-center justify-between">
                <div>
                  {item?.title}: {item?.titleSummary}
                </div>
                {/* Show remove button only on hover of this section */}
                <div className="flex items-center">
                  {onDelete && (
                    <div
                      onClick={onDelete}
                      className="text-red-500 flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                      tabIndex={0}
                    >
                      <FiTrash2 size={14} /> Delete
                    </div>
                  )}
                </div>
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
                {item?.summary}
              </div>
            </div>
            <span className="text-lg">{isOpen ? "▲" : "▼"}</span>
          </button>
        </div>

        {/* Bottom right (sections content) */}
        {isOpen && (
          <div className="space-y-6 overflow-y-scroll max-h-130">
            {item?.selectedOptions.map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold mb-2">
                  {section?.categoryTitle}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section?.options.length === 0 ? (
                    <div className="text-gray-300 italic py-4">
                      No {section?.categoryTitle} found
                    </div>
                  ) : (
                    section?.options.map((option, j) => {
                      // Multi-select for "Activities & Food"
                      const isMulti = section?.categoryTitle
                        ?.toLowerCase()
                        .includes("activities");
                      const isSelected = isMulti
                        ? Array.isArray(selectedOptions[i]) &&
                          selectedOptions[i][j]
                        : selectedOptions[i] === j;
                      // console.log(option);
                      return (
                        <div key={j}>
                          <div className="relative h-40 rounded-xl overflow-hidden shadow-md group">
                            <img
                              src={
                                option?.images[1] ||
                                "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
                              }
                              className="w-full h-full object-cover cursor-pointer"
                              alt={option?.name}
                            />
                            <div className="absolute p-3 text-white flex flex-col justify-between"></div>
                            <button
                              className={`absolute cursor-pointer bottom-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow transition-opacity
    ${
      isSelected
        ? "bg-black text-white opacity-100"
        : "bg-white text-black opacity-0 group-hover:opacity-100"
    }`}
                              onClick={() => onSelected(i, j)}
                            >
                              {isSelected ? "Selected" : "Pick Option"}
                            </button>
                          </div>
                          <div className="flex flex-row items-center justify-between vertical-align-middle ">
                            <h4 className="font-semibold text-md mt-1">
                              {option.name}
                            </h4>
                            {option.apiTopRated && (
                              <div className="flex flex-row items-center gap-0.5 text-indigo-600">
                                <MdStars />
                                <p className="text-xs font-medium">Top Rated</p>
                              </div>
                            )}
                          </div>
                          <p className="text-xs">{option.description}</p>
                          <div className="flex items-center gap-2 mt-2 w-full max-w-full">
                            {/* Action buttons */}
                            <div className="flex gap-2 flex-wrap">
                              <a
                                href={option.websiteUrl}
                                target="_blank"
                                className="flex items-center border gap-1 border-gray-300 rounded-full px-2 py-1  text-xs text-gray-700 hover:bg-gray-100"
                                rel="noopener noreferrer"
                              >
                                <FiGlobe size={11} /> Website
                              </a>
                              <a
                                href={option.websiteUrl}
                                target="_blank"
                                className="flex items-center border gap-1 border-gray-300 rounded-full px-2 py-1  text-xs text-gray-700 hover:bg-gray-100"
                                rel="noopener noreferrer"
                              >
                                <FiMap size={11} /> Map
                              </a>
                            </div>
                            {/* Star rating */}
                            <div className="flex items-center space-x-1 ml-auto">
                              {Array.from({ length: 5 }, (_, idx) => {
                                const rating = option.rating ?? 0;
                                const isHalf = rating - idx === 0.5;
                                return idx + 1 <= Math.floor(rating) ? (
                                  <FaStar size={12} key={idx} />
                                ) : isHalf ? (
                                  <FaStarHalfAlt size={12} key={idx} />
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
