import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, link, rm } from "node:fs/promises";
import { join } from "node:path";
import { RosebudError, rosebudRoot } from "./cli.ts";

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, canonical(v)])
    );
  return value;
}

/** Pin a caller's retry to the original account before another paid submit is possible. */
export async function rosebudImageBinding(
  scope: string,
  key: unknown,
  body: unknown,
  allowed: string[] | null,
  candidate?: string
): Promise<string | undefined> {
  if (key === undefined || key === null) return undefined;
  if (typeof key !== "string" || key.length < 1 || key.length > 200)
    throw new RosebudError("invalid_idempotency_key", 400);
  const digest = (value: unknown) =>
    createHash("sha256").update(JSON.stringify(value)).digest("hex");
  const fingerprint = digest(canonical(body));
  const folder = join(rosebudRoot(), "image-bindings");
  const file = join(folder, digest([scope, key]) + ".json");
  if (candidate) {
    await mkdir(folder, { recursive: true, mode: 0o700 });
    const temporary = file + "." + randomUUID();
    await writeFile(temporary, JSON.stringify({ connectionId: candidate, fingerprint }), {
      mode: 0o600,
    });
    try {
      await link(temporary, file);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    } finally {
      await rm(temporary, { force: true });
    }
  }
  let saved;
  try {
    saved = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
  if (saved.fingerprint !== fingerprint) throw new RosebudError("idempotency_conflict", 409);
  if (typeof saved.connectionId !== "string") throw new RosebudError("invalid_image_binding", 409);
  if (allowed?.length && !allowed.includes(saved.connectionId))
    throw new RosebudError("connection_not_allowed", 403);
  return saved.connectionId;
}

/** Keep user-provided keys from colliding across independently authenticated callers. */
export function scopedRosebudKey(scope: string, key: string) {
  return (
    "caller-" +
    createHash("sha256")
      .update(JSON.stringify([scope, key]))
      .digest("hex")
  );
}

export function matchesRosebudPin(pinned: string | undefined, selected: string | undefined) {
  return !pinned || pinned === selected;
}
