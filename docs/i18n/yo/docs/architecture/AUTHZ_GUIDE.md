# Authorization Guide (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Orísun òtítọ́:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Ìgbà tó kẹ́yìn tí wọ́n ṣe àtúnṣe:** 2026-09-22 — àwọn orúkọ ààyè ìpele tọ́ka sí MCP-SERVER.md

OmniRoute ní ọ̀nà ìfọwọ́sí tó mọ ọ̀nà tó máa ń ṣàkóso gbogbo ìbéèrè API. Ìsọ̀rí jẹ́ **tí a lè pinnu** àti **tí kò lè kùnà** — ohunkóhun tí kò bá lè ṣe ìsọ̀rí yóò di `MANAGEMENT` yóò sì béèrè ìgbà kan tàbí àmì ìpele ìṣàkóso. Ojúewé yìí ṣàlàyé àwòrán fún àwọn onímọ̀-ẹ̀rọ tó ń tọ́jú àwọn ọ̀nà tàbí tó ń ṣe àwọn ibi ìparí tuntun.

![Ọ̀nà AuthZ (àwọn ìpele ọ̀nà 3 + ìṣàyẹ̀wò ètò)](../diagrams/exported/authz-pipeline.svg)

> Orísun: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Àwọn Ọ̀nà Ìfàṣẹsí Méjì

### 1. API Key (Bearer)

A máa ń lò ó fún àwọn API oníbàárà tó bá OpenAI/Anthropic/Gemini mu àti àwọn ọ̀nà ìṣàkóso díẹ̀ nígbà tí kọ́kọ́rọ́ náà bá ní ààyè `manage`.

```
Authorization: Bearer <api-key>
```

