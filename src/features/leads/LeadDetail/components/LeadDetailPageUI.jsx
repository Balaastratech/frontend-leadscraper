// LeadDetailPageUI.jsx
import React from "react";
import PropTypes from "prop-types";
import { FiArrowLeft, FiEdit3, FiTrash2 } from "react-icons/fi";
import Container from "../../../../ui/Layout/Container";
import Stack from "../../../../ui/Layout/Stack";
import Row from "../../../../ui/Layout/Row";
import Title from "../../../../ui/Typography/Title";
import Text from "../../../../ui/Typography/Text";
import Button from "../../../../ui/Form/Button";
import Card from "../../../../ui/Surface/Card";
import LeadDetailSkeleton from "../components/LeadDetailSkeleton";
import { ErrorState } from "../../../../ui/Feedback/ErrorState";
import LeadTabs from "../../components/LeadTabs";

function LeadDetailPageUI({
  lead,
  loading,
  error,
  isEditing,
  setIsEditing,
  onUpdate,
  onBack,
  onConfirmDelete,
  onRetry,
}) {
  if (loading && !lead) {
    return (
      <Container>
        <Stack gap="lg">
          <LeadDetailSkeleton />
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorState
          title="Failed to load lead"
          message={error}
          onRetry={onRetry}
          actionText="Retry"
        />
      </Container>
    );
  }

  if (!lead) {
    return (
      <Container>
        <ErrorState
          title="Lead not found"
          message="The lead was not found or has been deleted."
          actionText="Back to leads"
          onAction={onBack}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Stack gap="lg">
        <Row justify="between" align="center">
          <Row align="center" gap="3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              aria-label="Back"
            >
              <FiArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Title level={1} size="lg">
              {lead.name}
            </Title>
          </Row>

          <Row gap="2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              aria-label="Edit lead"
            >
              <FiEdit3 className="w-4 h-4 mr-1" />
              Edit
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={onConfirmDelete}
              aria-label={`Delete lead ${lead.name}`}
            >
              <FiTrash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </Row>
        </Row>

        <Card variant="soft" padding="md">
          <Stack gap="3">
            <Row gap="6" wrap>
              <Stack gap="1">
                <Text size="xs" color="muted">
                  Email
                </Text>
                <Text size="sm" weight="medium" className="font-mono">
                  {lead.email || "—"}
                </Text>
              </Stack>

              <Stack gap="1">
                <Text size="xs" color="muted">
                  Company
                </Text>
                <Text size="sm" weight="medium">
                  {lead.company || "—"}
                </Text>
              </Stack>

              <Stack gap="1">
                <Text size="xs" color="muted">
                  Status
                </Text>
                <Text size="sm" weight="medium" className="capitalize">
                  {lead.status || "unknown"}
                </Text>
              </Stack>

              <Stack gap="1">
                <Text size="xs" color="muted">
                  Score
                </Text>
                <Text size="sm" weight="medium">
                  {lead.score ?? 0}%
                </Text>
              </Stack>
            </Row>
          </Stack>
        </Card>

        <LeadTabs
          lead={lead}
          onUpdate={onUpdate}
          isEditing={isEditing}
          onEditChange={setIsEditing}
        />
      </Stack>
    </Container>
  );
}

LeadDetailPageUI.propTypes = {
  lead: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};

export default React.memo(LeadDetailPageUI);
