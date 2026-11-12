# CORS Configuration & Security (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute制御するのは**ブラウザの起源**単一の集中化されたホワイトリストからクロスオリジン応答を読み取ることができます。モデルは**デフォルトでフェールクローズされる**: オプトインするまでオリジンは許可されません。このページでは、ホワイトリストがどのように解決されるか、 `CORS_ALLOW_ALL=true`実際に何を公開するか (そして重要なことに、それが何をするのか) について説明します。**ない**）、開発と運用を安全に構成する方法、ワイルドカードが有効な場合にダッシュボードに表示されるランタイム警告について説明します。

**真実の情報源:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`、 `applyCorsHeaders`、 `getCorsStatus`)。ホワイトリストはミドルウェア (`src/server/authz/pipeline.ts`) で一度適用されます—ルートごとのハンドラーは`Access-Control-Allow-Origin`自体を設定しません。

## 原点の解決方法

リクエストごとに、ミドルウェアは次の順序で`Access-Control-Allow-Origin`値を計算します。

1. **`CORS_ALLOW_ALL=true`** (または従来の`CORS_ORIGIN=*`) →呼び出し元の`Origin` (または`Origin`ヘッダーがない場合は`*` ) をエコー バックし、 `Vary: Origin`を使用するため、キャッシュは正確なままになります。同じ`applyCorsHeaders()`チョークポイントは、トークン認証された`/v1*`/`/v1beta*`サーフェス上のすべての 2xx-with-body 応答に`Vary: Accept-Encoding`追加するため (`relaxForTokenAuth`、 RFC 9110 §12.5.5、発行#6737)、 downstream/sharedキャッシュは圧縮バリアントと非圧縮バリアントを正しく区別できます。
2. それ以外の場合、リクエスト`Origin`は正規化され (小文字、末尾のスラッシュが削除され)、**統合された許可リスト**:
   - 環境**`CORS_ALLOWED_ORIGINS`** —カンマ区切りリスト、および
   - ランタイム**`corsOrigins`**設定 (ダッシュボード→セキュリティ→ _CORS 許可オリジン_)、 `src/lib/config/runtimeSettings.ts`から`setRuntimeAllowedOrigins()`経由で挿入されます。
3. 一致する→ありません**`Access-Control-Allow-Origin`ヘッダーは出力されません**。ブラウザはクロスオリジン読み取りをブロックします。これは意図されたフェールクローズのデフォルトです。

| 環境変数               | 意味                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | 正確な起源のCSVを許可します (推奨)。                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` →任意のオリジン (ワイルドカード) をエコーします。開発のみ。              |
| `CORS_ORIGIN`          | 遺産。 `*` `CORS_ALLOW_ALL`のように動作します。単一の値が許可リストに追加されます。 |

## `CORS_ALLOW_ALL=true`が実際に暴露する脅威モデル—

一般的なOWASP警告 (「ワイルドカードCORS =どのサイトでもAPIを呼び出すことができる」) は真剣に受け止める価値がありますが、 OmniRouteの暴露は**一般的なケースより狭い**1 つの具体的な実装事実があるためです。

> **中央の`applyCorsHeaders()` `Access-Control-Allow-Credentials`を発行しません。**サーバーが`Access-Control-Allow-Credentials: true`を送信しない限り、ブラウザーは _credentialed_ (Cookie を含む) クロスオリジン応答を公開しません。 OmniRouteの共有CORSパスは決してそうではありません。

`CORS_ALLOW_ALL=true`使用した場合でも、サーフェスごとにそれが何を意味するか:

| 表面                                      | 認証メカニズム                | ワイルドカードCORSの効果                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ダッシュボード / MANAGEMENT `/api/*`      | クッキーセッション            | 原点は響きますが、**`Allow-Credentials`なし**ブラウザ**ブロック**認証された読み取り。悪意のあるクロスオリジン サイト**読めない**認証されたダッシュボード応答があれば、セッション Cookie は公開されません。                                                                                                                                                                                                                                                                                |
| クライアントAPI `/v1/*`、 `/v1beta/*`     | ベアラー/ `x-api-key`ヘッダー | すでに寛容**設計上**(`relaxForTokenAuth`): ブラウザは`Authorization`/`x-api-key`を自動的にアタッチしないため、攻撃者のページはキーを提供できません。緩和されたエコーには、資格情報ヘッダーだけでなく、認証されたサブジェクト (検証されたAPIキーまたはダッシュボード セッション) が必要であり、 `Access-Control-Allow-Credentials`は決して含まれません。匿名応答 (`REQUIRE_API_KEY=false`) は、明示的な`CORS_ALLOW_ALL=true`オプトインを含む、構成された送信元ホワイトリストを使用します。 |
| パブリック読み取り専用 (`/api/health`、…) | なし                          | 非敏感。ワイルドカードは無害です。                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

