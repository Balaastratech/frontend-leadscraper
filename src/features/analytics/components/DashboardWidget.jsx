import React from "react";
import { motion } from "framer-motion";
import Card from "../../../ui/Surface/Card";
import Text from "../../../ui/Typography/Text";

export default function DashboardWidget({ title, value, children }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.15 }}>
      <Card role="region" aria-label={title}>
        <Text size="xs" color="muted">{title}</Text>
        <div className="mt-1">
          <div className="text-2xl font-semibold">{value}</div>
        </div>
        {children && <div className="mt-3">{children}</div>}
      </Card>
    </motion.div>
  );
}
