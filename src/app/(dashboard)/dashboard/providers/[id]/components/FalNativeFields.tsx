"use client";
import { Button, Input, Select, Textarea } from "@/shared/components";
import type { FalPanelController, FalValue } from "./useFalNativeController";
type Props = { c: FalPanelController };

export function FalSearch({ c }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Input
        aria-label={c.common("search")}
        value={c.query}
        onChange={(e) => c.patch({ query: e.target.value, cursor: null })}
        className="rounded border bg-transparent p-2"
      />
      <Input
        aria-label={c.t("category")}
        placeholder={c.t("category")}
        value={c.category}
        onChange={(e) => c.patch({ category: e.target.value, cursor: null })}
        className="rounded border bg-transparent p-2"
      />
      <Button disabled={c.busy} onClick={() => c.action(() => c.search())}>
        {c.common("search")}
      </Button>
      {c.cursor && (
        <Button disabled={c.busy} onClick={() => c.action(() => c.search(true))}>
          {c.common("next")}
        </Button>
      )}
    </div>
  );
}
export function FalEndpoint({ c }: Props) {
  const select = (endpoint: string) => c.patch({ endpoint, definition: null });
  return (
    <>
      <Select
        aria-label={c.t("endpoint")}
        className="w-full rounded border bg-transparent p-2"
        value={c.endpoint}
        onChange={(e) => select(e.target.value)}
      >
        <option value="">{c.t("endpoint")}</option>
        {c.models.map((m) => (
          <option key={m.endpoint_id} value={m.endpoint_id}>
            {m.metadata?.display_name ?? m.endpoint_id} · {m.metadata?.category ?? ""}
          </option>
        ))}
      </Select>
      <div className="flex gap-2">
        <Input
          aria-label={c.t("endpoint")}
          value={c.endpoint}
          onChange={(e) => select(e.target.value)}
          className="min-w-0 flex-1 rounded border bg-transparent p-2"
          placeholder="owner/app/subpath"
        />
        <Button disabled={c.busy || !c.endpoint} onClick={() => c.action(c.load)}>
          {c.common("refresh")}
        </Button>
      </div>
    </>
  );
}
function ScalarField({ c, name, field }: Props & { name: string; field: FalValue }) {
  const options = Array.isArray(field.enum)
    ? field.enum
    : field.type === "boolean"
      ? [true, false]
      : null;
  const value = c.values[name];
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span>
        {name}
        {c.fields?.required.includes(name) ? " *" : ""}
        {name in (c.definition?.capabilities.reasoning ?? {}) ? ` · ${c.t("reasoning")}` : ""}
      </span>
      {options ? (
        <Select
          className="rounded border bg-transparent p-2"
          value={value === undefined ? "" : String(value)}
          onChange={(e) =>
            c.setParameter(
              name,
              options.find((v) => String(v) === e.target.value)
            )
          }
        >
          <option value="">—</option>
          {options.map((v) => (
            <option key={String(v)} value={String(v)}>
              {String(v)}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          className="rounded border bg-transparent p-2"
          type={field.type === "number" || field.type === "integer" ? "number" : "text"}
          value={String(value ?? "")}
          onChange={(e) => c.setParameter(name, scalarValue(e.target.value, field.type))}
        />
      )}
    </label>
  );
}
function scalarValue(value: string, type: unknown) {
  if (!value) return undefined;
  return type === "number" || type === "integer" ? Number(value) : value;
}
async function upload(c: FalPanelController, name: string, files: File[]) {
  const urls = await Promise.all(
    files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
  c.setParameter(name, name.endsWith("_urls") ? urls : urls[0]);
}
export function FalInputs({ c }: Props) {
  const entries = Object.entries(c.fields?.inputs ?? {});
  return (
    <>
      {c.definition && (
        <div className="grid gap-3 md:grid-cols-2">
          {entries
            .filter(
              ([, f]) =>
                ["string", "number", "integer", "boolean"].includes(String(f.type)) ||
                Array.isArray(f.enum)
            )
            .map(([name, field]) => (
              <ScalarField key={name} c={c} name={name} field={field} />
            ))}
          {entries
            .filter(([name]) => /(?:image|audio|video|file).*urls?$/.test(name))
            .map(([name, field]) => (
              <label className="text-sm" key={name}>
                {name}
                <Input
                  type="file"
                  multiple={field.type === "array" || name.endsWith("_urls")}
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    void c.action(() => upload(c, name, files));
                  }}
                />
              </label>
            ))}
        </div>
      )}
      <label className="block text-sm">
        {c.t("input")}
        <Textarea
          className="min-h-40 w-full rounded border bg-transparent p-2 font-mono"
          value={c.input}
          onChange={(e) => c.patch({ input: e.target.value, error: "" })}
          spellCheck={false}
        />
      </label>
    </>
  );
}
export function FalExecution({ c }: Props) {
  return (
    <div className="flex gap-2">
      <Select
        aria-label={c.t("transport")}
        value={c.transport}
        onChange={(e) => c.patch({ transport: e.target.value })}
        className="rounded border bg-transparent p-2"
      >
        {["queue", "direct", "stream", "realtime", "http-websocket"]
          .filter((name) => c.definition?.capabilities.transports[name])
          .map((name) => (
            <option key={name}>{name}</option>
          ))}
      </Select>
      <Button
        disabled={c.busy || !c.definition || !c.valid}
        onClick={() => c.action(() => c.run())}
      >
        {c.t(c.activeReceipt ? "newGeneration" : "run")}
      </Button>
      {c.busy && <Button onClick={() => c.abort.current?.abort()}>{c.common("cancel")}</Button>}
    </div>
  );
}
export function FalRecovery({ c }: Props) {
  if (!c.activeReceipt) return null;
  return (
    <div className="space-y-2" aria-live="polite">
      <p>
        {c.activeReceipt.status === "SUBMISSION_UNKNOWN"
          ? c.t("submissionUnknown")
          : c.activeReceipt.status}
      </p>
      <Select
        aria-label={c.t("recoveryRecord")}
        value={c.activeReceipt.key}
        onChange={(e) => c.selectReceipt(e.target.value)}
      >
        {c.receipts.map((r) => (
          <option key={r.key} value={r.key}>
            {r.endpoint} · {r.connection} · {r.jobId ?? r.status}
          </option>
        ))}
      </Select>
      <Button
        disabled={
          c.busy ||
          c.activeReceipt.transport !== "queue" ||
          c.activeReceipt.connection !== c.connectionId ||
          !c.valid
        }
        onClick={() => c.action(() => c.run(true))}
      >
        {c.t("recover")}
      </Button>
      <p className="text-sm">{c.t("recoveryHelp")}</p>
    </div>
  );
}
export function FalJobs({ c }: Props) {
  return (
    <div className="flex gap-2">
      <Input
        aria-label={c.t("job")}
        placeholder={c.t("job")}
        value={c.currentJobId}
        onChange={(e) => c.setJobId(e.target.value)}
        className="min-w-0 flex-1 rounded border bg-transparent p-2"
      />
      <Button disabled={c.busy || !c.currentJobId} onClick={() => c.action(() => c.retrieve())}>
        {c.common("refresh")}
      </Button>
      <Button disabled={c.busy || !c.currentJobId} onClick={() => c.action(() => c.retrieve(true))}>
        {c.common("cancel")}
      </Button>
    </div>
  );
}
export function FalRegistration({ c }: Props) {
  return (
    <details>
      <summary>{c.t("register")}</summary>
      <label className="block">
        {c.t("schema")}
        <Textarea
          className="min-h-40 w-full rounded border bg-transparent p-2 font-mono"
          value={c.schema}
          onChange={(e) => c.patch({ schema: e.target.value })}
        />
      </label>
      <Button disabled={c.busy || !c.endpoint} onClick={() => c.action(c.register)}>
        {c.common("save")}
      </Button>
    </details>
  );
}
export function FalResults({ c }: Props) {
  if (!c.result) return null;
  const artifacts = Array.isArray(c.result.artifacts) ? (c.result.artifacts as FalValue[]) : [];
  return (
    <>
      <pre
        aria-live="polite"
        className="max-h-96 overflow-auto whitespace-pre-wrap rounded border p-3 text-xs"
      >
        {JSON.stringify(c.result, null, 2)}
      </pre>
      <ul>
        {artifacts.map((file, i) => (
          <li key={i}>
            <a
              className="underline"
              download
              rel="noopener noreferrer"
              target="_blank"
              href={String(file.url)}
            >
              {String(file.file_name ?? file.path ?? c.t("download"))}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
