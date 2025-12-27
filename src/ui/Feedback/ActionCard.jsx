// src/ui/Feedback/ActionCard.jsx
import React from "react";
import { motion } from "framer-motion";
import Card from "../Surface/Card";
import Title from "../Typography/Title";
import Text from "../Typography/Text";

/**
 * ActionCard
 * Visual primitive for small actionable cards with micro-interaction.
 *
 * Props:
 * - title, description, children, disabled, className, twin
 * - All layout, spacing, and visuals live here.
 *
 * Note: twin prop is forwarded to allow feature-level twin overrides while keeping visual logic here.
 */
export default function ActionCard({
  title,
  description,
  children,
  disabled = false,
  className = "",
  twin = "",
  ...rest
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.14 }}
      style={{ pointerEvents: disabled ? "none" : undefined }}
      aria-disabled={disabled}
    >
      <Card
        padding="md"
        radius="xl"
        shadow="sm"
        className={`${className} ${twin}`}
        role="group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <Title size="sm" as="div">{title}</Title>
            </div>
            {description ? (
              <Text size="xs" muted className="mt-1">{description}</Text>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {children}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
