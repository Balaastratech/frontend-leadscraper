import React from "react";
import { motion } from "framer-motion";
import Card from "../../../ui/Surface/Card";
import Text from "../../../ui/Typography/Text";

export default function AIInsightsRibbon({ insights = [] }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 py-2">
        {insights.map((t, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }}>
            <Card className="min-w-[260px] p-3" role="article" aria-label={`AI insight ${i + 1}`}>
              <div className="text-xs text-indigo-600 font-medium">AI Insight</div>
              <Text size="sm" className="mt-1" style={{ whiteSpace: "pre-wrap" }}>{t}</Text>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
