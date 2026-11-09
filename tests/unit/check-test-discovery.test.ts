// TDD — gate 6A.1: check-test-discovery
// Todo arquivo *.test.ts|tsx / *.spec.ts|tsx do repo deve ser COLETADO por pelo menos
// um runner declarado (node --test globs, vitest includes, playwright testDir).
// Órfão novo → fail; entrada de baseline que deixou de ser órfã → fail (stale).
import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  globToRegExp,
  findOrphans,
  evaluateAgainstBaseline,
  findCollectorDrift,
  collectVitestFiles,
  parseVitestFileList,
} from "../../scripts/check/check-test-discovery.mjs";

test("globToRegExp: glob top-level NÃO casa subdiretório", () => {
  const re = globToRegExp("tests/unit/*.test.ts");
  assert.equal(re.test("tests/unit/foo.test.ts"), true);
  assert.equal(re.test("tests/unit/authz/routeGuard.test.ts"), false);
});

test("globToRegExp: glob recursivo ** casa subdiretórios em qualquer profundidade", () => {
  const re = globToRegExp("tests/unit/**/*.test.ts");
  assert.equal(re.test("tests/unit/authz/routeGuard.test.ts"), true);
  assert.equal(re.test("tests/unit/a/b/c.test.ts"), true);
  assert.equal(re.test("tests/e2e/foo.test.ts"), false);
});

test("globToRegExp: braces {ts,tsx} expandem alternativas", () => {
  const re = globToRegExp("src/**/*.test.{ts,tsx}");
  assert.equal(re.test("src/shared/components/Foo.test.tsx"), true);
  assert.equal(re.test("src/lib/bar.test.ts"), true);
  assert.equal(re.test("src/lib/bar.test.js"), false);
});

test("globToRegExp: * não atravessa separador de diretório", () => {
  const re = globToRegExp("tests/unit/*.test.ts");
  assert.equal(re.test("tests/unit/sub/deep.test.ts"), false);
});

test("findOrphans: arquivo em subdir é órfão sob glob top-level; coberto sob recursivo", () => {
  const files = ["tests/unit/top.test.ts", "tests/unit/authz/routeGuard.test.ts"];
  assert.deepEqual(findOrphans(files, ["tests/unit/*.test.ts"]), [
    "tests/unit/authz/routeGuard.test.ts",
  ]);
  assert.deepEqual(findOrphans(files, ["tests/unit/**/*.test.ts"]), []);
});

test("findOrphans: múltiplos collectors — basta UM casar", () => {
  const files = ["tests/unit/autoCombo/scoring.test.ts"];
  const globs = ["tests/unit/*.test.ts", "tests/unit/autoCombo/**/*.test.ts"];
  assert.deepEqual(findOrphans(files, globs), []);
});

test("findOrphans: exclude wins within its collector, but not over another runner", () => {
  const file = "tests/unit/ui/parked.test.tsx";
  const ui = { glob: "tests/unit/**/*.test.tsx", exclude: ["tests/unit/ui/**"] };
  assert.deepEqual(findOrphans([file], [ui]), [file]);
  assert.deepEqual(findOrphans([file], [ui, { glob: file, exclude: [] }]), []);
});

test("findOrphans: an empty actual collection cannot fall back to a matching glob", () => {
  const file = "src/app/(dashboard)/providers/__tests__/card.test.tsx";
  const collector = {
    glob: "src/app/(dashboard)/**/__tests__/**/*.test.tsx",
    collectedFiles: new Set<string>(),
  };
  assert.deepEqual(findOrphans([file], [collector]), [file]);
});

test("findOrphans: actual collection wins over a different glob interpretation", () => {
  const file = "src/app/(dashboard)/providers/__tests__/card.test.tsx";
  const collector = {
    glob: "src/app/\\(dashboard\\)/**/__tests__/**/*.test.tsx",
    collectedFiles: new Set([file]),
  };
  assert.deepEqual(findOrphans([file], [collector]), []);
});

test("findOrphans: a second actual runner may cover a file absent from the first", () => {
  const file = "tests/unit/ui/card.test.tsx";
  const glob = "tests/unit/**/*.test.tsx";
  assert.deepEqual(
    findOrphans(
      [file],
      [
        { glob, collectedFiles: new Set<string>() },
        { glob, collectedFiles: new Set([file]) },
      ]
    ),
    []
  );
});

test("findOrphans: malformed actual collection cannot silently use the glob", () => {
  assert.throws(
    () => findOrphans(["tests/unit/card.test.tsx"], [{ glob: "**/*", collectedFiles: null }]),
    /Actual collector files must be a Set/
  );
});

