// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./PublicPages/LandingPage";
import PricingPage from "./PublicPages/PricingPage";
import DocsPage from "./PublicPages/DocsPage";

import LoginPage from "./features/auth/pages/LoginPage";
import PasswordResetPage from "./features/auth/pages/PasswordResetPage";
import PasswordResetConfirm from "./features/auth/pages/PasswordResetConfirm";
import PasswordResetEmailSent from "./features/auth/pages/PasswordResetEmailSent";
import OnboardingPage from "./features/auth/pages/OnboardingPage";
import SignupStepEmail from "./features/auth/pages/SignupStepEmail";
import SignupStepVerify from "./features/auth/pages/SignupStepVerify";
import SignupStepPassword from "./features/auth/pages/SignupStepPassword";
import SignupSuccess from "./features/auth/pages/SignupSuccess";

import LayoutShell from "./layouts/LayoutShell/LayoutShell";
import ProtectedRoute from "./routes/ProtectedRoute";

import DashboardPage from "./features/analytics/pages/DashboardPage";
import DashboardAnalyticsPage from "./features/analytics/pages/DashboardAnalyticsPage";

import LeadsListPage from "./features/leads/Lead-List/pages/LeadsListPage";
import LeadDetailPage from "./features/leads/LeadDetail/pages/LeadDetailPage"
import LeadPipelinePage from "./features/leads/lead-Pipeline/pages/LeadPipelinePage";

import ScraperPage from "./features/scraper/pages/ScraperPage";
import ScraperQueuePage from "./features/scraper/pages/ScraperQueuePage";
import ScraperJobPage from "./features/scraper/pages/ScraperJobPage";

import AIStudioPage from "./features/ai/pages/AIStudioPage";
import ICPPage from "./features/icp/pages/ICPPage";
import TeamPage from "./features/team/pages/TeamPage";
import BillingPage from "./features/billing/pages/BillingPage";

import SettingsPage from "./features/settings/pages/SettingsPage";
import ApiKeysPage from "./features/settings/pages/ApiKeysPage";
import WebhooksPage from "./features/settings/pages/WebhooksPage";
import SMTPPage from "./features/settings/pages/SMTPPage";

import AutomationListPage from "./features/automation/pages/AutomationListPage";
import AutomationEditorPage from "./features/automation/pages/AutomationEditorPage";
import AutomationRunLog from "./features/automation/pages/AutomationRunLog";

import HelpCenterPage from "./features/help/pages/HelpCenterPage";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/reset" element={<PasswordResetPage />} />
      <Route path="/reset/confirm" element={<PasswordResetConfirm />} />
      <Route path="/reset-email-sent" element={<PasswordResetEmailSent />} />

      <Route path="/signup" element={<SignupStepEmail />} />
      <Route path="/signup/verify" element={<SignupStepVerify />} />
      <Route path="/signup/password" element={<SignupStepPassword />} />
      <Route path="/signup/success" element={<SignupSuccess />} />

      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Protected /app */}
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <LayoutShell />
          </ProtectedRoute>
        }
      >
        {/* leads */}
        <Route path="leads" element={<LeadsListPage />} />
        <Route path="leads/:id" element={<LeadDetailPage />} />
        <Route path="leads/pipeline" element={<LeadPipelinePage />} />

        {/* scraper */}
        <Route path="scraper" element={<ScraperPage />} />
        <Route path="scraper/job/:jobId" element={<ScraperJobPage />} />
        <Route path="scraper/queue" element={<ScraperQueuePage />} />

        {/* ai + icp */}
        <Route path="ai-studio" element={<AIStudioPage />} />
        <Route path="icp" element={<ICPPage />} />

        {/* team + billing */}
        <Route path="team" element={<TeamPage />} />
        <Route path="billing" element={<BillingPage />} />

        {/* settings */}
        <Route path="settings" element={<SettingsPage />}>
          <Route path="api-keys" element={<ApiKeysPage />} />
          <Route path="webhooks" element={<WebhooksPage />} />
          <Route path="smtp" element={<SMTPPage />} />
        </Route>

        {/* automation */}
        <Route path="automation" element={<AutomationListPage />} />
        <Route path="automation/:id" element={<AutomationEditorPage />} />
        <Route path="automation/:id/runs" element={<AutomationRunLog />} />

        {/* help */}
        <Route path="help" element={<HelpCenterPage />} />

        {/* analytics */}
        <Route path="analytics" element={<DashboardAnalyticsPage />} />

        {/* default */}
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
