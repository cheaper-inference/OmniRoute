"use client";

import { useId } from "react";
import { ArrowRight, ArrowUpRight, Check, Cloud, Cpu, Info, Layers3, MapPin, Server, Database, ExternalLink, Globe2, KeyRound, PencilLine, CreditCard, LockKeyhole, Network, Plug, Sparkles, Terminal, Zap } from "lucide-react";
import { Badge } from "./badge";
import { BrandLoader } from "./brand-loader";
import { Button } from "./button";
import { Field } from "./field";
import { Input } from "./input";
import { Select } from "./select";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Checkbox } from "./checkbox";
import { resolveLabels } from "./lib/labels";
import type { ReactNode } from "react";

export interface CloudMachineOption {
  id: string; name: string; family: string; vcpus: number; memoryGb: number;
  diskGb: number; transferGb: number; regions: string[]; monthlyCents: number; recommended: boolean;
}
export interface CloudRegionOption { id: string; name: string; country: string; }
export interface CloudConfiguration { name: string; region: string; planId: string; overageCapCents: number; }
/** Price, rather than catalog order or a recommendation, determines the starting configuration. */
export function cheapestCloudPlan(plans: CloudMachineOption[], region?: string, family?: string) {
  return plans.filter(p => (!region || p.regions.includes(region)) && (!family || p.family === family))
    .reduce<CloudMachineOption | undefined>((lowest, plan) => !lowest || plan.monthlyCents < lowest.monthlyCents ? plan : lowest, undefined);
}
/** Prices are always USD; `locale` only changes how the amount is written. */
const money = (cents: number, locale: Intl.LocalesArgument = "en-US") => new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);

/** Interface text for CloudConfigurator. Plan, region and family names come from props. */
export interface CloudConfiguratorLabels {
  /** Product label above the heading, shown when `showEyebrow` is true. */
  eyebrow: string;
  beta: string;
  title: string;
  description: string;
  /** Accessible name of the configuration section. */
  editor: string;
  name: string;
  nameHint: string;
  /** Instance name placeholder; the `namePlaceholder` prop takes precedence. */
  namePlaceholder: string;
  region: string;
  regionHelp: string;
  regionLoading: string;
  regionPlaceholder: string;
  family: string;
  familyHelp: string;
  configuration: string;
  configurationHelp: string;
  configurationPlaceholder: string;
  /** Description of a configuration option; `price` is already formatted with `locale`. */
  planDescription: (price: string, recommended: boolean) => string;
  vcpu: string;
  memory: string;
  disk: string;
  transfer: string;
  /** Memory and disk size; `value` is the number of gigabytes. */
  gigabytes: (value: string) => string;
  /** Included transfer; `value` is formatted with `locale`. */
  terabytes: (value: string) => string;
  /** Summary of the collapsed spending-limit section. */
  spendingLimit: string;
  /** Heading of the spending-limit help popover. */
  spendingLimitHelpTitle: string;
  spendingLimitHelp: string;
  /** Visible text beside the spending-limit help button. */
  spendingLimitHelpCaption: string;
  overageCap: string;
  overageCapHint: string;
  /** Accessible name of the price summary. */
  summary: string;
  monthlyHosting: string;
  /** Text after the monthly price. */
  perMonth: string;
  inclusions: readonly string[];
  inferenceNoteTitle: string;
  inferenceNote: string;
  unavailable: string;
  continue: string;
  /** Continue button text while `busy`. */
  preparingQuote: string;
  finePrint: string;
  selfHost: string;
  /** Accessible name of each field help button. */
  fieldHelp: (label: string) => string;
}
export const defaultCloudConfiguratorLabels: CloudConfiguratorLabels = {
  eyebrow: "OMNIROUTE CLOUD",
  beta: "BETA",
  title: "Configure your gateway",
  description: "Choose a name, region, and resources. Connect your inference providers after setup.",
  editor: "Configure your instance",
  name: "Instance name",
  nameHint: "Shown in your dashboard. You can rename it later.",
  namePlaceholder: "e.g. Studio gateway",
  region: "Region",
  regionHelp: "Your gateway runs in this location. Choose somewhere close to the apps that send requests. Your chosen model providers may process data in other locations.",
  regionLoading: "Loading regions…",
  regionPlaceholder: "Choose a region",
  family: "Machine family",
  familyHelp: "Basic shares CPU time with other workloads. Premium families use different processors or storage. CPU-optimized configurations provide dedicated CPU capacity. This hosts your gateway; it does not run the AI models.",
  configuration: "Configuration",
  configurationHelp: "vCPU is processing capacity, RAM is working memory, and SSD is storage for your gateway. Start small and choose more resources for larger teams or heavier gateway traffic.",
  configurationPlaceholder: "Choose resources",
  planDescription: (price, recommended) => `${price}/month${recommended ? " · Recommended" : ""}`,
  vcpu: "vCPU",
  memory: "RAM",
  disk: "SSD",
  transfer: "transfer",
  gigabytes: (value) => `${value} GB`,
  terabytes: (value) => `${value} TB`,
  spendingLimit: "Bandwidth spending limit",
  spendingLimitHelpTitle: "Transfer and spending limits",
  spendingLimitHelp: "Transfer is data your gateway sends out. The plan includes a monthly allowance. This cap limits additional transfer fees, separate from your hosting price and inference charges. At the cap, inference traffic pauses until the allowance resets or the cap increases.",
  spendingLimitHelpCaption: "How this limit works",
  overageCap: "Maximum monthly overage (USD)",
  overageCapHint: "Extra transfer is $0.0125/GB. At your limit, inference traffic pauses; your dashboard stays available.",
  summary: "Hosting summary",
  monthlyHosting: "Monthly hosting",
  perMonth: "/ month",
  inclusions: ["Dedicated OmniRoute instance", "Managed HTTPS, updates, and monitoring", "Daily backups with recovery"],
  inferenceNoteTitle: "Inference is billed separately.",
  inferenceNote: "Connect Cheaper Inference or bring your own provider keys after setup.",
  unavailable: "Cloud setup is not available yet. Your self-hosted OmniRoute remains free to use.",
  continue: "Review hosting",
  preparingQuote: "Preparing your quote…",
  finePrint: "No payment until you confirm at checkout.",
  selfHost: "Self-hosting instructions",
  fieldHelp: (label) => `About ${label}`,
};

