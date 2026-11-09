// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createTranslator } from "use-intl/core";
import en from "@/i18n/messages/en.json";
import ConnectionsListPanel from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionsListPanel";

afterEach(cleanup);

for (const tagged of [false, true]) {
  it(`renders the stored OFF state in the ${tagged ? "grouped" : "ungrouped"} account layout`, () => {
    const noop = () => {};
    const callbacks = Object.fromEntries(
      [
        "setSelectedIds",
        "setPage",
        "setHealthFilter",
        "setAccountSearch",
        "handleUpdateConnectionStatus",
        "handleToggleRateLimit",
        "handleToggleQuotaVisibility",
        "handleToggleClaudeExtraUsage",
        "handleToggleCodexPaidCredits",
        "handleToggleCliproxyapiMode",
        "handleSetUpstreamProxyMode",
        "handleToggleCodexLimit",
        "handleToggleProxyEnabled",
        "handleTogglePerKeyProxyEnabled",
        "handleRetestConnection",
        "handleRefreshToken",
        "handleSwapPriority",
        "handleBatchSetActive",
        "handleBatchDeleteOpenModal",
        "handleBatchRetest",
        "handleToggleSelectOne",
        "handleToggleSelectAll",
        "handleDistributeProxies",
        "handleRefreshQuota",
        "onOpenEditModal",
        "onOpenOAuth",
        "onSetProxyTarget",
        "onOpenApplyCodexModal",
        "onExportCodexAuthFile",
        "onOpenApplyClaudeModal",
        "onExportClaudeAuthFile",
        "gateConnectionFlow",
      ].map((key) => [key, noop])
    );
    const props = {
      ...callbacks,
      connections: [
        {
          id: "new-off",
          provider: "openai",
          name: "New account",
          priority: 1,
          authType: "apikey",
          isActive: true,
          proxyEnabled: false,
          providerSpecificData: tagged ? { tag: "Synthetic" } : {},
        },
      ],
      providerId: "openai",
      isCcCompatible: false,
      isOAuth: false,
      codexGlobalServiceMode: "off",
      selectedIds: new Set<string>(),
      batchUpdating: null,
      batchRetesting: false,
      batchDeleting: false,
      batchTesting: false,
      retestingId: null,
      refreshingId: null,
      distributingProxies: false,
      healthFilter: "all",
      page: 0,
      accountSearch: "",
      PAGE_SIZE: 20,
      connProxyMap: {},
      proxyConfig: {},
      emailsVisible: true,
      upstreamProxyMode: "native",
      upstreamProxyFallbackBackend: "cliproxyapi",
      cpaProviderEnabled: false,
      quotaByConnectionId: {},
      quotaRefreshingIds: new Set<string>(),
      deleteConfirm: {
        connection: null,
        deleting: false,
        request: noop,
        cancel: noop,
        confirm: async () => {},
      },
      t: createTranslator({ locale: "en", messages: en, namespace: "providers" }),
    } as React.ComponentProps<typeof ConnectionsListPanel>;
    render(<ConnectionsListPanel {...props} />);
    const off = screen.getByRole("button", { name: en.providers.proxyDisabledTitle });
    expect(off.textContent).toContain(en.providers.proxyOff);
    expect(screen.queryByRole("button", { name: en.providers.proxyEnabledTitle })).toBeNull();
  });
}
