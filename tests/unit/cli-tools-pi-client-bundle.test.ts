import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * #15515: PiToolCard is a `"use client"` component. Its first revision imported
 * `OMNIROUTE_PROVIDER_API` / `ensurePiV1BaseUrl` / `getPiModelsPath` directly from
 * `@/shared/services/piConfig`, which opens with `import fs from "fs/promises"`.
 *
 * Webpack refuses to resolve `fs/promises` inside a client chunk, so the whole Pi
 * detail page failed with HTTP 500 — `Module not found: Can't resolve 'fs/promises'`
 * — and the dashboard showed a blank page instead of the Pi integration card.
 * The general guard (client-bundle-no-server-only-10692) only walks the *existing*
 * repo, so it never saw a brand-new file that introduced the edge.
 *
 * This pins the invariant directly against the two files involved: the card must
 * not statically reach a module that imports a Node builtin the browser cannot
 * resolve, and the path/model facts it used to import belong to the API layer.
 *
 * The fix kept the two pure helpers local to the card (no new shared file, no new
 * deps) and read `modelsPath` from the already-authenticated `GET /pi-settings`
 * response instead of from disk.
 */

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const PI_CARD = "src/app/(dashboard)/dashboard/cli-code/components/PiToolCard.tsx";
const PI_CONFIG = "src/shared/services/piConfig.ts";

/** Next ships no client fallback for these, so the client build cannot resolve them. */
const UNPOLYFILLED_NODE_BUILTINS = ["fs", "fs/promises", "net", "tls", "child_process", "module"];

/** First-party runtime imports of a file, skipping `import type` (erased at build time). */
function valueImports(source: string): string[] {
  const withoutDynamic = source.replace(/\bimport\s*\(/g, "__dynamic_import__");
  const out: string[] = [];
  for (const match of withoutDynamic.matchAll(
    /(?:^|\n)\s*import\s+([^;'"]*)from\s*["']([^"']+)["']/g
  )) {
    const clause = match[1];
    const named = /\{([^}]*)\}/.exec(clause);
    if (named) {
      const outsideBraces = clause.replace(/\{[^}]*\}/, "").trim();
      if (!/[A-Za-z_$*]/.test(outsideBraces)) {
        const bindings = named[1]
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean);
        if (bindings.length > 0 && bindings.every((b) => /^type\s/.test(b))) continue;
      }
    }
    out.push(match[2]);
  }
  return out;
}

function repoRead(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
}

function hasForbiddenBuiltin(source: string): string | null {
  for (const specifier of valueImports(source)) {
    if (UNPOLYFILLED_NODE_BUILTINS.includes(specifier)) return specifier;
  }
  return null;
}

test("PiToolCard is a client component", () => {
  const source = repoRead(PI_CARD);
  assert.ok(
    /^\s*["']use client["']/m.test(source.slice(0, 200)),
    `${PI_CARD} lost its "use client" directive — the pin below assumes a browser bundle`
  );
});

test("Pi setup card exposes installation, endpoint, and merge-safe preview guidance", () => {
  const source = repoRead(PI_CARD);
  const english = JSON.parse(repoRead("src/i18n/messages/en.json")) as {
    cliTools: Record<string, string>;
  };

  assert.match(source, /t\("piInstallCommand"\)/);
  assert.match(source, /id="pi-omniroute-endpoint"[\s\S]*?type="url"/);
  assert.match(source, /t\("piManualMergeHint"\)/);
  assert.equal(
    english.cliTools.piInstallCommand,
    "npm install -g --ignore-scripts @earendil-works/pi-coding-agent"
  );
});

test("piConfig imports the fs builtin that broke the client bundle", () => {
  // Guards the premise of this file: if piConfig ever stops using fs, this test
  // no longer protects anything and should be revisited rather than deleted.
  const source = repoRead(PI_CONFIG);
  assert.ok(
    hasForbiddenBuiltin(source),
    `${PI_CONFIG} no longer imports a Node builtin — re-check whether this guard is still needed`
  );
});

test("PiToolCard does not statically reach piConfig's fs import", () => {
  // The direct edge that shipped HTTP 500 on /dashboard/cli-code/pi.
  const source = repoRead(PI_CARD);
  const direct = valueImports(source);
  assert.ok(
    !direct.includes("@/shared/services/piConfig"),
    `${PI_CARD} imports @/shared/services/piConfig again — that module opens with ` +
      `import fs from "fs/promises" and webpack cannot resolve it in a client chunk ` +
      `(HTTP 500 on the Pi detail page). Keep the pure helpers local and read the ` +
      `models path from the /api/cli-tools/pi-settings response instead.`
  );

  // Also guard the transitive case: any first-party module the card reaches.
  for (const specifier of direct) {
    if (specifier.startsWith("@/")) {
      const target = path.join(REPO_ROOT, "src", specifier.slice(2));
      const candidate = [`${target}.ts`, `${target}.tsx`].find((f) => fs.existsSync(f));
      if (!candidate) continue;
      const forbidden = hasForbiddenBuiltin(repoRead(path.relative(REPO_ROOT, candidate)));
      assert.ok(
        forbidden === null,
        `${PI_CARD} → ${specifier} imports the Node builtin "${forbidden}" — webpack ` +
          `cannot resolve it in a client chunk (HTTP 500 on the Pi detail page).`
      );
    }
  }
});
