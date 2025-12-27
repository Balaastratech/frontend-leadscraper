// src/features/icp/components/ICPBuilder.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import useICPBuilder from "../hooks/useICPBuilder";

import Card from "../../../ui/Surface/Card";
import Input from "../../../ui/Form/Input";
import Textarea from "../../../ui/Form/Textarea";
import Button from "../../../ui/Form/Button";
import Text from "../../../ui/Typography/Text";
import Title from "../../../ui/Typography/Title";

import Grid from "../../../ui/Layout/Grid";
import Stack from "../../../ui/Layout/Stack";
import Row from "../../../ui/Layout/Row";
import Col from "../../../ui/Layout/Col";
import Spacer from "../../../ui/Layout/Spacer";
import Tag from "../../../ui/Feedback/Tag";

export default function ICPBuilder() {
  const {
    list,

    name,
    setName,
    description,
    setDescription,
    tagsRaw,
    setTagsRaw,
    onCreate,

    editId,
    editName,
    setEditName,
    onStartEdit,
    onSaveEdit,
    onDelete,

    removeTag,
  } = useICPBuilder();

  return (
    <Card padding="0" className="p-0">
      <Stack space="lg" flex={false}>

        {/* Header */}
        <Row align="center" justify="space-between">
          <Title size="lg">ICP Builder</Title>
          <Text size="xs" color="muted">
            {list.length} saved
          </Text>
        </Row>

        {/* Two columns */}
        <Grid cols={{ base: 1, md: 2 }} gap="xl">
          {/* Left – create form */}
          <Card padding="lg" variant="surface">
            <Stack space="md">
              <Text size="xs" color="muted">
                Name
              </Text>
              <Input value={name} onChange={(e) => setName(e.target.value)} />

              <Text size="xs" color="muted">
                Description
              </Text>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />

              <Text size="xs" color="muted">
                Tags (comma separated)
              </Text>
              <Input
                value={tagsRaw}
                onChange={(e) => setTagsRaw(e.target.value)}
              />

              <Row>
                <Spacer  />
                <Button variant="primary" onClick={onCreate}>
                  Save ICP
                </Button>
              </Row>
            </Stack>
          </Card>

          {/* Right – list */}
          <Card padding="lg" variant="surface">
            <Text size="xs" color="muted">
              Saved ICPs
            </Text>

            {/* Equal-height grid */}
            <Grid
              cols={{ base: 1 }}
              gap="md"
              style={{
                marginTop: 12,
                gridAutoRows: "1fr",
              }}
            >
              <AnimatePresence>
                {list.map((icp) => (
                  <motion.div
                    key={icp.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    style={{ height: "100%" }}
                  >
                    <Card
                      padding="md"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {/* ROW 1 — name + buttons */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {/* Name (or rename input) */}
                        <div style={{ minWidth: 0 }}>
                          {editId === icp.id ? (
                            <Input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                            />
                          ) : (
                            <Text size="sm" weight="medium">
                              {icp.name}
                            </Text>
                          )}
                        </div>

                        {/* Buttons — always aligned with the name */}
                        <Stack
                          space="sm"
                          style={{
                            alignItems: "flex-end",
                            flexShrink: 0,
                            marginLeft: 12,
                          }}
                        >
                          {editId === icp.id ? (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={onSaveEdit}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => onStartEdit(icp)}
                            >
                              Rename
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(icp.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </div>

                      {/* ROW 2 — Description */}
                      <Text size="xs" color="muted">
                        {icp.description}
                      </Text>

                      {/* ROW 3 — Tags */}
                      <Row wrap="wrap" gap="xs">
                        {(icp.tags || []).map((tag) => (
                          <Tag
                            key={tag}
                            label={tag}
                            color="indigo"
                            variant="soft"
                            size="sm"
                            rounded="lg"
                            onRemove={() => removeTag(icp.id, tag)}
                          />
                        ))}
                      </Row>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {list.length === 0 && (
                <Text size="xs" color="muted">
                  No ICPs yet.
                </Text>
              )}
            </Grid>
          </Card>
        </Grid>
      </Stack>
    </Card>
  );
}
