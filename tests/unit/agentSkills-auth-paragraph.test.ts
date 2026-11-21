// The generated Authentication paragraph must match the real auth rules: POST /api/auth/login
// returns a session cookie (not a token), management routes take that cookie or a manage-scoped
// Bearer key, and REQUIRE_API_KEY only gates the /v1 client API.
import test from "node:test";
import assert from "node:assert/strict";

const { buildSkillMarkdown } = await import("../../src/lib/agentSkills/generator.ts");
const { refreshCatalog } = await import("../../src/lib/agentSkills/catalog.ts");

function authSection(id: string): string {
  refreshCatalog();
  const body = buildSkillMarkdown(id, {
    openapi: { paths: new Map(), areas: new Map() },
    cliRegistry: { commands: new Map(), families: new Map() },
  }).body;
  const start = body.indexOf("## Authentication");
  return body.slice(start, body.indexOf("##", start + 5));
}

test("generated API skills do not claim login returns a token", () => {
  for (const id of ["omni-cache", "omni-providers", "omni-inference"]) {
    assert.ok(!/Obtain a token/i.test(authSection(id)), `${id} still says "Obtain a token"`);
  }
});

test("generated API skills state the cookie, the manage scope and the REQUIRE_API_KEY scope", () => {
  const section = authSection("omni-cache");
  assert.match(section, /session cookie/);
  assert.match(section, /`manage` scope/);
  assert.match(section, /`\/v1\/\*`.*`REQUIRE_API_KEY=true`/);
});
