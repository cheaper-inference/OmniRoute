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

## 2. 接続クールダウン

**対象範囲:** 単一のプロバイダー接続／アカウント／キー。

**目的:** 1つの不良キーをスキップし、同じプロバイダーの他の接続は引き続きサービスを提供できるようにする。

**実装:**

- 利用不可としてマーク: `src/sse/services/auth.ts::markAccountUnavailable()`
- 選択: 同じファイルの `getProviderCredentials*`
- クールダウン計算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定: `src/lib/resilience/settings.ts`

**接続ごとのフィールド:**

- `rateLimitedUntil` — クールダウンが終了するまでのタイムスタンプ
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指数バックオフのカウンター

**デフォルトのクールダウン:**

- OAuth の基準値: 5s
- API キーの基準値: 3s
- API キーの 429: 上流の `Retry-After`／リセットヘッダー／解析可能なリセットテキストを優先
- バックオフ: `baseCooldownMs * 2 ** failureIndex`

**プロバイダーごとの再試行遅延。** プロバイダー詳細ページには **再試行遅延** セレクト（自動、15s〜1h）があります。これは
`PATCH /api/resilience` を通じて `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
（1〜21600）に保存されます。レート制限エラーに上流の再試行ヒントがない場合、この値がプロバイダーの
スケール済みバックオフを置き換え、`backoffLevel` を 0 にリセットします
（`open-sse/services/rotationConfig.ts::overrideFor`）。レート制限エラーに対する優先順位（高い順）は、
上流の再試行ヒント、`providerSpecificData.rotationOverrides.rateLimitResetSeconds` の接続ごとの値、
プロバイダーごとの再試行遅延、`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` 環境変数、
スケール済みバックオフです。自動を選択するとフィールドが削除されます。これはレート制限の理由にのみ
影響し、終端状態には影響しません。

**サンダリングハード防止策:** 同時に発生した障害によってクールダウンが過度に延長されたり、
`backoffLevel` が二重にインクリメントされたりするのを防ぎます。

**同時実行数制限による 429 はバックオフ段階を進みません。** 本文が同時実行数制限
（"too many concurrent requests"、"concurrency limit"、"parallel request limit"、GLM の `并发数过高`）を報告する
`429` は、アカウントが健全だがビジー状態であることを意味します。
`checkFallbackError()` は理由 `concurrency_limited` を返します。直ちに次の接続へフェイルオーバーし、
この接続を固定の `CONCURRENCY_LIMIT_COOLDOWN_MS`（1s）、または上流の再試行ヒントの期間だけクールダウンし、
`backoffLevel` は変更せず、`skipProviderBreaker` を設定します。
明示的なクォータ本文がある場合はそちらが優先されるため、クォータパターンにも一致する本文は
クォータ判定のままです。検出: `src/shared/utils/classify429.ts` の `looksLikeConcurrencyLimit()`；
判定: `open-sse/services/accountFallback/concurrencyLimit429.ts`。`classify429()`（ブレーカーの
`FailureKind`）は変更されず、これらの本文に対しても `rate_limit` を読み取ります。

**ストリームのコンテンツ停止ではアカウントをクールダウンしません。** コンテンツ停止ウォッチドッグ
（`open-sse/utils/streamHandler.ts`）が、モデル出力を時間内に一切送信しなかったストリームを
あきらめた場合、`markAccountUnavailable()` は接続にエラーを記録しますが、クールダウンは設定しません。
この停止はそのリクエストに属するものであり、多くの場合、まだ出力がない長い推論ターンが原因です。
オペレーターは `resilienceSettings.streamStallCooldown.enabled`（デフォルトは `false`）で
この機能を明示的に有効化できます。

**`p2c` アカウント選択向けのオプトイン式レイテンシーシグナル。** ディスパッチされた各試行では、
接続ごと（および接続 + モデルごと）に、インメモリのローリングウィンドウへ
Time-to-first-byte と結果を記録します。対象は 15 分以内の直近 20 サンプルです
（`open-sse/services/connectionLatencyTracker.ts`。`src/sse/handlers/chatHelpers.ts` の
`safeLogEvents()` から記録）。`resilienceSettings.p2cLatency.weight` が
`0` より大きい場合（範囲は 0〜20、デフォルトの `0` は無効）、`src/sse/services/auth.ts` の
`compareP2CConnections()` は、ペアの各候補に最大 `weight` ポイントを加算します。
その半分は、より高速な候補に対する比率としてのレイテンシーに由来し（2倍遅い場合に半分の全ポイント）、
残りの半分はローリングエラー率に由来します。この項は両方の候補に少なくとも 3 サンプルがある場合に
のみ適用されるため、新しいアカウントが不利になることはありません。また、その上限は
クォータによるブロックおよびクォータ枯渇に対するペナルティを下回ります。独自のサーキットは追加されません。
障害のあるアカウントは、引き続きクールダウン、ロックアウト、ブレーカーの各レイヤーで処理されます。
`PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` で設定します。

**推論フレームはコンテンツ停止の予算を再開します。** 推論モデルは、最初に表示可能なトークンを
出力するまで数分間思考することがあります。Claude は思考テキストが空の場合もある
`thinking_delta` フレームをストリームし、Responses API は次々に 1 つずつ推論アイテムをストリームします。
`isReasoningProgressFrame()`（`open-sse/utils/streamReadiness.ts`）はこれらのフレームを認識し、
ウォッチドッグはターンをキャンセルする代わりに、それぞれのフレームで予算を再開します。
これらは依然としてモデル出力ではないため、推論のみで終了するターンは引き続き空として報告され、
推論が停止してハートビートのみを送信するターンでは、ウォッチドッグが引き続き作動します。

Kiro のバイナリ `reasoningContentEvent` フレームは、空でない署名がある場合、空の
`reasoning_content` デルタとしてエグゼキューターを通じてこの推論アクティビティを保持します。
署名は転送されません。メタデータ、不完全なフレーム、空の署名ではコンテンツ予算は再開されません。
独立したアクティブストリームタイムアウトとクライアントによるキャンセルは引き続き適用されます
（`open-sse/executors/kiro/reasoning.ts`）。

**終端状態（クールダウンではありません）:**

- `banned` — 禁止キーワード／アカウント禁止の検出によって設定されます（[BAN_DETECTION](../security/BAN_DETECTION.md) を参照）。上流によるリクエスト単位の拒否（`request_rejected`、例: Anthropic OAuth 403 "Request not allowed"）では設定されません。これらは接続とモデルごとにカウントされ、そのモデルを増加するクールダウン（`REQUEST_REJECTED_MAX_COOLDOWN_MS` で上限 1 h）付きでローテーションから除外します。モデルが不明な場合は接続をクールダウンします — `open-sse/services/requestRejectedStreak.ts`
- `expired`（上限付きの再試行（指数バックオフ付きで `EXPIRED_RETRY_MAX = 3`）後に終端状態へ遷移するため、一時的な OAuth エラーはアカウントが恒久的に無効化される前に自動回復できます）
- `credits_exhausted`

これらは認証情報が変更されるか、オペレーターがリセットするまで保持されます。一時的なクールダウン状態で終端状態を上書きしないでください。

**遅延リカバリ:** `rateLimitedUntil` を過ぎると、接続は再び利用可能になります。正常に使用できた場合、`clearAccountError()` がすべてのエラーフィールドをクリアします。

### Claude OAuth 使用量の上限: 低優先度レーン + セッション上限のリセット

**対象範囲:** 1つの Claude サブスクリプション（OAuth）接続。どちらの機能も **接続ごとのオプトイン**（接続の編集 → Claude セクション → `providerSpecificData` 内の `lowPriorityMode` / `autoLimitReset`。どちらもデフォルトでは無効）であり、Claude Code の `/low-priority` および `/limit-reset` コマンドをミラーリングします（wire contract は Claude Code 2.1.263 から取得）。

**実装:**

- 状態マシン + レスポンス分類: `open-sse/services/claudeLowPriority.ts`
- リセット状態/クレームクライアント: `open-sse/services/claudeLimitReset.ts`
- Executor フック（ヘッダー注入 + 同一アカウントでの再試行）: `open-sse/executors/base.ts::execute()`
- オプトインの永続化: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**トリガー:** 5時間の使用量上限 — ヘッダーに
`anthropic-ratelimit-unified-status: rejected` が含まれ、アカウントが利用可能な場合は
`anthropic-ratelimit-unified-slow-offer: treatment` も含まれる `429`。この最初の上限
429 より前には何も送信されません。unified ヘッダーを伴わないバースト 429 は、通常のクールダウン経路を通ります。

**低優先度レーン**（`lowPriorityMode`）:

- 上限 429 で Executor はオファーを受け入れ、同じアカウントに対して
  `anthropic-usage-limit: slow` を付けて直ちに再試行します。レーンは通知された
  `anthropic-ratelimit-unified-reset`（+60秒の猶予）までアクティブなままとなり、その期間内のすべてのリクエストにヘッダーが付与されます。インターセプトされた 429 は `handleChatCore` に到達しないため、接続はクールダウン状態にならず、別の接続へローテーションされることもありません。
- 後続のレスポンスにおける `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed` の場合はレーンを維持します。`slot_busy`（429）または `529` の場合は、サーバーの
  `anthropic-ratelimit-unified-slow-retry-after`（デフォルト20秒、5～600秒に制限、±30%のジッター）待機して再試行します。これは
  `anthropic-ratelimit-unified-slow-max-wait`（デフォルト20分、1分～6時間に制限）によって上限が設定されます。その時間を過ぎるとレーンを終了し、10分間のクールオフによって再受け入れをブロックします。この待機時間には、リクエスト自身の upstream-start タイムアウト（デフォルト10分、`resolveFetchStartTimeout`）の残り時間から5秒のマージンを差し引いた値による追加の上限も適用されます。この上限がない場合、デフォルトの20分の max-wait がリクエストを超過し、待機中にスリープが中断されて、正常な `max_wait` 終了 + クールオフの代わりに `TimeoutError` が表面化します。
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`、5時間ウィンドウのロールオーバー、または
  `anthropic-ratelimit-unified-overage-in-use: true` を伴う `ineligible`（有料の超過使用量が上限をカバーするようになったため、どのステータスでも `extra_usage` として終了）は、レーンを終了します。その後、レスポンスは通常のクールダウン経路に流れます。`budget_exhausted` は、通知された予算リセット（最大8日間）まで記憶されます。
