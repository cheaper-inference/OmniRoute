# Remote Mode (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Ħaddem is-CLI `omniroute` fuq il-laptop tiegħek waqt li OmniRoute nnifsu jkun qed jaħdem xi mkien ieħor
(VPS, server tad-dar, magna oħra fuq it-Tailnet tiegħek). Tidħol darba permezz ta'
`omniroute connect`, u minn hemm ’il quddiem **kull** kmand tas-CLI jimmira lejn dak is-server
remot — l-istess kmandi, l-istess output, iżda eżegwiti fuq is-server remot.

M’hemmx għodda oħra x’tinstalla: il-modalità remota tuża s-CLI `omniroute` normali
flimkien ma’ **tokens ta’ aċċess** b’ambitu definit.

```bash
npm install -g omniroute                 # is-CLI normali
omniroute connect 192.168.0.15           # idħol (password → token b’ambitu definit)
omniroute models list                    # ← issa jelenka l-mudelli tas-server REMOT
omniroute configure codex                # ← jikteb profil lokali ta’ Codex mill-katalgu remot
```

---

## Kif jaħdem

```
il-laptop tiegħek                        OmniRoute remot (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (password → token)         │
│  kuntest: vps      │ ───────────────►  │ joħloq token ta’ aċċess       │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ kull rotta ta’ ġestjoni,       │
│ jikteb il-konfig.  │ ◄───────────────  │ verifikata skont l-ambitu     │
│ LOKALMENT          │                   │ tat-token                     │
└────────────────────┘                   └───────────────────────────────┘
```

