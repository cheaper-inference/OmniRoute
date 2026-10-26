"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";
import type { SessionInfo } from "../../hooks/useSessionRecorder";

interface SessionPickerProps {
  sessions: SessionInfo[];
  selectedId?: string;
  onSelect: (id: string | undefined) => void;
  onDelete: (id: string) => void;
}

export function SessionPicker({ sessions, selectedId, onSelect, onDelete }: SessionPickerProps) {
  const t = useTranslations("trafficInspector");
  const [open, setOpen] = useState(false);

  const selected = sessions.find((s) => s.id === selectedId);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Icon name="folder_open" size={14} />
        {selected
          ? (selected.name ?? t("sessionName", { id: selected.id.slice(0, 6) }))
          : t("sessions")}
        <Icon name={open ? "expand_less" : "expand_more"} size={12} />
      </Button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-card border border-border bg-surface py-1 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="justify-start rounded-none text-text-muted"
            onClick={() => {
              onSelect(undefined);
              setOpen(false);
            }}
          >
            {t("allTraffic")}
          </Button>
          {sessions.length === 0 && (
            <p className="px-3 py-2 text-xs text-text-muted italic">{t("noSessionsYet")}</p>
          )}
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center group">
              <Button
                variant="ghost"
                size="sm"
                aria-current={selectedId === s.id ? "true" : undefined}
                className={cn(
                  "min-w-0 flex-1 justify-start rounded-none",
                  selectedId === s.id ? "font-semibold text-text-main" : "text-text-main"
                )}
                onClick={() => {
                  onSelect(s.id);
                  setOpen(false);
                }}
              >
                {s.name ?? t("sessionName", { id: s.id.slice(0, 6) })}
                <span className="text-text-muted ml-1">
                  ({t("requestCountShort", { count: s.requestCount })})
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                icon="delete"
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                onClick={() => {
                  onDelete(s.id);
                  if (selectedId === s.id) onSelect(undefined);
                }}
                aria-label={t("deleteSession")}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
