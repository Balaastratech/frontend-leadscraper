// LeadDetailSkeleton.jsx
import React from "react";
import PropTypes from "prop-types";
import Stack from "../../../../ui/Layout/Stack";
import Row from "../../../../ui/Layout/Row";
import Card from "../../../../ui/Surface/Card";
import Skeleton from "../../../../ui/Feedback/Skeleton";
import Title from "../../../../ui/Typography/Title";

const LeadDetailSkeleton = React.memo(({ showTabs = true, showActions = true, className = "" }) => {
  return (
    <Stack gap="lg" className={className}>
      <Stack gap="md">
        <Row justify="between" align="center">
          <Row align="center" gap="3">
            <Skeleton width="8" height="8" />
            <Skeleton width="48" height="8" />
          </Row>
          {showActions && (
            <Row gap="2">
              <Skeleton width="16" height="8" />
              <Skeleton width="16" height="8" />
            </Row>
          )}
        </Row>
      </Stack>

      <Card variant="soft" padding="lg">
        <Stack gap="4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Stack key={i} gap="2">
                <Skeleton width="20" height="4" />
                <Skeleton width="32" height="6" />
              </Stack>
            ))}
          </div>
        </Stack>
      </Card>

      {showTabs && (
        <Card variant="default" padding="md">
          <Row gap="2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} width="24" height="8" />
            ))}
          </Row>
        </Card>
      )}

      <Card variant="default" padding="lg">
        <Stack gap="6">
          <Stack gap="4">
            <Skeleton width="full" height="6" />
            <Skeleton width="full" height="6" />
            <Skeleton width="3/4" height="6" />
          </Stack>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Stack key={i} gap="3">
                <Skeleton width="24" height="4" />
                <Skeleton width="full" height="8" />
                <Skeleton width="5/6" height="4" />
              </Stack>
            ))}
          </div>

          <Row justify="end" gap="2">
            <Skeleton width="20" height="8" />
            <Skeleton width="20" height="8" />
          </Row>
        </Stack>
      </Card>
    </Stack>
  );
});

LeadDetailSkeleton.propTypes = {
  showTabs: PropTypes.bool,
  showActions: PropTypes.bool,
  className: PropTypes.string,
};

LeadDetailSkeleton.defaultProps = {
  showTabs: true,
  showActions: true,
  className: "",
};

LeadDetailSkeleton.displayName = "LeadDetailSkeleton";

export default LeadDetailSkeleton;
