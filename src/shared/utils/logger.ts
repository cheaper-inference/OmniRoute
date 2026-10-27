/**
 * Structured Logger — Pino-based logger for OmniRoute
 *
 * Usage:
 *   import { logger } from "@/shared/utils/logger";
 *   const log = logger.child({ module: "proxy" });
 *   log.info({ model: "gpt-4o" }, "Request received");
 *   log.error({ err }, "Connection failed");
 *
 * In development, output is pretty-printed via pino-pretty.
 * In production, output is structured JSON for log aggregation.
 *
 * When APP_LOG_TO_FILE is enabled (default: true), logs are also written
 * as JSON lines to the file specified by APP_LOG_FILE_PATH.
 */
import pino from "pino";
import { EventEmitter } from "events";
import { resolve } from "path";
import { getLogConfig, initLogRotation, onLogRotation } from "@/lib/logRotation";
import { getAppLogLevel } from "@/lib/logEnv";
import { redactLogArgs } from "@/shared/utils/logRedaction";
import {
  getOrCreateSharedLoggerResource,
  type SharedLoggerResource,
} from "@/shared/utils/loggerResource";

const isDev = process.env.NODE_ENV !== "production";

const baseConfig: pino.LoggerOptions = {
  level: getAppLogLevel(isDev ? "debug" : "info"),
  base: { service: "omniroute" },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label: string) {
      return { level: label };
    },
  },
  // Final defense-in-depth redaction net: runs in the main thread (transport-safe) and
  // scrubs credentials that slip into any log message/object/error. See logRedaction.ts.
  hooks: {
    logMethod(inputArgs: unknown[], method: (...args: unknown[]) => void) {
      return (method as (...a: unknown[]) => void).apply(this, redactLogArgs(inputArgs));
    },
  },
};

function getTransportCompatibleConfig(): pino.LoggerOptions {
  const { formatters, ...rest } = baseConfig;
  if (!formatters) return rest;

  const { level: _levelFormatter, ...safeFormatters } = formatters;
  return Object.keys(safeFormatters).length > 0 ? { ...rest, formatters: safeFormatters } : rest;
}

/**
 * Build a `pino.transport()` worker-thread stream and attach an `error` listener
 * BEFORE handing it to `pino()`.
 *
 * `pino({ transport: {...} })` builds the same stream internally but never listens
 * for its `error` event. A destination that stops existing mid-run (its directory is
 * deleted — e.g. a test's tmp `DATA_DIR` removed in `after()`, or an operator wiping
 * `logs/`) makes the worker's write fail with `ENOENT`; that surfaces as an unlistened
 * `error` event on the main-thread stream, which Node re-throws as an uncaught
 * exception (issue #6360 — "resource generated asynchronous activity after the test
 * ended"). A logger must never crash its host process because its own log file
 * vanished, so failed writes are dropped (best-effort stderr notice) instead of
 * escalating.
 */
function reportTransportWriteFailure(err: unknown): void {
  try {
    process.stderr.write(
      `[logger] log transport write failed, dropping log line: ${(err as Error)?.message || err}\n`
    );
  } catch {
    // Nothing more we can do — never let a logging failure crash the process.
  }
}

function buildTransportStream(targets: NonNullable<pino.TransportMultiOptions["targets"]>) {
  const stream = pino.transport({ targets });
  stream.on("error", reportTransportWriteFailure);
  return stream;
}

type TransportStream = ReturnType<typeof buildTransportStream>;

interface OwnedLogStream {
  flushSync?: () => void;
  end?: () => void;
  once?: (event: string, listener: () => void) => unknown;
}

async function closeOwnedStream(stream: OwnedLogStream | null): Promise<void> {
  if (!stream) return;

  try {
    stream.flushSync?.();
  } catch {
    // Best-effort shutdown: a missing log destination must not block process exit.
  }

  if (!stream.end) return;

  await new Promise<void>((resolveClose) => {
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolveClose();
    };
    const fallback = setTimeout(finish, 1_000);

    stream.once?.("close", () => {
      clearTimeout(fallback);
      finish();
    });

    try {
      stream.end?.();
      if (!stream.once) {
        clearTimeout(fallback);
        finish();
      }
    } catch {
      clearTimeout(fallback);
      finish();
    }
  });
}

