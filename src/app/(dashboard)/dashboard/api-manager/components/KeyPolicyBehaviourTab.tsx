"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import { KeyTemplateReasoningFields } from "./KeyTemplatePolicyDetails";
import { API_KEY_CODEX_SERVICE_MODES } from "@/shared/constants/codexServiceMode";
import { ApiKeyCompressionToggle } from "./ApiKeyCompressionToggle";
import { ChaosModeAccessToggle } from "./ChaosModeAccessToggle";
import { BypassProviderQuotaToggle } from "./BypassProviderQuotaToggle";
import {
  type KeyTemplateCacheDefaultMode,
  type KeyTemplateCodexServiceMode,
  type KeyTemplateReasoningRule,
} from "../keyTemplatePolicyUtils";

import type { PolicyEditorFormState } from "../keyTemplatePolicyUtils";
import { useKeyPolicyEditor } from "./KeyPolicyEditorContext";

export default function KeyPolicyBehaviourTab() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-4">
      <PayloadPrivacy />

      <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("autoResolve")}</p>
          <p className="text-xs text-text-muted">{t("autoResolveDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.autoResolve}
          onChange={() => updateState((p) => ({ ...p, autoResolve: !p.autoResolve }))}
          ariaLabel={t("autoResolve")}
        />
      </div>

      <ProtocolDefaults />

      <ApiKeyCompressionToggle
        enabled={formState.compressionEnabled}
        onToggle={() => updateState((p) => ({ ...p, compressionEnabled: !p.compressionEnabled }))}
      />

      <ChaosModeAccessToggle
        enabled={formState.chaosModeEnabled}
        onToggle={() => updateState((p) => ({ ...p, chaosModeEnabled: !p.chaosModeEnabled }))}
      />

      <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("localUsageCommand")}</p>
          <p className="text-xs text-text-muted">{t("localUsageCommandDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.allowUsageCommand}
          onChange={() => updateState((p) => ({ ...p, allowUsageCommand: !p.allowUsageCommand }))}
          ariaLabel={t("localUsageCommand")}
        />
      </div>

      <BypassProviderQuotaToggle
        enabled={formState.bypassProviderQuotaPolicyEnabled}
        onToggle={() =>
          updateState((p) => ({
            ...p,
            bypassProviderQuotaPolicyEnabled: !p.bypassProviderQuotaPolicyEnabled,
          }))
        }
      />

      {/* Related: Key Groups (Shared Group Policy) */}
      <KeyGroupChoices />

      {/* Related: Reasoning Routing Rules */}
      <ReasoningRules />
    </div>
  );
}

function ProtocolDefaults() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <Select
        label={t("streamDefaultMode")}
        value={formState.streamDefaultMode}
        onChange={(e) =>
          updateState((p) => ({
            ...p,
            streamDefaultMode: e.target.value as "legacy" | "json",
          }))
        }
      >
        <option value="legacy">{t("streamDefaultLegacy")}</option>
        <option value="json">{t("streamDefaultJson")}</option>
      </Select>

      <Select
        label={t("templateCacheDefaultMode")}
        value={formState.cacheDefaultMode}
        onChange={(e) =>
          updateState((p) => ({
            ...p,
            cacheDefaultMode: e.target.value as KeyTemplateCacheDefaultMode,
          }))
        }
      >
        <option value="legacy">Legacy</option>
        <option value="bypass">Bypass</option>
      </Select>

      <Select
        label={t("templateCodexServiceMode")}
        value={formState.codexServiceMode}
        onChange={(e) =>
          updateState((p) => ({
            ...p,
            codexServiceMode: e.target.value as KeyTemplateCodexServiceMode,
          }))
        }
      >
        {API_KEY_CODEX_SERVICE_MODES.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
    </div>
  );
}

function ReasoningRulesHeading() {
  const { t, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="text-sm font-medium text-text-main">{t("templateReasoningRulesTitle")}</p>
        <p className="text-xs text-text-muted">{t("templateReasoningRulesDesc")}</p>
      </div>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        icon="add"
        onClick={() =>
          updateState((p) => ({
            ...p,
            reasoningRules: [
              ...p.reasoningRules,
              {
                clientRowId: crypto.randomUUID(),
                name: `Rule ${p.reasoningRules.length + 1}`,
                description: "",
                scope: "apiKey",
                comboId: null,
                connectionId: null,
                modelPattern: null,
                sourceEffort: "any",
                requestTags: [],
                tagMatchMode: "any",
                effortMode: "default",
                targetEffort: "medium",
                targetKind: "keep",
                targetModel: null,
                targetComboId: null,
                budgetAction: "preserve",
                budgetTokens: null,
                priority: 0,
                enabled: true,
              },
            ],
          }))
        }
      >
        {t("templateAddReasoningRule")}
      </Button>
    </div>
  );
}

function SelectedGroupChips() {
  const { t, formState, updateState, allKeyGroups } = useKeyPolicyEditor();
  return (
    <div className="flex flex-wrap gap-1 pt-1">
      {formState.groupIds.map((gid) => {
        const grp = allKeyGroups.find((g) => g.id === gid);
        return (
          <span
            key={gid}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-info/10 border border-info/30 text-info text-xs font-mono"
          >
            {grp?.name ? `${grp.name} (${gid.slice(0, 8)})` : gid}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-4 w-4 p-0 text-info hover:text-error"
              onClick={() =>
                updateState((p) => ({
                  ...p,
                  groupIds: p.groupIds.filter((id) => id !== gid),
                }))
              }
              aria-label={t("removeSelection", { name: gid })}
            >
              <Icon name="close" size={12} />
            </Button>
          </span>
        );
      })}
    </div>
  );
}

