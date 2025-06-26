import { RiRoadMapLine } from "react-icons/ri";
import NavBar from "../components/nav/NavBar";

export default function MobilePage() {
  return (
    <div className="">
      <NavBar />
      <div className="flex flex-col items-center justify-center h-150  bg-white text-sm">
        <a href="/" className="flex space-x-2 items-center mb-8">
          <RiRoadMapLine size={40} />
          <span className="text-4xl font-extrabold ml-2">PlanIt</span>
        </a>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Want a Mobile Version?
        </h1>
        <p className="mb-6 text-gray-600 text-base text-center max-w-md">
          Subscribe to our newsletter and be the first to know when our mobile
          app launches!
        </p>
        <form className="w-full max-w-md flex shadow-sm rounded-lg overflow-hidden bg-white">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border-gray-100 border  text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600 border text-white px-6 py-3 font-semibold transition"
          >
            Subscribe
          </button>
        </form>
        <footer className="mt-12 absolute bottom-3 pt-3 border-gray-200 border-t w-full text-[10px] text-gray-500 space-x-3 text-center">
          <span>© 2025, AVONStudiosAI, Inc.</span>
          <a href="#" className="hover:underline">
            User Agreement
          </a>
          <a href="#" className="hover:underline">
            Privacy Statement
          </a>
          <a href="#" className="hover:underline">
            Cookie Preferences
          </a>
          <a href="#" className="hover:underline">
            Do Not Share/Sell My Personal Information
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
        </footer>
      </div>
    </div>
  );
}
