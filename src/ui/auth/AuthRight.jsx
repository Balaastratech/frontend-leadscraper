import React from "react";

export default function AuthRight({ children }) {
  return (
    <div className="flex items-center justify-center p-10 bg-black">
      {children}
    </div>
  );
}
