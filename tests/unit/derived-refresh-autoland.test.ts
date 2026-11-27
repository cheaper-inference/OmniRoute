import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import test, { type TestContext } from "node:test";
import { fileURLToPath } from "node:url";

import { load as parseYaml } from "js-yaml";

import { loadFamilies } from "../../scripts/check/check-pr-derived-paths.mjs";
import { loadConfig } from "../../scripts/merge-queue/config.mjs";
import {
  BOT_EMAIL,
  decideAutoland,
  frozenReadmeLines,
  isDigitsOnlyPatch,
} from "../../scripts/release/derived-refresh-autoland.mjs";

const headSha = "a".repeat(40);
const baseSha = "b".repeat(40);
const mergeBaseSha = "c".repeat(40);
const robotCommit = {
  sha: headSha,
  parents: [{ sha: baseSha }],
  commit: { author: { email: BOT_EMAIL }, committer: { email: BOT_EMAIL } },
};
const comparison = {
  ahead_by: 1,
  behind_by: 0,
  merge_base_commit: { sha: baseSha },
  commits: [robotCommit],
};
const checks: Record<string, string> = { "Gate / CI": "success", "Gate / Quality": "success" };
const ready = {
  state: "OPEN",
  isDraft: false,
  headBranch: "chore/derived-refresh",
  headRepository: "cheaper-inference/OmniRoute",
  repository: "cheaper-inference/OmniRoute",
  baseBranch: "release/v3.8.55",
  latestRelease: "release/v3.8.55",
  author: "diegosouzapw",
  labels: [],
  files: ["docs/reference/derived-facts.json", "src/i18n/messages/pt-BR.json"],
  digitsOnlyFiles: [],
  headSha,
  prCommitCount: 1,
  comparison,
  checksHeadSha: headSha,
  checks,
  releaseFreezeOpen: false,
  baseRedOpen: false,
  config: loadConfig(),
  families: loadFamilies(),
};

test("allows an open robot PR with derived categories across families", () => {
  assert.deepEqual(decideAutoland(ready), { apply: true, reasons: [] });
});

test("allows real derived outputs from the configured families", () => {
  const files = [
    "bin/cli/locales/pt-BR.json",
    "src/i18n/messages/de.json",
    "docs/diagrams/readme-hero.svg",
    "docs/reference/derived-facts.json",
    "docs/reference/PROVIDER_REFERENCE.md",
  ];
  assert.deepEqual(decideAutoland({ ...ready, files }), { apply: true, reasons: [] });
});

for (const file of [
  "scripts/skills/generate-agent-skills.mjs",
  "src/lib/agentSkills/generator.ts",
  "changelog.d/maintenance/x.md",
  "docs/openapi.yaml",
  "scripts/docs/gen-readme-hero.mjs",
  "tests/unit/agentSkills-catalog.test.ts",
  "skills/cli-eval/SKILL.md",
]) {
  test(`rejects the derived-family companion ${file}`, () => {
    const decision = decideAutoland({ ...ready, files: [...ready.files, file] });
    assert.equal(decision.apply, false);
    assert.ok(decision.reasons.includes("non-derived-file"), decision.reasons.join(", "));
  });
}

test("uses the same bot email as the nightly derived refresh workflow", () => {
  const path = new URL("../../.github/workflows/nightly-derived-refresh.yml", import.meta.url);
  const workflow = parseYaml(readFileSync(path, "utf8")) as {
    jobs?: { refresh?: { env?: { BOT_EMAIL?: string } } };
  };
  const email = workflow.jobs?.refresh?.env?.BOT_EMAIL;
  assert.ok(email, "BOT_EMAIL must be set in the nightly workflow");
  assert.equal(BOT_EMAIL, email);
});

test("allows a verified digits-only README alongside derived files", () => {
  assert.deepEqual(
    decideAutoland({
      ...ready,
      files: [...ready.files, "README.md"],
      digitsOnlyFiles: ["README.md"],
    }),
    { apply: true, reasons: [] }
  );
});

test("rejects an unverified README with the README-specific reason", () => {
  assert.deepEqual(decideAutoland({ ...ready, files: [...ready.files, "README.md"] }), {
    apply: false,
    reasons: ["readme-not-digits-only"],
  });
});

