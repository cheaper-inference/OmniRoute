import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

test("Bedrock client contract accepts the SDK and concrete injected clients", (t) => {
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const source = ts.createSourceFile(
    "bedrock.ts",
    readFileSync(path.join(root, "open-sse/executors/bedrock.ts"), "utf8"),
    ts.ScriptTarget.Latest,
    true
  );
  // Check the production boundary without importing the executor's runtime graph
  // or issuing provider requests. An arbitrary send<T> promise rejects the
  // concrete outputs used by executor tests; also keep the SDK assignable.
  const contracts = source.statements.filter(
    (node) => ts.isInterfaceDeclaration(node) && node.name.text.startsWith("BedrockClient")
  );
  assert.ok(
    contracts.some(
      (node) => ts.isInterfaceDeclaration(node) && node.name.text === "BedrockClientLike"
    )
  );
  const printer = ts.createPrinter();
  const temporary = mkdtempSync(path.join(os.tmpdir(), "bedrock-client-contract-"));
  t.after(() => rmSync(temporary, { recursive: true, force: true }));
  const fixture = path.join(temporary, "contract.ts");
  writeFileSync(
    fixture,
    `import { BedrockRuntimeClient, ConverseCommand, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
${contracts.map((node) => printer.printNode(ts.EmitHint.Unspecified, node, source)).join("\n")}
function createClient(): BedrockClientLike { return new BedrockRuntimeClient({}); }
const stopReason: string = "end_turn";
const injected: BedrockClientLike = {
  send: async () => ({ output: { message: { content: [{ text: "hello" }] } }, stopReason })
};
const streaming: BedrockClientLike = {
  send: async () => ({ stream: (async function* () { yield { messageStop: { stopReason } }; })() })
};
void [createClient, injected, streaming];
`
  );
  const config = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
  assert.equal(config.error, undefined);
  const converted = ts.convertCompilerOptionsFromJson(config.config.compilerOptions, root);
  assert.equal(converted.errors.length, 0);
  const program = ts.createProgram([fixture], {
    ...converted.options,
    incremental: false,
    noEmit: true,
    types: [],
    paths: {
      "@aws-sdk/client-bedrock-runtime": [
        path.join(root, "node_modules/@aws-sdk/client-bedrock-runtime"),
      ],
    },
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    })
  );
});