/** Shared Cloud configuration pattern; fetching, quoting, payment and routing belong to the app. */
export interface CloudConfiguratorProps {
  value: CloudConfiguration; onChange: (value: CloudConfiguration) => void;
  plans: CloudMachineOption[]; regions: CloudRegionOption[];
  onContinue: () => void; busy?: boolean; loading?: boolean; error?: string | null;
  unavailable?: boolean; disabled?: boolean; selfHostHref: string;
  /** Takes precedence over `labels.namePlaceholder`. */
  namePlaceholder?: string;
  /** Omit when a surrounding shell already supplies the Cloud product breadcrumb. */
  showEyebrow?: boolean;
  /** Localized interface text; omitted or `undefined` keys fall back to defaultCloudConfiguratorLabels. */
  labels?: Partial<CloudConfiguratorLabels>;
  /** Formats prices, transfer and country names (default "en-US"). Prices stay in USD. */
  locale?: Intl.LocalesArgument;
}

/** Interface text for CloudFieldHelp. The heading and explanation come from props. */
export interface CloudFieldHelpLabels {
  /** Accessible name of the help button. */
  trigger: (label: string) => string;
}
export const defaultCloudFieldHelpLabels: CloudFieldHelpLabels = {
  trigger: (label) => `About ${label}`,
};
export interface CloudFieldHelpProps {
  /** Field name; it heads the popover and names the dialog. */
  label: string;
  children: ReactNode;
  /** Localized interface text; omitted or `undefined` keys fall back to defaultCloudFieldHelpLabels. */
  labels?: Partial<CloudFieldHelpLabels>;
}
/** Clickable help works with touch and keyboard as well as a pointer. */
export function CloudFieldHelp({ label, children, labels: labelOverrides }: CloudFieldHelpProps) {
  const labels = resolveLabels(defaultCloudFieldHelpLabels, labelOverrides);
  const headingId = useId();
  return <Popover><PopoverTrigger asChild><button type="button" className="ci-cloud-help" aria-label={labels.trigger(label)}><Info size={14} aria-hidden="true" /></button></PopoverTrigger><PopoverContent className="ci-cloud-help__content" side="top" align="start" aria-labelledby={headingId}><strong id={headingId}>{label}</strong><p>{children}</p></PopoverContent></Popover>;
}
function FamilyIcon({ family }: { family: string }) {
  const Icon = /cpu/i.test(family) ? Cpu : /memory/i.test(family) ? Database : /storage/i.test(family) ? Network : /intel|amd/i.test(family) ? Cpu : Layers3;
  return <Icon size={16} aria-hidden="true" />;
}
export interface CloudHostingConsentValue { acceptedTerms: boolean; immediateStart: boolean; }
/** Interface text for CloudHostingConsent. The document links come from props. */
export interface CloudHostingConsentLabels {
  termsLink: string;
  privacyLink: string;
  /** Renewal and terms confirmation. Place both links where the sentence needs them. */
  terms: (termsLink: ReactNode, privacyLink: ReactNode) => ReactNode;
  immediateStart: string;
}
export const defaultCloudHostingConsentLabels: CloudHostingConsentLabels = {
  termsLink: "Hosting Terms",
  privacyLink: "Privacy Policy",
  terms: (termsLink, privacyLink) => <>I agree to the {termsLink} and acknowledge the {privacyLink}. I authorize monthly hosting renewal and the transfer charges shown above until I cancel.</>,
  immediateStart: "I request hosting to start after payment, including during any withdrawal period. If I withdraw, I may owe a proportionate charge for service provided. My statutory rights remain unchanged.",
};
export interface CloudHostingConsentProps {
  value: CloudHostingConsentValue; onChange: (value: CloudHostingConsentValue) => void;
  termsHref: string; privacyHref: string; disabled?: boolean;
  /** Localized interface text; omitted or `undefined` keys fall back to defaultCloudHostingConsentLabels. */
  labels?: Partial<CloudHostingConsentLabels>;
}
export function CloudHostingConsent({ value, onChange, termsHref, privacyHref, disabled, labels: labelOverrides }: CloudHostingConsentProps) {
  const labels = resolveLabels(defaultCloudHostingConsentLabels, labelOverrides);
  const termsLink = <a href={termsHref} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{labels.termsLink}</a>;
  const privacyLink = <a href={privacyHref} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{labels.privacyLink}</a>;
  return <div className="ci-cloud-consent">
    <Checkbox checked={value.acceptedTerms} disabled={disabled} onCheckedChange={checked => onChange({ ...value, acceptedTerms: checked === true })} label={<span>{labels.terms(termsLink, privacyLink)}</span>} />
    <Checkbox checked={value.immediateStart} disabled={disabled} onCheckedChange={checked => onChange({ ...value, immediateStart: checked === true })} label={<span>{labels.immediateStart}</span>} />
  </div>;
}

