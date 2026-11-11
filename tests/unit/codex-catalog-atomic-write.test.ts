/**
 * Publishing the Codex model catalog is atomic and idempotent: identical content causes no
 * write (mtime and inode stay), and a changed catalog is published through a sibling temp file
 * and rename, so an interrupted write leaves the old file whole and no temp file behind.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const { writeCodexModelCatalog, getCodexCatalogPath } =
  await import("../../src/lib/cliTools/codexModelCatalogWriter.ts");

const bundled = {
  models: [
    {
      slug: "gpt-5.5",
      display_name: "GPT-5.5",
      supported_reasoning_levels: [],
      support_verbosity: true,
      shell_type: "unified_exec",
      truncation_policy: { mode: "tokens", limit: 10000 },
      priority: 3,
      visibility: "list",
      supported_in_api: true,
      experimental_supported_tools: [],
      base_instructions: "bundled prompt",
      upgrade: null,
    },
  ],
};

const write = (codexDir: string, ids: string[]) =>
  writeCodexModelCatalog({
    codexDir,
    selectedModels: ids,
    listModels: async () => [],
    loadBundled: async () => bundled as never,
  });

async function tempDir() {
  return fs.mkdtemp(path.join(os.tmpdir(), "omniroute-codex-atomic-"));
}

test("identical content causes no write", async () => {
  const dir = await tempDir();
  try {
    const first = await write(dir, ["openai/a"]);
    assert.ok(first.catalogPath, first.warning);
    const file = getCodexCatalogPath(dir);
    const old = new Date(Date.now() - 60_000);
    await fs.utimes(file, old, old);
    const before = await fs.stat(file);

    const second = await write(dir, ["openai/a"]);
    assert.equal(second.catalogPath, file);
    const after = await fs.stat(file);
    assert.equal(after.mtimeMs, before.mtimeMs, "mtime must not move");
    assert.equal(after.ino, before.ino, "same file, not replaced");
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("changed content replaces the file and leaves no temp file", async () => {
  const dir = await tempDir();
  try {
    await write(dir, ["openai/a"]);
    const file = getCodexCatalogPath(dir);
    const before = await fs.readFile(file, "utf8");

    const result = await write(dir, ["openai/a", "openai/b"]);
    assert.ok(result.catalogPath, result.warning);
    const after = await fs.readFile(file, "utf8");
    assert.notEqual(after, before);
    assert.ok(JSON.parse(after).models.some((m: { slug: string }) => m.slug === "openai/b"));
    assert.deepEqual(await fs.readdir(dir), [path.basename(file)]);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("an interrupted publish keeps the old catalog whole and removes the temp file", async () => {
  const dir = await tempDir();
  try {
    await write(dir, ["openai/a"]);
    const file = getCodexCatalogPath(dir);
    const before = await fs.readFile(file, "utf8");

    // Interrupt after the temp file is written and before it replaces the catalog.
    const realRename = fs.rename;
    fs.rename = async () => {
      throw Object.assign(new Error("interrupted"), { code: "EIO" });
    };
    let result;
    try {
      result = await write(dir, ["openai/a", "openai/c"]);
    } finally {
      fs.rename = realRename;
    }

    assert.ok(result.warning, "publish failure is reported as a warning");
    assert.equal(await fs.readFile(file, "utf8"), before, "old catalog stays whole");
    assert.deepEqual(await fs.readdir(dir), [path.basename(file)], "no temp file left behind");
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});
