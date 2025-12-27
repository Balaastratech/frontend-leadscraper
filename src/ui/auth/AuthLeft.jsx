import React from "react";
import leadImage from "../../public/assets/les.png"; // <— One global image

export default function AuthLeft() {
  return (
    <div className="hidden lg:block relative w-full h-full overflow-hidden">
      
      {/* Background image fills the entire left half */}
      <img
        src={leadImage}
        alt="Lead generation illustration"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for premium look */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Glow effect */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-[140px] rounded-full left-10 bottom-10" />
    </div>
  );
}
