import React from "react";
import HelpChatPanel from "../../../features/help/components/HelpChatPanel";
import Panel from "../../../ui/Layout/Panel";
import Title from "../../../ui/Typography/Title"; // if exists; otherwise use simple header

export default function HelpCenterPage() {
  return (
    <div className="p-6">
      <Title>Help Center</Title>
      <p className="text-sm text-gray-600 mb-4">
        Full support center with AI/human mock agent. Floating bubble also available on every page.
      </p>

      <Panel className="bg-white p-4 rounded shadow" role="region" ariaLabel="Help center panel">
        <HelpChatPanel />
      </Panel>
    </div>
  );
}
