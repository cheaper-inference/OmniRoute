import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  closeSync,
  lstatSync,
  openSync,
  readFileSync,
  readdirSync,
  readlinkSync,
  readSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";

export const NEXT_INPUT_RECEIPT = ".omniroute-next-input.json";
export const SHA = /^[0-9a-f]{40}$/;
export const DIGEST = /^[0-9a-f]{64}$/;
export const RUN_NUMBER = /^[1-9][0-9]*$/;
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function requireProof(condition, code) {
  if (!condition) {
    const error = new Error(`PREBUILT_NEXT_REQUIRED: ${code}`);
    error.code = code;
    throw error;
  }
}

export const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

// Stream regular files with a fixed buffer: a Next artifact can exceed the heap.
export function hashFile(path) {
  const stat = lstatSync(path);
  requireProof(stat.isFile() && !stat.isSymbolicLink(), "regular-file-required");
  const hash = createHash("sha256");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  const fd = openSync(path, "r");
  let bytes = 0;
  try {
    let count;
    while ((count = readSync(fd, buffer, 0, buffer.length, null)) > 0) {
      hash.update(buffer.subarray(0, count));
      bytes += count;
    }
  } finally {
    closeSync(fd);
  }
  requireProof(bytes === stat.size, "file-changed-during-read");
  return { sha256: hash.digest("hex"), sizeBytes: bytes };
}

export function readProofJson(path) {
  const stat = lstatSync(path);
  requireProof(stat.isFile() && stat.size > 0 && stat.size <= 65536, "invalid-proof-size");
  const bytes = readFileSync(path);
  return { value: JSON.parse(bytes), sha256: sha256(bytes) };
}

export function checkoutIdentity(root) {
  const git = (args) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      timeout: 10000,
      maxBuffer: 4 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  const candidateSha = git(["rev-parse", "HEAD"]);
  const treeSha = git(["rev-parse", "HEAD^{tree}"]);
  requireProof(SHA.test(candidateSha) && SHA.test(treeSha), "invalid-checkout-identity");
  // A commit/tree label cannot certify modified or untracked source bytes. Ignored
  // caches and local evidence are allowed; no source is restored or deleted here.
  requireProof(git(["status", "--porcelain", "--untracked-files=normal"]) === "", "dirty-checkout");
  const lock = hashFile(join(root, "package-lock.json"));
  requireProof(lock.sizeBytes > 0, "empty-lockfile");
  return { candidateSha, treeSha, lockfileSha256: lock.sha256 };
}

export function sameIdentity(actual, expected) {
  return (
    actual?.candidateSha === expected?.candidateSha &&
    actual?.treeSha === expected?.treeSha &&
    actual?.lockfileSha256 === expected?.lockfileSha256
  );
}

function inside(root, path) {
  const rel = relative(root, path);
  return rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}

export function portableLinkTarget(value, platform = process.platform) {
  const target = platform === "win32" ? value.replace(/\\/g, "/") : value;
  requireProof(
    !isAbsolute(target) && !target.startsWith("/") && !/[\\\x00-\x1f:]/.test(target),
    "unsafe-next-link"
  );
  return target;
}

