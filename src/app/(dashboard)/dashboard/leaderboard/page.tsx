"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Card, EmptyState, SegmentedControl } from "@/shared/components";

type LeaderboardScope = "global" | "weekly" | "monthly" | "tokens_shared";

interface LeaderboardEntry {
  apiKeyId: string;
  score: number;
  /** API key display name from the REST endpoint; absent on SSE payloads. */
  name?: string | null;
}

/** Key name when known, otherwise a shortened id so the row is still identifiable. */
function entryLabel(entry: LeaderboardEntry, idLength: number): string {
  const name = entry.name?.trim();
  return name ? name : `${entry.apiKeyId.slice(0, idLength)}...`;
}

/**
 * Live SSE updates carry scores only. Carry the names already fetched over
 * REST forward so rows do not flip back to raw ids on every refresh.
 */
function withKnownNames(
  previous: LeaderboardEntry[],
  incoming: LeaderboardEntry[]
): LeaderboardEntry[] {
  const known = new Map<string, string>();
  for (const entry of previous) {
    if (entry.name) known.set(entry.apiKeyId, entry.name);
  }
  return incoming.map((entry) =>
    entry.name || !known.has(entry.apiKeyId) ? entry : { ...entry, name: known.get(entry.apiKeyId) }
  );
}

const SCOPE_LABEL_KEYS: Record<LeaderboardScope, string> = {
  global: "leaderboardScopes.allTime",
  weekly: "leaderboardScopes.weekly",
  monthly: "leaderboardScopes.monthly",
  tokens_shared: "leaderboardScopes.tokensShared",
};

// Podium accent strip: gold / silver / bronze through theme tokens (light + dark).
const MEDAL_COLORS = ["bg-warning", "bg-border-strong", "bg-warning/50"];

const MEDAL_EMOJI = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const t = useTranslations("common");
  const tg = useTranslations("gamification");
  const locale = useLocale();
  const [scope, setScope] = useState<LeaderboardScope>("global");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const eventSourceRef = useRef<EventSource | null>(null);

  const fetchLeaderboard = useCallback(
    async (s: LeaderboardScope) => {
      try {
        const res = await fetch(`/api/gamification/leaderboard?scope=${s}&limit=50`);
        if (!res.ok) throw new Error(tg("leaderboardLoadFailed", { status: res.status }));
        const data = await res.json();
        setEntries(data.entries || []);
        setMyRank(data.myRank ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : tg("leaderboardLoadFailed"));
      } finally {
        setLoading(false);
      }
    },
    [tg]
  );

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void fetchLeaderboard(scope);
    }, 0);

    // SSE real-time updates
    const es = new EventSource(`/api/gamification/stream?scope=${scope}`);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "leaderboard" && data.scope === scope) {
          setEntries((previous) => withKnownNames(previous, data.entries || []));
        }
      } catch {
        // ignore parse errors from heartbeats
      }
    };

    es.onerror = () => {
      es.close();
      // Reconnect after 3s with exponential backoff
      setTimeout(() => {
        if (eventSourceRef.current === es) {
          fetchLeaderboard(scope);
        }
      }, 3000);
    };

    return () => {
      window.clearTimeout(loadTimer);
      es.close();
      eventSourceRef.current = null;
    };
  }, [scope, fetchLeaderboard]);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={tg("leaderboardTitle")}
        description={tg("leaderboardDescription")}
      />

      {/* Scope selector */}
      <SegmentedControl
        aria-label={tg("scope")}
        value={scope}
        onChange={(next) => {
          if (next === scope) return;
          setLoading(true);
          setError("");
          setScope(next as LeaderboardScope);
        }}
        options={(Object.keys(SCOPE_LABEL_KEYS) as LeaderboardScope[]).map((s) => ({
          value: s,
          label: tg(SCOPE_LABEL_KEYS[s]),
        }))}
      />

      {/* Your Rank */}
      {myRank !== null && (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">{t("leaderboardYourRank")}</p>
              <p className="text-3xl font-bold mt-1">#{myRank}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-muted">{tg("scope")}</p>
              <p className="text-lg font-semibold">{tg(SCOPE_LABEL_KEYS[scope])}</p>
            </div>
          </div>
        </Card>
      )}

      {error && <Alert variant="critical" description={error} dismissLabel={t("close")} />}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted" role="status" aria-live="polite">
            {t("leaderboardLoading")}
          </div>
        </div>
      ) : (
        <>
          {/* Podium — Top 3 */}
          {top3.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {top3.map((entry, idx) => (
                <Card key={entry.apiKeyId} className="relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 left-0 right-0 h-1 ${MEDAL_COLORS[idx]}`}
                  />
                  <div className="flex items-center gap-4">
                    <div className="text-4xl" aria-hidden="true">
                      {MEDAL_EMOJI[idx]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-muted truncate" title={entry.apiKeyId}>
                        {entryLabel(entry, 8)}
                      </p>
                      <p className="text-2xl font-bold mt-1">
                        {entry.score.toLocaleString(locale)}
                      </p>
                      <p className="text-xs text-text-muted">
                        {scope === "tokens_shared" ? tg("tokensShared") : tg("points")}
                      </p>
                    </div>
                    <div className="text-5xl font-black text-text-muted/20" aria-hidden="true">
                      {idx + 1}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Rest of leaderboard table */}
          {rest.length > 0 && (
            <Card>
              <Table className="min-w-0" scrollbarLabel={tg("rank")}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">{tg("rank")}</TableHead>
                    <TableHead>{tg("name")}</TableHead>
                    <TableHead className="text-right">{tg("score")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rest.map((entry, idx) => (
                    <TableRow key={entry.apiKeyId}>
                      <TableCell className="text-text-muted font-mono">{idx + 4}</TableCell>
                      <TableCell className="font-medium" title={entry.apiKeyId}>
                        {entryLabel(entry, 12)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {entry.score.toLocaleString(locale)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {entries.length === 0 && !error && (
            <EmptyState icon="leaderboard" title={tg("leaderboardEmpty")} />
          )}
        </>
      )}
    </div>
  );
}
