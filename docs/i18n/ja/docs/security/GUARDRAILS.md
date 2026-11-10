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

レジストリはインポート時に、優先度順で6つのガードレールを自動的に読み込みます
（`registry.ts` → `registerDefaultGuardrails()` を参照）:

| 優先度 | 名前                | ステージ       | ファイル              |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先度の数値が小さいものから**先に**実行されます。

### Vision Bridge（`visionBridge.ts`）— モダリティブリッジ PR-1

GLM 5.3 ベースモデルと `glm-5.3-{low,high,max}` には、
`supportsVision:false` のレジストリ／仕様メタデータが明示されています。GLM 5.3 Flash バリアントは
引き続きネイティブビジョンモデルです。Claude Code の `/v1/messages` ルートは、Claude から OpenAI への
変換前に共有の `handleChat` 呼び出し前ガードレールチェーンに入ります。ネストされた
`Read` ツール結果の画像は、変換によって OpenAI の `image_url` コンテンツに引き上げられる前に、
説明または処理される必要があります（#17069）。

**ビジョンに対応していないモデル**を対象とする画像付きリクエストをインターセプトし、リクエスト全体を
ビジョン対応モデルに再ルーティングするか、設定可能なビジョンモデルで生成したテキスト説明に画像部分を
置き換えてからアップストリーム呼び出しを行います。これにより、テキスト専用プロバイダーでも
マルチモーダルペイロードを透過的に処理できます。

フロー:

1. 対象モデルがすでにビジョンをサポートしている場合はスキップします（強制ブリッジリスト
   `isVisionBridgeForcedModel` に含まれている場合を除く）。
2. `extractImageParts(messages)`（`visionBridgeHelpers.ts`）で画像部分を抽出します。
   この処理は、**統合メディア検出器** `detectMediaParts()`（`open-sse/utils/mediaParts.ts`）に委譲されます。
   これはコンボ互換性フィルターと共有される唯一の信頼できる情報源です。
   抽出対象は、`replaceImageParts` が再び差し込める形状（抽出と置換の契約）に許可リストで限定されます。
   OpenAI の `image_url`、Anthropic の base64
   `source.type:"base64"`、Anthropic URL の `source.type:"url"`、および Responses API の
   `input_image` が対象です。Claude Code の `tool_result.content` と Responses のツール出力に
   ネストされた一致画像も抽出され、元のパスで置換されます。インジケーターのみの形状は
   コンボフィルター用の情報であり、抽出されません。
   見つからない場合はスキップします。
3. `resolveVisionBridgeRuntimeSettings()`（`src/shared/constants/modalityBridgeDefaults.ts`）で
   実行時設定を解決します。新しい `modalityBridge*` 設定キーが優先され、従来の
   `visionBridge*` キーは**1サイクルのみのフォールバック**（ロールバック期間）として引き続き使用されます。
   ブリッジが無効な場合は、メディアの走査を行う前にスキップします。
4. モードセレクター（`modalityBridgeVisionMode`、下表を参照）によって、再ルーティングと説明のどちらを
   行うかを決定します。再ルーティングでは、`model` のみを置き換えた `modifiedPayload` と、
   `{ rerouted, fromModel, toModel, imagesKept }` のメタデータを返します。
5. 説明パスでは、画像数を `maxImages` に制限し、タスクを考慮したプロンプトを組み立て、説明キャッシュを
   参照し、ビジョンモデルを**並列**で呼び出します（`Promise.allSettled`）。その位置に
   `[Image N]: <description>` のテキスト部分を挿入します。説明に失敗した場合は `null` になります。
   不明な対象またはビジョン対応対象では、生の画像を保持します（#4012）。一方、**ビジョン対応プロバイダーが
   接続されていないことが確認されたテキスト専用の直接対象**、またはビジョン数が0のコンボでは、説明されなかった
   すべての画像（部分的な失敗や、説明呼び出し上限を超えた画像を含む）に対して、明示的な
   `(unavailable — no vision-capable provider connected)` テキストスタブを挿入します（#17069）。
   既存の全失敗時のコンボ説明フォールバックは引き続き有効です（#8430）。
6. `modifiedPayload` とメタデータ（`imagesProcessed`、`descriptions`、`processingTimeMs`、
   `visionModel`）を返します。

#### モードセレクター（`modalityBridgeVisionMode`）

| モード     | デフォルト | 動作                                                                                                                                                                                                                                                                                         |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | 従来のヒューリスティックをそのまま使用します（#6640/#7204）。非コンボ／`auto/` モデルは、元のモデルに使用可能な認証情報がすでにある場合（その場合は説明）を除き、最適なビジョンモデルに再ルーティングします。コンボ対象は常に説明します。                                                    |
| `describe` |            | 常に説明します。再ルーティングブロックは完全にスキップされ、ユーザーが選択したモデルが常に応答します。                                                                                                                                                                                       |
| `reroute`  |            | 再ルーティングを強制します。認証情報を持つモデルを維持するためのガードは無視されます。再ルーティング**先**の認証情報ガードは引き続き適用されます。使用可能なビジョン対応対象がない場合、ブリッジは説明を行ったり、テキスト専用対象に生の画像を送信したりせず、明確なエラーでブロックします。 |

強制モードは自動ヒューリスティックの実行前にショートサーキットします。`auto` の動作は
PR-1 前のガードレールとバイト単位で同一です。

#### APIキーのスコープ（`visionBridgeKeyScope.ts`）

呼び出し元の API キーが `allowedConnections`、クォータプール
（`allowedQuotas`）、またはモデル（`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`）を制限している場合、
ブリッジは、そのキーが使用を許可されている接続上で、そのキーが使用できるリルート用モデルと
説明用モデルのみを選択します。説明呼び出しは常に `x-omniroute-self-loop-key-id` ヘッダーを
付けた OmniRoute のセルフループを経由するため、受信側のチャットリクエストで、そのキーの
接続およびモデルポリシーが再度適用されます。`enforceApiKeyPolicy()` は、そのヘッダーを
セルフループの bearer と併用した場合にのみ尊重するため、アクセスを狭めることしかできず、
解決できない ID は拒否されます。

キーでビジョンモデルが1つも許可されていない場合、**ビジョン機能がないことが確認された
テキスト専用ターゲット**は、画像バイトを対応できない上流へ転送する代わりに、明確な HTTP 400
をローカルで返して画像リクエストを拒否します（#17069）。ビジョン機能が不明またはネイティブ
対応のターゲットでは、説明パスは従来の fail-open 動作を維持します（meta `{ skipped: true, reason: "no_permitted_vision_model" }`）。
キーなしのリクエスト、およびこれらの制限がないキーは、これまでとまったく同じように動作します。

#### タスク対応の説明プロンプト（`modalityBridgeVisionTaskAware`）

デフォルトは **true** です。`composeVisionPrompt()`（`visionBridgeHelpers.ts`）は、
**最後のユーザーメッセージ**のテキスト（最大500文字に切り詰め）をベースの説明プロンプトに
追加します。これにより、実際にユーザーが求めた内容へ説明を誘導し
（codex-vision-proxy パターン）、ビジョンモデルに表示されているテキストの転記を依頼します。
フラグを無効にした場合、またはユーザーテキストがない場合は、ベースプロンプトが変更されずに
使用されます。

説明セルフループ自身の OpenAI 互換リクエスト（`visionBridgeHelpers.ts` 内の
`callVisionModelSingle()`）は、常に `image_url.detail: "high"` を要求します —
呼び出し元やプロバイダーを問わず無条件であり、クライアントからのシグナルによる制御も受けません。
低詳細度のサンプリングは、このプロンプトが要求するテキスト転記タスクの OCR 精度を直接低下させるため、
説明呼び出し自体は、元の受信リクエストで使用された詳細度にかかわらず、常に高詳細度を要求します。
これは内部の説明リクエスト本文にのみ影響します。プライマリリクエストで OmniRoute が呼び出し元自身の
`image_url.detail` を転送する方法は変更されません。こちらのデフォルトは別途適用され、
`defaultImageDetail()`（`open-sse/handlers/chatCore/upstreamBody.ts`）で OpenCode クライアントを
検出した場合にのみ適用されます。説明セルフループの Anthropic ワイヤーフォーマット分岐には
`detail` フィールドがなく、どちらのデフォルトの影響も受けません。

