// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import GrokBotAuthModal from "@/shared/components/GrokBotAuthModal";
import messages from "@/i18n/messages/en.json";

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(window, "open").mockImplementation(() => null);
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
const json = (body: unknown) => Response.json(body);
function modal() {
  const onSuccess = vi.fn();
  const onClose = vi.fn();
  const view = render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <GrokBotAuthModal isOpen onSuccess={onSuccess} onClose={onClose} />
    </NextIntlClientProvider>
  );
  return { ...view, onSuccess, onClose };
}
async function click(name: string) {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name }));
  });
}
async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

it("polls pending grants with backoff and completes once using the real modal controls", async () => {
  let polls = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) =>
      url.endsWith("/start")
        ? json({ loginUrl: "https://example.test/sign-in", sessionId: "fixture-session" })
        : json(++polls === 1 ? { status: "pending" } : { status: "ok" })
    )
  );
  const { onSuccess, onClose } = modal();
  await click("Sign in");
  expect(window.open).toHaveBeenCalledWith(
    "https://example.test/sign-in",
    "_blank",
    "noopener,noreferrer"
  );
  await advance(1000);
  expect(polls).toBe(1);
  expect(onSuccess).not.toHaveBeenCalled();
  await advance(1200);
  expect(polls).toBe(2);
  expect(onSuccess).toHaveBeenCalledOnce();
  expect(onClose).toHaveBeenCalledOnce();
});

it("ignores an in-flight successful poll after cancellation", async () => {
  let finish!: (response: Response) => void;
  const pending = new Promise<Response>((resolve) => {
    finish = resolve;
  });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url.endsWith("/start"))
        return json({ loginUrl: "https://example.test/sign-in", sessionId: "fixture-session" });
      if (url.endsWith("/poll")) return pending;
      return json({ success: true });
    })
  );
  const { onSuccess, onClose } = modal();
  await click("Sign in");
  await advance(1000);
  await click("Cancel");
  await act(async () => {
    finish(json({ status: "ok" }));
  });
  expect(onSuccess).not.toHaveBeenCalled();
  expect(onClose).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "Sign in" })).toBeTruthy();
});

it("keeps a restarted attempt active when the previous poll and cancel finish late", async () => {
  let finishPoll!: (response: Response) => void;
  let finishCancel!: (response: Response) => void;
  const pendingPoll = new Promise<Response>((resolve) => {
    finishPoll = resolve;
  });
  const pendingCancel = new Promise<Response>((resolve) => {
    finishCancel = resolve;
  });
  let starts = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (url.endsWith("/start"))
        return json({ loginUrl: "https://example.test/sign-in", sessionId: `session-${++starts}` });
      if (url.endsWith("/cancel")) return pendingCancel;
      const body = JSON.parse(String(init?.body));
      return body.sessionId === "session-1" ? pendingPoll : json({ status: "ok" });
    })
  );
  const { onSuccess, onClose } = modal();
  await click("Sign in");
  await advance(1000);
  await click("Cancel");
  // Cancellation ends local polling without waiting for the server's acknowledgement.
  await click("Sign in");
  await act(async () => {
    finishPoll(json({ status: "ok" }));
    finishCancel(json({ success: true }));
  });
  expect(onSuccess).not.toHaveBeenCalled();
  expect(onClose).not.toHaveBeenCalled();
  expect(
    (screen.getByRole("button", { name: "Waiting for sign-in" }) as HTMLButtonElement).disabled
  ).toBe(true);
  await advance(1000);
  expect(onSuccess).toHaveBeenCalledOnce();
  expect(onClose).toHaveBeenCalledOnce();
});

it("aborts the active poll and ignores its late completion on unmount", async () => {
  let finish!: (response: Response) => void;
  const pending = new Promise<Response>((resolve) => {
    finish = resolve;
  });
  let signal: AbortSignal | undefined;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (url.endsWith("/start"))
        return json({ loginUrl: "https://example.test/sign-in", sessionId: "fixture-session" });
      signal = init?.signal ?? undefined;
      return pending;
    })
  );
  const { unmount, onSuccess, onClose } = modal();
  await click("Sign in");
  await advance(1000);
  unmount();
  expect(signal?.aborted).toBe(true);
  await act(async () => {
    finish(json({ status: "ok" }));
  });
  expect(onSuccess).not.toHaveBeenCalled();
  expect(onClose).not.toHaveBeenCalled();
});

it("does not open a browser or poll a start response that arrives after unmount", async () => {
  let finish!: (response: Response) => void;
  const pending = new Promise<Response>((resolve) => {
    finish = resolve;
  });
  const fetchMock = vi.fn(async (url: string) =>
    url.endsWith("/start") ? pending : json({ success: true })
  );
  vi.stubGlobal("fetch", fetchMock);
  const { unmount, onSuccess, onClose } = modal();
  await click("Sign in");
  unmount();
  await act(async () => {
    finish(json({ loginUrl: "https://example.test/sign-in", sessionId: "late-session" }));
  });
  expect(window.open).not.toHaveBeenCalled();
  expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
    "/api/oauth/grok-bot/login/start",
    "/api/oauth/grok-bot/login/cancel",
  ]);
  await advance(10000);
  expect(onSuccess).not.toHaveBeenCalled();
  expect(onClose).not.toHaveBeenCalled();
});

it("cancels the old backoff before an immediate restart so only the new grant is polled", async () => {
  let starts = 0;
  const polled: string[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (url.endsWith("/start"))
        return json({ loginUrl: "https://example.test/sign-in", sessionId: `session-${++starts}` });
      if (url.endsWith("/poll")) polled.push(JSON.parse(String(init?.body)).sessionId);
      return json({ status: "ok" });
    })
  );
  const { onSuccess } = modal();
  await click("Sign in");
  await click("Cancel");
  await click("Sign in");
  await advance(1000);
  expect(polled).toEqual(["session-2"]);
  expect(onSuccess).toHaveBeenCalledOnce();
});
