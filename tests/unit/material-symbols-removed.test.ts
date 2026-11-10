import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// KEA-7886 F4 (Task 41): the cutover is over — the legacy shell, its UI_KIT_SHELL kill switch and
// the Material Symbols icon font are gone; every icon renders through <Icon> → Lucide.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

/** Files under `dirs` that contain `needle` (`grep -rl` exits 1 when nothing matches). */
function filesContaining(needle: string, dirs: string[], includes: string[]): string {
  try {
    return execFileSync(
      "grep",
      ["-rl", ...includes.map((glob) => `--include=${glob}`), needle, ...dirs],
      { cwd: ROOT }
    )
      .toString()
      .trim();
  } catch (error) {
    if ((error as { status?: number }).status === 1) return "";
    throw error;
  }
}

test("Material Symbols is gone: no import, no dependency, no ligature span, no null in ICON_MAP", () => {
  const css = read("src/app/globals.css");
  assert.doesNotMatch(css, /material-symbols/);
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.dependencies?.["material-symbols"], undefined);
  assert.equal(pkg.devDependencies?.["material-symbols"], undefined);
  assert.doesNotMatch(read("next.config.mjs"), /material-symbols/);
  const hits = filesContaining(
    "material-symbols-outlined",
    ["src", "public"],
    ["*.tsx", "*.ts", "*.css", "*.html"]
  );
  assert.equal(hits, "", `files still using the Material ligature:\n${hits}`);
  assert.doesNotMatch(read("src/shared/constants/iconMap.ts"), /:\s*null,/);
});

test("the legacy shell, its CSS hooks and the UI_KIT_SHELL flag are removed", () => {
  assert.ok(
    !fs.existsSync(path.join(ROOT, "src/shared/components/layouts/legacy")),
    "legacy shell removed"
  );
  assert.doesNotMatch(read("src/shared/constants/featureFlagDefinitions.ts"), /UI_KIT_SHELL/);
  assert.doesNotMatch(read("src/shared/utils/featureFlags.ts"), /UI_KIT_SHELL|isUiKitShellEnabled/);
  assert.doesNotMatch(read("src/app/(dashboard)/layout.tsx"), /isUiKitShellEnabled|shell=/);
  // The hand-rolled desktop column / mobile drawer hooks only the legacy shell rendered.
  assert.doesNotMatch(read("src/app/globals.css"), /\.dashboard-sidebar-(desktop|mobile)\b/);
  for (const locale of ["en", "pt-BR", "vi"]) {
    assert.doesNotMatch(
      read(`src/i18n/messages/${locale}.json`),
      /featureFlagUiKitShellDescription/,
      `${locale}.json drops the flag description`
    );
  }
});

test("no font is loaded from the Google Fonts CDN (#3695: unreachable in some regions)", () => {
  // Carried over from the deleted material-icons-self-hosted.test.ts: the guard is about the CDN,
  // not about Material — every font (the kit's Switzer included) stays self-hosted.
  for (const file of ["src/app/layout.tsx", "src/app/globals.css"]) {
    assert.doesNotMatch(
      read(file),
      /fonts\.(googleapis|gstatic)\.com/,
      `${file} must not load fonts from fonts.googleapis.com / fonts.gstatic.com`
    );
  }
});
