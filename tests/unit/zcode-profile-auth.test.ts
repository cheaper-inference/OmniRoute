import test from "node:test";
import assert from "node:assert/strict";
import { chmod, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readZcodeIndividualCodingPlanApiKey } from "../../open-sse/executors/zcode/profileAuth.ts";

const syntheticKey = "profile-id.synthetic-secret";

async function makeConfig(
  options: { enabled?: boolean; baseURL?: string; apiKey?: string } = {}
): Promise<{ dir: string; path: string }> {
  const dir = await mkdtemp(join(tmpdir(), "zcode-profile-auth-"));
  const path = join(dir, "config.json");
  await writeFile(
    path,
    JSON.stringify({
      provider: {
        "builtin:zai-coding-plan": {
          enabled: options.enabled ?? true,
          kind: "anthropic",
          options: {
            apiKey: options.apiKey ?? syntheticKey,
            baseURL: options.baseURL ?? "https://api.z.ai/api/anthropic/v1",
          },
        },
      },
    }),
    { mode: 0o600 }
  );
  return { dir, path };
}

test("ZCode gateway auth resolves only the selected Individual Plan profile", async () => {
  const { dir, path } = await makeConfig();
  try {
    assert.equal(
      await readZcodeIndividualCodingPlanApiKey("account:zai-individual-coding-plan", path),
      syntheticKey
    );
    assert.equal(
      await readZcodeIndividualCodingPlanApiKey("builtin:zai-coding-plan", path),
      syntheticKey
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("ZCode gateway auth refuses Start Plan and unrelated profiles", async () => {
  const { dir, path } = await makeConfig();
  try {
    await assert.rejects(
      readZcodeIndividualCodingPlanApiKey("account:zai-start-plan", path),
      /only the explicitly selected Individual Plan/
    );
    await assert.rejects(
      readZcodeIndividualCodingPlanApiKey("custom:other", path),
      /only the explicitly selected Individual Plan/
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("ZCode gateway auth rejects disabled profiles and untrusted origins", async () => {
  const disabled = await makeConfig({ enabled: false });
  try {
    await assert.rejects(
      readZcodeIndividualCodingPlanApiKey("account:zai-individual-coding-plan", disabled.path),
      /profile is not enabled/
    );
  } finally {
    await rm(disabled.dir, { recursive: true, force: true });
  }

  const wrongOrigin = await makeConfig({ baseURL: "https://attacker.example/v1" });
  try {
    await assert.rejects(
      readZcodeIndividualCodingPlanApiKey("account:zai-individual-coding-plan", wrongOrigin.path),
      /unsupported API origin/
    );
  } finally {
    await rm(wrongOrigin.dir, { recursive: true, force: true });
  }

  const credentialInUrl = await makeConfig({ baseURL: "https://user:pass@api.z.ai/v1" });
  try {
    await assert.rejects(
      readZcodeIndividualCodingPlanApiKey(
        "account:zai-individual-coding-plan",
        credentialInUrl.path
      ),
      /unsupported API origin/
    );
  } finally {
    await rm(credentialInUrl.dir, { recursive: true, force: true });
  }

  const malformedKey = await makeConfig({ apiKey: "not-a-safe-credential\r\nX-Injected: yes" });
  try {
    await assert.rejects(
      readZcodeIndividualCodingPlanApiKey("account:zai-individual-coding-plan", malformedKey.path),
      /no valid signed credential/
    );
  } finally {
    await rm(malformedKey.dir, { recursive: true, force: true });
  }
});

test("ZCode gateway auth rejects group/world-readable credentials on Unix", async () => {
  if (process.platform === "win32") return;
  const { dir, path } = await makeConfig();
  try {
    await chmod(path, 0o640);
    await assert.rejects(
      readZcodeIndividualCodingPlanApiKey("account:zai-individual-coding-plan", path),
      /permissions are too broad/
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
