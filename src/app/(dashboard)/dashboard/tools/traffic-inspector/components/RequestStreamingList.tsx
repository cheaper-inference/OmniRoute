"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import EmptyState from "@/shared/components/EmptyState";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { useVirtualList } from "../hooks/useVirtualList";
import { RequestRow } from "./RequestRow";

interface RequestStreamingListProps {
  requests: InterceptedRequest[];
  selectedId: string | null;
  onSelect: (req: InterceptedRequest) => void;
  containerHeight: number;
  onSameContext?: (contextKey: string) => void;
  sameContextKey?: string;
  onClearContextFilter?: () => void;
}

export function RequestStreamingList({
  requests,
  selectedId,
  onSelect,
  containerHeight,
  onSameContext,
  sameContextKey,
  onClearContextFilter,
}: RequestStreamingListProps) {
  const t = useTranslations("trafficInspector");
  const { virtualItems, totalHeight, containerRef, rowRef } = useVirtualList(
    requests,
    containerHeight
  );

  if (requests.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {sameContextKey && (
          <div className="shrink-0 flex items-center gap-2 border-b border-border bg-info-bg px-2 py-1 font-mono text-xs text-info">
            <span>{t("filteringContext", { context: sameContextKey.slice(0, 6) })}</span>
            <Button
              variant="ghost"
              size="sm"
              icon="close"
              className="h-auto min-h-0 px-1 py-0 text-xs"
              onClick={onClearContextFilter}
            >
              {t("clearContextFilter")}
            </Button>
          </div>
        )}
        <div
          ref={containerRef}
          data-testid="request-list"
          className="flex-1 flex items-center justify-center p-2"
        >
          <EmptyState
            icon="network_check"
            title={t("noRequests")}
            description={t("noRequestsDesc")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {sameContextKey && (
        <div className="shrink-0 flex items-center gap-2 border-b border-border bg-info-bg px-2 py-1 font-mono text-xs text-info">
          <span>{t("filteringContext", { context: sameContextKey.slice(0, 6) })}</span>
          <Button
            variant="ghost"
            size="sm"
            icon="close"
            className="h-auto min-h-0 px-1 py-0 text-xs"
            onClick={onClearContextFilter}
          >
            {t("clearContextFilter")}
          </Button>
        </div>
      )}
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        data-testid="request-list"
        className="flex-1 overflow-y-auto relative"
        style={{ contain: "strict" }}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {virtualItems.map(({ index, item, top }) => (
            <div
              key={item.id}
              ref={rowRef(index)}
              style={{ position: "absolute", top, left: 0, right: 0 }}
            >
              <RequestRow
                request={item}
                selected={item.id === selectedId}
                onClick={() => onSelect(item)}
                onSameContext={onSameContext}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
