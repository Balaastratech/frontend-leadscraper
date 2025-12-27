import React from "react";
import MessageBubble from "../../../ui/Feedback/MessageBubble";

/**
 * Thin wrapper. Feature uses MessageBubble primitive for visuals.
 */
export default function ChatMessage({ msg }) {
  return (
    <MessageBubble from={msg.from} meta={{ timestamp: new Date(msg.createdAt).toLocaleString() }}>
      <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
      {msg.attachments && msg.attachments.length > 0 && (
        <div className="mt-2 space-y-1 text-xs">
          {msg.attachments.map((a) => (
            <a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="block text-indigo-700 underline">
              {a.name || a.url}
            </a>
          ))}
        </div>
      )}
    </MessageBubble>
  );
}
