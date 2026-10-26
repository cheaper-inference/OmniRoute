"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import { Card, Button, Input, Select } from "@/shared/components";
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
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <Icon name="science" size={20} className="text-primary mt-0.5" />
        <div>
          <p className="font-medium text-text-main mb-0.5">{t("playground.infoTitle")}</p>
          <p>{t("playground.infoDesc")}</p>
        </div>
      </div>

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

            <Input
              label={t("playground.budgetLabel")}
              data-testid="playground-budget-input"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              type="number"
              min="100"
              max="16000"
              step="100"
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
      {error && (
        <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-xs text-error">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-semibold text-text-main mb-4">
              {t("playground.resultsTitle", { count: result.memories.length })}
            </h3>
            <RetrievePreview result={result} />
          </div>
        </Card>
      )}
    </div>
  );
}
