import assert from "node:assert/strict";
import test from "node:test";

import { recolorMarkdown } from "../../scripts/docs/apply-readme-badge-colors.mjs";

test("recolors both README star badge paths without changing the paths or surrounding text", () => {
  for (const owner of ["cheaper-inference", "diegosouzapw"]) {
    const path = `github/stars/${owner}/OmniRoute`;
    const url = `https://img.shields.io/${path}`;
    const result = recolorMarkdown(`![Stars](${url}?style=social&other=keep%20spaces)`);

    assert.deepEqual(result, {
      text: `![Stars](${url}?style=flat&other=keep%20spaces&logo=github&logoColor=white&label=Stars&color=e5ac82&labelColor=20211c)`,
      changedLines: 1,
      found: [path],
    });
  }
});
