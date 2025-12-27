import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import InteractiveHeroBackground from "./component/InteractiveHeroBackground";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <InteractiveHeroBackground>
      <Navbar />

      <main className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              AI Lead Generation Engine
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Scrape, enrich, score, and close leads with one intelligent platform.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-cyan-400 text-black rounded-lg font-semibold text-sm sm:text-base hover:bg-cyan-300 active:scale-[0.98] transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </InteractiveHeroBackground>
  );
}
