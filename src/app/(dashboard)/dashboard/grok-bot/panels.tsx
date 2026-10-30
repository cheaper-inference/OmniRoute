"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { permissionSummary } from "./permission";
import type { GrokBotComputer } from "./computers";
import type { GrokBotRosterEntry } from "./roster";
import type { GrokBotRoutine, GrokBotSkill } from "./details";
import type { PermissionRequest, TranscriptCard, TranscriptItem } from "./transcript";

export type Translate = (key: string, values?: Record<string, string>) => string;

export function ConsoleBar({
  accounts,
  roster,
  chiefLabel,
  selectedAccount,
  selectedBot,
  rosterLoading,
  stateLabel,
  onAccount,
  onBot,
  onToggleDetails,
  t,
}: {
  accounts: Array<{ id: string; name: string }>;
  roster: GrokBotRosterEntry[];
  chiefLabel: string;
  selectedAccount: string;
  selectedBot: string;
  rosterLoading: boolean;
  stateLabel: string;
  onAccount: (id: string) => void;
  onBot: (id: string) => void;
  onToggleDetails: () => void;
  t: Translate;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
      <select
        className="max-w-64 truncate rounded-control border border-border bg-transparent px-2 py-1 text-sm"
        onChange={(event) => onAccount(event.target.value)}
        value={selectedAccount}
      >
        <option value="">{t("accountsTitle")}</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>{account.name}</option>
        ))}
      </select>
      <select
        className="max-w-64 truncate rounded-control border border-border bg-transparent px-2 py-1 text-sm"
        disabled={!selectedAccount || rosterLoading}
        onChange={(event) => onBot(event.target.value)}
        value={selectedBot}
      >
        <option value="">{rosterLoading ? t("rosterLoading") : t("rosterTitle")}</option>
        {roster.map((bot) => (
          <option key={bot.agentId} value={bot.agentId}>
            {bot.chiefOfStaff ? `${bot.name} (${chiefLabel})` : bot.name}
          </option>
        ))}
      </select>
      <span className="ml-auto text-xs text-text-muted">{stateLabel}</span>
      <button className="text-xs underline" onClick={onToggleDetails} type="button">
        {t("detailsTitle")}
      </button>
    </div>
  );
}

