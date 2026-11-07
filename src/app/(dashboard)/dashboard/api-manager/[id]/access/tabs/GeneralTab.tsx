"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Toggle from "@/shared/components/Toggle";

import { useTranslations } from "next-intl";
import { Checkbox, CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import Input from "@/shared/components/Input";
import { ENDPOINT_CATEGORIES } from "@/shared/constants/endpointCategories";
import { toLocalDateTimeInputValue } from "@/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils";
import RoutingEntryLink from "@/shared/components/routing/RoutingEntryLink";
import {
  MAX_KEY_NAME_LENGTH,
  type ApiKeyAccessData,
  type ApiKeyAccessFormState,
} from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

interface GeneralTabProps {
  apiKey: ApiKeyAccessData;
  formState: ApiKeyAccessFormState;
  setName: (name: string) => void;
  setIsActive: (isActive: boolean) => void;
  setIsBanned: (isBanned: boolean) => void;
  setExpiresAt: (expiresAt: string) => void;
  setManageEnabled: (enabled: boolean) => void;
  setSelfUsageEnabled: (enabled: boolean) => void;
  setSelfAccountQuotaEnabled: (enabled: boolean) => void;
  setAllowAllEndpoints: (allowAll: boolean) => void;
  toggleEndpoint: (id: string) => void;
  /** Shown on the name input itself. */
  nameError?: string;
  /** Every General-tab validation message; the name error is not repeated in the list. */
  errors?: string[];
}

type GeneralSectionProps<K extends keyof GeneralTabProps> = Pick<GeneralTabProps, "formState" | K>;

function KeyNameField({
  formState,
  setName,
  nameError,
}: GeneralSectionProps<"setName" | "nameError">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      {/* Key Name */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("keyName")}</p>
        <p className="text-xs text-text-muted">{t("keyNameDesc")}</p>
      </div>
      <div className="w-full sm:w-64 shrink-0">
        <Input
          value={formState.name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("keyNamePlaceholder")}
          maxLength={MAX_KEY_NAME_LENGTH}
          error={nameError}
        />
      </div>
    </div>
  );
}

function ExclusiveLeaseNotice({ apiKey }: Pick<GeneralTabProps, "apiKey">) {
  const t = useTranslations("apiManager");

  const hasExclusiveLeaseScope =
    Array.isArray(apiKey?.scopes) && apiKey.scopes.includes("lease:exclusive");

  return (
    <>
      {/* Exclusive Lease Notice */}
      {hasExclusiveLeaseScope && (
        <div className="flex flex-col gap-1 p-3 rounded-lg border border-chart-3/30 bg-chart-3/10">
          <div className="flex items-center gap-1.5 text-chart-3 font-medium text-sm">
            <Icon name="key_vertical" size={16} />
            {t("exclusiveLeaseNoticeTitle")}
          </div>
          <p className="text-xs text-chart-3/80">{t("exclusiveLeaseNoticeDesc")}</p>
        </div>
      )}
    </>
  );
}

function KeyActiveToggle({ formState, setIsActive }: GeneralSectionProps<"setIsActive">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      {/* Key Active Toggle */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("keyActive")}</p>
        <p className="text-xs text-text-muted">{t("keyActiveDesc")}</p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={formState.isActive}
        onChange={() => setIsActive(!formState.isActive)}
        ariaLabel={t("keyActive")}
      />
    </div>
  );
}

function BanToggle({ formState, setIsBanned }: GeneralSectionProps<"setIsBanned">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-error/20 bg-error/5">
      {/* Ban Toggle (SECURITY) */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold text-error">{t("bannedStatus")}</p>
        <p className="text-xs text-error">
          Immediately revoke all access. Used for suspected abuse or compromised keys.
        </p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={formState.isBanned}
        onChange={() => setIsBanned(!formState.isBanned)}
        ariaLabel={t("bannedStatus")}
      />
    </div>
  );
}

function ExpirationDateField({ formState, setExpiresAt }: GeneralSectionProps<"setExpiresAt">) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-surface/40">
      {/* Expiration Date */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("expirationDate")}</p>
        <p className="text-xs text-text-muted">
          Key will automatically stop working after this date.
        </p>
      </div>
      <div className="flex gap-2 max-w-md">
        <Input
          type="datetime-local"
          aria-label={t("expirationDate")}
          className="min-w-0 flex-1"
          value={toLocalDateTimeInputValue(formState.expiresAt)}
          onChange={(e) => {
            const val = e.target.value;
            if (!val) {
              setExpiresAt("");
              return;
            }
            const date = new Date(val);
            if (!Number.isNaN(date.getTime())) {
              setExpiresAt(date.toISOString());
            }
          }}
        />
        <Button
          variant="outline"
          onClick={() => setExpiresAt("")}
          disabled={!formState.expiresAt}
          className="shrink-0"
        >
          {tc("clear")}
        </Button>
      </div>
    </div>
  );
}

function ManagementAccessToggle({
  formState,
  setManageEnabled,
}: GeneralSectionProps<"setManageEnabled">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      {/* Management Access */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("managementAccess")}</p>
        <p className="text-xs text-text-muted">{t("managementAccessDesc")}</p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={formState.manageEnabled}
        onChange={() => setManageEnabled(!formState.manageEnabled)}
        ariaLabel={t("managementAccess")}
      />
    </div>
  );
}

