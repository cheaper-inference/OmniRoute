import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  desktopAssets,
  uploadDesktopAssets,
} from "../../../scripts/release/upload-desktop-assets.mjs";

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), "desktop-assets-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const name of [
    "latest.yml",
    "latest-mac.yml",
    "latest-linux.yml",
    "app.dmg",
    "app.exe",
    "app.AppImage",
    "app.deb",
    "app.blockmap",
    "app.source.tar.gz",
    "app.source.zip",
    "private.txt",
  ])
    writeFileSync(join(directory, name), "fixture");
  mkdirSync(join(directory, "directory.yml"));
  return directory;
}

test("uploads every supported desktop artifact and updater manifest without altering curated notes", (t) => {
  const directory = fixture(t);
  const calls = [];
  const result = uploadDesktopAssets({
    version: "v3.8.53",
    repository: "owner/repo",
    directory,
    run: (args) => {
      calls.push(args);
      return { status: 0, stdout: "{}" };
    },
  });
  assert.deepEqual(result, { created: false, uploaded: 10 });
  assert.deepEqual(
    calls.map((args) => args.slice(0, 2)),
    [
      ["api", "repos/owner/repo/releases/tags/v3.8.53"],
      ["release", "edit"],
      ["release", "upload"],
    ]
  );
  assert.ok(calls[2].includes(join(directory, "latest.yml")));
  assert.ok(calls[2].includes(join(directory, "latest-mac.yml")));
  assert.ok(calls[2].includes(join(directory, "latest-linux.yml")));
  assert.ok(calls[2].includes("--clobber"));
  assert.ok(calls.every((args) => !args.some((arg) => /--(?:notes|generate-notes)/.test(arg))));
  assert.equal(
    desktopAssets(directory).some((file) => /private|directory/.test(file)),
    false
  );
});

test("creates a missing release only after a confirmed HTTP 404 and requires an existing tag", (t) => {
  const calls = [];
  const result = uploadDesktopAssets({
    version: "v3.8.53",
    repository: "owner/repo",
    directory: fixture(t),
    run: (args) => {
      calls.push(args);
      return calls.length === 1 ? { status: 1, stderr: "gh: Not Found (HTTP 404)" } : { status: 0 };
    },
  });
  assert.equal(result.created, true);
  assert.deepEqual(calls[1], [
    "release",
    "create",
    "v3.8.53",
    "--repo",
    "owner/repo",
    "--verify-tag",
    "--title",
    "v3.8.53",
    "--notes",
    "",
  ]);
});

for (const failure of [
  { status: 1, stderr: "HTTP 403" },
  { status: 1, stderr: "network timeout" },
  { status: null, signal: "SIGTERM" },
  { error: new Error("spawn failure") },
]) {
  test(`never creates or uploads after an unknown lookup result: ${failure.stderr ?? failure.signal ?? "spawn"}`, (t) => {
    let calls = 0;
    assert.throws(
      () =>
        uploadDesktopAssets({
          version: "v3.8.53",
          repository: "owner/repo",
          directory: fixture(t),
          run: () => {
            calls++;
            return failure;
          },
        }),
      /Cannot establish/
    );
    assert.equal(calls, 1);
  });
}

test("a failed upload stays failed instead of reporting a completed release", (t) => {
  assert.throws(
    () =>
      uploadDesktopAssets({
        version: "v3.8.53",
        repository: "owner/repo",
        directory: fixture(t),
        run: (args) => ({ status: args[1] === "upload" ? 1 : 0 }),
      }),
    /operation failed/
  );
});

test("rejects empty asset sets before touching the release", (t) => {
  const directory = mkdtempSync(join(tmpdir(), "desktop-empty-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  assert.throws(
    () =>
      uploadDesktopAssets({
        version: "v3.8.53",
        repository: "owner/repo",
        directory,
        run: () => assert.fail("no request expected"),
      }),
    /No desktop assets/
  );
});

test("publishes the surviving platform when other platform files are absent", (t) => {
  const directory = mkdtempSync(join(tmpdir(), "desktop-partial-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  writeFileSync(join(directory, "app.dmg"), "fixture");
  writeFileSync(join(directory, "latest-mac.yml"), "fixture");
  const calls = [];
  const result = uploadDesktopAssets({
    version: "v3.8.53",
    repository: "owner/repo",
    directory,
    run: (args) => {
      calls.push(args);
      return { status: 0 };
    },
  });
  assert.equal(result.uploaded, 2);
  assert.ok(calls[2].includes(join(directory, "app.dmg")));
  assert.ok(calls[2].includes(join(directory, "latest-mac.yml")));
});
