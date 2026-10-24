"use client";

import { useId, useMemo, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Play,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { CodePreview, type CodePreviewToken } from "./code-preview";
import { Field, FieldGroup } from "./field";
import { Input } from "./input";
import { ModelIdentity } from "./model-identity";
import { Select } from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";
import { cn } from "./lib/utils";

export type RequestWorkbenchState = "empty" | "loading" | "streaming" | "success" | "error";

export interface RequestModelOption {
  value: string;
  label: string;
  provider: string;
  meta?: ReactNode;
  logo?: ReactNode;
}

export interface ParameterControlValues {
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  stream: boolean;
  concise: boolean;
  route: boolean;
  experiment: string;
  endUser: string;
}

export interface RequestResultData {
  status?: number;
  latencyMs?: number;
  tokensSaved?: number;
  savedUsd?: number;
  output?: ReactNode;
  headers?: Record<string, ReactNode>;
}

export type WalletStatus = "unknown" | "connected" | "disconnected" | "insufficient";

export interface WalletStatusNoticeProps extends ComponentProps<"div"> {
  status?: WalletStatus;
  estimatedMaximum?: ReactNode;
  onAction?: ComponentProps<"button">["onClick"];
}

export function WalletStatusNotice({
  className,
  status = "unknown",
  estimatedMaximum,
  onAction,
  ...props
}: WalletStatusNoticeProps) {
  const content = {
    unknown: {
      icon: <WalletCards aria-hidden="true" />,
      description: "Wallet coverage has not been confirmed for this request.",
    },
    connected: {
      icon: <CheckCircle2 aria-hidden="true" />,
      description: "Covered by your wallet balance.",
    },
    disconnected: {
      icon: <WalletCards aria-hidden="true" />,
      description: "Connect a wallet before sending this request.",
    },
    insufficient: {
      icon: <AlertCircle aria-hidden="true" />,
      description: "Add funds to cover this request's estimated maximum.",
    },
  }[status];

  return (
    <div
      data-slot="wallet-status-notice"
      data-status={status}
      className={cn("ci-wallet-notice", className)}
      role="status"
      {...props}
    >
      <span className="ci-wallet-notice__icon">{content.icon}</span>
      <div className="ci-wallet-notice__content">
        <span className="ci-wallet-notice__title">
          {status === "unknown" && "Wallet status unavailable"}
          {status === "connected" && (estimatedMaximum != null ? <>Estimated max usage · {estimatedMaximum}</> : "Wallet connected")}
          {status === "disconnected" && "Wallet not connected"}
          {status === "insufficient" && <>Insufficient balance · {estimatedMaximum}</>}
        </span>
        <p>{content.description}</p>
      </div>
      {(status === "disconnected" || status === "insufficient") && (
        <Button
          className="ci-wallet-notice__action"
          variant={status === "disconnected" ? "outline" : "default"}
          size="sm"
          onClick={onAction}
        >
          {status === "disconnected" ? "Connect wallet" : "Add funds"}
        </Button>
      )}
    </div>
  );
}

export interface ParameterControlsProps extends ComponentProps<"div"> {
  value: ParameterControlValues;
  onValueChange: (value: ParameterControlValues) => void;
}

function numberValue(value: string, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

export function ParameterControls({ className, value, onValueChange, ...props }: ParameterControlsProps) {
  const id = useId();
  const update = <K extends keyof ParameterControlValues,>(key: K, next: ParameterControlValues[K]) => {
    onValueChange({ ...value, [key]: next });
  };

  return (
    <div data-slot="parameter-controls" className={cn("ci-parameter-controls", className)} {...props}>
      <FieldGroup columns={2}>
        <Field label="Max output tokens" htmlFor={`${id}-tokens`}>
          <Input id={`${id}-tokens`} type="number" min={1} max={4096} value={value.maxTokens} onChange={(event) => update("maxTokens", numberValue(event.target.value, 128, 1, 4096))} />
        </Field>
        <Field label="Temperature" htmlFor={`${id}-temperature`}>
          <Input id={`${id}-temperature`} type="number" min={0} max={2} step={0.1} value={value.temperature} onChange={(event) => update("temperature", numberValue(event.target.value, 0, 0, 2))} />
        </Field>
      </FieldGroup>

      <details className="ci-advanced-controls">
        <summary>
          <span>Advanced parameters</span>
          <ChevronDown aria-hidden="true" />
        </summary>
        <div className="ci-advanced-controls__content">
          <FieldGroup columns={2} className="ci-advanced-controls__numbers">
            <Field label="Top P" htmlFor={`${id}-top-p`}>
              <Input id={`${id}-top-p`} type="number" min={0} max={1} step={0.05} value={value.topP} onChange={(event) => update("topP", numberValue(event.target.value, 1, 0, 1))} />
            </Field>
            <Field label="Frequency penalty" htmlFor={`${id}-frequency`}>
              <Input id={`${id}-frequency`} type="number" min={-2} max={2} step={0.1} value={value.frequencyPenalty} onChange={(event) => update("frequencyPenalty", numberValue(event.target.value, 0, -2, 2))} />
            </Field>
            <Field label="Presence penalty" htmlFor={`${id}-presence`}>
              <Input id={`${id}-presence`} type="number" min={-2} max={2} step={0.1} value={value.presencePenalty} onChange={(event) => update("presencePenalty", numberValue(event.target.value, 0, -2, 2))} />
            </Field>
          </FieldGroup>
          <div className="ci-advanced-controls__switches">
            <Switch label="Stream response" description="Return tokens as they arrive." checked={value.stream} onCheckedChange={(checked) => update("stream", checked)} side="right" />
            <Switch label="Concise mode" description="Prefer a shorter response." checked={value.concise} onCheckedChange={(checked) => update("concise", checked)} side="right" />
            <Switch label="Automatic routing" description="Choose an eligible provider automatically." checked={value.route} onCheckedChange={(checked) => update("route", checked)} side="right" />
          </div>
          <FieldGroup columns={2} className="ci-advanced-controls__metadata">
            <Field label="Experiment slug" htmlFor={`${id}-experiment`}>
              <Input id={`${id}-experiment`} value={value.experiment} placeholder="onboarding-copy" onChange={(event) => update("experiment", event.target.value)} />
            </Field>
            <Field label="End-user ID" htmlFor={`${id}-end-user`}>
              <Input id={`${id}-end-user`} value={value.endUser} placeholder="user_42" onChange={(event) => update("endUser", event.target.value)} />
            </Field>
          </FieldGroup>
        </div>
      </details>
    </div>
  );
}

export interface RequestResultMetricsProps extends ComponentProps<"div"> {
  result: RequestResultData;
}

export function RequestResultMetrics({ className, result, ...props }: RequestResultMetricsProps) {
  const metrics: Array<{ label: string; value: ReactNode; icon: ReactNode; positive?: boolean }> = [];
  if (result.status !== undefined) metrics.push({ label: "Status", value: result.status, icon: <CheckCircle2 />, positive: result.status >= 200 && result.status < 300 });
  if (result.latencyMs !== undefined) metrics.push({ label: "Latency", value: `${result.latencyMs} ms`, icon: <Clock3 /> });
  if (result.tokensSaved !== undefined) metrics.push({ label: "Tokens saved", value: result.tokensSaved.toLocaleString(), icon: <Sparkles /> });
  if (result.savedUsd !== undefined) metrics.push({ label: "Cost saved", value: `$${result.savedUsd.toFixed(5)}`, icon: <CircleDollarSign />, positive: result.savedUsd > 0 });
  if (!metrics.length) return null;
  return (
    <div data-slot="request-result-metrics" data-columns={metrics.length} className={cn("ci-request-metrics", className)} {...props}>
      {metrics.map((metric) => (
        <div className="ci-request-metric" data-positive={metric.positive || undefined} key={metric.label}>
          <span>{metric.icon}{metric.label}</span>
          <strong>{metric.value}</strong>
        </div>
      ))}
    </div>
  );
}

export interface RequestHeadersProps extends ComponentProps<"details"> {
  headers?: Record<string, ReactNode>;
  defaultOpen?: boolean;
}

export function RequestHeaders({ className, headers = {}, defaultOpen = false, ...props }: RequestHeadersProps) {
  const entries = Object.entries(headers);
  const [open, setOpen] = useState(defaultOpen);
  return (
    <details
      data-slot="request-headers"
      className={cn("ci-request-headers", className)}
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      {...props}
    >
      <summary><span>Response headers</span><span>{entries.length}</span><ChevronDown aria-hidden="true" /></summary>
      <dl>
        {entries.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}
      </dl>
    </details>
  );
}

export interface LiveResponsePanelProps extends ComponentProps<"section"> {
  state?: RequestWorkbenchState;
  result?: RequestResultData;
  errorMessage?: ReactNode;
  streamingOutput?: ReactNode;
  onRetry?: ComponentProps<"button">["onClick"];
}

export function LiveResponsePanel({ className, state = "empty", result = {}, errorMessage = "The request could not be completed. Check the request and try again.", streamingOutput, onRetry, ...props }: LiveResponsePanelProps) {
  const headers = result.headers ?? {};
  return (
    <section data-slot="live-response-panel" data-state={state} className={cn("ci-live-response", className)} {...props}>
      <header className="ci-live-response__header">
        <span>Live response</span>
        {state === "success" && <Badge variant="live">Complete</Badge>}
        {state === "streaming" && <Badge variant="live">Streaming</Badge>}
      </header>

      {state === "empty" && <div className="ci-live-response__empty"><span><Play aria-hidden="true" /></span><strong>Response appears here</strong><p>Run the request to inspect model output, latency, and savings.</p></div>}
      {state === "loading" && <div className="ci-live-response__loading" role="status"><span className="ci-response-loader" aria-hidden="true"><i /><i /><i /></span><strong>Sending request</strong><p>Connecting to an eligible provider…</p></div>}
      {state === "streaming" && <div className="ci-live-response__stream" role="status"><p>{streamingOutput ?? "Receiving response"}<span aria-hidden="true" /></p><small>Receiving tokens…</small></div>}
      {state === "error" && <div className="ci-live-response__error" role="alert"><AlertCircle aria-hidden="true" /><div><strong>Request failed</strong><p>{errorMessage}</p>{onRetry ? <Button variant="outline" size="sm" onClick={onRetry}>Try again</Button> : null}</div></div>}
      {state === "success" && <div className="ci-live-response__success"><RequestResultMetrics result={result} />{result.output != null ? <div className="ci-response-output"><span>Assistant output</span><p>{result.output}</p></div> : null}{Object.keys(headers).length ? <RequestHeaders headers={headers} /> : null}</div>}
    </section>
  );
}

const DEFAULT_PARAMETERS: ParameterControlValues = {
  maxTokens: 128,
  temperature: 0,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  stream: false,
  concise: false,
  route: true,
  experiment: "",
  endUser: "",
};

export interface RequestWorkbenchProps extends Omit<ComponentProps<"section">, "onSubmit" | "title"> {
  title?: ReactNode;
  description?: ReactNode;
  endpoint?: string;
  models?: RequestModelOption[];
  status?: RequestWorkbenchState;
  result?: RequestResultData;
  errorMessage?: ReactNode;
  streamingOutput?: ReactNode;
  codeLanguage?: ReactNode;
  codeFilename?: ReactNode;
  code?: string;
  codeLines?: CodePreviewToken[][];
  walletStatus?: WalletStatus;
  estimatedMaximum?: ReactNode;
  defaultPrompt?: string;
  onWalletAction?: ComponentProps<"button">["onClick"];
  onRun?: (request: { model: string; prompt: string; parameters: ParameterControlValues }) => void;
}

export function RequestWorkbench({
  className,
  title = "New request",
  description = "Choose a model, send a real prompt, and inspect request-level savings.",
  endpoint = "POST /chat/completions",
  models = [],
  status = "empty",
  result,
  errorMessage,
  streamingOutput,
  codeLanguage = "cURL",
  codeFilename = "request.sh",
  code,
  codeLines,
  walletStatus = "unknown",
  estimatedMaximum,
  defaultPrompt = "",
  onWalletAction,
  onRun,
  ...props
}: RequestWorkbenchProps) {
  const id = useId();
  const [model, setModel] = useState(models[0]?.value ?? "");
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [parameters, setParameters] = useState(DEFAULT_PARAMETERS);
  const modelOptions = useMemo(() => models.map((option) => ({
    value: option.value,
    label: <span className="ci-request-model-option"><ModelIdentity name={option.label} provider={option.provider} logo={option.logo} /><small>{option.meta}</small></span>,
  })), [models]);

  return (
    <section data-slot="request-workbench" className={cn("ci-request-workbench", className)} {...props}>
      <header className="ci-request-workbench__header"><div><h2>{title}</h2><p>{description}</p></div></header>
      <div className="ci-request-workbench__grid">
        <div className="ci-request-editor">
          <Field label="Model" htmlFor={`${id}-model`} hint="Live marketplace pricing; never above provider list price.">
            <Select id={`${id}-model`} name="model" value={model} onValueChange={setModel} options={modelOptions} placeholder="Choose a model" />
          </Field>
          <Field label="Prompt" htmlFor={`${id}-prompt`}>
            <Textarea id={`${id}-prompt`} value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          </Field>
          <ParameterControls value={parameters} onValueChange={setParameters} />
          <WalletStatusNotice status={walletStatus} estimatedMaximum={estimatedMaximum} onAction={onWalletAction} />
          <Button onClick={() => onRun?.({ model, prompt, parameters })} loading={status === "loading"} disabled={!model || !prompt.trim() || walletStatus !== "connected"}><Play aria-hidden="true" />{status === "loading" ? "Running request" : "Run request"}</Button>
        </div>
        <LiveResponsePanel state={status} result={result} errorMessage={errorMessage} streamingOutput={streamingOutput} onRetry={onRun ? () => onRun({ model, prompt, parameters }) : undefined} />
      </div>
      {code != null || codeLines != null ? <footer className="ci-request-workbench__code"><CodePreview filename={codeFilename} language={codeLanguage} metadata={endpoint} code={code} lines={codeLines} /></footer> : null}
    </section>
  );
}

export interface PlaygroundPageProps extends Omit<ComponentProps<"main">, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  controls?: ReactNode;
}

export function PlaygroundPage({ className, title = "Playground", description = "Send a real request, inspect the answer, and see request-level savings.", controls, children, ...props }: PlaygroundPageProps) {
  return <main data-slot="playground-page" className={cn("ci-playground-page", className)} {...props}><header className="ci-playground-page__header"><div><h1>{title}</h1><p>{description}</p></div>{controls != null && <div>{controls}</div>}</header>{children}</main>;
}
