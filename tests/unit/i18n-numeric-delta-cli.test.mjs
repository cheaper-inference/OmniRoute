import assert from "node:assert/strict";
import { spawn, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { sectionHashes } from "../../scripts/i18n/run-translation.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const hash = (text) => createHash("sha256").update(text).digest("hex");

for (const mode of ["verified", "changed-target", "missing-source-snapshot"]) {
  test(`numeric translation CLI requires source and target provenance: ${mode}`, async () => {
    const artifacts = path.join(root, "_artifacts");
    mkdirSync(artifacts, { recursive: true });
    const dir = mkdtempSync(path.join(artifacts, "numeric-delta-cli-"));
    let calls = 0;
    const server = http.createServer((req, res) => {
      calls++;
      req.resume();
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({ choices: [{ message: { content: "376 provedores disponíveis." } }] })
      );
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
      const oldBody = "375 providers are available.";
      const oldSource = `# Fixture\n\n${oldBody}\n`;
      const source = oldSource.replace("375", "376");
      const mirror = "# Fixture (Português)\n\n---\n\n375 provedores disponíveis.\n";
      cpSync(path.join(root, "scripts/i18n"), path.join(dir, "scripts/i18n"), { recursive: true });
      mkdirSync(path.join(dir, "config"), { recursive: true });
      cpSync(path.join(root, "config/i18n.json"), path.join(dir, "config/i18n.json"));
      mkdirSync(path.join(dir, "docs/i18n/pt-BR"), { recursive: true });
      writeFileSync(path.join(dir, "README.md"), oldSource);
      execFileSync("git", ["init", "-q"], { cwd: dir });
      execFileSync("git", ["add", "README.md"], { cwd: dir });
      execFileSync(
        "git",
        [
          "-c",
          "user.name=Fixture",
          "-c",
          "user.email=fixture@example.com",
          "commit",
          "-qm",
          "test: source snapshot",
        ],
        { cwd: dir }
      );
      writeFileSync(path.join(dir, "README.md"), source);
      const target = path.join(dir, "docs/i18n/pt-BR/README.md");
      writeFileSync(target, mode === "changed-target" ? `${mirror}\nNota adicional.\n` : mirror);
      const oldHash = mode === "missing-source-snapshot" ? "a".repeat(64) : hash(oldSource);
      writeFileSync(
        path.join(dir, ".i18n-state.json"),
        JSON.stringify({
          sources: {
            "README.md": {
              source_hash: oldHash,
              locales: {
                "pt-BR": {
                  source_hash: oldHash,
                  target_hash: hash(mirror),
                  section_hashes: sectionHashes([oldBody]),
                  updated_at: new Date().toISOString(),
                },
              },
            },
          },
        })
      );
      const address = server.address();
      const result = await new Promise((resolve, reject) => {
        const child = spawn(
          process.execPath,
          ["scripts/i18n/run-translation.mjs", "--files=README.md", "--locale=pt-BR"],
          {
            cwd: dir,
            env: {
              ...process.env,
              OMNIROUTE_TRANSLATION_API_URL: `http://127.0.0.1:${address.port}/v1`,
              OMNIROUTE_TRANSLATION_API_KEY: "numeric-delta-test-fixture",
              OMNIROUTE_TRANSLATION_MODEL: "fixture",
              OMNIROUTE_TRANSLATION_FALLBACK_MODELS: "",
              OMNIROUTE_TRANSLATION_CONCURRENCY: "1",
            },
            stdio: ["ignore", "pipe", "pipe"],
          }
        );
        let output = "";
        child.stdout.on("data", (chunk) => {
          output += chunk;
        });
        child.stderr.on("data", (chunk) => {
          output += chunk;
        });
        const timeout = setTimeout(() => child.kill("SIGKILL"), 60_000);
        child.once("error", (error) => {
          clearTimeout(timeout);
          reject(error);
        });
        child.once("close", (code, signal) => {
          clearTimeout(timeout);
          resolve({ code, signal, output });
        });
      });
      assert.equal(result.signal, null, result.output);
      assert.equal(result.code, 0, result.output);
      assert.equal(calls, mode === "verified" ? 0 : 1);
      const translated = readFileSync(target, "utf8");
      assert.match(translated, /376 provedores disponíveis/);
      assert.doesNotMatch(translated, /375 provedores/);
      const state = JSON.parse(readFileSync(path.join(dir, ".i18n-state.json"), "utf8"));
      const record = state.sources["README.md"].locales["pt-BR"];
      assert.equal(record.source_hash, hash(source));
      assert.equal(record.target_hash, hash(translated));
    } finally {
      server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