`isValidApiKey()` / `extractApiKey()` nínú `src/sse/services/auth.ts` ló ń fìdí rẹ̀ múlẹ̀, a sì tún ń gbé wọn jáde láti inú `src/shared/utils/apiAuth.ts`. Olùdánwò náà tún gba àwọn oníbàárà ayérayé passthrough `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` gẹ́gẹ́ bí àwọn àyípadà àyíká (issue #1350).

### 2. Dashboard Session (auth_token cookie)

Fún àwọn ojúewé dashboard àti àwọn iṣẹ́ alákóso.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kúkì kan jẹ́ session kìkì nígbà tí JWT bá jẹ́rìísí **àti** tí ó bá ní `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Gbogbo
olùmúlò kúkì náà (olùṣọ́ ọ̀nà dashboard (`isDashboardSessionAuthenticated()`), àtúnṣe authz pipeline, ìbánisọ̀rọ̀ WebSocket, server ìgbàlódì, `/api/settings/require-login`, `/api/auth/status`) máa ń gba olùrànlọ́wọ́ yẹn kọjá.
Àwọn JWT mìíràn tí a fọwọ́ sí pẹ̀lú `JWT_SECRET` wà — Cursor CLI passthrough máa ń ṣẹ̀dá
`iss "omniroute" / aud "cursor-cli"` tokens fún àwọn tó ní kọ́kọ́rọ́ — wọn kò sì jẹ́ sessions láéláé
(#13298).

`isDashboardSessionAuthenticated()` nínú `src/shared/utils/apiAuth.ts` ló ń jẹ́rìísí rẹ̀. Pipeline náà máa ń tún JWT ṣe láìfọwọ́kan nígbà tí ó bá kù díẹ̀ sí ọjọ́ 7 nínú àkókò ìgbésí ayé ọjọ́ 30 rẹ̀.

Session kan tún lè parí kí ọjọ́ 30 rẹ̀ tó pé, nítorí pé gbogbo olùṣẹ̀dá rẹ̀ máa ń gba `mintDashboardSessionToken` kọjá (àkókò ìṣẹ̀dá `iat` àti id `jti`) àti pé olùdánwò náà máa ń ṣàyẹ̀wò àwọn setting méjì: `sessionsValidAfter`, tí a ṣètò lẹ́yìn ìyípadà ọ̀rọ̀ aṣínà kí gbogbo session tí a ṣèdá ṣáájú rẹ̀ má bàa tún jẹ́rìísí (àwòrán aṣàwákiri tó yí ọ̀rọ̀ aṣínà padà máa ń gba kúkì tuntun), àti `revokedDashboardSessions`, sí èyí tí `POST /api/auth/logout` máa ń fi `jti` session tí a jáde kúrò sínú. Àwọn session tí a ṣẹ̀dá nípasẹ̀ ìtújáde àgbà kò ní claim kankan nínú méjèèjì wọ̀nyí, wọ́n á sì wà ní ìmúlò títí di ìyípadà ọ̀rọ̀ aṣínà àkọ́kọ́. Tí a kò bá lè ka àwọn setting náà, a kò gbẹ́kẹ̀lé session náà.

Àwọn ọ̀nà ìṣàkóso kan máa ń gba **ọ̀nà méjèèjì**: kúkì tàbí `Bearer <key>` nígbà tí kọ́kọ́rọ́ API bá ní ààyè `manage` (tàbí `admin`). Èyí ni ó mú kí ìṣàn iṣẹ́ “configurable via API calls” tí a fi kún un nínú v3.8 ṣiṣẹ́.

#### Àlẹ̀ OIDC tí a lè yàn (#6973)

Wíwọlé alákóso dashboard tún ṣe àtìlẹ́yìn fún ìṣàn OIDC (OpenID Connect) tí a yan láti mú ṣiṣẹ́
pẹ̀lú wíwọlé ọ̀rọ̀ aṣínà àìyípadà — a kò yọ wíwọlé ọ̀rọ̀ aṣínà kúrò láéláé, a kàn
fikún un:

- Ó jẹ́ pípa ayafi tí `settings.oidcEnabled === true` **àti** tí `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` bá ti jẹ́ títò gbogbo wọn (Ètò → Ìfàṣẹsí).
  `GET /api/auth/oidc/login` yóò dá `400` padà bí bẹ́ẹ̀ kọ́.
- `GET /api/auth/oidc/login` máa ń ṣàwárí `authorization_endpoint` láti inú
  `/.well-known/openid-configuration` olùfúnni (ó máa ń lo
  `<issuer>/authorize` gẹ́gẹ́ bí àfirọ́pò), ó máa ń kọ URI àtúnjúwe láti inú ìbéèrè
  tó wọlé (pẹ̀lú ìmọ̀ nípa `x-forwarded-proto`), ó sì máa ń darí lọ sí IdP pẹ̀lú `state`
  aláìlẹ́sẹ̀-n-lẹ́sẹ̀ tí a fi pamọ́ sínú kúkì `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` máa ń fìdí `state` múlẹ̀, ó máa ń pàrọ̀ kóòdù ìfàṣẹsí,
  ó sì máa ń ṣàyẹ̀wò ìfọwọ́sí tókeni ID nípasẹ̀ JWKS olùfúnni
  (`createRemoteJWKSet` ti `jose`, tí a fi pamọ́ sínú àpamọ́ fún URI JWKS kọ̀ọ̀kan) pẹ̀lú àwọn àyẹ̀wò `issuer`/`audience`.
  Gbígba wọlé sí dasibodu nílò àtòjọ `oidcAllowedSubjects` tí kò ṣófo,
  ìlànà `oidcAdmissionClaim`, tàbí àwọn méjèèjì. Àtòjọ subject náà bá `sub` tàbí
  `email` mu kìkì nígbà tí `email_verified === true`. Ìlànà claim àṣàyàn náà gba
  ipa claim tókeni ID tí a pín pẹ̀lú àmì dọ́ọ̀tì (fún àpẹẹrẹ, `realm_access.roles`) àti
  array àwọn iye tí a gbà; claim tí a yanjú gbọ́dọ̀ jẹ́ array àwọn okun ọ̀rọ̀
  tó ní ó kéré tán iye kan tí a gbà. Bí a bá ti ṣètò àwọn ìlànà méjèèjì,
  àwọn méjèèjì gbọ́dọ̀ yege. Claim tí kò sí tàbí tí ìrísí rẹ̀ kò tọ́ yóò fa ìkọ̀sílẹ̀,
  àti pé láìsí èyíkéyìí nínú àwọn ìlànà náà callback yóò kọ ìwọlé (`not_configured`).
  Àwọn ìṣètò tó dá lórí subject nìkan tí ó ti wà tẹ́lẹ̀ yóò tẹ̀síwájú láìyípadà.
- Keycloak sábà máa ń so àwọn ipa realm pọ̀ mọ́ access token, kì í ṣe dandan mọ́ ID
  token. Láti béèrè ipa realm `admin`, ṣètò protocol mapper fún
  client yìí tó fi `realm_access.roles` sínú **ID token** rẹ̀, lẹ́yìn náà ṣètò
  `oidcAdmissionClaim` sí `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Ṣàyẹ̀wò claim ID-token gangan fún client yìí kí o tó mú gbígba-wọlé tó dá lórí ipa nìkan
  ṣiṣẹ́; application náà kì í ka àwọn ipa access-token. Ìkọ̀ tí IdP ṣe sí token
  lè ṣàfikún sí àyẹ̀wò ẹ̀gbẹ́ application yìí, ṣùgbọ́n kò lè rọ́pò rẹ̀.
- Nígbà àṣeyọrí, ó máa ń dá JWT `auth_token` ọjọ́ 30 **kan náà gan-an** tí ìwọlé
  pẹ̀lú ọ̀rọ̀ aṣínà ń dá jáde (`src/app/api/auth/login/route.ts`), nítorí náà gbogbo
  ìlànà session dasibodu tó kù (ìtúnṣe aládàáṣiṣẹ́, àwọn àmì kúkì) kò yí padà —
  OIDC kàn rọ́pò ọ̀nà tí a fi ń dá kúkì náà, kì í ṣe ohun tí ó ń fúnni láyè láti ṣe.
  Àwọn ìyípadà sí ipa/ẹgbẹ́ IdP kì í sọ àwọn session OmniRoute tó ti wà di asán;
  ìjáde, yíyí ọ̀rọ̀ aṣínà padà, tàbí ìparí session ṣì ni ó ń ṣàkóso bí wọ́n ṣe pé tó.
- Gbogbo ìṣètò `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) wà nínú `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  yóò dá `400 PASSWORD_REQUIRED` padà ayafi tí body bá gbé ọ̀rọ̀ aṣínà ìṣàkóso
  gẹ́gẹ́ bí `currentPassword` (`401 PASSWORD_MISMATCH` bí ó bá jẹ́ àṣìṣe).
  `oidcDisablePasswordLogin` kọ _ìwọlé_ pẹ̀lú ọ̀rọ̀ aṣínà (`POST /api/auth/login`)
  ṣùgbọ́n ó pa hash ọ̀rọ̀ aṣínà tí a ti fipamọ́ mọ́, ìfàṣẹsí-àtúnṣe sì ṣì máa ń fi
  `currentPassword` wé e.
- `corsOrigins` àti `bruteForceProtection` tún wà nínú `SECURITY_IMPACTING_SETTINGS_KEYS`:
  ṣíṣàìlágara èyíkéyìí nínú wọn ń sọ àwọn ààbò ìwọlé di aláìlágbára, nítorí náà wọ́n nílò
  ìfàṣẹsí-àtúnṣe `currentPassword` kan náà (tàbù Aàbò máa ń béèrè rẹ̀), JSON import
  sì máa ń yọ wọ́n kúrò.
- Gbogbo kọ́kọ́rọ́ ìlànà-ààbò — àwọn àkọsílẹ̀ `SECURITY_IMPACTING_SETTINGS_KEYS`,
  gbogbo kọ́kọ́rọ́ `oidc*` àti ipò session dasibodu — jẹ́ **ti oníṣẹ́ nìkan** lórí
  `PATCH /api/settings`: kọ́kọ́rọ́ API tó ní scope ìṣàkóso tàbí access token `oma_`
  ni a máa kọ pẹ̀lú `403` kódà bí ó bá fi `currentPassword` tó tọ́ ránṣẹ́, ìkọ̀ náà
  sì ni a máa ṣe àkọsílẹ̀ àyẹ̀wò rẹ̀ gẹ́gẹ́ bí `settings.update_failed` pẹ̀lú `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` nínú `src/lib/api/operatorCredential.ts`).
  Àwọn ìṣètò lasan (àkòrí, àwọn ààyò ìfihàn) ṣì lè jẹ́ kí kọ́kọ́rọ́ `manage`
  tàbí access token `admin` kọ sí wọn. Gbogbo ìyípadà sí `/api/settings` fúnra rẹ̀ (àti sí
  `/api/settings/require-login`) tún nílò scope access-token `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` nínú `src/server/authz/accessScopes.ts`, ìbámu ipa
  gangan); `GET` ṣì jẹ́ `read`, àwọn sub-route `/api/settings/*` mìíràn (proxies,
  àwọn àfirọ́pò combo, àwọn alias model, compression, purges…) sì ń pa scope
  `write` tí a yọ láti inú method mọ́.
