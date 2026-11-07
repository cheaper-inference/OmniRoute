import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import type WebSocket from "ws";
import { getConnectionRefreshMutexStatus } from "../../open-sse/services/tokenRefresh.ts";
import {
  CopilotM365WebExecutor,
  __setCopilotM365WebSocketForTesting,
} from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";
import { __setM365UploadFetchForTesting } from "../../open-sse/executors/m365Protocol/images.ts";

type Frame = Record<string, unknown>;
class NativeSocket extends EventEmitter {
  static instances: NativeSocket[] = [];
  static frames: Frame[] = [];
  static hold = false;
  static plainJson = false;
  readyState = 1;
  sent: Frame[] = [];
  constructor(
    public url: string,
    public options: { headers: Record<string, string> }
  ) {
    super();
    NativeSocket.instances.push(this);
    queueMicrotask(() => this.emit("open"));
  }
  send(data: string) {
    const frames = data
      .split("\x1e")
      .filter(Boolean)
      .map((f) => JSON.parse(f) as Frame);
    this.sent.push(...frames);
    if (frames.some((f) => f.protocol === "json")) {
      queueMicrotask(() => this.emit("message", Buffer.from(encodeFrame({}))));
    }
    if (frames.some((f) => f.type === 4)) {
      queueMicrotask(() => {
        for (const frame of NativeSocket.frames)
          this.emit(
            "message",
            Buffer.from(NativeSocket.plainJson ? JSON.stringify(frame) : encodeFrame(frame))
          );
        if (!NativeSocket.hold) {
          this.emit("message", Buffer.from(encodeFrame(success())));
          this.emit("message", Buffer.from(encodeFrame({ type: 3, invocationId: "0" })));
        }
      });
    }
  }
  close() {
    this.readyState = 3;
    this.emit("close");
  }
  terminate() {
    this.close();
  }
}
function success(text?: string): Frame {
  return {
    type: 2,
    item: {
      result: { value: "Success", message: "Completed" },
      ...(text ? { messages: [{ author: "bot", messageId: "a", messageType: "Chat", text }] } : {}),
    },
  };
}
function update(text: string, messageId = "a"): Frame {
  return {
    type: 1,
    target: "update",
    arguments: [{ messages: [{ messageId, author: "bot", text }] }],
  };
}
function input(stream = false) {
  return {
    model: "gpt-6-think-deeper",
    stream,
    body: { messages: [{ role: "user", content: "private-request" }] } as Record<string, unknown>,
    credentials: {
      accessToken: "test-token",
      providerSpecificData: { chathubPath: "u@t", tier: "edu" },
    },
  };
}
const tools = [{ type: "function", function: { name: "lookup", parameters: { type: "object" } } }];
async function scenario(
  frames: Frame[],
  run: () => Promise<void>,
  hold = false,
  plainJson = false
) {
  NativeSocket.instances = [];
  NativeSocket.frames = frames;
  NativeSocket.hold = hold;
  NativeSocket.plainJson = plainJson;
  const restore = __setCopilotM365WebSocketForTesting(NativeSocket as unknown as typeof WebSocket);
  try {
    await run();
  } finally {
    restore();
  }
}
function chunks(text: string): Array<{
  choices?: Array<{
    delta?: { content?: string; reasoning_content?: string; annotations?: unknown[] };
    finish_reason?: string;
  }>;
  error?: { code: string };
}> {
  return text
    .split("\n")
    .filter((s) => s.startsWith("data: {"))
    .map((s) => JSON.parse(s.slice(6)));
}
for (const stream of [false, true]) {
  for (const call of [false, true]) {
    test(`native one turn stream=${stream} call=${call}, preserves full text`, async () => {
      const text = call
        ? '```lookup\n{"q":"x"}\n```'
        : "A complete answer including its final tail.";
      await scenario([update(text)], async () => {
        const request = input(stream);
        request.body.tools = tools;
        const result = await new CopilotM365WebExecutor().execute(request);
        const body = await result.response.text();
        assert.equal(NativeSocket.instances.length, 1);
        assert.equal(NativeSocket.instances[0].sent.filter((f) => f.type === 4).length, 1);
        assert.equal(result.response.status, 200);
        if (stream) {
          if (call) {
            assert.match(body, /"finish_reason":"tool_calls"/);
            const events = chunks(body) as Array<{
              choices: Array<{ delta: { tool_calls?: Array<{ index: number }> } }>;
            }>;
            assert.equal(
              events.find((event) => event.choices[0].delta.tool_calls)?.choices[0].delta
                .tool_calls?.[0].index,
              0
            );
          } else
            assert.equal(
              chunks(body)
                .map((c) => c.choices?.[0]?.delta?.content ?? "")
                .join(""),
              text
            );
        } else {
          const parsed = JSON.parse(body);
          assert.equal(parsed.choices[0].finish_reason, call ? "tool_calls" : "stop");
          if (!call) assert.equal(parsed.choices[0].message.content, text);
          else assert.equal(parsed.choices[0].message.tool_calls[0].function.name, "lookup");
        }
        assert.doesNotMatch(JSON.stringify(result.transformedBody), /private-request/);
      });
    });
  }
  test(`native final-only and multiple message composition stream=${stream}`, async () => {
    for (const frames of [
      [success("Final-only answer")],
      [update("First", "a"), update("Second", "b")],
    ]) {
      await scenario(frames, async () => {
        const result = await new CopilotM365WebExecutor().execute(input(stream));
        const text = await result.response.text();
        const actual = stream
          ? chunks(text)
              .map((c) => c.choices?.[0]?.delta?.content ?? "")
              .join("")
          : JSON.parse(text).choices[0].message.content;
        assert.equal(actual, frames.length === 1 ? "Final-only answer" : "First\n\nSecond");
      });
    }
  });
  for (const [value, status, code] of [
    ["ForbiddenRequest", 403, "m365_model_not_licensed"],
    ["PerUserThrottled", 429, "m365_throttled"],
    ["OutOfCredits", 429, "priority_access_exhausted"],
  ] as const) {
    test(`native refusal ${value} stream=${stream} preserves HTTP status`, async () => {
      await scenario(
        [
          {
            type: 2,
            item: {
              result: {
                value,
                ...(status === 403 ? { errorCode: "PremiumModelUnavailableForLicense" } : {}),
              },
            },
          },
        ],
        async () => {
          const result = await new CopilotM365WebExecutor().execute(input(stream));
          assert.equal(result.response.status, status);
          const body = await result.response.json();
          assert.equal(body.error.code, code);
          if (status === 403) {
            assert.equal(body.error.m365_error_code, "PremiumModelUnavailableForLicense");
            assert.equal(body.error.type, "permission_error");
            assert.equal(body.error.param, input().model);
          }
          if (status === 429) assert.ok(Number(result.response.headers.get("Retry-After")) > 0);
        }
      );
    });
  }
}
test("native reasoning-turn cap is 429 reasoning_turns_exhausted with its own message", async () => {
  await scenario(
    [
      {
        type: 2,
        item: { result: { value: "OutOfCredits", errorCode: "ReasoningTurnExhausted" } },
      },
    ],
    async () => {
      const result = await new CopilotM365WebExecutor().execute(input(false));
      assert.equal(result.response.status, 429);
      const body = await result.response.json();
      assert.equal(body.error.type, "rate_limit_error");
      assert.equal(body.error.code, "reasoning_turns_exhausted");
      assert.match(body.error.message, /reasoning \(Think deeper\) turns/);
      assert.doesNotMatch(body.error.message, /priority access/i);
      assert.ok(Number(result.response.headers.get("Retry-After")) > 0);
    }
  );
});
test("native profile wins tier-derived defaults, memory disabled, conversation header matches", async () => {
  await scenario([update("ok")], async () => {
    const request = input();
    request.body.messages = [
      { role: "system", content: "system-first" },
      { role: "user", content: "older" },
      { role: "assistant", content: "prior" },
      { role: "tool", tool_call_id: "id", content: "z".repeat(5000) },
      { role: "user", content: "latest" },
    ];
    const result = await new CopilotM365WebExecutor().execute(request);
    assert.equal(result.response.status, 200);
    const socket = NativeSocket.instances[0];
    const url = new URL(socket.url);
    assert.equal(url.searchParams.get("scenario"), "OfficeWebPaidCopilot");
    assert.equal(url.searchParams.get("licenseType"), "Premium");
    assert.equal(url.searchParams.get("disableMemory"), "1");
    assert.equal(
      socket.options.headers["X-RoutingParameter-SessionKey"],
      url.searchParams.get("ConversationId")
    );
    const invocation = JSON.stringify(socket.sent.find((f) => f.type === 4));
    for (const text of ["system-first", "older", "prior", "z".repeat(5000), "latest"])
      assert.ok(invocation.includes(text));
  });
});
test("native preabort and unsupported content fail without a socket", async () => {
  await scenario([], async () => {
    const controller = new AbortController();
    controller.abort();
    const aborted = await new CopilotM365WebExecutor().execute({
      ...input(),
      signal: controller.signal,
    });
    assert.equal(aborted.response.status, 499);
    const request = input();
    request.body.messages = [
      {
        role: "user",
        content: [{ type: "input_audio", input_audio: { data: "AAAA", format: "wav" } }],
      },
    ];
    const audio = await new CopilotM365WebExecutor().execute(request);
    assert.equal(audio.response.status, 400);
    assert.match(await audio.response.text(), /text and image parts only/);
    assert.equal(NativeSocket.instances.length, 0);
  });
});

