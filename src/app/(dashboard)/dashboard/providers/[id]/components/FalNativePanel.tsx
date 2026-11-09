"use client";

import { Card } from "@/shared/components";
import { useFalNativeController } from "./useFalNativeController";
import {
  FalSearch,
  FalEndpoint,
  FalInputs,
  FalExecution,
  FalRecovery,
  FalJobs,
  FalRegistration,
  FalResults,
} from "./FalNativeFields";

export default function FalNativePanel({ connectionId }: { connectionId: string | null }) {
  const c = useFalNativeController(connectionId);
  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold">{c.t("title")}</h2>
      <p className="text-sm text-text-muted">{c.t("description")}</p>
      {!connectionId ? (
        <p>{c.t("connectionRequired")}</p>
      ) : (
        <>
          <FalSearch c={c} />
          <FalEndpoint c={c} />
          <FalInputs c={c} />
          <FalExecution c={c} />
          <FalRecovery c={c} />
          <FalJobs c={c} />
          <FalRegistration c={c} />
        </>
      )}
      {c.visibleError && (
        <p role="alert" className="text-error">
          {c.visibleError}
        </p>
      )}
      <FalResults c={c} />
    </Card>
  );
}
