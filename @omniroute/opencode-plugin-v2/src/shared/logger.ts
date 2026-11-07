/**
 * Namespaced leveled logger shared by the OmniRoute OpenCode packages.
 *
 * Levels: error < warn < info < debug. Default: warn.
 * Ported from the v1 plugin (`logger.ts`) so both new packages share one
 * sink instead of raw `console.warn` / `console.log` calls.
 */

export type LogLevel = "error" | "warn" | "info" | "debug";

/** Synchronous host-log receiver: the host forwards plugin lines to its own log. */
export type HostLogSink = (level: LogLevel, message: string) => unknown;

const LEVEL_ORDER: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const TAG = "[omniroute-plugin]";

function shouldLog(current: LogLevel, target: LogLevel): boolean {
  return LEVEL_ORDER[current] >= LEVEL_ORDER[target];
}

let _level: LogLevel = "warn";

/** Optional host-log receiver (module-global, same pattern as the log level). */
let _hostSink: HostLogSink | undefined;

/** A host-log send already failed once in this process: stay on console only. */
let _hostSinkFailed = false;

export function setLogLevel(level: LogLevel): void {
  _level = level;
}

export function getLogLevel(): LogLevel {
  return _level;
}

/**
 * Point plugin log lines at the host log as well as the console. Pass
 * `undefined` to drop the receiver (and clear the send-once failure
 * marker so a later receiver starts clean).
 */
export function setHostSink(sink: HostLogSink | undefined): void {
  _hostSink = sink;
  if (sink === undefined) _hostSinkFailed = false;
}

function fmt(level: LogLevel, msg: string, tag?: string): string {
  const prefix = tag ? `${TAG}${tag}` : TAG;
  return `${prefix} [${level.toUpperCase()}] ${msg}`;
}

function emitHostSink(level: LogLevel, line: string): void {
  if (_hostSink === undefined || _hostSinkFailed) return;
  try {
    const sent = _hostSink(level, line);
    // A host client that answers asynchronously still reports delivery
    // failures: keep the once-only console trace for its rejection too.
    if (sent !== null && (typeof sent === "object" || typeof sent === "function")) {
      const then = (sent as { then?: unknown }).then;
      if (typeof then === "function") {
        (sent as Promise<unknown>).then(undefined, (err: unknown) => {
          if (_hostSinkFailed) return;
          _hostSinkFailed = true;
          console.warn(
            `${TAG} [WARN] host log sink failed, keeping console output: ${err instanceof Error ? err.message : String(err)}`
          );
        });
      }
    }
  } catch (err) {
    if (_hostSinkFailed) return;
    _hostSinkFailed = true;
    console.warn(
      `${TAG} [WARN] host log sink failed, keeping console output: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

function buildLogger(getLevel: () => LogLevel) {
  return {
    error(msg: string, ...args: unknown[]): void {
      if (shouldLog(getLevel(), "error")) {
        const line = fmt("error", msg);
        console.error(line, ...args);
        emitHostSink("error", [line, ...args.map(String)].join(" "));
      }
    },
    warn(msg: string, ...args: unknown[]): void {
      if (shouldLog(getLevel(), "warn")) {
        const line = fmt("warn", msg);
        console.warn(line, ...args);
        emitHostSink("warn", [line, ...args.map(String)].join(" "));
      }
    },
    info(msg: string, ...args: unknown[]): void {
      if (shouldLog(getLevel(), "info")) {
        const line = fmt("info", msg);
        console.warn(line, ...args);
        emitHostSink("info", [line, ...args.map(String)].join(" "));
      }
    },
    debug(msg: string, ...args: unknown[]): void {
      if (shouldLog(getLevel(), "debug")) {
        const line = fmt("debug", msg);
        console.warn(line, ...args);
        emitHostSink("debug", [line, ...args.map(String)].join(" "));
      }
    },
    /** Always emit regardless of level (for critical init breadcrumbs). */
    always(msg: string, ...args: unknown[]): void {
      const line = `${TAG} ${msg}`;
      console.warn(line, ...args);
      emitHostSink("warn", [line, ...args.map(String)].join(" "));
    },

    child(tag: string) {
      return {
        error: (msg: string, ...args: unknown[]) => {
          if (shouldLog(getLevel(), "error")) {
            const line = fmt("error", msg, tag);
            console.error(line, ...args);
            emitHostSink("error", [line, ...args.map(String)].join(" "));
          }
        },
        warn: (msg: string, ...args: unknown[]) => {
          if (shouldLog(getLevel(), "warn")) {
            const line = fmt("warn", msg, tag);
            console.warn(line, ...args);
            emitHostSink("warn", [line, ...args.map(String)].join(" "));
          }
        },
        info: (msg: string, ...args: unknown[]) => {
          if (shouldLog(getLevel(), "info")) {
            const line = fmt("info", msg, tag);
            console.warn(line, ...args);
            emitHostSink("info", [line, ...args.map(String)].join(" "));
          }
        },
        debug: (msg: string, ...args: unknown[]) => {
          if (shouldLog(getLevel(), "debug")) {
            const line = fmt("debug", msg, tag);
            console.warn(line, ...args);
            emitHostSink("debug", [line, ...args.map(String)].join(" "));
          }
        },
      };
    },
  };
}

export type Logger = ReturnType<typeof buildLogger>;

/** Create an instance-scoped logger whose level cannot be changed by other instances. */
export function createLogger(level: LogLevel): Logger {
  return buildLogger(() => level);
}

/** Backward-compatible module-global logger controlled by setLogLevel(). */
export const logger: Logger = buildLogger(() => _level);