test("Vitest file-list validation rejects invalid reports and paths outside the checkout", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "discovery-report-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const checkout = path.join(root, "checkout");
  fs.mkdirSync(checkout);
  const file = path.join(checkout, "card.test.tsx");
  const outside = path.join(root, "outside.test.tsx");
  fs.writeFileSync(file, "");
  fs.writeFileSync(outside, "");
  assert.deepEqual(parseVitestFileList([], checkout), new Set());
  assert.deepEqual(parseVitestFileList([{ file }, { file }], checkout), new Set(["card.test.tsx"]));
  for (const invalid of [{}, null, [null], [file], [{}], [{ file: "card.test.tsx" }]]) {
    assert.throws(() => parseVitestFileList(invalid, checkout), /Invalid Vitest file-list/);
  }
  assert.throws(() => parseVitestFileList([{ file: outside }], checkout), /outside the checkout/);
  assert.throws(() => parseVitestFileList([{ file: checkout }], checkout), /non-file/);
  assert.throws(() =>
    parseVitestFileList([{ file: path.join(checkout, "missing.test.ts") }], checkout)
  );
});

test("actual Vitest listing preserves glob semantics and excludes without executing test files", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "discovery-vitest-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const dir = path.join(root, "src/app/(dashboard)/providers/__tests__");
  fs.mkdirSync(dir, { recursive: true });
  for (const name of ["card.test.tsx", "excluded.test.tsx"]) {
    fs.writeFileSync(path.join(dir, name), 'throw new Error("TEST_MODULE_MUST_NOT_EXECUTE");\n');
  }
  const config = (name: string, include: string, exclude: string[] = []) => {
    const file = `${name}.config.ts`;
    fs.writeFileSync(
      path.join(root, file),
      `export default ${JSON.stringify({ test: { include: [include], exclude } })};\n`
    );
    return file;
  };
  const file = "src/app/(dashboard)/providers/__tests__/card.test.tsx";
  const literal = "src/app/(dashboard)/**/__tests__/**/*.test.tsx";
  const empty = collectVitestFiles(config("unescaped", literal), root);
  assert.deepEqual(empty, new Set());
  assert.deepEqual(findOrphans([file], [{ glob: literal, collectedFiles: empty }]), [file]);
  const escaped = "src/app/\\(dashboard\\)/**/__tests__/**/*.test.tsx";
  const actual = collectVitestFiles(config("escaped", escaped, ["**/excluded.test.tsx"]), root);
  assert.deepEqual(actual, new Set([file]));
  assert.deepEqual(findOrphans([file], [{ glob: escaped, collectedFiles: actual }]), []);
  fs.writeFileSync(path.join(root, "broken.config.ts"), "export default { invalid syntax }");
  assert.throws(() => collectVitestFiles("broken.config.ts", root), /Vitest collection failed/);
});

test("evaluateAgainstBaseline: órfão novo é flagado; órfão congelado passa", () => {
  const { newOrphans, stale } = evaluateAgainstBaseline(
    ["tests/unit/novo/a.test.ts", "tests/unit/velho/b.test.ts"],
    ["tests/unit/velho/b.test.ts"]
  );
  assert.deepEqual(newOrphans, ["tests/unit/novo/a.test.ts"]);
  assert.deepEqual(stale, []);
});

test("evaluateAgainstBaseline: entrada congelada que deixou de ser órfã é STALE (remova)", () => {
  const { newOrphans, stale } = evaluateAgainstBaseline([], ["tests/unit/religado/c.test.ts"]);
  assert.deepEqual(newOrphans, []);
  assert.deepEqual(stale, ["tests/unit/religado/c.test.ts"]);
});

test("findCollectorDrift: glob declarado deve aparecer textualmente em TODAS as fontes dele", () => {
  const collectors = [
    { glob: "tests/unit/*.test.ts", sources: ["package.json", ".github/workflows/ci.yml"] },
  ];
  const contents = {
    "package.json": 'scripts: "node --test tests/unit/*.test.ts"',
    ".github/workflows/ci.yml": "run: node --test --test-shard=1/8 OUTRO_GLOB",
  };
  const drift = findCollectorDrift(collectors, contents);
  assert.equal(drift.length, 1);
  assert.match(drift[0], /ci\.yml/);
  assert.match(drift[0], /tests\/unit\/\*\.test\.ts/);
});

test("findCollectorDrift: sem drift quando o glob aparece em todas as fontes", () => {
  const collectors = [{ glob: "tests/unit/*.test.ts", sources: ["package.json"] }];
  const contents = { "package.json": '"test:unit": "node --test tests/unit/*.test.ts"' };
  assert.deepEqual(findCollectorDrift(collectors, contents), []);
});
