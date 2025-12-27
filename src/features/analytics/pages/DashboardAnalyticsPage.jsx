import React from "react";
import useAnalytics from "../hooks/useAnalytics";

import Container from "../../../ui/Layout/Container";
import Grid from "../../../ui/Layout/Grid";
import Stack from "../../../ui/Layout/Stack";
import Card from "../../../ui/Surface/Card";

import DashboardWidget from "../components/DashboardWidget";
import ScoreDistributionChart from "../components/charts/ScoreDistributionChart";
import ClusterVisualizer from "../components/charts/ClusterVisualizer";

export default function DashboardAnalyticsPage() {
  const { overview, clusters, loading } = useAnalytics();

  if (loading || !overview) {
    return <Container>Loading analytics…</Container>;
  }

  return (
    <Container className="space-y-8">

      {/* HEADER */}
      <Stack gap="2">
        <div className="text-xl font-semibold">Analytics</div>
        <div className="text-sm text-gray-600">
          Lead performance, segments, and AI insights.
        </div>
      </Stack>

      {/* KPI GRID */}
      <Grid cols={{ base: 1, md: 4 }} gap="4">
        <DashboardWidget title="Leads Today" value={overview.leadsToday} />
        <DashboardWidget title="New" value={overview.pipeline.new} />
        <DashboardWidget title="Contacted" value={overview.pipeline.contacted} />
        <DashboardWidget title="Won" value={overview.pipeline.won} />
      </Grid>

      {/* SCORE + CLUSTERS */}
      <Grid cols={{ base: 1, md: 2 }} gap="6">

        {/* Score Distribution */}
        <Card className="p-6">
          <Stack gap="3">
            <div className="text-sm font-medium">Score Distribution</div>
            <ScoreDistributionChart scores={overview.scoreDistribution} />
          </Stack>
        </Card>

        {/* Clusters with controlled width */}
        <Card className="p-6">
          <Stack gap="3">
            <div className="text-sm font-medium">Clusters</div>

            {/* Centered responsive chart */}
            <div className="w-full flex justify-center">
              <div className="max-w-[360px] w-full h-[360px] flex items-center justify-center">
                <ClusterVisualizer clusters={clusters} />
              </div>
            </div>

          </Stack>
        </Card>

      </Grid>

      {/* AI Insights */}
      <Card className="p-6">
        <Stack gap="3">
          <div className="text-sm font-medium">AI Insights</div>
          <ul className="list-disc list-inside text-sm space-y-1">
            {overview.aiInsights.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </Stack>
      </Card>

    </Container>
  );
}