- 上限チェックは、Executor 自身による 400 起因の試行内再試行（コンテキスト編集、thinking/effort の制限、パラメータの自動学習）の後に実行されます。そのため、これらの再試行のいずれかで初めて表面化した上限 429 も、クールダウン経路に到達せずインターセプトされます。
- 状態は接続ごとにメモリ内で保持されます（再起動すると、再受け入れのために上限 429 が1回余分に必要になります）。

**セッション上限のリセット**（`autoLimitReset`。両方が有効な場合はレーンより先に試行）:

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ブロック。`arm: "reset"` かつ `available: true` の場合、
  `providerSpecificData.organizationUUID` の組織 UUID（ブートストラップ時のフォールバック）を使用して、`POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` に
  `{ "program": "juniper_tide" }` を送信します。
- `result: reset|not_limited` → スローヘッダーなしでフルスピードのリクエストを再試行します。
  `already_used` / `not_offered` は `next_available_at`（デフォルト1週間）をメモ化します。失敗した場合は15分間バックオフします。リセットは週1回で、週次上限にもカウントされます。

リグレッションガード: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### 蓄積したリセットの自動適用

**範囲：** CodexおよびClaudeサブスクリプション (OAuth) 接続。**オプトイン**: `bankedResetAutoApply`設定はオフで、デフォルトでは`dry-run`モードになっています (設定→ AI →バンク リセットの自動適用)。

