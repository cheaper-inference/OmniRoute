import { AsyncLocalStorage } from "node:async_hooks";
import fs from "node:fs";
import promises from "node:fs/promises";
import { syncBuiltinESMExports } from "node:module";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Test-only preload. It observes real filesystem sizes; no producer telemetry is
// used. The root is a fresh consumer-only directory, outside producer artifacts.
const root = resolve(process.env.OMNI_V8_QUOTA_ROOT || ".");
const quota = Number(process.env.OMNI_V8_QUOTA_BYTES);
if (
  !isAbsolute(process.env.OMNI_V8_QUOTA_ROOT || "") ||
  !Number.isSafeInteger(quota) ||
  quota < 2
) {
  throw new Error("Invalid isolated V8 quota fixture");
}
const original = { fs: { ...fs }, promises: { ...promises } };
const replacements = [];
const untouchedAccessors = [fs, promises].flatMap((owner) =>
  Object.entries(Object.getOwnPropertyDescriptors(owner))
    .filter(([, descriptor]) => "get" in descriptor || "set" in descriptor)
    .map(([name, descriptor]) => ({ owner, name, descriptor }))
);
const nativeCleanup = new AsyncLocalStorage();
let active = false;
let phase = "idle";
let inFlight = false;
let nativeDepth = 0;
let events = [];
let peakBytes = 0;
let peakAllocatedBytes = 0;
let writeOrdinal = 0;
let restored = false;

function fail(code, syscall) {
  const error = new Error(code);
  error.code = code;
  error.syscall = syscall;
  if (code === "ENOSPC") error.errno = -28;
  return error;
}

function replace(owner, name, value) {
  const descriptor = Object.getOwnPropertyDescriptor(owner, name);
  if (!descriptor || !("value" in descriptor)) {
    throw fail("ERR_V8_QUOTA_UNSUPPORTED_DESCRIPTOR", name);
  }
  if (!replacements.some((entry) => entry.owner === owner && entry.name === name)) {
    replacements.push({ owner, name, descriptor });
  }
  Object.defineProperty(owner, name, { ...descriptor, value });
}

function descriptorMatches({ owner, name, descriptor }) {
  const actual = Object.getOwnPropertyDescriptor(owner, name);
  return (
    actual &&
    Object.keys(actual).length === Object.keys(descriptor).length &&
    Object.keys(descriptor).every(
      (key) => Object.hasOwn(actual, key) && actual[key] === descriptor[key]
    )
  );
}

function pathOf(value) {
  if (value instanceof URL) return resolve(fileURLToPath(value));
  if (typeof value === "string" || Buffer.isBuffer(value)) return resolve(String(value));
  throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", "path");
}

function owned(value) {
  const path = pathOf(value);
  const part = relative(root, path);
  if (part === ".." || part.startsWith(`..${sep}`) || isAbsolute(part)) {
    throw fail("ERR_V8_QUOTA_OUTSIDE_ROOT", "path");
  }
  return path;
}

function measured(path = root) {
  let stat;
  try {
    stat = original.fs.lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT") return { bytes: 0, allocatedBytes: 0, files: 0 };
    throw error;
  }
  if (stat.isSymbolicLink() || (!stat.isFile() && !stat.isDirectory())) {
    throw fail("ERR_V8_QUOTA_SPECIAL_FILE", "measure");
  }
  if (stat.isFile())
    return {
      bytes: stat.size,
      allocatedBytes: Number.isSafeInteger(stat.blocks) ? stat.blocks * 512 : null,
      files: 1,
    };
  const result = { bytes: 0, allocatedBytes: 0, files: 0 };
  for (const name of original.fs.readdirSync(path)) {
    const child = measured(resolve(path, name));
    result.bytes += child.bytes;
    result.files += child.files;
    result.allocatedBytes =
      result.allocatedBytes === null || child.allocatedBytes === null
        ? null
        : result.allocatedBytes + child.allocatedBytes;
  }
  return result;
}

function dataBytes(value, options) {
  if (typeof value === "string")
    return Buffer.byteLength(
      value,
      typeof options === "string" ? options : options?.encoding || "utf8"
    );
  if (Buffer.isBuffer(value) || ArrayBuffer.isView(value)) return value.byteLength;
  throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", "writeFile-data");
}

