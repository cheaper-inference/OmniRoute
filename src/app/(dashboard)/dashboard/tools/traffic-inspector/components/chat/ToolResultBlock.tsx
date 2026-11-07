"use client";

import Collapsible from "@/shared/components/Collapsible";
import { JsonViewer } from "../shared/JsonViewer";
import { shortCallId } from "@/shared/utils/formatting";

interface ToolResultBlockProps {
  toolUseId: string;
  content: unknown;
}

export function ToolResultBlock({ toolUseId, content }: ToolResultBlockProps) {
  return (
    <div className="rounded-control border border-success/40 bg-success-bg px-3 py-2 text-sm">
      <Collapsible
        variant="inline"
        title={<span className="font-mono text-xs font-medium">tool_result</span>}
        trailing={
          <span className="font-mono text-xs text-text-muted" title={toolUseId}>
            {shortCallId(toolUseId)}
          </span>
        }
      >
        <div className="border-t border-success/20 pt-2">
          <JsonViewer data={content} />
        </div>
      </Collapsible>
    </div>
  );
}
