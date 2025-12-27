// src/hooks/useNodeCanvas.js
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useNodeCanvas - encapsulates drag and connect logic for nodes
 *
 * Inputs:
 *  - nodes, setNodes, edges, setEdges, onSelect, selectedId, connectSource, setConnectSource
 *
 * Returns handlers and derived helpers for NodeCanvas UI.
 */
export default function useNodeCanvas({ nodes, setNodes, edges, setEdges, onSelect, selectedId, connectSource, setConnectSource }) {
  const dragRef = useRef(null);

  useEffect(() => {
    const up = () => (dragRef.current = null);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  const beginDrag = useCallback((e, id) => {
    e.stopPropagation();
    dragRef.current = { id, ox: e.clientX, oy: e.clientY };
  }, []);

  const move = useCallback(
    (e) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.ox;
      const dy = e.clientY - dragRef.current.oy;
      setNodes(
        nodes.map((n) => (n.id === dragRef.current.id ? { ...n, x: n.x + dx, y: n.y + dy } : n))
      );
      dragRef.current = { id: dragRef.current.id, ox: e.clientX, oy: e.clientY };
    },
    [nodes, setNodes]
  );

  const center = useCallback((node) => ({ x: node.x + 40, y: node.y + 20 }), []);

  const handleClick = useCallback(
    (nid) => {
      if (connectSource === "pending") {
        setConnectSource(nid);
        return;
      }
      if (connectSource && connectSource !== nid) {
        setEdges([...edges, { from: connectSource, to: nid }]);
        setConnectSource(null);
        return;
      }
      onSelect(nid);
    },
    [connectSource, setConnectSource, setEdges, edges, onSelect]
  );

  return { beginDrag, move, center, handleClick };
}
