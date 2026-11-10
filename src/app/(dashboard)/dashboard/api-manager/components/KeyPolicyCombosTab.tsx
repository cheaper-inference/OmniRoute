"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import { AllowedCombosSection } from "./AllowedCombosSection";
import { ApiKeyAutoCombosToggle } from "./ApiKeyAutoCombosToggle";
import { ApiKeyCcDiscoveryAliasesToggle } from "./ApiKeyCcDiscoveryAliasesToggle";

import { useKeyPolicyEditor } from "./KeyPolicyEditorContext";

export default function KeyPolicyCombosTab() {
  const { t, tc, formState, updateState, allConnections } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-4">
      <ApiKeyAutoCombosToggle
        enabled={formState.allowAutoCombos}
        onToggle={() => updateState((p) => ({ ...p, allowAutoCombos: !p.allowAutoCombos }))}
      />
      <ApiKeyCcDiscoveryAliasesToggle
        enabled={formState.allowCcDiscoveryAliases}
        onToggle={() =>
          updateState((p) => ({
            ...p,
            allowCcDiscoveryAliases: !p.allowCcDiscoveryAliases,
          }))
        }
      />

      <ComboAccessMode />

      {/* Auto-Combo Candidate Overrides */}
      <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main">
          {t("templateAutoCandidateOverridesTitle")}
        </p>
        <p className="text-xs text-text-muted">{t("templateAutoCandidateOverridesDesc")}</p>
        <AutoCandidateOverrides />
        <datalist id="policy-editor-conn-options">
          {allConnections.map((c) => (
            <option key={c.id} value={c.id} label={c.name || c.id} />
          ))}
        </datalist>
        {formState.autoCandidateOverrides.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2">
            {formState.autoCandidateOverrides.map((ov, idx) => (
              <div
                key={`${ov.autoChannel}-${ov.connectionId}-${idx}`}
                className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded bg-surface border border-border text-xs"
              >
                <span className="font-mono">
                  {ov.autoChannel} → {ov.connectionId} ({ov.excluded ? "excluded" : "included"})
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    updateState((p) => ({
                      ...p,
                      autoCandidateOverrides: p.autoCandidateOverrides.filter((_, i) => i !== idx),
                    }))
                  }
                  aria-label={tc("delete")}
                >
                  <Icon name="delete" size={14} className="text-error" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SelectedComboChips() {
  const { t, formState, updateState, allCombos } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 pt-2">
      {allCombos.length > 0 && (
        <AllowedCombosSection
          allCombos={allCombos}
          allowAllCombos={formState.allowAllCombos}
          selectedCombos={formState.selectedCombos}
          onAllowAll={(preserved) =>
            updateState((p) => ({
              ...p,
              allowAllCombos: true,
              selectedCombos: preserved,
            }))
          }
          onRestrict={() => updateState((p) => ({ ...p, allowAllCombos: false }))}
          onToggleCombo={(comboName) =>
            updateState((p) => ({
              ...p,
              selectedCombos: p.selectedCombos.includes(comboName)
                ? p.selectedCombos.filter((c) => c !== comboName)
                : [...p.selectedCombos, comboName],
            }))
          }
        />
      )}
      {formState.selectedCombos.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {formState.selectedCombos.map((comboName) => (
            <span
              key={comboName}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
            >
              {comboName}
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="h-4 w-4 p-0 text-text-muted hover:text-error"
                onClick={() =>
                  updateState((p) => ({
                    ...p,
                    selectedCombos: p.selectedCombos.filter((c) => c !== comboName),
                  }))
                }
                aria-label={t("removeSelection", { name: comboName })}
              >
                <Icon name="close" size={12} />
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ComboAccessMode() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-text-main">{t("allowedCombos")}</p>
          <p className="text-xs text-text-muted">
            {formState.allowAllCombos
              ? t("allCombosAllowed")
              : formState.selectedCombos.length === 0
                ? t("templateCombosDenyAllBanner")
                : t("restrictedComboCount", {
                    count: formState.selectedCombos.length,
                  })}
          </p>
        </div>
        <div className="flex gap-1 p-0.5 bg-surface rounded-md">
          <Button
            type="button"
            size="sm"
            variant={formState.allowAllCombos ? "primary" : "ghost"}
            aria-pressed={formState.allowAllCombos}
            onClick={() => updateState((p) => ({ ...p, allowAllCombos: true }))}
            className="text-xs"
          >
            {t("all")}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={!formState.allowAllCombos ? "primary" : "ghost"}
            aria-pressed={!formState.allowAllCombos}
            onClick={() => updateState((p) => ({ ...p, allowAllCombos: false }))}
            className="text-xs"
          >
            {t("restrict")}
          </Button>
        </div>
      </div>

      {!formState.allowAllCombos && <SelectedComboChips />}
    </div>
  );
}

function AutoCandidateOverrides() {
  const {
    t,
    updateState,
    newOverrideChannel,
    setNewOverrideChannel,
    newOverrideConnId,
    setNewOverrideConnId,
  } = useKeyPolicyEditor();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <Input
        value={newOverrideChannel}
        onChange={(e) => setNewOverrideChannel(e.target.value)}
        placeholder={t("templateAutoChannelPlaceholder")}
      />
      <Input
        value={newOverrideConnId}
        onChange={(e) => setNewOverrideConnId(e.target.value)}
        list="policy-editor-conn-options"
        placeholder={t("templateConnectionIdPlaceholder")}
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={!newOverrideChannel.trim() || !newOverrideConnId.trim()}
        onClick={() => {
          const ch = newOverrideChannel.trim();
          const cid = newOverrideConnId.trim();
          if (!ch || !cid) return;
          updateState((p) => ({
            ...p,
            autoCandidateOverrides: [
              ...p.autoCandidateOverrides.filter(
                (o) => !(o.autoChannel === ch && o.connectionId === cid)
              ),
              {
                clientRowId: crypto.randomUUID(),
                autoChannel: ch,
                connectionId: cid,
                excluded: true,
              },
            ],
          }));
          setNewOverrideConnId("");
        }}
      >
        {t("templateAddCandidateOverride")}
      </Button>
    </div>
  );
}
