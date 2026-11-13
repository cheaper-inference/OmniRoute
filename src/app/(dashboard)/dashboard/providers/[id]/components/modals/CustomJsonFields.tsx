"use client";

import Icon from "@/shared/components/Icon";
import { useState } from "react";
import { Button, Input, Select, Textarea } from "@/shared/components";
import type { ProviderMessageTranslator } from "../../providerPageHelpers";
import {
  newCustomJsonField,
  switchCustomJsonTemplateMode,
  type CustomJsonExtraField,
  type CustomJsonFormError,
  type CustomJsonFormState,
  type CustomJsonTemplateMode,
} from "./customJsonForm";

// Shown literally (never interpolated by the template engine on the client).
const PLACEHOLDERS = "{{prompt}}, {{messages}}, {{model}}, {{stream}}, {{request.field}}";

type CustomJsonFieldsProps = {
  value: CustomJsonFormState;
  onChange: (next: CustomJsonFormState) => void;
  t: ProviderMessageTranslator;
};

type ExtraFieldRowProps = {
  field: CustomJsonExtraField;
  onPatch: (next: Partial<CustomJsonExtraField>) => void;
  onRemove: () => void;
  t: ProviderMessageTranslator;
};

/** One optional template field: name, value type (text or JSON) and value. */
function ExtraFieldRow({ field, onPatch, onRemove, t }: ExtraFieldRowProps) {
  return (
    <div className="flex items-end gap-2" data-testid="custom-json-field-row">
      <Input
        label={t("customJsonFieldName")}
        value={field.name}
        onChange={(e) => onPatch({ name: e.target.value })}
        placeholder="project_id"
        className="flex-1"
      />
      <Select
        label={t("customJsonFieldType")}
        value={field.type}
        onChange={(e) => onPatch({ type: e.target.value === "json" ? "json" : "text" })}
      >
        <option value="text">{t("customJsonFieldTypeText")}</option>
        <option value="json">{t("customJsonFieldTypeJson")}</option>
      </Select>
      <Input
        label={t("customJsonFieldValue")}
        value={field.value}
        onChange={(e) => onPatch({ value: e.target.value })}
        placeholder={field.type === "json" ? "0.5" : "{{prompt}}"}
        className="flex-1"
      />
      <Button variant="ghost" size="sm" aria-label={t("customJsonRemoveField")} onClick={onRemove}>
        <Icon name="close" size={14} />
      </Button>
    </div>
  );
}

type ExtraFieldsEditorProps = {
  fields: CustomJsonExtraField[];
  onChange: (next: CustomJsonExtraField[]) => void;
  t: ProviderMessageTranslator;
};

/** "Simple fields" template mode: model + messages are implicit, extra rows are optional. */
function ExtraFieldsEditor({ fields, onChange, t }: ExtraFieldsEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-text-muted">{t("customJsonDefaultFieldsHint")}</p>
      {fields.map((field) => (
        <ExtraFieldRow
          key={field.id}
          field={field}
          onPatch={(next) =>
            onChange(fields.map((row) => (row.id === field.id ? { ...row, ...next } : row)))
          }
          onRemove={() => onChange(fields.filter((row) => row.id !== field.id))}
          t={t}
        />
      ))}
      <Button
        variant="secondary"
        size="sm"
        className="self-start"
        onClick={() => onChange([...fields, newCustomJsonField()])}
      >
        {t("customJsonAddField")}
      </Button>
    </div>
  );
}

type TemplateJsonEditorProps = {
  value: string;
  onChange: (next: string) => void;
  t: ProviderMessageTranslator;
};

/** "Full JSON" template mode: the whole request template as JSON text. */
function TemplateJsonEditor({ value, onChange, t }: TemplateJsonEditorProps) {
  return (
    <Textarea
      label={t("customJsonTemplateModeJson")}
      rows={8}
      spellCheck={false}
      className="font-mono text-xs"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/** Custom JSON API node settings: method, auth, request template, response path. */
export default function CustomJsonFields({ value, onChange, t }: CustomJsonFieldsProps) {
  const [modeError, setModeError] = useState<CustomJsonFormError | null>(null);
  const patch = (next: Partial<CustomJsonFormState>) => onChange({ ...value, ...next });
  const patchFields = (extraFields: CustomJsonExtraField[]) => patch({ extraFields });

  const changeMode = (mode: CustomJsonTemplateMode) => {
    const switched = switchCustomJsonTemplateMode(value, mode);
    setModeError(switched.error ?? null);
    if (!switched.error) onChange(switched.form);
  };

  return (
    <div
      className="flex flex-col gap-3 pl-2 border-l-2 border-border"
      data-testid="custom-json-fields"
    >
      <Select
        label={t("customJsonMethodLabel")}
        options={["POST", "PUT", "PATCH"].map((method) => ({ value: method, label: method }))}
        value={value.method}
        onChange={(e) => patch({ method: e.target.value })}
      />
      <Select
        label={t("customJsonAuthTypeLabel")}
        options={[
          { value: "bearer", label: t("customJsonAuthBearer") },
          { value: "api-key", label: t("customJsonAuthApiKey") },
          { value: "none", label: t("customJsonAuthNone") },
        ]}
        value={value.authType}
        onChange={(e) => patch({ authType: e.target.value })}
      />
      {value.authType === "api-key" && (
        <Input
          label={t("customJsonAuthHeaderLabel")}
          value={value.authHeader}
          onChange={(e) => patch({ authHeader: e.target.value })}
          placeholder="X-API-Key"
        />
      )}
      <Select
        label={t("customJsonTemplateLabel")}
        options={[
          { value: "fields", label: t("customJsonTemplateModeFields") },
          { value: "json", label: t("customJsonTemplateModeJson") },
        ]}
        value={value.templateMode}
        onChange={(e) => changeMode(e.target.value as CustomJsonTemplateMode)}
        hint={t("customJsonTemplateHint", { placeholders: PLACEHOLDERS })}
      />
      {modeError && (
        <p role="alert" className="text-sm text-error">
          {t(modeError.key, modeError.values)}
        </p>
      )}
      {value.templateMode === "fields" ? (
        <ExtraFieldsEditor fields={value.extraFields} onChange={patchFields} t={t} />
      ) : (
        <TemplateJsonEditor
          value={value.requestTemplateText}
          onChange={(requestTemplateText) => patch({ requestTemplateText })}
          t={t}
        />
      )}
      <Input
        label={t("customJsonResponsePathLabel")}
        value={value.responsePath}
        onChange={(e) => patch({ responsePath: e.target.value })}
        placeholder="choices[0].message.content"
        hint={t("customJsonResponsePathHint")}
      />
    </div>
  );
}
