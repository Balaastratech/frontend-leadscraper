import React, { useEffect } from "react";

export default function UndoToast({ message, onUndo, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-surface shadow-card p-lg rounded-md flex gap-md items-center">
      <span className="text-primary">{message}</span>

      <button
        aria-label="undo"
        onClick={() => {
          onUndo();
          onClose();
        }}
        className="px-sm py-xs bg-accent text-white rounded-md"
      >
        Undo
      </button>
    </div>
  );
}
