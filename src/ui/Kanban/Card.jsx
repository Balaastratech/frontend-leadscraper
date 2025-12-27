// src/ui/Kanban/Card.jsx
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import Card from "../Surface/Card";

export default function KanbanCard({
  item,
  index,
  padding = "sm",
  twin = "",
  ...rest
}) {
  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="
    /* mobile compact */
    w-fit px-3 py-2

    /* tablet/desktop restore full card */
    sm:w-full sm:px-0 sm:py-0
  "
        >
          <Card
            padding={padding}
            variant="default"
            twin={twin}
            className="sm:w-full"
            {...rest}
          >
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-600">{item.company}</div>
            <div className="text-xs text-gray-500">Score: {item.score}</div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
