/**
 * A plugin child process that dies is never respawned. Two things must hold afterwards:
 *
 * - the loader reports the unexpected death once, so the owner can mark the plugin as
 *   failed instead of leaving it shown as active;
 * - a later hook call fails at once. Before, `child.send` on the closed channel only
 *   emitted an async `error` event, the pending call was never rejected, and every request
 *   waited out the full hook timeout before the hook failed open.
 *
 * A normal cleanup() is not an unexpected death.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { loadPlugin, type LoadedPlugin } from "../../src/lib/plugins/loader.ts";
import type { PluginManifestWithDefaults } from "../../src/lib/plugins/manifest.ts";

const HOOK_TIMEOUT_MS = 4_000;

const manifest = (name: string): PluginManifestWithDefaults =>
  ({
    name,
    version: "1.0.0",
    license: "MIT",
    main: "index.mjs",
    source: "local",
    tags: [],
    requires: { permissions: [] },
    hooks: { onRequest: true },
    skills: [],
    enabledByDefault: false,
    configSchema: {},
  }) as unknown as PluginManifestWithDefaults;

const ctx = (body: unknown) =>
  ({
    requestId: "req-1",
    body,
    model: "m",
    provider: "p",
    metadata: {},
  }) as never;

async function waitFor(pred: () => boolean, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) await new Promise((r) => setTimeout(r, 25));
}

async function setup(t: test.TestContext, name: string) {
  const dir = await mkdtemp(join(tmpdir(), "omniroute-plugin-death-"));
  const entry = join(dir, "index.mjs");
  await writeFile(
    entry,
    `export async function onRequest(ctx) {
  if (ctx.body && ctx.body.die) process.exit(7);
  return { metadata: { alive: true } };
}
`,
    "utf-8"
  );
  const deaths: Array<{ name: string; code: number | null }> = [];
  const loaded: LoadedPlugin = await loadPlugin(entry, manifest(name), {
    hookTimeoutMs: HOOK_TIMEOUT_MS,
    onUnexpectedExit: (info) => deaths.push(info),
  });
  t.after(async () => {
    loaded.cleanup();
    await rm(dir, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    });
  });
  return { loaded, deaths };
}

test("a healthy plugin still answers and reports no death", { timeout: 15_000 }, async (t) => {
  const { loaded, deaths } = await setup(t, "death-healthy");
  const result = await loaded.plugin.onRequest!(ctx({}));
  assert.deepEqual(result, { metadata: { alive: true } });
  assert.equal(deaths.length, 0);
});

test(
  "an unexpected process exit is reported once with the exit code",
  {
    timeout: 15_000,
  },
  async (t) => {
    const { loaded, deaths } = await setup(t, "death-report");
    await loaded.plugin.onRequest!(ctx({ die: true }));
    await waitFor(() => deaths.length > 0, 5_000);
    await new Promise((r) => setTimeout(r, 200));
    assert.deepEqual(deaths, [{ name: "death-report", code: 7 }]);
  }
);

test(
  "a hook call after the process died fails at once, not after the hook timeout",
  {
    timeout: 20_000,
  },
  async (t) => {
    const { loaded, deaths } = await setup(t, "death-fast-fail");
    await loaded.plugin.onRequest!(ctx({ die: true }));
    await waitFor(() => deaths.length > 0, 5_000);

    const started = Date.now();
    const result = await loaded.plugin.onRequest!(ctx({}));
    const elapsedMs = Date.now() - started;

    assert.equal(result, undefined, "a dead plugin still fails open");
    assert.ok(
      elapsedMs < HOOK_TIMEOUT_MS / 2,
      `call on a dead plugin took ${elapsedMs}ms (hook timeout ${HOOK_TIMEOUT_MS}ms)`
    );
  }
);

test("cleanup() is not an unexpected death", { timeout: 15_000 }, async (t) => {
  const { loaded, deaths } = await setup(t, "death-cleanup");
  loaded.cleanup();
  await new Promise((r) => setTimeout(r, 1_000));
  assert.equal(deaths.length, 0);
});
