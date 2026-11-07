// @vitest-environment jsdom
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AgentrouterConsoleFields from "@/app/(dashboard)/dashboard/providers/[id]/components/modals/AgentrouterConsoleFields";

// The Add/Edit connection modals mount AgentrouterConsoleFields; for TokenRouter it renders
// the optional Management Key input (bound to providerSpecificData.consoleApiKey).
const t = ((key: string) => key) as never;
const values = { consoleApiKey: "", newApiUserId: "" };

function render(provider: string) {
  return renderToStaticMarkup(
    <AgentrouterConsoleFields provider={provider} values={values} onChange={() => {}} t={t} />
  );
}

describe("TokenRouter Management Key field", () => {
  it("renders a password input with the TokenRouter label for tokenrouter", () => {
    const html = render("tokenrouter");
    expect(html).toContain("tokenrouterManagementKeyLabel");
    expect(html).toContain('type="password"');
    expect(html).not.toContain("newApiUserIdLabel");
  });

  it("keeps the AgentRouter fields unchanged and hides the field elsewhere", () => {
    expect(render("agentrouter")).toContain("newApiUserIdLabel");
    expect(render("agentrouter")).not.toContain("tokenrouterManagementKeyLabel");
    expect(render("openai")).toBe("");
  });
});
