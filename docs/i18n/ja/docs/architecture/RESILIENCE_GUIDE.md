# Resilience Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRouteは、3 つの異なる、しかし関連した復元メカニズムがあります。それぞれに異なる範囲と目的があります。ルーティング動作をデバッグするときは、それらを分離してください。

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> 出典: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **復元力の切り替えにおける環境とダッシュボードの優先順位。**環境— `QUOTA_PREFLIGHT_CUTOFF_ENABLED`、 `PROVIDER_COOLDOWN_ENABLED`、 `STREAM_RECOVERY_ENABLED`、 `STREAM_RECOVERY_MIDSTREAM_ENABLED`、 `STREAM_THROUGHPUT_WATCHDOG_ENABLED` —からシードされたオプトイン復元力トグルは、 _default_ (`DEFAULT_RESILIENCE_SETTINGS`、 `src/lib/resilience/settings.ts`) のみを提供します。 `resilienceSettings`に保持されるブール値 (ダッシュボード→** →回復力の設定**/ `PATCH /api/resilience`、 `key_value`に格納されている) が env 値より優先されます。正規化 (`toBoolean`、 `src/lib/resilience/settings/normalize.ts`) は、ブール値が存在する場合は常に、格納されたブール値を保持します。ダッシュボードに既に`false`が保存されているデプロイメントでそのような環境変数を`true`に設定すると、何も変更されません—トグルを反転します。**設定→レジリエンス**(または保存されたフィールドをクリアします)。

## 1. プロバイダーサーキットブレーカー

**スコープ:** プロバイダー全体（例: `glm`、`openai`、`anthropic`）。

**目的:** アップストリーム/サービスレベルで繰り返し失敗しているプロバイダーへのトラフィック送信を停止します。

**実装:**

- コアクラス: `src/shared/utils/circuitBreaker.ts`
- ワイヤリング: `src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- ステータスAPI: `GET /api/monitoring/health`
- リセットAPI: `POST /api/resilience/reset`
- ラッパー: `open-sse/services/accountFallback.ts`
- DBテーブル: `domain_circuit_breakers`

**状態:**

- `CLOSED` — 通常のトラフィックが許可されます
- `DEGRADED` — トラフィックは引き続き許可されますが、増加したプロバイダーの失敗が追跡されています。十分な回数の成功、有効な接続テスト、または最後の失敗種別に対する最長の `OPEN` 保持期間（その `cooldownByKind` 値、なければ `resetTimeout`、× `maxBackoffMultiplier`、最低1回分のクールダウン）が新たな失敗なく経過すると、`CLOSED` に戻ります
- `OPEN` — プロバイダーが一時的にブロックされます。コンボルーティングはこれをスキップします
- `HALF_OPEN` — リセットタイムアウトが経過しました。プローブリクエストが許可されます

**設定可能なデフォルト値（`open-sse/config/constants.ts`、ダッシュボード → 設定 → レジリエンス で公開）:**

| クラス  | DEGRADED 移行 | OPEN 移行  | リセットタイムアウト |
| ------- | ------------- | ---------- | -------------------- |
| OAuth   | 5回の失敗     | 8回の失敗  | 60秒                 |
| API-key | 7回の失敗     | 12回の失敗 | 30秒                 |
| Local   | 派生          | 2回の失敗  | 15秒                 |

`degradationThreshold` はプロバイダーが `DEGRADED` に移行するタイミングを制御し、`failureThreshold` はオープンしてスキップされるタイミングを制御します。ローカルプロバイダープロファイルは、まだレジリエンス設定ページでは公開されていません。

**トリップコード:** プロバイダーレベルのステータス `[408, 500, 502, 503, 504]` のみです。アカウントレベルのエラー（ほとんどの 401/403/429 — これらはクールダウンまたはロックアウトに該当）ではトリップしません。

**遅延回復:** `OPEN` の期限が切れると、`getStatus()`、`canExecute()`、`getRetryAfterMs()` が状態を `HALF_OPEN` に更新します。同じ読み取り（および次の失敗）によって、古くなった `DEGRADED` は `CLOSED` へと減衰して戻ります。バックグラウンドタイマーは不要です。

---

### オプトインのグローバルプロバイダークールダウン（ウィンドウゲート）

4つ目の **オプトイン** レイヤー（`PROVIDER_COOLDOWN_ENABLED`、デフォルト **オフ**）は、失敗したプロバイダーのリクエスト間メモリを `open-sse/services/providerCooldownTracker.ts` に保持します。これはコンボターゲット解決によって参照され、連続するコンボリクエストが直前に失敗したプロバイダーを再びたどらないようにします。プロバイダーレベルのエントリは `PROVIDER_PROFILES` ウィンドウゲートに従います:

| プロファイル | トリップ条件（`providerFailureThreshold`） | ウィンドウ期間（`providerFailureWindowMs`） | クールダウン時間（`providerCooldownMs`） |
| ------------ | -----------------------------------------: | ------------------------------------------: | ---------------------------------------: |
| OAuth        |                                       `10` |                                     `15min` |                                   `5min` |
| API key      |                                       `15` |                                     `30min` |                                  `10min` |

閾値未満の場合、プロバイダーはクールダウン中とは **みなされません**。成功するとウィンドウはクリアされます。接続レベルのエントリ（`provider:connectionId`）は、代わりに指数関数的な `minRetryCooldownMs → maxRetryCooldownMs` バックオフを維持します。オーバーライド: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。リグレッションガード: `tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 接続のクールダウン

**範囲：**単一プロバイダーconnection/account/key.

**目的：**同じプロバイダーの他の接続がサービスを継続している間、1 つの不正なキーをスキップします。

**実装：**

- 使用不可としてマーク: `src/sse/services/auth.ts::markAccountUnavailable()`
- 選択: 同じファイル内の`getProviderCredentials*`
- クールダウン計算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定: `src/lib/resilience/settings.ts`

**接続ごとのフィールド:**

- クールダウンが期限切れになるまでの`rateLimitedUntil` —タイムスタンプ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` —指数バックオフカウンター

**デフォルトのクールダウン:**

- OAuthベース: 5秒
- APIキーベース: 3秒
- API キー 429: アップストリームの`Retry-After`/reset headers/parseableリセット テキストを優先します
- バックオフ: `baseCooldownMs * 2 ** failureIndex`

**プロバイダーごとの再試行遅延。**プロバイダーの詳細ページには、**再試行の遅延**(自動、15 秒から最大 1 時間) を選択します。 `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1 ～ 21600、 `PATCH /api/resilience`まで) を保存します。レート制限エラーによってアップストリームの再試行ヒントが伝えられない場合、その値がプロバイダーのスケーリングされたバックオフを置き換え、 `backoffLevel`を 0 (`open-sse/services/rotationConfig.ts::overrideFor`) にリセットします。レート制限エラーの優先順位、最も高い順: アップストリーム再試行ヒント、次に接続ごとの`providerSpecificData.rotationOverrides.rateLimitResetSeconds`、次にプロバイダーごとの再試行遅延、次に env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`、次にスケーリングされたバックオフ。フィールドは自動で削除されます。これはレート制限の理由にのみ影響し、最終状態には影響しません。

**対雷群ガード:**クールダウンの過度の延長や`backoffLevel`二重増分による同時障害を防ぎます。

**Concurrency-limit 429s do not climb the backoff ladder.** A `429` whose body reports a concurrency limit ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) means the account is healthy but busy. `checkFallbackError()` returns reason `concurrency_limited`: fail over to the next connection now, cool this one for a fixed `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) or the upstream retry hint, keep `backoffLevel` unchanged, and set `skipProviderBreaker`. An explicit quota body still wins, so a body that also matches a quota pattern stays a quota verdict. Detection: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (the breaker's `FailureKind`) is unchanged and still reads `rate_limit` for these bodies.

**ストリームコンテンツの停滞はアカウントを冷やしません。**コンテンツ ストール ウォッチドッグ (`open-sse/utils/streamHandler.ts`) が時間内にモデル出力を送信しなかったストリームを諦めると、 `markAccountUnavailable()`接続にエラーを記録しますが、クールダウンは設定しません。ストールはそのリクエストに属し、ほとんどの場合、出力がまだない長い推論ターンになります。オペレーターは`resilienceSettings.streamStallCooldown.enabled` (デフォルトは`false`) を使用してオプトインし直すことができます。

**`p2c`アカウント選択のためのオプトイン レイテンシー シグナル。**ディスパッチされた各試行は、最初のバイトまでの時間と接続ごと (および接続+モデルごと) の結果をメモリ内のローリング ウィンドウに記録します。つまり、15 分以内の最後の 20 サンプル (`open-sse/services/connectionLatencyTracker.ts`、 `src/sse/handlers/chatHelpers.ts`の`safeLogEvents()`から記録)。 `resilienceSettings.p2cLatency.weight`が`0`より大きい場合 (範囲 0 ～ 20、デフォルトの`0` =オフ)、 `src/sse/services/auth.ts`内の`compareP2CConnections()`ペアの各候補への`weight`ポイントを合計します。その半分は、より高速な候補との比率としてのレイテンシ (2 倍遅いと半分になります) から生じ、残りの半分はローリング エラー率から生じます。この用語は、両方の候補者が少なくとも 3 つのサンプルを持っている場合にのみ適用されるため、新しいアカウントにはペナルティが課されず、その上限はクォータブロックおよびクォータ枯渇ペナルティを下回ります。独自の回路は追加されません。失敗したアカウントは引き続きクールダウン、ロックアウト、ブレーカー層によって処理されます。 `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`で設定します。

**Reasoning frames restart the content-stall budget.** A reasoning model can think for minutes before its first visible token: Claude streams `thinking_delta` frames whose thinking text may be empty, and the Responses API streams one reasoning item after another. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) recognises these frames, and the watchdog restarts its budget on each one instead of cancelling the turn. They are still not model output, so a turn that ends with reasoning only is still reported as empty, and a turn that stops reasoning and only sends heartbeats still trips the watchdog.

空ではない署名を持つKiroのバイナリ`reasoningContentEvent`フレームは、エグゼキューターを通じてこの推論アクティビティを空の`reasoning_content`デルタとして保存します。署名は転送されません。メタデータ、不完全なフレーム、空の署名によってコンテンツ予算が再開されることはありません。独立したアクティブ ストリーム タイムアウトとクライアント キャンセルは引き続き適用されます (`open-sse/executors/kiro/reasoning.ts`)。

**ターミナル状態 (NOTクールダウン):**