#### 説明出力の上限（`modalityBridgeVisionMaxChars`）

| キー                           | デフォルト | 範囲                 |
| ------------------------------ | ---------- | -------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` または 100–50000 |

`0`（デフォルト）は **上限なし** を意味します。`callVisionModel()` が返した説明は変更されずに
そのまま渡され、既存の動作が維持されます。100–50000 の範囲の値を指定すると、説明は
`…` サフィックス付きで切り詰められ、その後 `[Image N]: <description>` として差し戻されます
（`src/lib/guardrails/visionBridge.ts` の `VisionBridgeGuardrail.preCall()`）。
下流モデルが完全な転記結果を必要とする詳細な OCR タスクではこの値を大きくし、
応答の多いビジョンモデルでトークン使用量を制限する場合は小さくしてください。
ダッシュボードのフィールドは Vision タブの Advanced パネルにあります
（`ModalityBridgeVisionTab.tsx` の `modality-bridge-max-chars`）。このフィールドは 1 から 99
までの値を 100 の下限まで引き上げますが、明示的な `0` はそのままにします。`0` は独立した
有効な Zod 値であり（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`）、
単に「未設定」のデフォルトというだけではありません。

#### 説明キャッシュ（`modalityBridge/bridgeCache.ts`）

説明出力用の、プロセス全体で共有されるメモリ内 LRU + TTL キャッシュです。
キーは、長さプレフィックスによるフレーミング（フィールド境界の衝突なし）を使用した
`sha256(imageRef + composedPrompt + configuredBridgeModel)` です。モデル部分には、実際に
応答したモデルではなく、**設定された**ブリッジモデルが使用されます —
`callVisionModel` は内部でフォールバックする場合があり、試行ごとにキーを設定すると
キャッシュが分断されるためです。失敗した説明はキャッシュされません。設定は次のとおりです。

| キー                            | デフォルト | 範囲    |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### リモート画像の正規化（セルフループによる説明 / base64 取得）

ブリッジが **リモート**画像自体を取得する場合 — Anthropic の説明セルフ呼び出しと、
claude ワイヤーフォーマットへの base64 変換（`ensureBase64ImagesForClaudeWire`）の両方で、
`visionBridgeHelpers.ts` の `fetchRemoteImageAsDataUri()` を使用します — 生成された data URI は、
ビジョンモデルのリクエストに埋め込まれる前に `normalizeDataUri()`
（`open-sse/utils/imageNormalize.ts`）を通されます。サイズが大きすぎる画像は、**2048px の長辺**
に縮小されます（OpenAI/Anthropic がサーバー側ですでに適用しているリサイズ上限と同じです）。
これにより、ビジョンモデルが見る内容を変えずに、アップロードのバイト数とレイテンシーを削減できます。
リサイズには `sharp` を使用し、動的インポートで読み込まれます。そのネイティブバイナリの
読み込みに失敗するプラットフォームでも、`normalizeDataUri()` は **決して throw しません** —
元のバイト列をそのまま通過させるため、説明 / base64 変換パスは常に動作し続けます。
画像として解釈できないデータ（画像を返さなかった fetch の結果）も、そのまま変更せずに通過します。
この正規化の対象は、ブリッジが自身のセルフ呼び出しのために取得する画像に限定されます —
オプトインのみの変更原則（Hard Rule #20）に従い、呼び出し元の生のパススルーペイロードには
決して適用されません。

#### 設定スキーマ + 移行

新しい `modalityBridge*` キーは、`updateSettingsSchema`
（`src/shared/validation/settingsSchemas.ts`）で Zod 検証されます。
対象は `modalityBridgeVisionEnabled`、
`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、
`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、
`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、
`modalityBridgeVisionMaxChars`、`modalityBridgeCache*` の 3 キー、
および Audio Bridge が使用する `modalityBridgeAudio*` グループです。
マイグレーション `141_modality_bridge_settings.sql` は、既存の
レガシーな `visionBridge*` 値を対応する新しいキーにコピーします
（冪等で、オペレーターが設定した `modalityBridge*` 値を上書きすることは
ありません）。レガシーキーは、1 リリースサイクルの間、読み取り時の
フォールバックとして引き続き受け付けられます。

#### 透明性ヘッダー + 統計

変換内容を説明するレスポンスには
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
が付与されます（`modalityBridge/bridgeStats.ts` の
`buildModalityBridgeHeader()` で構築され、
`src/sse/handlers/chatHelpers.ts` の
`withModalityBridgeHeader()` で付与されます）。
再ルーティングされたリクエストにはヘッダーは付与されません —
ペイロードは変更されておらず、モデルの切り替えはレスポンス本文の
`model` フィールドですでに確認できるためです。

`GET /api/modality-bridge/stats`（管理認証、`GET /api/settings` と同じ
権限階層）は、`vision`、`audio`、`video` それぞれについて、メモリ上の
モダリティ別カウンター
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` を返します。
`averageLatencyMs` の分母にはすべての試行ではなく
`latencySamples` が使用されます。計測されなかった操作が
ゼロミリ秒のサンプルとして作られることはありません。
`bridged` は、成功した変換を示す後方互換エイリアスとして維持されます。
失敗した試行によって増加することはありません。
カウンターは設計上、プロセスの再起動時にリセットされます
（会計ではなくテレメトリーです）。

#### ダッシュボード設定

専用のダッシュボードページは
`/dashboard/settings/modality-bridge` です。URL で指定可能な
`Vision`、`Audio`、`Video` タブは、`tab` の値を切り替える際にも
クエリパラメーターを維持します。
Vision タブでは、有効化、モード、モデル選択（自動デフォルトを含む）、
タスク対応プロンプト、高度なタイムアウト／画像数／説明文長／キャッシュ
制限、実行時カウンター、および保護されたサンプルリクエストを設定できます。
Audio タブも利用可能で、有効化、STT 専用モデルピッカー（Auto を含む）、
タイムアウト／最大クリップ長の制限、オーディオカウンター、
および `input_audio` サンプルテストを提供します。
Video タブも機能します。FFmpeg/ffprobe の実行時状態を報告します —
明示的な UI 状態は 4 つあり、プローブ実行中または完了できなかった場合は
`unknown`、ループバック以外のダッシュボードホスト上でクライアント側の
プローブがスキップされた場合は `restricted`、プローブによって存在しない
ことが確認された場合は `unavailable`、FFmpeg/ffprobe のバージョンとともに
利用可能な場合は `available` です — 。有効化、モデル、フレーム、ビデオ、
タイムアウトの制限を保存し、モデルピッカーをビジョン対応モデルに絞り込み、
ビデオカウンターを表示します。

AI 設定にあった以前の Vision Bridge カードは、新しいページへの互換性
リンクです。フォームの別コピーを保持することはなくなりました。
Media Providers からも、Image-to-Text および Speech-to-Text ワークフローを
対応する Modality Bridge タブにリンクしますが、既存の Speech-to-Text
プレイグラウンドは削除しません。

