import React from "react";
import PropTypes from "prop-types";
import  Card from "../../../../ui/Surface/Card";
import  Stack from "../../../../ui/Layout/Stack";
import  Row from "../../../../ui/Layout/Row";
import  Text from "../../../../ui/Typography/Text";
import  Title from "../../../../ui/Typography/Title";
import  Tag  from "../../../../ui/Feedback/Tag";
import { EmptyState } from "../../../../ui/Feedback/EmptyState";
import { FiMail, FiCalendar } from "react-icons/fi";

/**
 * LeadEmailsTab - Email history display
 */

const LeadEmailsTab = React.memo(({ lead }) => {
  // Mock data - in real app, this would come from API
  const emails = [
    { id: 'e1', subject: "Welcome to our platform", date: "2024-01-15", direction: "outgoing", preview: "Welcome to our platform! We're excited..." },
    { id: 'e2', subject: "Re: Pricing inquiry", date: "2024-01-14", direction: "incoming", preview: "Thanks for reaching out about our pricing..." },
  ];

  return (
    <Stack gap="lg">
      <Title level={3} size="lg">Email History</Title>
      
      {emails.length === 0 ? (
        <EmptyState
          icon={FiMail}
          title="No emails yet"
          description={`No email history for ${lead.name}`}
        />
      ) : (
        <Stack gap="md">
          {emails.map(email => (
            <Card key={email.id} variant="soft" padding="md">
              <Row justify="between" align="start" gap="md">
                <Stack gap="2" flex="1">
                  <Row justify="between" align="center">
                    <Text size="sm" weight="semibold" className="line-clamp-1">{email.subject}</Text>
                    <Tag variant={email.direction === 'outgoing' ? 'info' : 'success'} size="xs">
                      {email.direction === 'outgoing' ? 'Sent' : 'Received'}
                    </Tag>
                  </Row>
                  <Text size="sm" color="muted" className="line-clamp-2">{email.preview}</Text>
                  <Row align="center" gap="2">
                    <FiCalendar size={14} className="text-muted" />
                    <Text size="xs" color="muted">{email.date}</Text>
                  </Row>
                </Stack>
              </Row>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
});

LeadEmailsTab.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

LeadEmailsTab.displayName = "LeadEmailsTab";

export default LeadEmailsTab;