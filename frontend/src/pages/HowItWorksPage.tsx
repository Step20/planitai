import React from "react";
import NavBar from "../components/nav/NavBar";
import HomeFooterSection from "../components/home/HomeFooterSection";
import HomeNewsSection from "../components/home/HomeNewsSection";

export default function HowItWorksPage() {
  return (
    <>
      <NavBar />
      <section className="px-6 pt-20 pb-25 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 mb-20">
            <div className="flex-1 flex justify-center">
              <img
                src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
                alt="Hero Graphic"
                width={400}
                height={300}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Hours of planning, organized in a flash
              </h1>
              <p className="text-lg mb-6">
                Learn how quickly PlanIt can make sense of your travel plans and
                create a single itinerary for every trip.
              </p>
              <button className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded hover:bg-indigo-700 transition">
                Sign Up—It’s Free!
              </button>
            </div>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                Step 1: Forward your confirmation emails
              </h3>
              <p className="mb-3">
                As soon as you book a flight, hotel, car, or other reservation,
                simply forward it to plans@planit.com, and we'll automatically
                add it to your trip.
              </p>
              <a href="#" className="text-blue-600 underline">
                Copy email address
              </a>
            </div>
            <div className="flex-1">
              <img
                src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
                alt="Step 1"
                width={350}
                height={300}
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 mb-20">
            <div className="flex-1">
              <img
                src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
                alt="Step 2"
                width={350}
                height={300}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                Step 2: Get a comprehensive itinerary
              </h3>
              <p className="mb-3">
                Access your trip details on the go, when you need them most. You
                can easily send plans to your calendar or anyone you choose.
              </p>
              <a href="#" className="text-blue-600 underline">
                Learn all about using PlanIt
              </a>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                Step 3: Download the app
              </h3>
              <p className="mb-3">
                Whether you want your plans in your hand, on your wrist, or at
                your desk, PlanIt is available where you need it.
              </p>
              <a href="#" className="text-blue-600 underline">
                View your trips across devices
              </a>
            </div>
            <div className="flex-1">
              <img
                src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
                alt="Step 3"
                width={350}
                height={300}
              />
            </div>
          </div>

          {/* CTA */}
        </div>
      </section>
      <div className="text-center py-20 bg-zinc-100 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl text-black font-semibold text-center mb-3">
          Try PlanIt for your next trip
        </h2>
        <p className="mb-6 text-gray-700">
          Say farewell to the days of copying and pasting, or relying on your
          inbox to find what you need.
        </p>
        <button className="bg-indigo-600 text-lg text-white font-semibold py-2 px-6 rounded hover:bg-indigo-700 transition">
          Sign Up—It’s Free!
        </button>
      </div>
      <HomeNewsSection />
      <HomeFooterSection />
    </>
  );
}
