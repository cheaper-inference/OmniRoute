// @vitest-environment jsdom
/**
 * KEA-9359 — Skills › Executions on a remote dashboard.
 *
 * `/api/skills/executions` is a local-only route today. The page read the guard's 403 body as
 * an empty result ("No executions found", 0 executions, 0% success rate). It must show the
 * shared notice instead — and keep rendering the list whenever the server does answer 200.
 */
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import messages from "../../../src/i18n/messages/en.json";
import { OmniSkillsPageClient } from "../../../src/app/(dashboard)/dashboard/omni-skills/OmniSkillsPageClient";
import { SkillInspectorPane } from "../../../src/app/(dashboard)/dashboard/omni-skills/components/SkillInspectorPane";
import type { LocalOnlyAccessSnapshot } from "../../../src/shared/constants/localOnlyFeatures";
import { LocalOnlyAccessProvider } from "../../../src/shared/hooks/useLocalOnlyAccess";
import { __resetLocalOnlyRejectionsForTests } from "../../../src/shared/utils/localOnlyAccess";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/dashboard/omni-skills",
  useSearchParams: () => new URLSearchParams(),
}));

const EXECUTIONS_PATH = "/api/skills/executions";
const NOTICE_TITLE = "Only available on the local machine";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function stubFetch(executions: () => Response) {
  const fetchMock = vi.fn<typeof fetch>(async (input) => {
    const url = String(input);
    if (url.startsWith(EXECUTIONS_PATH)) return executions();
    if (url.startsWith("/api/skills")) return json({ data: [], total: 0, totalPages: 1 });
    return json({});
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const localOnlyRejection = () =>
  json({ error: { code: "LOCAL_ONLY", message: "This endpoint requires localhost access" } }, 403);

async function renderPage(access?: LocalOnlyAccessSnapshot) {
  const page = (
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <OmniSkillsPageClient />
    </NextIntlClientProvider>
  );
  await act(async () => {
    render(
      access ? <LocalOnlyAccessProvider value={access}>{page}</LocalOnlyAccessProvider> : page
    );
  });
  await act(async () => {});
}

function openExecutionsTab() {
  fireEvent.click(screen.getByRole("tab", { name: messages.skills.executionsTab }));
}

const executionCalls = (fetchMock: ReturnType<typeof stubFetch>) =>
  fetchMock.mock.calls.filter(([url]) => String(url).startsWith(EXECUTIONS_PATH));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  __resetLocalOnlyRejectionsForTests();
});

describe("Skills › Executions on a remote dashboard (KEA-9359)", () => {
  it("a known-remote session gets the notice and no executions request", async () => {
    const fetchMock = stubFetch(localOnlyRejection);
    await renderPage({ locality: "remote", remoteBlockedPaths: [EXECUTIONS_PATH] });

    openExecutionsTab();

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText(messages.skills.noExecutions)).toBeNull();
    expect(executionCalls(fetchMock)).toHaveLength(0);
    // The rest of the page still loads.
    expect(fetchMock.mock.calls.some(([url]) => String(url).startsWith("/api/skills?"))).toBe(true);
  });

  it("a LOCAL_ONLY rejection is not an empty list, and not a 0% success rate", async () => {
    stubFetch(localOnlyRejection);
    await renderPage();

    expect(screen.queryByText("0%")).toBeNull();

    openExecutionsTab();

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText(messages.skills.noExecutions)).toBeNull();
    expect(document.body.textContent).not.toMatch(/LOCAL_ONLY|403/);
  });

  it("lists executions when the server answers (local today, remote once the GET opens)", async () => {
    stubFetch(() =>
      json({
        data: [
          {
            id: "e1",
            skillId: "s1",
            skillName: "summarize",
            status: "success",
            duration: 12,
            createdAt: "2026-11-19T10:00:00.000Z",
          },
        ],
        total: 1,
        totalPages: 1,
      })
    );
    // Remote session, but the guard no longer blocks the path.
    await renderPage({ locality: "remote", remoteBlockedPaths: [] });

    openExecutionsTab();

    expect(screen.getByText("summarize")).toBeTruthy();
    expect(screen.queryByText(NOTICE_TITLE)).toBeNull();
    expect(screen.getByText("100%")).toBeTruthy();
  });
});

describe("Skill inspector › Executions on a remote dashboard (KEA-9359)", () => {
  const skill = { id: "s1", name: "summarize", version: "1.0.0", enabled: true, mode: "on" };

  async function renderInspector(access?: LocalOnlyAccessSnapshot) {
    const pane = (
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
        <SkillInspectorPane
          selectedSkillId="s1"
          skill={skill as never}
          onSetMode={() => {}}
          onUninstall={() => {}}
        />
      </NextIntlClientProvider>
    );
    await act(async () => {
      render(
        access ? <LocalOnlyAccessProvider value={access}>{pane}</LocalOnlyAccessProvider> : pane
      );
    });
    await act(async () => {
      openExecutionsTab();
    });
    await act(async () => {});
  }

  it("a known-remote session gets the notice and no executions request", async () => {
    const fetchMock = stubFetch(localOnlyRejection);
    await renderInspector({ locality: "remote", remoteBlockedPaths: [EXECUTIONS_PATH] });

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText(messages.skills.noExecutions)).toBeNull();
    expect(executionCalls(fetchMock)).toHaveLength(0);
  });

  it("a LOCAL_ONLY rejection is not an empty list", async () => {
    stubFetch(localOnlyRejection);
    await renderInspector();

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText(messages.skills.noExecutions)).toBeNull();
  });
});
