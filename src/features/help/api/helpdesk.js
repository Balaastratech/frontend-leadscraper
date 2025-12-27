// src/api/helpdesk.js
// Mock help & support agent backend
// TODO: Replace with real support backend (Intercom/Front) or server-side agent proxy.
// Endpoints expected:
//  POST /api/help/messages         -> { message, id, createdAt }
//  GET  /api/help/conversations   -> { conversations: [...] }
//  POST /api/help/attachments     -> { id, url, name }
//  POST /api/help/agent/respond   -> { reply }

// This mock stores conversations in-memory and simulates an AI/human hybrid agent.
// It supports file attachments (mocked URLs) and streaming-like typing delays.

import { wait } from "../../../api/utils";

let conversations = [
  {
    id: "c1",
    subject: "Welcome conversation (mock)",
    messages: [
      { id: "m1", from: "agent", text: "Hi there. This is a mock support agent. How can I help?", createdAt: new Date().toISOString(), attachments: [] }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let attachments = [];

function nextId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 999)}`;
}

/**
 * Post a user message to a conversation (or create new)
 * Returns the saved message. Also schedules an agent reply (mock) after a small delay.
 */
export async function postMessage({ conversationId = null, subject = "Support", from = "user", text = "", files = [] }) {
  await wait(150);

  const msg = {
    id: nextId("m"),
    from,
    text,
    attachments: files || [],
    createdAt: new Date().toISOString()
  };

  let conv;
  if (conversationId) {
    conv = conversations.find((c) => c.id === conversationId);
    if (!conv) {
      throw { error: "conversation_not_found" };
    }
    conv.messages.push(msg);
    conv.updatedAt = new Date().toISOString();
  } else {
    conv = {
      id: nextId("c"),
      subject,
      messages: [msg],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    conversations.unshift(conv);
  }

  // Schedule a mocked agent response to simulate typing and file-aware replies
  scheduleAgentResponse(conv.id, msg);

  return { conversation: JSON.parse(JSON.stringify(conv)), message: JSON.parse(JSON.stringify(msg)) };
}

/**
 * List conversations (most recent first)
 */
export async function listConversations() {
  await wait(120);
  return { conversations: JSON.parse(JSON.stringify(conversations)) };
}

/**
 * Upload attachments (mock)
 */
export async function uploadAttachment({ name, blobSize = 0 }) {
  await wait(200 + Math.min(800, blobSize / 1000));
  const entry = {
    id: nextId("att"),
    name: name || "file.bin",
    url: `https://mock.cdn/${Math.random().toString(36).slice(2)}/${name || "file"}`,
    createdAt: new Date().toISOString()
  };
  attachments.unshift(entry);
  return { attachment: entry };
}

/**
 * Get conversation by id
 */
export async function getConversation(id) {
  await wait(120);
  const conv = conversations.find((c) => c.id === id);
  if (!conv) return { error: "not_found" };
  return { conversation: JSON.parse(JSON.stringify(conv)) };
}

/**
 * Simulate an agent response with delays and optional attachments
 * This pushes a reply into the conversation after a few timed updates.
 */
function scheduleAgentResponse(conversationId, userMessage) {
  // do not await
  (async () => {
    // 1) short delay to emulate typing start
    await wait(400 + Math.random() * 400);

    // 2) push a "typing" interim message (agent typing indicator)
    const typingNote = {
      id: nextId("m"),
      from: "agent",
      text: "(agent is typing...)",
      meta: { interim: true },
      createdAt: new Date().toISOString(),
      attachments: []
    };
    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return;
    conv.messages.push(typingNote);
    conv.updatedAt = new Date().toISOString();

    // 3) generate a reply content (mocked)
    await wait(700 + Math.random() * 900);

    // Remove interim typing note and replace with real reply
    const idx = conv.messages.findIndex((m) => m.id === typingNote.id);
    if (idx >= 0) conv.messages.splice(idx, 1);

    // Build a reply influenced by userMessage.text or subject
    const snippet = String(userMessage.text || userMessage.subject || "").slice(0, 200);
    const replyText = [
      `Agent (mock) reply — ${new Date().toLocaleTimeString()}:`,
      snippet ? `Thanks for the details: "${snippet}".` : "Thanks for reaching out.",
      "Here are a few suggestions:",
      "- Try checking your API key in Settings > API Keys.",
      "- If you attached files, we processed them (mock).",
      "If you want, you can request a transcript or escalate to human support."
    ].join("\n");

    const attachmentsForReply = [];
    // small chance to include a mock attachment (like a sample CSV) in agent reply
    if (Math.random() < 0.12) {
      const att = {
        id: nextId("att"),
        name: "sample-response.txt",
        url: `https://mock.cdn/sample-${Math.random().toString(36).slice(2)}.txt`,
        createdAt: new Date().toISOString()
      };
      attachments.unshift(att);
      attachmentsForReply.push(att);
    }

    const replyMsg = {
      id: nextId("m"),
      from: "agent",
      text: replyText,
      createdAt: new Date().toISOString(),
      attachments: attachmentsForReply
    };

    conv.messages.push(replyMsg);
    conv.updatedAt = new Date().toISOString();
  })();
}
