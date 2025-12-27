import React from "react";
import PropTypes from "prop-types";
import  Stack  from "../../../../ui/Layout/Stack";
import  Row  from "../../../../ui/Layout/Row";
import  Text  from "../../../../ui/Typography/Text";
import  Title  from "../../../../ui/Typography/Title";
import  Tag  from "../../../../ui/Feedback/Tag";
import  {EmptyState}  from "../../../../ui/Feedback/EmptyState";
import  Card  from "../../../../ui/Surface/Card";
import { FiZap, FiTrendingUp, FiAlertCircle } from "react-icons/fi";

/**
 * LeadAiInsightsTab - AI-powered lead insights
 */

const LeadAiInsightsTab = React.memo(({ lead }) => {
  // Mock AI insights - in real app, from AI service
  const insights = [
    {
      id: 'i1',
      category: "priority",
      title: "High Priority Lead",
      description: "Strong engagement signals: opened 3 emails, visited pricing page twice",
      confidence: 85,
      icon: FiTrendingUp,
    },
    {
      id: 'i2',
      category: "recommended-action",
      title: "Schedule Follow-up",
      description: "Recommended to follow up within 24 hours while interest is high",
      confidence: 92,
      icon: FiZap,
    },
    {
      id: 'i3',
      category: "risk",
      title: "Low Response Rate",
      description: "Previous outreach attempts had low engagement. Consider different approach.",
      confidence: 73,
      icon: FiAlertCircle,
    },
  ];

  const getVariant = (category) => {
    switch(category) {
      case 'priority': return 'accent';
      case 'recommended-action': return 'success';
      case 'risk': return 'warning';
      default: return 'info';
    }
  };

  return (
    <Stack gap="lg">
      <Title level={3} size="lg">AI Insights</Title>
      
      {insights.length === 0 ? (
        <EmptyState
          icon={FiZap}
          title="No insights yet"
          description={`AI analysis for ${lead.name} is pending`}
          actionText="Generate Insights"
          onAction={() => {
            // In real app: trigger AI analysis
            alert('AI analysis would be triggered here');
          }}
        />
      ) : (
        <Stack gap="md">
          {insights.map(insight => {
            const Icon = insight.icon;
            return (
              <Card key={insight.id} variant="soft" padding="lg">
                <Row justify="between" align="start" gap="md">
                  <Stack gap="3" flex="1">
                    <Row align="center" gap="3">
                      <div className={`p-2 rounded-lg bg-${getVariant(insight.category)}-100 text-${getVariant(insight.category)}-600`}>
                        <Icon size={20} />
                      </div>
                      <Stack gap="1">
                        <Text size="lg" weight="semibold">{insight.title}</Text>
                        <Text size="sm" color="muted">{insight.description}</Text>
                      </Stack>
                    </Row>
                  </Stack>
                  <Stack gap="1" align="end">
                    <Text size="xs" color="muted">Confidence</Text>
                    <Tag variant={getVariant(insight.category)} size="sm">
                      {insight.confidence}%
                    </Tag>
                  </Stack>
                </Row>
              </Card>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
});

LeadAiInsightsTab.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

LeadAiInsightsTab.displayName = "LeadAiInsightsTab";

export default LeadAiInsightsTab;