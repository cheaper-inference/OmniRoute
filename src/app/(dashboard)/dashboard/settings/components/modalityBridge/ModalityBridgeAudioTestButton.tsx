"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";

const SAMPLE_INPUT = {
  model: "modality-bridge/self-test",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "Transcribe this audio clip." },
        {
          type: "input_audio",
          input_audio: {
            data: "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=",
            format: "wav",
          },
        },
      ],
    },
  ],
};

const DISABLED_GUARDRAILS = [
  "vision-bridge",
  "pii-masker",
  "prompt-injection",
  "credential-masker",
];

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function findAudioMeta(value: unknown): Record<string, unknown> | null {
  const body = asRecord(value);
  if (!Array.isArray(body?.results)) return null;
  for (const entry of body.results) {
    const result = asRecord(entry);
    if (result?.guardrail === "audio-bridge") return asRecord(result.meta);
  }
  return null;
}

function readErrorMessage(value: unknown): string | null {
  const error = asRecord(asRecord(value)?.error);
  return typeof error?.message === "string" ? error.message : null;
}

export default function ModalityBridgeAudioTestButton() {
  const t = useTranslations("settings");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runTest = async () => {
    setRunning(true);
    setResult(null);
    try {
      const response = await fetch("/api/guardrails/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: SAMPLE_INPUT, disabledGuardrails: DISABLED_GUARDRAILS }),
      });
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) throw new Error(readErrorMessage(body) ?? `HTTP ${response.status}`);

      const meta = findAudioMeta(body);
      if (typeof meta?.clipsProcessed === "number" && meta.clipsProcessed >= 1) {
        setResult(
          t("modalityBridgeAudioTestOk", {
            count: meta.clipsProcessed,
            model: String(meta.sttModel ?? "unknown"),
          })
        );
      } else {
        setResult(t("modalityBridgeAudioTestNoop"));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setResult(t("modalityBridgeAudioTestError", { message }));
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        variant="outline"
        size="sm"
        icon="play_arrow"
        loading={running}
        disabled={running}
        onClick={() => void runTest()}
      >
        {t(running ? "modalityBridgeAudioTestRunning" : "modalityBridgeAudioTestButton")}
      </Button>
      {result && (
        <p className="text-xs text-text-muted" role="status">
          {result}
        </p>
      )}
    </div>
  );
}
