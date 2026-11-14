// Wrapper around fake-gateway.mjs that records its env first.
//   node env-probe-gateway.mjs --port <n> --out <path>
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const i = args.indexOf("--out");
if (i >= 0) {
  writeFileSync(
    args[i + 1],
    JSON.stringify({ OMNIROUTE_SERVER_HOST: process.env.OMNIROUTE_SERVER_HOST ?? null })
  );
}
await import(join(dirname(fileURLToPath(import.meta.url)), "fake-gateway.mjs"));
