"use client";

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import SegmentedControl from "@/shared/components/SegmentedControl";
import Select from "@/shared/components/Select";
import type { ListFilters } from "@/mitm/inspector/types";
import type { AgentId } from "@/mitm/types";
import { cn } from "@/shared/utils/cn";
import { SessionRecorderBar } from "./session/SessionRecorderBar";
import { SessionPicker } from "./session/SessionPicker";
import type { SessionInfo } from "../hooks/useSessionRecorder";

type Profile = "llm" | "custom" | "all";

// PROFILES labels are resolved inside the component via useTranslations
const PROFILE_IDS: Profile[] = ["llm", "custom", "all"];

interface TopBarControlsProps {
  filters: ListFilters;
  onProfileChange: (p: Profile) => void;
  onHostChange: (h: string | undefined) => void;
  onAgentChange: (a: AgentId | undefined) => void;
  onStatusChange: (s: ListFilters["status"]) => void;
  liveOnly: boolean;
  onToggleLive: () => void;
  paused: boolean;
  onPause: () => void;
  onResume: () => void;
  onClear: () => void;
  onExport: () => void;
  connected: boolean;
  total: number;
  maxSize?: number;
  pendingCount?: number;
  // session recorder
  recording: boolean;
  session: SessionInfo | null;
  elapsed: number;
  sessions: SessionInfo[];
  onRecordStart: () => void;
  onRecordStop: () => void;
  onSessionSelect: (id: string | undefined) => void;
  onSessionDelete: (id: string) => void;
}

export function TopBarControls({
  filters,
  onProfileChange,
  onHostChange,
  onAgentChange,
  onStatusChange,
  liveOnly,
  onToggleLive,
  paused,
  onPause,
  onResume,
  onClear,
  onExport,
  connected,
  total,
  maxSize = 1000,
  pendingCount = 0,
  recording,
  session,
  elapsed,
  sessions,
  onRecordStart,
  onRecordStop,
  onSessionSelect,
  onSessionDelete,
}: TopBarControlsProps) {
  const t = useTranslations("trafficInspector");
  const profile: Profile = (filters.profile as Profile) ?? "llm";

  const profileLabels: Record<Profile, string> = {
    llm: t("profileLlmOnly"),
    custom: t("profileCustom"),
    all: t("profileAll"),
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-bg-subtle px-3 py-2">
      {/* Profile selector */}
      <SegmentedControl
        size="sm"
        aria-label={t("trafficProfile")}
        value={profile}
        onChange={(next) => onProfileChange(next as Profile)}
        options={PROFILE_IDS.map((id) => ({ value: id, label: profileLabels[id] }))}
      />

      {/* Host filter */}
      <Input
        type="text"
        placeholder={t("filterHost")}
        aria-label={t("filterHost")}
        defaultValue={filters.host ?? ""}
        onChange={(e) => onHostChange(e.target.value || undefined)}
        className="w-40"
      />

      {/* Status filter */}
      <Select
        aria-label={t("filterStatus")}
        value={filters.status ?? ""}
        onChange={(e) => onStatusChange((e.target.value as ListFilters["status"]) || undefined)}
        placeholderDisabled={false}
        options={[
          { value: "", label: t("anyStatus") },
          { value: "2xx", label: "2xx" },
          { value: "3xx", label: "3xx" },
          { value: "4xx", label: "4xx" },
          { value: "5xx", label: "5xx" },
          { value: "error", label: "error" },
        ]}
        className="w-36"
      />

      {/* Live (in-flight) toggle — Gap 5 */}
      <Button
        size="sm"
        variant={liveOnly ? "primary" : "outline"}
        icon="sensors"
        onClick={onToggleLive}
        aria-pressed={liveOnly}
        title={t("liveOnly")}
      >
        {t("liveOnly")}
      </Button>

      {/* Action buttons */}
      <Button
        size="sm"
        variant="outline"
        icon={paused ? "play_arrow" : "pause"}
        onClick={paused ? onResume : onPause}
        title={paused ? t("resumeBtn") : t("pauseBtn")}
      >
        {paused ? t("resumeBtn") : t("pauseBtn")}
      </Button>

      <Button
        size="sm"
        variant="outline"
        icon="delete_sweep"
        onClick={onClear}
        title={t("clearBtn")}
      >
        {t("clearBtn")}
      </Button>

      <Button size="sm" variant="outline" icon="download" onClick={onExport} title={t("exportHar")}>
        {t("exportHar")}
      </Button>

      {/* Session controls */}
      <div className="flex items-center gap-2 ml-auto">
        <SessionPicker
          sessions={sessions}
          selectedId={filters.sessionId}
          onSelect={onSessionSelect}
          onDelete={onSessionDelete}
        />
        <SessionRecorderBar
          recording={recording}
          session={session}
          elapsed={elapsed}
          onStart={onRecordStart}
          onStop={onRecordStop}
        />

        {/* Live indicator */}
        <div
          data-testid="live-indicator"
          className="flex items-center gap-1.5 text-xs text-text-muted"
        >
          <span
            aria-hidden="true"
            className={cn(
              "inline-block h-2 w-2 rounded-full",
              connected ? "bg-success animate-pulse" : "bg-text-muted"
            )}
          />
          {connected ? t("liveBadge") : t("offlineBadge")}
          <span className="text-text-muted font-mono">
            {total}/{maxSize}
          </span>
          {paused && pendingCount > 0 && (
            <Badge variant="warning" size="sm">
              {t("pausedNewBadge", { count: pendingCount })}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
