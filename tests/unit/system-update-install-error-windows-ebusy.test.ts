import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Dashboard "Update" (npm mode) runs `npm install -g omniroute@X` and
// `npm rebuild better-sqlite3` INSIDE the running server. On Windows the server
// keeps its own package files open (better_sqlite3.node is loaded), so npm cannot
// rename/replace them and fails with EBUSY/EPERM. The dashboard used to show only
// the raw npm stderr; it must now explain the cause and the manual recovery.
const { formatUpdateInstallError, isWindowsFileLockError } =
  await import("../../src/lib/system/updateInstallError.ts");

const NPM_EBUSY_STDERR = [
  "npm error code EBUSY",
  "npm error syscall rename",
  "npm error path C:\\Users\\dev\\AppData\\Roaming\\npm\\node_modules\\omniroute",
  "npm error dest C:\\Users\\dev\\AppData\\Roaming\\npm\\node_modules\\.omniroute-SUe2kCsq",
  "npm error errno -4082",
  "npm error EBUSY: resource busy or locked, rename 'C:\\Users\\dev\\AppData\\Roaming\\npm\\node_modules\\omniroute'",
].join("\n");

function execError(stderr: string, message = "Command failed: npm install -g omniroute@3.8.53") {
  // execFile rejects with an Error carrying the exit code (a number) and the
  // captured streams — the EBUSY text only lives in stderr/message, never in .code.
  return Object.assign(new Error(message), { code: 1, stderr });
}

test("EBUSY on win32 becomes an actionable message with the manual recovery steps", () => {
  const message = formatUpdateInstallError(execError(NPM_EBUSY_STDERR), {
    platform: "win32",
    latest: "3.8.53",
  });
  assert.match(message, /EBUSY/);
  assert.match(message, /stop omniroute/i, "tells the user to stop the running server first");
  assert.ok(message.includes("npm install -g omniroute@3.8.53"), "gives the exact install command");
  assert.ok(message.includes("omniroute update --apply"), "mentions the CLI updater");
  assert.ok(
    message.includes("resource busy or locked"),
    "keeps the original npm line so the failure stays diagnosable"
  );
});

test("EPERM on win32 gets the same guidance (antivirus / handle held)", () => {
  const stderr = "npm error code EPERM\nnpm error EPERM: operation not permitted, unlink 'x.node'";
  const message = formatUpdateInstallError(execError(stderr), {
    platform: "win32",
    latest: "3.8.53",
  });
  assert.match(message, /EPERM/);
  assert.ok(message.includes("npm install -g omniroute@3.8.53"));
});

test("a lock error that only appears in err.message is still recognised", () => {
  const err = new Error("EBUSY: resource busy or locked, open 'better_sqlite3.node'");
  assert.equal(isWindowsFileLockError(err, "win32"), true);
  assert.match(
    formatUpdateInstallError(err, { platform: "win32", latest: "3.8.53" }),
    /npm install -g omniroute@3\.8\.53/
  );
});

test("non-Windows platforms keep the raw npm stderr (behaviour unchanged)", () => {
  for (const platform of ["linux", "darwin"] as const) {
    assert.equal(isWindowsFileLockError(execError(NPM_EBUSY_STDERR), platform), false);
    assert.equal(
      formatUpdateInstallError(execError(NPM_EBUSY_STDERR), { platform, latest: "3.8.53" }),
      NPM_EBUSY_STDERR
    );
  }
});

test("unrelated win32 failures keep the raw npm stderr", () => {
  const stderr = "npm error code ENOTFOUND\nnpm error network request failed";
  assert.equal(isWindowsFileLockError(execError(stderr), "win32"), false);
  assert.equal(
    formatUpdateInstallError(execError(stderr), { platform: "win32", latest: "3.8.53" }),
    stderr
  );
});

test("words that merely contain EBUSY/EPERM do not match", () => {
  const stderr = "npm error NOTEBUSYLIKE and SUPERPERMISSIVE";
  assert.equal(isWindowsFileLockError(execError(stderr), "win32"), false);
});

test("non-Error throw values never crash the formatter", () => {
  assert.equal(formatUpdateInstallError("boom", { platform: "win32", latest: "3.8.53" }), "boom");
  assert.equal(
    formatUpdateInstallError(undefined, { platform: "win32", latest: "3.8.53" }),
    "undefined"
  );
  assert.match(
    formatUpdateInstallError("EBUSY: locked", { platform: "win32", latest: "3.8.53" }),
    /Stop OmniRoute/
  );
});

test("the npm-mode update route reports install failures through the formatter", () => {
  const routeSrc = fs.readFileSync(
    new URL("../../src/app/api/system/version/route.ts", import.meta.url),
    "utf8"
  );
  assert.ok(
    routeSrc.includes('from "@/lib/system/updateInstallError"'),
    "route must import the formatter"
  );
  // The npm-mode catch is the one after the global install; it must format instead of
  // forwarding err.stderr verbatim.
  const npmModeTail = routeSrc.slice(routeSrc.indexOf("// Step 1: Install"));
  assert.ok(
    npmModeTail.includes("formatUpdateInstallError(err, {"),
    "npm-mode catch must call formatUpdateInstallError"
  );
});
