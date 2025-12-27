import React from "react";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import ICPBuilder from "../components/ICPBuilder";

export default function ICPPage() {
  return (
    <div className="space-y-6 w-full max-w-none">

      {/* one-off layout */}
      <Title size="lg">ICP Builder</Title>
      <Text size="sm" color="muted">
        Create and manage your ideal customer profiles.
      </Text>
      <ICPBuilder />
    </div>
  );
}
