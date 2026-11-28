import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";

import { syncUiKeys } from "../../scripts/i18n/sync-ui-keys.mjs";

const AZ = "src/i18n/messages/az.json";
const ES = "src/i18n/messages/es.json";
const EN = "src/i18n/messages/en.json";

function fixture(t: TestContext, english: object, az: object = {}, es: object = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sync-ui-keys-drop-failed-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (file: string, value: unknown) => {
    const fullPath = path.join(root, file);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify(value, null, 2) + "\n");
  };
  const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
  write("config/i18n.json", {
    default: "en",
    locales: [{ code: "en" }, { code: "az" }, { code: "es" }],
  });
  write(EN, english);
  write(AZ, az);
  write(ES, es);
  return { root, write, read };
}

async function translateString(text: string, locale: { code: string }) {
  if (locale.code === "az" && text === "Fails") throw new Error("fixture translation failure");
  return `[${locale.code}] ${text}`;
}

const translation = { translate: true, batchSize: 1, translateFns: { translateString } };
const quiet = () => {};

test("dropFailed removes failed leaves and only the parents they empty", async (t) => {
  const { root, read } = fixture(t, {
    discarded: { nested: { first: "Fails" } },
    kept: { second: "Fails", other: "Succeeds" },
    empty: {},
  });

  const result = await syncUiKeys({ root, ...translation, dropFailed: true, log: quiet });

  assert.deepEqual(JSON.parse(read(AZ)), { kept: { other: "[az] Succeeds" }, empty: {} });
  assert.doesNotMatch(read(AZ), /__MISSING__:/);
  assert.deepEqual(JSON.parse(read(ES)), {
    discarded: { nested: { first: "[es] Fails" } },
    kept: { second: "[es] Fails", other: "[es] Succeeds" },
    empty: {},
  });
  assert.equal(result.failed, 2);
  assert.equal(result.dropped, 2);
  assert.deepEqual(
    result.locales.map(({ locale, failed, dropped, placeholders }) => ({
      locale,
      failed,
      dropped,
      placeholders,
    })),
    [
      {
        locale: "az",
        failed: 2,
        dropped: ["discarded.nested.first", "kept.second"],
        placeholders: 0,
      },
      { locale: "es", failed: 0, dropped: [], placeholders: 0 },
    ]
  );
});

test("dropFailed keeps translations recovered by the one-by-one batch fallback", async (t) => {
  const { root, read } = fixture(t, { first: "Fails", second: "Succeeds" });
  const translateBatch = t.mock.fn(async () => {
    throw new Error("fixture batch failure");
  });
  const result = await syncUiKeys({
    root,
    ...translation,
    locales: ["az"],
    batchSize: 40,
    translateFns: { translateBatch, translateString },
    dropFailed: true,
    log: quiet,
  });

  assert.equal(translateBatch.mock.callCount(), 1);
  assert.deepEqual(JSON.parse(read(AZ)), { second: "[az] Succeeds" });
  assert.equal(result.translated, 1);
  assert.equal(result.failed, 1);
  assert.deepEqual(result.locales[0].dropped, ["first"]);
});

test("dropFailed keeps the previous translation when the retranslation of a rewritten key fails", async (t) => {
  const { root, write, read } = fixture(t, { value: "Old English" }, { value: "Old translation" });
  const git = (...args: string[]) => execFileSync("git", args, { cwd: root, stdio: "pipe" });
  git("init", "-q");
  git("add", "-A");
  git(
    "-c",
    "user.name=Test",
    "-c",
    "user.email=test@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-qm",
    "fixture"
  );
  write(EN, { value: "Fails" });

  const result = await syncUiKeys({
    root,
    ...translation,
    locales: ["az"],
    rewrittenSinceRef: "HEAD",
    dropFailed: true,
    log: quiet,
  });

  assert.equal(result.markedRewritten, 1);
  assert.equal(result.failed, 1);
  assert.equal(result.dropped, 0);
  assert.equal(result.restored, 1);
  assert.deepEqual(result.locales[0].dropped, []);
  assert.deepEqual(result.locales[0].restored, ["value"]);
  // A key the base already translates is never removed: check-key-completeness reports a
  // missing one as a lost translation.
  assert.deepEqual(JSON.parse(read(AZ)), { value: "Old translation" });
  assert.doesNotMatch(read(AZ), /__MISSING__/);
});

test("syncUiKeys keeps the marker for a failed translation by default", async (t) => {
  const { root, read } = fixture(t, { value: "Fails" });

  const result = await syncUiKeys({ root, ...translation, log: quiet });

  assert.deepEqual(JSON.parse(read(AZ)), { value: "__MISSING__:Fails" });
  assert.equal(result.failed, 1);
  assert.equal(result.locales[0].placeholders, 1);
});

test("dryRun previews markers without translating, removing or writing them", async (t) => {
  const { root, read } = fixture(t, { value: "Fails" }, { value: "__MISSING__:Fails" });
  const before = [read(AZ), read(ES)];
  const fakeTranslate = t.mock.fn(translateString);
  const result = await syncUiKeys({
    root,
    ...translation,
    translateFns: { translateString: fakeTranslate },
    dropFailed: true,
    dryRun: true,
    log: quiet,
  });

  assert.equal(fakeTranslate.mock.callCount(), 0);
  assert.deepEqual([read(AZ), read(ES)], before);
  assert.deepEqual(result.changedFiles, [ES]);
  assert.deepEqual(
    result.locales.map(({ placeholders }) => placeholders),
    [1, 1]
  );
});

test("dropFailed renders both derived catalogs even when the final locale bytes match", async (t) => {
  const az = {
    publicSystem: { globalError: { title: "Xəta" } },
    auth: { traeAuthorizationSuccess: "İcazə verildi" },
  };
  const { root, read, write } = fixture(
    t,
    {
      publicSystem: { globalError: { title: "Error", retry: "Fails" } },
      auth: { traeAuthorizationSuccess: "Authorized", returnToDashboard: "Fails" },
    },
    az
  );
  const compact = "src/i18n/global-error-messages/az.json";
  const route = "src/i18n/route-handler-messages.json";
  write(compact, { publicSystem: { globalError: { title: "Xəta", retry: "__MISSING__:Fails" } } });
  write(route, { az: { auth: { ...az.auth, returnToDashboard: "Old translation" } } });
  const before = read(AZ);

  const result = await syncUiKeys({
    root,
    ...translation,
    locales: ["az"],
    dropFailed: true,
    log: quiet,
  });

  assert.deepEqual(JSON.parse(read(compact)), { publicSystem: az.publicSystem });
  assert.deepEqual(JSON.parse(read(route)).az, { auth: az.auth });
  assert.equal(read(AZ), before);
  assert.ok(result.changedFiles.includes(compact));
  assert.ok(result.changedFiles.includes(route));
  assert.ok(!result.changedFiles.includes(AZ));
});

test("the next sync translates the key dropped by the first run", async (t) => {
  const { root, read } = fixture(t, { value: "Fails" });
  const options = { root, ...translation, locales: ["az"], dropFailed: true, log: quiet };
  await syncUiKeys(options);
  assert.deepEqual(JSON.parse(read(AZ)), {});

  const result = await syncUiKeys({
    ...options,
    translateFns: { translateString: async (text: string) => `Recovered: ${text}` },
  });

  assert.equal(result.added, 1);
  assert.equal(result.translated, 1);
  assert.equal(result.failed, 0);
  assert.equal(result.dropped, 0);
  assert.deepEqual(JSON.parse(read(AZ)), { value: "Recovered: Fails" });
});
