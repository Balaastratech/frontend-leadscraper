// src/layouts/command-menu/CommandMenu.ui.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function CommandMenuUI({
  isOpen,
  onClose,
  query,
  setQuery,
  actions,
  index
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/20 z-[200] flex items-start justify-center pt-[10vh]"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="w-full max-w-xl bg-white rounded-xl shadow-xl border p-3"
        >
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command…"
            aria-label="Command input"
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />

          <div className="mt-2 max-h-80 overflow-y-auto">
            {actions.map((a, i) => (
              <button
                key={a.id}
                aria-label={a.label}
                onClick={() => {
                  a.run();
                  onClose();
                }}
                className={`w-full text-left px-2 py-2 rounded ${
                  i === index ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                {a.label}
              </button>
            ))}

            {actions.length === 0 && (
              <div className="text-sm text-gray-400 px-2 py-3">
                No matching commands.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default React.memo(CommandMenuUI);
