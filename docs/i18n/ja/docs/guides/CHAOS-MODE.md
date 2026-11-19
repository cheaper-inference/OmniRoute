# Chaos Mode (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ダッシュボード:** **Chaos Mode**（サイドバー）→ `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run`（ダッシュボードセッション）· `POST /api/skills/collect/chaos`（API キー）  
> **ソース:** `src/lib/chaos/chaosExecutor.ts`、`src/lib/chaos/chaosConfig.ts`

Chaos Mode は、**1 つのタスクを複数のプロバイダーへ同時に送信**します。参加する各プロバイダーがそれぞれ 1 つのモデルインスタンスを提供し、すべての回答を並べて（または連鎖させて）取得できます。これはマルチモデル実行機能であり、ルーティング戦略ではありません。通常の `/v1/chat/completions` トラフィックには一切影響しません。

**区別 — 名前に「chaos」を含むものは 3 種類あります:**

| 対象             | 概要                                                                                                                                                                                                  | ドキュメント                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**   | ここで説明するダッシュボードページと API。1 つのタスクを多数のプロバイダーへ展開します（並列または協調）。                                                                                            | このガイド                                   |
| `auto/chaos`     | Auto-Combo のモデル ID。プロバイダーごとに 1 つのモデルを使用し、それぞれに 1 回のアップストリーム呼び出しを行う並列ファンアウトです。障害注入ではありません（[詳細](#autochaos-parallel-fan-out)）。 | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos コンボ設定 | `config.chaos.enabled` が設定された永続化コンボは、同じ方法でファンアウトします（API のみ）。`judgeModel` は最終回答を選択するだけで、統合呼び出しは行いません。                                      | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: 並列ファンアウト

`auto/chaos` は、障害注入や耐障害性テストのための設定では**ありません**。`/v1/chat/completions` で `model: "auto/chaos"` をリクエストすると、次の処理が行われます。

1. **プロバイダーごとに 1 つのモデル**で構成されるパネルを作成します。接続済みの各プロバイダーの最初の候補を、候補プールの順序に従って最大 5 メンバーまで選択します
   （`OMNIROUTE_CHAOS_MAX_PANEL`、上限は 10）
   （`open-sse/services/autoCombo/virtualFactory.ts`）。`chaos-mode` ウェイトパックは各メンバーの `weight` を設定するだけで、ファンアウトはその値を参照しません。
2. 同じリクエストをすべてのパネルメンバーへ**並列に**送信するため、1 回のリクエストにつき、パネルメンバーごとに 1 回のアップストリーム呼び出しが発生します
   （`open-sse/services/autoCombo/chaosEngine.ts`、`open-sse/services/combo.ts` からディスパッチ）。
3. 各パネルメンバーの結果が到着するたびに、メンバーごとに 1 行のステータスをストリーミングします。デフォルトでは SSE コメント
   （`: chaos <index> ok|fail <model>`）として送信され、リクエストで
   `stream_options.include_chaos_parts: true` が設定されている場合は、さらに `omni-chaos-part`
   イベント（`model`、`index`、`ok`、`error`）も送信されます。これらに回答テキストは含まれません。
4. OpenAI 形式の最終チャンクとして、パネル回答のうち**1 つ**を送信します。最初のパネルメンバー（`auto/chaos` がそのメンバーを `judgeModel` として設定）が成功した場合はその回答を使用し、失敗した場合は最後に成功したメンバーの回答を使用します。他のパネル回答は返されないため、N 回分の呼び出し料金を支払っても、受け取る補完は 1 つだけです。

## 設定

1. 開ける**ダッシュボード→カオス モード**(`/dashboard/chaos`)。
2. 回してください**の上**—カオスモードが出荷される**デフォルトで無効になっています**( `src/lib/chaos/chaosConfig.ts`の`enabled: false` )。無効になっている間、 `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`応答します。
3. 参加者とデフォルトを選択します (設定ストアを介してインスタンスごとに保持されます)。

   | 分野                | 意味                                                                     | デフォルト/制限                               |
   | ------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
   | `enabled`           | マスタースイッチ                                                         | `false`                                       |
   | `defaultMode`       | `parallel`または`collaborative` (下記を参照)                             | `parallel`                                    |
   | `providerOverrides` | プロバイダーごとの参加 (`providerId`、オプションの`modelId`、 `enabled`) | 空の=アクティブなプロバイダーごとに、最大 200 |
   | `systemPrompt`      | 組み込みの Chaos システム プロンプトをオーバーライドします。             | オプション、最大 10,000 文字                  |
   | `timeoutMs`         | モデル呼び出しあたりの最大時間                                           | `120000` (5 000–600 000)                      |
   | `maxTokens`         | モデル呼び出しごとの`max_tokens`                                         | `4096` (256–128 000)                          |

4. 参加しているすべてのプロバイダーに**モデル**。プロバイダーのモデルは、カオス モード ページで有効になっているオーバーライドの`modelId`です (それが勝ちます)。それ以外の場合は、**デフォルトモデル**そのつながりの。プロバイダー ID がモデル名として使用されることはありません。どちらも持たないプロバイダーは、**呼ばれていない**: 結果には`status: "error"`として表示され、メッセージ _「このプロバイダーにはモデルが設定されていません。カオス モード ページまたは接続上のデフォルト モデルでモデルを設定してください。」_ と空の`modelId`が表示されますが、他のプロバイダーは通常どおり実行されます。選択したプロバイダーにモデルがない場合、実行はアップストリーム リクエストの前に失敗し、_「プロバイダーにモデルが設定されていません。…」_ (両方のエンドポイントでHTTP 500) が表示されます。
5. を実行します**ページ自体からテストする**—結果パネルには、各プロバイダーの回答、ステータス、期間が表示されます。

## 実行モード

- **`parallel`** — すべてのモデルが同じタスクを同時に受け取り、各回答を個別に取得します。
- **`collaborative`** — モデルは**連鎖的に**実行されます。各モデルは直前のモデルの出力を参照し、それを改善、拡張、批評するか、別の案を提示するよう求められます。レスポンスの`summary`フィールドには、成功した出力が連鎖順に連結されます（並列実行には`summary`がありません）。

## API

### `POST /api/chaos/run` —ダッシュボード セッション

Cookie 認証済み (管理セッション— [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)を参照)。ダッシュボード ページで使用されます。

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — APIキー

外部呼び出し元のベアラー トークンのバリアント。キーは次のものを運ぶ必要があります**カオスモード許可**(`chaosModeEnabled`)、つまり**デフォルトではオフになっています**—キーごとに有効にします**ダッシュボード→ APIマネージャー→編集キー→権限→カオス モード**。本体は上と同じです。

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

両方のエンドポイントは同じ形状を返します。

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## トラブルシューティング

- **`400 Chaos Mode is not enabled`**上記の—ステップ 2: グローバル スイッチはオフです。
- **APIキーが`/api/skills/collect/chaos`で拒否される**—キーにはキーごとの`chaosModeEnabled`権限がありません (デフォルトではオフ。これは設定であり、エラーではありません)。
- **プロバイダーは`No model set for this provider`を表示します**— 、[カオス モード] ページでモデルを設定するか、その接続でデフォルト モデルを設定します (セットアップ、ステップ 4 を参照)。
- **期待したプロバイダーが結果に表示されない**—カオス モード] ページで`providerOverrides`チェックし (無効なオーバーライドでは除外されます)、プロバイダー接続がアクティブかどうかを確認します。
