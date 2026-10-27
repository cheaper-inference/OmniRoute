"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { isSystemOneProvider } from "@omniroute/open-sse/config/systemOneRegistry";
import { providerText } from "../providerPageHelpers";

type Props = {
  providerId: string;
  connectionId?: string;
  initialModels?: unknown[];
  onChanged: () => void | Promise<void>;
};
type Model = {
  id: string;
  name?: string;
  context_length?: number | null;
  decision_primitives?: string[] | null;
};
function modelRows(raw: unknown): Model[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry) => {
    if (!entry || typeof entry !== "object" || typeof entry.id !== "string") return [];
    // Discovery is snake_case; the persisted connection inventory is camelCase.
    // Keep the context window distinct when present, with the legacy input cap
    // fallback used by the existing import normalizer for other providers.
    const contextLength = [entry.context_length, entry.contextWindow, entry.inputTokenLimit].find(
      (value): value is number =>
        typeof value === "number" && Number.isSafeInteger(value) && value > 0
    );
    const primitives = Array.isArray(entry.decision_primitives)
      ? entry.decision_primitives
      : entry.decisionPrimitives;
    return [
      {
        id: entry.id,
        ...(typeof entry.name === "string" ? { name: entry.name } : {}),
        ...(contextLength !== undefined ? { context_length: contextLength } : {}),
        ...(Array.isArray(primitives)
          ? {
              decision_primitives: primitives.filter(
                (value: unknown): value is string => typeof value === "string"
              ),
            }
          : {}),
      },
    ];
  });
}

function DecisionModelsState({ connectionId, initialModels = [], onChanged }: Props) {
  const t = useTranslations("providers");
  const catalogText = useTranslations("modelCatalog");
  const [discovered, setDiscovered] = useState<Model[] | null>(null);
  const [busy, setBusy] = useState<"discover" | "import" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const pending = useRef<AbortController | null>(null);
  useEffect(() => () => pending.current?.abort(), []);
  const rows =
    discovered ??
    modelRows(
      initialModels.filter((row) => {
        if (!row || typeof row !== "object") return false;
        const value = row as { modelType?: unknown; supportedEndpoints?: unknown };
        return (
          value.modelType === "decision" ||
          (Array.isArray(value.supportedEndpoints) &&
            value.supportedEndpoints.includes("systemone"))
        );
      })
    );

  const run = async (action: "discover" | "import") => {
    if (!connectionId || pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setBusy(action);
    setError(null);
    setNotice(null);
    let status = 0;
    try {
      const response = await fetch(
        `/api/providers/${encodeURIComponent(connectionId)}/${action === "discover" ? "models" : "sync-models"}?kind=decision`,
        {
          method: action === "discover" ? "GET" : "POST",
          ...(action === "import"
            ? { headers: { "Content-Type": "application/json" }, body: "{}" }
            : {}),
          signal: controller.signal,
        }
      );
      status = response.status;
      if (controller.signal.aborted) return;
      if (!response.ok) throw new Error("catalog failed");
      const payload: unknown = await response.json();
      if (
        !payload ||
        typeof payload !== "object" ||
        !("models" in payload) ||
        !Array.isArray(payload.models)
      )
        throw new Error("invalid catalog");
      if (controller.signal.aborted) return;
      setDiscovered(modelRows(payload.models));
      if (action === "import") {
        try {
          await onChanged();
        } catch {
          if (!controller.signal.aborted)
            setNotice(
              providerText(
                t,
                "endpointCapabilitiesRefreshFailed",
                "Saved endpoints, but the model list could not be refreshed. Reload to inspect."
              )
            );
          return;
        }
        if (!controller.signal.aborted)
          setNotice(providerText(t, "decisionImported", "Decision models imported"));
      }
    } catch {
      if (!controller.signal.aborted)
        setError(
          providerText(
            t,
            action === "discover" ? "decisionDiscoveryFailed" : "decisionImportFailed",
            action === "discover"
              ? "Decision model discovery failed (HTTP {status})"
              : "Decision model import failed (HTTP {status})",
            { status }
          )
        );
    } finally {
      if (pending.current === controller) {
        pending.current = null;
        setBusy(null);
      }
    }
  };
  const cancel = () => {
    pending.current?.abort();
    pending.current = null;
    setNotice(
      busy === "import"
        ? providerText(
            t,
            "decisionImportCancelled",
            "Cancelled locally. Reload models to check whether the import completed."
          )
        : providerText(t, "decisionDiscoveryCancelled", "Discovery cancelled")
    );
    setBusy(null);
  };
  return (
    <section
      className="mb-4 rounded-lg border border-border p-4"
      aria-label={providerText(t, "decisionModels", "Decision models")}
    >
      <h3 className="mb-2 text-sm font-semibold">
        {providerText(t, "decisionModels", "Decision models")}
      </h3>
      <p className="mb-3 text-xs text-text-muted">
        {providerText(
          t,
          "decisionCatalogHint",
          "Discovery reads model metadata only. It does not verify account access or run inference."
        )}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          disabled={!connectionId || busy !== null}
          onClick={() => void run("discover")}
        >
          {providerText(t, "discoverDecisionModels", "Discover decision models")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={!connectionId || busy !== null}
          onClick={() => void run("import")}
        >
          {providerText(t, "importDecisionModels", "Import decision models")}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={busy !== null}
          onClick={() => {
            setDiscovered(null);
            void Promise.resolve()
              .then(onChanged)
              .catch(() => setError(catalogText("refreshFailed")));
          }}
        >
          {providerText(t, "reloadSavedModels", "Reload saved models")}
        </Button>
        {busy && (
          <Button size="sm" variant="ghost" onClick={cancel}>
            {providerText(t, "decisionCancel", "Cancel request")}
          </Button>
        )}
      </div>
      {!connectionId && (
        <p className="mt-2 text-xs text-text-muted">
          {providerText(
            t,
            "decisionSelectConnection",
            "Select an active connection to discover decision models"
          )}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-error">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mt-2 text-xs text-text-muted">
          {notice}
        </p>
      )}
      <p className="mt-3 text-xs text-text-muted">
        {providerText(t, "decisionAccessUnverified", "Account access not verified")}
      </p>
      {rows.length === 0 ? (
        <p className="text-xs text-text-muted">
          {providerText(t, "decisionNoModels", "No decision models in this catalog")}
        </p>
      ) : (
        <ul className="mt-2 space-y-2">
          {rows.slice(0, 100).map((model) => (
            <li key={model.id} className="text-xs">
              <span className="font-medium">{model.name || model.id}</span>
              <code className="ml-2 break-all text-text-muted">{model.id}</code>
              <span className="ml-2 text-text-muted">
                {catalogText("context")}:{" "}
                {typeof model.context_length === "number" && model.context_length > 0
                  ? model.context_length.toLocaleString()
                  : providerText(t, "unknown", "Unknown")}
              </span>
              {model.decision_primitives?.length ? (
                <span className="ml-2 text-text-muted">{model.decision_primitives.join(", ")}</span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      {rows.length > 0 && (
        <p className="mt-2 text-xs text-text-muted">
          {catalogText("showingModels", {
            first: 1,
            last: Math.min(rows.length, 100),
            total: rows.length,
          })}
        </p>
      )}
    </section>
  );
}

export default function DecisionModelsSection(props: Props) {
  if (!isSystemOneProvider(props.providerId)) return null;
  return (
    <DecisionModelsState key={`${props.providerId}\0${props.connectionId ?? ""}`} {...props} />
  );
}