**目的：**アカウントが使用量の上限に達したとき、プロバイダー制限ページでオペレーターが「引き換え」を押すのを待たずに、蓄積したリセットクレジットを自動的に使用します。

| クレジットタイプ (`creditTypes`) | 何が償還されるのか                                 | どこで実行されるか                                             |
| -------------------------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| `codexCredits`                   | Codexリセット クレジット                           | バックグラウンド ジョブ、60 秒ごと                             |
| `claudeCredits`                  | Claudeの蓄積した付与クレジット (`GRANT`クレジット) | バックグラウンド ジョブ、60 秒ごと                             |
| `claudeSessionReset`             | Claude週次セッション制限のリセット (上)            | リクエストパス、アカウントごとの切り替えと同じポリシーを介して |

**実装：**

- 純粋な決定 (両方のパスに 1 つのルール セット): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- バックグラウンドジョブ: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts`で開始)
- Claudeリクエスト パス ゲート: `src/lib/usage/claudeSessionResetPolicy.ts`、 `setClaudeLimitResetPolicy()`を通じて`open-sse/services/claudeLimitReset.ts`に登録
- 履歴、上限、Webhook: `src/lib/usage/bankedResetAudit.ts`
- 履歴API: `GET /api/settings/banked-reset-auto/history?limit=50` (管理認証)

**決定順序**(最初に失敗したルールが記録された理由です):

1. 機能がオフ、クレジット タイプがオフ、またはアカウントが範囲外です (`accountScope` `all` / `selected`とアカウントごとの`connections`マップ)。
2. オプションのUTCスケジュール外 (`startHourUtc` > `endHourUtc`午前 0 時をまたぐ)。
3. 過去 24 時間の上限: 2 つの引き換え間の`maxPerAccountPerDay` (1)、 `maxPerDay` (3)、および`minSpacingMinutes` (30)。
4. トリガー: 壁に囲まれた`session`または`weekly`ウィンドウ ( `isAccountQuotaExhausted()`ではなく`getQuotaWindowStatus().reachedThreshold`から読み取り、すべてのウィンドウが使用されたアカウントをレポートするだけです)、または少なくとも`expiringCreditMinUsedPercent` (50) を使用したアカウントで`expiringCreditHours` (24) 以内に期限切れになるクレジット。
5. ナチュラル リセット ガード: `sessionResetGuardMinutes` (90) 内で壁に囲まれた 5 時間ウィンドウ、または`weeklyResetGuardHours` (12) 内で壁に囲まれた週次ウィンドウがリセットされる場合はスキップします。
6. 週次フロア: 週次残りが`weeklyFloorPercent` (10) を下回る場合、5 時間のリセットをスキップします。
7. `last-resort`モード: 同じプロバイダーの別の範囲内アカウントが両方のウィンドウに少なくとも`poolHeadroomPercent` (10) 残っている間はスキップします。有効期限が間近のクレジットによるトリガーには、この制約を適用しません。
8. `dry-run`は記録を追加するだけで、引き換えは行いません。`last-resort`と`eager`では引き換えを行います。

クォータデータが欠けていても、引き換えは許可されません。判断に必要なリセット時刻または週次使用量が不明な場合、ポリシーはそのアカウントをスキップします。

**Claudeセッションのリセット:**機能がオフまたは`claudeSessionReset`がオフの場合、アカウントごとの`autoLimitReset`トグルは以前とまったく同じように決定します。両方をオンにすると、この機能はアカウントごとの切り替えを置き換えます。スコープ内のアカウントは、ポリシーで許可されている場合にのみ要求を行うことができ、 `dry-run`モードでは要求は行われません。

**安全性：**ジョブはティックごとに最大 1 クレジットを引き換え、クレジットをリストする前に決定し (スキップされたアカウントは決してリストされません)、冪等キー`auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`を使用し、リストまたは引き換えの失敗後にアカウントを 1 時間バックオフします。すべての償還、失敗、およびドライランの決定は`audit_log` (`action: "bankedReset.redeem"`、トークンやクレジット ID なし) に書き込まれます。上限はこれらの記録から計算されるため、再起動後も維持されます。引き換えが成功すると、 `provider.reset_redeemed` Webhook も起動されます。

回帰ガード: `tests/unit/banked-reset-policy.test.ts`、 `tests/unit/banked-reset-auto-apply.test.ts`、 `tests/unit/claude-limit-reset-policy-gate.test.ts`、 `tests/unit/banked-reset-history-route.test.ts`。

### セッションアフィニティ（#7274）

**対象範囲:** 1つのクライアントセッション（`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ヘッダー）を、**任意の**プロバイダーの1つの接続に固定します。

