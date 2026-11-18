// @vitest-environment jsdom
// UI review 2026-11-15, defect 8 (finding A7-07): the breadcrumb trail linked to route prefixes
// that have no page (404) and showed 26 segments untranslated. Rules + static guard:
// src/shared/utils/breadcrumbTrail.ts, tests/unit/breadcrumb-trail-routes.test.ts.
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import en from "../../../../src/i18n/messages/en.json";
import ptBr from "../../../../src/i18n/messages/pt-BR.json";

// Real next-intl (the global setup mocks it with en.json): the locale cases need a provider.
vi.unmock("next-intl");

const nav = vi.hoisted(() => ({ pathname: "/dashboard" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...p}>
      {children}
    </a>
  ),
}));

const { default: Breadcrumbs } = await import("@/shared/components/Breadcrumbs");

type Messages = typeof en;

function renderAt(pathname: string, locale = "en", messages: unknown = en) {
  nav.pathname = pathname;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages as Messages} onError={() => {}}>
      <Breadcrumbs />
    </NextIntlClientProvider>
  );
}

/** Crumbs in order: the text and, for a link, its href. */
function crumbs(container: HTMLElement) {
  return [...container.querySelectorAll('[data-slot="breadcrumb-item"]')].map((item) => ({
    text: item.textContent,
    href: item.querySelector("a")?.getAttribute("href") ?? null,
  }));
}

afterEach(() => cleanup());

describe("Breadcrumbs: no link to a route prefix without a page", () => {
  it.each([
    ["/dashboard/resilience/connections", "/dashboard/resilience", en.breadcrumbs.resilience],
    ["/dashboard/system/proxy", "/dashboard/system", en.sidebar.systemGroup],
    ["/dashboard/tools/agent-bridge", "/dashboard/tools", en.breadcrumbs.tools],
    ["/dashboard/gamification/admin", "/dashboard/gamification", en.breadcrumbs.gamification],
    ["/dashboard/api-manager/key-1/access", "/dashboard/api-manager/key-1", "Key-1"],
    ["/dashboard/plugins/my-plugin/config", "/dashboard/plugins/my-plugin", "My-plugin"],
  ])("%s: the %s crumb is text, not a link", (pathname, deadHref, label) => {
    const { container } = renderAt(pathname);
    expect(container.querySelector(`a[href="${deadHref}"]`)).toBeNull();
    const crumb = crumbs(container).find((c) => c.text === label);
    expect(crumb, `crumb "${label}" is still shown`).toBeDefined();
    expect(crumb!.href).toBeNull();
    // The other intermediate crumbs keep their links.
    expect(container.querySelector('a[href="/dashboard"]')).not.toBeNull();
  });

  it("every link of the trail points at a route that has a page", () => {
    const { container } = renderAt("/dashboard/system/mitm-proxy");
    expect(crumbs(container)).toEqual([
      { text: en.breadcrumbs.dashboard, href: "/dashboard" },
      { text: en.sidebar.systemGroup, href: null },
      { text: en.sidebar.mitmProxy, href: null },
    ]);
    expect(screen.getByText(en.sidebar.mitmProxy).getAttribute("aria-current")).toBe("page");
  });

  it("keeps the link when a dynamic route answers for the segment", () => {
    // `providers/chatgpt/` has no page.tsx of its own, but `providers/[id]` serves the URL.
    const { container } = renderAt("/dashboard/providers/chatgpt/connect");
    expect(crumbs(container)).toEqual([
      { text: en.breadcrumbs.dashboard, href: "/dashboard" },
      { text: en.breadcrumbs.providers, href: "/dashboard/providers" },
      { text: "Chatgpt", href: "/dashboard/providers/chatgpt" },
      { text: en.breadcrumbs.connect, href: null },
    ]);
  });
});

describe("Breadcrumbs: segments are translated", () => {
  it.each([
    ["/dashboard/log-export", en.sidebar.logExport, "Log-export"],
    ["/dashboard/conversations", en.sidebar.conversations, null],
    ["/dashboard/omni-skills", en.sidebar.omniSkills, "Omni-skills"],
    ["/dashboard/settings/modality-bridge", en.sidebar.settingsModalityBridge, "Modality-bridge"],
    ["/dashboard/logs/timeline", en.sidebar.logsTimeline, null],
    ["/dashboard/radar/offers", en.breadcrumbs.offers, null],
    ["/dashboard/onboarding", en.breadcrumbs.onboarding, null],
    ["/dashboard/orchestration", en.breadcrumbs.orchestration, null],
  ])("%s ends in %s", (pathname, label, rawFallback) => {
    const { container } = renderAt(pathname);
    const last = crumbs(container).at(-1)!;
    expect(last.text).toBe(label);
    if (rawFallback) expect(container.textContent).not.toContain(rawFallback);
  });

  it("uses the reader's locale for the labels that come from the sidebar", () => {
    // Guard against a vacuous case: these labels really differ from English in pt-BR.
    expect(ptBr.sidebar.systemGroup).not.toBe(en.sidebar.systemGroup);
    expect(ptBr.sidebar.conversations).not.toBe(en.sidebar.conversations);

    const proxy = renderAt("/dashboard/system/proxy", "pt-BR", ptBr);
    expect(crumbs(proxy.container)).toEqual([
      { text: ptBr.breadcrumbs.dashboard, href: "/dashboard" },
      { text: ptBr.sidebar.systemGroup, href: null },
      { text: ptBr.sidebar.proxy, href: null },
    ]);
    cleanup();

    const conversations = renderAt("/dashboard/conversations", "pt-BR", ptBr);
    expect(crumbs(conversations.container).at(-1)!.text).toBe(ptBr.sidebar.conversations);
  });

  it("falls back to the capitalised segment for data (a provider id)", () => {
    const { container } = renderAt("/dashboard/providers/openai");
    expect(crumbs(container).at(-1)).toEqual({ text: "Openai", href: null });
  });
});
