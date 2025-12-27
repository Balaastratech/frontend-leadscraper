import React from "react";

export default function AuthCard({ children }) {
  return (
    <div className="w-full max-w-sm bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      {children}
    </div>
  );
}
