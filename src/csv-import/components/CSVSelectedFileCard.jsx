import React from "react";
import Card from "../../ui/Surface/Card";
import Row from "../../ui/Layout/Row";
import Stack from "../../ui/Layout/Stack";
import Text from "../../ui/Typography/Text";
import Button from "../../ui/Form/Button";
import { FiFileText, FiX } from "react-icons/fi";

export default function CSVSelectedFileCard({ file, onRemove }) {
  return (
    <Card variant="soft" padding="md">
      <Row justify="between" align="center">
        <Row gap="2" align="center">
          <FiFileText size={20} className="text-primary" />
          <Stack>
            <Text size="sm">{file.name}</Text>
            <Text size="xs" color="muted">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </Text>
          </Stack>
        </Row>

        <Button variant="ghost" size="sm" onClick={onRemove}>
          <FiX size={16} />
        </Button>
      </Row>
    </Card>
  );
}
