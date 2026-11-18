"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Notice from "@/shared/components/Notice";
import { Alert } from "@omniroute/ui-kit/alert";
import { Card, Button, Input, Select } from "@/shared/components";
import NumberInput from "@/shared/components/NumberInput";
import RetrievePreview from "../RetrievePreview";
import type { RetrievePreviewResult } from "@/shared/schemas/memory";

export default function PlaygroundTab() {
  const t = useTranslations("memory");
  const [query, setQuery] = useState("");
  const [strategy, setStrategy] = useState<"exact" | "semantic" | "hybrid">("hybrid");
  const [budget, setBudget] = useState("2000");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RetrievePreviewResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/memory/retrieve-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          strategy,
          maxTokens: parseInt(budget) || 2000,
          limit: 20,
        }),
      });
      if (res.ok) {
        const data: RetrievePreviewResult = await res.json();
        setResult(data);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error?.message ?? t("playground.errorFetch"));
      }
    } catch {
      setError(t("playground.errorFetch"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Info */}
      <Alert
        variant="info"
        dismissible={false}
        icon={<Icon name="science" size={18} />}
        title={t("playground.infoTitle")}
        description={t("playground.infoDesc")}
      />

      {/* Controls */}
      <Card>
        <div className="p-4 space-y-4">
          <Input
            label={t("playground.queryLabel")}
            data-testid="playground-query-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("playground.queryPlaceholder")}
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                void handleSubmit();
              }
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label={t("playground.strategyLabel")}
              data-testid="playground-strategy-select"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value as "exact" | "semantic" | "hybrid")}
              className="w-full"
            >
              <option value="exact">{t("playground.strategyExact")}</option>
              <option value="semantic">{t("playground.strategySemantic")}</option>
              <option value="hybrid">{t("playground.strategyHybrid")}</option>
            </Select>

            <NumberInput
              label={t("playground.budgetLabel")}
              data-testid="playground-budget-input"
              value={budget === "" ? null : Number(budget)}
              onValueChange={(tokens) => setBudget(tokens === null ? "" : String(tokens))}
              min={100}
              max={16000}
              step={100}
              className="w-full"
            />

            <div className="flex items-end">
              <Button
                data-testid="playground-submit"
                onClick={handleSubmit}
                loading={loading}
                disabled={!query.trim()}
                className="w-full"
              >
                {t("playground.simulate")}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Error */}
      {error && <Notice variant="critical">{error}</Notice>}

      {/* Results */}
      {result && (
        <Card>
          <div className="p-4">
            <h3 className="ci-heading mb-4" data-size="sm">
              {t("playground.resultsTitle", { count: result.memories.length })}
            </h3>
            <RetrievePreview result={result} />
          </div>
        </Card>
      )}
    </div>
  );
}
