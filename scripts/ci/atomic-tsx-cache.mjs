import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { register } from "node:module";
import { userInfo } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { isInternalThread } from "node:worker_threads";

const tsxImport = ["tsx/esm", "tsx"].some((specifier) =>
  process.execArgv.some(
    (arg, index, args) =>
      arg === `--import=${specifier}` || (arg === "--import" && args[index + 1] === specifier)
  )
);
const root = process.env.OMNIROUTE_CI_SYNC_TSX_CACHE;
if (root && root === process.env.TMPDIR && (isInternalThread || tsxImport)) {
  const uid = process.geteuid ? process.geteuid() : userInfo().username;
  const cache = join(resolve(root), `tsx-${uid}`);
  const original = fs.promises.writeFile;

  // The tsx disk cache is optional for execution, but here it is a coverage proof.
  // Commit only complete transforms before the test process can force its exit.
  fs.promises.writeFile = async function (file, data, ...options) {
    if (
      typeof file !== "string" ||
      dirname(file) !== cache ||
      !/^\d+-[a-f0-9]{40}$/.test(basename(file)) ||
      typeof data !== "string" ||
      options.length !== 0
    ) {
      return Reflect.apply(original, this, [file, data, ...options]);
    }
    const partial = join(cache, `.${basename(file)}.${randomUUID()}.partial`);
    fs.writeFileSync(partial, data, { flag: "wx", mode: 0o600 });
    try {
      fs.renameSync(partial, file);
    } catch (error) {
      fs.unlinkSync(partial);
      throw error;
    }
  };

  // Load this same bounded hook in the dedicated ESM loader before registering
  // tsx. The caller thread also needs the hook for tsx's CJS transform path.
  if (!isInternalThread) register(import.meta.url);
}
