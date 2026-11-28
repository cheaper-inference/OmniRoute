"use client";

import { useMemo, useSyncExternalStore } from "react";

/** Sessions-list columns the picker can hide; the details button is always there. */
export const SESSION_COLUMNS = [
  "member",
  "project",
  "client",
  "branch",
  "requests",
  "errors",
  "activeTime",
  "mainModel",
  "input",
  "output",
  "cache",
  "reasoning",
  "cost",
  "firstSeen",
  "lastActive",
] as const;
export type SessionColumn = (typeof SESSION_COLUMNS)[number];
export type SessionColumnVisibility = Record<SessionColumn, boolean>;

/** Hidden until asked for: the window start and reasoning tokens. */
const HIDDEN_BY_DEFAULT: readonly SessionColumn[] = ["firstSeen", "reasoning"];

export const SESSION_COLUMNS_STORAGE_KEY = "omniroute.teamReports.sessionColumns";

export function defaultSessionColumns(): SessionColumnVisibility {
  return Object.fromEntries(
    SESSION_COLUMNS.map((column) => [column, !HIDDEN_BY_DEFAULT.includes(column)])
  ) as SessionColumnVisibility;
}

/** The saved choice over the defaults; anything that is not a known boolean is ignored. */
export function readSessionColumns(raw: string | null): SessionColumnVisibility {
  const visibility = defaultSessionColumns();
  if (!raw) return visibility;
  try {
    const saved: unknown = JSON.parse(raw);
    if (saved && typeof saved === "object") {
      for (const column of SESSION_COLUMNS) {
        const value = (saved as Record<string, unknown>)[column];
        if (typeof value === "boolean") visibility[column] = value;
      }
    }
  } catch {
    // A corrupt entry falls back to the defaults.
  }
  return visibility;
}

const listeners = new Set<() => void>();
/** The choice of this visit when storage refuses the write. */
let unsaved: string | null | undefined;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readStored(): string | null {
  if (unsaved !== undefined) return unsaved;
  try {
    return window.localStorage.getItem(SESSION_COLUMNS_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Column visibility of the sessions list, saved in localStorage; the server render has the defaults. */
export function useSessionColumns() {
  const stored = useSyncExternalStore(subscribe, readStored, () => null);
  const visible = useMemo(() => readSessionColumns(stored), [stored]);

  const toggle = (column: string) => {
    if (!(column in visible)) return;
    const next = JSON.stringify({ ...visible, [column]: !visible[column as SessionColumn] });
    try {
      window.localStorage.setItem(SESSION_COLUMNS_STORAGE_KEY, next);
      unsaved = undefined;
    } catch {
      unsaved = next;
    }
    listeners.forEach((notify) => notify());
  };

  return { visible, toggle };
}