/** Interface text for CloudTopology. Product names stay fixed. */
export interface CloudTopologyLabels {
  /** Gateway name when the `name` prop is omitted or empty. */
  name: string;
  /** Accessible name of the diagram. */
  description: string;
  source: string;
  online: string;
  offline: string;
  providers: string;
  caption: string;
}
export const defaultCloudTopologyLabels: CloudTopologyLabels = {
  name: "Your AI gateway",
  description: "Your tools connect to your gateway, then your chosen providers",
  source: "Your apps & tools",
  online: "Online & ready",
  offline: "A dedicated home for your AI",
  providers: "Your providers",
  caption: "ONE ENDPOINT. YOUR CHOICE OF PROVIDERS.",
};
export interface CloudTopologyProps {
  /** Takes precedence over `labels.name`. */
  name?: string;
  connected?: boolean;
  /** Localized interface text; omitted or `undefined` keys fall back to defaultCloudTopologyLabels. */
  labels?: Partial<CloudTopologyLabels>;
}
export function CloudTopology({ name, connected = false, labels: labelOverrides }: CloudTopologyProps) {
  const labels = resolveLabels(defaultCloudTopologyLabels, labelOverrides);
  return <div className="ci-cloud-topology" aria-label={labels.description} role="img">
    <div className="ci-cloud-topology__grid" />
    <div className="ci-cloud-topology__orbit ci-cloud-topology__orbit--one" /><div className="ci-cloud-topology__orbit ci-cloud-topology__orbit--two" />
    <div className="ci-cloud-topology__source"><Terminal size={17} /><span>{labels.source}</span></div>
    <div className="ci-cloud-topology__wire ci-cloud-topology__wire--in" />
    <div className="ci-cloud-topology__gateway"><Cloud size={29} strokeWidth={1.25} /><strong>{name || labels.name}</strong><span><i />{connected ? labels.online : labels.offline}</span></div>
    <div className="ci-cloud-topology__wire ci-cloud-topology__wire--out" />
    <div className="ci-cloud-topology__targets"><span><Sparkles size={15} />Cheaper Inference</span><span><KeyRound size={15} />{labels.providers}</span></div>
    <div className="ci-cloud-topology__caption"><LockKeyhole size={11} /> {labels.caption}</div>
  </div>;
}
export function CloudConfigurator({ value, onChange, plans, regions, onContinue, busy, loading, error, unavailable, disabled, selfHostHref, namePlaceholder, showEyebrow = true, labels: labelOverrides, locale = "en-US" }: CloudConfiguratorProps) {
  const labels = resolveLabels(defaultCloudConfiguratorLabels, labelOverrides);
  const id = useId();
  const available = plans.filter(p => p.regions.includes(value.region));
  const selected = available.find(p => p.id === value.planId);
  const families = [...new Set(available.map(p => p.family))];
  const family = selected?.family || families[0] || "Basic";
  const change = (patch: Partial<CloudConfiguration>) => onChange({ ...value, ...patch });
  const selectRegion = (region: string) => {
    const options = plans.filter(p => p.regions.includes(region));
    change({ region, planId: options.some(p => p.id === value.planId) ? value.planId : cheapestCloudPlan(options)?.id || "" });
  };
  const countries = regions.length ? new Intl.DisplayNames(locale, { type: "region" }) : undefined;
  const help = { trigger: labels.fieldHelp };
  return <div className="ci-cloud-configurator">
    <div className="ci-cloud-heading" data-compact={!showEyebrow || undefined}>{showEyebrow && <div className="ci-cloud-eyebrow"><Cloud size={14} /> {labels.eyebrow} <Badge variant="outline">{labels.beta}</Badge></div>}
      <h1>{labels.title}</h1>
      <p>{labels.description}</p>
    </div>
    <div className="ci-cloud-layout">
      <section className="ci-cloud-editor" aria-label={labels.editor}>
        <Field label={labels.name} htmlFor={`${id}-name`} hint={labels.nameHint}><Input id={`${id}-name`} autoComplete="off" maxLength={100} placeholder={namePlaceholder ?? labels.namePlaceholder} value={value.name} onChange={e => change({ name: e.target.value })} disabled={disabled || busy} /></Field>
        <div className="ci-cloud-divider" />
        <Field label={labels.region} labelAside={<CloudFieldHelp label={labels.region} labels={help}>{labels.regionHelp}</CloudFieldHelp>} htmlFor={`${id}-region`}><Select id={`${id}-region`} aria-label={labels.region} value={value.region} onValueChange={selectRegion} disabled={disabled || busy || loading || unavailable} leadingIcon={<Globe2 size={16} />} placeholder={loading ? labels.regionLoading : labels.regionPlaceholder} options={regions.map(r => ({ value: r.id, label: r.name, icon: <MapPin size={16} aria-hidden="true" />, description: countries?.of(r.country) || r.country }))} /></Field>
        <div className="ci-cloud-divider" />
        <div className="ci-cloud-fields"><Field label={labels.family} labelAside={<CloudFieldHelp label={labels.family} labels={help}>{labels.familyHelp}</CloudFieldHelp>} htmlFor={`${id}-family`}><Select id={`${id}-family`} aria-label={labels.family} leadingIcon={<FamilyIcon family={family} />} value={family} disabled={disabled || busy || !available.length} onValueChange={f => change({ planId: cheapestCloudPlan(available, value.region, f)?.id || "" })} options={families.map(f => ({ value: f, label: f, icon: <FamilyIcon family={f} /> }))} /></Field>
        <Field label={labels.configuration} labelAside={<CloudFieldHelp label={labels.configuration} labels={help}>{labels.configurationHelp}</CloudFieldHelp>} htmlFor={`${id}-size`}><Select id={`${id}-size`} aria-label={labels.configuration} leadingIcon={<Server size={16} />} value={selected?.id || ""} disabled={disabled || busy || !available.length} onValueChange={planId => change({ planId })} placeholder={labels.configurationPlaceholder} options={available.filter(p => p.family === family).map(p => ({ value: p.id, label: p.name, icon: <Server size={16} aria-hidden="true" />, description: labels.planDescription(money(p.monthlyCents, locale), p.recommended) }))} /></Field></div>
        {selected && <div className="ci-cloud-specs"><span><Cpu size={16} /><strong>{selected.vcpus}</strong> {labels.vcpu}</span><span><Database size={16} /><strong>{labels.gigabytes(String(selected.memoryGb))}</strong> {labels.memory}</span><span><Network size={16} /><strong>{labels.gigabytes(String(selected.diskGb))}</strong> {labels.disk}</span><span><Zap size={16} /><strong>{labels.terabytes((selected.transferGb / 1000).toLocaleString(locale))}</strong> {labels.transfer}</span></div>}
        <details className="ci-cloud-advanced"><summary>{labels.spendingLimit}</summary><div className="ci-cloud-advanced__help"><CloudFieldHelp label={labels.spendingLimitHelpTitle} labels={help}>{labels.spendingLimitHelp}</CloudFieldHelp><span>{labels.spendingLimitHelpCaption}</span></div><Field label={labels.overageCap} htmlFor={`${id}-cap`} hint={labels.overageCapHint}><Input id={`${id}-cap`} type="number" min={0} max={1000} step={1} value={value.overageCapCents / 100} onChange={e => change({ overageCapCents: Math.min(100000, Math.max(0, Math.round(Number(e.target.value) * 100))) })} disabled={disabled || busy} /></Field></details>
      </section>
      <aside className="ci-cloud-summary" aria-label={labels.summary}>
        <div className="ci-cloud-summary__body"><div className="ci-cloud-summary__title"><span>{labels.monthlyHosting}</span><Badge variant="outline">USD</Badge></div>
          <div className="ci-cloud-price">{selected ? money(selected.monthlyCents, locale) : "—"}<span>{labels.perMonth}</span></div>
          <ul className="ci-cloud-inclusions">{labels.inclusions.map(t => <li key={t}><Check size={15} />{t}</li>)}</ul>
          <div className="ci-cloud-inference-note"><Plug size={18} /><p><strong>{labels.inferenceNoteTitle}</strong><br />{labels.inferenceNote}</p></div>
          {error && <p className="ci-cloud-error" role="alert">{error}</p>}
          {unavailable && <p className="ci-cloud-error" role="status">{labels.unavailable}</p>}
          <Button className="ci-cloud-continue" onClick={onContinue} loading={busy} disabled={disabled || loading || unavailable || !selected || !value.name.trim()}><span>{busy ? labels.preparingQuote : labels.continue}</span>{!busy && <ArrowRight size={16} aria-hidden="true" />}</Button>
          <p className="ci-cloud-fineprint">{labels.finePrint}</p>
        </div>
      </aside>
    </div>
    <div className="ci-cloud-selfhost"><a href={selfHostHref} target="_blank" rel="noopener noreferrer"><Terminal size={14} />{labels.selfHost}<ExternalLink size={12} /></a></div>
  </div>;
}

