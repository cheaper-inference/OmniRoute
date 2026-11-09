"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { parseSseStream, mergeStream } from "@/mitm/inspector/sseMerger";
import Button from "@/shared/components/Button";
import { JsonViewer } from "../shared/JsonViewer";
import { SseEventList } from "../shared/SseEventList";

interface ResponseBodyTabProps {
  request: InterceptedRequest;
}

export function ResponseBodyTab({ request }: ResponseBodyTabProps) {
  const t = useTranslations("trafficInspector");
  const [showRaw, setShowRaw] = useState(false);

  const body = request.responseBody;
  if (!body) {
    return <p className="p-4 text-sm text-text-muted">{t("noResponseBody")}</p>;
  }

  const isSSE = body.startsWith("data:") || body.includes("\ndata:");
  const events = isSSE ? parseSseStream(body) : [];
  const merged = isSSE && !showRaw ? mergeStream(events) : null;

  let parsed: unknown = null;
  if (!isSSE) {
    try {
      parsed = JSON.parse(body);
    } catch {
      // not JSON
    }
  }

  return (
    <div className="h-full flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2">
        {isSSE && (
          <Button
            variant="outline"
            size="sm"
            aria-pressed={showRaw}
            onClick={() => setShowRaw((r) => !r)}
          >
            {showRaw ? t("mergedView") : t("rawEvents")}
          </Button>
        )}
        <span className="ml-auto text-xs text-text-muted">{request.responseSize} B</span>
        {request.status === "in-flight" && (
          <span className="text-xs text-warning animate-pulse">{t("streaming")}</span>
        )}
      </div>
      <div className="flex-1 overflow-auto rounded-control border border-border bg-bg-subtle p-2">
        {isSSE && showRaw ? (
          <SseEventList events={events} />
        ) : isSSE && merged ? (
          <div className="space-y-2">
            {merged.text && (
              <pre className="text-xs font-mono text-text-main whitespace-pre-wrap break-words">
                {merged.text}
              </pre>
            )}
            {merged.toolCalls && merged.toolCalls.length > 0 && (
              <JsonViewer data={merged.toolCalls} />
            )}
          </div>
        ) : parsed ? (
          <JsonViewer data={parsed} />
        ) : (
          <pre className="text-xs font-mono text-text-main whitespace-pre-wrap break-all">
            {body}
          </pre>
        )}
      </div>
    </div>
  );
}
