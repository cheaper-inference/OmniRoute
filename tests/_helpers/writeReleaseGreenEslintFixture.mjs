import { writeFileSync } from "node:fs";
import { join } from "node:path";

const DEFAULT_MEASUREMENT = JSON.stringify([
  { filePath: "fixture.ts", errorCount: 0, warningCount: 0 },
]);

// This command double models the observer's dedicated ESLint report channel.
// The payload is data in an owned fixture file, never interpolated shell source.
const COMMAND = `
const fs = require("node:fs");
const path = require("node:path");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "eslint-fixture.json"), "utf8"));
const args = process.argv.slice(2);
const outputIndices = args.flatMap((arg, index) => arg === "--output-file" ? [index] : []);
const outputIndex = outputIndices[0];
if (args[0] !== "eslint" || outputIndices.length !== 1 ||
    !args[outputIndex + 1] || args[outputIndex + 1].startsWith("--") ||
    args[args.indexOf("--format") + 1] !== "json") process.exit(33);
fs.writeFileSync(args[outputIndex + 1], config.measurementText);
if (config.diagnosticText) process.stdout.write(config.diagnosticText + "\\n");
process.exit(config.exitCode);
`;

/** Keep invalid reports and nonzero exits available for negative observer tests. */
export function writeReleaseGreenEslintFixture(
  binDirectory,
  { measurementText = DEFAULT_MEASUREMENT, diagnosticText = "", exitCode = 0 } = {}
) {
  if (
    typeof measurementText !== "string" ||
    typeof diagnosticText !== "string" ||
    !Number.isInteger(exitCode) ||
    exitCode < 0 ||
    exitCode > 255
  ) {
    throw new Error("Invalid ESLint fixture configuration");
  }
  writeFileSync(
    join(binDirectory, "eslint-fixture.json"),
    JSON.stringify({ measurementText, diagnosticText, exitCode }),
    { flag: "wx", mode: 0o600 }
  );
  const command = join(binDirectory, "npx");
  writeFileSync(command, `#!${process.execPath}\n${COMMAND}`, { flag: "wx", mode: 0o755 });
  return command;
}