export type CloudSetupStage = "queued" | "starting" | "configuring" | "verifying";
/** Interface text for CloudInstancePanel. Instance name, hostname, region and resources come from props. */
export interface CloudInstancePanelLabels {
  /** Product label above the name, shown unless `showEyebrow` is false. */
  eyebrow: string;
  /** Badge text for a `status`; the default covers the documented statuses and falls back to "Updating". */
  status: (status: string) => string;
  /** Heading while provisioning. */
  setupHeading: (stage: CloudSetupStage) => string;
  /** Description while provisioning. */
  setupDescription: (stage: CloudSetupStage) => string;
  readyHeading: string;
  readyDescription: string;
  awaitingPaymentDescription: string;
  /** Description for every other status; the heading is the status text. */
  otherDescription: string;
  /** Accessible name of the main section. */
  main: string;
  instanceUrl: string;
  /** Accessible name of the instance link. */
  instanceLink: (url: string) => string;
  instanceUrlPending: string;
  region: string;
  resources: string;
  completePayment: string;
  open: string;
  rename: string;
  /** Accessible name of the side column. */
  aside: string;
  /** Accessible name of the provider connection section. */
  connection: string;
  connectedBadge: string;
  connectionErrorBadge: string;
  connectingBadge: string;
  optionalBadge: string;
  connectedTitle: string;
  connectTitle: string;
  connectedDescription: string;
  connectDescription: string;
  connectingProgress: string;
  disconnect: string;
  connecting: string;
  retryConnection: string;
  connect: string;
  /** Prefix before `connectionBilling` until the gateway is online. Keep the trailing space. */
  connectionUnavailable: string;
  connectionBilling: string;
  providersTitle: string;
  providersDescription: string;
  configureProviders: string;
  /** Accessible name of the billing section. */
  hosting: string;
  monthlyHosting: string;
  /** Text after the monthly price. */
  perMonth: string;
  /** Shown when `cancelAtPeriodEnd`; `date` is formatted with `locale`, or null without a valid `periodEnd`. */
  hostingEnds: (date: string | null) => string;
  /** `date` is formatted with `locale`. */
  nextRenewal: (date: string) => string;
  monthlySubscription: string;
  manageBilling: string;
  billingOwner: string;
}
const cloudInstanceStatuses: Record<string, string> = { ready: "Online", awaiting_payment: "Awaiting payment", provisioning: "Setting up", past_due: "Payment needs attention", suspended: "Service paused", deleting: "Ending service", failed: "Setup needs attention", terminated: "Service ended", unhealthy: "Checking gateway health" };
const cloudSetupStages: Record<CloudSetupStage, { heading: string; description: string }> = { queued: { heading: "Setup queued", description: "Your hosting order is confirmed. Setup will begin shortly." }, starting: { heading: "Starting your gateway", description: "We’re allocating your resources and starting your instance." }, configuring: { heading: "Preparing your gateway", description: "We’re configuring OmniRoute and your secure connection." }, verifying: { heading: "Checking your secure endpoint", description: "OmniRoute is running. We’re checking HTTPS before opening access." } };
export const defaultCloudInstancePanelLabels: CloudInstancePanelLabels = {
  eyebrow: "OMNIROUTE CLOUD",
  status: (status) => cloudInstanceStatuses[status] || "Updating",
  setupHeading: (stage) => cloudSetupStages[stage].heading,
  setupDescription: (stage) => `${cloudSetupStages[stage].description} You can leave this page; setup continues.`,
  readyHeading: "Your gateway is online",
  readyDescription: "Open OmniRoute to manage your providers, API keys, and routing.",
  awaitingPaymentDescription: "Complete payment to start setting up your gateway.",
  otherDescription: "Your instance details and billing remain available below.",
  main: "Your gateway",
  instanceUrl: "Instance URL",
  instanceLink: (url) => `${url} (opens in a new tab)`,
  instanceUrlPending: "Available once your gateway is online",
  region: "Region",
  resources: "Resources",
  completePayment: "Complete payment",
  open: "Open OmniRoute",
  rename: "Rename instance",
  aside: "Providers and billing",
  connection: "Inference providers",
  connectedBadge: "CONNECTED",
  connectionErrorBadge: "NEEDS ATTENTION",
  connectingBadge: "CONNECTING",
  optionalBadge: "OPTIONAL",
  connectedTitle: "Cheaper Inference connected",
  connectTitle: "Connect inference",
  connectedDescription: "Your workspace’s balance, model access, and spending rules are connected.",
  connectDescription: "Use your Cheaper Inference balance and model access. No provider keys to copy.",
  connectingProgress: "Confirming your gateway’s connection…",
  disconnect: "Disconnect Cheaper Inference",
  connecting: "Connecting your account…",
  retryConnection: "Retry connection",
  connect: "Connect Cheaper Inference",
  connectionUnavailable: "Available when your gateway is online. ",
  connectionBilling: "Inference is billed separately from hosting.",
  providersTitle: "Your providers",
  providersDescription: "Add API keys, subscriptions, or OAuth accounts in OmniRoute.",
  configureProviders: "Configure providers",
  hosting: "Hosting billing",
  monthlyHosting: "Monthly hosting",
  perMonth: "/ month",
  hostingEnds: (date) => `Hosting ends ${date || "at the end of your paid period"}.`,
  nextRenewal: (date) => `Next renewal ${date}.`,
  monthlySubscription: "Monthly subscription. Inference billed separately.",
  manageBilling: "Manage billing",
  billingOwner: "Your workspace’s billing owner manages this subscription.",
};

