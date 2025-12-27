// src/components/HelpChatBubble.jsx
import React from "react";

/**
 * Floating chat bubble. Accessible and keyboard focusable.
 * Props:
 * - onOpen()
 * - unreadCount (optional)
 */
export default function HelpChatBubble({ onOpen, unread = 0 }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open help chat"
      className="fixed right-6 bottom-6 z-50 flex items-center gap-2 bg-indigo-600 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 3V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <span className="sr-only">Help</span>
      {unread > 0 && <span className="text-xs font-semibold bg-white text-indigo-600 px-2 py-0.5 rounded">{unread}</span>}
    </button>
  );
}
