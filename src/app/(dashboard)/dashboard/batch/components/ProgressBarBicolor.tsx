interface Props {
  total: number;
  completed: number;
  failed: number;
  className?: string;
  showLabels?: boolean;
}

export default function ProgressBarBicolor({
  total,
  completed,
  failed,
  className = "",
  showLabels = false,
}: Props) {
  const donePct = total > 0 ? (completed / total) * 100 : 0;
  const failedPct = total > 0 ? (failed / total) * 100 : 0;
  return (
    <div className={`space-y-1 ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>
            <span className="text-success">{completed}</span>
            {failed > 0 && <span className="text-error"> / {failed} err</span>}
            <span> / {total}</span>
          </span>
          <span>{Math.round(donePct + failedPct)}%</span>
        </div>
      )}
      <div className="h-1.5 rounded-full bg-bg-alt overflow-hidden flex">
        <div className="h-full bg-success transition-all" style={{ width: `${donePct}%` }} />
        <div className="h-full bg-error transition-all" style={{ width: `${failedPct}%` }} />
      </div>
    </div>
  );
}
