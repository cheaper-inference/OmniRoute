"use client";

import { Checkbox, CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import { ENDPOINT_CATEGORIES } from "@/shared/constants/endpointCategories";

import { useKeyPolicyEditor } from "./KeyPolicyEditorContext";

export default function KeyPolicyGeneralTab() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-4">
      {/* Lifecycle: Active & Banned */}
      <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("keyActive")}</p>
          <p className="text-xs text-text-muted">{t("keyActiveDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.isActive}
          onChange={() => updateState((p) => ({ ...p, isActive: !p.isActive }))}
          ariaLabel={t("keyActive")}
        />
      </div>

      <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-error/20 bg-error/5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-error">{t("bannedStatus")}</p>
          <p className="text-xs text-error">{t("templateBannedStatusDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.isBanned}
          onChange={() => updateState((p) => ({ ...p, isBanned: !p.isBanned }))}
          ariaLabel={t("bannedStatus")}
        />
      </div>

      {/* Relative Expiry */}
      <RelativeExpiryFields />

      {/* Management Access */}
      <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("managementAccess")}</p>
          <p className="text-xs text-text-muted">{t("managementAccessDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.manageEnabled}
          onChange={() => updateState((p) => ({ ...p, manageEnabled: !p.manageEnabled }))}
          ariaLabel={t("managementAccess")}
        />
      </div>

      {/* Self-service Visibility */}
      <SelfServicePermissions />

      {/* Extra Scopes (e.g. lease:exclusive or custom scopes) */}
      <ExclusiveLeaseScope />

      {/* Allowed Endpoints */}
      <EndpointRestrictions />

      {/* IP Allowlist & Proxy ID */}
      <IpRestrictions />
    </div>
  );
}

function SelfServicePermissions() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("selfServiceVisibility")}</p>
        <p className="text-xs text-text-muted">{t("selfServiceVisibilityDesc")}</p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium text-text-main">{t("ownUsageVisibility")}</p>
          <p className="text-xs text-text-muted">{t("ownUsageVisibilityDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.selfUsageEnabled}
          onChange={() =>
            updateState((p) => ({
              ...p,
              selfUsageEnabled: !p.selfUsageEnabled,
              selfAccountQuotaEnabled: p.selfUsageEnabled ? false : p.selfAccountQuotaEnabled,
            }))
          }
          ariaLabel={t("ownUsageVisibility")}
        />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium text-text-main">{t("sharedAccountQuotaVisibility")}</p>
          <p className="text-xs text-text-muted">{t("sharedAccountQuotaVisibilityDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.selfAccountQuotaEnabled}
          disabled={!formState.selfUsageEnabled}
          onChange={() =>
            updateState((p) => ({
              ...p,
              selfAccountQuotaEnabled: !p.selfAccountQuotaEnabled,
            }))
          }
          ariaLabel={t("sharedAccountQuotaVisibility")}
        />
      </div>
    </div>
  );
}

function EndpointAllowlist() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("endpointRestrictions")}</p>
        <p className="text-xs text-text-muted">
          {formState.allowAllEndpoints
            ? t("allEndpointsAllowed")
            : t("endpointsRestricted", {
                count: formState.selectedEndpoints.length,
              })}
        </p>
      </div>
      <div className="flex gap-1 p-0.5 bg-surface rounded-md">
        <Button
          type="button"
          size="sm"
          variant={formState.allowAllEndpoints ? "primary" : "ghost"}
          aria-pressed={formState.allowAllEndpoints}
          onClick={() =>
            updateState((p) => ({
              ...p,
              allowAllEndpoints: true,
              selectedEndpoints: [],
            }))
          }
          className="text-xs"
        >
          {t("all")}
        </Button>
        <Button
          type="button"
          size="sm"
          variant={!formState.allowAllEndpoints ? "primary" : "ghost"}
          aria-pressed={!formState.allowAllEndpoints}
          onClick={() =>
            updateState((p) => ({
              ...p,
              allowAllEndpoints: false,
              selectedEndpoints:
                p.selectedEndpoints.length === 0
                  ? ENDPOINT_CATEGORIES.map((c) => c.id)
                  : p.selectedEndpoints,
            }))
          }
          className="text-xs"
        >
          {t("restrict")}
        </Button>
      </div>
    </div>
  );
}

function ExpiryPolicy() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("templateExpirationPolicy")}</p>
        <p className="text-xs text-text-muted">{t("templateExpirationPolicyDesc")}</p>
      </div>
      <div className="flex gap-1 p-0.5 bg-surface rounded-md shrink-0">
        <Button
          type="button"
          size="sm"
          variant={formState.expiryMode === "none" ? "primary" : "ghost"}
          aria-pressed={formState.expiryMode === "none"}
          onClick={() => updateState((p) => ({ ...p, expiryMode: "none" }))}
          className="text-xs"
        >
          {t("never")}
        </Button>
        <Button
          type="button"
          size="sm"
          variant={formState.expiryMode === "relative" ? "primary" : "ghost"}
          aria-pressed={formState.expiryMode === "relative"}
          onClick={() => updateState((p) => ({ ...p, expiryMode: "relative" }))}
          className="text-xs"
        >
          {t("templateRelativeTtl")}
        </Button>
      </div>
    </div>
  );
}

