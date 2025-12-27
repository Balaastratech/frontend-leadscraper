import React, { useState } from "react";
import useSettings from "../../../features/settings/hooks/useSettings";
import SettingsHeader from "../../../ui/Settings/SettingsHeader";
import SettingsTable from "../../../ui/Settings/SettingsTable";
import { TextInput, PrimaryButton } from "../../../ui/Settings/SettingsControls";

export default function WebhooksPage() {
  const { webhooks = [], createWebhook, deleteWebhook, runTestWebhook } = useSettings();
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState("lead.created");

  const onCreate = () => {
    createWebhook({ url: url.trim(), events: events.split(",").map((e) => e.trim()) });
    setUrl("");
  };

  const columns = [
    { title: "URL", key: "url" },
    { title: "Events", render: (r) => r.events.join(", ") },
    {
      title: "",
      render: (r) => (
        <div className="space-x-3">
          <button className="text-indigo-600" onClick={() => runTestWebhook(r.id)}>Test</button>
          <button className="text-red-600" onClick={() => deleteWebhook(r.id)}>Delete</button>
        </div>
      )
    }
  ];

  return (
    <div>
      <SettingsHeader title="Webhooks" />

      <div className="space-y-2 mt-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Webhook URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Events (comma separated)"
          value={events}
          onChange={(e) => setEvents(e.target.value)}
        />
        <PrimaryButton onClick={onCreate}>Add Webhook</PrimaryButton>
      </div>

      <SettingsTable
        columns={columns}
        rows={webhooks.map((w) => ({ ...w, key: w.id }))}
        emptyMessage="No webhooks yet."
      />
    </div>
  );
}
