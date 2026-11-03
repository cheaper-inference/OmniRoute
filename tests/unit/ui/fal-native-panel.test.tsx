import React, { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: PropsWithChildren) => <div>{children}</div>,
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
  Select: (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} />,
  Textarea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} />,
  Button: ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

import FalNativePanel from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/FalNativePanel";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.unstubAllGlobals();
});

test("non-object editor values remain editable and never dispatch substituted input", async () => {
  const fetcher = vi.fn(async () =>
    Response.json({
      endpoint_id: "publisher/app",
      capabilities: {
        inputs: { prompt: { type: "string" } },
        required: [],
        reasoning: {},
        transports: { direct: true, queue: true },
      },
    })
  );
  vi.stubGlobal("fetch", fetcher);
  render(<FalNativePanel connectionId="connection-1" />);
  fireEvent.change(screen.getByRole("textbox", { name: "falNative.endpoint" }), {
    target: { value: "publisher/app" },
  });
  fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[0]);
  await screen.findByLabelText("prompt");
  const editor = screen.getByLabelText("falNative.input");
  for (const value of ["null", "[]", '"text"', "42", "false", "{"]) {
    fireEvent.change(editor, { target: { value } });
    expect((editor as HTMLTextAreaElement).value).toBe(value);
    expect(screen.getByRole("alert").textContent).toBe("playground.invalidJson");
    expect(
      (screen.getByRole("button", { name: "falNative.run" }) as HTMLButtonElement).disabled
    ).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);
  }
  const nested = { prompt: "ok", native: [null, false, 0, { value: 0 }] };
  fireEvent.change(editor, { target: { value: JSON.stringify(nested) } });
  expect(screen.queryByRole("alert")).toBeNull();
  fireEvent.change(screen.getByLabelText("prompt"), { target: { value: "changed" } });
  expect(JSON.parse((editor as HTMLTextAreaElement).value)).toEqual({
    ...nested,
    prompt: "changed",
  });
});

test("schema controls preserve explicit false and zero, and native output files are downloadable", async () => {
  const fetcher = vi.fn(async (url: string, init?: RequestInit) => {
    if (url.startsWith("/api/providers/connection-1/fal?"))
      return Response.json({
        endpoint_id: "publisher/app",
        capabilities: {
          inputs: {
            prompt: { type: "string" },
            enable_thinking: { type: "boolean" },
            seed: { type: "integer", enum: [0, 42] },
          },
          reasoning: { enable_thinking: { type: "boolean" } },
          required: ["prompt"],
          transports: { direct: true, queue: true, stream: false, realtime: false },
        },
      });
    if (url === "/api/v1/fal/run") {
      expect(JSON.parse(String(init?.body))).toEqual({
        endpoint_id: "publisher/app",
        connection_id: "connection-1",
        transport: "queue",
        input: { enable_thinking: false, seed: 0 },
      });
      return Response.json({ id: "saved-job", status: "IN_QUEUE" }, { status: 202 });
    }
    return Response.json({
      id: "saved-job",
      status: "COMPLETED",
      output: { reasoning: "native reasoning", answer: "final answer" },
      artifacts: [
        {
          url: "https://example.com/model.glb",
          file_name: "model.glb",
          content_type: "model/gltf-binary",
        },
        { url: "https://example.com/texture.png", file_name: "texture.png" },
      ],
    });
  });
  vi.stubGlobal("fetch", fetcher);
  render(<FalNativePanel connectionId="connection-1" />);
  expect(screen.queryByLabelText(/enable_thinking/)).toBeNull();
  fireEvent.change(screen.getByRole("textbox", { name: "falNative.endpoint" }), {
    target: { value: "publisher/app" },
  });
  fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[0]);
  await screen.findByLabelText(/enable_thinking/);
  fireEvent.change(screen.getByLabelText(/enable_thinking/), { target: { value: "false" } });
  fireEvent.change(screen.getByLabelText("seed"), { target: { value: "0" } });
  expect(
    JSON.parse((screen.getByLabelText("falNative.input") as HTMLTextAreaElement).value)
  ).toEqual({ enable_thinking: false, seed: 0 });
  fireEvent.click(screen.getByRole("button", { name: "falNative.run" }));
  await waitFor(() =>
    expect((screen.getByLabelText("falNative.job") as HTMLInputElement).value).toBe("saved-job")
  );
  fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[1]);
  const download = await screen.findByRole("link", { name: "model.glb" });
  expect(download.getAttribute("href")).toBe("https://example.com/model.glb");
  expect(download.hasAttribute("download")).toBe(true);
  expect(screen.getByRole("link", { name: "texture.png" })).toBeTruthy();
});

