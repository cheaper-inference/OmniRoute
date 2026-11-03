import React, { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: PropsWithChildren) => <div>{children}</div>,
  Button: ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

import FalNativePanel from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/FalNativePanel";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
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
