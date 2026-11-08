"use client";

import React, { useId } from "react";
import { Field } from "@omniroute/ui-kit/field";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";

// Feature 4985 — per-combo response-body validation editor. Extracted into its own file
// so the combos god-component (page.tsx) stays lean. Emits the same declarative shape the
// Zod `responseValidationSchema` validates; backend evaluates it in validateResponseQuality.

export type JsonPathCondition = "exists" | "nonEmpty" | "equals" | "notEquals";

export interface ResponseValidationValue {
  forbiddenSubstrings?: string[];
  requiredSubstrings?: string[];
  minContentLength?: number;
  jsonPathPredicates?: Array<{
    path: string;
    condition: JsonPathCondition;
    value?: string | number | boolean;
  }>;
}

function tr(t: ((key: string) => string) | undefined, key: string, fallback: string): string {
  if (!t) return fallback;
  try {
    const v = t(key);
    return v && v !== key ? v : fallback;
  } catch {
    return fallback;
  }
}

const linesToArray = (text: string): string[] =>
  text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

const arrayToLines = (arr?: string[]): string => (arr ?? []).join("\n");

const CONDITIONS: JsonPathCondition[] = ["exists", "nonEmpty", "equals", "notEquals"];

export function ResponseValidationEditor({
  value,
  onChange,
  t,
}: {
  value?: ResponseValidationValue | null;
  onChange: (next: ResponseValidationValue | undefined) => void;
  t?: (key: string) => string;
}) {
  const v: ResponseValidationValue = value && typeof value === "object" ? value : {};
  const fieldId = useId();

  const emit = (draft: ResponseValidationValue) => {
    const cleaned: ResponseValidationValue = {};
    if (draft.forbiddenSubstrings && draft.forbiddenSubstrings.length)
      cleaned.forbiddenSubstrings = draft.forbiddenSubstrings;
    if (draft.requiredSubstrings && draft.requiredSubstrings.length)
      cleaned.requiredSubstrings = draft.requiredSubstrings;
    if (typeof draft.minContentLength === "number" && draft.minContentLength > 0)
      cleaned.minContentLength = draft.minContentLength;
    if (draft.jsonPathPredicates && draft.jsonPathPredicates.length)
      cleaned.jsonPathPredicates = draft.jsonPathPredicates;
    onChange(Object.keys(cleaned).length ? cleaned : undefined);
  };

  const predicates = v.jsonPathPredicates ?? [];

  const updatePredicate = (index: number, patch: Partial<(typeof predicates)[number]>) => {
    const next = predicates.map((p, i) => (i === index ? { ...p, ...patch } : p));
    emit({ ...v, jsonPathPredicates: next });
  };

  return (
    <div className="flex flex-col gap-2" data-testid="response-validation-editor">
      <p className="text-xs text-text-muted">
        {tr(
          t,
          "responseValidationHelp",
          "Fail over to the next target when a 200 OK body fails these checks (assistant content)."
        )}
      </p>

      <Field
        htmlFor={`${fieldId}-forbidden`}
        label={tr(t, "responseValidationForbidden", "Forbidden substrings (one per line)")}
      >
        <Textarea
          id={`${fieldId}-forbidden`}
          rows={2}
          value={arrayToLines(v.forbiddenSubstrings)}
          onChange={(e) => emit({ ...v, forbiddenSubstrings: linesToArray(e.target.value) })}
          placeholder={"I cannot help\nas an AI"}
          data-testid="rv-forbidden"
          className="font-mono"
        />
      </Field>

      <Field
        htmlFor={`${fieldId}-required`}
        label={tr(t, "responseValidationRequired", "Required substrings (one per line)")}
      >
        <Textarea
          id={`${fieldId}-required`}
          rows={2}
          value={arrayToLines(v.requiredSubstrings)}
          onChange={(e) => emit({ ...v, requiredSubstrings: linesToArray(e.target.value) })}
          data-testid="rv-required"
          className="font-mono"
        />
      </Field>

      <Input
        label={tr(t, "responseValidationMinLength", "Minimum content length (chars)")}
        type="number"
        min={0}
        value={typeof v.minContentLength === "number" ? v.minContentLength : ""}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          emit({ ...v, minContentLength: Number.isFinite(n) && n > 0 ? n : undefined });
        }}
        data-testid="rv-min-length"
      />

      {/* A group of rows, not one control: role="group" named by its heading. */}
      <div role="group" aria-labelledby={`${fieldId}-jsonpaths`} className="flex flex-col gap-1.5">
        <span id={`${fieldId}-jsonpaths`} className="ci-label">
          {tr(t, "responseValidationJsonPaths", "JSON-path checks")}
        </span>
        <div className="flex flex-col gap-1.5">
          {predicates.map((predicate, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center gap-1.5"
              data-testid="rv-predicate-row"
            >
              <Input
                type="text"
                value={predicate.path}
                onChange={(e) => updatePredicate(index, { path: e.target.value })}
                placeholder="choices[0].message.content"
                aria-label={`${tr(t, "responseValidationPath", "JSON path")} ${index + 1}`}
                data-testid="rv-predicate-path"
                className="min-w-[140px] flex-1"
                inputClassName="font-mono"
              />
              <Select
                value={predicate.condition}
                onChange={(e) =>
                  updatePredicate(index, { condition: e.target.value as JsonPathCondition })
                }
                aria-label={`${tr(t, "responseValidationCondition", "Condition")} ${index + 1}`}
                data-testid="rv-predicate-condition"
                className="w-auto"
                options={CONDITIONS.map((c) => ({ value: c, label: c }))}
              />
              {(predicate.condition === "equals" || predicate.condition === "notEquals") && (
                <Input
                  type="text"
                  value={predicate.value === undefined ? "" : String(predicate.value)}
                  onChange={(e) => updatePredicate(index, { value: e.target.value })}
                  placeholder={tr(t, "responseValidationValue", "Expected value")}
                  aria-label={`${tr(t, "responseValidationValue", "Expected value")} ${index + 1}`}
                  data-testid="rv-predicate-value"
                  className="w-auto"
                />
              )}
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() =>
                  emit({ ...v, jsonPathPredicates: predicates.filter((_, i) => i !== index) })
                }
                aria-label={tr(t, "responseValidationRemoveCheck", "Remove check")}
                title={tr(t, "responseValidationRemoveCheck", "Remove check")}
                data-testid="rv-predicate-remove"
                className="text-text-muted hover:text-error"
              >
                <Icon name="close" size={14} />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              emit({
                ...v,
                jsonPathPredicates: [...predicates, { path: "", condition: "exists" }],
              })
            }
            data-testid="rv-predicate-add"
            className="self-start"
          >
            {tr(t, "responseValidationAddCheck", "+ Add check")}
          </Button>
        </div>
      </div>
    </div>
  );
}
