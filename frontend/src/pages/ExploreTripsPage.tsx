import React, { useState } from "react";

import HomeFooterSection from "../components/home/HomeFooterSection";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Modal from "../components/common/Modal";
import Select from "react-select";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import type { ItineraryType } from "../constant/types";
import useOnclickOutside from "react-cool-onclickoutside";
import { getIataCode } from "../lib/api/getIataCode";
import { generateTripSummary } from "../lib/gpt/gpt";
import { formatTripPrompt } from "../lib/gpt/formatTripPrompt";
import { fetchPlaces } from "../lib/api/fetchPlaces";

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

export default function ExploreTripsPage() {
  const { authUser } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tagValue, setTagValue] = useState<string[]>([]);

  const [formData, setFormData] = useState<ItineraryType>({
    id: "",
    userId: "",
    title: "",
    location: {
      lat: 0,
      lng: 0,
      name: "",
    },
    startLocation: {
      lat: 0,
      lng: 0,
      name: "",
    },
    checkIn: "",
    checkOut: "",
    numOfTravelers: 0,
    budget: 0,
    personalizeTags: [],
    sharedUsersId: [],
    createdAt: "",
    updatedAt: "",
    days: [],
    createdType: "ai",
    isEditing: false,
    aiTokensUsed: 0,
    isPublic: false,
    placesOfInterest: [],
  });

  const loc = usePlacesAutocomplete({ debounce: 300 });
  const startLoc = usePlacesAutocomplete({ debounce: 300 });

  const handleLocationSelect = async (
    address: string,
    field: "location" | "startLocation",
    hook: typeof loc
  ) => {
    hook.setValue(address, false);
    hook.clearSuggestions();
    const geoResults = await getGeocode({ address });

    const place = geoResults?.[0];
    const name = place?.formatted_address || address;
    const lat = place?.geometry?.location?.lat?.().toString() || "";
    const lng = place?.geometry?.location?.lng?.().toString() || "";

    const iataCode = await getIataCode(name);

    const updated = {
      name,
      lat: lat,
      lng: lng,
      iataCode: iataCode || "",
    };

    console.log("Selected location:", updated);

    setFormData((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  // const handleCreate = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!authUser) return setShowModal(true);

  //   setLoading(true);

  //   const newTrip: ItineraryType = {
  //     ...formData,
  //     userId: authUser.uid,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //     personalizeTags: tagValue.map((t) => t.value),
  //   };

  //   try {
  //     // Add to itineraries collection
  //     const docRef = await addDoc(collection(db, "itineraries"), newTrip);
  //     navigate(`/itinerary/${docRef.id}`, {
  //       state: { trip: { ...newTrip, id: docRef.id } },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const tripDays = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days;
  };

  function markApiTopRated(options: any[]): any[] {
    if (!options || options.length === 0) return [];
    // Find the highest rating (if any)
    let topIdx = 0;
    let topRating =
      typeof options[0].rating === "number" ? options[0].rating : -Infinity;
    options.forEach((opt, idx) => {
      if (typeof opt.rating === "number" && opt.rating > topRating) {
        topRating = opt.rating;
        topIdx = idx;
      }
    });
    // If no ratings, just pick the first
    if (topRating === -Infinity) topIdx = 0;
    // Mark apiTopRated
    options = options.map((opt, idx) => ({
      ...opt,
      apiTopRated: idx === topIdx,
    }));
    // Move top-rated to first
    if (topIdx !== 0) {
      const top = options[topIdx];
      options.splice(topIdx, 1);
      options.unshift(top);
    }
    return options;
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) return setShowModal(true);
    setLoading(true);

    const userInput = {
      ...formData,
      personalizeTags: tagValue.map((t) => t.value),
      userId: authUser.uid,
    };

    try {
      // 1. Fetch API data
      const { apiOptions, apiPlacesOfInterest } = await fetchPlaces(userInput);

      // 2. Generate GPT prompt and get AI response
      const gptPrompt = formatTripPrompt(
        userInput,
        apiOptions,
        apiPlacesOfInterest
      );
      const gptResponse = await generateTripSummary(gptPrompt);
      const {
        title,
        days: aiDays = [],
        placesOfInterest: aiPOI = [],
      } = JSON.parse(gptResponse || "{}");
      console.log(aiDays, gptResponse);

      // 3. Merge AI and API data for days, and mark apiTopRated
      const days = apiOptions.map((apiDay, dayIdx) => {
        const aiDay = aiDays[dayIdx] || {};
        const selectedOptions = apiDay.categories.map((apiCat) => {
          const aiCat =
            (aiDay.selectedOptions || []).find(
              (c) =>
                c.categoryTitle &&
                c.categoryTitle.toLowerCase() ===
                  apiCat.categoryTitle.toLowerCase()
            ) || {};
          // Merge each option's description if present in AI
          let options = apiCat.options.map((apiOpt, optIdx) => ({
            ...apiOpt,
            description:
              aiCat.options?.[optIdx]?.description || apiOpt.description || "",
          }));
          // Mark and move apiTopRated
          options = markApiTopRated(options);
          return {
            categoryTitle: apiCat.categoryTitle,
            options,
          };
        });
        return {
          title: apiDay.day || `Day ${dayIdx + 1}`,
          titleSummary: aiDay.titleSummary || "",
          summary: aiDay.summary || "",
          selectedOptions,
        };
      });

      // 4. Merge AI and API data for placesOfInterest (always 6), mark apiTopRated
      let placesOfInterest = apiPlacesOfInterest
        .slice(0, 6)
        .map((apiPlace, idx) => ({
          ...apiPlace,
          description: aiPOI?.[idx]?.description || apiPlace.description || "",
        }));
      placesOfInterest = markApiTopRated(placesOfInterest);

      // 5. Pick trip image from activities & food category
      // 5. Pick trip image from activities & food category
      const allImages: string[] = [];
      days.forEach((day) => {
        day.selectedOptions.forEach((cat) => {
          if (
            cat.categoryTitle &&
            cat.categoryTitle.toLowerCase() === "activities & food"
          ) {
            cat.options.forEach((opt) => {
              if (Array.isArray(opt.images)) {
                opt.images.forEach((img) => {
                  if (
                    typeof img === "string" &&
                    img &&
                    !img.includes("placeholder")
                  ) {
                    allImages.push(img);
                  }
                });
              }
            });
          }
        });
      });

      const tripImage =
        allImages.length > 0
          ? allImages[Math.floor(Math.random() * allImages.length)]
          : "https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg";
      // console.log(allImages, days);

      // 6. Compose new trip object
      const newTrip: ItineraryType = {
        ...userInput,
        title:
          title ||
          `${tripDays(formData.checkIn, formData.checkOut)} Days in ${
            formData.location.name
          }`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdType: "ai",
        isEditing: false,
        aiTokensUsed: 1,
        days,
        placesOfInterest,
        image: tripImage,
      };

      // 7. Save to Firestore
      const docRef = await addDoc(collection(db, "itineraries"), newTrip);

      navigate(`/itinerary/${docRef.id}`, {
        state: {
          trip: { ...newTrip, id: docRef.id },
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const outsideRef = useOnclickOutside(() => {
    loc.clearSuggestions();
    startLoc.clearSuggestions();
  });

  const handlePreSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!authUser) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const renderAutoInput = (
    label: string,
    field: "location" | "startLocation",
    hook: typeof loc
  ) => {
    const currentValue = formData[field].name || hook.value;

    return (
      <div ref={outsideRef} className="sm:col-span-4 relative">
        <label className="block font-medium text-sm mb-1">
          {label}
          <span className="text-red-500">*</span>
        </label>
        <input
          id={field}
          type="text"
          required
          value={currentValue}
          onChange={(e) => {
            hook.setValue(e.target.value);
          }}
          placeholder={`Enter ${label}`}
          className="block w-full rounded-md px-3 py-3 text-sm border border-gray-300 focus:ring-2 focus:ring-indigo-600"
        />
        {hook.suggestions.status === "OK" && (
          <ul className="absolute bg-white border w-full z-20 mt-1 rounded shadow max-h-48 overflow-y-auto">
            {hook.suggestions.data.map((s) => (
              <li
                key={s.place_id}
                onClick={() => handleLocationSelect(s.description, field, hook)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {s.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-2">Please log in</h2>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={() => navigate("/signin")}
            >
              Go to Sign In
            </button>
          </div>
        </Modal>
      )}

      <section className="px-6 pt-20 pb-25 bg-white text-gray-900">
        <div className="form-card w-full max-w-3xl mx-auto">
          <h1 className="font-black text-4xl mb-2 text-center">
            Plan Your Next Trip
          </h1>
          <p className="text-gray-500 text-center mb-5">
            Let us help you build your perfect itinerary.
          </p>

          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-8">
              {renderAutoInput("Destination", "location", loc)}
              {renderAutoInput("Start Location", "startLocation", startLoc)}
              {["checkIn", "checkOut"].map((id) => (
                <div key={id} className="sm:col-span-4">
                  <label className="block font-medium text-sm mb-1">
                    {id === "checkIn" ? "Check In" : "Check Out"}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={id}
                    type="date"
                    value={(formData as any)[id]}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                  />
                </div>
              ))}
              {["numOfTravelers", "budget"].map((id) => (
                <div key={id} className="sm:col-span-2">
                  <label className="block font-medium text-sm mb-1">
                    {id === "numOfTravelers" ? "Travelers" : "Budget"}
                  </label>
                  <input
                    id={id}
                    type="number"
                    placeholder={`Enter ${
                      id === "numOfTravelers" ? "travelers" : "budget"
                    }`}
                    value={(formData as any)[id] || ""}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              ))}
              <div className="sm:col-span-4">
                <label className="block font-medium text-sm mb-1">
                  Personalize
                </label>
                <Select
                  isMulti
                  options={TAG_OPTIONS}
                  value={tagValue}
                  onChange={(v) => {
                    if (Array.isArray(v) && v.length <= 3) {
                      setTagValue(v);
                    }
                  }}
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
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={handlePreSubmit}
              disabled={loading}
              className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-white font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Get Started — Plan your Trip"}
            </button>
          </form>
        </div>
      </section>

      <div className="text-center py-20 bg-zinc-100 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-black">
          Download the PlanIt App
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          Whether you want your plans in your hand, on your wrist, or at your
          desk, PlanIt is available where you need it.
        </p>
        <button className="bg-indigo-600 text-white font-medium px-6 py-2 rounded hover:bg-indigo-700 transition">
          Join Now — It’s Free!
        </button>
      </div>

      <HomeFooterSection />
    </>
  );
}