- **Il-kuntesti** jaħżnu server wieħed kull wieħed (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` jaqleb is-server attiv; `default` huwa lokali.
- **It-tokens ta’ aċċess** (`oma_live_…`) jawtorizzaw il-kmandi ta’ ġestjoni. Dawn huma
  distinti miċ-ċwievet API tal-inferenza (`sk-…`, użati għal `/v1/chat/completions`).
- Fuq is-server jinħażen biss il-hash SHA-256 ta’ token. It-test mhux kriptat jintwera
  **darba biss**, waqt il-ħolqien.

---

## Konnessjoni

### Bil-password tal-ġestjoni (bootstrap)

```bash
omniroute connect 192.168.0.15
# Password tal-ġestjoni għal http://192.168.0.15:20128: ********
# ✔ Konness ma’ http://192.168.0.15:20128 — kuntest '192.168.0.15' (ambitu: admin)
```

Il-fluss bil-password joħloq token **admin** b’mod awtomatiku (peress li għandek il-password,
diġà għandek kontroll sħiħ). Naqqas l-ambitu b’`--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Għażliet: `--port <p>` (meta l-host ma jkollux port), `--name <ctx>` (isem il-kuntest),
`--scope read|write|admin`. URL sħiħ jiġi rrispettat kif inhu:
`omniroute connect https://omni.example.com`.

### B’token iġġenerat minn qabel

Iġġenera token b’ambitu definit fid-dashboard (jew b’`omniroute tokens create`) u
waħħlu — ma hemmx bżonn password:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

Is-CLI jivvalidah permezz ta’ `GET /api/cli/whoami` u jsalvah bħala l-kuntest attiv.

---

## Ambiti

Tliet livelli, ġerarkiċi (`admin ⊃ write ⊃ read`):

| Ambitu  | X’jista’ jagħmel                                                                              |
| ------- | --------------------------------------------------------------------------------------------- |
| `read`  | jelenka/jeżamina — `models list`, `providers status`, `logs`, `usage`, `cost`                 |
| `write` | read **+** jikkonfigura/japplika — `setup-codex`, `keys add`, `config set`, kombinazzjonijiet |
| `admin` | write **+** jimmaniġġja — CRUD ta’ `tokens`, iżid providers, servizzi, policy, oauth          |

Is-server jiddeduċi l-ambitu meħtieġ għal kull rotta mill-metodu HTTP
(`GET`→read, bidliet→write), flimkien ma’ lista ta’ permessi admin għal partijiet sensittivi
(bidliet f’`/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token b’ambitu insuffiċjenti jirċievi `403` b’messaġġ ċar.

> Rotot li jniedu proċessi (`/api/services/*`, `/api/mcp/*`, …) jibqgħu
> **aċċessibbli biss permezz tal-loopback** — token remot qatt ma jista’ jilħaqhom, ikun xi jkun l-ambitu tiegħu.

---

## Konnessjoni ta’ Antigravity fuq installazzjoni remota

Antigravity juża l-iskrin tal-kunsens firstparty/nativeapp ta’ Google. Google
joħroġ il-kodiċi tal-awtorizzazzjoni biss meta r-**redirect loopback**
(`http://127.0.0.1:<port>/callback`) ikun **aċċessibbli mill-browser li
japprova d-dħul**. Fuq installazzjoni remota f’VPS, dak il-loopback jinsab fuq
is-server, mhux fuq il-magna tiegħek, għalhekk l-iskrin tal-kunsens **jeħel għal
dejjem u qatt ma joħroġ kodiċi** — il-metodu alternattiv normali ta’ “waħħal il-URL
tal-callback” ma jkollu xejn x’jitwaħħal. (Din hija restrizzjoni min-naħa ta’
Google: l-istess imblukkar iseħħ fi kwalunkwe proxy li juża l-klijent desktop
inkluż ma’ Antigravity, mhux f’OmniRoute biss.)

Id-dashboard jinduna b’dan qabel ma teħel: meta tiftaħ **Providers → Antigravity →
Connect** minn indirizz li mhuwiex localhost, l-avviż ġeneriku “ikkopja l-URL
tal-callback” jinbidel biż-żewġ soluzzjonijiet t’hawn taħt, kull waħda bil-host u
l-port tiegħek diġà mimlija. (Indirizz LAN jgħodd ukoll — `192.168.x.x` mhuwiex
localhost għal dak li għandu x’jaqsam ma’ dan il-callback.)

Hemm żewġ modi appoġġjati biex tikkonnettja Antigravity ma’ OmniRoute remot.

### Għażla A — għodda lokali ta’ għajnuna għad-dħul (rakkomandata)

Ħaddem l-OAuth fuq **il-kompjuter tiegħek stess**, fejn `127.0.0.1` huwa
aċċessibbli. L-għodda ta’ għajnuna tikkomunika direttament ma’ Google, għalhekk
il-kunsens jitlesta fejn il-verżjoni tad-dashboard ma tistax.

**Jekk diġà int konness** (`omniroute connect <host>`), m’hemm xejn x’tikkopja —
l-għodda ta’ għajnuna tibgħat il-kredenzjali lil dik l-installazzjoni għalik:

```bash
# Fuq il-magna LOKALI tiegħek (teħtieġ Node.js + browser):
omniroute connect 192.168.0.15        # darba biss — joħloq token tal-kuntest b'ambitu ta' amministratur
npx omniroute login antigravity
#   ↳ jiftaħ il-kunsens ta' Google, jaqbad il-callback fuq port loopback lokali,
#     jiskambjah, u jagħmel POST tal-kredenzjali lill-kuntest attiv:
#
#   Antigravity konness fuq http://192.168.0.15:20128 (konnessjoni abc123).
#   M'hemm xejn x'titwaħħal — tista' tagħlaq dan it-terminal.
```

Il-push iseħħ awtomatikament kull meta l-kuntest attiv jipponta lejn magna oħra.
Imponih fi kwalunkwe direzzjoni b’`--push` / `--no-push`, jew immira lejn kuntest
speċifiku b’`--context <name>`.

**Jekk il-magna tiegħek ma tistax tilħaq il-VPS** (imblukkata minn firewall,
mingħajr SSH, jew kompjuter iżolat min-netwerk), l-għodda ta’ għajnuna xorta
taħdem — kulma verament _teħtieġ_ huwa Google. Uża `--no-push`, jew sempliċement
ħalli l-push ifalli: bħala alternattiva, din tipprintja l-blob minflok tarmi
awtorizzazzjoni li diġà lestejt.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Imbagħad, fid-dashboard **remot**: **Providers → Antigravity → Connect**, u waħħal
il-blob `omniroute-cred-v1.…` fil-kaxxa tal-**Pass 2** (taċċetta kemm URL
tal-callback kif ukoll blob tal-kredenzjali). OmniRoute jiddekowdjah, iħaddem
l-onboarding ta’ Cloud Code min-naħa tas-server, u jaħżen il-konnessjoni.

> Il-blob fih refresh token — ittrattah bħal password. Bil-metodu push jintbagħat
> darba permezz tal-konnessjoni awtentikata tal-kuntest tiegħek; bil-metodu
> tat-twaħħil, permezz tal-konnessjoni mad-dashboard tiegħek. Fiż-żewġ każijiet
> jinħażen kriptat, u push li jirnexxi qatt ma jipprintjah fit-terminal tiegħek.

Flags: `--no-browser` (ipprintja l-URL minflok tiftaħha awtomatikament),
`--port <n>` (iffissa l-port loopback), `--timeout <ms>`, `--push` / `--no-push`
(issostitwixxi l-għażla tal-konsenja awtomatika), `--context <name>` (immira lejn
kuntest speċifiku).

### Għażla B — mina local-forward permezz ta’ SSH

Jekk għandek aċċess SSH għall-VPS, ittrasferixxi l-port tad-dashboard sabiex
il-callback loopback jerġa’ jasal lis-server permezz tal-mina:

```bash
# Fuq il-magna LOKALI tiegħek:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# imbagħad iftaħ http://localhost:20128 fil-browser LOKALI tiegħek u qabbad Antigravity
# bħas-soltu — ir-redirect 127.0.0.1:20128/callback issa jasal sal-VPS permezz ta' SSH.
```

Minħabba li taċċessa d-dashboard bħala `localhost:20128`, il-kunsens ta’ Google
jitlesta u l-callback jitwassal lis-server permezz tal-istess mina — l-ebda blob
mhu meħtieġ. Żomm il-mina miftuħa sakemm il-konnessjoni tidher bħala attiva.

Għall-kuntrarju tal-providers b’loopback fiss t’hawn taħt, **forward wieħed huwa
biżżejjed** hawnhekk: il-callback ta’ Antigravity jgħaddi mill-port tad-dashboard
stess, għalhekk m’hemmx port ieħor speċifiku għall-provider li jeħtieġ mina.

> Alternattiva kompletament headless (mingħajr għodda ta’ għajnuna u mingħajr
> mina) hija li tikkonfigura l-kredenzjali web Google OAuth **tiegħek stess** +
> URL bażi pubbliku; ara l-varjabbli tal-ambjent OAuth tal-provider. Iż-żewġ
> għażliet t’hawn fuq ma jeħtieġu l-ebda konfigurazzjoni addizzjonali ta’ Google.

---

## Konnessjoni ta’ Codex / Grok fuq installazzjoni remota (fornituri b’loopback fiss)

Codex, xAI (`xai-oauth`) u Grok CLI (`grok-cli`) jirreġistraw `redirect_uri`
**fiss** mal-applikazzjoni OAuth upstream tagħhom. OmniRoute ma jistax jibdlu —
il-fornitur dejjem jibgħat il-browser lura lejn l-istess indirizz kodifikat b’mod fiss:

| Fornitur    | Callback fiss li lejh jirridirezzjona l-fornitur |
| ----------- | ------------------------------------------------ |
| `codex`     | `http://localhost:1455/auth/callback`            |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                |

`localhost` hawnhekk ifisser **il-magna li qed tħaddem il-browser**, filwaqt li
s-server tal-callback PKCE ta’ OmniRoute jisma’ fuq il-loopback tas-**server**.
Iftaħ id-dashboard f’indirizz LAN bħal `http://192.168.0.15:20128` u t-tnejn
qatt ma jiltaqgħu: il-kodiċi tal-awtorizzazzjoni jintbagħat lil
`localhost:1455` tal-laptop tiegħek stess, fejn xejn mhu qed jisma’, u
l-fornitur ma jirnexxilux jagħmel is-sign-in mingħajr ma juri żball.

Id-dashboard jinduna b’dan qabel jiftaħ il-popup u juri l-kmand tat-tunnel
minflok iħalli l-login ifalli fis-skiet (#8046).

### Soluzzjoni — għaddi **ż-żewġ** ports

```bash
# Fuq il-magna li qed tħaddem il-BROWSER:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# imbagħad mur fuq http://localhost:20128 u qabbad Codex minn hemm
```

Huma meħtieġa żewġ forwards, u jekk tgħaddi wieħed biss xorta ma jaħdimx:

- **`20128`** (il-port tad-dashboard) jagħmel l-origin tassew localhost, li huwa
  dak li jġiegħel lil OmniRoute jibda s-server tal-callback PKCE — origin LAN
  qatt ma jasal għal dik il-fergħa.
- **`1455`** (il-port fiss tal-callback tal-fornitur) huwa fejn jintbagħat lura
  l-browser; irid jgħaddi mit-tunnel sal-loopback tas-server.

Ibdel `1455` ma’ `56121`/`56122` meta tqabbad xAI jew Grok CLI, u `20128`
mal-port attwali tad-dashboard tiegħek. Żomm it-tunnel miftuħ sakemm
il-konnessjoni tidher attiva.

> **M’għandekx aċċess SSH?** Codex u Grok CLI jaċċettaw ukoll token imwaħħal —
> it-tab **Paste API Key** / **Import auth.json** fid-djalogu tal-konnessjoni.
> Dik ir-rotta m’għandhiex callback loopback, għalhekk taħdem minn kwalunkwe
> origin. Barra minn hekk, Codex jaċċetta token tal-aċċess waħdu jew blob
> tas-sessjoni `~/.codex/auth.json`.

---

## Ġestjoni tat-tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ juri s-sigriet DARBA BISS — ikkopjah issa
omniroute tokens list                 # moħbi: id, name, scope, prefix, status, expiry
omniroute tokens revoke <id|prefix>   # irtira minnufih
omniroute tokens scopes               # tispjega t-tliet skopijiet
```

Il-kmandi `tokens` jeħtieġu credential **admin**. Tista' wkoll tiġġestixxi t-tokens fid-dashboard taħt **Settings → Access Tokens** (oħloq, irtira, ikkopja-darba).

Token ma jistax qatt jinħoloq b'privileġġ akbar minn dak li għandu l-ħallieq tiegħu. Token `admin` jista' joħloqu biss l-operatur: sessjoni tad-dashboard, is-CLI lokali fuq is-server innifsu, jew `omniroute connect` bil-password. Credentials tal-magni (token ta' aċċess `admin`, jew ċavetta API bl-iskop `manage`/`admin`) jistgħu joħolqu biss tokens `write` u `read`; jekk jitolbu `--scope admin`, jirritornaw `403`. It-tneħħija tal-login ma tiftaħx il-minting: token ta' aċċess ta' kwalunkwe skop huwa credential li r-rotot dejjem awtentikati jaċċettaw, għalhekk sejħa anonima tirċievi `401` f'kwalunkwe skop.

---

## Il-konfigurazzjoni ta' CLI tal-kodifikazzjoni mill-katalgu remot

`omniroute configure` jaqra l-katalgu tal-mudelli live tas-**server attiv** u jikteb konfigurazzjoni fuq **il-magna** tiegħek.

```bash
omniroute configure codex
#   Providers: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   Model id: glm/glm-5.2
#   ✔ Miktub ~/.codex/glm52.config.toml
#   Uża: codex --profile glm52

# mingħajr interazzjoni
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# żomm mudell użat spiss fil-quċċata tal-għażla interattiva
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

L-għażel iżomm biss il-model IDs (qatt mhux URLs jew credentials) fil-fajl lokali `model-preferences.json`, fil-limiti tal-kuntest u tal-mira tas-CLI. Il-favoriti jintweru qabel l-għażliet reċenti; uża `--unfavorite` biex titneħħa mudell magħżul mil-lista tal-kuntest/mira.

Il-profil miktub jirreferi għaċ-ċavetta tal-inferenza permezz ta' varjabbli tal-ambjent (`OMNIROUTE_API_KEY`). Is-sigriet qatt ma jinkiteb fuq id-disk. Għas-setup bażiku ta' Codex darba (il-blokk `[model_providers.omniroute]`), ara [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Ibda CLI kontra r-remot (mingħajr ma tinkiteb konfigurazzjoni)

`omniroute run <target>` jirrispetta wkoll il-kuntest attiv: l-URL bażi remota u l-credential tal-kuntest jiġu injettati fil-proċess imnedi biss.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → remote
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Ara eżattament dak li jiġi mnedi (ismijiet ta' KEY tal-env biss, mhux il-valuri):
omniroute run codex --dry-run --json
```

Il-mira: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` (sors wieħed: `bin/cli/cli-manifest.mjs`). Qwen u Gemini jaħdmu b'dar iżolata temporanja li titneħħa meta joħorġu, għalhekk it-tnedija qatt ma tmiss jew titnixxa fil-konfigurazzjoni personali tal-għodda tiegħek.

### Kmandi ta' setup għal kull CLI

Kull CLI appoġġjat għandu kmand ta' setup li jaf bir-remot (kollha jirrispettaw il-kuntest attiv, jew `--remote <url> --api-key <key>`):

| CLI         | Kmand                      | Dak li jikteb                                                                                                                                                                                        |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profili `~/.codex/<name>.config.toml` (għal kull mudell)                                                                                                                                             |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (għal kull mudell)                                                                                                                                         |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json`: il-provider `omniroute` kompatibbli ma' openai b'kull mudell tal-katalgu (mexxi `opencode -m omniroute/<model>`)                                                 |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (modalità CLI) + jistampa s-settings tal-estensjoni tal-VS Code biex tiġi mmexxija (kompatibbli ma' OpenAI, Base URL **mingħajr** `/v1`)                  |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + settings tal-VS Code `kilocode.*`: kompatibbli ma' OpenAI, Base URL **b'** `/v1`                                                                             |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI): `provider: openai`, `apiBase` **b'** `/v1`, ċavetta permezz ta' `${{ secrets.OMNIROUTE_API_KEY }}`                                         |
| Cursor      | `omniroute setup-cursor`   | jistampa l-passi ġewwa l-app (Settings → Models → Override OpenAI Base URL **b'** `/v1` + ċavetta + mudell). Il-konfigurazzjoni tal-Cursor hija SQLite mhux trasparenti, għalhekk biss il-chat panel |
| Roo Code    | `omniroute setup-roo`      | jikteb JSON ta' importazzjoni għal Roo (`~/.omniroute/roo-settings.json`) + jissettja `roo-cline.autoImportSettingsPath` + jistampa l-passi tal-UI (kompatibbli ma' OpenAI, Base URL **b'** `/v1`)   |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json`: provider `openai-compat`, `base_url` **b'** `/v1`, ċavetta permezz ta' `$OMNIROUTE_API_KEY`                                                                            |
| Zed         | `omniroute setup-zed`      | `~/.config/zed/settings.json`: `language_models.openai_compatible.omniroute`, `api_url` **b'** `/v1`, Zed jaqra č-ċavetta minn `$OMNIROUTE_API_KEY` (qatt ma tinkiteb)                               |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **mingħajr** `/v1` + `GOOSE_MODEL`) + env recipe                                                                              |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **mingħajr** `/v1` + `model: openai/<id>`) + env recipe (`aider --message --yes`)                                                                             |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` entry V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` f'`~/.qwen/.env`                                                                                                      |

```bash
# OpenCode (provider kompatibbli ma' openai, il-mudelli kollha tal-katalgu, VPS remota)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # żomm biss il-mudelli li jaqblu
opencode -m omniroute/glm/glm-5.2 "..."          # esporta OMNIROUTE_API_KEY l-ewwel
```

> OpenCode għandu wkoll integrazzjoni **plugin** aktar rikka: `omniroute setup opencode` (issa jaf bir-remot permezz ta' `--remote`) jinstalla `@omniroute/opencode-plugin`.
> `setup-opencode` huwa alternattiva ħafifa kompatibbli ma' openai. Iċ-ċavetta tal-API tiġi rreferita permezz ta' `{env:OMNIROUTE_API_KEY}`, u qatt ma tinkiteb fuq id-disk.
>
> Fuq OpenCode v2, uża minflok `@omniroute/opencode-plugin-v2`: l-istess katalgu, kuntratt ta' loader differenti. Jaqra č-ċavetta mill-ħażna tal-credentials tal-OpenCode innifsu meta l-integrazzjoni tkun konnessa, għalhekk gateway remota ma teħtieġ l-ebda ċavetta f'`opencode.json`.

---

## Il-ġestjoni tal-kuntesti (tibdil bejn is-servers)

**Kuntest** huwa server salvat (baseUrl + kredenzjali + skop). `omniroute connect` joħloq wieħed u jagħmlu attiv; minn hemm 'il quddiem kull kmand jimmira lejh. Immaniġġja u aqleb bejniethom b'`omniroute contexts`:

```bash
omniroute contexts list            # il-kuntesti kollha; dak attiv huwa mmarkat ●
omniroute contexts current         # is-server attiv, l-istatus tal-awtentikazzjoni, l-iskop
```

```text
  | Isem    | URL Bażi                  | Awtentikazzjoni | Skop  | Deskrizzjoni
● | vps     | http://100.67.86.91:20128 | token           | admin | OmniRoute Remot (…)
  | default | http://localhost:20128    | ✗               |       |
```

**Aqleb is-servers** — kull kmand sussegwenti jsegwi l-kuntest attiv:

```bash
omniroute contexts use vps         # → il-kmandi kollha issa jolqtu l-VPS remot
omniroute tokens list              #   (titħaddem kontra l-VPS)

omniroute contexts use default     # → lura għal localhost
omniroute tokens list              #   (titħaddem kontra s-server lokali)
```

**Żid kuntest manwalment** (minflok `connect`), spezzjona, jew semmi mill-ġdid:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # dettalji sħaħ għal kuntest wieħed
omniroute contexts rename staging stg
```

**Neħħi kuntest** — titlob konferma; għaddi `--yes` biex taqbeżha (meħtieġa għal skripts / shells mhux interattivi, li altrimenti jirrifjutaw b'mod sikur):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) ma jistax jitneħħa. It-tneħħija tal-kuntest attiv terġa' lura għal `default`. Tip: it-tneħħija ta' kuntest tneħħi biss il-kredenzjali ssalvata **lokalment** — irrevoka t-token fuq is-server b'`omniroute tokens revoke <id>` biex fil-fatt toqtol l-aċċess.

**Esporta / importa** kuntesti (eż. biex tmexxihom bejn il-magni). L-esportazzjonijiet iħallu barra l-kredenzjali b'mod awtomatiku, inklużi kredenzjali maħżuna mill-fallback tal-fajl. Uża `--include-secrets` espliċitament meta jkun meħtieġ backup portabbli li jġorr kredenzjali:

```bash
omniroute contexts export --out contexts.json     # imħassra; destinazzjoni awtomatika: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # tissostitwixxi; --merge biex iżżomm dawk eżistenti
omniroute contexts migrate --yes                  # iċċaqlaq tokens plaintext legati għall-keychain
```

`--include-secrets` issolvi r-referenzi tal-keychain qabel l-esportazzjoni u tfalli jekk xi kredenzjali referenzjata ma tistax tinqara. `--no-secrets` dejjem tieħu preċedenza. Il-fajls tal-esportazzjoni jinkitbu b'mod atomiku bil-mod `0600`. Ittratta esportazzjoni espliċita li ġġorr sigriet bħala materjal sigriet. Fuq sistemi mingħajr ras mingħajr keychain OS utilizzabbli, is-CLI terġa' lura għal `config.json` bil-mod `0600` u tipprintja twissija ta' darba; esportazzjoni awtomatika tibqa' mħassra f'dan il-mod.

---

## Verifika rapida mill-bidu sat-tmiem

Ċiklu li tista’ tikkopja u twaħħal biex tivverifika konfigurazzjoni remota mill-bidu nett — qabbad, oħloq
token b’ambitu speċifiku, idderieġi kmand, aqleb lura, u żarma l-konfigurazzjoni. Issostitwixxi
`192.168.0.15` bl-host/IP tas-server tiegħek (Tailscale, LAN, jew URL pubbliku
`https://…`).

```bash
# 1. Qabbad (password → token admin, issejvjat bħala kuntest li jsir attiv)
omniroute connect 192.168.0.15                 # jew: --key oma_live_xxxx  (mingħajr password)
omniroute contexts current                     # juri s-server remot + l-ambitu

# 2. Użah — il-kmandi tal-ġestjoni issa jitħaddmu kontra s-server remot
omniroute tokens create --name laptop --scope read   # oħloq token b’ambitu aktar ristrett
omniroute tokens list                                 # lista moħbija parzjalment, mis-server remot

# 3. Aqleb lura u ’l quddiem
omniroute contexts use default                 # → lokali
omniroute contexts use 192-168-0-15            # → remot mill-ġdid (isem minn `contexts list`)

# 4. Żarma l-konfigurazzjoni. NOTA: `contexts remove` iħassar biss il-kredenzjali LOKALI —
#    MA jirrevokax it-token fuq is-server. L-ewwel irrevokah fuq is-server jekk
#    trid twaqqaf l-aċċess għalkollox.
omniroute tokens revoke <id|prefix>            # iwaqqaf l-aċċess fuq is-server
omniroute contexts remove 192-168-0-15 --yes   # neħħi l-kuntest lokali (anke jekk attiv → jerġa’ lura għal default), mingħajr konferma
```

> `--yes` jagħmel `contexts remove` mhux interattiv (meħtieġ fi skripts/CI; mingħajru,
> shell mhux interattiv jirrifjuta b’mod sikur minflok jibqa’ mwaħħal). It-tneħħija tal-kuntest
> **attiv** terġa’ taqleb għal `default` awtomatikament.

---

## Noti dwar is-sigurtà

- It-test mhux kodifikat tat-token jintwera darba biss; jiġi ppersistit biss il-hash SHA-256 (l-istess bħaċ-ċwievet tal-API).
- `omniroute connect` jerġa’ juża l-imblukkar kontra tentattivi ripetuti ta’ login + ir-reġistrazzjoni tal-awditjar.
- Ippreferi HTTPS jew Tailnet għat-trasport; host waħdu juża `http://`
  b’mod awtomatiku għall-konvenjenza fuq LAN/Tailscale — għaddi URL sħiħ `https://…` għal TLS.
- Il-fajl tal-kuntest lokali ppreferut huwa `~/.omniroute/config.json` (`chmod 600`)
  li jkun fih biss `credentialRef`; it-token innifsu jinħażen fil-keychain tas-sistema
  operattiva (`keytar`) u qatt ma jiġi stampat fir-reġistri. Installazzjonijiet headless mingħajr
  keychain nattiva li taħdem jużaw l-istess fajl `0600` bħala alternattiva espliċita u
  joħorġu twissija darba. Uża `omniroute contexts migrate --yes` wara li tinstalla
  backend tal-keychain.

---

## Endpoints tal-API (referenza)

| Metodu | Rotta                 | Awtentikazzjoni       | Ambitu                           |
| ------ | --------------------- | --------------------- | -------------------------------- |
| POST   | `/api/cli/connect`    | password tal-ġestjoni | — (pubbliku, protett b’password) |
| GET    | `/api/cli/whoami`     | token tal-aċċess      | qari                             |
| GET    | `/api/cli/tokens`     | token tal-aċċess      | amministrazzjoni                 |
| POST   | `/api/cli/tokens`     | token tal-aċċess      | amministrazzjoni                 |
| DELETE | `/api/cli/tokens/:id` | token tal-aċċess      | amministrazzjoni                 |

Ara [openapi.yaml](../openapi.yaml) għall-iskemi sħaħ.
