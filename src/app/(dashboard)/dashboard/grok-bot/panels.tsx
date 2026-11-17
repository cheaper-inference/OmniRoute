"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Select from "@/shared/components/Select";
import { Input } from "@omniroute/ui-kit/input";

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
      <Select
        className="max-w-64"
        aria-label={t("accountsTitle")}
        onChange={(event) => onAccount(event.target.value)}
        value={selectedAccount}
      >
        <option value="">{t("accountsTitle")}</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </Select>
      <Select
        className="max-w-64"
        aria-label={t("rosterTitle")}
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
      </Select>
      <span className="ml-auto text-xs text-text-muted">{stateLabel}</span>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs underline"
        onClick={onToggleDetails}
        type="button"
      >
        {t("detailsTitle")}
      </Button>
    </div>
  );
}

type CardActions = {
  t: Translate;
  busy: boolean;
  onConnector: ConversationHandlers["onConnector"];
  onWidget: ConversationHandlers["onWidget"];
  onDismissWidget: ConversationHandlers["onDismissWidget"];
  onSecret: ConversationHandlers["onSecret"];
  onDiscardDraft: ConversationHandlers["onDiscardDraft"];
};
type CardProps<K extends TranscriptCard["kind"]> = CardActions & {
  card: Extract<TranscriptCard, { kind: K }>;
};

function ConnectorCard(props: CardProps<"connector">) {
  const { card, t, busy, onConnector } = props;
  return (
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
            <Button
              variant="ghost"
              size="sm"
              className="rounded-control border px-2 py-1 text-xs"
              disabled={busy}
              key={resolution}
              onClick={() => onConnector(card, resolution)}
              type="button"
            >
              {t(key)}
            </Button>
          ))}
        </>
      ) : null}
    </div>
  );
}

