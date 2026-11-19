import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

// The standalone output Next.js traces never includes the root LICENSE, so the runtime
// image has to copy it on its own or it is published without its license text.
test("Dockerfile copies the root LICENSE into the runner-base runtime stage", () => {
  const dockerfile = fs.readFileSync(path.join(REPO_ROOT, "Dockerfile"), "utf8");
  const start = dockerfile.indexOf("FROM base AS runner-base");
  assert.ok(start >= 0, "runner-base stage");
  const next = dockerfile.indexOf("\nFROM ", start + 1);
  const stage = dockerfile.slice(start, next === -1 ? undefined : next);
  assert.match(stage, /^COPY --chown=node:node --from=builder \/app\/LICENSE \.\/LICENSE$/m);
  assert.ok(fs.existsSync(path.join(REPO_ROOT, "LICENSE")), "root LICENSE exists");
});
