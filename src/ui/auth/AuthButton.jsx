import React from "react";

export default function AuthButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium mt-4"
    >
      {children}
    </button>
  );
}
