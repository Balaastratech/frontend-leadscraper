// src/components/automation/NodeCanvas.jsx
import React from "react";
import { motion } from "framer-motion";
import Card from "../../../ui/Surface/Card";
import useNodeCanvas from "../hooks/useNodeCanvas";

/**
 * NodeCanvas - presentation only. Layout handled by Card and primitives.
 * Props: nodes, edges, onNodesChange, onEdgesChange, onSelect, selectedId, connectSource, setConnectSource
 */
export default function NodeCanvas({ nodes, edges, onNodesChange, onEdgesChange, onSelect, selectedId, connectSource, setConnectSource }) {
  const { beginDrag, move, center, handleClick } = useNodeCanvas({
    nodes,
    setNodes: onNodesChange,
    edges,
    setEdges: onEdgesChange,
    onSelect,
    selectedId,
    connectSource,
    setConnectSource,
  });

  return (
    <Card padding="3" className="relative overflow-auto" onMouseMove={move} style={{ height: "500px" }} >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
        {edges.map((e, i) => {
          const a = nodes.find((n) => n.id === e.from);
          const b = nodes.find((n) => n.id === e.to);
          if (!a || !b) return null;
          const ca = center(a);
          const cb = center(b);
          return <line key={i} x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y} stroke="#6366f1" strokeWidth="2" />;
        })}
      </svg>

      {nodes.map((n) => (
        <motion.div
          key={n.id}
          className={`absolute w-20 p-2 text-xs rounded border shadow-sm cursor-grab`}
          style={{ left: n.x, top: n.y }}
          whileHover={{ scale: 1.02 }}
          onMouseDown={(e) => beginDrag(e, n.id)}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(n.id);
          }}
        >
          <div className="font-semibold uppercase">{n.type}</div>
          <div className="text-gray-600 truncate">{n.data.label || n.data.event || n.data.type || ""}</div>
        </motion.div>
      ))}
    </Card>
  );
}
