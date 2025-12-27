// src/components/automation/ConditionNode.jsx
import React from "react";
import Stack from "../../../ui/Layout/Stack";
import Grid from "../../../ui/Layout/Grid";
import Title from "../../../ui/Typography/Title";
import Select from "../../../ui/Form/Select";
import Input from "../../../ui/Form/Input";

export default function ConditionNode({ node, onChange }) {
  if (!node) return null;

  const { field = "score", op = ">", value = "" } = node.data || {};

  const update = (data) => onChange({ ...node, data: { ...node.data, ...data } });

  return (
    <Stack gap="2">
      <Title size="base">Condition</Title>

      <Grid cols="3" gap="2">
        <Select value={field} onChange={(e) => update({ field: e.target.value })}>
          <option value="score">Score</option>
          <option value="company">Company</option>
          <option value="email">Email</option>
        </Select>

        <Select value={op} onChange={(e) => update({ op: e.target.value })}>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value="=">=</option>
          <option value="contains">contains</option>
        </Select>

        <Input placeholder="value" value={value} onChange={(e) => update({ value: e.target.value })} />
      </Grid>
    </Stack>
  );
}
