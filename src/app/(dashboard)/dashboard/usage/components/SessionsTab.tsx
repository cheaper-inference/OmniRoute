"use client";

import { useTranslations } from "next-intl";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  mergeDashboardSessions,
  type DashboardSession,
  type ExclusiveDashboardSession,
  type RecentSessionForDashboard,
} from "@/lib/sessionObservability";
import Icon from "@/shared/components/Icon";
import { Card } from "@/shared/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

type SessionsResponse = {
  sessions: RecentSessionForDashboard[];
  exclusiveSessions: ExclusiveDashboardSession[];
};

const EMPTY_DATA: SessionsResponse = {
  sessions: [],
  exclusiveSessions: [],
};

function isLeaseBackedSession(session: DashboardSession): session is ExclusiveDashboardSession {
  return "leaseBacked" in session && session.leaseBacked;
}

export default function SessionsTab() {
  const t = useTranslations("usage");
  const tCommon = useTranslations("common");
  const [data, setData] = useState<SessionsResponse>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/sessions");
      if (res.ok) {
        const next = await res.json();
        setData({
          sessions: Array.isArray(next.sessions) ? next.sessions : [],
          exclusiveSessions: Array.isArray(next.exclusiveSessions) ? next.exclusiveSessions : [],
        });
      }
    } catch {
      // A failed background poll leaves the last successful Sessions snapshot visible.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await loadSessions();
    })();
    const interval = setInterval(loadSessions, 5000);
    return () => clearInterval(interval);
  }, [loadSessions]);

  const displaySessions = useMemo(() => {
    return mergeDashboardSessions(data.exclusiveSessions, data.sessions);
  }, [data.exclusiveSessions, data.sessions]);

  const formatAge = (ms: number | null) => {
    if (ms == null) return t("notAvailableSymbol");
    if (ms < 60000) return t("durationSecondsShort", { value: Math.floor(ms / 1000) });
    if (ms < 3600000) return t("durationMinutesShort", { value: Math.floor(ms / 60000) });
    return t("durationHoursShort", { value: Math.floor(ms / 3600000) });
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-info/10 text-info">
          <Icon name="fingerprint" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("activeSessions")}</h3>
          <p className="text-sm text-text-muted">{t("sessionsTrackedHint")}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-info/10 border border-info/20">
            <span className="w-2 h-2 rounded-full bg-info animate-pulse" />
            <span
              className="text-sm font-semibold tabular-nums text-info"
              data-testid="session-count"
            >
              {displaySessions.length}
            </span>
          </span>
        </div>
      </div>

      {displaySessions.length === 0 ? (
        <div className="text-center py-8 text-text-muted">
          <Icon name="fingerprint" size={40} className="mb-2 block opacity-40" />
          <p className="text-sm">{t("noSessions")}</p>
          <p className="text-xs mt-1">{t("sessionsHint")}</p>
        </div>
      ) : (
        <Table
          className="text-sm"
          containerClassName="rounded-none border-0"
          scrollbarLabel={t("session")}
        >
          <TableHeader>
            <TableRow>
              <TableHead className="text-left py-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("session")}
              </TableHead>
              <TableHead className="text-left py-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("age")}
              </TableHead>
              <TableHead className="text-right py-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("requests")}
              </TableHead>
              <TableHead className="text-left py-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("connection")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displaySessions.map((s) => {
              const leaseBacked = isLeaseBackedSession(s);
              return (
                <TableRow key={s.sessionId}>
                  <TableCell className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-xs px-2 py-1 rounded bg-surface/40 text-text-muted"
                        title={s.sessionId}
                      >
                        {s.sessionId.slice(0, 12)}…
                      </span>
                      {leaseBacked && s.active && (
                        <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full border text-success border-success/30 bg-success/10">
                          {tCommon("active")}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5 px-3 text-text-muted tabular-nums">
                    {formatAge(s.ageMs)}
                  </TableCell>
                  <TableCell className="py-2.5 px-3 text-right">
                    <span className="font-semibold tabular-nums">{s.requestCount}</span>
                  </TableCell>
                  <TableCell className="py-2.5 px-3">
                    {s.connectionId ? (
                      <span className="text-xs font-mono text-info" title={s.connectionId}>
                        {(leaseBacked && s.connectionName) || s.connectionId.slice(0, 10)}
                      </span>
                    ) : (
                      <span className="text-text-muted/40">{t("notAvailableSymbol")}</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
