import { after, afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getEncoding } from "js-tiktoken";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";
import { loadRtkFilters } from "../../../open-sse/services/compression/engines/rtk/filterLoader.ts";
import { STRUCTURAL_REGISTRY } from "../../../open-sse/services/compression/engines/rtk/renderers/index.ts";
import { renderJsonOutput } from "../../../open-sse/services/compression/engines/rtk/renderers/jsonOutput.ts";
import { detectCommandType } from "../../../open-sse/services/compression/engines/rtk/commandDetector.ts";

const FIXTURES = path.join(import.meta.dirname, "fixtures", "rtk", "structural");
// A .txt fixture on purpose: Prettier rewrites number lexemes in .json files (1.50 becomes 1.5,
// 1E+400 becomes 1e400), which would erase exactly the noncanonical spellings this test needs.
const INDENTED = fs.readFileSync(path.join(FIXTURES, "json-indented-lexemes.txt"), "utf8");

const encoder = getEncoding("cl100k_base");
const tokens = (text: string): number => encoder.encode(text).length;

const ON = { enabled: true, applyToToolResults: true, enableRenderers: true };
const TECHNIQUE = "rtk-render:json-compact";

type RunOptions = { flag?: boolean; config?: Record<string, unknown> };

function chatBody(output: string, command: string | null) {
  return {
    model: "gpt-test",
    messages: [
      { role: "user", content: "run it" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: {
              name: "bash",
              arguments: JSON.stringify(command === null ? {} : { command }),
            },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: output },
    ],
  };
}

function run(text: string, command: string | null = "jq .", options: RunOptions = {}) {
  const res = applyRtkCompression(chatBody(text, command), {
    config: { ...ON, ...(options.config ?? {}) },
    rtkStructuralRenderersEnabled: options.flag ?? true,
  });
  const messages = (res.body as { messages: Array<{ content: string }> }).messages;
  return {
    text: messages[2].content,
    techniques: res.stats?.techniquesUsed ?? [],
    rules: res.stats?.rulesApplied ?? [],
  };
}

/** Indented documents built in the test, so no large file is versioned. */
function indentedRecords(count: number, pad = 0): string {
  const rows = Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `item-${i}`,
    detail: { state: "ok", note: "x".repeat(pad) },
  }));
  return JSON.stringify(rows, null, 2);
}

const originalDataDir = process.env.DATA_DIR;
const originalRegistry = { ...STRUCTURAL_REGISTRY };
afterEach(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  for (const key of ["json-output", "aws"]) {
    if (originalRegistry[key]) STRUCTURAL_REGISTRY[key] = originalRegistry[key];
  }
  loadRtkFilters({ refresh: true, customFiltersEnabled: false });
});
after(() => loadRtkFilters({ refresh: true, customFiltersEnabled: false }));

