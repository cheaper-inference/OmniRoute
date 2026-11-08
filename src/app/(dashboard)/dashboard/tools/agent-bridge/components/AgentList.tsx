"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import SegmentedControl from "@/shared/components/SegmentedControl";
import { AgentCard } from "./AgentCard";
import type { MitmTargetView } from "@/mitm/types";
import type {
  AgentStateEntry,
  AgentMappingsMap,
  AgentBridgeServerState,
} from "../AgentBridgePageClient";
import type { MappingRow } from "./ModelMappingTable";

interface AgentListProps {
  targets: MitmTargetView[];
  agentStates: AgentStateEntry[];
  serverRunning: boolean;
  serverState: AgentBridgeServerState;
  mappingsMap: AgentMappingsMap;
  onDnsToggle: (agentId: string, enabled: boolean) => Promise<void>;
  onMappingsSave: (agentId: string, mappings: MappingRow[]) => Promise<void>;
  onReset: (agentId: string) => Promise<boolean>;
}

type SetupFilter = "all" | "active" | "setup-required" | "investigating";

/**
 * Grid of agent cards with filter + search controls.
 * Matches plan 11 §3 IDE Agents section.
 */
export function AgentList({
  targets,
  agentStates,
  serverRunning,
  serverState,
  mappingsMap,
  onDnsToggle,
  onMappingsSave,
  onReset,
}: AgentListProps) {
  const t = useTranslations("agentBridge");
  const [filter, setFilter] = useState<SetupFilter>("all");
  const [search, setSearch] = useState("");

  const stateByAgent = Object.fromEntries(agentStates.map((s) => [s.agent_id, s]));

  const filtered = targets.filter((target) => {
    // Search filter
    if (search) {
      const q = search.toLowerCase();
      if (
        !target.name.toLowerCase().includes(q) &&
        !target.id.toLowerCase().includes(q) &&
        !target.hosts.some((h) => h.toLowerCase().includes(q))
      ) {
        return false;
      }
    }

    const state = stateByAgent[target.id];

    // Setup status filter
    if (filter === "active") {
      return state?.dns_enabled && state?.setup_completed;
    }
    if (filter === "setup-required") {
      return !state?.setup_completed && target.viability !== "investigating";
    }
    if (filter === "investigating") {
      return target.viability === "investigating";
    }

    return true;
  });

  const filterOptions: { id: SetupFilter; label: string }[] = [
    { id: "all", label: t("filterAll") || "All" },
    { id: "active", label: t("filterActive") || "Active" },
    { id: "setup-required", label: t("filterSetupRequired") || "Setup required" },
    { id: "investigating", label: t("filterInvestigating") || "Investigating" },
  ];

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
        <h2 className="ci-heading mr-auto text-sm">
          {t("agentListTitle") || "IDE Agents"}{" "}
          <span className="font-normal text-text-muted">({targets.length})</span>
        </h2>

        {/* Filter */}
        <SegmentedControl
          size="sm"
          aria-label={t("agentListTitle") || "IDE Agents"}
          value={filter}
          onChange={(next) => setFilter(next as SetupFilter)}
          options={filterOptions.map((opt) => ({ value: opt.id, label: opt.label }))}
        />

        {/* Search */}
        <Input
          type="search"
          icon="search"
          aria-label={t("searchAgents") || "Search agents…"}
          placeholder={t("searchAgents") || "Search agents…"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-56"
        />
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-3 p-5">
        {filtered.length === 0 ? (
          <EmptyState
            icon="search_off"
            title={t("noAgentsMatch") || "No agents match the current filter"}
          />
        ) : (
          filtered.map((target) => (
            <AgentCard
              key={target.id}
              target={target}
              agentState={stateByAgent[target.id]}
              serverRunning={serverRunning}
              serverState={serverState}
              mappings={mappingsMap[target.id] ?? []}
              onDnsToggle={onDnsToggle}
              onMappingsSave={onMappingsSave}
              onReset={onReset}
            />
          ))
        )}
      </div>
    </Card>
  );
}
