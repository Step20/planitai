import { RiRoadMapLine } from "react-icons/ri";

export default function Forgot() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-sm pb-10">
      {/* Logo */}
      <a href="/" className="flex space-x-2 items-center mb-10">
        <RiRoadMapLine size={36} />
        <span className="text-4xl font-bold ml-2">PlanIt</span>
      </a>

      {/* Forgot Form */}
      <form className="w-[350px] space-y-4">
        <p className="text-sm text-gray-600 text-center mb-2">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-400 px-3 py-2 rounded-sm"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-sm font-semibold"
        >
          Send Reset Link
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Remember your password?{" "}
        <a
          href="/signin"
          className="font-semibold text-indigo-600 hover:underline"
        >
          Sign in
        </a>
      </p>

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
  );
}
