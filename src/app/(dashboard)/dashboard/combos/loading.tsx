import { Skeleton } from "@omniroute/ui-kit/skeleton";
import { CardSkeleton } from "@/shared/components/Loading";

export default function Loading() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
