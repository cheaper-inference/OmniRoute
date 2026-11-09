import { containsMediaKind, type MediaKind } from "../../utils/mediaParts.ts";
import { ciTransportSupportsInput } from "../../utils/ciTransportInput.ts";
import {
  getInputModalities,
  getResolvedModelCapabilities,
  isTextOnlyChatTransport,
} from "../modelCapabilities.ts";
import type { ResolvedComboTarget } from "./types.ts";
import type { RequestCompatibilityRequirements } from "./comboStructure.ts";

export type MediaRequirements = {
  requiresAudio?: boolean;
  requiresVideo?: boolean;
  requiresPdf?: boolean;
  requiresFiles?: boolean;
};

export function requestMediaRequirements(
  body: Record<string, unknown>
): Required<MediaRequirements> {
  const has = (kind: MediaKind) =>
    containsMediaKind(
      [{ content: [body.messages, body.input, body.contents, body.attachments] }],
      kind
    );
  return {
    requiresAudio: has("audio"),
    requiresVideo: has("video"),
    requiresPdf: has("document"),
    requiresFiles: has("file"),
  };
}
export function hasMediaRequirements(requirements: RequestCompatibilityRequirements): boolean {
  return Boolean(
    requirements.requiresVision ||
    requirements.requiresAudio ||
    requirements.requiresVideo ||
    requirements.requiresPdf ||
    requirements.requiresFiles
  );
}
/** Find required media the transport denies, preserving unknown non-CI PDF/file eligibility. */
export function nonImageMediaFailures(
  target: Pick<ResolvedComboTarget, "provider" | "providerId" | "modelStr" | "connectionId">,
  requirements: MediaRequirements
): string[] {
  if (
    !requirements.requiresAudio &&
    !requirements.requiresVideo &&
    !requirements.requiresPdf &&
    !requirements.requiresFiles
  )
    return [];
  const caps = getResolvedModelCapabilities({
    provider: target.providerId || target.provider,
    model: target.modelStr,
  });
  const declared = getInputModalities(caps.provider, caps.model, undefined, target.connectionId);
  const textOnly = isTextOnlyChatTransport(caps.provider);
  const ciProvider = caps.provider === "cinf" || caps.provider === "cheaperinference";
  // Preserve unknown PDF/file eligibility on other providers; explicit declarations
  // and proven CI transport limits still override permissive fallback behavior.
  /** Prefer explicit declarations and verified transport limits over compatibility fallbacks. */
  const supports = (kind: string, fallback: boolean | null | undefined) =>
    !textOnly &&
    ciTransportSupportsInput(caps.provider ?? "", caps.model ?? "", kind) &&
    (declared
      ? declared.includes(kind) || (kind === "pdf" && declared.includes("file"))
      : fallback === true ||
        (!ciProvider && (kind === "pdf" || kind === "file") && fallback == null));
  return [
    requirements.requiresAudio && !supports("audio", caps.supportsAudio) ? "audio" : null,
    requirements.requiresVideo && !supports("video", caps.supportsVideo) ? "video" : null,
    requirements.requiresPdf && !supports("pdf", caps.supportsPdf) ? "pdf" : null,
    requirements.requiresFiles && !supports("file", caps.supportsFiles) ? "file" : null,
  ].filter((value): value is string => value !== null);
}
