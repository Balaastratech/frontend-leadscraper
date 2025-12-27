import httpClient from "../../../api/httpClient";
import { wait } from "../../../api/utils";

/**
 * Normalize API responses coming from mock backend.
 * Prevents UI crashes if mock returns invalid data.
 */
function normalizeListResponse(data, query) {
  const leads = Array.isArray(data?.leads) ? data.leads : [];

  const meta = {
    total: Number(data?.meta?.total) || leads.length,
    page: Number(data?.meta?.page) || query.page || 1,
    limit: Number(data?.meta?.limit) || query.limit || 10,
    totalPages: Number(data?.meta?.totalPages) || 1,
  };

  return { leads, meta };
}

/**
 * Create AbortController for cancelable requests (important for search).
 */
let abortController = null;

/**
 * LIST LEADS — supports mock backend + cancelation + normalization
 */
export async function list(query = {}) {
  if (abortController) abortController.abort();
  abortController = new AbortController();

  await wait(300);

  try {
    const params = new URLSearchParams();

    if (query.search) params.append("search", query.search);
    if (Array.isArray(query.status))
      query.status.forEach((s) => params.append("status", s));
    if (query.minScore !== null && query.minScore !== undefined)
      params.append("minScore", query.minScore);
    if (query.maxScore !== null && query.maxScore !== undefined)
      params.append("maxScore", query.maxScore);
    if (query.company) params.append("company", query.company);

    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);

    const response = await httpClient.get("/api/leads", {
      params,
      signal: abortController.signal,
      timeout: 15000,
    });

    return normalizeListResponse(response.data, query);
  } catch (error) {
    if (error.name === "CanceledError")
      return normalizeListResponse({ leads: [], meta: {} }, query);

    return normalizeListResponse(
      { leads: [], meta: { total: 0, totalPages: 0 } },
      query
    );
  }
}

/**
 * GET LEAD BY ID — mock safe
 */
export async function get(id) {
  if (!id) {
    return {
      lead: null,
      error: { message: "Lead ID is required", code: "VALIDATION_ERROR" },
    };
  }

  await wait(150);

  try {
    const response = await httpClient.get(`/api/leads/${id}`, {
      timeout: 15000,
    });
    const lead = response.data?.lead;

    if (!lead || !lead.id) {
      return {
        lead: null,
        error: { message: "Invalid lead data", code: "INVALID_DATA" },
      };
    }

    return { lead };
  } catch (error) {
    console.error(`Failed to fetch lead ${id}:`, error.message);

    return {
      lead: null,
      error: error.response?.data?.error || {
        message: "Failed to fetch lead",
        code: "FETCH_ERROR",
      },
    };
  }
}

/**
 * CREATE LEAD — mock safe & validated
 */
export async function create(payload) {
  if (!payload?.name || !payload?.email) {
    return {
      lead: null,
      error: {
        message: "Name and email are required",
        code: "VALIDATION_ERROR",
      },
    };
  }

  await wait(250);

  try {
    const response = await httpClient.post("/api/leads", payload, {
      timeout: 15000,
    });

    const lead = response.data?.lead;

    if (!lead || !lead.id) {
      return {
        lead: null,
        error: { message: "Invalid lead returned", code: "INVALID_DATA" },
      };
    }

    return { lead };
  } catch (error) {
    console.error("Failed to create lead:", error.message);

    return {
      lead: null,
      error: error.response?.data?.error || {
        message: "Failed to create lead",
        code: "CREATE_ERROR",
      },
    };
  }
}

/**
 * UPDATE LEAD — mock safe
 */
export async function update(id, changes) {
  if (!id) {
    return {
      lead: null,
      error: { message: "Lead ID is required", code: "VALIDATION_ERROR" },
    };
  }

  await wait(200);

  try {
    const response = await httpClient.patch(`/api/leads/${id}`, changes, {
      timeout: 15000,
    });

    const lead = response.data?.lead;

    if (!lead || !lead.id) {
      return {
        lead: null,
        error: { message: "Invalid updated lead", code: "INVALID_DATA" },
      };
    }

    return { lead };
  } catch (error) {
    console.error(`Failed to update lead ${id}:`, error.message);

    return {
      lead: null,
      error: error.response?.data?.error || {
        message: "Failed to update lead",
        code: "UPDATE_ERROR",
      },
    };
  }
}

/**
 * DELETE LEAD — mock safe
 */
export async function remove(id) {
  if (!id) {
    return {
      success: false,
      error: { message: "Lead ID is required", code: "VALIDATION_ERROR" },
    };
  }

  await wait(150);

  try {
    await httpClient.delete(`/api/leads/${id}`, { timeout: 15000 });
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete lead ${id}:`, error.message);

    return {
      success: false,
      error: error.response?.data?.error || {
        message: "Failed to delete lead",
        code: "DELETE_ERROR",
      },
    };
  }
}

/**
 * BULK DELETE — added for UI compatibility
 */
export async function bulkDelete(ids = []) {
  await wait(300);

  try {
    const response = await httpClient.post(
      "/api/leads/bulk-delete",
      { ids },
      { timeout: 15000 }
    );

    return response.data || { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || {
        message: "Bulk delete failed",
        code: "BULK_DELETE_ERROR",
      },
    };
  }
}

/**
 * BULK UPDATE / MERGE — mock extension
 */
export async function bulkUpdate(payload) {
  await wait(300);

  try {
    const response = await httpClient.post("/api/leads/bulk-update", payload, {
      timeout: 15000,
    });

    return response.data || { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || {
        message: "Bulk update failed",
        code: "BULK_UPDATE_ERROR",
      },
    };
  }
}

/**
 * BULK IMPORT CSV — mock safe
 */
export async function bulkImport(file) {
  if (!file) {
    return {
      status: "failed",
      importedCount: 0,
      failedCount: 0,
      error: { message: "File is required", code: "VALIDATION_ERROR" },
    };
  }

  if (!file.name.endsWith(".csv")) {
    return {
      status: "failed",
      importedCount: 0,
      failedCount: 0,
      error: { message: "Only CSV files allowed", code: "INVALID_FILE_TYPE" },
    };
  }

  await wait(600);

  try {
    const form = new FormData();
    form.append("file", file);

    const response = await httpClient.post("/api/leads/bulk-import", form, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 20000,
    });

    return response.data;
  } catch (error) {
    return {
      status: "failed",
      importedCount: 0,
      failedCount: 0,
      error: error.response?.data?.error || {
        message: "Import failed",
        code: "IMPORT_ERROR",
      },
    };
  }
}

export default {
  list,
  get,
  create,
  update,
  remove,
  bulkImport,
  bulkDelete,
  bulkUpdate,
};