**セルフループ受け入れバイパス:** describe 呼び出しが OmniRoute 自身の
`/v1` セルフループ（標準外のプロバイダーモデル）を経由する場合、
サブリクエストは `x-omniroute-admission-bypass: internal` を送信し、
解決されたセルフループ認証情報で認証されます。ローカルモードでは
ローカルの `sk_omniroute` センチネルを使用し、それ以外では
オペレーターが設定した `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境キー
（#1350）を使用します。これにより、`REQUIRE_API_KEY=true` のデプロイでも
describe 呼び出しを実行できます。このバイパスが有効になるのは、これらの
正確な認証情報に対してのみです。そのため、外部クライアントがこのヘッダーを
使って受け入れ処理をスキップすることはできません。

レガシーなデフォルト値は
`src/shared/constants/visionBridgeDefaults.ts` にあります。新しいモード、
タスク対応、キャッシュのデフォルト値と設定リゾルバーは
`src/shared/constants/modalityBridgeDefaults.ts` にあります。
ガードレールでは `deps` コンストラクターオプションを公開しているため、
テストで偽の `getSettings` および `callVisionModel` 実装を注入できます。

### Audio Bridge（`audioBridge.ts`）— Modality Bridge PR-3

音声を含むチャットリクエストを、音声入力を受け付けることが既知ではない
ターゲットに到達する前にインターセプトします。チャットリクエストを
再ルーティングすることはありません。音声パーツは既存の
OpenAI 互換マルチパートエンドポイントを通じて文字起こしされ、
選択されたチャットモデルはテキストのトランスクリプトを使って処理を続行します。

フロー:

1. `supportsAudio` を `getResolvedModelCapabilities()` を通じて解決します。明示的なプロバイダーレジストリのメタデータが優先され、次に静的なモデルメタデータ、最後に同期された `modalities_input` が使用されます。`audio` を含まない入力リストが宣言されている場合は `false` となり、機能を示す証拠がない場合は `null` のままです。`false` と `null` のいずれも保守的なブリッジを有効にし、`true` の場合はブリッジを経由しません。
2. `modalityBridgeAudio*` 設定を解決し、共有の `detectMediaParts()` 検出器を通じて、すべてのメッセージから分離可能なトップレベルの音声パーツを抽出します。サポートされるワイヤー形式は、OpenAI の `input_audio`、`audio_url`、および `source.media_type: "audio/*"` です。ルーティングのためにネストされた音声も検出されますが、分離処理の経路では削除されません。処理量は `modalityBridgeAudioMaxClips` によって制限され、それ以降のパーツは変更されません。
3. 設定された `provider/model` を使用するか、`selectAudioBridgeModel()` に `AUDIO_TRANSCRIPTION_PROVIDERS` をカタログの安定した順序で走査させ、利用可能なアクティブプロバイダー認証情報を持つ最初のモデルを選択します。
4. `callAudioTranscription()` は、base64／データ URI の音声を multipart の `file` に変換します。または、DNS ピン留めと 25 MB の上限を備えたパブリック専用アウトバウンドガードを通じて、リモートの `audio_url` をダウンロードします。その後、ファイルと選択したモデルを、`resolveSelfLoopBearer()` で認証されたローカルの `/v1/audio/transcriptions` セルフループに POST します。既存の文字起こしルートが通常の認証情報検索、クールダウン／レート制限処理、プロバイダーへのディスパッチを実行します。
5. 成功した呼び出しでは、パーツを `[Audio N]: <transcript>` に置き換えます。呼び出しは `Promise.allSettled` で実行され、個々の失敗では元の音声パーツが保持されます（#4012 の契約）。すべての呼び出しが失敗し、対象が `supportsAudio === false` であることが証明されている場合、パーツは
   `[Audio N]: (unavailable — no STT provider connected)`（#8430 の契約）になります。不明な対象（`null`）では、すべて失敗した場合も変更されません。テキストのみの対象であることが証明され、使用可能な STT 認証情報がない場合は、ネットワーク呼び出しを行わずに同じ明示的なスタブが設定されます。

成功した文字起こしでは、プロセス全体で共有される Modality Bridge の LRU／TTL キャッシュを使用します。キーは音声参照、安定した `audio-transcription` 操作ラベル、選択された STT モデルを組み合わせたものです。失敗はキャッシュされません。音声の試行によって、共有される `bridged`、`cacheHits`、`failures`、`lastUsedAt` カウンターが更新されます。変換されたレスポンスには
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` が付与されます。変更されていないリクエストには Audio Bridge セグメントは付与されません。

実行時設定は DB に保存され、Zod によって検証されます。

| キー                          | デフォルト | 範囲              |
| ----------------------------- | ---------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                 |
| `modalityBridgeAudioModel`    | `""`       | 自動または STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10              |

共有キャッシュは、`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes`、`modalityBridgeCacheMaxEntries` によって引き続き制御されます。

### ビデオブリッジ（`videoBridge.ts`、`videoBridgePipeline.ts`）

ネイティブなビデオ対応が不明またはない対象を呼び出す前に、Chat Completions の `messages` と Responses API の `input` に含まれるトップレベルのビデオパーツをインターセプトします。サポートされる形式は、`input_video`、`video_url`、`video_source`、HTTPS URL、および `data:video/*;base64,...` データ URI です。テキスト内の単なるファイル名はビデオとして扱われません。

`VideoBridgeGuardrail.preCall`（`videoBridge.ts`）は、リクエストの走査、機能／ポリシーのチェック、リクエスト単位の集約、レスポンスペイロードを担います。ビデオごとの処理（取得、全体結果キャッシュ、呼び出し元が宣言した音声文字起こしを融合したフレームシーケンスの説明、試行ごとのメトリクス／中断／クリーンアップ）は、`videoBridgePipeline.ts` の `processVideoPart` に隠蔽されており、`preCall` のループ内でビデオパーツごとに一度呼び出されます。このモジュールは、明示的なポート境界である `VideoMediaBrokerPort`（バイトの取得とサンプリングしたフレームの抽出）、`VideoAudioTranscriptionPort`（呼び出し元が宣言した音声文字起こしとサンプリングしたキャプションの融合）、`VideoDrilldownPort`（従来の raw-store 形式）も定義します。プロダクション用の STT とフレーム保持は、`createVideoSttAdapter` と `createVideoDrilldownAdapter` を通じて説明ポートの周囲に構成されます。後者は共有された不透明ハンドルのライフサイクルを使用します。

パブリック `/v1` リクエストパスは、サブプロセスをインポートも呼び出しもしません。リモートビデオは 50 MiB の上限の下でダウンロードされます。インライン base64 ビデオには、モデル／メッセージ／フレーミングのエンベロープを、50 MiB のパブリック JSON リクエスト受け入れ上限内に収められるよう、ビデオごとに保守的な 36 MiB のデコード後上限が設定されています。インラインの長さとデコード後サイズの推定値は、確保の前にチェックされます。初期リモート URL とすべてのリダイレクトでは HTTPS が必須であり、DNS ピン留めを備えた既存のパブリック専用アウトバウンドガードが使用されます。その後、バイト列は正確な内部の `POST /api/modality-bridge/video/extract` ブローカー境界を通過します。このルートは `LOCAL_ONLY` と `SPAWN_CAPABLE` の両方であり、プロセス単位で認証された信頼済みループバックリクエストのみを受け付け、URL、ファイルシステムパス、実行可能ファイル、引数リストは一切受け付けません。API のボディサイズパイプラインとハンドラーのインクリメンタルなボディリーダーは、それぞれ独立して 50 MiB のブローカー入力上限を適用します。境界付きキューは一度に 1 件の抽出を実行し、保留中のジョブを 4 件まで許可し、保留中の入力を 100 MiB までに制限します。

