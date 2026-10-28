"use client";

import Icon from "@/shared/components/Icon";
import { useId, useState } from "react";
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

/** Custom JSON API node settings: method, auth, request template, response path. */
export default function CustomJsonFields({ value, onChange, t }: CustomJsonFieldsProps) {
  const [modeError, setModeError] = useState<CustomJsonFormError | null>(null);
  const templateTextId = useId();
  const patch = (next: Partial<CustomJsonFormState>) => onChange({ ...value, ...next });
  const patchField = (id: string, next: Partial<CustomJsonExtraField>) =>
    patch({
      extraFields: value.extraFields.map((field) =>
        field.id === id ? { ...field, ...next } : field
      ),
    });

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
        <div className="flex flex-col gap-2">
          <p className="text-xs text-text-muted">{t("customJsonDefaultFieldsHint")}</p>
          {value.extraFields.map((field) => (
            <div
              key={field.id}
              className="flex items-end gap-2"
              data-testid="custom-json-field-row"
            >
              <Input
                label={t("customJsonFieldName")}
                value={field.name}
                onChange={(e) => patchField(field.id, { name: e.target.value })}
                placeholder="project_id"
                className="flex-1"
              />
              <Select
                label={t("customJsonFieldType")}
                value={field.type}
                onChange={(e) =>
                  patchField(field.id, { type: e.target.value === "json" ? "json" : "text" })
                }
              >
                <option value="text">{t("customJsonFieldTypeText")}</option>
                <option value="json">{t("customJsonFieldTypeJson")}</option>
              </Select>
              <Input
                label={t("customJsonFieldValue")}
                value={field.value}
                onChange={(e) => patchField(field.id, { value: e.target.value })}
                placeholder={field.type === "json" ? "0.5" : "{{prompt}}"}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                aria-label={t("customJsonRemoveField")}
                onClick={() =>
                  patch({ extraFields: value.extraFields.filter((row) => row.id !== field.id) })
                }
              >
                <Icon name="close" size={14} />
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            size="sm"
            className="self-start"
            onClick={() => patch({ extraFields: [...value.extraFields, newCustomJsonField()] })}
          >
            {t("customJsonAddField")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <label htmlFor={templateTextId} className="text-sm font-medium">
            {t("customJsonTemplateModeJson")}
          </label>
          <Textarea
            id={templateTextId}
            rows={8}
            spellCheck={false}
            className="font-mono text-xs"
            value={value.requestTemplateText}
            onChange={(e) => patch({ requestTemplateText: e.target.value })}
          />
        </div>
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
