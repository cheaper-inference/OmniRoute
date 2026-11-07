import { expect, type Locator, type Page } from "@playwright/test";

/** Drive the visible query and an exact identity, never an invisible native select. */
export async function chooseSearchableOption(page: Page, trigger: Locator, value: string) {
  await trigger.click();
  const search = page.getByRole("combobox", { name: "Search", exact: true });
  await expect(search).toBeFocused();
  await search.fill(value);
  const matching = page.getByRole("option");
  // An attribute equality filter avoids CSS interpolation of literal model punctuation.
  const index = await matching.evaluateAll(
    (rows, id) => rows.findIndex((row) => row.getAttribute("data-value") === id),
    value
  );
  expect(index, `Search must expose exact option ${value}`).toBeGreaterThanOrEqual(0);
  await matching.nth(index).click();
  await expect(search).toBeHidden();
}
