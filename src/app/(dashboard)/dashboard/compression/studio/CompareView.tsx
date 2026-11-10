"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

interface Row {
  engine: string;
  meanSavingsPercent: number;
  meanRetention: number;
  totalCompressedTokens: number;
}
interface VerifyResult {
  id: string;
  verdict: string | null;
  usdCost: number;
  skippedCapped: boolean;
}
export interface CompareViewProps {
  text: string;
}

async function runFidelityCheck(
  rows: Row[],
  text: string,
  opts: { provider: string; judgeModel: string; capUsd: number }
): Promise<{ verdicts: Record<string, VerifyResult>; spent: number; capped: boolean } | null> {
  const items = await Promise.all(
    rows.map(async (r) => {
      const res = await fetch("/api/compression/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: text }], engineId: r.engine }),
      });
      const d = await res.json();
      return { id: r.engine, original: d.original ?? "", compressed: d.compressed ?? "" };
    })
  );
  const vres = await fetch("/api/compression/compare/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items,
      provider: opts.provider,
      judgeModel: opts.judgeModel,
      costCapUsd: opts.capUsd,
    }),
  });
  const vdata = await vres.json();
  if (vres.ok && Array.isArray(vdata.results)) {
    const map: Record<string, VerifyResult> = {};
    for (const v of vdata.results) map[v.id] = v;
    return {
      verdicts: map,
      spent: typeof vdata.totalUsd === "number" ? vdata.totalUsd : 0,
      capped: Boolean(vdata.capped),
    };
  }
  return null;
}

interface VerifyControlsProps {
  provider: string;
  onProvider: (v: string) => void;
  judgeModel: string;
  onJudgeModel: (v: string) => void;
  capUsd: number;
  onCapUsd: (v: number) => void;
  verifying: boolean;
  onVerify: () => void;
  spent: number | null;
  capped: boolean;
}

function VerifyControls({
  provider,
  onProvider,
  judgeModel,
  onJudgeModel,
  capUsd,
  onCapUsd,
  verifying,
  onVerify,
  spent,
  capped,
}: VerifyControlsProps) {
  const t = useTranslations("compressionStudio");
  return (
    <>
      <Input
        label={t("provider")}
        className="w-28"
        inputClassName="h-8 min-h-8 text-xs"
        value={provider}
        onChange={(e) => onProvider(e.target.value)}
      />
      <Input
        label={t("judgeModel")}
        data-testid="verify-model"
        className="w-40"
        inputClassName="h-8 min-h-8 text-xs"
        value={judgeModel}
        onChange={(e) => onJudgeModel(e.target.value)}
        placeholder={t("judgeModelPlaceholder")}
      />
      <Input
        type="number"
        label={t("maxCostUsd")}
        step="0.01"
        min="0"
        className="w-24"
        inputClassName="h-8 min-h-8 text-xs"
        value={capUsd}
        onChange={(e) => onCapUsd(Number(e.target.value))}
      />
      <Button
        variant="secondary"
        size="sm"
        icon="balance"
        data-testid="verify-all"
        onClick={onVerify}
        loading={verifying}
        disabled={verifying || !judgeModel}
        title={!judgeModel ? t("enterJudgeModel") : undefined}
      >
        {verifying ? t("verifying") : t("verifyAll")}
      </Button>
      {spent !== null && (
        <span className="text-[10px] text-text-muted">
          {t("spent", { spent: spent.toFixed(3), cap: capUsd.toFixed(2) })}
          {capped ? ` · ${t("capReached")}` : ""}
        </span>
      )}
    </>
  );
}

function ComparisonTable({
  rows,
  verdicts,
}: {
  rows: Row[];
  verdicts: Record<string, VerifyResult>;
}) {
  const t = useTranslations("compressionStudio");
  return (
    <Table scrollbarLabel={t("compareTab")} className="min-w-0 text-xs">
      <TableHeader>
        <TableRow>
          <TableHead>{t("engine")}</TableHead>
          <TableHead>{t("savings")}</TableHead>
          <TableHead>{t("retention")}</TableHead>
          <TableHead>{t("outputTokensShort")}</TableHead>
          <TableHead>{t("fidelity")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => {
          const verdict = verdicts[row.engine];
          return (
            <TableRow key={row.engine} data-testid="compare-row">
              <TableCell className="font-semibold">{row.engine}</TableCell>
              <TableCell>−{row.meanSavingsPercent.toFixed(0)}%</TableCell>
              <TableCell>{Math.round(row.meanRetention * 100)}%</TableCell>
              <TableCell>{row.totalCompressedTokens}</TableCell>
              <TableCell data-testid="verify-verdict">
                {verdict ? (verdict.skippedCapped ? "—(cap)" : (verdict.verdict ?? "?")) : ""}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function CompareView({ text }: CompareViewProps) {
  const t = useTranslations("compressionStudio");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [verdicts, setVerdicts] = useState<Record<string, VerifyResult>>({});
  const [verifying, setVerifying] = useState(false);
  const [provider, setProvider] = useState("anthropic");
  const [judgeModel, setJudgeModel] = useState("");
  const [capUsd, setCapUsd] = useState(0.1);
  const [spent, setSpent] = useState<number | null>(null);
  const [capped, setCapped] = useState(false);

  const load = async () => {
    setLoading(true);
    setVerdicts({});
    setSpent(null);
    try {
      const res = await fetch("/api/compression/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
      });
      const data = await res.json();
      if (res.ok) setRows(Array.isArray(data.rows) ? data.rows : []);
    } finally {
      setLoading(false);
    }
  };

  const verifyAll = async () => {
    if (rows.length === 0 || !judgeModel) return;
    setVerifying(true);
    try {
      const out = await runFidelityCheck(rows, text, { provider, judgeModel, capUsd });
      if (out) {
        setVerdicts(out.verdicts);
        setSpent(out.spent);
        setCapped(out.capped);
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end gap-2">
        <Button
          variant="primary"
          size="sm"
          data-testid="compare-load"
          onClick={load}
          loading={loading}
          disabled={loading}
        >
          {loading ? t("running") : t("loadAb")}
        </Button>
        {rows.length > 0 && (
          <VerifyControls
            provider={provider}
            onProvider={setProvider}
            judgeModel={judgeModel}
            onJudgeModel={setJudgeModel}
            capUsd={capUsd}
            onCapUsd={setCapUsd}
            verifying={verifying}
            onVerify={verifyAll}
            spent={spent}
            capped={capped}
          />
        )}
      </div>
      <ComparisonTable rows={rows} verdicts={verdicts} />
    </div>
  );
}
