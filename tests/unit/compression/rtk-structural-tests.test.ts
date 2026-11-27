import { after, afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getEncoding } from "js-tiktoken";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";
import { loadRtkFilters } from "../../../open-sse/services/compression/engines/rtk/filterLoader.ts";
import { renderTestSummary } from "../../../open-sse/services/compression/engines/rtk/renderers/testGreen.ts";
import { closeCompressionWorkerPoolForTests } from "../../../open-sse/services/compression/compressionWorkerPool.ts";

const FIXTURES = path.join(import.meta.dirname, "fixtures", "rtk", "structural");
const fixture = (name: string) => fs.readFileSync(path.join(FIXTURES, name), "utf8");

const VITEST_GREEN = fixture("test-vitest-green.txt");
const VITEST_GREEN_ANSI = fixture("test-vitest-green-ansi.txt");
const VITEST_FAILURE_ANSI = fixture("test-vitest-failure-ansi.txt");
const JEST_GREEN = fixture("test-jest-green.txt");
const JEST_FAILURE = fixture("test-jest-failure-snapshot.txt");
const PYTEST_GREEN = fixture("test-pytest-green.txt");
const PYTEST_FAILURE = fixture("test-pytest-failure.txt");

const encoder = getEncoding("cl100k_base");
const tokens = (text: string): number => encoder.encode(text).length;

