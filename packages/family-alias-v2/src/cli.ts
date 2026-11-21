#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { verifySavedPlan, type SavedPlan } from "./run.ts";

export type CliDependencies = {
  createPlan(): Promise<SavedPlan>;
  applyPlan(plan: SavedPlan): Promise<Record<string, unknown>>;
};

export async function runCli(args: string[], deps: CliDependencies): Promise<number> {
  const [command = "plan", ...rest] = args;
  if (command === "plan") {
    const outputIndex = rest.indexOf("--output");
    const output = outputIndex >= 0 ? rest[outputIndex + 1] : "family-alias-v2-plan.json";
    if (!output) throw new Error("--output requires a path");
    const plan = await deps.createPlan();
    await writeFile(output, JSON.stringify(plan, null, 2) + "\n", "utf8");
    process.stdout.write(`${output}\n`);
    return 0;
  }
  if (command === "apply") {
    const planIndex = rest.indexOf("--plan");
    const path = planIndex >= 0 ? rest[planIndex + 1] : undefined;
    if (!path) throw new Error("apply requires --plan <file>");
    const plan = JSON.parse(await readFile(path, "utf8")) as SavedPlan;
    if (!verifySavedPlan(plan)) throw new Error("invalid or tampered plan artifact");
    const result = await deps.applyPlan(plan);
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    return 0;
  }
  throw new Error(`unknown command: ${command}`);
}
