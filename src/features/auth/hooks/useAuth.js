import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login as loginThunk } from "../store/authSlice";

/**
 * useAuth
 * - encapsulates auth logic and exposes a login function.
 * - returns { user, token, loading, error, login }
 */
export default function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth?.user);
  const token = useSelector((s) => s.auth?.token);
  const loading = useSelector((s) => s.auth?.loading);
  const error = useSelector((s) => s.auth?.error);

  const login = useCallback(
    async ({ email, password }) => {
      try {
        const action = await dispatch(loginThunk({ email, password }));
        if (loginThunk.fulfilled.match(action)) {
          return { ok: true, payload: action.payload };
        }
        // thunk rejected
        return { ok: false, error: action.error?.message || "Login failed" };
      } catch (ex) {
        return { ok: false, error: ex?.message || "Login failed" };
      }
    },
    [dispatch]
  );

  return { user, token, loading, error, login };
}
