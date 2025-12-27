// src/components/automation/RuleCard.jsx
import React from "react";
import Card from "../../../ui/Surface/Card";
import Stack from "../../../ui/Layout/Stack";
import Row from "../../../ui/Layout/Row";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import Button from "../../../ui/Form/Button";

export default function RuleCard({ rule, onEdit, onRun }) {
  return (
    <Card padding="3">
      <Row justify="between" align="start" gap="2">
        <Stack gap="1" className="flex-1">
          <Title size="base">{rule.name}</Title>
          <Text size="xs" color="muted">
            {(rule.nodes && rule.nodes.length) || 0} nodes · {(rule.edges && rule.edges.length) || 0} edges
          </Text>
        </Stack>

        <Row gap="2" align="center">
          <Button onClick={() => onRun(rule.id)} size="sm">Run</Button>
          <Button onClick={() => onEdit(rule.id)} size="sm" variant="primary">Edit</Button>
        </Row>
      </Row>
    </Card>
  );
}