function projectedBytes(name, args, before) {
  const path = owned(args[0]);
  if (name === "writeFile") {
    const previous = measured(path).bytes;
    const flag = typeof args[2] === "object" ? args[2]?.flag || "w" : "w";
    if (typeof flag !== "string" || !/^(?:w|wx|a|ax|as|as\+|a\+|ax\+|w\+|wx\+|r\+)$/.test(flag)) {
      throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", "writeFile-flag");
    }
    const incoming = dataBytes(args[1], args[2]);
    const next = flag.startsWith("a")
      ? previous + incoming
      : flag.startsWith("w")
        ? incoming
        : Math.max(previous, incoming);
    return before.bytes - previous + next;
  }
  if (name === "rename") {
    const destination = owned(args[1]);
    // Both source and destination are in the same monitored tree. A rename does
    // not duplicate its contents; replacing an existing target can only shrink it.
    return path === destination ? before.bytes : before.bytes - measured(destination).bytes;
  }
  if (["rm", "unlink", "rmdir"].includes(name)) return before.bytes - measured(path).bytes;
  if (["mkdir", "mkdtemp"].includes(name)) return before.bytes;
  throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", name);
}

function beforeOperation(name, args) {
  if (inFlight) throw fail("ERR_V8_QUOTA_CONCURRENT_IO", name);
  const before = measured();
  const next = projectedBytes(name, args, before);
  const event = {
    phase,
    ordinal: events.length + 1,
    operation: name,
    writeOrdinal: name === "writeFile" ? ++writeOrdinal : null,
    beforeBytes: before.bytes,
    projectedBytes: next,
    quotaBytes: quota,
  };
  events.push(event);
  if (next > quota) {
    const after = measured();
    Object.assign(event, { rejected: "ENOSPC", afterBytes: after.bytes, afterFiles: after.files });
    throw fail("ENOSPC", name);
  }
  inFlight = event;
  return event;
}

function afterOperation(event, error, release = true) {
  try {
    const after = measured();
    Object.assign(event, {
      afterBytes: after.bytes,
      afterFiles: after.files,
      afterAllocatedBytes: after.allocatedBytes,
      ...(error ? { error: error.code || "IO_ERROR" } : {}),
    });
    peakBytes = Math.max(peakBytes, after.bytes);
    if (after.allocatedBytes !== null)
      peakAllocatedBytes = Math.max(peakAllocatedBytes, after.allocatedBytes);
    if (after.bytes > quota) throw fail("ERR_V8_QUOTA_OVERSHOOT", event.operation);
  } finally {
    if (release) inFlight = false;
  }
}

function invokeNativeCleanup(name, args) {
  const scope = nativeCleanup.getStore();
  // Only Node's callback unlink/rmdir descended from the observed promise rm
  // may join that operation. The token is never exposed to caller callbacks.
  if (!scope?.open || scope.event !== inFlight || !["unlink", "rmdir"].includes(name)) {
    throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", name);
  }
  const path = owned(args[0]);
  const member = relative(scope.path, path);
  if (member === ".." || member.startsWith(`..${sep}`) || isAbsolute(member)) {
    throw fail("ERR_V8_QUOTA_OUTSIDE_CLEANUP", name);
  }
  const callback = args.at(-1);
  if (typeof callback !== "function") throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", name);
  const before = measured();
  const event = {
    phase,
    ordinal: events.length + 1,
    operation: name,
    nativeCleanup: true,
    parentOrdinal: scope.event.ordinal,
    cleanupRoot: relative(root, scope.path),
    member,
    beforeBytes: before.bytes,
    projectedBytes: before.bytes - measured(path).bytes,
    quotaBytes: quota,
    writeOrdinal: null,
  };
  events.push(event);
  const observe = (error) => {
    afterOperation(event, error, false);
    if (event.afterBytes > event.beforeBytes) throw fail("ERR_V8_QUOTA_CLEANUP_GROWTH", name);
  };
  try {
    return original.fs[name](...args.slice(0, -1), function (...values) {
      observe(values[0]);
      return callback.apply(this, values);
    });
  } catch (error) {
    observe(error);
    throw error;
  }
}

