import React from "react";

export default function AuthHeading({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      {subtitle && (
        <p className="text-zinc-400 text-sm leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
