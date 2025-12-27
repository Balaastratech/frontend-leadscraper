import React, { useState } from "react";
import Navbar from "./component/Navbar";
import InteractiveHeroBackground from "./component/InteractiveHeroBackground";
import { docsSections } from "./docs/docsContent";

export default function DocsPage() {
  const [active, setActive] = useState(docsSections[0].title);
  const current = docsSections.find((s) => s.title === active);

  return (
    <InteractiveHeroBackground>
      <Navbar />

      <main className="relative z-10 pt-24 pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
          
          {/* LEFT SIDEBAR CARD */}
          <aside className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 h-fit">
            <h3 className="text-xs uppercase tracking-wide text-gray-300 mb-4">
              Documentation
            </h3>

            <ul className="space-y-1">
              {docsSections.map((s) => (
                <li key={s.title}>
                  <button
                    onClick={() => setActive(s.title)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                      active === s.title
                        ? "bg-cyan-400 text-black"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* RIGHT DETAIL CARD — SAME DESIGN */}
          <section className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 md:p-8">
            
            {/* CARD HEADER (MATCHES SIDEBAR STYLE) */}
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-semibold text-white">
                {current.title}
              </h1>
              <div className="mt-2 h-px bg-white/20" />
            </div>

            {/* CARD CONTENT */}
            <ul className="list-disc ml-5 space-y-3 text-gray-300 text-sm md:text-base">
              {current.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

        </div>
      </main>
    </InteractiveHeroBackground>
  );
}
