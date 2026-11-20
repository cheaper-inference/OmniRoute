/**
 * gemini-web attachments: image / video / file content parts are validated up front and
 * uploaded through the composer's file chooser instead of being dropped or rejected.
 * The browser and the upload are mocked; no real cookie is needed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "or-gemini-web-attachments-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const playwright = await import("playwright");
const attachmentsMod = await import("../../open-sse/executors/gemini-web/attachments.ts");
const { GeminiWebExecutor, buildGeminiPrompt } =
  await import("../../open-sse/executors/gemini-web.ts");
const { resetGeminiBrowserLeaseForTests } =
  await import("../../open-sse/executors/gemini-web/browserLease.ts");
const core = await import("../../src/lib/db/core.ts");

const {
  extractGeminiWebAttachments,
  resolveGeminiWebAttachments,
  writeGeminiWebAttachmentFiles,
  attachFilesToGeminiComposer,
  readIsoBmffDurationSeconds,
  sniffMimeType,
  GeminiWebAttachmentError,
  isGeminiUploadResponse,
} = attachmentsMod;

const originalLaunch = playwright.chromium.launch;
test.afterEach(async () => {
  playwright.chromium.launch = originalLaunch;
  await resetGeminiBrowserLeaseForTests();
});
test.after(() => {
  core.closeDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── Fixtures ────────────────────────────────────────────────────────────────

const PNG_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
const PNG_DATA_URL = `data:image/png;base64,${PNG_B64}`;

function box(type: string, payload: Buffer): Buffer {
  const header = Buffer.alloc(8);
  header.writeUInt32BE(8 + payload.length, 0);
  header.write(type, 4, "latin1");
  return Buffer.concat([header, payload]);
}

/** Minimal ISO-BMFF file: ftyp + moov/mvhd (version 0) with the given duration. */
function mp4(seconds: number, brand = "isom"): Buffer {
  const mvhd = Buffer.alloc(100);
  mvhd.writeUInt32BE(1000, 12); // timescale
  mvhd.writeUInt32BE(Math.round(seconds * 1000), 16); // duration
  const ftyp = Buffer.concat([Buffer.from(brand, "latin1"), Buffer.alloc(4), Buffer.from("mp42")]);
  return Buffer.concat([
    box("ftyp", ftyp),
    box("free", Buffer.alloc(16)),
    box("moov", box("mvhd", mvhd)),
  ]);
}
const mp4DataUrl = (seconds: number) => `data:video/mp4;base64,${mp4(seconds).toString("base64")}`;

function streamGenerateBody(text: string): string {
  const inner = [null, null, null, null, [[null, [text]]]];
  return `)]}'\n\n${JSON.stringify([["wrb.fr", null, JSON.stringify(inner)]])}\n`;
}

// ─── Part parsing ────────────────────────────────────────────────────────────

test("extracts image_url (data URI and http), video_url and file parts of the last user turn", () => {
  const sources = extractGeminiWebAttachments([
    {
      role: "user",
      content: [{ type: "image_url", image_url: { url: "https://old.example/x.png" } }],
    },
    { role: "assistant", content: "ok" },
    {
      role: "user",
      content: [
        { type: "text", text: "describe" },
        { type: "image_url", image_url: { url: PNG_DATA_URL } },
        { type: "image_url", image_url: "https://example.com/cat.jpg" },
        { type: "input_image", image_url: "https://example.com/dog.webp" },
        { type: "video_url", video_url: { url: "https://example.com/clip.mp4" } },
        {
          type: "file",
          file: { file_data: "JVBERi0=", filename: "doc.pdf", mime_type: "application/pdf" },
        },
      ],
    },
  ]);
  assert.deepEqual(
    sources.map((s) => s.ref),
    [
      PNG_DATA_URL,
      "https://example.com/cat.jpg",
      "https://example.com/dog.webp",
      "https://example.com/clip.mp4",
      "data:application/pdf;base64,JVBERi0=",
    ],
    "only the last user turn is uploaded; raw base64 file_data becomes a data URI"
  );
  assert.equal(sources[4].name, "doc.pdf");
});