function RelativeExpiryFields() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <ExpiryPolicy />
      {formState.expiryMode === "relative" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/50">
          <Input
            label={t("templateTtlDuration")}
            type="number"
            min={1}
            value={formState.expiryTtlValue}
            onChange={(e) => updateState((p) => ({ ...p, expiryTtlValue: e.target.value }))}
          />
          <Select
            label={t("templateTtlUnit")}
            value={formState.expiryTtlUnit}
            onChange={(e) =>
              updateState((p) => ({
                ...p,
                expiryTtlUnit: e.target.value as "seconds" | "minutes" | "hours" | "days",
              }))
            }
          >
            <option value="seconds">{t("templateUnitSeconds")}</option>
            <option value="minutes">{t("templateUnitMinutes")}</option>
            <option value="hours">{t("templateUnitHours")}</option>
            <option value="days">{t("templateUnitDays")}</option>
          </Select>
        </div>
      )}
    </div>
  );
}

function ExtraScopeChips() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
      {formState.extraScopes
        .filter((s) => s !== "lease:exclusive")
        .map((scope) => (
          <span
            key={scope}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
          >
            {scope}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-4 w-4 p-0 text-text-muted hover:text-error"
              onClick={() =>
                updateState((p) => ({
                  ...p,
                  extraScopes: p.extraScopes.filter((s) => s !== scope),
                }))
              }
              aria-label={t("removeSelection", { name: scope })}
            >
              <Icon name="close" size={12} />
            </Button>
          </span>
        ))}
    </div>
  );
}

