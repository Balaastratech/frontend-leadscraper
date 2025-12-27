// src/api/billing.js
// TODO: Replace with real Stripe endpoints:
//  POST /api/billing/checkout
//  GET  /api/billing/usage
//  GET  /api/billing/plans

import { wait } from "../../../api/utils";

export async function listPlans() {
  await wait(120);
  return {
    plans: [
      { id: "starter", name: "Starter", price: 19, credits: 500 },
      { id: "pro", name: "Pro", price: 49, credits: 2000 },
      { id: "scale", name: "Scale", price: 149, credits: 10000 },
    ]
  };
}

export async function createCheckout(planId) {
  await wait(200);
  return {
    checkoutUrl: "#mock-checkout-" + planId,
    sessionId: "sess_" + Date.now()
  };
}

export async function getUsage() {
  await wait(150);
  return {
    scrapingUsed: 342,
    scrapingLimit: 500,
    aiTokensUsed: 12832,
    aiTokensLimit: 20000,
  };
}
