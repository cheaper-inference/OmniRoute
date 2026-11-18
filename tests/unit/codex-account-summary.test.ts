// Provider detail ConnectionRow: Codex connections show whether they are a
// personal plan or a Business seat (with the workspace name), so several
// accounts of one user are distinguishable even with masked emails.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatCodexPlanLabel,
  getCodexAccountSummary,
} from "@/app/(dashboard)/dashboard/providers/[id]/codexPlanLabel";

test("getCodexAccountSummary uses the stored workspace structure, name and role", () => {
  assert.deepEqual(
    getCodexAccountSummary(true, {
      workspacePlanType: "self_serve_business_prolite",
      workspaceStructure: "workspace",
      workspaceName: " Acme Ltd ",
      workspaceRole: "account-owner",
    }),
    { kind: "business", workspaceName: "Acme Ltd", role: "account-owner" }
  );
  assert.deepEqual(
    getCodexAccountSummary(true, {
      workspacePlanType: "pro",
      workspaceStructure: "personal",
      workspaceName: "ignored for personal accounts",
    }),
    { kind: "personal", workspaceName: "", role: "" }
  );
});

test("getCodexAccountSummary falls back to the plan type before the workspace sync ran", () => {
  assert.equal(getCodexAccountSummary(true, { workspacePlanType: "prolite" })?.kind, "personal");
  assert.equal(getCodexAccountSummary(true, { chatgptPlanType: "team" })?.kind, "business");
  assert.equal(
    getCodexAccountSummary(true, { workspacePlanType: "self_serve_business_prolite" })?.kind,
    "business"
  );
  assert.equal(getCodexAccountSummary(true, { workspacePlanType: "enterprise" })?.kind, "business");
});

test("getCodexAccountSummary returns null for non-Codex connections or unknown accounts", () => {
  assert.equal(getCodexAccountSummary(false, { workspaceStructure: "workspace" }), null);
  assert.equal(getCodexAccountSummary(true, {}), null);
  assert.equal(getCodexAccountSummary(true, undefined), null);
});

test("formatCodexPlanLabel turns raw ChatGPT plan types into readable names", () => {
  assert.equal(formatCodexPlanLabel("pro"), "Pro");
  assert.equal(formatCodexPlanLabel("prolite"), "Pro Lite");
  assert.equal(formatCodexPlanLabel("self_serve_business_prolite"), "Business Pro Lite");
  assert.equal(formatCodexPlanLabel(" Plus "), "Plus");
  assert.equal(formatCodexPlanLabel("promax"), "Promax");
});
