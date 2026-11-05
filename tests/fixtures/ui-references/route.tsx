"use client";
import { useTranslations } from "next-intl";
export function Fixture() {
  const t = useTranslations("combos");
  return t("reorderAll");
}
