// src/hooks/useAutomationEditor.js
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRule, fetchRuns, saveRule, runRule } from "../store/automationSlice";

/**
 * useAutomationEditor - encapsulate editor page logic
 * - loads rule and runs via redux thunks
 * - keeps local copy of nodes/edges for canvas editing (optimistic)
 */
export default function useAutomationEditor(id) {
  const dispatch = useDispatch();
  const current = useSelector((s) => s.automation.current);
  const runs = useSelector((s) => s.automation.runs || []);
  const [localNodes, setLocalNodes] = useState([]);
  const [localEdges, setLocalEdges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [connectSource, setConnectSource] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchRule(id));
      dispatch(fetchRuns(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!current) return;
    setLocalNodes(JSON.parse(JSON.stringify(current.nodes || [])));
    setLocalEdges(JSON.parse(JSON.stringify(current.edges || [])));
  }, [current]);

  const addNode = (type) => {
    const nid = "n" + Date.now();
    const node = { id: nid, type, x: 100, y: 80, data: {} };
    setLocalNodes((s) => [...s, node]);
  };

  const updateNode = (updated) => {
    setLocalNodes((nodes) => nodes.map((n) => (n.id === updated.id ? updated : n)));
  };

  const onSave = async () => {
    if (!current) return;
    await dispatch(
      saveRule({
        id: current.id,
        payload: {
          name: current.name,
          nodes: JSON.parse(JSON.stringify(localNodes)),
          edges: JSON.parse(JSON.stringify(localEdges)),
        },
      })
    );
  };

  const onRun = async () => {
    if (!current) return;
    await dispatch(runRule(current.id));
    dispatch(fetchRuns(current.id));
  };

  const onReset = () => {
    if (!current) return;
    setLocalNodes(JSON.parse(JSON.stringify(current.nodes || [])));
    setLocalEdges(JSON.parse(JSON.stringify(current.edges || [])));
    setSelected(null);
    setConnectSource(null);
  };

  const selectedNode = useMemo(() => localNodes.find((n) => n.id === selected), [localNodes, selected]);

  return {
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
  };
}
