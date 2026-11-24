/**
 * Source-level guards for the public self-service quota page: the server/client split, the
 * imports a public page may not pull in, where browser storage is touched, and the namespaces
 * the page adds to the root payload.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src/app/quota");
const PAGE_DIR = path.join(ROOT, "[provider]");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function read(file: string): string {
  return readFileSync(file, "utf8");
}

/** Source without block and line comments, so a colour named in a comment does not count. */
function code(file: string): string {
  return read(file)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

const sources = walk(ROOT).filter((file) => /\.(ts|tsx)$/.test(file));
const relative = (file: string) => path.relative(PAGE_DIR, file).split(path.sep).join("/");

test("the page file is a dynamic server component that repeats the page-exists decision", () => {
  const page = read(path.join(PAGE_DIR, "page.tsx"));
  assert.ok(!page.includes('"use client"'));
  for (const needle of [
    'dynamic = "force-dynamic"',
    "await params",
    "resolveQuotaPanelPage",
    "notFound()",
    "index: false",
  ]) {
    assert.ok(page.includes(needle), `page.tsx should contain ${needle}`);
  }
});

test("no file of the page imports the barrel, analytics components or the database", () => {
  assert.ok(sources.length > 0);
  for (const file of sources) {
    const text = read(file);
    const name = relative(file);
    assert.doesNotMatch(text, /from\s+["']@\/shared\/components["']/, `${name}: barrel import`);
    assert.doesNotMatch(text, /@\/shared\/components\/analytics\//, `${name}: analytics import`);
    assert.doesNotMatch(text, /@\/lib\/db/, `${name}: database import`);
    assert.ok(!text.includes("console."), `${name}: console call`);
    assert.doesNotMatch(code(file), /#[0-9a-fA-F]{3,8}\b/, `${name}: hex colour`);
    assert.ok(!text.includes("dark:"), `${name}: dark: variant`);
  }
});

test("browser storage is touched only by the stored-key hook", () => {
  const touching = sources
    .filter((file) => /localStorage|sessionStorage/.test(read(file)))
    .map(relative);
  assert.deepEqual(touching, ["lib/useStoredApiKey.ts"]);
});

test("each component file declares exactly one default-exported component", () => {
  const dir = path.join(PAGE_DIR, "components");
  const files = readdirSync(dir).filter((name) => name.endsWith(".tsx"));
  assert.ok(files.length > 0);
  for (const name of files) {
    const text = read(path.join(dir, name));
    assert.equal(text.match(/export default/g)?.length ?? 0, 1, `${name}: one default export`);
    const components = text.match(/^(?:export\s+)?(?:default\s+)?function\s+[A-Z]\w*/gm) ?? [];
    assert.equal(components.length, 1, `${name}: one component`);
  }
});

test("the root namespace payload gains quotaSelf and no dashboard namespace", () => {
  const map = JSON.parse(read(path.join(process.cwd(), "src/i18n/routeNamespaces.generated.json")));
  const root: string[] = map.root;
  assert.ok(root.includes("quotaSelf"));
  for (const name of ["analytics", "quotaShare", "costs"]) {
    assert.ok(!root.includes(name), `root should not contain ${name}`);
  }
});

test("no file of the page sets a timer", () => {
  assert.ok(sources.length > 0);
  for (const file of sources) {
    assert.doesNotMatch(code(file), /setInterval|setTimeout|requestAnimationFrame/, relative(file));
  }
});

test("the lending files read the clock only when a save is sent", () => {
  const lending = sources.filter((file) => /[Ll]ending/.test(path.basename(file)));
  assert.ok(lending.length >= 7);
  for (const file of lending) {
    const text = code(file);
    assert.doesNotMatch(text, /new Date\(\s*\)|document\.cookie|indexedDB/, relative(file));
  }
  const clock = lending.filter((file) => code(file).includes("Date.now")).map(relative);
  assert.deepEqual(clock, ["components/LendingForm.tsx"]);
  assert.equal(
    code(path.join(PAGE_DIR, "components/LendingForm.tsx")).match(/Date\.now/g)?.length,
    1
  );
});
