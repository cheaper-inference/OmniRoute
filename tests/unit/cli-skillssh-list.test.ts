// `omniroute skills skillssh list` reads GET /api/skills/skillssh, which answers
// { skills: [{ id, skillId, name, installs, source }] } — not { items }.
import test from "node:test";
import assert from "node:assert/strict";

const SKILLS = [
  {
    id: "supabase/agent-skills/supabase-postgres-best-practices",
    skillId: "supabase-postgres-best-practices",
    name: "supabase-postgres-best-practices",
    installs: 1200,
    source: "supabase/agent-skills",
  },
  { id: "acme/tools/pdf", skillId: "pdf", name: "pdf", installs: 7, source: "acme/tools" },
];

async function runList(output: string, response: unknown, status = 200) {
  const origFetch = globalThis.fetch;
  const origWrite = process.stdout.write.bind(process.stdout);
  const origErr = process.stderr.write.bind(process.stderr);
  const origExit = process.exit;
  const out: string[] = [];
  const err: string[] = [];
  let exitCode: number | undefined;
  globalThis.fetch = (() =>
    Promise.resolve({
      ok: status < 400,
      status,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      headers: new Headers(),
    })) as never;
  process.stdout.write = ((c: string) => (out.push(String(c)), true)) as never;
  process.stderr.write = ((c: string) => (err.push(String(c)), true)) as never;
  process.exit = ((code?: number) => {
    exitCode = code;
    throw new Error("exit");
  }) as never;
  try {
    const { runSkillsshList } = await import("../../bin/cli/commands/skills.mjs");
    await runSkillsshList({}, {
      optsWithGlobals: () => ({ output, quiet: output !== "table" }),
    } as never);
  } catch (e) {
    if ((e as Error).message !== "exit") throw e;
  } finally {
    globalThis.fetch = origFetch;
    process.stdout.write = origWrite;
    process.stderr.write = origErr;
    process.exit = origExit;
  }
  return { out: out.join(""), err: err.join(""), exitCode };
}

test("skillssh list emits the skills array, not the response envelope", async () => {
  const { out } = await runList("json", { skills: SKILLS });
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed), "expected an array of skills");
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].skillId, "supabase-postgres-best-practices");
});

test("skillssh list table shows the skills.sh columns", async () => {
  const { out } = await runList("table", { skills: SKILLS });
  assert.match(out, /supabase\/agent-skills/);
  assert.match(out, /1200/);
  assert.doesNotMatch(out, /Last Run/, "local-skill columns do not apply to skills.sh results");
});

test("skillssh list still accepts an { items } payload", async () => {
  const { out } = await runList("json", { items: SKILLS });
  assert.equal(JSON.parse(out).length, 2);
});

test("skillssh list surfaces the server error and exits 1", async () => {
  const { exitCode, err } = await runList("json", { error: "Unauthorized" }, 401);
  assert.equal(exitCode, 1);
  assert.match(err, /401/);
  assert.match(err, /Unauthorized/);
});
