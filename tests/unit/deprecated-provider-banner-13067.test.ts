/**
 * leftover banner must stay session-only: no localStorage/sessionStorage.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const bannerPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/providers/components/DeprecatedProviderBanner.tsx"
);
const pagePath = path.join(repoRoot, "src/app/(dashboard)/dashboard/providers/page.tsx");

test("banner file exists and never persists dismiss in web storage", () => {
  assert.ok(fs.existsSync(bannerPath), "DeprecatedProviderBanner.tsx must exist");
  const source = fs.readFileSync(bannerPath, "utf8");
  assert.equal(source.includes("localStorage"), false);
  assert.equal(source.includes("sessionStorage"), false);
  assert.equal(source.includes("../../providerPageHelpers"), false);
  assert.match(source, /fetch\(\s*"\/api\/providers\/deprecated"/);
  assert.match(source, /method:\s*"POST"/);
  assert.match(source, /credentials:\s*"same-origin"/);
});

test("providers page mounts the leftover banner", () => {
  const source = fs.readFileSync(pagePath, "utf8");
  assert.match(source, /DeprecatedProviderBanner/);
});

// Keep the banner extracted and mounted. Page line counts also change when unrelated
// controls, formatting or imports change, so they cannot prove this boundary.
function assertBannerBoundary(source: string) {
  const file = ts.createSourceFile(
    "page.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const imports = file.statements
    .filter(ts.isImportDeclaration)
    .filter(
      (node) =>
        ts.isStringLiteral(node.moduleSpecifier) &&
        node.moduleSpecifier.text === "./components/DeprecatedProviderBanner"
    );
  assert.equal(imports.length, 1, "the page must import the extracted banner exactly once");
  const name = imports[0].importClause?.name?.text;
  assert.ok(name, "the banner uses its default component export");
  const page = file.statements
    .filter(ts.isFunctionDeclaration)
    .find((node) => node.name?.text === "ProvidersPageContent");
  assert.ok(page?.body, "the providers page content must exist");
  const returned = page.body.statements.filter(ts.isReturnStatement).at(-1)?.expression;
  assert.ok(returned, "the providers page must return its content");
  let mounts = 0;
  const visit = (node: ts.Node) => {
    if (
      (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
      ts.isIdentifier(node.tagName) &&
      node.tagName.text === name
    )
      mounts++;
    ts.forEachChild(node, visit);
  };
  visit(returned);
  assert.equal(mounts, 1, "the returned page must mount the imported banner exactly once");
  const checkDelegation = (node: ts.Node) => {
    if (ts.isStringLiteralLike(node)) {
      assert.notEqual(
        node.text,
        "/api/providers/deprecated",
        "cleanup requests belong to the banner"
      );
    }
    ts.forEachChild(node, checkDelegation);
  };
  checkDelegation(file);
}

test("providers page delegates cleanup to one mounted banner", () => {
  assertBannerBoundary(fs.readFileSync(pagePath, "utf8"));
});

const boundaryFixture = `
  import Banner from "./components/DeprecatedProviderBanner";
  function ProvidersPageContent() { return <main><Banner /></main>; }
`;

test("banner boundary accepts unrelated lines and an aliased import", () => {
  assertBannerBoundary(`// unrelated page change\n${boundaryFixture}\nconst unrelated = true;\n`);
});

for (const [name, source] of [
  [
    "missing import",
    boundaryFixture.replace('import Banner from "./components/DeprecatedProviderBanner";', ""),
  ],
  ["comment pretending to mount", boundaryFixture.replace("<Banner />", "{/* <Banner /> */}")],
  ["duplicate mount", boundaryFixture.replace("<Banner />", "<Banner /><Banner />")],
  [
    "wrong component import",
    boundaryFixture.replace("./components/DeprecatedProviderBanner", "./components/OtherBanner"),
  ],
  [
    "inlined cleanup request",
    `${boundaryFixture} const request = fetch("/api/providers/deprecated");`,
  ],
]) {
  test(`banner boundary rejects ${name}`, () => {
    assert.throws(() => assertBannerBoundary(source));
  });
}

test("purge surfaces notify.error when POST is not ok", () => {
  const source = fs.readFileSync(bannerPath, "utf8");
  assert.match(source, /useNotificationStore/);
  assert.match(source, /notify\.error\(/);
  const purgeIdx = source.indexOf("async function purge");
  assert.ok(purgeIdx >= 0, "purge helper must exist");
  const purgeBody = source.slice(purgeIdx);
  const okIdx = purgeBody.indexOf("if (res.ok)");
  const errIdx = purgeBody.indexOf("notify.error(");
  assert.ok(okIdx >= 0, "purge must branch on res.ok");
  assert.ok(errIdx > okIdx, "failed POST must notify after the ok branch");
});

test("purge surfaces notify.success when POST is ok", () => {
  const source = fs.readFileSync(bannerPath, "utf8");
  const purgeIdx = source.indexOf("async function purge");
  assert.ok(purgeIdx >= 0, "purge helper must exist");
  const purgeBody = source.slice(purgeIdx);
  const okIdx = purgeBody.indexOf("if (res.ok)");
  const successIdx = purgeBody.indexOf("notify.success(");
  assert.ok(okIdx >= 0, "purge must branch on res.ok");
  assert.ok(successIdx > okIdx, "successful POST must notify.success in the ok branch");
});

test("banner leftover type comes from the classifier module", () => {
  const source = fs.readFileSync(bannerPath, "utf8");
  assert.match(source, /DeprecatedProviderLeftoverGroup/);
  assert.match(source, /from\s+["']@\/lib\/providers\/deprecatedProviderCleanup["']/);
  assert.equal(source.includes("type LeftoverGroup = {"), false);
});