- `banned` —禁止されたキーワード/アカウント禁止の検出によって設定されます ( [BAN_DETECTION](../security/BAN_DETECTION.md)参照)。アップストリームのリクエストごとの拒否 (`request_rejected`、例: Anthropic OAuth 403 "リクエストは許可されていません") は決して設定しません。これらは接続およびモデルごとにカウントされ、 `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 時間) を上限とする増加するクールダウンでそのモデルをローテーションから除外するか、モデルが不明な場合は接続を冷却します— `open-sse/services/requestRejectedStreak.ts`
- `expired` (制限付き再試行後にターミナルに遷移します。 —指数バックオフ付き— `EXPIRED_RETRY_MAX = 3` 、一時的なOAuthエラーは、アカウントが完全に非アクティブ化される前に自己修復できます)
- `credits_exhausted`

これらは、資格情報が変更されるか、オペレーターが資格情報をリセットするまで保持されます。ターミナル状態を一時的なクールダウン状態で上書きしないでください。

**遅延回復:** `rateLimitedUntil`が経過すると、再び接続が可能になります。使用に成功すると、 `clearAccountError()`すべてのエラー フィールドをクリアします。

### Claude OAuth使用量の壁: 低優先レーン+セッション制限のリセット

**範囲：** 1 つのClaudeサブスクリプション (OAuth) 接続。どちらの特徴も**接続ごとのオプトイン**( `providerSpecificData`接続→ Claudeセクション→ `lowPriorityMode` / `autoLimitReset`を編集、どちらもデフォルトでオフ)、 Claudeコードの`/low-priority`および`/limit-reset`コマンド ( Claudeコード 2.1.263 からキャプチャされたワイヤ コントラクト) をミラーリングします。

**実装：**

- ステートマシン+応答分類: `open-sse/services/claudeLowPriority.ts`
- status/claimクライアントをリセット: `open-sse/services/claudeLimitReset.ts`
- Executor フック (ヘッダー インジェクション+同じアカウントの再試行): `open-sse/executors/base.ts::execute()`
- オプトイン永続性: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**トリガー：** 5 時間使用ウォール— `429`のヘッダーには`anthropic-ratelimit-unified-status: rejected`が含まれ、アカウントが対象である場合は`anthropic-ratelimit-unified-slow-offer: treatment`含まれます。最初の壁 429 より前には何も送信されません。統合ヘッダーのないバースト 429 は、通常のクールダウン パスを通過します。

**優先度の低いレーン**(`lowPriorityMode`):

- ウォール 429 では、執行者は申し出を受け入れ、すぐに再試行します。**同じ**`anthropic-usage-limit: slow`のアカウント。レーンは、アナウンスされた`anthropic-ratelimit-unified-reset` (+ 60s 猶予) までアクティブのままであり、そのウィンドウ内のすべてのリクエストにはヘッダーが含まれます。傍受された 429 は`handleChatCore`に到達しないため、接続は**ない**クールダウンに入り、回転されません。
- 後の応答では`anthropic-ratelimit-unified-slow-status` : `active` / `not_needed`車線を維持します。 `slot_busy` (429) または`529` 、サーバーの`anthropic-ratelimit-unified-slow-retry-after` (デフォルト 20 秒、クランプ 5 ～ 600 秒、 ± 30% ジッター) を待ってから、 `anthropic-ratelimit-unified-slow-max-wait` (デフォルト 20 分、クランプ 1 分～6 時間) —を超えてレーンが終了し、10 分間の冷却により再受け入れがブロックされるまで待って再試行します。さらに、待機時間は、リクエスト自体のアップストリーム開始タイムアウト (`resolveFetchStartTimeout`、デフォルトでは 10 分) から 5 秒のマージンを差し引いた残り時間によって制限されます。この制限がないと、デフォルトの 20 分の max-wait がリクエストを超えて存続し、スリープが待機中に中止され、正常な`max_wait`終了+クールオフの代わりに`TimeoutError`が表示されます。
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`、5時間ウィンドウロールオーバー、または`ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (支払われた超過料金が壁を覆うため、どのステータスでも`extra_usage`として終了します) レーンを終了します。その後、応答は通常のクールダウン パスに流れます。 `budget_exhausted` 、発表された予算リセットまで記憶されます (≤ 8 日間)。
- ウォール チェックは、実行者自身の 400 回の試行内再試行 (コンテキスト編集、 thinking/effortクランプ、パラメータの自動学習) の後に実行されるため、これらの再試行の 1 回でのみ表面化したウォール 429 は、クールダウン パスに到達せずにインターセプトされたままになります。
- 状態は接続ごとにメモリ内にあります (再起動には、再受け入れに 1 つの追加ウォール 429 がかかります)。

**セッション制限のリセット**(`autoLimitReset`、両方がオンの場合にレーンの前で試行):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`ブロック; `arm: "reset"`と`available: true`、 `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`と`{ "program": "juniper_tide" }` ( `providerSpecificData.organizationUUID`からの組織UUID 、ブートストラップ フォールバック) の場合。
- `result: reset|not_limited` →リクエストはフルスピードで再試行されます (低速ヘッダーなし)。 `already_used` / `not_offered`メモイズ`next_available_at` (デフォルトは 1 週間);失敗した場合は 15 分間バックオフされます。リセットは週に 1 回ですが、それでも週の制限にカウントされます。

回帰ガード: `tests/unit/claude-low-priority-mode.test.ts`、 `tests/unit/claude-limit-reset.test.ts`、 `tests/unit/claude-low-priority-executor.test.ts`。

### バンクリセットを自動適用

**範囲：** CodexおよびClaudeサブスクリプション (OAuth) 接続。**オプトイン**: `bankedResetAutoApply`設定はオフで、デフォルトでは`dry-run`モードになっています (設定→ AI →バンク リセットを自動適用)。

**目的：**アカウントが使用量の壁に達したときに、オペレーターがプロバイダーの制限ページで「引き換え」を押すのを待つのではなく、バンクのリセットを自分で支出します。

| クレジットタイプ (`creditTypes`) | 何が償還されるのか                            | どこで実行されるか                                             |
| -------------------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| `codexCredits`                   | Codexリセット クレジット                      | バックグラウンド ジョブ、60 秒ごと                             |
| `claudeCredits`                  | Claudeバンク助成金 (`GRANT`クレジット)        | バックグラウンド ジョブ、60 秒ごと                             |
| `claudeSessionReset`             | Claudeの週単位のセッション制限のリセット (上) | リクエストパス、アカウントごとの切り替えと同じポリシーを介して |

**実装：**

- 純粋な決定 (両方のパスに 1 つのルール セット): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- バックグラウンドジョブ: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts`で開始)
- Claudeリクエスト パス ゲート: `src/lib/usage/claudeSessionResetPolicy.ts`、 `setClaudeLimitResetPolicy()`を通じて`open-sse/services/claudeLimitReset.ts`に登録
- 歴史、キャップ、Webhook: `src/lib/usage/bankedResetAudit.ts`
- 履歴API: `GET /api/settings/banked-reset-auto/history?limit=50` (管理認証)

**決定順序**(最初に失敗したルールが記録された理由です):

1. 機能がオフ、クレジット タイプがオフ、またはアカウントが範囲外です (`accountScope` `all` / `selected`とアカウントごとの`connections`マップ)。
2. オプションのUTCスケジュール外 (`startHourUtc` > `endHourUtc`真夜中を横切る)。
3. 過去 24 時間の上限: 2 つの引き換えの間の`maxPerAccountPerDay` (1)、 `maxPerDay` (3)、および`minSpacingMinutes` (30)。
4. トリガー: 壁に囲まれた`session`または`weekly`ウィンドウ (すべてのウィンドウが費やされたアカウントを報告するだけの`isAccountQuotaExhausted()`ではなく`getQuotaWindowStatus().reachedThreshold`から読み取られます)、または少なくとも`expiringCreditMinUsedPercent` (50) を使用したアカウントの`expiringCreditHours` (24) 以内に期限切れになるクレジット。
5. ナチュラル リセット ガード: `sessionResetGuardMinutes` (90) 内で壁に囲まれた 5 時間ウィンドウがリセットされる場合、または`weeklyResetGuardHours` (12) 内で壁に囲まれた週次ウィンドウがリセットされる場合はスキップします。
6. 週次フロア: 週次残りが`weeklyFloorPercent` (10) を下回る場合、5 時間のリセットをスキップします。
7. `last-resort`モード: 同じプロバイダーの別の範囲内アカウントが両方のウィンドウに少なくとも`poolHeadroomPercent` (10) 残っている間はスキップします。クレジットの期限切れトリガーはこれを回避します。
8. `dry-run`を記録しますが、何も引き換えません。 `last-resort`と`eager`を引き換えます。

クォータ データが不足していると、引き換えのロックが解除されることはありません。リセット時間が不明であったり、毎週の使用量がスキップされたりします。

**Claudeセッションのリセット:**機能がオフまたは`claudeSessionReset`オフの場合、アカウントごとの`autoLimitReset`トグルは以前とまったく同じように決定します。両方をオンにすると、この機能はアカウントごとの切り替えを置き換えます。スコープ内のアカウントはポリシーで許可されている場合にのみ要求でき、 `dry-run`モードでは要求は行われません。

**安全性：**ジョブはティックごとに最大 1 クレジットを引き換え、クレジットをリストする前に決定し (スキップされたアカウントは決してリストされません)、べき等キー`auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`を使用し、リストまたは引き換えの失敗後にアカウントを 1 時間バックオフします。すべての償還、失敗、予行決定は`audit_log` (`action: "bankedReset.redeem"`、トークンやクレジット ID なし) に書き込まれます。キャップはそれらの行からカウントされるため、再起動後も存続します。引き換えが成功すると、 `provider.reset_redeemed` Webhook も起動されます。

回帰ガード: `tests/unit/banked-reset-policy.test.ts`、 `tests/unit/banked-reset-auto-apply.test.ts`、 `tests/unit/claude-limit-reset-policy-gate.test.ts`、 `tests/unit/banked-reset-history-route.test.ts`。

### セッション アフィニティ (#7274)

**範囲：** 1 つの接続に固定された 1 つのクライアント セッション (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`ヘッダー)**どれでも**プロバイダー。

**目的：**マルチターン エージェント (Claudeコード、エイダー、カスタム エージェント) をリクエスト間で同じアカウントに維持し、アカウント間のコンテキスト損失と、アカウントごとのセッション状態を持つプロバイダーでのコールド スタート 429 の繰り返しを削減します。

**実装：**

- TTL解像度: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ピンselection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ヘッダー抽出 (汎用、任意のプロバイダー): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- 永続ピンテーブル: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- 設定: `sessionAffinityTtlMs` (ミリ秒単位のグローバルTTL 、 `0`無効化) — `src/lib/db/settings.ts`。移行`124_generic_session_affinity_ttl.sql`によって Codex 専用`codexSessionAffinityTtlMs`から名前が変更され、以前に構成されたCodex TTLが新しいデフォルトとして引き継がれます。