export function AccountsPanel({
  accounts,
  fanout,
  selectedId,
  onToggleFanout,
  onSelect,
}: {
  accounts: Array<{ id: string; name: string; email?: string }>;
  fanout: string[];
  selectedId: string;
  onToggleFanout: (id: string, checked: boolean) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="space-y-1">
      {accounts.map((account) => {
        const selected = account.id === selectedId;
        return (
          <li className="flex items-center gap-1" key={account.id}>
            <input
              aria-label={account.name}
              checked={fanout.includes(account.id)}
              className="shrink-0"
              onChange={(event) => onToggleFanout(account.id, event.target.checked)}
              type="checkbox"
            />
            <button
              aria-pressed={selected}
              className={
                selected
                  ? "min-w-0 flex-1 truncate rounded-control bg-primary/10 px-2 py-1.5 text-left text-sm font-medium text-text-main"
                  : "min-w-0 flex-1 truncate rounded-control px-2 py-1.5 text-left text-sm text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }
              onClick={() => onSelect(account.id)}
              type="button"
            >
              {account.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function RosterPanel({
  roster,
  chiefLabel,
  selectedId,
  onSelect,
}: {
  roster: GrokBotRosterEntry[];
  chiefLabel: string;
  selectedId: string;
  onSelect: (agentId: string) => void;
}) {
  return (
    <ul className="space-y-1">
      {roster.map((bot) => {
        const selected = bot.agentId === selectedId;
        const label = bot.chiefOfStaff ? `${bot.name} (${chiefLabel})` : bot.name;
        return (
          <li key={bot.agentId}>
            <button
              aria-pressed={selected}
              className={
                selected
                  ? "w-full truncate rounded-control bg-primary/10 px-2 py-1.5 text-left text-sm font-medium text-text-main"
                  : "w-full truncate rounded-control px-2 py-1.5 text-left text-sm text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }
              onClick={() => onSelect(bot.agentId)}
              type="button"
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function MessageCards({
  t,
  cards,
  busy,
  onConnector,
  onWidget,
  onDismissWidget,
  onSecret,
  onDiscardDraft,
}: {
  t: Translate;
  cards: TranscriptCard[];
  busy: boolean;
  onConnector: (card: Extract<TranscriptCard, { kind: "connector" }>, resolution: string) => void;
  onWidget: (card: Extract<TranscriptCard, { kind: "widget" }>, value: string) => void;
  onDismissWidget: (card: Extract<TranscriptCard, { kind: "widget" }>) => void;
  onSecret: (card: Extract<TranscriptCard, { kind: "secret" }>, value: string) => void;
  onDiscardDraft: (card: Extract<TranscriptCard, { kind: "email" | "slack" }>) => void;
}) {
  if (cards.length === 0) return null;
  return (
    <ul className="mx-auto flex w-full max-w-[640px] flex-col gap-2 px-4">
      {cards.map((card) => (
        <li className="rounded-card border border-border bg-surface p-3 text-sm" key={`${card.kind}:${card.entryId}:${card.seq}`}>
          {card.kind === "attachment" ? <p>{card.fileName}</p> : null}
          {card.kind === "notice" ? <p>{card.text}</p> : null}
          {card.kind === "connector" ? (
            <div className="flex flex-wrap items-center gap-2">
              <span>{card.name}</span>
              <span className="text-xs text-text-muted">{card.action}</span>
              {card.requestId !== "" ? (
              <>
              {(
                [
                  ["allowed", "connectorAllow"],
                  ["skipped", "connectorSkip"],
                  ["always_this_bot", "connectorAlwaysBot"],
                  ["always_all_team_bots", "connectorAlwaysTeam"],
                  ["allow_in_channel", "connectorAllowChannel"],
                ] as const
              ).map(([resolution, key]) => (
                <button className="rounded-control border px-2 py-1 text-xs" disabled={busy} key={resolution} onClick={() => onConnector(card, resolution)} type="button">{t(key)}</button>
              ))}
              </>
              ) : null}
            </div>
          ) : null}
          {card.kind === "widget" ? (
            <div className="flex flex-col gap-2">
              <span>{card.prompt}</span>
              {card.multiSelect ? (
                <form className="flex flex-wrap items-center gap-2" onSubmit={(event) => {
                  event.preventDefault();
                  const chosen = Array.from(event.currentTarget.querySelectorAll<HTMLInputElement>("input:checked")).map((item) => item.value);
                  if (chosen.length > 0) onWidget(card, chosen.join("\n"));
                }}>
                  {card.options.map((option) => (
                    <label className="text-xs" key={option}><input className="mr-1" type="checkbox" value={option} />{option}</label>
                  ))}
                  <button className="rounded-control border px-2 py-1 text-xs" disabled={busy} type="submit">{t("widgetSubmit")}</button>
                </form>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {card.options.map((option) => (
                    <button className="rounded-control border px-2 py-1 text-xs" disabled={busy} key={option} onClick={() => onWidget(card, option)} type="button">{option}</button>
                  ))}
                </div>
              )}
              {card.allowCustom ? (
                <form className="flex gap-2" onSubmit={(event) => {
                  event.preventDefault();
                  const value = new FormData(event.currentTarget).get("custom");
                  if (typeof value === "string" && value.trim() !== "") onWidget(card, value);
                }}>
                  <input className="min-w-0 flex-1 rounded-control border px-2 py-1 text-xs" name="custom" />
                  <button className="rounded-control border px-2 py-1 text-xs" disabled={busy} type="submit">{t("widgetCustom")}</button>
                </form>
              ) : null}
              {card.dismissOnMoveOn ? (
                <button className="self-start rounded-control border px-2 py-1 text-xs" disabled={busy} onClick={() => onDismissWidget(card)} type="button">{t("widgetDismiss")}</button>
              ) : null}
            </div>
          ) : null}
          {card.kind === "secret" ? (
            <form className="flex gap-2" onSubmit={(event) => {
              event.preventDefault();
              const value = new FormData(event.currentTarget).get("secret");
              if (typeof value === "string" && value.trim() !== "") onSecret(card, value);
            }}>
              <span>{card.label}</span>
              <input className="min-w-0 flex-1 rounded-control border px-2 py-1 text-xs" name="secret" type="password" />
              <button className="rounded-control border px-2 py-1 text-xs" disabled={busy} type="submit">{t("widgetSubmit")}</button>
            </form>
          ) : null}
          {card.kind === "email" || card.kind === "slack" ? (
            <div className="flex items-center gap-2">
              <span>{card.kind === "email" ? `${card.from} → ${card.to}: ${card.subject}: ${card.body}` : `${card.target}: ${card.body}`}</span>
              <button className="rounded-control border px-2 py-1 text-xs" disabled={busy} onClick={() => onDiscardDraft(card)} type="button">{t("widgetDismiss")}</button>
            </div>
          ) : null}
          {card.kind === "unknown" ? <p>{t("unsupportedMessage")}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function MessageList({
  t,
  messages,
  hidden,
  onOlder,
}: {
  t: Translate;
  messages: TranscriptItem[];
  hidden: number;
  onOlder: () => void;
}) {
  if (messages.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-text-muted">{t("conversationEmpty")}</p>
    );
  }
  return (
    <ul className="mx-auto flex w-full max-w-[640px] flex-col gap-3 px-4 py-4">
      {hidden > 0 ? (
        <li>
          <button className="text-sm underline" onClick={onOlder} type="button">
            {t("conversationOlder")}
          </button>
        </li>
      ) : null}
      {messages.map((message) => {
        const own = message.role === "user";
        return (
          <li className={own ? "flex justify-end" : "flex justify-start"} key={message.entryId}>
            <p
              className={
                own
                  ? "max-w-[85%] whitespace-pre-wrap break-words rounded-card bg-primary/10 px-3 py-2 text-sm text-text-main"
                  : "max-w-[85%] whitespace-pre-wrap break-words text-sm text-text-main"
              }
            >
              {message.text}
              {message.streaming ? <span className="ml-1 opacity-60">...</span> : null}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

const ANSWERS: Array<{ resolution: string; key: string }> = [
  { resolution: "allow_once", key: "permissionAllowOnce" },
  { resolution: "always", key: "permissionAlways" },
  { resolution: "deny", key: "permissionDeny" },
  { resolution: "never", key: "permissionNever" },
];

function PermissionCards({
  t,
  permissions,
  permissionFailed,
  computers,
  onAnswer,
}: {
  t: Translate;
  permissions: PermissionRequest[];
  permissionFailed: boolean;
  computers: GrokBotComputer[];
  onAnswer: (request: PermissionRequest, resolution: string) => void;
}) {
  const pending = permissions.filter((item) => item.status === "pending");
  if (pending.length === 0) return null;
  return (
    <div className="mx-4 rounded-card border border-amber-500/30 bg-amber-500/10 p-3">
      <p className="text-sm font-medium text-text-main">{t("permissionTitle")}</p>
      {pending.map((item) => (
        <div key={item.requestId} className="mt-2 flex flex-wrap items-center gap-2">
          <code className="text-xs">
            {permissionSummary({
              ...item,
              machineLabel: computers.find((computer) => computer.machineId === item.machineId)
                ?.label,
            })}
          </code>
          {ANSWERS.map((answer) => (
            <button
              key={answer.resolution}
              type="button"
              className="rounded-control border border-border bg-surface px-2 py-1 text-xs text-text-main hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => onAnswer(item, answer.resolution)}
            >
              {t(answer.key)}
            </button>
          ))}
        </div>
      ))}
      {permissionFailed ? (
        <p className="mt-2 text-xs text-muted-foreground">{t("permissionFailed")}</p>
      ) : null}
    </div>
  );
}

function SendBar({
  t,
  draft,
  sendState,
  fanState,
  onDraft,
  onSubmit,
  onUpload,
  uploadNote,
}: {
  t: Translate;
  draft: string;
  sendState: string;
  fanState: "" | "done" | "partial";
  onDraft: (value: string) => void;
  onSubmit: () => void;
  onUpload: (name: string) => void;
  uploadNote: string;
}) {
  return (
    <>
      <form
        className="mx-auto flex w-full max-w-[640px] items-end gap-2 rounded-card border border-border bg-surface p-2 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <input
          className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-text-main outline-none placeholder:text-text-muted"
          onChange={(event) => onDraft(event.target.value)}
          placeholder={t("sendPlaceholder")}
          value={draft}
        />
        <label className="cursor-pointer rounded-control border px-2 py-1.5 text-sm text-text-muted">
          {t("attachButton")}
          <input
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onUpload(file.name);
              event.target.value = "";
            }}
            title={t("attachUnavailable")}
            type="file"
          />
        </label>
        <button
          className="rounded-control bg-primary px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          disabled={draft.trim() === ""}
          type="submit"
        >
          {t("sendButton")}
        </button>
      </form>
      {uploadNote !== "" ? (
        <p className="text-sm text-muted-foreground">{uploadNote}</p>
      ) : null}
      {sendState === "unknown" ? (
        <p className="text-sm text-muted-foreground">{t("sendUnknown")}</p>
      ) : null}
      {fanState === "done" ? (
        <p className="text-sm text-muted-foreground">{t("fanoutDone")}</p>
      ) : null}
      {fanState === "partial" ? (
        <p className="text-sm text-muted-foreground">{t("fanoutPartial")}</p>
      ) : null}
    </>
  );
}

export type ConversationState = {
  stateLabel: string;
  runState: string;
  linkLost: boolean;
  blocked: boolean;
  needsSignIn: boolean;
  historyUnavailable: boolean;
  terminal: boolean;
  messages: TranscriptItem[];
  window: number;
  cards: TranscriptCard[];
  cardFailed: boolean;
  cardBusy: boolean;
  permissions: PermissionRequest[];
  permissionFailed: boolean;
  computers: GrokBotComputer[];
  draft: string;
  sendState: string;
  fanState: "" | "done" | "partial";
  uploadNote: string;
};

export type ConversationHandlers = {
  onRetry: () => void;
  onOlder: () => void;
  onAnswer: (request: PermissionRequest, resolution: string) => void;
  onConnector: (card: Extract<TranscriptCard, { kind: "connector" }>, resolution: string) => void;
  onWidget: (card: Extract<TranscriptCard, { kind: "widget" }>, value: string) => void;
  onDismissWidget: (card: Extract<TranscriptCard, { kind: "widget" }>) => void;
  onSecret: (card: Extract<TranscriptCard, { kind: "secret" }>, value: string) => void;
  onDiscardDraft: (card: Extract<TranscriptCard, { kind: "email" | "slack" }>) => void;
  onDraft: (value: string) => void;
  onSubmit: () => void;
  onUpload: (name: string) => void;
};

export function ConversationPanel({
  t,
  state,
  handlers,
}: {
  t: Translate;
  state: ConversationState;
  handlers: ConversationHandlers;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState(0);
  useLayoutEffect(() => {
    const node = scroller.current;
    if (!node || typeof ResizeObserver !== "function") return;
    const watch = new ResizeObserver(() => setGrown(node.scrollHeight));
    watch.observe(node);
    return () => watch.disconnect();
  }, []);
  useLayoutEffect(() => {
    const node = scroller.current;
    if (!node || typeof node.scrollTo !== "function") return;
    const unread = node.dataset.opened !== "1";
    const nearBottom = node.scrollHeight - node.scrollTop - node.clientHeight < 8;
    if (unread || nearBottom) node.scrollTo(0, node.scrollHeight);
    node.dataset.opened = "1";
  }, [state.messages.length, grown]);
  return (
    <div className="flex h-full min-h-[28rem] flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-xs text-text-muted">
        <span className="inline-block size-2 rounded-full bg-green-500" />
        <span>
          {state.stateLabel}
          {state.runState === "" ? null : ` ${t("stateBox", { state: state.runState })}`}
        </span>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto py-3" ref={scroller}>
        <MessageList hidden={Math.max(0, state.messages.length - state.window)} messages={state.messages.slice(-state.window)} onOlder={handlers.onOlder} t={t} />
        {state.linkLost ? (
          <p className="px-4 text-sm text-text-muted">
            {state.needsSignIn ? t("conversationSignIn") : t("conversationLost")}
          </p>
        ) : null}
        {state.blocked ? (
          <p className="px-4 text-sm text-text-muted">{t("conversationBlocked")}</p>
        ) : null}
        {state.historyUnavailable ? (
          <p className="px-4 text-sm text-text-muted">{t("conversationHistoryUnavailable")}</p>
        ) : null}
        {state.terminal ? (
          <button className="px-4 text-sm underline" onClick={handlers.onRetry} type="button">
            {t("conversationRetry")}
          </button>
        ) : null}
        <PermissionCards
          computers={state.computers}
          onAnswer={handlers.onAnswer}
          permissionFailed={state.permissionFailed}
          permissions={state.permissions}
          t={t}
        />
      </div>
      <div className="border-t border-border p-3">
        <MessageCards busy={state.cardBusy} cards={state.cards.filter((card) => card.kind === "widget" || card.kind === "secret" || card.kind === "email" || card.kind === "slack" || (card.kind === "connector" && card.requestId !== "")).slice(-1)} onConnector={handlers.onConnector} onDiscardDraft={handlers.onDiscardDraft} onDismissWidget={handlers.onDismissWidget} onSecret={handlers.onSecret} onWidget={handlers.onWidget} t={t} />
        {state.cards.filter((card) => card.kind === "widget" || card.kind === "secret" || card.kind === "email" || card.kind === "slack" || (card.kind === "connector" && card.requestId !== "")).length > 1 ? (
          <p className="px-4 pb-2 text-xs text-text-muted">{t("cardQueued", { count: String(state.cards.filter((card) => card.kind === "widget" || card.kind === "secret" || card.kind === "email" || card.kind === "slack" || (card.kind === "connector" && card.requestId !== "")).length - 1) })}</p>
        ) : null}
        {state.cardFailed ? <p className="px-4 pb-2 text-sm text-text-muted">{t("cardFailed")}</p> : null}
        <SendBar
          draft={state.draft}
          fanState={state.fanState}
          onDraft={handlers.onDraft}
          onSubmit={handlers.onSubmit}
          sendState={state.sendState}
          t={t}
          onUpload={handlers.onUpload}
          uploadNote={state.uploadNote}
        />
      </div>
    </div>
  );
}

export function SkillsPanel({
  skills,
  routines,
}: {
  skills: GrokBotSkill[];
  routines: GrokBotRoutine[];
}) {
  return (
    <ul className="space-y-1">
      {skills.map((skill) => (
        <li className="break-words text-sm" key={skill.id}>
          {skill.name}
        </li>
      ))}
      {routines.map((routine) => (
        <li className="break-words text-sm" key={routine.id}>
          {routine.name || routine.id}
        </li>
      ))}
    </ul>
  );
}

export function ComputersPanel({ computers }: { computers: GrokBotComputer[] }) {
  return (
    <ul className="space-y-1">
      {computers.map((computer) => (
        <li className="break-words text-sm" key={computer.machineId}>
          {computer.machineId}
        </li>
      ))}
    </ul>
  );
}
