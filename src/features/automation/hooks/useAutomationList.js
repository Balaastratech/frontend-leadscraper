// src/hooks/useAutomationList.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRules, createRule, runRule } from "../store/automationSlice";
import { useNavigate } from "react-router-dom";

/**
 * useAutomationList - provides data and actions for list page
 */
export default function useAutomationList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rules = useSelector((s) => s.automation.rules || []);

  useEffect(() => {
    dispatch(fetchRules());
  }, [dispatch]);

  const onNew = async () => {
    const name = window.prompt("Rule name", "Untitled rule");
    if (!name) return;
    const payload = { name, nodes: [], edges: [] };
    const res = await dispatch(createRule(payload));
    if (res && res.payload && res.payload.id) {
      navigate(`/app/automation/${res.payload.id}`);
    }
  };

  const onRefresh = () => dispatch(fetchRules());
  const onRun = (id) => dispatch(runRule(id));
  const onEdit = (id) => navigate(`/app/automation/${id}`);

  return { rules, onNew, onRefresh, onRun, onEdit };
}
