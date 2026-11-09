# Webhooks (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **真実の情報源:** `src/lib/webhookDispatcher.ts`、 `src/lib/db/webhooks.ts`、 `src/app/api/webhooks/`**最終更新日:** 2026-06-28 — v3.8.40

OmniRoute 、プラットフォーム イベントでHTTP Webhook を起動できます。これらを使用して、 Slack、 PagerDuty、 Datadog 、内部アラート サービス、または任意のHTTPレシーバーと統合します。

ディスパッチャは、各配信にHMAC-SHA256で署名し、一時的な障害が発生した場合は再試行し、Webhook ごとに配信の正常性を追跡し、失敗し続けるエンドポイントを自動的に無効にします。

## サポートされているイベント

`WebhookEvent`タイプ (`src/lib/webhooks/eventDescriptions.ts`、 `src/lib/webhookDispatcher.ts`によって消費される) は現在 7 つのイベントをモデル化しています。

| イベント                  | 発火時期                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `request.completed`       | プロキシされたリクエストが正常に完了しました                                                                |
| `request.failed`          | すべてのretries/fallbackの後にプロキシされたリクエストが失敗する                                            |
| `quota.exceeded`          | APIキーがbudget/quotaしきい値を超える                                                                       |
| `proxy.set_aside`         | プロキシ プール メンバーは、拒否が繰り返された後に確保されます (移行のみ)                                   |
| `proxy.pool.exhausted`    | プロキシ プール スコープのすべてのメンバーが確保されます                                                    |
| `provider.reset_redeemed` | バンク リセットの自動適用により、リセット クレジットまたはClaude毎週のセッション リセットが引き換えられます |
| `test.ping`               | テストエンドポイントによって使用される合成イベント                                                          |

サブスクリプションは、リテラルの`"*"`を受け入れて、すべてのイベントを受信します。 `events`内の不明なイベント名はディスパッチ時に無視されます。

> 注: ディスパッチャーAPIは有線ですが、一部の非`test.ping`イベントのプロダクション コール サイトはまだ着陸中です。 `grep dispatchEvent`をチェックして、リリースで現在ディスパッチャーを呼び出しているパスを確認してください。

## 建築

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

ディスパッチは発信者にとってはファイアアンドフォーゲットです。 `Promise.allSettled` は Webhook ごとのエラーを飲み込むため、1 つの悪い受信者が他の受信者をブロックすることはできません。

## HMAC署名

Webhook に`secret`がある場合、 OmniRoute JSON本文に署名し、以下を送信します。

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ヘッダー名には ( `X-OmniRoute-*`ではなく) `X-Webhook-*`プレフィックスが使用されます。署名値は`sha256=<hex>` —であり、完全なプレフィックスを検証します。

`createWebhook`がシークレットなしで呼び出された場合、 DBモジュールはシークレット (`whsec_<48 hex>`) を生成するため、すべての Webhook がデフォルトで署名されます。

### 受信機で確認する

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

常に照合して検証してください**生**JSON解析前のリクエスト本文。

## 再試行と失敗のポリシー

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 試行ごとに 10 秒のタイムアウト (`AbortController`)。
- HTTP 2xx は成功としてカウントされます。
- HTTP 3xx/4xx 、 `success = res.ok`で提供されたものとして記録された再試行不可能な最終ステータス—としてカウントされます。
- HTTP 5xx およびネットワーク エラーは、指数バックオフ: `2^attempt * 1000 ms` (1 秒、2 秒、4 秒) で再試行されます。
- `maxRetries`の後、配信は失敗として記録されます。
- 配信ごとに`last_triggered_at`、 `last_status`更新され、 `failure_count`がリセットまたはインクリメントされます。
- ディスパッチャは各ファンアウト後に`disableWebhooksWithHighFailures(10)`を呼び出すため、 `failure_count >= 10`を使用した Webhook は自動的に無効になります。

## データベース

テーブル`webhooks` (移行`011_webhooks.sql`):

| カラム              | タイプ  | 注意事項                                                        |
| ------------------- | ------- | --------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                            |
| `url`               | TEXT    | 宛先URL                                                         |
| `events`            | TEXT    | JSONアレイ。デフォルトの`["*"]`                                 |
| `secret`            | TEXT    | HMACシークレット (指定しない場合は自動生成)                     |
| `enabled`           | INT     | 0/1;デフォルトは 1                                              |
| `description`       | TEXT    | オプションの人間ラベル                                          |
| `created_at`        | TEXT    | `datetime('now')`                                               |
| `last_triggered_at` | TEXT    | 配信を試みるたびに更新されます                                  |
| `last_status`       | INT     | 最後の試行のHTTPステータス (0 =ネットワーク)                    |
| `failure_count`     | INT     | 成功すると 0 にリセットされ、失敗すると+ 1 にリセットされます。 |

