// @vitest-environment jsdom
//
// #19620: the password-less onboarding states had no logo. Each screen of the login page now shows
// exactly one, and the password form keeps its own place inside the card.
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import messages from "../../../src/i18n/messages/en.json";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

const { default: LoginPage } = await import("../../../src/app/login/page");

const LOGO_NAME = "Keak OmniRoute";

function installFetch(state: { hasPassword: boolean; setupComplete: boolean }) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        requireLogin: true,
        authenticated: false,
        oidcEnabled: false,
        oidcDisablePasswordLogin: false,
        ...state,
      }),
    }))
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("login page logo", () => {
  it("shows one logo above the welcome copy before onboarding", async () => {
    installFetch({ hasPassword: false, setupComplete: false });
    render(<LoginPage />);

    const heading = await screen.findByRole("heading", { name: messages.auth.welcome });
    const logos = screen.getAllByRole("img", { name: LOGO_NAME });
    expect(logos).toHaveLength(1);
    expect(logos[0].compareDocumentPosition(heading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("shows one logo above the copy when setup finished without a password", async () => {
    installFetch({ hasPassword: false, setupComplete: true });
    render(<LoginPage />);

    const heading = await screen.findByRole("heading", { name: messages.auth.secureYourInstance });
    const logos = screen.getAllByRole("img", { name: LOGO_NAME });
    expect(logos).toHaveLength(1);
    expect(logos[0].compareDocumentPosition(heading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("keeps a single logo on the password form", async () => {
    installFetch({ hasPassword: true, setupComplete: true });
    render(<LoginPage />);

    await screen.findByRole("heading", { name: messages.auth.signIn });
    expect(screen.getAllByRole("img", { name: LOGO_NAME })).toHaveLength(1);
  });
});
