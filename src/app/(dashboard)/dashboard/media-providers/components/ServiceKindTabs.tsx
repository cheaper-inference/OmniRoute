"use client";

import { useTranslations } from "next-intl";
import SegmentedControl from "@/shared/components/SegmentedControl";
import type { ServiceKind } from "@/shared/constants/providers";

const KIND_ICON: Record<ServiceKind, string> = {
  llm: "chat",
  embedding: "data_object",
  image: "image",
  imageToText: "image_search",
  tts: "record_voice_over",
  stt: "mic",
  webSearch: "search",
  webFetch: "language",
  video: "videocam",
  music: "music_note",
  ocr: "document_scanner",
};

interface ServiceKindTabsProps {
  kinds: ServiceKind[];
  activeKind: ServiceKind;
  onSelect: (kind: ServiceKind) => void;
  className?: string;
}

/**
 * Horizontal tab-strip for switching between provider service kinds
 * (embedding, image, tts, etc.) — the kit capsule tabs via the SegmentedControl adapter.
 */
export function ServiceKindTabs({ kinds, activeKind, onSelect, className }: ServiceKindTabsProps) {
  const t = useTranslations("media");

  if (kinds.length <= 1) return null;

  return (
    <SegmentedControl
      aria-label={t("serviceKindsAria")}
      className={className}
      size="sm"
      value={activeKind}
      onChange={(next) => onSelect(next as ServiceKind)}
      options={kinds.map((kind) => ({
        value: kind,
        label: t(`kinds.${kind}`),
        icon: KIND_ICON[kind] ?? "category",
      }))}
    />
  );
}
