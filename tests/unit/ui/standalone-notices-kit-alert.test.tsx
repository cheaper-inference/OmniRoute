// @vitest-environment jsdom
import React from "react";
import { act, cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Alert } from "@omniroute/ui-kit/alert";
import LoginPage from "@/app/login/page";
import StatusPage from "@/app/status/page";
import { KIT_ALERT_DISMISS } from "./helpers/kitAlert";

// next-intl echoes the key, so visible text is the translation key. One translator keeps a
// stable identity, as the real hook does: /status reloads whenever its translator changes.
vi.mock("next-intl", () => {
  const translate = (key: string) => key;
  return {
    useTranslations: () => translate,
    useLocale: () => "en",
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

function stubFetch(answer: () => Promise<Response>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => answer())
  );
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function settle() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

// data-layout and data-persistence are set only by the kit Alert, never by the old hand-built div.
function expectKitCriticalNotice(notice: HTMLElement) {
  expect(notice.getAttribute("data-slot")).toBe("alert");
  expect(notice.getAttribute("data-variant")).toBe("critical");
  expect(notice.getAttribute("data-persistence")).toBe("persistent");
  expect(notice.getAttribute("data-layout")).toBe("stacked");
  expect(notice.classList.contains("ci-alert--critical")).toBe(true);
  expect(notice.querySelector(".ci-alert__icon svg")).not.toBeNull();
  expect(notice.querySelector(KIT_ALERT_DISMISS)).toBeNull();
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("KIT_ALERT_DISMISS", () => {
  it("matches the dismiss control of a default kit Alert, so a null result means something", () => {
    const { container } = render(<Alert description="Notice" />);
    expect(container.querySelector(KIT_ALERT_DISMISS)).not.toBeNull();
  });

  it("finds nothing once the kit Alert is dismissible={false}", () => {
    const { container } = render(<Alert description="Notice" dismissible={false} />);
    expect(container.querySelector(KIT_ALERT_DISMISS)).toBeNull();
  });
});

describe("/login Node incompatibility notice", () => {
  it("is a kit critical Alert with its full text and no dismiss control", async () => {
    stubFetch(async () =>
      json({
        requireLogin: true,
        authenticated: false,
        nodeVersion: "v20.0.0",
        nodeCompatible: false,
        hasPassword: true,
        setupComplete: true,
        oidcEnabled: false,
        oidcDisablePasswordLogin: false,
      })
    );

    render(<LoginPage />);
    await settle();

    const notice = screen.getByRole("alert");
    expectKitCriticalNotice(notice);
    expect(within(notice).getByText("nodeIncompatibleTitle")).toBeTruthy();
    expect(within(notice).getByText("nodeIncompatibleDesc")).toBeTruthy();
    expect(within(notice).getByText("nodeIncompatibleFixLabel")).toBeTruthy();
    expect(within(notice).getByText("nvm install 22 && nvm use 22")).toBeTruthy();
    expect(within(notice).getByText("nodeIncompatibleHint")).toBeTruthy();
  });

  it("does not appear when the Node version is compatible", async () => {
    stubFetch(async () =>
      json({
        requireLogin: true,
        authenticated: false,
        nodeVersion: "v22.22.2",
        nodeCompatible: true,
        hasPassword: true,
        setupComplete: true,
        oidcEnabled: false,
        oidcDisablePasswordLogin: false,
      })
    );

    render(<LoginPage />);
    await settle();

    expect(screen.queryByText("nodeIncompatibleTitle")).toBeNull();
  });
});

describe("/status health check failure notice", () => {
  it("keeps the heading, the server error and both links, with no dismiss control", async () => {
    stubFetch(async () => json({ error: "database unavailable" }, 500));

    render(<StatusPage />);
    await settle();

    const notice = screen.getByRole("alert");
    expectKitCriticalNotice(notice);
    expect(
      within(notice).getByRole("heading", { level: 2, name: "status.healthCheckFailed" })
    ).toBeTruthy();
    expect(within(notice).getByText("database unavailable")).toBeTruthy();
    expect(within(notice).getByRole("link", { name: "status.openConnectivityHelp" })).toBeTruthy();
    expect(
      within(notice).getByRole("link", { name: "status.openConnectivityHelp" }).getAttribute("href")
    ).toBe("/offline");
    expect(
      within(notice).getByRole("link", { name: "status.maintenanceInfo" }).getAttribute("href")
    ).toBe("/maintenance");
  });

  it("shows the unreachable message when the request itself fails", async () => {
    stubFetch(async () => {
      throw new TypeError("Failed to fetch");
    });

    render(<StatusPage />);
    await settle();

    const notice = screen.getByRole("alert");
    expectKitCriticalNotice(notice);
    expect(within(notice).getByText("status.unableToReachHealth")).toBeTruthy();
  });
});