- `POST /api/settings/import-json` máa ń fo ìfàṣẹsí-àtúnṣe yẹn kọjá, nítorí náà ó máa ń yọ gbogbo kọ́kọ́rọ́ inú
  `IMPORT_STRIPPED_SETTINGS_KEYS` (fáìlì kan náà) kúrò kí ó tó kọ: ọ̀rọ̀ aṣínà àti
  `currentPassword`, gbogbo àkọsílẹ̀ `SECURITY_IMPACTING_SETTINGS_KEYS`, àti
  ipò session dasibodu (`sessionsValidAfter`, `revokedDashboardSessions`).
  Nítorí náà, mímú backup àtijọ́ wọlé kò lè jí session tí ìyípadà ọ̀rọ̀ aṣínà
  tàbí ìjáde ti parí tẹ́lẹ̀ padà.

#### Ìwọlé ifosiwewe-méjì TOTP àṣàyàn (#16619)

A máa ń forúkọ sí i láti Ètò → Aàbò; ó wà ní pípa títí oníṣẹ́ yóò fi mú un ṣiṣẹ́
(`src/server/auth/dashboardMfa.ts`).

- **Ohun tí ó bo:** ìwọlé pẹ̀lú ọrọ̀igbaniwọle (`POST /api/auth/login`, èyí tí ó nílò
  `POST /api/auth/mfa/verify` lẹ́yìn náà) àti `omniroute connect` (`POST /api/cli/connect`,
  èyí tí ó kọ́ ìfọwọ́sowọ́pọ̀ tí ọrọ̀igbaniwọle nìkan wà, tí ó sì gba kóòdù náà gẹ́gẹ́ bí
  `totp`).
