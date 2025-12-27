import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthPasswordField from "../../../ui/auth/AuthPasswordField";
import AuthButton from "../../../ui/auth/AuthButton";

import useSignup from "../hooks/useSignup";

export default function SignupStepPassword() {
  const nav = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const { create } = useSignup();

  const [pw, setPw] = useState("");
  const [conf, setConf] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (pw !== conf) return setErr("Passwords do not match.");

    setLoading(true);
    const res = await create(email, pw);
    setLoading(false);

    if (res.ok) nav("/signup/success");
    else setErr("Failed to create account.");
  }

  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading title="Create Password" />

            <form onSubmit={submit}>
              <AuthPasswordField
                label="Password"
                value={pw}
                onChange={setPw}
                showStrength
              />

              <AuthPasswordField
                label="Confirm Password"
                value={conf}
                onChange={setConf}
              />

              {err && <p className="text-red-500 text-sm">{err}</p>}

              <AuthButton type="submit">
                {loading ? "Creating…" : "Create Account"}
              </AuthButton>
            </form>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