const denied: Array<[string, Partial<typeof ready>, string]> = [
  ["closed PR", { state: "CLOSED" }, "pr-not-open"],
  ["draft PR", { isDraft: true }, "draft"],
  ["another head branch", { headBranch: "chore/i18n-mirror-refresh" }, "wrong-head-branch"],
  [
    "the protected refresh branch",
    { headBranch: "chore/derived-refresh-protected" },
    "wrong-head-branch",
  ],
  [
    "fork with the robot branch name",
    { headRepository: "fork/OmniRoute" },
    "wrong-head-repository",
  ],
  ["PR from an unapproved author", { author: "contributor" }, "wrong-author"],
  ["main as the base", { baseBranch: "main", latestRelease: "main" }, "wrong-base"],
  ["an older release base", { baseBranch: "release/v3.8.54" }, "wrong-base"],
  ["empty diff", { files: [] }, "empty-diff"],
  [
    "a non-derived file in a derived diff",
    { files: [...ready.files, "src/app/page.tsx"] },
    "non-derived-file",
  ],
  [
    "a non-derived file reported as digits-only",
    { files: ["src/app/page.tsx"], digitsOnlyFiles: ["src/app/page.tsx"] },
    "non-derived-file",
  ],
  ["a category exclusion", { files: ["src/i18n/messages/en.json"] }, "non-derived-file"],
  ["a protected companion", { files: ["skills/omniroute/SKILL.md"] }, "protected-file"],
  [
    "a digits-only README covered by the protection config",
    {
      files: ["README.md"],
      digitsOnlyFiles: ["README.md"],
      config: { ...ready.config, protectedPaths: [...ready.config.protectedPaths, "README.md"] },
    },
    "protected-file",
  ],
  ["an open release freeze", { releaseFreezeOpen: true }, "release-freeze"],
  ["an open base-red issue", { baseRedOpen: true }, "base-red"],
  ["checks from a different head", { checksHeadSha: "b".repeat(40) }, "checks-head-mismatch"],
  ["missing CI", { checks: { "Gate / Quality": "success" } }, "Gate / CI"],
  ["pending CI", { checks: { ...ready.checks, "Gate / CI": "pending" } }, "Gate / CI"],
  [
    "failed Quality",
    { checks: { ...ready.checks, "Gate / Quality": "failure" } },
    "Gate / Quality",
  ],
  ["existing queue label", { labels: ["omni-queue"] }, "already-labeled"],
  ["blocking label", { labels: ["HOLD"] }, "blocking-label"],
];

for (const [name, changes, reason] of denied) {
  test(`denies ${name}`, () => {
    const decision = decideAutoland({ ...ready, ...changes });
    assert.equal(decision.apply, false);
    assert.ok(
      decision.reasons.some((entry: string) => entry.includes(reason)),
      decision.reasons.join(", ")
    );
  });
}

const migrationPatch = [
  "@@ -12 +12 @@",
  "-<td>178 modules in <code>src/lib/db/</code>, 252 migrations</td></tr>",
  "+<td>178 modules in <code>src/lib/db/</code>, 255 migrations</td></tr>",
].join("\n");

const patches: Array<[string, unknown, boolean]> = [
  ["the README migration count", migrationPatch, true],
  ["digits around an unchanged decimal point", "@@ -1 +1 @@\n-1.62B\n+11.3B", true],
  ["a changed separator and suffix", "@@ -1 +1 @@\n-90M\n+1.2B", false],
  ["changed text", migrationPatch.replace("255 migrations", "255 schemas"), false],
  ["an extra line", "@@ -1 +1,2 @@\n-Count: 252\n+Count: 255\n+Count: 256", false],
  ["only additions", "@@ -0,0 +1 @@\n+Count: 255", false],
  ["only removals", "@@ -1 +0,0 @@\n-Count: 255", false],
  ["a digit replaced by a letter", "@@ -1 +1 @@\n-252 migrations\n+A migrations", false],
  ["an empty patch", "", false],
  ["a missing patch", undefined, false],
  ["a context-only hunk", "@@ -1 +1 @@\n Count: 255", false],
  ["a truncated hunk", "@@ -1,2 +1,2 @@\n-Count: 252\n+Count: 255", false],
  [
    "equal changes across separate blocks in one hunk",
    "@@ -1,3 +1,3 @@\n-First: 1\n+First: 2\n context\n-Last: 5\n+Last: 6",
    true,
  ],
  ["unequal blocks split by context", "@@ -1,2 +1,2 @@\n-Count: 252\n context\n+Count: 255", false],
  ["multiple hunks", `${migrationPatch}\n@@ -24 +24 @@\n-Tools: 109\n+Tools: 110`, true],
  [
    "a text change in a later hunk",
    `${migrationPatch}\n@@ -24 +24 @@\n-Tools: 109\n+Scopes: 110`,
    false,
  ],
  [
    "missing newline markers on both sides",
    "@@ -1 +1 @@\n-Count: 252\n\\ No newline at end of file\n+Count: 255\n\\ No newline at end of file",
    false,
  ],
  [
    "a removed final newline",
    "@@ -1 +1 @@\n-Count: 252\n+Count: 255\n\\ No newline at end of file",
    false,
  ],
];

