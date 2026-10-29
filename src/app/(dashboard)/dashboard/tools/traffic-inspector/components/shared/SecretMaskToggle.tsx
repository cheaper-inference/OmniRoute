"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";

interface SecretMaskToggleProps {
  masked: boolean;
  onToggle: () => void;
}

export function SecretMaskToggle({ masked, onToggle }: SecretMaskToggleProps) {
  const t = useTranslations("trafficInspector");
  return (
    <Button
      variant="outline"
      size="sm"
      icon={masked ? "visibility_off" : "visibility"}
      aria-pressed={!masked}
      onClick={onToggle}
    >
      {masked ? t("showSecrets") : t("maskSecrets")}
    </Button>
  );
}
