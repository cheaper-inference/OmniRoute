import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("the star invitation opens the repo directly without any GitHub API or tracking", async () => {
  const files = [
    "src/shared/components/StarInviteCard.tsx",
    "src/shared/constants/projectLinks.ts",
    "src/shared/hooks/useLocalDismissal.ts",
    "bin/cli/starHint.mjs",
  ];
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(
      source,
      /fetch\s*\(|api\.github\.com|stargazers|XMLHttpRequest|sendBeacon|octokit/i,
      file
    );
  }

  const { OMNIROUTE_REPO_URL } = await import("../../src/shared/constants/projectLinks.ts");
  assert.equal(OMNIROUTE_REPO_URL, "https://github.com/cheaper-inference/OmniRoute");
  const radarPage = readFileSync("src/app/(dashboard)/dashboard/radar/page.tsx", "utf8");
  assert.doesNotMatch(radarPage, /github\.com/i);
});
