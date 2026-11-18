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
export type RequestWorkbenchVariant = "default" | "onboarding";

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

export interface RequestWorkbenchLabels {
  modelLabel: string;
  modelPlaceholder: string;
  modelHint: string;
  noModelsHint: string;
  promptLabel: string;
  runLabel: string;
  runningLabel: string;
  sendLabel: string;
  sendingLabel: string;
  onboardingPaymentNotice: string;
  onboardingInsufficientNotice: string;
  maxTokensLabel: string;
  temperatureLabel: string;
  advancedParametersLabel: string;
  topPLabel: string;
  frequencyPenaltyLabel: string;
  presencePenaltyLabel: string;
  streamLabel: string;
  streamDescription: string;
  conciseLabel: string;
  conciseDescription: string;
  routeLabel: string;
  routeDescription: string;
  experimentLabel: string;
  experimentPlaceholder: string;
  endUserLabel: string;
  endUserPlaceholder: string;
  walletUnknownTitle: string;
  walletUnknownDescription: string;
  walletConnectedTitle: string;
  walletEstimatedMaximumTitle: (estimatedMaximum: ReactNode) => ReactNode;
  walletConnectedDescription: string;
  walletDisconnectedTitle: string;
  walletDisconnectedDescription: string;
  walletInsufficientTitle: (estimatedMaximum: ReactNode) => ReactNode;
  walletInsufficientDescription: string;
  walletConnectAction: string;
  walletAddFundsAction: string;
  statusMetricLabel: string;
  latencyMetricLabel: string;
  latencyValue: (milliseconds: number) => string;
  tokensSavedMetricLabel: string;
  tokensSavedValue: (tokens: number) => string;
  costSavedMetricLabel: string;
  costSavedValue: (usd: number) => string;
  responseHeadersLabel: string;
  liveResponseTitle: string;
  onboardingResponseTitle: string;
  completeBadge: string;
  streamingBadge: string;
  emptyTitle: string;
  emptyDescription: string;
  onboardingEmptyDescription: string;
  loadingTitle: string;
  loadingDescription: string;
  onboardingLoadingDescription: string;
  streamingFallback: string;
  streamingDescription: string;
  errorTitle: string;
  errorMessage: string;
  retryLabel: string;
  outputLabel: string;
}

export const defaultRequestWorkbenchLabels: Readonly<RequestWorkbenchLabels> = Object.freeze<RequestWorkbenchLabels>({
  modelLabel: "Model",
  modelPlaceholder: "Choose a model",
  modelHint: "Live marketplace pricing; never above provider list price.",
  noModelsHint: "No models are available yet. Try again in a moment.",
  promptLabel: "Prompt",
  runLabel: "Run request",
  runningLabel: "Running request",
  sendLabel: "Send request",
  sendingLabel: "Sending request",
  onboardingPaymentNotice: "Confirm your payment before sending your request.",
  onboardingInsufficientNotice: "Add credit before sending your request.",
  maxTokensLabel: "Max output tokens",
  temperatureLabel: "Temperature",
  advancedParametersLabel: "Advanced parameters",
  topPLabel: "Top P",
  frequencyPenaltyLabel: "Frequency penalty",
  presencePenaltyLabel: "Presence penalty",
  streamLabel: "Stream response",
  streamDescription: "Return tokens as they arrive.",
  conciseLabel: "Concise mode",
  conciseDescription: "Prefer a shorter response.",
  routeLabel: "Automatic routing",
  routeDescription: "Choose an eligible provider automatically.",
  experimentLabel: "Experiment slug",
  experimentPlaceholder: "onboarding-copy",
  endUserLabel: "End-user ID",
  endUserPlaceholder: "user_42",
  walletUnknownTitle: "Wallet status unavailable",
  walletUnknownDescription: "Wallet coverage has not been confirmed for this request.",
  walletConnectedTitle: "Wallet connected",
  walletEstimatedMaximumTitle: (estimatedMaximum) => <>Estimated max usage · {estimatedMaximum}</>,
  walletConnectedDescription: "Covered by your wallet balance.",
  walletDisconnectedTitle: "Wallet not connected",
  walletDisconnectedDescription: "Connect a wallet before sending this request.",
  walletInsufficientTitle: (estimatedMaximum) => <>Insufficient balance · {estimatedMaximum}</>,
  walletInsufficientDescription: "Add funds to cover this request's estimated maximum.",
  walletConnectAction: "Connect wallet",
  walletAddFundsAction: "Add funds",
  statusMetricLabel: "Status",
  latencyMetricLabel: "Latency",
  latencyValue: (milliseconds) => `${milliseconds} ms`,
  tokensSavedMetricLabel: "Tokens saved",
  tokensSavedValue: (tokens) => tokens.toLocaleString(),
  costSavedMetricLabel: "Cost saved",
  costSavedValue: (usd) => `$${usd.toFixed(5)}`,
  responseHeadersLabel: "Response headers",
  liveResponseTitle: "Live response",
  onboardingResponseTitle: "Response",
  completeBadge: "Complete",
  streamingBadge: "Streaming",
  emptyTitle: "Response appears here",
  emptyDescription: "Run the request to inspect model output, latency, and savings.",
  onboardingEmptyDescription: "Send a request to see your model’s answer.",
  loadingTitle: "Sending request",
  loadingDescription: "Connecting to an eligible provider…",
  onboardingLoadingDescription: "Waiting for your model’s response…",
  streamingFallback: "Receiving response",
  streamingDescription: "Receiving tokens…",
  errorTitle: "Request failed",
  errorMessage: "The request could not be completed. Check the request and try again.",
  retryLabel: "Try again",
  outputLabel: "Assistant output",
});