**目的:** マルチターンエージェント（Claude Code、aider、カスタムエージェント）がリクエスト間で同じアカウントを使用するようにし、プロバイダーごとのセッション状態を持つプロバイダーにおける、アカウント間のコンテキスト喪失やコールドスタート時の 429 の繰り返しを削減します。

**実装:**

- TTL の解決: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ピンの選択/作成: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ヘッダー抽出（任意のプロバイダーに対応）: `src/sse/services/auth.ts::extractSessionAffinityKey()`
- 永続化されたピンテーブル: `sessionAccountAffinity`（`src/lib/db/sessionAccountAffinity.ts`）
- 設定: `sessionAffinityTtlMs`（ミリ秒単位のグローバル TTL、`0` で無効化）— `src/lib/db/settings.ts`。Codex 専用の `codexSessionAffinityTtlMs` から、`124_generic_session_affinity_ttl.sql` のマイグレーションによって名称変更されました。このマイグレーションでは、以前設定されていた Codex TTL が新しいデフォルト値として引き継がれます。

#7274 より前は、`resolveSessionAffinityTtlMs()` が `codex` 以外のすべてのプロバイダーに対して早期に `0` を返していたため、ピン留め機構とヘッダー抽出がすでにプロバイダー非依存であったにもかかわらず、TTL 設定（およびセッションヘッダー）は他のどの場所でも効果がありませんでした。この修正により、その早期リターンが削除され、グローバルに `0` より大きい値を設定すると、TTL がすべてのプロバイダーに一律に適用されるようになりました。