const PNG_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
/** A request whose user message carries text and one image. */
function imageInput() {
  const request = input();
  request.body.messages = [
    {
      role: "user",
      content: [
        { type: "text", text: "what is in this picture?" },
        { type: "image_url", image_url: { url: PNG_DATA_URL } },
      ],
    },
  ];
  return request;
}

test("an image is uploaded into the turn's conversation and attached to its message", async () => {
  const uploads: URLSearchParams[] = [];
  const restore = __setM365UploadFetchForTesting(async (_url, init) => {
    uploads.push(new URLSearchParams(String(init?.body)));
    return Response.json({ docId: "doc-7" });
  });
  try {
    await scenario([update("a red dot")], async () => {
      const result = await new CopilotM365WebExecutor().execute(imageInput());
      assert.equal(result.response.status, 200);
      const [socket] = NativeSocket.instances;
      const conversationId = new URL(socket.url).searchParams.get("ConversationId");
      assert.equal(uploads.length, 1);
      assert.equal(uploads[0].get("conversationId"), conversationId);
      const message = (socket.sent.find((f) => f.type === 4)!.arguments as Frame[])[0].message as {
        text: string;
        messageAnnotations: Frame[];
      };
      assert.match(message.text, /what is in this picture\?\n\[image 1\]/);
      assert.deepEqual(
        message.messageAnnotations.map((a) => [a.id, a.messageAnnotationType]),
        [["doc-7", "ImageFile"]]
      );
    });
  } finally {
    restore();
  }
});

