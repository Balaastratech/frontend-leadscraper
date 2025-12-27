import React, { useState } from "react";
import useSettings from "../../../features/settings/hooks/useSettings";
import SettingsTable from "../../../ui/Settings/SettingsTable";
import { ControlsRow, TextInput, PrimaryButton } from "../../../ui/Settings/SettingsControls";
import SettingsHeader from "../../../ui/Settings/SettingsHeader";

export default function ApiKeysPage() {
  const { apiKeys = [], createKey, deleteKey } = useSettings();
  const [label, setLabel] = useState("");

  const onCreate = () => {
    createKey(label);
    setLabel("");
  };

  const columns = [
    { title: "Label", key: "label" },
    { title: "Key", key: "value", tdClass: "font-mono text-xs" },
    {
      title: "",
      render: (r) => (
        <button className="text-red-600" onClick={() => deleteKey(r.id)}>
          Delete
        </button>
      )
    }
  ];

  return (
    <div>
      <SettingsHeader title="API Keys" />
      <ControlsRow className="mt-4">
        <TextInput value={label} onChange={setLabel} placeholder="Label" />
        <PrimaryButton onClick={onCreate}>Create Key</PrimaryButton>
      </ControlsRow>

      <SettingsTable
        columns={columns}
        rows={apiKeys.map((k) => ({ ...k, key: k.id }))}
        emptyMessage="No keys yet."
      />
    </div>
  );
}
