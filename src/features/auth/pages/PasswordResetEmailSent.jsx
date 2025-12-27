import React from "react";
import { useLocation, Link } from "react-router-dom";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthButton from "../../../ui/auth/AuthButton";

export default function PasswordResetEmailSent() {
  const { state } = useLocation();
  const email = state?.email;
  const token = state?.token;

  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading title="Reset Link Sent" />

            <p className="text-zinc-400 mb-4">We sent a link to:</p>
            <p className="text-white font-medium mb-6">{email}</p>

            <Link
              to="/reset/confirm"
              state={{ token }}
            >
              <AuthButton>Reset Password</AuthButton>
            </Link>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