- **Ohun tí kò bo:** ìwọlé OIDC / SSO (`/api/auth/oidc/callback`) kò béèrè fún TOTP OmniRoute. Ó
  gbẹ́kẹ̀ lé ifosiwewe kejì ti olupèsè ìdánimọ̀ fúnra rẹ̀, nítorí náà mú MFA ṣiṣẹ́ nínú IdP bí
  OIDC bá ṣiṣẹ́.
- **Ìmúpadà** (ẹ̀rọ tí ó sọnù, kò sí kóòdù ìmúpadà tó kù, tàbí ifosiwewe kan tí a kò lè
  ṣàyẹ̀wò mọ́, fún àpẹẹrẹ lẹ́yìn tí `STORAGE_ENCRYPTION_KEY` bá yí padà):
  1. Tun olupin náà bẹ̀rẹ̀ pẹ̀lú `OMNIROUTE_DISABLE_MFA=true`.
  2. Lórí host fúnra rẹ̀ (ẹlẹ́gbẹ́ loopback àti `Host` loopback, bíi
     `http://localhost:20128`), wọlé pẹ̀lú ọrọ̀igbaniwọle. A máa fo ifosiwewe kejì fún orísun
     yẹn nìkan; gbogbo orísun mìíràn ṣì nílò kóòdù náà.
  3. Nínú Settings → Security → Disable, tẹ ọrọ̀igbaniwọle náà sílẹ̀, kí o sì fi kóòdù náà sílẹ̀
     ní òfo. `POST /api/auth/mfa/disable` máa gba body tí kò ní `code` nìkan nígbà tí a bá ṣètò
     oníyípadà náà àti tí ìbéèrè náà bá wá láti host; ó ṣì nílò ìgbàgbọ́ dashboard àti
     ọrọ̀igbaniwọle ìsinsìnyí, a sì máa ṣe àkọsílẹ̀ rẹ̀ gẹ́gẹ́ bí
     `auth.mfa.disabled` pẹ̀lú `secondFactor: "recovery_switch"`.
  4. Yọ `OMNIROUTE_DISABLE_MFA` kúrò, tun bẹ̀rẹ̀, kí o sì forúkọsílẹ̀ lẹ́ẹ̀kan sí i bí ó bá
     ṣeé ṣe.

## Awọn kilasi ipa ọna

`src/server/authz/types.ts` asọye mẹta kilasi; eyikeyi ipa ọna ti ko le ṣe ipinpinpin ipinnu ṣubu pada si `MANAGEMENT`.

| Kilasi       | Apejuwe                                                                                                                                                     | Auth beere                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `PUBLIC`     | Awọn ipa-ọna ailewu taara — iwọle, ijade jade, ipo, ilera, bata bata inu.                                                                                   | Ko si                                                                    |
| `CLIENT_API` | Awọn aaye ipari iṣẹ awoṣe — `/api/v1/*`, `/api/v1beta/*`, pẹlu awọn inagijẹ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bọtini agbateru nigbati asia ẹya `REQUIRE_API_KEY` ti o munadoko ti ṣiṣẹ |
| `MANAGEMENT` | Awọn oju-iwe Dasibodu, awọn eto, awọn olupese, awọn bọtini, abojuto ati awọn aaye ipari iwadii.                                                             | Dasibodu igba OR Bearer pẹlu `manage` dopin                              |