配信履歴は、 `webhooks`行の集計カウンターに加えて、専用の`webhook_deliveries`テーブル (試行ごとに`src/lib/db/webhookDeliveries.ts::insertDelivery`経由で書き込まれる移行`069_webhook_deliveries.sql`) に保持されます。種類メタデータ (Slack / Discord / Telegram / カスタム ペイロード トランスフォーマー) は`070_webhooks_kind_metadata.sql`によって追加されました。

## REST API

すべてのエンドポイントには管理認証 (`requireManagementAuth`) が必要です。

| 終点                            | 方法   | 説明                                        |
| ------------------------------- | ------ | ------------------------------------------- |
| `/api/webhooks`                 | GET    | Webhook のリスト (マスクされたシークレット) |
| `/api/webhooks`                 | POST   | Webhook の作成                              |
| `/api/webhooks/[id]`            | GET    | Webhook の詳細 (完全な秘密)                 |
| `/api/webhooks/[id]`            | PUT    | フィールドを更新する                        |
| `/api/webhooks/[id]`            | DELETE | 取り除く                                    |
| `/api/webhooks/[id]/test`       | POST   | `test.ping`を起動します (再試行なし)        |
| `/api/webhooks/[id]/deliveries` | GET    | 1 つの Webhook に対する最近の配信試行       |
| `/api/webhooks/validate-url`    | POST   | 飛行前URL検証 (SSRFガード)                  |

`GET /api/webhooks`リスト ページでの漏洩を避けるために、 `<first 10 chars>...`に対して秘密をマスクします。実際にシークレットが必要な場合は、 `[id]` GET使用してください。

### Webhook の作成

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

`secret`が省略された場合、サーバーは`whsec_<hex>`シークレットを生成し、応答でそれを返します。

### Webhook をテストする

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }`を返します。再試行は行われません—は、受信者がペイロードと署名を受け入れるかどうかを迅速に検証するのに役立ちます。

## ダッシュボード

`/dashboard/webhooks`のダッシュボード ページ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx`」を参照) には次のものが含まれます。

- イベントピッカーを備えたCreate/edit Webhook
- `enabled`、 `failure_count`、および`last_status`に基づくステータス インジケーター (アクティブ / 非アクティブ / エラー)
- ワンクリックでテスト配信
- 手動enable/disable切り替え

## ペイロードの例

### リクエスト.完了

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### テスト.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

非`test.ping`イベントのフィールド形状は、それらを発行する呼び出しサイトによって定義されます。 `data`オブジェクトを上位互換性があるものとして扱います (フィールドを追加し、不在に依存しません)。

## ベストプラクティス

- **配達ごとに署名を確認する**生の本体—に対して、Webhook URLを推測する誰かによるなりすましPOSTs防ぎます。
- **~ 5 秒以内に 2xx を応答する**—ディスパッチャは 10 秒でタイムアウトします。遅い受信者は再試行を消費し、 `failure_count`を増大させます。
- **ハンドラーを冪等にする**—再試行と少なくとも 1 回の配信セマンティクスにより、重複が発生する可能性があります。
- **購読は最小限に**— 、実際に消費するイベントのみをリストします。 `"*"` 、あなたが制御していない受信機にコストを追加します。
- **`failure_count`見る**—エンドポイントは、10 回連続して失敗すると自動的に無効になります。受信機を固定した後、 `enabled: true`で`PUT /api/webhooks/[id]`を呼び出すことでリセットします。
- **シークレットを定期的にローテーションする**— `PUT`新しい`secret`、新しい値を受信機にデプロイし、テスト エンドポイント経由で確認します。

## 関連項目

- [API_REFERENCE.md](../reference/API_REFERENCE.md) —完全管理APIサーフェス
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) —サーキット ブレーカー/プロバイダー障害の背後にあるクールダウン セマンティクスが`request.failed`経由で表面化
- 出典: `src/lib/webhookDispatcher.ts`、 `src/lib/db/webhooks.ts`
