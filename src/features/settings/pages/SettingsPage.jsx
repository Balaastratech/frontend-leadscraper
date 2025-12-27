import React from "react";
import { Outlet } from "react-router-dom";
import SettingsLayout from "../../../ui/Settings/SettingsLayout";

export default function SettingsPage() {
  return (
    <SettingsLayout>
      <Outlet />
    </SettingsLayout>
  );
}