export interface CloudInstancePanelProps {
  name: string; hostname: string; region: string; configuration: string; monthlyCents: number;
  status: string; connected: boolean; connecting?: boolean; canManage: boolean; canBill: boolean; cancelAtPeriodEnd?: boolean;
  connectionError?: string | null;
  setupStage?: CloudSetupStage;
  showEyebrow?: boolean;
  periodEnd?: string | null; busy?: boolean; pendingAction?: string | null; error?: string | null; message?: string | null;
  onOpen: () => void; onConnect: () => void; onDisconnect: () => void; onRename: () => void;
  onBilling?: () => void; onCancel?: () => void; onResume?: () => void; onCheckout: () => void;
  /** Localized interface text; omitted or `undefined` keys fall back to defaultCloudInstancePanelLabels. */
  labels?: Partial<CloudInstancePanelLabels>;
  /** Formats the price and renewal date (default "en-US"). Prices stay in USD. */
  locale?: Intl.LocalesArgument;
}
function billingDate(value?: string | null, locale: Intl.LocalesArgument = "en-US") {
  return value && Number.isFinite(Date.parse(value))
    ? new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value))
    : null;
}
export function CloudInstancePanel(p: CloudInstancePanelProps) {
  const labels = resolveLabels(defaultCloudInstancePanelLabels, p.labels);
  const locale = p.locale ?? "en-US";
  const ready = p.status === "ready" || p.status === "past_due";
  const pending = p.status === "awaiting_payment";
  const provisioning = p.status === "provisioning";
  const connecting = !p.connected && !p.connectionError && p.connecting;
  const connectionBusy = connecting || p.pendingAction === "connect" || p.pendingAction === "disconnect";
  const status = labels.status(p.status);
  const stage = p.setupStage || "configuring";
  const heading = provisioning ? labels.setupHeading(stage) : ready ? labels.readyHeading : status;
  const description = provisioning ? labels.setupDescription(stage)
    : ready ? labels.readyDescription
    : pending ? labels.awaitingPaymentDescription
    : labels.otherDescription;
  const renewal = billingDate(p.periodEnd, locale);
  const instanceUrl = `https://${p.hostname}`;
  return <div className="ci-cloud-instance" data-status={p.status}>
    <div className="ci-cloud-instance__header"><div>{p.showEyebrow !== false && <div className="ci-cloud-eyebrow"><Cloud size={14} aria-hidden="true" /> {labels.eyebrow}</div>}<h1>{p.name}</h1></div><Badge variant={p.status === "ready" ? "live" : "outline"}>{status}</Badge></div>
    <div className="ci-cloud-layout">
      <section className="ci-cloud-instance__main" aria-label={labels.main}>
        <div className="ci-cloud-instance__state" data-provisioning={provisioning || undefined}>
          {provisioning ? <BrandLoader variant="orbit" size={150} label={heading} aria-hidden="true" className="ci-cloud-instance__loader" /> : <div className="ci-cloud-instance__state-icon">{ready ? <Cloud size={25} aria-hidden="true" /> : <Server size={25} aria-hidden="true" />}</div>}
          <div role="status" aria-live="polite"><h2>{heading}</h2><p>{description}</p></div>
        </div>
        <div className="ci-cloud-instance__details">
          <div className="ci-cloud-instance__endpoint"><span><Globe2 size={14} aria-hidden="true" />{labels.instanceUrl}</span>{ready ? <a className="ci-cloud-instance__link" href={instanceUrl} target="_blank" rel="noopener noreferrer" aria-label={labels.instanceLink(instanceUrl)}>{instanceUrl}<ArrowUpRight size={14} aria-hidden="true" /></a> : <code>{instanceUrl}</code>}{!ready && <small>{labels.instanceUrlPending}</small>}</div>
          <div><span><MapPin size={14} aria-hidden="true" />{labels.region}</span><strong>{p.region}</strong></div>
          <div><span><Cpu size={14} aria-hidden="true" />{labels.resources}</span><strong>{p.configuration}</strong></div>
        </div>
        <div className="ci-cloud-instance__actions">
          <Button className="ci-cloud-instance__open" onClick={pending ? p.onCheckout : p.onOpen} disabled={p.busy || (pending ? !p.canBill : !p.canManage || !ready)}>{pending ? labels.completePayment : labels.open}<ArrowRight size={15} aria-hidden="true" /></Button>
          {p.canManage && <Button variant="outline" onClick={p.onRename} disabled={p.busy}><PencilLine size={14} aria-hidden="true" />{labels.rename}</Button>}
        </div>
      </section>
      <aside className="ci-cloud-instance__aside" aria-label={labels.aside}>
        <section className="ci-cloud-connection" aria-label={labels.connection}>
          <div className="ci-cloud-connection__heading"><div className="ci-cloud-connection__icon"><Sparkles size={20} aria-hidden="true" /></div><Badge variant="outline">{p.connected ? labels.connectedBadge : p.connectionError ? labels.connectionErrorBadge : connecting ? labels.connectingBadge : labels.optionalBadge}</Badge></div>
          <h2>{p.connected ? labels.connectedTitle : labels.connectTitle}</h2>
          <p>{p.connected ? labels.connectedDescription : labels.connectDescription}</p>
          {connecting && <div className="ci-cloud-connection__progress" role="status"><BrandLoader variant="orbit" size={64} aria-hidden="true" /><span>{labels.connectingProgress}</span></div>}
          {p.connectionError && <p className="ci-cloud-connection__error" role="alert">{p.connectionError}</p>}
          <Button className="ci-cloud-connection__button" variant={p.connected ? "outline" : "default"} onClick={p.connected ? p.onDisconnect : p.onConnect} disabled={!ready || !p.canManage || p.busy || connecting} loading={!!connectionBusy && !connecting}>{p.connected ? labels.disconnect : connecting ? labels.connecting : p.connectionError ? labels.retryConnection : labels.connect}{!p.connected && !connectionBusy && <ArrowRight size={15} aria-hidden="true" />}</Button>
          <small>{!ready ? labels.connectionUnavailable : ""}{labels.connectionBilling}</small>
          <div className="ci-cloud-byok"><KeyRound size={18} aria-hidden="true" /><div><h3>{labels.providersTitle}</h3><p>{labels.providersDescription}</p><Button variant="link" onClick={p.onOpen} disabled={!ready || !p.canManage || p.busy}>{labels.configureProviders}<ArrowRight size={14} aria-hidden="true" /></Button></div></div>
        </section>
        <section className="ci-cloud-hosting" aria-label={labels.hosting}>
          <div className="ci-cloud-hosting-bill"><span>{labels.monthlyHosting}</span><strong>{money(p.monthlyCents, locale)}<small>{labels.perMonth}</small></strong></div>
          <p>{p.cancelAtPeriodEnd ? labels.hostingEnds(renewal) : renewal ? labels.nextRenewal(renewal) : labels.monthlySubscription}</p>
          {p.canBill && p.onBilling ? <Button className="ci-cloud-hosting__button" variant="outline" onClick={p.onBilling} disabled={p.busy} loading={p.pendingAction === "portal"}><CreditCard size={15} aria-hidden="true" />{labels.manageBilling}<ArrowRight size={14} aria-hidden="true" /></Button> : !p.canBill && <small>{labels.billingOwner}</small>}
        </section>
      </aside>
    </div>
    {p.message && <p className="ci-cloud-notice">{p.message}</p>}{p.error && <p role="alert" className="ci-cloud-error">{p.error}</p>}
  </div>;
}

