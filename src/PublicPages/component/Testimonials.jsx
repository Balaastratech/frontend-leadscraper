
import React from "react";
import { motion } from "framer-motion";

const data = [
  { name: "SaaS Founder", text: "We closed 3x faster in week one." },
  { name: "Growth Lead", text: "Lead quality improved instantly." },
  { name: "Indie Hacker", text: "Finally replaced 4 tools." },
];

export default function Testimonials() {
  return (
    <section className="py-xl bg-surface">
      <h2 className="text-center text-xl font-bold mb-lg">
        Trusted by builders
      </h2>

      <div className="grid md:grid-cols-3 gap-lg max-w-6xl mx-auto px-lg">
        {data.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="p-lg bg-bg rounded-md shadow-card"
          >
            <p className="mb-md text-secondary">“{t.text}”</p>
            <span className="text-sm font-medium">{t.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
