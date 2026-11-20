"use client";

import { useEffect } from "react";

import { selfQuotaResponseSchema, type SelfQuotaResponse } from "@/shared/schemas/selfQuota";
import { formatApiKeyLast4 } from "@/shared/utils/apiKeyMask";

import KeyForm from "./components/KeyForm";
import PoolSection from "./components/PoolSection";
import QuotaHeader from "./components/QuotaHeader";
import QuotaStatusPanel from "./components/QuotaStatusPanel";
import type { StoredKey } from "./lib/keyStore";
import { quotaPath } from "./lib/selfServiceClient";
import { useSelfServiceQuery, type SelfServiceQuery } from "./lib/useSelfServiceQuery";
import { useStoredApiKey } from "./lib/useStoredApiKey";

interface QuotaSelfClientProps {
  /** Canonical provider id from the registry. */
  provider: string;
  /** Display name from the registry. */
  providerName: string;
}

/** What the screen shows for the current query and stored key. */
function deriveScreen(query: SelfServiceQuery<SelfQuotaResponse>, stored: StoredKey | null) {
  const { status } = query;
  return {
    status,
    refusedReason: query.status === "refused" ? query.reason : null,
    keyFormMode:
      status === "idle" || status === "refused" ? ("enter" as const) : ("active" as const),
    // While a refresh is in flight the last answer for the same key stays on screen.
    view: query.status === "ready" || query.status === "loading" ? query.data : null,
    // Only after `confirm()` ran: before it, an accepted key is still "memory" for one render.
    storageBlocked:
      status === "ready" && stored?.confirmed === true && stored.persistence === "memory",
  };
}

/**
 * Ties the stored key and the quota query to the sections of the page. It keeps no state of its
 * own: the key lives in the key store, the answer in the query hook.
 */
export default function QuotaSelfClient({ provider, providerName }: QuotaSelfClientProps) {
  const { stored, hold, confirm, unpersist, forget } = useStoredApiKey();
  const apiKey = stored?.key ?? null;
  const { query, reload } = useSelfServiceQuery({
    path: quotaPath(provider),
    apiKey,
    // A module constant: the hook re-requests when the schema reference changes.
    schema: selfQuotaResponseSchema,
    refetchOnReturn: true,
  });
  const { status, refusedReason, keyFormMode, view, storageBlocked } = deriveScreen(query, stored);

  // Storage follows the server's verdict on the current key: kept once accepted, dropped once
  // rejected. Both are mutations of the external key store, not React state.
  useEffect(() => {
    if (status === "ready") confirm();
    else if (refusedReason === "invalid-key") unpersist();
  }, [status, refusedReason, confirm, unpersist]);

  const submitKey = (key: string, remember: boolean) => {
    hold(key, remember);
    // Re-sends a key that was just refused or failed; a new key would be requested anyway.
    reload();
  };

  return (
    <main id="main-content" className="min-h-screen bg-bg px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <QuotaHeader
          providerName={providerName}
          generatedAt={view?.generatedAt ?? null}
          // Task 8 slot: the key expiry badge for `view?.expiresAt`.
          expiry={null}
          refreshing={status === "loading"}
          onRefresh={view ? reload : null}
        />
        <KeyForm
          // A fresh form each time it opens: no draft or "remember" left over from the last key.
          key={keyFormMode}
          mode={keyFormMode}
          maskedKey={apiKey ? formatApiKeyLast4(apiKey) : null}
          persistence={stored?.persistence ?? null}
          storageBlocked={storageBlocked}
          busy={status === "loading"}
          onSubmit={submitKey}
          onForget={forget}
        />
        <QuotaStatusPanel query={query} providerName={providerName} onRetry={reload} />
        {/* Task 10 slot: BlockNotices for `view.blocks`. */}
        {view?.pools.map((pool) => (
          <PoolSection key={pool.ref} pool={pool} />
        ))}
        {/* Task 11 slot: MySpendSection, once the quota answer is ready. */}
      </div>
    </main>
  );
}