/** Copies `defaults` and applies every override that is not undefined. */
function mergeDefined<T extends object>(defaults: Readonly<T>, overrides?: Partial<T>): T {
  const merged: Record<string, unknown> = { ...defaults };
  if (overrides) for (const [key, value] of Object.entries(overrides)) if (value !== undefined) merged[key] = value;
  return merged as T;
}

function resolveLabels(labels?: Partial<RequestWorkbenchLabels>): RequestWorkbenchLabels {
  return mergeDefined(defaultRequestWorkbenchLabels, labels);
}

export interface WalletStatusNoticeProps extends ComponentProps<"div"> {
  status?: WalletStatus;
  estimatedMaximum?: ReactNode;
  onAction?: ComponentProps<"button">["onClick"];
  labels?: Partial<RequestWorkbenchLabels>;
}

export function WalletStatusNotice({
  className,
  status = "unknown",
  estimatedMaximum,
  onAction,
  labels,
  ...props
}: WalletStatusNoticeProps) {
  const text = resolveLabels(labels);
  // Titles are functions so that only the active status calls a localized formatter.
  const content = {
    unknown: {
      icon: <WalletCards aria-hidden="true" />,
      title: () => text.walletUnknownTitle,
      description: text.walletUnknownDescription,
    },
    connected: {
      icon: <CheckCircle2 aria-hidden="true" />,
      title: () => estimatedMaximum != null ? text.walletEstimatedMaximumTitle(estimatedMaximum) : text.walletConnectedTitle,
      description: text.walletConnectedDescription,
    },
    disconnected: {
      icon: <WalletCards aria-hidden="true" />,
      title: () => text.walletDisconnectedTitle,
      description: text.walletDisconnectedDescription,
    },
    insufficient: {
      icon: <AlertCircle aria-hidden="true" />,
      title: () => text.walletInsufficientTitle(estimatedMaximum),
      description: text.walletInsufficientDescription,
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
        <span className="ci-wallet-notice__title">{content.title()}</span>
        <p>{content.description}</p>
      </div>
      {(status === "disconnected" || status === "insufficient") && (
        <Button
          className="ci-wallet-notice__action"
          variant={status === "disconnected" ? "outline" : "default"}
          size="sm"
          onClick={onAction}
        >
          {status === "disconnected" ? text.walletConnectAction : text.walletAddFundsAction}
        </Button>
      )}
    </div>
  );
}

export type ParameterControlField = keyof ParameterControlValues;

/** Every built-in parameter control, in display order. */
export const parameterControlFields: readonly ParameterControlField[] = Object.freeze([
  "maxTokens",
  "temperature",
  "topP",
  "frequencyPenalty",
  "presencePenalty",
  "stream",
  "concise",
  "route",
  "experiment",
  "endUser",
]);

export interface ParameterControlsProps extends ComponentProps<"div"> {
  value: ParameterControlValues;
  onValueChange: (value: ParameterControlValues) => void;
  /** Built-in controls to render, defaults to all of them. Unlisted values are still sent unchanged. */
  fields?: readonly ParameterControlField[];
  labels?: Partial<RequestWorkbenchLabels>;
}

function numberValue(value: string, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

export function ParameterControls({ className, value, onValueChange, fields = parameterControlFields, labels, ...props }: ParameterControlsProps) {
  const id = useId();
  const text = resolveLabels(labels);
  const show = (field: ParameterControlField) => fields.includes(field);
  const update = <K extends keyof ParameterControlValues,>(key: K, next: ParameterControlValues[K]) => {
    onValueChange({ ...value, [key]: next });
  };
  const hasBasic = show("maxTokens") || show("temperature");
  const hasNumbers = show("topP") || show("frequencyPenalty") || show("presencePenalty");
  const hasSwitches = show("stream") || show("concise") || show("route");
  const hasMetadata = show("experiment") || show("endUser");

  return (
    <div data-slot="parameter-controls" className={cn("ci-parameter-controls", className)} {...props}>
      {hasBasic && (
        <FieldGroup columns={2}>
          {show("maxTokens") && (
            <Field label={text.maxTokensLabel} htmlFor={`${id}-tokens`}>
              <Input id={`${id}-tokens`} type="number" min={1} max={4096} value={value.maxTokens} onChange={(event) => update("maxTokens", numberValue(event.target.value, 128, 1, 4096))} />
            </Field>
          )}
          {show("temperature") && (
            <Field label={text.temperatureLabel} htmlFor={`${id}-temperature`}>
              <Input id={`${id}-temperature`} type="number" min={0} max={2} step={0.1} value={value.temperature} onChange={(event) => update("temperature", numberValue(event.target.value, 0, 0, 2))} />
            </Field>
          )}
        </FieldGroup>
      )}

      {(hasNumbers || hasSwitches || hasMetadata) && (
        <details className="ci-advanced-controls">
          <summary>
            <span>{text.advancedParametersLabel}</span>
            <ChevronDown aria-hidden="true" />
          </summary>
          <div className="ci-advanced-controls__content">
            {hasNumbers && (
              <FieldGroup columns={2} className="ci-advanced-controls__numbers">
                {show("topP") && (
                  <Field label={text.topPLabel} htmlFor={`${id}-top-p`}>
                    <Input id={`${id}-top-p`} type="number" min={0} max={1} step={0.05} value={value.topP} onChange={(event) => update("topP", numberValue(event.target.value, 1, 0, 1))} />
                  </Field>
                )}
                {show("frequencyPenalty") && (
                  <Field label={text.frequencyPenaltyLabel} htmlFor={`${id}-frequency`}>
                    <Input id={`${id}-frequency`} type="number" min={-2} max={2} step={0.1} value={value.frequencyPenalty} onChange={(event) => update("frequencyPenalty", numberValue(event.target.value, 0, -2, 2))} />
                  </Field>
                )}
                {show("presencePenalty") && (
                  <Field label={text.presencePenaltyLabel} htmlFor={`${id}-presence`}>
                    <Input id={`${id}-presence`} type="number" min={-2} max={2} step={0.1} value={value.presencePenalty} onChange={(event) => update("presencePenalty", numberValue(event.target.value, 0, -2, 2))} />
                  </Field>
                )}
              </FieldGroup>
            )}
            {hasSwitches && (
              <div className="ci-advanced-controls__switches">
                {show("stream") && <Switch label={text.streamLabel} description={text.streamDescription} checked={value.stream} onCheckedChange={(checked) => update("stream", checked)} side="right" />}
                {show("concise") && <Switch label={text.conciseLabel} description={text.conciseDescription} checked={value.concise} onCheckedChange={(checked) => update("concise", checked)} side="right" />}
                {show("route") && <Switch label={text.routeLabel} description={text.routeDescription} checked={value.route} onCheckedChange={(checked) => update("route", checked)} side="right" />}
              </div>
            )}
            {hasMetadata && (
              <FieldGroup columns={2} className="ci-advanced-controls__metadata">
                {show("experiment") && (
                  <Field label={text.experimentLabel} htmlFor={`${id}-experiment`}>
                    <Input id={`${id}-experiment`} value={value.experiment} placeholder={text.experimentPlaceholder} onChange={(event) => update("experiment", event.target.value)} />
                  </Field>
                )}
                {show("endUser") && (
                  <Field label={text.endUserLabel} htmlFor={`${id}-end-user`}>
                    <Input id={`${id}-end-user`} value={value.endUser} placeholder={text.endUserPlaceholder} onChange={(event) => update("endUser", event.target.value)} />
                  </Field>
                )}
              </FieldGroup>
            )}
          </div>
        </details>
      )}
    </div>
  );
}

export interface RequestResultMetricsProps extends ComponentProps<"div"> {
  result: RequestResultData;
  labels?: Partial<RequestWorkbenchLabels>;
}

export function RequestResultMetrics({ className, result, labels, ...props }: RequestResultMetricsProps) {
  const text = resolveLabels(labels);
  const metrics: Array<{ key: string; label: string; value: ReactNode; icon: ReactNode; positive?: boolean }> = [];
  if (result.status !== undefined) metrics.push({ key: "status", label: text.statusMetricLabel, value: result.status, icon: <CheckCircle2 />, positive: result.status >= 200 && result.status < 300 });
  if (result.latencyMs !== undefined) metrics.push({ key: "latency", label: text.latencyMetricLabel, value: text.latencyValue(result.latencyMs), icon: <Clock3 /> });
  if (result.tokensSaved !== undefined) metrics.push({ key: "tokens-saved", label: text.tokensSavedMetricLabel, value: text.tokensSavedValue(result.tokensSaved), icon: <Sparkles /> });
  if (result.savedUsd !== undefined) metrics.push({ key: "cost-saved", label: text.costSavedMetricLabel, value: text.costSavedValue(result.savedUsd), icon: <CircleDollarSign />, positive: result.savedUsd > 0 });
  if (!metrics.length) return null;
  return (
    <div data-slot="request-result-metrics" data-columns={metrics.length} className={cn("ci-request-metrics", className)} {...props}>
      {metrics.map((metric) => (
        <div className="ci-request-metric" data-positive={metric.positive || undefined} key={metric.key}>
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
  labels?: Partial<RequestWorkbenchLabels>;
}

export function RequestHeaders({ className, headers = {}, defaultOpen = false, labels, ...props }: RequestHeadersProps) {
  const text = resolveLabels(labels);
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
      <summary><span>{text.responseHeadersLabel}</span><span>{entries.length}</span><ChevronDown aria-hidden="true" /></summary>
      <dl>
        {entries.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}
      </dl>
    </details>
  );
}

export interface LiveResponsePanelProps extends ComponentProps<"section"> {
  /** Onboarding shows a compact, theme-aware answer without request metrics or headers. */
  variant?: RequestWorkbenchVariant;
  state?: RequestWorkbenchState;
  result?: RequestResultData;
  errorMessage?: ReactNode;
  streamingOutput?: ReactNode;
  onRetry?: ComponentProps<"button">["onClick"];
  labels?: Partial<RequestWorkbenchLabels>;
}

export function LiveResponsePanel({ className, variant = "default", state = "empty", result = {}, errorMessage, streamingOutput, onRetry, labels, ...props }: LiveResponsePanelProps) {
  const text = resolveLabels(labels);
  const headers = result.headers ?? {};
  const onboarding = variant === "onboarding";
  return (
    <section data-slot="live-response-panel" data-variant={onboarding ? variant : undefined} data-state={state} className={cn("ci-live-response", className)} {...props}>
      <header className="ci-live-response__header">
        <span>{onboarding ? text.onboardingResponseTitle : text.liveResponseTitle}</span>
        {state === "success" && <Badge variant="live">{text.completeBadge}</Badge>}
        {state === "streaming" && <Badge variant="live">{text.streamingBadge}</Badge>}
      </header>

      {state === "empty" && <div className="ci-live-response__empty">{!onboarding && <span><Play aria-hidden="true" /></span>}<strong>{text.emptyTitle}</strong><p>{onboarding ? text.onboardingEmptyDescription : text.emptyDescription}</p></div>}
      {state === "loading" && <div className="ci-live-response__loading" role="status"><span className="ci-response-loader" aria-hidden="true"><i /><i /><i /></span><strong>{text.loadingTitle}</strong><p>{onboarding ? text.onboardingLoadingDescription : text.loadingDescription}</p></div>}
      {state === "streaming" && <div className="ci-live-response__stream" role="status"><p>{streamingOutput ?? text.streamingFallback}<span aria-hidden="true" /></p><small>{text.streamingDescription}</small></div>}
      {state === "error" && <div className="ci-live-response__error" role="alert"><AlertCircle aria-hidden="true" /><div><strong>{text.errorTitle}</strong><p>{errorMessage === undefined ? text.errorMessage : errorMessage}</p>{onRetry ? <Button variant="outline" size="sm" onClick={onRetry}>{text.retryLabel}</Button> : null}</div></div>}
      {state === "success" && <div className="ci-live-response__success" role={onboarding ? "status" : undefined}>{!onboarding && <RequestResultMetrics result={result} labels={labels} />}{result.output != null ? <div className="ci-response-output">{!onboarding && <span>{text.outputLabel}</span>}<p>{result.output}</p></div> : null}{!onboarding && Object.keys(headers).length ? <RequestHeaders headers={headers} labels={labels} /> : null}</div>}
    </section>
  );
}

/** The parameters the default workbench starts with. */
export const defaultParameterControlValues: Readonly<ParameterControlValues> = Object.freeze<ParameterControlValues>({
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
});

export interface RequestWorkbenchProps extends Omit<ComponentProps<"section">, "onSubmit" | "title"> {
  /** A simple model, prompt, and response flow. Default retains every playground control. */
  variant?: RequestWorkbenchVariant;
  /** Pass null for both title and description to omit the onboarding header. */
  title?: ReactNode;
  description?: ReactNode;
  endpoint?: string;
  models?: RequestModelOption[];
  /** Controlled selection; pair with onModelChange. */
  model?: string;
  defaultModel?: string;
  onModelChange?: (value: string) => void;
  /** Controlled prompt; pair with onPromptChange to keep optional code samples in sync. */
  prompt?: string;
  onPromptChange?: (value: string) => void;
  disabled?: boolean;
  /** Defaults to 4000 for onboarding, and no limit for the full workbench. */
  promptMaxLength?: number;
  status?: RequestWorkbenchState;
  result?: RequestResultData;
  errorMessage?: ReactNode;
  streamingOutput?: ReactNode;
  codeLanguage?: ReactNode;
  codeFilename?: ReactNode;
  code?: string;
  codeLines?: CodePreviewToken[][];
  /** Pass null when requests are not paid from a wallet (for example, a self-hosted gateway): the wallet notice is omitted and runs are not gated on it. */
  walletStatus?: WalletStatus | null;
  estimatedMaximum?: ReactNode;
  defaultPrompt?: string;
  onWalletAction?: ComponentProps<"button">["onClick"];
  /** Controlled parameters; pair with onParametersChange. */
  parameters?: ParameterControlValues;
  /** Uncontrolled starting values, merged over defaultParameterControlValues; undefined keys keep the default. */
  defaultParameters?: Partial<ParameterControlValues>;
  onParametersChange?: (value: ParameterControlValues) => void;
  /** Built-in parameter controls to render in the default variant. */
  parameterFields?: readonly ParameterControlField[];
  /** Replaces the built-in parameter controls in the default variant; pass null to omit them. */
  parameterControls?: ReactNode;
  /** Interface text; unspecified keys keep the English defaults. */
  labels?: Partial<RequestWorkbenchLabels>;
  onRun?: (request: { model: string; prompt: string; parameters: ParameterControlValues }) => void;
}

export function RequestWorkbench({
  className,
  variant = "default",
  title = variant === "onboarding" ? "Try your first request" : "New request",
  description = variant === "onboarding" ? "Choose a model and send a message. Your response appears below." : "Choose a model, send a real prompt, and inspect request-level savings.",
  endpoint = "POST /chat/completions",
  models = [],
  model: controlledModel,
  defaultModel,
  onModelChange,
  prompt: controlledPrompt,
  onPromptChange,
  disabled = false,
  promptMaxLength,
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
  parameters: controlledParameters,
  defaultParameters,
  onParametersChange,
  parameterFields,
  parameterControls,
  labels,
  onRun,
  ...props
}: RequestWorkbenchProps) {
  const id = useId();
  const text = resolveLabels(labels);
  const onboarding = variant === "onboarding";
  const [localModel, setLocalModel] = useState(defaultModel ?? models[0]?.value ?? "");
  const [localPrompt, setLocalPrompt] = useState(defaultPrompt);
  const model = controlledModel ?? (onboarding && !models.some(option => option.value === localModel) ? models[0]?.value ?? "" : localModel);
  const prompt = controlledPrompt ?? localPrompt;
  const pending = status === "loading" || status === "streaming";
  const editorDisabled = disabled || (onboarding && pending);
  const maxLength = promptMaxLength ?? (onboarding ? 4000 : undefined);
  const validModel = !!model && (!onboarding || models.some(option => option.value === model));
  const validPrompt = !!prompt.trim() && (maxLength === undefined || prompt.length <= maxLength);
  const canRun = !disabled && validModel && validPrompt && (walletStatus === null || walletStatus === "connected") && (!onboarding || (!pending && !!onRun));
  const setModel = (value: string) => { if (controlledModel === undefined) setLocalModel(value); onModelChange?.(value); };
  const setPrompt = (value: string) => { if (controlledPrompt === undefined) setLocalPrompt(value); onPromptChange?.(value); };
  const [localParameters, setLocalParameters] = useState<ParameterControlValues>(() => mergeDefined(defaultParameterControlValues, defaultParameters));
  const parameters = controlledParameters ?? localParameters;
  const setParameters = (value: ParameterControlValues) => { if (controlledParameters === undefined) setLocalParameters(value); onParametersChange?.(value); };
  const modelOptions = useMemo(() => models.map((option) => ({
    value: option.value,
    label: <span className="ci-request-model-option"><ModelIdentity name={option.label} provider={option.provider} logo={option.logo} /><small>{option.meta}</small></span>,
  })), [models]);
  const run = () => {
    if ((onboarding || disabled) && !canRun) return;
    onRun?.({ model, prompt, parameters });
  };

  return (
    <section data-slot="request-workbench" data-variant={onboarding ? variant : undefined} className={cn("ci-request-workbench", className)} {...props}>
      {(!onboarding || title != null || description != null) && <header className="ci-request-workbench__header"><div>{(!onboarding || title != null) && <h2>{title}</h2>}{(!onboarding || description != null) && <p>{description}</p>}</div></header>}
      <div className="ci-request-workbench__grid">
        <div className="ci-request-editor">
          <Field label={text.modelLabel} htmlFor={`${id}-model`} hint={onboarding ? models.length ? undefined : text.noModelsHint : text.modelHint || undefined}>
            <Select id={`${id}-model`} name="model" value={model} onValueChange={setModel} options={modelOptions} placeholder={text.modelPlaceholder} disabled={editorDisabled || (onboarding && !models.length)} />
          </Field>
          <Field label={text.promptLabel} htmlFor={`${id}-prompt`}>
            <Textarea id={`${id}-prompt`} value={prompt} onChange={(event) => setPrompt(event.target.value)} disabled={editorDisabled} maxLength={maxLength} />
          </Field>
          {!onboarding && (parameterControls !== undefined ? parameterControls : <ParameterControls value={parameters} onValueChange={setParameters} fields={parameterFields} labels={labels} />)}
          {!onboarding && walletStatus !== null && <WalletStatusNotice status={walletStatus} estimatedMaximum={estimatedMaximum} onAction={onWalletAction} labels={labels} />}
          {onboarding && walletStatus !== null && walletStatus !== "connected" && <p className="ci-request-workbench__notice" role="status">{walletStatus === "insufficient" ? text.onboardingInsufficientNotice : text.onboardingPaymentNotice}</p>}
          <Button onClick={run} loading={onboarding ? pending : status === "loading"} disabled={!canRun}><Play aria-hidden="true" />{onboarding ? pending ? text.sendingLabel : text.sendLabel : status === "loading" ? text.runningLabel : text.runLabel}</Button>
        </div>
        {(!onboarding || status !== "empty") && <LiveResponsePanel variant={variant} state={status} result={result} errorMessage={errorMessage} streamingOutput={streamingOutput} labels={labels} onRetry={onRun && !disabled && (!onboarding || canRun) ? run : undefined} />}
      </div>
      {!onboarding && (code != null || codeLines != null) ? <footer className="ci-request-workbench__code"><CodePreview filename={codeFilename} language={codeLanguage} metadata={endpoint} code={code} lines={codeLines} /></footer> : null}
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
