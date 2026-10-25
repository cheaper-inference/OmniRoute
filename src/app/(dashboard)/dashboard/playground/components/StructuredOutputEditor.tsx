"use client";

// src/app/(dashboard)/dashboard/playground/components/StructuredOutputEditor.tsx

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Toggle from "@/shared/components/Toggle";
import Textarea from "@/shared/components/Textarea";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useStructuredOutput } from "../hooks/useStructuredOutput";
import type { StructuredOutputSchemaInput } from "../hooks/useStructuredOutput";

interface StructuredOutputEditorProps {
  structuredOutput: ReturnType<typeof useStructuredOutput>;
}

const DEFAULT_SCHEMA: StructuredOutputSchemaInput = {
  name: "my_schema",
  schema: {
    type: "object",
    properties: {
      result: { type: "string" },
    },
    required: ["result"],
  },
  strict: true,
};

/**
 * StructuredOutputEditor — toggle JSON mode on/off + edit JSON schema.
 *
 * When enabled, the Build tab sends response_format: { type: "json_schema", json_schema: {...} }.
 * Schema validation is client-side via Zod StructuredOutputSchema (D9).
 */
export default function StructuredOutputEditor({ structuredOutput }: StructuredOutputEditorProps) {
  const t = useTranslations("playground");
  const { enabled, schema, error, setEnabled, setSchema } = structuredOutput;

  const [schemaRaw, setSchemaRaw] = useState(JSON.stringify(schema ?? DEFAULT_SCHEMA, null, 2));
  const [nameField, setNameField] = useState(schema?.name ?? "my_schema");
  const [parseError, setParseError] = useState<string | null>(null);

  function handleValidate() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(schemaRaw);
    } catch {
      setParseError(t("invalidJson"));
      return;
    }
    setParseError(null);

    // The parsed JSON should be the inner schema object (not the full response_format wrapper)
    const input: StructuredOutputSchemaInput = {
      name: nameField.trim() || "my_schema",
      schema: parsed as Record<string, unknown>,
      strict: true,
    };

    setSchema(input);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-text-main">{t("jsonMode")}</span>
          <span className="text-[11px] text-text-muted">{t("jsonModeDescription")}</span>
        </div>
        <Toggle
          size="sm"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          ariaLabel={enabled ? t("disableJsonMode") : t("enableJsonMode")}
        />
      </div>

      {/* Schema editor (shown only when enabled) */}
      {enabled && (
        <div className="flex flex-col gap-2 border border-border rounded-lg p-3 bg-surface">
          {/* Schema name */}
          <Input
            label={t("schemaName")}
            type="text"
            value={nameField}
            onChange={(e) => setNameField(e.target.value)}
            placeholder="my_schema"
            inputClassName="text-xs"
          />

          {/* Schema JSON textarea */}
          <div className="flex flex-col gap-1">
            <span
              className="text-[10px] text-text-muted uppercase tracking-wider"
              aria-hidden="true"
            >
              {t("jsonSchema")}
            </span>
            <Textarea
              value={schemaRaw}
              onChange={(e) => setSchemaRaw(e.target.value)}
              rows={8}
              aria-label={t("jsonSchemaEditor")}
              className="text-xs font-mono resize-y"
            />
          </div>

          {/* Errors */}
          {(parseError ?? error) && <p className="text-xs text-error">{parseError ?? error}</p>}

          {/* Status — show when schema is set and no errors */}
          {schema != null && !parseError && !error && (
            <p className="text-xs text-success">✓ {t("schemaValidated")}</p>
          )}

          {/* Validate button */}
          <Button variant="outline" size="sm" onClick={handleValidate} className="self-start">
            {t("validateSchema")}
          </Button>
        </div>
      )}
    </div>
  );
}
