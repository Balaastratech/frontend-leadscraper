// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/store/authSlice";
import uiReducer from "./uiSlice";
import shortcutsReducer from "./shortcutsSlice";

import leadsReducer from "../features/leads/store/leadsSlice";
import scraperReducer from "../features/scraper/store/scraperSlice";
import enrichmentReducer from "../features/enrichment/store/enrichmentSlice";

import aiReducer from "../features/ai/store/aiSlice";
import icpReducer from "../features/icp/store/icpSlice";
import teamReducer from "../features/team/store/teamSlice";
import billingReducer from "../features/billing/store/billingSlice";
import settingsReducer from "../features/settings/store/settingsSlice";
import automationReducer from "../features/automation/store/automationSlice";
import helpReducer from "../features/help/store/helpSlice";
import analyticsReducer from "../features/analytics/store/analyticsSlice";

import sidebarReducer from "../layouts/SideNav/store/sidebarSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    shortcuts: shortcutsReducer,

    leads: leadsReducer,
    scraper: scraperReducer,
    enrichment: enrichmentReducer,

    ai: aiReducer,
    icp: icpReducer,
    team: teamReducer,
    billing: billingReducer,
    settings: settingsReducer,
    automation: automationReducer,
    help: helpReducer,
    analytics: analyticsReducer,

    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["ui/showToast"],
        ignoredActionPaths: ["payload.undoCallback"],
        ignoredPaths: ["ui.toast.undoCallback"],
      },
    }),
});
