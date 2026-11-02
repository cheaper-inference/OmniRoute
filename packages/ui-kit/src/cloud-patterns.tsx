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
const money = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);

/** Shared Cloud configuration pattern; fetching, quoting, payment and routing belong to the app. */
export interface CloudConfiguratorProps {
  value: CloudConfiguration; onChange: (value: CloudConfiguration) => void;
  plans: CloudMachineOption[]; regions: CloudRegionOption[];
  onContinue: () => void; busy?: boolean; loading?: boolean; error?: string | null;
  unavailable?: boolean; disabled?: boolean; selfHostHref: string;
  namePlaceholder?: string;
  /** Omit when a surrounding shell already supplies the Cloud product breadcrumb. */
  showEyebrow?: boolean;
}
/** Clickable help works with touch and keyboard as well as a pointer. */
export function CloudFieldHelp({ label, children }: { label: string; children: ReactNode }) {
  return <Popover><PopoverTrigger asChild><button type="button" className="ci-cloud-help" aria-label={`About ${label}`}><Info size={14} aria-hidden="true" /></button></PopoverTrigger><PopoverContent className="ci-cloud-help__content" side="top" align="start"><strong>{label}</strong><p>{children}</p></PopoverContent></Popover>;
}
function FamilyIcon({ family }: { family: string }) {
  const Icon = /cpu/i.test(family) ? Cpu : /memory/i.test(family) ? Database : /storage/i.test(family) ? Network : /intel|amd/i.test(family) ? Cpu : Layers3;
  return <Icon size={16} aria-hidden="true" />;
}
export interface CloudHostingConsentValue { acceptedTerms: boolean; immediateStart: boolean; }
export function CloudHostingConsent({ value, onChange, termsHref, privacyHref, disabled }: { value: CloudHostingConsentValue; onChange: (value: CloudHostingConsentValue) => void; termsHref: string; privacyHref: string; disabled?: boolean }) {
  return <div className="ci-cloud-consent">
    <Checkbox checked={value.acceptedTerms} disabled={disabled} onCheckedChange={checked => onChange({ ...value, acceptedTerms: checked === true })} label={<span>I agree to the <a href={termsHref} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>Hosting Terms</a> and acknowledge the <a href={privacyHref} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>Privacy Policy</a>. I authorize monthly hosting renewal and the transfer charges shown above until I cancel.</span>} />
    <Checkbox checked={value.immediateStart} disabled={disabled} onCheckedChange={checked => onChange({ ...value, immediateStart: checked === true })} label={<span>I request hosting to start after payment, including during any withdrawal period. If I withdraw, I may owe a proportionate charge for service provided. My statutory rights remain unchanged.</span>} />
  </div>;
}
export function CloudTopology({ name = "Your AI gateway", connected = false }: { name?: string; connected?: boolean }) {
  return <div className="ci-cloud-topology" aria-label="Your tools connect to your gateway, then your chosen providers" role="img">
    <div className="ci-cloud-topology__grid" />
    <div className="ci-cloud-topology__orbit ci-cloud-topology__orbit--one" /><div className="ci-cloud-topology__orbit ci-cloud-topology__orbit--two" />
    <div className="ci-cloud-topology__source"><Terminal size={17} /><span>Your apps & tools</span></div>
    <div className="ci-cloud-topology__wire ci-cloud-topology__wire--in" />
    <div className="ci-cloud-topology__gateway"><Cloud size={29} strokeWidth={1.25} /><strong>{name || "Your AI gateway"}</strong><span><i />{connected ? "Online & ready" : "A dedicated home for your AI"}</span></div>
    <div className="ci-cloud-topology__wire ci-cloud-topology__wire--out" />
    <div className="ci-cloud-topology__targets"><span><Sparkles size={15} />Cheaper Inference</span><span><KeyRound size={15} />Your providers</span></div>
    <div className="ci-cloud-topology__caption"><LockKeyhole size={11} /> ONE ENDPOINT. YOUR CHOICE OF PROVIDERS.</div>
  </div>;
}
export function CloudConfigurator({ value, onChange, plans, regions, onContinue, busy, loading, error, unavailable, disabled, selfHostHref, namePlaceholder = "e.g. Studio gateway", showEyebrow = true }: CloudConfiguratorProps) {
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
  return <div className="ci-cloud-configurator">
    <div className="ci-cloud-heading" data-compact={!showEyebrow || undefined}>{showEyebrow && <div className="ci-cloud-eyebrow"><Cloud size={14} /> OMNIROUTE CLOUD <Badge variant="outline">BETA</Badge></div>}
      <h1>Configure your gateway</h1>
      <p>Choose a name, region, and resources. Connect your inference providers after setup.</p>
    </div>
    <div className="ci-cloud-layout">
      <section className="ci-cloud-editor" aria-label="Configure your instance">
        <Field label="Instance name" htmlFor={`${id}-name`} hint="Shown in your dashboard. You can rename it later."><Input id={`${id}-name`} autoComplete="off" maxLength={100} placeholder={namePlaceholder} value={value.name} onChange={e => change({ name: e.target.value })} disabled={disabled || busy} /></Field>
        <div className="ci-cloud-divider" />
        <Field label="Region" labelAside={<CloudFieldHelp label="Region">Your gateway runs in this location. Choose somewhere close to the apps that send requests. Your chosen model providers may process data in other locations.</CloudFieldHelp>} htmlFor={`${id}-region`}><Select id={`${id}-region`} aria-label="Region" value={value.region} onValueChange={selectRegion} disabled={disabled || busy || loading || unavailable} leadingIcon={<Globe2 size={16} />} placeholder={loading ? "Loading regions…" : "Choose a region"} options={regions.map(r => ({ value: r.id, label: r.name, icon: <MapPin size={16} aria-hidden="true" />, description: new Intl.DisplayNames(["en"], { type: "region" }).of(r.country) || r.country }))} /></Field>
        <div className="ci-cloud-divider" />
        <div className="ci-cloud-fields"><Field label="Machine family" labelAside={<CloudFieldHelp label="Machine family">Basic shares CPU time with other workloads. Premium families use different processors or storage. CPU-optimized configurations provide dedicated CPU capacity. This hosts your gateway; it does not run the AI models.</CloudFieldHelp>} htmlFor={`${id}-family`}><Select id={`${id}-family`} aria-label="Machine family" leadingIcon={<FamilyIcon family={family} />} value={family} disabled={disabled || busy || !available.length} onValueChange={f => change({ planId: cheapestCloudPlan(available, value.region, f)?.id || "" })} options={families.map(f => ({ value: f, label: f, icon: <FamilyIcon family={f} /> }))} /></Field>
        <Field label="Configuration" labelAside={<CloudFieldHelp label="Configuration">vCPU is processing capacity, RAM is working memory, and SSD is storage for your gateway. Start small and choose more resources for larger teams or heavier gateway traffic.</CloudFieldHelp>} htmlFor={`${id}-size`}><Select id={`${id}-size`} aria-label="Configuration" leadingIcon={<Server size={16} />} value={selected?.id || ""} disabled={disabled || busy || !available.length} onValueChange={planId => change({ planId })} placeholder="Choose resources" options={available.filter(p => p.family === family).map(p => ({ value: p.id, label: p.name, icon: <Server size={16} aria-hidden="true" />, description: `${money(p.monthlyCents)}/month${p.recommended ? " · Recommended" : ""}` }))} /></Field></div>
        {selected && <div className="ci-cloud-specs"><span><Cpu size={16} /><strong>{selected.vcpus}</strong> vCPU</span><span><Database size={16} /><strong>{selected.memoryGb} GB</strong> RAM</span><span><Network size={16} /><strong>{selected.diskGb} GB</strong> SSD</span><span><Zap size={16} /><strong>{(selected.transferGb / 1000).toLocaleString()} TB</strong> transfer</span></div>}
        <details className="ci-cloud-advanced"><summary>Bandwidth spending limit</summary><div className="ci-cloud-advanced__help"><CloudFieldHelp label="Transfer and spending limits">Transfer is data your gateway sends out. The plan includes a monthly allowance. This cap limits additional transfer fees, separate from your hosting price and inference charges. At the cap, inference traffic pauses until the allowance resets or the cap increases.</CloudFieldHelp><span>How this limit works</span></div><Field label="Maximum monthly overage (USD)" htmlFor={`${id}-cap`} hint="Extra transfer is $0.0125/GB. At your limit, inference traffic pauses; your dashboard stays available."><Input id={`${id}-cap`} type="number" min={0} max={1000} step={1} value={value.overageCapCents / 100} onChange={e => change({ overageCapCents: Math.min(100000, Math.max(0, Math.round(Number(e.target.value) * 100))) })} disabled={disabled || busy} /></Field></details>
      </section>
      <aside className="ci-cloud-summary" aria-label="Hosting summary">
        <div className="ci-cloud-summary__body"><div className="ci-cloud-summary__title"><span>Monthly hosting</span><Badge variant="outline">USD</Badge></div>
          <div className="ci-cloud-price">{selected ? money(selected.monthlyCents) : "—"}<span>/ month</span></div>
          <ul className="ci-cloud-inclusions">{["Dedicated OmniRoute instance", "Managed HTTPS, updates, and monitoring", "Daily backups with recovery"].map(t => <li key={t}><Check size={15} />{t}</li>)}</ul>
          <div className="ci-cloud-inference-note"><Plug size={18} /><p><strong>Inference is billed separately.</strong><br />Connect Cheaper Inference or bring your own provider keys after setup.</p></div>
          {error && <p className="ci-cloud-error" role="alert">{error}</p>}
          {unavailable && <p className="ci-cloud-error" role="status">Cloud setup is not available yet. Your self-hosted OmniRoute remains free to use.</p>}
          <Button className="ci-cloud-continue" onClick={onContinue} loading={busy} disabled={disabled || loading || unavailable || !selected || !value.name.trim()}><span>{busy ? "Preparing your quote…" : "Review hosting"}</span>{!busy && <ArrowRight size={16} aria-hidden="true" />}</Button>
          <p className="ci-cloud-fineprint">No payment until you confirm at checkout.</p>
        </div>
      </aside>
    </div>
    <div className="ci-cloud-selfhost"><a href={selfHostHref} target="_blank" rel="noopener noreferrer"><Terminal size={14} />Self-hosting instructions<ExternalLink size={12} /></a></div>
  </div>;
}