function linePatch(before: string, after: string, line = 1) {
  return `@@ -${line} +${line} @@\n-${before}\n+${after}`;
}

const lines: Array<[string, string, string, boolean]> = [
  [
    "a wallet address in HTML code",
    "<td><code>bc1qh00smz004sy85wyl28v77tenkt3ckl6eaep7fd</code></td>",
    "<td><code>bc1qh00smz004sy95wyl28v77tenkt3ckl6eaep7fd</code></td>",
    false,
  ],
  [
    "an HTML referral link",
    '<a href="https://agentrouter.org/register?aff=70LM">Register</a>',
    '<a href="https://agentrouter.org/register?aff=71LM">Register</a>',
    false,
  ],
  [
    "a loose URL with a repository ID",
    "See https://trendshift.io/repositories/23589",
    "See https://trendshift.io/repositories/23580",
    false,
  ],
  [
    "a Markdown link target containing parentheses",
    "[Report](reports/run(final)23589.md)",
    "[Report](reports/run(final)23580.md)",
    false,
  ],
  ["a Markdown image target", "![Chart](chart-1.svg)", "![Chart](chart-2.svg)", false],
  ["an HTML image source", '<img src="chart-1.svg">', '<img src="chart-2.svg">', false],
  [
    "an HTML source set",
    '<source srcset="chart-1.svg 1x, chart-2.svg 2x">',
    '<source srcset="chart-1.svg 1x, chart-3.svg 2x">',
    false,
  ],
  [
    "a source set with an anchor and another target",
    '<source srcset="#chart 1x, chart-2.svg 2x">',
    '<source srcset="#chart 1x, chart-3.svg 2x">',
    false,
  ],
  ["inline code", "Run `tool 2`", "Run `tool 3`", false],
  ["inline code with inner backticks", "``a `2` b``", "``a `3` b``", false],
  [
    "inline code after an escaped backtick",
    "Literal \\` then `tool 2`",
    "Literal \\` then `tool 3`",
    false,
  ],
  ["nested HTML inside code", "<code><b>2</b></code>", "<code><b>3</b></code>", false],
  ["a prefixed version", "Measured in v3.8.54", "Measured in v3.8.99", false],
  ["a bare version", "Measured in 3.8.54", "Measured in 3.8.99", false],
  ["a version after an underscore", "artifact_v3.8.54", "artifact_v3.8.99", false],
  ["a pre-release version", "Use 3.8.54-rc.1", "Use 3.8.54-rc.2", false],
  ["a hash outside code", "sha 4de5c9b65f4cd1f966db", "sha 4de5c9b65f4cd1f967db", false],
  [
    "a long token with connectors outside code",
    "ID pix01365d865059-bc44-483a-962d-43ceb80126eb",
    "ID pix01365d865059-bc45-483a-962d-43ceb80126eb",
    false,
  ],
  [
    "a long token with all supported connectors",
    "ID a1.b_c-d:e/f+g=h2",
    "ID a1.b_c-d:e/f+g=h3",
    false,
  ],
  [
    "a URL after a connector",
    "From mirror:https://x.test/?id=1",
    "From mirror:https://x.test/?id=2",
    false,
  ],
  [
    "a purely numeric token before a version",
    "ID 12-3456789012-3.8.54",
    "ID 12-3456789012-3.8.55",
    false,
  ],
  ["the same frozen values in a different order", "`A1` then `A2`", "`A2` then `A1`", false],
  ["prose", "Every AI tool → 394 providers", "Every AI tool → 401 providers", true],
  [
    "image alt text",
    '<img src="chart-1.svg" alt="Every AI tool → 394 providers">',
    '<img src="chart-1.svg" alt="Every AI tool → 401 providers">',
    true,
  ],
  ["a table cell", "| Providers | 394 |", "| Providers | 401 |", true],
  ["an ISO date", "Catalog last audited on 2026-11-23", "Catalog last audited on 2026-11-30", true],
  ["a decimal with a suffix", "~11.3B", "~11.4B", true],
  ["a count with a plus suffix", "140+", "150+", true],
  ["a percentage range", "15–95%", "16–96%", true],
  ["only the lower bound of a percentage range", "15–95%", "16–95%", true],
  [
    "the requested routing strategies heading",
    "### Or build your own: 22 routing strategies",
    "### Or build your own: 23 routing strategies",
    true,
  ],
  [
    "an HTML cell with a percentage width",
    '<td align="center" width="25%"><b>394</b>',
    '<td align="center" width="25%"><b>401</b>',
    true,
  ],
  [
    "a count next to unchanged model names",
    "GLM-4.7-Flash, GLM-4.5-Flash, 24 models",
    "GLM-4.7-Flash, GLM-4.5-Flash, 25 models",
    true,
  ],
  [
    "an HTML anchor for the same document",
    '<a href="#22-routing-strategies">22 routing strategies</a>',
    '<a href="#23-routing-strategies">23 routing strategies</a>',
    true,
  ],
];

