// @vitest-environment jsdom
//
// Drives ImportAgyAuthModal end to end against a stubbed fetch: the Bulk tab must speak
// the wire format of POST /api/providers/agy-auth/import-bulk (importAgyAuthBulkSchema
// reads entries[].json, the handler answers with `success`), and the single tab must not
// send an email it inferred from a token the user has since replaced.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { importAgyAuthBulkSchema } from "@/shared/validation/schemas";
import { ImportAgyAuthModal } from "../ImportAgyAuthModal";

const notify = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notify,
}));

const TOKEN_A = { access_token: "access-a", refresh_token: "refresh-a" };
const TOKEN_B = { access_token: "access-b", refresh_token: "refresh-b" };

const cleanups: Array<() => void> = [];

function renderModal(onSuccess = vi.fn()) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(<ImportAgyAuthModal onClose={vi.fn()} onSuccess={onSuccess} />));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return onSuccess;
}

function buttonNamed(label: string): HTMLButtonElement {
  const pool = Array.from(document.body.querySelectorAll<HTMLElement>("button, [role='radio']"));
  const match = pool.find((el) => el.textContent?.trim() === label);
  if (!match) throw new Error(`no control named ${label}`);
  return match as HTMLButtonElement;
}

async function click(label: string) {
  await act(async () => {
    buttonNamed(label).click();
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

function emailInput(): HTMLInputElement {
  const el = document.body.querySelector<HTMLInputElement>('input[type="email"]');
  if (!el) throw new Error("no email input on screen");
  return el;
}

function stubFetch(body: Record<string, unknown>) {
  const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => ({
    ok: true,
    json: async () => body,
  }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentBody(fetchMock: ReturnType<typeof stubFetch>) {
  const init = fetchMock.mock.calls[0]?.[1];
  return JSON.parse(String(init?.body));
}

describe("ImportAgyAuthModal", () => {
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

  async function openBulkPaste(entries: unknown[]) {
    await click("agyImportTabBulk");
    await click("agyImportPasteJsonArray");
    await typeInto(textarea(), JSON.stringify(entries));
  }

  it("posts bulk entries in the shape the import-bulk schema keeps", async () => {
    const fetchMock = stubFetch({ success: 2, failed: 0, total: 2, created: [], errors: [] });
    const onSuccess = renderModal();
    await openBulkPaste([
      { token: TOKEN_A, id_token_email: "a@example.com" },
      { token: TOKEN_B, id_token_email: "b@example.com" },
    ]);
    await click("agyImportSubmitBulk");

    expect(fetchMock.mock.calls[0]?.[0]).toBe("/api/providers/agy-auth/import-bulk");
    const parsed = importAgyAuthBulkSchema.parse(sentBody(fetchMock));
    expect(parsed.entries.map((entry) => entry.json)).toEqual([
      { token: TOKEN_A, id_token_email: "a@example.com" },
      { token: TOKEN_B, id_token_email: "b@example.com" },
    ]);
    expect(notify.success).toHaveBeenCalledWith("agyImportBulkSuccess");
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("keeps the modal open and reports a failure when no bulk entry was imported", async () => {
    stubFetch({
      success: 0,
      failed: 1,
      total: 1,
      created: [],
      errors: [{ index: 0, name: "a@example.com", message: "refresh rejected" }],
    });
    const onSuccess = renderModal();
    await openBulkPaste([{ token: TOKEN_A, id_token_email: "a@example.com" }]);
    await click("agyImportSubmitBulk");

    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.error).toHaveBeenCalledWith("agyImportBulkFailed");
    expect(onSuccess).not.toHaveBeenCalled();
    expect(document.body.textContent).toContain("refresh rejected");
  });

  it("warns instead of reporting plain success when only part of the bulk imported", async () => {
    stubFetch({
      success: 1,
      failed: 1,
      total: 2,
      created: [],
      errors: [{ index: 1, name: "b@example.com", message: "refresh rejected" }],
    });
    const onSuccess = renderModal();
    await openBulkPaste([{ token: TOKEN_A }, { token: TOKEN_B }]);
    await click("agyImportSubmitBulk");

    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.warning).toHaveBeenCalledWith("agyImportResultsSummary");
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("marks a shape-invalid bulk entry as invalid and leaves it out of the request", async () => {
    const fetchMock = stubFetch({ success: 1, failed: 0, total: 1, created: [], errors: [] });
    renderModal();
    await openBulkPaste([{ token: TOKEN_A }, { token: { access_token: "only-access" } }]);

    expect(document.body.textContent).toContain("agyImportInvalidToken");
    await click("agyImportSubmitBulk");

    const { entries } = sentBody(fetchMock);
    expect(entries).toHaveLength(1);
    expect(entries[0].json).toEqual({ token: TOKEN_A });
  });

  it("replaces the inferred email when another token is previewed", async () => {
    const fetchMock = stubFetch({ connection: {}, created: true });
    renderModal();
    await click("agyImportTabSingle");
    await click("agyImportPasteJson");
    await typeInto(textarea(), JSON.stringify({ token: TOKEN_A, id_token_email: "a@example.com" }));
    expect(emailInput().value).toBe("a@example.com");

    await typeInto(textarea(), JSON.stringify({ token: TOKEN_B, id_token_email: "b@example.com" }));
    expect(emailInput().value).toBe("b@example.com");

    await click("agyImportSubmitSingle");
    expect(sentBody(fetchMock).email).toBe("b@example.com");
  });

  it("does not send a previous token's email for a token that carries none", async () => {
    const fetchMock = stubFetch({ connection: {}, created: true });
    renderModal();
    await click("agyImportTabSingle");
    await click("agyImportPasteJson");
    await typeInto(textarea(), JSON.stringify({ token: TOKEN_A, id_token_email: "a@example.com" }));
    await typeInto(textarea(), JSON.stringify({ token: TOKEN_B }));
    await click("agyImportSubmitSingle");

    expect(sentBody(fetchMock).email).toBeUndefined();
  });

  it("keeps an email the user typed when the previewed token changes", async () => {
    const fetchMock = stubFetch({ connection: {}, created: true });
    renderModal();
    await click("agyImportTabSingle");
    await click("agyImportPasteJson");
    await typeInto(textarea(), JSON.stringify({ token: TOKEN_A, id_token_email: "a@example.com" }));
    await typeInto(emailInput(), "typed@example.com");
    await typeInto(textarea(), JSON.stringify({ token: TOKEN_B, id_token_email: "b@example.com" }));
    await click("agyImportSubmitSingle");

    expect(sentBody(fetchMock).email).toBe("typed@example.com");
  });
});