test("text-only messages produce no attachments and an unchanged prompt", () => {
  const messages = [{ role: "user", content: [{ type: "text", text: "Hello" }] }];
  assert.deepEqual(extractGeminiWebAttachments(messages), []);
  assert.deepEqual(extractGeminiWebAttachments([{ role: "user", content: "Hello" }]), []);
  assert.equal(
    buildGeminiPrompt([{ role: "user", content: "  byte-identical\n" }]),
    "  byte-identical\n"
  );
});

test("an attachment-only last turn stays the current ask in a multi-turn prompt", () => {
  const prompt = buildGeminiPrompt([
    { role: "user", content: "earlier question" },
    { role: "assistant", content: "earlier answer" },
    { role: "user", content: [{ type: "video_url", video_url: { url: mp4DataUrl(1) } }] },
  ]);
  assert.match(prompt, /User: earlier question/);
  assert.match(prompt, /Current user message:\n$/);
});

test("rejects malformed parts and too many attachments with a 4xx", () => {
  assert.throws(
    () =>
      extractGeminiWebAttachments([
        { role: "user", content: [{ type: "file", file: { file_id: "f1" } }] },
      ]),
    (e: unknown) => e instanceof GeminiWebAttachmentError && e.status === 400
  );
  const eleven = Array.from({ length: 11 }, () => ({
    type: "image_url",
    image_url: { url: PNG_DATA_URL },
  }));
  assert.throws(
    () => extractGeminiWebAttachments([{ role: "user", content: eleven }]),
    /at most 10 attachments/
  );
});

// ─── Resolution: MIME, size, duration ────────────────────────────────────────

test("sniffs MIME types from magic bytes and reads MP4 duration", () => {
  assert.equal(sniffMimeType(Buffer.from(PNG_B64, "base64")), "image/png");
  assert.equal(sniffMimeType(Buffer.from([0xff, 0xd8, 0xff, 0xe0])), "image/jpeg");
  assert.equal(sniffMimeType(mp4(3)), "video/mp4");
  assert.equal(sniffMimeType(mp4(3, "qt  ")), "video/quicktime");
  assert.equal(sniffMimeType(mp4(3, "heic")), "image/heic");
  assert.equal(readIsoBmffDurationSeconds(mp4(4.5)), 4.5);
  assert.equal(readIsoBmffDurationSeconds(Buffer.from("not a video")), null);
});

test("resolves data URI images and videos with their real MIME type", async () => {
  const [image, video] = await resolveGeminiWebAttachments([
    { ref: PNG_DATA_URL },
    { ref: mp4DataUrl(12) },
  ]);
  assert.equal(image.mimeType, "image/png");
  assert.equal(image.name, "attachment-1.png");
  assert.equal(video.mimeType, "video/mp4");
  assert.equal(video.durationSeconds, 12);
  assert.equal(video.name, "attachment-2.mp4");
});

test("fetches http(s) URLs through the SSRF-guarded media fetcher", async () => {
  const calls: Array<{ url: string; options: Record<string, unknown> }> = [];
  const [image] = await resolveGeminiWebAttachments([{ ref: "https://example.com/a/cat.jpg" }], {
    fetchRemoteMedia: (async (url: string, options: Record<string, unknown>) => {
      calls.push({ url, options });
      return {
        buffer: Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]),
        contentType: "application/octet-stream",
        url,
      };
    }) as never,
  });
  assert.equal(image.mimeType, "image/jpeg");
  assert.equal(calls[0].options.guard, "public-only");
  assert.equal(calls[0].options.pinDns, true);
  await assert.rejects(
    resolveGeminiWebAttachments([{ ref: "ftp://example.com/x.png" }]),
    /http\(s\) URL or a base64 data URL/
  );
});

