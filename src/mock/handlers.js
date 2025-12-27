import { http, HttpResponse } from "msw";
import * as authApi from "../features/auth/api/auth";
import * as aiApi from "../features/ai/api/ai";
import * as helpApi from "../features/help/api/helpdesk";
import { leadsDb } from "./db/leads.db";
import { pipelineDb } from "./db/pipeline.db";

function readBearerToken(req) {
  const header = req.headers.get("authorization") || "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

/**
 * MSW Handlers - Complete Backend Simulation
 *
 * Design Principles:
 * - All endpoints mirror real API contracts
 * - Query parameter parsing for filters, search, pagination
 * - Consistent error responses
 * - NO direct mock data imports in handlers
 * - Uses in-memory database instances
 */

export const handlers = [
  // ---------- AUTH ----------
  http.post("/api/auth/check-email", async ({ request }) => {
    const { email } = await request.json();
    try {
      const exists = await authApi.checkEmailExists(email);
      return HttpResponse.json({ exists }, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 500 });
    }
  }),

  http.post("/api/auth/start-signup", async ({ request }) => {
    const { email } = await request.json();
    try {
      const result = await authApi.startSignup(email);
      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      const status = err.message === "exists" ? 409 : 400;
      return HttpResponse.json({ error: String(err) }, { status });
    }
  }),

  http.post("/api/auth/verify-code", async ({ request }) => {
    const { email, code } = await request.json();
    try {
      const result = await authApi.verifySignupCode(email, code);
      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 400 });
    }
  }),

  http.post("/api/auth/create-account", async ({ request }) => {
    const { email, password } = await request.json();
    try {
      const result = await authApi.createAccount(email, password);
      return HttpResponse.json(result, { status: 201 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 400 });
    }
  }),

  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = await request.json();
    try {
      const result = await authApi.login(email, password);
      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      const status =
        err.message === "no_account"
          ? 404
          : err.message === "not_verified"
          ? 403
          : err.message === "bad_password"
          ? 401
          : 400;

      return HttpResponse.json({ error: String(err) }, { status });
    }
  }),

  http.post("/api/auth/reset-request", async ({ request }) => {
    const { email } = await request.json();
    try {
      const result = await authApi.resetRequest(email);
      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 400 });
    }
  }),

  http.post("/api/auth/reset-password", async ({ request }) => {
    const { token, newPassword } = await request.json();
    try {
      const result = await authApi.resetPassword(token, newPassword);
      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 400 });
    }
  }),

  http.get("/api/auth/me", ({ request }) => {
    const token = readBearerToken(request);
    if (!token) {
      return HttpResponse.json({ error: "unauthenticated" }, { status: 401 });
    }

    return HttpResponse.json(
      {
        user: {
          email: "user@example.com",
          name: "Mock User",
          role: "user",
          workspaces: ["w1"],
        },
      },
      { status: 200 }
    );
  }),

  // ---------- LEADS ----------
  http.get("/api/leads", async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.getAll("status"); // Multi-value
    const minScore = url.searchParams.get("minScore");
    const maxScore = url.searchParams.get("maxScore");
    const company = url.searchParams.get("company");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    try {
      const result = leadsDb.list({
        search,
        status: status.length > 0 ? status : undefined,
        minScore: minScore ? parseInt(minScore, 10) : undefined,
        maxScore: maxScore ? parseInt(maxScore, 10) : undefined,
        company,
        page,
        limit,
      });

      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json(
        { error: { message: String(err), code: "INTERNAL_ERROR" } },
        { status: 500 }
      );
    }
  }),

  http.get("/api/leads/:id", async ({ params }) => {
    try {
      const result = leadsDb.getById(params.id);
      if (result.error) {
        return HttpResponse.json(result, { status: 404 });
      }
      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json(
        { error: { message: String(err), code: "INTERNAL_ERROR" } },
        { status: 500 }
      );
    }
  }),

  http.post("/api/leads", async ({ request }) => {
    try {
      const payload = await request.json();
      const result = leadsDb.create(payload);
      return HttpResponse.json(result, { status: 201 });
    } catch (err) {
      return HttpResponse.json(
        { error: { message: String(err), code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }
  }),

  http.post("/api/leads/bulk-import", async ({ request }) => {
    try {
      // In real implementation, this would parse FormData with CSV
      // For mock, we accept JSON payload and simulate processing
      const payload = await request.json().catch(() => ({}));

      // Simulate async processing
      const processingTime = Math.random() * 1000 + 500; // 500-1500ms
      await new Promise((resolve) => setTimeout(resolve, processingTime));

      // Mock import result
      const importedCount = Math.floor(Math.random() * 20) + 5; // 5-25 leads
      const failedCount = Math.floor(Math.random() * 3); // 0-2 failures

      // Generate mock leads
      const importedLeads = Array.from({ length: importedCount }, (_, i) => ({
        id: `imported-${Date.now()}-${i}`,
        name: `Imported Lead ${i + 1}`,
        email: `lead${i}@imported.com`,
        company: "Imported Company",
        status: "new",
        score: Math.floor(Math.random() * 100),
        importedAt: new Date().toISOString(),
      }));

      // Add to database
      importedLeads.forEach((lead) => leadsDb.create(lead));

      return HttpResponse.json(
        {
          status: "completed",
          importedCount,
          failedCount,
          failed:
            failedCount > 0
              ? ["Row 2: Invalid email", "Row 5: Missing name"]
              : [],
        },
        { status: 200 }
      );
    } catch (err) {
      return HttpResponse.json(
        { error: { message: String(err), code: "IMPORT_ERROR" } },
        { status: 500 }
      );
    }
  }),

  http.patch("/api/leads/:id", async ({ params, request }) => {
    try {
      const payload = await request.json();
      const result = leadsDb.update(params.id, payload);

      if (result.error) {
        return HttpResponse.json(result, { status: 404 });
      }

      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json(
        { error: { message: String(err), code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }
  }),

  http.delete("/api/leads/:id", async ({ params }) => {
    try {
      const result = leadsDb.delete(params.id);

      if (result.error) {
        return HttpResponse.json(result, { status: 404 });
      }

      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json(
        { error: { message: String(err), code: "INTERNAL_ERROR" } },
        { status: 500 }
      );
    }
  }),


  // Bulk Update / Merge
  http.post("/api/leads/bulk-update", async ({ request }) => {
    try {
      const { ids, changes } = await request.json();
      ids.forEach((id) => leadsDb.update(id, changes));
      return HttpResponse.json({ success: true }, { status: 200 });
    } catch (err) {
      return HttpResponse.json(
        { error: { message: String(err), code: "BULK_UPDATE_ERROR" } },
        { status: 500 }
      );
    }
  }),

  // ---------- PIPELINE ----------
  http.get("/api/pipeline/stages", async () => {
    try {
      const result = pipelineDb.list();
      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json(
        { error: { message: String(err), code: "INTERNAL_ERROR" } },
        { status: 500 }
      );
    }
  }),

  // ---------- AI ----------
  http.post("/api/ai/summarize", async ({ request }) => {
    const { input, model } = await request.json().catch(() => ({}));
    try {
      const result = await aiApi.summarize(input, { model });
      return HttpResponse.json(result, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 500 });
    }
  }),

  http.post("/api/ai/complete", async ({ request }) => {
    const { prompt } = await request.json().catch(() => ({}));
    try {
      const res = await aiApi.summarize(prompt || "", {});
      return HttpResponse.json(
        { text: res.summary, usage: { tokens: res.tokensUsed } },
        { status: 200 }
      );
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 500 });
    }
  }),

  // ---------- HELP DESK ----------
  http.get("/api/help/conversations", async () => {
    try {
      const out = await helpApi.listConversations();
      return HttpResponse.json(out, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 500 });
    }
  }),

  http.get("/api/help/conversations/:id", async ({ params }) => {
    try {
      const out = await helpApi.getConversation(params.id);
      if (out.error) return HttpResponse.json(out, { status: 404 });
      return HttpResponse.json(out, { status: 200 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 500 });
    }
  }),

  http.post("/api/help/messages", async ({ request }) => {
    const payload = await request.json();
    try {
      const out = await helpApi.postMessage(payload);
      return HttpResponse.json(out, { status: 201 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 400 });
    }
  }),

  http.post("/api/help/attachments", async ({ request }) => {
    const payload = await request.json();
    try {
      const out = await helpApi.uploadAttachment(payload);
      return HttpResponse.json(out, { status: 201 });
    } catch (err) {
      return HttpResponse.json({ error: String(err) }, { status: 500 });
    }
  }),

  // ---------- FALLBACK ----------
  http.all("/api/*", ({ request }) => {
    console.warn(
      `[MSW] Unhandled API request: ${request.method} ${request.url}`
    );
    return HttpResponse.json(
      {
        error: { message: "Endpoint not implemented", code: "NOT_IMPLEMENTED" },
      },
      { status: 501 }
    );
  }),
];
