import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { ObsidianBackend } from "../../src/lib/memory/obsidianBackend.ts";
import { MemoryType } from "../../src/lib/memory/types.ts";

test("get, update and delete use the first Markdown note with a matching frontmatter ID", async () => {
  const vault = await fs.mkdtemp(path.join(os.tmpdir(), "obsidian-lookup-"));
  try {
    const backend = new ObsidianBackend(vault);
    const memory = await backend.create({
      apiKeyId: "test",
      sessionId: "test",
      type: MemoryType.FACTUAL,
      key: "a-note",
      content: "original",
      metadata: {},
    });
    const file = path.join(vault, "a-note.md");
    const original = (await fs.readFile(file, "utf8")).replace("---\n", "---\nkey: a-note\n");
    await fs.writeFile(file, original);
    await fs.writeFile(path.join(vault, "z-duplicate.md"), original);
    await fs.writeFile(path.join(vault, "0-ignore.txt"), original);
    await fs.writeFile(path.join(vault, "0-invalid.md"), `id: ${memory.id}\nno frontmatter`);
    assert.equal((await backend.get(memory.id))?.content.trim(), "original");
    assert.equal(await backend.update(memory.id, { content: "updated", key: "renamed" }), true);
    assert.equal((await backend.get(memory.id))?.content.trim(), "updated");
    assert.equal((await backend.get(memory.id))?.key, "renamed");
    assert.equal(await fs.readFile(path.join(vault, "z-duplicate.md"), "utf8"), original);
    assert.equal(await backend.delete(memory.id), true);
    await assert.rejects(fs.access(file));
    assert.equal((await backend.get(memory.id))?.content.trim(), "original");
    assert.equal(await backend.delete(memory.id), true);
    assert.equal(await backend.get(memory.id), null);
    assert.equal(await backend.update(memory.id, { content: "missing" }), false);
    assert.equal(await backend.delete(memory.id), false);
  } finally {
    await fs.rm(vault, { recursive: true, force: true });
  }
});