3つのセッションアフィニティヘッダーが upstream に転送されることはありません。Executor はクライアントヘッダーをそのまま渡すのではなく、独自に upstream ヘッダーを最初から構築するため、これらは内部相関 ID としてのみ機能します。

### 排他的なマネージドセッション接続リース

**スコープ:** 1 つのアクティブなマネージド HTTP クライアント/セッションが、1 つの利用資格を持つ OmniRoute 接続を所有します。

**目的:** リクエスト間で厳格なルーティング境界を必要とするクライアントに、永続的な排他的接続所有権を提供します。これは、ソフトな継続性の優先設定であるセッションアフィニティとは異なります。
排他的リースはライフサイクル状態を SQLite に永続化し、アクティブな所有者と
アクティブな接続のグローバルな一意性を強制し、プロバイダーへのディスパッチ前に
古い世代を拒否します。

この機能は API キーごとにオプトインします。マネージドキーには `lease:exclusive` スコープと、
明示的な空でない `allowedConnections` リストが必要です。任意の HTTP クライアントがライフサイクルエンドポイントを使用できます。
クライアント名、ユーザーエージェント、プロバイダー、OAuth メソッド、モデルは必要ありません。リースが所有するのは
モデルではなく接続であるため、接続が通常どおり利用資格を持つ限り、モデルを変更してもバインディングは維持されます。
通常のモデル、クォータ、健全性、クールダウン、許可リストのルールは引き続き優先され、同じ世代を別の空いている利用資格のある接続へ
切り替えることがあります。

ライフサイクルは、JSON アクション `acquire`、`renew`、`release` を使用する `POST /api/v1/session-leases` です。
マネージド推論リクエストでは、不透明な `X-OmniRoute-Lease-Owner` 値と正確な
`X-OmniRoute-Lease-Generation` を提示します。所有者は `vlo_` に続く 43 個の base64url 文字で構成され、
保存されるのはその SHA-256 ハッシュのみです。すべての最終ディスパッチ境界では、認証済み API キー ID と
アクティブな接続 ID もバインドされます。リース制御ヘッダーは、ログ、保持されるリクエストスナップショット、
アップストリームエグゼキューターのヘッダーから削除されます。

