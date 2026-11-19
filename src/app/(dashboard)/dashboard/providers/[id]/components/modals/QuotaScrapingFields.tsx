"use client";

import { Input } from "@/shared/components";
import { getProviderConnectionFamilyIds } from "@/shared/constants/providers";
import { providerText, type ProviderMessageTranslator } from "../../providerPageHelpers";

import {
  assignQuotaScrapingProviderData,
  EMPTY_QUOTA_SCRAPING_FIELDS,
  MUSE_CODE_PROVIDERS,
  QWEN_TOKEN_PLAN_PROVIDERS,
  VOLCENGINE_PLAN_PROVIDERS,
  XIAOMI_MIMO_PROVIDERS,
  type QuotaScrapingFieldValues,
} from "./quotaScrapingFieldValues";

// Re-exported so existing importers (modals, tests) keep their current paths.
export { assignQuotaScrapingProviderData, EMPTY_QUOTA_SCRAPING_FIELDS };
export type { QuotaScrapingFieldValues };

type QuotaScrapingFieldsProps = {
  provider?: string;
  values: QuotaScrapingFieldValues;
  onChange: (patch: Partial<QuotaScrapingFieldValues>) => void;
  t: ProviderMessageTranslator;
  editMode?: boolean;
};

export default function QuotaScrapingFields(props: QuotaScrapingFieldsProps) {
  if (props.provider === "zed-hosted") return <ZedHostedBillingPortalField {...props} />;
  if (MUSE_CODE_PROVIDERS.has(props.provider ?? "")) return <MuseConsoleSessionFields {...props} />;
  return <ConsoleSessionQuotaFields {...props} />;
}

/** Zed Hosted is OAuth-only; its one quota input is the optional Orb billing portal link. */
function ZedHostedBillingPortalField({
  values,
  onChange,
  t,
  editMode = false,
}: QuotaScrapingFieldsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-4">
      <Input
        label={providerText(
          t,
          "zedHostedBillingPortalUrlLabel",
          "Zed Hosted billing portal link (optional)"
        )}
        name="billingPortalUrl"
        type="password"
        value={values.billingPortalUrl ?? ""}
        onChange={(e) => onChange({ billingPortalUrl: e.target.value })}
        placeholder="https://portal.withorb.com/view?token=..."
        hint={providerText(
          t,
          "zedHostedBillingPortalUrlHint",
          (editMode ? "Leave blank to keep the stored link. " : "") +
            "Optional. Copy the Orb billing portal link from Zed's billing page. " +
            "Once set, switch Provider Limits to the Full or Compact layout to see the remaining USD credit."
        )}
        autoComplete="off"
        spellCheck={false}
        autoCapitalize="off"
      />
    </div>
  );
}

/** Muse Code quota lives behind the dev.meta.ai console: a session cookie plus an optional team id. */
function MuseConsoleSessionFields({
  values,
  onChange,
  t,
  editMode = false,
}: QuotaScrapingFieldsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-4">
      <Input
        label={providerText(t, "museConsoleSessionLabel", "Muse Code console session")}
        name="museConsoleSession"
        type="password"
        value={values.museConsoleSession}
        onChange={(e) => onChange({ museConsoleSession: e.target.value })}
        placeholder="llama_dev_sess=..."
        hint={providerText(
          t,
          "museConsoleSessionHint",
          (editMode ? "Leave blank to keep the stored session. " : "") +
            "Required for live 5h/weekly quota — the inference key cannot read it. " +
            "How to get it: log in to the Muse developer console, open DevTools > Application > Cookies > dev.meta.ai > llama_dev_sess, " +
            "then copy the cookie VALUE (not the whole Cookie header). It is sensitive and expires in about a year."
        )}
        autoComplete="off"
        spellCheck={false}
        autoCapitalize="off"
      />
      <Input
        label={providerText(t, "museTeamIdLabel", "Muse Code team id (optional)")}
        name="museTeamId"
        value={values.museTeamId}
        onChange={(e) => onChange({ museTeamId: e.target.value })}
        placeholder="team-..."
        hint={providerText(
          t,
          "museTeamIdHint",
          (editMode ? "Leave blank to keep the stored team id. " : "") +
            "Optional. Set it only if the console quota is team-scoped."
        )}
        autoComplete="off"
        spellCheck={false}
        autoCapitalize="off"
      />
    </div>
  );
}