test("a declared image whose bytes are not an image is rejected with 415", async () => {
  const exe = Buffer.from("MZ\x90\x00\x03\x00\x00\x00", "latin1").toString("base64");
  await assert.rejects(
    resolveGeminiWebAttachments([{ ref: `data:image/png;base64,${exe}` }]),
    (e: unknown) => e instanceof GeminiWebAttachmentError && e.status === 415
  );
});

test("attachment resolution stops when the request is cancelled", async () => {
  const signals: unknown[] = [];
  const fetchRemoteMedia = (async (url: string, options: { signal?: AbortSignal }) => {
    signals.push(options.signal);
    return { buffer: Buffer.from([0xff, 0xd8, 0xff, 0xe0]), contentType: "image/jpeg", url };
  }) as never;
  const live = new AbortController();
  await resolveGeminiWebAttachments([{ ref: "https://example.com/a.jpg" }], {
    fetchRemoteMedia,
    signal: live.signal,
  });
  assert.equal(signals[0], live.signal, "the request signal reaches the remote fetch");

  const aborted = new AbortController();
  aborted.abort(new Error("client went away"));
  await assert.rejects(
    resolveGeminiWebAttachments([{ ref: "https://example.com/b.jpg" }], {
      fetchRemoteMedia,
      signal: aborted.signal,
    })
  );
  assert.equal(signals.length, 1, "no download starts after the request is cancelled");
});

test("rejects unsupported MIME types with 415", async () => {
  for (const ref of [
    "data:application/zip;base64,UEsDBA==",
    "data:audio/mpeg;base64,SUQzBA==",
    `data:image/avif;base64,${mp4(1, "avif").toString("base64")}`,
  ]) {
    await assert.rejects(
      resolveGeminiWebAttachments([{ ref }]),
      (e: unknown) =>
        e instanceof GeminiWebAttachmentError &&
        e.status === 415 &&
        /Unsupported attachment type/.test(e.message),
      ref
    );
  }
});

test("enforces the video length limit before upload (env-overridable)", async () => {
  await assert.rejects(
    resolveGeminiWebAttachments([{ ref: mp4DataUrl(200) }, { ref: mp4DataUrl(200) }], { env: {} }),
    (e: unknown) =>
      e instanceof GeminiWebAttachmentError && e.status === 413 && /exceeds .* 300s/.test(e.message)
  );
  const ok = await resolveGeminiWebAttachments([{ ref: mp4DataUrl(400) }], {
    env: { GEMINI_WEB_MAX_VIDEO_SECONDS: "3600" },
  });
  assert.equal(ok[0].durationSeconds, 400);
  await assert.rejects(
    resolveGeminiWebAttachments([
      { ref: `data:video/mp4;base64,${box("ftyp", Buffer.from("isom0000")).toString("base64")}` },
    ]),
    /no duration found/
  );
});

test("enforces the 100 MB per-file size limit with 413", async () => {
  const big = Buffer.alloc(100 * 1024 * 1024 + 1);
  big.write("%PDF", 0, "latin1");
  await assert.rejects(
    resolveGeminiWebAttachments([{ ref: "https://example.com/big.pdf" }], {
      fetchRemoteMedia: (async (url: string) => ({
        buffer: big,
        contentType: "application/pdf",
        url,
      })) as never,
    }),
    (e: unknown) => e instanceof GeminiWebAttachmentError && e.status === 413
  );
  await assert.rejects(
    resolveGeminiWebAttachments([{ ref: "https://example.com/huge.mp4" }], {
      fetchRemoteMedia: (async () => {
        throw new Error("Remote media exceeds 2147483648 byte limit");
      }) as never,
    }),
    /too large/
  );
});

// ─── Temp files ──────────────────────────────────────────────────────────────

