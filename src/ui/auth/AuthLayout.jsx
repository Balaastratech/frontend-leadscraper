import React from "react";

export default function AuthLayout({ left, right }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black text-white">
      {left}
      {right}
    </div>
  );
}
