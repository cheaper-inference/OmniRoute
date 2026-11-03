"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "@/shared/hooks/useTheme";
import Button from "./Button";
import Icon from "./Icon";

export default function ThemeToggle({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "card";
}) {
  const { toggleTheme, isDark } = useTheme();
  const t = useTranslations("header");
  const label = isDark ? t("switchToLightMode") : t("switchToDarkMode");
  return (
    <Button
      variant={variant === "card" ? "outline" : "ghost"}
      size="icon"
      className={className}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Icon name={isDark ? "light_mode" : "dark_mode"} size={20} />
    </Button>
  );
}
