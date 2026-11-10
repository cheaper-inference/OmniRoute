import React, { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import { afterAll, afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

vi.mock("next-intl", () => ({ useTranslations: (ns: string) => (key: string) => `${ns}.${key}` }));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: PropsWithChildren) => <div>{children}</div>,
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
  Select: (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} />,
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} />,
  Button: ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
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

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.unstubAllGlobals();
});
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
  await waitFor(() =>
    expect(
      (screen.getByRole("button", { name: /falNative.(run|newGeneration)/ }) as HTMLButtonElement)
        .disabled
    ).toBe(false)
  );
  fireEvent.change(screen.getByLabelText("falNative.input"), { target: { value } });
}

for (const failure of ["non-json-with-header", "disconnect-without-response"]) {
  test(`real panel and routes recover ${failure} with one generation POST across rapid clicks, reload and GETs`, async () => {
    let generations = 0;
    let browserPosts = 0;
    const sentKeys: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit): Promise<Response> => {
        if (url.startsWith("/api/providers/"))
          return Response.json({ ...definition, capabilities: falCapabilities(definition) });
        if (url === "/api/v1/fal/run") {
          browserPosts++;
          sentKeys.push(new Headers(init?.headers).get("Idempotency-Key")!);
          const response = await run.POST(
            new Request(`http://localhost${url}`, {
              ...init,
              headers: {
                ...Object.fromEntries(new Headers(init?.headers)),
                Authorization: `Bearer ${key.key}`,
              },
            })
          );
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
      })
    );
    const mounted = render(<FalNativePanel connectionId={connectionId} />);
    await loadPanel();
    const button = screen.getByRole("button", { name: "falNative.run" });
    fireEvent.click(button);
    fireEvent.click(button);
    await screen.findByRole("alert");
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
    await waitFor(() =>
      expect((screen.getByLabelText("falNative.job") as HTMLInputElement).value).not.toBe("")
    );
    await waitFor(() => expect(screen.queryByText("falNative.submissionUnknown")).toBeNull());
    expect(sentKeys[1]).toBe(sentKeys[0]);
    for (let i = 0; i < 2; i++) {
      fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[1]);
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
    await waitFor(() => expect(generations).toBe(2));
    expect(sentKeys[2]).not.toBe(sentKeys[0]);
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