test("writes temp files with safe names and removes them on cleanup", async () => {
  const resolved = await resolveGeminiWebAttachments([
    { ref: PNG_DATA_URL, name: "../../etc/passwd.png" },
    { ref: PNG_DATA_URL, name: "../../etc/passwd.png" },
  ]);
  const { dir, paths, cleanup } = await writeGeminiWebAttachmentFiles(resolved);
  assert.equal(paths.length, 2);
  assert.notEqual(paths[0], paths[1], "same names never collide");
  for (const path of paths) {
    assert.ok(path.startsWith(dir), "never escapes the temp dir");
    assert.equal(basename(path), "passwd.png");
    assert.deepEqual(readFileSync(path), Buffer.from(PNG_B64, "base64"));
  }
  await cleanup();
  assert.equal(existsSync(dir), false);
});

// ─── Browser upload (mocked page) ────────────────────────────────────────────

type Listener = (resp: unknown) => unknown;

const UPLOAD_URL = "https://push.clients6.google.com/upload/";

function uploadResponse(status: number, command = "upload, finalize", url = UPLOAD_URL) {
  return {
    url: () => url,
    status: () => status,
    ok: () => status >= 200 && status < 300,
    request: () => ({
      method: () => "POST",
      headers: () => ({ "x-goog-upload-command": command }),
    }),
    text: async () => "",
  };
}

/**
 * A fake Playwright page shaped like the live gemini.google.com composer (checked
 * 2026-11-20): the hidden file inputs only exist while the "Upload & tools" menu is open,
 * one for media (accept="image/*,video/*") and one for documents.
 */
function fakePage(opts: {
  menu?: boolean;
  onFiles?: (paths: string[], emit: (resp: unknown) => void) => void;
  onEnter?: (emit: (resp: unknown) => void) => void;
}) {
  const listeners = new Set<Listener>();
  const emit = (resp: unknown) => listeners.forEach((l) => void l(resp));
  const state = {
    menuOpen: false,
    uploads: [] as Array<{ input: string; paths: string[] }>,
    typed: [] as string[],
    keys: [] as string[],
    uploadedExisted: [] as boolean[],
  };
  const isInput = (selector: string) => selector.startsWith('input[type="file"]');
  const page = {
    on: (event: string, l: Listener) => event === "response" && listeners.add(l),
    off: (event: string, l: Listener) => event === "response" && listeners.delete(l),
    locator: (selector: string) => {
      const handle = {
        first: () => handle,
        count: async () =>
          isInput(selector) ? (state.menuOpen ? 1 : 0) : opts.menu === false ? 0 : 1,
        click: async () => {
          if (opts.menu === false) throw new Error("locator.click: Timeout 5000ms exceeded.");
          state.menuOpen = true;
        },
        waitFor: async () => {
          if (!state.menuOpen) throw new Error("locator.waitFor: Timeout 5000ms exceeded.");
        },
        setInputFiles: async (paths: string[]) => {
          state.uploads.push({ input: selector.includes(":not(") ? "document" : "media", paths });
          state.uploadedExisted.push(...paths.map((p) => existsSync(p)));
          opts.onFiles?.(paths, emit);
        },
      };
      return handle;
    },
    goto: async () => {},
    waitForTimeout: async () => new Promise((r) => setTimeout(r, 1)),
    waitForSelector: async () => ({ click: async () => {} }),
    keyboard: {
      insertText: async (text: string) => void state.typed.push(text),
      press: async (key: string) => {
        state.keys.push(key);
        if (key === "Escape") state.menuOpen = false;
        if (key === "Enter") opts.onEnter?.(emit);
      },
    },
  };
  return { page, state, listeners };
}

const confirmEach = (paths: string[], emit: (resp: unknown) => void) => {
  emit(uploadResponse(200, "start")); // the resumable "start" is not the upload itself
  for (const _ of paths) emit(uploadResponse(200));
};

