"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Checkbox } from "@omniroute/ui-kit/checkbox";
import { getProviderDisplayName } from "@/lib/display/names";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import { cn } from "@/shared/utils/cn";
import { compareTr, matchesSearch } from "@/shared/utils/turkishText";

export interface ProviderConnection {
  id: string;
  name: string;
  provider: string;
  isActive: boolean;
}

export interface ProviderConnectionPermissionListProps {
  connections: ProviderConnection[];
  selectedConnections: string[];
  onSelectionChange: (next: string[]) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onToggleConnection?: (id: string) => void;
}

function ProviderSelectionCheckbox({
  provider,
  checked,
  indeterminate,
  onChange,
}: {
  provider: string;
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
}) {
  return (
    <Checkbox
      aria-label={`${provider} connection access`}
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
      className="shrink-0"
    />
  );
}

export const ProviderConnectionPermissionList = memo(function ProviderConnectionPermissionList({
  connections,
  selectedConnections,
  onSelectionChange,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  onToggleConnection: externalOnToggleConnection,
}: ProviderConnectionPermissionListProps) {
  const tc = useTranslations("common");

  const safeConnections = useMemo(
    () => (Array.isArray(connections) ? connections : []),
    [connections]
  );
  const safeSelectedConnections = useMemo(
    () => (Array.isArray(selectedConnections) ? selectedConnections : []),
    [selectedConnections]
  );

  const [internalSearch, setInternalSearch] = useState("");
  const [collapsedInSearch, setCollapsedInSearch] = useState<Set<string>>(() => new Set());

  const search = externalSearchQuery !== undefined ? externalSearchQuery : internalSearch;
  const handleSearchChange = useCallback(
    (value: string) => {
      setCollapsedInSearch(new Set());
      if (externalOnSearchChange) {
        externalOnSearchChange(value);
      } else {
        setInternalSearch(value);
      }
    },
    [externalOnSearchChange]
  );

  const query = search.trim();
  const isSearching = query.length > 0;

  // Group all connections by provider
  const allConnectionsByProvider = useMemo(() => {
    const grouped = new Map<string, ProviderConnection[]>();
    for (const conn of safeConnections) {
      const p = conn.provider || "Other";
      const list = grouped.get(p);
      if (list) {
        list.push(conn);
      } else {
        grouped.set(p, [conn]);
      }
    }
    return grouped;
  }, [safeConnections]);

  // Filter groups according to search
  const filteredGroups = useMemo(() => {
    const result: Array<[provider: string, connections: ProviderConnection[]]> = [];
    for (const [provider, conns] of allConnectionsByProvider.entries()) {
      const providerDisplayName = getProviderDisplayName(provider) || provider;
      const providerMatches =
        isSearching &&
        (matchesSearch(provider, query) || matchesSearch(providerDisplayName, query));

      if (!isSearching || providerMatches) {
        result.push([provider, conns]);
      } else {
        const matchedConns = conns.filter(
          (c) => matchesSearch(c.name, query) || matchesSearch(c.id, query)
        );
        if (matchedConns.length > 0) {
          result.push([provider, matchedConns]);
        }
      }
    }
    return result.sort(([a], [b]) => compareTr(a, b));
  }, [allConnectionsByProvider, isSearching, query]);

  // Expand providers that have active selections by default. `connections` /
  // `selectedConnections` commonly arrive after mount (the permissions modal
  // opens before its fetch resolves), so a one-time lazy useState initializer
  // computed against the first render's (often still-empty) props would never
  // expand a provider whose selection only shows up once the data loads
  // (#13952). Adjusting state during render (React's documented pattern for
  // reacting to data becoming available — see "You Might Not Need an Effect")
  // avoids that without an extra effect-triggered render, and — guarded to
  // run only once — never fights a later manual collapse.
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(() => new Set());
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false);
  if (!hasAutoExpanded && safeConnections.length > 0) {
    setHasAutoExpanded(true);
    const selectedSet = new Set(safeSelectedConnections);
    const withSelections = new Set<string>();
    for (const conn of safeConnections) {
      if (selectedSet.has(conn.id)) {
        withSelections.add(conn.provider || "Other");
      }
    }
    if (withSelections.size > 0) {
      setExpandedProviders(withSelections);
    }
  }

  const handleToggleExpand = useCallback(
    (provider: string) => {
      if (isSearching) {
        setCollapsedInSearch((prev) => {
          const next = new Set(prev);
          if (next.has(provider)) {
            next.delete(provider);
          } else {
            next.add(provider);
          }
          return next;
        });
      } else {
        setExpandedProviders((prev) => {
          const next = new Set(prev);
          if (next.has(provider)) {
            next.delete(provider);
          } else {
            next.add(provider);
          }
          return next;
        });
      }
    },
    [isSearching]
  );

  const handleToggleSingleConnection = useCallback(
    (id: string) => {
      if (externalOnToggleConnection) {
        externalOnToggleConnection(id);
        return;
      }
      if (safeSelectedConnections.includes(id)) {
        onSelectionChange(safeSelectedConnections.filter((c) => c !== id));
      } else {
        onSelectionChange([...safeSelectedConnections, id]);
      }
    },
    [externalOnToggleConnection, safeSelectedConnections, onSelectionChange]
  );

  const handleToggleAllInProvider = useCallback(
    (provider: string, visibleConns: ProviderConnection[]) => {
      const allProviderConns = allConnectionsByProvider.get(provider) ?? visibleConns;
      const targetConns = isSearching ? visibleConns : allProviderConns;
      const targetIds = targetConns.map((c) => c.id);
      const allTargetSelected =
        targetIds.length > 0 && targetIds.every((id) => safeSelectedConnections.includes(id));

      if (allTargetSelected) {
        onSelectionChange(safeSelectedConnections.filter((id) => !targetIds.includes(id)));
      } else {
        onSelectionChange([...new Set([...safeSelectedConnections, ...targetIds])]);
      }
    },
    [allConnectionsByProvider, isSearching, safeSelectedConnections, onSelectionChange]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={tc("search")}
          icon="search"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => handleSearchChange("")}
            className="absolute inset-y-0 right-1 my-auto text-text-muted"
            aria-label={tc("clear")}
            icon="close"
          />
        )}
      </div>

      <div className="max-h-[280px] overflow-y-auto border border-border rounded-lg divide-y divide-border">
        {filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-text-muted">
            <Icon name="search_off" className="text-2xl mb-1" />
            <p className="text-xs">{tc("noResults")}</p>
          </div>
        ) : (
          filteredGroups.map(([provider, conns]) => {
            const allProviderConns = allConnectionsByProvider.get(provider) ?? conns;
            const totalCount = allProviderConns.length;
            const selectedInProvider = allProviderConns.filter((c) =>
              safeSelectedConnections.includes(c.id)
            ).length;
            const allSelected = totalCount > 0 && selectedInProvider === totalCount;
            const someSelected = selectedInProvider > 0 && selectedInProvider < totalCount;
            const isExpanded = isSearching
              ? !collapsedInSearch.has(provider)
              : expandedProviders.has(provider);
            const providerDisplayName = getProviderDisplayName(provider) || provider;

            return (
              <div key={provider} className="group">
                <div className="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface/50 transition-colors text-left">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleToggleExpand(provider)}
                    className="shrink-0 text-text-muted"
                    aria-label={providerDisplayName}
                    aria-expanded={isExpanded}
                  >
                    <Icon
                      name="chevron_right"
                      size={16}
                      className={cn("transition-transform duration-200", isExpanded && "rotate-90")}
                    />
                  </Button>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <ProviderSelectionCheckbox
                      provider={provider}
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={() => handleToggleAllInProvider(provider, conns)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleExpand(provider)}
                      className="h-auto min-h-0 px-1 text-xs font-semibold text-text-main truncate text-left"
                    >
                      {providerDisplayName}
                    </Button>
                    <span className="text-[10px] text-text-muted bg-surface px-1 py-0.5 rounded shrink-0">
                      {totalCount}
                    </span>
                  </div>
                  {selectedInProvider > 0 && (
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full shrink-0">
                      {selectedInProvider}
                    </span>
                  )}
                </div>

                {isExpanded && (
                  <div className="px-3 pb-2 pl-9 space-y-1">
                    {conns.map((conn) => {
                      const isSelected = safeSelectedConnections.includes(conn.id);
                      return (
                        <Button
                          key={conn.id}
                          variant="ghost"
                          size="sm"
                          aria-pressed={isSelected}
                          onClick={() => handleToggleSingleConnection(conn.id)}
                          className={cn(
                            "w-full justify-start gap-2 text-left text-xs font-normal",
                            isSelected ? "bg-primary/10 text-text-main" : "text-text-muted"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0",
                              isSelected
                                ? "bg-primary border-primary text-accent-foreground"
                                : "border-border"
                            )}
                          >
                            {isSelected && <Icon name="check" size={10} />}
                          </span>
                          <span className="truncate flex-1 font-mono text-[11px]" title={conn.id}>
                            {conn.name ||
                              (typeof conn.id === "string" ? conn.id.slice(0, 8) : "connection")}
                          </span>
                          {!conn.isActive && (
                            <span className="text-[9px] text-error shrink-0">{tc("inactive")}</span>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});

export default ProviderConnectionPermissionList;