ブローカー内部では、`ffprobe` が非公開のローカルファイルを読み取ります。固定の形式許可リストでは、プレイリストおよびマニフェスト形式を除外しています。許可された MOV 系コンテナでは、外部 MOV データ参照はデフォルトで引き続き無効であり、固定コマンドでも有効化されません。`ffprobe` と `ffmpeg` はどちらも `file` のみを許可するプロトコルホワイトリスト、1 スレッド、固定された引数配列、シェルなしで実行され、実行ファイルは `PATH` から解決されます。Attached-picture のカバーストリームは再生可能な候補ではありません。再生可能なすべてのストリームは制限を満たす必要があり、明示的なデフォルトストリームが優先され、その後に決定論的に最小インデックスの候補へフォールバックします。動画は、長さ 600 秒、各次元 8,192 ピクセル、ソースピクセル数 33,554,432 に制限されます。FFmpeg は 1～16 枚の中間点 JPEG フレームをサンプリングし、入力がそれより小さい場合に拡大することなく、長辺を最大 1,024 ピクセルまで縮小します。また、URL を受け取ることはありません。サンプリングはデフォルトで `uniform` です。オプションの `scene_aware` および実験的な `segment_aware` ポリシーは、すでに検証済みのローカルストリームに対して、固定された FFmpeg パスを 1 回追加で実行し、範囲が制限された `showinfo` シーンタイムスタンプを選択します。検出器の失敗、タイムアウト、不正な出力、または候補集合が空の場合は、同じ一様な中間点へ決定論的にフォールバックします。segment-aware モードでは、検証済みのシーン区間に比例して中間点サンプルを割り当てます。segment-aware のエビデンスとフォールバック動作については、以下で詳しく説明します。厳格な 16 フレーム上限は、すべてのポリシーで選択後に適用されます。scene-aware リクエストのフレーム予算が 1 枚だけの場合は、アクティブな動画全体またはフォーカスウィンドウの一様な中間点を使用し、`policyEffective: uniform` を報告します。選択されたシーンフレーム 1 枚だけでは、時間軸の両端を同時に保持できないためです。呼び出し元は、有限のフォーカスウィンドウ（`start`/`end` 秒）を任意で指定できます。境界値はメディアの長さにクランプされ、逆順または有限でないウィンドウは拒否されます。すべてのサンプリングポリシーは、正規化された区間内でのみ実行されます。結果のウィンドウは、サンプリングメタデータと信頼できない説明のプレフィックスに含まれるため、下流モデルは、フォーカスされた抜粋とタイムライン全体を区別できます。

意味的なキャプションのフォーカスは、独立した明示的な設定です。デフォルトの `full` 分析モードでは、既存のフレームプロンプトが保持され、リクエストテキストがキャプションモデルに転送されることはありません。`focused` モードでは、ブリッジは同じ Chat または Responses コンテナから、ユーザーが作成した最新の空でない `text`/`input_text` のみを読み取り、NFC に正規化し、制御文字と空白を畳み込み、500 Unicode コードポイントに制限します。結果が空の場合は、`full` の正確なプロンプトにフォールバックします。使用可能なヒントは、専用の信頼できないユーザーコンテキストブロック内に JSON としてシリアライズされ、観測可能な詳細の優先順位付けにのみ使用できます。メディア内で視覚または音声によって確認できる指示に従わないようにする別個の警告を上書きすることはできません。テキストによるフォーカスが `start`/`end` を推測したり、時間的サンプラーを変更したりすることはありません。

#### FU-07 構造的セグメントエビデンス

`segment_aware` は、すでに検証済みのローカル動画ストリームに対して、範囲を制限した事前分析パスを 1 回実行します。固定フィルターチェーンでは、まず幅を最大 320 ピクセルに縮小し、シーン変更と静止区間を検出した後、1 秒あたり 1 フレームで、ぼかし、平均輝度、空間情報および時間情報をサンプリングします。このパスは、構造サンプル 600 件、FFmpeg/フィルター 1 スレッド、同じ `file` のみを許可するプロトコルおよびコンテナ許可リスト、プロセス出力 1 MiB の上限、さらにブローカー共有の中断／期限内で最大 30 秒に制限されます。リクエストからコマンド、フィルター、パス、URL を受け取ることはありません。

構造値は決定論的なサンプリングエビデンスであり、意味的な動画理解ではありません。これらの値から、被写体、動作、キャプション、音声、ユーザーの意図を推測することはありません。シーン境界と静止境界によってセグメントが形成され、静止範囲、ぼかし、露出、空間的ディテール、時間的変化は、既存の 1～16 フレーム予算の割り当て方法にのみ影響します。完全に静止したセグメントは 1 フレームに制限され、静止していないセグメントは残りの予算を競合して使用します。境界数がフレーム数を上回る場合でも、一様なタイムラインカバレッジを維持するため、冒頭の急速なカットによって末尾の長いセグメントが隠れることはありません。静止境界の 1 秒単位の分析解像度内にあるシーン境界は統合されます。

フィルターの欠落、不正または空のエビデンス、検出器エラー、あるいは範囲を制限した事前分析のタイムアウトが発生した場合は、正確な一様中間点ポリシーへフェイルオープンします。呼び出し元による中断またはブローカーの期限超過の場合はフェイルオープンせず、実行中のサブプロセスを終了し、その後のフレーム抽出を阻止して、非公開の一時ツリーを `finally` で削除します。

`scripts/perf/video-bridge-fu07-eval.ts` は、重複排除後のキャプション呼び出し削減、動きの多い映像での予算割り当て、ぼかし／露出／SI-TI エビデンス、長い末尾を伴う急速なカット、段階的フェードによる誤検出を対象とする、決定論的な実 FFmpeg フィクスチャを生成します。事前分析の実時間を記録し、`/usr/bin/time` が利用可能な場合は、子プロセスの CPU 使用量とピーク RSS も記録します。その品質チェックは構造的オラクルのみです。このハーネスには承認済みのエンドポイントも固定済みの判定器もないため、実際のキャプションモデル品質は引き続き `HOLD` です。また、`--caption-cost-per-call-usd` に明示的な正の呼び出し単価見積もりが指定されない限り、金銭的な削減額も `HOLD` のままです。このスクリプトがいずれかの結果を捏造することはありません。

各フレームは 4 MiB、すべての生フレームの合計は 23 MiB、シリアライズされたブローカー応答は 32 MiB に制限されます。プライベートな一時ディレクトリは `finally` で削除されます。OmniRoute は FFmpeg をバンドルせず、カスタム実行可能ファイルパスも受け付けません。キャプション生成の前に、ブリッジは保守的な視覚的重複排除処理を適用します。各 JPEG を 16×16 のグレースケールバッファに縮小し、保持されている直前のフレームとのみ比較します。要求されたキャプション予算が 1 フレームを超える場合、抽出処理はその予算の最大 2 倍、かつ 16 フレーム以下に制限された候補プールを提供します。要求された上限は重複排除後にのみ適用され、予算が 2 以上の場合、最終的な間引きでは最初と最後に選択された候補が保持されます。バージョン管理された
`grayscale-16x16-mean-cells-v2` ポリシーでは、平均輝度差と、正規化された差分が 0.05 以上であるサムネイルセルの割合のうち、大きい方を使用します。重複判定のしきい値は定数 0.04 であり、実行時設定として公開するのではなく、予測可能性を重視して選択されています。この副次的な
高コントラスト信号により、平均値のみの比較では隠れてしまう小さな動きや、表示テキストの変化が保持されます。比較処理またはデコーダーのエラーは fail open となり、カバレッジを維持します。出力メタデータでは、抽出された候補、正常に使用されたフレーム、視覚的重複として破棄されたフレームが分離されます。

明示的に指定された動画パートでは、タイムスタンプ付きコンタクトシートを要求できます。ブリッジは、最大 4 列、16 フレームの JPEG グリッドを構築します。512 ピクセルの各セルでは、コントラストの高い下部帯に元のタイムスタンプを埋め込みます。同じタイムスタンプは、後続処理での関連付けと監査のため、テキストメタデータにも残ります。完全な JPEG は 32 MiB 以下に制限されます。`sharp` がグリッドをデコードまたは合成できない場合、ブリッジは個別の JPEG フレームにフォールバックします。クライアントによる中断は、シート処理を通じてそのまま伝播します。

