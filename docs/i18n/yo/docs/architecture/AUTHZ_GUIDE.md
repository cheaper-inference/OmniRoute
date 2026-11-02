# Authorization Guide (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Orísun òtítọ́:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Ìgbà tó kẹ́yìn tí wọ́n ṣe àtúnṣe:** 2026-09-22 — àwọn orúkọ ààyè ìpele tọ́ka sí MCP-SERVER.md

OmniRoute ní ọ̀nà ìfọwọ́sí tó mọ ọ̀nà tó máa ń ṣàkóso gbogbo ìbéèrè API. Ìsọ̀rí jẹ́ **tí a lè pinnu** àti **tí kò lè kùnà** — ohunkóhun tí kò bá lè ṣe ìsọ̀rí yóò di `MANAGEMENT` yóò sì béèrè ìgbà kan tàbí àmì ìpele ìṣàkóso. Ojúewé yìí ṣàlàyé àwòrán fún àwọn onímọ̀-ẹ̀rọ tó ń tọ́jú àwọn ọ̀nà tàbí tó ń ṣe àwọn ibi ìparí tuntun.

![Ọ̀nà AuthZ (àwọn ìpele ọ̀nà 3 + ìṣàyẹ̀wò ètò)](../diagrams/exported/authz-pipeline.svg)

> Orísun: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Àwọn Ọ̀nà Ìfàṣẹsí Méjì

### 1. Kọ́kọ́rọ́ API (Bearer)

A máa ń lò ó fún àwọn API oníbárà tó bá OpenAI/Anthropic/Gemini mu àti àwọn ipa-ọ̀nà ìṣàkóso díẹ̀ nígbà tí kọ́kọ́rọ́ náà bá ní àyè-àṣẹ `manage`.

```
Authorization: Bearer <api-key>
```

