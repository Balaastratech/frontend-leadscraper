import React from "react";
import { motion } from "framer-motion";
import Card from "../../../ui/Surface/Card";
import Text from "../../../ui/Typography/Text";

export default function KPIBar({ kpis = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {kpis.map((k) => (
        <motion.div key={k.id} whileHover={{ y: -4 }} transition={{ duration: 0.14 }}>
          <Card role="region" aria-label={k.label} className="p-3 flex flex-col">
            <Text size="xs" color="muted">{k.label}</Text>
            <div className="mt-1 text-2xl font-semibold">{k.value}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