test("a failed image upload fails the request before any socket opens", async () => {
  const restore = __setM365UploadFetchForTesting(async () => new Response("", { status: 500 }));
  try {
    await scenario([update("never")], async () => {
      const result = await new CopilotM365WebExecutor().execute(imageInput());
      assert.equal(result.response.status, 502);
      assert.match(await result.response.text(), /m365_image_upload_failed/);
      assert.equal(NativeSocket.instances.length, 0);
    });
  } finally {
    restore();
  }
});
test("native stream cancellation sends Stop and releases abort listener", async () => {
  await scenario(
    [update("first")],
    async () => {
      const result = await new CopilotM365WebExecutor().execute(input(true));
      await result.response.body!.cancel();
      assert.ok(NativeSocket.instances[0].sent.some((f) => f.target === "stop"));
      assert.equal(NativeSocket.instances[0].listenerCount("message"), 0);
    },
    true
  );
});
test("native error after content is structured SSE without successful finish", async () => {
  await scenario(
    [update("partial")],
    async () => {
      const result = await new CopilotM365WebExecutor().execute(input(true));
      NativeSocket.instances[0].emit(
        "message",
        Buffer.from(encodeFrame({ type: 2, item: { result: { value: "ForbiddenRequest" } } }))
      );
      const body = await result.response.text();
      assert.equal(result.response.status, 200);
      assert.match(body, /m365_model_not_licensed/);
      assert.doesNotMatch(body, /"finish_reason":"stop"/);
    },
    true
  );
});

