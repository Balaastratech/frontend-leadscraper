import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";

export default function Navbar() {
  const { toggle, theme } = useTheme();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-lg py-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">
          AI Leads
        </Link>

        <div className="flex items-center gap-md text-white">
          <NavLink to="/docs">Docs</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>

          <button
            onClick={toggle}
            className="px-sm py-xs border border-white/30 rounded-md"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Link
            to="/login"
            className="px-md py-sm bg-cyan-400 text-black rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
