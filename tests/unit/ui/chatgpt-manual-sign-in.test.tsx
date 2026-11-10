// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import ChatGptOAuthModal from "@/shared/components/ChatGptOAuthModal";

vi.mock("next-intl", async () => {
  const { createTranslator } = await import("use-intl/core");
  const { default: messages } = await import("@/i18n/messages/en.json");
  const translators = {
    chatgptSignIn: createTranslator({ locale: "en", messages, namespace: "chatgptSignIn" }),
    providers: createTranslator({ locale: "en", messages, namespace: "providers" }),
  };
  return { useTranslations: (namespace: keyof typeof translators) => translators[namespace] };
});

vi.mock("@/shared/components/Modal", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
beforeEach(() => {
  const values = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    clear: () => values.clear(),
  });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
const callback =
  "http://127.0.0.1:1455/auth/callback?code=one-time-code&state=test-state&client_id=oaiapp_test";
// The dialog starts its server attempt from a timer; a busy runner needs longer than the 1 s default.
const ATTEMPT_READY = { timeout: 10_000 };

it("offers manual paste without helper controls and completes the current attempt", async () => {
  const calls: Record<string, unknown>[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url, init) => {
      const body = JSON.parse(init.body);
      calls.push(body);
      return Response.json(
        body.action === "start"
          ? { state: "test-state", authUrl: "https://auth.openai.com/fixture" }
          : { success: true, planAuthorized: true, warning: "Catalog retry needed" }
      );
    })
  );
  const success = vi.fn();
  render(<ChatGptOAuthModal isOpen onClose={vi.fn()} onSuccess={success} />);
  expect(
    await screen.findByRole("link", { name: "Sign in with ChatGPT" }, ATTEMPT_READY)
  ).toHaveAttribute("href", "https://auth.openai.com/fixture");
  expect(screen.queryByRole("combobox")).toBeNull();
  expect(screen.queryByText("Download sign-in helper")).toBeNull();
  const field = screen.getByRole("textbox", { name: "Callback URL" });
  fireEvent.change(field, { target: { value: callback.replace("test-state", "wrong-state") } });
  fireEvent.click(screen.getByRole("button", { name: "Complete sign-in" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("this sign-in attempt");
  expect(calls).toHaveLength(1);
  fireEvent.change(field, { target: { value: callback } });
  fireEvent.click(screen.getByRole("button", { name: "Complete sign-in" }));
  expect(await screen.findByRole("status")).toHaveTextContent("ChatGPT is connected");
  expect(calls[1]).toEqual({ action: "complete-url", state: "test-state", callbackUrl: callback });
  expect(screen.queryByRole("textbox")).toBeNull();
  expect(screen.getByText("Catalog retry needed")).toBeDefined();
  expect(screen.getByText("You're using your ChatGPT plan")).toBeDefined();
  fireEvent.click(screen.getByRole("button", { name: "Got it" }));
  expect(success).toHaveBeenCalledOnce();
  expect(window.localStorage.getItem("omniroute.chatgpt.plan-welcome.v1")).toBe("acknowledged");
});

it("uses Continue for reauthentication and never repeats the welcome", async () => {
  window.localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url, init) =>
      Response.json(
        JSON.parse(init.body).action === "start"
          ? { state: "test-state", authUrl: "https://auth.openai.com/fixture" }
          : { success: true }
      )
    )
  );
  render(
    <ChatGptOAuthModal
      isOpen
      onClose={vi.fn()}
      onSuccess={vi.fn()}
      reauthConnection={{ id: "fixture" }}
    />
  );
  await screen.findByRole("link", { name: "Continue with ChatGPT" }, ATTEMPT_READY);
  fireEvent.change(screen.getByRole("textbox", { name: "Callback URL" }), {
    target: { value: callback },
  });
  fireEvent.click(screen.getByRole("button", { name: "Complete sign-in" }));
  await screen.findByRole("button", { name: "Done" });
  expect(screen.queryByText("You're using your ChatGPT plan")).toBeNull();
});

it("does not announce plan use when authorization was declined", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url, init) =>
      Response.json(
        JSON.parse(init.body).action === "start"
          ? { state: "test-state", authUrl: "https://auth.openai.com/fixture" }
          : { success: true, planAuthorized: false, warning: "Signed in without plan usage." }
      )
    )
  );
  render(<ChatGptOAuthModal isOpen onClose={vi.fn()} onSuccess={vi.fn()} />);
  await screen.findByRole("link", {}, ATTEMPT_READY);
  fireEvent.change(screen.getByRole("textbox", { name: "Callback URL" }), {
    target: { value: callback },
  });
  fireEvent.click(screen.getByRole("button", { name: "Complete sign-in" }));
  await screen.findByRole("button", { name: "Done" });
  expect(screen.queryByText("You're using your ChatGPT plan")).toBeNull();
  expect(screen.getByText("Signed in without plan usage.")).toBeInTheDocument();
  expect(window.localStorage.getItem("omniroute.chatgpt.plan-welcome.v1")).toBeNull();
});

it("cancels a pending attempt on close", async () => {
  const fetcher = vi.fn(async (_url, init) =>
    Response.json(
      JSON.parse(init.body).action === "start"
        ? { state: "test-state", authUrl: "https://auth.openai.com/fixture" }
        : { phase: "expired" }
    )
  );
  vi.stubGlobal("fetch", fetcher);
  const view = render(<ChatGptOAuthModal isOpen onClose={vi.fn()} onSuccess={vi.fn()} />);
  await screen.findByRole("link", {}, ATTEMPT_READY);
  view.unmount();
  await waitFor(() =>
    expect(fetcher).toHaveBeenLastCalledWith(
      "/api/oauth/chatgpt/session",
      expect.objectContaining({ body: JSON.stringify({ action: "cancel", state: "test-state" }) })
    )
  );
});