function WidgetChoices(props: CardProps<"widget">) {
  const { card, t, busy, onWidget } = props;
  return (
    <>
      {card.multiSelect ? (
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const chosen = Array.from(
              event.currentTarget.querySelectorAll<HTMLInputElement>("input:checked")
            ).map((item) => item.value);
            if (chosen.length > 0) onWidget(card, chosen.join("\n"));
          }}
        >
          {card.options.map((option) => (
            <label className="text-xs" key={option.value}>
              <Checkbox className="mr-1" value={option.value} />
              {option.label}
            </label>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-control border px-2 py-1 text-xs"
            disabled={busy}
            type="submit"
          >
            {t("widgetSubmit")}
          </Button>
        </form>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {card.options.map((option) => (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-control border px-2 py-1 text-xs"
              disabled={busy}
              key={option.value}
              onClick={() => onWidget(card, option.value)}
              type="button"
            >
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}

function WidgetCustom(props: CardProps<"widget">) {
  const { card, t, busy, onWidget } = props;
  return (
    <>
      {card.allowCustom ? (
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const value = new FormData(event.currentTarget).get("custom");
            if (typeof value === "string" && value.trim() !== "") onWidget(card, value);
          }}
        >
          <Input
            className="min-w-0 flex-1 rounded-control border px-2 py-1 text-xs"
            aria-label={card.prompt}
            name="custom"
          />
          <Button
            variant="ghost"
            size="sm"
            className="rounded-control border px-2 py-1 text-xs"
            disabled={busy}
            type="submit"
          >
            {t("widgetCustom")}
          </Button>
        </form>
      ) : null}
    </>
  );
}

function WidgetCard(props: CardProps<"widget">) {
  const { card, t, busy, onDismissWidget } = props;
  return (
    <div className="flex flex-col gap-2">
      <span>{card.prompt}</span>
      <WidgetChoices {...props} />
      <WidgetCustom {...props} />
      {card.dismissOnMoveOn ? (
        <Button
          variant="ghost"
          size="sm"
          className="self-start rounded-control border px-2 py-1 text-xs"
          disabled={busy}
          onClick={() => onDismissWidget(card)}
          type="button"
        >
          {t("widgetDismiss")}
        </Button>
      ) : null}
    </div>
  );
}

function SecretCard(props: CardProps<"secret">) {
  const { card, t, busy, onSecret } = props;
  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const value = new FormData(event.currentTarget).get("secret");
        if (typeof value === "string" && value.trim() !== "") onSecret(card, value);
      }}
    >
      <span>{card.label}</span>
      <Input
        className="min-w-0 flex-1 rounded-control border px-2 py-1 text-xs"
        aria-label={card.label}
        name="secret"
        type="password"
      />
      <Button
        variant="ghost"
        size="sm"
        className="rounded-control border px-2 py-1 text-xs"
        disabled={busy}
        type="submit"
      >
        {t("widgetSubmit")}
      </Button>
    </form>
  );
}

function DraftCard(props: CardProps<"email" | "slack" | "meeting" | "imessage">) {
  const { card, t, busy, onDiscardDraft } = props;
  return (
    <div className="flex items-center gap-2">
      <span>
        {card.kind === "email"
          ? `${card.from} → ${card.to}: ${card.subject}: ${card.body}`
          : card.kind === "slack"
            ? `${card.target}: ${card.body}`
            : card.kind === "meeting"
              ? `${card.title}: ${card.body}`
              : `${card.recipient}: ${card.body}`}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-control border px-2 py-1 text-xs"
        disabled={busy}
        onClick={() => onDiscardDraft(card)}
        type="button"
      >
        {t("widgetDismiss")}
      </Button>
    </div>
  );
}

function MessageCardContent(props: CardActions & { card: TranscriptCard }) {
  const { card, t } = props;
  switch (card.kind) {
    case "attachment":
      return <p>{card.fileName}</p>;
    case "notice":
      return <p>{card.text}</p>;
    case "connector":
      return <ConnectorCard {...props} card={card} />;
    case "widget":
      return <WidgetCard {...props} card={card} />;
    case "secret":
      return <SecretCard {...props} card={card} />;
    case "email":
    case "slack":
    case "meeting":
    case "imessage":
      return <DraftCard {...props} card={card} />;
    case "unknown":
      return <p>{t("unsupportedMessage")}</p>;
  }
}

function MessageCards({ cards, ...actions }: CardActions & { cards: TranscriptCard[] }) {
  if (cards.length === 0) return null;
  return (
    <ul className="mx-auto flex w-full max-w-[640px] flex-col gap-2 px-4">
      {cards.map((card) => (
        <li
          className="rounded-card border border-border bg-surface p-3 text-sm"
          key={`${card.kind}:${card.entryId}:${card.seq}`}
        >
          <MessageCardContent {...actions} card={card} />
        </li>
      ))}
    </ul>
  );
}

function MessageList({
  t,
  messages,
  hidden,
  loading,
  onOlder,
}: {
  t: Translate;
  messages: TranscriptItem[];
  hidden: number;
  loading: boolean;
  onOlder: () => void;
}) {
  if (messages.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-text-muted">
        {loading ? t("conversationLoading") : t("conversationEmpty")}
      </p>
    );
  }
  return (
    <ul className="mx-auto flex w-full max-w-[640px] flex-col gap-3 px-4 py-4">
      {hidden > 0 ? (
        <li>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm underline"
            onClick={onOlder}
            type="button"
          >
            {t("conversationOlder")}
          </Button>
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
    <div className="mx-4 rounded-card border border-warning/30 bg-warning-bg p-3">
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
            <Button
              variant="ghost"
              size="sm"
              key={answer.resolution}
              type="button"
              className="rounded-control border border-border bg-surface px-2 py-1 text-xs text-text-main hover:bg-bg-subtle"
              onClick={() => onAnswer(item, answer.resolution)}
            >
              {t(answer.key)}
            </Button>
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
        <Input
          className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-text-main outline-none placeholder:text-text-muted"
          onChange={(event) => onDraft(event.target.value)}
          aria-label={t("sendPlaceholder")}
          placeholder={t("sendPlaceholder")}
          value={draft}
        />
        <label className="cursor-pointer rounded-control border px-2 py-1.5 text-sm text-text-muted focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
          {t("attachButton")}
          <Input
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onUpload(file.name);
              event.target.value = "";
            }}
            title={t("attachUnavailable")}
            type="file"
          />
        </label>
        <Button size="sm" disabled={draft.trim() === ""} type="submit">
          {t("sendButton")}
        </Button>
      </form>
      {uploadNote !== "" ? <p className="text-sm text-muted-foreground">{uploadNote}</p> : null}
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
  /** What the service said when the turn failed; empty when it said nothing. */
  turnFailure: string;
  blocked: boolean;
  needsSignIn: boolean;
  historyUnavailable: boolean;
  loading: boolean;
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
  onDiscardDraft: (
    card: Extract<TranscriptCard, { kind: "email" | "slack" | "meeting" | "imessage" }>
  ) => void;
  onDraft: (value: string) => void;
  onSubmit: () => void;
  onUpload: (name: string) => void;
};

type ConversationProps = { t: Translate; state: ConversationState; handlers: ConversationHandlers };
function actionableCard(card: TranscriptCard): boolean {
  return (
    card.kind === "widget" ||
    card.kind === "secret" ||
    card.kind === "email" ||
    card.kind === "slack" ||
    card.kind === "meeting" ||
    card.kind === "imessage" ||
    (card.kind === "connector" && card.requestId !== "")
  );
}
function ConversationActions({ t, state, handlers }: ConversationProps) {
  const actionable = state.cards.filter(actionableCard);
  return (
    <div className="border-t border-border p-3">
      <MessageCards
        busy={state.cardBusy}
        cards={actionable.slice(-1)}
        onConnector={handlers.onConnector}
        onDiscardDraft={handlers.onDiscardDraft}
        onDismissWidget={handlers.onDismissWidget}
        onSecret={handlers.onSecret}
        onWidget={handlers.onWidget}
        t={t}
      />
      {actionable.length > 1 ? (
        <p className="px-4 pb-2 text-xs text-text-muted">
          {t("cardQueued", {
            count: String(actionable.length - 1),
          })}
        </p>
      ) : null}
      {state.cardFailed ? (
        <p className="px-4 pb-2 text-sm text-text-muted">{t("cardFailed")}</p>
      ) : null}
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
  );
}

/**
 * Keeps a transcript pinned to its newest row unless the reader scrolled away. Rows grow
 * after they render, so the height is watched rather than assumed.
 */
function usePinnedScroll(rowCount: number) {
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
  }, [rowCount, grown]);
  return scroller;
}

