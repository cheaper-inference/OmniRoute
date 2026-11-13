// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

// #18875: topology health came from `providerStats`, which only walks the static AI_PROVIDERS
// catalog, so custom nodes stayed "idle" (a grey border) however healthy their connection was.
// These render HomePageClient and read the `providers` prop handed to the topology section, so
// they pin the resolved status per node rather than the shape of the source.

type TopologyProvider = { id: string; status?: string };

const CUSTOM_NODE = "openai-compatible-chat-3f7c1d2e-1111-4222-8333-444455556666";
const NOAUTH_PROVIDER = "cloudflare-playground";

const topology = vi.hoisted(() => ({ providers: [] as TopologyProvider[] }));

function makeTranslator() {
  const t = (key: string) => key;
  t.rich = (key: string) => key;
  return t;
}

vi.mock("next-intl", () => ({
  useTranslations: () => makeTranslator(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/dynamic", () => ({
  default: () =>
    function DynamicStub() {
      return <div data-testid="dynamic-component" />;
    },
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
  CardSkeleton: () => <div data-testid="card-skeleton" />,
  Button: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  Modal: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) =>
    isOpen ? <div role="dialog">{children}</div> : null,
}));

vi.mock("@/shared/components/ProviderIcon", () => ({
  default: () => <span data-testid="provider-icon" />,
}));

const notifyMock = {
  success: vi.fn(),
  error: vi.fn(),
  addNotification: vi.fn(),
};

function useNotificationStoreMock() {
  return notifyMock;
}
useNotificationStoreMock.getState = () => notifyMock;

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: useNotificationStoreMock,
}));

vi.mock("@/shared/hooks/useElectron", () => ({
  useIsElectron: () => false,
  useOpenExternal: () => ({ openExternal: vi.fn() }),
}));

vi.mock("@/shared/utils/clipboard", () => ({
  copyToClipboard: vi.fn(async () => undefined),
}));

vi.mock("../../../src/app/(dashboard)/dashboard/HomeProviderTopologySection", () => ({
  HomeProviderTopologySection: ({ providers }: { providers: TopologyProvider[] }) => {
    topology.providers = providers;
    return <div data-testid="topology" />;
  },
}));

vi.mock("../../../src/app/(dashboard)/home/HomeRecentRequests", () => ({
  default: () => <div data-testid="recent-requests" />,
}));

const { default: HomePageClient } =
  await import("../../../src/app/(dashboard)/dashboard/HomePageClient");

function jsonResponse(body: unknown) {
  return {
    ok: true,
    json: async () => body,
  } as Response;
}

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

function stubApi({
  connections,
  metrics = {},
}: {
  connections: Array<Record<string, unknown>>;
  metrics?: Record<string, unknown>;
}) {
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/settings") {
        return Promise.resolve(
          jsonResponse({
            showQuickStartOnHome: false,
            showProviderTopologyOnHome: true,
            blockedProviders: [],
          })
        );
      }
      if (url === "/api/providers") return Promise.resolve(jsonResponse({ connections }));
      if (url === "/api/provider-metrics") {
        return Promise.resolve(jsonResponse({ metrics, topology: {} }));
      }
      if (url === "/api/models") return Promise.resolve(jsonResponse({ models: [] }));
      if (url === "/api/provider-nodes") return Promise.resolve(jsonResponse({ nodes: [] }));
      return Promise.resolve(jsonResponse({}));
    })
  );
}

async function renderTopologyStatuses() {
  await act(async () => {
    root.render(<HomePageClient machineId="test-machine" />);
  });
  return Object.fromEntries(topology.providers.map(({ id, status }) => [id, status]));
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;

  topology.providers = [];
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

it("marks a custom node active from its healthy connection", async () => {
  stubApi({ connections: [{ id: "c1", provider: CUSTOM_NODE, testStatus: "active" }] });

  expect(await renderTopologyStatuses()).toEqual({ [CUSTOM_NODE]: "active" });
});

it("marks a custom node error when none of its connections is healthy", async () => {
  stubApi({ connections: [{ id: "c1", provider: CUSTOM_NODE, testStatus: "error" }] });

  expect(await renderTopologyStatuses()).toEqual({ [CUSTOM_NODE]: "error" });
});

it("lets a healthy connection win over an errored sibling on a catalog provider", async () => {
  stubApi({
    connections: [
      { id: "c1", provider: "openai", testStatus: "error" },
      { id: "c2", provider: "openai", testStatus: "active" },
    ],
  });

  expect(await renderTopologyStatuses()).toEqual({ openai: "active" });
});

it("keeps an enabled no-auth provider without connections healthy", async () => {
  stubApi({ connections: [], metrics: { [NOAUTH_PROVIDER]: { totalRequests: 1 } } });

  expect(await renderTopologyStatuses()).toEqual({ [NOAUTH_PROVIDER]: "active" });
});

it("does not call a no-auth provider healthy when its only connection is disabled", async () => {
  stubApi({
    connections: [{ id: "c1", provider: NOAUTH_PROVIDER, testStatus: "active", isActive: false }],
    metrics: { [NOAUTH_PROVIDER]: { totalRequests: 1 } },
  });

  expect(await renderTopologyStatuses()).toEqual({ [NOAUTH_PROVIDER]: "idle" });
});
