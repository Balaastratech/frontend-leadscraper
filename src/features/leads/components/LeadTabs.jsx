import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import  ErrorBoundary  from "../../../GlobalErrorBoundary";
import  Stack  from "../../../ui/Layout/Stack";
import  Text  from "../../../ui/Typography/Text";
import  Button  from "../../../ui/Form/Button";
import  Card  from "../../../ui/Surface/Card";
import  {useToast}  from "../../../hooks/useToast";
import  {Tabs}  from "../../../ui/Tabs/Tabs";

// Tab components
import LeadOverviewTab from "./tabs/LeadOverviewTab";
import LeadTimelineTab from "./tabs/LeadTimelineTab";
import LeadEnrichmentTab from "../../enrichment/components/LeadEnrichmentTab";
import LeadEmailsTab from "./tabs/LeadEmailsTab";
import LeadAiInsightsTab from "./tabs/LeadAiInsightsTab";

/**
 * LeadTabs - Tabbed interface for lead details with error boundaries
 * 
 * Features:
 * - Accessible tab navigation
 * - Error isolation per tab
 * - Edit mode management
 * - Optimized re-renders
 */

const TAB_CONFIGS = [
  { id: "overview", label: "Overview", component: LeadOverviewTab, editable: true },
  { id: "enrichment", label: "Enrichment", component: LeadEnrichmentTab, editable: false },
  { id: "timeline", label: "Timeline", component: LeadTimelineTab, editable: false },
  { id: "emails", label: "Emails", component: LeadEmailsTab, editable: false },
  { id: "ai-insights", label: "AI Insights", component: LeadAiInsightsTab, editable: false },
];

const LeadTabs = React.memo(({ lead, onUpdate, isEditing, onEditChange }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [tabErrors, setTabErrors] = useState({});
  const toast = useToast();

  const handleTabChange = useCallback((newTab) => {
    setActiveTab(newTab);
    setTabErrors(prev => ({ ...prev, [activeTab]: null }));
    
    // Reset editing when leaving editable tab
    const currentTab = TAB_CONFIGS.find(t => t.id === activeTab);
    if (currentTab?.editable && isEditing) {
      onEditChange(false);
    }
  }, [activeTab, isEditing, onEditChange]);

  const handleTabError = useCallback((tabId, error) => {
    console.error(`Error in tab ${tabId}:`, error);
    setTabErrors(prev => ({ ...prev, [tabId]: error.message }));
    toast.error(`Failed to load ${TAB_CONFIGS.find(t => t.id === tabId)?.label} tab`);
  }, [toast]);

  const renderActiveTab = useCallback(() => {
    const tabConfig = TAB_CONFIGS.find(t => t.id === activeTab);
    if (!tabConfig) return null;

    const TabComponent = tabConfig.component;

    return (
      <div
        role="tabpanel"
        id={`lead-tabpanel-${activeTab}`}
        aria-labelledby={`lead-tab-${activeTab}`}
        className="mt-6 focus:outline-none"
        tabIndex={0}
      >
        <ErrorBoundary 
          key={activeTab}
          onError={(error) => handleTabError(activeTab, error)}
          fallback={
            <Stack gap="md" padding="lg" align="center">
              <Text size="lg" color="primary">Failed to load {tabConfig.label}</Text>
              <Text size="sm" color="muted">Something went wrong while loading this tab.</Text>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => handleTabChange(activeTab)}
              >
                Try Again
              </Button>
            </Stack>
          }
        >
          <TabComponent
            lead={lead}
            onUpdate={onUpdate}
            isEditing={isEditing && tabConfig.editable}
            onEditChange={onEditChange}
          />
        </ErrorBoundary>
      </div>
    );
  }, [activeTab, lead, onUpdate, isEditing, onEditChange, handleTabError]);

  return (
    <Stack>
      <Tabs
        tabs={TAB_CONFIGS.map(t => t.label)}
        active={TAB_CONFIGS.find(t => t.id === activeTab)?.label}
        onChange={(label) => {
          const tab = TAB_CONFIGS.find(t => t.label === label);
          handleTabChange(tab.id);
        }}
      />

      {renderActiveTab()}

      {tabErrors[activeTab] && (
        <Card variant="soft" padding="md" className="mt-2">
          <Text size="sm" color="error">{tabErrors[activeTab]}</Text>
        </Card>
      )}
    </Stack>
  );
});

LeadTabs.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    company: PropTypes.string,
    status: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  onEditChange: PropTypes.func.isRequired,
};

LeadTabs.defaultProps = {
  isEditing: false,
};

LeadTabs.displayName = "LeadTabs";

export default LeadTabs;