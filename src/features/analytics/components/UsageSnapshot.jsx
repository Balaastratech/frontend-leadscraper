import React from "react";
import UsageMeter from "../../../design/primitives/UsageMeter";
import Card from "../../../ui/Surface/Card";
import Text from "../../../ui/Typography/Text";

export default function UsageSnapshot({ usage = {} }) {
  const u = usage || { scrapingUsed: 342, scrapingLimit: 500, aiTokensUsed: 12832, aiTokensLimit: 20000 };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Usage</div>
        <div className="text-xs text-gray-500">This billing period</div>
      </div>

      <div className="space-y-3">
        <UsageMeter label="Scraping Credits" value={u.scrapingUsed} limit={u.scrapingLimit} />
        <UsageMeter label="AI Tokens" value={u.aiTokensUsed} limit={u.aiTokensLimit} />
      </div>
    </Card>
  );
}
