"use client";

import Link from "next/link";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

interface ProviderOnboardingHeaderProps {
  title: string;
  description: string;
  backLabel: string;
  closeLabel: string;
  onClose: () => void;
}

/**
 * Title block of /providers/new: the compact kit PageHeader, as on /providers/[id], so the
 * title scales down on phones instead of a loose `text-3xl` heading (#18070).
 */
export default function ProviderOnboardingHeader({
  title,
  description,
  backLabel,
  closeLabel,
  onClose,
}: ProviderOnboardingHeaderProps) {
  return (
    <PageHeader
      compact
      breadcrumbs={
        <Link
          href="/dashboard/providers"
          className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          <Icon name="arrow_back" size={18} />
          {backLabel}
        </Link>
      }
      title={title}
      description={description}
      actions={
        <Button variant="ghost" onClick={onClose}>
          {closeLabel}
        </Button>
      }
    />
  );
}
