import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Discover the dashboard's static routes from the repo itself:
// cada page.tsx sob src/app/(dashboard)/dashboard vira uma rota; grupos (x) somem
// do path and dynamic routes [param] are skipped (no real data guaranteed).
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const BASE = path.join(ROOT, "src", "app", "(dashboard)", "dashboard");

function discoverRoutes(dir: string, prefix = "/dashboard"): string[] {
  const routes: string[] = [];
  if (fs.existsSync(path.join(dir, "page.tsx"))) routes.push(prefix || "/");
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith("[") || e.name.startsWith("_")) continue;
    const seg = e.name.startsWith("(") ? "" : `/${e.name}`;
    routes.push(...discoverRoutes(path.join(dir, e.name), `${prefix}${seg}`));
  }
  return [...new Set(routes)];
}

for (const route of discoverRoutes(BASE)) {
  test(`rota ${route} carrega sem crash`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    const res = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(res!.status(), `HTTP em ${route}`).toBeLessThan(400);
    // "networkidle" never sits on screens with live polling/websocket (30s x 98 routes
    // blew up the entire run) — "load" + a short settle sufficient to hydrate and
    // let a client component crash (pageerror / error boundary) appear.
    await page.waitForLoadState("load", { timeout: 10_000 }).catch(() => {});
    await page.waitForTimeout(1_500);

    // Next boundary error: may never appear
    await expect(page.locator("text=Application error")).toHaveCount(0);
    expect(pageErrors, `pageerror em ${route}: ${pageErrors.join(" | ")}`).toHaveLength(0);
  });
}