function SelfServiceVisibility({
  formState,
  setSelfUsageEnabled,
  setSelfAccountQuotaEnabled,
}: GeneralSectionProps<"setSelfUsageEnabled" | "setSelfAccountQuotaEnabled">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
      {/* Self-service Visibility */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("selfServiceVisibility")}</p>
        <p className="text-xs text-text-muted">{t("selfServiceVisibilityDesc")}</p>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium text-text-main">{t("ownUsageVisibility")}</p>
          <p className="text-xs text-text-muted">{t("ownUsageVisibilityDesc")}</p>
        </div>
        <Toggle
          size="sm"
          className="shrink-0"
          checked={formState.selfUsageEnabled}
          onChange={() => setSelfUsageEnabled(!formState.selfUsageEnabled)}
          ariaLabel={t("ownUsageVisibility")}
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium text-text-main">{t("sharedAccountQuotaVisibility")}</p>
          <p className="text-xs text-text-muted">{t("sharedAccountQuotaVisibilityDesc")}</p>
        </div>
        <Toggle
          size="sm"
          className="shrink-0"
          checked={formState.selfAccountQuotaEnabled}
          disabled={!formState.selfUsageEnabled}
          onChange={() => setSelfAccountQuotaEnabled(!formState.selfAccountQuotaEnabled)}
          ariaLabel={t("sharedAccountQuotaVisibility")}
        />
      </div>
    </div>
  );
}

function EndpointCategoryPicker({
  formState,
  toggleEndpoint,
}: GeneralSectionProps<"toggleEndpoint">) {
  const t = useTranslations("apiManager");

  // Multi-select list: kit CheckboxGroup + card checkboxes (label + description per category).
  // The visible section heading ("Endpoint restrictions") sits right above, so the group is
  // named by aria-label instead of repeating it as a second visible label.
  return (
    <CheckboxGroup
      aria-label={t("endpointRestrictions")}
      className="pt-1 [&_.ci-checkbox-group__items]:grid [&_.ci-checkbox-group__items]:max-h-56 [&_.ci-checkbox-group__items]:grid-cols-1 [&_.ci-checkbox-group__items]:gap-2 [&_.ci-checkbox-group__items]:overflow-y-auto sm:[&_.ci-checkbox-group__items]:grid-cols-2"
    >
      {ENDPOINT_CATEGORIES.map((cat) => (
        <Checkbox
          key={cat.id}
          card
          checked={formState.selectedEndpoints.includes(cat.id)}
          onChange={() => toggleEndpoint(cat.id)}
          label={<span className="text-xs font-medium">{cat.label}</span>}
          description={<span className="text-[10px]">{cat.description}</span>}
        />
      ))}
    </CheckboxGroup>
  );
}

function AllowedEndpointsSection({
  formState,
  setAllowAllEndpoints,
  toggleEndpoint,
}: GeneralSectionProps<"setAllowAllEndpoints" | "toggleEndpoint">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
      {/* Allowed Endpoints Section */}
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
            size="sm"
            variant={formState.allowAllEndpoints ? "primary" : "ghost"}
            aria-pressed={formState.allowAllEndpoints}
            onClick={() => setAllowAllEndpoints(true)}
            className="gap-1.5 text-xs"
          >
            {t("all")}
          </Button>
          <Button
            size="sm"
            variant={!formState.allowAllEndpoints ? "primary" : "ghost"}
            aria-pressed={!formState.allowAllEndpoints}
            onClick={() => setAllowAllEndpoints(false)}
            className="gap-1.5 text-xs"
          >
            {t("restrict")}
          </Button>
        </div>
      </div>
      {!formState.allowAllEndpoints && (
        <EndpointCategoryPicker formState={formState} toggleEndpoint={toggleEndpoint} />
      )}
    </div>
  );
}

export default function GeneralTab({
  apiKey,
  formState,
  setName,
  setIsActive,
  setIsBanned,
  setExpiresAt,
  setManageEnabled,
  setSelfUsageEnabled,
  setSelfAccountQuotaEnabled,
  setAllowAllEndpoints,
  toggleEndpoint,
  nameError,
  errors,
}: GeneralTabProps) {
  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors?.filter((message) => message !== nameError)} />

      <KeyNameField formState={formState} setName={setName} nameError={nameError} />

      {apiKey?.id && <RoutingEntryLink apiKeyId={apiKey.id} />}

      <ExclusiveLeaseNotice apiKey={apiKey} />
      <KeyActiveToggle formState={formState} setIsActive={setIsActive} />
      <BanToggle formState={formState} setIsBanned={setIsBanned} />
      <ExpirationDateField formState={formState} setExpiresAt={setExpiresAt} />
      <ManagementAccessToggle formState={formState} setManageEnabled={setManageEnabled} />
      <SelfServiceVisibility
        formState={formState}
        setSelfUsageEnabled={setSelfUsageEnabled}
        setSelfAccountQuotaEnabled={setSelfAccountQuotaEnabled}
      />
      <AllowedEndpointsSection
        formState={formState}
        setAllowAllEndpoints={setAllowAllEndpoints}
        toggleEndpoint={toggleEndpoint}
      />
    </div>
  );
}
