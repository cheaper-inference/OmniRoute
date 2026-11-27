"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { destinationNumberLimits } from "@/lib/logExport/destinationSchemas";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import NumberInput from "@/shared/components/NumberInput";

import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import {
  SECRET_PLACEHOLDER,
  type DestinationSubmitPayload,
  type LogExportDestination,
  type LogExportFieldDescriptor,
  type LogExportTypeDescriptor,
} from "../types";
import { getDestinationFormValidator } from "./destinationFormValidation";

interface DestinationFormModalProps {
  open: boolean;
  types: LogExportTypeDescriptor[];
  editing: LogExportDestination | null;
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (payload: DestinationSubmitPayload) => void;
}

type FormValues = Record<string, string | boolean>;

const {
  batchSize: batchLimits,
  maxBodyBytes: bodyLimits,
  maxRowsPerRun: rowLimits,
} = destinationNumberLimits;

function numericFieldValue(value: string | boolean | undefined): number | undefined {
  if (value === "" || value === undefined) return undefined;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : undefined;
}

function canKeepSecret(
  field: LogExportFieldDescriptor,
  destination: LogExportDestination | null,
  hasClientValidation: boolean
) {
  return Boolean(
    field.secret &&
    destination &&
    (!hasClientValidation || destination.config[field.key] === SECRET_PLACEHOLDER)
  );
}

function initialValues(
  descriptor: LogExportTypeDescriptor | undefined,
  destination: LogExportDestination | null
): FormValues {
  const values: FormValues = {};
  const hasClientValidation = Boolean(getDestinationFormValidator(descriptor?.id));
  for (const field of descriptor?.fields ?? []) {
    const stored = destination?.config?.[field.key] ?? field.defaultValue;
    if (hasClientValidation && field.secret && stored === SECRET_PLACEHOLDER) {
      values[field.key] = "";
    } else if (field.type === "boolean") {
      values[field.key] = stored === undefined ? true : Boolean(stored);
    } else {
      values[field.key] = stored === undefined || stored === null ? "" : String(stored);
    }
  }
  return values;
}

function buildConfig(
  descriptor: LogExportTypeDescriptor | undefined,
  values: FormValues,
  editing: LogExportDestination | null,
  hasClientValidation: boolean
) {
  const config: Record<string, unknown> = {};
  for (const field of descriptor?.fields ?? []) {
    const value = values[field.key];
    if (field.type === "boolean") {
      config[field.key] = Boolean(value);
      continue;
    }
    if (field.type === "number") {
      const numeric = numericFieldValue(value);
      if (numeric !== undefined) config[field.key] = numeric;
      continue;
    }

    const text = typeof value === "string" ? value.trim() : "";
    const secretFallback = canKeepSecret(field, editing, hasClientValidation)
      ? SECRET_PLACEHOLDER
      : "";
    const submitted = text || secretFallback;
    if (submitted || (hasClientValidation && field.required)) config[field.key] = submitted;
  }
  return config;
}

interface DestinationFieldProps {
  field: LogExportFieldDescriptor;
  value: FormValues[string];
  editing: LogExportDestination | null;
  hasClientValidation: boolean;
  error?: string;
  onChange: (value: string | boolean) => void;
}

interface DestinationTextareaProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

