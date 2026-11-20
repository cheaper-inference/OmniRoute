"use client";

import Card from "@/shared/components/Card";
import type { SelfQuotaPool } from "@/shared/schemas/selfQuota";

interface PoolSectionProps {
  pool: SelfQuotaPool;
}

/** One Quota Share pool the key belongs to. */
export default function PoolSection({ pool }: PoolSectionProps) {
  return (
    <Card padding="md">
      <section className="min-w-0 space-y-4">
        <h2 className="ci-heading break-words">{pool.name}</h2>
        {/* Task 9 slot: share, policy, cap, shared window cards and account rows of `pool`. */}
      </section>
    </Card>
  );
}
