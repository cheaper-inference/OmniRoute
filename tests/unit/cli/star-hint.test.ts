import assert from "node:assert/strict";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { getLocale, setLocale } from "../../../bin/cli/i18n.mjs";
import { maybePrintStarHint } from "../../../bin/cli/starHint.mjs";
import { OMNIROUTE_REPO_URL } from "../../../src/shared/constants/projectLinks";

test("prints the localized repository link once per installation", (t) => {
  const locale = getLocale();
  setLocale("en");
  t.after(() => setLocale(locale));

  const dataDir = join(process.env.DATA_DIR!, "first-installation");
  const lines: string[] = [];
  const deps = { isTTY: true, dataDir, write: (line: string) => lines.push(line) };
  assert.equal(maybePrintStarHint({}, deps), true);
  assert.equal(maybePrintStarHint({}, deps), false);
  assert.deepEqual(lines, [
    `★ OmniRoute is free. If it helped, a star helps others find it: ${OMNIROUTE_REPO_URL}`,
  ]);
  assert.ok(existsSync(join(dataDir, ".star-hint-shown")));

  assert.equal(
    maybePrintStarHint({}, { ...deps, dataDir: join(dataDir, "other-installation") }),
    true
  );
});

test("leaves the hint available after quiet, structured, or non-TTY invocations", () => {
  const dataDir = join(process.env.DATA_DIR!, "suppressed");
  const write = () => assert.fail("unexpected star hint");
  for (const opts of [
    { json: true },
    { output: "json" },
    { output: "jsonl" },
    { output: "csv" },
    { quiet: true },
  ]) {
    assert.equal(maybePrintStarHint(opts, { isTTY: true, dataDir, write }), false);
  }
  assert.equal(maybePrintStarHint({}, { isTTY: false, dataDir, write }), false);
  assert.equal(existsSync(join(dataDir, ".star-hint-shown")), false);
});

test("a failure to claim the marker leaves command output alone", () => {
  const dataDir = join(process.env.DATA_DIR!, "marker-unavailable");
  mkdirSync(dataDir);
  const filePath = join(dataDir, "file");
  writeFileSync(filePath, "");

  assert.equal(
    maybePrintStarHint(
      {},
      {
        isTTY: true,
        dataDir: filePath,
        write: () => assert.fail("unexpected star hint"),
      }
    ),
    false
  );
});
