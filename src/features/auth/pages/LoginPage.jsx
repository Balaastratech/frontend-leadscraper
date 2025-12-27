import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthInput from "../../../ui/auth/AuthInput";
import AuthPasswordField from "../../../ui/auth/AuthPasswordField";
import AuthButton from "../../../ui/auth/AuthButton";


import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const nav = useNavigate();
  const { login, loading, error: authError } = useAuth();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");

    const res = await login({ email, password: pw });
    if (res.ok) return nav("/app");

    const msg = res.error;
    if (msg.includes("no_account")) setErr("No account found.");
    else if (msg.includes("not_verified")) setErr("Email not verified.");
    else if (msg.includes("bad_password")) setErr("Incorrect password.");
    else setErr("Login failed.");
  }

  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading title="Welcome back" subtitle="Sign in to continue" />

            <form onSubmit={submit}>
              <AuthInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <AuthPasswordField
                label="Password"
                value={pw}
                onChange={setPw}
              />

              {(err || authError) && (
                <p className="text-red-500 text-sm">{err || authError}</p>
              )}

              <AuthButton type="submit">
                {loading ? "Logging in…" : "Login"}
              </AuthButton>

              <div className="flex justify-between mt-4 text-sm text-zinc-400">
                <Link to="/reset" className="hover:text-white">Forgot?</Link>
                <Link to="/signup" className="hover:text-white">Sign up</Link>
              </div>
            </form>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
