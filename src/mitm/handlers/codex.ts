/**
 * OpenAI Codex CLI handler.
 *
 * Host: `chatgpt.com` (Codex paths).
 * Preserves the Responses or Chat Completions format when mapping the model.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { isCodexResponses } from "../_internal/standaloneRouting.cjs";
import type { AgentId } from "../types";
import { MitmHandlerBase, createBoundedCollector } from "./base";

export class CodexHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "codex";

  async intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void> {
    const startedAt = this.now();
    const intercepted = await this.hookBufferStart(req, body, mappedModel);

    try {
      const payload = JSON.parse(body.toString());
      payload.model = mappedModel;

      const upstreamStart = this.now();
      const responses = isCodexResponses(req.url);
      const upstream = await this.fetchRouter(
        payload,
        responses ? "/v1/responses" : "/v1/chat/completions",
        req.headers
      );

      if (!upstream.ok) {
        const errText = await upstream.text().catch(() => "");
        throw new Error(`OmniRoute ${upstream.status}: ${errText}`);
      }

      const sink = createBoundedCollector();
      if (responses && !res.headersSent) {
        res.writeHead(upstream.status, {
          "Content-Type": upstream.headers.get("content-type") || "application/json",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        });
      }
      await this.pipeSSE(upstream, res, (chunk) => {
        sink.push(chunk.toString());
      });

      const total = this.now() - startedAt;
      this.hookBufferUpdate(intercepted, {
        status: upstream.status,
        responseHeaders: Object.fromEntries(upstream.headers.entries()),
        responseBody: sink.text,
        responseSize: sink.totalBytes,
        proxyLatencyMs: upstreamStart - startedAt,
        upstreamLatencyMs: total - (upstreamStart - startedAt),
      });
    } catch (err) {
      await this.hookBufferError(intercepted, err);
      await this.writeError(res, err);
    }
  }
}