test("an endpoint without a thinking field does not invent a thinking control", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      Response.json({
        endpoint_id: "publisher/image",
        capabilities: {
          inputs: {
            prompt: { type: "string" },
            quality: { type: "string", enum: ["max", "standard"] },
          },
          reasoning: {},
          required: ["prompt"],
          transports: { direct: true, queue: false, stream: false, realtime: false },
        },
      })
    )
  );
  render(<FalNativePanel connectionId="connection-1" />);
  fireEvent.change(screen.getByRole("textbox", { name: "falNative.endpoint" }), {
    target: { value: "publisher/image" },
  });
  fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[0]);
  await screen.findByLabelText("quality");
  expect(screen.queryByLabelText(/thinking/)).toBeNull();
  fireEvent.change(screen.getByLabelText("quality"), { target: { value: "max" } });
  expect(
    JSON.parse((screen.getByLabelText("falNative.input") as HTMLTextAreaElement).value)
  ).toEqual({ quality: "max" });
  fireEvent.change(screen.getByLabelText("falNative.input"), { target: { value: "{" } });
  fireEvent.change(screen.getByLabelText("quality"), { target: { value: "standard" } });
  expect(screen.getByRole("alert").textContent).toBe("playground.invalidJson");
});

test("real panel renders streamed image, video, audio, mesh and texture downloads and keeps errors visible", async () => {
  const files = ["image.png", "clip.mp4", "speech.wav", "mesh.glb", "texture.png"].map(
    (file_name) => ({
      file_name,
      url: `https://cdn.example/${file_name}?sig=a%2Fb&x=1`,
      content_type: "application/octet-stream",
    })
  );
  const event = {
    images: files.slice(0, 1),
    files: files.slice(1),
    reasoning: "separate reasoning",
    partial: true,
    output: "é",
  };
  const raw = `: heartbeat\r\nevent: progress\r\ndata: ${JSON.stringify(event)}\r\n\r\ndata: ${JSON.stringify(event)}\n\nevent: final\ndata: {"partial":false,"output":"é cube","reasoning":"separate reasoning"}\n\nevent: error\ndata: {"error":"native failure"}\n\n`;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url === "/api/v1/fal/run")
        return new Response(
          new ReadableStream({
            start(c) {
              for (const b of new TextEncoder().encode(raw)) c.enqueue(Uint8Array.of(b));
              c.close();
            },
          }),
          { headers: { "Content-Type": "text/event-stream", "X-Request-ID": "stream-job" } }
        );
      return Response.json({
        endpoint_id: "publisher/app",
        capabilities: {
          inputs: {},
          required: [],
          reasoning: {},
          transports: { stream: true, realtime: true },
        },
      });
    })
  );
  render(<FalNativePanel connectionId="connection-1" />);
  fireEvent.change(screen.getByRole("textbox", { name: "falNative.endpoint" }), {
    target: { value: "publisher/app" },
  });
  fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[0]);
  await waitFor(() =>
    expect(
      (screen.getByRole("button", { name: "falNative.run" }) as HTMLButtonElement).disabled
    ).toBe(false)
  );
  fireEvent.click(screen.getByRole("button", { name: "falNative.run" }));
  for (const file of files) {
    const link = await screen.findByRole("link", { name: file.file_name });
    expect(link.getAttribute("href")).toBe(file.url);
    expect(link.hasAttribute("download")).toBe(true);
  }
  await screen.findByText("falNative.streamError");
  expect(screen.getAllByRole("link")).toHaveLength(5);
  expect(screen.getByText(/"final": "é cube"/).textContent).toContain(
    '"reasoning": "separate reasoning"'
  );
});