#7274登場する前は、 `resolveSessionAffinityTtlMs()` `codex`除くすべてのプロバイダーの`0`にハード ベイルされていたため、固定メカニズムとヘッダー抽出がすでにプロバイダーに依存しなかったとしても、 TTL設定 (およびセッション ヘッダー) は他の場所には影響を与えませんでした。この修正により、早期復帰が削除されました。 TTL 、 `0`より上にグローバルに設定されると、すべてのプロバイダーに均一に適用されるようになりました。

3 つのセッション アフィニティ ヘッダーはアップストリームに転送されることはありません—実行プログラムは、クライアント ヘッダーを渡すのではなく、独自のアップストリーム ヘッダーを最初から構築するため、これは内部相関 ID のみに留まります。

### 排他的な管理されたセッション接続リース

**範囲：** 1 つのアクティブな管理対象HTTP client/session 1 つの適格なOmniRoute接続を所有します。

**目的：**リクエスト全体にわたるハード ルーティング フェンスを必要とするクライアントに、永続的な排他的接続所有権を提供します。これは、ソフトな継続性の設定であるセッション アフィニティとは異なります。排他的リースは、 SQLiteのライフサイクル状態を保持し、グローバルなアクティブ所有者とアクティブ接続の一意性を強制し、プロバイダーのディスパッチ前に古い世代を拒否します。

この機能は、 APIキーごとにオプトインされます。マネージド キーには、 `lease:exclusive`スコープと空ではない明示的な`allowedConnections`リストが必要です。すべてのHTTPクライアントはライフサイクル エンドポイントを使用できます。クライアント名、ユーザー エージェント、プロバイダー、 OAuthメソッド、モデルは必要ありません。リースはモデルではなく接続を所有するため、接続が通常は適格なままであれば、モデルを変更してもバインドが保持されます。通常のモデル、クォータ、ヘルス、クールダウン、および許可リストのルールは引き続き権威を持ち、同じ世代を別の無料の適格な接続に移行する可能性があります。

ライフサイクルは`POST /api/v1/session-leases`で、 JSONアクション`acquire`、 `renew`、および`release`を伴います。マネージド推論リクエストは、不透明な`X-OmniRoute-Lease-Owner`値と正確な`X-OmniRoute-Lease-Generation`提示します。所有者は、 `vlo_`の後に 43 個のbase64url 文字を使用します。 SHA-256ハッシュのみが保存されます。すべての最終ディスパッチ フェンスは、認証されたAPIキーIDとアクティブな接続IDもバインドします。リース制御ヘッダーは、ログ、保持された要求スナップショット、および上流の実行ヘッダーから削除されます。

通常のルーティングに適格な管理対象候補があるが、すべての空き候補が外部アクティブ リースによって占有されている場合、 OmniRoute HTTP `429`、リース容量利用不可コード、容量待機状態、および関連する最も早い有効期限から導出された制限付き`Retry-After`を返します。通常の空の適格性はリース競合ではなく、既存のルーティング エラー セマンティクスを維持します。

関連するメカニズムは別個のままです。

- OAuthセッション占有は、 OAuthアカウントに対するプロセスローカルのソフト配布です。
- アカウント セマフォはリクエストの同時実行許可を付与し、リクエストが完了すると終了します。
- 排他的管理セッション リースは、世代フェンスを備えた永続的なライフサイクル所有権です。

---

## 3. モデルロックアウト

**対象範囲:** プロバイダー + 接続 + モデルの組み合わせ。

**ステータスごとのスコープ:** ロックアウトが書き込むキーは、失敗したステータスによって決まります
（`open-sse/services/accountFallback/exactModelLock.ts` の `resolveLockoutScope()`）:

- `429` / `403` / `402` — クォータまたは権限を示すシグナル — **クォータファミリー**をロックします:
  codex では接続内のすべての `gpt-5*` モデルを含む `codex` / `spark` スコープ全体を対象とし、
  その他のプロバイダーでは `getQuotaScopedModelForProvider()` を使用します。
- `404` はベアモデルをロックします（`getModelLockKey()` により `not_found` を絞り込みます）。
- その他のステータス — `5xx` のトランスポート/サーバー障害、および品質検証から OmniRoute が独自に
  生成する `502` — は、**正確な**プロバイダー/接続/モデルの組み合わせのみをロックします。
  あるモデルでストリームが不正になっても、アカウントのクォータに関する証拠にはなりません。
  このルール以前は、`codex/gpt-5.6-luna` で空のレスポンスが1回発生すると、その接続のすべての
  `gpt-5*` モデルがルーティングから2〜30分（段階的に増加）除外されていましたが、クォータ自体は
  影響を受けていませんでした。
- 呼び出し元が明示的に指定した `scope` オプションは常に優先されます（Antigravity は `"exact"` を渡します）。

**目的:** 1つのモデルだけが利用できない、またはクォータ制限を受けている場合に、接続全体を無効化しないようにします。

**例:**

- 429 を返すモデル単位のクォータプロバイダー
- 1つの存在しないモデルに対して 404 を返すローカルプロバイダー
- プロバイダー固有のモード/モデル権限エラー（例: Grok のモード）

