import { useEffect, useRef, useState, type CSSProperties } from "react";
import AccordionDay from "../components/itinerary/AccordionDay";

import HomeFooterSection from "../components/home/HomeFooterSection";
import { FiEdit } from "react-icons/fi";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { FiShare2, FiDownload, FiTrash2 } from "react-icons/fi";
import PlacesOfInterestSection from "../components/itinerary/PlacesOfInterestSection";
import { useParams, useLocation } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { type ItineraryDay, type ItineraryType } from "../constant/types";
import BarLoader from "react-spinners/BarLoader";
import Select from "react-select";
import { FiX } from "react-icons/fi";

const TAG_OPTIONS = [
  { value: "Foodie", label: "Foodie" },
  { value: "Nature", label: "Nature" },
  { value: "Luxury", label: "Luxury" },
  { value: "Budget", label: "Budget" },
  { value: "Family", label: "Family" },
  { value: "Romantic", label: "Romantic" },
  { value: "Adventure", label: "Adventure" },
  { value: "Culture", label: "Culture" },
  { value: "Beach", label: "Beach" },
  { value: "Nightlife", label: "Nightlife" },
];
const itineraryData: ItineraryDay[] = [
  {
    title: "Day 1",
    titleSummary: "Exploring Tokyo",
    summary:
      "Start your adventure in Japan by exploring the vibrant city of Tokyo. Begin your day by visiting the iconic Tokyo Tower, where you can enjoy panoramic views of the city. Next, head to the bustling neighborhood of Shibuya, famous for its busy pedestrian crossing and trendy shops. Don't forget to take a family photo in front of the Hachiko Statue! For lunch, try some delicious sushi at Tsukiji Fish Market, one of the largest seafood markets in the world. Afterward, take a leisurely stroll through the beautiful gardens of the Imperial Palace, where you can enjoy the serene atmosphere and learn about Japan's history.",
    selectedOptions: [
      {
        categoryTitle: "Available Flights",
        options: [
          {
            name: "Japan Airlines JL001",
            id: "flight1",
            description: "Direct flight from LAX to Tokyo Haneda",
            selected: true,
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            cost: 500,
            websiteUrl: "https://example.com/flight1",
            location: "Tokyo",
            rating: 4.5,
            reviewsCount: 1200,
            apiTopRated: true,
          },
          {
            name: "ANA NH105",
            id: "flight2",
            description: "Non-stop flight from SFO to Tokyo Narita",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80",
            cost: 520,
            websiteUrl: "https://example.com/flight2",
            location: "Tokyo",
            rating: 4.6,
            reviewsCount: 980,
          },
          {
            name: "Delta DL7",
            id: "flight3",
            description: "One-stop flight from JFK to Tokyo Haneda",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            cost: 480,
            websiteUrl: "https://example.com/flight3",
            location: "Tokyo",
            rating: 4.2,
            reviewsCount: 800,
          },
        ],
      },
      {
        categoryTitle: "Hotel Recommendations",
        options: [
          {
            name: "Park Hotel Tokyo",
            id: "hotel1",
            description: "Modern hotel with city views and great amenities.",
            selected: true,
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            cost: 200,
            websiteUrl: "https://example.com/hotel1",
            location: "Tokyo",
            rating: 4.7,
            reviewsCount: 2100,
            apiTopRated: true,
          },
          {
            name: "Shinjuku Granbell Hotel",
            id: "hotel2",
            description: "Trendy hotel in the heart of Shinjuku.",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80",
            cost: 180,
            websiteUrl: "https://example.com/hotel2",
            location: "Tokyo",
            rating: 4.5,
            reviewsCount: 1700,
          },
          {
            name: "The Tokyo Station Hotel",
            id: "hotel3",
            description: "Historic luxury hotel with classic charm.",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            cost: 250,
            websiteUrl: "https://example.com/hotel3",
            location: "Tokyo",
            rating: 4.8,
            reviewsCount: 900,
          },
        ],
      },
      {
        categoryTitle: "Activities & Food",
        options: [
          {
            name: "Tsukiji Fish Market Tour",
            id: "activity1",
            description: "Guided tour of Tokyo's famous fish market.",
            selected: true,
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            cost: 60,
            websiteUrl: "https://example.com/activity1",
            location: "Tokyo",
            rating: 4.9,
            reviewsCount: 300,
            apiTopRated: true,
          },
          {
            name: "Tokyo Tower Observation Deck",
            id: "activity2",
            description: "Enjoy panoramic city views from Tokyo Tower.",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80",
            cost: 30,
            websiteUrl: "https://example.com/activity2",
            location: "Tokyo",
            rating: 4.7,
            reviewsCount: 500,
          },
          {
            name: "Shibuya Food Crawl",
            id: "activity3",
            description: "Taste local delicacies in Shibuya.",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            cost: 45,
            websiteUrl: "https://example.com/activity3",
            location: "Tokyo",
            rating: 4.8,
            reviewsCount: 420,
          },
        ],
      },
    ],
  },
  {
    title: "Day 2",
    titleSummary: "Cultural Kyoto",
    summary:
      "Travel to Kyoto and immerse yourself in traditional Japanese culture. Visit the Fushimi Inari Shrine with its iconic torii gates, stroll through the Arashiyama Bamboo Grove, and enjoy a tea ceremony in Gion. Sample Kyoto's famous kaiseki cuisine for dinner.",
    selectedOptions: [
      {
        categoryTitle: "Activities & Food",
        options: [
          {
            name: "Fushimi Inari Shrine Tour",
            id: "activity4",
            description: "Guided tour of the famous torii gates.",
            selected: true,
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            cost: 40,
            websiteUrl: "https://example.com/activity4",
            location: "Kyoto",
            rating: 4.9,
            reviewsCount: 600,
          },
          {
            name: "Arashiyama Bamboo Grove Walk",
            id: "activity5",
            description: "Stroll through the scenic bamboo forest.",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80",
            cost: 0,
            websiteUrl: "https://example.com/activity5",
            location: "Kyoto",
            rating: 4.8,
            reviewsCount: 700,
          },
          {
            name: "Kaiseki Dinner Experience",
            id: "activity6",
            description: "Traditional multi-course Japanese dinner.",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            cost: 120,
            websiteUrl: "https://example.com/activity6",
            location: "Kyoto",
            rating: 4.7,
            reviewsCount: 400,
          },
        ],
      },
    ],
  },
  {
    title: "Day 3",
    titleSummary: "Magical Osaka",
    summary:
      "End your adventure in Japan by exploring the vibrant city of Osaka. Visit Osaka Castle, shop in the lively Dotonbori district, and enjoy street food at Kuromon Market. Experience the excitement of Universal Studios Japan.",
    selectedOptions: [
      {
        categoryTitle: "Activities & Food",
        options: [
          {
            name: "Osaka Castle Tour",
            id: "activity7",
            description: "Explore the historic Osaka Castle.",
            selected: true,
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            cost: 25,
            websiteUrl: "https://example.com/activity7",
            location: "Osaka",
            rating: 4.8,
            reviewsCount: 800,
          },
          {
            name: "Dotonbori Food Walk",
            id: "activity8",
            description: "Sample street food in Dotonbori.",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80",
            cost: 50,
            websiteUrl: "https://example.com/activity8",
            location: "Osaka",
            rating: 4.9,
            reviewsCount: 900,
          },
          {
            name: "Universal Studios Japan",
            id: "activity9",
            description: "Experience the excitement of Universal Studios.",
            selected: false,
            image:
              "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            cost: 80,
            websiteUrl: "https://example.com/activity9",
            location: "Osaka",
            rating: 4.7,
            reviewsCount: 1200,
          },
        ],
      },
    ],
  },
];