通常のルーティングに利用資格のあるマネージド候補が存在するものの、空いている候補がすべて他のアクティブなリースによって占有されている場合、
OmniRoute は HTTP `429`、リース容量利用不可コード、容量待ち状態、および最も早く関連する有効期限から算出された
上限付きの `Retry-After` を返します。
通常の利用資格候補が空である状態はリース競合ではなく、既存のルーティングエラーのセマンティクスを維持します。

関連するメカニズムは引き続き分離されます。

- OAuth セッション占有は、OAuth アカウント向けのプロセス内ソフト分散です。
- アカウントセマフォはリクエスト同時実行の許可を付与し、リクエストの完了時に終了します。
- 排他的なマネージドセッションリースは、世代境界を伴う永続的なライフサイクル所有権です。

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

## 4. クォータ共有の同時実行制御 (v3.8.36)

サブスクリプションアカウント（GLM、MiniMax など）は、多くの場合、同時に受け付けられる
リクエスト数が約 1～3 件に限られます。これを超えると 429 エラーやクールダウンが発生します。
これは、複数の API キーが 1 つの上流アカウントを共有する
**クォータ共有**（`qtSd/…`）コンボで特に深刻です。共有アカウントが過負荷にならないよう、
3 つのレイヤーで制御します。

### 接続単位の同時実行数上限 (`max_concurrent`)

各プロバイダー接続では、`max_concurrent` 上限を宣言できます
（`provider_connections.max_concurrent`。接続モーダル / API / DB で設定）。
制限しない場合は空欄にします。これは、以下の直列化レイヤーを制御する単一の設定値です。
アカウントの実際の同時実行数（例: GLM は約 1、MiniMax は約 2）に設定してください。

### モデル単位の同時実行数上限 (`modelConcurrency`)

接続では、`rateLimitOverrides` マップ内にモデル単位の正確な同時実行数上限を追加で
宣言できます。

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

接続モーダル（**レート制限のオーバーライド → モデル単位の同時実行数上限**。1 行につき
`model=cap`）で設定するか、同じ JSON 形式で
`PATCH /api/providers/[id]` を使用します。キーの意味は次のとおりです。

- **接続全体とモデル固有:** `maxConcurrent` は接続全体で共有される上限です。両方が適用される場合、
  同じ複合ゲート（`global → provider → account → model`）で両方のゲートがアトミックに取得されます。
  実際の動作は、適用可能な制限のうち厳しい方に従います。
- **モデルキーの完全一致:** キーは、ルーティング解決後に executor に渡されるモデル文字列です。
  通常は上流モデルの ID（`glm-5`）であり、クライアント側の `provider/model` エイリアス
  （`zai/glm-5` は `glm-5` に一致しません）ではありません。値は、同時リクエスト数の正の整数上限です。
