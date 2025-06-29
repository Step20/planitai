import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiMap,
  FiSettings,
  FiZap,
} from "react-icons/fi";
import { RiRoadMapLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useUser } from "../../context/UserContext";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { userData } = useUser(); // ✅ ONLY use userData
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
    navigate("/");
  };

  const isLoggedIn = !!userData;

  const navLinks = isLoggedIn
    ? [
        { href: "/", label: "Home" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/explore", label: "Explore Trips" },
        { href: "/dashboard", label: "Your Trips" },
        { href: "/pricing", label: "Pricing" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/explore", label: "Explore Trips" },
        { href: "/pricing", label: "Pricing" },
        { href: "/about", label: "About Us" },
      ];

  return (
    <div className="navbar z-50 bg-white sticky top-0 flex items-center justify-between px-6 py-3 shadow-sm">
      {/* Left: Logo */}
      <Link to="/" className="flex space-x-2 items-center">
        <RiRoadMapLine size={30} />
        <span className="text-xl font-bold">PlanIt</span>
      </Link>

      {/* Center: Navigation */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-7 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`text-sm ${
                  location.pathname === link.href ? "font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Auth/User Controls */}
      {!isLoggedIn ? (
        <div className="flex auth gap-5 items-center">
          <Link to="/signin" className="login font-semibold cursor-pointer">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-600 font-semibold rounded-md px-3 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="relative flex items-center gap-4" ref={dropdownRef}>
          <Link
            to="/pricing"
            className="border border-gray-300 text-sm hover:bg-gray-50 cursor-pointer px-3 py-1 rounded-full text-gray-700 flex items-center gap-1"
          >
            <FiZap /> {userData.tokens ?? 0} tokens
          </Link>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className="w-8 h-8 bg-blue-700 rounded-full" />
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                {userData.fullname || "User"}
              </span>
              <span className="text-xs text-gray-500">{userData.email}</span>
            </div>
            {showDropdown ? (
              <FiChevronUp className="ml-1" />
            ) : (
              <FiChevronDown className="ml-1" />
            )}
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-md shadow-md w-52 py-2 z-50">
              <Link
                to="/pricing"
                className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 font-semibold flex items-center gap-2"
              >
                <FiZap size={14} /> {userData.tokens ?? 0} Travel Tokens
              </Link>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiMap size={14} /> Itineraries
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiSettings size={14} /> Account
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiLogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
