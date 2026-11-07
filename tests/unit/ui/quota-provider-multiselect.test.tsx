import React, { useState } from "react";
import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProviderFilter from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/ProviderFilter";
import { matchesProviderFilter } from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils";
import { parseProviderFilter } from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/providerFilterStorage";

afterEach(cleanup);

function Harness() {
  const [value, setValue] = useState<string[]>([]);
  const options = ["codex", "claude", "openai"];
  return (
    <>
      <ProviderFilter
        options={options}
        value={value}
        onChange={setValue}
        labels={{ codex: "OpenAI Codex", claude: "Claude Code" }}
        allLabel="All providers"
        ariaLabel="Providers"
      />
      <output>
        {options.filter((provider) => matchesProviderFilter({ provider }, value)).join(",")}
      </output>
    </>
  );
}

it("combines providers, deselects individually and resets to all", () => {
  render(<Harness />);
  fireEvent.click(screen.getByLabelText("Providers", { selector: "summary" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "OpenAI Codex" }));
  expect(screen.getByRole("status").textContent).toBe("codex");
  fireEvent.click(screen.getByRole("checkbox", { name: "Claude Code" }));
  expect(screen.getByRole("status").textContent).toBe("codex,claude");
  fireEvent.click(screen.getByRole("checkbox", { name: "OpenAI Codex" }));
  expect(screen.getByRole("status").textContent).toBe("claude");
  fireEvent.click(screen.getByRole("button", { name: "All providers" }));
  expect(screen.getByRole("status").textContent).toBe("codex,claude,openai");
  fireEvent.click(screen.getByRole("checkbox", { name: "Claude Code" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "Claude Code" }));
  expect(screen.getByRole("status").textContent).toBe("codex,claude,openai");
});

it("restores multiple providers and migrates legacy single-provider preferences", () => {
  expect(parseProviderFilter("codex")).toEqual(["codex"]);
  expect(parseProviderFilter("all")).toEqual([]);
  expect(parseProviderFilter("openai-compatible-chat-my.node_1")).toEqual([
    "openai-compatible-chat-my.node_1",
  ]);
  expect(parseProviderFilter("not a provider")).toEqual([]);
  expect(parseProviderFilter(JSON.stringify(["codex", "claude", "codex"]))).toEqual([
    "codex",
    "claude",
  ]);
  for (const corrupt of ["[", "null", "{}", '["codex",2]'])
    expect(parseProviderFilter(corrupt)).toEqual([]);
  expect(matchesProviderFilter({ provider: "other" }, ["codex", "claude"])).toBe(false);
  expect(matchesProviderFilter({}, ["codex"])).toBe(false);
  expect(matchesProviderFilter({ provider: "codex" }, [])).toBe(true);
});
