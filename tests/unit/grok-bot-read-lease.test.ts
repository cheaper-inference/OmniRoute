import assert from "node:assert/strict";
import { it } from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { NextResponse } from "next/server";
import * as query from "../../src/app/(dashboard)/dashboard/grok-bot/query.ts";
import * as roster from "../../src/app/(dashboard)/dashboard/grok-bot/roster.ts";
import * as computers from "../../src/app/(dashboard)/dashboard/grok-bot/computers.ts";
import * as details from "../../src/app/(dashboard)/dashboard/grok-bot/details.ts";
import * as overlap from "../../src/app/(dashboard)/dashboard/grok-bot/overlap.ts";

function harness(transcript: boolean, leased: boolean, denied = false) {
  const events: string[] = [];
  const prefix = transcript ? "../../../../../" : "../../../../";
  const domain = prefix + "(dashboard)/dashboard/grok-bot/";
  const modules: Record<string, unknown> = {
    "next/server": { NextResponse },
    "@/lib/api/requireManagementAuth": {
      requireManagementAuth: async () =>
        denied ? NextResponse.json({ error: "Unauthorized" }, { status: 401 }) : null,
    },
    "@/lib/exclusiveLeaseIsolation": {
      isConnectionUnavailableToAuxiliaryActivity: async (id: string) => {
        assert.equal(id, "connection");
        events.push("lease");
        return leased;
      },
    },
    "@/lib/db/providers": {
      getProviderConnectionById: async () => ({ id: "connection", provider: "grok-bot" }),
    },
    [transcript ? "../tokenSource" : "./tokenSource"]: {
      grokBotToken: async () => {
        events.push("token");
        return { accessToken: "synthetic" };
      },
    },
    [domain + "read"]: {
      grokBotRead: async () => {
        events.push("rpc");
        return {};
      },
    },
    [domain + "query"]: query,
    [domain + "roster"]: roster,
    [domain + "computers"]: computers,
    [domain + "details"]: details,
    [domain + "overlap"]: overlap,
    [domain + "watchStream"]: {
      watchStream: ({ release }: { release: () => void }) => {
        events.push("stream");
        release();
        return new ReadableStream({ start: (controller) => controller.close() });
      },
    },
  };
  const path = transcript ? "transcript/route.ts" : "route.ts";
  const source = readFileSync(
    new URL("../../src/app/api/providers/[id]/grok-bot/" + path, import.meta.url),
    "utf8"
  );
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports: {
    GET?: (request: Request, context: { params: Promise<{ id: string }> }) => Promise<Response>;
  } = {};
  runInNewContext(code, {
    exports,
    URL,
    Response,
    require: (id: string) => {
      if (!(id in modules)) throw new Error("Unmocked dependency: " + id);
      return modules[id];
    },
  });
  return {
    events,
    get: () =>
      exports.GET!(new Request("http://localhost/api?agentId=agent"), {
        params: Promise.resolve({ id: "connection" }),
      }),
  };
}

for (const transcript of [false, true]) {
  it(
    "fences leased Grok " + (transcript ? "transcript" : "roster") + " before refresh/dispatch",
    async () => {
      const h = harness(transcript, true);
      const response = await h.get();
      assert.equal(response.status, 409);
      assert.deepEqual(await response.json(), { error: "exclusive_lease_active" });
      assert.deepEqual(h.events, ["lease"]);
    }
  );
  it("keeps free Grok " + (transcript ? "transcript" : "roster") + " available", async () => {
    const h = harness(transcript, false);
    assert.equal((await h.get()).status, 200);
    assert.equal(h.events[0], "lease");
    assert.ok(h.events.includes(transcript ? "stream" : "rpc"));
  });
  it("retains auth denial before lease/query/dispatch", async () => {
    const h = harness(transcript, false, true);
    assert.equal((await h.get()).status, 401);
    assert.deepEqual(h.events, []);
  });
}