昇格の根拠は、合成構成マイクロベンチマークとは意図的に分離されています。`scripts/perf/video-bridge-contact-sheet-eval.ts` は、実際の OpenAI 互換ビジョンモデル向けに、スキーマバージョン管理された A/B ハーネスを定義します。プロバイダーが報告するトークン数、シート合成を含むエンドツーエンドの経過時間、モデル呼び出し回数、マニフェストで定義された事実の保持率を測定します。生のモデル応答はレポートに書き込まず、SHA-256 ダイジェストと一致した事実 ID のみを保持します。ハーネスは、`--execute-real` が渡され、`--model`、`OMNIROUTE_BASE_URL`、`OMNIROUTE_API_KEY` が設定されている場合を除き、ネットワーク接続も有料モデル呼び出しも行いません。その明示的な実行がない場合、機械可読な判定は `HOLD` のままです。合成ペイロードや呼び出し回数の測定だけでは、昇格の根拠にはなりません。

呼び出し元は、整列済みのテキストをすでに所有している場合、対応する動画パートに任意の `transcript.cues` 配列を付加できます。各キューには、`text`、プローブされた再生時間内の有限な `start`/`end` 区間、およびホワイトリスト登録された `source`（`client`、`embedded`、または `audio-bridge`）を含める必要があります。`confidence` の既定値は `1` で、`0` から `1` の範囲内でなければなりません。完全に重複するキューはまとめられます。OmniRoute はこのメタデータを使用して文字起こしを開始することはありません。検証済みのキューは、source、confidence、区間とともに記述された結果へコピーされ、フレームキャプションと並べて信頼されていない観測としてレンダリングされます。無効なテキスト、範囲外のテキスト、または出所情報のないテキストは、キャプションストリームに混在させず、拒否されます。リクエスト本文にある両方の文字起こしチャンネルでは、提供された出所情報を `client` に正規化します。これには、自己申告された `embedded` または `audio-bridge` ラベルも含まれます。信頼されたラベルを割り当てられるのは、コード専用の `trustedSource` 引数を通じたサーバー所有のアダプターだけです。リクエスト JSON のフィールドからその引数に到達することはできません。文字起こしテキストは、その出所にかかわらず、信頼されていないメディア由来のコンテンツであり続け、認可を決定するために使用してはなりません。

高度な呼び出し元は、同じ動画に対して `audioTranscript` トラックを提供できます。これはクライアント提供のテキストとして扱われ、サーバーによる文字起こしの証明とはみなされません。融合境界では、1 つの期限と中断シグナルの下で視覚および音声の観測を実行し、共通のタイムライン上に並べ、完全に重複する項目をまとめ、片方だけが成功した場合には部分的な結果を報告します。無効な `audioTranscript` は、その部分的な結果へ劣化します。つまり、視覚的な説明は保持され、音声ブランチにはサニタイズ済みの失敗コードが記録され、動画全体が失敗することはありません。ブランチごとの可用性、部分結果フラグ、サニタイズ済みの失敗コードは、記述された結果、ガードレールメタデータ（`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`）、結果キャッシュのメタデータ、およびブリッジの融合カウンターに保持されます。既定の Video Bridge パスでは音声テキスト化を呼び出したり、2 つ目のメディアコピーをダウンロードしたりしません。その明示的なトラックがない場合、動画のみのままです。

