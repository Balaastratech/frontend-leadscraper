import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../../../ui/Layout/Container";
import Row from "../../../../ui/Layout/Row";
import Stack from "../../../../ui/Layout/Stack";
import Title from "../../../../ui/Typography/Title";
import Button from "../../../../ui/Form/Button";
import LeadsTable from "../../Lead-Table/pages/LeadsTable";
import LeadsTableSkeleton from "../../Lead-Table/components/LeadsTableSkeleton";
import BulkActionsBar from "../../components/BulkActionsBar";
import CSVImportModal from "../../../../csv-import/CSVImportModal";
import LeadFilters from "../../components/Filters/LeadFilters";
import { EmptyState } from "../../../../ui/Feedback/EmptyState";
import Skeleton from "../../../../ui/Feedback/Skeleton";
//import SearchBar from "../../components/SearchBar";

import useLeadsListLogic from "../hooks/useLeadsListLogic";

export default function LeadsListPage() {
  const navigate = useNavigate();

  const {
    leads,
    loading,
    search,
    setSearch,
    selected,
    toggleRow,
    toggleAll,
    bulkDelete,
    bulkMerge,
    csvModalOpen,
    setCsvModalOpen,
    csvImporting,
    handleCsvImport,
    bulkActionProcessing,
    debouncedSearch,
  } = useLeadsListLogic();

  const goToScraper = useCallback(() => navigate("/app/scraper"), [navigate]);
  const FiltersSection = <LeadFilters />;

  const openCsvModal = useCallback(
    () => setCsvModalOpen(true),
    [setCsvModalOpen]
  );
  const closeCsvModal = useCallback(
    () => setCsvModalOpen(false),
    [setCsvModalOpen]
  );
  const clearSearch = useCallback(() => setSearch(""), [setSearch]);
  const handleSearch = useCallback(
    (e) => setSearch(e.target.value),
    [setSearch]
  );

  const HeaderSection = (
    <Row justify="between" align="center">
      <Title level={2}>Leads</Title>
      <Row gap="2">
        <Button variant="outline" size="sm" onClick={goToScraper}>
          Run Scraper
        </Button>
        <Button
          variant="primary"
          loading={csvImporting}
          size="sm"
          onClick={openCsvModal}
        >
          Import CSV
        </Button>
      </Row>
    </Row>
  );

  if (loading && leads.length === 0)
    return (
      <Container>
        <Stack gap="md">
          <Row justify="between" align="center">
            <Title level={2}>Leads</Title>
            <Skeleton width="32" height="6" />
          </Row>
          <div className="relative z-10">
            <LeadsTableSkeleton />
          </div>
        </Stack>
      </Container>
    );

  if (!loading && !leads.length && debouncedSearch)
    return (
      <Container>
        <Stack gap="md">
          <Row justify="between" align="center">
            <Title level={2}>Leads</Title>
            <Button
              variant="primary"
              loading={csvImporting}
              size="sm"
              onClick={openCsvModal}
            >
              Import CSV
            </Button>
          </Row>

          <div className="relative z-20">{FiltersSection}</div>

          <EmptyState
            icon="search"
            title="No leads found"
            description={`No results for "${debouncedSearch}"`}
            actionText="Clear Search"
            onAction={clearSearch}
          />
        </Stack>
      </Container>
    );

  return (
    <Container>
      <Stack gap="md">
        {HeaderSection}

        <Stack gap="md">{FiltersSection}</Stack>

        {selected.length > 0 && (
          <BulkActionsBar
            selected={selected}
            onDelete={bulkDelete}
            onMerge={bulkMerge}
            disabled={bulkActionProcessing}
          />
        )}

        {leads.length === 0 ? (
          <EmptyState
            icon="inbox"
            title="No leads yet"
            description="Import or scrape to begin"
            actionText="Import CSV"
            onAction={openCsvModal}
            secondaryActionText="Run Scraper"
            onSecondaryAction={goToScraper}
          />
        ) : (
          <div className="relative z-10">
            <LeadsTable
              items={leads}
              selected={selected}
              onToggleRow={toggleRow}
              onToggleAll={toggleAll}
              loading={loading}
            />
          </div>
        )}

        {csvModalOpen && (
          <CSVImportModal
            open
            onClose={closeCsvModal}
            onImport={handleCsvImport}
            importing={csvImporting}
          />
        )}
      </Stack>
    </Container>
  );
}
