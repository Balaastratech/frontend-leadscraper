import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useToast } from "../../../../hooks/useToast";

import Container from "../../../../ui/Layout/Container";
import Title from "../../../../ui/Typography/Title";
import PipelineColumn from "../components/PipelineColumn";
import Row from "../../../../ui/Layout/Row";
import Stack from "../../../../ui/Layout/Stack";
import { ErrorState } from "../../../../ui/Feedback/ErrorState";
import Skeleton from "../../../../ui/Feedback/Skeleton";
import Text from "../../../../ui/Typography/Text";

import { useLeadPipelineLogic } from "../hooks/useLeadPipelineLogic";

export default function LeadPipelinePage() {
  const toast = useToast();

  const {
    columns,
    loading,
    error,
    totalLeads,
    onDragEnd,
  } = useLeadPipelineLogic(toast);

  if (loading) {
    return (
      <Container>
        <Stack gap="md">
          <Row justify="between" align="center">
            <Title level={2}>Lead Pipeline</Title>
            <Skeleton width="32" height="6" />
          </Row>

          <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-[180px] flex-shrink-0">
                <Skeleton height="96" />
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorState title="Failed to load pipeline" message={error} />
      </Container>
    );
  }

  return (
    <Container>
      <Stack gap="md">
        <Row justify="between" align="center">
          <Title level={2}>Lead Pipeline</Title>
          <Text size="sm" color="muted">
            {totalLeads} total leads
          </Text>
        </Row>

        <div className="md:hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
              {Object.entries(columns).map(([id, column]) => (
                <PipelineColumn
                  key={id}
                  id={id}
                  title={`${column.name} (${column.items.length})`}
                  items={column.items}
                />
              ))}
            </div>
          </DragDropContext>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([id, column]) => (
              <PipelineColumn
                key={id}
                id={id}
                title={`${column.name} (${column.items.length})`}
                items={column.items}
              />
            ))}
          </DragDropContext>
        </div>
      </Stack>
    </Container>
  );
}
