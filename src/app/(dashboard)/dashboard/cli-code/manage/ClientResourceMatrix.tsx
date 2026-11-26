"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";
import { matchesSearch } from "@/shared/utils/turkishText";

type Resource = "skills" | "mcp" | "plugins";
type Action = "import" | "enable" | "disable" | "update" | "uninstall";
type Assignment = {
  enabled: boolean;
  canEnable: boolean;
  canDisable: boolean;
  canUpdate?: boolean;
  canUninstall?: boolean;
  reason?: string;
};
type Item = {
  id: string;
  name: string;
  description?: string;
  managed: boolean;
  shared?: boolean;
  sourceClient?: string;
  clients: Partial<Record<string, Assignment>>;
};
type Library = {
  items: Item[];
  errors?: Record<string, string>;
  results?: { id: string; ok: boolean; error?: string }[];
};

const endpoints = {
  skills: "/api/local/client-skill-library",
  mcp: "/api/local/client-mcp-library",
  plugins: "/api/local/client-plugin-library",
};
const unmanagedMessage = {
  skills: "unmanagedSkills",
  mcp: "unmanagedMcp",
  plugins: "unmanagedPlugins",
} as const;
const actionSelect = "rounded-md border border-border bg-surface px-2 py-1.5 text-sm";

async function readLibrary(endpoint: string, init?: RequestInit): Promise<Library> {
  const response = await fetch(endpoint, { cache: "no-store", ...init });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message ?? data.error ?? String(response.status));
  return data;
}