`isValidApiKey()` / `extractApiKey()` inú `src/sse/services/auth.ts` ló ń ṣe ìfọwọ́sí rẹ̀, a sì tún ń gbé e jáde nípasẹ̀ `src/shared/utils/apiAuth.ts`. Olùṣàyẹ̀wò náà tún gba àwọn onírúurú àyíká `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` gẹ́gẹ́ bí àwọn kọ́kọ́rọ́ ìfiránṣẹ́-tààrà tó dúró pẹ́ (ọ̀ràn #1350).

### 2. Sẹ́ṣọ̀nù Dasibodu (kúkì auth_token)

Fún àwọn ojú-ewé dasibodu àti àwọn iṣẹ́ alákóso.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kúkì kan jẹ́ sẹ́ṣọ̀nù kìkì nígbà tí JWT bá kọjá ìfọwọ́sí **tí** ó sì ní `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Gbogbo
olùlò kúkì náà (olùṣọ́ ipa-ọ̀nà dasibodu (`isDashboardSessionAuthenticated()`), ìmúdójúìwọ̀n ìlànà ìfúniláṣẹ, ìfọwọ́bọ̀wọ́ WebSocket, olupin aláàyè,
`/api/settings/require-login`, `/api/auth/status`) ń gba inú olùrànlọ́wọ́ yẹn kọjá.
Àwọn JWT mìíràn tí a fọwọ́ sí pẹ̀lú `JWT_SECRET` wà — ìfiránṣẹ́-tààrà Cursor CLI ń dá
àwọn tọ́kìnì `iss "omniroute" / aud "cursor-cli"` fún àwọn tó ní kọ́kọ́rọ́ — wọn kì í sì í ṣe sẹ́ṣọ̀nù láéláé
(#13298).

`isDashboardSessionAuthenticated()` inú `src/shared/utils/apiAuth.ts` ló ń ṣàyẹ̀wò rẹ̀. Ìlànà náà máa ń sọ JWT di tuntun fúnra rẹ̀ nígbà tí ó bá kù díẹ̀ sí ọjọ́ 7 nínú àkókò ìwàláàyè ọjọ́ 30 rẹ̀.

Sẹ́ṣọ̀nù tún lè parí kí ọjọ́ 30 rẹ̀ tó pé, nítorí gbogbo olùdá rẹ̀ ń gba inú `mintDashboardSessionToken` kọjá (àkókò ìdásílẹ̀ `iat` àti àmì ìdánimọ̀ `jti`), olùṣàyẹ̀wò sì ń ṣàyẹ̀wò ètò méjì: `sessionsValidAfter`, èyí tí ìyípadà ọ̀rọ̀ aṣínà ń ṣètò kí gbogbo sẹ́ṣọ̀nù tí a dá ṣáájú rẹ̀ má lè kọjá ìfọwọ́sí mọ́ (aṣàwákiri tí ó yí ọ̀rọ̀ aṣínà padà yóò gba kúkì tuntun), àti `revokedDashboardSessions`, èyí tí `POST /api/auth/logout` ń fi `jti` sẹ́ṣọ̀nù tí a jáde kúrò nínú rẹ̀ sí. Àwọn sẹ́ṣọ̀nù tí ẹ̀yà àtijọ́ dá kò ní èyíkéyìí nínú àwọn ìjẹ́rìí wọ̀nyí, wọn yóò sì wà ní ìfọwọ́sí títí di ìyípadà ọ̀rọ̀ aṣínà àkọ́kọ́. Bí a kò bá lè ka àwọn ètò náà, a kò ní fọkàn tán sẹ́ṣọ̀nù náà.

Àwọn ipa-ọ̀nà ìṣàkóso kan gba **èyíkéyìí** nínú àwọn ọ̀nà méjèèjì: kúkì TÀBÍ `Bearer <key>` nígbà tí kọ́kọ́rọ́ API bá ní àyè-àṣẹ `manage` (tàbí `admin`). Èyí ni ó mú kí ìṣàn iṣẹ́ “tí a lè ṣètò nípasẹ̀ àwọn ìpè API” tí a fi kún v3.8 ṣeé ṣe.

#### Ẹnu-ọ̀nà ìwọlé OIDC àṣàyàn (#6973)

Ìwọlé alákóso dasibodu tún ṣe àtìlẹ́yìn fún ìṣàn OIDC (OpenID Connect) **tí a yan láti lò**
lẹ́gbẹ̀ẹ́ ìwọlé ọ̀rọ̀ aṣínà àìyípadà — a kì í yọ ìwọlé ọ̀rọ̀ aṣínà kúrò láéláé, a kàn
ń fi OIDC kún un:

- A dá a dúró àyàfi tí `settings.oidcEnabled === true` **àti** tí a ti ṣètò gbogbo
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` (Settings → Auth).
  Bí kò bá rí bẹ́ẹ̀, `GET /api/auth/oidc/login` yóò dá `400` padà.
- `GET /api/auth/oidc/login` ń ṣàwárí `authorization_endpoint` láti inú
  `/.well-known/openid-configuration` ti olùfúnni (yóò lo
  `<issuer>/authorize` bí èyí kò bá ṣiṣẹ́), ó ń kọ URI àtúndarí láti inú ìbéèrè
  tó ń wọlé (pẹ̀lú àkíyèsí `x-forwarded-proto`), ó sì ń darí sí IdP pẹ̀lú `state`
  aláìlẹ́sẹ̀-n-tẹ̀lé tí a fi pamọ́ sínú kúkì `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` ń fìdí `state` múlẹ̀, ó ń pààrọ̀ kóòdù ìfúniláṣẹ,
  ó sì ń ṣàyẹ̀wò ìbuwọ́lù tó wà lórí tọ́kìnì ID nípasẹ̀ JWKS olùfúnni
  (`createRemoteJWKSet` ti `jose`, tí a fi pamọ́ sínú cache fún URI JWKS kọ̀ọ̀kan)
  pẹ̀lú àyẹ̀wò `issuer`/`audience`. Ìyọ̀ǹda ìwọlé sí pánẹ́ẹ̀lì ìṣàkóso nílò
  àkójọ `oidcAllowedSubjects` tí kò ṣófo, ìlànà `oidcAdmissionClaim`, tàbí àwọn
  méjèèjì. Àkójọ subject náà yóò bá `sub` tàbí `email` mu nìkan nígbà tí
  `email_verified === true`. Ìlànà claim àṣàyàn náà gba ọ̀nà claim tọ́kìnì ID
  tí a fi àmì-dọ́ọ̀tì yà (fún àpẹẹrẹ, `realm_access.roles`) àti àkójọpọ̀ àwọn
  iye tí a gbà; claim tí a túmọ̀ gbọ́dọ̀ jẹ́ àkójọpọ̀ àwọn ọ̀rọ̀ tí ó ní ó kéré
  tán iye kan tí a gbà. Bí a bá ṣètò àwọn ìlànà méjèèjì, àwọn méjèèjì gbọ́dọ̀
  yege. Claim tí kò sí tàbí tí ìṣètò rẹ̀ kò tọ́ ni a ó kọ láìyọ̀nda, àti láìsí
  èyíkéyìí nínú àwọn ìlànà náà callback yóò kọ ìwọlé (`not_configured`).
  Àwọn ìṣètò tó wà tẹ́lẹ̀ tí ó dá lórí subject nìkan yóò máa ṣiṣẹ́ láìyípadà.
- Ní ìgbà gbogbo, Keycloak máa ń fi àwọn ipa realm sínú àwọn access token, kì í
  ṣe dandan kí ó fi wọ́n sínú àwọn tọ́kìnì ID. Láti béèrè ipa realm `admin`,
  ṣètò protocol mapper kan fún client yìí tí yóò fi `realm_access.roles` sínú
  **tọ́kìnì ID** rẹ̀, lẹ́yìn náà ṣètò `oidcAdmissionClaim` sí
  `{ "path": "realm_access.roles", "values": ["admin"] }`. Ṣàyẹ̀wò claim tọ́kìnì
  ID gangan fún client yìí kí o tó mú ìyọ̀ǹda ìwọlé tó dá lórí ipa nìkan ṣiṣẹ́;
  ohun èlò náà kì í ka àwọn ipa access-token. Ìkọ̀wọ́sí tọ́kìnì ní ẹ̀gbẹ́ IdP
  lè fi kún àyẹ̀wò yìí, ṣùgbọ́n kò lè rọ́pò àyẹ̀wò ẹ̀gbẹ́ ohun èlò yìí.
- Nígbà tí ó bá ṣàṣeyọrí, ó ń ṣẹ̀dá JWT `auth_token` ọjọ́ 30 **kan náà pátápátá**
  tí ìwọlé ọ̀rọ̀ aṣínà ń fúnni (`src/app/api/auth/login/route.ts`), nítorí náà
  gbogbo ìlànà session pánẹ́ẹ̀lì ìṣàkóso tó kù (ìtúnṣe aládàáṣiṣẹ́, àwọn àmì
  kúkì) kò yí padà — OIDC kàn ń rọ́pò bí a ṣe ń ṣẹ̀dá kúkì náà, kì í ṣe ohun tí
  ó ń yọ̀ǹda. Àwọn ìyípadà sí ipa/ẹgbẹ́ IdP kì í sọ àwọn session OmniRoute tó
  wà di asán; ìjáde, yíyí ọ̀rọ̀ aṣínà padà, tàbí ìparí session ṣì ni ó ń
  ṣàkóso bí wọ́n ṣe pẹ́ tó.
- Gbogbo ìṣètò `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) wà nínú `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  yóò dá `400 PASSWORD_REQUIRED` padà àyàfi tí body náà bá ní ọ̀rọ̀ aṣínà
  ìṣàkóso gẹ́gẹ́ bí `currentPassword` (`401 PASSWORD_MISMATCH` bí kò bá tọ́).
  `oidcDisablePasswordLogin` ń kọ _ìwọlé_ pẹ̀lú ọ̀rọ̀ aṣínà
  (`POST /api/auth/login`), ṣùgbọ́n ó ń pa hash ọ̀rọ̀ aṣínà tí a tọ́jú mọ́,
  ìfìdí-ẹni-múlẹ̀ lẹ́ẹ̀kan sí i sì ṣì ń fi `currentPassword` wé e.
- `corsOrigins` àti `bruteForceProtection` tún wà nínú `SECURITY_IMPACTING_SETTINGS_KEYS`:
  fífi àyè sí i fún èyíkéyìí nínú wọn ń sọ àwọn ààbò ìwọlé di aláìlágbára,
  nítorí náà wọ́n nílò ìfìdí-ẹni-múlẹ̀ lẹ́ẹ̀kan sí i pẹ̀lú `currentPassword`
  bákan náà (taabu Security ń béèrè rẹ̀), ìgbéwọlé JSON sì ń yọ wọ́n kúrò.
- Gbogbo kọ́kọ́rọ́ ìlànà ààbò — àwọn àkọsílẹ̀ `SECURITY_IMPACTING_SETTINGS_KEYS`,
  gbogbo kọ́kọ́rọ́ `oidc*` àti ipò session pánẹ́ẹ̀lì ìṣàkóso — jẹ́ ti
  **operator nìkan** lórí `PATCH /api/settings`: a ó kọ́ kọ́kọ́rọ́ API tó ní
  scope `manage` tàbí access token `oma_` pẹ̀lú `403` kódà bí ó bá fi
  `currentPassword` tó tọ́ ránṣẹ́, a ó sì ṣàkọsílẹ̀ ìkọ̀wọ́sí náà fún àyẹ̀wò
  gẹ́gẹ́ bí `settings.update_failed` pẹ̀lú `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` nínú `src/lib/api/operatorCredential.ts`).
  Àwọn ìṣètò lásán (theme, àwọn ìfẹ́ ìfihàn) ṣì ṣeé kọ fún kọ́kọ́rọ́ `manage`
  tàbí access token `admin`. Gbogbo ìyípadà sí `/api/settings` fúnra rẹ̀ (àti sí
  `/api/settings/require-login`) tún nílò scope access-token `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` nínú `src/server/authz/accessScopes.ts`, ìbámu
  exact-path); `GET` ṣì jẹ́ `read`, àwọn sub-route `/api/settings/*` mìíràn
  (proxies, combo defaults, model aliases, compression, purges…) sì ń pa scope
  `write` tí a pinnu láti ọ̀nà ìbéèrè mọ́.
