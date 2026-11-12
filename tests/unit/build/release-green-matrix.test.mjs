import assert from "node:assert/strict";
import test from "node:test";
import { dump as yamlDump } from "js-yaml";
import { hostedMatrixFromCi } from "../../../scripts/ci/release-green-matrix.mjs";

function job(script, count) {
  return {
    strategy: { matrix: { shard: Array.from({ length: count }, (_, i) => i + 1) } },
    steps: [
      {
        run: `npm run ${script}${script === "test:vitest:ui" ? ' -- --shard="$TEST_SHARD"' : ""}`,
        env: { TEST_SHARD: `\${{ matrix.shard }}/${count}` },
      },
    ],
  };
}

function ci(units = 12, integrations = 4, ui = 4) {
  const vitest =
    ui === 1 ? { steps: [{ run: "npm run test:vitest:ui" }] } : job("test:vitest:ui", ui);
  vitest.steps.unshift({ run: "npm run test:vitest" });
  return {
    jobs: {
      "test-unit": job("test:unit:ci:shard", units),
      "test-integration": job("test:integration:ci", integrations),
      "test-vitest": vitest,
    },
  };
}

for (const [units, integrations, ui] of [
  [8, 2, 1],
  [12, 4, 4],
  [16, 8, 4],
]) {
  test(`target CI determines the ${units}/${integrations}/${ui} hosted matrix`, () => {
    const { include } = hostedMatrixFromCi(yamlDump(ci(units, integrations, ui)));
    assert.equal(include.length, units + integrations + ui);
    for (const [prefix, script, count] of [
      ["unit", "test:unit:ci:shard", units],
      ["integration", "test:integration:ci", integrations],
      ["vitest", "test:vitest:ui", ui],
    ]) {
      const expected =
        prefix === "vitest" && count === 1
          ? [{ name: "vitest", script: "test:vitest", shard: "" }]
          : Array.from({ length: count }, (_, i) => ({
              name: `${prefix}-${i + 1}`,
              script,
              shard: `${i + 1}/${count}`,
            }));
      assert.deepEqual(
        include.filter((entry) => entry.name.startsWith(prefix)),
        expected
      );
    }
  });
}

const invalid = {
  "missing job": (doc) => {
    delete doc.jobs["test-unit"];
  },
  "missing command": (doc) => {
    doc.jobs["test-unit"].steps[0].run = "npm run arbitrary";
  },
  "alternative Vitest configuration": (doc) => {
    doc.jobs["test-vitest"].steps[1].run += " --config other.config.ts";
  },
  "unit test filter": (doc) => {
    doc.jobs["test-unit"].steps[0].run += " -- --test-name-pattern=subset";
  },
  "integration test paths": (doc) => {
    doc.jobs["test-integration"].steps[0].run += " -- tests/extra/*.test.ts";
  },
  "MCP test filter": (doc) => {
    doc.jobs["test-vitest"].steps[0].run += " -- --testNamePattern=subset";
  },
  "chained suite command": (doc) => {
    doc.jobs["test-unit"].steps[0].run += " && npm run unrelated-command";
  },
  "UI command without its shard option": (doc) => {
    doc.jobs["test-vitest"].steps[1].run = "npm run test:vitest:ui";
  },
  "duplicate shard": (doc) => {
    doc.jobs["test-unit"].strategy.matrix.shard[1] = 1;
  },
  "gapped shard": (doc) => {
    doc.jobs["test-unit"].strategy.matrix.shard[1] = 3;
  },
  "string shard": (doc) => {
    doc.jobs["test-unit"].strategy.matrix.shard[0] = "1";
  },
  "zero shard": (doc) => {
    doc.jobs["test-unit"].strategy.matrix.shard[0] = 0;
  },
  "expression matrix": (doc) => {
    doc.jobs["test-unit"].strategy.matrix = "${{ fromJSON(needs.prepare.outputs.matrix) }}";
  },
  "excluded shard": (doc) => {
    doc.jobs["test-unit"].strategy.matrix.exclude = [{ shard: 2 }];
  },
  "extra shard": (doc) => {
    doc.jobs["test-unit"].strategy.matrix.include = [{ shard: 13 }];
  },
  "extra matrix axis": (doc) => {
    doc.jobs["test-unit"].strategy.matrix.node = [22, 24];
  },
  "wrong denominator": (doc) => {
    doc.jobs["test-unit"].steps[0].env.TEST_SHARD = "${{ matrix.shard }}/8";
  },
  "missing denominator": (doc) => {
    delete doc.jobs["test-unit"].steps[0].env;
  },
  "denominator declared only by an unrelated step": (doc) => {
    delete doc.jobs["test-unit"].steps[0].env;
    doc.jobs["test-unit"].steps.push({
      run: "echo metadata",
      env: { TEST_SHARD: "${{ matrix.shard }}/12" },
    });
  },
  "inherited job shard declaration": (doc) => {
    doc.jobs["test-unit"].env = { TEST_SHARD: "1/12" };
  },
  "inherited workflow shard declaration": (doc) => {
    doc.env = { TEST_SHARD: "1/12" };
  },
  "literal shard declaration": (doc) => {
    doc.jobs["test-unit"].steps[0].env.TEST_SHARD = "1/12";
  },
  "one mismatched declaration": (doc) => {
    doc.jobs["test-unit"].steps.push({ env: { TEST_SHARD: "${{ matrix.shard }}/8" } });
  },
  "malformed Vitest strategy": (doc) => {
    doc.jobs["test-vitest"].strategy = {};
  },
  "missing MCP suite": (doc) => {
    doc.jobs["test-vitest"].steps.shift();
  },
  "missing UI suite": (doc) => {
    doc.jobs["test-vitest"].steps.pop();
  },
  "legacy job with shard declaration": (doc) => {
    delete doc.jobs["test-vitest"].strategy;
  },
};