export default function ClientResourceMatrix({
  resource,
  clients,
}: {
  resource: Resource;
  clients: Record<string, string>;
}) {
  const t = useTranslations("clientManagement");
  const [library, setLibrary] = useState<Library>();
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [filterUnmanaged, setFilterUnmanaged] = useState(false);
  const [query, setQuery] = useState("");
  const endpoint = endpoints[resource];

  useEffect(() => {
    const controller = new AbortController();
    readLibrary(endpoint, { signal: controller.signal })
      .then(setLibrary)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setError(String(error));
      })
      .finally(() => {
        if (!controller.signal.aborted) setBusy(false);
      });
    return () => controller.abort();
  }, [endpoint]);

  const items = library?.items ?? [];
  const names = new Map(items.map((item) => [item.id, item.name]));
  const unmanaged = items.filter((item) => !item.managed);
  const selection = items.filter((item) => selected.includes(item.id));
  const managedSelection = selection.filter((item) => item.managed);
  const unmanagedSelection = selection.filter((item) => !item.managed);
  const visible = items.filter(
    (item) =>
      (!filterUnmanaged || !item.managed) &&
      matchesSearch(`${item.name} ${item.description ?? ""}`, query.trim())
  );
  const failures = library?.results?.filter((result) => !result.ok) ?? [];
  const done = library?.results?.filter((result) => result.ok).length ?? 0;

  async function change(action: Action, target: Item[], client?: string) {
    setBusy(true);
    setError("");
    try {
      const result = await readLibrary(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids: target.map(({ id }) => id), client }),
      });
      setLibrary(result);
      setSelected(result.results?.filter(({ ok }) => !ok).map(({ id }) => id) ?? []);
      if (action === "import" && result.results?.some(({ ok }) => ok)) setFilterUnmanaged(false);
    } catch (error) {
      setError(String(error));
    } finally {
      setBusy(false);
    }
  }

  const bulkSelect = (action: "enable" | "disable") => {
    const label = t(action === "enable" ? "enableIn" : "disableIn");
    return (
      <select
        className={actionSelect}
        aria-label={label}
        value=""
        disabled={busy || managedSelection.length === 0}
        onChange={(event) => void change(action, managedSelection, event.target.value)}
      >
        <option value="" disabled>
          {label}
        </option>
        {Object.entries(clients).map(([id, name]) => (
          <option
            key={id}
            value={id}
            disabled={
              !managedSelection.some((item) =>
                action === "enable" ? item.clients[id]?.canEnable : item.clients[id]?.canDisable
              )
            }
          >
            {name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="space-y-3">
      {unmanaged.length > 0 && !filterUnmanaged && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm">
          <p>{t(unmanagedMessage[resource], { count: unmanaged.length })}</p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setFilterUnmanaged(true);
              setSelected([]);
            }}
          >
            {t("reviewImport")}
          </Button>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          aria-label={t("searchLibrary")}
          placeholder={t("searchLibrary")}
          className="w-full max-w-xs rounded-md border border-border bg-surface px-3 py-1.5 text-sm"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {filterUnmanaged && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setFilterUnmanaged(false);
              setSelected([]);
            }}
          >
            {t("showAll")}
          </Button>
        )}
      </div>
      {selection.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
          <span>{t("selectedCount", { count: selection.length })}</span>
          {unmanagedSelection.length > 0 && (
            <Button
              size="sm"
              disabled={busy}
              onClick={() => void change("import", unmanagedSelection)}
            >
              {t("importSelected")}
            </Button>
          )}
          {managedSelection.length > 0 && (
            <>
              {bulkSelect("enable")}
              {bulkSelect("disable")}
              <Button
                size="sm"
                variant="secondary"
                disabled={
                  busy ||
                  (resource === "plugins" &&
                    !managedSelection.some((item) =>
                      Object.values(item.clients).some((state) => state?.canUpdate)
                    ))
                }
                onClick={() => void change("update", managedSelection)}
              >
                {t(resource === "mcp" ? "refreshLocal" : "updateSelected")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={
                  busy ||
                  (resource === "plugins" &&
                    !managedSelection.some((item) =>
                      Object.values(item.clients).some((state) => state?.canUninstall)
                    ))
                }
                onClick={() => {
                  if (
                    window.confirm(t(resource === "mcp" ? "unregisterConfirm" : "uninstallConfirm"))
                  ) {
                    void change("uninstall", managedSelection);
                  }
                }}
              >
                {t(resource === "mcp" ? "unregisterSelected" : "uninstallSelected")}
              </Button>
            </>
          )}
          <Button size="sm" variant="secondary" disabled={busy} onClick={() => setSelected([])}>
            {t("cancel")}
          </Button>
        </div>
      )}
      {busy && (
        <p role="status" className="text-sm text-text-muted">
          {t("working")}
        </p>
      )}
      {done > 0 && (
        <p role="status" className="text-sm text-text-muted">
          {t("changedCount", { count: done })}
        </p>
      )}
      {(error || failures.length > 0 || Object.keys(library?.errors ?? {}).length > 0) && (
        <div role="alert" className="space-y-1 text-sm text-danger">
          {error && <p>{error}</p>}
          {failures.map(({ id, error: detail }) => (
            <p key={id}>
              {names.get(id) ?? id} · {detail || t("changeFailed")}
            </p>
          ))}
          {Object.entries(library?.errors ?? {}).map(([id, detail]) => (
            <p key={id}>
              {clients[id] ?? id} · {detail}
            </p>
          ))}
        </div>
      )}
      {visible.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[42rem] table-fixed text-sm">
            <thead className="bg-surface text-text-muted">
              <tr>
                <th scope="col" className="w-12 px-3 py-2">
                  <span className="sr-only">{t("selectEntry")}</span>
                </th>
                <th scope="col" className="px-2 py-2 text-left">
                  {t("name")}
                </th>
                {Object.entries(clients).map(([id, name]) => (
                  <th key={id} scope="col" className="w-24 px-2 py-2 text-center">
                    {name}
                    <span className="block text-xs font-normal">
                      {items.filter((item) => item.clients[id]?.enabled).length}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((item) => {
                const chosen = selected.includes(item.id);
                const origin = item.shared
                  ? t("shared")
                  : item.sourceClient && clients[item.sourceClient];
                return (
                  <tr key={item.id}>
                    <td className="px-3 py-2">
                      <Checkbox
                        aria-label={t("selectNamedEntry", { name: item.name })}
                        checked={chosen}
                        disabled={busy || (!chosen && selected.length >= 50)}
                        onChange={() =>
                          setSelected(
                            chosen
                              ? selected.filter((id) => id !== item.id)
                              : [...selected, item.id]
                          )
                        }
                      />
                    </td>
                    <th scope="row" className="px-2 py-2 text-left font-normal">
                      <span className="block break-words font-medium">{item.name}</span>
                      {origin && <span className="text-xs text-text-muted">{origin}</span>}
                      {item.description && (
                        <p className="break-words text-xs text-text-muted">{item.description}</p>
                      )}
                    </th>
                    {Object.entries(clients).map(([id, name]) => {
                      const state = item.clients[id];
                      return (
                        <td key={id} className="px-2 py-2 text-center" title={state?.reason}>
                          {state ? (
                            <Checkbox
                              aria-label={t("assignmentLabel", { name: item.name, client: name })}
                              checked={state.enabled}
                              disabled={
                                busy ||
                                !item.managed ||
                                !(state.enabled ? state.canDisable : state.canEnable)
                              }
                              onChange={() =>
                                void change(state.enabled ? "disable" : "enable", [item], id)
                              }
                            />
                          ) : (
                            <span className="text-text-muted" aria-label={t("unavailable")}>
                              –
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !busy && !error && <p className="text-sm text-text-muted">{t("empty")}</p>
      )}
    </div>
  );
}
