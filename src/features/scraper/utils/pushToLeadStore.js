import { createLead } from "../../leads/store/leadsSlice";
import { normalizeScrapedLead } from "./normalizeScrapedLead";

/**
 * Push a scraped item into the lead store.
 * Normalizes first. Dispatches createLead thunk.
 * @param {object} store - your Redux store instance
 * @param {object} raw   - raw scraped result item
 */
export function pushToLeadStore(store, raw) {
  if (!store || !raw) return;
  const lead = normalizeScrapedLead(raw);
  store.dispatch(createLead(lead));
}

/**
 * Bulk import version
 * @param {object} store
 * @param {Array<object>} items
 */
export function pushManyToLeadStore(store, items = []) {
  if (!store || !Array.isArray(items)) return;
  for (const x of items) {
    const lead = normalizeScrapedLead(x);
    store.dispatch(createLead(lead));
  }
}
