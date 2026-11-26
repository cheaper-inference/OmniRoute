"use client";

import Card from "@/shared/components/Card";
import { useTranslations } from "next-intl";
import { Toggle } from "@/shared/components";

type CcCompatibleRequestDefaultsFieldsProps = {
  values: {
    ccCompatibleContext1m: boolean;
    ccCompatibleRedactThinking: boolean;
    ccCompatibleSummarizeThinking: boolean;
  };
  onChange: (patch: Partial<CcCompatibleRequestDefaultsFieldsProps["values"]>) => void;
};

export default function CcCompatibleRequestDefaultsFields(
  props: CcCompatibleRequestDefaultsFieldsProps
) {
  const t = useTranslations("providers");

  return (
    <Card.Section className="flex flex-col gap-4">
      <Toggle
        checked={props.values.ccCompatibleContext1m}
        onChange={(checked) => props.onChange({ ccCompatibleContext1m: checked })}
        label={t("ccCompatibleContext1mLabel")}
        description={t("ccCompatibleContext1mDescription")}
      />
      <Toggle
        checked={props.values.ccCompatibleRedactThinking}
        onChange={(checked) => props.onChange({ ccCompatibleRedactThinking: checked })}
        label={t("ccCompatibleRedactThinkingLabel")}
        description={t("ccCompatibleRedactThinkingDescription")}
      />
      <Toggle
        checked={props.values.ccCompatibleSummarizeThinking}
        onChange={(checked) => props.onChange({ ccCompatibleSummarizeThinking: checked })}
        label={t("ccCompatibleSummarizeThinkingLabel")}
        description={t("ccCompatibleSummarizeThinkingDescription")}
      />
    </Card.Section>
  );
}
