/**
 * Route-namespace splitting — freshness and wiring invariants.
 *
 * The root/section i18n payload split (scripts/i18n/generate-route-namespaces.mjs)
 * serializes only the namespaces each route's client components use. Two
 * invariants keep it safe:
 *
 *  1. Freshness — the committed `routeNamespaces.generated.json` must equal a
 *     fresh analysis of the source tree. If this fails after an intentional
 *     change, run `npm run gen:i18n-routes` and commit the result.
 *  2. Wiring — every dashboard section directory has a layout that mounts
 *     SectionI18nProvider, and every section set contains the chrome set
 *     (nested providers REPLACE messages, so a section missing the chrome
 *     namespaces would break the shared shell on that section's pages).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  analyzeRouteNamespaces,
  REPO_ROOT,
} from "../../scripts/i18n/lib/routeNamespacesAnalyzer.mjs";
import { pickMessages } from "../../src/i18n/pickMessages";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAP_PATH = join(REPO_ROOT, "src", "i18n", "routeNamespaces.generated.json");
const SECTIONS_ROOT = join(REPO_ROOT, "src", "app", "(dashboard)", "dashboard");
const HOME_LAYOUT_PATH = join(REPO_ROOT, "src", "app", "(dashboard)", "home", "layout.tsx");

test("generated route-namespace map is fresh (run npm run gen:i18n-routes)", () => {
  const committed = JSON.parse(readFileSync(MAP_PATH, "utf8"));
  const fresh = analyzeRouteNamespaces();
  assert.deepEqual(
    committed,
    fresh,
    "routeNamespaces.generated.json is stale — run `npm run gen:i18n-routes` and commit the result"
  );
});

test("every dashboard section has a SectionI18nProvider layout", () => {
  const { sections } = JSON.parse(readFileSync(MAP_PATH, "utf8"));
  const missing = [];
  for (const name of Object.keys(sections)) {
    const layoutPath = join(SECTIONS_ROOT, name, "layout.tsx");
    if (!existsSync(layoutPath)) {
      missing.push(`${name}/layout.tsx (missing)`);
      continue;
    }
    const source = readFileSync(layoutPath, "utf8");
    if (!source.includes("SectionI18nProvider")) {
      missing.push(`${name}/layout.tsx (no SectionI18nProvider)`);
    }
  }
  assert.deepEqual(
    missing,
    [],
    "sections without a provider layout fall back to chrome-only messages"
  );
});

test("the /home route mounts a SectionI18nProvider layout (#16321)", () => {
  assert.ok(
    existsSync(HOME_LAYOUT_PATH),
    "src/app/(dashboard)/home/layout.tsx is missing — /home then inherits the chrome-only " +
      "provider and its home/banner namespaces render MISSING_MESSAGE in production"
  );
  const source = readFileSync(HOME_LAYOUT_PATH, "utf8");
  assert.ok(source.includes("SectionI18nProvider"), "home layout must mount SectionI18nProvider");
  assert.ok(
    source.includes("sectionNamespaces.home"),
    "home layout must serve the generated `home` namespace set"
  );
});

test("/home's own namespaces stay out of chrome — that is why its layout is required (#16321)", () => {
  const { chrome, home } = JSON.parse(readFileSync(MAP_PATH, "utf8"));
  for (const ns of ["home", "cheaperInferenceSponsorBanner", "vscodeCopilotBanner"]) {
    assert.ok(home.includes(ns), `home namespace set must include "${ns}"`);
    assert.ok(
      !chrome.includes(ns),
      `"${ns}" must not be part of chrome — the dashboard root provider only serves chrome, ` +
        `so /home relies on its own layout to receive it`
    );
  }
});

test("every section set includes the chrome namespaces", () => {
  const { chrome, sections, home } = JSON.parse(readFileSync(MAP_PATH, "utf8"));
  const chromeSet = new Set(chrome);
  for (const [name, namespaces] of Object.entries({ home, ...sections })) {
    for (const ns of chromeSet) {
      assert.ok(
        namespaces.includes(ns),
        `section "${name}" is missing chrome namespace "${ns}" — its shared shell would render MISSING_MESSAGE`
      );
    }
  }
});

test("root set covers the login and 404 public surface", () => {
  const { root } = JSON.parse(readFileSync(MAP_PATH, "utf8"));
  // login/page.tsx uses "auth"; Button/Input and not-found use "common" and
  // "publicSystem". These four are the non-negotiable public namespaces.
  for (const ns of ["auth", "common", "publicSystem"]) {
    assert.ok(root.includes(ns), `root namespace set must include "${ns}"`);
  }
});

test("pickMessages selects namespaces and ignores unknown/unsafe keys", () => {
  const catalog = {
    common: { hello: "world" },
    settings: { deep: { value: 1 } },
    // Legacy root-level scalar addressed by no-arg useTranslations() calls.
    disabled: "Disabled",
  };
  const picked = pickMessages(catalog, [
    "common",
    "nope",
    "",
    "constructor",
    "__proto__",
    "disabled",
  ]);
  assert.deepEqual(picked, { common: { hello: "world" }, disabled: "Disabled" });
});