function StatusHeader({ t, label, runState }: { t: Translate; label: string; runState: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-xs text-text-muted">
      <span className="inline-block size-2 rounded-full bg-success" />
      <span>
        {label}
        {runState === "" ? null : ` ${t("stateBox", { state: runState })}`}
      </span>
    </div>
  );
}

export function ConversationPanel({
  t,
  state,
  handlers,
}: {
  t: Translate;
  state: ConversationState;
  handlers: ConversationHandlers;
}) {
  const scroller = usePinnedScroll(state.messages.length);
  return (
    <div className="flex h-full min-h-[28rem] flex-col">
      <StatusHeader t={t} label={state.stateLabel} runState={state.runState} />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto py-3" ref={scroller}>
        <MessageList
          hidden={Math.max(0, state.messages.length - state.window)}
          loading={state.loading}
          messages={state.messages.slice(-state.window)}
          onOlder={handlers.onOlder}
          t={t}
        />
        {state.linkLost ? (
          <p className="px-4 text-sm text-text-muted">
            {state.needsSignIn ? t("conversationSignIn") : t("conversationLost")}
            {state.turnFailure !== "" ? ` (${state.turnFailure})` : ""}
          </p>
        ) : null}
        {!state.linkLost && state.turnFailure !== "" ? (
          <p className="px-4 text-sm text-text-muted">{state.turnFailure}</p>
        ) : null}
        {state.blocked ? (
          <p className="px-4 text-sm text-text-muted">{t("conversationBlocked")}</p>
        ) : null}
        {state.historyUnavailable ? (
          <p className="px-4 text-sm text-text-muted">{t("conversationHistoryUnavailable")}</p>
        ) : null}
        {state.terminal ? (
          <Button
            variant="ghost"
            size="sm"
            className="px-4 text-sm underline"
            onClick={handlers.onRetry}
            type="button"
          >
            {t("conversationRetry")}
          </Button>
        ) : null}
        <PermissionCards
          computers={state.computers}
          onAnswer={handlers.onAnswer}
          permissionFailed={state.permissionFailed}
          permissions={state.permissions}
          t={t}
        />
      </div>
      <ConversationActions t={t} state={state} handlers={handlers} />
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

export function ComputersPanel({
  computers,
  path,
  result,
  onPath,
  onRead,
}: {
  computers: GrokBotComputer[];
  path: string;
  result: string;
  onPath: (path: string) => void;
  onRead: (computer: GrokBotComputer) => void;
}) {
  return (
    <ul className="space-y-1">
      {computers.map((computer) => {
        const details = [
          computer.machineId,
          computer.localRoot,
          computer.terminalsFolder,
          computer.variant,
          computer.kind,
          computer.serverAuthoritative ? "serverAuthoritative=true" : "",
          computer.lastSeen,
          computer.supervised ? "supervised=true" : "",
          computer.capabilities.join(", "),
        ]
          .filter((value) => value !== "")
          .join(" | ");
        return (
          <li className="break-words text-sm" key={computer.machineId}>
            <div>{computer.label || computer.machineId}</div>
            {details ? <div className="text-xs text-text-muted">{details}</div> : null}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onRead(computer);
              }}
            >
              <Input
                className="min-w-0 flex-1 rounded-control border px-2 py-1 text-xs"
                aria-label="computer file path"
                onChange={(event) => onPath(event.target.value)}
                value={path}
              />
              <Button variant="ghost" size="sm" className="rounded-control border px-2 py-1 text-xs">
                Read file
              </Button>
            </form>
            {result ? <div className="text-xs text-text-muted">{result}</div> : null}
          </li>
        );
      })}
    </ul>
  );
}
