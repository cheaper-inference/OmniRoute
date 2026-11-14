import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { parseQuotaData } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";
import {
  RESET_CREDIT_LIST_INTERVAL_MS,
  useQuotaWindowAlerts,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useQuotaWindowAlerts";
import { useNotificationStore } from "@/store/notificationStore";

vi.mock("next-intl", () => {
  const translate = (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${JSON.stringify(values)}` : key;
  return { useTranslations: () => translate };
});

const LATCH_URL = "/api/settings/quota-alert-latch";
const CREDITS_URL = "/api/usage/codex-reset-credit?connectionId=conn-1";
const connections = [{ id: "conn-1", provider: "codex", name: "Work account" }];

/** `usedPercent` as upstream reports it: 90 used means the alert sees 10% left. */
function codexSnapshot(usedPercent: number, bankedResetCredits = 0) {
  return {
    "conn-1": {
      quotas: parseQuotaData("codex", {
        quotas: {
          session: {
            used: usedPercent,
            total: 100,
            remaining: 100 - usedPercent,
            resetAt: new Date(Date.now() + 3_600_000).toISOString(),
            unlimited: false,
          },
        },
        bankedResetCredits,
      }),
    },
  };
}

function stubServer(opts: {
  enabled?: boolean;
  latch?: Record<string, number>;
  credits?: unknown[];
}) {
  const requests: string[] = [];
  const puts: Array<Record<string, number>> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init?: RequestInit) => {
      const url = String(input);
      requests.push(`${init?.method ?? "GET"} ${url}`);
      if (url === "/api/settings") {
        return Response.json({ codexQuotaAlerts: { enabled: opts.enabled === true } });
      }
      if (url === LATCH_URL && init?.method === "PUT") {
        puts.push(JSON.parse(String(init.body)).latch);
        return Response.json({ latch: {} });
      }
      if (url === LATCH_URL) return Response.json({ latch: opts.latch ?? {} });
      if (url === CREDITS_URL) return Response.json({ credits: opts.credits ?? [] });
      return new Response("unexpected", { status: 500 });
    })
  );
  return { requests, puts };
}

function toasts() {
  return useNotificationStore
    .getState()
    .notifications.map((n) => ({ type: n.type, message: n.message, title: n.title }));
}

/** Settles the sequential settings -> latch -> credits reads. */
async function flush() {
  for (let i = 0; i < 10; i += 1) {
    await act(async () => {
      await Promise.resolve();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
}

function mount(snapshot: ReturnType<typeof codexSnapshot>) {
  return renderHook(
    ({ quotaSnapshot }) =>
      useQuotaWindowAlerts({ quotaSnapshot, connections, emailsVisible: true }),
    { initialProps: { quotaSnapshot: snapshot } }
  );
}

beforeEach(() => {
  useNotificationStore.setState({ notifications: [] });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

it("off by default: reads the setting only, no latch, no list, no toast, no write", async () => {
  const server = stubServer({ enabled: false, credits: [] });

  mount(codexSnapshot(95, 2));
  await flush();

  expect(server.requests).toEqual(["GET /api/settings"]);
  expect(toasts()).toEqual([]);
});

it("toasts a low Codex window once, names the account, and persists the latch", async () => {
  const server = stubServer({ enabled: true });

  const { rerender } = mount(codexSnapshot(90));
  await flush();
  rerender({ quotaSnapshot: codexSnapshot(90) });
  await flush();

  expect(toasts()).toEqual([
    {
      type: "error",
      message: 'quotaAlertWindowLow:{"window":"Session","remaining":10}',
      title: "quotaAlertTitle · Work account",
    },
  ]);
  expect(server.puts).toEqual([{ "conn-1:session": 10 }]);
});

it("persists the recovery too, and a later drop alerts again", async () => {
  const server = stubServer({ enabled: true });

  const page = mount(codexSnapshot(90));
  await flush();
  page.rerender({ quotaSnapshot: codexSnapshot(5) });
  await flush();
  page.rerender({ quotaSnapshot: codexSnapshot(90) });
  await flush();

  expect(server.puts).toEqual([{ "conn-1:session": 10 }, {}, { "conn-1:session": 10 }]);
  expect(toasts()).toHaveLength(2);
});

it("a reload after recovery alerts on the next drop", async () => {
  // First page: alert, then recovery. The last PUT is what the second page reads back.
  const server = stubServer({ enabled: true });
  const first = mount(codexSnapshot(90));
  await flush();
  first.rerender({ quotaSnapshot: codexSnapshot(5) });
  await flush();
  first.unmount();
  expect(server.puts.at(-1)).toEqual({});

  useNotificationStore.setState({ notifications: [] });
  stubServer({ enabled: true, latch: server.puts.at(-1) });
  mount(codexSnapshot(90));
  await flush();

  expect(toasts()).toHaveLength(1);
});

it("a reload without recovery stays quiet", async () => {
  const server = stubServer({ enabled: true, latch: { "conn-1:session": 10 } });

  mount(codexSnapshot(90)); // still at 10% left, exactly where the latch left it
  await flush();

  expect(toasts()).toEqual([]);
  expect(server.puts).toEqual([]);
});

it("lists banked credits on its own and toasts one expiring within the horizon", async () => {
  const server = stubServer({
    enabled: true,
    credits: [
      {
        selectionToken: "token-1",
        expiresAt: new Date(Date.now() + 6 * 3_600_000).toISOString(),
      },
      {
        selectionToken: "token-far",
        expiresAt: new Date(Date.now() + 240 * 3_600_000).toISOString(),
      },
    ],
  });

  mount(codexSnapshot(10, 2));
  await flush();

  expect(server.requests).toContain(`GET ${CREDITS_URL}`);
  expect(toasts()).toEqual([
    {
      type: "warning",
      message: "quotaAlertCreditExpiring",
      title: "quotaAlertTitle · Work account",
    },
  ]);
  expect(Object.keys(server.puts.at(-1) ?? {})).toEqual(["conn-1:credit:token-1"]);
});

it("does not list credits for an account without banked credits", async () => {
  const server = stubServer({ enabled: true });

  mount(codexSnapshot(10, 0));
  await flush();

  expect(server.requests).not.toContain(`GET ${CREDITS_URL}`);
});

it("lists at most once per interval, and new snapshots do not list again", async () => {
  vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "Date"] });
  const server = stubServer({ enabled: true, credits: [] });
  const listCalls = () => server.requests.filter((r) => r === `GET ${CREDITS_URL}`).length;

  const { rerender } = mount(codexSnapshot(10, 2));
  await flush();
  expect(listCalls()).toBe(1);

  rerender({ quotaSnapshot: codexSnapshot(11, 2) });
  await act(async () => {
    vi.advanceTimersByTime(RESET_CREDIT_LIST_INTERVAL_MS - 1000);
  });
  await flush();
  expect(listCalls()).toBe(1);

  await act(async () => {
    vi.advanceTimersByTime(5 * 60 * 1000);
  });
  await flush();
  expect(listCalls()).toBe(2);
});

it("retries a failed latch read instead of muting the alerts for the session", async () => {
  let latchReads = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string) => {
      const url = String(input);
      if (url === "/api/settings") return Response.json({ codexQuotaAlerts: { enabled: true } });
      if (url === LATCH_URL) {
        latchReads += 1;
        // First read fails, later ones succeed: the opt-in must survive one blip.
        return latchReads === 1 ? new Response("down", { status: 500 }) : Response.json({ latch: {} });
      }
      return Response.json({ credits: [] });
    })
  );

  mount(codexSnapshot(90));
  await flush();

  expect(latchReads).toBeGreaterThan(1);
  expect(toasts()).toHaveLength(1);
});

it("stays silent when the opt-in itself cannot be confirmed", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response("down", { status: 500 }))
  );

  mount(codexSnapshot(90));
  await flush();

  // Without a confirmed opt-in nothing is read, toasted or written.
  expect(toasts()).toEqual([]);
});
