import React, { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import { afterAll, afterEach, expect, test, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

vi.mock("next-intl", () => ({ useTranslations: (ns: string) => (key: string) => `${ns}.${key}` }));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: PropsWithChildren) => <div>{children}</div>,
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
  Select: (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} />,
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} />,
  Button: ({ children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      onClick={(event) => {
        // The real controller returns its entire action, including body reads and receipt writes.
        const action: unknown = onClick?.(event);
        if (action instanceof Promise) trackWork(action);
      }}
    >
      {children}
    </button>
  ),
}));

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "fal-ui-routes-"));
process.env.API_KEY_SECRET = "fal-ui-test-only-secret";
process.env.INITIAL_PASSWORD = "fal-ui-test-only-password";
process.env.FAL_NATIVE_ENABLED = "true";
const run = await import("../../../src/app/api/v1/fal/run/route");
const jobs = await import("../../../src/app/api/v1/fal/jobs/[id]/route");
const { saveFalDefinition } = await import("../../../src/lib/db/fal");
const providers = await import("../../../src/lib/db/providers");
const keys = await import("../../../src/lib/db/apiKeys");
const core = await import("../../../src/lib/db/core");
const { waitForCallLogSaves } = await import("../../../src/lib/usage/callLogs");
const { falCapabilities } = await import("../../../open-sse/handlers/fal/schema");
const { falFingerprint } = await import("../../../src/shared/fal/submission");
const { default: FalNativePanel } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/FalNativePanel");
const definition = JSON.parse(
  readFileSync(join(process.cwd(), "tests/fixtures/fal/fal-ai_hunyuan3d-v21.json"), "utf8")
);
const endpoint = definition.endpoint_id;
const connection = await providers.createProviderConnection({
  provider: "fal-ai",
  authType: "apikey",
  apiKey: "mock-fal-key",
  isActive: true,
  testStatus: "active",
  name: "UI integration",
});
const connectionId = String(connection.id);
const key = await keys.createApiKey("fal-ui", "fal-ui-machine", [], {
  allowedConnections: [connectionId],
});
saveFalDefinition(connectionId, definition, true);

const pendingWork = new Set<Promise<unknown>>();
function trackWork<T>(request: Promise<T>) {
  pendingWork.add(request);
  void request.then(
    () => pendingWork.delete(request),
    () => pendingWork.delete(request)
  );
  return request;
}
async function drainWork() {
  while (pendingWork.size) await Promise.allSettled([...pendingWork]);
}
async function cleanupRequests() {
  await act(async () => {
    cleanup();
    // Fetch can settle before response.json(), fingerprinting or receipt persistence finishes.
    // Drain the real controller actions as well as their nested requests before clearing state.
    await drainWork();
  });
  sessionStorage.clear();
  vi.unstubAllGlobals();
}
afterEach(cleanupRequests);
afterAll(async () => {
  await waitForCallLogSaves(10_000);
  keys.resetApiKeyState();
  core.resetDbInstance();
});

async function loadPanel(value = '{"input_image_url":"https://example.com/source.png"}') {
  fireEvent.change(screen.getByRole("textbox", { name: "falNative.endpoint" }), {
    target: { value: endpoint },
  });
  fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[0]);
  await act(drainWork);
  await waitFor(() =>
    expect(
      (screen.getByRole("button", { name: /falNative.(run|newGeneration)/ }) as HTMLButtonElement)
        .disabled
    ).toBe(false)
  );
  fireEvent.change(screen.getByLabelText("falNative.input"), { target: { value } });
}

