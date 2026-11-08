import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import test from "node:test";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { stopTestProcess } from "../_helpers/stopTestProcess.ts";

function assertPeerStampedServerLaunch(source: string) {
  const file = ts.createSourceFile(
    "batch-e2e-rate-limit.test.ts",
    source,
    ts.ScriptTarget.Latest,
    true
  );
  const factory = file.statements.find(
    (node): node is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(node) && node.name?.text === "createServerProcess"
  );
  assert.ok(factory?.body, "the batch HTTP server factory must exist");
  const launches: ts.CallExpression[] = [];
  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "spawn"
    ) {
      launches.push(node);
    }
    ts.forEachChild(node, visit);
  }
  visit(factory.body);
  assert.equal(launches.length, 1, "the HTTP server factory must launch exactly one process");
  const [executable, args, options] = launches[0].arguments;
  assert.equal(
    executable?.getText(file),
    "process.execPath",
    "the server must use the Node runtime"
  );
  assert.ok(args && ts.isArrayLiteralExpression(args), "the server arguments must be explicit");
  const command = args.elements
    .slice(-2)
    .map((node) => (ts.isStringLiteral(node) ? node.text : null));
  assert.deepEqual(
    command,
    ["scripts/dev/run-next.mjs", "dev"],
    "the server must stamp its loopback peer"
  );
  function property(object: ts.Expression | undefined, name: string) {
    if (!object || !ts.isObjectLiteralExpression(object)) return undefined;
    const found = object.properties.find(
      (node): node is ts.PropertyAssignment =>
        ts.isPropertyAssignment(node) &&
        (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) &&
        node.name.text === name
    );
    return found?.initializer;
  }
  const host = property(property(options, "env"), "HOST");
  assert.ok(host && ts.isStringLiteral(host), "the server host must be explicit");
  assert.equal(host.text, "127.0.0.1", "the HTTP fixture must remain loopback-only");
}

test("batch HTTP fixture uses the peer-stamping server entrypoint", () => {
  const source = readFileSync(
    new URL("../integration/batch-e2e-rate-limit.test.ts", import.meta.url),
    "utf8"
  );
  assertPeerStampedServerLaunch(source);
});

test("batch launch contract rejects wrong executable, entrypoint and host despite matching comments", () => {
  const valid = `function createServerProcess() {
    return spawn(process.execPath, ["--import", "./tests/_helpers/forkedTestWorkers.mjs", "scripts/dev/run-next.mjs", "dev"], { env: { HOST: "127.0.0.1" } });
  }`;
  assertPeerStampedServerLaunch(valid);
  const cases = [
    valid.replace("spawn(process.execPath", 'spawn("node"'),
    valid.replace('"scripts/dev/run-next.mjs"', '"scripts/dev/run-next-playwright.mjs"'),
    valid.replace('"dev"', '"start"'),
    valid.replace('HOST: "127.0.0.1"', 'HOST: "0.0.0.0"'),
  ];
  for (const candidate of cases) {
    assert.notEqual(candidate, valid, "the negative control must change the actual launch");
    assert.throws(
      () => assertPeerStampedServerLaunch(`/* ${valid} */\n${candidate}`),
      assert.AssertionError
    );
  }
});

test(
  "test server cleanup returns when the process already exited",
  { timeout: 15_000 },
  async () => {
    const child = spawn(process.execPath, ["-e", "process.exit(0)"]);
    await once(child, "exit");
    let timer: NodeJS.Timeout;
    try {
      await Promise.race([
        stopTestProcess(child, 20),
        new Promise((_, reject) => {
          timer = setTimeout(
            () => reject(new Error("cleanup waited for an exit that already happened")),
            500
          );
        }),
      ]);
    } finally {
      clearTimeout(timer!);
    }
  }
);

test("test server cleanup escalates when SIGTERM is ignored", { timeout: 15_000 }, async () => {
  const child = spawn(process.execPath, [
    "-e",
    'process.on("SIGTERM", () => {}); process.stdout.write("ready"); setInterval(() => {}, 1000);',
  ]);
  try {
    await once(child.stdout, "data");
    await stopTestProcess(child, 20);
    assert.equal(child.signalCode, "SIGKILL");
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, "exit");
      child.kill("SIGKILL");
      await exited;
    }
  }
});

test("test server cleanup waits for a graceful SIGTERM exit", { timeout: 15_000 }, async () => {
  const child = spawn(process.execPath, [
    "-e",
    'process.on("SIGTERM", () => process.exit(0)); process.stdout.write("ready"); setInterval(() => {}, 1000);',
  ]);
  try {
    await once(child.stdout, "data");
    await stopTestProcess(child);
    assert.equal(child.exitCode, 0);
  } finally {
    if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
  }
});
