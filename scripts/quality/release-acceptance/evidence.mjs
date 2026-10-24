import { createHash } from "node:crypto";
import { constants, createReadStream } from "node:fs";
import { lstat, realpath } from "node:fs/promises";
import { join } from "node:path";
import { gateKey } from "./types.mjs";

function evidenceSegments(ref) {
  if (
    typeof ref?.artifact_id !== "string" ||
    !/^[a-zA-Z0-9_-][a-zA-Z0-9._-]*$/.test(ref.artifact_id) ||
    typeof ref.member !== "string" ||
    /[\\\s:\0]/.test(ref.member) ||
    ref.algorithm !== "sha256" ||
    !/^[0-9a-f]{64}$/.test(ref.digest ?? "")
  ) {
    return null;
  }
  const members = ref.member.split("/");
  if (members.some((part) => !part || part === "." || part === "..")) return null;
  return [ref.artifact_id, ...members];
}

async function digestFile(root, segments) {
  let file = await realpath(root);
  for (const segment of segments) {
    file = join(file, segment);
    const stat = await lstat(file);
    if (stat.isSymbolicLink()) throw new Error("symbolic evidence paths are not accepted");
  }
  if (!(await lstat(file)).isFile()) throw new Error("evidence must be a regular file");
  const digest = createHash("sha256");
  const stream = createReadStream(file, {
    flags: constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0),
  });
  for await (const chunk of stream) digest.update(chunk);
  return digest.digest("hex");
}

/** Verify retained bytes, not execution authenticity or completeness of the supplied plan. */
export async function verifyEvidenceFiles(gates, evidenceRoot) {
  const errors = [];
  for (const gate of gates) {
    const refs = Array.isArray(gate.evidence) ? gate.evidence : [];
    const fail = (code, detail) => errors.push({ code, gate: gateKey(gate), detail });
    if (gate.status === "PASS" && refs.length === 0) {
      fail("evidence_missing", "a PASS record must retain at least one evidence file");
      continue;
    }
    if (refs.length > 0 && !evidenceRoot) {
      fail("evidence_root_missing", "--evidence-root is required to verify retained files");
      continue;
    }
    for (const ref of refs) {
      const segments = evidenceSegments(ref);
      if (!segments) {
        fail("evidence_reference_invalid", "invalid artifact, member or SHA-256 reference");
        continue;
      }
      try {
        if ((await digestFile(evidenceRoot, segments)) !== ref.digest) {
          fail("evidence_digest_mismatch", "retained file bytes differ from the declared digest");
        }
      } catch {
        fail(
          "evidence_read_error",
          "declared evidence must be a readable regular file without symlinks"
        );
      }
    }
  }
  return errors;
}
