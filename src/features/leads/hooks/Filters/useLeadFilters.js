import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../../store/leadsSlice";
import { selectLeadFilters } from "../../store/selectors";
import { useToast } from "../../../../hooks/useToast";

export function useLeadFilters() {
  const dispatch = useDispatch();
  const globalFilters = useSelector(selectLeadFilters);
  const toast = useToast();

  // Local (staged) filter values
  const [localFilters, setLocalFilters] = useState({
    status: globalFilters.status || [],
    minScore: globalFilters.minScore?.toString() || "",
    maxScore: globalFilters.maxScore?.toString() || "",
    company: globalFilters.company || "",
  });

  const [scoreError, setScoreError] = useState(null);

  // Update local filters only
  const updateLocal = useCallback((key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Validate on input (instant feedback)
  const validateScores = useCallback((min, max) => {
    const minVal = min ? Number(min) : null;
    const maxVal = max ? Number(max) : null;

    if (minVal !== null && maxVal !== null && minVal > maxVal) {
      setScoreError("Min score cannot be greater than max score");
      return false;
    }
    if (minVal !== null && (minVal < 0 || minVal > 100)) {
      setScoreError("Score must be between 0 and 100");
      return false;
    }
    if (maxVal !== null && (maxVal < 0 || maxVal > 100)) {
      setScoreError("Score must be between 0 and 100");
      return false;
    }

    setScoreError(null);
    return true;
  }, []);

  // Input handlers (local only + validation)
  const handleMinScoreInput = useCallback(
    (value) => {
      updateLocal("minScore", value);
      validateScores(value, localFilters.maxScore);
    },
    [localFilters.maxScore, updateLocal, validateScores]
  );

  const handleMaxScoreInput = useCallback(
    (value) => {
      updateLocal("maxScore", value);
      validateScores(localFilters.minScore, value);
    },
    [localFilters.minScore, updateLocal, validateScores]
  );

  // Apply button → commit local filters to global Redux
  const applyFilters = useCallback(() => {
    if (!validateScores(localFilters.minScore, localFilters.maxScore)) return;

    dispatch(
      setFilters({
        status: localFilters.status,
        minScore: localFilters.minScore ? Number(localFilters.minScore) : null,
        maxScore: localFilters.maxScore ? Number(localFilters.maxScore) : null,
        company: localFilters.company.trim(),
      })
    );

    toast.success("Filters applied");
  }, [dispatch, localFilters, toast, validateScores]);

  // Reset
  const handleClearAll = useCallback(() => {
    dispatch(clearFilters());

    setLocalFilters({
      status: [],
      minScore: "",
      maxScore: "",
      company: "",
    });

    setScoreError(null);
    toast.info("Filters cleared");
  }, [dispatch, toast]);

  // Count active globally applied filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    const f = globalFilters;
    if (f.status.length) count++;
    if (f.minScore !== null) count++;
    if (f.maxScore !== null) count++;
    if (f.company) count++;
    return count;
  }, [globalFilters]);

  const filterTags = useMemo(() => {
    const f = globalFilters;
    const tags = [];

    if (f.status.length)
      tags.push({ key: "status", label: `Status: ${f.status.join(", ")}` });

    if (f.company)
      tags.push({ key: "company", label: `Company: ${f.company}` });

    if (f.minScore !== null || f.maxScore !== null)
      tags.push({
        key: "score",
        label: `Score: ${f.minScore || 0}-${f.maxScore || 100}%`,
      });

    return tags;
  }, [globalFilters]);

  return {
    localFilters,
    scoreError,
    activeFilterCount,
    filterTags,

    updateLocal,
    handleMinScoreInput,
    handleMaxScoreInput,
    applyFilters,
    handleClearAll,
  };
}