test("native refresh promotes legacy PSD and persists inside canonical mutex before socket", async () => {
  const original = globalThis.fetch;
  let grants = 0;
  globalThis.fetch = async () => {
    grants++;
    return Response.json({
      access_token: "fresh-token",
      refresh_token: "rotated",
      expires_in: 3600,
    });
  };
  try {
    await scenario([update("ok")], async () => {
      const request = input();
      const connectionId = crypto.randomUUID();
      const credentials = {
        ...request.credentials,
        connectionId,
        providerSpecificData: {
          chathubPath: "u@11111111-1111-1111-1111-111111111111",
          refreshToken: crypto.randomUUID(),
        },
      };
      let persisted = false;
      const result = await new CopilotM365WebExecutor().execute({
        ...request,
        credentials,
        onCredentialsRefreshed(next) {
          assert.ok(getConnectionRefreshMutexStatus()[connectionId]);
          assert.equal(NativeSocket.instances.length, 0);
          assert.equal(next.accessToken, "fresh-token");
          assert.equal(next.refreshToken, "rotated");
          persisted = true;
        },
      });
      assert.equal(result.response.status, 200);
      assert.equal(grants, 1);
      assert.ok(persisted);
      assert.equal(
        new URL(NativeSocket.instances[0].url).searchParams.get("access_token"),
        "fresh-token"
      );
    });
  } finally {
    globalThis.fetch = original;
  }
});
test("native abort during shared refresh returns 499 promptly without cancelling grant persistence", async () => {
  const original = globalThis.fetch;
  let release!: (response: Response) => void;
  let started!: () => void;
  const entered = new Promise<void>((resolve) => {
    started = resolve;
  });
  const grant = new Promise<Response>((resolve) => {
    release = resolve;
  });
  let persisted!: () => void;
  const persistence = new Promise<void>((resolve) => {
    persisted = resolve;
  });
  globalThis.fetch = async () => {
    started();
    return grant;
  };
  try {
    await scenario([], async () => {
      const controller = new AbortController();
      const request = input();
      const connectionId = crypto.randomUUID();
      const result = new CopilotM365WebExecutor().execute({
        ...request,
        signal: controller.signal,
        credentials: {
          ...request.credentials,
          connectionId,
          refreshToken: crypto.randomUUID(),
          providerSpecificData: { chathubPath: "u@11111111-1111-1111-1111-111111111111" },
        },
        onCredentialsRefreshed() {
          assert.ok(getConnectionRefreshMutexStatus()[connectionId]);
          persisted();
        },
      });
      await entered;
      controller.abort();
      let deadline: ReturnType<typeof setTimeout> | undefined;
      try {
        const response = await Promise.race([
          result,
          new Promise<never>((_, reject) => {
            deadline = setTimeout(() => reject(new Error("abort did not settle promptly")), 100);
          }),
        ]);
        assert.equal(response.response.status, 499);
        assert.equal(NativeSocket.instances.length, 0);
        assert.ok(getConnectionRefreshMutexStatus()[connectionId]);
      } finally {
        clearTimeout(deadline);
        release(Response.json({ access_token: "fresh", refresh_token: "rotated" }));
        await persistence;
        await result;
      }
      assert.equal(NativeSocket.instances.length, 0);
    });
  } finally {
    globalThis.fetch = original;
  }
});
test("native failed refresh refuses before stale socket; persistence failure also refuses", async () => {
  const original = globalThis.fetch;
  try {
    for (const persistFailure of [false, true]) {
      globalThis.fetch = async () =>
        persistFailure
          ? Response.json({ access_token: "fresh", refresh_token: "next" })
          : Response.json({ error: "invalid_grant" }, { status: 400 });
      await scenario([], async () => {
        const request = input();
        const result = await new CopilotM365WebExecutor().execute({
          ...request,
          credentials: {
            ...request.credentials,
            refreshToken: crypto.randomUUID(),
            providerSpecificData: { chathubPath: "u@11111111-1111-1111-1111-111111111111" },
          },
          onCredentialsRefreshed() {
            throw new Error("private persistence failure");
          },
        });
        assert.equal(result.response.status, 401);
        assert.equal(NativeSocket.instances.length, 0);
        assert.doesNotMatch(await result.response.text(), /private persistence failure/);
      });
    }
  } finally {
    globalThis.fetch = original;
  }
});
test("native legacy tier defaults and raw explicit profile overrides survive dispatch", async () => {
  for (const [tier, scenarioName] of [
    ["individual", "OfficeWebPaidConsumerCopilot"],
    ["included", "OfficeWebIncludedCopilot"],
    ["work", "officeweb"],
  ]) {
    await scenario([update("ok")], async () => {
      const request = input();
      request.model = "copilot-m365";
      request.credentials.providerSpecificData.tier = tier;
      const result = await new CopilotM365WebExecutor().execute(request);
      assert.equal(result.response.status, 200);
      assert.equal(
        new URL(NativeSocket.instances[0].url).searchParams.get("scenario"),
        scenarioName
      );
    });
  }
  await scenario([update("ok")], async () => {
    const request = input();
    Object.assign(request.credentials.providerSpecificData, {
      scenario: "explicit",
      licenseType: "Custom",
      tone: "CustomTone",
    });
    await new CopilotM365WebExecutor().execute(request);
    assert.equal(new URL(NativeSocket.instances[0].url).searchParams.get("scenario"), "explicit");
    assert.match(JSON.stringify(NativeSocket.instances[0].sent), /CustomTone/);
  });
});
test("native rewrite is prefix-safe in streaming while JSON returns authoritative full text", async () => {
  for (const stream of [true, false])
    await scenario(
      [update("original"), update("replacement"), update("replacement tail")],
      async () => {
        const result = await new CopilotM365WebExecutor().execute(input(stream));
        const body = await result.response.text();
        const actual = stream
          ? chunks(body)
              .map((c) => c.choices?.[0]?.delta?.content ?? "")
              .join("")
          : JSON.parse(body).choices[0].message.content;
        assert.equal(actual, stream ? "original" : "replacement tail");
        if (stream) {
          assert.deepEqual(
            chunks(body)
              .filter((c) => c.error)
              .map((c) => c.error?.code),
            ["m365_stream_rewritten"]
          );
          assert.doesNotMatch(body, /"finish_reason":"stop"/);
          assert.equal((body.match(/data: \[DONE\]/g) ?? []).length, 1);
          assert.doesNotMatch(body, /replacement/);
        }
      }
    );
});
for (const stream of [true, false]) {
  for (const shape of ["array", "nested"] as const) {
    test(`native useful final-only ${shape} stream=${stream}`, async () => {
      const item = {
        result: { value: "Success", message: "Completed" },
        messages: [
          { messageId: "p", author: "bot", messageType: "Progress", text: "hidden" },
          { messageId: "a", author: "bot", messageType: "Chat", text: "First" },
          { messageId: "b", author: "bot", text: "Second" },
        ],
      };
      await scenario(
        [shape === "array" ? { type: 2, item: [item] } : { type: 2, arguments: [{ item }] }],
        async () => {
          const result = await new CopilotM365WebExecutor().execute(input(stream));
          assert.equal(result.response.status, 200);
          const body = await result.response.text();
          const text = stream
            ? chunks(body)
                .map((c) => c.choices?.[0]?.delta?.content ?? "")
                .join("")
            : JSON.parse(body).choices[0].message.content;
          assert.equal(text, "First\n\nSecond");
          assert.doesNotMatch(body, /Completed|hidden/);
        }
      );
    });
  }
  test(`native status-only final is empty, not a fabricated answer stream=${stream}`, async () => {
    await scenario([success()], async () => {
      const result = await new CopilotM365WebExecutor().execute(input(stream));
      assert.equal(result.response.status, 502);
      assert.match(await result.response.text(), /m365_empty_response/);
    });
  });
  test(`native buffered tool mode uses authoritative rewritten text stream=${stream}`, async () => {
    const final = '```lookup\n{"q":"authoritative"}\n```';
    await scenario([update("draft"), update(final)], async () => {
      const request = input(stream);
      request.body.tools = tools;
      const result = await new CopilotM365WebExecutor().execute(request);
      assert.equal(result.response.status, 200);
      const body = await result.response.text();
      assert.match(body, /authoritative/);
      assert.match(body, /tool_calls/);
      assert.doesNotMatch(body, /draft|m365_stream_rewritten/);
    });
  });
}
test("native citations and reasoning reach the client in both modes, markers never", async () => {
  const source = {
    targetLink: "https://news.example/forecast",
    displayData: {
      content: JSON.stringify({
        metadata: { referenceId: "turn1search1" },
        Title: "Forecast",
      }),
    },
  };
  const raw = "Rain tomorrow.\uE200cite\uE202turn1search1\uE201";
  const cited = "Rain tomorrow. [1](https://news.example/forecast)";
  const frames: Frame[] = [
    {
      type: 1,
      target: "update",
      arguments: [
        {
          messages: [
            {
              author: "bot",
              messageId: "cot",
              messageType: "Progress",
              contentOrigin: "ChainOfThoughtSummary",
              addToChainOfThought: true,
              text: "Checking the forecast",
            },
          ],
        },
      ],
    },
    {
      type: 1,
      target: "update",
      arguments: [
        {
          messages: [
            { messageId: "a", author: "bot", text: raw, references: { "1-d07884": source } },
          ],
        },
      ],
    },
  ];
  const citation = {
    type: "url_citation",
    url_citation: {
      url: "https://news.example/forecast",
      title: "Forecast",
      start_index: 15,
      end_index: cited.length,
    },
  };
  for (const stream of [true, false]) {
    await scenario(frames, async () => {
      const result = await new CopilotM365WebExecutor().execute(input(stream));
      assert.equal(result.response.status, 200);
      const body = await result.response.text();
      assert.doesNotMatch(body, /[\uE200-\uE202]|turn1search1/);
      if (stream) {
        const deltas = chunks(body).map((c) => c.choices?.[0]?.delta ?? {});
        assert.equal(deltas.map((d) => d.content ?? "").join(""), cited);
        assert.equal(
          deltas.map((d) => d.reasoning_content ?? "").join(""),
          "Checking the forecast"
        );
        assert.deepEqual(
          deltas.flatMap((d) => d.annotations ?? []),
          [citation]
        );
      } else {
        const message = JSON.parse(body).choices[0].message;
        assert.equal(message.content, cited);
        assert.equal(message.reasoning_content, "Checking the forecast");
        assert.deepEqual(message.annotations, [citation]);
      }
    });
  }
});
test("native final authoritative snapshot reports divergence only for plain streaming", async () => {
  for (const stream of [true, false]) {
    await scenario([update("draft"), success("authoritative final")], async () => {
      const result = await new CopilotM365WebExecutor().execute(input(stream));
      const body = await result.response.text();
      if (stream) {
        assert.equal(
          chunks(body)
            .map((c) => c.choices?.[0]?.delta?.content ?? "")
            .join(""),
          "draft"
        );
        assert.match(body, /m365_stream_rewritten/);
        assert.doesNotMatch(body, /"finish_reason":"stop"|authoritative final/);
        assert.equal(NativeSocket.instances[0].listenerCount("message"), 0);
      } else {
        assert.equal(JSON.parse(body).choices[0].message.content, "authoritative final");
      }
    });
  }
});
test("native accepts standalone JSON WebSocket messages without RS framing", async () => {
  for (const stream of [false, true]) {
    await scenario(
      [update("plain JSON answer"), success("plain JSON answer")],
      async () => {
        const result = await new CopilotM365WebExecutor().execute(input(stream));
        assert.equal(result.response.status, 200);
        const body = await result.response.text();
        const text = stream
          ? chunks(body)
              .map((c) => c.choices?.[0]?.delta?.content ?? "")
              .join("")
          : JSON.parse(body).choices[0].message.content;
        assert.equal(text, "plain JSON answer");
      },
      false,
      true
    );
  }
});
test("native required tool refusal does not execute or return successful finish", async () => {
  await scenario([update("No tool needed")], async () => {
    const request = input();
    request.body.tools = tools;
    request.body.tool_choice = "required";
    const result = await new CopilotM365WebExecutor().execute(request);
    assert.equal(result.response.status, 502);
    assert.match(await result.response.text(), /m365_tool_constraint/);
    assert.equal(NativeSocket.instances.length, 1);
  });
});

