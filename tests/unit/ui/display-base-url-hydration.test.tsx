// @vitest-environment jsdom
/**
 * F4 (KEA-7886, lote 8 pendência): React #418 on /dashboard/relay. useDisplayBaseUrl's first
 * render fell back to `http://localhost:${process.env.PORT}` — PORT exists on the server but is
 * not inlined into the client bundle, so the SSR text (the relay curl example) and the client's
 * first render differed ("server rendered text didn't match the client"). The pre-mount value
 * must be the same on both sides; the live browser origin replaces it after mount.
 */
import React, { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { useDisplayBaseUrl } from "@/shared/hooks/useDisplayBaseUrl";

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

function CurlExample() {
  const base = useDisplayBaseUrl();
  return <pre>{`curl ${base}/v1/relay/chat/completions`}</pre>;
}

const savedPort = process.env.PORT;
afterEach(() => {
  if (savedPort === undefined) delete process.env.PORT;
  else process.env.PORT = savedPort;
});

describe("useDisplayBaseUrl hydration", () => {
  it("renders the same pre-mount URL on the server (PORT set) and the client (PORT absent)", async () => {
    process.env.PORT = "20191"; // server process: custom port
    const html = renderToString(<CurlExample />);
    delete process.env.PORT; // client bundle: PORT is not inlined

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    const recoverable: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(container, <CurlExample />, {
        onRecoverableError: (error) => recoverable.push(error),
      });
    });
    expect(recoverable.map(String)).toEqual([]);
    // After mount the live origin wins (jsdom: http://localhost:3000 → not public → fallback chain).
    expect(container.textContent).toMatch(/^curl http:\/\/localhost(:\d+)?\/v1\/relay/);
    act(() => root?.unmount());
    container.remove();
  });
});
