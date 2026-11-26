import { expect, type Locator, type Page } from "@playwright/test";

export async function chooseComboStepOption(
  page: Page,
  field: Locator,
  query: string,
  optionName: RegExp
) {
  await field.getByRole("button").click();
  const search = page.getByRole("combobox", { name: "Search", exact: true });
  await expect(search).toBeFocused();
  await search.fill(query);
  await page.getByRole("listbox").getByRole("option", { name: optionName }).click();
  await expect(search).toBeHidden();
}
