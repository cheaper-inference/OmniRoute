"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Button } from "@/shared/components";
import ClientResourceMatrix from "./ClientResourceMatrix";

const clients = {
  codex: "Codex",
  hermes: "Hermes",
  "kimi-code": "Kimi Code",
  codebuddy: "CodeBuddy",
} as const;

const sections = ["instructions", "mcp", "skills", "plugins", "configs"] as const;
type Client = keyof typeof clients;
type Section = (typeof sections)[number];
type Text = ReturnType<typeof useTranslations<"clientManagement">>;

type Instructions = {
  file: string;
  exists: boolean;
  content: string;
  revision: string;
  canRestore: boolean;
  variants: { id: string; name: string; content: string }[];
};

type Mcp = {
  file: string;
  revision: string;
  canRestore: boolean;
  canToggle: boolean;
  servers: { name: string; transport: string; enabled: boolean }[];
};

type Models = {
  file: string;
  models: string[];
  options: string[];
  revision: string;
  canRestore: boolean;
};

const field = "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm";

async function request<T>(
  resource: string,
  client: Client,
  body?: object,
  method = "POST"
): Promise<T> {
  const base = "/api/local/" + resource;
  const response = await fetch(body ? base : base + "?client=" + client, {
    cache: "no-store",
    ...(body && {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client, ...body }),
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    const message = typeof result.error === "string" ? result.error : result.error?.message;
    throw new Error(message || String(response.status));
  }
  return result as T;
}

function useResource<T>(resource: string, client: Client, t: Text) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    request<T>(resource, client)
      .then((result) => active && setData(result))
      .catch((error: unknown) => active && setError(t("loadError", { detail: String(error) })))
      .finally(() => active && setBusy(false));
    return () => {
      active = false;
    };
  }, [resource, client, t]);

  const change = async (body: object, method?: string) => {
    setBusy(true);
    setError("");
    setSaved(false);
    try {
      const result = await request<T>(resource, client, body, method);
      setData(result);
      setSaved(true);
      return result;
    } catch (error) {
      setError(t("saveError", { detail: String(error) }));
    } finally {
      setBusy(false);
    }
  };

  return { data, error, busy, saved, change };
}

function Status({
  error,
  busy,
  saved,
  t,
}: {
  error: string;
  busy: boolean;
  saved: boolean;
  t: Text;
}) {
  return error ? (
    <p role="alert" className="text-sm text-red-600">
      {error}
    </p>
  ) : busy || saved ? (
    <p role="status" className="text-sm text-text-muted">
      {t(busy ? "working" : "saved")}
    </p>
  ) : null;
}

