import React from "react";

import AuthLayout from "../../../ui/auth/AuthLayout";
import AuthRight from "../../../ui/auth/AuthRight";
import AuthLeft from "../../../ui/auth/AuthLeft";
import AuthCard from "../../../ui/auth/AuthCard";
import AuthHeading from "../../../ui/auth/AuthHeading";
import AuthButton from "../../../ui/auth/AuthButton";


export default function OnboardingPage() {
  return (
    <AuthLayout
      left={<AuthLeft />}
      right={
        <AuthRight>
          <AuthCard>
            <AuthHeading
              title="Welcome"
              subtitle="Your account has been created. Continue onboarding."
            />
            <AuthButton>Continue</AuthButton>
          </AuthCard>
        </AuthRight>
      }
    />
  );
}
