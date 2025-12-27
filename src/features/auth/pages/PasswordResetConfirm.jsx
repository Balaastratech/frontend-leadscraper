import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthPasswordField from "../../../ui/auth/AuthPasswordField";
import AuthButton from "../../../ui/auth/AuthButton";

import useResetPassword from "../hooks/useResetPassword";

export default function PasswordResetConfirm() {
  const nav = useNavigate();
  const { state } = useLocation();
  const token = state?.token;

  const { confirm } = useResetPassword();

  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (pw !== confirmPw) return setErr("Passwords do not match.");

    setLoading(true);
    const res = await confirm(token, pw);
    setLoading(false);

    if (res.ok) nav("/login");
    else setErr("Invalid or expired token.");
  }

  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading title="Set New Password" />

            <form onSubmit={submit}>
              <AuthPasswordField
                label="Password"
                value={pw}
                onChange={setPw}
                showStrength
              />

              <AuthPasswordField
                label="Confirm Password"
                value={confirmPw}
                onChange={setConfirmPw}
              />

              {err && <p className="text-red-500 text-sm">{err}</p>}

              <AuthButton type="submit">
                {loading ? "Resetting…" : "Set Password"}
              </AuthButton>
            </form>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
