import React, { useState } from "react";
import NavBar from "../components/nav/NavBar";
import HomeFooterSection from "../components/home/HomeFooterSection";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust path as needed
import Modal from "../components/common/Modal"; // replace with your modal

export default function ExploreTripsPage() {
  const { authUser } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    travelers: "",
    budget: "",
    personalize: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) {
      setShowModal(true);
      return;
    }

    setLoading(true);

    const newTrip = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...formData,
    };

    try {
      const userRef = doc(db, "users", authUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const prevTrips = userData.itinerary || [];

        await updateDoc(userRef, {
          itinerary: [...prevTrips, newTrip],
        });

        navigate("/itinerary");
      } else {
        console.error("User document not found.");
      }
    } catch (err) {
      console.error("Error creating trip:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-2">Please log in</h2>
            <p className="mb-4">You must be signed in to create a trip.</p>
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
        <div className="form-card w-200 mx-auto">
          <h1 className="font-black text-4xl mb-2 text-center">
            Plan Your Next Trip
          </h1>
          <p className="text-gray-500 w-170 mx-auto mb-5 text-center">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4.5 sm:grid-cols-6">
              {[
                {
                  id: "location",
                  label: "Location",
                  type: "text",
                  placeholder: "Enter your location",
                  className: "col-span-full",
                },
                {
                  id: "checkIn",
                  label: "Check In",
                  type: "date",
                  placeholder: "Add Date",
                  className: "sm:col-span-3",
                },
                {
                  id: "checkOut",
                  label: "Check Out",
                  type: "date",
                  placeholder: "Add Date",
                  className: "sm:col-span-3",
                },
                {
                  id: "travelers",
                  label: "Travelers",
                  type: "number",
                  placeholder: "Add number of travelers",
                  className: "sm:col-span-2",
                },
                {
                  id: "budget",
                  label: "Budget",
                  type: "number",
                  placeholder: "Add Budget",
                  className: "sm:col-span-2",
                },
                {
                  id: "personalize",
                  label: "Personalize",
                  type: "text",
                  placeholder: "Add personality tag",
                  className: "sm:col-span-2",
                },
              ].map(({ id, label, type, placeholder, className }) => (
                <div key={id} className={className}>
                  <label htmlFor={id}>{label}</label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    required
                    value={(formData as any)[id] || ""}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-3 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-2 focus:outline-indigo-600"
            >
              {loading ? "Creating..." : "Get Started — Plan your Trip"}
            </button>
          </form>
        </div>
      </section>

      <div className="text-center py-20 bg-zinc-100 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl text-black font-semibold text-center mb-3">
          Download the PlanIt app
        </h2>
        <p className="mb-6 text-gray-700 w-170 mx-auto">
          Whether you want your plans in your hand, on your wrist, or at your
          desk, PlanIt is available right where you need it.
        </p>
        <button className="bg-indigo-600 text-lg text-white font-semibold py-2 px-6 rounded hover:bg-indigo-700 transition">
          Join Now — It’s Free!
        </button>
      </div>

      <HomeFooterSection />
    </>
  );
}
