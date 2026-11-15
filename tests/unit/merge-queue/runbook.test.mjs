// omni-queue runbook (docs/ops/OMNI_QUEUE.md): its event table and its configuration-key table
// name exactly what the code has. The lists come from the code, never from a copy typed here:
// the event types from EVENT_TYPES (contracts.mjs), the configuration keys from what
// validateConfig (config.mjs) reads, recorded through a Proxy.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateConfig } from "../../../scripts/merge-queue/config.mjs";
import { EVENT_TYPES } from "../../../scripts/merge-queue/contracts.mjs";

const RUNBOOK = readFileSync(new URL("../../../docs/ops/OMNI_QUEUE.md", import.meta.url), "utf8");

/**
 * The first cell of every body row of the table(s) under the level-2 heading `heading`, without
 * its backticks. Fails when the section or its table is missing, or a first cell is not exactly
 * one name in backticks.
 */
function firstCells(heading) {
  const lines = RUNBOOK.split("\n");
  const start = lines.indexOf(`## ${heading}`);
  assert.notEqual(start, -1, `the runbook has a "## ${heading}" section`);
  const end = lines.findIndex((line, i) => i > start && line.startsWith("## "));
  const section = lines.slice(start + 1, end === -1 ? undefined : end);
  const isRow = (line) => line?.startsWith("|");
  const isSeparator = (line) => isRow(line) && /^\|(?:\s*:?-+:?\s*\|)+$/.test(line.trim());
  // A table is a header row, a separator row, then body rows: keep only the body rows.
  const body = section
    .filter((line, i) => isRow(line) && !isSeparator(line) && !isSeparator(section[i + 1]))
    .map((line) => line.split("|")[1].trim());
  assert.ok(body.length > 0, `the "## ${heading}" section has a table`);
  return body.map((cell) => {
    const match = /^`([^`]+)`$/.exec(cell);
    assert.ok(
      match,
      `"## ${heading}": first cell ${JSON.stringify(cell)} is one name in backticks`
    );
    return match[1];
  });
}

/**
 * Every configuration key validateConfig reads, nested ones written with dots (`batch.minSize`).
 * The validator is given a Proxy that owns no key: each property it reads or tests with
 * Object.hasOwn is recorded under its path, and a read answers a nested Proxy, so the keys of
 * `batch` and `landing` are recorded too, optional ones (`landing.actor`) included. A path whose
 * own keys were read is a group (`batch`), not a key.
 *
 * The probe finds only the keys validateConfig reads. It relies on the project rule that every
 * accepted key is validated: a key that only sits in an allowlist (accepted as known, its value
 * never read) would be missed here, and its missing row would go unnoticed.
 */
function configKeys() {
  const seen = new Set();
  const probe = (path) => {
    const children = new Map();
    const record = (key) => {
      if (typeof key !== "string") return null;
      const child = path ? `${path}.${key}` : key;
      seen.add(child);
      return child;
    };
    return new Proxy(
      {},
      {
        get(_target, key) {
          const child = record(key);
          if (child === null) return undefined;
          if (!children.has(key)) children.set(key, probe(child));
          return children.get(key);
        },
        has(_target, key) {
          record(key);
          return false;
        },
        getOwnPropertyDescriptor(_target, key) {
          record(key);
          return undefined;
        },
        ownKeys: () => [],
      }
    );
  };
  const result = validateConfig(probe(""));
  assert.equal(result.ok, false, "the probe is not a valid config");
  const keys = [...seen].filter((key) => ![...seen].some((other) => other.startsWith(`${key}.`)));
  return keys.sort();
}

test("the config-key probe records top-level, nested and optional keys", () => {
  const keys = configKeys();
  // Spot checks of the probe itself: one plain key, one nested, one optional nested.
  for (const key of ["mode", "batch.minSize", "landing.actor"]) assert.ok(keys.includes(key), key);
  assert.ok(!keys.includes("batch"), "a group is not a key");
  // The probe finds real keys, not stray reads: each one is written in the shipped config, which
  // is valid (every config key, optional ones included, is written in config.json).
  const shipped = JSON.parse(
    readFileSync(new URL("../../../config/merge-queue/config.json", import.meta.url), "utf8")
  );
  assert.deepEqual(validateConfig(shipped).errors, [], "the shipped config is valid");
  const inShipped = (key) =>
    key
      .split(".")
      .reduce(
        (node, part) => (node && Object.hasOwn(node, part) ? node[part] : undefined),
        shipped
      ) !== undefined;
  assert.deepEqual(
    keys.filter((key) => !inShipped(key)),
    [],
    "keys the probe found that the shipped config does not write"
  );
});

test("every event type is in the runbook's event table, and the table names no other", () => {
  const documented = firstCells("Events");
  const missing = EVENT_TYPES.filter((type) => !documented.includes(type));
  assert.deepEqual(missing, [], "event types missing from the runbook's ## Events table");
  const unknown = documented.filter((type) => !EVENT_TYPES.includes(type));
  assert.deepEqual(unknown, [], "rows of ## Events that are not in EVENT_TYPES");
  assert.equal(new Set(documented).size, documented.length, "one row per event type");
});

test("every config key is in the runbook's key table, and the table names no other", () => {
  const keys = configKeys();
  const documented = firstCells("Configuration keys");
  const missing = keys.filter((key) => !documented.includes(key));
  assert.deepEqual(
    missing,
    [],
    "config keys missing from the runbook's ## Configuration keys table"
  );
  const unknown = documented.filter((key) => !keys.includes(key));
  assert.deepEqual(unknown, [], "rows of ## Configuration keys that validateConfig does not read");
  assert.equal(new Set(documented).size, documented.length, "one row per key");
});
