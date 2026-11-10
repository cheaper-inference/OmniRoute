"use client";
import { useState } from "react";
import { readJson, errorKey, type Detail, type Team, type TeamKeyOption } from "./helpers";
import type { TeamPayload } from "./TeamForm";

export type Confirmation =
  | { kind: "archive"; team: Team }
  | { kind: "remove"; team: Team; keyId: string }
  | { kind: "transfer"; team: Team; key: TeamKeyOption };

interface Options {
  detail: Detail | undefined;
  /** Re-reads the team list and the selected detail; each read reports its own failure. */
  reloadReads: () => Promise<unknown>;
  select: (id: string, replace?: boolean) => void;
}

type Perform = (url: string, method: string, body?: unknown) => Promise<boolean>;

function runConfirmation(perform: Perform, operation: Confirmation): Promise<boolean> {
  const url = `/api/teams/${operation.team.id}`;
  if (operation.kind === "transfer") {
    return perform(url + "/members", "PUT", {
      apiKeyId: operation.key.id,
      expectedTeamId: operation.key.teamId,
    });
  }
  if (operation.kind === "remove") {
    return perform(url + `/members?apiKeyId=${encodeURIComponent(operation.keyId)}`, "DELETE");
  }
  return perform(url, "DELETE");
}

function writeTeam(target: Team | null, payload: TeamPayload) {
  return readJson<{ team: Team }>(target ? `/api/teams/${target.id}` : "/api/teams", {
    method: target ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/** Pending flag + error key shared by every write; `withWrite` runs one write end to end. */
function useWriteState() {
  const [pending, setPending] = useState(false);
  const [mutationError, setMutationError] = useState("");
  async function withWrite<T>(work: () => Promise<T>, fallback: T): Promise<T> {
    setPending(true);
    setMutationError("");
    try {
      return await work();
    } catch (error) {
      setMutationError(errorKey(error));
      return fallback;
    } finally {
      setPending(false);
    }
  }
  return { pending, mutationError, setMutationError, withWrite };
}

/** The edit form and the confirmation dialog; opening either clears the stale error. */
function useTeamDialogs(pending: boolean, clearError: () => void) {
  const [form, setForm] = useState<{ team: Team | null } | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  return {
    form,
    confirmation,
    dismissForm: () => setForm(null),
    dismissConfirmation: () => setConfirmation(null),
    closeForm: () => {
      if (!pending) setForm(null);
    },
    closeConfirmation: () => {
      if (!pending) setConfirmation(null);
    },
    ask: (next: Confirmation) => {
      clearError();
      setConfirmation(next);
    },
    openForm: (team: Team | null) => {
      clearError();
      setForm({ team });
    },
  };
}

/** Owns every Team write: pending flag, error key, edit form and confirmation dialog. */
export function useTeamMutations({ detail, reloadReads, select }: Options) {
  const { pending, mutationError, setMutationError, withWrite } = useWriteState();
  const dialogs = useTeamDialogs(pending, () => setMutationError(""));
  const { form, confirmation, ask } = dialogs;
  const blocked = pending || Boolean(form || confirmation);

  async function refresh() {
    setMutationError("");
    await reloadReads();
  }
  async function perform(url: string, method: string, body?: unknown): Promise<boolean> {
    if (pending) return false;
    return withWrite(async () => {
      await readJson(url, {
        method,
        headers: { "Content-Type": "application/json" },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      });
      // The write already succeeded. Each read hook owns and displays its refresh error;
      // never leave a successful mutation ready to replay just because a read failed.
      await reloadReads();
      return true;
    }, false);
  }
  async function save(payload: TeamPayload) {
    if (!form || pending) return;
    const target = form.team;
    await withWrite(async () => {
      const result = await writeTeam(target, payload);
      await reloadReads();
      select(result.team.id);
      dialogs.dismissForm();
    }, undefined);
  }
  async function assign(key: TeamKeyOption) {
    if (!detail || blocked || detail.team.status !== "active") return;
    const target = detail.team;
    if (key.teamId && key.teamId !== target.id) {
      ask({ kind: "transfer", team: target, key });
      return;
    }
    await perform(`/api/teams/${target.id}/members`, "PUT", {
      apiKeyId: key.id,
      expectedTeamId: key.teamId,
    });
  }
  async function confirm() {
    if (!confirmation || pending) return;
    const operation = confirmation;
    if (await runConfirmation(perform, operation)) {
      dialogs.dismissConfirmation();
      if (operation.kind === "archive") select("", true);
    }
  }
  function requestRemove(keyId: string) {
    if (blocked || !detail) return;
    ask({ kind: "remove", team: detail.team, keyId });
  }

  return {
    ...dialogs,
    pending,
    blocked,
    mutationError,
    refresh,
    save,
    assign,
    confirm,
    requestRemove,
  };
}
