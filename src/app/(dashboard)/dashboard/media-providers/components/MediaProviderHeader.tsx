"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Badge from "@/shared/components/Badge";
import Icon from "@/shared/components/Icon";
import ProviderIcon from "@/shared/components/ProviderIcon";

interface MediaProviderHeaderProps {
  providerId: string;
  providerName: string;
  providerColor?: string;
  kindLabel: string;
  website?: string;
  hasFree?: boolean;
  freeNote?: string;
  backHref: string;
}

export default function MediaProviderHeader({
  providerId,
  providerName,
  providerColor,
  kindLabel,
  website,
  hasFree,
  freeNote,
  backHref,
}: MediaProviderHeaderProps) {
  const t = useTranslations("media");
  const tc = useTranslations("common");

  return (
    <PageHeader
      compact
      breadcrumbs={
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main transition-colors w-fit"
        >
          <Icon name="arrow_back" size={16} />
          {t("backToProviders")}
        </Link>
      }
      eyebrow={
        <span className="flex flex-wrap items-center gap-2">
          <Badge>{kindLabel}</Badge>
          {hasFree && <Badge variant="success">{tc("free")}</Badge>}
        </span>
      }
      title={
        <span className="inline-flex items-center gap-3">
          {/* Brand tint behind the provider logo (provider data colour, not a theme token). */}
          <span
            className="size-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${providerColor ?? "#64748b"}20` }}
            aria-hidden="true"
          >
            <ProviderIcon providerId={providerId} size={28} type="color" />
          </span>
          {providerName}
        </span>
      }
      description={
        freeNote || website ? (
          <>
            {freeNote && <span className="block">{freeNote}</span>}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
              >
                <Icon name="open_in_new" size={13} />
                {website}
              </a>
            )}
          </>
        ) : undefined
      }
    />
  );
}
