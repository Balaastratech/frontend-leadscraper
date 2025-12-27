// composition-only. visual handled by ui/Kanban/Card and ui/Surface/Card
import React from "react";
import KanbanCard from "../../../../ui/Kanban/Card";

export default function PipelineCard({ item, index }) {
  return <KanbanCard item={item} index={index} />;
}
