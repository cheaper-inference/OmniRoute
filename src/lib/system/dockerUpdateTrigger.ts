/**
 * Socket-free Docker update support for the dashboard updater (`autoUpdate.ts`).
 *
 * A published-image container cannot replace itself, and mounting `/var/run/docker.sock` would
 * hand the container root on the host. Instead the operator either runs the compose command
 * shown in the dashboard (`docker-image` mode), or sets `DOCKER_UPDATE_TRIGGER_FILE` and runs a
 * host-side watcher (`docker-trigger` mode): OmniRoute only writes a small JSON request file
 * inside DATA_DIR and the host does `docker compose pull` + `up -d --force-recreate`.
 *
 * No shell is ever invoked here, and the trigger path is confined to DATA_DIR (lexically and
 * after resolving symlinks) so the authenticated update route cannot write arbitrary files.
 */
import { constants as fsConstants } from "node:fs";
import { access, mkdir, realpath, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

/** Compose service name of the published image in `docker-compose.selfhost.yml`. */
export const DEFAULT_DOCKER_IMAGE_SERVICE = "omniroute";

const COMPOSE_SERVICE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/;
const TARGET_VERSION_PATTERN = /^v?\d{1,6}\.\d{1,6}\.\d{1,6}(?:[-+][0-9A-Za-z.-]{1,64})?$/;

/**
 * Host command that updates a published-image compose service. The service name only comes from
 * operator env, but it is still restricted to a plain compose identifier so the copyable command
 * can never carry shell metacharacters.
 */
export function buildDockerImageUpdateCommand(service: string | undefined): string {
  const name =
    service && COMPOSE_SERVICE_PATTERN.test(service) ? service : DEFAULT_DOCKER_IMAGE_SERVICE;
  return `docker compose pull ${name} && docker compose up -d --force-recreate ${name}`;
}

/** True when `target` is a path strictly inside `baseDir` (not `baseDir` itself). */
export function isDockerTriggerPathInside(baseDir: string, target: string): boolean {
  const relative = path.relative(path.resolve(baseDir), path.resolve(target));
  return (
    relative !== "" &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

/**
 * The trigger directory may not exist yet (it is created on first request), so check the
 * closest existing ancestor that is still inside DATA_DIR (or DATA_DIR itself).
 */
export async function isTriggerDirWritable(dataDir: string, triggerFile: string): Promise<boolean> {
  const root = path.resolve(dataDir);
  let dir = path.dirname(path.resolve(triggerFile));
  while (true) {
    try {
      await access(dir, fsConstants.W_OK);
      return true;
    } catch (err) {
      const code = (err as NodeJS.ErrnoException)?.code;
      if (code !== "ENOENT" || dir === root) return false;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return false;
    dir = parent;
  }
}

export type DockerUpdateRequestResult = { ok: true } | { ok: false; error: string };

/**
 * Atomically write `{ requestedAt, targetVersion }` to the trigger file (temp file + rename, so a
 * host watcher never reads a half-written request). Errors are returned as fixed messages —
 * never the raw fs error — because the caller relays them in an HTTP response.
 */
export async function writeDockerUpdateRequest(
  dataDir: string,
  triggerFile: string,
  targetVersion: string,
  now: () => Date = () => new Date()
): Promise<DockerUpdateRequestResult> {
  if (!TARGET_VERSION_PATTERN.test(targetVersion)) {
    return { ok: false, error: "Invalid target version for the Docker update request." };
  }
  if (!isDockerTriggerPathInside(dataDir, triggerFile)) {
    return { ok: false, error: "DOCKER_UPDATE_TRIGGER_FILE must point inside DATA_DIR." };
  }

  const target = path.resolve(triggerFile);
  const triggerDir = path.dirname(target);
  const tmpFile = path.join(triggerDir, `.${path.basename(target)}.${process.pid}.tmp`);
  try {
    await mkdir(triggerDir, { recursive: true });
    // Re-check after resolving symlinks: a link inside DATA_DIR must not redirect the write.
    const realDataDir = await realpath(dataDir);
    const realTriggerDir = await realpath(triggerDir);
    if (realTriggerDir !== realDataDir && !isDockerTriggerPathInside(realDataDir, realTriggerDir)) {
      return { ok: false, error: "DOCKER_UPDATE_TRIGGER_FILE must point inside DATA_DIR." };
    }
    const body = JSON.stringify({ requestedAt: now().toISOString(), targetVersion });
    await writeFile(tmpFile, `${body}\n`, { mode: 0o644 });
    await rename(tmpFile, target);
    return { ok: true };
  } catch (err) {
    await rm(tmpFile, { force: true }).catch(() => undefined);
    console.error("[AutoUpdate] Failed to write the Docker update request:", err);
    return { ok: false, error: "Failed to write the Docker update request file." };
  }
}
