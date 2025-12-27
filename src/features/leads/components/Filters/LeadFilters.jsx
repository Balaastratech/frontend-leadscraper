import React from "react";
import { FiSliders, FiSearch, FiRefreshCw } from "react-icons/fi";
import { STATUS_OPTIONS } from "../../hooks/Filters/filterConstants";
import { useLeadFilters } from "../../hooks/Filters/useLeadFilters";

import Card from "../../../../ui/Surface/Card";
import Row from "../../../../ui/Layout/Row";
import Stack from "../../../../ui/Layout/Stack";
import Title from "../../../../ui/Typography/Title";
import Text from "../../../../ui/Typography/Text";
import Tag from "../../../../ui/Feedback/Tag";
import Button from "../../../../ui/Form/Button";
import Input from "../../../../ui/Form/Input";
import MultiSelect from "../../../../ui/Form/MultiSelect";

const LeadFilters = React.memo(() => {
  const {
    localFilters,
    scoreError,
    activeFilterCount,
    filterTags,

    updateLocal,
    handleMinScoreInput,
    handleMaxScoreInput,
    applyFilters,
    handleClearAll,
  } = useLeadFilters();

  return (
    <Card variant="elevated" padding="sm" className="relative z-20">
      <Stack gap="lg">
        {/* Header */}
        <Row justify="between" align="center">
          <Row align="center" gap="3">
            <FiSliders size={18} className="text-accent" />
            <Title level={3} size="sm">Filters</Title>

            {activeFilterCount > 0 && (
              <Tag variant="accent" size="sm">
                {activeFilterCount} active
              </Tag>
            )}
          </Row>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              <FiRefreshCw size={14} className="mr-1" />
              Clear all
            </Button>
          )}
        </Row>

        {/* Active tags */}
        {activeFilterCount > 0 && (
          <Row gap="2" wrap>
            {filterTags.map((t) => (
              <Tag key={t.key} variant="info" size="sm">
                {t.label}
              </Tag>
            ))}
          </Row>
        )}

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          {/* Status */}
          <MultiSelect
            options={STATUS_OPTIONS}
            value={localFilters.status}
            onChange={(v) => updateLocal("status", v)}
            placeholder="Status"
            className="h-10"
          />

          {/* Min Score */}
          <Input
            type="number"
            placeholder="Min Score"
            value={localFilters.minScore}
            onChange={(e) => handleMinScoreInput(e.target.value)}
            className="h-10"
          />

          {/* Max Score */}
          <div className="flex flex-col">
            <Input
              type="number"
              placeholder="Max Score"
              value={localFilters.maxScore}
              onChange={(e) => handleMaxScoreInput(e.target.value)}
              className="h-10"
              error={!!scoreError}
            />

            {scoreError && (
              <Text size="xs" color="error" className="mt-1">
                {scoreError}
              </Text>
            )}
          </div>

          {/* Company */}
          <div className="relative">
            
            <Input
              type="text"
              placeholder="Company"
              value={localFilters.company}
              onChange={(e) => updateLocal("company", e.target.value)}
              twin="pl-9"
              className="h-10"
            />
          </div>

        </div>

        {/* Apply / Reset */}
        <Row justify="end" gap="2">
          <Button size="sm" type="button" variant="primary"  onClick={applyFilters}>
            Apply Filters
          </Button>

        </Row>
      </Stack>
    </Card>
  );
});

LeadFilters.displayName = "LeadFilters";

export default LeadFilters;