それで、**残留物**`CORS_ALLOW_ALL=true`の公開は以下に限定されます: (a) 認証されていないクロスオリジン**読む**すでに認証されていないデータの保存、および (b) CORSに許可**プリフライトパス**管理ルート—では、依然としてクロスオリジン ページでは提供できない認証が必要です。それは**ない**共有CORSパス上のセッション ハイジャックまたは資格情報盗難ベクトル。

### 本物の例外— `/api/v1/agents/` 1 つ

Cloud-Agent ルート (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) は、**自分の**CORSヘッダー (`src/lib/cloudAgent/api.ts`、 `getCloudAgentCorsHeaders`) および**する**`Access-Control-Allow-Origin: <origin>|*` `Access-Control-Allow-Credentials: true`と一緒に発行します。これは、オリジンエコーと資格情報が共存する単一のサーフェスであり、**`CORS_ALLOW_ALL`から独立した**。これらのルートは管理認証 (`requireManagementAuth`) されています。オフホストでダッシュボードを公開するオペレーターは、これが応答ヘッダーによってクロスオリジン認証情報の読み取りが許可される唯一の場所であることを認識する必要があります。明示的な許可リストへの厳格化は、このCORSガイダンスとは別に追跡されます。

## 製作チェックリスト

- **運用環境では決して`CORS_ALLOW_ALL=true`を設定しないでください。**未設定のままにしておきます。
- を設定します**明示的な**オリジン リスト—環境変数または [セキュリティ] タブ フィールドのいずれか:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRouteリバース プロキシ/トンネル (nginx、Caddy、 Cloudflareトンネル、 Tailscale) の背後で実行されている場合、 CORSは**ない**唯一の制御—ループバック ルート ガードであり、スポーン可能なルートを保護します ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)参照)。 403 を「修正」するために`X-Forwarded-For: 127.0.0.1`偽造しないでください。これにより、ルート ガードが閉じたRCEクラスが再び開きます。
- 実行時の状態を確認します。ダッシュボードに**永続的な琥珀色のバナー**`CORS_ALLOW_ALL=true`がライブであり、 `/api/settings/authz-inventory` `cors: { allowAll, allowedOrigins }`エンベロープを返すたびに、ダッシュボード→セキュリティ→認証インベントリで監視ツールがポーリングできます。

## 開発上の利便性—特定のローカル起源が許可される

開発環境でもワイルドカードが必要になることはほとんどありません。使用する開発サーバーのみを許可します。

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

オリジンは大文字と小文字を区別せずに末尾のスラッシュを無視して照合されるため、 `http://localhost:3000`と`http://localhost:3000/`は同等です。同じCSV実行時に設定できます。**ダッシュボード→セキュリティ→ CORS許可されたオリジン**再起動せずに。

## APIキーと Cookie セッションの比較

