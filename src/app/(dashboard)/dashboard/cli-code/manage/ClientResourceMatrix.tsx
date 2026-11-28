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
type MatrixProps = {
  resource: Resource;
  clients: Record<string, string>;
};
type ChangeLibrary = (action: Action, target: Item[], client?: string) => Promise<void>;

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

function useLibrary(resource: Resource, onChange: (action: Action, result: Library) => void) {
  const [library, setLibrary] = useState<Library>();
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
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
      onChange(action, result);
    } catch (error) {
      setError(String(error));
    } finally {
      setBusy(false);
    }
  }

  return { library, busy, error, change };
}

export default function ClientResourceMatrix({ resource, clients }: MatrixProps) {
  const t = useTranslations("clientManagement");
  const [selected, setSelected] = useState<string[]>([]);
  const [filterUnmanaged, setFilterUnmanaged] = useState(false);
  const [query, setQuery] = useState("");
  const { library, busy, error, change } = useLibrary(resource, (action, result) => {
    setSelected(result.results?.filter(({ ok }) => !ok).map(({ id }) => id) ?? []);
    if (action === "import" && result.results?.some(({ ok }) => ok)) setFilterUnmanaged(false);
  });
  const items = library?.items ?? [];
  const unmanaged = items.filter((item) => !item.managed);
  const selection = items.filter((item) => selected.includes(item.id));
  const visible = items.filter(
    (item) =>
      (!filterUnmanaged || !item.managed) &&
      matchesSearch(`${item.name} ${item.description ?? ""}`, query.trim())
  );

  function showUnmanaged(value: boolean) {
    setFilterUnmanaged(value);
    setSelected([]);
  }

  return (
    <div className="space-y-3">
      {unmanaged.length > 0 && !filterUnmanaged && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm">
          <p>{t(unmanagedMessage[resource], { count: unmanaged.length })}</p>
          <Button size="sm" variant="secondary" onClick={() => showUnmanaged(true)}>
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
          <Button size="sm" variant="secondary" onClick={() => showUnmanaged(false)}>
            {t("showAll")}
          </Button>
        )}
      </div>
      {selection.length > 0 && (
        <SelectionActions
          resource={resource}
          clients={clients}
          items={selection}
          busy={busy}
          change={change}
          onClear={() => setSelected([])}
        />
      )}
      <LibraryStatus library={library} clients={clients} busy={busy} error={error} />
      {visible.length > 0 ? (
        <LibraryTable
          items={items}
          visible={visible}
          clients={clients}
          busy={busy}
          selected={selected}
          onSelect={(id) =>
            setSelected(
              selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]
            )
          }
          change={change}
        />
      ) : (
        !busy && !error && <p className="text-sm text-text-muted">{t("empty")}</p>
      )}
    </div>
  );
}

type SelectionProps = MatrixProps & { items: Item[]; busy: boolean; change: ChangeLibrary };

function SelectionActions({
  items,
  onClear,
  ...actions
}: SelectionProps & { onClear: () => void }) {
  const t = useTranslations("clientManagement");
  const { busy, change } = actions;
  const managed = items.filter((item) => item.managed);
  const unmanaged = items.filter((item) => !item.managed);
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
      <span>{t("selectedCount", { count: items.length })}</span>
      {unmanaged.length > 0 && (
        <Button size="sm" disabled={busy} onClick={() => void change("import", unmanaged)}>
          {t("importSelected")}
        </Button>
      )}
      {managed.length > 0 && <ManagedActions {...actions} items={managed} />}
      <Button size="sm" variant="secondary" disabled={busy} onClick={onClear}>
        {t("cancel")}
      </Button>
    </div>
  );
}

