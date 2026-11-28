import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useTranslateSession } from "@/app/(dashboard)/dashboard/translator/hooks/useTranslateSession";

afterEach(() => vi.unstubAllGlobals());

it.each([
  { target: "openai", pipelinePath: "direct", translationSteps: 1 },
  { target: "gemini", pipelinePath: "hub-and-spoke", translationSteps: 2 },
] as const)(
  "sends the selected Claude source format when targeting $target",
  async ({ target, pipelinePath, translationSteps }) => {
    const openaiBody = { messages: [{ role: "user", content: "Hello" }] };
    const geminiBody = { contents: [{ role: "user", parts: [{ text: "Hello" }] }] };
    const fetchMock = vi.fn<typeof fetch>();
    fetchMock.mockResolvedValueOnce(Response.json({ success: true, format: "openai" }));
    fetchMock.mockResolvedValueOnce(Response.json({ success: true, result: openaiBody }));
    if (translationSteps === 2) {
      fetchMock.mockResolvedValueOnce(Response.json({ success: true, result: geminiBody }));
    }
    fetchMock.mockResolvedValueOnce(new Response(null));
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(useTranslateSession);
    await act(async () => {
      await result.current.run({
        source: "claude",
        target,
        provider: target,
        inputText: JSON.stringify({ ...openaiBody, max_tokens: 100 }),
        mode: "send",
      });
    });

    expect(result.current.result).toMatchObject({ status: "ok", pipelinePath });
    expect(fetchMock).toHaveBeenLastCalledWith(
      "/api/translator/send",
      expect.objectContaining({ method: "POST" })
    );
    const requestBody = fetchMock.mock.lastCall?.[1]?.body;
    expect(JSON.parse(String(requestBody))).toEqual({
      provider: target,
      sourceFormat: "claude",
      body: target === "gemini" ? geminiBody : openaiBody,
    });
  }
);