for (const [failure, delayed] of [
  ["non-json-with-header", false],
  ["non-json-with-header", true],
  ["disconnect-without-response", false],
  ["disconnect-without-response", true],
] as const) {
  test(`real panel and routes recover ${failure} with one generation POST across rapid clicks, reload and GETs${delayed ? " with delayed responses" : ""}`, async () => {
    let generations = 0;
    let browserPosts = 0;
    let completedPosts = 0;
    const sentKeys: string[] = [];
    const mockFetch = async (url: string, init?: RequestInit): Promise<Response> => {
      if (url.startsWith("/api/providers/"))
        return Response.json({ ...definition, capabilities: falCapabilities(definition) });
      if (url === "/api/v1/fal/run") {
        browserPosts++;
        sentKeys.push(new Headers(init?.headers).get("Idempotency-Key")!);
        // Exceed Testing Library's default 1 s deadline without delaying the whole suite.
        if (delayed && browserPosts === 1)
          await new Promise((resolve) => setTimeout(resolve, 1_100));
        const response = await run.POST(
          new Request(`http://localhost${url}`, {
            ...init,
            headers: {
              ...Object.fromEntries(new Headers(init?.headers)),
              Authorization: `Bearer ${key.key}`,
            },
          })
        );
        // Acceptance is not completion: keep the final browser response in flight.
        if (delayed && browserPosts === 3) await new Promise((resolve) => setTimeout(resolve, 100));
        completedPosts++;
        if (browserPosts === 1) {
          if (failure === "disconnect-without-response")
            throw new TypeError("Connection lost after acceptance");
          return new Response("proxy body unavailable", {
            status: 502,
            headers: { "X-Request-ID": response.headers.get("X-Request-ID")! },
          });
        }
        return response;
      }
      if (url.startsWith("/api/v1/fal/jobs/")) {
        const id = url.split("/").at(-1)!.split("?")[0];
        return jobs.GET(
          new Request(`http://localhost${url}`, {
            headers: { Authorization: `Bearer ${key.key}` },
          }),
          { params: Promise.resolve({ id }) }
        );
      }
      if (url === `https://queue.fal.run/${endpoint}`) {
        generations++;
        return Response.json({
          request_id: `upstream-${generations}`,
          status_url: `https://queue.fal.run/${endpoint}/requests/upstream-${generations}/status`,
          response_url: `https://queue.fal.run/${endpoint}/requests/upstream-${generations}`,
        });
      }
      if (url.endsWith("/status")) return Response.json({ status: "COMPLETED" });
      return Response.json({
        mesh: { url: "https://example.com/result.glb", file_name: "result.glb" },
      });
    };
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string, init?: RequestInit) => trackWork(mockFetch(url, init)))
    );
    const mounted = render(<FalNativePanel connectionId={connectionId} />);
    await loadPanel();
    const button = screen.getByRole("button", { name: "falNative.run" });
    fireEvent.click(button);
    fireEvent.click(button);
    await act(drainWork);
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(generations).toBe(1);
    expect(browserPosts).toBe(1);
    expect(screen.getByText("falNative.submissionUnknown")).toBeTruthy();
    if (failure === "non-json-with-header")
      expect((screen.getByLabelText("falNative.job") as HTMLInputElement).value).not.toBe("");
    expect(sessionStorage.length).toBe(1);
    expect(sessionStorage.getItem(sessionStorage.key(0)!)).not.toContain("source.png");
    mounted.unmount();
    render(<FalNativePanel connectionId={connectionId} />);
    await loadPanel('{"input_image_url":"https://example.com/changed.png"}');
    fireEvent.click(screen.getByRole("button", { name: "falNative.recover" }));
    await screen.findByText("falNative.recoveryMismatch");
    expect(browserPosts).toBe(1);
    fireEvent.change(screen.getByLabelText("falNative.input"), {
      target: { value: '{"input_image_url":"https://example.com/source.png"}' },
    });
    fireEvent.click(screen.getByRole("button", { name: "falNative.recover" }));
    await act(drainWork);
    await waitFor(() =>
      expect((screen.getByLabelText("falNative.job") as HTMLInputElement).value).not.toBe("")
    );
    await waitFor(() => expect(screen.queryByText("falNative.submissionUnknown")).toBeNull());
    expect(sentKeys[1]).toBe(sentKeys[0]);
    for (let i = 0; i < 2; i++) {
      fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[1]);
      await act(drainWork);
      await screen.findByRole("link", { name: "result.glb" });
      await waitFor(() =>
        expect(
          (screen.getAllByRole("button", { name: "common.refresh" })[1] as HTMLButtonElement)
            .disabled
        ).toBe(false)
      );
    }
    expect(generations).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: "falNative.newGeneration" }));
    await act(drainWork);
    await waitFor(() => expect(generations).toBe(2));
    expect(sentKeys[2]).not.toBe(sentKeys[0]);
    expect(completedPosts).toBe(3);
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByText("falNative.submissionUnknown")).toBeNull();
  });
}

