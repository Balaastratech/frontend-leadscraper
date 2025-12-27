import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthInput from "../../../ui/auth/AuthInput";
import AuthButton from "../../../ui/auth/AuthButton";

import useSignup from "../hooks/useSignup";

export default function SignupStepEmail() {
  const nav = useNavigate();
  const { start } = useSignup();

  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await start(email);
    setLoading(false);

    if (res.ok) nav("/signup/verify", { state: { email } });
    else if (res.error === "exists") setErr("Account already exists.");
    else setErr("Failed to start signup.");
  }

  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading title="Create Account" />

            <form onSubmit={submit}>
              <AuthInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {err && <p className="text-red-500 text-sm">{err}</p>}

              <AuthButton type="submit">
                {loading ? "Sending…" : "Continue"}
              </AuthButton>
            </form>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
