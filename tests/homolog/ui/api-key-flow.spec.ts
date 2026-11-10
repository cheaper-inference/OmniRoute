import { test, expect } from "@playwright/test";

// Locators confirmados em
// src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx (rota real da
// tela de keys é /dashboard/api-manager, não /dashboard/api-keys):
//  - botão "Create API Key" (t("createKey")) abre o modal; o submit do modal tem o mesmo texto
//  - <Input placeholder={t("keyNamePlaceholder")}> = "e.g. Production Key"
//  - após criar, abre o "Created Key Modal" (t("keyCreated")) — fechar pelo botão t("done")="Done"
//  - cada key vira uma linha div.grid-cols-12; o botão de deletar tem title={t("deleteKey")}="Delete key"
//  - handleDeleteKey pede confirmação no ConfirmModal do kit (#19066): o botão "Delete"
//    do diálogo confirma a revogação.
const KEY_NAME = `homolog-ui-${Date.now()}`;

test("cria e revoga uma API key pela UI", async ({ page }) => {
  await page.goto("/dashboard/api-manager");
  await page.getByRole("button", { name: "Create API Key" }).first().click();
  await page.getByPlaceholder("e.g. Production Key").fill(KEY_NAME);
  // segundo "Create API Key" é o submit do modal (o primeiro é o botão que o abriu)
  await page.getByRole("button", { name: "Create API Key" }).last().click();

  // fecha o modal "API Key Created"
  await page.getByRole("button", { name: "Done" }).click();
  const row = page.locator("div.grid-cols-12", { hasText: KEY_NAME });
  await expect(row).toHaveCount(1);

  // revoga a mesma key (cleanup — a suíte não deixa lixo na VPS)
  await row.getByTitle("Delete key").click();
  await page.getByRole("alertdialog").getByRole("button", { name: "Delete" }).click();
  await expect(page.locator("div.grid-cols-12", { hasText: KEY_NAME })).toHaveCount(0);
});
