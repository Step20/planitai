import { useState, useRef, useEffect } from "react";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { FiShare2, FiDownload, FiTrash2 } from "react-icons/fi";

export default function MoreOptionsDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        className="text-white flex font-medium text-xs items-center gap-1 hover:underline"
        onMouseDown={(e) => {
          e.stopPropagation();
          setShowDropdown((v) => !v);
        }}
      >
        <IoEllipsisHorizontalCircleOutline size={22} /> More Options
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-99 py-2">
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left text-black px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <FiShare2 size={14} /> Share
          </button>
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left px-4 text-black py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <FiDownload size={14} /> Export
          </button>
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
          >
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
