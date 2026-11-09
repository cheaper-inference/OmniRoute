"use client";

import type { JsonTreeProps } from "@omniroute/ui-kit/json-tree";
import JsonTree from "@/shared/components/JsonTree";

interface JsonViewerProps {
  data: unknown;
  className?: string;
  redact?: JsonTreeProps["redact"];
}

export function JsonViewer({ data, className, redact }: JsonViewerProps) {
  return <JsonTree value={data} expandDepth={2} redact={redact} className={className} />;
}
