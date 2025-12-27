// src/pages/app/AutomationEditorPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Row from "../../../ui/Layout/Row";
import Col from "../../../ui/Layout/Col";
import Stack from "../../../ui/Layout/Stack";
import Button from "../../../ui/Form/Button";
import Card from "../../../ui/Surface/Card";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";

import NodeCanvas from "../components/NodeCanvas";
import TriggerNode from "../components//TriggerNode";
import ConditionNode from "../components//ConditionNode";
import ActionNode from "../components//ActionNode";

import useAutomationEditor from "../hooks/useAutomationEditor";

export default function AutomationEditorPage() {
  const { id } = useParams();
  const {
    current,
    runs,
    localNodes,
    setLocalNodes,
    localEdges,
    setLocalEdges,
    selected,
    setSelected,
    connectSource,
    setConnectSource,
    addNode,
    updateNode,
    onSave,
    onRun,
    onReset,
    selectedNode,
  } = useAutomationEditor(id);

  return (
    <GridLayout />
  );

  // small inner component to keep markup concise
  function GridLayout() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          <Row justify="between" align="center" gap="2">
            <Row gap="2">
              <Button onClick={() => setConnectSource("pending")} className={connectSource ? "bg-yellow-100" : ""}>Connect</Button>
              <Button onClick={() => addNode("trigger")}>+ Trigger</Button>
              <Button onClick={() => addNode("condition")}>+ Condition</Button>
              <Button onClick={() => addNode("action")}>+ Action</Button>
            </Row>

            <Row gap="2">
              <Button onClick={onReset}>Reset</Button>
              <Button variant="primary" onClick={onSave}>Save</Button>
              <Button onClick={onRun}>Run</Button>
            </Row>
          </Row>

          <NodeCanvas
            nodes={localNodes}
            edges={localEdges}
            onNodesChange={(n) => setLocalNodes(n)}
            onEdgesChange={(e) => setLocalEdges(e)}
            onSelect={setSelected}
            selectedId={selected}
            connectSource={connectSource}
            setConnectSource={setConnectSource}
          />
        </div>

        {/* Right column */}
        <Stack gap="4">
          <Card padding="3">
            <Title size="base">Node Editor</Title>
            {!selectedNode && <Text size="xs" color="muted">Select a node.</Text>}

            {selectedNode && (
              <>
                {selectedNode.type === "trigger" && <TriggerNode node={selectedNode} onChange={updateNode} />}
                {selectedNode.type === "condition" && <ConditionNode node={selectedNode} onChange={updateNode} />}
                {selectedNode.type === "action" && <ActionNode node={selectedNode} onChange={updateNode} />}
              </>
            )}
          </Card>

          <Card padding="3">
            <Title size="base">Recent Runs</Title>
            <Text size="xs" color="muted">Last 5 executions for this rule.</Text>

            {runs.length === 0 && <Text size="sm" color="muted">No runs yet.</Text>}

            {runs.slice(0, 5).map((r) => (
              <Card padding="2" key={r.id} className="mt-2">
                <Row justify="between">
                  <Text size="sm">{r.id}</Text>
                  <Text size="xs" color="muted">{r.status}</Text>
                </Row>
                <Text size="sm" className="mt-1">{(r.logs && r.logs[0]) || ""}</Text>
              </Card>
            ))}
          </Card>
        </Stack>
      </div>
    );
  }
}
