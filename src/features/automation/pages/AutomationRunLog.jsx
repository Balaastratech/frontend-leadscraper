// src/pages/app/AutomationRunLog.jsx
import React from "react";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import Card from "../../../ui/Surface/Card";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRuns } from "../store/automationSlice";

export default function AutomationRunLog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const runs = useSelector((s) => s.automation.runs || []);

  useEffect(() => {
    if (id) dispatch(fetchRuns(id));
  }, [dispatch, id]);

  return (
    <div>
      <Title size="lg">Runs</Title>
      <div className="mt-3">
        {runs.length === 0 && <Text color="muted">No runs yet.</Text>}
        {runs.map((r) => (
          <Card padding="3" key={r.id} className="mt-2">
            <Row justify="between">
              <Text size="sm">{r.id}</Text>
              <Text size="xs" color="muted">{r.status}</Text>
            </Row>
            <Text size="xs" className="mt-2">{r.logs && r.logs.join("\n")}</Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
