import React, { useEffect, useRef } from "react";

export default function InteractiveHeroBackground({ children }) {
  const bgRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // disable mouse effects on mobile

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      }

      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/src/public/assets/les.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(500px at var(--x) var(--y), rgba(0,255,255,0.12), transparent 45%)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
