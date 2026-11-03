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

## 内蔵ガードレール

レジストリは、インポート時に 6 つのガードレールを優先順位に従って自動ロードします ( `registry.ts` → `registerDefaultGuardrails()`参照)。

| 優先度 | 名前                | ステージ       | ファイル              |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先度の低い番号が実行されます**初め**。

### ビジョン ブリッジ (`visionBridge.ts`) —モダリティ ブリッジPR-1

GLM 5.3 基本モデルと`glm-5.3-{low,high,max}`は、明示的な`supportsVision:false` registry/specメタデータがあります。 GLM 5.3 Flash バリアントはネイティブ ビジョン モデルのままです。 Claudeコードの`/v1/messages`ルートが共有`handleChat`プリコール ガードレール チェーンに入る**前に**Claude から OpenAI への変換。ネストされた`Read`ツール結果イメージは、変換によってOpenAI `image_url`コンテンツに取り込まれる前に、記述または処理する必要があります (#17069)。

を目的とした画像を含むリクエストを傍受します。**非視覚モデル**そして、リクエスト全体をビジョン対応モデルに再ルーティングするか、アップストリーム呼び出しの前に画像部分を構成可能なビジョンモデルによって生成されたテキスト説明に置き換えます。これにより、テキストのみのプロバイダーがマルチモーダル ペイロードを透過的に処理できるようになります。

流れ：

1. ターゲット モデルがすでにビジョンをサポートしている場合はスキップします (強制ブリッジ リスト`isVisionBridgeForcedModel`に表示されていない場合)。
2. `extractImageParts(messages)` (`visionBridgeHelpers.ts`) を介して画像部分を抽出します。**統合メディア検出器**`open-sse/utils/mediaParts.ts` — `detectMediaParts()` 、コンボ互換性フィルターと共有される唯一の信頼できる情報源です。抽出は、 `replaceImageParts`スプライス バックできる形状 (抽出↔置換コントラクト) のホワイトリストに登録されます: OpenAI `image_url`、 Anthropic Base64 `source.type:"base64"`、 Anthropic URL `source.type:"url"`、および Responses API `input_image`。 Claudeコード`tool_result.content`および応答ツールの出力内にネストされた一致する画像も抽出され、元のパスで置き換えられます。インジケーターのみの形状はコンボフィルター素材であるため、抽出されません。何も見つからない場合はスキップしてください。
3. `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) 経由でランタイム設定を解決します。新しい`modalityBridge*`設定キーが優先されます。レガシー`visionBridge*`キーはそのまま残ります**1サイクルフォールバック**(ロールバックウィンドウ)。ブリッジが無効になっている場合は、メディア トラバースの前にスキップします。
4. モード セレクター (`modalityBridgeVisionMode`、以下の表を参照) は、リルートか記述かを決定します。 Reroute は、 `model`のみがスワップされた`modifiedPayload`とメタ`{ rerouted, fromModel, toModel, imagesKept }`を返します。
5. パスの記述: `maxImages`で画像をキャップし、タスク認識プロンプトを作成し、記述キャッシュを参照し、ビジョン モデルを呼び出します。**並行して**(`Promise.allSettled`) を作成し、その場所に`[Image N]: <description>`テキスト部分を挿入します。記述に失敗すると`null`が生成されます。生のイメージはunknown/vision-capableターゲット用に保存されますが (#4012)、**確認済みのテキストのみの直接ターゲット**または、ゼロビジョン コンボは、部分的な失敗や記述呼び出しの上限を超えた画像を含む、記述されていないすべての画像に対して明示的な`(unavailable — no vision-capable provider connected)`テキスト スタブを取得します (#17069)。既存のすべて失敗したコンボでは、フォールバックがそのまま残ると説明されています (#8430)。
6. `modifiedPayload` +メタ (`imagesProcessed`、 `descriptions`、 `processingTimeMs`、 `visionModel`) を返します。

#### モードセレクター (`modalityBridgeVisionMode`)

| モード     | デフォルト | 行動                                                                                                                                                                                                                                                                                             |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔          | レガシーヒューリスティック、未変更 (#6640/#7204): 非コンボ/`auto/`モデルは、元のモデルがすでに使用可能な認証情報を持っている (その後記述される) 場合を除き、最適なビジョンモデルに再ルーティングします。コンボターゲットは必ず記載します。                                                       |
| `describe` |            | 常に—を記述すると、リルート ブロックが完全にスキップされます。ユーザーが選択したモデルが常に応答します。                                                                                                                                                                                         |
| `reroute`  |            | 強制リルート: keep-credentialed-model ガードはバイパスされます。ルート変更は、**ターゲット**認証情報ガードは、使用可能なビジョン ターゲットが存在しない場合でも—適用します。ブリッジは、生の画像を記述したりテキストのみのターゲットに送信したりするのではなく、明らかなエラーでブロックします。 |

強制モードの短絡**前に**自動ヒューリスティックが実行されます。 `auto`動作は、 pre-PR-1ガードレールとバイト同一です。

#### API キーのスコープ (`visionBridgeKeyScope.ts`)

呼び出し元のAPIキーが`allowedConnections`、クォータ プール (`allowedQuotas`) またはモデル (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`) を制限している場合、ブリッジは、キーが使用する可能性のある接続上で、キーが使用する可能性のあるリルートと記述モデルのみを選択します。その後、describe 呼び出しは常に`x-omniroute-self-loop-key-id`ヘッダーを持つOmniRoute自己ループを通過するため、受信したチャット リクエストではそのキーの接続とモデル ポリシーが再度強制されます。 `enforceApiKeyPolicy()`そのヘッダーを自己ループ ベアラーと一緒にのみ尊重するため、アクセスを制限することしかできず、解決できない ID は拒否されます。