for (const [name, before, after, expected] of lines) {
  patches.push([name, linePatch(before, after), expected]);
}

patches.push([
  "a numbered heading and its Markdown anchor",
  [
    "@@ -1,2 +1,2 @@",
    "-### Or build your own (22 routing strategies)",
    "-[Routing](#or-build-your-own-22-routing-strategies)",
    "+### Or build your own (23 routing strategies)",
    "+[Routing](#or-build-your-own-23-routing-strategies)",
  ].join("\n"),
  true,
]);

for (const [name, patch, expected] of patches) {
  test(`checks digits-only patches for ${name}`, () => {
    const patchLines = typeof patch === "string" ? patch.split("\n") : [];
    const additions = patchLines.filter((line) => line.startsWith("+")).length;
    const deletions = patchLines.filter((line) => line.startsWith("-")).length;
    assert.equal(
      isDigitsOnlyPatch(patch, { status: "modified", additions, deletions }, new Set<number>()),
      expected
    );
  });
}

const readmeEvidence = { status: "modified", additions: 1, deletions: 1 };
const invalidEvidence: Array<[string, Partial<typeof readmeEvidence> | undefined]> = [
  ["missing file metadata", undefined],
  ["a missing status", { ...readmeEvidence, status: undefined }],
  ["an added README", { ...readmeEvidence, status: "added" }],
  ["a missing addition count", { ...readmeEvidence, additions: undefined }],
  ["a missing deletion count", { ...readmeEvidence, deletions: undefined }],
  ["different addition and deletion counts", { ...readmeEvidence, additions: 2 }],
  ["a missing complete hunk", { ...readmeEvidence, additions: 2, deletions: 2 }],
];

for (const [name, evidence] of invalidEvidence) {
  test(`rejects digits-only README evidence for ${name}`, () => {
    assert.equal(isDigitsOnlyPatch(migrationPatch, evidence, new Set<number>()), false);
  });
}

test("rejects digits-only patches without frozen line evidence", () => {
  assert.equal(isDigitsOnlyPatch(migrationPatch, readmeEvidence), false);
});

test("rejects a hunk whose old and new starting lines differ", () => {
  const patch = migrationPatch.replace("+12", "+13");
  assert.equal(isDigitsOnlyPatch(patch, readmeEvidence, new Set<number>()), false);
});

const pix =
  "00020101021126580014br.gov.bcb.pix01365d865059-bc44-483a-962d-43ceb80126eb5204000053039865802BR5922OMNIROUTE CONTRIBUICAO6006BRASIL62070503***630475DD";
const fencedEdits: Array<[string, string, string]> = [
  ["the Pix prefix", pix, pix.replace("pix01365d865059", "pix01365d865058")],
  ["the first short Pix segment", pix, pix.replace("bc44", "bc45")],
  ["the second short Pix segment", pix, pix.replace("483a", "484a")],
  ["the third short Pix segment", pix, pix.replace("962d", "963d")],
  ["the Pix suffix", pix, pix.replace("630475DD", "630476DD")],
  [
    "the curl port",
    "curl http://localhost:20128/v1/models",
    "curl http://localhost:20129/v1/models",
  ],
  ["the curl model", "  --model glm/glm-5.2", "  --model glm/glm-5.3"],
  ["the opening fence's info string", "```tool2", "```tool3"],
];

for (const [name, before, after] of fencedEdits) {
  test(`rejects digits-only changes to ${name} in a fenced block`, () => {
    const base = before.startsWith("```")
      ? ["Example", before, "Example output", "```", ""].join("\n")
      : ["Example", "```sh", before, "```", ""].join("\n");
    const line = before.startsWith("```") ? 2 : 3;
    const frozen = frozenReadmeLines(base);
    assert.equal(isDigitsOnlyPatch(linePatch(before, after, line), readmeEvidence, frozen), false);
  });
}

