import { test, expect } from "@playwright/test";

// Locators confirmados em
// src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx (rota real da
// keys screen is /dashboard/api-manager, not /dashboard/api-keys):
// - "Create API Key" button (t("createKey")) opens the modal; the modal submit has the same text
//  - <Input placeholder={t("keyNamePlaceholder")}> = "e.g. Production Key"
// - after creating, open the "Created Key Modal" (t("keyCreated")) — close with the button t("done")="Done"
// - each key becomes a line div.grid-cols-12; the delete button has title={t("deleteKey")}="Delete key"
//  - handleDeleteKey pede confirmação no ConfirmModal do kit (#19066): o botão "Delete"

const KEY_NAME = `homolog-ui-${Date.now()}`;

test("cria e revoga uma API key pela UI", async ({ page }) => {
  await page.goto("/dashboard/api-manager");
  await page.getByRole("button", { name: "Create API Key" }).first().click();
  await page.getByPlaceholder("e.g. Production Key").fill(KEY_NAME);
  // second "Create API Key" is the modal submit (the first is the button that opened it)
  await page.getByRole("button", { name: "Create API Key" }).last().click();

  // fecha o modal "API Key Created"
  await page.getByRole("button", { name: "Done" }).click();
  const row = page.locator("div.grid-cols-12", { hasText: KEY_NAME });
  await expect(row).toHaveCount(1);

  // revoke the same key (cleanup — the suite leaves no garbage on the VPS)
  await row.getByTitle("Delete key").click();
  await page.getByRole("alertdialog").getByRole("button", { name: "Delete" }).click();
  await expect(page.locator("div.grid-cols-12", { hasText: KEY_NAME })).toHaveCount(0);
});
