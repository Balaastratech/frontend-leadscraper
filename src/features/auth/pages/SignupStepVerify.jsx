import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthInput from "../../../ui/auth/AuthInput";
import AuthButton from "../../../ui/auth/AuthButton";

import useSignup from "../hooks/useSignup";

export default function SignupStepVerify() {
  const nav = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const { verify } = useSignup();

  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");

    setLoading(true);
    const res = await verify(email, code);
    setLoading(false);

    if (res.ok) nav("/signup/password", { state: { email } });
    else setErr("Invalid code.");
  }

  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading title="Verify Email" />

            <p className="text-zinc-400 text-sm mb-6">
              Enter the 6-digit code sent to:
            </p>
            <p className="text-white font-medium mb-6">{email}</p>

            <form onSubmit={submit}>
              <AuthInput
                label="Code"
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              {err && <p className="text-red-500 text-sm">{err}</p>}

              <AuthButton type="submit">
                {loading ? "Verifying…" : "Verify"}
              </AuthButton>
            </form>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
