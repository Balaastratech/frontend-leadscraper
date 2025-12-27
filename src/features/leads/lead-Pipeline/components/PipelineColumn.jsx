// composition-only. visual handled by ui/Kanban/Column
import React from "react";
import KanbanColumn from "../../../../ui/Kanban/Column";
import PipelineCard from "./PipelineCard";

export default function PipelineColumn({ id, title, items }) {
  return (
    <KanbanColumn id={id} title={title}>
      {items.map((it, i) => (
        <PipelineCard key={it.id} item={it} index={i} />
      ))}
    </KanbanColumn>
  );
}