describe("structural JSON compaction", () => {
  it("JSON reduz tokens e mantém todos os valores e lexemas", () => {
    const out = run(INDENTED);
    assert.ok(out.techniques.includes(TECHNIQUE), out.techniques.join(","));
    assert.ok(tokens(out.text) < tokens(INDENTED));
    assert.deepEqual(JSON.parse(out.text), JSON.parse(INDENTED));
    assert.ok(out.text.includes('"id":9007199254740993'));
    assert.ok(out.text.includes('"ratio":1.50'));
    assert.ok(out.text.includes('"tiny":-0.0'));
    assert.ok(out.text.includes('"huge":1E+400'));
    assert.ok(out.text.includes('"note":"a  b"'));
    assert.ok(out.text.includes('"path":"C:\\\\temp\\\\ "'));
    assert.ok(out.text.includes('"quoted":"she said \\"hi  there\\"  and left"'));
    assert.ok(out.text.includes('"unicode":"caf\\u00e9 \\ud83d\\ude00 \\u2028  end"'));
    assert.ok(out.text.includes('"emoji":"nao  muda 😀  tambem"'));
    assert.ok(out.text.includes('"key":1,"key":2'));
    assert.ok(out.text.includes('"empty":[],"emptyObject":{}'));
    assert.ok(out.text.includes('"tags":["x","y"]'));
    // order is the input order, not a sorted one
    assert.ok(out.text.indexOf('"zeta":"last"') < out.text.indexOf('"alpha":"first"'));
    // no whitespace left outside the strings: the text is one line
    assert.ok(!/[\n\r\t]/.test(out.text));
  });

  it("removes only the four JSON whitespace characters between tokens", () => {
    const input = '\u00a0 {\r\n\t"a" :\t[ 1 ,\r\n 2 ] }';
    // a leading no-break space is not JSON whitespace: the text is invalid and stays intact
    assert.equal(renderJsonOutput(input, detectCommandType(input, "jq .")).changed, false);
    const valid = '{\r\n\t"a" :\t[ 1 ,\r\n 2 ,"\u00a0  " ] }\r\n';
    const res = renderJsonOutput(valid, detectCommandType(valid, "jq ."));
    assert.equal(res.changed, true);
    assert.equal(res.text, '{"a":[1,2,"\u00a0  "]}');
  });

  it("an escaped backslash right before a closing quote does not hide the end of the string", () => {
    const input = '{ "a": "x\\\\" , "b": "y \\" z" , "c": 1 }';
    const res = renderJsonOutput(input, detectCommandType(input, "jq ."));
    assert.equal(res.text, '{"a":"x\\\\","b":"y \\" z","c":1}');
  });

  it("works for aws with a JSON output and for cat of a .json file", () => {
    const aws = run(INDENTED, "aws ec2 describe-instances --output json");
    assert.ok(aws.techniques.includes(TECHNIQUE), aws.techniques.join(","));
    const awsDefault = run(INDENTED, "aws s3api list-buckets");
    assert.ok(awsDefault.techniques.includes(TECHNIQUE));
    const cat = run(INDENTED, "cat data/report.json");
    assert.ok(cat.techniques.includes(TECHNIQUE));
    assert.equal(cat.text, aws.text);
  });

  it("aws with a text or table output stays on the legacy path", () => {
    const table = "-----------\n|  Buckets  |\n-----------\n|  a  |  b  |\n";
    for (const command of ["aws s3 ls --output text", "aws ec2 describe-vpcs --output=table"]) {
      assert.equal(run(table, command).text, run(table, command, { flag: false }).text);
      assert.ok(!run(table, command).techniques.includes(TECHNIQUE));
    }
    // even a JSON-looking text is not rewritten when the command says the output is not JSON
    const out = run(INDENTED, "aws ec2 describe-vpcs --output yaml");
    assert.ok(!out.techniques.includes(TECHNIQUE));
    assert.equal(
      out.text,
      run(INDENTED, "aws ec2 describe-vpcs --output yaml", { flag: false }).text
    );
  });

  it("JSON already compact comes back untouched", () => {
    const compact = JSON.stringify(JSON.parse(INDENTED));
    const out = run(compact);
    assert.equal(out.text, compact);
    assert.deepEqual(out.techniques, []);
    // a compact document with a lexeme that JSON.stringify would rewrite
    const lexeme = '{"id":9007199254740993,"ratio":1.50,"key":1,"key":2}';
    assert.equal(run(lexeme).text, lexeme);
  });

  it("JSON that is invalid comes back intact", () => {
    const documents = [
      '{\n  "a": [1, 2,\n  "b": 3\n}',
      '{\n  "a": 1,\n}',
      "[\n  1,\n  2\n",
      '{\n  "a": 1\n}\n{\n  "b": 2\n}\n',
      '{\n  "a": 01\n}',
      "{\n  'a': 1\n}",
      "[\n  1,\n  2\n] trailing words",
    ];
    for (const invalid of documents) {
      const out = run(invalid, "jq .");
      assert.equal(out.text, invalid, invalid);
      assert.deepEqual(out.techniques, []);
    }
  });

  it("does not run without a command that names a JSON producer", () => {
    const noCommand = run(INDENTED, null);
    assert.ok(!noCommand.techniques.includes(TECHNIQUE));
    assert.equal(noCommand.text, run(INDENTED, null, { flag: false }).text);
    const other = run(INDENTED, "kubectl get pods");
    assert.ok(!other.techniques.includes(TECHNIQUE));
  });

  it("a scalar or non-object top level is left to the legacy path", () => {
    for (const text of ['"just a string"', "12345", "true", "null"]) {
      const out = run(text, "jq .");
      assert.equal(out.text, run(text, "jq .", { flag: false }).text);
      assert.ok(!out.techniques.includes(TECHNIQUE));
    }
  });

  it("flag off keeps the legacy output byte for byte, flag on changes it", () => {
    const legacy = run(INDENTED, "jq .", { flag: false });
    const on = run(INDENTED, "jq .");
    assert.ok(!legacy.techniques.includes(TECHNIQUE));
    assert.notEqual(on.text, legacy.text);
  });

  it("with the renderers allowlist, JSON runs only when it is listed", () => {
    const blocked = run(INDENTED, "jq .", { config: { renderers: ["git-diff"] } });
    assert.ok(!blocked.techniques.includes(TECHNIQUE));
    assert.equal(
      blocked.text,
      run(INDENTED, "jq .", { flag: false, config: { renderers: ["git-diff"] } }).text
    );
    const listed = run(INDENTED, "jq .", { config: { renderers: ["json-output"] } });
    assert.ok(listed.techniques.includes(TECHNIQUE));
    const awsListed = run(INDENTED, "aws ec2 describe-vpcs", { config: { renderers: ["aws"] } });
    assert.ok(awsListed.techniques.includes(TECHNIQUE));
    const awsBlocked = run(INDENTED, "aws ec2 describe-vpcs", {
      config: { renderers: ["json-output"] },
    });
    assert.ok(!awsBlocked.techniques.includes(TECHNIQUE));
  });

  it("an array of objects keeps every column and row instead of the legacy table", () => {
    const records = indentedRecords(6);
    const legacy = run(records, "aws ec2 describe-instances", { flag: false });
    const on = run(records, "aws ec2 describe-instances");
    assert.ok(
      legacy.techniques.includes("rtk-render:structured-table"),
      legacy.techniques.join(",")
    );
    assert.ok(on.techniques.includes(TECHNIQUE));
    assert.deepEqual(JSON.parse(on.text), JSON.parse(records));
  });

  it("a compacted document that does not fit the RTK character limit is kept whole", () => {
    const records = indentedRecords(300);
    const out = run(records, "jq .");
    assert.equal(out.text, records);
    assert.deepEqual(out.techniques, []);
  });
});