test("submission fingerprints bind endpoint, connection, transport and ordered values", async () => {
  const draft = {
    endpoint_id: endpoint,
    connection_id: connectionId,
    transport: "queue",
    input: { a: false, b: 0, c: null, refs: [1, 2] },
  };
  expect(await falFingerprint(draft)).toBe(
    await falFingerprint({ ...draft, input: { refs: [1, 2], c: null, b: 0, a: false } })
  );
  for (const changed of [
    { ...draft, connection_id: "other" },
    { ...draft, endpoint_id: "publisher/other" },
    { ...draft, transport: "direct" },
    { ...draft, input: { ...draft.input, refs: [2, 1] } },
  ])
    expect(await falFingerprint(changed)).not.toBe(await falFingerprint(draft));
});

test("cleanup drains rejected requests before restoring fetch and clearing late receipts", async () => {
  const deferred = Promise.withResolvers<Response>();
  const fetcher = vi.fn(() =>
    trackWork(
      deferred.promise.catch((error) => {
        sessionStorage.setItem("receipt", "late");
        throw error;
      })
    )
  );
  vi.stubGlobal("fetch", fetcher);
  const pending = fetch("/pending-fal-test-request");
  sessionStorage.setItem("receipt", "pending");

  const cleaning = cleanupRequests();
  const fetchDuringCleanup = globalThis.fetch;
  const receiptDuringCleanup = sessionStorage.getItem("receipt");
  deferred.reject(new TypeError("Connection lost after acceptance"));
  await expect(pending).rejects.toThrow("Connection lost after acceptance");
  await cleaning;

  expect(fetchDuringCleanup).toBe(fetcher);
  expect(receiptDuringCleanup).toBe("pending");
  expect(pendingWork.size).toBe(0);
  expect(globalThis.fetch).not.toBe(fetcher);
  expect(sessionStorage.length).toBe(0);
});

for (const delayedBody of [false, true]) {
  test(`cleanup waits for the real panel to consume a ${delayedBody ? "delayed" : "buffered"} response after unmount`, async () => {
    const response = Promise.withResolvers<Response>();
    const started = Promise.withResolvers<void>();
    const bodyStarted = Promise.withResolvers<void>();
    const body = Promise.withResolvers<{ id: string; status: string }>();
    const consumed = Promise.withResolvers<void>();
    const fetcher = vi.fn((url: string) => {
      if (url === "/api/v1/fal/run") {
        started.resolve();
        return trackWork(response.promise);
      }
      return trackWork(
        Promise.resolve(Response.json({ ...definition, capabilities: falCapabilities(definition) }))
      );
    });
    vi.stubGlobal("fetch", fetcher);
    render(<FalNativePanel connectionId={connectionId} />);
    await loadPanel();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "falNative.run" }));
      await started.promise;
    });

    const reply = Response.json(
      { id: "late-result", status: "IN_QUEUE" },
      { headers: { "X-Request-ID": "late-header" } }
    );
    if (delayedBody)
      vi.spyOn(reply, "json").mockImplementation(() => {
        bodyStarted.resolve();
        return body.promise;
      });
    const observeFinalReceipt = () => {
      if (sessionStorage.getItem("fal-submission-receipts-v2")?.includes("late-result"))
        consumed.resolve();
    };
    window.addEventListener("fal-receipts", observeFinalReceipt);
    const cleaning = cleanupRequests();
    try {
      response.resolve(reply);
      if (delayedBody) {
        await bodyStarted.promise;
        // Fetch is already settled; the consumer action must remain tracked until its body ends.
        expect(pendingWork.size).toBe(1);
        expect(globalThis.fetch).toBe(fetcher);
        body.resolve({ id: "late-result", status: "IN_QUEUE" });
      }
      await cleaning;
      await consumed.promise;
      expect(pendingWork.size).toBe(0);
      expect(sessionStorage.length).toBe(0);
      expect(globalThis.fetch).not.toBe(fetcher);
    } finally {
      body.resolve({ id: "late-result", status: "IN_QUEUE" });
      await cleaning;
      window.removeEventListener("fal-receipts", observeFinalReceipt);
    }
  });
}