**Transcript retention (#12150 P1).** これは、Video Bridge（それ自体がオプトイン）のレンダリングによって transcript cue が生成されるたびに自動的に適用されます。個別の retention flag はありません。リクエストが transcript cue（呼び出し元が宣言した `transcript` または融合された `audioTranscript`）をレンダリングすると、ガードレールはそれを `videoBridgeObserved` としてマークし、ビデオの説明の redact 済みシャドウを生成します。これは、各 cue の自由記述本文を `[redacted-video-transcript]` に置き換えた同一のレンダリングであり、文字列を組み立てる前に構造化された cue フィールドを置換することで構築されます（フラット化されたテキストを解析することは決してないため、`[inaudible]`/`[music]` のように `]` を含む本文を含め、悪意のあるものでも通常のものでも、cue の内容が残ることはありません）。永続化される call-log request body では、ビデオ由来の各テキスト部分を、内容の同一性に基づいてその redact 済みシャドウに置き換えます。`fullText` アンカーは、完成した pre-call guardrail payload から再読み込みされるため、後続の chain guardrail（優先度 10/95 の PII および credential masker）が説明テキストをその場で書き換えた後や、system-prompt/handoff/memory injection によって message array の構造が変化した後でも一致します。上流のモデルに送信される body は変更されません。観測されたリクエストでは、永続的な Memory も生成されません（リクエスト由来とレスポンス由来の両方の抽出がスキップされるため）。そのため、モデル自身の返信が transcript のテキストを Memory に反映することもありません。

**Raw video fields (#12430).** bridge が有効で、ネイティブのビデオサポートが不明または存在しない場合、定義済みの `transcript`/`audioTranscript` フィールドも `videoBridgeObserved` を有効にします。これは、説明の失敗後や `maxVideos` 制限後でも同様です。`null` と空文字列は対象になりますが、フィールドが存在しない場合やビデオ以外のメタデータは対象になりません。保持されるコピーでは、これらのフィールドを redact するか、リクエスト自体を省略し、キャッシュ/Memory はバイパスします。

これらのフォールバック経路では、有効な呼び出し元の cue は、標準外の provider フィールドではなく、サポート対象の `text`/`input_text` 部分になります。リクエストで指定された 2 つの track は、どちらも信頼されない `client` の観測情報として扱われ、ビデオが説明されておらず、タイムスタンプがメディアに対して検証されていないことを明示する警告が付加されます。既存の 256 cue/64-KiB の合計および cue ごとの予算は、2 つの track 全体で共有されます。タイムスタンプは broker の 600 秒の上限と、指定された focus window の両方に収まらなければなりません。無効な track は破棄され、任意のテキストとして転送されることはありません。合計予算を超えない限り、有効な sibling は引き続き使用できます。null/空のフィールドによってテキストが追加されることはありません。このフォールバックでメディアの取得や transcription が追加されることもありません。transcript の拡張フィールドは、フォールバック用の video carrier とその `video_url`/`source` オブジェクトから削除されます。OpenAI wire allowlist は厳格なまま維持されます。未知のネイティブ video carrier は引き続き利用可能であり、既知の text-only target では安全な marker が維持されます。構造化された redact 済みシャドウによって追加された transcript テキストが保護されますが、呼び出し元が所有する元のリクエストは変更されません。ネイティブ対応の target と無効化された bridge では、既存のバイパス動作が維持されます。

追加の保持コピーでは、同じ observed-request signal を使用します。raw pre-guardrail client-request snapshot、メモリ内の pending request、および早期に拒否されたリクエストのログでは、video parts 内の transcript フィールドを構造的に置き換えます。pipeline stage と context handoff によって合成された文字列プロンプトは、persisted-request-body sink で redact されます。永続化された `video_content_removed` marker により、`previous_response_id` による継続は fail closed となり、意図的に破棄されたテキストが再構築されることはありません。観測されたリクエストで、ログ記録前に per-part redaction shadow が失われた場合、または後続のリクエスト変更後に複数の video shadow のうち 1 つでも一致しなかった場合、部分的に redact された transcript を保持する代わりに、保持される request body 全体を省略します。

観測されたリクエストでは、モデルのレスポンスが構造化された cue の境界なしに transcript の任意の部分を引用する可能性があります。そのため、永続化される call-log の `responseBody` は omission marker に置き換えられます。詳細な pipeline artifact（上流/client の body や stream chunk を含む可能性があります）は保持されません。そのリクエストでは、semantic、idempotency、および reasoning-replay cache の読み取りと書き込みをバイパスします。provider request とクライアントから見える response は変更されません。詳細な artifact が省略される場合、初期の keepalive byte は一時バッファから排出されます。Kiro の malformed EventStream warning では payload の byte 数のみが報告され、内容や JSON parser の raw error は決して報告されません。
これは、無関係な provider/plugin diagnostic がすべて監査済みであることを意味するものではありません。より広範な retained-sink の全面的な調査は #11658 で追跡されています。

内部の `/api/modality-bridge/video/drilldown` lifecycle は、loopback/token 認証された別個の cache substrate です。すべての操作で、canonical な opaque principal ID も必要になります。production caller を有効にする前に、認証済み tenant からその ID を導出し、クライアントが選択した値を決して転送してはなりません。Cache key はその principal を canonical な session ID および video-reference ID にバインドし、それらから導出した SHA-256 key のみを保存します。また、読み取りと削除のスコープを同じ principal に限定します。Cache は各 entry あたり最大 16 個の導出済み JPEG frame を保存し、10 分後に期限切れにし、範囲を限定した `start`/`end` の読み取り、または明示的な session の削除をサポートします。

各 principal には、16 entry と 64 MiB の canonical JPEG data という制限が適用されます。これらの制限は、グローバルな 64 entry/256 MiB の上限とは独立しています。principal の quota が逼迫した場合は、グローバル LRU eviction が検討される前に、その principal の中で最も長く使用されていない entry のみが eviction されます。期限切れの entry は、cache のアクティビティ時に principal とグローバルの両方の accounting から除去されます。一方、キャンセルと validation failure によって部分的な置換が commit されることはありません。

キャッシュは、非正規の Base64、過剰なパディング、JPEG 以外のメディア、壊れている JPEG または途中で切り詰められた JPEG、そして上限付きの完全な画像 `sharp`
デコード中に警告が発生する JPEG を拒否します。受け入れた各画像は正規の JPEG として再エンコードされ、幅と高さは呼び出し元のフィールドを信頼せず、デコードされたバイトから導出されます。また、末尾にあるポリグロットバイトは保持せず破棄します。両方のクォータに対して計上されるのは、上限内の正規化された圧縮バッファだけです。JSON ワイヤー制限には、32 MiB のデコード済み入力上限に対応する Base64 のオーバーヘッドが含まれます。保存される各派生データには、検証済みの JPEG 形式と解像度、サンプリングポリシー、派生バージョン、作成時刻、サーバーが計算したコンテンツハッシュ、ハッシュ化された親参照、および信頼された呼び出し元の親コンテンツハッシュが記録されます。キャンセルは、非同期のデコード／ハッシュフェーズの間、およびアトミックなキャッシュコミットの前に確認されます。

本番のプロデューサーは、正常な視覚分析が完了した後に限り、すでに派生済みのブローカーフレームを再利用し、ビデオの再ダウンロード／再抽出は行いません。オペレーター設定の `modalityBridgeVideoDrilldownEnabled=true`、パートごとの厳密な `drilldown: true`、および認証済み API キーレコード ID が必要です。クライアントが宣言したプリンシパル／セッション値によって所有権が確立されることはありません。3 つの条件がすべて満たされない場合、追加フレームのハッシュ化、リサイズ、保持は行いません。保持に失敗しても、利用可能な視覚応答は維持されます。同意済みのリクエストではビデオ全体の結果キャッシュをバイパスするため、キャッシュされた結果からハンドルが再利用されることはありません。

成功した JSON および SSE レスポンスでは、上限付きの
`x-omniroute-video-drilldown` ヘッダーに不透明なハンドルを最大 4 個まで公開します。認可されたブラウザーオリジンは、CORS のオリジンポリシーを広げることなく、このヘッダーを読み取れます。新しいハンドルは
`v1.<32-byte random base64url
token>` 形式を使用し、レジストリにはその SHA-256 ハッシュだけが保持されます。読み取り処理／ヘッダーパーサーは、レガシー形式の 64 桁の 16 進トークンも受け付けます。認証済みの公開コンシューマーは
`GET /api/v1/video-bridge/drilldown?handle=...` であり、`modalityBridgeVideoDrilldownRemoteEnabled=true` によって独立してゲートされます。明示的に永続化された false は、レガシーの `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` 環境変数フォールバックが有効であってもアクセスを取り消します。本番の保持には、対応するレガシーの
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` フォールバックがあります。どちらのフォールバックもデフォルトではオフです。

コンシューマーは認証済みキーから所有権を導出し、キーのポリシーを適用します。GET と DELETE はどちらも `video` エンドポイントカテゴリに属し、`/v1` および `/api/v1` エイリアスも含まれます。空でないエンドポイント許可リストを持つキーには `video` が含まれていなければなりません。無制限のキーとの互換性は維持されます。コンシューマーは、未知のハンドル、期限切れのハンドル、別のキーが所有するハンドルに対して同じ 404 を返します。`variant=preview|standard|detail`（JPEG の最大寸法は 320/640/1280、拡大は行わない）、`limit=1..8`（またはレガシーの `frames` エイリアス。両方の同時指定は不可）、0 始まりの `page`、および任意の `start`／`end` フォーカス秒数を受け付けます。重複するクエリキーと、前後が逆になったフォーカスウィンドウは拒否されます。返される各バリアントには、実際のコンテンツのハッシュと実際の解像度メタデータが付与され、保持されたソースにリンクされます。バリアントは、保持する追加コピーとして保存されるのではなく、読み取り時に派生されます。Base64／エンベロープを含む JSON レスポンスの上限は 32 MiB です。ページが大きすぎる場合は 413 を返し、クライアントはフレーム数を減らしてリクエストする必要があります。読み取りでは各リサイズの前後でキャンセルを確認し、返却前にハンドルの有効性を再確認します。所有者による `DELETE` はべき等です。削除または TTL の期限切れにより、保持されたソースと使用量の計上が解放されます。

共有ストアはプロセスローカルです。再起動するとハンドルは期限切れになり、独立した OmniRoute プロセス間で移転することはできません。管理統計では、有効な保持／リモートポリシーと、保持されているエントリ数／バイト数の集計だけを公開し、メディア、参照、プリンシパル ID、ハンドルは決して公開しません。Video 設定パネルにはこれらの値が表示され、両方の同意スイッチを永続化できます。この実装ドキュメントは、稼働中のデプロイまたはプロモーションの証拠ではありません。実モデルによる受け入れ確認は別途追跡されます。

フレームには、設定された Video モデルを使用して順番にキャプションが付けられます。Video のオーバーライドが空の場合は Vision 設定を継承し、両方が空の場合は Vision のオートルーターが実効的な視覚対応モデルを選択します。成功したキャプションは元のパートを、安定した `[Video description:` プレフィックスで始まるテキストに置き換えます。このプレフィックスは、そのテキストが信頼できないメディア由来の観測であることも示し、メディア内で見つかった指示に従わないよう下流のモデルに伝えます。フレームキャプションのキャッシュキーには、JPEG バイト、プロンプト、タイムスタンプ、実効モデルが含まれ、成功したキャプションだけがキャッシュされます。キャッシュエントリには、フォールバックモデルを含む、実際に成功したプロデューサーモデルが保持されます。異なるフレームが異なるモデルによって生成された場合、ブリッジは `mixed` を報告します。キャッシュヒットでは、要求されたルーティング計画にラベルを付け直すのではなく、そのプロデューサー識別情報を再利用します。ビデオ全体の結果キャッシュは、出力を変更するすべての入力、すなわちプロンプト、実効モデル、サンプリングポリシー、フレーム数、セマンティック分析モード、正規化されたフォーカスヒントの SHA-256 フィンガープリント、フォーカスウィンドウ、`transcript`、`audioTranscript`、およびコンタクトシートフラグをキーに含めます。そのため、これらのいずれかを変更するとキャッシュミスになり、古い結果が再利用されることはありません。視覚重複排除ポリシーのバージョン、しきい値、上限付き候補フレーム数も結果キャッシュのキーとメタデータに明示されます。したがって、ポリシーが変更されると、古いビデオ全体の説明を再利用できません。結果キャッシュ v4 のメタデータにはモードとフィンガープリントが保持され、元のユーザータスクは決して保持されません。ガードレールのメタデータには、要求された分析モードと実効的な分析モードの両方が報告されます。利用可能なユーザーテキストがない状態で `focused` モードが要求された場合は、実効的には `full` と報告されます。

ガードレールは、サポート対象の動画パートをすべて抽出しますが、説明するのは
`modalityBridgeVideoMaxVideos` 個までです。`supportsVideo === false` であることが
確認されたターゲットでは、失敗した動画および上限を超えた動画は明示的な安全な
テキストマーカーになり、生の動画が残らないようにします。機能が不明な場合、これらの
パートは動画キャリアを保持し、フォールバックトランスクリプトがある場合は、前述の
上限付きテキスト変換に従います。`supportsVideo === true` のターゲットはブリッジを
バイパスします。
クライアントのリクエスト中止シグナルは、ダウンロード、ブローカーキュー、
サブプロセス、キャプション呼び出しを通じて伝播します。中止は動画間で停止し、
生メディアへのフェイルオープンは決して行いません。

ランタイム設定は DB に保存され、Zod によって検証されます。

| Key                                 | Default     | Range / behavior                                                                                            |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 任意のランタイム、オプトイン                                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` は汎用キャプションを保持し、`focused` は制限された信頼できない最新ユーザーコンテキストを使用         |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge モデルを継承                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware`、または比例方式の `segment_aware`。検出に失敗した場合は `uniform` にフォールバック |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                              |

永続化された従来の Video タイムアウト値が 120 秒を超えている場合は、
ブローカーの期限まで切り詰められます。新しい設定の書き込みでは、その上限を超える値は
拒否されます。
`GET /api/modality-bridge/video/runtime` は、認証またはランタイムのプロービングより前に、
信頼できるスタンプ付きのループバック・ローカリティを要求し、その後、管理用認証を要求します。
返すのは `available`、サニタイズ済みの FFmpeg/ffprobe バージョン、およびランタイムが
利用できない場合の固定理由のみです。内部抽出エンドポイントは公開アップロード API
ではありません。キューが飽和した場合は `503` と `Retry-After` を返し、呼び出し元が
切断した場合は `499` を返し、固定ブローカー期限に達した場合は `504` を返します。
変換済みレスポンスは、Vision または Audio セグメントを削除せずに、中央の
`x-omniroute-modality-bridge` ヘッダーへ
`video->text;model=<visionModel>;parts=<videos>` を追加します。

### PII マスカー（`piiMasker.ts`）

**両方**のステージで実行されます。

- **`preCall`** はペイロードを複製し、`system`、`messages`、`input`、および
  `prompt`（プレーン文字列の項目を含む）を走査して、文字列の `content`/`text` フィールドに
  `@/shared/utils/inputSanitizer` の `processPII()` を適用します。
  `PII_REDACTION_ENABLED=true` の場合、検出された PII は送信ペイロード内で
  レダクションされます。これは `INPUT_SANITIZER_MODE`（プロンプトインジェクション
  ポリシーのみを制御）とは独立しています。レダクションがオフの場合、呼び出しでは
  コンテンツを書き換えずに検出数を記録します。
- **`postCall`** はレスポンスをディープコピーし、`sanitizePIIResponse()` と
  Responses API 形式のマスカー（`maskResponsesOutput` — `output_text` および
  `output[].content[].text` を対象）を実行します。レダクションが発生した場合、
  変更されたレスポンスが元のレスポンスに置き換わります。

ガードレールは決してブロックせず、注釈を付ける（`meta.detections`、
`meta.redacted`）か、書き換えるだけです。

#### タイプごとの選択、カスタムパターン、検出カウンター

**ダッシュボード → 設定 → セキュリティ → PII マスキング**では、_何を_マスクするかを
選択します。マスキング自体を有効にするものではありません。有効化は引き続き
`PII_REDACTION_ENABLED`（リクエスト）および `PII_RESPONSE_SANITIZATION`（レスポンス + SSE）
で行い、どちらもデフォルトではオフです。

- **タイプごとの選択** — 組み込み ID は
  `src/shared/constants/piiTypes.ts`（`PII_BUILTIN_TYPES`）に一覧化されています。
  未設定の場合はすべてのタイプが対象です（この設定が存在する前の動作）。
  リクエストエンジンの `ssn_us` パターンは `ssn` にマッピングされます。
  テンプレート（Minimal、Standard、Financial、Brazilian、USA、GDPR、POPIA、Full）は、
  UI のチェックボックスに値を入力するだけです。
- **GDPR および POPIA の識別子** — EU および南アフリカの個人識別子を対象とする
  12 個の組み込み ID です（下表）。それらの正規表現、バリデーター、管轄区域タグは、
  `src/shared/utils/piiPatterns.ts` の 1 つのテーブルに定義されており、レスポンス
  サニタイザー（`src/lib/piiSanitizer.ts`）とリクエストマスカー
  （`src/shared/utils/inputSanitizer.ts`）の両方が使用します。マッチはバリデーターが
  受け入れた場合にのみレダクションされます。数字だけの単なる並びでは十分ではありません。
  これらの ID が存在する前に絞り込んだ選択を保存したオペレーターは、新しい ID に
  チェックを入れるまで、以前の動作を維持します。
- **カスタムパターン** — 最大 20 個の正規表現またはワイルドカードパターン
  （`*` = 空白以外の最大 64 文字、`?` = 1 文字）を指定できます。マッチした部分は
  `[CUSTOM_REDACTED]` になります。
  すべてのパターンは `compilePiiCustomPattern()`
  （`src/shared/utils/piiCustomPatterns.ts`）を通過します。最大 500 文字で、
  フラグは `g i m s u` に制限され、コンパイルに成功し、`safe-regex`（壊滅的な
  バックトラッキング）に合格し、空文字列またはレダクションプレースホルダーに
  マッチしてはなりません。失敗するパターンは保存時およびテスト時に拒否され、
  保存済みの行が失敗する場合は、コンパイルせずにランタイムでスキップされます。
  カスタムパターンはマスキングがオンの場合にのみ実行されます。
- **検出カウンター** — タイプごとの件数（マッチした値は記録しない）はメモリ上に保持され、
  再起動時にリセットされます（`src/lib/pii/piiDetectionStats.ts`）。マスキングがオンの
  場合にのみ増加します。

設定は `key_value` テーブル（namespace `pii_settings`、
`src/lib/db/piiSettings.ts`）に保存され、1 秒のキャッシュを通じて読み取られます。API:

| Method | Path                     | Purpose                                                                       |
| ------ | ------------------------ | ----------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | フラグの状態、`enabledTypes`、`customPatterns`、検出カウンター                |
| `PUT`  | `/api/settings/pii`      | `enabledTypes`（`null` = すべて）および/または `customPatterns` を置換        |
| `POST` | `/api/settings/pii/test` | 最大 8 KB のサンプルに対して 1 つのパターンをドライラン実行。何も保存されない |

3 つすべてで管理認証が必要であり、本文は Zod
（`src/shared/validation/schemas/piiSettings.ts`）で検証されます。ログインが無効
（`requireLogin=false`）の場合、`GET` とテストエンドポイントは公開されますが、`PUT` には引き続き
ダッシュボードセッション、`manage` スコープの API キー、書き込みスコープ以上を持つ
`oma_` アクセストークン、またはループバックから送信された CLI トークンか内部サービス
トークンが必要です。

#### GDPR（EU）および POPIA（南アフリカ）の識別子

| Id                  | Identifier               | Validation                                                                                    |
| ------------------- | ------------------------ | --------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | 既知の国、その国の正確な長さ、ISO 13616 MOD-97-10                                             |
| `eu_vat`            | EU VAT number            | 既知の加盟国プレフィックスと、その国の番号形式（VIES 参照なし）                               |
| `es_dni_nie`        | Spanish DNI / NIE        | 管理文字（値 mod 23）。NIE は `X/Y/Z` + 7 桁                                                  |
| `it_codice_fiscale` | Italian Codice Fiscale   | 奇数/偶数位置のテーブルに基づく管理文字                                                       |
| `pl_pesel`          | Polish PESEL             | 重み付きチェックサムと、実在する生年月日のエンコード                                          |
| `nl_bsn`            | Dutch BSN                | 11-proof（重み 9..2、-1）                                                                     |
| `de_steuer_id`      | German Steuer-ID         | ISO 7064 Mod 11,10 に加え、数字構造の規則（先頭 0 は不可）                                    |
| `se_personnummer`   | Swedish personnummer     | 下 10 桁に対する Luhn と、妥当な生年月日（10 桁または 12 桁）                                 |
| `za_id`             | South African ID number  | 13 桁すべてに対する Luhn、妥当な誕生月/日、市民権を示す数字が 0 または 1                      |
| `za_phone`          | South African phone      | `+27` / `27` プレフィックス、またはスペースかハイフンで記述された国内形式の `0..`             |
| `za_vat`            | South African VAT number | `4` で始まる 10 桁の数字 **および** その前の 48 文字内に "VAT" / "BTW" があること             |
| `za_tax_ref`        | South African tax ref.   | `0`-`3` で始まる 10 桁の数字、Luhn、**および** その前の 48 文字内に "tax" / "SARS" があること |

数字だけの形式は注文番号、ビルド番号、タイムスタンプと衝突するため、最も弱いもの
（`za_vat`、`za_tax_ref`）にはキーワードの手がかりが必要であり、裸の 10 桁の `0..`
番号は南アフリカの電話番号として扱われません。スペースで区切られた IBAN（`GB29 NWBK ...`）は
一致しません。ストリーミングパスでは、手がかりは現在のチャンク内でのみ検索されます。ID は汎用的な電話番号
パターンより前に配置されるため、検証済みの識別子はそれぞれ独自のプレースホルダー
（`[IBAN_REDACTED]`、`[NL_BSN_REDACTED]`、...）を保持します。`gdpr` および `popia` テンプレートは、
それぞれ EU と南アフリカの ID を選択します。マスキング自体は引き続きオプトインです
（Hard Rule #20）。ここでの変更によって機能フラグのデフォルトが変わることはありません。

### プロンプトインジェクション（`promptInjection.ts`）

ユーザーが提供したコンテンツ内の敵対的な構造を検出し、設定されたポリシーを適用します。
動作は環境変数とコンストラクターオプションによって決まります。

| Setting          | Env var                                                                                               | Default | Effect                                                                                                                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 有効             | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | `false` の場合、ガードレールは短絡終了します。                                                                                                                                                                                 |
| モード           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | インジェクションポリシー: `block`、`warn`、または `log`。（`redact` は後方互換性のため受け入れられますが、インジェクションテキストは除去しません。リクエストの PII 書き換えは `PII_REDACTION_ENABLED` によって制御されます。） |
| ブロックしきい値 | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | ブロックに必要な最小重大度。デフォルトでは medium は観測のみです。                                                                                                                                                             |

**モードの優先順位**（`getMode`）: 呼び出し元の `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override**（ダッシュボード → 設定 →
Feature Flags）→ `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`。したがって、ダッシュボードのオーバーライドは env vars より優先され、Feature
Flags UI で実行中のガードを即時に制御できます（再起動不要）。DB の読み取りはフェイルセーフです。
エラーが発生した場合、ガードは env ベースの動作にフォールバックし、オーバーライドが設定されていない場合の動作は
env のみで解決した場合と同一です。

検出ソース:

1. `sanitizeRequest()` from `@/shared/utils/inputSanitizer`（パイプラインの他の箇所でも使用される共有検出器セット）。
2. 組み込みの `DEFAULT_GUARD_PATTERNS`（現在は `system_override_inline` と
   `markdown_system_block` の両方が `high` 重大度）。
3. コンストラクターオプション経由で渡される任意の `customPatterns`（文字列、正規表現、
   または `{ name, pattern, severity }` レコード）。

`mode === "block"` **かつ少なくとも 1 件の検出結果が重大度のしきい値を満たす場合**、`preCall` は `{ block: true, message: "Request rejected:
suspicious content detected" }` を返します。`warn`/`log` モードではガードレールがログを記録しますが、呼び出しは許可します。共有ヘルパーの `evaluatePromptInjection()` もエクスポートされており、レジストリを経由せずにプロンプトを評価する必要がある呼び出し元から利用できます。

**スキャン上限（v3.8.20）：** 検出器は結合されたプロンプトテキストの**最初の 16 KB** のみを検査します — `src/shared/utils/inputSanitizer.ts` の `MAX_INJECTION_SCAN_BYTES = 16 * 1024`（16,384 バイト）。`detectInjection()` と
`evaluatePromptInjection()` はどちらもパターンループを実行する前に `slice(0, MAX_INJECTION_SCAN_BYTES)` を適用します。インジェクションディレクティブは入力の先頭付近に置かれるため、これにより検出精度を損なうことなく、数百 KB のペイロードに対する正規表現の CPU／GC 使用量を抑えられます（#3932、#4041 を参照）。

### Credential Masker (`credentialMasker.ts`)

**両方のステージ**で実行され、デフォルトチェーンの最後（優先度 `95`）に配置されます。送信ペイロード（メッセージコンテンツ、ツール呼び出しの引数、ツール結果）**および**プロバイダーのレスポンスから、既知の API キー／シークレットトークンのパターンを秘匿化します。これにより、プロンプトに貼り付けられた認証情報（またはツール結果によってそのまま返された認証情報）がアップストリームのプロバイダーやクライアントに漏洩することを防ぎます。

- **オプトインのみ**で、PII の秘匿化と同じ規約（Hard Rule #20 に近いもの）に従います。`settings.credentialRedactionEnabled === true` **または**
  `CREDENTIAL_REDACTION_ENABLED=true` の場合を除き無効です。無効の場合、ガードレールは何もしません — ブロックも書き換えも行いません。
- `redactCredentials()` はペイロード／レスポンスツリー全体を走査し（`walkValue()`、プロトタイプ汚染に安全で、`WeakSet` により循環参照にも対応）、一致した値を `[REDACTED:<type>]` プレースホルダーに置き換えます。実際に変更されたブランチのみを複製します。
- `CREDENTIAL_PATTERNS` は、LLM プロバイダーのキー（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS／SaaS トークン（GitHub、Slack、
  Linear、Notion、npm、Postman、Discord）、決済キー（Stripe、Square）、クラウド
  キー（AWS アクセスキー、Twilio、SendGrid、Mailgun）、秘密鍵／JWT、
  認証情報を含む接続文字列（`mongodb://user:pass@...` など）、および汎用的な
  `Authorization`／`x-api-key`／`api-key`／`apikey` ヘッダー値パターンを対象とします。
  ヘッダー形式のキー（`authorization`、`x-api-key`、`api-key`、
  `apikey`）は、汎用テキスト正規表現ではなく構造的に（値のみを対象とし、
  `Bearer `/`Basic ` などのスキーム接頭辞は保持して）秘匿化されます。
- ガードレールは決してブロックせず、書き換え（`modifiedPayload` /
  `modifiedResponse`）と注釈付け（`meta.credentialsRedacted`、`meta.count`）のみを行います。

リグレッションガード：`tests/unit/credential-masker-guardrail.test.ts`】【。

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