- `POST /api/settings/import-json` ń fò ìfìdí-ẹni-múlẹ̀ lẹ́ẹ̀kan sí i yẹn kọjá,
  nítorí náà ó ń yọ gbogbo kọ́kọ́rọ́ inú `IMPORT_STRIPPED_SETTINGS_KEYS`
  (fáìlì kan náà) kúrò kí ó tó kọ: ọ̀rọ̀ aṣínà àti `currentPassword`, gbogbo
  àkọsílẹ̀ `SECURITY_IMPACTING_SETTINGS_KEYS`, àti ipò session pánẹ́ẹ̀lì
  ìṣàkóso (`sessionsValidAfter`, `revokedDashboardSessions`). Nítorí náà,
  gbígbé backup àtijọ́ wọlé kò lè jí session tí ìyípadà ọ̀rọ̀ aṣínà tàbí
  ìjáde ti parí tẹ́lẹ̀ dìde.

## Àwọn Ẹ̀ka Route

`src/server/authz/types.ts` ṣàlàyé ẹ̀ka mẹ́ta; route kan tí a kò lè pín ní ìdánilójú ń padà sí `MANAGEMENT`.

| Ẹ̀ka          | Àpèjúwe                                                                                                                                                        | Ìjẹ́rìí tí a nílò                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `PUBLIC`     | Àwọn route tí ó ṣe kedere ní ààbò: wíwọlé, jíjáde, ipò, init, health, onboarding bootstrap.                                                                    | Kò sí                                                                   |
| `CLIENT_API` | Àwọn endpoint ìsìn àwòṣe: `/api/v1/*`, `/api/v1beta/*`, pẹ̀lú àwọn orúkọ àpọ́nlé `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer key nígbà tí feature flag `REQUIRE_API_KEY` tó ń ṣiṣẹ́ bá ti ṣiṣẹ́ |
| `MANAGEMENT` | Àwọn ojú-ìwé dashboard, àwọn ètò, àwọn olùpèsè, àwọn kọ́kọ́rọ́, àwọn endpoint admin àti ìwádìí.                                                                   | Ìgbà dashboard TÀBÍ Bearer tí ó ní ìwọ̀n `manage`                        |

Àwọn ìgbésẹ̀ `MANAGEMENT` kan jẹ́ **ti operator nìkan**: kọ́kọ́rọ́ `manage` kò tó. Kíkó àwọn credential tí a tọ́jú jáde (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), dída afẹ́yìntì padà sórí data ààyè (`POST /api/db-backups/import` pẹ̀lú `dryRun=true`, `POST /api/db-backups` restore nípa id, `POST /api/settings/import-json`), àti pípa àwọn ibi ìpadàbọ̀ rẹ́ (`DELETE /api/db-backups` cleanup, àti `PATCH /api/db-backups` nítorí pé retention tí ó ń tọ́jú ni ó ń wa pruning aládàáṣe lẹ́yìn gbogbo backup) nílò ìgbà dashboard, olùmọ̀ CLI ti agbègbè, tàbí wíwọlé tí a ti pa. Fífúnni ní sync token (`POST /api/sync/tokens`) àti ṣíṣe `admin` CLI access token (`POST /api/cli/tokens`) nílò ìgbà dashboard tàbí olùmọ̀ CLI ti agbègbè ní gbogbo ipò wíwọlé. Àwọn kọ́kọ́rọ́ API ti ìwọ̀n èyíkéyìí àti àwọn `oma_` access token kì í ṣe àwọn credential operator: wọ́n máa gba `403` nígbàkígbà tí a bá nílò ọ̀kan. Àyẹ̀wò yìí wà nínú `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Yíyí àwọn ètò wíwọlé padà pẹ̀lú jẹ́ ti operator nìkan: `POST /api/settings/require-login` (ṣètò ọ̀rọ̀ aṣínà ìṣàkóso / yí `requireLogin` padà) ń gba àwọn credential wọ̀nyí nìkan nígbà tí ọ̀rọ̀ aṣínà bá ti wà. Fèrèsé bootstrap ìbẹ̀rẹ̀ (kò sí ọ̀rọ̀ aṣínà síbẹ̀) kò yí padà, ìgbà dashboard sì gbọ́dọ̀ fi `currentPassword` ránṣẹ́ láti rọ́pò ọ̀rọ̀ aṣínà (`403` tí ó bá kù tàbí tí kò tọ̀nà, a sì ń ṣe àkọsílẹ̀ rẹ̀ gẹ́gẹ́ bí `settings.update_failed`). CLI ti agbègbè àti instance tí wíwọlé rẹ̀ jẹ́ alaabọ̀ ń pa ọ̀nà ìmúpadàbọ̀sípò mọ́, wọ́n sì lè ṣètò ọ̀rọ̀ aṣínà láìsí i, nítorí méjèèjì ni a so mọ́ host tí ó ni data directory.

