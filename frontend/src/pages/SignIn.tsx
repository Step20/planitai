import { RiRoadMapLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let errors = [];

    if (!validateEmail(form.email)) {
      errors.push("Please enter a valid email address.");
    }
    if (!validatePassword(form.password)) {
      errors.push(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
    }

    if (errors.length > 0) {
      setError(errors.join(" "));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setError("");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-sm">
      <a href="/" className="flex space-x-2 items-center mb-10">
        <RiRoadMapLine size={36} />
        <span className="text-4xl font-bold ml-2">PlanIt</span>
      </a>

      <form className="w-[350px] space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className={`peer w-full border px-3 pt-5 pb-2 rounded-sm placeholder-transparent focus:outline-none focus:ring-2 ${
              error && error.toLowerCase().includes("email")
                ? "border-red-500 ring-red-500"
                : "border-gray-400 focus:border-indigo-600 ring-indigo-200"
            }`}
            placeholder="Email Address"
            required
            autoComplete="email"
          />
          <label
            htmlFor="email"
            className="absolute left-3 text-gray-500 transition-all duration-200 text-xs top-2 
              peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:top-2 peer-focus:text-xs"
          >
            Email Address
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={form.password}
            onChange={handleChange}
            className={`peer w-full border px-3 pt-5 pb-2 pr-10 rounded-sm placeholder-transparent focus:outline-none focus:ring-2 ${
              error && error.toLowerCase().includes("password")
                ? "border-red-500 ring-red-500"
                : "border-gray-400 focus:border-indigo-600 ring-indigo-200"
            }`}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
          <label
            htmlFor="password"
            className="absolute left-3 text-gray-500 transition-all duration-200 text-xs top-2 
              peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:top-2 peer-focus:text-xs"
          >
            Password
          </label>
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-xs">{error}</p>}

        <div className="flex justify-between items-center text-xs">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Keep me signed in.</span>
          </label>
          <a
            href="/forgot"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-sm font-semibold"
        >
          Sign In
        </button>

        <div className="text-center text-gray-500 text-sm">
          Or sign in with:
        </div>

        <button
          type="button"
          className="w-full border border-gray-200 py-2 rounded-sm flex items-center justify-center space-x-3 hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="font-semibold text-indigo-600 hover:underline"
        >
          Create one.
        </a>
      </p>

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
  );
}