function createLoggerResource(
  logger: pino.Logger,
  stream: OwnedLogStream | null
): SharedLoggerResource {
  return {
    logger,
    close: () => closeOwnedStream(stream),
  };
}

function reportReopenFailure(err: unknown): void {
  try {
    process.stderr.write(
      `[logger] failed to reopen log file after rotation, continuing on rotated file: ${(err as Error)?.message || err}\n`
    );
  } catch {
    // Nothing more we can do — never let a logging failure crash the process.
  }
}

/**
 * The stable stream pino holds for the file transport; the worker-thread
 * transport behind it can be rebuilt after a log rotation.
 *
 * pino keeps the stream it was built with (children included) and the
 * `pino.transport()` worker keeps the descriptor of the file it opened, so after
 * `rotateIfNeeded()` renames app.log it would keep appending to the rotated file.
 * `reopen()` builds a fresh transport (which opens the configured path again),
 * makes it current, then flushes and ends the previous one: lines written before
 * the swap stay in the rotated file, lines written after it reach app.log.
 *
 * Every call delegates synchronously to the current transport — this class
 * buffers nothing of its own — so backpressure (`write()`'s return value and the
 * current transport's "drain"), `flushSync()`/`flush()`, and pino's exit-time
 * flush of the live transport (registered by `pino.transport()` itself) behave
 * exactly as with the bare transport.
 */
export class ReopenableTransportStream extends EventEmitter {
  private current: TransportStream;
  private ended = false;
  private configMessage: unknown[] | null = null;

  constructor(private readonly build: () => TransportStream) {
    super();
    // Keep the #6360 guarantee on the object pino holds: an "error" emitted on it
    // is reported, never re-thrown as an uncaught exception. Each transport
    // generation keeps its own listener from buildTransportStream().
    this.on("error", reportTransportWriteFailure);
    // pino announces its level/message-key config with a "message" event; a
    // pino.transport() stream forwards that to its worker. Forward it to the
    // current transport and replay it to every reopened one.
    this.on("message", (...args: unknown[]) => {
      this.configMessage = args;
      this.current.emit("message", ...args);
    });
    this.current = this.adopt(build());
  }

  private adopt(stream: TransportStream): TransportStream {
    stream.on("drain", () => {
      if (stream === this.current) this.emit("drain");
    });
    stream.on("close", () => {
      if (stream === this.current) this.emit("close");
    });
    return stream;
  }

  write(chunk: string): boolean {
    return this.current.write(chunk);
  }

  flushSync(): void {
    this.current.flushSync();
  }

  flush(callback: (err?: Error | null) => void): void {
    // thread-stream implements flush(cb) at runtime but omits it from its typings.
    const target = this.current as unknown as { flush?: (cb: typeof callback) => void };
    if (typeof target.flush === "function") target.flush(callback);
    else callback();
  }

  end(): void {
    this.ended = true;
    this.current.end();
  }

  /** Swap in a fresh transport for the configured path; no-op once ended. */
  async reopen(): Promise<void> {
    if (this.ended) return;
    let next: TransportStream;
    try {
      next = this.build();
    } catch (err) {
      reportReopenFailure(err);
      return;
    }
    if (this.configMessage) next.emit("message", ...this.configMessage);
    const previous = this.current;
    this.current = this.adopt(next);
    await closeOwnedStream(previous);
  }
}

/**
 * Logger resource whose file writer reopens the configured path after each
 * rotation of that path. Reopen failures are best-effort (stderr notice): the
 * writer keeps its previous descriptor, exactly as before rotation support.
 */
function createRotationAwareLoggerResource(
  logger: pino.Logger,
  stream: OwnedLogStream,
  absLogPath: string,
  reopen: () => void | Promise<void>
): SharedLoggerResource {
  const unsubscribe = onLogRotation((currentPath: string) => {
    if (resolve(currentPath) !== absLogPath) return;
    Promise.resolve()
      .then(reopen)
      .catch((err: unknown) => reportReopenFailure(err));
  });
  return {
    logger,
    close: async () => {
      unsubscribe();
      await closeOwnedStream(stream);
    },
  };
}

