/**
 * SonarCloud analyses go to the Cheaper Inference organization's project. Until 2026-11-19 the
 * scanner still sent every PR analysis to the personal project diegosouzapw_OmniRoute
 * (CI log: "Project key: diegosouzapw_OmniRoute", "Organization key: diegosouzapw"), a month
 * after the repository moved to the cheaper-inference GitHub organization.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function sonarProperties(): Map<string, string> {
  const text = fs.readFileSync(path.join(repoRoot, "sonar-project.properties"), "utf8");
  const props = new Map<string, string>();
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)$/);
    if (m) props.set(m[1], m[2].trim());
  }
  return props;
}

test("sonar-project.properties targets the cheaper-inference SonarCloud project", () => {
  const props = sonarProperties();
  assert.equal(props.get("sonar.organization"), "cheaper-inference");
  assert.equal(props.get("sonar.projectKey"), "cheaper-inference_OmniRoute");
});
