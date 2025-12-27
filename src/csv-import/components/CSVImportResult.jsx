import React from "react";
import Card from "../../ui/Surface/Card";
import Row from "../../ui/Layout/Row";
import Stack from "../../ui/Layout/Stack";
import Title from "../../ui/Typography/Title";
import Text from "../../ui/Typography/Text";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function CSVImportResult({ result }) {
  return (
    <Card variant="elevated" padding="md">
      <Stack>
        <Row align="center" gap="2">
          <FiCheckCircle size={24} className="text-green-500" />
          <Title level={4} size="sm">Import Complete</Title>
        </Row>

        <Text size="sm">
          <strong>{result.importedCount}</strong> leads imported
        </Text>

        {result.failedCount > 0 && (
          <Row gap="2">
            <FiAlertCircle size={16} className="text-yellow-500" />
            <Text size="sm" color="muted">
              {result.failedCount} failed rows
            </Text>
          </Row>
        )}
      </Stack>
    </Card>
  );
}