function ConsoleSessionQuotaFields({
  provider,
  values,
  onChange,
  t,
  editMode = false,
}: QuotaScrapingFieldsProps) {
  if (provider === "ollama-cloud") {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-4">
        <Input
          label={providerText(t, "ollamaCloudUsageCookieLabel", "Ollama Cloud usage cookie")}
          name="ollamaCloudUsageCookie"
          type="password"
          value={values.ollamaCloudUsageCookie}
          onChange={(e) => onChange({ ollamaCloudUsageCookie: e.target.value })}
          placeholder="__Secure-session=..."
          hint={providerText(
            t,
            "ollamaCloudUsageCookieHint",
            editMode
              ? "Leave blank to keep the stored cookie. Paste the __Secure-session cookie value from ollama.com/settings to replace it."
              : "Required for quota scraping. Paste the __Secure-session cookie value from ollama.com/settings."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
      </div>
    );
  }

  if (getProviderConnectionFamilyIds("alibaba").includes(provider)) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-4">
        <Input
          label={providerText(
            t,
            "alibabaConsoleCookieLabel",
            "Alibaba console cookie (free-tier sync)"
          )}
          name="alibabaConsoleCookie"
          type="password"
          value={values.alibabaConsoleCookie}
          onChange={(e) => onChange({ alibabaConsoleCookie: e.target.value })}
          placeholder="login_aliyunid_ticket=..."
          hint={providerText(
            t,
            "alibabaConsoleCookieHint",
            editMode
              ? "Leave blank to keep the stored cookie. Paste login_aliyunid_ticket or the full Cookie header from modelstudio.console.alibabacloud.com."
              : "Paste login_aliyunid_ticket or the full Cookie header from the Model Studio console Free Quota page."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
        <Input
          label={providerText(
            t,
            "alibabaConsoleSecTokenLabel",
            "Alibaba console sec_token (optional)"
          )}
          name="alibabaConsoleSecToken"
          type="password"
          value={values.alibabaConsoleSecToken}
          onChange={(e) => onChange({ alibabaConsoleSecToken: e.target.value })}
          placeholder="KmdQ..."
          hint={providerText(
            t,
            "alibabaConsoleSecTokenHint",
            "Optional. Copy sec_token from the Free Quota network request if cookie-only sync fails."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
      </div>
    );
  }

  if (QWEN_TOKEN_PLAN_PROVIDERS.has(provider ?? "")) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-4">
        <Input
          label={providerText(t, "qwenCloudCookieLabel", "Qwen / Model Studio console cookie")}
          name="qwenCloudCookie"
          type="password"
          value={values.qwenCloudCookie}
          onChange={(e) => onChange({ qwenCloudCookie: e.target.value })}
          placeholder="cna=...; login_qwencloud_ticket=...; ..."
          hint={providerText(
            t,
            "qwenCloudCookieHint",
            (editMode ? "Leave blank to keep the stored cookie. " : "") +
              "Required for Token Plan quota — the inference API key cannot read it. " +
              "How to get it: open home.qwencloud.com › Billing › Subscription while logged in, " +
              "press F12 › Network, reload the page, filter by api.json, click any request to " +
              "cs-data.qwencloud.com, then under Request Headers copy the WHOLE Cookie value " +
              "(it contains login_qwencloud_ticket). It expires with the browser session — " +
              "re-paste it when the quota reports an expired session."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
        <Input
          label={providerText(t, "qwenCloudSecTokenLabel", "Qwen console sec_token (optional)")}
          name="qwenCloudSecToken"
          type="password"
          value={values.qwenCloudSecToken}
          onChange={(e) => onChange({ qwenCloudSecToken: e.target.value })}
          placeholder="GjRV..."
          hint={providerText(
            t,
            "qwenCloudSecTokenHint",
            "Optional — resolved automatically from the dashboard. Set it only if quota sync reports a permission error."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
      </div>
    );
  }

  if (VOLCENGINE_PLAN_PROVIDERS.has(provider ?? "")) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-4">
        <Input
          label={providerText(t, "volcConsoleCookieLabel", "Volcano Engine console cookie")}
          name="volcConsoleCookie"
          type="password"
          value={values.volcConsoleCookie}
          onChange={(e) => onChange({ volcConsoleCookie: e.target.value })}
          placeholder="session=...; AccountID=..."
          hint={providerText(
            t,
            "volcConsoleCookieHint",
            editMode
              ? "Leave blank to keep the stored cookie. To rotate, paste the updated cookie string from console.volcengine.com."
              : "Required for Volcano Ark Plan quota -- the inference API key cannot read it. " +
                  "How to get it: log in to console.volcengine.com, open Developer Tools (F12), " +
                  "run document.cookie (or inspect Network headers), and paste the cookie string here. " +
                  "It expires with your browser session; re-paste when quota reports an expired session."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
      </div>
    );
  }

  if (XIAOMI_MIMO_PROVIDERS.has(provider ?? "")) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-4">
        <Input
          label={providerText(t, "xiaomiMimoConsoleCookieLabel", "Xiaomi MiMo console cookie")}
          name="xiaomiMimoConsoleCookie"
          type="password"
          value={values.xiaomiMimoConsoleCookie}
          onChange={(e) => onChange({ xiaomiMimoConsoleCookie: e.target.value })}
          placeholder="api-platform_serviceToken=...; userId=..."
          hint={providerText(
            t,
            "xiaomiMimoConsoleCookieHint",
            (editMode ? "Leave blank to keep the stored cookie. " : "") +
              "Required for live Token Plan quota — the inference API key cannot read it. " +
              "How to get it: open platform.xiaomimimo.com (logged in) on the Token Plan page, " +
              "press F12 › Network, reload, click any request to platform.xiaomimimo.com, then " +
              "under Request Headers copy the WHOLE Cookie value (it contains " +
              "api-platform_serviceToken and userId). It expires with the browser session — " +
              "re-paste it when the quota reports an expired session."
          )}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
      </div>
    );
  }

  return null;
}
