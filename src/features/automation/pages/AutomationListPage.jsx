// src/pages/app/AutomationListPage.jsx
import React from "react";
import Title from "../../../ui/Typography/Title";
import Row from "../../../ui/Layout/Row";
import Grid from "../../../ui/Layout/Grid";
import Button from "../../../ui/Form/Button";
import Text from "../../../ui/Typography/Text";
import RuleCard from "../components/RuleCard";
import useAutomationList from "../hooks/useAutomationList";

export default function AutomationListPage() {
  const { rules, onNew, onRefresh, onRun, onEdit } = useAutomationList();

  return (
    <div>
      <Row justify="between" align="center">
        <Title size="xl">Automation</Title>
        <Row gap="2">
          <Button onClick={onRefresh}>Refresh</Button>
          <Button variant="primary" onClick={onNew}>New Rule</Button>
        </Row>
      </Row>

      <Grid cols="2" gap="4" className="mt-4">
        {rules.map((r) => (
          <RuleCard key={r.id} rule={r} onEdit={onEdit} onRun={onRun} />
        ))}

        {rules.length === 0 && <Text color="muted">No rules yet. Create one to get started.</Text>}
      </Grid>
    </div>
  );
}
