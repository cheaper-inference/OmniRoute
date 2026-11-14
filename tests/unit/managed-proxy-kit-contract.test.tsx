// @vitest-environment jsdom
import React from "react";
import fs from "node:fs";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import Select from "../../src/shared/components/Select";

// Render only the shared control: no managed service, DB, fetch, child or hosted fixture.
afterEach(cleanup);
test("managed hosted fixture asserts the current native kit control and keeps real change values", () => {
  const change = vi.fn();
  render(
    <Select label="Core" defaultValue="" onChange={change}>
      <option value="">Select a core</option>
      <option value="singbox">sing-box</option>
      <option value="xray">Xray</option>
    </Select>
  );
  const core = screen.getByRole("combobox", { name: "Core" }) as HTMLSelectElement;
  expect(core.tagName).toBe("SELECT");
  expect(core.classList.contains("ci-native-select__control")).toBe(true);
  expect(core.closest('[data-slot="native-select"]')?.classList.contains("ci-native-select")).toBe(
    true
  );
  fireEvent.change(core, { target: { value: "xray" } });
  expect(core.value).toBe("xray");
  expect(change).toHaveBeenCalledTimes(1);
  expect(change.mock.calls[0][0].target.value).toBe("xray");
  const hosted = fs.readFileSync("tests/integration/managed-proxy/managedProxyUi.test.tsx", "utf8");
  expect(hosted).toContain('core.classList.contains("ci-native-select__control")');
  expect(hosted).toContain("assertManagedFixture()");
});
