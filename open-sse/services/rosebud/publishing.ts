import { mkdir, writeFile, access, rm } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { runRosebud, rosebudRoot, RosebudError, type RosebudRunner } from "./cli.ts";

export const rosebudPublishInput = z
  .object({
    gameId: z.string().uuid().optional(),
    title: z.string().min(1).max(255).optional(),
    description: z.string().max(4000).optional(),
    expectedVersion: z.string().min(1).max(100).optional(),
    files: z.record(z.string(), z.string()).optional(),
  })
  .strict();
/** Publishing has a separate permission path and never receives arbitrary server paths. */
export async function rosebudPublish(
  profile: string,
  action: "publish" | "update" | "game_status" | "pull",
  raw: unknown,
  run: RosebudRunner = runRosebud
) {
  const input = rosebudPublishInput.parse(raw);
  const gameId = input.gameId || "";
  if (!gameId) throw new RosebudError("game_id_required", 400);
  const folder = join(rosebudRoot(), "games", profile, gameId);
  const state = join(folder, "project.json"),
    build = join(folder, "build");
  await mkdir(build, { recursive: true, mode: 0o700 });
  const lock = join(folder, "operation.lock");
  try {
    await writeFile(lock, action, { flag: "wx", mode: 0o600 });
  } catch {
    throw new RosebudError("game_operation_requires_reconciliation", 409);
  }
  let preserveLock = false;
  try {
    if (action === "publish") {
      try {
        await access(state);
        throw new RosebudError("game_already_exists_use_update", 409);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
    }
    if (input.files) {
      let bytes = 0;
      for (const [path, content] of Object.entries(input.files)) {
        if (
          !/^[a-zA-Z0-9_/-]+\.[a-zA-Z0-9]+$/.test(path) ||
          path.split("/").some((p) => p === ".." || p === ".") ||
          path.startsWith("/")
        )
          throw new RosebudError("unsafe_game_path", 400);
        bytes += Buffer.byteLength(content);
        if (bytes > 10 * 1024 * 1024)
          throw new RosebudError("game_text_exceeds_platform_limit", 413);
      }
      for (const [path, content] of Object.entries(input.files)) {
        const file = join(build, path);
        await mkdir(join(file, ".."), { recursive: true });
        await writeFile(file, content, { mode: 0o600 });
      }
    }
    const args = [action === "game_status" ? "status" : action, "--state", state];
    if (["publish", "update", "pull"].includes(action)) args.push("--directory", build);
    if (input.title) args.push("--title", input.title);
    if (input.description) args.push("--description", input.description);
    if (input.expectedVersion && action === "update")
      args.push("--expected-version", input.expectedVersion);
    let result;
    try {
      result = await run(profile, args, 600000);
    } catch (error) {
      // Unknown publishes must never be retried into duplicate remote games.
      preserveLock = error instanceof RosebudError && error.uncertain;
      throw error;
    }
    // A normal active login publishes directly. Never expose private claim/approval URLs.
    return {
      gameId,
      status: result.status,
      version: result.version,
      play_url: result.play_url,
      claimed: result.claimed,
      requiresAuthorization: Boolean(result.approval_url || result.claim_url),
    };
  } finally {
    if (!preserveLock) await rm(lock, { force: true });
  }
}