export default function Itinerary() {
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [trip, setTrip] = useState<ItineraryType | null>(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();
  const location = useLocation();
  const tripFromState = location.state?.trip;

  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [tagValue, setTagValue] = useState(
    (trip?.personalizeTags || []).map((tag) =>
      TAG_OPTIONS.find((opt) => opt.value === tag)
    )
  );
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  const override: CSSProperties = {
    display: "block",
    margin: " auto",
    top: "50%",
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTagDropdown(false);
      }
    }
    if (showTagDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTagDropdown]);

  // Sync tagValue to trip.personalizeTags
  useEffect(() => {
    if (!trip) return;
    setTrip((prev) =>
      prev
        ? {
            ...prev,
            personalizeTags: tagValue.map((t) => t.value),
          }
        : prev
    );
    // eslint-disable-next-line
  }, [tagValue]);

  const addPersonalizeTag = () => {
    if ((trip?.personalizeTags?.length ?? 0) >= 3) return;
    setShowTagDropdown(true);
  };

  const removeTag = (tagValueToRemove: string) => {
    setTagValue((prev) => prev.filter((t) => t.value !== tagValueToRemove));
  };

  const handleDayDelete = (dayIdx: number) => {
    setTrip((prev) =>
      prev
        ? {
            ...prev,
            days: prev.days.filter((_, idx) => idx !== dayIdx),
          }
        : prev
    );
  };

  const handleTripDelete = async () => {
    if (!trip?.id) return;
    try {
      await deleteDoc(doc(db, "itineraries", trip.id));
      // Optionally redirect or show a message
      window.location.href = "/dashboard"; // or use navigate("/")
    } catch (error) {
      alert("Failed to delete trip.");
      console.error(error);
    }
  };

  // Fetch trip from Firestore if not passed in state
  useEffect(() => {
    async function fetchTrip() {
      if (tripFromState) {
        setTrip({
          ...(tripFromState || {}),
        });
        setLoading(false);
        return;
      }
      if (!id) return;
      setLoading(true);
      const docRef = doc(db, "itineraries", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setTrip({
          ...(snap.data() as ItineraryType),
          id: snap.id,
        });
      } else {
        setTrip(null);
      }
      setLoading(false);
    }
    fetchTrip();
  }, [id, tripFromState]); // itineraryData is a constant and does not need to be a dependency

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  if (loading)
    return (
      <div className="h-screen bg-white w-full">
        <BarLoader
          color="#432dd7"
          aria-label="Loading Spinner"
          cssOverride={override}
          data-testid="loader"
        />
      </div>
    );
  if (!trip) return <div className="p-10 text-center">Trip not found.</div>;

  const tripDays = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days;
  };

  const addNewDay = () => {
    const newDay: ItineraryDay = {
      title: `Day ${trip.days.length + 1}`,
      titleSummary: "",
      summary: "",
      selectedOptions: [],
    };
    setTrip((prev) => {
      const days = [...(prev?.days || []), newDay];
      return { ...prev, days };
    });
  };

  return (
    <>
      <div className="min-h-screen bg-white ">
        {/* Hero */}
        <div className="relative h-70 w-[90%] rounded-[20px]  mx-auto  my-3">
          <div className="rounded-[20px]  overflow-hidden">
            <img
              src={trip.image}
              alt="Japan"
              className="w-full h-70 object-cover rounded-[20px]"
            />
          </div>
          <div className="absolute justify-center rounded-[20px] inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center px-10">
            <div className="text-white w-full absolute   items-center justify-center">
              <h1 className="text-4xl relative font-bold text-center text-white">
                {trip.title
                  ? trip.title
                  : trip.checkIn && trip.checkOut && trip.location
                  ? `${
                      tripDays(trip.checkIn, trip.checkOut) ??
                      (trip.days?.length || "")
                    } Days in ${trip.location.name}`
                  : trip.days?.length
                  ? `${trip.days.length} Days`
                  : "Itinerary"}
              </h1>
              <div className="mt-4 flex  gap-2 justify-center items-center  ">
                {(trip?.personalizeTags?.length ?? 0) < 3 && (
                  <button
                    onClick={addPersonalizeTag}
                    className="bg-white/30 backdrop-blur-md border text-sm font-black border-white/10 shadow-md rounded-full h-7.5 w-7.5 flex items-center justify-center"
                  >
                    +
                  </button>
                )}
                {trip?.personalizeTags?.map((tag, index) => (
                  <div
                    key={index}
                    className="relative group flex items-center justify-center transition-all duration-200"
                  >
                    <div className="relative flex items-center bg-white/30 backdrop-blur-md border border-white/10 text-sm text-white shadow-md rounded-full px-4 py-1 transition-all duration-300 group-hover:pr-9 cursor-pointer">
                      <span className="truncate max-w-[100px]">{tag}</span>

                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/10 hover:bg-white/20 rounded-full p-0.5 flex items-center justify-center"
                        onClick={() => removeTag(tag)}
                        tabIndex={-1}
                        type="button"
                        style={{ pointerEvents: "auto" }}
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {showTagDropdown && (
                  <div
                    ref={tagDropdownRef}
                    className="absolute  text-black top-25 z-50 bg-white border border-gray-200 rounded-md shadow-md w-64 p-2"
                  >
                    <Select
                      isMulti
                      options={TAG_OPTIONS}
                      value={tagValue}
                      onChange={(v) => {
                        if (Array.isArray(v) && v.length <= 3) {
                          setTagValue(v);
                        }
                      }}
                      closeMenuOnSelect={false}
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: "44px",
                          padding: "2px",
                          borderColor: "#d1d5db",
                          boxShadow: "none",
                          "&:hover": {
                            borderColor: "#6366f1",
                          },
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          maxHeight: "44px",
                          overflowX: "auto",
                          display: "flex",
                          flexWrap: "nowrap",
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: "#eef2ff",
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: "#4f46e5",
                          fontSize: "0.875rem",
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          color: "#4f46e5",
                          ":hover": {
                            backgroundColor: "#e0e7ff",
                            color: "#312e81",
                          },
                        }),
                      }}
                      placeholder="Add up to 3 tags"
                      menuPlacement="auto"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-6 gap-1 flex">
              <div className="relative inline-block">
                <button
                  className={`bg-indigo-600 rounded-full text-white flex font-medium text-xs items-center gap-1 hover:underline transition-all duration-300 ease-in-out overflow-hidden px-1 py-1 w-8 h-8 group cursor-pointer
        ${showDropdown ? "w-34" : "hover:w-34"}`}
                  style={{ minWidth: "2rem" }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setShowDropdown((v) => !v);
                  }}
                >
                  <span className="flex items-center justify-center w-8 h-8">
                    <IoEllipsisHorizontalCircleOutline size={22} />
                  </span>
                  <span
                    className={`whitespace-nowrap transition-opacity duration-300 ease-in-out
          ${
            showDropdown ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
                  >
                    More Options
                  </span>
                </button>

                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className={`absolute right-0 top-12 bg-white border border-gray-200 rounded-md shadow-md w-52 py-2 z-50 transition-opacity duration-200
            ${
              showDropdown
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
                  >
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FiShare2 size={14} /> Share
                    </button>
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FiDownload size={14} /> Export
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleTripDelete();
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
              <button className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <FiEdit /> Edit Trip
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          {trip?.days.map((item: ItineraryDay, index) => (
            <AccordionDay
              key={index}
              item={item}
              isOpen={openDay === index}
              onToggle={() => setOpenDay(openDay === index ? null : index)}
              onDelete={() => handleDayDelete(index)}
            />
          ))}
          <div onClick={() => addNewDay()} className="mt-8 text-center">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200">
              Add Another Day
            </button>
          </div>
        </div>
        <PlacesOfInterestSection poi={trip.placesOfInterest} />
      </div>
      <HomeFooterSection />
    </>
  );
}