## Ìṣàn Iṣẹ́

```
Ìbéèrè tó ń wọlé → src/proxy.ts
  → runAuthzPipeline() nínú src/server/authz/pipeline.ts
    1. Yọ àwọn header inú tí a fọkàn tán kúrò (x-omniroute-auth-*, x-omniroute-route-class)
    2. Ṣẹ̀dá id ìbéèrè, pín ìtọ́sọ́nà sí kíláàsì nípasẹ̀ classifyRoute()
    3. Tí pathname == "/" → darí padà sí /dashboard
    4. Tí ètò bá ń dáwọ́ dúró (graceful shutdown) tí ó sì jẹ́ /api/* → 503
    5. Tí ó bá jẹ́ /api/* tí kì í ṣe GET → lo ìṣọ́ checkBodySize()
    6. Tí ó bá jẹ́ OPTIONS → ìmúrasílẹ̀ CORS 204
    7. Tí options.enforce == false → jẹ́ kí ó kọjá pẹ̀lú àwọn header kíláàsì-ìtọ́sọ́nà
    8. Bí bẹ́ẹ̀ kọ́: POLICIES[routeClass].evaluate(ctx)
       - allow  → fi àmì x-omniroute-auth-{kind,id,label,scopes} sí i → NextResponse.next()
       - reject → àṣìṣe JSON pẹ̀lú correlation_id (àwọn ojúewé pátákó ìṣàkóso → 302 /login)
```

