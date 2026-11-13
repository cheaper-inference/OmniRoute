// A leaf of a nested command group keeps the whole group path in its generated name, so
// `compression engine set` and `compression combos list` do not collapse into `compression set` and
// `compression list` (two headings with one name in the generated skill).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { parseCliRegistry } = await import("../../src/lib/agentSkills/cliRegistryParser.ts");

const FIXTURE = `
export function registerCompression(program) {
  const cmp = program.command("compression").description("Compression");
  cmp.command("status").description("Show status");
  const engine = cmp.command("engine").description("Engine");
  engine.command("set <name>").description("Set engine");
  engine.command("get").description("Get engine");
  const combos = cmp.command("combos").description("Combos");
  combos.command("list").description("List combos");
  const rules = cmp.command("rules").description("Rules");
  rules.command("list").description("List rules");
  const deep = rules.command("pack").description("Packs");
  deep.command("add").description("Add pack");
}
`;

function parseFixture(): string[] {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cli-groups-"));
  const cwd = process.cwd();
  fs.mkdirSync(path.join(dir, "bin", "cli", "commands"), { recursive: true });
  fs.writeFileSync(path.join(dir, "bin", "cli", "commands", "compression.mjs"), FIXTURE);
  try {
    process.chdir(dir);
    // The family list keeps duplicates; the `commands` Map would merge them silently.
    return [...parseCliRegistry().families.values()].flat().map((c: { name: string }) => c.name);
  } finally {
    process.chdir(cwd);
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("nested group leaves keep the full group path", () => {
  const names = parseFixture();
  for (const expected of [
    "compression status",
    "compression engine set <name>",
    "compression engine get",
    "compression combos list",
    "compression rules list",
    "compression rules pack add",
  ]) {
    assert.ok(names.includes(expected), `${expected} missing from ${names.join(" | ")}`);
  }
});

test("no two commands of one file share a name", () => {
  const names = parseFixture();
  assert.equal(new Set(names).size, names.length, names.join(" | "));
});

test("the real registry has no duplicate command names in any family", () => {
  const { families } = parseCliRegistry();
  for (const [family, list] of families) {
    const names = list.map((c: { name: string }) => c.name);
    const dups = names.filter((n: string, i: number) => names.indexOf(n) !== i);
    assert.deepEqual([...new Set(dups)], [], `${family} has duplicate command names`);
  }
});
