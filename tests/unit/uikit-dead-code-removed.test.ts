import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// KEA-7886 F5-A: dead code left behind by the UI kit migration, removed on the owner's call
// (pendencias-qa P2, P10). The guard keeps the files from coming back and keeps any re-added
// import from silently resurrecting them.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules") walk(p, out);
    } else if (/\.(tsx?|jsx?|mjs|cjs)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const SOURCES = ["src", "open-sse", "electron", "bin"].flatMap((d) => walk(path.join(ROOT, d)));

function referencing(re: RegExp): string[] {
  return SOURCES.filter((f) => re.test(fs.readFileSync(f, "utf8"))).map((f) =>
    path.relative(ROOT, f)
  );
}

test("P2: the orphan settings MitmProxyTab stays deleted (live screen is /dashboard/system/mitm-proxy)", () => {
  const file = "src/app/(dashboard)/dashboard/settings/components/MitmProxyTab.tsx";
  assert.equal(fs.existsSync(path.join(ROOT, file)), false, `${file} must not come back`);
  assert.deepEqual(referencing(/settings\/components\/MitmProxyTab|\bMitmProxyTab\b/), []);
});

test("P10: the orphan AuthLayout stays deleted and out of the layouts barrel", () => {
  const file = "src/shared/components/layouts/AuthLayout.tsx";
  assert.equal(fs.existsSync(path.join(ROOT, file)), false, `${file} must not come back`);
  assert.deepEqual(referencing(/\bAuthLayout\b/), []);
});

test("P10: MODEL_COLORS / getModelColor stay out of src/shared/constants/colors.ts", () => {
  const colors = fs.readFileSync(path.join(ROOT, "src/shared/constants/colors.ts"), "utf8");
  assert.doesNotMatch(colors, /MODEL_COLORS|getModelColor/);
  assert.deepEqual(referencing(/\b(MODEL_COLORS|getModelColor)\b/), []);
});

// Kit `number-input` adoption: the five hand-rolled `NumberField`s of the settings screens
// (ResilienceFields, ModelLockoutCard and the three Modality Bridge tabs) wrapped
// `<Input type="number">`, with the unit in a loose <span>. The shared `NumberInput` adapter
// (kit NumberInput inside the kit Field) replaces them.
test("number-input: settings keeps no hand-rolled NumberField", () => {
  const settingsDir = path.join("src", "app", "(dashboard)", "dashboard", "settings") + path.sep;
  const offenders = SOURCES.filter(
    (f) =>
      path.relative(ROOT, f).startsWith(settingsDir) &&
      /\bNumberField\b/.test(fs.readFileSync(f, "utf8"))
  ).map((f) => path.relative(ROOT, f));
  assert.deepEqual(offenders, []);
  assert.equal(
    fs.existsSync(path.join(ROOT, "src/shared/components/NumberInput.tsx")),
    true,
    "the shared NumberInput adapter must exist"
  );
});