test("upload: opens the menu, routes media and documents to their inputs, waits per file", async () => {
  const { page, state, listeners } = fakePage({ onFiles: confirmEach });
  await attachFilesToGeminiComposer(
    page as never,
    [
      { path: "/tmp/a.png", mimeType: "image/png" },
      { path: "/tmp/b.pdf", mimeType: "application/pdf" },
      { path: "/tmp/c.mp4", mimeType: "video/mp4" },
    ],
    2_000
  );
  assert.deepEqual(state.uploads, [
    { input: "media", paths: ["/tmp/a.png", "/tmp/c.mp4"] },
    { input: "document", paths: ["/tmp/b.pdf"] },
  ]);
  assert.deepEqual(state.keys, ["Escape"], "the still-open upload menu is closed");
  assert.equal(listeners.size, 0, "the upload listener is removed");
});

test("upload: only Gemini upload hosts count as confirmations", () => {
  assert.equal(isGeminiUploadResponse(uploadResponse(200)), true);
  assert.equal(
    isGeminiUploadResponse(
      uploadResponse(200, "upload, finalize", "https://content-push.googleapis.com/upload/")
    ),
    true
  );
  // Live upload host as of 2026-11-20 (resumable start, then "upload, finalize").
  const live = "https://contribution-qw.usercontent.google.com/upload?upload_schema=upload_gg";
  assert.equal(isGeminiUploadResponse(uploadResponse(200, "upload, finalize", live)), true);
  assert.equal(isGeminiUploadResponse(uploadResponse(200, "start", live)), false);
  assert.equal(
    isGeminiUploadResponse(
      uploadResponse(200, "upload", "https://usercontent.google.com.evil.example/upload")
    ),
    false
  );
  assert.equal(isGeminiUploadResponse(uploadResponse(200, "start")), false);
  assert.equal(
    isGeminiUploadResponse(uploadResponse(200, "upload", "https://evil.example/upload/")),
    false
  );
  assert.equal(
    isGeminiUploadResponse(uploadResponse(200, "upload", "https://push.clients6.google.com/other")),
    false
  );
});

test("upload: a rejected upload, a missing control or no confirmation is a 422", async () => {
  const is422 = (e: unknown) => e instanceof GeminiWebAttachmentError && e.status === 422;
  const file = [{ path: "/tmp/a.png", mimeType: "image/png" }];
  const rejected = fakePage({ onFiles: (_p, emit) => emit(uploadResponse(500)) });
  await assert.rejects(attachFilesToGeminiComposer(rejected.page as never, file, 2_000), is422);
  const noControl = fakePage({ menu: false });
  await assert.rejects(
    attachFilesToGeminiComposer(noControl.page as never, file, 2_000),
    /upload control/
  );
  const chunkOnly = fakePage({ onFiles: (_p, emit) => emit(uploadResponse(200, "upload")) });
  await assert.rejects(
    attachFilesToGeminiComposer(chunkOnly.page as never, file, 50),
    /did not confirm/,
    "an intermediate resumable chunk is not a finished file"
  );
  const failedChunk = fakePage({ onFiles: (_p, emit) => emit(uploadResponse(503, "upload")) });
  await assert.rejects(attachFilesToGeminiComposer(failedChunk.page as never, file, 2_000), is422);
  const silent = fakePage({});
  await assert.rejects(
    attachFilesToGeminiComposer(silent.page as never, file, 50),
    /did not confirm/
  );
});

// ─── Executor end to end (mocked browser) ────────────────────────────────────

function stubBrowser(fake: ReturnType<typeof fakePage>) {
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      cookies: async () => [],
      newPage: async () => fake.page,
      close: async () => {},
    }),
    close: async () => {},
  })) as unknown as typeof playwright.chromium.launch;
}

const STREAM_GENERATE_URL =
  "https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate";

function answeringPage(answer: string) {
  return fakePage({
    onFiles: confirmEach,
    onEnter: (emit) =>
      emit({ url: () => STREAM_GENERATE_URL, text: async () => streamGenerateBody(answer) }),
  });
}

