"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@omniroute/ui-kit/dropdown-menu";
import { LANGUAGES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { useLocale, useTranslations } from "next-intl";
import { persistLocale } from "@/shared/lib/persistLocale";
import Button from "./Button";
import Icon from "./Icon";

function CountryFlag({ emoji, alt }: { emoji: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!emoji) return null;

  const chars = [...emoji];
  const codePoints = chars.map((c) => c.codePointAt(0) || 0);
  const isRegional = codePoints.every((cp) => cp >= 127462 && cp <= 127487);

  if (!isRegional || codePoints.length !== 2 || error) {
    return <span className="text-base leading-none shrink-0">{emoji}</span>;
  }

  const countryCode = codePoints.map((cp) => String.fromCharCode(cp - 127462 + 97)).join("");

  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      className="w-4.5 h-3 object-cover rounded-2xs shrink-0 shadow-2xs border border-border/50"
      alt={alt}
      onError={() => setError(true)}
    />
  );
}

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations("header");
  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];
  // WCAG 2.5.3: the accessible name starts from the purpose and contains the visible label.
  const triggerLabel = `${t("language")}: ${currentLang.label} — ${currentLang.name}`;

  const handleSelect = (code: Locale) => {
    if (code === locale) return;
    persistLocale(code);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={triggerLabel} title={triggerLabel}>
          <CountryFlag emoji={currentLang.flag} alt="" />
          <span className="hidden text-xs sm:inline">{currentLang.label}</span>
          <Icon name="expand_more" size={14} />
        </Button>
      </DropdownMenuTrigger>
      {/* align="end" anchors to the inline-end edge; floating-ui mirrors it under dir=rtl */}
      <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(code) => handleSelect(code as Locale)}
        >
          {LANGUAGES.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code}>
              <CountryFlag emoji={lang.flag} alt="" />
              <span className="ms-2 text-start">{lang.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
