import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Command } from "commander";
import { registerBatches } from "../../bin/cli/commands/batches.mjs";
import { registerFiles } from "../../bin/cli/commands/files.mjs";
import { extendProvidersMetrics } from "../../bin/cli/commands/providers.mjs";

function findSubcommand(root: Command, path: string[]): Command {
  let current: Command | undefined = root;
  for (const segment of path) {
    current = current?.commands.find((c) => c.name() === segment);
    assert.ok(current, `Expected subcommand "${segment}" to exist`);
  }
  return current;
}

function buildProgramWithCapture(path: string[]) {
  const program = new Command();
  program.exitOverride();
  program.configureOutput({
    writeOut: () => {},
    writeErr: () => {},
  });

  const providers = program.command("providers");
  extendProvidersMetrics(providers);
  registerBatches(program);
  registerFiles(program);

  const target = findSubcommand(program, path);
  let capturedOpts: Record<string, unknown> | null = null;
  target.action((opts: Record<string, unknown>) => {
    capturedOpts = opts;
  });

  return {
    parse: async (extraArgs: string[]) => {
      capturedOpts = null;
      await program.parseAsync(["node", "omniroute", ...path, ...extraArgs]);
      return capturedOpts;
    },
  };
}

const TARGET_COMMANDS: Array<{
  label: string;
  path: string[];
  defaultLimit: number;
}> = [
  { label: "providers metrics", path: ["providers", "metrics"], defaultLimit: 50 },
  { label: "batches list", path: ["batches", "list"], defaultLimit: 50 },
  { label: "files list", path: ["files", "list"], defaultLimit: 100 },
];

describe("CLI --limit positive integer parsing regression", () => {
  for (const { label, path, defaultLimit } of TARGET_COMMANDS) {
    describe(label, () => {
      it(`uses default limit (${defaultLimit}) when --limit is omitted`, async () => {
        const { parse } = buildProgramWithCapture(path);
        const opts = await parse([]);
        assert.ok(opts);
        assert.equal(opts.limit, defaultLimit);
      });

      it("parses explicit valid positive integer --limit without radix corruption", async () => {
        const { parse } = buildProgramWithCapture(path);
        for (const [raw, expected] of [
          ["1", 1],
          ["10", 10],
          ["25", 25],
          ["250", 250],
          [String(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER],
        ] as const) {
          const opts = await parse(["--limit", raw]);
          assert.ok(opts);
          assert.equal(opts.limit, expected);
          assert.equal(Number.isNaN(opts.limit), false);
        }
      });

      it("rejects zero, negative, malformed, and unsafe integer --limit values", async () => {
        const { parse } = buildProgramWithCapture(path);
        const invalidValues = [
          "0",
          "00",
          "-1",
          "-50",
          "1.5",
          "10abc",
          "abc",
          "",
          "   ",
          "NaN",
          "Infinity",
          "1e5",
          "0x10",
          "9007199254740992",
          "99999999999999999999",
        ];

        for (const bad of invalidValues) {
          await assert.rejects(
            () => parse(["--limit", bad]),
            (err: unknown) => {
              assert.ok(err instanceof Error);
              assert.match(err.message, /positive integer/i);
              return true;
            },
            `Expected "${bad}" to be rejected for ${label}`
          );
        }
      });
    });
  }
});
