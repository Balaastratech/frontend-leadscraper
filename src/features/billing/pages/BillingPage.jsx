import React from "react";
import useBillingPage from "../hooks/useBillingPage";

import Container from "../../../ui/Layout/Container";
import Stack from "../../../ui/Layout/Stack";
import Grid from "../../../ui/Layout/Grid";

import Card from "../../../ui/Surface/Card";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import Button from "../../../ui/Form/Button";
import UsageMeter from "../../../design/primitives/UsageMeter";

export default function BillingPage() {
  const { plans, usage, checkout, buy } = useBillingPage();

  return (
    <Container>
      <Stack gap="8" className="w-full">
        {/* Header */}
        <div>
          <Title size="xl">Billing</Title>
          <Text size="sm" color="muted">
            Manage your credits and subscription plans.
          </Text>
        </div>

        {/* Usage */}
        <Card
          padding="lg"
          className="w-full space-y-6 relative overflow-hidden"
        >
          <Title size="base">Usage</Title>

          {!usage && <Text>Loading…</Text>}

          {usage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full">
              <div className="w-full">
                <UsageMeter
                  label="Scraping Credits"
                  value={usage.scrapingUsed}
                  limit={usage.scrapingLimit}
                />
              </div>

              <div className="w-full">
                <UsageMeter
                  label="AI Tokens"
                  value={usage.aiTokensUsed}
                  limit={usage.aiTokensLimit}
                />
              </div>
            </div>
          )}
        </Card>

        {/* Plans */}
        <Card padding="lg" className="w-full space-y-6">
          <Title size="base">Plans</Title>

          <Grid cols="1 sm:2 lg:3" gap="6" className="w-full">
            {plans.map((p) => (
              <Card
                key={p.id}
                padding="lg"
                variant="subtle"
                className="hover:shadow-md transition-all"
              >
                <Stack gap="3">
                  <Title size="lg">{p.name}</Title>
                  <Title size="xl">${p.price}</Title>
                  <Text size="sm" color="muted">
                    {p.credits} scraping credits
                  </Text>

                  <Button variant="primary" onClick={() => buy(p.id)}>
                    Buy
                  </Button>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Card>
      </Stack>
    </Container>
  );
}
