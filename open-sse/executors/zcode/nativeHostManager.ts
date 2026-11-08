import { fork, type ChildProcess } from "node:child_process";
import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile, rename, readdir, access } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { resolveDataDir } from "../../../src/lib/dataPaths.ts";
import type { ExecuteInput, ProviderCredentials } from "../base.ts";
import { NativeSessionError } from "./nativeSession.ts";
import { exchangeZaiBusinessToken, isLegacyZaiOAuthToken } from "./oauthGrant.ts";

type NativeAccount = {
  connectionId: string;
  family: "zai" | "bigmodel";
  userId: string;
  name: string;
  accessToken: string;
  refreshToken?: string;
  idToken: string;
};
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export function nativeAccountFromCredentials(credentials: ProviderCredentials): NativeAccount {
  const data = credentials.providerSpecificData || {};
  if (
    !credentials.connectionId ||
    !credentials.accessToken ||
    !credentials.idToken ||
    typeof data.userId !== "string" ||
    !["zai", "bigmodel"].includes(String(data.family))
  )
    throw new NativeSessionError("ZCode account needs a complete OAuth login", 401);
  return {
    connectionId: credentials.connectionId,
    family: data.family as NativeAccount["family"],
    userId: data.userId,
    name: String(data.email || data.userId),
    accessToken: credentials.accessToken,
    refreshToken: credentials.refreshToken || undefined,
    idToken: credentials.idToken,
  };
}
async function privateWrite(path: string, value: unknown): Promise<void> {
  const temporary = `${path}.${randomBytes(8).toString("hex")}.tmp`;
  await writeFile(temporary, JSON.stringify(value), { mode: 0o600, flag: "wx" });
  await rename(temporary, path);
}
function encrypt(value: string, secret: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", createHash("sha256").update(secret).digest(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return `enc:v1:${iv.toString("base64url")}.${cipher.getAuthTag().toString("base64url")}.${encrypted.toString("base64url")}`;
}