const fences: Array<[string, string[], number[]]> = [
  ["a tilde fence", ["~~~sh", "Count 1", "~~~~", "Count 2"], [1, 2, 3]],
  ["a four-backtick fence with nested backticks", ["````", "```", "Count 1", "````"], [1, 2, 3, 4]],
  ["a three-space indent", ["   ```sh", "Count 1", "   ```\t", "Count 2"], [1, 2, 3]],
  ["a four-space indent", ["    ```sh", "Count 1", "    ```"], []],
  ["an unclosed fence", ["Before", "~~~", "```", "Count 1"], [2, 3, 4]],
  ["text after a would-be closing fence", ["~~~", "~~~ text", "Count 1", "~~~"], [1, 2, 3, 4]],
  [
    "a fence longer than the inline pattern bound",
    ["`".repeat(4097), "Count 1", "`".repeat(4097)],
    [1, 2, 3],
  ],
];

for (const [name, lines, expected] of fences) {
  test(`finds the frozen line numbers for ${name}`, () => {
    assert.deepEqual([...frozenReadmeLines(`${lines.join("\r\n")}\r\n`)], expected);
  });
}

test("allows a digits-only change just after a closed fence with the fence in context", () => {
  const frozen = frozenReadmeLines("```sh\nCount 1\n```\nCount 2\n");
  const patch = "@@ -3,2 +3,2 @@\n ```\n-Count 2\n+Count 3";
  assert.equal(isDigitsOnlyPatch(patch, readmeEvidence, frozen), true);
});

test("accounts for hunk context and earlier replacements before a frozen removal", () => {
  const frozen = frozenReadmeLines("Count 1\n```\nCount 2\n```\n");
  const patch = "@@ -1,4 +1,4 @@\n-Count 1\n+Count 3\n ```\n-Count 2\n+Count 4\n ```";
  assert.equal(
    isDigitsOnlyPatch(patch, { ...readmeEvidence, additions: 2, deletions: 2 }, frozen),
    false
  );
});

const baseReadme = "Intro\nCount 2\n";
const baseContents = {
  type: "file",
  encoding: "base64",
  size: Buffer.byteLength(baseReadme),
  content: Buffer.from(baseReadme).toString("base64"),
};

const pull = {
  state: "open",
  draft: false,
  head: { sha: headSha, ref: ready.headBranch, repo: { full_name: ready.repository } },
  base: { sha: baseSha, ref: ready.baseBranch },
  user: { login: ready.author },
  labels: [],
  changed_files: 1,
  commits: 1,
};
const pullArgs = ["api", "repos/cheaper-inference/OmniRoute/pulls/1"];
const labelArgs = ["pr", "edit", "1", "--repo", ready.repository];
const addLabelArgs = [...labelArgs, "--add-label", "omni-queue"];
const removeLabelArgs = [...labelArgs, "--remove-label", "omni-queue"];
const comparePath = `compare/${baseSha}...${headSha}?per_page=2`;

type GhCall = { args: string[]; token: string };

