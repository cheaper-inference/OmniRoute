"use client";
import type { CSSProperties } from "react";
import { DISPLAY_COLORS, type DisplayKind } from "./availabilityDisplay";
export function capsuleStyle(kind: DisplayKind): CSSProperties {
  const color = DISPLAY_COLORS[kind];
  return {
    "--capsule-color": color,
    background:
      kind === "act" || kind === "empty"
        ? "transparent"
        : kind === "paused"
          ? color
          : "color-mix(in srgb, var(--capsule-color) 28%, transparent)",
    boxShadow:
      kind === "empty"
        ? "none"
        : `inset 0 0 0 ${kind === "act" ? 2 : 1}px ${kind === "act" ? color : "color-mix(in srgb, var(--capsule-color) 45%, transparent)"}`,
  } as CSSProperties;
}
export const CAPSULE_CLASS =
  "relative h-[32px] w-[9px] grow-0 shrink-0 overflow-hidden rounded-full";
export function CapsuleWater({
  kind,
  fill,
  partial,
}: {
  kind: DisplayKind;
  fill: number | null;
  partial?: boolean;
}) {
  return (
    <>
      {fill !== null && (
        <span
          data-fill
          className="absolute inset-x-0 bottom-0 bg-[var(--capsule-color)]"
          style={{ height: `${fill}%` }}
        />
      )}
      {partial && kind === "ok" && (
        <span data-partial className="absolute inset-x-0 top-0 h-[6px] bg-warning" />
      )}
    </>
  );
}
