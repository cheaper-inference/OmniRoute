#!/usr/bin/env node
// Non-destructive preflight for Hostinger shared Node.js hosting.
// Run from the OmniRoute repository root with: node scripts/ops/hostinger-preflight.mjs
import { existsSync, accessSync, constants } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let failed = false;
function check(label, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}${detail ? " — " + detail : ""}`);
  if (!ok) failed = true;
}
const [major, minor, patch] = process.versions.node.split(".").map(Number);
check("Node engine", (major === 22 && (minor > 22 || (minor === 22 && patch >= 2))) || (major >= 24 && major < 27), process.version);
const glibc = process.report?.getReport?.()?.header?.glibcVersionRuntime;
console.log("INFO glibc runtime:", glibc || "not reported");
const dist = resolve(process.env.NEXT_DIST_DIR || ".build/next");
check("Next build output", existsSync(resolve(dist, "BUILD_ID")), dist);
const data = process.env.DATA_DIR;
check("DATA_DIR explicitly configured", !!data && data.startsWith("/"), data || "unset");
if (data && data.startsWith("/")) {
  try { accessSync(data, constants.W_OK); check("DATA_DIR writable", true, data); }
  catch { check("DATA_DIR writable", false, data); }
  check("DATA_DIR outside build output", !data.startsWith(dist + "/") && data !== dist);
}
for (const key of ["JWT_SECRET", "API_KEY_SECRET", "INITIAL_PASSWORD"]) {
  const value = process.env[key] || "";
  check(key + " configured", value.length >= 16 && value !== "CHANGEME");
}
try {
  const Database = require("better-sqlite3");
  const db = new Database(":memory:");
  db.exec("CREATE TABLE preflight (id INTEGER PRIMARY KEY, value TEXT)");
  db.prepare("INSERT INTO preflight (value) VALUES (?)").run("ok");
  check("SQLite native runtime read/write", db.prepare("SELECT value FROM preflight").get()?.value === "ok");
  db.close();
} catch (e) {
  check("SQLite native runtime read/write", false, e.message);
}
if (failed) process.exitCode = 1;
