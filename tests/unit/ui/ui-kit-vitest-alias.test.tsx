// #18079: vitest maps `@omniroute/ui-kit` by prefix to packages/ui-kit/src, which is right for
// the source subpaths the app imports (`@omniroute/ui-kit/button`) but wrong for the package
// exports whose file name differs (`./styles.css` → `./src/ci-styles.css`). Every export
// declared in packages/ui-kit/package.json must resolve under vitest.
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "packages/ui-kit/package.json"), "utf8")
) as { exports: Record<string, string> };

describe("@omniroute/ui-kit package exports under vitest", () => {
  // "." is the barrel every kit test already imports; the subpath exports are what the prefix
  // alias could get wrong.
  const subpaths = Object.keys(pkg.exports).filter((subpath) => subpath !== ".");

  it("the package still declares subpath exports", () => {
    expect(subpaths).toEqual(expect.arrayContaining(["./styles.css", "./tokens.css", "./brand"]));
  });

  for (const subpath of subpaths) {
    const specifier = `@omniroute/ui-kit/${subpath.slice(2)}`;
    it(`resolves ${specifier}`, async () => {
      await expect(import(/* @vite-ignore */ specifier)).resolves.toBeDefined();
    });
  }
});
