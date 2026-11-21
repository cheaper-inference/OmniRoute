// Every `omniroute ...` line in a fenced bash block of the hand-written part of these CLI skills must
// name a command and options the real commander tree knows. An agent copies these lines as written.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { createProgram } from "../../bin/cli/program.mjs";

const FILES = ["cli-providers", "cli-eval", "cli-serve"];
// Handled by bin/omniroute.mjs before commander runs, so they are not in the command tree.
const LAUNCHER = new Set(["reset-password", "reset-encrypted-columns"]);
const LAUNCHER_FLAGS = new Set(["--mcp", "--force"]);

// The slice of commander's Command that this test reads.
type Cmd = {
  name(): string;
  aliases(): string[];
  commands: Cmd[];
  options: Array<{ long?: string }>;
  registeredArguments: unknown[];
};

const program = createProgram() as unknown as Cmd;

function words(text: string): string[] {
  return [...text.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map((m) => m[1] ?? m[2] ?? m[3]);
}

function problems(args: string): string[] {
  const toks = words(args);
  const found: string[] = [];
  const chain: Cmd[] = [program]; // program, then each matched sub-command
  let i = 0;
  while (i < toks.length && !toks[i].startsWith("-")) {
    const last = chain[chain.length - 1];
    const sub = last.commands.find((c) => c.name() === toks[i] || c.aliases().includes(toks[i]));
    if (!sub) break;
    chain.push(sub);
    i++;
  }
  const cmd = chain[chain.length - 1];
  const path = chain
    .slice(1)
    .map((c) => c.name())
    .join(" ");
  const next = toks[i];
  if (next && !next.startsWith("-") && !LAUNCHER.has(next)) {
    const takesArgs =
      cmd !== program && (cmd.registeredArguments.length > 0 || !cmd.commands.length);
    if (!takesArgs) found.push(`unknown command "${next}" after "${path}"`);
  }
  const known = new Set<string>(["--help", "--version", ...LAUNCHER_FLAGS]);
  for (const c of chain) for (const o of c.options) if (o.long) known.add(o.long);
  for (const t of toks.slice(i)) {
    const flag = t.split("=")[0];
    if (t.startsWith("--") && !known.has(flag)) found.push(`unknown option ${flag} for "${path}"`);
  }
  return found;
}

for (const name of FILES) {
  test(`${name} skill only documents commands and options that exist`, () => {
    const full = fs.readFileSync(new URL(`../../skills/${name}/SKILL.md`, import.meta.url), "utf8");
    // Only the hand-written block: the generated half comes from the parser and is covered by its own tests.
    const start = full.indexOf("<!-- skill:custom-start -->");
    // slice(-1) would keep one character and check nothing, so a missing marker must fail here.
    assert.ok(start > 0, `${name} has no custom block`);
    const md = full.slice(start);
    const bad: string[] = [];
    for (const block of md.matchAll(/```(?:bash|sh|shell)\n([\s\S]*?)```/g)) {
      for (const line of block[1].replace(/\\\n\s*/g, " ").split("\n")) {
        for (const m of line.matchAll(/(?:^|[\s$(])omniroute\s+([^|;)#\n]*)/g)) {
          for (const p of problems(m[1].trim())) bad.push(`${line.trim().slice(0, 80)} => ${p}`);
        }
      }
    }
    assert.deepEqual(bad, []);
  });
}
