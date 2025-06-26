import React, { useEffect, useRef, useState } from "react";
import { RiRoadMapLine } from "react-icons/ri";
import {
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiMap,
  FiSettings,
  FiZap,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useUser } from "../../context/UserContext"; // ✅ use context

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { authUser, userData, loading } = useUser(); // ✅ use context here
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
    navigate("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/explore", label: "Explore Trips" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
  ];

  const isLoggedIn = !!authUser;

  return (
    <div className="navbar z-50 bg-white sticky top-0 flex items-center justify-between px-6 py-3 shadow-sm">
      {/* Left: Logo */}
      <a href="/" className="flex space-x-2 items-center">
        <RiRoadMapLine size={30} />
        <span className="text-xl font-bold">PlanIt</span>
      </a>

      {/* Center: Nav Links */}
      {location.pathname !== "/dashboard" && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-7 items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm ${
                    location.pathname === link.href ? "font-semibold" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Auth section */}
      {!isLoggedIn ? (
        <div className="flex auth gap-5 items-center">
          <a href="/signin" className="login font-semibold cursor-pointer">
            Login
          </a>
          <a
            href="/signup"
            className="bg-indigo-600 font-semibold rounded-md px-3 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700"
          >
            Sign Up
          </a>
        </div>
      ) : (
        <div className="relative flex items-center gap-4" ref={dropdownRef}>
          <a
            href="/pricing"
            className="border border-gray-300 text-sm hover:bg-gray-50 cursor-pointer px-3 py-1 rounded-full text-gray-700 flex items-center gap-1"
          >
            <FiZap /> {userData?.tokens ?? 0} tokens
          </a>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className="w-8 h-8 bg-blue-700 rounded-full" />
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                {userData?.displayName || authUser?.displayName || "User"}
              </span>
              <span className="text-xs text-gray-500">
                {userData?.email || authUser?.email}
              </span>
            </div>
            {showDropdown ? (
              <FiChevronUp className="ml-1" />
            ) : (
              <FiChevronDown className="ml-1" />
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-md shadow-md w-52 py-2 z-50">
              <a
                href="/pricing"
                className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 font-semibold flex items-center gap-2"
              >
                <FiZap size={14} /> {userData?.tokens ?? 0} Travel Tokens
              </a>
              <a
                href="/dashboard"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiMap size={14} /> Itineraries
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiSettings size={14} /> Account
              </a>
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