export function nextDistPath(root, env = process.env) {
  const target = resolve(root, env.NEXT_DIST_DIR || ".build/next");
  requireProof(target !== resolve(root) && inside(resolve(root), target), "unsafe-next-directory");
  // Fresh producers invalidate generated output. Never interpret a private
  // repository, source directory or sibling worktree as a disposable Next tree.
  const member = relative(resolve(root), target).split(sep).join("/");
  requireProof(member === ".next" || member.startsWith(".build/"), "unsafe-next-directory");
  // Reject existing symlink ancestors before any producer invalidation or read.
  let cursor = resolve(root);
  for (const part of relative(cursor, target).split(sep)) {
    cursor = join(cursor, part);
    try {
      requireProof(!lstatSync(cursor).isSymbolicLink(), "symlink-next-directory");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return target;
}

// The only exclusions match the transport: Next's cache and our own receipt.
// Modes/inodes are not portable across Linux -> Windows; file bytes and link
// destinations are. Hard links are measured as regular file content at both ends.
export function measureNextTree(dist) {
  requireProof(
    lstatSync(dist).isDirectory() && !lstatSync(dist).isSymbolicLink(),
    "missing-next-output"
  );
  for (const member of ["BUILD_ID", "standalone/server.js"]) {
    const stat = lstatSync(join(dist, member));
    requireProof(stat.isFile() && !stat.isSymbolicLink() && stat.size > 0, "missing-next-output");
  }
  const root = realpathSync(dist);
  const hash = createHash("sha256");
  let files = 0;
  let bytes = 0;
  let links = 0;
  let entries = 0;
  const walk = (directory, prefix = "") => {
    for (const name of readdirSync(directory).sort()) {
      if (!prefix && (name === "cache" || name === NEXT_INPUT_RECEIPT)) continue;
      requireProof(!/[\\\x00-\x1f:]/.test(name), "unsafe-next-member");
      const member = prefix ? `${prefix}/${name}` : name;
      const path = join(directory, name);
      const stat = lstatSync(path);
      entries += 1;
      requireProof(entries <= 500000, "next-entry-limit");
      let record;
      if (stat.isSymbolicLink()) {
        const target = portableLinkTarget(readlinkSync(path));
        requireProof(inside(root, realpathSync(path)), "escaping-next-link");
        record = [member, "link", target];
        links += 1;
      } else if (stat.isDirectory()) {
        record = [member, "directory"];
      } else {
        requireProof(stat.isFile(), "special-next-member");
        const content = hashFile(path);
        record = [member, "file", content.sizeBytes, content.sha256];
        files += 1;
        bytes += content.sizeBytes;
        requireProof(Number.isSafeInteger(bytes), "next-byte-limit");
      }
      hash.update(`${JSON.stringify(record)}\n`);
      if (stat.isDirectory()) walk(path, member);
    }
  };
  walk(root);
  return { sha256: hash.digest("hex"), files, bytes, links, entries };
}

export function validTree(tree) {
  return (
    tree &&
    DIGEST.test(tree.sha256) &&
    ["files", "bytes", "entries"].every(
      (key) => Number.isSafeInteger(tree[key]) && tree[key] > 0
    ) &&
    Number.isSafeInteger(tree.links) &&
    tree.links >= 0
  );
}

export function writeNextInput(dist, source, producer, output) {
  requireProof(
    SHA.test(source?.candidateSha) &&
      SHA.test(source?.treeSha) &&
      DIGEST.test(source?.lockfileSha256) &&
      validTree(output),
    "invalid-next-input"
  );
  const receipt = { schemaVersion: 1, policy: "verified-next-input/1", source, producer, output };
  const bytes = `${JSON.stringify(receipt, null, 2)}\n`;
  writeFileSync(join(dist, NEXT_INPUT_RECEIPT), bytes, { flag: "wx" });
  return { receipt, sha256: sha256(bytes) };
}

export function readNextInput(dist, expectedDigest) {
  requireProof(DIGEST.test(expectedDigest || ""), "missing-independent-input-digest");
  const proof = readProofJson(join(dist, NEXT_INPUT_RECEIPT));
  requireProof(proof.sha256 === expectedDigest, "next-input-receipt-mismatch");
  const receipt = proof.value;
  requireProof(
    receipt?.schemaVersion === 1 &&
      receipt.policy === "verified-next-input/1" &&
      SHA.test(receipt.source?.candidateSha) &&
      SHA.test(receipt.source?.treeSha) &&
      DIGEST.test(receipt.source?.lockfileSha256) &&
      validTree(receipt.output) &&
      ["ci", "observer"].includes(receipt.producer?.kind),
    "invalid-next-input"
  );
  return receipt;
}

export function verifyNextInput(root, env = process.env) {
  const dist = nextDistPath(root, env);
  const receipt = readNextInput(dist, env.OMNIROUTE_NEXT_INPUT_SHA256);
  requireProof(sameIdentity(receipt.source, checkoutIdentity(root)), "next-input-source-mismatch");
  requireProof(
    JSON.stringify(measureNextTree(dist)) === JSON.stringify(receipt.output),
    "next-input-bytes-mismatch"
  );
  return receipt;
}
