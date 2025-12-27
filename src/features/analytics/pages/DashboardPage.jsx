import React from "react";
import useAnalytics from "../hooks/useAnalytics";

import KPIBar from "../components/KPIBar";
import AIInsightsRibbon from "../components/AIInsightsRibbon";
import LeadFunnel from "../components/LeadFunnel";
import ScoreDistributionChart from "../components/charts/ScoreDistributionChart";
import ClusterVisualizer from "../components/charts/ClusterVisualizer";
import ActivityFeed from "../components/ActivityFeed";
import UsageSnapshot from "../components/UsageSnapshot";
import QuickActions from "../components/QuickActions";
import Card from "../../../ui/Surface/Card";
import Container from "../../../ui/Layout/Container";
import Grid from "../../../ui/Layout/Grid";
import Col from "../../../ui/Layout/Col";
import Row from "../../../ui/Layout/Row";
import Stack from "../../../ui/Layout/Stack";

export default function DashboardPage() {
  const { overview, clusters, loading } = useAnalytics();

  if (loading || !overview) {
    return <Container>Loading dashboard…</Container>;
  }

  return (
    <Container className="pt-8 space-y-8">
      {/* HEADER */}
      <Row justify="between" align="start" wrap gap="4">
        <Stack gap="2">
          <div className="text-3xl font-semibold">Dashboard</div>
          <div className="text-sm text-gray-600">
            Sales CRM overview and intelligence.
          </div>
        </Stack>
        <QuickActions />
      </Row>

      {/* INSIGHTS */}
      <AIInsightsRibbon insights={overview.aiInsights} />

      {/* KPIs */}
      <KPIBar
        kpis={[
          {
            id: "leadsToday",
            label: "Leads Today",
            value: overview.leadsToday,
          },
          { id: "new", label: "New", value: overview.pipeline.new },
          {
            id: "qualified",
            label: "Qualified",
            value: overview.pipeline.qualified,
          },
          { id: "won", label: "Won", value: overview.pipeline.won },
          {
            id: "avgScore",
            label: "Avg Score",
            value:
              Math.round(
                overview.scoreDistribution.reduce((a, b) => a + b, 0) /
                  overview.scoreDistribution.length
              ) || 0,
          },
        ]}
      />

      {/* MAIN GRID */}
      <Grid cols={{ base: 1, lg: 3 }} gap="8">
        {/* LEFT 2/3 */}
        <Col className="lg:col-span-2 space-y-8">
          {/* Funnel + Score */}
          <Grid cols={{ base: 1, md: 2 }} gap="8">
            <Card className="p-6">
              <Stack gap="3">
                <div className="text-sm font-medium">Lead Funnel</div>
                <LeadFunnel pipeline={overview.pipeline} />
              </Stack>
            </Card>

            <Card className="p-6">
              <Stack gap="3">
                <div className="text-sm font-medium">Score Distribution</div>
                <ScoreDistributionChart scores={overview.scoreDistribution} />
              </Stack>
            </Card>
          </Grid>

          {/* Clusters */}
          <Card className="p-6">
            <Stack gap="3">
              <div className="text-sm font-medium">Clusters</div>

              <div className="w-full flex justify-center">
                <div className="max-w-[380px] w-full h-[380px] flex items-center justify-center">
                  <ClusterVisualizer clusters={clusters} />
                </div>
              </div>
            </Stack>
          </Card>
        </Col>

        {/* RIGHT SIDEBAR */}
        <Col className="space-y-8">
          <UsageSnapshot
            usage={{
              scrapingUsed: 342,
              scrapingLimit: 500,
              aiTokensUsed: 12832,
              aiTokensLimit: 20000,
            }}
          />
          <ActivityFeed />
        </Col>
      </Grid>
    </Container>
  );
}
