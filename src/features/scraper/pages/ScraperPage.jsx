import React from "react";
import { useNavigate } from "react-router-dom";

import ScraperForm from "../components/ScraperForm";
import JobList from "../components/JobList";
import useScraperList from "../hooks/useScraperList";

import Button from "../../../ui/Form/Button";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import Card from "../../../ui/Surface/Card";
import Col from "../../../ui/Layout/Col";
import Row from "../../../ui/Layout/Row";

export default function ScraperPage() {
  const { jobs, loading } = useScraperList();
  const navigate = useNavigate();

  const activeCount = jobs.filter(
    (j) => j.status === "running" || j.status === "queued"
  ).length;

  const completedCount = jobs.filter(
    (j) => j.status === "completed"
  ).length;

  return (
    <Col gap="6">
      {/* Header */}
      <Col gap="1">
        <Title size="xl">Web Scraper</Title>
        <Text size="sm" color="muted">
          Crawl URLs or domains and extract structured leads.
        </Text>
      </Col>

      {/* Enqueue */}
      <Card padding="p-4">
        <Title size="base" className="mb-2">
          New Crawl
        </Title>
        <ScraperForm />
      </Card>

      {/* Queue */}
      <Card padding="p-4">
        <Row justify="between" align="center" className="mb-3">
          <div>
            <Text size="sm" weight="medium">
              Job Queue
            </Text>
            <Text size="xs" color="muted">
              Track progress and open completed jobs
            </Text>
          </div>

          <Text size="xs" color="muted">
            {loading
              ? "Refreshing…"
              : `${jobs.length} total · ${activeCount} active · ${completedCount} completed`}
          </Text>
        </Row>

        {/* Empty guidance */}
        {!loading && jobs.length === 0 ? (
          <div className="text-center py-8 border rounded bg-gray-50">
            <Text size="sm" weight="medium">
              No jobs yet
            </Text>
            <Text size="xs" color="muted" className="mt-1">
              Add URLs above and start your first crawl.
            </Text>
          </div>
        ) : (
          <JobList />
        )}

        <Row justify="end" className="mt-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate("/app/scraper/queue")}
          >
            View full queue
          </Button>
        </Row>
      </Card>
    </Col>
  );
}