function runAutoland(
  t: TestContext,
  {
    contents = baseContents as unknown,
    ancestor = baseSha,
    ancestorContents = baseContents,
    rawContents = "",
    filename = "README.md",
    commitComparison = {
      ...comparison,
      behind_by: Number(ancestor !== baseSha),
      merge_base_commit: { sha: ancestor },
      commits: [{ ...robotCommit, parents: [{ sha: ancestor }] }],
    } as unknown,
    pulls = [pull, pull, pull] as unknown[],
    dryRun = true,
    enabled = true,
    removeLabelFails = false,
    expectedStatus = 0,
  } = {}
) {
  const root = fileURLToPath(new URL("../..", import.meta.url));
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const dir = mkdtempSync(join(artifacts, "autoland-test-"));
  t.after(() => rmSync(dir, { force: true, recursive: true }));
  const responses = {
    "pulls/1/files?per_page=100": [
      [{ ...readmeEvidence, filename, patch: linePatch("Count 2", "Count 3", 2) }],
    ],
    [`contents/README.md?ref=${baseSha}`]: contents,
    [`raw:contents/README.md?ref=${baseSha}`]: rawContents,
    [`contents/README.md?ref=${mergeBaseSha}`]: ancestorContents,
    [comparePath]: commitComparison,
    "branches?per_page=100": `${ready.baseBranch}\n`,
    "issues?state=open&per_page=100": "",
    user: { login: ready.author },
    "--add-label": "",
    "--remove-label": removeLabelFails ? null : "",
    ...Object.fromEntries(
      ["ci.yml", "quality.yml"].map((workflow, index) => [
        `actions/workflows/${workflow}/runs?branch=chore%2Fderived-refresh&event=pull_request&head_sha=${headSha}&per_page=100`,
        [{ workflow_runs: [{ id: index + 1, head_sha: headSha, run_attempt: 1 }] }],
      ])
    ),
    ...Object.fromEntries(
      Object.keys(checks).map((name, index) => [
        `actions/runs/${index + 1}/attempts/1/jobs?per_page=100`,
        [{ jobs: [{ name, status: "completed", conclusion: "success" }] }],
      ])
    ),
  };
  writeFileSync(join(dir, "responses.json"), JSON.stringify({ pulls, responses }));
  const callLog = join(dir, "calls.jsonl");
  writeFileSync(callLog, "");
  writeFileSync(
    join(dir, "gh"),
    `#!${process.execPath}
import { appendFileSync, readFileSync } from "node:fs";
const argv = process.argv.slice(2);
const [method, endpoint, ...args] = argv;
const log = new URL("calls.jsonl", import.meta.url);
const calls = readFileSync(log, "utf8")
  .split("\\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));
appendFileSync(log, JSON.stringify({ args: argv, token: process.env.GH_TOKEN }) + "\\n");
const prefix = "repos/cheaper-inference/OmniRoute/";
const fixtures = new URL("responses.json", import.meta.url);
const { pulls, responses } = JSON.parse(readFileSync(fixtures, "utf8"));
const queueLabel = ["--add-label", "--remove-label"].find((flag) => args.includes(flag));
const key = method === "api"
  ? endpoint.replace(prefix, "")
  : method === "pr" && endpoint === "edit" && queueLabel;
const raw = args.includes("Accept: application/vnd.github.raw+json");
const response = key === "pulls/1"
  ? pulls[calls.filter((call) => call.args[0] === "api" && call.args[1] === prefix + key).length]
  : responses[raw ? "raw:" + key : key];
if (response == null) process.exit(1);
if (response.encoding === "none" && !args.includes("Accept: application/vnd.github.object+json")) {
  process.exit(1);
}
process.stdout.write(typeof response === "string" ? response : JSON.stringify(response));
`,
    { mode: 0o700 }
  );
  const result = spawnSync(
    process.execPath,
    ["scripts/release/derived-refresh-autoland.mjs", "--pr", "1", ...(dryRun ? ["--dry-run"] : [])],
    {
      cwd: root,
      env: {
        ...process.env,
        PATH: `${dir}${delimiter}${process.env.PATH}`,
        DERIVED_REFRESH_AUTOLAND: String(enabled),
        DERIVED_REFRESH_READ_TOKEN: "read-token",
        GH_TOKEN: "label-token",
      },
      encoding: "utf8",
    }
  );
  assert.equal(result.status, expectedStatus, result.stderr || result.stdout);
  const calls: GhCall[] = readFileSync(callLog, "utf8")
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  return { ...result, calls };
}

const unreadableContents: Array<[string, unknown, RegExp]> = [
  ["an API failure", null, /base-readme-unavailable/],
  ["an empty README", { ...baseContents, size: 0, content: "" }, /base-readme-empty/],
  ["an empty response body", "", /base-readme-unavailable/],
  ["an explicit truncation flag", { ...baseContents, truncated: true }, /base-readme-incomplete/],
  [
    "a short decoded body",
    { ...baseContents, size: baseContents.size + 3 },
    /base-readme-incomplete/,
  ],
  ["an oversized README", { ...baseContents, size: 2 * 1024 * 1024 + 1 }, /base-readme-too-large/],
];

for (const [name, contents, reason] of unreadableContents) {
  test(`autoland declines a README patch for ${name}`, (t) => {
    const { stdout: decision } = runAutoland(t, { contents });
    assert.match(decision, /apply=false/);
    assert.match(decision, reason);
  });
}

test("autoland uses the README at the exact base SHA to check the old patch lines", (t) => {
  assert.match(runAutoland(t).stdout, /apply=true/);
  const fenced = "```\nCount 2\n```\n";
  const { stdout: decision } = runAutoland(t, {
    contents: {
      ...baseContents,
      size: Buffer.byteLength(fenced),
      content: Buffer.from(fenced).toString("base64"),
    },
  });
  assert.match(decision, /apply=false readme-not-digits-only/);
});

test("autoland allows a diverged base if its README still matches the merge base", (t) => {
  const { stdout, calls } = runAutoland(t, { ancestor: mergeBaseSha });
  assert.match(stdout, /apply=true/);
  assert.equal(calls.filter(({ args }) => args[1]?.includes("/compare/")).length, 1);
});

