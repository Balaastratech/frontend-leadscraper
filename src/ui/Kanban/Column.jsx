// src/ui/Kanban/Column.jsx
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import Card from "../Surface/Card";

export default function KanbanColumn({ id, title, children, twin = "", className = "", ...rest }) {
  return (
    <div
      className={`
        w-[180px]         /* perfect mobile column width */
        flex-shrink-0     /* REQUIRED for horizontal scroll */
        md:w-full         /* desktop: let grid stretch column */
        ${className}
        ${twin}
      `}
      {...rest}
    >
      <Card variant="surface" padding="md" className="min-h-[180px] h-auto">
        <div className="mb-3 font-semibold">{title}</div>

        <Droppable droppableId={id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="
                flex flex-col gap-3
                min-h-[60px]
                max-h-[calc(100vh-220px)]
                overflow-y-auto
                pr-1
              "
            >
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </div>
  );
}
