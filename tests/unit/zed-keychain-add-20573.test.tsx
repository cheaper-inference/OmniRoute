// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-repro-20573-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "synthetic-repro-20573",
  JWT_SECRET: "synthetic-repro-20573-jwt",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
});

const navigation = vi.hoisted(() => ({
  providerId: "zed",
  search: new URLSearchParams(),
  router: { push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() },
}));
vi.mock("next/navigation", () => ({
  useParams: () => ({ id: navigation.providerId }),
  useSearchParams: () => navigation.search,
  usePathname: () => `/dashboard/providers/${navigation.providerId}`,
  useRouter: () => navigation.router,
}));
vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

let Detail: React.ComponentType;
let root: Root;
let container: HTMLDivElement;
const originalFetch = globalThis.fetch;
const calls: string[] = [];

describe("#20573 keychain-import-only Zed must not offer browser OAuth connect", () => {
  beforeAll(async () => {
    ({ default: Detail } =
      await import("@/app/(dashboard)/dashboard/providers/[id]/ProviderDetailPageClient"));
  }, 600_000);
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.clear();
    calls.length = 0;
    globalThis.fetch = vi.fn(async (input: any, init?: any) => {
      calls.push(`${init?.method || "GET"} ${typeof input === "string" ? input : input?.url}`);
      if (String(input).includes("/api/oauth/")) {
        return Response.json({ error: "zed has no browser OAuth flow" }, { status: 400 });
      }
      return Response.json({ connections: [], nodes: [], models: [], settings: {} });
    }) as any;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    globalThis.fetch = originalFetch;
  });
  afterAll(() => fs.rmSync(dataDir, { recursive: true, force: true }));

  it("clicking the primary add button on /providers/zed does not start the OAuth flow", async () => {
    await act(async () => {
      root.render(<Detail />);
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(container.textContent).toContain("Import");
    const buttons = [...container.querySelectorAll("button")];
    const add = buttons.find((b) => /^\s*(add|connect)/i.test(b.textContent || ""));
    expect(add, "primary add/connect button").toBeTruthy();
    await act(async () => {
      add!.click();
      await new Promise((r) => setTimeout(r, 300));
    });
    expect(calls.filter((c) => c.includes("/api/oauth/zed/"))).toEqual([]);
    expect(document.body.textContent).not.toContain("Connect Zed IDE");
  });
});
