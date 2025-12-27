// src/api/settings.js
// TODO: Replace with:
//  GET /api/settings
//  PATCH /api/settings
//  POST /api/settings/api-keys
//  POST /api/settings/webhooks/test
//  POST /api/settings/smtp/test

import { wait } from "../../../api/utils";

let settings = {
  apiKeys: [
    { id: "k1", label: "Primary Key", value: "sk_live_mock_123", createdAt: new Date().toISOString() }
  ],
  webhooks: [
    { id: "w1", url: "https://example.com/webhook", events: ["lead.created"], createdAt: new Date().toISOString() }
  ],
  smtp: {
    host: "smtp.mailtrap.io",
    port: 2525,
    user: "demo",
    pass: "demo-pass",
    from: "noreply@example.com"
  }
};

export async function getSettings() {
  await wait(150);
  return JSON.parse(JSON.stringify(settings));
}

export async function createApiKey(label) {
  await wait(150);
  const k = {
    id: "k" + Date.now(),
    label,
    value: "sk_live_mock_" + Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString()
  };
  settings.apiKeys.push(k);
  return { key: k };
}

export async function deleteApiKey(id) {
  await wait(120);
  settings.apiKeys = settings.apiKeys.filter((k) => k.id !== id);
  return { ok: true };
}

export async function saveWebhook(payload) {
  await wait(150);
  const entry = { ...payload, id: "w" + Date.now(), createdAt: new Date().toISOString() };
  settings.webhooks.push(entry);
  return { webhook: entry };
}

export async function deleteWebhook(id) {
  await wait(120);
  settings.webhooks = settings.webhooks.filter((w) => w.id !== id);
  return { ok: true };
}

export async function saveSmtp(payload) {
  await wait(200);
  settings.smtp = payload;
  return { smtp: settings.smtp };
}

export async function testSmtp() {
  await wait(300);
  return { ok: true, message: "SMTP test successful (mock)" };
}

export async function testWebhook(id) {
  await wait(200);
  return { ok: true, message: "Webhook delivered successfully (mock)" };
}
