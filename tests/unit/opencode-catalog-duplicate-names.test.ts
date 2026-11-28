import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * The same model served by two provider nodes resolves to the same display
 * name once the `owned_by/` prefix is stripped, so OpenCode's picker cannot
 * tell them apart. The generator must make colliding names unique while
 * leaving unique ones clean.
 */
describe("opencode config generator — duplicate display names", () => {
  function makeCatalogResponse(models: unknown[]): unknown {
    return { object: "list", data: models };
  }

  function stubFetchOnce(body: unknown, status = 200) {
    const original = globalThis.fetch;
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;
    return {
      restore: () => {
        globalThis.fetch = original;
      },
    };
  }

  async function generate(catalog: unknown[], configPath: string) {
    const stub = stubFetchOnce(makeCatalogResponse(catalog));
    try {
      const { generateOpencodeConfig } =
        await import("../../src/lib/cli-helper/config-generator/opencode.ts");
      const out = await generateOpencodeConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        configPath,
      });
      return JSON.parse(out);
    } finally {
      stub.restore();
    }
  }

  it("appends the provider node to colliding names, leaving unique names clean", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-dupnames-"));
    const configPath = path.join(tmpDir, "missing.json");
    try {
      const cfg = await generate(
        [
          { id: "alpha/shared-model", owned_by: "alpha", display_name: "alpha/Shared Model" },
          {
            id: "beta/shared-model",
            owned_by: "beta",
            display_name: "beta/Shared Model",
          },
          { id: "gamma/solo-model", owned_by: "gamma", display_name: "gamma/Solo Model" },
        ],
        configPath
      );
      const models = cfg.provider.omniroute.models;
      assert.strictEqual(models["alpha/shared-model"].name, "Shared Model (alpha)");
      assert.strictEqual(models["beta/shared-model"].name, "Shared Model (beta)");
      // Unique names are untouched.
      assert.strictEqual(models["gamma/solo-model"].name, "Solo Model");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("falls back to the full id when the node alone is still not unique", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-dupnames-"));
    const configPath = path.join(tmpDir, "missing.json");
    try {
      const cfg = await generate(
        [
          {
            id: "delta/group/variant-one",
            owned_by: "delta",
            display_name: "delta/Variant (free)",
          },
          {
            id: "delta/group/variant-two",
            owned_by: "delta",
            display_name: "delta/Variant (free)",
          },
        ],
        configPath
      );
      const models = cfg.provider.omniroute.models;
      const names = new Set([
        models["delta/group/variant-one"].name,
        models["delta/group/variant-two"].name,
      ]);
      assert.strictEqual(names.size, 2, "the two variants must get distinct names");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("keeps suffixed names unique against a unique entry that matches the suffix", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-dupnames-"));
    const configPath = path.join(tmpDir, "missing.json");
    try {
      const cfg = await generate(
        [
          { id: "alpha/shared-model", owned_by: "alpha", display_name: "alpha/Shared Model" },
          {
            id: "beta/shared-model",
            owned_by: "beta",
            display_name: "beta/Shared Model",
          },
          // Unique entry whose name already equals the node suffix of a
          // colliding entry above ("Shared Model (alpha)").
          { id: "gamma/bar", owned_by: "gamma", display_name: "gamma/Shared Model (alpha)" },
        ],
        configPath
      );
      const models = cfg.provider.omniroute.models;
      // The colliding alpha entry must not reuse "Shared Model (alpha)", which
      // the unique gamma entry already holds; it falls back to the full id.
      assert.strictEqual(models["alpha/shared-model"].name, "Shared Model (alpha/shared-model)");
      assert.strictEqual(models["beta/shared-model"].name, "Shared Model (beta)");
      assert.strictEqual(models["gamma/bar"].name, "Shared Model (alpha)");
      const names = new Set([
        models["alpha/shared-model"].name,
        models["beta/shared-model"].name,
        models["gamma/bar"].name,
      ]);
      assert.strictEqual(names.size, 3, "all three names must be distinct");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("advances past an occupied full-id fallback instead of looping forever", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-config-dupnames-"));
    const configPath = path.join(tmpDir, "missing.json");
    try {
      const cfg = await generate(
        [
          { id: "delta/a", owned_by: "delta", display_name: "delta/Shared" },
          { id: "delta/b", owned_by: "delta", display_name: "delta/Shared" },
          // Unique entry whose name already equals the full-id fallback of the
          // second duplicate ("Shared (delta/b)"). The old loop reassigned the
          // same occupied name forever and hung config generation.
          { id: "epsilon/c", owned_by: "epsilon", display_name: "epsilon/Shared (delta/b)" },
        ],
        configPath
      );
      const models = cfg.provider.omniroute.models;
      // First duplicate takes the node suffix; second must advance past the
      // occupied full-id candidate rather than reuse it.
      assert.strictEqual(models["delta/a"].name, "Shared (delta)");
      assert.strictEqual(models["delta/b"].name, "Shared (delta/b) (2)");
      assert.strictEqual(models["epsilon/c"].name, "Shared (delta/b)");
      const names = new Set([
        models["delta/a"].name,
        models["delta/b"].name,
        models["epsilon/c"].name,
      ]);
      assert.strictEqual(names.size, 3, "all three names must be distinct");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
