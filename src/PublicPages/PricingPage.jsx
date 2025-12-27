import React, { useState } from "react";
import Navbar from "./component/Navbar";
import InteractiveHeroBackground from "./component/InteractiveHeroBackground";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");
  const navigate = useNavigate();

  return (
    <InteractiveHeroBackground>
      <Navbar />

      <main className="relative z-10 pt-28 pb-24 px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>

          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Choose a plan that fits your growth stage.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex bg-white/10 backdrop-blur border border-white/20 rounded-lg p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 text-sm rounded-md ${
                billing === "monthly"
                  ? "bg-cyan-400 text-black"
                  : "text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-4 py-2 text-sm rounded-md ${
                billing === "yearly"
                  ? "bg-cyan-400 text-black"
                  : "text-white"
              }`}
            >
              Yearly <span className="opacity-70">(-20%)</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          className="
            max-w-5xl
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            lg:gap-8
          "
        >
          <PriceCard
            title="Starter"
            price={billing === "monthly" ? 19 : 15}
            description="For solo founders and early projects."
            features={[
              "Lead scraping",
              "AI summaries",
              "Basic lead scoring",
              "Community support",
            ]}
            onClick={() => navigate("/login")}
          />

          <PriceCard
            highlight
            title="Pro"
            price={billing === "monthly" ? 49 : 39}
            description="For serious growth and teams."
            features={[
              "Everything in Starter",
              "Automations",
              "Advanced scoring",
              "Priority support",
            ]}
            onClick={() => navigate("/login")}
          />
        </div>
      </main>
    </InteractiveHeroBackground>
  );
}

function PriceCard({
  title,
  price,
  description,
  features,
  highlight,
  onClick,
}) {
  return (
    <div
      className={`
        relative
        w-full
        max-w-md
        mx-auto
        rounded-xl
        border
        backdrop-blur
        p-6
        sm:p-8
        ${
          highlight
            ? "bg-cyan-400 text-black border-cyan-300"
            : "bg-white/10 text-white border-white/20"
        }
      `}
    >
      {/* Badge */}
      {highlight && (
        <span
          className="
            absolute
            -top-3
            left-1/2
            -translate-x-1/2
            bg-black
            text-white
            text-xs
            px-3
            py-1
            rounded-full
          "
        >
          Most Popular
        </span>
      )}

      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      <p
        className={`mb-4 text-sm ${
          highlight ? "opacity-80" : "text-gray-300"
        }`}
      >
        {description}
      </p>

      <div className="text-3xl sm:text-4xl font-bold mb-6">
        ${price}
        <span className="text-sm opacity-70"> /mo</span>
      </div>

      <ul className="space-y-3 mb-8 text-sm sm:text-base">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            ✓ {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className={`
          w-full
          py-3
          rounded-lg
          font-semibold
          transition
          ${
            highlight
              ? "bg-black text-white hover:bg-black/90"
              : "bg-cyan-400 text-black hover:bg-cyan-300"
          }
        `}
      >
        Get Started
      </button>
    </div>
  );
}
