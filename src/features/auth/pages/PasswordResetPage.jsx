import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthInput from "../../../ui/auth/AuthInput";
import AuthButton from "../../../ui/auth/AuthButton";

import useResetPassword from "../hooks/useResetPassword";

export default function PasswordResetPage() {
  const nav = useNavigate();
  const { request } = useResetPassword();

  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await request(email);
    setLoading(false);

    if (res.ok)
      nav("/reset-email-sent", { state: { email, token: res.payload.token } });
    else setErr("Failed to send reset link.");
  }

  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading title="Reset Password" />

            <form onSubmit={submit}>
              <AuthInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {err && <p className="text-red-500 text-sm">{err}</p>}

              <AuthButton type="submit">
                {loading ? "Sending…" : "Send Reset Link"}
              </AuthButton>
            </form>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