test("in-memory recovery sends the original draft and refuses another connection", async () => {
  const posted: Array<{ key: string | null; body: unknown }> = [];
  const fetcher = vi.fn(async (url: string, init?: RequestInit) => {
    if (url !== "/api/v1/fal/run")
      return Response.json({
        endpoint_id: "publisher/app",
        capabilities: { inputs: {}, required: [], reasoning: {}, transports: { queue: true } },
      });
    posted.push({
      key: new Headers(init?.headers).get("Idempotency-Key"),
      body: JSON.parse(String(init?.body)),
    });
    throw new TypeError("No response object");
  });
  vi.stubGlobal("fetch", fetcher);
  const view = render(<FalNativePanel connectionId="connection-1" />);
  fireEvent.change(screen.getByRole("textbox", { name: "falNative.endpoint" }), {
    target: { value: "publisher/app" },
  });
  fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[0]);
  await waitFor(() =>
    expect(
      (screen.getByRole("button", { name: "falNative.run" }) as HTMLButtonElement).disabled
    ).toBe(false)
  );
  fireEvent.change(screen.getByLabelText("falNative.input"), {
    target: { value: '{"seed":0,"thinking":false}' },
  });
  fireEvent.click(screen.getByRole("button", { name: "falNative.run" }));
  await screen.findByRole("alert");
  fireEvent.change(screen.getByLabelText("falNative.input"), { target: { value: '{"seed":42}' } });
  fireEvent.click(screen.getByRole("button", { name: "falNative.recover" }));
  await waitFor(() => expect(posted.length).toBe(2));
  expect(posted[1]).toEqual(posted[0]);
  await waitFor(() =>
    expect(
      (screen.getByRole("button", { name: "falNative.recover" }) as HTMLButtonElement).disabled
    ).toBe(false)
  );
  view.rerender(<FalNativePanel connectionId="connection-2" />);
  expect(
    (screen.getByRole("button", { name: "falNative.recover" }) as HTMLButtonElement).disabled
  ).toBe(true);
  expect(posted).toHaveLength(2);
});

test("a zero-valued final stream result is complete", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) =>
      url === "/api/v1/fal/run"
        ? new Response('event: final\ndata: {"partial":false,"output":0}\n\n', {
            headers: { "Content-Type": "text/event-stream" },
          })
        : Response.json({
            endpoint_id: "publisher/app",
            capabilities: { inputs: {}, required: [], reasoning: {}, transports: { stream: true } },
          })
    )
  );
  render(<FalNativePanel connectionId="connection-1" />);
  fireEvent.change(screen.getByRole("textbox", { name: "falNative.endpoint" }), {
    target: { value: "publisher/app" },
  });
  fireEvent.click(screen.getAllByRole("button", { name: "common.refresh" })[0]);
  await waitFor(() =>
    expect(
      (screen.getByRole("button", { name: "falNative.run" }) as HTMLButtonElement).disabled
    ).toBe(false)
  );
  fireEvent.click(screen.getByRole("button", { name: "falNative.run" }));
  await waitFor(() =>
    expect(
      (screen.getByRole("button", { name: "falNative.newGeneration" }) as HTMLButtonElement)
        .disabled
    ).toBe(false)
  );
  expect(screen.queryByRole("alert")).toBeNull();
  expect(screen.getByText(/"final": 0/)).toBeTruthy();
});