/** Interface text for CloudBillingDetails. */
export interface CloudBillingDetailsLabels {
  product: string;
  /** Text after the monthly price. */
  perMonth: string;
  /** Shown when `cancelAtPeriodEnd`; `date` is formatted with `locale`, or null without a valid `periodEnd`. */
  ends: (date: string | null) => string;
  /** `date` is formatted with `locale`. */
  renews: (date: string) => string;
  renewsAfterPayment: string;
  /** `terabytes` is formatted with `locale`. */
  included: (terabytes: string) => string;
  completePayment: string;
  portal: string;
  cancellationScheduled: string;
  subscription: string;
  cancellationScheduledDescription: string;
  subscriptionDescription: string;
  keepHosting: string;
  cancelHosting: string;
}
export const defaultCloudBillingDetailsLabels: CloudBillingDetailsLabels = {
  product: "OmniRoute Cloud",
  perMonth: "/ month",
  ends: (date) => `Ends ${date || "at the end of your paid period"}.`,
  renews: (date) => `Renews ${date}.`,
  renewsAfterPayment: "Renews monthly after payment.",
  included: (terabytes) => `Includes ${terabytes} TB transfer. Inference is billed separately to your provider or Cheaper Inference wallet.`,
  completePayment: "Complete payment",
  portal: "Payment methods and invoices",
  cancellationScheduled: "Cancellation scheduled",
  subscription: "Subscription",
  cancellationScheduledDescription: "Keep hosting to continue your subscription.",
  subscriptionDescription: "If you cancel, your gateway stays online until the paid period ends.",
  keepHosting: "Keep hosting",
  cancelHosting: "Cancel hosting",
};
export interface CloudBillingDetailsProps {
  monthlyCents: number; transferGb: number; periodEnd?: string | null;
  cancelAtPeriodEnd?: boolean; awaitingPayment?: boolean; busy?: boolean; pendingAction?: string | null;
  onPortal: () => void; onCancel: () => void; onResume: () => void; onCheckout: () => void;
  /** Native dashboard management uses an arrow rather than an external-link icon. */
  portalExternal?: boolean;
  /** Localized interface text; omitted or `undefined` keys fall back to defaultCloudBillingDetailsLabels. */
  labels?: Partial<CloudBillingDetailsLabels>;
  /** Formats the price, transfer and renewal date (default "en-US"). Prices stay in USD. */
  locale?: Intl.LocalesArgument;
}
export function CloudBillingDetails(p: CloudBillingDetailsProps) {
  const labels = resolveLabels(defaultCloudBillingDetailsLabels, p.labels);
  const locale = p.locale ?? "en-US";
  const period = billingDate(p.periodEnd, locale);
  return <div className="ci-cloud-billing">
    <div className="ci-cloud-billing__summary"><span>{labels.product}</span><strong>{money(p.monthlyCents, locale)}<small>{labels.perMonth}</small></strong><p>{p.cancelAtPeriodEnd ? labels.ends(period) : period ? labels.renews(period) : labels.renewsAfterPayment}</p></div>
    <p className="ci-cloud-billing__included">{labels.included((p.transferGb / 1000).toLocaleString(locale))}</p>
    <Button className="ci-cloud-billing__portal" onClick={p.awaitingPayment ? p.onCheckout : p.onPortal} disabled={p.busy} loading={p.pendingAction === "portal"}><CreditCard size={15} aria-hidden="true" />{p.awaitingPayment ? labels.completePayment : labels.portal}{p.portalExternal === true ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}</Button>
    {!p.awaitingPayment && <div className="ci-cloud-billing__subscription"><div><h3>{p.cancelAtPeriodEnd ? labels.cancellationScheduled : labels.subscription}</h3><p>{p.cancelAtPeriodEnd ? labels.cancellationScheduledDescription : labels.subscriptionDescription}</p></div><Button variant="outline" onClick={p.cancelAtPeriodEnd ? p.onResume : p.onCancel} disabled={p.busy} loading={p.pendingAction === "resume"}>{p.cancelAtPeriodEnd ? labels.keepHosting : labels.cancelHosting}</Button></div>}
  </div>;
}
