import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { grokBotComputers } from "../../../src/app/(dashboard)/dashboard/grok-bot/computers.ts";
import { ComputersPanel } from "../../../src/app/(dashboard)/dashboard/grok-bot/panels.tsx";

const response = {
  computers: [
    {
      machineId: "machine-1",
      lastSeenAtMs: "1790000000000",
      hello: {
        label: "build-host",
        localRoot: "/home/builder",
        terminalsFolder: "/tmp/terminals",
        variant: "desktop",
        kind: "user",
        serverAuthoritative: true,
        supervised: true,
        capabilities: {
          shell: true,
          aiToolSetup: true,
          localStandingGrants: false,
          localToolHelperName: "helper-1",
          mobileLocalTools: [{ toolId: "read-file", state: "available" }],
        },
      },
    },
  ],
};

test("computer presence keeps the fields the client publishes", () => {
  const [computer] = grokBotComputers(response);
  assert.equal(computer.machineId, "machine-1");
  assert.equal(computer.label, "build-host");
  assert.equal(computer.localRoot, "/home/builder");
  assert.equal(computer.terminalsFolder, "/tmp/terminals");
  assert.equal(computer.variant, "desktop");
  assert.equal(computer.kind, "user");
  assert.equal(computer.serverAuthoritative, true);
  assert.equal(computer.supervised, true);
  assert.equal(computer.lastSeen, new Date(1_790_000_000_000).toISOString());
  assert.deepEqual(computer.capabilities, [
    "aiToolSetup",
    "localToolHelperName",
    "mobileLocalTools",
    "shell",
  ]);
});

test("computer rendering accepts a path and shows the read result", () => {
  const [computer] = grokBotComputers(response);
  const html = renderToStaticMarkup(
    createElement(ComputersPanel, {
      computers: [computer],
      path: "/home/houminxi/terminals/probe.txt",
      result: "16 bytes",
      onPath: () => undefined,
      onRead: () => undefined,
    })
  );
  assert.match(html, /value="\/home\/houminxi\/terminals\/probe\.txt"/);
  assert.match(html, /16 bytes/);
});

test("computer rendering uses the readable label and metadata", () => {
  const [computer] = grokBotComputers(response);
  const html = renderToStaticMarkup(createElement(ComputersPanel, { computers: [computer] }));
  assert.match(html, /build-host/);
  assert.match(html, /\/home\/builder/);
  assert.match(html, /\/tmp\/terminals/);
  assert.match(html, /desktop/);
  assert.match(html, /user/);
  assert.match(html, /serverAuthoritative=true/);
  assert.ok(html.includes(new Date(1_790_000_000_000).toISOString()));
  assert.match(html, /supervised=true/);
  assert.match(html, /shell/);
});

test("missing and invalid computer metadata stays empty", () => {
  const [computer] = grokBotComputers({
    computers: [{ machineId: "machine-2", lastSeenAtMs: "not-a-number", hello: {} }],
  });
  assert.equal(computer.label, "");
  assert.equal(computer.localRoot, "");
  assert.equal(computer.terminalsFolder, "");
  assert.equal(computer.variant, "");
  assert.equal(computer.kind, "");
  assert.equal(computer.serverAuthoritative, false);
  assert.equal(computer.lastSeen, "");
  assert.equal(computer.supervised, false);
  assert.deepEqual(computer.capabilities, []);
});

test("an entry without a machine id is dropped", () => {
  assert.deepEqual(grokBotComputers({ computers: [{ hello: "desk" }, { machineId: "m-2" }] }), [
    {
      machineId: "m-2",
      label: "",
      lastSeen: "",
      localRoot: "",
      terminalsFolder: "",
      variant: "",
      kind: "",
      serverAuthoritative: false,
      supervised: false,
      capabilities: [],
    },
  ]);
});

test("an empty machine id is dropped", () => {
  assert.deepEqual(grokBotComputers({ computers: [{ machineId: "" }, { machineId: "m-3" }] }), [
    {
      machineId: "m-3",
      label: "",
      lastSeen: "",
      localRoot: "",
      terminalsFolder: "",
      variant: "",
      kind: "",
      serverAuthoritative: false,
      supervised: false,
      capabilities: [],
    },
  ]);
});

test("a response that is not a list is empty", () => {
  assert.deepEqual(grokBotComputers({}), []);
});
