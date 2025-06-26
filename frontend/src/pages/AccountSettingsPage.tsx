import { useEffect, useState } from "react";
import {
  FiUser,
  FiBell,
  FiCreditCard,
  FiLogOut,
  FiUpload,
} from "react-icons/fi";
import NavBar from "../components/nav/NavBar";
import { auth } from "../lib/firebase";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "account" | "notifications" | "billing" | "logout"
  >("account");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [changed, setChanged] = useState(false);
  const user = auth.currentUser;

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullname: user.displayName || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setChanged(true);
    setError("");
  };

  const validateFullName = (name: string) => /\w+\s+\w+/.test(name.trim());
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleSave = async () => {
    const errors = [];
    if (!validateFullName(form.fullname))
      errors.push("Full name must include first and last name.");
    if (!validateEmail(form.email))
      errors.push("Please enter a valid email address.");
    if (form.password && !validatePassword(form.password)) {
      errors.push(
        "Password must be 8+ chars, uppercase, lowercase, number & special char."
      );
    }

    if (errors.length > 0) {
      setError(errors.join(" "));
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (form.fullname !== user?.displayName) {
        await updateProfile(user!, { displayName: form.fullname });
      }

      if (form.email !== user?.email) {
        await updateEmail(user!, form.email);
      }

      if (form.password) {
        await updatePassword(user!, form.password);
      }

      setChanged(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-6 max-w-xl w-full mx-auto">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <div className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <input
                  type="text"
                  id="fullname"
                  value={form.fullname}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className={`peer w-full border px-3 pt-5 pb-2 rounded-sm placeholder-transparent focus:outline-none focus:ring-2 ${
                    error.toLowerCase().includes("name")
                      ? "border-red-500 ring-red-500"
                      : "border-gray-400 focus:border-indigo-600 ring-indigo-200"
                  }`}
                />
                <label
                  htmlFor="fullname"
                  className="absolute left-3 text-gray-500 transition-all duration-200 text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:top-2 peer-focus:text-xs"
                >
                  Full Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className={`peer w-full border px-3 pt-5 pb-2 rounded-sm placeholder-transparent focus:outline-none focus:ring-2 ${
                    error.toLowerCase().includes("email")
                      ? "border-red-500 ring-red-500"
                      : "border-gray-400 focus:border-indigo-600 ring-indigo-200"
                  }`}
                  placeholder="Email Address"
                  autoComplete="email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 text-gray-500 transition-all duration-200 text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:top-2 peer-focus:text-xs"
                >
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={handleInputChange}
                  className={`peer w-full border px-3 pt-5 pb-2 rounded-sm placeholder-transparent focus:outline-none focus:ring-2 ${
                    error.toLowerCase().includes("password")
                      ? "border-red-500 ring-red-500"
                      : "border-gray-400 focus:border-indigo-600 ring-indigo-200"
                  }`}
                  placeholder="New Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 text-gray-500 transition-all duration-200 text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:top-2 peer-focus:text-xs"
                >
                  New Password
                </label>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-xs">{error}</p>}

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={!changed || loading}
                className={`w-full px-4 py-2 rounded-md text-white font-medium flex items-center justify-center gap-2 transition ${
                  changed && !loading
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {loading && (
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4 max-w-xl w-full mx-auto">
            <h2 className="text-xl font-semibold">Notifications</h2>
            {[
              "Receive travel alerts",
              "Receive plan reminders",
              "Receive newsletter updates",
            ].map((label, i) => (
              <label key={i} className="flex items-center gap-3">
                <input type="checkbox" className="accent-indigo-600" />
                {label}
              </label>
            ))}
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Save Preferences
            </button>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6 max-w-xl w-full mx-auto">
            <h2 className="text-xl font-semibold">Billing & Plan</h2>
            <p className="text-sm">
              Current Plan: <strong>Free</strong>
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Upgrade to Pro
            </button>
            <hr className="my-6 border-gray-300 " />
            <h3 className="text-md font-semibold">Payment Method</h3>
            <p className="text-sm text-gray-600">No card on file</p>
            <button className="mt-2 text-sm underline text-indigo-600 hover:text-indigo-800">
              Add Payment Method
            </button>
          </div>
        );

      case "logout":
        return (
          <div className="space-y-6 max-w-xl w-full mx-auto">
            <h2 className="text-xl font-semibold">Log Out</h2>
            <p className="text-sm">You're currently signed in.</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Log Out
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex flex-col items-center min-h-screen bg-white py-10">
        <div className="flex w-full max-w-6xl  rounded-md overflow-hidden ">
          {/* Sidebar */}
          <aside className="w-64  p-6 border-r border-gray-200">
            <h1 className="text-lg font-bold mb-6">Settings</h1>
            <ul className="space-y-4 text-sm">
              <li
                onClick={() => setActiveTab("account")}
                className={`flex items-center gap-2 cursor-pointer hover:text-indigo-600 ${
                  activeTab === "account" ? "text-indigo-600 font-semibold" : ""
                }`}
              >
                <FiUser /> Account
              </li>
              <li
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-2 cursor-pointer hover:text-indigo-600 ${
                  activeTab === "notifications"
                    ? "text-indigo-600 font-semibold"
                    : ""
                }`}
              >
                <FiBell /> Notifications
              </li>
              <li
                onClick={() => setActiveTab("billing")}
                className={`flex items-center gap-2 cursor-pointer hover:text-indigo-600 ${
                  activeTab === "billing" ? "text-indigo-600 font-semibold" : ""
                }`}
              >
                <FiCreditCard /> Billing
              </li>
              <li
                onClick={() => setActiveTab("logout")}
                className={`flex items-center gap-2 cursor-pointer hover:text-red-500 ${
                  activeTab === "logout" ? "text-red-500 font-semibold" : ""
                }`}
              >
                <FiLogOut /> Log out
              </li>
            </ul>
            <div className="mt-16 space-y-1 text-xs text-gray-500">
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
              <br />
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 p-10">{renderContent()}</main>
        </div>

        {/* Footer */}
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
    </>
  );
}