const supported = ["writeFile", "rename", "rm", "unlink", "rmdir", "mkdir", "mkdtemp"];
for (const name of supported) {
  if (typeof original.promises[name] === "function")
    replace(promises, name, async (...args) => {
      if (!active || nativeDepth) return original.promises[name](...args);
      const event = beforeOperation(name, args);
      const cleanup = name === "rm" ? { event, path: owned(args[0]), open: true } : null;
      let error;
      try {
        if (cleanup)
          return await nativeCleanup.run(cleanup, () => original.promises[name](...args));
        return await original.promises[name](...args);
      } catch (failure) {
        error = failure;
        throw failure;
      } finally {
        if (cleanup) cleanup.open = false;
        afterOperation(event, error);
      }
    });
  const syncName = `${name}Sync`;
  if (typeof original.fs[syncName] === "function")
    replace(fs, syncName, (...args) => {
      if (!active || nativeDepth) return original.fs[syncName](...args);
      const event = beforeOperation(name, args);
      let error;
      try {
        // writeFileSync internally calls public openSync/writeSync; do not count
        // the same real write twice or mistake that implementation for a bypass.
        nativeDepth++;
        return original.fs[syncName](...args);
      } catch (failure) {
        error = failure;
        throw failure;
      } finally {
        nativeDepth--;
        afterOperation(event, error);
      }
    });
}

// Unknown mutation mechanisms fail closed instead of producing a false zero.
// Add a real-I/O calibration before adopting one in the production consumer.
const unsupported = ["appendFile", "copyFile", "cp", "truncate", "ftruncate", "link", "symlink"];
for (const name of [...supported, ...unsupported]) {
  if (typeof original.fs[name] === "function")
    replace(fs, name, (...args) => {
      if (active && !nativeDepth) return invokeNativeCleanup(name, args);
      return original.fs[name](...args);
    });
}
for (const name of unsupported) {
  if (typeof original.promises[name] === "function")
    replace(promises, name, async (...args) => {
      if (active && !nativeDepth) throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", name);
      return original.promises[name](...args);
    });
  const syncName = `${name}Sync`;
  if (typeof original.fs[syncName] === "function")
    replace(fs, syncName, (...args) => {
      if (active && !nativeDepth) throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", syncName);
      return original.fs[syncName](...args);
    });
}
for (const [owner, saved, name] of [
  [fs, original.fs, "open"],
  [fs, original.fs, "openSync"],
  [promises, original.promises, "open"],
]) {
  replace(owner, name, (...args) => {
    if (active && !nativeDepth && !["r", "rs", "sr", fs.constants.O_RDONLY].includes(args[1])) {
      throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", name);
    }
    return saved[name](...args);
  });
}
for (const name of ["createWriteStream", "write", "writeSync", "writev", "writevSync"]) {
  replace(fs, name, (...args) => {
    if (active && !nativeDepth) throw fail("ERR_V8_QUOTA_UNOBSERVED_IO", name);
    return original.fs[name](...args);
  });
}
syncBuiltinESMExports();

export const quotaObserver = {
  start(name) {
    if (active || inFlight || measured().bytes !== 0)
      throw fail("ERR_V8_QUOTA_DIRTY_START", "start");
    active = true;
    phase = name;
    events = [];
    peakBytes = 0;
    peakAllocatedBytes = 0;
    writeOrdinal = 0;
  },
  stop() {
    const final = measured();
    active = false;
    return {
      phase,
      quotaBytes: quota,
      peakBytes,
      peakAllocatedBytes,
      finalBytes: final.bytes,
      finalFiles: final.files,
      events: structuredClone(events),
    };
  },
  restore() {
    active = false;
    // Restore exactly the descriptors replaced above. Other Node exports may be
    // getter-only functions (for example Utf8Stream); they were never patched.
    for (const { owner, name, descriptor } of replacements) {
      Object.defineProperty(owner, name, descriptor);
    }
    syncBuiltinESMExports();
    restored =
      replacements.every(descriptorMatches) &&
      untouchedAccessors.every(descriptorMatches) &&
      supported.every(
        (name) =>
          promises[name] === original.promises[name] &&
          fs[`${name}Sync`] === original.fs[`${name}Sync`]
      );
    return restored;
  },
  isOriginal(asyncWrite, syncWrite, asyncRename, asyncRm) {
    return (
      restored &&
      asyncWrite === original.promises.writeFile &&
      syncWrite === original.fs.writeFileSync &&
      asyncRename === original.promises.rename &&
      asyncRm === original.promises.rm
    );
  },
};