Awọn iṣe `MANAGEMENT` diẹ ni** onišẹ-nikan** : bọtini `manage` ko to. Gbigbe awọn iwe-ẹri ti a fipamọ sori okeere (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), mimu-pada sipo afẹyinti lori data laaye (`POST /api/db-backups/import` pẹlu `dryRun=true`, `POST /api/db-backups` mu pada nipasẹ id, `POST /api/settings/import-json`), iparun awọn aaye imupadabọ (`DELETE /api/db-backups` nu, ati `PATCH /api/db-backups` nitori idaduro ti o tẹsiwaju n ṣafẹri pruning laifọwọyi lẹhin gbogbo afẹyinti) nilo igba dasibodu, koko-ọrọ CLI agbegbe. Ipinfunni àmi ìsiṣẹpọ (`POST /api/sync/tokens`) ati mimuṣe ami ami wiwọle `admin` CLI (`POST /api/cli/tokens`) nilo igba dasibodu tabi koko-ọrọ CLI agbegbe ni gbogbo ipo iwọle. awọn bọtini API ti eyikeyi iwọn ati awọn ami iraye si `oma_` kii ṣe awọn iwe-ẹri oniṣẹ: wọn gba `403` nigbakugba ti o nilo ọkan. Ṣayẹwo naa ngbe ni `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Yiyipada awọn eto iwọle jẹ oniṣẹ-nikan paapaa: `POST /api/settings/require-login` (ṣeto ọrọ igbaniwọle iṣakoso / toggle `requireLogin`) gba awọn iwe-ẹri wọnyẹn nikan ni kete ti ọrọ igbaniwọle kan wa — window bootstrap akọkọ-ṣiṣe (ko si ọrọ igbaniwọle sibẹsibẹ) ko yipada — ati pe igba dasibodu gbọdọ fi `currentPassword` ranṣẹ lati rọpo ọrọ igbaniwọle (`403` nigbati o nsọnu tabi aṣiṣe, ṣayẹwo bi `settings.update_failed`). CLI agbegbe ati apẹẹrẹ pẹlu alaabo iwọle tọju ọna imularada ati pe o le ṣeto ọrọ igbaniwọle kan laisi rẹ, nitori awọn mejeeji wa ni owun si agbalejo ti o ni itọsọna data.

## Pipeline

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Awọn akọle inu ti o gbẹkẹle (ti a ṣalaye ni `src/server/authz/headers.ts`) jẹ** yọ kuro lati awọn ibeere ti nwọle** ṣaaju ki ikasi — awọn alabara ko le ṣaju-gbejade `x-omniroute-auth-*` lati farawe koko-ọrọ kan.

### Awọn adehun imulo

Kilasi ipa ọna kọọkan ni eto imulo ni `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — nigbagbogbo da `allow({ kind: "anonymous", id: "anonymous" })` pada.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ayokuro Bearer, sooto nipasẹ `validateApiKey()`. Ṣubu nipasẹ ailorukọ nikan nigbati asia ẹya `REQUIRE_API_KEY` ti o munadoko jẹ alaabo. Asia ti o munadoko jẹ ipinnu nipasẹ `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) nitorinaa Awọn asia Ẹya Dasibodu ati awọn oniyipada ayika ṣe akoso `/api/v1/*`, `/api/v1beta/*`, ati awọn inagijẹ nigbagbogbo; awọn ikuna ipinnu kuna ni pipade. Faye gba awọn ibeere dasibodu-igba lori awọn ipa ọna API alabara (pẹlu `/api/v1/models`, ti a lo nipasẹ katalogi awoṣe dasibodu). Nigbati o ba mu Entra ID SSO ṣiṣẹ, Oluduro ti o jẹ apẹrẹ ti o jẹ ami Entra (awọn ipele base64url mẹta, `RS*` alg, `kid`) ni a ṣakoso nipasẹ ẹka SSO** ṣaaju ki o to** `validateApiKey()` ati idajo rẹ jẹ — ti o kẹhin kii yoo ṣubu si ọna bọtini API tabi ẹka ti o bajẹ-si-ailorukọ, nitorinaa ijade olupese idanimọ ko le di iwọle si ṣiṣi. Awọn bọtini API aimi ko ni ipa. Wo [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — gba igba dasibodu, awọn ibeere amuṣiṣẹpọ inu inu (ti o baamu si `/api/providers/[name]/(sync-models|models)`), tabi fo patapata ti `isAuthRequired()` ba pada eke. Pada 403 (`AUTH_001`) nigbati aami Oluduro kan wa ṣugbọn ko wulo, 401 bibẹẹkọ. Paapaa fi agbara mu awọn ipele oluso ipa-ọna (LOCAL_ONLY / ALWAYS_PROTECTED) ṣaaju eyikeyi ẹka auth — wo [Awọn ipele Ẹṣọ Ipa-ọna](../security/ROUTE_GUARD_TIERS.md). awọn ọna LOCAL_ONLY ni `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (loni: `/api/mcp/`) le wọle lati ti kii ṣe loopback nigbati bọtini Bearer gbe aaye `manage` ; gbogbo awọn ọna LOCAL_ONLY miiran wa ti o muna-loopback laibikita iwọn.

Ilana aṣeyọri da `AuthSubject` pada pẹlu `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Awọn olutọju isalẹ le ka nipasẹ `assertAuth(request, "CLIENT_API")` ni `src/server/authz/assertAuth.ts` dipo ṣiṣiṣẹ auth kannaa.

## Akojọ Awọn ipa ọna gbangba

`src/shared/constants/publicApiRoutes.ts` jẹ atokọ ti o han gbangba:

Awọn akojọ ti wa ni pin nipa** apẹrẹ** , ati pipin jẹ fifuye-rù (GHSA-74g9-q8f6-793h): ìpele kan ni ibamu pẹlu `startsWith()`, nitorina o tun baamu gbogbo ọna ti o wa nitosi pinpin awọn ohun kikọ asiwaju rẹ. `/api/usage/om-usage` gẹgẹbi ìpele kan ti samisi `/api/usage/om-usage<anything>` PUBLIC, ati Nigbamii ti pinnu pe lati `/api/usage/[connectionId]` — oluṣakoso kan ti ko ni ijẹrisi tirẹ.

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Awọn ipa ọna kika-nikan jẹ ti gbogbo eniyan** nikan** fun awọn ọna ailewu. Akiyesi: `classifyRoute()` yọkuro `/api/v1/*` ati `/api/v1beta/*` kuro ninu isubu PUBLIC -nipasẹ — awọn wọn jẹ `CLIENT_API` nigbagbogbo nitorina eto imulo bọtini Bearer tun wa.

## Fífì Route Tuntun Kún Un

### Àpẹẹrẹ 1 — Endpoint API oníbàárà gbangba (Bearer-auth)

Àwọn route lábẹ́ `/api/v1/` àti `/api/v1beta/` ni a máa ń pín sí `CLIENT_API` láìfọwọ́ṣe. Middleware náà ń fipá mú àyẹ̀wò Bearer; àwọn route handler kò nílò láti tún un ṣe, ṣùgbọ́n wọ́n lè ka subject náà bí ó bá wúlò.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ìlànà handler
}
```

### Àpẹẹrẹ 2 — Endpoint ìṣàkóso (session tàbí Bearer + manage)

Lo `requireManagementAuth()` láti `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ìlànà handler
}
```

`requireManagementAuth()` máa ń dá `null` padà nígbà àṣeyọrí tàbí `Response` àṣìṣe JSON kan:

- 401 `AUTH_001` "A nílò ìfàṣẹsí" — kò sí credential rárá
- 403 — Bearer tí kò tọ́ **tàbí** Bearer wà ṣùgbọ́n key náà kò ní scope `manage` / `admin`

`hasManageScope(scopes)` máa ń dá true padà fún `"manage"` tàbí `"admin"`.

### Àpẹẹrẹ 3 — Fífì kún àtòjọ ìyọ̀ǹda gbangba

Yan set náà gẹ́gẹ́ bí ìrísí, kì í ṣe nítorí ìrọ̀rùn. Route kan ṣoṣo lọ sínú `PUBLIC_API_ROUTES_EXACT` (tàbí `PUBLIC_READONLY_CORS_API_ROUTES` fún GET-nìkan); subtree gidi nìkan ló yẹ kó lọ sínú `PUBLIC_API_ROUTE_PREFIXES`, ó sì **gbọdọ̀ parí pẹ̀lú `/`**. Fífi route kan ṣoṣo sínú àtòjọ prefix tún máa ń sọ gbogbo path tó wà lẹ́gbẹ̀ẹ́ tí wọ́n ní àwọn àmì ìbẹ̀rẹ̀ kan náà di gbangba — pẹ̀lú àwọn dynamic-segment sibling tí a bá fi kún un lọ́jọ́ iwájú (GHSA-74g9-q8f6-793h). Ṣàfikún àwọn unit test ní `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` àti `tests/unit/authz/classify.test.ts`.

## Àwọn Àyè

Àwọn àyè orúkọ mẹ́ta. Olùṣàyẹ̀wò kọ̀ọ̀kan ka àwọn okùn tirẹ̀ nìkan. Ìfiwéra, pẹ̀lú ìdí tí `manage` fi kùnà `scopeMatches` fún `read:compression` àti ìdí tí àmì ìwọlé `read` kò fi lè `PATCH /api/keys/{id}`, wà ní [Àwọn àyè orúkọ mẹ́ta](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Àwọn kọ́kọ́rọ́ API gbé àtòpọ̀ `scopes` (tí a tọ́jú sí bi JSON nínú `api_keys.scopes`, wo `src/lib/db/apiKeys.ts`).

### Àyè ìṣàkóso

- `manage` / `admin` — `hasManageScope`. Ìwọlé tí ó gbé àmì sí àwọn ọ̀nà API ìṣàkóso.
- `mcp:connect`, `self:usage`, `self:account-quota`, àti
  `policy:bypass-provider-quota` jẹ́ àwọn àyè ìbámu-gangan tí a lè fi kún. Wọ́n wà ní ìta `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` ṣí
  `/api/mcp/` ìpín-ìwọlé tí kìí ṣe loopback nìkan.

### Àwọn àyè irinṣẹ́ MCP

Ìtòlẹ́sẹẹsẹ àti àwọn òfin ìbámu (okùn kan náà, tàbí àyè tí a fún tí ó parí pẹ̀lú `*`):
[Àwọn àyè irinṣẹ́ MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` nínú `src/shared/constants/mcpScopes.ts` jẹ́ ìpín-ẹ̀ka tí a tẹ́ tẹ́lẹ̀, kìí ṣe gbogbo ìtòlẹ́sẹẹsẹ náà. Ìmúṣẹ́ ń ṣiṣẹ́ nínú
`open-sse/mcp-server/scopeEnforcement.ts` lẹ́hìn tí `resolveCallerScopeContext()`
bá ti yanjú àwọn àyè láti ìwífún ìfọwọ́sí MCP, metadata ìbéèrè, tàbí `OMNIROUTE_MCP_SCOPES`. Kò ní ṣiṣẹ́ àyàfi tí `OMNIROUTE_MCP_ENFORCE_SCOPES=true` bá wà.

### Àwọn àyè àmì ìwọlé

`read` / `write` / `admin` lórí àwọn àmì `oma_live_…`, tí a tò lẹ́sẹẹsẹ nípasẹ̀ `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Ìpele yìí kan ìwé-ẹ̀rí àmì ìwọlé nìkan. Wo [Ìfọwọ́sí Ìṣàkóso](../guides/MANAGEMENT-AUTH.md).

## Auth Nilo Toggle

`isAuthRequired()` ni `src/shared/utils/apiAuth.ts` pinnu boya** eyikeyi** auth ti wa ni imuse fun ibeere kan:

- `settings.requireLogin === false` → auth jẹ alaabo agbaye, ayafi fun ipele ti o ni aabo nigbagbogbo (wo [Awọn Tiers Itọju Ipa ọna](../security/ROUTE_GUARD_TIERS.md) ) ati awọn ipe ti o fi iwe `admin` ẹri kan ti o gba, eyiti o nilo iwe-ẹri kanna gẹgẹbi pẹlu iwọle lori: ipinfunni awọn ami amuṣiṣẹpọ, Mining CLI awọn ami iraye si ni eyikeyi iwọn, ati ṣiṣẹda bọtini API `manage`, fifun zq dopin to dopin zq atunbi tabi ṣiṣafihan iru bọtini bẹ (`requireCredentialForManagementScopedKey()` ni `src/lib/api/requireManagementAuth.ts`). Awọn bọtini idawọle nikan wa ni sisi. Kikọ asia ẹya ti o ni aabo kan (`REQUIRE_API_KEY`, awọn asia Aabo miiran, ati SSRF / TLS / MCP-scope / awọn asia apoti iyanrin ti a ṣe akojọ si ni [Awọn asia Ẹya](../reference/FEATURE_FLAGS.md#rest-api) ) ati fifipamọ awọn eto boju-boju PII (`PUT /api/settings/pii`) tun tọju nilo ijẹrisi kan.
- Ko si ọrọ igbaniwọle tunto** ati** ko si `INITIAL_PASSWORD` env var → bootstrap mode faye gba awọn onboarding oluṣeto ati loopback ibeere, ṣugbọn fara nẹtiwọki ibeere tun nilo awọn iwe eri. Iyatọ: kikọ asia ẹya ti o ni aabo ati fifipamọ awọn eto boju-boju PII (`PUT /api/settings/pii`) nilo ijẹrisi paapaa lati loopback, nitorinaa loopback funrararẹ ko to nibẹ.
- Eyikeyi aṣiṣe DB → kuna ni pipade (ni aabo-nipasẹ-aiyipada).

Imudaniloju bọtini API onibara nlo `isRequireApiKeyEnabled()` ni `src/shared/utils/featureFlags.ts`, kii ṣe kika `process.env.REQUIRE_API_KEY` taara. Eyi ṣe pataki fun awọn iṣẹlẹ ti a fi ranṣẹ: toggling `REQUIRE_API_KEY` ni Dashboard → Awọn asia Ẹya ṣe ipamọ DB kan ati pe lẹsẹkẹsẹ yoo kan `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, ati awọn sọwedowo auth alabara-API miiran ti o pin oluranlọwọ yii. Ti ile itaja asia ẹya ko ba le ka, alabara API auth kuna ni pipade ati nilo bọtini kan.

## Àyípadà Tó Fọ́ Ìbámu — v3.8.0

Àwọn endpoint `/api/v1/agents/tasks/*` àti `/api/resilience/model-cooldowns` **ní báyìí nílò ìfàṣẹsí ìṣàkóso** (commit `588a0333`). Àwọn oníbàárà tí wọ́n ti ń fi kọ́kọ́rọ́ API àdáṣe ránṣẹ́ láìsí ìwọ̀n ààyè `manage` máa gba `403`. Ìṣílọ: yálà fún kọ́kọ́rọ́ náà ní ìwọ̀n ààyè `manage` nínú dashboard API Keys, tàbí lo session dashboard tí a ti wọlé sí.

## Àyípadà Ìhùwàsí — v3.8.2

`/api/mcp/*` (server MCP jíjìn) ṣì jẹ́ LOCAL_ONLY ní àiyípẹ̀, ṣùgbọ́n ní báyìí ó ń gba àwọn ìbéèrè tí kì í ṣe loopback nígbà tí header `Authorization: Bearer <api-key>` bá ní ìwọ̀n ààyè `manage`. Ààyè àkànṣe náà jẹ́ dídènà ní kedere fún path kọ̀ọ̀kan nípasẹ̀ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` nínú `src/server/authz/routeGuard.ts`; prefix LOCAL_ONLY ẹlẹgbẹ́ rẹ̀ `/api/cli-tools/runtime/*` jẹ́ èyí tí a mọ̀ọ́mọ̀ ṣe pé a kò lè kọjá rẹ̀ nítorí pé ó lè dá àwọn subprocess aláìlópin sílẹ̀. Àwọn ìbéèrè aláìlórúkọ sí `/api/mcp/*` láti ibi tí kì í ṣe loopback ṣì ń dá `403 LOCAL_ONLY` padà — àiyípẹ̀ fún path LOCAL_ONLY tuntun èyíkéyìí ṣì jẹ́ loopback nìkan tó muna. Wo [Àwọn Ìpele Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Ìdánwò

- Àwọn ìdánwò unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Àkójọ àṣẹ gbogbogbò: `tests/unit/public-api-routes.test.ts`.
- Ṣíṣe ìdánwò àfojúsùn: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## N ṣatunṣe aṣiṣe

Opo gigun ti epo nigbagbogbo n ṣe awọn idahun pẹlu:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Fun awọn ibeere ti o ni idaniloju awọn akọle ibeere ti oke (ẹgbẹ-aṣakoso) tun pẹlu:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Lo `assertAuth(req, expectedClass)` inu awọn olutọju — o jabọ `AuthzAssertionError` pẹlu koodu `AUTHZ_NOT_INITIALIZED` ti agbedemeji ti o ba kọja (ṣe iranlọwọ fun mimu awọn atunto iṣeto ni awọn idanwo).

## Wo Pẹ̀lú

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — àmì ìfọwọ́sí fún ojúami kọ̀ọ̀kan
- [COMPLIANCE.md](../security/COMPLIANCE.md) — àkọsílẹ̀ àyẹ̀wò fún àwọn ìṣẹ̀lẹ̀ ìfọwọ́sí
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — àwọn ààyè orúkọ ìpele mẹ́ta àti àtòjọ àwọn irinṣẹ́ MCP
- Orísun: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
