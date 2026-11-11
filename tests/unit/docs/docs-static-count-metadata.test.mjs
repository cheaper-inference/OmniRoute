import assert from "node:assert/strict";
import test from "node:test";
import {
  countCliToolRecords,
  countCliToolCategories,
  createStaticMetadataReader,
  readStaticCountMetadata,
} from "../../../scripts/check/lib/staticCountMetadata.mjs";

function reader(files) {
  return createStaticMetadataReader((file) => files[file]);
}

test("metadata follows named imports and array spreads without running handlers or unrelated imports", () => {
  const read = reader({
    "tools.ts":
      'import "must-not-execute"; import {extra as second} from "./extra"; const first={name:"one",scopes:["read:one"],handler: startNetwork()}; export const TOOLS=[first,...second] as const;',
    "extra.ts":
      'throw new Error("must never execute"); export const extra=[{name:"two",scopes:["read:two"],handler(){fetch("https://forbidden.invalid")}}];',
  });
  const records = read.records(read.reference("tools.ts", "TOOLS"));
  assert.deepEqual(
    records.map((record) => read.string(read.properties(record).get("name"))),
    ["one", "two"]
  );
  assert.deepEqual(
    records.flatMap((record) => read.list(read.properties(record).get("scopes")).map(read.string)),
    ["read:one", "read:two"]
  );
});

test("literal registry factory projects the actual return and parameter overrides", () => {
  const read = reader({
    "entry.ts":
      'import {build as create} from "./shared"; export const ENTRY=create({id:"x",alias:"alias-x",headers:loadNetwork()});',
    "shared.ts":
      'import "must-not-execute"; export function build(overrides: unknown) { return { format:"openai", ...overrides } as const; }',
  });
  const props = read.properties(read.reference("entry.ts", "ENTRY"));
  assert.equal(read.string(props.get("id")), "x");
  assert.equal(read.string(props.get("alias")), "alias-x");
  assert.equal(read.string(props.get("format")), "openai");
});

test("dynamic metadata and changed factory semantics fail closed", () => {
  for (const source of [
    "export const VALUE=build();",
    'export const VALUE={[runtimeKey]:"x"};',
    'export const VALUE={id:"x",id:"y"};',
    "export const VALUE={...unknown};",
    'export function build(x){ if(x) return x; return {}; } export const VALUE=build({id:"x"});',
    'export function build(x){run();return x;} export const VALUE=build({id:"x"});',
  ]) {
    const read = reader({ "entry.ts": source });
    assert.throws(
      () => read.properties(read.reference("entry.ts", "VALUE")),
      /COUNT_STATIC_METADATA/
    );
  }
  const read = reader({ "entry.ts": "export const VALUE={id:readId()};" });
  assert.throws(
    () => read.string(read.properties(read.reference("entry.ts", "VALUE")).get("id")),
    /COUNT_STATIC_METADATA/
  );
});

test("cycles, unknown imported metadata and syntax errors do not become partial counts", () => {
  for (const source of [
    "const first=second;const second=first;export const VALUE=first;",
    "export const VALUE={...VALUE};",
    'import {missing} from "./absent";export const VALUE=missing;',
    'export const VALUE={id:"unterminated};',
  ]) {
    const read = reader({ "entry.ts": source });
    assert.throws(
      () => read.properties(read.reference("entry.ts", "VALUE")),
      /COUNT_STATIC_METADATA/
    );
  }
  const read = reader({ "entry.ts": "export const VALUE=[...VALUE];" });
  assert.throws(() => read.list(read.reference("entry.ts", "VALUE")), /COUNT_STATIC_METADATA/);
});

test("the repository metadata produces nonempty counts without evaluating the registry", () => {
  const counts = readStaticCountMetadata(process.cwd());
  assert.equal(counts.cliTotal, counts.cliCode + counts.cliAgent);
  assert.ok(counts.cliTotal > 0 && counts.mcpTools > 0 && counts.mcpScopes > 0);
  assert.ok(Object.keys(counts.registry).length > 0);
  assert.ok(
    Object.values(counts.registry).every(
      (provider) => typeof provider.id === "string" && provider.id
    )
  );
});

test("CLI metadata rejects malformed syntax before counting recoverable declarations", () => {
  const malformed = 'export const CLI_TOOLS = { one: { category: "code" } ;';
  assert.throws(() => countCliToolRecords(malformed), /COUNT_FACTS_CLI_SYNTAX/);
  assert.throws(() => countCliToolCategories(malformed), /COUNT_FACTS_CLI_SYNTAX/);
});

for (const [specifier, target] of [
  ["./metadata.ts", "metadata.ts"],
  ["./metadata.mts", "metadata.mts"],
  ["./metadata.cts", "metadata.cts"],
  ["./metadata", "metadata.ts"],
  ["./metadata", "metadata/index.ts"],
  ["@/metadata", "src/metadata.ts"],
]) {
  test(`literal metadata resolves ${specifier} through ${target} without execution`, () => {
    const read = reader({
      "entry.ts": `import { VALUE } from "${specifier}"; export const ENTRY=VALUE;`,
      [target]: 'throw new Error("must not run"); export const VALUE={id:"verified"};',
    });
    const props = read.properties(read.reference("entry.ts", "ENTRY"));
    assert.equal(read.string(props.get("id")), "verified");
  });
}
