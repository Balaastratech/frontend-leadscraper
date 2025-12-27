import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "../../../ui/Feedback/ChatBubble";
import Panel from "../../../ui/Layout/Panel";
import MessageBubble from "../../../ui/Feedback/MessageBubble";
import useHelpChat from "../hooks/useHelpChat";
import FileUpload from "../../../design/primitives/FileUpload";

export default function HelpChatPanel() {
  const { state, refs, ui, actions } = useHelpChat();
  const { conversations, current } = state;
  const { listRef } = refs;

  const {
    open,
    subject,
    setSubject,
    text,
    setText,
    attached,
    testMode,
    setTestMode,
  } = ui;

  const { onOpen, onClose, onSend, onUploaded, onSelectConv, clear } = actions;

  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <>
      <ChatBubble onClick={onOpen} unread={0} twin="bg-indigo-600 text-white" />

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Help center"
            className="fixed right-6 bottom-20 z-50 w-[92vw] sm:w-[780px] max-h-[82vh]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.18 }}
          >
            <div ref={panelRef} className="flex">
              <Panel className="flex-1 shadow-lg rounded-lg overflow-hidden flex bg-white">
                {/* Left column */}
                <div className="w-64 border-r p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold">Conversations</div>
                    <div className="text-xs text-gray-500">
                      {conversations.length}
                    </div>
                  </div>

                  <div className="space-y-2 overflow-auto max-h-[50vh]">
                    {conversations.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => onSelectConv(c.id)}
                        className="w-full text-left p-2 rounded hover:bg-white border"
                      >
                        <div className="text-sm font-medium">{c.subject}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(c.updatedAt).toLocaleString()}
                        </div>
                      </button>
                    ))}

                    {conversations.length === 0 && (
                      <div className="text-sm text-gray-500">
                        No conversations yet.
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <label className="text-xs text-gray-500">New subject</label>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full border p-2 rounded mt-1"
                      placeholder="Subject for new conversation"
                    />
                    <button
                      className="mt-2 px-3 py-2 bg-indigo-600 text-white rounded w-full"
                      onClick={() => setText("Hello, I need help regarding...")}
                    >
                      Start with template
                    </button>
                  </div>
                </div>

                {/* Right column */}
                <div className="flex-1 flex flex-col">
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="text-sm font-semibold">
                      {current ? current.subject : "New conversation"}
                    </div>
                    <div className="text-xs text-gray-500">Support (mock)</div>
                  </div>

                  <div
                    ref={listRef}
                    className="flex-1 p-3 overflow-auto bg-white space-y-3"
                  >
                    {current &&
                      current.messages &&
                      current.messages.map((m) => (
                        <MessageBubble
                          key={m.id}
                          from={m.from}
                          meta={{
                            timestamp: new Date(m.createdAt).toLocaleString(),
                          }}
                        >
                          <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>

                          {m.attachments && m.attachments.length > 0 && (
                            <div className="mt-2 space-y-1 text-xs">
                              {m.attachments.map((a) => (
                                <a
                                  key={a.id}
                                  href={a.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block text-indigo-700 underline"
                                >
                                  {a.name || a.url}
                                </a>
                              ))}
                            </div>
                          )}
                        </MessageBubble>
                      ))}

                    {!current && (
                      <div className="text-sm text-gray-500">
                        Select a conversation or start a new one.
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <FileUpload onUploaded={(meta) => onUploaded(meta)} />
                        <div className="text-xs text-gray-500">
                          {attached.length} attachment(s)
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={testMode}
                            onChange={(e) => setTestMode(e.target.checked)}
                          />
                          <span>Test mode</span>
                        </label>
                      </div>
                    </div>

                    {attached.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {attached.map((a) => (
                          <div
                            key={a.id}
                            className="px-2 py-1 border rounded bg-white text-xs"
                          >
                            {a.name}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={2}
                        className="flex-1 border rounded p-2"
                        placeholder="Write a message to support..."
                        aria-label="Support message"
                      />
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={onSend}
                          className="px-3 py-2 bg-indigo-600 text-white rounded"
                        >
                          Send
                        </button>
                        <button onClick={clear} className="px-3 py-2 border rounded">
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      File uploads are mocked. Agent replies are simulated.
                    </div>
                  </div>
                </div>
              </Panel>
            </div>

            <button
              onClick={onClose}
              aria-label="Close help panel"
              className="ml-3 mt-2 p-2 rounded bg-white border shadow"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
