// src/layouts/command-menu/actions.js
export const BASE_ACTIONS = (navigate) => [
  { id: "nav-dashboard", label: "Go to Dashboard", run: () => navigate("/app") },
  { id: "nav-leads", label: "Open Leads", run: () => navigate("/app/leads") },
  { id: "nav-pipeline", label: "Open Pipeline", run: () => navigate("/app/leads/pipeline") },
  { id: "nav-analytics", label: "Open Analytics", run: () => navigate("/app/analytics") },
  { id: "nav-ai", label: "Open AI Studio", run: () => navigate("/app/ai-studio") }
];

export const AI_ACTIONS = (navigate, dispatch, summarizeText) => [
  {
    id: "ai-summarize-clipboard",
    label: "AI: Summarize clipboard",
    run: async () => {
      let text = "";
      try {
        text = await navigator.clipboard.readText();
      } catch (_) {}

      if (text) {
        dispatch(summarizeText({ input: text }));
        navigate("/app/ai-studio");
      }
    }
  },
  {
    id: "ai-generate-snippet",
    label: "AI: Generate quick snippet",
    run: () => {
      const payload = "Generate a short outreach snippet for SaaS mid-market lead.";
      dispatch(summarizeText({ input: payload }));
      navigate("/app/ai-studio");
    }
  }
];