test("autoland rejects a README with different contents at the merge base", (t) => {
  const ancestorReadme = "```\nCount 2\n```\n";
  const { stdout: decision } = runAutoland(t, {
    ancestor: mergeBaseSha,
    ancestorContents: {
      ...baseContents,
      size: Buffer.byteLength(ancestorReadme),
      content: Buffer.from(ancestorReadme).toString("base64"),
    },
  });
  assert.match(decision, /apply=false readme-diff-base-mismatch/);
});

test("autoland accepts an intact raw README and rejects a truncated raw response", (t) => {
  const rawContents = baseReadme + "Example line\n".repeat(90_000);
  const metadata = {
    type: "file",
    encoding: "none",
    size: Buffer.byteLength(rawContents),
    content: "",
  };
  assert.match(runAutoland(t, { contents: metadata, rawContents }).stdout, /apply=true/);
  assert.match(
    runAutoland(t, { contents: metadata, rawContents: rawContents.slice(0, -1) }).stdout,
    /apply=false base-readme-incomplete/
  );
});

const readPull = { args: pullArgs, token: "read-token" };
const addLabel = { args: addLabelArgs, token: "label-token" };
const removeLabel = { args: removeLabelArgs, token: "label-token" };
const changedHead = { ...pull, head: { ...pull.head, sha: "d".repeat(40) } };
const derivedFile = "docs/reference/derived-facts.json";

function pullAndLabelCalls(calls: GhCall[]) {
  return calls.filter(({ args }) => args[1] === pullArgs[1] || args[0] === "pr");
}

test("autoland keeps the label when the post-label pull request still matches", (t) => {
  const { stdout, calls } = runAutoland(t, {
    filename: derivedFile,
    ancestor: mergeBaseSha,
    dryRun: false,
  });
  assert.match(stdout, /apply=true eligible/);
  assert.match(stdout, /Applied the omni-queue label\./);
  assert.deepEqual(pullAndLabelCalls(calls), [readPull, readPull, addLabel, readPull]);
  assert.equal(calls.filter(({ args }) => args[1]?.endsWith(comparePath)).length, 1);
});