**実装:** `open-sse/services/accountFallback.ts` — `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### モデルクールダウンダッシュボード (v3.8.0)

UI: 設定 → モデルクールダウン (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

アクティブなロックアウトを、プロバイダー、接続、モデル、理由、expiresAt とともに一覧表示します。オペレーターはカードからモデルを手動で再有効化できます。

**REST API:**

- `GET /api/resilience/model-cooldowns` — アクティブなロックアウトを一覧表示
- `DELETE /api/resilience/model-cooldowns` — 手動で再有効化。本文: `{provider, connection, model}`。認証: management。

### クールダウンマネージャー

UI: モニタリング → クールダウンマネージャー (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)。

一時的な理由でルーティング対象外になっているすべての接続を、プロバイダーごとのページを個別に開かずに
1つのページで確認できます。接続のクールダウン、モデルロックアウト、終端状態を一覧表示し、
接続単位、選択対象、またはプロバイダーのすべての接続に対してこれらを解除できます。また、最も頻繁に
調整されるクールダウンルールである `streamStallCooldown.enabled` と、OAuth / API-key の
`connectionCooldown` の基本クールダウンおよび最大バックオフステップ数を編集できます（
`PATCH /api/resilience` で保存）。終端状態（`banned`、`expired`、`credits_exhausted`）は
一覧表示されますが、ここで解除されることはありません。

同じページにある **エラークールダウンルール**カードでは、`PATCH /api/settings` を通じて
オペレーターエラールール（`settings.providerErrorRules`）と、プロバイダーごとのキャッチオールデフォルト
（`settings.providerErrorDefaults`）を編集できます。これらのルールの一致方法については、§7 の
「オペレーター宣言ルール」を参照してください。期間はデフォルト（明示的なクールダウンなし）、30分、
1時間、5時間、24時間、または1〜43,200分（30日）のカスタム値から選択できます。

**REST API** (`src/lib/resilience/cooldownManager.ts`、認証: management):

- `GET /api/resilience/cooldowns[?provider=]` — ステータス、残りのクールダウン、バックオフレベル、
  最後のエラー種別、モデルロックアウトを含む接続（認証情報は含まれません）
- `POST /api/resilience/cooldowns` — 本文 `{connectionIds: string[]}` または
  `{all: true, provider?}`。`{cleared, unchanged, skippedTerminal, lockoutsCleared}` を返します

### ロックアウト設定 UI + 成功による減衰回復 (v3.8.23)

モデルロックアウトは、常に有効なハードコード動作から、専用の設定カードを備えた完全に構成可能な
オプトイン機能へと変更され、自己修復型の回復経路も追加されました。

**設定カード:** 設定 → モデルロックアウト
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)。
これは上記の読み取り専用 `ModelCooldownsCard`（アクティブなロックアウトを _一覧表示_ するだけ）とは
**別のもの**です。新しいカードではパラメーターを _設定_ します。デフォルト値は
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) にあります。

| 設定                    | デフォルト値                     | 意味                                                            |
| ----------------------- | -------------------------------- | --------------------------------------------------------------- |
| `enabled`               | `false`                          | マスタートグル — モデルロックアウトは**デフォルトで無効**です。 |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | モデルスコープの失敗として扱う上流ステータス。                  |
| `baseCooldownMs`        | `120_000` (120 s)                | 最初の失敗時の初期ロックアウト期間。                            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | 段階的に増加するクールダウンの上限。                            |
| `maxBackoffSteps`       | `10`                             | 指数バックオフの最大エスカレーションステップ数。                |
| `useExponentialBackoff` | `true`                           | 繰り返す失敗時にクールダウンを指数関数的に増加させるかどうか。  |

設定は通常の設定ストアに保存され、レジリエンス設定スキーマによって検証されます。カードでは
`baseCooldownMs`/`maxCooldownMs`（`maxCooldownMs ≥ baseCooldownMs`）と
`maxBackoffSteps` に上限・下限が適用されます。

**成功による減衰回復:** 回復は、単にタイマーが期限切れになるだけではありません。正常なレスポンスによって
モデルの失敗回数が減少するため、回復したモデルは期間内であってもエスカレーションが停止し、
ロックアウトが解除されます。正常なコンボ対象に対して、`open-sse/services/combo.ts` は
`decayModelFailureCount()`（`open-sse/services/accountFallback.ts`）を呼び出します。これは保存されている
`failureCount` を半分にし（`Math.floor(failureCount / 2)`）、`0` に達するとロックアウトエントリ全体を
削除します。対となる `recordModelLockoutFailure()` は、エスカレーション期間内の失敗時に回数を増加させ
（クールダウンをエスカレートさせ）ます。この成功による減衰は通常のタイマー期限切れに加えて行われます。
どちらの経路でもモデルを再有効化できます。

**状態:** ロックアウトは**メモリ内**（プロセスごとの `Map`s に `ModelLockoutEntry` を
`provider:connectionId:model` をキーとして保持し、完全一致スコープのロックは
`provider:connectionId:exact:model` をキーとして保持）され、DB には永続化されません
— 再起動すると失われます。_設定_ は永続化されますが、アクティブな
ロックアウト _状態_ は一時的なものです。

---

## 4. クォータ共有同時実行制御 (v3.8.36)

サブスクリプション アカウント (GLM、 MiniMaxなど) は、多くの場合、 ~ 1 ～ 3 の同時リクエストのみを受け入れます。それを超えると、429 秒とクールダウンがトリガーされます。これは深刻です**クォータシェア**(`qtSd/…`) コンボ。複数のAPIキーが 1 つのアップストリーム アカウントを共有します。 3 つの層により、共有アカウントの洪水を防ぎます。

### 接続ごとの同時実行数の上限 (`max_concurrent`)

各プロバイダー接続は、 `max_concurrent`上限 (`provider_connections.max_concurrent`、接続モーダル / API / DBで設定) を宣言できます。制限を設けない場合は空のままにします。これは、 —の下のシリアル化レイヤーを駆動し、アカウントの実際の同時実行性に設定する単一のノブです (例: GLM ~ 1、 MiniMax ~ 2)。

### モデルごとの同時実行数の上限 (`modelConcurrency`)

接続では、 `rateLimitOverrides`マップ内でモデルごとの正確な同時実行上限をさらに宣言できます。

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

接続モーダルで設定します (**レート制限は→モデルごとの同時実行上限をオーバーライドします**、1 行に 1 つの`model=cap` )、または同じJSON形状の`PATCH /api/providers/[id]`経由。主要なセマンティクス:

- **接続全体とモデル固有:** `maxConcurrent`引き続き接続全体の共有上限です。両方が適用される場合、両方のゲートは同じ複合ゲート (`global → provider → account → model`) でアトミックに取得されます。効果的な動作は、より厳しい適用制限です。
- **モデルキーの正確な一致:**キーは、ルーティング解決—の後にエグゼキューターに渡されるモデル文字列です。通常は、クライアント側の`provider/model`エイリアスではなく、裸のアップストリーム モデル ID (`glm-5`) です (`zai/glm-5` `glm-5`と一致しません)。値は正の整数の同時リクエストの上限です。
- **ローカルキューイング、検出なし:**過剰なリクエストは、既存のqueue/timeoutセマンティクス (型指定された`SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`アドミッション エラー) でローカルにキューに入れられます。 OmniRoute 、アップストリーム ポリシー—を検出または推論しません。オペレータが設定した正確な上限を強制します。飽和したモデル ゲートはプロバイダーを無効にすることはなく、永続的なモデル ロックアウトを作成することもありません。アップストリームの429/cooldown/fallback動作はエラー バックストップのままです。
- **接続ごと、プロセスごとのスコープ:**キャップはデータベース接続ごとに設定され、メモリ内に保持されるため、同じ上流のAPIキーを再利用する 2 つの接続は相互に調整されません。
- **未構成とは、変更されていないことを意味します。**マップを省略した場合 (またはダッシュボード フィールドを空白のままにした場合)、モデル ゲートは追加されません。ユニバーサルプロバイダーの制限を設定しない構成例:

```text
glm-5=1
glm-4.7=3
```

### クォータ共有リクエストのシリアル化

クォータ共有ディスパッチが肯定的な`max_concurrent`宣言する接続をターゲットにすると、その接続に対する同時リクエストが発生します。**アカウント**接続ごとのセマフォ (キー`qsconn:<connectionId>`) を通じてシリアル化されます: 過剰なリクエスト**列に並んで待つ**アカウントに洪水を起こす代わりに。それは**フェールオープン**—飽和キューまたはタイムアウトは、ディスパッチ可能なリクエストを拒否するのではなく、スロットなしで続行されます。トグルイン**設定→復元力→接続ごとのクォータシェアの同時実行性**(`resilienceSettings.quotaShareConcurrencyLimit.enabled`、デフォルトはオン)。 `max_concurrent`キャップがない場合、動作は変わりません。

> クォータ共有ルーティング ゲート (`selectQuotaShareTarget`、 DRR + P2C) 自体はフェールオープンであり、ハード制限できない単一接続プールを持つ上限接続—のみ_優先順位を下げる_ため、このセマフォが実際にフラッドを含むものになります。

### コンボクールダウンを考慮した再試行

すべてのコンボ戦略 (有効な場合) で、 SHORT一時的なクールダウンの 429 を結晶化するリクエストは、429 —を返す代わりに待機して再ディスパッチされます。これは、マルチモデル コンボでの Gemini クラスのTPM/RPMウィンドウ (~ 60 秒の再試行後) をカバーします (たとえば、2 モデル コンボの両方のターゲットがモデルごとのレート制限に達するなど)。 `comboCooldownWait` (`enabled`、 `maxWaitMs`、 `maxAttempts`、 `budgetMs`) によって制限されます**設定→レジリエンス**。 `quota_exhausted` (真夜中までロック) やauth/not-found理由で待機することはありません。 `comboTimeoutMs`設定されていると、その期限までに終了できない待機は開始されません (#18998)。コンボは`COMBO_TIMEOUT` 504 の代わりに端末応答ですぐに応答します。

コンボは`config.comboCooldownWaitEnabled: false`でオプトアウトできます。リテラル`false`のみが、これらの共有コンボ待機 (ディスパッチ後のクールダウンとディスパッチ前のcircuit-open/model-lock待機) およびその待機バジェット タイムアウトフロアの拡張を無効にします。欠落しているか、 `true`グローバル ポリシーを保持します。 `true` 、グローバルに無効な待機を有効にすることはできません。明示的な`targetTimeoutMs`依然として勝ちます。このオプトアウトは、個別のネイティブ Codex ターンピンのディスパッチ前待機を変更しません。

同じゲートは、ディスパッチ前のケース (#16319) をカバーします。モデルが短い一時的なロックアウト状態にあるため、コンボのすべてのターゲットが試行前にスキップされる場合、ゼロ試行パスは、ヒントのない`503 ALL_TARGETS_SKIPPED`に応答する代わりに、同じ上限の下でロックアウトを待って再ディスパッチします。待機が許可されない場合 (上限、試行または予算が使い果たされた場合、または機能がオフになった場合)、端末応答は、最も早い一時ロックの有効期限から`retry_after` / `reset_at`を保持する`429 rate_limit_error`にアップグレードされます。クォータ、認証、および not-found ロックにより、ヒントなしの 503 が維持されます。

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. リクエストキューアドミッション制御 (v3.8.49 · issue #6593)

**対象範囲**: プロバイダ+接続ごとのローカルなレート制限キュー(`open-sse/services/rateLimitManager.ts`、Bottleneck ベース)で、上記の3つの仕組みの一段下の層。

**`maxWaitMs` はキュー待機を制限し、`executionMaxWaitMs` は実行を制限する。**
この2つは意図的に分離されており、どちらも他方に値を流し込むことはない。

`resilienceSettings.requestQueue.maxWaitMs` は**キュー待機バジェット**である。プロバイダスロットを待つ時間と、その後 QUEUED 状態で待機する時間をカバーし、ジョブが QUEUED を離れて実行を開始した瞬間にタイマーはクリアされる(`rateLimitManager.ts`、`wrappedFn`)。これを超過したリクエストはアップストリームに到達しない。デフォルトは 30000ms で、`src/lib/resilience/settings.ts` の `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` から供給され、`tests/unit/ratelimit-admission-control-6593.test.ts` によって固定されている。そのため、これを変更すると、この段落が気づかれないまま陳腐化するのではなく、そのテストが赤くなる。

`resilienceSettings.requestQueue.executionMaxWaitMs` は、Bottleneck がジョブの `expiration` として受け取るもので、そのタイマーはディスパッチ後にのみ開始する。これは、自身のアップストリームタイムアウトを持たないエグゼキュータのためのバックストップであり、エグゼキュータ自身のフェッチ開始タイムアウトの方が長い場合にはそちらまで引き上げられるため、健全な進行中のレスポンスを切断することはない。デフォルトは 600000ms(10分)。

キューバジェットを `expiration` に流し込むことこそが、かつて非増分(non-incremental)ゲートウェイを実行中に強制終了させていた原因である——それらは最初のバイトを返すまでに正当にも数分間実行される——、そしてこれが、expiration が `code: "RATE_LIMIT_EXECUTION_TIMEOUT"`(HTTP 504)として表面化するのに対し、キューバジェットはキュータイムアウトコードを持つ理由である。どちらも `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS`(環境変数)またはダッシュボード(**設定 → レジリエンス**)で上書きできる。両方とも正規化時に 1ms〜24時間にクランプされる。

**両方に共通の優先順位:** 環境変数は_デフォルト値_を供給するだけである。`resilienceSettings.requestQueue` に永続化された値(ダッシュボード / API パッチ、`key_value` に保存)はそれに優先し、接続ごとの `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` はさらにそれに優先する。したがって、すでに永続化された値が存在するデプロイで環境変数を設定しても何も変わらない——代わりに永続化された設定をクリアまたは更新すること。

キュー内の滞在は `maxWaitMs` によって制限され、後述の `maxQueueDepth` は同時にキューに入れられる呼び出し元の数を制限する。

**ボディ指定のリトライ: ペーシング vs ロックアウト。** 429 のボディは独自の待機時間を指定できる(Gemini の `RetryInfo.retryDelay`、"retry after Ns" というテキスト)。これは `updateFromResponseBody` が読み取る。接続の `maxWaitMs` に収まる待機はペーシングである: リミッターはその間リザーバを空にし、キューに入った呼び出しはリザーバが回復したときにディスパッチされる。`maxWaitMs` より長い待機はキューがじっと耐えられるものではない——Gemini は枯渇した日次クォータに対して `retryDelay: "86399s"` で応答する。再構築された 429 で中継される `Retry-After`(#16528)は、すでにフォールバックエンジンにその期間モデルをロックさせているが、それに対してリミッターまで一時停止させると、キーに早期に到達した呼び出し(たとえばレジリエンスリセット後)が `maxWaitMs` 全体にわたって停滞してしまう。このような待機が型付きの Google `RetryInfo` 詳細(`google_rpc_retry_info` という来歴)から来て、かつキーのリミッターがすでにモデルにスコープされている場合(`getLimiterKey` を参照)、その 429 は代わりにその接続でのモデルロックアウトになる(`open-sse/services/rateLimitManager/bodyRetryPause.ts` の `lockModelForLongBodyRetry`、上限24時間)。リミッターは一時停止されないまま残される。アカウント選択は `isModelLocked()` を介してそのロックでスキップし、その接続にピン留めされたターゲットに対するコンボの事前ディスパッチゲートも同様にスキップする。リミッターがクォータファミリーごとである antigravity では、ロックは正確なモデルに対してかかる。その他のクォータロックと同じである。エイリアスがそのモデルに解決した場合、クライアントが要求した名前もロックされる。これらのチェックは要求された名前を使うからである。それは正確にロックされる(`lockExactModel`)ため、antigravity のクォータファミリーや codex のスコープをまたぐエイリアスが自分自身をロックすることはない。散文のヒント、型のない `retryDelay`、または接続全体で共有されるリミッターの場合は、一時停止が維持される。429 パスが再構築したばかりのリミッターが一時停止する場合、残りのキュー時間が一時停止より先に終わる呼び出し元は、その時間を待ち切るのではなく、キュータイムアウトコード(`checkLimiterPause`)で即座に拒否される。記録された終了時刻は、Bottleneck がリフレッシュクロックを開始するリミッターの構築前に固定され、リザーバへの後続の変更はそれを破棄する。`tests/unit/rate-limit-long-body-retry-lockout.test.ts` と `tests/unit/rate-limit-body-retry-pause.test.ts` でカバーされている。

**`maxQueueDepth` — オプトインのアドミッション上限(新規)。** `resilienceSettings.requestQueue.maxQueueDepth` は、1つのプロバイダ+接続について同時にキューに滞在できる(まだディスパッチされていない)リクエスト数を制限する。キューがすでに `maxQueueDepth` 件のリクエストを保持している場合、新しいリクエストは `limiter.schedule()` に到達する**前**に、型付きの `code: "RATE_LIMIT_QUEUE_FULL"` エラーで高速拒否される——そのため拒否は安価であり、そのリクエストに対する下流のプロンプト圧縮/翻訳処理よりも先に行われる。デフォルトは `0` = 無効で、既存の無制限キューの動作を維持する。範囲は 0〜100000。`RATE_LIMIT_MAX_QUEUE_DEPTH`(環境変数)または `resilienceSettings.requestQueue.maxQueueDepth`(ダッシュボード/API パッチ)で上書きできる。

アドミッションチェック自体は純粋関数(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`)であるため、実際の Bottleneck リミッターなしでユニットテスト可能である。

