"use client";

import { useTranslations } from "next-intl";
import { EmptyState } from "@omniroute/ui-kit/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Badge, Button } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import ProviderIcon from "@/shared/components/ProviderIcon";
import {
  compareEmptyMessageKey,
  type ModelComparisonGroup,
  type ModelOffer,
} from "./pricingCompare";

function formatPrice(value: number): string {
  if (value === 0) return "$0";
  // Cents for ordinary prices; three significant digits for sub-dime ones ($0.0196).
  return value >= 0.1 ? `$${value.toFixed(2)}` : `$${Number(value.toPrecision(3))}`;
}

function PriceCell({ value, offer }: { value: number | null; offer: ModelOffer }) {
  const t = useTranslations("settings");
  if (!offer.priced) {
    return <span className="text-text-muted italic">{t("pricingUnpriced")}</span>;
  }
  return <span className="tabular-nums">{value === null ? "—" : formatPrice(value)}</span>;
}

function ModelGroupCard({ group }: { group: ModelComparisonGroup }) {
  const t = useTranslations("settings");
  return (
    <div className="rounded-lg border border-border/40 bg-bg-subtle/30 p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-sm truncate">{group.name}</span>
        <code className="text-xs text-text-muted truncate">{group.key}</code>
        <Badge size="sm" variant="info" className="ml-auto">
          {new Set(group.offers.map((offer) => offer.providerAlias)).size} {t("providers")}
        </Badge>
      </div>
      <Table scrollbarLabel={group.name} className="text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>{t("providers")}</TableHead>
            <TableHead>{t("model")}</TableHead>
            <TableHead className="w-24 text-right">{t("input")}</TableHead>
            <TableHead className="w-24 text-right">{t("output")}</TableHead>
            <TableHead className="w-24 text-right">{t("cached")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.offers.map((offer, index) => {
            const cheapest = index === 0 && offer.priced;
            return (
              <TableRow
                key={`${offer.providerAlias}/${offer.modelId}`}
                className={cheapest ? "text-success font-medium" : undefined}
              >
                <TableCell>
                  <span className="flex items-center gap-2">
                    <ProviderIcon providerId={offer.providerId} size={18} type="color" />
                    {offer.providerAlias}
                  </span>
                </TableCell>
                <TableCell>
                  <code className="text-xs">{offer.modelId}</code>
                </TableCell>
                <TableCell className="text-right">
                  <PriceCell value={offer.input} offer={offer} />
                </TableCell>
                <TableCell className="text-right">
                  <PriceCell value={offer.output} offer={offer} />
                </TableCell>
                <TableCell className="text-right">
                  <PriceCell value={offer.cached} offer={offer} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Costs > Pricing "Compare models" view (#18642): one card per model, its offers across
 * providers cheapest first; the cheapest priced offer is highlighted.
 */
export default function PricingCompareView({
  groups,
  searchQuery,
  providerCount,
  visibleCount,
  onShowMore,
  showMoreIncrement,
}: {
  groups: ModelComparisonGroup[];
  searchQuery: string;
  /** Providers left after the Auth and Configured filters. */
  providerCount: number;
  visibleCount: number;
  onShowMore: () => void;
  showMoreIncrement: number;
}) {
  const t = useTranslations("settings");
  if (groups.length === 0) {
    return (
      <EmptyState
        compact
        icon={<Icon name="search_off" size={24} />}
        title={t(compareEmptyMessageKey({ searchQuery, providerCount }))}
      />
    );
  }
  const remaining = groups.length - visibleCount;
  return (
    <div className="flex flex-col gap-2">
      {groups.slice(0, visibleCount).map((group) => (
        <ModelGroupCard key={group.key} group={group} />
      ))}
      {remaining > 0 && (
        <Button
          variant="outline"
          size="sm"
          icon="expand_more"
          onClick={onShowMore}
          className="mt-2 mx-auto"
        >
          {t("pricingShowMoreProviders", {
            count: Math.min(showMoreIncrement, remaining),
            remaining,
          })}
        </Button>
      )}
    </div>
  );
}