/**
 * Build the logger with optional file transport.
 * Uses pino transport targets for all destinations.
 */
function buildLoggerResource(): SharedLoggerResource {
  const logConfig = getLogConfig();
  const logLevel = (baseConfig.level as string) || "info";
  const transportConfig = getTransportCompatibleConfig();

  // If file logging is enabled, set up dual transport (stdout + file)
  if (logConfig.logToFile) {
    try {
      // Initialize log directory and rotation
      initLogRotation();

      // Resolve to absolute path for pino worker threads
      const absLogPath = resolve(logConfig.logFilePath);

      if (isDev) {
        // Dev: pino-pretty → stdout, JSON → file
        const stream = new ReopenableTransportStream(() =>
          buildTransportStream([
            {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "HH:MM:ss.l",
                ignore: "pid,hostname,service",
                messageFormat: "[{module}] {msg}",
                destination: 1,
              },
              level: logLevel,
            },
            {
              target: "pino/file",
              options: { destination: absLogPath, mkdir: true },
              level: logLevel,
            },
          ])
        );
        return createRotationAwareLoggerResource(
          pino(transportConfig, stream),
          stream,
          absLogPath,
          () => stream.reopen()
        );
      }

      // Production: JSON → stdout + JSON → file
      {
        const stream = new ReopenableTransportStream(() =>
          buildTransportStream([
            {
              target: "pino/file",
              options: { destination: 1 }, // stdout
              level: logLevel,
            },
            {
              target: "pino/file",
              options: { destination: absLogPath, mkdir: true },
              level: logLevel,
            },
          ])
        );
        return createRotationAwareLoggerResource(
          pino(transportConfig, stream),
          stream,
          absLogPath,
          () => stream.reopen()
        );
      }
    } catch (err) {
      // Log the actual error for diagnostics (issue #165)
      try {
        process.stderr.write(
          `[logger] Failed to set up file transport, attempting sync fallback: ${(err as Error)?.message || err}\n`
        );
      } catch {}

      // Fallback: use sync pino.destination() instead of worker-thread transport
      // pino.transport() uses worker threads which can fail in Next.js production bundles
      try {
        const absLogPath = resolve(logConfig.logFilePath);
        const fileDestination = pino.destination({ dest: absLogPath, mkdir: true, sync: true });
        fileDestination.on("error", (err: unknown) => {
          try {
            process.stderr.write(
              `[logger] sync log destination write failed, dropping log line: ${(err as Error)?.message || err}\n`
            );
          } catch {
            // Nothing more we can do — never let a logging failure crash the process.
          }
        });

        // Production fallback: JSON to both stdout and file via multistream.
        // The sync destination reopens the configured path in place after rotation.
        return createRotationAwareLoggerResource(
          pino(
            baseConfig,
            pino.multistream([
              { stream: process.stdout, level: logLevel as pino.Level },
              { stream: fileDestination, level: logLevel as pino.Level },
            ])
          ),
          fileDestination,
          absLogPath,
          () => fileDestination.reopen()
        );
      } catch (fallbackErr) {
        try {
          process.stderr.write(
            `[logger] Sync fallback also failed, falling back to console only: ${(fallbackErr as Error)?.message || fallbackErr}\n`
          );
        } catch {}
      }
    }
  }

  // Console-only (no file logging)
  if (isDev) {
    const stream = buildTransportStream([
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss.l",
          ignore: "pid,hostname,service",
          messageFormat: "[{module}] {msg}",
        },
        level: logLevel,
      },
    ]);
    return createLoggerResource(pino(transportConfig, stream), stream);
  }

  return createLoggerResource(pino(baseConfig), null);
}

const sharedLoggerResource = getOrCreateSharedLoggerResource(buildLoggerResource);

export const logger = sharedLoggerResource.logger;

/**
 * Create a child logger with a module tag.
 * @param {string} module - Module name for log context (e.g., "proxy", "db", "sse")
 * @returns {pino.Logger}
 */
export function createLogger(module: string) {
  return logger.child({ module });
}
