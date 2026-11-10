"use client";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import type { KeyTemplateReasoningRule, KeyTemplateTokenLimit } from "@/shared/types/keyTemplates";

type ReferenceOption = { id: string; label: string };
interface ReasoningFieldsProps {
  rule: KeyTemplateReasoningRule;
  onChange: (patch: Partial<KeyTemplateReasoningRule>) => void;
  combos: ReferenceOption[];
  connections: ReferenceOption[];
}
function ReferenceSelect({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string | null;
  options: ReferenceOption[];
  onChange: (value: string | null) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("apiManager");
  return (
    <Select
      label={label}
      value={value ?? ""}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value || null)}
    >
      <option value="">{t("templateNoReference")}</option>
      {value && !options.some((o) => o.id === value) && (
        <option value={value}>
          {t("templateReferenceMissing")}: {value}
        </option>
      )}
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </Select>
  );
}

export function KeyTemplateTokenLimitTiming({
  limit,
  onChange,
}: {
  limit: KeyTemplateTokenLimit;
  onChange: (patch: Partial<KeyTemplateTokenLimit>) => void;
}) {
  const t = useTranslations("apiManager");
  return (
    <>
      <Input
        label={t("templateTokenResetTime")}
        type="time"
        disabled={limit.resetTime === null}
        value={limit.resetTime ?? "00:00"}
        onChange={(e) => onChange({ resetTime: e.target.value })}
      />
      <div className="flex items-center gap-2 pb-2">
        <Toggle
          checked={limit.resetTime === null}
          onChange={() => onChange({ resetTime: limit.resetTime === null ? "00:00" : null })}
          ariaLabel={t("templateTokenUseDefaultTime")}
        />
        <span className="text-xs">{t("templateTokenUseDefaultTime")}</span>
      </div>
      <div className="flex items-center gap-2 pb-2">
        <Toggle
          checked={limit.enabled}
          onChange={() => onChange({ enabled: !limit.enabled })}
          ariaLabel={t("templateTokenEnabled")}
        />
        <span className="text-xs">{t("templateTokenEnabled")}</span>
      </div>
    </>
  );
}

export function KeyTemplateReasoningFields(props: ReasoningFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border/40 mt-3">
      <ReasoningMatchFields {...props} />
      <ReasoningTagFields {...props} />
      <ReasoningTargetFields {...props} />
      <ReasoningBudgetFields {...props} />
    </div>
  );
}

function ReasoningMatchFields({ rule, onChange, combos, connections }: ReasoningFieldsProps) {
  const t = useTranslations("apiManager");
  return (
    <>
      <p className="sm:col-span-2 text-xs text-text-muted">{t("templateRuleKeyScopeNotice")}</p>
      <Input
        label={t("templateRuleDescription")}
        value={rule.description}
        maxLength={1000}
        onChange={(e) => onChange({ description: e.target.value })}
      />
      <Input
        label={t("templateRuleModelPattern")}
        value={rule.modelPattern ?? ""}
        maxLength={500}
        onChange={(e) => onChange({ modelPattern: e.target.value || null })}
      />
      <ReferenceSelect
        label={t("templateRuleSourceCombo")}
        value={rule.comboId}
        options={combos}
        onChange={(comboId) => onChange({ comboId })}
      />
      <ReferenceSelect
        label={t("templateRuleConnection")}
        value={rule.connectionId}
        options={connections}
        onChange={(connectionId) => onChange({ connectionId })}
      />
      <Select
        label={t("templateRuleSourceEffort")}
        value={rule.sourceEffort}
        onChange={(e) =>
          onChange({ sourceEffort: e.target.value as KeyTemplateReasoningRule["sourceEffort"] })
        }
      >
        {["any", "missing", "none", "low", "medium", "high", "xhigh", "max", "ultra"].map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Select>
    </>
  );
}

function ReasoningTagFields({ rule, onChange }: ReasoningFieldsProps) {
  const t = useTranslations("apiManager");
  return (
    <>
      <Select
        label={t("templateRuleTagMatch")}
        value={rule.tagMatchMode}
        onChange={(e) => onChange({ tagMatchMode: e.target.value as "any" | "all" })}
      >
        <option value="any">{t("templateMatchAny")}</option>
        <option value="all">{t("templateMatchAll")}</option>
      </Select>
      <div className="sm:col-span-2 flex flex-col gap-2">
        {rule.requestTags.map((tag, index) => (
          <div key={index} className="flex items-end gap-2">
            <Input
              label={`${t("templateRuleRequestTag")} ${index + 1}`}
              value={tag}
              onChange={(e) =>
                onChange({
                  requestTags: rule.requestTags.map((v, i) => (i === index ? e.target.value : v)),
                })
              }
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                onChange({ requestTags: rule.requestTags.filter((_, i) => i !== index) })
              }
            >
              {t("templateRemoveTag")}
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange({ requestTags: [...rule.requestTags, ""] })}
        >
          {t("templateAddTag")}
        </Button>
      </div>
    </>
  );
}

function ReasoningTargetFields({ rule, onChange, combos }: ReasoningFieldsProps) {
  const t = useTranslations("apiManager");
  return (
    <>
      <Select
        label={t("templateRuleTargetKind")}
        value={rule.targetKind}
        onChange={(e) =>
          onChange({ targetKind: e.target.value as KeyTemplateReasoningRule["targetKind"] })
        }
      >
        <option value="keep">{t("templateKeepTarget")}</option>
        <option value="model">{t("templateModelTarget")}</option>
        <option value="combo">{t("templateComboTarget")}</option>
      </Select>
      <Input
        label={t("templateRuleTargetModel")}
        value={rule.targetModel ?? ""}
        maxLength={500}
        disabled={rule.targetKind !== "model"}
        onChange={(e) => onChange({ targetModel: e.target.value || null })}
      />
      <ReferenceSelect
        label={t("templateRuleTargetCombo")}
        value={rule.targetComboId}
        options={combos}
        disabled={rule.targetKind !== "combo"}
        onChange={(targetComboId) => onChange({ targetComboId })}
      />
    </>
  );
}

function ReasoningBudgetFields({ rule, onChange }: ReasoningFieldsProps) {
  const t = useTranslations("apiManager");
  return (
    <>
      <Select
        label={t("templateRuleBudgetAction")}
        value={rule.budgetAction}
        onChange={(e) =>
          onChange({ budgetAction: e.target.value as KeyTemplateReasoningRule["budgetAction"] })
        }
      >
        <option value="preserve">{t("templatePreserveBudget")}</option>
        <option value="remove">{t("templateRemoveBudget")}</option>
        <option value="set">{t("templateSetBudget")}</option>
      </Select>
      <Input
        label={t("templateRuleBudgetTokens")}
        type="number"
        min={1}
        max={10000000}
        disabled={rule.budgetAction !== "set"}
        value={rule.budgetTokens ?? ""}
        onChange={(e) =>
          onChange({ budgetTokens: e.target.value === "" ? null : Number(e.target.value) })
        }
      />
      <Input
        label={t("templateRulePriority")}
        type="number"
        min={-1000000}
        max={1000000}
        value={rule.priority}
        onChange={(e) => onChange({ priority: Number(e.target.value) })}
      />
    </>
  );
}
