import { RiRoadMapLine } from "react-icons/ri";

export default function NavBar() {
  return (
    <div className="navbar z-99 bg-white sticky top-0 flex  px-6 justify-between">
      <div className="logo flex space-x-2 items-center">
        {/* <img src="/images/logo.png" alt="Logo" /> */}
        <RiRoadMapLine size={30} />
        <span className="text-xl font-bold">PlanIt</span>
      </div>
      <ul className="flex space-x-7 items-center">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">How It Works</a>
        </li>
        <li>
          <a href="/about">Explore Trips</a>
        </li>
        <li>
          <a href="/about">Pricing</a>
        </li>
        <li>
          <a href="/about">About Us</a>
        </li>
      </ul>
      <div className="flex auth gap-5 items-center">
        <p className="login font-semibold">Login</p>
        <button className="bg-indigo-600 font-semibold rounded-md px-3 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600">
          Sign Up
        </button>
      </div>
    </div>
  );
}
