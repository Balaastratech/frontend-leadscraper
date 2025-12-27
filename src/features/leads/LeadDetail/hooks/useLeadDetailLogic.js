// useLeadDetailLogic.js
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as leadsApi from "../../api/leads";

/* Simple in-memory cache */
const leadCache = new Map();

function sanitizeLead(raw = {}) {
  return {
    name: raw.name ?? "",
    email: raw.email ?? "",
    company: raw.company ?? "",
    status: raw.status ?? "unknown",
    score: raw.score ?? 0,
    ...raw,
  };
}

export default function useLeadDetailLogic(id, { toast } = {}) {
  const navigate = useNavigate();
  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  const [lead, setLead] = useState(() => (id ? leadCache.get(id) ?? null : null));
  const [loading, setLoading] = useState(!Boolean(lead));
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!isEditing) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isEditing]);

  const fetchLead = useCallback(
    async (opts = { force: false }) => {
      if (!id) {
        setError("No lead id");
        setLoading(false);
        return null;
      }

      // Show cache immediately unless force
      if (!opts.force && leadCache.has(id)) {
        const cached = leadCache.get(id);
        setLead(cached);
        setError(null);
        setLoading(false);
        // fall through to background refresh
      } else {
        setLoading(true);
      }

      try {
        if (abortRef.current) abortRef.current.abort();
        abortRef.current = new AbortController();
        const res = await leadsApi.get(id, { signal: abortRef.current.signal });

        if (!mountedRef.current) return null;

        if (res?.status === 404 || !res?.lead) {
          leadCache.delete(id);
          setLead(null);
          setError("Lead not found");
          setLoading(false);
          return null;
        }

        if (res.error) throw new Error(res.error.message || "Failed to fetch");

        const sanitized = sanitizeLead(res.lead);
        leadCache.set(id, sanitized);
        setLead(sanitized);
        setError(null);
        return sanitized;
      } catch (err) {
        if (err.name === "AbortError") return null;
        const msg = err?.message ?? "Failed to load lead";
        setError(msg);
        if (toast?.error) toast.error(msg);
        return null;
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    [id, toast]
  );

  // fetch on id changes only
  useEffect(() => {
    if (!id) return;
    fetchLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateLead = useCallback(
    async (updates) => {
      // apply optimistic update using functional set to avoid stale closure
      let previous;
      setLead((prev) => {
        previous = prev ?? leadCache.get(id) ?? null;
        if (!previous) return prev;
        const optimistic = sanitizeLead({ ...previous, ...updates });
        leadCache.set(id, optimistic);
        return optimistic;
      });

      try {
        const res = await leadsApi.update(id, updates);
        if (res?.error) throw new Error(res.error.message || "Update failed");

        if (res?.lead) {
          const sanitized = sanitizeLead(res.lead);
          leadCache.set(id, sanitized);
          setLead(sanitized);
          if (toast?.success) toast.success("Lead updated");
          return sanitized;
        }

        if (toast?.success) toast.success("Lead updated");
        return leadCache.get(id);
      } catch (err) {
        // rollback
        if (previous) {
          leadCache.set(id, previous);
          setLead(previous);
        }
        const msg = err?.message ?? "Failed to update lead";
        if (toast?.error) toast.error(msg);
        throw err;
      }
    },
    [id, toast]
  );

  const confirmDelete = useCallback(() => setShowDeleteModal(true), []);
  const closeDelete = useCallback(() => setShowDeleteModal(false), []);

  const doDelete = useCallback(async () => {
    if (!id) return false;
    setDeleting(true);
    try {
      const res = await leadsApi.remove(id);
      if (res?.error) throw new Error(res.error.message || "Delete failed");
      leadCache.delete(id);
      if (toast?.success) toast.success("Lead deleted");
      navigate("/app/leads");
      return true;
    } catch (err) {
      const msg = err?.message ?? "Failed to delete lead";
      if (toast?.error) toast.error(msg);
      setDeleting(false);
      return false;
    }
  }, [id, navigate, toast]);

  const goBack = useCallback(() => navigate("/app/leads"), [navigate]);

  return {
    lead,
    loading,
    error,
    isEditing,
    setIsEditing,
    fetchLead,
    updateLead,
    confirmDelete,
    closeDelete,
    doDelete,
    deleting,
    showDeleteModal,
    goBack,
  };
}
