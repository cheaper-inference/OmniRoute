import {
  checkFreeTierHeadline,
  extractHeadlineClaims,
  makeNumberClaimValidator,
} from "../../check/check-docs-counts-sync.mjs";

// Only reviewed numeric units are automatic. Budget/pool changes need review of
// the differently worded translated claims before any source hash can advance.
export function validateFinancialCopy(files, facts, sources) {
  const pools = makeNumberClaimValidator(facts.freePools, {
    what: "recurring pools",
    requireClaim: true,
    pattern: /(\d+) (?:documented )?(?:recurring|free-tier) pool(?:s|(?:\s+keys))?\b/gi,
    skipAfter: /^\s+with a published positive/i,
  });
  for (const source of sources) {
    const content = files.get(source);
    if (
      typeof content !== "string" ||
      !extractHeadlineClaims(content).length ||
      !checkFreeTierHeadline(content, {
        s: facts.freeSteady,
        m: facts.freeFirst,
        g: facts.freeGated,
      }).ok ||
      !pools(content).ok
    ) {
      throw Object.assign(new Error("COUNT_FINANCIAL_COPY_REVIEW_REQUIRED"), {
        code: "COUNT_FINANCIAL_COPY_REVIEW_REQUIRED",
        path: source,
      });
    }
  }
}
