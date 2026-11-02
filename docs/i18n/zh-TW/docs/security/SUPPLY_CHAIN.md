# Supply-Chain Gates (Phase 8 · Block A) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute 發布 npm + Docker 構件。這些關卡提供溯源、庫存（SBOM）和 CVE 掃描，全部都是開源軟體（OSS），並整合到發布工作流程中。**建議優先**的姿態 — 它們現在會報告，在第一次綠色發布後才會升級為阻擋。

| 關卡                  | 工具                                           | 位置                          | 阻擋？         | 輸出                                        |
| --------------------- | ---------------------------------------------- | ----------------------------- | -------------- | ------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | 僅在發布失敗時 | npmjs 徽章 / `npm audit signatures`         |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | 僅在生成失敗時 | 發布資產 + 構件                             |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | 建議           | CycloneDX 構件                              |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | 建議           | SARIF (高+嚴重) → 安全性分頁                |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **阻擋**       | 在可修復的嚴重問題上 `exit-code: '1'`       |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **阻擋**       | 棘輪式調整 `metrics.vulnCount` (方向：向下) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | 建議           | SARIF → 安全性 + 徽章                       |

映像檔 CVE 棘輪式調整在 `docker-publish.yml` 中使用**兩個步驟**：SARIF 步驟（`HIGH,CRITICAL`，`exit-code: 0`）讓高風險和嚴重風險在安全性分頁中可見，但不阻擋發布；而 _嚴重關卡_ 步驟（`severity: CRITICAL`，`ignore-unfixed: true`，`exit-code: 1`）會在存在**可用修復程式**的嚴重 CVE 時使發布失敗。`ignore-unfixed` 可防止因基礎映像檔 CVE 缺乏上游修補程式而阻擋發布。

## ⚠️ CVE 變異（阻擋 osv/Trivy 關卡）

osv 和 Trivy 會將依賴項與**持續增長**的 CVE 資料庫進行比較。一個**未觸及任何依賴項**的 PR 可能會突然變紅，因為現有依賴項中披露了新的 CVE（osv：測量的 `vulnCount` > 基準線；Trivy：映像檔中出現新的可修復嚴重問題）。**這是阻擋性 CVE 關卡的預期操作行為，而非產品退化。**

當 osv 或 Trivy 因新披露的 CVE 而變紅時，解決方案是：

1.  **提升受影響的依賴項**（首選）— 透過 `package.json` 的 `overrides`（傳遞性依賴項）升級到已修補版本，或在已修補的基礎上重建映像檔。
2.  **如果沒有上游修復：**
    - **osv：** 在 `config/quality/quality-baseline.json` 中重新設定 `metrics.vulnCount` 的基準線（`npm run quality:ratchet -- --update` 不涵蓋專用關卡 — 手動編輯數值，`direction:down`），並附上理由說明和追蹤問題。
    - **Trivy：** 在 `.trivyignore` 中新增一個條目（每行一個 CVE-ID），並附上理由註釋和追蹤問題。`ignore-unfixed: true` 已自動涵蓋沒有修補程式的 CVE。

當工具不存在或測量失敗時（例如 osv-scanner 不在 PATH 中、osv.dev/網路無法連線、JSON 無效），這兩個關卡都會**優雅地跳過**（exit 0）— **測量**失敗絕不會阻擋，只有**測量到的**退化才會阻擋。

## 已淘汰的相依性風險

升級固定版本的 promptfoo 開發工具後，根目錄鎖定檔已不再包含 `extract-zip`，也不再包含指向它的相依性邊。這會淘汰先前於 #14482 中追蹤並接受的 `promptfoo` → `@openai/codex-security` → `extract-zip` 鏈結。`tests/unit/extract-zip-14482-exposure.test.ts` 中的迴歸檢查會阻止其重新引入，並保留禁止正式環境程式碼匯入它的規定。

目前的相依性修復也將相容性覆寫範圍限定於 Azure Identity 的 MSAL 用戶端、get-uri 的 FTP 用戶端，以及 OpenCode v1 SDK 的 Zod 相依性。Azure 權杖取得與 FTP 擷取均使用受控傳輸進行測試；兩個 OpenCode 套件也都執行各自的建置與測試套件。登錄檔中的安全公告數量是特定時間點的測量值，在提交鎖定檔後可能會有所變動。

## 待辦事項：記分卡諮詢 → 阻擋

在 Scorecard 報告的第一次綠色發布之後：

- 記分卡：分數棘輪 (凍結測量分數；不能降低)。

補充了第 7 階段的門檻 (osv-scanner、gitleaks、actionlint+zizmor)：zizmor
審核工作流程本身；Scorecard 總體衡量儲存庫的態勢。