> #6593 を提起した RFC では、`bypassCompressionOnRateLimit`
> フラグも提案されていた。このリポジトリの `open-sse/services/compression/` パイプラインは、
> アウトバウンド LLM リクエストに対するプロンプト/コンテキスト圧縮（`chatCore.ts` の
> `resolveCompressionSettings`/`selectCompressionStrategy` ブロック周辺）であり、
> 合成された 429 ボディに対する HTTP レスポンス圧縮ではない — リテラルなバイパスフラグに対応するコードパスは存在しない。また、このプロンプト圧縮ステップは現在、リクエストパイプライン内で `withRateLimit()` の _前に_ 実行されるため、
> キュー満杯による拒否時にそれをスキップするよう順序を入れ替えることは、この issue のスコープよりも大きな別の変更となる。ここでは意図的に実装**せず**、CPU 削減の効果が並べ替えのリスクに見合う場合のフォローアップとして残されている。

### レート制限の自動有効化セーフティネットと接続保護 (`rateLimitProtection`)

**自動有効化セーフティネット** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`、デフォルト `true`):
デフォルトでは、OmniRoute はすべてのアクティブな API キープロバイダー接続 (`getProviderCategory(provider) === "apikey"`) に対して、レート制限キュー保護を自動的に有効化します。これにより、レート制限に敏感な上流 API キーへの受信リクエストが、上流での 429 エラーへと殺到するのではなく、Bottleneck を通じてキューイングおよびスロットリングされることが保証されます。このセーフティネットは `RATE_LIMIT_AUTO_ENABLE` 環境変数で上書きでき（`false`/`0`/`off` で無効化、`true`/`1`/`on` で強制的に有効化）、永続化されたダッシュボード設定（**設定 → レジリエンス** / `PATCH /api/resilience`）よりも優先されます。

**接続ごとの `rateLimitProtection` のセマンティクス:**
接続ごとのレート制限保護は、プロバイダー接続の `rateLimitProtection` ブール値フィールドで追跡されます（SQLite では `rate_limit_protection` として永続化されます）:

- **明示的なオン (`rateLimitProtection === true`)**: プロバイダーカテゴリや自動有効化セーフティネットがオンかどうかに関係なく、この接続に対してレート制限保護が明示的に有効化されます。
- **明示的なオフ (`rateLimitProtection === false`)**: 明示的な保護は無効化されますが、アクティブな API キー接続をグローバルな自動有効化セーフティネットからオプトアウトするわけでは**ありません**。`reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) では、`false` と `undefined` は同等であり、`rateLimitProtection === true` のみが明示的なオーバーライドとして扱われます。`rateLimitProtection` が `false`（または未設定）の場合、アクティブな API キー接続は依然として自動有効化の条件に一致し、レート制限保護が維持されます。
- **接続ごとのオプトアウトなし**: 他の接続では自動有効化をアクティブに保ちながら、「この特定のアクティブな API キー接続だけはレート制限キュー保護なしで実行する」ということを、オペレーターが現在表現する方法はありません。API キー接続をレート制限キューなしで完全に実行するには、セーフティネットをグローバルにオフにする必要があります（`RATE_LIMIT_AUTO_ENABLE=false` または `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`）。

**サポートされている書き込みパス:**

