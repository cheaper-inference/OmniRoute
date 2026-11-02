"use client";

import Checkbox from "@/shared/components/Checkbox";

export default function ModelVisionOverrideEditor({
  modelId,
  value,
  onSave,
  saving,
  t,
}: {
  modelId: string;
  value?: boolean | null;
  onSave?: (modelId: string, value: boolean | null) => Promise<boolean>;
  saving?: boolean;
  t: (key: string) => string;
}) {
  if (!onSave) return null;
  return (
    <span className="inline-flex" title={t("visionCapableHint")}>
      <Checkbox
        aria-label={t("visionCapableLabel")}
        label={
          <span className="text-[11px] font-normal text-text-muted">{t("visionCapableLabel")}</span>
        }
        className="items-center gap-1"
        checked={value === true}
        disabled={saving}
        onChange={(event) => void onSave(modelId, event.target.checked ? true : null)}
      />
    </span>
  );
}