キーに対してビジョン モデルが許可されていない場合、**テキストのみのターゲットを確認しました**は、画像バイトを処理できないアップストリームに転送する代わりに、クリアHTTP 400 を使用してローカルで画像リクエストを拒否します (#17069)。未知またはネイティブのビジョン機能を持つターゲットの場合、記述パスは以前のフェールオープン動作 (meta `{ skipped: true, reason: "no_permitted_vision_model" }`) を保持します。キーのないリクエスト、およびこれらの制限のないキーは、以前とまったく同様に動作します。

#### タスク対応の説明プロンプト (`modalityBridgeVisionTaskAware`)

デフォルト**真実**。 `composeVisionPrompt()` (`visionBridgeHelpers.ts`) は、**最後のユーザーメッセージ**(500 文字に切り捨てられます) をベースの説明プロンプトに変換し、ユーザーが実際に要求した内容 (codex-vision-proxy パターン) に説明を誘導し、視覚モデルに表示されるテキストを転写するように要求します。 —フラグをオフにするか、ユーザー テキスト—使用しない場合は、基本プロンプトが変更されずに使用されます。

記述自己ループ自体の OpenAI 互換リクエスト ( `visionBridgeHelpers.ts`の`callVisionModelSingle()` ) は、クライアント信号でゲートされることなく、すべてのcaller/providerに対して常に無条件に`image_url.detail: "high"` —をリクエストします。低詳細サンプリングでは、このプロンプトが要求するテキスト転記タスクのOCR精度が低下するため、元の受信リクエストで使用された詳細レベルに関係なく、記述呼び出し自体は常に高詳細を要求します。これは内部記述リクエスト本文にのみ影響します。 OmniRouteプライマリ要求—で呼び出し元独自の`image_url.detail`を転送する方法は変わりません。そのデフォルトは、 `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) で検出されたOpenCodeクライアントに対してのみ個別に適用されます。 description self ループのAnthropic Wire-format ブランチには`detail`フィールドがなく、どちらのデフォルトの影響も受けません。

#### 出力上限の説明 (`modalityBridgeVisionMaxChars`)

| 鍵                             | デフォルト | 範囲                |
| ------------------------------ | ---------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0`または 100–50000 |

`0` (デフォルト) の意味**キャップなし**— `callVisionModel()`によって返された説明は変更されずに渡され、既存の動作が維持されます。 100 ～ 50000 の範囲の値を指定すると、説明が`[Image N]: <description>` ( `src/lib/guardrails/visionBridge.ts`の`VisionBridgeGuardrail.preCall()` ) として結合される前に、 `…`接尾辞で切り捨てられます。下流モデルが完全な転写を必要とする、詳細が重要なOCRタスクの場合は、この値を上げます。おしゃべりなビジョン モデルでトークンの使用量を制限するまでそれを下げます。ダッシュボード フィールドは、[ビジョン] タブの [詳細設定] パネル (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) にあり、明示的な`0`は変更されないまま、1 から 99 までの値を 100 下限までクランプします。 — `0` 、単に「設定されていない」デフォルトではなく、それ自体が有効なZod値 (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) です。

#### キャッシュの説明 (`modalityBridge/bridgeCache.ts`)

プロセス全体で共有される記述出力用のインメモリLRU + TTLキャッシュ。長さプレフィックス フレーミングのキー= `sha256(imageRef + composedPrompt + configuredBridgeModel)` (フィールド境界の衝突なし)。モデルコンポーネントは、**設定済み**実際に— `callVisionModel`に応答したモデルではなく、ブリッジ モデルが内部でフォールバックする可能性があり、試行ごとにキー入力するとキャッシュが断片化する可能性があります。失敗した記述は決してキャッシュされません。設定：

| 鍵                              | デフォルト | 範囲    |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### リモート画像正規化 (セルフループdescribe/base64フェッチ)

ブリッジが**リモート**画像自体— Anthropic自己呼び出しとクロードワイヤ形式の Base64 変換 (`ensureBase64ImagesForClaudeWire`) を記述します。どちらも`visionBridgeHelpers.ts` —の`fetchRemoteImageAsDataUri()`介して行われます。結果のデータURI 、ビジョン モデル リクエストに埋め込まれる前に`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) を介して渡されます。特大の画像は縮小されます。** 2048px 長辺**(サイズ変更キャップOpenAI/Anthropicと一致すると、サーバー側ですでに適用されています)。これにより、ビジョン モデルが認識する内容を変更せずに、アップロードbytes/latencyがカットされます。サイズ変更には、動的インポート経由でロードされた`sharp`が使用されます。ネイティブ バイナリのロードに失敗したプラットフォームでは、 `normalizeDataUri()`**決して投げない**—では、元のバイトのパススルーにフォールバックするため、 describe/base64-conversionパスは常に機能し続けます。非画像バイト (デコード可能な画像を返さなかったフェッチ) もそのまま渡されます。この正規化は、オプトインのみの変更原則 (ハード ルール #20) と一致して、ブリッジが自身の自己呼び出し—用にフェッチするイメージに適用されますが、呼び出し元の生のパススルー ペイロードには決して適用されません。

#### 設定スキーマ+移行

新しい`modalityBridge*`キーは、 `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`、 `modalityBridgeVisionMode`、 `modalityBridgeVisionModel`、 `modalityBridgeVisionTaskAware`、 `modalityBridgeVisionPrompt`、 `modalityBridgeVisionTimeout`、 `modalityBridgeVisionMaxImages`、 `modalityBridgeVisionMaxChars`、 `modalityBridgeCache*`トリオ、および Audio Bridge によって使用される`modalityBridgeAudio*`グループで Zod 検証されます。移行`141_modality_bridge_settings.sql` 、既存のレガシー`visionBridge*`値を一致する新しいキーにコピーします (冪等で、オペレーターが設定した`modalityBridge*`値は決して上書きされません)。従来のキーは、1 つのリリース サイクルの間、読み取りフォールバックとして受け入れられ続けます。

#### 透明ヘッダーの+統計

Describe 変換された応答には`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`が含まれます ( `modalityBridge/bridgeStats.ts`の`buildModalityBridgeHeader()`によって構築され、 `src/sse/handlers/chatHelpers.ts`の`withModalityBridgeHeader()`によってスタンプされます)。再ルーティングされたリクエストの取得**いいえ**ヘッダー—ペイロードは変更されておらず、モデル スワップは応答本文の`model`フィールドにすでに表示されています。

`GET /api/modality-bridge/stats` (管理認証、 `GET /api/settings`と同じ層) は、 `vision`、 `audio`、および`video`のメモリ内のモダリティごとのカウンター`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }`を返します。 `averageLatencyMs` 、すべての試行ではなく`latencySamples`分母として使用します。タイミングのない操作では、ゼロミリ秒のサンプルは作成されません。 `bridged` 、変換が成功した場合の下位互換性のあるエイリアスのままです。試行が失敗しても増加しません。設計により、プロセスの再起動時にカウンターがリセットされます (アカウンティングではなくテレメトリー)。

#### ダッシュボードの構成

The dedicated dashboard page is `/dashboard/settings/modality-bridge`. Its URL-addressable `Vision`, `Audio`, and `Video` tabs preserve query parameters while switching the `tab` value. The Vision tab exposes enablement, mode, model selection (including the automatic default), task-aware prompting, advanced timeout/image/description-length/cache limits, runtime counters, and a guarded sample request. The Audio tab is also live: it exposes enablement, an STT-only model picker with Auto, timeout/max-clip limits, audio counters, and an `input_audio` sample test. The Video tab is functional: it reports the FFmpeg/ffprobe runtime state — one of four explicit UI states (`unknown` while the probe is in flight or could not complete, `restricted` on a non-loopback dashboard host where the probe is skipped client-side, `unavailable` once probed and confirmed missing, or `available` with the FFmpeg/ffprobe versions) — persists enable/model/frame/video/timeout limits, filters the model picker to vision-capable models, and exposes video counters.

AI設定にある以前の Vision Bridge カードは、新しいページへの互換性リンクです。フォームの 2 番目のコピーを所有しなくなりました。メディア プロバイダーは、既存の Speech-to-Text プレイグラウンドを削除せずに、Image-to-Text および Speech-to-Text ワークフローを対応する Modality Bridge タブにリンクします。

**自己ループ アドミッション バイパス:**記述呼び出しがOmniRoute独自の`/v1`自己ループ (非標準プロバイダー モデル) を介してルーティングされる場合、サブリクエストは`x-omniroute-admission-bypass: internal`を送信し、解決された自己ループ資格情報—ローカル モードのローカル`sk_omniroute`センチネル、またはオペレーターが構成した`OMNIROUTE_API_KEY` / `ROUTER_API_KEY`環境キー (#1350) で認証されるため、 `REQUIRE_API_KEY=true`デプロイメントは引き続き記述呼び出しを実行できます。バイパスはそれらの正確な資格情報に対してのみ受け入れられるため、外部クライアントはヘッダーを使用してアドミッションをスキップすることはできません。

従来のデフォルトは`src/shared/constants/visionBridgeDefaults.ts`に存在します。新しいmode/task-aware/cacheデフォルトと設定リゾルバーは`src/shared/constants/modalityBridgeDefaults.ts`にあります。ガードレールは`deps`コンストラクター オプションを公開するため、テストで偽の`getSettings`および`callVisionModel`実装を挿入できます。

### オーディオ ブリッジ (`audioBridge.ts`) —モダリティ ブリッジPR-3

音声入力を受け入れることが知られていないターゲットに到達する前に、音声を含むチャット リクエストを傍受します。チャット リクエストが再ルーティングされることはありません。音声部分は既存の OpenAI 互換マルチパート エンドポイントを通じて文字に起こされ、選択されたチャット モデルはテキスト トランスクリプトを継続します。

流れ：

1. `getResolvedModelCapabilities()`から`supportsAudio`を解決します。明示的なプロバイダー/レジストリ メタデータが優先され、次に静的モデル メタデータ、次に同期された`modalities_input`が優先されます。 `audio`を使用せずに宣言された入力リストは`false`です。 `null`は能力の証拠は何も残っていません。 `false`と`null`両方とも保守的なブリッジをアクティブ化しますが、 `true`それをバイパスします。
2. `modalityBridgeAudio*`設定を解決し、共有`detectMediaParts()`検出器を通じてすべてのメッセージから接続可能なトップレベルのオーディオ部分を抽出します。サポートされているワイヤ形状はOpenAI `input_audio`、 `audio_url`、および`source.media_type: "audio/*"`です。ネストされたオーディオはルーティング用に検出されますが、スプライス パスによって削除されません。作業は`modalityBridgeAudioMaxClips`によって制限されます。後の部分はそのまま残ります。
3. 構成された`provider/model`を尊重するか、 `selectAudioBridgeModel()`安定したカタログ順序で`AUDIO_TRANSCRIPTION_PROVIDERS`ウォークさせ、使用可能なアクティブなプロバイダー資格情報を持つ最初のモデルを選択します。
4. `callAudioTranscription()` 、 base64/data-URIオーディオをマルチパート`file`に変換するか、 DNSピンニングと 25 MBバインドを使用したパブリック専用のアウトバウンド ガードを介してリモート`audio_url`をダウンロードします。次に、ファイルと選択したモデルをローカル`/v1/audio/transcriptions`自己ループにPOSTs 、 `resolveSelfLoopBearer()`で認証します。既存の転写ルートは、通常の資格情報の検索、 cooldown/rate-limit処理、およびプロバイダーのディスパッチを実行します。
5. 呼び出しが成功すると、その部分が`[Audio N]: <transcript>`に置き換えられます。呼び出しは`Promise.allSettled`で実行されます。個々の障害によって、元の音声部分が保持されます (#4012 コントラクト)。すべての呼び出しが失敗し、ターゲットが`supportsAudio === false`ことが証明された場合、その部分は`[Audio N]: (unavailable — no STT provider connected)`になります (#8430 コントラクト)。不明なターゲット (`null`) の場合、すべて失敗した結果はそのまま残ります。使用可能なSTT資格情報を持たない実証済みのテキストのみのターゲットは、ネットワーク呼び出しを発行せずに同じ明示的なスタブを受け取ります。

成功したトランスクリプトは、プロセス全体の Modality Bridge LRU/TTLキャッシュを使用します。キーは、オーディオ参照、安定した`audio-transcription`操作ラベル、および選択されたSTTモデルを組み合わせます。失敗は決してキャッシュされません。音声試行により、共有`bridged`、 `cacheHits`、 `failures`、および`lastUsedAt`カウンターが更新されます。変換された応答には`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`が含まれます。変更されていないリクエストはオーディオ ブリッジ セグメントを受け取りません。

ランタイム設定は DB に基づいており、Zod によって検証されています。

| 鍵                            | デフォルト | 範囲             |
| ----------------------------- | ---------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                |
| `modalityBridgeAudioModel`    | `""`       | 自動またはSTT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10             |

共有キャッシュは`modalityBridgeCacheEnabled`、 `modalityBridgeCacheTtlMinutes`、および`modalityBridgeCacheMaxEntries`によって引き続き制御されます。

### ビデオ ブリッジ (`videoBridge.ts`、 `videoBridgePipeline.ts`)

既知のネイティブ ビデオ サポートのないターゲットが呼び出される前に、チャット コンプリーション`messages`およびレスポンスAPI `input`のトップレベル ビデオ パーツをインターセプトします。サポートされている形状は、 `input_video`、 `video_url`、 `video_source`、 HTTPS URLs、および`data:video/*;base64,...` data URIsです。テキスト内のプレーン ファイル名はビデオとして扱われません。

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) は、リクエストのトラバーサル、 capability/policyチェック、リクエストごとの集約、および応答ペイロードを所有します。ビデオごとの作業—取得、結果全体のキャッシュ、フレーム シーケンス (呼び出し元が宣言したオーディオ トランスクリプトを融合する) を記述する、および試行ごとのmetrics/abort/cleanup —は`videoBridgePipeline.ts`の`processVideoPart`の背後に隠されており、 `preCall`のループ内のビデオ部分ごとに 1 回呼び出されます。このモジュールは、明示的なポート境界`VideoMediaBrokerPort` (バイトの取得とサンプリングされたフレームの抽出)、 `VideoAudioTranscriptionPort` (発信者が宣言したオーディオ トランスクリプトとサンプリングされたキャプションの融合)、および`VideoDrilldownPort` (フレーム ドリルダウン永続境界。まだ`processVideoPart` —に接続されていないが、現在は別の`/api/modality-bridge/video/drilldown`ルートのみがドリルダウン エントリを書き込みます) も定義します。

パブリック`/v1`リクエスト パスは、サブプロセスをインポートしたり呼び出したりすることはありません。リモート ビデオは 50 MiB制限の下でダウンロードされます。インライン Base64 ビデオには、ビデオごとにデコードされた 36 MiB控えめな上限があるため、 model/messages/framingエンベロープはパブリックJSONリクエスト アドミッション制限の 50 MiB内にとどまることができます。インラインの長さとデコードされたサイズの推定値は、割り当て前にチェックされます。 HTTPS 、 DNSピンニングを備えた既存のパブリック専用アウトバウンド ガードを使用する、最初のリモートURLとすべてのリダイレクトで必要です。その後、バイトは`POST /api/modality-bridge/video/extract`ブローカーの内部境界を正確に越えます。そのルートは`LOCAL_ONLY`と`SPAWN_CAPABLE`両方であり、プロセスごとに認証された信頼できるループバック リクエストのみを受け入れ、 URL、ファイル システム パス、実行可能ファイル、または引数リストは決して受け入れません。 APIボディサイズ パイプラインとハンドラーの増分ボディ リーダーは、独立して 50 MiBブローカー入力上限を適用します。その制限されたキューは一度に 1 つの抽出を実行し、4 つの保留中のジョブを許可し、保留中の入力の上限を 100 MiBにします。

ブローカー内で、 `ffprobe`プライベート ローカル ファイルを読み取ります。固定フォーマットのホワイトリストには、プレイリストとマニフェストのフォーマットは含まれません。許可された MOV ファミリ コンテナーの場合、外部MOVデータ参照はデフォルトで無効のままであり、固定コマンドはそれらをオプトインしません。 `ffprobe`と`ffmpeg`両方とも、 `file` -onlyプロトコル ホワイトリスト、1 つのスレッド、固定引数配列、シェルなし、および`PATH`から解決された実行可能ファイルを使用します。添付された画像のカバー ストリームは再生可能な候補ではありません。すべての再生可能なストリームは制限を満たす必要があり、決定的な最低インデックスのフォールバックの前に明示的なデフォルト ストリームが優先されます。ビデオは 600 秒、1 次元あたり 8,192 ピクセル、ソース ピクセル 33,554,432 に制限されます。 FFmpeg 1 ～ 16 の中間点JPEGフレームをサンプリングし、より小さい入力をアップスケーリングせずに長辺を最大 1,024 ピクセルにスケールダウンし、 URLを受け取りません。デフォルトでは、サンプリングは`uniform`です。オプションの`scene_aware`ポリシーおよび実験的`segment_aware`ポリシーは、すでに検証済みのローカル ストリーム上で追加の固定FFmpegパスを 1 つ実行し、制限された`showinfo`シーン タイムスタンプを選択し、検出器の障害、タイムアウト、不正な形式の出力、または空の候補セットが発生した場合に、同じ均一な中間点に決定論的にフォールバックします。セグメント対応モードでは、検証されたシーン間隔に比例して中間点サンプルが割り当てられます。セグメント認識の証拠とフォールバック動作については、以下で詳しく説明します。すべてのポリシーの選択後に、16 フレームのハード キャップが適用されます。シーン対応リクエストのバジェットが 1 フレームのみの場合、アクティブなフルビデオまたはフォーカス ウィンドウの均一な中間点が使用され、 `policyEffective: uniform`: 単一の選択されたシーン フレームは時間の両端を保持できないと報告されます。呼び出し元はオプションで有限のフォーカス ウィンドウ (`start`/`end`秒) を提供できます。境界はメディアの継続時間に固定され、反転ウィンドウまたは非有限ウィンドウは拒否され、すべてのサンプリング ポリシーは正規化された間隔内でのみ実行されます。結果として得られるウィンドウは、サンプリング メタデータと信頼できない説明プレフィックスに含まれるため、ダウンストリーム モデルは完全なタイムラインから焦点を当てた抜粋を区別できます。

セマンティック キャプション フォーカスは、個別の明示的な設定です。デフォルトの`full`分析モードでは、既存のフレーム プロンプトが保存され、リクエスト テキストがキャプション モデルに転送されることはありません。 `focused`モードでは、ブリッジは同じチャットまたは応答コンテナーから空ではないユーザーが作成した最新の`text`/`input_text`のみを読み取り、それをNFCに正規化し、制御文字と空白を折りたたんで、Unicode コード ポイントを 500 に制限します。空の結果は、正確な`full`プロンプトに戻ります。使用可能なヒントは、専用の untrusted-user-context ブロック内でJSONとしてシリアル化され、監視可能な詳細のみを優先する場合があります。メディアで表示または聞こえる指示に従うことに対する別の警告を無効にすることはできません。テキスト フォーカスは、 `start`/`end`を推論したり、時間サンプラーを変更したりすることはありません。

#### FU-07構造セグメントの証拠

`segment_aware` 、すでに検証されたローカル ビデオ ストリームに対して 1 つの制限された事前分析パスを使用します。固定フィルター チェーンは、最初に最大 320 ピクセル幅にスケールし、シーンの変化とフリーズ間隔を検出し、次にブラー、平均輝度、およびspatial/temporal情報を 1 秒あたり 1 フレームでサンプリングします。パスは、600 の構造サンプル、1 つのFFmpeg/filterスレッド、同じ`file` -onlyプロトコルとコンテナーのホワイトリスト、1 MiBプロセス出力制限、およびブローカーの共有abort/deadline.内で最大 30 秒に制限されます。リクエストからのコマンド、フィルター、パス、またはURLは決して受け入れられません。

構造的な値は決定論的なサンプリング証拠であり、意味論的なビデオの理解ではありません。主題、アクション、キャプション、音声、またはユーザーの意図を推測することはありません。シーンとフリーズの境界がセグメントを形成します。フリーズ カバレッジ、ブラー、露出、空間ディテール、時間的変化は、既存の 1 ～ 16 フレーム バジェットの割り当て方法にのみ影響します。完全にフリーズされたセグメントは 1 フレームに制限されますが、フリーズされていないセグメントは残りの予算をめぐって競合します。境界の数がフレームを上回る場合、均一なタイムライン カバレッジが維持されるため、早い段階のカットでは長い後続セグメントを隠すことができません。フリーズ境界の 1 秒解析解像度内のシーン境界が合体されます。

フィルターの欠落、 malformed/empty証拠、検出器エラー、または制限された事前分析タイムアウトがある場合、正確な統一中間点ポリシーに対してフェールオープンします。呼び出し元の中止またはブローカーの期限はフェールオープンしません。実行中のサブプロセスが終了し、その後のフレーム抽出が防止され、プライベート一時ツリーが`finally`で削除されます。

`scripts/perf/video-bridge-fu07-eval.ts` 、デアップ後のキャプション コールの節約、高密度モーションの予算割り当て、 blur/exposure/SI-TI証拠、ロングテールを伴う急速なカット、および段階的にフェードする誤検知のために、決定論的な実際のFFmpegフィクスチャを生成します。解析前の経過時間を記録し、 `/usr/bin/time`が使用可能な場合は、子CPUとピークRSS記録します。その品質チェックは構造上の神託にすぎません。このハーネスには承認されたエンドポイントまたは凍結されたジャッジがないため、実際のキャプション モデルの品質は`HOLD`ままです。 `--caption-cost-per-call-usd`コールごとの明示的な正の推定値を提供しない限り、金銭的な節約も`HOLD`ままです。スクリプトはどちらの結果も捏造しません。

各フレームは 4 MiBに制限され、すべての生フレームは合わせて 23 MiBに、シリアル化されたブローカー応答は 32 MiBに制限されます。プライベート一時ディレクトリは`finally`で削除されます。 OmniRoute FFmpegをバンドルせず、カスタム実行可能パスを受け入れません。キャプションを付ける前に、ブリッジは控えめなビジュアル重複排除パスを適用します。各JPEG 16 × 16 グレースケール バッファーに縮小され、保持されている最後のフレームとのみ比較されます。要求されたキャプション予算が 1 フレームを超える場合、抽出ではその予算の 2 倍まで、かつ 16 フレームを超えない範囲付きの候補プールが提供されます。要求された上限は重複排除後にのみ適用され、予算が少なくとも 2 である場合、最初と最後に選択された候補は最終間引き中に保存されます。バージョン管理された`grayscale-16x16-mean-cells-v2`ポリシーは、平均輝度デルタと正規化デルタが少なくとも 0.05 であるサムネイル セルの比率のうち大きい方を使用します。重複しきい値は定数 0.04 で、実行時設定として公開されるのではなく、予測可能性のために選択されます。この二次的な高コントラスト信号は、平均値のみの比較では隠れてしまう小さな動きや目に見えるテキストの変化を保存します。コンパレータまたはデコーダのエラーはフェールオープンし、カバレッジを維持します。出力メタデータは、抽出された候補、正常に使用されたフレーム、および削除された視覚的な重複を分離します。

明示的にマークされたビデオ パーツは、タイムスタンプ付きのコンタクト シートを要求する場合があります。ブリッジは最大 4 列、16 フレームのJPEGグリッドを構築します。すべての 512 ピクセル セルは、そのソース タイムスタンプをハイコントラストのボトム バンドに焼き込みますが、同じタイムスタンプはダウンストリームの関連付けと監査のためにテキストのメタデータに残ります。完全なJPEG上限は 32 MiBのままです。 `sharp`グリッドをデコードまたは構成できない場合、ブリッジは個々のJPEGフレームに戻ります。クライアントの中止は依然としてシート操作を通じて伝播します。

プロモーションの証拠は、合成組成物のマイクロベンチマークから意図的に分離されています。 `scripts/perf/video-bridge-contact-sheet-eval.ts` 、実際の OpenAI 互換ビジョン モデル用のスキーマ バージョン管理されたA/Bハーネスを定義します。プロバイダーが報告したトークン、エンドツーエンドのウォール遅延 (シート構成を含む)、モデル呼び出し数、マニフェスト定義のファクト保持を測定します。生のモデル応答はレポートに書き込まれません。 SHA-256ダイジェストと一致したファクトIDsのみが保持されます。 `--execute-real`が渡され、 `--model`、 `OMNIROUTE_BASE_URL`、および`OMNIROUTE_API_KEY`が設定されていない限り、ハーネスはネットワーク呼び出しや有料モデル呼び出しを行いません。その明示的な実際の実行がなければ、機械可読な判定は`HOLD`ままになります。合成payload/call-count測定値だけではプロモーションの証拠にはなりません。

呼び出し元は、整列されたテキストをすでに所有している場合、サポートされているビデオ パーツにオプションの`transcript.cues`配列をアタッチできます。各キューは、 `text`、プローブされた期間内の有限の`start`/`end`間隔、およびホワイトリストに登録された`source` (`client`、 `embedded`、または`audio-bridge`) を伝送する必要があります。 `confidence`デフォルトは`1`であり、 `0`と`1`の間にある必要があります。正確に重複したキューは折りたたまれます。 OmniRouteこのメタデータから転写を開始することはありません。検証されたキューは、ソース、信頼度、間隔とともに記述された結果にコピーされ、フレーム キャプションとともに信頼できない観察としてレンダリングされます。無効なテキスト、範囲外のテキスト、または出所不明のテキストは、キャプション ストリームに混入されるのではなく、拒否されます。どちらのリクエストボディ トランスクリプト チャネルも、自己主張された`embedded`または`audio-bridge`ラベルを含む、 `client`への供給された来歴を正規化します。サーバー所有のアダプターのみが、コードのみの`trustedSource`引数を介してこれらの信頼できるラベルを割り当てることができます。リクエストのJSONフィールドはその引数に到達できません。トランスクリプト テキストは、出所に関係なく、信頼できないメディア由来のコンテンツのままであり、決して承認を決定してはなりません。

高度な呼び出し元は、同じビデオの`audioTranscript`トラックを提供する場合があります。これは、サーバーの転写の証明ではなく、クライアントが提供するテキストとして扱われます。フュージョン シームは、1 つの期限と中止信号の下で視覚的および音声による観察を実行し、それらを共通のタイムライン上で順序付けし、正確な重複を折りたたみ、一方のみが成功した場合には部分的な結果を報告します。無効な`audioTranscript`は部分的な結果—に劣化します。視覚的な説明は保持され、オーディオ ブランチはビデオ全体が失敗するのではなく、サニタイズされた失敗コード—を記録します。ブランチごとの可用性、部分フラグ、およびサニタイズされた障害コードは、記述された結果、ガードレール メタデータ (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`)、結果キャッシュ メタデータ、およびブリッジ フュージョン カウンターに保存されます。デフォルトのビデオ ブリッジ パスは、音声テキスト変換を呼び出したり、2 番目のメディア コピーをダウンロードしたりしません。その露骨なトラックがなければ、ビデオのみのままです。

**転写物の保持 (#12150 P1)。**これは、ビデオ ブリッジ (それ自体がオプトイン) がトランスクリプト キュー—をレンダリングするたびに自動的に適用され、個別の保持フラグはありません。リクエストがトランスクリプト キュー (呼び出し元で宣言された`transcript`または融合された`audioTranscript`) をレンダリングすると、ガードレールはそれを`videoBridgeObserved`としてマークし、ビデオ説明の編集されたシャドウ—を生成します。これは、すべてのキューのフリーテキスト本文が`[redacted-video-transcript]`に置き換えられる同一のレンダリングであり、文字列が組み立てられる前に構造化キュー フィールドを置き換えることによって構築されます (フラット化されたテキストを解析することによっては決して行われないため、キューのコンテンツは存在しません) —敵対的または通常の、 `[inaudible]`/`[music]` —などの`]`を含む本体を含む、生存可能)。永続化された通話ログのリクエスト本文は、コンテンツの同等性によって一致する、編集されたシャドウの各ビデオ派生テキスト部分を交換します。 `fullText`アンカーは完成した呼び出し前ガードレール ペイロードから再読み取られるため、後のチェーン ガードレール ( PIIおよび資格情報マスカー、優先順位10/95) が説明テキストを所定の位置に書き換えた後、およびsystem-prompt/handoff/memoryインジェクションによってメッセージ配列が再形成された後でも、照合は引き続き成功します。モデルの上流に送信されるボディは変更されません。また、監視されたリクエストには永続的なメモリが設定されない (リクエストと応答の両方から派生した抽出がスキップされる) ため、モデル自身の応答がトランスクリプト テキストをメモリにエコーすることはできません。

**RAW ビデオ フィールド (#12430)。**ブリッジが有効で、ネイティブ ビデオ サポートが不明または存在しない場合、定義された`transcript`/`audioTranscript`フィールドは、記述失敗または`maxVideos`制限の後でも、 `videoBridgeObserved`もアクティブ化します。 `null`と空の文字列はカウントされます。欠落フィールドとビデオ以外のメタデータは含まれません。保持されたコピーはこれらのフィールドを編集するかリクエストを省略し、 caches/Memoryはバイパスされます。

これらのフォールバック パスでは、有効な呼び出し元キューは、非標準のプロバイダー フィールドではなく、サポートされる`text`/`input_text`部分になります。リクエストによって提供された両方のトラックは信頼できない`client`観測のままであり、ビデオが説明されておらず、タイムスタンプがメディアに対して検証されていないという明示的な警告が付いています。既存の256-cue/64-KiB合計バジェットとキューごとのバジェットは、2 つのトラック全体に一緒に適用されます。タイムスタンプは、ブローカーの 600 秒の上限と提供されたフォーカス ウィンドウに適合する必要があります。無効なトラックは破棄され、任意のテキストとして転送されません。有効な兄弟は、合計の予算を超えない限り引き続き使用できます。 Null/emptyフィールドにはテキストが追加されません。このフォールバックでは、メディアのフェッチやトランスクリプションは追加されません。トランスクリプト拡張フィールドは、フォールバック ビデオ キャリアとその`video_url`/`source`オブジェクトから削除されます。 OpenAIワイヤ許可リストは厳格なままです。未知のネイティブ ビデオ キャリアは引き続き利用可能であり、既知のテキストのみのターゲットは安全なマーカーを保持します。構造化された編集シャドウは、追加されたトランスクリプト テキストを保護しますが、呼び出し元が所有する元のリクエストは変更されません。ネイティブでサポートされているターゲットと無効なブリッジは、既存のバイパス動作を保持します。

追加の保持コピーは、同じ監視要求信号を使用します。生のガードレール前のクライアント要求スナップショット、メモリ内の保留中の要求、および初期の拒否された要求ログは、ビデオ部分のトランスクリプト フィールドを構造的に置き換えます。パイプライン ステージとコンテキストのハンドオフによって合成された文字列プロンプトは、persisted-request-body シンクで編集されます。永続化された`video_content_removed`マーカーは、意図的に破棄されたテキストを再構築するのではなく、 `previous_response_id`継続をフェールクローズします。観察されたリクエストがログに記録される前に部分ごとの編集シャドウを失った場合、または後のリクエストの変更後にいくつかのビデオ シャドウの 1 つさえも一致しなかった場合、部分的に編集されたトランスクリプトが保持されるのではなく、保持されているリクエスト本文が完全に省略されます。

観察されたリクエストの場合、モデル応答は、構造化されたキュー境界なしでトランスクリプトの任意の部分を引用する可能性があります。したがって、その永続的な通話ログ`responseBody`省略マーカーに置き換えられます。詳細なパイプライン アーティファクト ( upstream/clientボディやストリーム チャンクを含む可能性がある) は保持されません。セマンティック、冪等性、推論再生キャッシュは、そのリクエストの読み取りと書き込みをバイパスします。プロバイダーの要求とクライアントから見える応答は変更されません。詳細なアーティファクトが省略されると、初期のキープアライブ バイトが一時バッファから排出されます。 Kiroの不正なEventStream警告は、ペイロードのバイト数のみを報告し、その内容やJSONパーサーの生のエラーは報告しません。これは、無関係なすべてのprovider/plugin診断が監査されたとは言えません。より広範なリテンションシンクスイープは #11658 で追跡されています。

内部`/api/modality-bridge/video/drilldown`ライフサイクルは、別個のloopback/token-authenticatedキャッシュ サブストレートです。すべての操作には、正規の不透明プリンシパルIDも必要です。運用呼び出し元が有効になる前に、認証されたテナントからそのIDを取得する必要があり、クライアントが選択した値を転送してはなりません。キャッシュ キーは、そのプリンシパルを正規セッションおよびビデオ参照IDsにバインドし、そのSHA-256-derivedキーのみを保存し、読み取りと削除の両方のスコープを同じプリンシパルに設定します。キャッシュはエントリごとに最大 16 の派生JPEGフレームを保存し、10 分後に期限切れになり、制限された`start`/`end`読み取りまたは明示的なセッション削除をサポートします。

各プリンシパルは、正規JPEGデータの 16 エントリと 64 MiBに制限されます。これらの制限は、グローバル64-entry/256 MiBの上限とは独立しています。プリンシパル クォータ プレッシャーにより、グローバルLRUエビクションが考慮される前に、そのプリンシパルの最も最近使用されていないエントリのみがエビクトされます。期限切れのエントリはキャッシュ アクティビティのプリンシパルとグローバル アカウンティングの両方から消去されますが、キャンセルや検証の失敗では部分的な置換はコミットされません。

キャッシュは、非正規の Base64、過剰なパディング、非 JPEG メディア、境界付きフルイメージ`sharp`デコード中に警告を生成する不正な形式または切り詰められたJPEGs、およびJPEGs拒否します。受け入れられた各画像を正規のJPEGとして再エンコードし、呼び出し元フィールドを信頼する代わりにデコードされたバイトから幅と高さを導出し、後続の多言語バイトを保持せずに破棄します。制限付きの正規圧縮バッファのみが両方のクォータに課金されます。 JSONワイヤ制限には、32 MiBデコード入力上限に対する Base64 オーバーヘッドが含まれます。保存されたすべての派生は、検証されたJPEG format/resolution、サンプリング ポリシー、派生バージョン、作成時間、サーバーが計算したコンテンツ ハッシュ、およびハッシュされた親参照と信頼できる呼び出し元の親コンテンツ ハッシュを記録します。キャンセルは、アトミック キャッシュのコミット前に、非同期decode/hashフェーズ間でチェックされます。

このトランシェはまだプロダクションプロデューサーをルートに接続しておらず、複数解像度のバリアント選択を提供しません。したがって、透過的なビデオ ブリッジ リクエスト パスには追加の作業は発生しませんが、テナント バインドされたプリンシパル導出と完全なFU-08マルチ解像度ライフサイクルは、完全な動作として文書化されるのではなく、明示的なフォローアップ作業のままになります。

フレームには、設定されたビデオ モデルで順次キャプションが付けられます。空のビデオオーバーライドはビジョン設定を継承します。両方が空の場合、ビジョン自動ルーターは有効なビジョン対応モデルを選択します。キャプションが成功すると、元の部分が安定した`[Video description:`プレフィックスに置き換えられます。これにより、テキストが信頼できないメディア由来の観察としてマークされ、メディアに含まれる指示に従わないように下流モデルに指示されます。フレーム キャプション キャッシュ キーには、 JPEGバイト、プロンプト、タイムスタンプ、および有効モデルが含まれます。成功したキャプションのみがキャッシュされます。キャッシュ エントリには、フォールバック モデルを含む実際の成功したプロデューサー モデルが保持されます。異なるモデルによって異なるフレームが生成された場合、ブリッジは`mixed`を報告します。キャッシュ ヒットでは、そのプロデューサー ID が、要求されたルーティング プランとして再ラベル付けされるのではなく、再利用されます。ビデオ全体の結果キャッシュは、出力—プロンプト、効果的なモデル、サンプリング ポリシー、フレーム カウント、セマンティック分析モード、正規化されたフォーカス ヒントのSHA-256フィンガープリント、フォーカス ウィンドウ、 `transcript`、 `audioTranscript`、およびコンタクト シート フラグ—を変更するすべての入力でキー設定されるため、これらのディメンションのいずれかを変更することはキャッシュ ミスであり、古くなった再利用になることはありません。視覚的な重複排除ポリシーのバージョン、しきい値、および制限された候補フレーム数も、結果キャッシュ キーとメタデータで明示されます。したがって、ポリシーの変更により、古いビデオ全体の説明を再利用することはできません。結果キャッシュ v4 メタデータは、生のユーザー タスクではなく、モードとフィンガープリントを保持します。ガードレール メタデータは、要求された分析モードと効果的な分析モードの両方を報告します。使用可能なユーザー テキストのない要求された`focused`モードは、事実上`full`として報告されます。

ガードレールはサポートされているすべてのビデオ部分を抽出しますが、記述されるのは`modalityBridgeVideoMaxVideos`のみです。 `supportsVideo === false`を持つことが証明されたターゲットの場合、失敗したビデオや制限を超えたビデオは明示的な安全なテキスト マーカーになるため、生のビデオは残りません。機能が不明な場合、それらのパーツはビデオ キャリアを保持します。フォールバック トランスクリプトはすべて、上記の境界付きテキスト変換に従います。 `supportsVideo === true`を持つターゲットはブリッジをバイパスします。クライアント要求の中止信号は、ダウンロード、ブローカー キュー、サブプロセス、およびキャプション呼び出しを通じて伝播します。アボートはビデオ間で停止し、生メディアにフェールオープンすることはありません。

ランタイム設定は DB に基づいており、Zod によって検証されています。

| 鍵                                  | デフォルト  | 範囲/動作                                                                                                        |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | オプションのランタイム、オプトイン                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full`一般的なキャプションを保持します。 `focused` 、制限された信頼できない最新ユーザー コンテキストを使用します |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge モデルの継承                                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、 `scene_aware`、または比例`segment_aware`;検出器の障害は`uniform`にフォールバックします               |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000～120000ミリ秒                                                                                               |

120 秒を超える従来の永続ビデオ タイムアウト値は、ブローカーの期限に制限されます。その制限を超える新しい設定の書き込みは拒否されます。 `GET /api/modality-bridge/video/runtime` 、認証または実行時プローブの前に、信頼できるスタンプ付きループバックの局所性が必要であり、その後、管理認証が必要です。 `available`、サニタイズされたFFmpeg/ffprobeバージョン、およびランタイムが使用できない場合の固定理由のみを返します。内部抽出エンドポイントはパブリック アップロードAPIではありません。キューの飽和は`503`と`Retry-After`を返し、呼び出し側の切断は`499`を返し、固定ブローカーの期限は`504`を返します。変換された応答は、Vision または Audio セグメントを削除せずに、中央の`x-omniroute-modality-bridge`ヘッダーに`video->text;model=<visionModel>;parts=<videos>`を追加します。

### PIIマスカー (`piiMasker.ts`)

実行します**両方**段階。

- **`preCall`**ペイロードを複製し、 `system`、 `messages`、 `input`、および`prompt` (プレーン文字列項目を含む) を調べ、 `processPII()` ( `@/shared/utils/inputSanitizer`から) を文字列`content`/`text`フィールドに適用します。 `PII_REDACTION_ENABLED=true`の場合、検出されたPIIは送信ペイロードで編集されます。これは、 `INPUT_SANITIZER_MODE` (プロンプト挿入ポリシーのみを制御する) とは独立しています。編集がオフの場合、呼び出しはコンテンツを書き換えずに検出カウントを記録します。
- **`postCall`**応答をディープクローンし、 `sanitizePIIResponse()`と Responses-API-shape マスカーを実行します (`maskResponsesOutput` — `output_text`と`output[].content[].text`をカバーします)。編集が行われた場合、変更された応答が元の応答を置き換えます。

ガードレールが邪魔になることはありません。注釈 (`meta.detections`、 `meta.redacted`) を付けるか書き換えるだけです。

#### タイプごとの選択、カスタム パターン、検出カウンター

**ダッシュボード→設定→セキュリティ→ PIIマスキング**マスクする内容を選択します。マスキングはオンに切り替えません。つまり、 `PII_REDACTION_ENABLED` (要求) と`PII_RESPONSE_SANITIZATION` (応答+ SSE) は依然としてデフォルトでオフになっています。

- **タイプごとの選択**—組み込み ID は`src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) にリストされます。未設定とは、すべてのタイプ (この設定が存在する前の動作) を意味します。リクエスト エンジンの`ssn_us`パターンは`ssn`にマップされます。テンプレート (Minimal、Standard、Financial、Brazilian、 USA、 GDPR、 POPIA、Full) は、 UIのチェックボックスのみを入力します。
- **GDPRおよびPOPIA識別子**— EUおよび南アフリカの個人識別子をカバーする 12 の組み込み ID (以下の表)。これらの正規表現、バリデータ、および管轄タグは 1 つのテーブル`src/shared/utils/piiPatterns.ts`に存在し、応答サニタイザー (`src/lib/piiSanitizer.ts`) と要求マスカー (`src/shared/utils/inputSanitizer.ts`) の両方がこのテーブルを使用します。一致は、バリデーターが受け入れた場合にのみ編集されます。単なる数字の羅列だけでは決して十分ではありません。これらの ID が存在する前に絞り込まれた選択を保存したオペレーターは、新しい ID がチェックされるまでその動作を保持します。
- **カスタムパターン**—最大 20 個の正規表現またはワイルドカード パターン (`*` =最大 64 個の非空白文字、 `?` = 1 個)。一致は`[CUSTOM_REDACTED]`になります。すべてのパターンは`compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) を通過します。最大 500 文字、フラグは`g i m s u`に制限され、コンパイルする必要があり、 `safe-regex` (致命的なバックトラッキング) を通過する必要があり、空の文字列またはリダクション プレースホルダーと一致してはなりません。失敗したパターンは保存時およびテスト時に拒否され、保存された失敗した行は実行時にコンパイルされずにスキップされます。カスタム パターンはマスキングがオンの場合にのみ実行されます。
- **検出カウンタ**—のタイプごとのカウント (一致しない値)。メモリに保持され、再起動時にリセットされます (`src/lib/pii/piiDetectionStats.ts`)。マスキングがオンになっている間のみ増加します。

設定は`key_value`テーブル (ネームスペース`pii_settings`、 `src/lib/db/piiSettings.ts`) に存在し、1 秒のキャッシュを通じて読み取られます。 API:

| 方法   | パス                     | 目的                                                                                 |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | フラグ状態、 `enabledTypes`、 `customPatterns`、検出カウンター                       |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` =すべて) and/or `customPatterns`を置き換えます                |
| `POST` | `/api/settings/pii/test` | 最大 8 KBのサンプルに対して 1 つのパターンをドライランします。何も保存されていません |

3 つはすべて管理認証を必要とし、 Zod (`src/shared/validation/schemas/piiSettings.ts`) で本文を検証します。

#### GDPR (EU) およびPOPIA (南アフリカ) 識別子

| ID                  | 識別子                   | 検証                                                                              |
| ------------------- | ------------------------ | --------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | 既知の国、その国の正確な長さ、 ISO 13616 MOD-97-10                                |
| `eu_vat`            | EU VAT番号               | 既知のメンバー状態プレフィックスとその状態の数値形式 ( VIESルックアップなし)      |
| `es_dni_nie`        | スペイン語DNI / NIE      | 制御文字 (値 mod 23)。 NIEは`X/Y/Z` + 7 桁です                                    |
| `it_codice_fiscale` | イタリアの財政法典       | odd/evenポジションテーブルからの制御文字                                          |
| `pl_pesel`          | ポーランド語PESEL        | 加重チェックサムとエンコードされた生年月日が存在する                              |
| `nl_bsn`            | オランダ語BSN            | 11 プルーフ (ウェイト 9..2、-1)                                                   |
| `de_steuer_id`      | ドイツ語 Steuer-ID       | ISO 7064 Mod 11,10 プラス数字構造規則 (先頭の 0 なし)                             |
| `se_personnummer`   | スウェーデン語の人物番号 | 下 10 桁と妥当な生年月日 (10 桁または 12 桁) に関する Luhn                        |
| `za_id`             | 南アフリカのID番号       | 13 桁すべての Luhn、有効な出生month/day、市民権数字 0 または 1                    |
| `za_phone`          | 南アフリカの電話         | `+27` / `27`プレフィックス、またはスペースまたはハイフンで書かれた各国の`0..`形式 |
| `za_vat`            | 南アフリカのVAT番号      | `4`で始まる10桁**そして**前48文字の「VAT」 / 「BTW」                              |
| `za_tax_ref`        | 南アフリカの税務担当者。 | `0`～`3`で始まる 10 桁、Luhn、**そして**前48文字の「tax」/「SARS」                |

数字のみの形式は注文番号、ビルド番号、タイムスタンプと衝突するため、最も弱いもの (`za_vat`、 `za_tax_ref`) にはキーワード cue が必要で、裸の 10 桁の`0..`番号は南アフリカの電話番号として扱われません。スペースのあるIBANs (`GB29 NWBK ...`) は一致しません。ストリーミング パスでは、キューは現在のチャンク内でのみ検索されます。 ID は一般的な電話パターンの前に位置するため、検証された識別子は独自のプレースホルダー (`[IBAN_REDACTED]`、 `[NL_BSN_REDACTED]`、...) を保持します。 `gdpr`テンプレートと`popia`テンプレートは、それぞれEUと南アフリカの ID を選択します。マスキング自体はオプトインのままです (厳しい規則 #20): ここでは機能フラグのデフォルトを変更するものは何もありません。

### プロンプトインジェクション (`promptInjection.ts`)

ユーザーが提供したコンテンツ内の敵対的な構造を検出し、構成されたポリシーを適用します。動作は環境変数とコンストラクター オプションによって決まります。

| 設定             | 環境変数                                                                                                     | デフォルト | 効果                                                                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 有効             | `INPUT_SANITIZER_ENABLED`                                                                                    | `true`     | `false`の場合、ガードレールがショートします。                                                                                                                                                                           |
| モード           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                              | `warn`     | インジェクションポリシー: `block`、 `warn`、または`log`。 (`redact`は後方互換には受け入れられますが、**ない**ストリップインジェクションテキスト。 PII書き換えリクエストは`PII_REDACTION_ENABLED`によって制御されます。) |
| ブロックしきい値 | `blockThreshold`オプション / `INPUT_SANITIZER_BLOCK_THRESHOLD` (エイリアス`INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | ブロックするために必要な最小重大度。デフォルトでは、Medium は観察専用です。                                                                                                                                             |

**モードの優先順位**(`getMode`): 呼び出し元`options.mode` → `INJECTION_GUARD_MODE`**DB機能フラグのオーバーライド**(ダッシュボード→設定→機能フラグ) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`。したがって、ダッシュボードのオーバーライドは環境変数よりも優先されるため、機能フラグUI実行中のガードをライブで制御します (再起動はありません)。 DB読み取りはフェイルセーフです。エラーが発生した場合、ガードは環境ベースの動作にフォールバックし、オーバーライドが設定されていない場合の動作は環境のみの解決と同じになります。

検出ソース:

1. `@/shared/utils/inputSanitizer`からの`sanitizeRequest()` (パイプラインの他の場所で使用される共有検出器セット)。
2. 組み込み`DEFAULT_GUARD_PATTERNS` (現在は`system_override_inline`および`markdown_system_block`、両方とも`high`重大度)。
3. コンストラクター オプション (文字列、正規表現、または`{ name, pattern, severity }`レコード) を介して渡されるオプションの`customPatterns` 。

`mode === "block"`とき**そして**少なくとも 1 つの検出が重大度のしきい値を満たしている場合、 `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }`を返します。 `warn`/`log`モードでは、ガードレールはログを記録しますが、通話は許可します。共有ヘルパー`evaluatePromptInjection()`も、レジストリを経由せずにプロンプトを評価する必要がある呼び出し元のためにエクスポートされます。

**スキャンバウンド (v3.8.20):**検出器は検査するだけです**最初の 16 KB** `src/shared/utils/inputSanitizer.ts`内の結合されたプロンプト テキスト— `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 バイト)。パターン ループを実行する前に、 `detectInjection()`と`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)`両方。インジェクション ディレクティブは入力の先頭近くに位置するため、検出を弱めることなく、数百 KB のペイロードで正規表現CPU/GCを制限します (cf. #3932、#4041)。

### 資格情報マスカー (`credentialMasker.ts`)

実行します**両方**ステージ、デフォルト チェーンの最後 (優先度`95`)。アウトバウンドペイロード (メッセージコンテンツ、ツール呼び出し引数、ツール結果) からの既知の API キー/シークレットトークンパターンを秘匿化します。**そして**これにより、プロンプトに貼り付けられた (またはツールの結果によってエコーバックされた) 資格情報が上流のプロバイダーに漏洩したり、クライアントに戻されたりすることはありません。

- **オプトインのみ**、 PII編集と同じ規則 (ハード ルール #20 に隣接): `settings.credentialRedactionEnabled === true`以外は無効**または**`CREDENTIAL_REDACTION_ENABLED=true`。これをオフにすると、ガードレールはブロックも書き換えもしない no-op —なります。
- `redactCredentials()` 、完全なpayload/responseツリー (`walkValue()`、プロトタイプ汚染安全、 `WeakSet`経由のサイクル安全) をたどり、一致するものを`[REDACTED:<type>]`プレースホルダーに置き換え、実際に変更されたブランチのみを複製します。
- `CREDENTIAL_PATTERNS`は、 LLMプロバイダー キー (OpenAI、OpenAI-proj、 Anthropic、 Google、Hugging Face、Replicate)、 VCS/SaaSトークン (GitHub、 Slack、Linear、 Notion、npm、Postman、 Discord)、支払いキー (Stripe、Square)、クラウド キー (AWSアクセス キー、Twilio、 SendGrid) をカバーします。 、Mailgun)、秘密キー / JWTs、資格情報を含む接続文字列 (`mongodb://user:pass@...`など)、および汎用の`Authorization`/`x-api-key`/`api-key`/`apikey`ヘッダー値パターン。ヘッダー形状のキー (`authorization`、 `x-api-key`、 `api-key`、 `apikey`) は、汎用テキスト正規表現を介するのではなく、構造的に編集されます (値のみ、 `Bearer `/`Basic `などのスキーム接頭辞は保持されます)。
- ガードレールが邪魔になることはありません。書き換え (`modifiedPayload` / `modifiedResponse`) と注釈 (`meta.credentialsRedacted`、 `meta.count`) のみを実行します。

リグレッションガード: `tests/unit/credential-masker-guardrail.test.ts`。

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
