import React, { useState, useEffect } from "react";
import useSettings from "../../../features/settings/hooks/useSettings";
import SettingsHeader from "../../../ui/Settings/SettingsHeader";
import { ControlsRow, TextInput, PrimaryButton, GhostButton } from "../../../ui/Settings/SettingsControls";

export default function SMTPPage() {
  const { smtp, saveSmtpConfig, runTestSmtp, testResult } = useSettings();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (smtp) setForm(smtp);
  }, [smtp]);

  if (!form) return <div>Loading SMTP…</div>;

  const fields = ["host", "port", "user", "pass", "from"];

  return (
    <div>
      <SettingsHeader title="SMTP Settings" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {fields.map((f) => (
          <TextInputWrapper
            key={f}
            name={f}
            value={form[f]}
            onChange={(v) => setForm({ ...form, [f]: v })}
          />
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <PrimaryButton onClick={() => saveSmtpConfig(form)}>Save</PrimaryButton>
        <GhostButton onClick={() => runTestSmtp()}>Test SMTP</GhostButton>
      </div>

      {testResult && (
        <div className="text-sm text-gray-600 mt-3">Test: {testResult.message}</div>
      )}
    </div>
  );
}

function TextInputWrapper({ name, value, onChange }) {
  return (
    <input
      className="border p-2 rounded"
      placeholder={name}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
