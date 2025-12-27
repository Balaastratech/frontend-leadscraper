import React from "react";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import Card from "../../../ui/Surface/Card";
import JobList from "../components/JobList";

export default function ScraperQueuePage() {
  return (
    <div className="space-y-4">
      <div>
        <Title size="xl">Scraper Queue</Title>
        <Text size="sm" color="muted">
          Monitor all scraper jobs.
        </Text>
      </div>

      <Card padding="p-4">
        <JobList />
      </Card>
    </div>
  );
}
