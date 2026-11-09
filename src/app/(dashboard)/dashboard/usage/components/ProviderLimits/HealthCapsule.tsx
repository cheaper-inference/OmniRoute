"use client";
import type { CSSProperties } from "react";
import { DISPLAY_COLORS, isCooldownKind, type DisplayKind } from "./availabilityDisplay";
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
  // A cooldown capsule holds "time already waited", not remaining quota. It
  // fills from the top so it cannot be read as a battery that still has charge.
  const cooldown = isCooldownKind(kind);
  // `fill` comes from the projection, but clamp here so a future producer
  // cannot push the bar outside the capsule or hand us a non-finite number.
  const height = fill !== null && Number.isFinite(fill) ? Math.max(0, Math.min(100, fill)) : null;
  return (
    <>
      {height !== null && (
        <span
          data-fill
          data-fill-direction={cooldown ? "down" : "up"}
          className="absolute inset-x-0 bg-[var(--capsule-color)]"
          style={{
            height: `${height}%`,
            top: cooldown ? 0 : undefined,
            bottom: cooldown ? undefined : 0,
          }}
        />
      )}
      {partial && kind === "ok" && (
        <span data-partial className="absolute inset-x-0 top-0 h-[6px] bg-warning" />
      )}
    </>
  );
}