function ExclusiveLeaseScope() {
  const { t, formState, updateState, newExtraScope, setNewExtraScope } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-text-main">{t("exclusiveLease")}</p>
          <p className="text-xs text-text-muted">{t("exclusiveLeaseNoticeDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.extraScopes.includes("lease:exclusive")}
          onChange={() =>
            updateState((p) => ({
              ...p,
              extraScopes: p.extraScopes.includes("lease:exclusive")
                ? p.extraScopes.filter((s) => s !== "lease:exclusive")
                : [...p.extraScopes, "lease:exclusive"],
            }))
          }
          ariaLabel={t("exclusiveLease")}
        />
      </div>
      {formState.extraScopes.filter((s) => s !== "lease:exclusive").length > 0 && (
        <ExtraScopeChips />
      )}
      <div className="flex gap-2 pt-1">
        <Input
          value={newExtraScope}
          onChange={(e) => setNewExtraScope(e.target.value)}
          placeholder={t("templateAdditionalScopePlaceholder")}
          className="flex-1"
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={!newExtraScope.trim()}
          onClick={() => {
            const s = newExtraScope.trim();
            if (!s) return;
            updateState((p) => ({
              ...p,
              extraScopes: p.extraScopes.includes(s) ? p.extraScopes : [...p.extraScopes, s],
            }));
            setNewExtraScope("");
          }}
        >
          {t("templateAddScope")}
        </Button>
      </div>
    </div>
  );
}

function EndpointRestrictions() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <EndpointAllowlist />
      {!formState.allowAllEndpoints && (
        <CheckboxGroup
          aria-label={t("endpointRestrictions")}
          className="pt-1 [&_.ci-checkbox-group__items]:grid [&_.ci-checkbox-group__items]:max-h-56 [&_.ci-checkbox-group__items]:grid-cols-1 [&_.ci-checkbox-group__items]:gap-2 [&_.ci-checkbox-group__items]:overflow-y-auto sm:[&_.ci-checkbox-group__items]:grid-cols-2"
        >
          {ENDPOINT_CATEGORIES.map((cat) => (
            <Checkbox
              key={cat.id}
              card
              checked={formState.selectedEndpoints.includes(cat.id)}
              onChange={() =>
                updateState((p) => ({
                  ...p,
                  selectedEndpoints: p.selectedEndpoints.includes(cat.id)
                    ? p.selectedEndpoints.filter((id) => id !== cat.id)
                    : [...p.selectedEndpoints, cat.id],
                }))
              }
              label={<span className="text-xs font-medium">{cat.label}</span>}
              description={<span className="text-[10px]">{cat.description}</span>}
            />
          ))}
        </CheckboxGroup>
      )}
    </div>
  );
}

function AddIpRestriction() {
  const { t, updateState, newIpCidr, setNewIpCidr } = useKeyPolicyEditor();
  return (
    <div className="flex gap-2">
      <Input
        value={newIpCidr}
        onChange={(e) => setNewIpCidr(e.target.value)}
        placeholder="e.g. 10.0.0.0/8"
        className="flex-1"
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={!newIpCidr.trim()}
        onClick={() => {
          const ip = newIpCidr.trim();
          if (!ip) return;
          updateState((p) => ({
            ...p,
            ipAllowlist: p.ipAllowlist.includes(ip) ? p.ipAllowlist : [...p.ipAllowlist, ip],
          }));
          setNewIpCidr("");
        }}
      >
        {t("templateAddIp")}
      </Button>
    </div>
  );
}

function IpRestrictions() {
  const { t, formState, updateState, allProxies } = useKeyPolicyEditor();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main">{t("templateIpAllowlist")}</p>
        <p className="text-xs text-text-muted">{t("templateIpAllowlistDesc")}</p>
        <AddIpRestriction />
        {formState.ipAllowlist.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {formState.ipAllowlist.map((ip) => (
              <span
                key={ip}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
              >
                {ip}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-4 w-4 p-0 text-text-muted hover:text-error"
                  onClick={() =>
                    updateState((p) => ({
                      ...p,
                      ipAllowlist: p.ipAllowlist.filter((entry) => entry !== ip),
                    }))
                  }
                  aria-label={t("removeSelection", { name: ip })}
                >
                  <Icon name="close" size={12} />
                </Button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main">{t("templateBoundProxy")}</p>
        <p className="text-xs text-text-muted">{t("templateBoundProxyDesc")}</p>
        <Input
          value={formState.proxyId}
          onChange={(e) => updateState((p) => ({ ...p, proxyId: e.target.value }))}
          list="policy-editor-proxy-options"
          placeholder={t("templateBoundProxyPlaceholder")}
        />
        <datalist id="policy-editor-proxy-options">
          {allProxies.map((proxy) => (
            <option
              key={proxy.id}
              value={proxy.id}
              label={proxy.name || `${proxy.host ?? ""}:${proxy.port ?? ""}`}
            />
          ))}
        </datalist>
      </div>
    </div>
  );
}