export interface CloudInstancePanelProps {
  name: string; hostname: string; region: string; configuration: string; monthlyCents: number;
  status: string; connected: boolean; connecting?: boolean; canManage: boolean; canBill: boolean; cancelAtPeriodEnd?: boolean;
  connectionError?: string | null;
  setupStage?: "queued" | "starting" | "configuring" | "verifying";
  showEyebrow?: boolean;
  periodEnd?: string | null; busy?: boolean; pendingAction?: string | null; error?: string | null; message?: string | null;
  onOpen: () => void; onConnect: () => void; onDisconnect: () => void; onRename: () => void;
  onBilling?: () => void; onCancel?: () => void; onResume?: () => void; onCheckout: () => void;
}
function billingDate(value?: string | null) {
  return value && Number.isFinite(Date.parse(value))
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value))
    : null;
}
export function CloudInstancePanel(p: CloudInstancePanelProps) {
  const ready = p.status === "ready" || p.status === "past_due";
  const pending = p.status === "awaiting_payment";
  const provisioning = p.status === "provisioning";
  const connecting = !p.connected && !p.connectionError && p.connecting;
  const connectionBusy = connecting || p.pendingAction === "connect" || p.pendingAction === "disconnect";
  const status = ({ ready: "Online", awaiting_payment: "Awaiting payment", provisioning: "Setting up", past_due: "Payment needs attention", suspended: "Service paused", deleting: "Ending service", failed: "Setup needs attention", terminated: "Service ended", unhealthy: "Checking gateway health" } as Record<string, string>)[p.status] || "Updating";
  const setup = ({ queued: { heading: "Setup queued", description: "Your hosting order is confirmed. Setup will begin shortly." }, starting: { heading: "Starting your gateway", description: "We’re allocating your resources and starting your instance." }, configuring: { heading: "Preparing your gateway", description: "We’re configuring OmniRoute and your secure connection." }, verifying: { heading: "Checking your secure endpoint", description: "OmniRoute is running. We’re checking HTTPS before opening access." } })[p.setupStage || "configuring"];
  const heading = provisioning ? setup.heading : ready ? "Your gateway is online" : status;
  const description = provisioning ? `${setup.description} You can leave this page; setup continues.`
    : ready ? "Open OmniRoute to manage your providers, API keys, and routing."
    : pending ? "Complete payment to start setting up your gateway."
    : "Your instance details and billing remain available below.";
  const renewal = billingDate(p.periodEnd);
  const instanceUrl = `https://${p.hostname}`;
  return <div className="ci-cloud-instance" data-status={p.status}>
    <div className="ci-cloud-instance__header"><div>{p.showEyebrow !== false && <div className="ci-cloud-eyebrow"><Cloud size={14} aria-hidden="true" /> OMNIROUTE CLOUD</div>}<h1>{p.name}</h1></div><Badge variant={p.status === "ready" ? "live" : "outline"}>{status}</Badge></div>
    <div className="ci-cloud-layout">
      <section className="ci-cloud-instance__main" aria-label="Your gateway">
        <div className="ci-cloud-instance__state" data-provisioning={provisioning || undefined}>
          {provisioning ? <BrandLoader variant="orbit" size={150} label={heading} aria-hidden="true" className="ci-cloud-instance__loader" /> : <div className="ci-cloud-instance__state-icon">{ready ? <Cloud size={25} aria-hidden="true" /> : <Server size={25} aria-hidden="true" />}</div>}
          <div role="status" aria-live="polite"><h2>{heading}</h2><p>{description}</p></div>
        </div>
        <div className="ci-cloud-instance__details">
          <div className="ci-cloud-instance__endpoint"><span><Globe2 size={14} aria-hidden="true" />Instance URL</span>{ready ? <a className="ci-cloud-instance__link" href={instanceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${instanceUrl} (opens in a new tab)`}>{instanceUrl}<ArrowUpRight size={14} aria-hidden="true" /></a> : <code>{instanceUrl}</code>}{!ready && <small>Available once your gateway is online</small>}</div>
          <div><span><MapPin size={14} aria-hidden="true" />Region</span><strong>{p.region}</strong></div>
          <div><span><Cpu size={14} aria-hidden="true" />Resources</span><strong>{p.configuration}</strong></div>
        </div>
        <div className="ci-cloud-instance__actions">
          <Button className="ci-cloud-instance__open" onClick={pending ? p.onCheckout : p.onOpen} disabled={p.busy || (pending ? !p.canBill : !p.canManage || !ready)}>{pending ? "Complete payment" : "Open OmniRoute"}<ArrowRight size={15} aria-hidden="true" /></Button>
          {p.canManage && <Button variant="outline" onClick={p.onRename} disabled={p.busy}><PencilLine size={14} aria-hidden="true" />Rename instance</Button>}
        </div>
      </section>
      <aside className="ci-cloud-instance__aside" aria-label="Providers and billing">
        <section className="ci-cloud-connection" aria-label="Inference providers">
          <div className="ci-cloud-connection__heading"><div className="ci-cloud-connection__icon"><Sparkles size={20} aria-hidden="true" /></div><Badge variant="outline">{p.connected ? "CONNECTED" : p.connectionError ? "NEEDS ATTENTION" : connecting ? "CONNECTING" : "OPTIONAL"}</Badge></div>
          <h2>{p.connected ? "Cheaper Inference connected" : "Connect inference"}</h2>
          <p>{p.connected ? "Your workspace’s balance, model access, and spending rules are connected." : "Use your Cheaper Inference balance and model access. No provider keys to copy."}</p>
          {connecting && <div className="ci-cloud-connection__progress" role="status"><BrandLoader variant="orbit" size={64} aria-hidden="true" /><span>Confirming your gateway’s connection…</span></div>}
          {p.connectionError && <p className="ci-cloud-connection__error" role="alert">{p.connectionError}</p>}
          <Button className="ci-cloud-connection__button" variant={p.connected ? "outline" : "default"} onClick={p.connected ? p.onDisconnect : p.onConnect} disabled={!ready || !p.canManage || p.busy || connecting} loading={!!connectionBusy && !connecting}>{p.connected ? "Disconnect Cheaper Inference" : connecting ? "Connecting your account…" : p.connectionError ? "Retry connection" : "Connect Cheaper Inference"}{!p.connected && !connectionBusy && <ArrowRight size={15} aria-hidden="true" />}</Button>
          <small>{!ready ? "Available when your gateway is online. " : ""}Inference is billed separately from hosting.</small>
          <div className="ci-cloud-byok"><KeyRound size={18} aria-hidden="true" /><div><h3>Your providers</h3><p>Add API keys, subscriptions, or OAuth accounts in OmniRoute.</p><Button variant="link" onClick={p.onOpen} disabled={!ready || !p.canManage}>Configure providers<ArrowRight size={14} aria-hidden="true" /></Button></div></div>
        </section>
        <section className="ci-cloud-hosting" aria-label="Hosting billing">
          <div className="ci-cloud-hosting-bill"><span>Monthly hosting</span><strong>{money(p.monthlyCents)}<small>/ month</small></strong></div>
          <p>{p.cancelAtPeriodEnd ? `Hosting ends ${renewal || "at the end of your paid period"}.` : renewal ? `Next renewal ${renewal}.` : "Monthly subscription. Inference billed separately."}</p>
          {p.canBill && p.onBilling ? <Button className="ci-cloud-hosting__button" variant="outline" onClick={p.onBilling} disabled={p.busy}><CreditCard size={15} aria-hidden="true" />Manage billing<ArrowRight size={14} aria-hidden="true" /></Button> : !p.canBill && <small>Your workspace’s billing owner manages this subscription.</small>}
        </section>
      </aside>
    </div>
    {p.message && <p className="ci-cloud-notice">{p.message}</p>}{p.error && <p role="alert" className="ci-cloud-error">{p.error}</p>}
  </div>;
}

export interface CloudBillingDetailsProps {
  monthlyCents: number; transferGb: number; periodEnd?: string | null;
  cancelAtPeriodEnd?: boolean; awaitingPayment?: boolean; busy?: boolean; pendingAction?: string | null;
  onPortal: () => void; onCancel: () => void; onResume: () => void; onCheckout: () => void;
}
export function CloudBillingDetails(p: CloudBillingDetailsProps) {
  const period = billingDate(p.periodEnd);
  return <div className="ci-cloud-billing">
    <div className="ci-cloud-billing__summary"><span>OmniRoute Cloud</span><strong>{money(p.monthlyCents)}<small>/ month</small></strong><p>{p.cancelAtPeriodEnd ? `Ends ${period || "at the end of your paid period"}.` : period ? `Renews ${period}.` : "Renews monthly after payment."}</p></div>
    <p className="ci-cloud-billing__included">Includes {(p.transferGb / 1000).toLocaleString("en-US")} TB transfer. Inference is billed separately to your provider or Cheaper Inference wallet.</p>
    <Button className="ci-cloud-billing__portal" onClick={p.awaitingPayment ? p.onCheckout : p.onPortal} disabled={p.busy} loading={p.pendingAction === "portal"}><CreditCard size={15} aria-hidden="true" />{p.awaitingPayment ? "Complete payment" : "Payment methods and invoices"}<ExternalLink size={14} aria-hidden="true" /></Button>
    {!p.awaitingPayment && <div className="ci-cloud-billing__subscription"><div><h3>{p.cancelAtPeriodEnd ? "Cancellation scheduled" : "Subscription"}</h3><p>{p.cancelAtPeriodEnd ? "Keep hosting to continue your subscription." : "If you cancel, your gateway stays online until the paid period ends."}</p></div><Button variant="outline" onClick={p.cancelAtPeriodEnd ? p.onResume : p.onCancel} disabled={p.busy} loading={p.pendingAction === "resume"}>{p.cancelAtPeriodEnd ? "Keep hosting" : "Cancel hosting"}</Button></div>}
  </div>;
}