/** Seed only a new/re-authorized grant. Preserve native refreshed state on ordinary restarts. */
export async function prepareNativeAccountState(root: string, account: NativeAccount) {
  const directory = join(root, hash(account.connectionId));
  const config = join(directory, ".zcode", "v2");
  const run = join(directory, ".zcode", "server", "run");
  await mkdir(config, { recursive: true, mode: 0o700 });
  await mkdir(run, { recursive: true, mode: 0o700 });
  const secretPath = join(directory, "cipher-secret");
  try {
    await writeFile(secretPath, randomBytes(32).toString("base64url"), { flag: "wx", mode: 0o600 });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }
  const secret = await readFile(secretPath, "utf8");
  const identity = hash(`${account.family}:${account.userId}`);
  const fingerprint = hash(
    JSON.stringify([account.accessToken, account.refreshToken, account.idToken])
  );
  let previous: { identity?: string; fingerprint?: string } = {};
  try {
    previous = JSON.parse(await readFile(join(directory, "account.json"), "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (previous.identity && previous.identity !== identity)
    throw new NativeSessionError(
      "Native ZCode account identity changed; reconnect this account",
      409
    );
  if (previous.fingerprint !== fingerprint) {
    const plain: Record<string, string> = {
      "oauth:active_provider": account.family,
      [`oauth:${account.family}:access_token`]: account.accessToken,
      [`oauth:${account.family}:user_info`]: JSON.stringify({
        id: account.userId,
        username: account.name,
        displayName: account.name,
      }),
      zcodejwttoken: account.idToken,
      ...(account.refreshToken
        ? { [`oauth:${account.family}:refresh_token`]: account.refreshToken }
        : {}),
    };
    await privateWrite(
      join(config, "credentials.json"),
      Object.fromEntries(
        Object.entries(plain).map(([name, value]) => [name, encrypt(value, secret)])
      )
    );
    await privateWrite(join(config, "setting.json"), {
      providerFamilyDomain: account.family,
      providerFamilyConnectionSelections: { [account.family]: { kind: "individual-coding-plan" } },
    });
    await privateWrite(join(directory, "account.json"), { identity, fingerprint });
  }
  return { directory, serverRoot: join(directory, ".zcode", "server"), secret, fingerprint };
}

/** Return the first complete pinned runtime, retaining the previous version as fallback. */
async function firstAvailableRuntime(candidates: unknown[]): Promise<string | undefined> {
  for (const root of candidates) {
    if (typeof root !== "string" || !root.startsWith("/")) continue;
    try {
      await Promise.all(
        ["node", "server-core.js", "zcode.cjs"].map((file) => access(join(root, file)))
      );
      return root;
    } catch {
      // Preserve the last installed version when a selected directory is missing.
    }
  }
  return undefined;
}

export async function resolveNativeRuntime(dataDirectory = resolveDataDir()): Promise<string> {
  if (process.env.ZCODE_NATIVE_RUNTIME) {
    const root = resolve(process.env.ZCODE_NATIVE_RUNTIME);
    await Promise.all(
      ["node", "server-core.js", "zcode.cjs"].map((file) => access(join(root, file)))
    );
    return root;
  }
  const pointerPath = join(dataDirectory, "zcode-native-runtime", "current.json");
  let pointer: { runtime?: string; previousRuntime?: string } | undefined;
  try {
    pointer = JSON.parse(await readFile(pointerPath, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT")
      throw new NativeSessionError("The pinned ZCode runtime manifest is invalid", 503);
  }
  if (pointer) {
    const pinned = await firstAvailableRuntime([pointer.runtime, pointer.previousRuntime]);
    if (pinned) return pinned;
    throw new NativeSessionError("The pinned ZCode runtime is unavailable", 503);
  }
  const releases = join(homedir(), ".zcode", "server", "releases");
  const versions = (await readdir(releases))
    .filter((name) => /^\d+\.\d+\.\d+-/.test(name))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  for (const version of versions) {
    const root = join(releases, version, "runtime");
    try {
      await Promise.all(
        ["node", "server-core.js", "zcode.cjs"].map((file) => access(join(root, file)))
      );
      return root;
    } catch {
      /* An incomplete installation is not a runnable release. */
    }
  }
  throw new NativeSessionError("A compatible ZCode native server runtime is not installed", 503);
}

function nativeHostEnvironment(
  runtime: string,
  state: Awaited<ReturnType<typeof prepareNativeAccountState>>
): NodeJS.ProcessEnv {
  // Native hosts own their account, endpoint and engine configuration. Legacy
  // gateway/debug overrides must not leak into the unmodified native runtime.
  const inheritedEnv = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !key.startsWith("ZCODE_"))
  );
  const env: NodeJS.ProcessEnv = {
    ...inheritedEnv,
    NODE_ENV: process.env.NODE_ENV || "production",
    // Native MCP discovery also reads the OS home, outside ZCODE_* paths.
    // Keep the operator's global MCP servers out of caller-owned sessions.
    HOME: state.directory,
    USERPROFILE: state.directory,
    XDG_CONFIG_HOME: join(state.directory, ".config"),
    ZCODE_DATA_BASE_DIR: state.directory,
    ZCODE_DESKTOP_HOME_DIR: state.directory,
    ZCODE_STORAGE_DIR: join(state.directory, ".zcode"),
    ZCODE_HOME: join(state.directory, ".zcode"),
    ZCODE_CREDENTIAL_SECRET: state.secret,
    ZCODE_AGENT_SERVER_COMMAND: join(runtime, "node"),
    ZCODE_AGENT_SERVER_ARGS_JSON: JSON.stringify([
      join(runtime, "zcode.cjs"),
      "app-server",
      "--stdio",
    ]),
  };
  delete env.ZCODE_SERVER_ROOT;
  delete env.NODE_OPTIONS;
  return env;
}

type Host = { child: ChildProcess; fingerprint: string; serverRoot: string };
export class NativeZcodeHostManager {
  private hosts = new Map<string, Host>();
  private starting = new Map<string, Promise<string>>();
  private migrated = new Map<string, Promise<string>>();
  constructor(
    private options: { stateRoot?: string; runtime?: string; startupTimeoutMs?: number } = {}
  ) {}

  async ensure(
    credentials: ProviderCredentials,
    persist?: ExecuteInput["onCredentialsRefreshed"]
  ): Promise<string> {
    const account = nativeAccountFromCredentials(credentials);
    if (
      account.family === "zai" &&
      credentials.providerSpecificData?.accessTokenFormat !== "business" &&
      isLegacyZaiOAuthToken(account.accessToken)
    ) {
      const key = hash(account.accessToken);
      let migration = this.migrated.get(key);
      if (!migration) {
        if (this.migrated.size >= 100) this.migrated.delete(this.migrated.keys().next().value!);
        migration = exchangeZaiBusinessToken(account.accessToken).catch((error) => {
          this.migrated.delete(key);
          throw error;
        });
        this.migrated.set(key, migration);
      }
      account.accessToken = await migration;
      await persist?.({
        accessToken: account.accessToken,
        providerSpecificData: {
          ...credentials.providerSpecificData,
          accessTokenFormat: "business",
        },
      });
    }
    const fingerprint = hash(
      JSON.stringify([account.accessToken, account.refreshToken, account.idToken])
    );
    const host = this.hosts.get(account.connectionId);
    if (
      host &&
      host.child.exitCode === null &&
      !host.child.killed &&
      host.fingerprint === fingerprint
    )
      return host.serverRoot;
    const existing = this.starting.get(account.connectionId);
    if (existing) {
      await existing;
      return this.ensure(credentials, persist);
    }
    const task = this.start(account);
    this.starting.set(account.connectionId, task);
    try {
      return await task;
    } finally {
      this.starting.delete(account.connectionId);
    }
  }

  private async start(account: NativeAccount): Promise<string> {
    const old = this.hosts.get(account.connectionId);
    if (old) {
      await this.stop(old.child);
      this.hosts.delete(account.connectionId);
    }
    const runtime = this.options.runtime || (await resolveNativeRuntime());
    const state = await prepareNativeAccountState(
      this.options.stateRoot || join(resolveDataDir(), "zcode-native"),
      account
    );
    const env = nativeHostEnvironment(runtime, state);
    const child = fork(join(runtime, "server-core.js"), ["1"], {
      execPath: join(runtime, "node"),
      execArgv: [],
      cwd: state.directory,
      env,
      stdio: ["ignore", "ignore", "ignore", "ipc"],
    });
    try {
      await new Promise<void>((resolveReady, reject) => {
        const timer = setTimeout(
          () => reject(new NativeSessionError("Native ZCode startup timed out", 504)),
          this.options.startupTimeoutMs ?? 30_000
        );
        const fail = () => {
          clearTimeout(timer);
          reject(new NativeSessionError("Native ZCode host stopped during startup", 503));
        };
        child.once("error", fail);
        child.once("exit", fail);
        child.on("message", (message) => {
          const value = message as { type?: string; port?: number; version?: string };
          if (value.type === "fatal") {
            fail();
            return;
          }
          if (value.type !== "ready" || !Number.isInteger(value.port)) return;
          clearTimeout(timer);
          void privateWrite(join(state.serverRoot, "run", "status.json"), {
            state: "ready",
            port: value.port,
            pid: child.pid,
            version: value.version,
          }).then(resolveReady, reject);
        });
      });
      this.hosts.set(account.connectionId, {
        child,
        fingerprint: state.fingerprint,
        serverRoot: state.serverRoot,
      });
      child.once("exit", () => {
        if (this.hosts.get(account.connectionId)?.child === child)
          this.hosts.delete(account.connectionId);
      });
      return state.serverRoot;
    } catch (error) {
      await this.stop(child);
      throw error;
    }
  }
  private async stop(child: ChildProcess) {
    if (child.exitCode !== null || child.signalCode !== null) return;
    await new Promise<void>((resolveStopped) => {
      const timer = setTimeout(() => {
        child.kill("SIGKILL");
        resolveStopped();
      }, 5000);
      timer.unref();
      child.once("exit", () => {
        clearTimeout(timer);
        resolveStopped();
      });
      child.kill("SIGTERM");
    });
  }
  async close(): Promise<void> {
    await Promise.allSettled([...this.starting.values()]);
    await Promise.allSettled([...this.hosts.values()].map((host) => this.stop(host.child)));
    this.hosts.clear();
  }
}

/** Shared per-account hosts for inference and quota readback. */
const processGlobals = globalThis as typeof globalThis & {
  __omnirouteNativeZcodeHosts?: NativeZcodeHostManager;
};
export const nativeZcodeHosts = (processGlobals.__omnirouteNativeZcodeHosts ??=
  new NativeZcodeHostManager());
