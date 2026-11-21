import { Suspense } from "react";

import ReportsPageClient from "./ReportsPageClient";

export const metadata = {
  title: "Team Reports — OmniRoute",
  description: "Coding-agent usage, tokens and cost by team member, project, provider and account.",
};

export default function ReportsPage() {
  // The client reads the URL query (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <ReportsPageClient />
    </Suspense>
  );
}