- **`POST /api/rate-limits`**: 接続の `rateLimitProtection` を切り替えるための、サポートされている管理用書き込みパス (`{ connectionId: string, enabled: boolean }`)。`enabled: true` で呼び出すと明示的な保護がオンになり、`enabled: false` で呼び出すと明示的な保護が解除されます（ただし、自動有効化がオンの場合、アクティブな API キー接続はグローバルセーフティネットの対象のままとなります）。
- **`PUT /api/providers/[id]`**: 意図的に `rateLimitProtection` を受け付けず、変更も**しません** (#11278)。`PUT /api/providers/[id]` 経由でプロバイダー接続のメタデータを更新しても、永続化されたレート制限保護の状態が変更されることは決してありません。

---

## 6. 低速ストリーム スループット ウォッチドッグ (#9709)

オプションの`resilienceSettings.streamRecovery.throughputWatchdog`ガードは、チャンクを送信しているものの、設定された有効出力レートを下回るアシスタント出力を生成しているアップストリームを検出します。これはアイドル タイムアウトとは意図的に区別されています。ハートビートとメタデータはタイマーをリセットせず、進行状況としてカウントされません。また、これは、出力品質に関係なく絶対的な安全上限であるハード アテンプト期限 (#9153) とも異なります。

ウォッチドッグは、中断する前にウォームアップ期間と、それに続く完全なローリング ウィンドウを必要とします。チャット完了および応答API出力イベント (保守的なUTF-8バイト プロキシ) からのテキスト デルタをカウントし、使用のみおよび空のイベントを無視し、ツール呼び出しまたは推論イベントの実行中に判断を一時停止します。これはデフォルトでは無効になっており、 `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`で有効にできます (その env 値は、保存された`resilienceSettings.streamRecovery.throughputWatchdog.enabled`ブール値が優先するデフォルトの—のみをシードします。このガイドの先頭にある env-vs-dashboard の優先事項を参照してください)。ウィンドウ、ウォームアップ、最小レート、および最小測定可能出力は、通常の回復力設定の正規化層によって制限されます。

有効にすると、ウォッチドッグの中止はアクティブなアップストリーム試行にのみ適用されます。クライアントに表示されるバイトが存在する前に、既存の同じアカウントの早期回復パスが試行を再開する可能性があります。コミット後、ストリームがやみくもに再生されることはありません。既存の安全なミッドストリーム継続契約のみがサフィックスを結合できます。ファイナライズはシングルショットのままであるため、使用量のアカウンティングとセマフォの解放は重複しません。

---

## 7. 上流ステータスの再設定（誤ったクォータエラー）

**範囲:** 一時的なクォータ枯渇を誤った HTTP ステータスで報告する、1 つの上流ゲートウェイ。

**目的:** 分類の前に誤解を招くステータスを修正し、下流のコンシューマー（フォールバックエンジン、コンボ集約、クライアント向けレスポンス）が失敗の本来のリトライ可能性を認識できるようにする。

一部のゲートウェイは、一時的なクォータ枯渇をリトライ不可能な HTTP
ステータスで通知します。`agentrouter.org` は、標準の `429` ではなく、
中国語の本文（`用户额度不足` / `额度不足`）とともに `403`（場合によっては
`400`）を返します。Claude
Code のようなクライアントは `403` を恒久的なエラーとして扱い、セッションを中断します。また、修正しなければ、
フォールバックエンジンはこれをクォータイベントではなく `AUTH_ERROR` として分類します。

**実装:**

- レジストリ + マッチャー: `open-sse/config/upstreamStatusRestatement.ts` — プロバイダーごとのルールリスト（`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`）を持ち、`applyStatusRestatement()` によってマッチングします。
- 呼び出し箇所: `open-sse/handlers/chatCore.ts` の `providerFailure:` ブロック（3654 行目付近）。`parseUpstreamError()` がエラー HTTP ステータスを持つ上流レスポンス（`!providerResponse.ok`）を解析した直後、かつ分類が実行される前に呼び出されるため、すべての下流コンシューマーが修正後のステータスを認識します。`200` SSE ストリーム内に埋め込まれたエラーは、後段の別のストリーム解析パスに従うため、現在このフックの対象外です。これは既知の制限ですが、現在のところ agentrouter の誤ったステータスには必要ありません（agentrouter ではエラー HTTP ステータスとして表面化するためです）。
- リトライ可否: `429` は `RETRY_AFTER_ELIGIBLE_STATUSES`（`open-sse/services/combo/unavailableRetryGate.ts`）に含まれているため、再設定されたエラーは、停止した `403` として表面化するのではなく、実際のリトライウィンドウを伴います。
- 合成された `60s` の `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）は、再設定されたレスポンスが**クライアント**に通知する値にすぎません。これは接続の内部クールダウン／ロックアウト期間そのものではありません。その期間は、再設定されたエラーを実際に処理する仕組みによって別途決まります（接続クールダウンの段階的バックオフ（§2。API キープロバイダーでは基本値 `3s`）、またはモデル単位のクォータプロバイダー（agentrouter など）向けのモデルロックアウト（§3））。ルーターは、クライアントに通知する 60 秒のウィンドウより早く、内部的に再試行可能になる場合があります。これは意図的な余裕であり、バグではありません。

恒久的なエラー（agentrouter の `无权访问模型` — このモデルへのアクセス権がない場合）は、**決して**再設定されません。`excludeMarkers` は `textMarkers` に一致した場合でもルールを無効にするため、エラーは元のステータスを保持し、永遠にリトライされることはありません。対応するプロバイダー分類ルール（`open-sse/config/providerErrorRules.ts` の
`agentrouter-model-access-denied`：`reason: "auth_error"`、`scope: "model"`、宣言された基本クールダウン `6h`）は、汎用的な apikey カテゴリの `FORBIDDEN` の早期リターンより**前に**、`checkFallbackError`（`open-sse/services/accountFallback.ts`）によって参照されます。これは `honorsRuleLockScope(provider)`（#10334 — 現在は `providerErrorRules.ts` の `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リストによって agentrouter のみに適用）を条件とします。このルールで宣言された 6 時間のクールダウンは `fallbackResult.baseCooldownMs` に渡されますが、既存のモデル単位クォータのロックアウトパス（`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`。#10334 による変更はクールダウンの取得元のみ）に引き続き渡されます。つまり、他のすべてのモデルロックアウトと同様に、オペレーターの `mlSettings.maxCooldownMs`（デフォルトは `1_800_000ms` / 30 分）まで縮小されます。また、_永続化されるロックアウト理由_ は既存のハードコードされた `"forbidden"` のままであり、ルールの `"auth_error"` にはなりません。エンドツーエンドで尊重されるのはクールダウン期間のみで、理由文字列ではありません。接続自体はアクティブなままであり、同じ接続上の兄弟モデルには影響しません。

再設定されたクォータエラー（`额度不足`）は、本番環境でプロバイダールール（`agentrouter-user-quota-exhausted`：`reason: "quota_exhausted"`、`scope:
"connection"`、独自に宣言されたクールダウンはなし。永続化レイヤーのスケーリングされたバックオフのデフォルト値が適用されます）に到達します。#10334 以降、`ProviderErrorRuleMatch` の `scope` はエンドツーエンドで**消費されます**が、`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リスト（`providerErrorRules.ts` — 現在は `"agentrouter"` のみ。`honorsRuleLockScope()` を介して適用）に含まれるプロバイダーに限られます。それ以外のすべてのプロバイダーでは、`scope` は #10334 より前と同様、情報提供のみを目的とします。`checkFallbackError` は一致したルールの scope を `fallbackResult.ruleScope` として返します。`isAgentrouterConnectionQuotaScope()`（`src/sse/services/auth.ts`）は、`ruleScope` が接続全体に適用でき自己回復するシグナルとして本当に安全かどうかを確認する共通ガードです（scope が `"connection"`、reason が `quota_exhausted`、`permanent` ではなく、`creditsExhausted` でもないことを確認します。これは将来、scope `"connection"` と恒久的なアカウント状態を組み合わせたルールが追加されることに対する防御です）。これを呼び出すコンシューマーは 2 つあります。

- **永続化**（`markAccountUnavailable()`、`src/sse/services/auth.ts`）:
  passthrough-provider の **モデル単位**のロックアウト分岐（agentrouter は `passthroughModels: true` → `hasPerModelQuota()` が `true` を返す）に入る代わりに、**一時的な接続クールダウン**を適用します —
  `testStatus: "unavailable"` + `rateLimitedUntil` を設定し、終端ステータス
  (`credits_exhausted`/`banned`/`expired`) には決してしません — そのため、手動で認証情報をリセットする必要がなく、クールダウンが経過すると接続は自動的に復旧します。
  `disableCooling: true` の接続（#2997）ではスキップされます。このオプトアウトの場合は、代わりにモデル単位のロックアウトへ進みます（文書化されたトレードオフです —
  分岐の上にあるコードコメントを参照）。
- **同一リクエスト内のコンボルーティング**（`applyComboTargetExhaustion()`、
  `open-sse/services/combo/targetExhaustion.ts`）: 同じガードにより、接続をインメモリの `exhaustedConnections` Set に登録します。キーは
  `${provider}:${connectionId}` です。この処理がスキップするのは、残りの SAME-REQUEST のターゲットのうち、ターゲット自身のオブジェクトにその正確な `connectionId` が設定されているものだけです（`getExhaustedTargetSkipReason()`、
  `open-sse/services/combo/comboPredicates.ts`、`exhaustedConnections` の参照前にある `if (provider &&
connectionId)`） — 通常のモデルリスト型コンボでは、兄弟ターゲット自身に固定された `connectionId` がなく、レスポンスの
  `X-OmniRoute-Selected-Connection-Id` ヘッダーからディスパッチごとに 1 つだけ解決されるため、このキーの一致は決して発生しません。この一般的なケースで、残りのレッグが直前に使い果たされたアカウントを再利用しないための実際の保護機構は、この Set ではありません — 上記の永続化レイヤー（接続の `rateLimitedUntil` が現在時刻より後になっている）と、この同じガードがその失敗に対する `transientRateLimitedProviders` の登録を抑制することの組み合わせです（`targetExhaustion.ts` の「Two-stage design」と
  `isAgentrouterConnectionQuotaScope` 分岐にあるコードコメントを参照）。Set にマークが付かないため、`combo.ts` の
  `allowRateLimitedConnection` による強制許可（`open-sse/services/combo.ts:1005-1013`、`:2734-2738`）はプロバイダーの残りのレッグに対して発動しません。その結果、認証情報の選択における
  `rateLimitedUntil` フィルター（`src/sse/services/auth.ts:1238`）が通常どおり適用され、残りのレッグは別の、引き続き利用可能な agentrouter 接続を選択するか、利用可能な認証情報がないとして失敗します。この分岐によってクールダウンされた接続へ強制的に戻ることはありません。

### 2 段階設計: ステータスの再記述、その後の分類

ステータスの再記述（`upstreamStatusRestatement.ts`）とプロバイダー分類ルール（`open-sse/config/providerErrorRules.ts`、
`providerRuleRegistry`）は、どちらもプロバイダー ID とテキストマーカーをキーとする別個のレジストリですが、異なる場所で実行され、異なる目的を果たします。再記述は `chatCore.ts` で HTTP ステータスを早期に書き換えます。一方、分類ルールは `checkFallbackError()`（`open-sse/services/accountFallback.ts`）内で、フォールバック用の `reason` とロックの `scope`
（`model` / `provider` / `connection`）を決定します。

分類ルールが完全なエラー **テキスト**（`额度不足` のような本文マーカーとの一致に必要）を参照できるのは、`providerErrorRules.ts` の `FULL_TEXT_RULE_PROVIDERS` 許可リストに含まれるプロバイダーだけです — 現在は `"agentrouter"` のみです。それ以外のすべての **組み込みカタログ**プロバイダーについては、`checkFallbackError` は `getProviderErrorRuleMatch` に構造化されたエラー（`{code, type}`）だけを渡します。これはヘッダー／ステータス／コードベースのルールには十分ですが、本文テキストのマーカーは認識できません。ヘルパー `resolveRuleMatchBody()` がこの選択を行います。許可リストにあるプロバイダーには完全なエラーテキストを、それ以外には構造化されたエラーを使用します。**組み込み**プロバイダーを `FULL_TEXT_RULE_PROVIDERS` に追加することは、プロバイダーごとの明示的なオプトインです。これは、リストにないすべてのプロバイダーについて、デフォルトパスをバイト単位で変更しないために存在します。

ルールの `scope`（`model` / `provider` / `connection`）は、`FULL_TEXT_RULE_PROVIDERS` とは別のオプトインです。`checkFallbackError` はこれを `fallbackResult.ruleScope` としてのみ公開し、下流のコンシューマーが情報ラベル以外のものとして扱うのは、同じファイルにある `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リストのプロバイダーに限られます（`honorsRuleLockScope()` によって制御され、現在は `"agentrouter"` のみ）。許可リストにプロバイダーが含まれた後、`scope: "connection"` の一致が実際に何を行うかについては、上記の「再記述されたクォータエラー」を参照してください。

**#11104 — オペレーターが宣言したルールは、両方の許可リストをバイパスします。** オペレーターは、このファイルを編集せずに、`settings.providerErrorRules`（`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`）を介して実行時にプロバイダー単位のルールを宣言できます。オペレーターのルールを `FULL_TEXT_RULE_PROVIDERS`／`HONORS_RULE_LOCK_SCOPE_PROVIDERS` の配下に置くと、**デフォルト**の組み込みカタログルールを保護するための許可リストによって、すでにリストに含まれているプロバイダー以外では設定メカニズムが機能しなくなります。ルールの宣言自体が、オペレーターによる明示的なオプトインだからです。`resolveRuleMatchBody()` と `honorsRuleLockScope()` はどちらも先に `hasOperatorRuleForProvider()` を確認します。そのため、オペレーターのルールがあるプロバイダーでは、どちらの許可リストにも含まれているかどうかにかかわらず、未加工のエラーテキストが渡され、宣言された `scope` が尊重されます。

**オペレーターが宣言したルール**（`OperatorProviderErrorRule`）: 各ルールには任意の `status` と任意の `match`（エラーテキストに対する単純な大文字・小文字を区別しない部分文字列。RegExp ではないため、ReDoS を引き起こすことはありません）があり、少なくとも一方を設定する必要があります。両方を設定した場合は AND 条件になります。省略されたフィールドは何にでも一致するため、`{match: "insufficient_quota"}` は、そのコードを持つ任意のステータスに一致します。最初に一致したルールが適用されます。`cooldownMs` は最大 30 日まで指定でき、ルールの総数は最大 50 個です。

**包括的なデフォルト**（`settings.providerErrorDefaults`、オプトイン、`setOperatorProviderErrorDefaults` で設定）: `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs` は 1 分から 30 日までです。デフォルトは、オペレーター・ルールにも組み込みカタログ・ルールにも一致しなかった場合にのみ適用され、402、403、408、429、および 5xx エラーにのみ適用されます。リクエスト形状エラー（400、404、409、413、422）と単独の 401 は、それぞれ固有の処理を維持します。明示的な `reason` がない場合、その理由は `classifyError` と同じ方法でステータスから決定されます。デフォルトを宣言すると、`hasOperatorRuleForProvider()` におけるオペレーター・ルールとして扱われるため、その `scope`（デフォルトは `"connection"`）が尊重されます。デフォルトの実効クールダウンは、`cooldownMs` とプロバイダー独自の再試行ヒント（`Retry-After`、`x-ratelimit-reset`、またはレスポンス本文内のリセットヒント。接続クールダウン設定「アップストリームの再試行ヒントを使用」がオンの場合にエンジンが尊重するものと同じヒント）のうち長い方です。そのため、デフォルトによって短いアップストリームのヒントを延長することはできますが、実際のリセット時刻を短縮することはありません。明示的なオペレーター・ルールでは、指定された `cooldownMs` がそのまま使用されます。ルールもデフォルトも、`markAccountUnavailable` における接続クールダウンのガードを迂回することはありません。アクティブな、より長いクールダウンが短縮されることはなく、終端ステータスが上書きされることもありません。`checkFallbackError` で先に実行される組み込みのテキスト検出（クレジット枯渇、日次クォータ、アカウント無効化）は、該当する独自のフレーズについて引き続き優先されます。

**既知の制限 — `providerRuleRegistry` は HTTP 400 について一度も参照されません。**
`checkFallbackError` の `BAD_REQUEST` ブランチは、独自のパターン配列（`accountFallback.ts` 内の `MODEL_ACCESS_DENIED_PATTERNS`、`CONTEXT_OVERFLOW_PATTERNS` など）だけを使ってステータス 400 を分類し、その上にある `configuredRule`/`getProviderErrorRuleMatch` ブランチに到達する前に戻ります。`status: 400` を持つ組み込みカタログ・ルール（またはオペレーター・ルール）は構文上は有効ですが、実際には発火しません。現在、400 を対象とする既存ルールはないため、本番環境への影響はありません。ただし、将来 400 のルールを追加する場合は、まずこのブランチを変更する必要があります。これは、すでにパターン配列の動作に依存しているすべてのプロバイダーについて 400 の再分類を引き起こすため、単にルールを追加するより大きな変更となり、単一プロバイダーのルール追加の範囲外です。

### 新しいクォータ誤表示ゲートウェイの追加

1. `statusRestatementRegistry`（`open-sse/config/upstreamStatusRestatement.ts`）に 1 つのルール配列を登録します。`textMarkers` はプロバイダー固有のものにしてください。`CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）と衝突する一般的な英語フレーズは決して再利用しないでください。
2. 必要に応じて、`open-sse/config/providerErrorRules.ts`（`providerRuleRegistry`）に分類ルールを登録し、適切なロック範囲（アカウント全体のクォータには `connection`、モデル単位のエラーには `model`）を選択します。この手順が本番環境で有効になるのは、ルールがエラー全文（本文マーカー）を必要とするプロバイダーだけです。つまり、同じファイル内の `FULL_TEXT_RULE_PROVIDERS` にプロバイダー ID を追加してください。そうしない場合、`checkFallbackError` は構造化された `{code, type}` エラーだけをルールに渡すため、本文テキストのルールは実際のトラフィックに対して一度も一致しません。`status`/`headers` のみに基づいて一致するルール（Opencode や Minimax のルールなど）では、このオプトインは必要ありません。別途、ルールが `scope: "connection"` を宣言しており、実際に接続全体のクールダウンと同一リクエストのコンボ・スキップを適用する意図がある場合（単なる情報ラベルではない場合）は、同じファイル内の `HONORS_RULE_LOCK_SCOPE_PROVIDERS` にプロバイダー ID を追加します。これは、`markAccountUnavailable()`（`src/sse/services/auth.ts`）および `applyComboTargetExhaustion()`（`open-sse/services/combo/targetExhaustion.ts`）における `isAgentrouterConnectionQuotaScope()` 相当の消費を制御するものです。これがない場合でも、`scope` は `fallbackResult.ruleScope` を通じて引き継がれますが、そこから実際の動作は発生しません。
3. `tests/unit/upstream-status-restatement.test.ts` および `tests/unit/agentrouter-error-rules.test.ts` を手本にユニットテストを追加します（`not-permanent` / `not-creditsExhausted` のガードを含めます。また、プロバイダーに allowlist が必要な場合は、`resolveRuleMatchBody()` がそのプロバイダーに対してのみ全文を返すことを検証するテストも追加します）。

`chatCore.ts`、`classifyError`、または combo の変更は必要ありません。

#### Egress バケット化ロック（#10880）

`EGRESS_BUCKETED_LOCK_PROVIDERS`（opencode ファミリー）に含まれるプロバイダーは、IP バケット化されたアップストリームとして扱われます（opencode の無料プランはアカウント単位ではなく IP 単位でバケット化されています。#9611 を参照）。ステータス 429 が `quota_exhausted` **または** `rate_limit_exceeded` と分類された場合、ローテーションで試行する前に、最後に認識された egress IP が失敗した接続のものと一致する allowlist 対象ファミリーのすべての接続をクールダウンします
—これにより、必ず失敗するアップストリーム呼び出しを N-1 回実行することを回避します（#10460/#10525 と同じ形式です）。
`rate_limit_exceeded` を含めているのは意図的なものです。`markAccountUnavailable` のパスでは、opencode 固有のルールは決して一致しません（`checkFallbackError` にヘッダーや本文が渡されず、opencode は `FULL_TEXT_RULE_PROVIDERS` に含まれていないため）。そのため、本文にサブスクリプション・クォータのテキスト（"monthly usage limit reached"）を含む 429 は、`status_429` ルールに到達する前に、クォータ・テキストのフォールバック（`buildSubscriptionQuotaFallback`、`accountFallback.ts`、1 時間のクールダウン）によって `quota_exhausted` に分類されます。一方、クォータ・テキストを含まない 429（通常のレート制限）は、`status_429` ルールによって `rate_limit_exceeded` に分類され、引き続き IP ファミリー全体をクールダウンします。許容される制限は次のとおりです。

- **ベストエフォート**: ロックは `proxy_logs` から接続の最後に確認された `egress_ip`
  を解決します（24 時間のウィンドウ、同期処理、キャッシュなし）。キャッシュが
  コールド状態（egress IP が一度もプローブされていない）または行が存在しない場合でも、
  失敗した接続はブランチによって引き続きクールダウンされます（現在と同じ方法で記録）が、
  兄弟接続はロックされません。
- **終端状態にはしない**: クールダウンは更新されるクォータウィンドウ
  （`testStatus: "unavailable"`）であり、IP レベルのシグナルから永続状態が導出されることは
  ありません。`disableCooling` 接続はブランチ全体をスキップします。
- **許可リスト対象ファミリーのロック粒度を変更**: これは単なる兄弟接続の最適化ではなく、
  スコープの変更です。opencode は `passthroughModels` プロバイダーであるため、このブランチ
  より前は 429 によってモデル単位のロックアウトが発生していましたが、現在は接続の
  クールダウンが発生します。兄弟接続がまったくない単一接続をオペレーターが実行している場合も
  含まれます。これは opencode のルールテーブルがすでに正しいと宣言している粒度です
  （`scope: "connection"`、`providerErrorRules.ts`）。これまで適用されなかったのは、
  opencode が `HONORS_RULE_LOCK_SCOPE_PROVIDERS` に含まれていなかったためです。このブランチは
  接続スコープの agentrouter ブランチを踏襲し、失敗した接続のクールダウンと
  `backoffLevel` 自体を書き込んで戻ります。そのため、モデル単位のブロックと下にある
  汎用パスには到達しません。
- **コンボを含む**: agentrouter ブランチと同様に、このスコープでは、コンボ呼び出し元が
  429 に適用する `persistUnavailableState`/`isCombo` のダウングレードを意図的に無視します。
  モデル単位のロックアウトはこのスコープの弱い形ではなく、対象単位が誤っています。消耗した
  IP について何も示さないため、コンボのローテーションは兄弟接続ごとに、確実に失敗する呼び出しを
  1 回ずつ消費し続けることになります。
- **兄弟接続の安全性**: すでに終端状態（banned/credits_exhausted）にある兄弟接続、または
  すでにより長いクールダウン中の兄弟接続が上書きされることはありません。
- **排他的な許可リスト**: `EGRESS_BUCKETED_LOCK_PROVIDERS` を拡張するかどうかは、
  明示的な所有者の判断です（汎用的な組み込みではありません（パターン #10334/#10419））。
  兄弟接続のクエリは同じ許可リストをバインドするため、SQL リテラルとして重複して記述していません。
  そのため、許可リストの拡張は 1 行の変更で済みます。
- **両方向の Egress IP ローテーション**: 参照ウィンドウ（24 時間）は egress-IP キャッシュの
  TTL（5 分）よりはるかに広いため、「最後に確認された IP」は現在の状態ではなく履歴です。
  接続のプロキシがウィンドウ内でローテーションした場合、ロックが実際には共有されている IP を
  **見逃す**可能性があります（記録された IP は新しいもので、まだ消耗していないため）。
  — 逆に、消耗した IP からその後ローテーションして離れた兄弟接続を**クールダウンする**
  可能性もあります。後者の場合、その兄弟接続は 1 回分のクールダウンウィンドウを失います。
  どちらも、履歴ベースの参照に伴うベストエフォートの制限として受け入れられています。
- **コスト**: `proxy_logs` の範囲を限定したスキャンを 2 回実行します
  （`idx_pl_timestamp` を介してウィンドウでフィルタリング）。実行されるのは 429 の頻度のみです。
  新しいインデックスは追加しません（マイグレーション 134、YAGNI）。中程度のサイズの
  実トラフィック DB コピーで測定しています。スループットの高いインスタンスでは、同じ
  ウィンドウ内に比例して多くの行が保持されます。

## その他の復元機能

- **22 のルーティング戦略**(優先順位、加重、ラウンドロビン、コンテキスト リレー、フィル ファースト、p2c、ランダム、最も使用されていない、コスト最適化、リセット対応、リセット ウィンドウ、有効期限優先、ヘッドルーム、クォータ加重、厳密ランダム、自動、lkgp、コンテキスト最適化、キャッシュ最適化、フュージョン、パイプライン、jev) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)を参照。
- **リセット対応ルーティング**(v3.8.0) — 、クォータのリセット時間によって接続に優先順位を付けます。
- **バックグラウンドモードの低下**—応答API `background: true`警告により同期に低下しました。
- **動的工具限界検出**— 、ツール数の制限に達するとプロバイダーを停止します。
- **緊急フォールバック**— `OMNIROUTE_EMERGENCY_FALLBACK`によって制御されます。オペレーターは、再起動せずに「機能フラグ」ページからこれをオーバーライドできます。

---

## デバッグ

- Weighted コンボが `503 all_targets_cooling_down` を返す(`Retry-After` が設定され、`diagnostics.excluded` に `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` を含むすべてのターゲットが列挙される)→ プールは設定・接続済みであり、すべてのターゲットがレジリエンスタイマーによって除外されているだけです。`[COMBO] Weighted selection: every target excluded before dispatch — …` という警告に理由と残り秒数が示されます。同じコンボからの `404 no_executable_targets` は、レジリエンスタイマーが関与していないこと(実行するものがない、またはすべてのアカウントが可用性プローブに失敗した)を意味します。`targetResolution.ts` で収集された除外情報から `open-sse/services/combo/pinRecovery.ts` で構築されます。
- プロバイダーのすべてのキーがスキップされる → サーキットブレーカーの状態と各接続の `rateLimitedUntil`/`testStatus` の両方を確認してください。
- リセットウィンドウ後もプロバイダーが永久に除外される → `getStatus()`/`canExecute()` ではなく生の `state` を読み取っているコードが原因です。
- 1 つのキーが失敗し、他は動作すべき → サーキットブレーカーより接続クールダウンを優先してください。
- 1 つのモデルのみが失敗する → 接続クールダウンよりモデルロックアウトを優先してください。
- 状態が自己回復すべきなのに回復しない → 未来のタイムスタンプと、期限切れ状態を更新する読み取りパスを確認してください。永続的なステータスには手動での変更が必要です。

---

## ランタイム状態 — エージェント向けクイックリファレンス

> エージェントガイドが 40k のコンテキスト予算内に収まるよう、`AGENTS.md` の「Resilience Runtime State」から
> そのまま移動しました (PR #12743)。これは上記セクションの要約されたエージェント向けビューであり、
> 番号付きセクションが完全なリファレンスのままです。

OmniRoute には、関連しつつも明確に異なる 3 つの一時的障害メカニズムがあります。ルーティング動作を
デバッグする際は、それらのスコープを区別してください。一目でわかるマップについては
[3 層レジリエンス図](../diagrams/exported/resilience-3layers.svg)
(ソース: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
を参照してください。

### プロバイダーサーキットブレーカー

**スコープ**: プロバイダー全体、例: `glm`、`openai`、`anthropic`。

**目的**: アップストリーム/サービスレベルで繰り返し障害を起こしているプロバイダーへのトラフィック送信を停止し、
1 つの不健全なプロバイダーがすべてのリクエストを遅延させないようにします。

**実装**:

- コアクラス: `src/shared/utils/circuitBreaker.ts`
- チャットゲート/実行の配線: `src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- ランタイムステータス API: `src/app/api/monitoring/health/route.ts`
- 共有ラッパー: `open-sse/services/accountFallback.ts`
- 永続化された状態テーブル: `domain_circuit_breakers`

**状態**(4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: 通常のトラフィックが許可されます。
- `DEGRADED`: 早期警告帯 — 障害がデグレード閾値を超えましたが、ブレーカー閾値にはまだ達していません。
  トラフィックは引き続き流れ、ダッシュボードに警告が表示されます。有効な接続テスト、または
  新たな障害のない静寂なウィンドウにより `CLOSED` に戻ります
  (ウィンドウについては `docs/architecture/RESILIENCE_GUIDE.md` を参照)。
- `OPEN`: プロバイダーが一時的にブロックされます。呼び出し元は provider-circuit-open レスポンスを
  受け取るか、コンボルーティングが別のターゲットにスキップします。
- `HALF_OPEN`: リセットタイムアウトが経過しました。プローブリクエストを許可します。成功するとブレーカーが
  閉じ、失敗すると再び開きます。

**デフォルト**(`open-sse/config/constants.ts` → `PROVIDER_PROFILES`、`src/lib/resilience/settings.ts` の
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` を介して消費され、
`src/sse/handlers/chatHelpers.ts` の `getCircuitBreaker(provider, …)` に渡されます)。
プロバイダー全体のブレーカーは `circuitBreakerThreshold` / `circuitBreakerReset` で動作します:

| プロファイル | デグレード開始 | オープン (`circuitBreakerThreshold`) | リセット (`circuitBreakerReset`) |
| ------------ | -------------: | -----------------------------------: | -------------------------------: |
| OAuth        |            `5` |                                  `8` |                            `60s` |
| API キー     |            `7` |                                 `12` |                            `30s` |
| ローカル     |         (導出) |                                  `2` |                            `15s` |

`PROVIDER_PROFILES` は `providerFailureThreshold`(10/15/2)、
`providerFailureWindowMs`(15/30/5 分)、`providerCooldownMs`(5/10/1 分)も定義しています。これらは
**オプトインのグローバルプロバイダークールダウンのウィンドウゲート**(`PROVIDER_COOLDOWN_ENABLED`、デフォルト
オフ)を駆動します — `open-sse/services/providerCooldownTracker.ts` のプロバイダーレベルのエントリは、
`providerFailureWindowMs` 以内に `providerFailureThreshold` 回の障害があった後にのみ
クーリング中とみなされ、その後 `providerCooldownMs` の間クールダウンします。これらは稼働中のブレーカーの閾値
ではありません — ブレーカーの動作を期待してこれらを調整しないでください。すべてのデフォルトは
`OMNIROUTE_PROVIDER_BREAKER_*` および `OMNIROUTE_CIRCUIT_BREAKER_*` 環境変数で上書き可能です。
ランタイムに正確なリファレンステーブルは `docs/architecture/RESILIENCE_GUIDE.md` にあります。

プロバイダーブレーカーをトリップすべきなのは、プロバイダーレベルの障害ステータスのみです:

```ts
(408, 500, 502, 503, 504);
```

ほとんどの `401`、`403`、`429` のような通常のアカウント/キー/モデルエラーでは、
プロバイダー全体のブレーカーをトリップしないでください。それらは通常、接続クールダウンまたは
モデルロックアウトに属します。汎用 API キープロバイダーの `403` は、終端的な
プロバイダー/アカウントエラーとして分類されない限り、回復可能であるべきです。

ブレーカーはバックグラウンドタイマーではなく、遅延（lazy）リカバリを使用します。`OPEN` の有効期限が切れると、`getStatus()`、`canExecute()`、`getRetryAfterMs()` などの読み取りによって状態が `HALF_OPEN` に更新されるため、ダッシュボードやコンボ候補ビルダーが期限切れのプロバイダーを永久に除外し続けることがありません。

### コネクションクールダウン

**スコープ**: 1つのプロバイダーコネクション/アカウント/キー。

**目的**: 不良なキー/アカウントを一時的にスキップしつつ、同じプロバイダーの他のコネクションがリクエストの処理を継続できるようにします。

**実装**:

- 書き込み/更新パス: `src/sse/services/auth.ts::markAccountUnavailable()`
- アカウントの選択/フィルタリング: `src/sse/services/auth.ts::getProviderCredentials...`
- クールダウン計算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定: `src/lib/resilience/settings.ts`

プロバイダーコネクションの重要なフィールド:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

アカウント選択中、次の条件が成り立つ間、コネクションはスキップされます:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

クールダウンも遅延（lazy）方式です: `rateLimitedUntil` が過去の時刻になると、そのコネクションは再び選択可能になります。使用に成功すると、`clearAccountError()` が `testStatus`、`rateLimitedUntil`、エラーフィールド、および `backoffLevel` をクリアします。

デフォルトのコネクションクールダウンの動作:

- OAuth の基本クールダウン: `5s`。
- APIキーの基本クールダウン: `3s`。
- APIキーの `429` では、利用可能な場合、アップストリームのリトライヒント（`Retry-After`、リセットヘッダー、またはパース可能なリセットテキスト）を優先する必要があります。
- 繰り返される回復可能な失敗には指数バックオフを使用します:

```ts
baseCooldownMs * 2 ** failureIndex;
```

サンダリングハード対策ガードにより、同じコネクションでの同時発生した失敗がクールダウンを繰り返し延長したり、`backoffLevel` を二重にインクリメントしたりすることを防ぎます。

終端状態はクールダウンではありません。`banned`、`expired`（`EXPIRED_RETRY_MAX` による N 回の制限付きリトライの後にのみ終端となる）、および `credits_exhausted` は、認証情報/設定が変更されるか、オペレーターがリセットするまで利用不可のままとなることを意図しています。終端状態を一時的なクールダウン状態で上書きしないでください。

### モデルロックアウト

**スコープ**: プロバイダー + コネクション + モデル。

**目的**: あるコネクションで1つのモデルだけが利用不可またはクォータ制限されている場合に、コネクション全体を無効化することを回避します。

例:

- モデルごとのクォータを持つプロバイダーが `429` を返す場合。
- ローカルプロバイダーが存在しない1つのモデルに対して `404` を返す場合。
- 選択された Grok モードのような、プロバイダー固有のモード/モデル権限の失敗。

モデルロックアウトは `open-sse/services/accountFallback.ts` に実装されており、同じコネクションが他のモデルの処理を継続できるようにします。

### デバッグガイダンス

- プロバイダーのすべてのキーがスキップされる場合は、プロバイダーブレーカーの状態と各コネクションの `rateLimitedUntil`/`testStatus` の両方を確認してください。
- リセットウィンドウの経過後もプロバイダーが永久に除外されているように見える場合は、コードが `getStatus()`/`canExecute()` を使わずに生の `state` を読み取っていないか確認してください。
- 1つのプロバイダーキーが失敗しても他のキーが動作するはずの場合は、プロバイダーブレーカーよりもコネクションクールダウンを優先してください。
- 1つのモデルだけが失敗する場合は、コネクションクールダウンよりもモデルロックアウトを優先してください。
- 状態が自己回復すべき場合は、将来のタイムスタンプ/リセットタイムアウトと、期限切れの状態を更新する読み取りパスを持つ必要があります。永続的なステータスには、手動による認証情報または設定の変更が必要です。

---

## TLS フィンガープリンティングとステルス

プロバイダー固有のステルス（JA3/JA4、CCH、難読化）は別途ドキュメント化されています — `docs/security/STEALTH_GUIDE.md` を参照してください（git にあり、`/docs` にはコンパイルされません）。

---

## レジリエンステスト（Phase 8 · Block C）

レジリエンスロジックのユニットテストに加え、3 つのテストが実際のストレス/障害条件下でランタイムを検証します（すべて統合/ナイトリーテスト — PR をブロックするものはありません）：

| テスト      | 内容                                                                                                                                                                                                                        | 実行                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Chaos       | フェイクアップストリームノードが実際のレイテンシ/リセット/タイムアウト/503 を注入し、サーキットブレーカーが開放/回復すること、および `checkFallbackError` が 503 を回復可能なフォールバックとして分類することを検証します。 | `RUN_CHAOS_INT=1 npm run test:chaos`         |
| Heap-growth | `--expose-gc` 下で `createSSEStream` あたり約 500 ストリームを実行；ヒープが上限を超えて増大した場合に失敗します（OOM ガード #3069）。                                                                                      | `npm run test:heap`                          |
| k6 soak     | `/api/monitoring/health` に対する持続的な負荷；p95/エラーしきい値。                                                                                                                                                         | `k6 run tests/load/k6-soak.js`（ナイトリー） |

`.github/workflows/nightly-resilience.yml`（cron + dispatch）によってオーケストレーションされます。デフォルトの `test:integration` では、chaos とヒープのテストは自己スキップします（`RUN_CHAOS_INT`/`--expose-gc` がない場合）。

---

## 関連項目

- [アーキテクチャガイド](./ARCHITECTURE.md) — システムアーキテクチャと内部構造
- [ユーザーガイド](../guides/USER_GUIDE.md) — プロバイダー、コンボ、CLI 統合
- [自動コンボエンジン](../routing/AUTO-COMBO.md) — 16 因子スコアリング、モードパック
