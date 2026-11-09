"use client";

import Badge from "@/shared/components/Badge";
import Icon from "@/shared/components/Icon";

interface TokenBadgeProps {
  tokensIn?: number | null;
  tokensOut?: number | null;
}

export function TokenBadge({ tokensIn, tokensOut }: TokenBadgeProps) {
  if (!tokensIn && !tokensOut) return null;

  return (
    <Badge variant="info" size="sm" className="font-mono" icon={<Icon name="token" size={12} />}>
      {tokensIn != null && <span>{tokensIn}↑</span>}
      {tokensOut != null && <span>{tokensOut}↓</span>}
    </Badge>
  );
}
