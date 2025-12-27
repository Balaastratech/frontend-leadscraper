// src/features/icp/hooks/useICP.js
import { useDispatch, useSelector } from "react-redux";
import { createICP, updateICP, deleteICP } from "../store/icpSlice";

/**
 * Thin adapter over redux slice for ICPs.
 * Keeps names backward-compatible and adds an `update` method for arbitrary changes.
 *
 * Source (original) referenced. :contentReference[oaicite:5]{index=5}
 */
export default function useICP() {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.icp?.list || []);

  const add = (payload) => dispatch(createICP(payload));
  const remove = (id) => dispatch(deleteICP(id));

  // keep old alias for rename
  const rename = (id, name) =>
    dispatch(updateICP({ id, changes: { name } }));

  // generic update that accepts any partial changes object
  const update = (id, changes) =>
    dispatch(updateICP({ id, changes }));

  return { list, add, remove, rename, update };
}