describe("structural JSON analysis budget", () => {
  function countRenderer(key: string): { calls: () => number } {
    const original = STRUCTURAL_REGISTRY[key];
    let calls = 0;
    STRUCTURAL_REGISTRY[key] = (text, detection) => {
      calls++;
      return original(text, detection);
    };
    return { calls: () => calls };
  }

  it("JSON acima do teto usa o legado sem chamar o parser estrutural", () => {
    const counter = countRenderer("json-output");
    const byLines = indentedRecords(2500); // 8 lines per record: over 8192 lines
    assert.ok(byLines.split("\n").length > 8192);
    const oversized = run(byLines, "jq .");
    const oversizedLegacy = run(byLines, "jq .", { flag: false });
    assert.equal(oversized.text, oversizedLegacy.text);
    assert.ok(oversized.rules.includes("rtk:structural:over-budget"), oversized.rules.join(","));
    assert.ok(!oversized.techniques.includes(TECHNIQUE));
    assert.equal(counter.calls(), 0);
  });

  it("an input over 512 KiB, or with a line over 16 KiB, never reaches the renderer", () => {
    const counter = countRenderer("json-output");
    const heavy = JSON.stringify(
      Array.from({ length: 700 }, (_, i) => ({ id: i, pad: "y".repeat(1000) })),
      null,
      2
    );
    assert.ok(heavy.length > 512 * 1024);
    const wideLine = `{\n  "blob": "${"z".repeat(17 * 1024)}"\n}`;
    for (const text of [heavy, wideLine]) {
      const on = run(text, "jq .");
      assert.equal(on.text, run(text, "jq .", { flag: false }).text);
      assert.ok(on.rules.includes("rtk:structural:over-budget"));
    }
    assert.equal(counter.calls(), 0);
  });

  it("an oversized aws JSON also skips the renderer", () => {
    const counter = countRenderer("aws");
    const big = indentedRecords(2500);
    const on = run(big, "aws ec2 describe-instances --output json");
    assert.equal(
      on.text,
      run(big, "aws ec2 describe-instances --output json", { flag: false }).text
    );
    assert.equal(counter.calls(), 0);
  });

  it("a document inside the budget does reach the renderer once", () => {
    const counter = countRenderer("json-output");
    run(INDENTED, "jq .");
    assert.equal(counter.calls(), 1);
  });
});