for (const [name, afterLabel] of [
  ["the head changes", changedHead],
  ["the pull request closes", { ...pull, state: "closed" }],
  ["the base branch changes", { ...pull, base: { ...pull.base, ref: "release/v3.8.56" } }],
] as const) {
  test(`autoland removes the label when ${name} right after labeling`, (t) => {
    const { stdout, calls } = runAutoland(t, { pulls: [pull, pull, afterLabel], dryRun: false });
    assert.match(stdout, /PR #1 apply=false head-changed-after-label/);
    assert.match(stdout, /^::warning::.*PR #1.*after labeling/m);
    assert.deepEqual(pullAndLabelCalls(calls), [
      readPull,
      readPull,
      addLabel,
      readPull,
      removeLabel,
    ]);
  });
}

test("autoland fails loudly when it cannot remove a label from a changed head", (t) => {
  const { stderr, calls } = runAutoland(t, {
    pulls: [pull, pull, changedHead],
    dryRun: false,
    removeLabelFails: true,
    expectedStatus: 2,
  });
  assert.match(stderr, /omni-queue label may remain on an unexamined head for PR #1\./);
  assert.deepEqual(pullAndLabelCalls(calls), [readPull, readPull, addLabel, readPull, removeLabel]);
});

const unusableReads = [
  ["the API call fails", null],
  ["the response is invalid JSON", "invalid JSON"],
  ["the response lacks the head SHA", { ...pull, head: {} }],
] as const;

for (const [name, afterLabel] of unusableReads) {
  test(`autoland removes the label and fails when the post-label read is unusable because ${name}`, (t) => {
    const { stderr, calls } = runAutoland(t, {
      pulls: [pull, pull, afterLabel],
      dryRun: false,
      expectedStatus: 2,
    });
    assert.match(stderr, /Could not verify PR #1 after labeling\. Removed the omni-queue label\./);
    assert.doesNotMatch(stderr, /may remain/);
    assert.deepEqual(pullAndLabelCalls(calls), [
      readPull,
      readPull,
      addLabel,
      readPull,
      removeLabel,
    ]);
  });

  test(`autoland fails loudly when the removal also fails after ${name}`, (t) => {
    const { stderr, calls } = runAutoland(t, {
      pulls: [pull, pull, afterLabel],
      dryRun: false,
      removeLabelFails: true,
      expectedStatus: 2,
    });
    assert.match(stderr, /omni-queue label may remain on an unexamined head for PR #1\./);
    assert.deepEqual(pullAndLabelCalls(calls), [
      readPull,
      readPull,
      addLabel,
      readPull,
      removeLabel,
    ]);
  });
}

for (const [name, dryRun, enabled] of [
  ["dry-run", true, true],
  ["the autoland variable is disabled", false, false],
] as const) {
  test(`autoland skips label operations and additional pull requests reads when ${name}`, (t) => {
    const { stdout, calls } = runAutoland(t, { dryRun, enabled });
    assert.match(stdout, /apply=true eligible/);
    assert.match(stdout, /Dry run\. No label applied\./);
    assert.deepEqual(pullAndLabelCalls(calls), [readPull]);
    assert.ok(!calls.some(({ args }) => args[0] === "api" && args[1] === "user"));
  });
}

test("autoland declines when the head changes before labeling", (t) => {
  const { stdout, calls } = runAutoland(t, { pulls: [pull, changedHead], dryRun: false });
  assert.match(stdout, /apply=false head-changed\s*$/);
  assert.deepEqual(pullAndLabelCalls(calls), [readPull, readPull]);
});

const human = { email: "maintainer@example.com" };
const deniedShapes: Array<[string, unknown, string]> = [
  [
    "two commits",
    { ...comparison, ahead_by: 2, commits: [robotCommit, { ...robotCommit, sha: mergeBaseSha }] },
    "not-single-commit",
  ],
  ["an invalid ahead count", { ...comparison, ahead_by: "1" }, "not-single-commit"],
  [
    "a comparison with an inconsistent commit list",
    { ...comparison, commits: [robotCommit, robotCommit] },
    "not-single-commit",
  ],
  ["a malformed commit list", { ...comparison, commits: {} }, "not-single-commit"],
  [
    "a commit SHA different from the head",
    { ...comparison, commits: [{ ...robotCommit, sha: mergeBaseSha }] },
    "not-single-commit",
  ],
  [
    "a merge commit",
    {
      ...comparison,
      commits: [{ ...robotCommit, parents: [{ sha: baseSha }, { sha: mergeBaseSha }] }],
    },
    "commit-not-on-base",
  ],
  [
    "a parent different from the merge base",
    { ...comparison, commits: [{ ...robotCommit, parents: [{ sha: mergeBaseSha }] }] },
    "commit-not-on-base",
  ],
  [
    "missing parent metadata",
    { ...comparison, commits: [{ ...robotCommit, parents: undefined }] },
    "commit-not-on-base",
  ],
  ["a malformed merge base", { ...comparison, merge_base_commit: {} }, "commit-not-on-base"],
  [
    "a robot author with a human committer",
    {
      ...comparison,
      commits: [{ ...robotCommit, commit: { ...robotCommit.commit, committer: human } }],
    },
    "non-robot-commit",
  ],
  [
    "a human author with a robot committer",
    {
      ...comparison,
      commits: [{ ...robotCommit, commit: { ...robotCommit.commit, author: human } }],
    },
    "non-robot-commit",
  ],
  [
    "missing author and committer metadata",
    { ...comparison, commits: [{ ...robotCommit, commit: undefined }] },
    "non-robot-commit",
  ],
];

for (const [name, commitComparison, reason] of deniedShapes) {
  test(`autoland declines ${name}`, (t) => {
    const { stdout, calls } = runAutoland(t, {
      filename: derivedFile,
      commitComparison,
      dryRun: false,
    });
    assert.match(stdout, new RegExp(`apply=false ${reason}\\s*$`));
    assert.deepEqual(pullAndLabelCalls(calls), [readPull]);
  });
}

for (const [name, pulls, expectedCalls] of [
  ["initial", [{ ...pull, commits: 2 }], [readPull]],
  ["pre-label", [pull, { ...pull, commits: 2 }], [readPull, readPull]],
] as const) {
  test(`autoland declines a conflicting commit count in the ${name} pull request read`, (t) => {
    const { stdout, calls } = runAutoland(t, {
      filename: derivedFile,
      pulls: [...pulls],
      dryRun: false,
    });
    assert.match(stdout, /apply=false not-single-commit\s*$/);
    assert.deepEqual(pullAndLabelCalls(calls), expectedCalls);
  });
}

for (const [filename, reason] of [
  ["README.md", "readme-diff-base-unavailable"],
  [derivedFile, "commit-shape-unavailable"],
] as const) {
  test(`autoland declines ${filename} when the comparison cannot be fetched`, (t) => {
    const { stdout, calls } = runAutoland(t, { filename, commitComparison: null, dryRun: false });
    assert.match(stdout, new RegExp(`apply=false ${reason}\\s*$`));
    assert.deepEqual(pullAndLabelCalls(calls), [readPull]);
  });
}
