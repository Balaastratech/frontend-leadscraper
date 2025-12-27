import React from "react";
import Stack from "../../ui/Layout/Stack";
import Text from "../../ui/Typography/Text";
import ProgressBar from "../../design/primitives/ProgressBar";

export default function CSVImportProgress({ progress }) {
  return (
    <Stack>
      <Text size="sm">Importing...</Text>
      <ProgressBar value={progress} height={8} />
      <Text size="xs" color="muted" align="center">{progress}%</Text>
    </Stack>
  );
}
