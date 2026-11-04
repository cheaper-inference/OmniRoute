// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi, beforeAll } from "vitest";

// The kit Table (KEA-7886) mounts a persistent horizontal scrollbar that measures the table
// with ResizeObserver, which jsdom does not implement.
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

vi.mock("next-intl", () => ({
  // The family label is a single parameterized key ("IPv{version}"): the mock
  // renders the key and its argument so the assertion can pin both.
  useTranslations: () => (key: string, args?: Record<string, unknown>) =>
    args ? key + Object.values(args).join("") : key,
}));

const TRAFFIC = {
  id: "log-traffic",
  timestamp: new Date().toISOString(),
  status: "success",
  proxy: { type: "http", host: "127.0.0.1", port: 8080, name: "reg-test" },
  tlsFingerprint: false,
  level: "provider",
  provider: "openai",
  targetUrl: "openai/gpt-5",
  latencyMs: 42,
  clientIp: "10.9.9.9",
  upstreamStatus: 200,
  headersMs: 1234,
  firstChunkMs: 5678,
  egressIp: "203.0.113.9",
  correlationId: "corr-abcdef-123456",
  account: "conn-traff",
  rotationAccount: "rot-acc-01",
  error: null,
};

const NULL_STATUS = {
  ...TRAFFIC,
  id: "log-null",
  targetUrl: "openai/gpt-5-null",
  upstreamStatus: null,
  headersMs: null,
  firstChunkMs: null,
  egressIp: null,
  correlationId: null,
  rotationAccount: null,
  account: null,
};

const LEVEL_TEST = {
  ...TRAFFIC,
  id: "log-level-test",
  level: "provider-test",
  targetUrl: "openai/connection-test",
  correlationId: null,
};

const SUFFIX_TEST = {
  ...TRAFFIC,
  id: "log-suffix-test",
  level: "provider",
  targetUrl: "openai/connection-test",
  correlationId: null,
};

const ROWS = [TRAFFIC, NULL_STATUS, LEVEL_TEST, SUFFIX_TEST];

function mockFetch() {
  const fetchMock = vi.fn(async (url: string) => {
    if (String(url).includes("/api/provider-nodes")) {
      return { ok: true, json: async () => ({ nodes: [] }) } as Response;
    }
    return { ok: true, json: async () => ROWS } as Response;
  });
  vi.stubGlobal("fetch", fetchMock);
}

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  return container;
}

async function renderLogger(container: HTMLElement) {
  const { default: ProxyLogger } = await import("@/shared/components/ProxyLogger");
  const root = createRoot(container);
  await act(async () => {
    root.render(<ProxyLogger />);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return root;
}

function clickButton(container: HTMLElement, key: string) {
  const buttons = Array.from(container.querySelectorAll("button"));
  const target = buttons.find((b) => b.textContent === key);
  expect(target, `button ${key}`).toBeDefined();
  return act(async () => {
    target!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

describe("ProxyLogger observed fields", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    window.localStorage.clear();
    mockFetch();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("renders the four observed fields and never renders null as 0", async () => {
    const container = makeContainer();
    await renderLogger(container);
    const html = container.innerHTML;
    expect(html).toContain("200");
    expect(html).not.toContain(">0<");
    expect(html).toContain("***");
    expect(html).not.toContain("203.0.113.9");
    expect(html).toContain("corr-abcdef");
    const link = container.querySelector('a[href*="/dashboard/logs?correlationId="]');
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).not.toContain("?id=");
    expect(link!.getAttribute("href")).toContain(
      `correlationId=${encodeURIComponent("corr-abcdef-123456")}`
    );
    expect(html).not.toContain("conn-traff");
    container.remove();
  }, 15000);

  it("shows when the headers and the first chunk arrived for the attempt", async () => {
    const { default: ProxyLogDetail } = await import("@/shared/components/ProxyLogDetail");
    const render = async (log: Record<string, unknown>) => {
      const container = makeContainer();
      const root = createRoot(container);
      await act(async () => {
        root.render(<ProxyLogDetail log={log} onClose={() => {}} />);
      });
      // The detail is a kit Dialog (Modal adapter): its content is portaled to document.body.
      const text = document.body.textContent ?? "";
      await act(async () => root.unmount());
      container.remove();
      return text;
    };
    const timed = await render(TRAFFIC);
    expect(timed).toContain("headersAfter1.2s");
    expect(timed).toContain("firstChunkAfter5.7s");
    const unknown = await render(NULL_STATUS);
    expect(unknown).toContain("headersAfter—");
    expect(unknown).toContain("firstChunkAfter—");
  }, 15000);

  it("partitions connection tests by level or targetUrl suffix", async () => {
    const container = makeContainer();
    await renderLogger(container);
    await clickButton(container, "filterTests");
    let rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(2);
    await clickButton(container, "filterTraffic");
    rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(2);
    container.remove();
  }, 15000);

  it("labels the family of the egress address and shows the other observed address", async () => {
    const { default: ProxyLogDetail } = await import("@/shared/components/ProxyLogDetail");
    const renderEgressField = async (log: Record<string, unknown>) => {
      const container = makeContainer();
      const root = createRoot(container);
      await act(async () => {
        root.render(<ProxyLogDetail log={log} onClose={() => {}} />);
      });
      // The detail is a kit Dialog (Modal adapter): its content is portaled to document.body.
      const label = Array.from(document.body.querySelectorAll("div")).find(
        (element) => element.textContent === "egressIp" && element.className.includes("uppercase")
      );
      expect(label, "the egress field label").toBeDefined();
      const value = label!.nextElementSibling as HTMLElement | null;
      const text = value?.textContent ?? "";
      await act(async () => root.unmount());
      container.remove();
      return text;
    };

    // Both families observed: the reported address with its family, the other
    // observed address below it — both masked.
    const both = await renderEgressField({
      ...TRAFFIC,
      egressIp: "2001:db8::1",
      egressIpv4: "203.0.113.7",
      egressIpv6: "2001:db8::1",
    });
    expect(both).toContain("20***:1");
    expect(both).toContain("egressIpFamily6");
    expect(both).toContain("20***.7");
    expect(both).toContain("egressIpFamily4");
    expect(both).not.toContain("2001:db8::1");
    expect(both).not.toContain("203.0.113.7");

    // No reported address but one observed family: that address alone, with
    // its family, and no dash line.
    const familyOnly = await renderEgressField({
      ...TRAFFIC,
      egressIp: null,
      egressIpv4: "203.0.113.7",
      egressIpv6: null,
    });
    expect(familyOnly).toContain("20***.7");
    expect(familyOnly).toContain("egressIpFamily4");
    expect(familyOnly).not.toContain("—");

    // No address known: the dash alone, without a family.
    const none = await renderEgressField({
      ...TRAFFIC,
      egressIp: null,
      egressIpv4: null,
      egressIpv6: null,
    });
    expect(none).toBe("—");
  }, 15000);
});