function ManagedActions({ resource, clients, items, busy, change }: SelectionProps) {
  const t = useTranslations("clientManagement");
  const mcp = resource === "mcp";
  const pluginActionDisabled = (permission: "canUpdate" | "canUninstall") =>
    busy ||
    (resource === "plugins" &&
      !items.some((item) => Object.values(item.clients).some((state) => state?.[permission])));
  return (
    <>
      {(["enable", "disable"] as const).map((action) => (
        <BulkAssignmentSelect key={action} {...{ action, clients, items, busy, change }} />
      ))}
      <Button
        size="sm"
        variant="secondary"
        disabled={pluginActionDisabled("canUpdate")}
        onClick={() => void change("update", items)}
      >
        {t(mcp ? "refreshLocal" : "updateSelected")}
      </Button>
      <Button
        size="sm"
        variant="secondary"
        disabled={pluginActionDisabled("canUninstall")}
        onClick={() => {
          if (window.confirm(t(mcp ? "unregisterConfirm" : "uninstallConfirm"))) {
            void change("uninstall", items);
          }
        }}
      >
        {t(mcp ? "unregisterSelected" : "uninstallSelected")}
      </Button>
    </>
  );
}

function BulkAssignmentSelect({
  action,
  clients,
  items,
  busy,
  change,
}: Omit<SelectionProps, "resource"> & { action: "enable" | "disable" }) {
  const t = useTranslations("clientManagement");
  const enabling = action === "enable";
  const label = t(enabling ? "enableIn" : "disableIn");
  const permission = enabling ? "canEnable" : "canDisable";
  return (
    <select
      className={actionSelect}
      aria-label={label}
      value=""
      disabled={busy || items.length === 0}
      onChange={(event) => void change(action, items, event.target.value)}
    >
      <option value="" disabled>
        {label}
      </option>
      {Object.entries(clients).map(([id, name]) => (
        <option
          key={id}
          value={id}
          disabled={!items.some((item) => item.clients[id]?.[permission])}
        >
          {name}
        </option>
      ))}
    </select>
  );
}

function LibraryStatus({
  library,
  clients,
  busy,
  error,
}: Pick<MatrixProps, "clients"> & { library?: Library; busy: boolean; error: string }) {
  const t = useTranslations("clientManagement");
  const names = new Map((library?.items ?? []).map((item) => [item.id, item.name]));
  const results = library?.results ?? [];
  const failures = results.filter((result) => !result.ok);
  const done = results.length - failures.length;
  const errors = Object.entries(library?.errors ?? {});
  return (
    <>
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
      {(error || failures.length > 0 || errors.length > 0) && (
        <div role="alert" className="space-y-1 text-sm text-danger">
          {error && <p>{error}</p>}
          {failures.map(({ id, error: detail }) => (
            <p key={id}>
              {names.get(id) ?? id} · {detail || t("changeFailed")}
            </p>
          ))}
          {errors.map(([id, detail]) => (
            <p key={id}>
              {clients[id] ?? id} · {detail}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

type TableSelection = {
  selected: string[];
  onSelect: (id: string) => void;
};

function LibraryTable({
  items,
  visible,
  ...row
}: Omit<SelectionProps, "resource"> & TableSelection & { visible: Item[] }) {
  const t = useTranslations("clientManagement");
  return (
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
            {Object.entries(row.clients).map(([id, name]) => (
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
          {visible.map((item) => (
            <LibraryRow key={item.id} item={item} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LibraryRow({
  item,
  clients,
  busy,
  selected,
  onSelect,
  change,
}: Omit<SelectionProps, "resource" | "items"> & TableSelection & { item: Item }) {
  const t = useTranslations("clientManagement");
  const chosen = selected.includes(item.id);
  const origin = item.shared ? t("shared") : item.sourceClient && clients[item.sourceClient];
  return (
    <tr>
      <td className="px-3 py-2">
        <Checkbox
          aria-label={t("selectNamedEntry", { name: item.name })}
          checked={chosen}
          disabled={busy || (!chosen && selected.length >= 50)}
          onChange={() => onSelect(item.id)}
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
                  busy || !item.managed || !(state.enabled ? state.canDisable : state.canEnable)
                }
                onChange={() => void change(state.enabled ? "disable" : "enable", [item], id)}
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
}
