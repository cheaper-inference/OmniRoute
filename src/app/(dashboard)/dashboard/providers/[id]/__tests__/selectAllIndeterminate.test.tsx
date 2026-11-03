// @vitest-environment jsdom
/**
 * KEA-7886 lote 2b review — the select-all checkbox must keep its mixed state
 * after "all selected → deselect one". The kit Checkbox owns `indeterminate`
 * through its own effect, so a ref callback that sets it is overwritten when
 * `checked` flips; the panel must pass the `indeterminate` prop instead.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

import ConnectionsListPanel from "../components/ConnectionsListPanel";

type PanelProps = React.ComponentProps<typeof ConnectionsListPanel>;

const noop = () => {};

function connections(tagged: boolean) {
  return ["a", "b", "c"].map((id, index) => ({
    id: `conn-${id}`,
    name: `Key ${id}`,
    priority: index + 1,
    isActive: true,
    providerSpecificData: tagged ? { tag: "team" } : {},
  }));
}

function buildProps(tagged: boolean, selected: string[]): PanelProps {
  const base: Record<string, unknown> = {
    connections: connections(tagged),
    providerId: "openai",
    isCcCompatible: false,
    isOAuth: false,
    codexGlobalServiceMode: "default",
    selectedIds: new Set(selected),
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
    PAGE_SIZE: 50,
    connProxyMap: {},
    proxyConfig: null,
    applyingCodexAuthId: null,
    exportingCodexAuthId: null,
    applyingClaudeAuthId: null,
    exportingClaudeAuthId: null,
    emailsVisible: true,
    deleteConfirm: { pending: null, request: noop, confirm: noop, cancel: noop },
    upstreamProxyMode: "native",
    upstreamProxyFallbackBackend: "cliproxyapi",
    cpaProviderEnabled: false,
    quotaByConnectionId: {},
    quotaRefreshingIds: new Set<string>(),
    t: (key: string) => key,
  };
  // Every remaining prop is a setter/handler/modal trigger: a no-op is enough here.
  return new Proxy(base, {
    get: (target, prop: string) => (prop in target ? target[prop] : noop),
    has: () => true,
  }) as unknown as PanelProps;
}

const mounted: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function mount() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  mounted.push({ root, el });
  return {
    render: (props: PanelProps) => act(() => root.render(<ConnectionsListPanel {...props} />)),
    selectAll: () => el.querySelector<HTMLInputElement>("input[type=checkbox]")!,
  };
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of mounted.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe.each([
  ["untagged list (page select-all)", false],
  ["tagged list (global select-all)", true],
])("select-all checkbox — %s", (_label, tagged) => {
  it("shows the mixed state again after all selected → deselect one", () => {
    const view = mount();
    const steps: Array<[string[], boolean, boolean]> = [
      [[], false, false],
      [["conn-a"], false, true],
      [["conn-a", "conn-b", "conn-c"], true, false],
      [["conn-a", "conn-b"], false, true],
      [["conn-a"], false, true],
    ];
    for (const [selected, checked, indeterminate] of steps) {
      view.render(buildProps(tagged, selected));
      const box = view.selectAll();
      expect({ selected, checked: box.checked, indeterminate: box.indeterminate }).toEqual({
        selected,
        checked,
        indeterminate,
      });
    }
  });
});
