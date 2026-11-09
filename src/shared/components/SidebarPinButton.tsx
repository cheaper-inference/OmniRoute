"use client";

import { useTranslations } from "next-intl";
import { usePinnedSidebarItems } from "@/shared/hooks/usePinnedSidebarItems";
import Button from "./Button";
import Icon from "./Icon";

export default function SidebarPinButton({ itemId }: { itemId: string }) {
  const t = useTranslations("sidebar");
  const { pinnedItems, togglePinItem } = usePinnedSidebarItems();
  const pinned = pinnedItems.has(itemId);
  return (
    <Button
      variant="outline"
      size="sm"
      className="shrink-0"
      aria-pressed={pinned}
      onClick={() => togglePinItem(itemId)}
    >
      <Icon name="push_pin" size={16} fill={pinned} />
      {t(pinned ? "unpinItem" : "pinItem")}
    </Button>
  );
}