const ON = { enabled: true, applyToToolResults: true, enableRenderers: true };
const TECHNIQUE = "rtk-render:test-summary";
const ANSI_RE = /\u001b\[[0-9;]*[A-Za-z]/g;
const plain = (text: string) => text.replace(ANSI_RE, "");

type RunOptions = { flag?: boolean; config?: Record<string, unknown> };

function chatBody(output: string, command: string | null) {
  return {
    model: "gpt-test",
    messages: [
      { role: "user", content: "run the tests" },
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

/** One correlated shell tool call through the real engine. */
function run(text: string, command: string | null, options: RunOptions = {}) {
  const res = applyRtkCompression(chatBody(text, command), {
    config: { ...ON, ...(options.config ?? {}) },
    rtkStructuralRenderersEnabled: options.flag ?? true,
  });
  const messages = (res.body as { messages: Array<{ content: string }> }).messages;
  return {
    text: messages[2].content,
    compressed: res.compressed,
    techniques: res.stats?.techniquesUsed ?? [],
    rules: res.stats?.rulesApplied ?? [],
  };
}

/** Lines of `text` (ANSI stripped) that start with one of the given prefixes, trimmed. */
function linesStartingWith(text: string, prefixes: string[]): string[] {
  return plain(text)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => prefixes.some((prefix) => line.startsWith(prefix)));
}

function insertBefore(text: string, marker: string, extra: string): string {
  const at = text.indexOf(marker);
  assert.ok(at >= 0, `marker not found: ${marker}`);
  return text.slice(0, at) + extra + text.slice(at);
}

after(() => closeCompressionWorkerPoolForTests());
afterEach(() => loadRtkFilters({ refresh: true, customFiltersEnabled: false }));

describe("resumo verde mantém totais", () => {
  it("vitest: totais, skips, snapshots e duração sobrevivem; as linhas por arquivo saem", () => {
    const out = run(VITEST_GREEN, "vitest run");
    assert.ok(out.techniques.includes(TECHNIQUE), out.techniques.join(","));
    assert.ok(tokens(out.text) < tokens(VITEST_GREEN));
    const expected = linesStartingWith(VITEST_GREEN, [
      "Test Files",
      "Tests",
      "Snapshots",
      "Duration",
    ]);
    assert.equal(expected.length, 4);
    for (const line of expected) assert.ok(out.text.includes(line), line);
    assert.ok(out.text.includes("19 passed | 1 skipped (20)"));
    assert.ok(!out.text.includes("tests/unit/auth.test.ts"));
  });

  it("jest: suites, testes, snapshots e tempo sobrevivem", () => {
    const out = run(JEST_GREEN, "npx jest --ci");
    assert.ok(out.techniques.includes(TECHNIQUE), out.techniques.join(","));
    assert.ok(tokens(out.text) < tokens(JEST_GREEN));
    const expected = linesStartingWith(JEST_GREEN, [
      "Test Suites:",
      "Tests:",
      "Snapshots:",
      "Time:",
      "Ran all",
    ]);
    assert.equal(expected.length, 5);
    for (const line of expected) assert.ok(out.text.includes(line), line);
    assert.ok(!out.text.includes("PASS src/"));
  });

  it("pytest: a linha final e a coleta sobrevivem; os pontos de progresso saem", () => {
    const out = run(PYTEST_GREEN, "python -m pytest tests/");
    assert.ok(out.techniques.includes(TECHNIQUE), out.techniques.join(","));
    assert.ok(tokens(out.text) < tokens(PYTEST_GREEN));
    assert.ok(out.text.includes("collected 142 items"));
    assert.ok(out.text.includes("139 passed, 3 skipped in 3.21s"));
    assert.ok(!out.text.includes("tests/test_api.py"));
  });

  it("pytest -q (sem cabeçalho nem ===) é reconhecido", () => {
    const quiet = [
      ".................................                                        [ 50%]",
      "................................s.                                       [100%]",
      "",
      "66 passed, 1 skipped in 1.02s",
      "",
    ].join("\n");
    const out = run(quiet, "pytest -q");
    assert.ok(out.techniques.includes(TECHNIQUE), out.text);
    assert.ok(out.text.includes("66 passed, 1 skipped in 1.02s"));
  });

  it("aceita contagem zero de falhas no resumo (failed: 0)", () => {
    const withZero = JEST_GREEN.replace(
      "Tests:       97 passed, 97 total",
      "Tests:       0 failed, 97 passed, 97 total"
    );
    const out = run(withZero, "jest");
    assert.ok(out.techniques.includes(TECHNIQUE));
    assert.ok(out.text.includes("Tests:       0 failed, 97 passed, 97 total"));
  });

  it("um título de teste com a palavra Error não derruba o resumo verde", () => {
    const titled = VITEST_GREEN.replace(
      " ✓ tests/unit/auth.test.ts (4 tests) 10ms",
      " ✓ tests/unit/auth.test.ts > rejects with TypeError and FAIL-safe defaults (4 tests) 10ms"
    );
    assert.notEqual(titled, VITEST_GREEN);
    const out = run(titled, "vitest run");
    assert.ok(out.techniques.includes(TECHNIQUE), out.text);
  });

  it("ANSI: classifica sobre o texto sem ANSI e o resumo sai sem escapes", () => {
    const out = run(VITEST_GREEN_ANSI, "npx vitest run");
    assert.ok(out.techniques.includes(TECHNIQUE), out.text);
    assert.ok(!out.text.includes("\u001b"));
    for (const line of linesStartingWith(VITEST_GREEN, ["Test Files", "Tests", "Duration"])) {
      assert.ok(out.text.includes(line), line);
    }
  });

  it("CRLF: reconhece a saída e o resumo usa LF", () => {
    const out = run(VITEST_GREEN.replace(/\n/g, "\r\n"), "vitest run");
    assert.ok(out.techniques.includes(TECHNIQUE), out.text);
    assert.ok(!out.text.includes("\r"));
    assert.ok(out.text.includes("19 passed | 1 skipped (20)"));
  });

  it("nomeia as variações de comando do runner", () => {
    for (const [text, command] of [
      [VITEST_GREEN, "npx vitest run --reporter=default"],
      [VITEST_GREEN, "cd app && pnpm exec vitest run"],
      [JEST_GREEN, "yarn jest --ci"],
      [PYTEST_GREEN, "pytest tests/ -x"],
    ] as const) {
      assert.ok(run(text, command).techniques.includes(TECHNIQUE), command);
    }
  });

  it("script de pacote só entra quando a saída identifica o runner", () => {
    const viaScript = run(VITEST_GREEN, "npm test");
    assert.ok(viaScript.techniques.includes(TECHNIQUE), viaScript.text);
    const unknown = "TAP version 13\nok 1 - a\nok 2 - b\n1..2\n# tests 2\n# pass 2\n# fail 0\n";
    const legacy = run(unknown, "npm test", { flag: false });
    const withFlag = run(unknown, "npm test");
    assert.equal(withFlag.text, legacy.text);
    assert.ok(!withFlag.techniques.includes(TECHNIQUE));
  });
});

describe("execução mista mantém diagnóstico", () => {
  const failures: Array<[string, string, string]> = [
    ["vitest com ANSI, stack e resumo", VITEST_FAILURE_ANSI, "vitest run"],
    ["jest com snapshot e stack", JEST_FAILURE, "jest"],
    ["pytest com traceback", PYTEST_FAILURE, "pytest"],
  ];

  for (const [label, input, command] of failures) {
    it(`${label}: devolve a saída original inteira`, () => {
      const out = run(input, command);
      assert.equal(out.text, input);
      assert.equal(out.compressed, false);
      assert.ok(!out.techniques.includes(TECHNIQUE));
      assert.ok(!out.rules.some((rule) => rule.startsWith("rtk:render:")));
    });
  }

  it("a falha com ANSI não passa a um filtro destrutivo nem com a saída grande", () => {
    // A long failing run: the legacy filters would cut the middle of this output.
    const noisy = VITEST_FAILURE_ANSI.replace(
      "\n Test Files",
      `\n${Array.from({ length: 400 }, (_, i) => `     ${i + 1}| const row${i} = ${i};`).join("\n")}\n Test Files`
    );
    const out = run(noisy, "vitest run");
    assert.equal(out.text, noisy);
  });

  const inconclusive: Array<[string, string, string]> = [
    [
      "vitest: bloco stdout de teste entre as linhas",
      insertBefore(
        VITEST_GREEN,
        " ✓ tests/unit/cache.test.ts",
        "stdout | tests/unit/auth.test.ts > logs once\nWARN: legacy token path used\n\n"
      ),
      "vitest run",
    ],
    [
      "vitest: sem o resumo final",
      VITEST_GREEN.slice(0, VITEST_GREEN.indexOf(" Test Files")),
      "vitest run",
    ],
    [
      "vitest: arquivo marcado como falho no resumo",
      VITEST_GREEN.replace("19 passed | 1 skipped (20)", "1 failed | 18 passed | 1 skipped (20)"),
      "vitest run",
    ],
    [
      "vitest: contagem de arquivos do resumo não bate com as linhas",
      VITEST_GREEN.replace("19 passed | 1 skipped (20)", "17 passed | 1 skipped (18)"),
      "vitest run",
    ],
    [
      "vitest: linha de arquivo fora do padrão",
      insertBefore(VITEST_GREEN, "\n Test Files", "\n ❯ tests/unit/x.test.ts (2 tests | 1 failed)"),
      "vitest run",
    ],
    [
      "vitest: cobertura intercalada",
      insertBefore(
        VITEST_GREEN,
        " Test Files",
        " % Coverage report from v8\n-----|---------|----------\nAll files | 91.2 | 80.0\n\n"
      ),
      "vitest run --coverage",
    ],
    ["jest: sem o resumo final", JEST_GREEN.slice(0, JEST_GREEN.indexOf("Test Suites:")), "jest"],
    [
      "jest: console.warn de teste",
      insertBefore(
        JEST_GREEN,
        "PASS src/cache",
        "  console.warn\n    deprecated option in use\n\n      at Object.<anonymous> (src/auth/auth.test.ts:9:3)\n\n"
      ),
      "jest",
    ],
    [
      "jest: linhas PASS não batem com as suites do resumo",
      JEST_GREEN.replace("Test Suites: 20 passed, 20 total", "Test Suites: 12 passed, 12 total"),
      "jest",
    ],
    [
      "jest: um teste falho no resumo",
      JEST_GREEN.replace("97 passed, 97 total", "2 failed, 95 passed, 97 total"),
      "jest",
    ],
    [
      "pytest: seção de warnings",
      insertBefore(
        PYTEST_GREEN,
        "======================== 139 passed",
        "=============================== warnings summary ===============================\ntests/test_db.py::test_x\n  DeprecationWarning: use the new API\n\n"
      ),
      "pytest",
    ],
    [
      "pytest: um F na linha de progresso",
      PYTEST_GREEN.replace(
        "tests/test_api.py ....................",
        "tests/test_api.py ..........F........."
      ),
      "pytest",
    ],
    [
      "pytest: pontos não batem com os passados do resumo",
      PYTEST_GREEN.replace("139 passed, 3 skipped", "138 passed, 3 skipped"),
      "pytest",
    ],
    [
      "pytest: nenhum teste executado",
      "============================= test session starts ==============================\ncollected 0 items\n\n============================ no tests ran in 0.01s =============================\n",
      "pytest",
    ],
    [
      "execução com redesenho de terminal (cursor)",
      insertBefore(VITEST_GREEN, " Test Files", "\u001b[2K\u001b[1A\n"),
      "vitest run",
    ],
    ["formato de outro runner sob o comando", JEST_GREEN, "vitest run"],
  ];

  for (const [label, input, command] of inconclusive) {
    it(`${label}: formato inconclusivo devolve o original`, () => {
      const out = run(input, command);
      assert.equal(out.text, input);
      assert.ok(!out.techniques.includes(TECHNIQUE));
    });
  }

  it("linhas patológicas e longas ficam íntegras sem custo quadrático", () => {
    const hostile = [
      " ".repeat(15000) + "x",
      "✓ " + "a ".repeat(7000),
      "=".repeat(15000),
      "tests/a.py " + ".".repeat(15000),
      "[".repeat(15000),
      "Tests  " + "1 passed, ".repeat(1400),
    ];
    for (const type of ["test-vitest", "test-jest", "test-pytest"]) {
      for (const line of hostile) {
        const input = Array.from({ length: 40 }, () => line).join("\n");
        const started = performance.now();
        const result = renderTestSummary(input, {
          type,
          command: null,
          confidence: 1,
          category: "test",
          matchedPatterns: [],
        });
        assert.equal(result.changed, false);
        assert.equal(result.text, input);
        assert.ok(performance.now() - started < 500, `${type}: ${line.slice(0, 12)}`);
      }
    }
  });

  it("renderTestSummary recusa direto (changed: false) o que não prova sucesso", () => {
    for (const [, input] of failures.map(([l, i]) => [l, i])) {
      const result = renderTestSummary(input, {
        type: "test-vitest",
        command: "vitest run",
        confidence: 1,
        category: "test",
        matchedPatterns: [],
      });
      assert.equal(result.changed, false);
      assert.equal(result.text, input);
    }
  });
});

describe("portões do despacho para saída de testes", () => {
  it("flag desligada é idêntica ao legado", () => {
    for (const [input, command] of [
      [VITEST_GREEN, "vitest run"],
      [JEST_GREEN, "jest"],
      [PYTEST_GREEN, "pytest"],
    ] as const) {
      const off = run(input, command, { flag: false });
      assert.ok(!off.techniques.includes(TECHNIQUE));
      const on = run(input, command);
      assert.notEqual(on.text, off.text);
    }
  });

  it("respeita a lista de renderizadores", () => {
    const allowed = run(VITEST_GREEN, "vitest run", { config: { renderers: ["test-vitest"] } });
    assert.ok(allowed.techniques.includes(TECHNIQUE));
    const blocked = run(VITEST_GREEN, "vitest run", { config: { renderers: ["test-jest"] } });
    assert.ok(!blocked.techniques.includes(TECHNIQUE));
    assert.equal(blocked.text, run(VITEST_GREEN, "vitest run", { flag: false }).text);
  });

  it("sem comando correlacionado não adivinha o runner", () => {
    const out = run(VITEST_GREEN, null);
    assert.ok(!out.techniques.includes(TECHNIQUE));
  });

  it("uma segunda passagem sobre o resumo não muda nada", () => {
    const first = run(VITEST_GREEN, "vitest run");
    assert.ok(first.techniques.includes(TECHNIQUE));
    assert.equal(run(first.text, "vitest run").text, first.text);
  });

  it("entrada acima do teto de análise segue o RTK legado, com contador", () => {
    const many = Array.from(
      { length: 9000 },
      (_, i) => ` ✓ tests/unit/f${i}.test.ts (1 tests) 1ms`
    );
    const huge = `${many.join("\n")}\n\n Test Files  9000 passed (9000)\n      Tests  9000 passed (9000)\n   Duration  9s\n`;
    const out = run(huge, "vitest run");
    assert.ok(!out.techniques.includes(TECHNIQUE));
    assert.ok(out.rules.includes("rtk:structural:over-budget"), out.rules.join(","));
  });

  it("is_error: true fica intacto com as duas flags e o irmão verde é resumido", () => {
    const failedBlock = {
      type: "tool_result",
      tool_use_id: "toolu_1",
      is_error: true,
      content: VITEST_GREEN,
    };
    const okBlock = { type: "tool_result", tool_use_id: "toolu_2", content: VITEST_GREEN };
    const body = {
      messages: [
        { role: "user", content: "tests" },
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "toolu_1", name: "bash", input: { command: "vitest run" } },
            { type: "tool_use", id: "toolu_2", name: "bash", input: { command: "vitest run" } },
          ],
        },
        { role: "user", content: [failedBlock, okBlock] },
      ],
    };
    const res = applyRtkCompression(body, {
      config: ON,
      rtkStructuralRenderersEnabled: true,
    });
    const blocks = (res.body as { messages: Array<{ content: Array<Record<string, unknown>> }> })
      .messages[2].content;
    assert.deepEqual(blocks[0], failedBlock);
    assert.ok((blocks[1].content as string).includes("19 passed | 1 skipped (20)"));
    assert.ok((blocks[1].content as string).length < VITEST_GREEN.length);
  });
});
