import assert from "node:assert/strict";
import test from "node:test";
import {
  projectChatModelCounts,
  readChatModelCountSnapshot,
} from "../../../scripts/check/lib/staticChatModelMetadata.mjs";

const entry = "open-sse/config/providers/index.ts";
const project = (files) =>
  projectChatModelCounts((file) => (Object.hasOwn(files, file) ? files[file] : undefined));

test("static producer derives changing chat IDs without importing source or counting image catalogs", () => {
  const source = `export const REGISTRY = {
    first: { id: "first", alias:"a", models:[{id:"shared"},{id:"x"},{id:"x"}], imageModels: unknownImages() },
    ignored: { id:"other",alias:"a",models:[{id:"ignored"}] },
    second: { id:"second",models:[{id:"shared"},{id:"z"}] },
    imageOnly: {id:"image-only",imageModels:[{id:"not-chat"}]}
  };`;
  assert.deepEqual(project({ [entry]: source }), {
    chatNamespaces: 2,
    distinctProviderModelPairs: 4,
    uniqueRawModelIds: 3,
  });
  const changed = source.replace('{id:"z"}', '{id:"new-z"},{id:"added"}');
  assert.deepEqual(project({ [entry]: changed }), {
    chatNamespaces: 2,
    distinctProviderModelPairs: 5,
    uniqueRawModelIds: 4,
  });
});

test("reviewed buildModels supports future literal catalog edits without whole-file hash pins", () => {
  const shared = "open-sse/config/providers/shared.ts";
  const sources = {
    [shared]: "export const buildModels = (ids) => ids.map(id => ({id, name:id}));",
    [entry]:
      'import {buildModels} from "./shared.ts"; export const REGISTRY={a:{id:"a",models:buildModels(["one","two","one"])}};',
  };
  assert.equal(project(sources).uniqueRawModelIds, 2);
  sources[entry] = sources[entry].replace('"two"', '"two","three"');
  sources[shared] += "\n// A harmless source comment is not a catalog baseline.\n";
  assert.equal(project(sources).uniqueRawModelIds, 3);
});

test("Text and Search model projection excludes Image while modeling explicit filters and maps", () => {
  const source = `const catalog=Object.freeze([{id:"t",category:"Text"},{id:"i",category:"Image"},{id:"s",category:"Search"}]);
    const chat=catalog.filter(m=>m.category==="Text"||m.category==="Search");
    export const REGISTRY={one:{id:"one",models:chat.map(m=>({id:m.id}))}};`;
  assert.deepEqual(project({ [entry]: source }), {
    chatNamespaces: 1,
    distinctProviderModelPairs: 2,
    uniqueRawModelIds: 2,
  });
});

test("unknown factories dynamic environment getters mutation and async stay unavailable", () => {
  for (const source of [
    'const unknown=()=>[{id:"x"}]; export const REGISTRY={x:{id:"x",models:unknown()}};',
    'export const REGISTRY={x:{id:"x",models:[{id:process.env.MODEL}]}};',
    'export const REGISTRY={x:{id:"x",models:[{get id(){return "x";}}]}};',
    'export const REGISTRY={x:{id:"x",models:[{id:"x"}].map(m=>{m.id="changed";return m;})}};',
    'export const REGISTRY={x:{id:"x",models:[{id:"x"}].map(async m=>m)}};',
  ])
    assert.throws(() => project({ [entry]: source }));
});

function sourceIo(files, symlink) {
  const prefix = "/fixture/";
  const get = (file) => files[String(file).slice(prefix.length)];
  return {
    lstatSync(file) {
      const present =
        get(file) !== undefined ||
        Object.keys(files).some((name) => (prefix + name).startsWith(String(file) + "/"));
      if (!present) throw Object.assign(new Error("missing"), { code: "ENOENT" });
      return { isSymbolicLink: () => String(file) === prefix + symlink };
    },
    statSync(file) {
      return { isFile: () => get(file) !== undefined, size: Buffer.byteLength(get(file) ?? "") };
    },
    readFileSync(file) {
      assert.notEqual(get(file), undefined);
      return Buffer.from(get(file));
    },
  };
}

test("fingerprint records exact traversed model sources and changes with imported catalog content", () => {
  const catalog = "open-sse/config/providers/catalog.ts";
  const files = {
    [entry]:
      'import {MODELS} from "./catalog.ts"; export const REGISTRY={a:{id:"a",models:MODELS}};',
    [catalog]: 'export const MODELS=[{id:"x"}];',
  };
  const first = readChatModelCountSnapshot("/fixture", { io: sourceIo(files) });
  files[catalog] += "\n// source version changed\n";
  const next = readChatModelCountSnapshot("/fixture", { io: sourceIo(files) });
  assert.deepEqual(first.facts, next.facts);
  assert.notDeepEqual(first.sources, next.sources);
  assert.deepEqual(first.sources.map((row) => row.path).sort(), [catalog, entry].sort());
  assert.throws(
    () => readChatModelCountSnapshot("/fixture", { io: sourceIo(files, catalog) }),
    /SOURCE_SYMLINK/
  );
});

test("a new unreviewed source module is rejected instead of returning partial model counts", () => {
  const files = {
    [entry]:
      'import {MODELS} from "../../services/unreviewed.ts"; export const REGISTRY={a:{id:"a",models:MODELS}};',
  };
  assert.throws(
    () => readChatModelCountSnapshot("/fixture", { io: sourceIo(files) }),
    /SOURCE_SCOPE/
  );
});

test("M365 model keys are counted without evaluating profiles or importing protocol code", () => {
  const catalog = "open-sse/executors/m365Protocol/profile.ts";
  const files = {
    [entry]: `import { M365_DOCUMENTED_MODELS } from "../../executors/m365Protocol/profile.ts";
      export const REGISTRY = { m365: { id: "copilot-m365-web", models: [
        { id: "legacy" }, ...Object.keys(M365_DOCUMENTED_MODELS).map(id => ({ id }))
      ] } };`,
    [catalog]: `import { protocol } from "../unreviewed-protocol.ts";
      const included = () => { throw new Error("profiles must not execute"); };
      export const M365_DOCUMENTED_MODELS = Object.freeze({
        auto: included("Magic"), "think-deeper": protocol()
      });`,
  };
  const snapshot = readChatModelCountSnapshot("/fixture", { io: sourceIo(files) });
  assert.deepEqual(snapshot.facts, {
    chatNamespaces: 1,
    distinctProviderModelPairs: 3,
    uniqueRawModelIds: 3,
  });
  assert.deepEqual(snapshot.sources.map((row) => row.path).sort(), [catalog, entry].sort());
  files[catalog] = files[catalog].replace(
    "auto: included",
    '"new-route": protocol(), auto: included'
  );
  assert.equal(
    readChatModelCountSnapshot("/fixture", { io: sourceIo(files) }).facts.uniqueRawModelIds,
    4
  );
});

test("reviewing the M365 profile does not allow adjacent executor modules", () => {
  const files = {
    [entry]: `import { MODELS } from "../../executors/m365Protocol/unreviewed.ts";
      export const REGISTRY = { m365: { id: "copilot-m365-web", models: MODELS } };`,
    "open-sse/executors/m365Protocol/unreviewed.ts": 'export const MODELS = [{ id: "x" }];',
  };
  assert.throws(
    () => readChatModelCountSnapshot("/fixture", { io: sourceIo(files) }),
    /SOURCE_SCOPE/
  );
});
