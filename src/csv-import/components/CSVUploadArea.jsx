import React from "react";
import { FiUpload } from "react-icons/fi";
import Stack from "../../ui/Layout/Stack";
import Title from "../../ui/Typography/Title";
import Text from "../../ui/Typography/Text";

export default function CSVUploadArea({
  dragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick
}) {
  return (
    <div
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        ${dragging ? "border-accent bg-subtle" : "border-muted"}
      `}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <Stack align="center">
        <FiUpload size={32} className="text-muted" />
        <Title level={4} size="sm">Drop CSV here</Title>
        <Text size="sm" color="muted">or click to browse</Text>
      </Stack>
    </div>
  );
}
