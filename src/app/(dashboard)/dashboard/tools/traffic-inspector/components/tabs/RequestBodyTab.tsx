"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { JsonTreeNode } from "@omniroute/ui-kit/json-tree";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import Button from "@/shared/components/Button";
import { JsonViewer } from "../shared/JsonViewer";
import { SecretMaskToggle } from "../shared/SecretMaskToggle";

interface RequestBodyTabProps {
  request: InterceptedRequest;
}

const MASK_PATTERNS = [/sk-[A-Za-z0-9]+/g, /Bearer [A-Za-z0-9._-]+/g, /eyJ[A-Za-z0-9._-]+/g];

function maskSecrets(text: string): string {
  let out = text;
  for (const p of MASK_PATTERNS) {
    out = out.replace(p, "••••");
  }
  return out;
}

/** The tree's redact hook: it applies on screen and to every copy, ancestors included. */
function redactSecret({ value }: JsonTreeNode): string | undefined {
  if (typeof value !== "string") return undefined;
  const masked = maskSecrets(value);
  return masked === value ? undefined : masked;
}

/** A redacted node keeps its key, so a secret used as a key has to go before the tree sees it. */
function maskSecretKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(maskSecretKeys);
  if (typeof value !== "object" || value === null) return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [maskSecrets(key), maskSecretKeys(child)])
  );
}

export function RequestBodyTab({ request }: RequestBodyTabProps) {
  const t = useTranslations("trafficInspector");
  const [masked, setMasked] = useState(true);
  const [raw, setRaw] = useState(false);

  const body = request.requestBody;
  if (!body) {
    return <p className="p-4 text-sm text-text-muted">{t("noRequestBody")}</p>;
  }

  const display = masked ? maskSecrets(body) : body;
  let parsed: unknown = null;
  try {
    parsed = JSON.parse(body);
    if (masked) parsed = maskSecretKeys(parsed);
  } catch {
    // not JSON
  }

  return (
    <div className="h-full flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2">
        <SecretMaskToggle masked={masked} onToggle={() => setMasked((m) => !m)} />
        <Button variant="outline" size="sm" aria-pressed={raw} onClick={() => setRaw((r) => !r)}>
          {raw ? t("formatted") : t("raw")}
        </Button>
        <span className="ml-auto text-xs text-text-muted">{request.requestSize} B</span>
      </div>
      <div className="flex-1 overflow-auto rounded-control border border-border bg-bg-subtle p-2">
        {raw || !parsed ? (
          <pre className="text-xs font-mono text-text-main whitespace-pre-wrap break-all">
            {display}
          </pre>
        ) : (
          <JsonViewer data={parsed} redact={masked ? redactSecret : undefined} />
        )}
      </div>
    </div>
  );
}
