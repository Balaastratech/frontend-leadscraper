import { useCallback } from "react";
import * as api from "../api/auth";

/**
 * useResetPassword
 * - resetRequest(email)
 * - resetPassword(token, newPw)
 */
export default function useResetPassword() {
  const request = useCallback(async (email) => {
    try {
      const res = await api.resetRequest(email);
      return { ok: true, payload: res };
    } catch (ex) {
      return { ok: false, error: ex?.message || "reset request failed" };
    }
  }, []);

  const confirm = useCallback(async (token, newPassword) => {
    try {
      const res = await api.resetPassword(token, newPassword);
      return { ok: true, payload: res };
    } catch (ex) {
      return { ok: false, error: ex?.message || "reset failed" };
    }
  }, []);

  return { request, confirm };
}
