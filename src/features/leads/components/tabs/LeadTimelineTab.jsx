import React from "react";
import PropTypes from "prop-types";
import  Stack  from "../../../../ui/Layout/Stack";
import  Row  from "../../../../ui/Layout/Row";
import  Text  from "../../../../ui/Typography/Text";
import  Title  from "../../../../ui/Typography/Title";
import { EmptyState } from "../../../../ui/Feedback/EmptyState";
import { FiCalendar, FiUser, FiMail, FiTag } from "react-icons/fi";
import  Card  from "../../../../ui/Surface/Card";

/**
 * LeadTimelineTab - Timeline of lead activities
 */

const LeadTimelineTab = React.memo(({ lead }) => {
  // Mock timeline events
  const events = [
    { id: 'ev1', type: "created", date: "2024-01-10", description: "Lead created", actor: "System" },
    { id: 'ev2', type: "status-change", date: "2024-01-12", description: "Status changed to Contacted", actor: "John Doe" },
    { id: 'ev3', type: "email", date: "2024-01-14", description: "Welcome email sent", actor: "Automation" },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'created': return <FiUser />;
      case 'status-change': return <FiTag />;
      case 'email': return <FiMail />;
      default: return <FiCalendar />;
    }
  };

  return (
    <Stack gap="lg">
      <Title level={3} size="lg">Activity Timeline</Title>
      
      {events.length === 0 ? (
        <EmptyState
          icon={FiCalendar}
          title="No events yet"
          description={`No timeline events for ${lead.name}`}
        />
      ) : (
        <div className="relative">
          <div className="absolute border-l-2 border-gray-200 left-4 top-0 bottom-0"></div>
          <Stack gap="md">
            {events.map((event, idx) => (
              <Row key={event.id} gap="3" className="relative">
                <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center text-indigo-600">
                  {getIcon(event.type)}
                </div>
                <Card variant="soft" padding="md" className="flex-1">
                  <Stack gap="1">
                    <Text size="sm" weight="medium">{event.description}</Text>
                    <Row align="center" gap="3">
                      <Text size="xs" color="muted">{event.date}</Text>
                      <Text size="xs" color="muted">•</Text>
                      <Text size="xs" color="muted">by {event.actor}</Text>
                    </Row>
                  </Stack>
                </Card>
              </Row>
            ))}
          </Stack>
        </div>
      )}
    </Stack>
  );
});

LeadTimelineTab.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

LeadTimelineTab.displayName = "LeadTimelineTab";

export default LeadTimelineTab;