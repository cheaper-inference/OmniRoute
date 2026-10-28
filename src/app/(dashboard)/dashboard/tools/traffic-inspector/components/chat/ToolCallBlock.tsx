"use client";

import Collapsible from "@/shared/components/Collapsible";
import { JsonViewer } from "../shared/JsonViewer";
import { shortCallId } from "@/shared/utils/formatting";

interface ToolCallBlockProps {
  id: string;
  name: string;
  input: unknown;
}

export function ToolCallBlock({ id, name, input }: ToolCallBlockProps) {
  return (
    <div className="rounded-control border border-warning/40 bg-warning-bg px-3 py-2 text-sm">
      <Collapsible
        variant="inline"
        title={<span className="font-mono font-medium">{name}</span>}
        trailing={
          <span className="font-mono text-xs text-text-muted" title={id}>
            {shortCallId(id)}
          </span>
        }
      >
        <div className="border-t border-warning/20 pt-2">
          <JsonViewer data={input} />
        </div>
      </Collapsible>
    </div>
  );
}
