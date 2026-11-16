// @vitest-environment jsdom
//
// e0274 — the Grok Build auth import takes ONE account per call (one file or one
// pasted document). Driving ImportGrokCliAuthModal end to end against a stubbed
// fetch: a pasted JSON array (or several files) must import every valid account
// through the same POST /api/oauth/grok-cli/import-token wire format, one call
// per account, and a single pasted document must keep working exactly as before.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ImportGrokCliAuthModal from "../ImportGrokCliAuthModal";
import { parseGrokAccounts } from "../parseGrokAccounts";

const notify = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.rich = (key: string) => key;
    return t;
  },
}));
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notify,
}));

const validDoc = (email: string) => ({
  "https://auth.x.ai::default": { key: "eyJtoken-" + email, email, refresh_token: "r-" + email },
});
const docWithoutRefresh = (email: string) => ({
  "https://auth.x.ai::default": { key: "eyJtoken-" + email, email },
});
const notADoc = { hello: "world" };

const cleanups: Array<() => void> = [];

function renderModal(onSuccess = vi.fn()) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(<ImportGrokCliAuthModal onClose={vi.fn()} onSuccess={onSuccess} />));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return onSuccess;
}

async function click(label: string) {
  const pool = Array.from(document.body.querySelectorAll<HTMLElement>("button, [role='radio']"));
  const match = pool.find((el) => el.textContent?.trim() === label);
  if (!match) throw new Error(`no control named ${label}`);
  await act(async () => {
    (match as HTMLButtonElement).click();
  });
}

async function typeInto(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const proto =
    el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  await act(async () => {
    setter?.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function textarea(): HTMLTextAreaElement {
  const el = document.body.querySelector("textarea");
  if (!el) throw new Error("no textarea on screen");
  return el;
}

/** Stub fetch: ok for every account whose token doc contains `failMarker`, else 200. */
function stubImportFetch(failMarker?: string) {
  const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body)) as { token: Record<string, unknown> };
    const json = JSON.stringify(body.token);
    const ok = !(failMarker && json.includes(failMarker));
    return { ok, status: ok ? 200 : 500, json: async () => ({}) };
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentTokens(fetchMock: ReturnType<typeof stubImportFetch>) {
  return fetchMock.mock.calls.map((call) => JSON.parse(String(call[1]?.body))) as Array<{
    token: unknown;
  }>;
}

describe("parseGrokAccounts", () => {
  it("splits an array into valid accounts and counts rejected entries", () => {
    const { accounts, rejected } = parseGrokAccounts([
      validDoc("a@x.ai"),
      notADoc,
      docWithoutRefresh("b@x.ai"),
    ]);
    expect(accounts.map((a) => a.email)).toEqual(["a@x.ai", "b@x.ai"]);
    expect(accounts[0].hasRefreshToken).toBe(true);
    expect(accounts[1].hasRefreshToken).toBe(false);
    expect(rejected).toBe(1);
  });

  it("keeps accepting a single document (one account, nothing rejected)", () => {
    const { accounts, rejected } = parseGrokAccounts(validDoc("solo@x.ai"));
    expect(accounts).toHaveLength(1);
    expect(accounts[0].email).toBe("solo@x.ai");
    expect(rejected).toBe(0);
  });

  it("rejects garbage: no accounts, one rejected entry", () => {
    expect(parseGrokAccounts("nope")).toEqual({ accounts: [], rejected: 1 });
    expect(parseGrokAccounts([notADoc, notADoc]).rejected).toBe(2);
  });
});

describe("ImportGrokCliAuthModal bulk import", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    Object.values(notify).forEach((fn) => fn.mockClear());
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("pastes an array and imports every valid account, one POST each", async () => {
    const onSuccess = renderModal();
    const fetchMock = stubImportFetch();
    await click("grokPasteJson");
    await typeInto(textarea(), JSON.stringify([validDoc("a@x.ai"), notADoc, validDoc("b@x.ai")]));

    expect(document.body.textContent).toContain("grokBulkDetected");
    expect(document.body.textContent).toContain("grokBulkRejected");

    await click("grokSaveConnection");
    const sent = sentTokens(fetchMock);
    expect(fetchMock.mock.calls.length).toBe(2);
    expect(sent[0].token).toEqual(validDoc("a@x.ai"));
    expect(sent[1].token).toEqual(validDoc("b@x.ai"));
    expect(notify.success).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  it("keeps importing the rest when one account fails", async () => {
    renderModal();
    const fetchMock = stubImportFetch("b@x.ai");
    await click("grokPasteJson");
    await typeInto(textarea(), JSON.stringify([validDoc("a@x.ai"), validDoc("b@x.ai")]));
    await click("grokSaveConnection");

    expect(fetchMock.mock.calls.length).toBe(2);
    expect(notify.success).toHaveBeenCalledTimes(1);
  });

  it("single pasted document still imports exactly one account", async () => {
    const onSuccess = renderModal();
    const fetchMock = stubImportFetch();
    await click("grokPasteJson");
    await typeInto(textarea(), JSON.stringify(validDoc("solo@x.ai")));
    await click("grokSaveConnection");

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(sentTokens(fetchMock)[0].token).toEqual(validDoc("solo@x.ai"));
    expect(notify.success).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  it("shows the parse error for a document with no valid token", async () => {
    renderModal();
    stubImportFetch();
    await click("grokPasteJson");
    await typeInto(textarea(), JSON.stringify(notADoc));
    expect(document.body.textContent).toContain("grokInvalidAuth");
  });
});