function ImportedPromptSelect({
  variants,
  busy,
  t,
  onSelect,
}: {
  variants: Instructions["variants"];
  busy: boolean;
  t: Text;
  onSelect: (content: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span>{t("importedPrompt")}</span>
      <select
        className={field}
        value=""
        disabled={busy}
        onChange={(event) => {
          const variant = variants.find(({ id }) => id === event.target.value);
          if (variant) onSelect(variant.content);
        }}
      >
        <option value="">{t("chooseImportedPrompt")}</option>
        {variants.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

function InstructionPreview({ before, after, t }: { before: string; after?: string; t: Text }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {Object.entries({ before, after }).map(([label, value]) => (
        <div key={label}>
          <strong>{t(label as "before" | "after")}</strong>
          <pre className={field + " max-h-72 overflow-auto whitespace-pre-wrap"}>{value}</pre>
        </div>
      ))}
    </div>
  );
}

function InstructionEditor({ client, t }: { client: Client; t: Text }) {
  const state = useResource<Instructions>("client-instructions", client, t);
  const [draft, setDraft] = useState<string>();
  const [preview, setPreview] = useState(false);
  const entry = state.data;
  const edited = draft !== undefined && draft !== entry?.content;

  async function write(action: "save" | "restore") {
    if (!entry) return;
    const result = await state.change({
      action,
      revision: entry.revision,
      ...(action === "save" && { content: draft }),
    });
    if (result) {
      setDraft(undefined);
      setPreview(false);
    }
  }

  return (
    <div className="space-y-3">
      <Status {...state} t={t} />
      {entry && (
        <>
          {entry.variants.length > 0 && (
            <ImportedPromptSelect
              variants={entry.variants}
              busy={state.busy}
              t={t}
              onSelect={(content) => {
                setDraft(content);
                setPreview(true);
              }}
            />
          )}
          <label className="block space-y-2">
            <strong>{entry.file}</strong>
            {!entry.exists && <span className="block text-sm">{t("missing")}</span>}
            <textarea
              className={field + " min-h-52 font-mono"}
              value={draft ?? entry.content}
              onChange={(event) => {
                setDraft(event.target.value);
                setPreview(false);
              }}
              readOnly={state.busy}
            />
          </label>
          {preview && <InstructionPreview before={entry.content} after={draft} t={t} />}
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" disabled={!edited} onClick={() => setPreview(!preview)}>
              {t("preview")}
            </Button>
            <Button disabled={!edited || !preview || state.busy} onClick={() => void write("save")}>
              {t("save")}
            </Button>
            <Button
              variant="secondary"
              disabled={!entry.canRestore || state.busy || edited}
              onClick={() => {
                if (window.confirm(t("restoreConfirm"))) void write("restore");
              }}
            >
              {t("restore")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

type McpServer = Mcp["servers"][number];
type McpChange = ReturnType<typeof useResource<Mcp>>["change"];
type McpDraft = {
  editing: string;
  name: string;
  transport: "stdio" | "http";
  address: string;
  args: string;
};

function McpServerList({
  entry,
  busy,
  change,
  onSelect,
  t,
}: {
  entry: Mcp;
  busy: boolean;
  change: McpChange;
  onSelect: (server: McpServer) => void;
  t: Text;
}) {
  return (
    <ul className="divide-y divide-border">
      {entry.servers.map((server) => (
        <li key={server.name} className="flex flex-wrap items-center justify-between gap-2 py-2">
          <span>
            {server.name} · {server.transport}
          </span>
          <span className="flex flex-wrap gap-2">
            {server.transport !== "unknown" && (
              <Button
                variant="secondary"
                size="sm"
                disabled={busy}
                onClick={() => onSelect(server)}
              >
                {t("edit")}
              </Button>
            )}
            {entry.canToggle && (
              <Button
                variant="secondary"
                size="sm"
                disabled={busy}
                onClick={() =>
                  void change({
                    action: "toggle",
                    revision: entry.revision,
                    name: server.name,
                    enabled: !server.enabled,
                  })
                }
              >
                {t(server.enabled ? "disable" : "enable")}
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              disabled={busy}
              onClick={() => {
                if (window.confirm(t("removeConfirm", { name: server.name }))) {
                  void change({ action: "remove", revision: entry.revision, name: server.name });
                }
              }}
            >
              {t("remove")}
            </Button>
          </span>
        </li>
      ))}
    </ul>
  );
}

function McpConnectionForm({
  draft,
  busy,
  t,
  onChange,
  onSave,
  onCancel,
}: {
  draft: McpDraft;
  busy: boolean;
  t: Text;
  onChange: (draft: McpDraft) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
}) {
  const { editing, name, transport, address, args } = draft;
  return (
    <form
      className="grid gap-2 rounded-md border border-border p-3"
      onSubmit={(event) => {
        event.preventDefault();
        void onSave();
      }}
    >
      {editing && <p className="text-sm text-text-muted">{t("editConnection")}</p>}
      <label>
        {t("name")}
        <input
          className={field}
          value={name}
          readOnly={Boolean(editing)}
          onChange={(event) => onChange({ ...draft, name: event.target.value })}
          required
        />
      </label>
      <label>
        {t("transport")}
        <select
          className={field}
          value={transport}
          onChange={(event) =>
            onChange({ ...draft, transport: event.target.value === "http" ? "http" : "stdio" })
          }
        >
          <option value="stdio">stdio</option>
          <option value="http">HTTP</option>
        </select>
      </label>
      <label>
        {t(transport === "http" ? "url" : "command")}
        <input
          className={field}
          value={address}
          onChange={(event) => onChange({ ...draft, address: event.target.value })}
          required
        />
      </label>
      {transport === "stdio" && (
        <label>
          {t("arguments")}
          <textarea
            className={field}
            value={args}
            onChange={(event) => onChange({ ...draft, args: event.target.value })}
          />
        </label>
      )}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>
          {t("save")}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}

function McpManager({ client, t }: { client: Client; t: Text }) {
  const state = useResource<Mcp>("client-mcp", client, t);
  const [draft, setDraft] = useState<McpDraft>();
  const entry = state.data;

  function select(server?: McpServer) {
    const name = server?.name ?? "";
    const transport = server?.transport === "http" ? "http" : "stdio";
    setDraft({ editing: name, name, transport, address: "", args: "" });
  }

  async function save() {
    if (!entry || !draft) return;
    const { editing, name, transport, address, args } = draft;
    const server =
      transport === "http"
        ? { transport, url: address.trim() }
        : { transport, command: address.trim(), args: args ? args.split(/\r?\n/) : [] };
    const result = await state.change({
      action: editing ? "update" : "add",
      revision: entry.revision,
      name: name.trim(),
      server,
    });
    if (result) setDraft(undefined);
  }

  return (
    <div className="space-y-3">
      <Status {...state} t={t} />
      {entry && (
        <>
          <p className="text-sm text-text-muted">{entry.file}</p>
          {entry.servers.length === 0 && <p>{t("empty")}</p>}
          <McpServerList
            entry={entry}
            busy={state.busy}
            change={state.change}
            onSelect={select}
            t={t}
          />
          <div className="flex flex-wrap gap-2">
            <Button disabled={state.busy} onClick={() => select()}>
              {t("addServer")}
            </Button>
            <Button
              variant="secondary"
              disabled={!entry.canRestore || state.busy}
              onClick={() => {
                if (window.confirm(t("restoreConfirm"))) {
                  void state.change({ action: "restore", revision: entry.revision });
                }
              }}
            >
              {t("restore")}
            </Button>
          </div>
          {draft && (
            <McpConnectionForm
              draft={draft}
              busy={state.busy}
              t={t}
              onChange={setDraft}
              onSave={save}
              onCancel={() => setDraft(undefined)}
            />
          )}
        </>
      )}
    </div>
  );
}

function ModelEditor({ client, t }: { client: "kimi-code" | "codebuddy"; t: Text }) {
  const state = useResource<Models>("client-model-config", client, t);
  const [draft, setDraft] = useState<string>();
  const entry = state.data;
  const kimi = client === "kimi-code";
  const saved = entry?.models.join("\n") ?? "";
  const value = draft ?? saved;
  async function write(action: "save" | "restore") {
    if (!entry) return;
    const result = await state.change({
      action,
      revision: entry.revision,
      ...(action === "save" && {
        models: value
          .split(/\r?\n/)
          .map((id) => id.trim())
          .filter(Boolean),
      }),
    });
    if (result) setDraft(undefined);
  }
  return (
    <div className="space-y-3">
      <Status {...state} t={t} />
      {entry && (
        <>
          <p className="text-sm text-text-muted">{entry.file}</p>
          <label className="block space-y-2">
            <span>{t(kimi ? "defaultModel" : "visibleModels")}</span>
            {kimi ? (
              <select
                className={field}
                value={value}
                disabled={state.busy}
                onChange={(event) => setDraft(event.target.value)}
              >
                <option value="">{t("chooseModel")}</option>
                {entry.options.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            ) : (
              <textarea
                className={field}
                value={value}
                rows={4}
                readOnly={state.busy}
                onChange={(event) => setDraft(event.target.value)}
              />
            )}
          </label>
          {!kimi && <p className="text-sm text-text-muted">{t("visibleModelsHelp")}</p>}
          <div className="flex flex-wrap gap-2">
            <Button
              disabled={state.busy || value === saved || (kimi && !value)}
              onClick={() => void write("save")}
            >
              {t("save")}
            </Button>
            <Button
              variant="secondary"
              disabled={state.busy || !entry.canRestore || value !== saved}
              onClick={() => {
                if (window.confirm(t("restoreConfirm"))) void write("restore");
              }}
            >
              {t("restore")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function ClientManagementPage() {
  const t = useTranslations("clientManagement");
  const [client, setClient] = useState<Client>("codex");
  const [section, setSection] = useState<Section>("instructions");
  return (
    <div className="flex flex-col gap-5">
      <PageHeader compact title={t("title")} description={t("description")} />
      <section className="space-y-4 rounded-lg border border-border p-4">
        {section !== "skills" && section !== "plugins" && (
          <label className="block max-w-xs space-y-2">
            <span>{t("clientLabel")}</span>
            <select
              className={field}
              value={client}
              onChange={(event) => setClient(event.target.value as Client)}
            >
              {Object.entries(clients).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="flex flex-wrap gap-2" aria-label={t("title")}>
          {sections.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={item === section ? "primary" : "secondary"}
              aria-pressed={item === section}
              onClick={() => setSection(item)}
            >
              {t(item)}
            </Button>
          ))}
        </div>
        {section === "instructions" && <InstructionEditor key={client} client={client} t={t} />}
        {(section === "skills" || section === "mcp" || section === "plugins") && (
          <ClientResourceMatrix key={section} resource={section} clients={clients} />
        )}
        {section === "mcp" && (
          <details className="space-y-3 rounded-md border border-border p-3">
            <summary className="cursor-pointer text-sm font-medium">
              {t("editNativeMcp", { client: clients[client] })}
            </summary>
            <McpManager key={client} client={client} t={t} />
          </details>
        )}
        {section === "configs" &&
          (client === "codex" || client === "hermes" ? (
            <Link
              className="text-primary underline"
              href={"/dashboard/cli-code/" + (client === "hermes" ? "hermes-agent" : client)}
            >
              {t("openRouting")}
            </Link>
          ) : (
            <ModelEditor key={client} client={client} t={t} />
          ))}
      </section>
    </div>
  );
}