Àwọn header inú tí a fọkàn tán (tí a ṣàlàyé nínú `src/server/authz/headers.ts`) ni a **yọ kúrò nínú àwọn ìbéèrè tó ń wọlé** ṣáájú pípín wọn sí kíláàsì — àwọn client kò lè kọ́kọ́ fi `x-omniroute-auth-*` sínú ìbéèrè láti ṣe bí ẹni pé wọ́n jẹ́ subject kan.

### Àwọn àdéhùn policy

Kíláàsì ìtọ́sọ́nà kọ̀ọ̀kan ní policy kan nínú `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — máa ń dá `allow({ kind: "anonymous", id: "anonymous" })` padà ní gbogbo ìgbà.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ń yọ Bearer jáde, ó sì ń fìdí rẹ̀ múlẹ̀ nípasẹ̀ `validateApiKey()`. Ó máa ń tẹ̀síwájú gẹ́gẹ́ bí anonymous kìkì nígbà tí àsíá ẹ̀yà `REQUIRE_API_KEY` tó n ṣiṣẹ́ kò bá ṣiṣẹ́. A máa ń pinnu àsíá tó n ṣiṣẹ́ nípasẹ̀ `isRequireApiKeyEnabled()` (`àtúnṣe àsíá ẹ̀yà DB > process.env.REQUIRE_API_KEY > iye àìyípadà`) kí Àwọn Àsíá Ẹ̀yà Pátákó Ìṣàkóso àti àwọn environment variable lè ṣàkóso `/api/v1/*`, `/api/v1beta/*`, àti àwọn orúkọ mìíràn ní ọ̀nà kan náà; ìkùnà resolver máa ń kọ̀ láìláàyè. Ó gba àwọn ìbéèrè ìjókòó pátákó ìṣàkóso láàyè lórí àwọn ìtọ́sọ́nà API client (pẹ̀lú `/api/v1/models`, tí àkójọ model pátákó ìṣàkóso ń lò).
- **`managementPolicy`** (`policies/management.ts`) — gba ìjókòó pátákó ìṣàkóso, àwọn ìbéèrè ìmúdójúìwọ̀n model inú (tí a bá mú dọ́gba pẹ̀lú `/api/providers/[name]/(sync-models|models)`), tàbí ó foju kọ ọ́ pátápátá tí `isAuthRequired()` bá dá false padà. Ó dá 403 (`AUTH_001`) padà nígbà tí token Bearer bá wà ṣùgbọ́n tí kò fẹsẹ̀ múlẹ̀, àti 401 ní gbogbo ọ̀nà mìíràn. Ó tún ń fipá mú àwọn ìpele ìṣọ́-ìtọ́sọ́nà (LOCAL_ONLY / ALWAYS_PROTECTED) ṣáájú ẹ̀ka ìfàṣẹsí èyíkéyìí — wo [Àwọn Ìpele Ìṣọ́ Ìtọ́sọ́nà](../security/ROUTE_GUARD_TIERS.md). Àwọn path LOCAL_ONLY nínú `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (lọ́wọ́lọ́wọ́: `/api/mcp/`) lè jẹ́ kí a wọlé sí wọn láti ibi tí kì í ṣe loopback nígbà tí kọ́kọ́rọ́ Bearer bá ní scope `manage`; gbogbo àwọn path LOCAL_ONLY mìíràn ṣì nílò strict-loopback láìka scope sí.

Policy tó ṣàṣeyọrí máa ń dá `AuthSubject` padà pẹ̀lú `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Àwọn handler tó wà lẹ́yìn lè kà á nípasẹ̀ `assertAuth(request, "CLIENT_API")` nínú `src/server/authz/assertAuth.ts` dípò ṣíṣe logic ìfàṣẹsí náà lẹ́ẹ̀kan sí i.

## Àtòjọ Àwọn Route Gbangba

`src/shared/constants/publicApiRoutes.ts` ni àtòjọ ìyọ̀ǹda tó ṣe kedere:

A pín àtòjọ náà gẹ́gẹ́ bí **ìrísí**, ìpín yìí sì ṣe pàtàkì fún bí ètò náà ṣe ń ṣiṣẹ́ (GHSA-74g9-q8f6-793h): a máa ń fi `startsWith()` ṣe ìbámu prefix kan, nítorí náà ó tún máa ń bá gbogbo path tó wà lẹ́gbẹ̀ẹ́ tí wọ́n ní àwọn àmì ìbẹ̀rẹ̀ kan náà mu.
`/api/usage/om-usage` gẹ́gẹ́ bí prefix sọ `/api/usage/om-usage<anything>` di GBANGBA, Next sì túmọ̀
èyí sí `/api/usage/[connectionId]` — handler kan tí kò ní auth tirẹ̀.

```ts
// Àwọn subtree gidi. Gbogbo entry GBỌ́DỌ̀ parí pẹ̀lú "/" (unit test kan ń ṣàyẹ̀wò èyí).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // a kà á sí CLIENT_API nínú classify, kì í ṣe "gbangba-láìsí-auth"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Àwọn route ẹyọ kan, tí a ń bá mu GANGAN (yálà pẹ̀lú slash ìparí tàbí láìsí i).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Àwọn route ẹyọ tí a kàn lè kà tí wọ́n tún gba ìròrùn origin CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Route ẹyọ tí a kàn lè kà LÁÌSÍ ìròrùn CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Àwọn route tí a kàn lè kà jẹ́ gbangba **nìkan** fún àwọn method tó ní ààbò. Àkíyèsí: `classifyRoute()` yọ `/api/v1/*` àti `/api/v1beta/*` kúrò nínú PUBLIC fall-through — `CLIENT_API` ni wọ́n jẹ́ ní gbogbo ìgbà, kí ìlànà Bearer-key lè máa ṣiṣẹ́ síbẹ̀.

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

## Ìyípadà Ìjẹ́rìí Tí A Nílò

`isAuthRequired()` nínú `src/shared/utils/apiAuth.ts` ló ń pinnu bóyá a óò fi **ìjẹ́rìí** kankan lélẹ̀ fún ìbéèrè kan:

- `settings.requireLogin === false` → ìjẹ́rìí ti di pípa lápapọ̀, àfi ipele ààbò tí ó máa wà nígbà gbogbo (wo [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) àti àwọn ìpè tí ń fúnni ní credential tí ó gbà, tí ó nílò credential kan náà bí wíwọlé ṣe wà ní títàn: fífúnni ní sync token, ṣíṣe CLI access token ní ìwọ̀n èyíkéyìí, àti dídá kọ́kọ́rọ́ API tí ó ní ìwọ̀n `manage`/`admin`, fífún kọ́kọ́rọ́ ní ìwọ̀n yẹn, tàbí tún ṣe tàbí fihàn irú kọ́kọ́rọ́ bẹ́ẹ̀ (`requireCredentialForManagementScopedKey()` nínú `src/lib/api/requireManagementAuth.ts`). Àwọn kọ́kọ́rọ́ inference nìkan ló wà ní sísílẹ̀.
- Kò sí ọ̀rọ̀ aṣínà tí a ṣètò **àti** kò sí env var `INITIAL_PASSWORD` → ipò bootstrap: ó gba onboarding wizard àti àwọn ìbéèrè loopback láàyè, ṣùgbọ́n àwọn ìbéèrè nẹ́tíwọ́kì tí a ṣí payá ṣì nílò credential.
- Àṣìṣe DB èyíkéyìí → ó kùnà ní títì (secure-by-default).

Ìfipágbára API key ti oníbàárà ń lo `isRequireApiKeyEnabled()` nínú `src/shared/utils/featureFlags.ts`, kì í ṣe kíka `process.env.REQUIRE_API_KEY` tààrà. Èyí ṣe pàtàkì fún àwọn instance tí a fi ránṣẹ́: yíyí `REQUIRE_API_KEY` padà nínú Dashboard → Feature Flags ń tọ́jú DB override, ó sì ń nípa lórí `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, àti àwọn àyẹ̀wò ìjẹ́rìí client-API mìíràn tí ó ń pín olùrànlọ́wọ́ yìí lẹsẹkẹsẹ. Tí a kò bá lè ka feature flag store, ìjẹ́rìí client API ń kùnà ní títì, ó sì nílò kọ́kọ́rọ́.

## Àyípadà Tó Fọ́ Ìbámu — v3.8.0

Àwọn endpoint `/api/v1/agents/tasks/*` àti `/api/resilience/model-cooldowns` **ní báyìí nílò ìfàṣẹsí ìṣàkóso** (commit `588a0333`). Àwọn oníbàárà tí wọ́n ti ń fi kọ́kọ́rọ́ API àdáṣe ránṣẹ́ láìsí ìwọ̀n ààyè `manage` máa gba `403`. Ìṣílọ: yálà fún kọ́kọ́rọ́ náà ní ìwọ̀n ààyè `manage` nínú dashboard API Keys, tàbí lo session dashboard tí a ti wọlé sí.

## Àyípadà Ìhùwàsí — v3.8.2

`/api/mcp/*` (server MCP jíjìn) ṣì jẹ́ LOCAL_ONLY ní àiyípẹ̀, ṣùgbọ́n ní báyìí ó ń gba àwọn ìbéèrè tí kì í ṣe loopback nígbà tí header `Authorization: Bearer <api-key>` bá ní ìwọ̀n ààyè `manage`. Ààyè àkànṣe náà jẹ́ dídènà ní kedere fún path kọ̀ọ̀kan nípasẹ̀ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` nínú `src/server/authz/routeGuard.ts`; prefix LOCAL_ONLY ẹlẹgbẹ́ rẹ̀ `/api/cli-tools/runtime/*` jẹ́ èyí tí a mọ̀ọ́mọ̀ ṣe pé a kò lè kọjá rẹ̀ nítorí pé ó lè dá àwọn subprocess aláìlópin sílẹ̀. Àwọn ìbéèrè aláìlórúkọ sí `/api/mcp/*` láti ibi tí kì í ṣe loopback ṣì ń dá `403 LOCAL_ONLY` padà — àiyípẹ̀ fún path LOCAL_ONLY tuntun èyíkéyìí ṣì jẹ́ loopback nìkan tó muna. Wo [Àwọn Ìpele Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Ìdánwò

- Àwọn ìdánwò unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Àkójọ àṣẹ gbogbogbò: `tests/unit/public-api-routes.test.ts`.
- Ṣíṣe ìdánwò àfojúsùn: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Ṣíṣe àtúnṣe àṣìṣe

Pipeline náà máa ń fi àwọn àkọlé wọ̀nyí sí gbogbo ìdáhùn:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Fún àwọn ìbéèrè tí a ti jẹ́rìí ìdánimọ̀ wọn, àwọn àkọlé ìbéèrè upstream (ní ẹ̀gbẹ́ handler) tún ní:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (àṣàyàn)
x-omniroute-auth-scopes:    àkójọ tí àmì kọ́mà yà sọ́tọ̀
```

Lo `assertAuth(req, expectedClass)` nínú àwọn handler — ó máa ń ju `AuthzAssertionError` pẹ̀lú kóòdù `AUTHZ_NOT_INITIALIZED` bí a bá ti kọjá middleware náà (èyí wúlò fún ṣíṣe àmúlò àwọn ìdàgbàsókè sẹ́yìn nínú ìṣètò nígbà ìdánwò).

## Wo Pẹ̀lú

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — àmì ìfọwọ́sí fún ojúami kọ̀ọ̀kan
- [COMPLIANCE.md](../security/COMPLIANCE.md) — àkọsílẹ̀ àyẹ̀wò fún àwọn ìṣẹ̀lẹ̀ ìfọwọ́sí
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — àwọn ààyè orúkọ ìpele mẹ́ta àti àtòjọ àwọn irinṣẹ́ MCP
- Orísun: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
