import React from "react";
import Title from "../../ui/Typography/Title";
import Text from "../../ui/Typography/Text";

export default function UsageMeter({ label, value, limit }) {
  const pct = Math.round((value / limit) * 100) + "%";

  return (
    <div className="w-full">
      <Title size="base">{label}</Title>

      <div className="w-full mt-3">
        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="h-full bg-indigo-500 rounded"
            style={{ width: pct }}
          />
        </div>
      </div>

      <Text size="sm" color="muted" className="mt-3">
        {value}/{limit} ({pct})
      </Text>
    </div>
  );
}