- **ローカルでキューイング、検出は行わない:** 超過したリクエストは、既存のキュー / タイムアウトの
  セマンティクスに従ってローカルでキューに入ります（型付きの
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` アドミッションエラー）。
  OmniRoute は上流のポリシーを検出または推測せず、オペレーターが設定した正確な上限を適用します。
  モデルゲートが飽和してもプロバイダーが無効になることはなく、永続的なモデルロックアウトも発生しません。
  上流の 429 / クールダウン / フォールバック動作が、引き続きエラー時のバックストップになります。
- **接続単位、プロセス単位のスコープ:** 上限はデータベース接続単位で適用され、メモリ上に保持されます。
  そのため、同じ上流 API キーを再利用する 2 つの接続は相互に連携しません。
- **未設定の場合は変更なし:** マップを省略する（またはダッシュボードのフィールドを空欄にする）と、
  モデルゲートは追加されません。プロバイダー全体に対する制限を設定せずに構成する例:

```text
glm-5=1
glm-4.7=3
```

### クォータ共有リクエストの直列化

クォータ共有のディスパッチが、正の
`max_concurrent` を宣言している接続を対象とする場合、その**アカウント**への同時リクエストは、
接続単位のセマフォ（キー `qsconn:<connectionId>`）を通じて直列化されます。超過したリクエストは、
アカウントに殺到するのではなく、**キューで待機**します。これは**フェイルオープン**です。
つまり、キューが飽和した場合やタイムアウトした場合でも、ディスパッチ可能なリクエストを拒否することはなく、
スロットなしで処理が続行されます。設定は **設定 → レジリエンス → クォータ共有の接続単位同時実行**
（`resilienceSettings.quotaShareConcurrencyLimit.enabled`、デフォルトはオン）で切り替えます。
`max_concurrent` 上限がない場合、動作は変更されません。

> クォータ共有ルーティングゲート（`selectQuotaShareTarget`、DRR + P2C）自体も
> フェイルオープンであり、上限に達した接続の優先度を下げるだけです。接続が 1 つだけのプールでは
> ハードリミットを設定できないため、実際に殺到を抑制するのはこのセマフォです。

### コンボのクールダウン対応リトライ

すべてのコンボ戦略では（有効な場合）、SHORT の一時的なクールダウンにより 429 が確定する
リクエストについて、429 を返す代わりにクールダウンが終了するまで待機して再ディスパッチします。
これは、複数モデルのコンボで両方の対象がモデル単位のレート制限に達した場合など、
Gemini 系の TPM/RPM ウィンドウ（約 60 秒の retry-after）を対象とします。
この動作は、**設定 → レジリエンス**の `comboCooldownWait`（`enabled`、`maxWaitMs`、`maxAttempts`、
`budgetMs`）によって制限されます。`quota_exhausted`（深夜までロックされる）や
認証 / 存在しない理由については待機しません。

コンボでは `config.comboCooldownWaitEnabled: false` を指定してオプトアウトできます。
リテラル値 `false` の場合のみ、これらの共有コンボ待機（ディスパッチ後のクールダウン待機、
ディスパッチ前のサーキットオープン / モデルロック待機）と、待機予算によるタイムアウト下限の拡張が無効になります。
未指定または `true` の場合はグローバルポリシーが維持されます。`true` によって、グローバルで無効にされた
待機を有効にすることはできません。明示的な `targetTimeoutMs` がある場合は、そちらが優先されます。
このオプトアウトは、ネイティブ Codex のターン固定におけるディスパッチ前待機には影響しません。

同じゲートはディスパッチ前のケース（#16319）にも適用されます。コンボのすべての対象が、
試行を 1 回も行う前に短時間の一時的なロックアウトによってスキップされた場合、試行回数ゼロの
パスで同じ上限の下でロックが解除されるまで待機し、`503 ALL_TARGETS_SKIPPED` のヒントなし
レスポンスを返す代わりに再ディスパッチします。待機が許可されない場合（上限、試行回数、
または予算を使い果たした場合、あるいは機能が無効の場合）、終端レスポンスは
`429 rate_limit_error` に変わり、最も早く一時ロックが解除される時刻の
`retry_after` / `reset_at` を含みます。クォータ、認証、存在しない対象のロックでは、ヒントなしの 503 が維持されます。

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

## その他のレジリエンス機能

- **20 のルーティング戦略**(priority、weighted、round-robin、context-relay、fill-first、p2c、random、least-used、cost-optimized、reset-aware、reset-window、headroom、quota-weighted、strict-random、auto、lkgp、context-optimized、cache-optimized、fusion、pipeline)— [AUTO-COMBO.md](../routing/AUTO-COMBO.md) を参照。
- **リセット認識ルーティング**(v3.8.0)— クォータのリセット時刻に基づいて接続を優先順位付けします。
- **バックグラウンドモードのデグレード** — Responses API の `background: true` は警告付きで同期実行にデグレードされます。
- **動的ツール制限検出** — ツール数の制限に達した際にプロバイダーをバックオフします。
- **緊急フォールバック** — `OMNIROUTE_EMERGENCY_FALLBACK` で制御されます。運用者は再起動なしで Feature Flags ページから上書きできます。

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