for (const [name, mutate] of Object.entries(invalid)) {
  test(`refuses ${name}`, () => {
    const doc = ci();
    mutate(doc);
    assert.throws(() => hostedMatrixFromCi(yamlDump(doc)));
  });
}

test("legacy Vitest refuses an inherited shard declaration", () => {
  const doc = ci(8, 2, 1);
  doc.jobs["test-vitest"].env = { TEST_SHARD: "1/4" };
  assert.throws(() => hostedMatrixFromCi(yamlDump(doc)));
});

test("reporting options preserve selection for both Vitest layouts", () => {
  for (const ui of [1, 4]) {
    const doc = ci(12, 4, ui);
    const steps = doc.jobs["test-vitest"].steps;
    steps[0].run +=
      " -- --reporter=default --reporter=junit --outputFile.junit=trunk-junit/vitest-mcp.xml";
    steps[1].run += `${ui === 1 ? " --" : ""} --reporter=default --reporter=junit --outputFile.junit=trunk-junit/vitest-ui.xml`;
    assert.deepEqual(
      hostedMatrixFromCi(yamlDump(doc)),
      hostedMatrixFromCi(yamlDump(ci(12, 4, ui)))
    );
  }
});

test("legacy Vitest refuses a hidden shard selector", () => {
  const doc = ci(8, 2, 1);
  doc.jobs["test-vitest"].steps[1].run += ' -- --shard="$TEST_SHARD"';
  assert.throws(() => hostedMatrixFromCi(yamlDump(doc)));
});

test("refuses malformed YAML and more than 256 hosted jobs", () => {
  assert.throws(() => hostedMatrixFromCi("jobs: ["));
  assert.throws(() => hostedMatrixFromCi(yamlDump(ci(256, 4, 4))));
});

test("unrelated workflow commands never enter the emitted command allowlist", () => {
  const doc = ci();
  doc.jobs["test-unit"].steps.push({ run: "npm run unrelated-command" });
  doc.jobs.extra = { steps: [{ run: "npm run unrelated-command" }] };
  assert.deepEqual(hostedMatrixFromCi(yamlDump(doc)), hostedMatrixFromCi(yamlDump(ci())));
});
