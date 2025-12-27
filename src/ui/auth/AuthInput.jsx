import React from "react";

export default function AuthInput({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm text-zinc-400 mb-1">{label}</label>
      )}
      <input
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
}
