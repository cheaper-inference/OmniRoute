# Supply-Chain Gates (Phase 8 · Block A) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRouteはnpmとDockerのアーティファクトを公開しています。これらのゲートは、プロベナンス、インベントリ（SBOM）、CVEスキャンをすべてOSSとして提供し、リリースワークフローに組み込まれています。**アドバイザリ優先**の姿勢 — まずは報告し、最初のグリーンリリース後にブロックするよう昇格させます。

| ゲート                | ツール                                         | 場所                          | ブロックするか？       | 出力                                         |
| :-------------------- | :--------------------------------------------- | :---------------------------- | :--------------------- | :------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | 公開が失敗した場合のみ | npmjsバッジ / `npm audit signatures`         |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | 生成が失敗した場合のみ | リリースアセット + アーティファクト          |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | アドバイザリ           | CycloneDXアーティファクト                    |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | アドバイザリ           | SARIF (HIGH+CRITICAL) → セキュリティタブ     |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **ブロックする**       | 修正可能なCRITICALで`exit-code: '1'`         |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **ブロックする**       | `metrics.vulnCount`をラチェット（方向:down） |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | アドバイザリ           | SARIF → セキュリティ + バッジ                |

イメージCVEラチェットは、`docker-publish.yml`で**2つのステップ**を使用します。SARIFステップ（`HIGH,CRITICAL`、`exit-code: 0`）は、HIGH+CRITICALをブロックせずにセキュリティタブに表示します。_CRITICALゲート_ステップ（`severity: CRITICAL`、`ignore-unfixed: true`、`exit-code: 1`）は、**修正が利用可能な**CRITICAL CVEでリリースを失敗させます。`ignore-unfixed`は、アップストリームのパッチがないベースイメージのCVEによるリリースブロックを防ぎます。

## ⚠️ CVE の変動（ブロッキング osv/Trivy ゲート）

osv と Trivy は、依存関係を**継続的に増加する** CVE データベースと照合します。**依存関係を一切変更していない** PR でも、既存の依存関係に新しい CVE が公開されたことで、突然失敗することがあります（osv：測定された `vulnCount` がベースラインを超過、Trivy：イメージ内に修正可能な新しい CRITICAL が存在）。**これは、ブロッキング CVE ゲートで想定される運用上の挙動であり、製品のリグレッションではありません。**

新たに公開された CVE によって osv または Trivy が失敗した場合は、次のように対処します。

1. **影響を受ける依存関係を更新する**（推奨）— `package.json` の `overrides`（推移的依存関係の場合）を使用して修正済みバージョンへアップグレードするか、修正済みのベースイメージ上でイメージを再ビルドします。
2. **アップストリームに修正がない場合：**
   - **osv：** `config/quality/quality-baseline.json` の `metrics.vulnCount` を再ベースライン化します（`npm run quality:ratchet -- --update` は専用ゲートを対象としないため、`direction:down` の値を手動で編集）。その際、理由を示す注記と追跡用 Issue を追加します。
   - **Trivy：** `.trivyignore` にエントリ（1 行につき 1 つの CVE-ID）を追加し、理由を示すコメントと追跡用 Issue を記載します。パッチが存在しない CVE は、`ignore-unfixed: true` によってすでに自動的に除外されます。

必須の OSV 実行（`check:vuln-ratchet -- --ratchet`）では、スキャナー、レポート、またはベースラインを検証できない場合、`INCOMPLETE` と終了コード 2 でフェイルクローズします。測定結果にリグレッションがある場合は終了コード 1 となります。アドバイザリー実行では、引き続き終了コード 0 で `SKIP` が報告されることがありますが、これは依存関係がスキャンに合格したことを証明するものではありません。ブロッキング Trivy ステップでも、測定が正常に完了している必要があります。ツールが利用できない場合、ジョブが失敗した場合、またはイメージのエビデンスが欠落している場合、そのイメージがクリーンであるとは認定できません。

## 廃止された依存関係のリスク

固定された promptfoo 開発ツールをアップグレードしたことで、ルートのロックファイルには `extract-zip` およびそれへの依存関係エッジが含まれなくなりました。これにより、#14482 で追跡され、以前は許容されていた `promptfoo` → `@openai/codex-security` → `extract-zip` の依存関係チェーンが廃止されました。`tests/unit/extract-zip-14482-exposure.test.ts` のリグレッションチェックでは、このチェーンの再導入を拒否し、本番コードからのインポート禁止を維持します。

現在の依存関係の修正では、互換性オーバーライドの適用範囲も、Azure identity の MSAL クライアント、get-uri の FTP クライアント、および OpenCode v1 SDK の Zod 依存関係に限定しています。Azure のトークン取得と FTP 取得は、制御されたトランスポートを使用してテストされています。両方の OpenCode パッケージでは、それぞれ独自のビルドスイートとテストスイートが実行されます。レジストリのアドバイザリ件数は特定時点での測定値であり、ロックファイルのコミット後に変化する可能性があります。

## バックログ: Scorecardアドバイザリ → ブロッキング

Scorecardレポートを含む最初のグリーンリリース後:

- Scorecard: スコアラチェット (測定されたスコアを固定し、減少させない)。

フェーズ7のゲート (osv-scanner, gitleaks, actionlint+zizmor) を補完します。zizmor はワークフロー自体を監査し、Scorecard はリポジトリの全体的な姿勢を測定します。
