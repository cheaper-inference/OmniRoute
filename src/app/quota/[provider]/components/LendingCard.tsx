"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import Card from "@/shared/components/Card";
import type { SelfQuotaPool } from "@/shared/schemas/selfQuota";

import { describeLending, lendingCardKind, type LendingCardKind } from "../lib/lendingForm";
import type { LendingActions } from "../lib/useLendingSave";
import type { LendingSaveWatch } from "../lib/useLendingSubmit";
import LendingBorrowFacts from "./LendingBorrowFacts";
import LendingForm from "./LendingForm";
import LendingStatusLine from "./LendingStatusLine";
import LendingWithdraw from "./LendingWithdraw";

interface LendingCardProps {
  pool: SelfQuotaPool;
  lending?: LendingActions;
}

/** The card a save keeps on screen: during the save, then while the pool is the one it returned. */
type Hold = { kind: LendingCardKind; until: SelfQuotaPool | "saving" };

function shownKind(pool: SelfQuotaPool, hold: Hold | null): LendingCardKind {
  if (hold && (hold.until === "saving" || hold.until === pool)) return hold.kind;
  return lendingCardKind(pool);
}

/**
 * The holder's own consent to lend idle share in one pool. A consent pool gets the form. A pool
 * that does not lend by consent but stores a percentage gets a withdrawal. A save keeps the card
 * and its message until the page's data changes again, even when the saved view needs no card.
 */
export default function LendingCard({ pool, lending }: LendingCardProps) {
  const t = useTranslations("quotaSelf");
  const [hold, setHold] = useState<Hold | null>(null);
  const kind = shownKind(pool, hold);
  if (!lending || kind === "none") return null;
  // Held after a save whose view needs another card: only what is in force and the message stay.
  const settled = kind !== lendingCardKind(pool);

  const watch: LendingSaveWatch = {
    onStart: () => setHold({ kind, until: "saving" }),
    onEnd: (saved) => setHold(saved ? { kind, until: saved } : null),
  };
  const status = describeLending(pool);

  return (
    <Card padding="sm" title={t("lendingTitle")} className="min-w-0">
      {kind === "full" ? (
        <div className="min-w-0 space-y-3">
          {settled ? null : (
            <p className="break-words text-sm text-text-muted">{t("lendingIntro")}</p>
          )}
          <LendingStatusLine status={status} />
          <LendingForm
            poolRef={pool.ref}
            status={status}
            lending={lending}
            watch={watch}
            settled={settled}
          />
          {settled ? null : <LendingBorrowFacts pool={pool} />}
        </div>
      ) : (
        <LendingWithdraw pool={pool} lending={lending} watch={watch} />
      )}
    </Card>
  );
}
