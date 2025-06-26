// components/AuthModal.tsx
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
};

export default function AuthModal({
  isOpen,
  onClose,
  isLogin,
  setIsLogin,
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <AiOutlineClose size={22} />
        </button>
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Log In to PlanIt" : "Sign Up for PlanIt"}
        </h2>
        <form className="flex flex-col space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border border-gray-300 rounded-md"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-md py-2 font-semibold hover:bg-indigo-700 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-indigo-600 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-indigo-600 hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
