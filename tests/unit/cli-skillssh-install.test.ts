// `omniroute skills skillssh install <url>` must post the contract the install route
// validates: { name, description, source: "owner/repo", skillId, version? } — not { url }.
import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import {
  SkillsShSkillIdSchema,
  SkillsShSourceSchema,
  SkillsShVersionSchema,
} from "../../src/lib/skills/skillssh.ts";

// Mirrors skillsshInstallSchema in src/app/api/skills/skillssh/install/route.ts.
const routeContract = z.object({
  name: z.string().min(1).max(64),
  description: z.string().min(1).max(1024),
  source: SkillsShSourceSchema,
  skillId: SkillsShSkillIdSchema,
  version: SkillsShVersionSchema,
});

function makeResp(data: unknown, status = 200) {
  return {
    ok: status < 400,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
}

async function runInstall(input: string, response = makeResp({ success: true, id: "sk_1" })) {
  const calls: { url: string; body: unknown }[] = [];
  const origFetch = globalThis.fetch;
  const origWrite = process.stdout.write.bind(process.stdout);
  const origErr = process.stderr.write.bind(process.stderr);
  const origExit = process.exit;
  const out: string[] = [];
  const err: string[] = [];
  let exitCode: number | undefined;
  globalThis.fetch = ((url: unknown, init: { body?: string }) => {
    calls.push({ url: String(url), body: init?.body ? JSON.parse(init.body) : undefined });
    return Promise.resolve(response);
  }) as never;
  process.stdout.write = ((c: string) => (out.push(String(c)), true)) as never;
  process.stderr.write = ((c: string) => (err.push(String(c)), true)) as never;
  process.exit = ((code?: number) => {
    exitCode = code;
    throw new Error("exit");
  }) as never;
  try {
    const { runSkillsshInstall } = await import("../../bin/cli/commands/skills.mjs");
    await runSkillsshInstall(input, {}, { optsWithGlobals: () => ({}) } as never);
  } catch (e) {
    if ((e as Error).message !== "exit") throw e;
  } finally {
    globalThis.fetch = origFetch;
    process.stdout.write = origWrite;
    process.stderr.write = origErr;
    process.exit = origExit;
  }
  return { calls, out: out.join(""), err: err.join(""), exitCode };
}

for (const input of [
  "https://skills.sh/supabase/agent-skills/supabase-postgres-best-practices",
  "https://skills.sh/supabase/agent-skills/supabase-postgres-best-practices/?ref=x#top",
  "supabase/agent-skills/supabase-postgres-best-practices",
]) {
  test(`install posts the route contract for ${input}`, async () => {
    const { calls, out, exitCode } = await runInstall(input);
    assert.equal(exitCode, undefined);
    assert.equal(calls.length, 1);
    assert.match(calls[0].url, /\/api\/skills\/skillssh\/install$/);
    const parsed = routeContract.safeParse(calls[0].body);
    assert.ok(parsed.success, JSON.stringify(parsed.error?.issues));
    assert.equal(parsed.data.source, "supabase/agent-skills");
    assert.equal(parsed.data.skillId, "supabase-postgres-best-practices");
    assert.match(out, /Installed: /);
  });
}

for (const bad of [
  "",
  "not a skill",
  "https://example.com/supabase/agent-skills/x",
  "https://skills.sh/supabase/agent-skills",
  "supabase/../etc/passwd",
  "a/b/c/d",
  "supabase/agent-skills/bad id",
]) {
  test(`install rejects "${bad}" locally without calling the API`, async () => {
    const { calls, exitCode, err } = await runInstall(bad);
    assert.equal(calls.length, 0);
    assert.equal(exitCode, 1);
    assert.match(err, /skills\.sh/);
  });
}

test("install surfaces the server's error message and exits 1", async () => {
  const { exitCode, err } = await runInstall(
    "supabase/agent-skills/some-skill",
    makeResp({ error: "Active skills provider is not skills.sh." }, 409)
  );
  assert.equal(exitCode, 1);
  assert.match(err, /409/);
  assert.match(err, /Active skills provider is not skills\.sh/);
});