- **ベアラー / `x-api-key` ( `/v1/*`推論面):**ブラウザがこれらを自動的に添付することはありません。ここでは、 CORSは意味のあるバリアではありません— APIキーはバリア—です。そのため、その表面は意図的に許可されており、ブラウザーとElectronクライアントはすでに権利を持っている応答を読み取ることができます。緩和されたエコーには、資格情報ヘッダーだけでなく、認証されたサブジェクト (検証されたAPIキーまたはダッシュボード セッション) が必要であり、 `Access-Control-Allow-Credentials`は決して含まれません。匿名応答 (`REQUIRE_API_KEY=false`) は、明示的な`CORS_ALLOW_ALL=true`オプトインを含む、構成された送信元ホワイトリストを使用します。認証拒否 (401) は読み取り可能なままであるため、クライアントは取り消されたキーまたはタイプミスされたキー (#5242) を表面化できます。パイプライン自体の 401 はエコーを保持し、パイプラインが匿名として提供した後にキー自体を拒否するルート (管理認証が設定された`/v1/models`および`/v1beta/models` 、所有者スコープの`/v1/files`、 `/v1/batches`、 `/v1/media`、 `/v1/session-leases`および自動コンボ候補ルート) にエコーを追加します。 `credentialRejectionHeaders()`経由の 401 。エコーは、ルートがチェックされたヘッダー (`Authorization`、 `x-api-key`、 `x-goog-api-key`または`auth_token` Cookie) を運ぶリクエストに基づいてキー設定され、 `Access-Control-Allow-Credentials`とペアになることはありません。本体は固定エラー エンベロープです。 `requireManagementAuth()`によって保護された`/api/v1/`下の管理ルート (`/api/v1/management/*`、 `/api/v1/registered-keys`、 `/api/v1/providers/[provider]/limits`、 `/api/v1/accounts/[id]/limits`、 `/api/v1/issues/report`) は、この資格情報拒否例外を使用しません。 `REQUIRE_API_KEY=false`では、その401/403応答は、設定されたCORSオリジン ポリシーに従います。
- **Cookie セッション (ダッシュボード):**フェールクローズのデフォルトで保護されています**そして**共有パス上に`Access-Control-Allow-Credentials`が存在しないことが原因です。 management/dashboardオリジンを許容的な構成から遠ざけてください。正確にフェールクローズ状態を維持する必要があります。

## WebSocketハンドシェイク (`/v1/responses`、 `/v1/ws`)

ブラウザーはCORS WebSocketに適用しないため、推論出力を返すWebSocketトランスポートは、ハンドシェイク`Origin`自体 (`src/server/origin/wsOrigin.ts`)、つまり応答WebSocket (`/v1/responses`)、およびOmniRoute `npm start` / `npm run dev`を介して実行される場合、 `/v1/chat/completions`、 `/v1/messages`および`/v1/responses`フレームとしてストリーミングする`/v1/ws`および`/api/v1/ws`ブリッジをチェックします。ブリッジは`/api/v1/ws?handshake=1`に判定を求め、そのルートがチェックを実行しない限りアップグレードを拒否します。認証要件は引き続き別途適用されます。原点チェックは次の場合に合格します。

- `Origin`ヘッダー (Codex CLI、 SDKsおよびその他の非ブラウザー クライアント) はありません。
- `Origin`は上記の許可リスト (`CORS_ALLOWED_ORIGINS`、 `corsOrigins`設定、 `CORS_ORIGIN`、 `CORS_ALLOW_ALL`) によって許可されます。
- `Origin`は、 OmniRoute自身のパブリック オリジン (構成済みのパブリック ベースURL、信頼できるプロキシの転送オリジン、またはダッシュボードの変異チェックで使用されるのと同じ候補であるIPリテラルまたは`localhost` —として指定される直接loopback/LANホスト) の 1 つです。または
- HTTP `/v1/*`サーフェスと同様に、有効なAPIキーが保持されます。

それ以外のものは何でも得られます `403 ws_origin_forbidden`。ダッシュボード セッション Cookie は外部のセッションを免除しません。 `Origin`ブラウザがそれを任意のページのソケットに接続するためです。 `localhost` 別のポートでは同一オリジンとして扱われません。そのような開発元を追加します `CORS_ALLOWED_ORIGINS`.

## 例: OmniRouteの前のリバース プロキシ

CORSはOmniRoute自体によって強制されるため、プロキシは通常、**ない**`Access-Control-*`ヘッダーを追加または書き換えます (二重ヘッダーはブラウザーを破壊します)。 TLSを終了し、 —を転送して、 OmniRouteプリフライトに応答できるようにします。

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

許可されるブラウザーの起点は、プロキシではなく、 OmniRoute (`CORS_ALLOWED_ORIGINS`または [セキュリティ] タブ) で設定します。

## ソースファイル

| 懸念                                                   | ファイル                                                             |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| ホワイトリストの解決+ `getCorsStatus()`                | `src/server/cors/origins.ts`                                         |
| ミドルウェア アプリケーション (唯一の信頼できる情報源) | `src/server/authz/pipeline.ts`                                       |
| →ランタイム オリジン インジェクションの設定            | `src/lib/config/runtimeSettings.ts`                                  |
| ダッシュボードの実行時のステータス                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| ダッシュボードの警告バナー                             | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS許可されたオリジンフィールド                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| クラウドエージェントのルートごとのCORS (例外)          | `src/lib/cloudAgent/api.ts`                                          |
| WebSocketハンドシェイク`Origin`チェック                | `src/server/origin/wsOrigin.ts`                                      |

## こちらも参照

- [ルート ガード層](./ROUTE_GUARD_TIERS.md)生成可能なルートに対する—ループバックの適用 (別個の補完的な制御)。
- [認可ガイド](../architecture/AUTHZ_GUIDE.md)—完全な認証パイプライン。