test("native metadata Retry-After survives typed transport without exposing upstream messages", async () => {
  await scenario(
    [
      {
        type: 2,
        item: { result: { value: "PerUserThrottled", retryAfter: 123, message: "PRIVATE" } },
      },
    ],
    async () => {
      const result = await new CopilotM365WebExecutor().execute(input(true));
      assert.equal(result.response.status, 429);
      assert.equal(result.response.headers.get("Retry-After"), "123");
      assert.doesNotMatch(await result.response.text(), /PRIVATE/);
    }
  );
});
test("native account licence denial is not mislabeled as a model entitlement", async () => {
  for (const result of [
    { value: "InvalidCopilotLicense" },
    { value: "ForbiddenRequest", errorCode: "InvalidCopilotLicense" },
  ]) {
    await scenario([{ type: 2, item: { result } }], async () => {
      const response = (await new CopilotM365WebExecutor().execute(input())).response;
      assert.equal(response.status, 403);
      const body = await response.json();
      assert.equal(body.error.code, "m365_account_not_licensed");
      assert.equal(body.error.m365_error_code, "InvalidCopilotLicense");
      assert.equal(body.error.param, undefined);
    });
  }
});
test("native malformed declared arguments reject whole tool-mode turn", async () => {
  await scenario([update('```lookup\n{"n":"wrong"}\n```')], async () => {
    const request = input(true);
    request.body.tools = [
      {
        type: "function",
        function: {
          name: "lookup",
          parameters: { type: "object", properties: { n: { type: "number" } }, required: ["n"] },
        },
      },
    ];
    const result = await new CopilotM365WebExecutor().execute(request);
    assert.equal(result.response.status, 502);
    assert.match(await result.response.text(), /m365_tool_constraint/);
  });
});
test("native empty and oversized inputs fail explicitly", async () => {
  await scenario([], async () => {
    const empty = await new CopilotM365WebExecutor().execute(input());
    assert.equal(empty.response.status, 502);
    assert.match(await empty.response.text(), /m365_empty_response/);
    const request = input();
    request.body.messages = [{ role: "user", content: "x".repeat(1_000_001) }];
    const large = await new CopilotM365WebExecutor().execute(request);
    assert.equal(large.response.status, 400);
    assert.equal(NativeSocket.instances.length, 1);
  });
});
