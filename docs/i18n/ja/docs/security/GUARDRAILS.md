# Guardrails (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **信頼できる情報源:** `src/lib/guardrails/`
> **最終更新:** 2026-10-17 — v3.8.52（[カバレッジと制限](#coverage-and-limits)を追加：
> フックが到達するルートとレスポンスパス、マージされた無効化ヘッダー（#16412）、
> 必須境界としてのインジェクションブロックモード（#16413）、および post-call の前に
> レスポンスを参照するもの）

ガードレールは、OmniRoute とアップストリームプロバイダーとの境界で、安全性、ポリシー、
コンテンツ変換を強制します。各ガードレールは、リクエストペイロード（`preCall`）と
アップストリームレスポンス（`postCall`）を検査できます（オプションで拒否、変換、
注釈付けも可能）。

このシステムは**フェイルオープン**です：ガードレールが実行中に例外をスローしても、
レジストリはエラーを記録し、リクエストを失敗させるのではなく次のガードレールに
進みます。ブロッキングは明示的な判断（`block: true`）であり、決して偶発的に
起こるものではありません。唯一の例外はアボートされたリクエストです：呼び出し元の
`signal` がアボートされた場合、例外をスローしたガードレールはスキップされるのではなく、
フック実行を拒否します。

フックはすべてのルートやすべてのレスポンスで実行されるわけでは**ありません**。
ガードレールをセキュリティ制御として信頼する前に、
[カバレッジと制限](#coverage-and-limits)をお読みください。

## 組み込みガードレール

レジストリはインポート時に優先度順で 6 つのガードレールを自動ロードします
（`registry.ts` → `registerDefaultGuardrails()` を参照）：

| 優先度 | 名前                | ステージ       | ファイル              |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先度の数値が小さいほど**先に**実行されます。

### Vision Bridge（`visionBridge.ts`）— Modality Bridge PR-1

GLM 5.3 ベースモデルと `glm-5.3-{low,high,max}` には、明示的な
`supportsVision:false` のレジストリ/スペックメタデータがあります。GLM 5.3 Flash
バリアントはネイティブビジョンモデルのままです。Claude Code の `/v1/messages` ルートは、
Claude-to-OpenAI 変換の**前に**共有 `handleChat` プリコールガードレールチェーンに
入ります。ネストされた `Read` ツール結果の画像は、その変換によって OpenAI の
`image_url` コンテンツに引き上げられる前に、記述または処理される必要があります（#17069）。

**非ビジョンモデル**宛ての画像を含むリクエストをインターセプトし、リクエスト全体を
ビジョン対応モデルにリルートするか、アップストリーム呼び出しの前に画像パートを
設定可能なビジョンモデルが生成したテキスト記述に置き換えます。これにより、
テキストのみのプロバイダーでもマルチモーダルペイロードを透過的に処理できます。

フロー：

1. ターゲットモデルがすでにビジョンをサポートしている場合はスキップします
   （強制ブリッジリスト `isVisionBridgeForcedModel` に含まれる場合を除く）。
2. `extractImageParts(messages)`（`visionBridgeHelpers.ts`）を介して画像パートを
   抽出します。これは、コンボ互換性フィルターと共有される単一の信頼できる
   情報源である `open-sse/utils/mediaParts.ts` の**統合メディア検出器**
   `detectMediaParts()` に委譲されます。抽出は、`replaceImageParts` が
   元に戻せる形状に許可リストで限定されています（extract↔replace 契約）：
   OpenAI `image_url`、Anthropic base64 `source.type:"base64"`、Anthropic URL
   `source.type:"url"`、Responses API `input_image`。Claude Code の
   `tool_result.content` や Responses ツール出力内にネストされた一致する画像も
   抽出され、元のパスで置き換えられます。インジケーターのみの形状は
   コンボフィルター用の素材であり、抽出されません。
   見つからない場合はスキップします。
3. `resolveVisionBridgeRuntimeSettings()`
   （`src/shared/constants/modalityBridgeDefaults.ts`）を介してランタイム設定を
   解決します：新しい `modalityBridge*` 設定キーが優先されます。レガシーの
   `visionBridge*` キーは**1 サイクルのフォールバック**（ロールバック期間）として
   残ります。ブリッジが無効な場合は、メディア走査の前にスキップします。
4. モードセレクター（`modalityBridgeVisionMode`、下の表を参照）がリルートか
   記述かを決定します。リルートは `model` のみを入れ替えた `modifiedPayload` と、
   メタ `{ rerouted, fromModel, toModel, imagesKept }` を返します。
5. 記述パス：画像を `maxImages` で制限し、タスク認識プロンプトを構成し、
   記述キャッシュを参照し、ビジョンモデルを**並列で**呼び出し
   （`Promise.allSettled`）、その代わりに `[Image N]: <description>` テキストパートを
   挿入します。記述が失敗した場合は `null` になります：不明/ビジョン対応ターゲットでは
   生の画像が保持されますが（#4012）、**確認済みのテキストのみの直接ターゲット**または
   ゼロビジョンコンボでは、部分的な失敗や記述呼び出し上限を超えた画像を含む、
   記述されていないすべての画像に対して明示的な
   `(unavailable — no vision-capable provider connected)` テキストスタブが
   挿入されます（#17069）。既存の全失敗コンボ記述フォールバックはそのまま
   残ります（#8430）。
6. `modifiedPayload` とメタ（`imagesProcessed`、`descriptions`、
   `processingTimeMs`、`visionModel`）を返します。

#### モードセレクター（`modalityBridgeVisionMode`）

| モード     | デフォルト | 動作                                                                                                                                                                                                                                                                                                 |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | レガシーヒューリスティック、変更なし (#6640/#7204): コンボではない/`auto/` モデルは、元のモデルがすでに使用可能な認証情報を持っている場合を除き (その場合は describe)、最適なビジョンモデルへリルートされます。コンボターゲットは常に describe します。                                              |
| `describe` |            | 常に describe — リルートブロックは完全にスキップされ、ユーザーが選択したモデルが常に応答します。                                                                                                                                                                                                     |
| `reroute`  |            | 強制リルート: keep-credentialed-model ガードはバイパスされます。リルート**ターゲット**の認証情報ガードは引き続き適用されます — 使用可能なビジョンターゲットが存在しない場合、ブリッジは describe したり raw 画像をテキストのみのターゲットへ送信したりするのではなく、明確なエラーでブロックします。 |

強制モードは auto ヒューリスティックが実行される**前**にショートサーキットします。`auto` の動作は PR-1 以前のガードレールとバイト単位で同一です。

#### API キースコープ (`visionBridgeKeyScope.ts`)

呼び出し元の API キーが `allowedConnections`、クォータプール (`allowedQuotas`)、またはモデル (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`) を制限している場合、ブリッジはそのキーが使用できる接続上で、そのキーが使用できるリルートモデルと describe モデルのみを選択します。describe 呼び出しは常に `x-omniroute-self-loop-key-id` ヘッダー付きの OmniRoute セルフループを経由するため、受信側のチャットリクエストはそのキーの接続およびモデルポリシーを再度強制します。`enforceApiKeyPolicy()` はそのヘッダーをセルフループベアラーと組み合わせた場合にのみ尊重するため、アクセスを狭めることしかできず、解決できない id は拒否されます。

キーに対して許可されたビジョンモデルがない場合、**テキストのみであることが確認されたターゲット**は、対応できないアップストリームへ画像バイトを転送する代わりに、明確な HTTP 400 で画像リクエストをローカルで拒否します (#17069)。ビジョン機能が不明またはネイティブであるターゲットの場合、describe パスは以前のフェイルオープン動作を維持します (メタ `{ skipped: true, reason: "no_permitted_vision_model" }`)。キーのないリクエスト、およびこれらの制限のないキーは、以前とまったく同じように動作します。

#### タスク認識 describe プロンプト (`modalityBridgeVisionTaskAware`)

デフォルトは **true**。`composeVisionPrompt()` (`visionBridgeHelpers.ts`) は、**最後のユーザーメッセージ**のテキスト (500 文字に切り詰め) をベースの describe プロンプトに付加し、説明をユーザーが実際に尋ねた内容へ向けさせ (codex-vision-proxy パターン)、ビジョンモデルに表示されているテキストの転写を求めます。フラグがオフの場合 — またはユーザーテキストがない場合 — ベースプロンプトがそのまま使用されます。

describe セルフループ自身の OpenAI 互換リクエスト (`visionBridgeHelpers.ts` の `callVisionModelSingle()`) は、常に `image_url.detail: "high"` をリクエストします — 無条件に、すべての呼び出し元/プロバイダーに対して、クライアントシグナルには一切依存しません。低詳細度のサンプリングは、このプロンプトが要求するまさにテキスト転写タスクの OCR 精度を低下させるため、describe 呼び出し自体は、元の受信リクエストがどの詳細度レベルを使用したかに関係なく、常に高詳細度を要求します。これは内部の describe リクエストボディにのみ影響し、OmniRoute がプライマリリクエストで呼び出し元自身の `image_url.detail` を転送する方法は変更しません — そのデフォルトは別途、検出された OpenCode クライアントに対してのみ、`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) で適用されます。describe セルフループの Anthropic ワイヤーフォーマット分岐には `detail` フィールドがなく、どちらのデフォルトの影響も受けません。

#### Describe 出力上限 (`modalityBridgeVisionMaxChars`)

| キー                           | デフォルト | 範囲                  |
| ------------------------------ | ---------- | --------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` または 100〜50000 |

`0` (デフォルト) は**上限なし**を意味します — `callVisionModel()` が返す説明は変更されずにそのまま渡され、既存の動作が維持されます。100〜50000 の範囲の値は、`[Image N]: <description>` として差し戻される前に、`…` サフィックスを付けて説明を切り詰めます (`src/lib/guardrails/visionBridge.ts` の `VisionBridgeGuardrail.preCall()`)。下流のモデルが完全な転写を必要とする詳細重視の OCR タスクではこの値を上げ、おしゃべりなビジョンモデルでのトークン使用量を抑えるには下げてください。ダッシュボードのフィールドは Vision タブの Advanced パネル (`ModalityBridgeVisionTab.tsx` の `modality-bridge-max-chars`) にあり、1〜99 の値は 100 の下限までクランプされ、明示的な `0` はそのまま残されます — `0` は単なる「未設定」のデフォルトではなく、それ自体が有効な Zod 値です (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)。

#### Describe キャッシュ (`modalityBridge/bridgeCache.ts`)

describe 出力のためのインメモリ LRU + TTL キャッシュで、プロセス全体で共有されます。キー = `sha256(imageRef + composedPrompt + configuredBridgeModel)` で、長さプレフィックスフレーミングを使用します (フィールド境界の衝突なし)。モデル要素は実際に応答したモデルではなく、**設定された**ブリッジモデルです — `callVisionModel` は内部でフォールバックする可能性があり、試行ごとにキーを設定するとキャッシュが分断されてしまいます。失敗した describe はキャッシュされません。設定:

| キー                            | デフォルト | 範囲     |
| ------------------------------- | ---------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`     | —        |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1〜1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10〜5000 |

#### リモート画像の正規化（セルフループ describe/base64 フェッチ）

ブリッジが**リモート**画像を自身でフェッチする場合 — Anthropic の describe セルフコールと claude-wire-format の base64 変換（`ensureBase64ImagesForClaudeWire`）で、どちらも `visionBridgeHelpers.ts` 内の `fetchRemoteImageAsDataUri()` を経由します — 結果のデータ URI は、vision モデルリクエストに埋め込まれる前に `normalizeDataUri()`（`open-sse/utils/imageNormalize.ts`）を通過します。サイズ超過の画像は**長辺 2048px** にダウンスケールされ（OpenAI/Anthropic がすでにサーバーサイドで適用しているリサイズ上限と一致）、vision モデルが認識する内容を変えることなく、アップロードのバイト数/レイテンシを削減します。リサイズには `sharp` を使用し、動的インポート経由で読み込まれます：ネイティブバイナリの読み込みに失敗するプラットフォームでは、`normalizeDataUri()` は**決してスローしません** — 元のバイトをそのまま通過させるフォールバックに切り替わるため、describe/base64 変換パスは常に動作し続けます。画像以外のバイト（デコード可能な画像を返さなかったフェッチ）も変更されずそのまま通過します。この正規化は、ブリッジが自身のセルフコールのためにフェッチする画像に限定されたスコープであり、呼び出し元の生のパススルーペイロードに適用されることは決してありません。これはオプトインのみの変更原則（Hard Rule #20）と一致しています。

#### 設定スキーマ + マイグレーション

新しい `modalityBridge*` キーは `updateSettingsSchema`（`src/shared/validation/settingsSchemas.ts`）で Zod 検証されます：`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、`modalityBridgeCache*` の 3 つのキー、および Audio Bridge が使用する `modalityBridgeAudio*` グループです。マイグレーション `141_modality_bridge_settings.sql` は、既存のレガシー `visionBridge*` の値を対応する新しいキーにコピーします（冪等で、オペレーターが設定した `modalityBridge*` の値を決して上書きしません）。レガシーキーは 1 リリースサイクルの間、読み取りフォールバックとして引き続き受け入れられます。

#### 透過性ヘッダー + 統計

describe 変換されたレスポンスには
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
が付与されます（`modalityBridge/bridgeStats.ts` 内の `buildModalityBridgeHeader()` で構築され、`src/sse/handlers/chatHelpers.ts` 内の `withModalityBridgeHeader()` でスタンプされます）。リルートされたリクエストにはヘッダーは**付きません** — ペイロードは変更されておらず、モデルの切り替えはレスポンスボディの `model` フィールドですでに確認できるためです。

`GET /api/modality-bridge/stats`（管理認証、`GET /api/settings` と同じティア）は、`vision`、`audio`、`video` のインメモリのモダリティ別カウンター
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` を返します。`averageLatencyMs` は分母として全試行ではなく `latencySamples` を使用します。タイミング計測のないオペレーションがゼロミリ秒のサンプルを捏造することはありません。`bridged` は成功した変換の後方互換エイリアスのままであり、失敗した試行ではインクリメントされません。
カウンターは設計上、プロセス再起動時にリセットされます
（会計ではなくテレメトリであるため）。

#### ダッシュボード設定

専用のダッシュボードページは
`/dashboard/settings/modality-bridge` です。URL でアドレス指定可能な `Vision`、`Audio`、
`Video` タブは、`tab` 値を切り替える際にクエリパラメータを保持します。
Vision タブは、有効化、モード、モデル選択（自動デフォルトを含む）、タスク対応プロンプティング、詳細なタイムアウト/画像/説明文長/キャッシュの上限、ランタイム
カウンター、およびガード付きのサンプルリクエストを公開します。Audio タブも利用可能です：有効化、Auto を含む STT 専用モデルピッカー、タイムアウト/最大クリップの上限、音声
カウンター、および `input_audio` サンプルテストを公開します。Video タブは機能しています：FFmpeg/ffprobe のランタイム状態を報告します — 4 つの明示的な UI 状態のいずれか（プローブが実行中または完了できなかった場合の `unknown`、プローブがクライアントサイドでスキップされる非ループバックの
ダッシュボードホストでの `restricted`、プローブ後に存在しないことが確認された場合の `unavailable`、または FFmpeg/ffprobe のバージョン付きの `available`）— 有効化/モデル/フレーム/動画/タイムアウトの上限を永続化し、モデルピッカーを vision 対応モデルにフィルタリングし、動画カウンターを公開します。

AI 設定内の以前の Vision Bridge カードは、新しいページへの互換性リンクになっています。フォームの 2 つ目のコピーを保持しなくなりました。Media Providers も、Image-to-Text および Speech-to-Text ワークフローを対応する Modality Bridge タブにリンクしており、既存の Speech-to-Text プレイグラウンドは削除していません。

**セルフループのアドミッションバイパス：** describe コールが OmniRoute 自身の
`/v1` セルフループ（非標準プロバイダーモデル）経由でルーティングされる場合、サブリクエストは
`x-omniroute-admission-bypass: internal` を送信し、解決された
セルフループ認証情報で認証されます — ローカルモードではローカルの `sk_omniroute` センチネル、またはオペレーターが設定した `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境変数キー（#1350）で、
`REQUIRE_API_KEY=true` のデプロイでも describe コールを実行できます。このバイパス
はこれらの特定の認証情報に対してのみ尊重されるため、外部クライアントがこの
ヘッダーを使用してアドミッションをスキップすることはできません。

レガシーのデフォルトは `src/shared/constants/visionBridgeDefaults.ts` にあります。
新しいモード/タスク対応/キャッシュのデフォルトと設定リゾルバーは
`src/shared/constants/modalityBridgeDefaults.ts` にあります。ガードレールは
`deps` コンストラクタオプションを公開しており、テストでフェイクの `getSettings` および
`callVisionModel` 実装を注入できます。

### Audio Bridge（`audioBridge.ts`）— Modality Bridge PR-3

音声入力を受け付けることが確認されていないターゲットに到達する前に、音声を含む
チャットリクエストをインターセプトします。チャットリクエストをリルートすることは決してありません：音声パートは
既存の OpenAI 互換マルチパートエンドポイントを通じて文字起こしされ、
選択されたチャットモデルはテキストのトランスクリプトで処理を続行します。

フロー：

1. `supportsAudio` は `getResolvedModelCapabilities()` を通じて解決します。明示的な
   プロバイダーレジストリのメタデータが優先され、次に静的モデルメタデータ、
   次に同期された `modalities_input` が使用されます。`audio` を含まない宣言済みの
   入力リストは `false` とみなされ、機能の根拠がない場合は `null` のままになります。
   `false` と `null` の両方が保守的なブリッジを有効化し、`true` はそれをバイパスします。
2. `modalityBridgeAudio*` 設定を解決し、共有の `detectMediaParts()` 検出器を通じて、
   すべてのメッセージからスプライス可能なトップレベルのオーディオパーツを抽出します。
   サポートされるワイヤ形式は、OpenAI の `input_audio`、`audio_url`、および
   `source.media_type: "audio/*"` です。ネストされたオーディオはルーティングのために
   検出されますが、スプライスパスでは除去されません。処理量は
   `modalityBridgeAudioMaxClips` によって制限され、それ以降のパーツは変更されません。
3. 設定された `provider/model` を尊重するか、`selectAudioBridgeModel()` が
   `AUDIO_TRANSCRIPTION_PROVIDERS` を安定したカタログ順で走査し、使用可能な
   アクティブなプロバイダー資格情報を持つ最初のモデルを選択します。
4. `callAudioTranscription()` は base64/data-URI オーディオをマルチパートの `file`
   に変換するか、DNS ピニングと 25 MB の上限を持つ公開専用アウトバウンドガードを
   通じてリモートの `audio_url` をダウンロードします。その後、ファイルと選択された
   モデルを、`resolveSelfLoopBearer()` で認証されたローカルの
   `/v1/audio/transcriptions` セルフループに POST します。既存の文字起こしルートは、
   通常の資格情報ルックアップ、クールダウン/レート制限処理、およびプロバイダー
   ディスパッチを実行します。
5. 成功した呼び出しは、対象のパーツを `[Audio N]: <transcript>` に置き換えます。
   呼び出しは `Promise.allSettled` で実行されます。個別の失敗では元のオーディオ
   パーツが保持されます(#4012 コントラクト)。すべての呼び出しが失敗し、ターゲットが
   `supportsAudio === false` と証明されている場合、パーツは
   `[Audio N]: (unavailable — no STT provider connected)` になります(#8430
   コントラクト)。不明なターゲット(`null`)の場合、全失敗の結果はそのまま変更
   されません。使用可能な STT 資格情報のないテキストのみのターゲットと証明されて
   いる場合は、ネットワーク呼び出しを発行せずに同じ明示的なスタブを受け取ります。

成功した文字起こしは、プロセス全体の Modality Bridge LRU/TTL キャッシュを使用します。
キーは、オーディオ参照、安定した `audio-transcription` 操作ラベル、および選択された
STT モデルを組み合わせたもので、失敗がキャッシュされることはありません。オーディオの
試行は、共有の `bridged`、`cacheHits`、`failures`、`lastUsedAt` カウンターを更新します。
変換されたレスポンスには
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` が付与されます。
変更されなかったリクエストには Audio Bridge セグメントは付与されません。

ランタイム設定は DB に保存され、Zod で検証されます。

| キー                          | デフォルト | 範囲              |
| ----------------------------- | ---------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                 |
| `modalityBridgeAudioModel`    | `""`       | 自動または STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10              |

共有キャッシュは、引き続き `modalityBridgeCacheEnabled`、
`modalityBridgeCacheTtlMinutes`、`modalityBridgeCacheMaxEntries` によって制御されます。

### ビデオブリッジ(`videoBridge.ts`、`videoBridgePipeline.ts`)

ネイティブのビデオサポートが確認されていないターゲットが呼び出される前に、Chat
Completions の `messages` および Responses API の `input` 内のトップレベルのビデオ
パーツをインターセプトします。サポートされる形式は、`input_video`、`video_url`、
`video_source`、HTTPS URL、および `data:video/*;base64,...` データ URI です。
テキスト内の単純なファイル名はビデオとして扱われません。

`VideoBridgeGuardrail.preCall`(`videoBridge.ts`)は、リクエスト走査、機能/ポリシー
チェック、リクエストごとの集約、およびレスポンスペイロードを担当します。ビデオごとの
処理 — 取得、結果全体のキャッシュ、フレームシーケンスの記述(呼び出し元が宣言した
オーディオトランスクリプトをすべて融合)、および試行ごとのメトリクス/中断/クリーン
アップ — は、`preCall` のループ内でビデオパーツごとに 1 回呼び出される
`videoBridgePipeline.ts` の `processVideoPart` の背後に隠蔽されています。このモジュールは
また、明示的なポート境界 `VideoMediaBrokerPort`(バイトの取得とサンプリングフレームの
抽出)、`VideoAudioTranscriptionPort`(呼び出し元が宣言したオーディオトランスクリプトと
サンプリングされたキャプションの融合)、および `VideoDrilldownPort`(フレームドリル
ダウンの永続化境界。まだ `processVideoPart` には配線されていない — 現在は個別の
`/api/modality-bridge/video/drilldown` ルートのみがドリルダウンエントリを書き込む)を
定義します。

公開 `/v1` リクエストパスは、サブプロセスをインポートまたは呼び出すことはありません。
リモートビデオは 50 MiB の上限の下でダウンロードされます。インラインの base64 ビデオ
には、モデル/メッセージ/フレーミングのエンベロープが公開 JSON リクエストの許容上限で
ある 50 MiB 以内に収まるように、ビデオごとに 36 MiB の保守的なデコード済みサイズ上限が
あります。インラインの長さとデコード後サイズの推定値は、割り当て前にチェックされます。
初期のリモート URL とすべてのリダイレクトで HTTPS が必須であり、DNS ピニングを使用する
既存の公開専用アウトバウンドガードが使用されます。その後、バイトは厳密に内部の
`POST /api/modality-bridge/video/extract` ブローカー境界を越えます。このルートは
`LOCAL_ONLY` と `SPAWN_CAPABLE` の両方であり、プロセスごとに認証された信頼できる
ループバックリクエストのみを受け入れ、URL、ファイルシステムパス、実行ファイル、または
引数リストを決して受け入れません。API のボディサイズパイプラインとハンドラーの増分
ボディリーダーは、それぞれ独立して 50 MiB のブローカー入力上限を強制します。その有界
キューは一度に 1 つの抽出を実行し、4 つの保留ジョブを許可し、保留中の入力を 100 MiB に
制限します。

ブローカー内部では、`ffprobe` はプライベートなローカルファイルを読み取ります。固定のフォーマット許可リストは、プレイリスト形式およびマニフェスト形式を除外します。許可された MOV ファミリーのコンテナについては、外部 MOV データ参照はデフォルトで無効のままであり、固定コマンドはそれらにオプトインしません。`ffprobe` と `ffmpeg` はいずれも、`file` のみのプロトコルホワイトリスト、1 スレッド、固定引数配列、シェル不使用、そして `PATH` から解決される実行ファイルを使用します。添付画像（attached-picture）のカバーストリームは再生可能な候補にはなりません。すべての再生可能ストリームは制限を満たす必要があり、明示的なデフォルトストリームは、決定論的な最小インデックスへのフォールバックよりも優先されます。動画は 600 秒、各次元 8,192 ピクセル、ソースピクセル数 33,554,432 に制限されます。FFmpeg は 1〜16 個の中間点 JPEG フレームをサンプリングし、長辺を最大 1,024 ピクセルまで縮小します（小さい入力をアップスケールすることはありません）。また、URL を受け取ることは決してありません。サンプリングはデフォルトで `uniform` です。オプションの `scene_aware` ポリシーおよび実験的な `segment_aware` ポリシーは、検証済みのローカルストリームに対して追加の固定 FFmpeg パスを 1 回実行し、上限のある `showinfo` シーンタイムスタンプを選択し、検出器の失敗、タイムアウト、不正な出力、または候補セットが空の場合には、同じ均等な中間点へ決定論的にフォールバックします。セグメント対応（segment-aware）モードは、検証済みのシーン区間に比例して中間点サンプルを割り当てます。segment-aware の根拠（エビデンス）とフォールバック動作の詳細は後述します。16 フレームのハード上限は、すべてのポリシーで選択後に適用されます。scene-aware リクエストのフレーム予算が 1 フレームのみの場合、アクティブな動画全体またはフォーカスウィンドウの均等な中間点を使用し、`policyEffective: uniform` を報告します。単一に選択されたシーンフレームでは、時間方向の両端を保持できないためです。呼び出し元はオプションで有限のフォーカスウィンドウ（`start`/`end` 秒）を指定できます。範囲はメディアの長さにクランプされ、逆順または非有限のウィンドウは拒否されます。すべてのサンプリングポリシーは正規化された区間内でのみ実行されます。結果のウィンドウはサンプリングメタデータと信頼されない説明プレフィックスに含まれ、下流のモデルがフォーカスされた抜粋と完全なタイムラインを区別できるようにします。

セマンティックキャプションフォーカスは、独立した明示的な設定です。デフォルトの `full` 分析モードは既存のフレームプロンプトを維持し、リクエストテキストをキャプションモデルに転送することは決してありません。`focused` モードでは、ブリッジは同じ Chat または Responses コンテナから、ユーザーが作成した最新の空でない `text`/`input_text` のみを読み取り、NFC に正規化し、制御文字と空白を畳み込み、500 Unicode コードポイントに制限します。結果が空の場合は、正確な `full` プロンプトにフォールバックします。使用可能なヒントは、専用の信頼されないユーザーコンテキストブロックに JSON としてシリアライズされ、観察可能な詳細を優先することのみが許可されます。メディア内で視認または聴取可能な指示に従うことに対する個別の警告を上書きすることはできません。テキストによるフォーカスは、`start`/`end` を推測したり、時間方向のサンプラーを変更したりすることは決してありません。

#### FU-07 構造的セグメントエビデンス

`segment_aware` は、検証済みのローカル動画ストリームに対して、上限のある事前分析パスを 1 回使用します。固定フィルターチェーンは、まず幅最大 320 ピクセルにスケーリングし、シーン変化と静止（フリーズ）区間を検出し、その後、ぼかし、平均輝度、空間/時間情報について 1 秒あたり 1 フレームでサンプリングします。このパスは、600 個の構造サンプル、1 つの FFmpeg/フィルタースレッド、同じ `file` のみのプロトコルおよびコンテナ許可リスト、1 MiB のプロセス出力上限、およびブローカーの共有アボート/デッドライン内で最大 30 秒に制限されます。リクエストからコマンド、フィルター、パス、URL を受け付けることは決してありません。

構造的な値は、セマンティックな動画理解ではなく、決定論的なサンプリング根拠です。被写体、動作、キャプション、音声、ユーザーの意図を推測しません。シーン境界とフリーズ境界がセグメントを形成します。フリーズのカバレッジ、ぼかし、露出、空間的詳細、時間的変化は、既存の 1〜16 フレーム予算の割り当て方法にのみ影響します。完全にフリーズしたセグメントは 1 フレームに制限され、フリーズしていないセグメントは残りの予算を競い合います。境界がフレーム数を上回る場合、均等なタイムラインカバレッジが維持されるため、序盤の速いカットが長い後続セグメントを隠すことはできません。フリーズ境界から 1 秒の分析解像度内にあるシーン境界は統合されます。

フィルターの欠落、不正/空の根拠、検出器エラー、または上限のある事前分析のタイムアウトは、正確な均等中間点ポリシーにフェイルオープンします。呼び出し元のアボートまたはブローカーのデッドラインはフェイルオープンしません。実行中のサブプロセスを終了し、後続のフレーム抽出を防止し、プライベートな一時ツリーは `finally` で削除されます。

`scripts/perf/video-bridge-fu07-eval.ts` は、重複排除後のキャプション呼び出し削減、密なモーションへの予算割り当て、ぼかし/露出/SI-TI 根拠、長い後部を伴う速いカット、および緩やかなフェードの誤検出について、決定論的な実際の FFmpeg フィクスチャを生成します。事前分析の実時間（wall time）を記録し、`/usr/bin/time` が利用可能な場合は子プロセスの CPU とピーク RSS も記録します。その品質チェックは構造的オラクルのみです。このハーネスには承認されたエンドポイントや固定されたジャッジがないため、実際のキャプションモデルの品質は `HOLD` のままです。`--caption-cost-per-call-usd` が明示的な正の呼び出しあたりコスト推定値を提供しない限り、金銭的削減も `HOLD` のままです。このスクリプトはどちらの結果も捏造しません。

各フレームは 4 MiB に制限され、すべての生フレームの合計は 23 MiB に、シリアライズされたブローカーレスポンスは 32 MiB に制限されます。プライベートな一時ディレクトリは `finally` で削除されます。OmniRoute は FFmpeg をバンドルせず、カスタム実行ファイルパスも受け付けません。キャプション付けの前に、ブリッジは保守的な視覚的重複排除パスを適用します。各 JPEG は 16×16 のグレースケールバッファに縮小され、直前に保持されたフレームとのみ比較されます。1 フレームを超えるキャプション予算が要求された場合、抽出処理はその予算の最大 2 倍まで、かつ決して 16 フレームを超えない、上限付きの候補プールを供給します。要求された上限は重複排除の後にのみ適用され、予算が少なくとも 2 ある場合の最終的な間引きでは、選択された最初と最後の候補が保持されます。バージョン管理された `grayscale-16x16-mean-cells-v2` ポリシーは、平均輝度差分と、正規化差分が少なくとも 0.05 であるサムネイルセルの比率のうち、大きい方を使用します。重複のしきい値は定数 0.04 であり、ランタイム設定として公開するのではなく、予測可能性を重視して選ばれています。この二次的な高コントラスト信号は、平均のみの比較では隠れてしまう可能性のある、小さな動きや可視テキストの変化を保持します。コンパレータまたはデコーダのエラーはフェイルオープンとなり、カバレッジを維持します。出力メタデータは、抽出された候補、正常に使用されたフレーム、破棄された視覚的重複を分離します。

明示的にマークされたビデオパートは、タイムスタンプ付きのコンタクトシートを要求できます。ブリッジは最大 4 列・16 フレームの JPEG グリッドを構築します。各 512 ピクセルのセルは、ソースのタイムスタンプを高コントラストの下部バンドに焼き付けます。同じタイムスタンプは、下流での関連付けと監査のためにテキストメタデータにも保持されます。完成した JPEG は 32 MiB の上限のままです。`sharp` がグリッドをデコードまたは合成できない場合、ブリッジは個々の JPEG フレームにフォールバックします。クライアントの中止はシート操作を通じても伝播します。

昇格の根拠は、合成コンポジションのマイクロベンチマークから意図的に分離されています。`scripts/perf/video-bridge-contact-sheet-eval.ts` は、実際の OpenAI 互換ビジョンモデル向けの、スキーマバージョン管理された A/B ハーネスを定義します。これは、プロバイダー報告のトークン数、エンドツーエンドの実時間レイテンシ（シート合成を含む）、モデル呼び出し回数、マニフェストで定義された事実保持を測定します。生のモデルレスポンスはレポートに書き込まれません。SHA-256 ダイジェストと一致した事実 ID のみが保持されます。`--execute-real` が渡され、`--model`、`OMNIROUTE_BASE_URL`、`OMNIROUTE_API_KEY` が設定されていない限り、ハーネスはネットワーク呼び出しや有料モデル呼び出しを行いません。その明示的な実実行がない場合、機械可読の判定は `HOLD` のままです。合成ペイロード/呼び出し回数の測定だけでは昇格の根拠にはなりません。

呼び出し元は、すでに位置合わせ済みのテキストを持っている場合、サポートされているビデオパートにオプションの `transcript.cues` 配列を添付できます。各キューは `text`、プローブされた再生時間内に収まる有限の `start`/`end` 間隔、およびホワイトリスト化された `source`（`client`、`embedded`、または `audio-bridge`）を持つ必要があります。`confidence` はデフォルトで `1` であり、`0` から `1` の間でなければなりません。完全に一致する重複キューは統合されます。OmniRoute はこのメタデータから文字起こしを開始することはありません。検証済みのキューは、ソース、信頼度、間隔とともに説明結果にコピーされ、フレームキャプションと並んで信頼できない観察としてレンダリングされます。無効なテキスト、範囲外のテキスト、来歴のないテキストは、キャプションストリームに混入されるのではなく、拒否されます。どちらのリクエストボディ文字起こしチャネルも、自己申告の `embedded` または `audio-bridge` ラベルを含め、提供された来歴を `client` に正規化します。それらの信頼できるラベルを割り当てられるのは、コード専用の `trustedSource` 引数を通じて、サーバー所有のアダプターのみです。リクエスト JSON フィールドからその引数に到達することはできません。文字起こしテキストは、その来歴に関係なく、信頼できないメディア由来のコンテンツであり続け、認可を決定するために使用してはなりません。

高度な呼び出し元は、同じビデオに対して `audioTranscript` トラックを提供できます。これはサーバーによる文字起こしの証明ではなく、クライアント提供のテキストとして扱われます。フュージョンシームは、1 つのデッドラインと中止シグナルの下で視覚と音声の観察を実行し、共通のタイムライン上に順序付け、完全一致する重複を統合し、片方のみが成功した場合には部分的な結果を報告します。無効な `audioTranscript` は、ビデオ全体を失敗させるのではなく、その部分的な結果へと降格します。視覚の説明は保持され、音声ブランチはサニタイズされた失敗コードを記録します。ブランチごとの可用性、部分フラグ、サニタイズされた失敗コードは、説明結果、ガードレールメタデータ（`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`）、結果キャッシュメタデータ、ブリッジフュージョンカウンターに保持されます。デフォルトの Video Bridge パスは、音声テキスト変換を呼び出さず、2 つ目のメディアコピーをダウンロードすることもありません。その明示的なトラックがない場合、ビデオのみのままです。

**トランスクリプトの保持（#12150 P1）。** これは、Video Bridge（それ自体がオプトイン）がトランスクリプトキューをレンダリングするたびに自動的に適用されます。個別の保持フラグはありません。リクエストがいずれかのトランスクリプトキュー（呼び出し元が宣言した
`transcript`、または統合された `audioTranscript`）をレンダリングすると、ガードレールはそのリクエストを
`videoBridgeObserved` としてマークし、動画説明の編集済みシャドウを生成します。これは、文字列を組み立てる前に構造化されたキューフィールドを置換し、各キューの自由記述本文を
`[redacted-video-transcript]` に置き換えた、同一形式のレンダリングです（フラット化されたテキストを解析することはないため、敵対的か通常かを問わず、`]` を含む
`[inaudible]`/`[music]` などの本文を含め、キューの内容が残ることはありません）。永続化される呼び出しログのリクエスト本文では、内容の一致によって動画由来の各テキストパートがその編集済みシャドウに置き換えられます。`fullText` アンカーは、呼び出し前ガードレールの完成済みペイロードから再取得されるため、後続のチェーンガードレール（優先度 10/95 の PII および認証情報マスカー）が説明テキストをインプレースで書き換えた後や、システムプロンプト、ハンドオフ、Memory の挿入によってメッセージ配列の形状が変わった後でも、一致は成功します。モデルにアップストリーム送信される本文は変更されません。また、観測されたリクエストは永続的な Memory を一切生成しません（リクエスト由来とレスポンス由来の両方の抽出がスキップされます）。そのため、モデル自身の応答によってトランスクリプトのテキストが Memory に反映されることもありません。

**生の動画フィールド（#12430）。** ブリッジが有効で、ネイティブ動画サポートが不明または存在しない場合、定義済みの `transcript`/`audioTranscript` フィールドも、説明の失敗後や `maxVideos` の制限後であっても `videoBridgeObserved` を有効にします。`null` と空文字列も対象に含まれますが、存在しないフィールドと動画以外のメタデータは含まれません。保持されるコピーでは、これらのフィールドを編集するかリクエスト自体を省略し、キャッシュと Memory をバイパスします。

これらのフォールバック経路では、有効な呼び出し元キューは、非標準のプロバイダーフィールドではなく、サポートされている `text`/`input_text`
パートになります。リクエストで提供された両方のトラックは、引き続き信頼されていない `client` 観測として扱われ、動画が説明されておらず、タイムスタンプがメディアに対して検証されていないことを示す明示的な警告が付加されます。既存の
256 キュー／合計 64 KiB、およびキューごとの上限は、2 つのトラック全体に対して適用されます。タイムスタンプは、ブローカーの 600 秒の上限と、指定されたフォーカスウィンドウの両方に収まる必要があります。無効なトラックは破棄され、任意のテキストとして転送されることはありません。有効な兄弟トラックは、両者の合計が上限を超えない限り、引き続き使用できます。null／空のフィールドからテキストが追加されることはありません。このフォールバックによってメディアの取得や文字起こしが追加されることもありません。トランスクリプト拡張フィールドは、フォールバックの動画キャリアと、その
`video_url`/`source` オブジェクトから削除されます。OpenAI のワイヤー許可リストは引き続き厳格に維持されます。不明なネイティブ動画キャリアは引き続き利用でき、既知のテキスト専用ターゲットでは安全なマーカーが維持されます。構造化された編集シャドウによって追加されたトランスクリプトテキストが保護される一方、呼び出し元が所有する元のリクエストは変更されません。ネイティブサポート対象のターゲットと無効化されたブリッジでは、既存のバイパス動作が維持されます。

追加で保持されるコピーでも、同じ観測済みリクエストシグナルが使用されます。ガードレール適用前の生のクライアントリクエストスナップショット、メモリ内の保留中リクエスト、および早期に拒否されたリクエストのログでは、動画パート内のトランスクリプトフィールドが構造的に置き換えられます。パイプラインステージとコンテキストハンドオフによって合成された文字列プロンプトは、永続化されるリクエスト本文のシンクで編集されます。永続化された `video_content_removed` マーカーにより、`previous_response_id` を使用する継続処理では、意図的に破棄されたテキストを再構築するのではなく、フェイルクローズします。観測されたリクエストで、ロギング前にパート単位の編集シャドウが失われた場合、または後続のリクエスト変更後に複数ある動画シャドウのうち 1 つでも一致しなかった場合、部分的に編集されたトランスクリプトを保持するのではなく、保持対象のリクエスト本文全体が省略されます。

観測されたリクエストでは、モデルのレスポンスが構造化されたキュー境界なしにトランスクリプトの任意の部分を引用する可能性があります。そのため、永続化される呼び出しログの
`responseBody` は省略マーカーに置き換えられます。アップストリーム／クライアント本文やストリームチャンクを含む可能性がある詳細なパイプラインアーティファクトは保持されません。セマンティックキャッシュ、冪等性キャッシュ、および推論リプレイキャッシュでは、そのリクエストに対する読み取りと書き込みがバイパスされます。プロバイダーリクエストとクライアントに表示されるレスポンスは変更されません。詳細アーティファクトが省略される場合、早期のキープアライブバイトは一時バッファから排出されます。Kiro の不正な EventStream に関する警告では、ペイロードのバイト数のみが報告され、その内容や JSON パーサーの生のエラーが報告されることはありません。
これは、無関係なすべてのプロバイダー／プラグイン診断が監査済みであることを意味するものではありません。より広範な保持シンクの網羅的な調査は #11658 で追跡されています。

内部の `/api/modality-bridge/video/drilldown` ライフサイクルは、ループバック／トークン認証された独立したキャッシュ基盤です。すべての操作には、正規化された不透明なプリンシパル ID も必要です。本番環境の呼び出し元を有効にする前に、その ID を認証済みテナントから導出する必要があり、クライアントが選択した値を転送してはなりません。キャッシュキーは、そのプリンシパルを正規化されたセッション ID および動画参照 ID に結び付け、それらの SHA-256 由来のキーのみを保存し、読み取りと削除の両方を同じプリンシパルに限定します。キャッシュはエントリごとに最大 16 枚の派生 JPEG フレームを保存し、10 分後に期限切れにします。また、範囲が制限された
`start`/`end` 読み取り、または明示的なセッション削除をサポートします。

各プリンシパルは、16 エントリおよび 64 MiB の正規 JPEG データに制限されます。これらの制限は、グローバルな 64 エントリ／256 MiB の上限とは独立しています。プリンシパルのクォータが逼迫した場合、グローバル LRU エビクションを検討する前に、そのプリンシパルで最も長く使用されていないエントリのみがエビクトされます。期限切れのエントリは、キャッシュ操作時にプリンシパルとグローバルの両方の使用量集計から除去されます。一方、キャンセルや検証失敗が発生した場合、部分的な置換はコミットされません。

キャッシュは、非正規の Base64、過剰なパディング、JPEG 以外のメディア、不正または切断された JPEG、および境界付きのフルイメージ `sharp` デコード中に警告を発生させる JPEG を拒否します。受け入れた各画像を正規の JPEG として再エンコードし、呼び出し元のフィールドを信用するのではなくデコードされたバイトから幅と高さを導出し、末尾のポリグロットバイトは保持せず破棄します。両方のクォータに対して課金されるのは、境界付きの正規圧縮バッファのみです。JSON ワイヤ制限には、32 MiB のデコード済み入力上限に対する Base64 のオーバーヘッドが含まれます。
保存されるすべての派生物は、検証済みの JPEG フォーマット/解像度、サンプリングポリシー、派生バージョン、作成時刻、サーバー算出のコンテンツハッシュ、ハッシュ化された親参照、および信頼された呼び出し元の親コンテンツハッシュを記録します。キャンセルは、アトミックなキャッシュコミットの前に、非同期のデコード/ハッシュフェーズ間でチェックされます。

このトランシェはまだ本番プロデューサーをルートに接続しておらず、マルチ解像度バリアント選択も提供していません。したがって、透過的な Video Bridge リクエストパスに追加の処理は発生せず、テナントバインドのプリンシパル派生と FU-08 の完全なマルチ解像度ライフサイクルは、完了した動作として文書化されるのではなく、明示的なフォローアップ作業として残っています。

フレームは、設定された Video モデルで順次キャプション付けされます。Video のオーバーライドが空の場合は Vision 設定が継承され、両方が空の場合は Vision オートルーターが有効な vision 対応モデルを選択します。成功したキャプションは、元のパートを安定した `[Video description:` プレフィックスで置き換えます。このプレフィックスは、テキストを信頼できないメディア由来の観察としてマークし、下流のモデルにメディア内で見つかった指示に従わないよう伝えます。フレームキャプションのキャッシュキーには、JPEG バイト、プロンプト、タイムスタンプ、および有効なモデルが含まれ、成功したキャプションのみがキャッシュされます。キャッシュエントリは、フォールバックモデルを含む、実際に成功したプロデューサーモデルを保持します。異なるフレームが異なるモデルによって生成された場合、ブリッジは `mixed` を報告します。キャッシュヒット時は、そのプロデューサー ID を再利用し、要求されたルーティングプランとして再ラベル付けすることはありません。ビデオ全体の結果キャッシュは、出力を変更するすべての入力 — プロンプト、有効なモデル、サンプリングポリシー、フレーム数、セマンティック解析モード、正規化されたフォーカスヒントの SHA-256 フィンガープリント、フォーカスウィンドウ、`transcript`、`audioTranscript`、およびコンタクトシートフラグ — をキーとしているため、これらのいずれかの次元を変更するとキャッシュミスとなり、古い結果が再利用されることは決してありません。視覚的な重複排除ポリシーのバージョン、しきい値、および境界付きの候補フレーム数も、結果キャッシュキーとメタデータで明示的です。したがって、ポリシーの変更で古いビデオ全体の説明が再利用されることはありません。結果キャッシュ v4 のメタデータは、モードとフィンガープリントのみを保持し、生のユーザータスクは決して保持しません。ガードレールのメタデータは、要求された解析モードと有効な解析モードの両方を報告します。使用可能なユーザーテキストのない要求された `focused` モードは、実効的に `full` として報告されます。

ガードレールはサポートされているすべてのビデオパートを抽出しますが、説明するのは `modalityBridgeVideoMaxVideos` までです。`supportsVideo === false` であることが証明されたターゲットの場合、失敗したビデオと上限超過のビデオは明示的な安全なテキストマーカーになるため、生のビデオが残ることはありません。能力が不明な場合、それらのパートはビデオキャリアを保持し、フォールバックのトランスクリプトは上記の境界付きテキスト変換に従います。`supportsVideo === true` のターゲットはブリッジをバイパスします。
クライアントのリクエスト中止シグナルは、ダウンロード、ブローカーキュー、サブプロセス、およびキャプション呼び出しを通じて伝播します。中止はビデオ間で停止し、生のメディアへのフェイルオープンは決して行いません。

ランタイム設定は DB バックアップされ、Zod で検証されます:

| キー                                | デフォルト  | 範囲 / 動作                                                                                           |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | オプションのランタイム、オプトイン                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` は汎用キャプションを保持; `focused` は境界付きの信頼できない最新ユーザーコンテキストを使用     |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge モデルを継承                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware`、または比例的な `segment_aware`; 検出器の失敗時は `uniform` にフォールバック |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

120 秒を超える永続化されたレガシー Video タイムアウト値はブローカーのデッドラインにクランプされ、その制限を超える新しい設定の書き込みは拒否されます。
`GET /api/modality-bridge/video/runtime` は、認証またはランタイムプローブの前に、信頼されたスタンプ付きループバックローカリティを必要とし、その後管理認証を必要とします。返されるのは `available`、サニタイズされた FFmpeg/ffprobe バージョン、およびランタイムが利用できない場合の固定理由のみです。内部抽出エンドポイントは公開アップロード API ではありません: キュー飽和時は `503` と `Retry-After` を返し、呼び出し元の切断時は `499` を返し、固定ブローカーデッドライン時は `504` を返します。変換されたレスポンスは、Vision または Audio セグメントを削除せずに、中央の `x-omniroute-modality-bridge` ヘッダーに `video->text;model=<visionModel>;parts=<videos>` を追加します。

### PII マスカー (`piiMasker.ts`)

**両方**のステージで実行されます。

- **`preCall`** はペイロードをクローンし、`system`、`messages`、`input`、`prompt`
  (プレーンな文字列アイテムを含む) を走査して、文字列の `content`/`text` フィールドに
  `processPII()` (`@/shared/utils/inputSanitizer` より) を適用します。
  `PII_REDACTION_ENABLED=true` の場合、検出された PII は送信ペイロード内でマスキングされます。
  これは `INPUT_SANITIZER_MODE` (プロンプトインジェクションポリシーのみを制御) とは独立しています。
  マスキングがオフの場合、呼び出しはコンテンツを書き換えずに検出カウントを記録するだけです。
- **`postCall`** はレスポンスをディープクローンし、`sanitizePIIResponse()` に加えて
  Responses-API 形状のマスカー (`maskResponsesOutput` — `output_text` と
  `output[].content[].text` をカバー) を実行します。マスキングが発生した場合、
  変更されたレスポンスが元のレスポンスを置き換えます。

このガードレールは決してブロックしません。アノテーション (`meta.detections`、
`meta.redacted`) または書き換えのみを行います。

#### タイプごとの選択、カスタムパターン、検出カウンター

**ダッシュボード → 設定 → セキュリティ → PII マスキング** は _何を_ マスキングするかを選択します。
マスキングをオンにするものではありません。それは引き続き `PII_REDACTION_ENABLED` (リクエスト) と
`PII_RESPONSE_SANITIZATION` (レスポンス + SSE) で、両方ともデフォルトでオフです。

- **タイプごとの選択** — 組み込み id は
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) にリストされています。未設定の場合は
  すべてのタイプが対象になります (この設定が存在する前の動作)。リクエストエンジンの
  `ssn_us` パターンは `ssn` にマッピングされます。テンプレート (Minimal、Standard、Financial、
  Brazilian、USA、Full) は UI のチェックボックスを埋めるだけです。
- **カスタムパターン** — 最大 20 個の正規表現またはワイルドカードパターン (`*` = 空白以外の
  最大 64 文字、`?` = 1 文字)。一致箇所は `[CUSTOM_REDACTED]` になります。
  すべてのパターンは `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) を通過します: 最大 500 文字、フラグは
  `g i m s u` に限定、コンパイル可能であること、`safe-regex` (壊滅的バックトラッキング) を
  パスすること、空文字列やマスキング用プレースホルダーに一致しないこと。
  失敗したパターンは保存時およびテスト時に拒否され、失敗した保存済みの行は
  実行時にコンパイルされずにスキップされます。カスタムパターンは
  マスキングがオンの間のみ実行されます。
- **検出カウンター** — タイプごとのカウント (一致した値自体は保持しません)。メモリ内に保持され、
  再起動時にリセットされます (`src/lib/pii/piiDetectionStats.ts`)。マスキングがオンの間のみ
  増加します。

設定は `key_value` テーブル (namespace `pii_settings`、
`src/lib/db/piiSettings.ts`) に保存され、1 秒のキャッシュ経由で読み取られます。API:

| メソッド | パス                     | 目的                                                                       |
| -------- | ------------------------ | -------------------------------------------------------------------------- |
| `GET`    | `/api/settings/pii`      | フラグの状態、`enabledTypes`、`customPatterns`、検出カウンター             |
| `PUT`    | `/api/settings/pii`      | `enabledTypes` (`null` = すべて) および/または `customPatterns` の置き換え |
| `POST`   | `/api/settings/pii/test` | 1 つのパターンを最大 8 KB のサンプルに対してドライラン。何も保存されない   |

3 つすべて管理用認証が必要で、Zod
(`src/shared/validation/schemas/piiSettings.ts`) によってボディが検証されます。

### プロンプトインジェクション (`promptInjection.ts`)

ユーザー提供コンテンツ内の敵対的な構造を検出し、設定されたポリシーを適用します。
動作は環境変数とコンストラクタオプションによって制御されます:

| 設定             | 環境変数                                                                                                       | デフォルト | 効果                                                                                                                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 有効             | `INPUT_SANITIZER_ENABLED`                                                                                      | `true`     | `false` の場合、ガードレールはショートサーキットします。                                                                                                                                                                   |
| モード           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                | `warn`     | インジェクションポリシー: `block`、`warn`、または `log`。(`redact` は後方互換のために受け入れられますが、インジェクションテキストを除去**しません**。リクエストの PII 書き換えは `PII_REDACTION_ENABLED` で制御されます。) |
| ブロックしきい値 | `blockThreshold` オプション / `INPUT_SANITIZER_BLOCK_THRESHOLD` (エイリアス `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | ブロックに必要な最小の重要度。デフォルトでは Medium は監視のみです。                                                                                                                                                       |

**モードの優先順位** (`getMode`): 呼び出し元の `options.mode` →
`INJECTION_GUARD_MODE` **DB フィーチャーフラグによるオーバーライド** (ダッシュボード → 設定 →
フィーチャーフラグ) → `INJECTION_GUARD_MODE` 環境変数 → `INPUT_SANITIZER_MODE` 環境変数 →
`warn`。したがって、ダッシュボードのオーバーライドは環境変数より優先され、
フィーチャーフラグ UI が実行中のガードをリアルタイムに制御します (再起動不要)。
DB の読み取りはフェイルセーフです:
エラーが発生した場合、ガードは環境変数ベースの動作にフォールバックし、オーバーライドが
設定されていない場合の動作は環境変数のみによる解決と同一です。

検出ソース:

1. `@/shared/utils/inputSanitizer` の `sanitizeRequest()` (パイプラインの他の箇所でも
   使用される共有検出器セット)。
2. 組み込みの `DEFAULT_GUARD_PATTERNS` (現在は `system_override_inline` と
   `markdown_system_block` で、いずれも `high` 重要度)。
3. コンストラクタオプション経由で渡されるオプションの `customPatterns` (文字列、正規表現、
   または `{ name, pattern, severity }` レコード)。

`mode === "block"` **かつ** 少なくとも1つの検出が重大度のしきい値を
満たす場合、`preCall` は `{ block: true, message: "Request rejected:
suspicious content detected" }` を返します。`warn`/`log` モードでは、
ガードレールはログを記録しますが呼び出しを許可します。共有ヘルパー
`evaluatePromptInjection()` もエクスポートされており、レジストリを介さずに
プロンプトを評価する必要がある呼び出し元が利用できます。

**スキャン上限（v3.8.20）：** 検出器は結合されたプロンプトテキストの
**先頭16 KB** のみを検査します — `src/shared/utils/inputSanitizer.ts` 内の
`MAX_INJECTION_SCAN_BYTES = 16 * 1024`（16 384バイト）。`detectInjection()` と
`evaluatePromptInjection()` はどちらも、パターンループを実行する前に
`slice(0, MAX_INJECTION_SCAN_BYTES)` を行います。インジェクション命令は
入力の先頭付近に配置されるため、これにより検出精度を弱めることなく、
数百KBに及ぶペイロードでの正規表現のCPU/GC負荷を抑えられます（参照：
#3932、#4041）。

### クレデンシャルマスカー（`credentialMasker.ts`）

**両方の**ステージで実行され、デフォルトチェーンの最後（優先度 `95`）に
配置されます。既知のAPIキー／シークレットトークンのパターンを、送信
ペイロード（メッセージ内容、ツール呼び出し引数、ツール結果）**と**
プロバイダーレスポンスの両方からリダクトします。これにより、プロンプトに
貼り付けられた（あるいはツール結果でエコーバックされた）クレデンシャルが、
上流のプロバイダーやクライアントへ漏洩するのを防ぎます。

- **オプトインのみ**。PIIリダクションと同じ規約（ハードルール#20に準拠）：
  `settings.credentialRedactionEnabled === true` **または**
  `CREDENTIAL_REDACTION_ENABLED=true` でない限り無効です。オフの場合、
  このガードレールはno-op（何もしない）となり、ブロックも書き換えも
  行いません。
- `redactCredentials()` はペイロード／レスポンスのツリー全体を走査し
  （`walkValue()`、プロトタイプ汚染に対して安全、`WeakSet` により循環参照に
  対して安全）、一致した箇所を `[REDACTED:<type>]` プレースホルダーに
  置き換えます。実際に変更があったブランチのみをクローンします。
- `CREDENTIAL_PATTERNS` は、LLMプロバイダーキー（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS/SaaSトークン（GitHub、
  Slack、Linear、Notion、npm、Postman、Discord）、決済キー（Stripe、
  Square）、クラウドキー（AWSアクセスキー、Twilio、SendGrid、Mailgun）、
  秘密鍵／JWT、クレデンシャルを含む接続文字列
  （`mongodb://user:pass@...` など）、および汎用の
  `Authorization`/`x-api-key`/`api-key`/`apikey` ヘッダー値パターンを
  カバーします。ヘッダー形式のキー（`authorization`、`x-api-key`、
  `api-key`、`apikey`）は、汎用テキスト正規表現ではなく構造的にリダクト
  されます（値のみを置き換え、`Bearer `/`Basic ` のようなスキーム
  プレフィックスは保持）。
- このガードレールはブロックしません。書き換え（`modifiedPayload` /
  `modifiedResponse`）と注釈付け（`meta.credentialsRedacted`、`meta.count`）
  のみを行います。

リグレッションガード：`tests/unit/credential-masker-guardrail.test.ts`。

## 基本コントラクト（`base.ts`）

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true の場合はチェーンを短絡する
  message?: string; // ブロック時に表示される
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall が返し、リクエストを書き換える
  modifiedResponse?: TValue; // postCall が返し、レスポンスを書き換える
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

ガードレールは、`void`、`{}`、または `{ block: false }` のいずれかを返すことで「変更なし」を示します。`modifiedPayload`/`modifiedResponse` を返すと、チェーンを通じて下流のガードレールに流れる値が置き換えられます。
`signal?: AbortSignal` は呼び出し元のライフサイクルをガードレールへ伝えます。リクエストの中断（abort）は、意図的なフェイルオープンの例外です。メディアブリッジは処理を停止し、生のメディアをサポートしないことがわかっているターゲットに復元することなく、クリーンアップを行います。

## レジストリ（`registry.ts`）

シングルトンの `guardrailRegistry` は以下を公開します：

- `register(guardrail)` — ガードレールを追加し（正規化された名前で置き換え）、`priority` の昇順で再ソートします。
- `clear()` / `list()` — 管理用ヘルパー。
- `runPreCallHooks(payload, context)` — アクティブなガードレールを反復処理し、ペイロードを `modifiedPayload` を通じて受け渡し、最初の `block: true` で停止します。
- `runPostCallHooks(response, context)` — レスポンス側で同じフローを実行します。
- `resetGuardrailsForTests({ registerDefaults })` — 状態をクリアし、オプションでデフォルトを再登録して、テストをクリーンに分離します。

両方のランナーは `{ blocked, payload|response, results, guardrail?, message? }` を返します。ここで `results` は `GuardrailExecutionResult` レコードの配列で、ガードレールごとの `blocked`、`skipped`、`modified`、`error`、`meta` フィールドを含み、トレースに役立ちます。

### リクエストごとのガードレールの無効化

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` は、現在のリクエストでスキップすべきガードレール名の重複排除済みリストを集約します。チャネルは 5 つあり、次の順序で読み取られ、1 つのリストにマージされます（重複排除では最初の出現が優先されます）：

1. `apiKeyInfo.disabledGuardrails`
2. リクエストボディの `disabledGuardrails`（トップレベル）
3. リクエストボディの `metadata.disabledGuardrails`（`metadata` がオブジェクトの場合のみ）
4. ヘッダー `x-omniroute-disabled-guardrails`
5. レガシーヘッダー `x-disabled-guardrails`

5 つのチャネルすべてがマージされ、2 つのヘッダーも含まれます。`x-omniroute-disabled-guardrails` と `x-disabled-guardrails` の両方を送信すると、それらのリストの和集合がスキップされ、空の新しいヘッダーがレガシーヘッダーを隠すことはなくなりました
（[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)、
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) で修正）。

値は文字列の配列またはカンマ区切りの文字列で指定できます。名前はトリミングされ、小文字の kebab-case に正規化され（`pii_masker` → `pii-masker`）、空のエントリは破棄されます。結果は `context.disabledGuardrails` を通じてレジストリに渡され、一致するガードレールはスキップされます（`results` では `skipped: true`）。

無効化リストは**レジストリ**にのみ影響します。プロンプトインジェクションの `block` モードは必須の境界です。インジェクションガードミドルウェア
（`src/middleware/promptInjectionGuard.ts`）は、呼び出し元が制御できる無効化リストなしで `evaluatePromptInjection()` を呼び出します（以前行っていたデッドな
`resolveDisabledGuardrails({ body })` 呼び出しは
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) で削除されました）。そのため、`prompt-injection` を無効化したリクエストでも、`block` モードでは依然として拒否されます。これは意図的な設計です。無効化チャネルは呼び出し元が制御するもの（リクエストボディ、メタデータ、ヘッダー）であり、呼び出し元がオペレーターが設定したセキュリティコントロールを無効にできてはなりません
（[#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)）。[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) のヘッダー和集合は、どのレジストリガードレールがスキップされるかを変更するだけであり、クライアントがミドルウェアをバイパスできるようにはなりません。キー単位およびグループ単位の必須ガードレールポリシーは、v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) で追跡されています。
[対象範囲と制限](#coverage-and-limits)を参照してください。

## 実行順序

`src/sse/handlers/chat.ts` と `open-sse/handlers/chatCore.ts` を通る各リクエスト([カバレッジと制限](#coverage-and-limits)に記載されているチャット系ルート)について:

1. `resolveDisabledGuardrails(...)` が API キー、ボディ、ヘッダーからスキップリストを構築します。
2. `guardrailRegistry.runPreCallHooks(body, ctx)` がガードレールを優先度の昇順で実行します:
   - 無効化されたガードレールは `skipped` として記録されます。
   - 各ガードレールの `preCall` は `modifiedPayload` を介してペイロードを書き換えることがあります。
   - 最初の `block: true` でチェーンが短絡され、ハンドラーはガードレール拒否レスポンスを返します。
3. (書き換えられた可能性のある)ペイロードはコンボルーティングとアップストリームディスパッチへ流れます。
4. **非ストリーミングのみ:** レスポンスが組み立てられた後、`guardrailRegistry.runPostCallHooks(...)` がレスポンスに対して同じチェーンを実行します。ここでの `block: true` はアップストリームのレスポンスを破棄し、HTTP 400 を返します。ストリーミングレスポンスはこのステップを完全にスキップします。

例外をスローしたガードレールは `error: <message>` として記録され、`logger.warn` でログに出力されますが、チェーンは継続します — 設計上フェイルオープンとなっています。

## カバレッジと制限

ガードレールレジストリはチャットパイプラインにのみ組み込まれています。これらの制限は `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` と `tests/unit/guardrail-pipeline-characterization.test.ts` によってピン留めされています。動作を変更する際は、これらのテストを意図的に更新してください。

### フックが実行される場所

| フック / 制御                                | 実行対象                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                            | `handleChat` (`src/sse/handlers/chat.ts`) で処理されるリクエスト: `/v1/chat/completions`、`/v1/completions`、`/v1/messages`、`/v1/responses` (および `/v1/responses/*`)、`/v1/relay/chat/completions`、`/v1/providers/{provider}/chat/completions`、`/v1/api/chat`、`/v1/antigravity`、`/v1beta/models/*`、および Telegram チャットプロキシ。さらにダッシュボードのテストエンドポイント `/api/guardrails/test` でも実行されます。プリコールでのブロックは HTTP 400 を返します。 |
| `runPostCallHooks`                           | **非ストリーミング**のチャットレスポンスのみ(`open-sse/handlers/chatCore/nonStreamingResponse.ts`)。ストリーミングレスポンスがここに到達することはありません。                                                                                                                                                                                                                                                                                                                  |
| ストリーミング PII                           | `PII_RESPONSE_SANITIZATION` がオンの場合に `streamingPipeline.ts` 内でパイプ接続される `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`)。これはガードレールではないため、無効化チャネルの影響を受けません。                                                                                                                                                                                                                                                         |
| インジェクションガードミドルウェア(レガシー) | チャット系を含む、プロンプトを含むすべての `/v1` ルート([ルートカバレッジ](#injection-guard-route-coverage--red-team-phase-8--block-d)を参照)。プロンプトインジェクションのみ。                                                                                                                                                                                                                                                                                                 |

### カバーされないもの

- **メディア、埋め込み、データルート**(`/v1/images/*`、`/v1/embeddings`、
  `/v1/audio/*`、`/v1/videos/generations`、`/v1/music/generations`、
  `/v1/rerank`、`/v1/search`、`/v1/moderations`)はレジストリに到達しません。
  PII マスキング、認証情報マスキング、モダリティブリッジはそこでは実行されません。
  これらのルートで行われる唯一のチェックは、レガシーのインジェクションガードミドルウェアです。
- **ストリーミングレスポンス**にはポストコールガードレールがありません:
  `pii-masker` や `credential-masker` のポストコールも、ポストコールブロックもありません。
  ストリーミング PII トランスフォームのみが適用されます(`PII_RESPONSE_SANITIZATION` がオンの場合)。
  ストリーミングレスポンスでエコーバックされた認証情報はマスクされません。
- **無効化チャネルとミドルウェアの関係(設計上の仕様):** ミドルウェアは独自の
  `evaluatePromptInjection()` 呼び出しでプロンプトインジェクションを評価し、
  呼び出し元が制御する無効化リストは一切渡されません。`block` モードは、呼び出し元による無効化では
  バイパスできない必須の境界であり、これはチャット系ルートでも同様です
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))。
  `prompt-injection` を無効化しても、レジストリのガードレールがスキップされるだけです。

### ポストコールより前にレスポンスを見るもの

非ストリーミングパスでの順序は次のとおりです: メモリ抽出 → 組み込みツール
実行 → ポストコールガードレール → ポストコールブロックによる終了 → セマンティックキャッシュへの保存。

- **メモリ抽出**と**ツール実行**は、ポストコールガードレールが
  レスポンスを書き換えたりブロックしたりする前に、そのレスポンスを参照します。
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) 以降、
  メモリ抽出は `PII_RESPONSE_SANITIZATION` が有効な場合（ストリーミングと
  非ストリーミングの両方で）、抽出されたテキストを `sanitizePII` に通しますが、
  ポストコールで後からブロックされるレスポンスは、依然としてメモリと
  ツールに提供されてしまいます。
- **セマンティックキャッシュ**はポストコール後にレスポンスを保存するため、
  書き換えられたレスポンスが保存され、ブロックされたレスポンスはキャッシュ
  されません。キャッシュエントリは API キーごとにキー付けされます。

## 設定

組み込みガードレールが読み取る環境変数:

| 変数                                  | 使用元              | 効果                                                                                                                      |
| ------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`  | 検出を完全に無効にするには `false` を設定します。                                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`  | インジェクションポリシー: `warn`、`block`、または `log`。レガシー値 `redact` はインジェクションテキストを書き換えません。 |
| `INJECTION_GUARD_MODE`                | `prompt-injection`  | インジェクションガードのモード。環境変数を**上書き**する DB フィーチャーフラグでもあります (DB > ENV)。                   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`  | `MODE=block` が拒否する最小の重大度: `high` (デフォルト)、`medium`、または `low`。                                        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`  | `INPUT_SANITIZER_BLOCK_THRESHOLD` のレガシーエイリアス。                                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`        | `true` の場合、リクエストの PII がマスクされます (インジェクションモードとは独立)。                                       |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (下流) | レスポンス側のマスカーの動作を制御します。                                                                                |

Modality Bridge ガードレールは、ランタイム設定を環境変数ではなく、DB ベースの設定
ストア (`getSettings()`) から読み取ります。Vision の主キーは
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes`、および
`modalityBridgeCacheMaxEntries` です。レガシーの
`visionBridge*` キーは、文書化された 1 サイクルの読み取りフォールバックとして
のみ受け入れられます。ダッシュボードからの書き込みは主キーを使用します。
デフォルト値とフォールバックリゾルバーは
`src/shared/constants/modalityBridgeDefaults.ts` にあり、レガシー定数は
`src/shared/constants/visionBridgeDefaults.ts` に保持されています。

Audio は `modalityBridgeAudioEnabled`、`modalityBridgeAudioModel`、
`modalityBridgeAudioTimeout`、および `modalityBridgeAudioMaxClips` に加えて、
共通の `modalityBridgeCache*` 設定を使用します。これらのキーは
Modality Bridge スキーマとともに導入されたため、Audio にはレガシーキーの
フォールバックはありません。

Video は `modalityBridgeVideoEnabled`、`modalityBridgeVideoAnalysisMode`、
`modalityBridgeVideoModel`、
`modalityBridgeVideoFrameCount`、`modalityBridgeVideoSamplingPolicy`、
`modalityBridgeVideoMaxVideos`、および
`modalityBridgeVideoTimeout` に加えて、共通の `modalityBridgeCache*` 設定を使用します。
FFmpeg/ffprobe はオプションの運用依存関係であり、フレームキャプション付けは
レイテンシとモデルコストを増加させるため、デフォルトで無効になっています。

## カスタムガードレール

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

手順:

1. `BaseGuardrail` を継承した `src/lib/guardrails/myGuardrail.ts` を作成する。
2. `preCall` および/または `postCall` を実装する。
3. インポート時に登録する(`registerDefaultGuardrails` からプッシュする)か、
   実行時に `guardrailRegistry.register(...)` を呼び出す — レジストリは
   正規化された名前が同じ既存のガードレールを置き換える。
4. `tests/unit/` 配下にテストを追加する(既存の例:
   `tests/unit/guardrails-registry.test.ts`、
   `tests/unit/prompt-injection-guard.test.ts`、
   `tests/unit/guardrails/visionBridge.test.ts`)。

## テスト

テスト間では `resetGuardrailsForTests()` を使用して、既知の状態から開始する。
`{ registerDefaults: false }` を渡すと空のレジストリから開始し、
テスト対象のガードレールのみを登録できる。Vision Bridge は依存性注入
(`deps.getSettings`、`deps.callVisionModel`)を受け付ける。Audio Bridge は
設定、機能、STT モデル選択、認証情報チェック、文字起こしに関する
同等のシームを公開している。そのため、テストは DB や
ネットワークアクセスなしで両方のフローを実行できる。

## 関連項目

- `src/lib/guardrails/` — 実装
- `src/shared/utils/inputSanitizer.ts` — プロンプトインジェクションと
  PII マスキングを支える共有検出器
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge のデフォルトと
  強制ブリッジモデルリスト
- `src/shared/constants/modalityBridgeDefaults.ts` — Vision/Audio 共有ランタイムデフォルト
- `docs/architecture/RESILIENCE_GUIDE.md` — 直交レイヤー(サーキットブレーカー、クールダウン)
- `docs/reference/ENVIRONMENT.md` — 環境変数の完全なリファレンス

## インジェクションガードのルートカバレッジとレッドチーム(フェーズ 8 · ブロック D)

インジェクションガード(`createInjectionGuard` / `withInjectionGuard`)は、
ユーザープロンプトを受け付けるすべてのルートをカバーする。`INJECTION_GUARD_MODE`
を尊重する(デフォルトの `warn` = ログのみ;`block` = HTTP 400 `SECURITY_001` を返す)。

| タイプ         | ルート                                                                                                                                               | デフォルトモード |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| テキスト(既存) | `/v1/chat/completions`、`/v1/completions`、`/v1/relay/chat/completions`                                                                              | warn             |
| 生成系         | `/v1/messages`、`/v1/responses`、`/v1/images/generations`、`/v1/images/edits`、`/v1/videos/generations`、`/v1/music/generations`、`/v1/audio/speech` | warn             |
| データ         | `/v1/embeddings`、`/v1/rerank`、`/v1/search`、`/v1/moderations`                                                                                      | warn             |

テキスト抽出(`extractMessageContents`)は `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` をカバーする。

**レッドチーム(ナイトリー、`nightly-llm-security.yml`):** promptfoo は
`INJECTION_GUARD_MODE=block` で各ルートが OWASP-LLM コーパスをブロックすることを検証し、
garak はプローブを実行する(シークレットがない場合はスキップ)。
`moderations` は一貫性のために含まれている。ブロックモードは必須の境界である:
`evaluatePromptInjection()` はミドルウェアが渡すリクエストごとの無効化リストを
無視するため、`disabledGuardrails` によってルートがブロックモードから免除されることは
**ない**([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))。

ナイトリーワークフロー(`.github/workflows/nightly-llm-security.yml`、cron + 手動
ディスパッチ)には 2 つのジョブがある:

- **`promptfoo-guard`(ブロッキング)** — `INJECTION_GUARD_MODE=block` で
  `promptfoo eval -c promptfooconfig.yaml` を実行する。各攻撃的ケース
  (例:「ignore all previous instructions…」(以前の指示をすべて無視せよ)、
  DAN スタイルのジェイルブレイク)は、レスポンスが `error.code === "SECURITY_001"` を
  含むこと、すなわちガードが実際にリクエストを拒否したことをアサートする。
- **`garak`(アドバイザリ)** — ローカルの OmniRoute インスタンス
  (`http://localhost:20128/v1`)に対して garak `--probes promptinject,dan,leakreplay`
  を実行する。プロバイダーシークレット(`PROMPTFOO_PROVIDER_KEY`)でゲートされ、
  正常にスキップされ、`|| true` が付与されているため、CI を失敗させずにレポートする。

ガードヘルパー(`createInjectionGuard` / `withInjectionGuard`)のカバレッジは、
プロンプトを受け取るすべての `/v1` ルートに及ぶ。プロンプトテキストは
`src/shared/utils/inputSanitizer.ts` 内の `extractMessageContents()` によって
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` から抽出される。
