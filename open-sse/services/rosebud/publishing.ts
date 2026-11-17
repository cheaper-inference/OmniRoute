import { mkdir, writeFile, access, rm } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import {
  runRosebud,
  rosebudRoot,
  RosebudError,
  rosebudProfile,
  type JsonObject,
  type RosebudRunner,
} from "./cli.ts";

export const rosebudPublishInput = z
  .object({
    gameId: z.string().uuid(),
    title: z.string().min(1).max(255).optional(),
    description: z.string().max(4000).optional(),
    expectedVersion: z.string().min(1).max(100).optional(),
    files: z.record(z.string(), z.string()).optional(),
  })
  .strict();
type PublishInput = z.infer<typeof rosebudPublishInput>;
type GameAction = "publish" | "update" | "game_status" | "pull";

const MAX_GAME_TEXT_BYTES = 10 * 1024 * 1024;

/** Never expose private claim or approval URLs; a normal active login publishes directly. */
const gameResult = (gameId: string, result: JsonObject) => ({
  gameId,
  status: result.status,
  version: result.version,
  play_url: result.play_url,
  claimed: result.claimed,
  requiresAuthorization: Boolean(result.approval_url || result.claim_url),
});

async function claimGameOperation(lock: string, action: GameAction) {
  try {
    await writeFile(lock, action, { flag: "wx", mode: 0o600 });
  } catch {
    throw new RosebudError("game_operation_requires_reconciliation", 409);
  }
}

async function assertGameIsNew(state: string) {
  try {
    await access(state);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
    throw error;
  }
  throw new RosebudError("game_already_exists_use_update", 409);
}

function isUnsafeGamePath(path: string) {
  return (
    !/^[a-zA-Z0-9_/-]+\.[a-zA-Z0-9]+$/.test(path) ||
    path.split("/").some((part) => part === ".." || part === ".") ||
    path.startsWith("/")
  );
}

/** Validate the whole file map before the first write. */
async function writeGameFiles(build: string, files: Record<string, string>) {
  let bytes = 0;
  for (const [path, content] of Object.entries(files)) {
    if (isUnsafeGamePath(path)) throw new RosebudError("unsafe_game_path", 400);
    bytes += Buffer.byteLength(content);
    if (bytes > MAX_GAME_TEXT_BYTES)
      throw new RosebudError("game_text_exceeds_platform_limit", 413);
  }
  for (const [path, content] of Object.entries(files)) {
    const file = join(build, path);
    await mkdir(join(file, ".."), { recursive: true });
    await writeFile(file, content, { mode: 0o600 });
  }
}

function gameCliArgs(action: GameAction, state: string, build: string, input: PublishInput) {
  const args: string[] = [action, "--state", state];
  if (["publish", "update", "pull"].includes(action)) args.push("--directory", build);
  if (input.title) args.push("--title", input.title);
  if (input.description) args.push("--description", input.description);
  if (input.expectedVersion && action === "update")
    args.push("--expected-version", input.expectedVersion);
  return args;
}

/** Publishing has a separate permission path and never receives arbitrary server paths. */
export async function rosebudPublish(
  profile: string,
  action: GameAction,
  raw: unknown,
  run: RosebudRunner = runRosebud
) {
  await rosebudProfile(profile);
  const input = rosebudPublishInput.parse(raw);
  const { gameId } = input;
  const folder = join(rosebudRoot(), "games", profile, gameId);
  const state = join(folder, "project.json"),
    build = join(folder, "build");
  await mkdir(build, { recursive: true, mode: 0o700 });
  if (action === "game_status")
    return gameResult(gameId, await run(profile, ["status", "--state", state]));
  const lock = join(folder, "operation.lock");
  await claimGameOperation(lock, action);
  let preserveLock = false;
  try {
    if (action === "publish") await assertGameIsNew(state);
    if (input.files) await writeGameFiles(build, input.files);
    try {
      return gameResult(
        gameId,
        await run(profile, gameCliArgs(action, state, build, input), 600000)
      );
    } catch (error) {
      // Unknown publishes must never be retried into duplicate remote games.
      preserveLock = error instanceof RosebudError && error.uncertain;
      throw error;
    }
  } finally {
    if (!preserveLock) await rm(lock, { force: true });
  }
}