function run(body: Record<string, unknown>, stream: boolean) {
  return new GeminiWebExecutor().execute({
    model: "gemini-3.1-pro",
    body: { ...body, stream },
    stream,
    credentials: { apiKey: "__Secure-1PSID=test-psid" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
}

const videoAsk = {
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "describe el vídeo" },
        { type: "video_url", video_url: { url: mp4DataUrl(5) } },
      ],
    },
  ],
};

test("executor (non-stream): uploads the video, types the question, cleans the temp file", async () => {
  const fake = answeringPage("A short clip of a cat.");
  stubBrowser(fake);
  const { response } = await run(videoAsk, false);
  assert.equal(response.status, 200);
  const json = (await response.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(json.choices[0].message.content, "A short clip of a cat.");
  assert.deepEqual(fake.state.typed, ["describe el vídeo"]);
  assert.equal(fake.state.uploads.length, 1);
  assert.match(fake.state.uploads[0].paths[0], /attachment-1\.mp4$/);
  assert.deepEqual(fake.state.uploadedExisted, [true], "the file existed while uploading");
  assert.equal(
    existsSync(dirname(dirname(fake.state.uploads[0].paths[0]))),
    false,
    "temp dir removed"
  );
});

test("executor (stream): an image attachment answers over SSE", async () => {
  const fake = answeringPage("A single transparent pixel.");
  stubBrowser(fake);
  const { response } = await run(
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: PNG_DATA_URL } },
            { type: "text", text: "what is this?" },
          ],
        },
      ],
    },
    true
  );
  assert.equal(response.status, 200);
  const sse = await response.text();
  assert.match(sse, /A single transparent pixel\./);
  assert.match(sse, /data: \[DONE\]/);
  assert.match(fake.state.uploads[0].paths[0], /attachment-1\.png$/);
});

test("executor (tools): a last turn with text + attachment is not a 400", async () => {
  const fake = answeringPage("It is sunny in the photo.");
  stubBrowser(fake);
  const { response } = await run(
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "what weather is shown?" },
            { type: "image_url", image_url: { url: PNG_DATA_URL } },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "weather",
            description: "w",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
    },
    false
  );
  assert.equal(response.status, 200);
  assert.match(fake.state.typed[0], /\n\nwhat weather is shown\?\n/);
  assert.equal(fake.state.uploads.length, 1);
});

test("executor: a failed upload is a 422 and still removes the temp file", async () => {
  const fake = fakePage({ onFiles: (_p, emit) => emit(uploadResponse(413)) });
  stubBrowser(fake);
  const { response } = await run(videoAsk, false);
  assert.equal(response.status, 422);
  const json = (await response.json()) as { error: { message: string; code: string } };
  assert.match(json.error.message, /rejected the attachment upload/);
  assert.equal(json.error.code, "upstream_error");
  assert.equal(fake.state.typed.length, 0, "the prompt is never sent without its file");
  assert.equal(existsSync(dirname(dirname(fake.state.uploads[0].paths[0]))), false);
});

test("executor: invalid attachments fail before the browser launches", async () => {
  let launched = false;
  playwright.chromium.launch = (async () => {
    launched = true;
    throw new Error("must not launch");
  }) as unknown as typeof playwright.chromium.launch;
  const { response } = await run(
    {
      messages: [
        { role: "user", content: [{ type: "video_url", video_url: { url: mp4DataUrl(301) } }] },
      ],
    },
    false
  );
  assert.equal(response.status, 413);
  const unsupported = await run(
    {
      messages: [
        {
          role: "user",
          content: [{ type: "file", file: { file_data: "data:application/zip;base64,UEsDBA==" } }],
        },
      ],
    },
    false
  );
  assert.equal(unsupported.response.status, 415);
  assert.equal(launched, false);
});
