import { createSelector } from "@reduxjs/toolkit";

/*
  Centralized selectors for Redux.
  Optimized for memoization, safety, and speed.
*/

export const selectUser = (s) => s.auth.user;
export const selectToken = (s) => s.auth.token;

export const selectLeads = (s) => s.leads.items;
export const selectLeadsLoading = (s) => s.leads.loading;
export const selectLeadsError = (s) => s.leads.error;

export const selectLeadFilters = (s) => s.leads.filters;
export const selectGlobalSearch = (s) => s.leads.globalSearch;

export const selectLeadTotal = (s) => s.leads.total;
export const selectLeadPage = (s) => s.leads.page;
export const selectLeadPageSize = (s) => s.leads.pageSize;

/* ---------------------------------------------------
   OPTIMIZED FILTERED LEADS SELECTOR
--------------------------------------------------- */

export const selectFilteredLeads = createSelector(
  [selectLeads, selectLeadFilters, selectGlobalSearch],
  (leads, filters, searchTerm) => {
    // PRE-NORMALIZE STRINGS (performance)
    const term = searchTerm?.toLowerCase() || "";
    const companyFilter = filters.company?.toLowerCase() || "";

    let filtered = leads; // no array cloning

    /* ------------------ GLOBAL SEARCH ------------------ */
    if (term) {
      filtered = filtered.filter((lead) => {
        const name = lead.name?.toLowerCase() || "";
        const email = lead.email?.toLowerCase() || "";
        const company = lead.company?.toLowerCase() || "";

        return (
          name.includes(term) ||
          email.includes(term) ||
          company.includes(term)
        );
      });
    }

    /* ------------------ STATUS FILTER ------------------ */
    if (filters.status.length > 0) {
      filtered = filtered.filter((lead) =>
        filters.status.includes(lead.status || null)
      );
    }

    /* ------------------ SCORE MIN/MAX ------------------ */
    if (filters.minScore !== null) {
      filtered = filtered.filter(
        (lead) => Number(lead.score) >= filters.minScore
      );
    }

    if (filters.maxScore !== null) {
      filtered = filtered.filter(
        (lead) => Number(lead.score) <= filters.maxScore
      );
    }

    /* ------------------ COMPANY FILTER ------------------ */
    if (companyFilter) {
      filtered = filtered.filter((lead) => {
        const company = lead.company?.toLowerCase() || "";
        return company.includes(companyFilter);
      });
    }

    return filtered; // stable output, fast, safe
  }
);

/* ------------------ UI STATE SELECTORS ------------------ */

export const selectToast = (s) => s.ui.toast;
export const selectCommandMenuOpen = (s) => s.ui.commandMenuOpen;

export const selectShortcutsEnabled = (s) => s.shortcuts.enabled;
