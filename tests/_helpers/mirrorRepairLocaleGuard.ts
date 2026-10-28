import assert from "node:assert/strict";
import childProcess from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import path from "node:path";
import { mock } from "node:test";
import { pathToFileURL } from "node:url";
import { ZodError } from "zod";

export async function assertMirrorRepairRejectsUnsafeLocale(options: {
  script: string;
  relativeSource: string;
  previous: string;
  current: string;
}) {
  const root = path.resolve(path.dirname(options.script), "../..");
  const temporaryRoot = path.join(root, ".claude");
  fs.mkdirSync(temporaryRoot, { recursive: true });
  const fixture = fs.mkdtempSync(path.join(temporaryRoot, "mirror-locale-guard-"));
  const originalCwd = process.cwd();
  const hash = createHash("sha256").update(options.previous).digest("hex");
  const record = { source_hash: hash, target_hash: "must-not-be-read" };
  const locales = Object.fromEntries([
    ["../../escape", record],
    ...Array.from({ length: 65 }, (_, i) => ["aa-" + String(i).padStart(2, "0"), record]),
  ]);
  const sourcePath = path.join(fixture, options.relativeSource);
  fs.mkdirSync(path.dirname(sourcePath), { recursive: true });
  fs.writeFileSync(sourcePath, options.current);
  fs.writeFileSync(
    path.join(fixture, ".i18n-state.json"),
    JSON.stringify({
      sources: { [options.relativeSource]: { source_hash: hash, locales } },
    })
  );
  let source = fs.readFileSync(options.script, "utf8");
  source = source.replace(
    '"../i18n/run-translation.mjs"',
    JSON.stringify(pathToFileURL(path.join(root, "scripts/i18n/run-translation.mjs")).href)
  );
  if (process.env.OMNIROUTE_TEST_UNGUARDED_MIRROR_LOCALE === "1") {
    // Deliberate RED probe: remove only the newly introduced validation call.
    assert(source.includes("localeCode.parse(locale);"));
    source = source.replace(/^\s*localeCode\.parse\(locale\);.*\n/m, "");
  }
  const probe = path.join(fixture, "probe.mjs");
  fs.writeFileSync(probe, source);
  let calls = 0;
  mock.method(childProcess, "execFileSync", () => {
    calls += 1;
    return calls === 1 ? options.previous : options.current;
  });
  syncBuiltinESMExports();
  try {
    process.chdir(fixture);
    await assert.rejects(import(pathToFileURL(probe).href), ZodError);
    assert.equal(fs.existsSync(path.join(fixture, "escape")), false);
  } finally {
    process.chdir(originalCwd);
    mock.restoreAll();
    syncBuiltinESMExports();
    fs.rmSync(fixture, { recursive: true, force: true });
  }
}
