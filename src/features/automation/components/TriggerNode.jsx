// src/components/automation/TriggerNode.jsx
import React from "react";
import Stack from "../../../ui/Layout/Stack";
import Title from "../../../ui/Typography/Title";
import Select from "../../../ui/Form/Select";

export default function TriggerNode({ node, onChange }) {
  if (!node) return null;

  const event = node.data.event || "lead.created";

  return (
    <Stack gap="2">
      <Title size="base">Trigger</Title>
      <Select
        value={event}
        onChange={(e) => onChange({ ...node, data: { ...node.data, event: e.target.value } })}
      >
        <option value="lead.created">lead.created</option>
        <option value="lead.updated">lead.updated</option>
        <option value="lead.converted">lead.converted</option>
        <option value="daily.schedule">daily.schedule</option>
      </Select>
    </Stack>
  );
}
