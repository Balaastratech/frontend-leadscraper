// feature hook: encapsulates dispatch and selectors
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverview, fetchClusters } from "../store/analyticsSlice";

export default function useAnalytics() {
  const dispatch = useDispatch();
  const overview = useSelector((s) => s.analytics?.overview);
  const clusters = useSelector((s) => s.analytics?.clusters || []);
  const loading = useSelector((s) => s.analytics?.loading);
  const error = useSelector((s) => s.analytics?.error);

  useEffect(() => {
    dispatch(fetchOverview());
    dispatch(fetchClusters());
  }, [dispatch]);

  return { overview, clusters, loading, error };
}
