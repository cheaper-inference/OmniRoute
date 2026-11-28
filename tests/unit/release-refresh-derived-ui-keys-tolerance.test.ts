import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";

import * as refresh from "../../scripts/release/refresh-derived.mjs";

const AZ = "src/i18n/messages/az.json";
const ES = "src/i18n/messages/es.json";
const syncUiKeysUrl = new URL("../../scripts/i18n/sync-ui-keys.mjs", import.meta.url).href;

function fixture(t: TestContext, keys: number, failed: number, locales = ["az"]) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "refresh-derived-ui-keys-tolerance-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (file: string, content: string) => {
    const fullPath = path.join(root, file);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
  };
  const writeJson = (file: string, value: unknown) =>
    write(file, JSON.stringify(value, null, 2) + "\n");
  const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

  const setting = "OMNIROUTE_TRANSLATION_ENGINE";
  const original = process.env[setting];
  process.env[setting] = "google";
  t.after(() => {
    if (original === undefined) delete process.env[setting];
    else process.env[setting] = original;
  });

  writeJson("config/i18n.json", {
    default: "en",
    locales: ["en", ...locales].map((code) => ({ code })),
  });
  writeJson(
    "src/i18n/messages/en.json",
    Object.fromEntries(Array.from({ length: keys }, (_, index) => [`key${index}`, String(index)]))
  );
  for (const code of locales) writeJson(`src/i18n/messages/${code}.json`, {});
  writeJson("bin/cli/locales/en.json", {});

  // Keep the real sync and its catalog writes, replacing only the translation backend.
  write(
    "scripts/i18n/sync-ui-keys.mjs",
    `import { syncUiKeys as sync } from ${JSON.stringify(syncUiKeysUrl)};
const translateString = async (text, locale) => {
  if (Number(text) < ${failed}) throw new Error("fixture translation failure");
  return "[" + locale.code + "] " + text;
};
export function syncUiKeys(options) {
  return sync({ ...options, batchSize: 1, translateFns: { translateString }, log() {} });
}
`
  );

  const run = async (profile: "nightly" | "release") => {
    const result = await refresh.refreshDerived({
      root,
      profile,
      only: ["ui-keys"],
      rewrittenSince: null,
    });
    const step = result.steps.find(({ id }) => id === "ui-keys");
    assert.ok(step);
    return { result, step, exitCode: refresh.refreshExitCode(result, { check: false }) };
  };
  return { read, run };
}

test("nightly keeps 24,154 translations and reports two omissions across locale files", async (t) => {
  const { run, read } = fixture(t, 12_078, 1, ["az", "es"]);
  const { result, step, exitCode } = await run("nightly");

  assert.equal(step.status, "changed", step.detail);
  assert.ok(result.steps.every(({ status }) => status !== "failed"));
  assert.equal(exitCode, 0);
  assert.match(step.detail, /ui: [^;]+; 2 value\(s\).*left out.*next run retries/);
  assert.deepEqual(
    result.manual.map(({ path: file }) => file),
    [AZ, ES]
  );
  for (const { path: file, label, detail } of result.manual) {
    assert.match(label, /translation/i);
    assert.match(detail, /\b1\b.*left out.*next run retries/);
    const content = read(file);
    const catalog = JSON.parse(content);
    assert.equal(Object.keys(catalog).length, 12_077);
    assert.equal(catalog.key0, undefined);
    assert.doesNotMatch(content, /__MISSING__:/);
  }
});

for (const { attempted, failed, limit, exitCode } of [
  { attempted: 20, failed: 10, limit: 10, exitCode: 0 },
  { attempted: 20, failed: 11, limit: 10, exitCode: 2 },
  { attempted: 2_001, failed: 11, limit: 11, exitCode: 0 },
  { attempted: 2_001, failed: 12, limit: 11, exitCode: 2 },
]) {
  test(`nightly exits ${exitCode} with ${failed}/${attempted} failures and a limit of ${limit}`, async (t) => {
    const { run } = fixture(t, attempted, failed);
    const result = await run("nightly");

    assert.equal(result.exitCode, exitCode, result.step.detail);
    if (exitCode === 2) {
      assert.equal(result.step.status, "failed");
      assert.match(
        result.step.detail,
        new RegExp(
          `${failed} value\\(s\\) failed to translate out of ${attempted} attempted.*limit: ${limit}`
        )
      );
    } else {
      assert.equal(result.step.status, "changed");
    }
    assert.equal(refresh.nightlyTranslationFailureLimit(attempted), limit);
  });
}

test("release fails on one translation error and retains the marker", async (t) => {
  const { run, read } = fixture(t, 2, 1);
  const { result, step, exitCode } = await run("release");

  assert.equal(step.status, "failed");
  assert.equal(exitCode, 2);
  assert.match(
    step.detail,
    /1 value\(s\) failed to translate and were left as __MISSING__ markers/
  );
  assert.equal(result.manual.length, 0);
  assert.equal(JSON.parse(read(AZ)).key0, "__MISSING__:0");
});
