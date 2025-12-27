// declarative nav config. import icons here so consumer just maps.
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Boxes,
  Settings,
  Bot,
  CreditCard,
  Database,
  ListChecks,
  HelpCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const nav = [
    
  { to: "/app", icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { to: "/app/analytics", icon: BarChart2, label: "Analytics", id: "analytics" },

  {
    id: "leads",
    type: "group",
    label: "Leads",
    icon: Users,
    children: [
      { to: "/app/leads", icon: ListChecks, label: "List", id: "leads-list" },
      { to: "/app/leads/pipeline", icon: Boxes, label: "Pipeline", id: "leads-pipeline" },
    ],
  },

  { to: "/app/team", icon: Users, label: "Team", id: "team" },
  { to: "/app/automation", icon: Bot, label: "Automation", id: "automation" },
  { to: "/app/scraper", icon: Database, label: "Scraper", id: "scraper" },
  { to: "/app/ai-studio", icon: Sparkles, label: "AI Studio", id: "ai-studio" },
  { to: "/app/icp", icon: Boxes, label: "ICP", id: "icp" },
  { to: "/app/billing", icon: CreditCard, label: "Billing", id: "billing" },

  {
    id: "settings",
    type: "group",
    label: "Settings",
    icon: Settings,
    children: [
      { to: "/app/settings/api-keys", icon: Database, label: "API Keys", id: "settings-api" },
      { to: "/app/settings/webhooks", icon: Database, label: "Webhooks", id: "settings-webhooks" },
      { to: "/app/settings/smtp", icon: Database, label: "SMTP", id: "settings-smtp" },
    ],
  },

  { to: "/app/help", icon: HelpCircle, label: "Help", id: "help" },
];

export default nav;
