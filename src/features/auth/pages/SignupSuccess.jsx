import React from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthButton from "../../../ui/auth/AuthButton";

export default function SignupSuccess() {
  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading
              title="Account Created"
              subtitle="Your account is ready. Log in to continue."
            />

            <Link to="/login">
              <AuthButton>Go to Login</AuthButton>
            </Link>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
