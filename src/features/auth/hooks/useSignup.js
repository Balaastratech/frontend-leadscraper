import { useCallback } from "react";
import * as api from "../api/auth";

/**
 * useSignup
 * - Wraps the feature API and provides small helpers for signup flow.
 * - Returns: { start, verify, create }
 */
export default function useSignup() {
  const start = useCallback(async (email) => {
    try {
      const res = await api.startSignup(email);
      return { ok: true, payload: res };
    } catch (ex) {
      return { ok: false, error: ex?.message || "start failed" };
    }
  }, []);

  const verify = useCallback(async (email, code) => {
    try {
      const res = await api.verifySignupCode(email, code);
      return { ok: true, payload: res };
    } catch (ex) {
      return { ok: false, error: ex?.message || "verify failed" };
    }
  }, []);

  const create = useCallback(async (email, password) => {
    try {
      const res = await api.createAccount(email, password);
      return { ok: true, payload: res };
    } catch (ex) {
      return { ok: false, error: ex?.message || "create failed" };
    }
  }, []);

  return { start, verify, create };
}