function DestinationTextarea({
  id,
  label,
  hint,
  error,
  placeholder,
  required,
  value,
  onChange,
}: DestinationTextareaProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <Field
      htmlFor={id}
      label={label}
      required={required}
      hint={hint ? <span id={hintId}>{hint}</span> : undefined}
      error={
        error ? (
          <span id={errorId} role="alert">
            {error}
          </span>
        ) : undefined
      }
    >
      <Textarea
        id={id}
        rows={6}
        className="font-mono text-xs"
        placeholder={placeholder}
        required={required}
        error={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

function DestinationField({
  field,
  value,
  editing,
  hasClientValidation,
  error,
  onChange,
}: DestinationFieldProps) {
  if (field.type === "boolean") {
    return (
      <Checkbox
        label={field.labelFallback}
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
      />
    );
  }

  const text = typeof value === "string" ? value : "";
  if (field.type === "select") {
    return (
      <Select
        id={`field-${field.key}`}
        label={field.labelFallback}
        value={text}
        onChange={(event) => onChange(event.target.value)}
        options={(field.options ?? []).map((option) => ({
          value: option.value,
          label: option.labelFallback,
        }))}
      />
    );
  }

  const keepSecret = canKeepSecret(field, editing, hasClientValidation);
  const required = hasClientValidation && field.required && !keepSecret;
  const label = `${field.labelFallback}${!hasClientValidation && field.required ? " *" : ""}`;
  const placeholder = keepSecret ? "Leave blank to keep the stored value" : field.placeholder;
  if (field.type === "textarea") {
    return (
      <DestinationTextarea
        id={`field-${field.key}`}
        label={label}
        hint={field.helpFallback}
        placeholder={placeholder}
        required={required}
        error={error}
        value={text}
        onChange={onChange}
      />
    );
  }

  return (
    <Input
      label={label}
      type={field.secret ? "password" : field.type === "number" ? "number" : "text"}
      placeholder={placeholder}
      hint={field.helpFallback}
      required={required}
      error={error}
      value={text}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function numberWithDefault(value: number | null, fallback: number, hasClientValidation: boolean) {
  return hasClientValidation ? (value ?? fallback) : value || fallback;
}

/**
 * Generic destination form: every field is rendered from the type descriptor served by
 * GET /api/log-export/types, so adding Datadog or Grafana needs no change here.
 *
 * State is initialised once per mount and the modal remounts it with a key, which keeps
 * the "edit an existing destination" reset out of an effect.
 */
function DestinationForm({
  types,
  editing,
  saving,
  error,
  onClose,
  onSubmit,
}: Omit<DestinationFormModalProps, "open">) {
  const t = useTranslations("logExport");
  const [startFromCurrentPosition, setStartFromCurrentPosition] = useState(false);
  const [name, setName] = useState(editing?.name ?? "");
  const [typeId, setTypeId] = useState(editing?.type ?? types[0]?.id ?? "");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [enabled, setEnabled] = useState(editing?.enabled ?? true);
  const [batchSize, setBatchSize] = useState<number | null>(
    editing?.batchSize ?? batchLimits.defaultValue
  );
  const [includeBodies, setIncludeBodies] = useState(editing?.includeBodies ?? false);
  const [maxBodyBytes, setMaxBodyBytes] = useState<number | null>(
    editing?.maxBodyBytes ?? bodyLimits.defaultValue
  );
  const [maxRowsPerRun, setMaxRowsPerRun] = useState<number | null>(
    editing?.maxRowsPerRun ?? rowLimits.defaultValue
  );
  const [values, setValues] = useState<FormValues>(() =>
    initialValues(
      types.find((type) => type.id === (editing?.type ?? types[0]?.id)),
      editing
    )
  );

  const descriptor = useMemo(() => types.find((type) => type.id === typeId), [types, typeId]);
  const validate = getDestinationFormValidator(typeId);
  const hasClientValidation = Boolean(validate);

  const handleTypeChange = (nextTypeId: string) => {
    setTypeId(nextTypeId);
    setAttemptedSubmit(false);
    setValues(
      initialValues(
        types.find((type) => type.id === nextTypeId),
        null
      )
    );
  };

  const setValue = (key: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const payload: DestinationSubmitPayload = {
    name: name.trim(),
    type: typeId,
    enabled,
    config: buildConfig(descriptor, values, editing, hasClientValidation),
    batchSize: batchSize ?? batchLimits.defaultValue,
    ...(!editing ? { startFromCurrentPosition } : {}),
    includeBodies,
    maxBodyBytes: numberWithDefault(maxBodyBytes, bodyLimits.defaultValue, hasClientValidation),
    maxRowsPerRun: numberWithDefault(maxRowsPerRun, rowLimits.defaultValue, hasClientValidation),
  };
  const validationErrors = validate?.(payload, Boolean(editing), t);
  const fieldError = (key: string) => (attemptedSubmit ? validationErrors?.get(key) : undefined);
  const numericMin = hasClientValidation ? undefined : 0;
  const bodyError = fieldError("maxBodyBytes");
  const handleSubmit = () => {
    if (validationErrors?.size) {
      setAttemptedSubmit(true);
      return;
    }
    onSubmit(payload);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label={hasClientValidation ? "Name" : "Name *"}
        required={hasClientValidation}
        error={fieldError("name")}
        placeholder="Production warehouse"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <Select
        id="destination-type"
        label="Destination type"
        value={typeId}
        disabled={Boolean(editing)}
        onChange={(event) => handleTypeChange(event.target.value)}
        options={types.map((type) => ({ value: type.id, label: type.label }))}
        hint={descriptor ? descriptor.description : undefined}
      />

      {descriptor?.fields.map((field) => (
        <DestinationField
          key={field.key}
          field={field}
          value={values[field.key]}
          editing={editing}
          hasClientValidation={hasClientValidation}
          error={fieldError(field.key)}
          onChange={(value) => setValue(field.key, value)}
        />
      ))}

      <div className="grid grid-cols-2 gap-3">
        <NumberInput
          label="Batch size"
          min={numericMin}
          error={fieldError("batchSize")}
          hint="Rows per cursor batch"
          value={batchSize}
          onValueChange={setBatchSize}
        />
        <NumberInput
          label="Max rows per run"
          min={numericMin}
          error={fieldError("maxRowsPerRun")}
          hint="Caps a single hourly run"
          value={maxRowsPerRun}
          onValueChange={setMaxRowsPerRun}
        />
      </div>

      {!editing ? (
        <Checkbox
          label={t("startFromCurrentPosition")}
          checked={startFromCurrentPosition}
          onChange={(event) => setStartFromCurrentPosition(event.target.checked)}
        />
      ) : null}

      <Checkbox
        label="Export prompts and responses"
        checked={includeBodies}
        onChange={(event) => setIncludeBodies(event.target.checked)}
      />
      {includeBodies || bodyError ? (
        <div className="flex flex-col gap-2 pl-6">
          <span className="text-xs text-text-muted">
            Ships the request and response payloads shown in the Logs detail pane, including the
            client and provider views of each call. Content is PII-sanitised and secret-redacted the
            same way the dashboard shows it, and calls made with a no-log API key carry none.
          </span>
          <NumberInput
            label="Max payload bytes per field"
            min={numericMin}
            error={bodyError}
            hint="Longer payloads are truncated, not dropped"
            value={maxBodyBytes}
            onValueChange={setMaxBodyBytes}
          />
        </div>
      ) : null}

      <Checkbox
        label="Enabled — include in the hourly export"
        checked={enabled}
        onChange={(event) => setEnabled(event.target.checked)}
      />

      {error ? (
        <p role="alert" className="rounded-control bg-error-bg p-2 text-xs text-error">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          loading={saving}
          disabled={!typeId || (!hasClientValidation && !name.trim())}
          onClick={handleSubmit}
        >
          {editing ? "Save changes" : "Create destination"}
        </Button>
      </div>
    </div>
  );
}

export function DestinationFormModal({ open, ...formProps }: DestinationFormModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={formProps.onClose}
      size="lg"
      title={formProps.editing ? "Edit export destination" : "Add export destination"}
    >
      {open ? <DestinationForm key={formProps.editing?.id ?? "new"} {...formProps} /> : null}
    </Modal>
  );
}