function KeyGroupChoices() {
  const { t, formState, updateState, allKeyGroups } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
      <p className="text-sm font-medium text-text-main">{t("templateKeyGroupsTitle")}</p>
      <p className="text-xs text-text-muted">{t("templateKeyGroupsDesc")}</p>
      {allKeyGroups.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {allKeyGroups.map((group) => {
            const selected = formState.groupIds.includes(group.id);
            return (
              <Button
                key={group.id}
                type="button"
                size="sm"
                variant={selected ? "primary" : "outline"}
                aria-pressed={selected}
                onClick={() =>
                  updateState((p) => ({
                    ...p,
                    groupIds: selected
                      ? p.groupIds.filter((id) => id !== group.id)
                      : [...p.groupIds, group.id],
                  }))
                }
                className="text-xs"
              >
                {group.name}
              </Button>
            );
          })}
        </div>
      )}
      {formState.groupIds.length > 0 && <SelectedGroupChips />}
    </div>
  );
}

function ReasoningRuleActions({
  rule,
  idx,
}: {
  rule: PolicyEditorFormState["reasoningRules"][number];
  idx: number;
}) {
  const { t, tc, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex items-center justify-end gap-2">
      <Toggle
        size="sm"
        checked={rule.enabled}
        onChange={() =>
          updateState((p) => {
            const next = [...p.reasoningRules];
            next[idx] = { ...next[idx], enabled: !next[idx].enabled };
            return { ...p, reasoningRules: next };
          })
        }
        ariaLabel={t("name")}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() =>
          updateState((p) => ({
            ...p,
            reasoningRules: p.reasoningRules.filter((_, i) => i !== idx),
          }))
        }
        aria-label={tc("delete")}
      >
        <Icon name="delete" size={16} className="text-error" />
      </Button>
    </div>
  );
}

function ReasoningTargetEffort({
  rule,
  idx,
}: {
  rule: PolicyEditorFormState["reasoningRules"][number];
  idx: number;
}) {
  const { updateState } = useKeyPolicyEditor();
  return (
    <Select
      label="Target Effort"
      disabled={rule.effortMode === "inherit"}
      value={rule.targetEffort ?? "medium"}
      onChange={(e) =>
        updateState((p) => {
          const next = [...p.reasoningRules];
          next[idx] = {
            ...next[idx],
            targetEffort: e.target.value as KeyTemplateReasoningRule["targetEffort"],
          };
          return { ...p, reasoningRules: next };
        })
      }
    >
      <option value="none">none</option>
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
      <option value="xhigh">xhigh</option>
      <option value="max">max</option>
      <option value="ultra">ultra</option>
    </Select>
  );
}

function ReasoningRuleHeader({
  rule,
  idx,
}: {
  rule: PolicyEditorFormState["reasoningRules"][number];
  idx: number;
}) {
  const { t, updateState } = useKeyPolicyEditor();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
      <Input
        label={t("name")}
        value={rule.name}
        onChange={(e) =>
          updateState((p) => {
            const next = [...p.reasoningRules];
            next[idx] = { ...next[idx], name: e.target.value };
            return { ...p, reasoningRules: next };
          })
        }
      />
      <Select
        label="Effort Mode"
        value={rule.effortMode}
        onChange={(e) =>
          updateState((p) => {
            const next = [...p.reasoningRules];
            const mode = e.target.value as KeyTemplateReasoningRule["effortMode"];
            next[idx] = {
              ...next[idx],
              effortMode: mode,
              targetEffort: mode === "inherit" ? null : next[idx].targetEffort || "medium",
            };
            return { ...p, reasoningRules: next };
          })
        }
      >
        <option value="inherit">Inherit</option>
        <option value="default">Default</option>
        <option value="force">Force</option>
      </Select>
      <ReasoningTargetEffort rule={rule} idx={idx} />
      <ReasoningRuleActions rule={rule} idx={idx} />
    </div>
  );
}

function ReasoningRules() {
  const { formState, updateState, allCombos, allConnections } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
      <ReasoningRulesHeading />
      {formState.reasoningRules.map((rule, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-2 p-2.5 rounded border border-border bg-surface/50"
        >
          <ReasoningRuleHeader rule={rule} idx={idx} />
          <KeyTemplateReasoningFields
            rule={rule}
            onChange={(patch) =>
              updateState((p) => ({
                ...p,
                reasoningRules: p.reasoningRules.map((value, i) =>
                  i === idx ? { ...value, ...patch } : value
                ),
              }))
            }
            combos={allCombos.flatMap((combo) =>
              combo.id ? [{ id: combo.id, label: combo.name }] : []
            )}
            connections={allConnections.map((connection) => ({
              id: connection.id,
              label: connection.name,
            }))}
          />
        </div>
      ))}
    </div>
  );
}

function PayloadPrivacy() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("noLogPayloadPrivacy")}</p>
        <p className="text-xs text-text-muted">{t("templateNoLogDesc")}</p>
      </div>
      <Toggle
        size="sm"
        checked={formState.noLog}
        onChange={() => updateState((p) => ({ ...p, noLog: !p.noLog }))}
        ariaLabel={t("noLogPayloadPrivacy")}
      />
    </div>
  );
}
