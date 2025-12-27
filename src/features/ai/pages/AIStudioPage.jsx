// src/pages/app/AIStudioPage.jsx
// Refactored to use ui Container and Title. Originally: src/pages/app/AIStudioPage.jsx. :contentReference[oaicite:4]{index=4}

import React from "react";
import Container from "../../../ui/Layout/Container";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import AISummarizer from "../../../features/ai/components/AISummarizer";

export default function AIStudioPage() {
  return (
    <Container>
      <div>
        <Title>AI Studio</Title>
        <Text variant="muted">Generate summaries and snippets.</Text>
      </div>

      <AISummarizer />
    </Container>
  );
}
