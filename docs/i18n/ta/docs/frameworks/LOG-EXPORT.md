# Log export (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute அழைப்புப் பதிவுகளை வெளிப்புற பகுப்பாய்வுச் சேமிப்பகத்திற்கு தொடர்ச்சியாகவும், படிப்படியாகவும் ஏற்றுமதி செய்தல்.

Logs டாஷ்போர்டு தாவல் கோரிக்கை வரலாற்றை SQLite (`call_logs`) இல் வைத்திருக்கிறது; இது சுழற்சி மற்றும் தக்கவைப்புக் கொள்கைகளால் வரையறுக்கப்படுகிறது. பதிவேற்றுமதி அதே பதிவுத் தொகுப்பை ஒரு கால அட்டவணைப்படி வெளியே அனுப்புகிறது; இதனால் அது உள்ளக தரவுத்தளத்தைவிட நீண்ட காலம் நிலைத்திருக்கவும், பிற தரவுகளுடன் இணைக்கப்படவும் முடியும். BigQuery முதல் இலக்காகும்; இந்தப் பைப்லைன் ஒரு பதிவகமாக இருப்பதால், கூடுதல் இலக்குகளைச் சேர்க்க முடியும்.

---

## 1. இது எவ்வாறு செயல்படுகிறது

```
server (config-ஐ மறைகுறிநீக்கி + சரிபார்த்து, cursor-ஐ ஒத்திசைக்கிறது)
  → IPC-ஐத் தொடங்கு → தனிமைப்படுத்தப்பட்ட exportChild OS process
    → வாசிக்க மட்டும் இயலும் storage.sqlite → பகிரப்பட்ட call-log query/mapping
      → ஒத்திசைவற்ற artifact hydration → destination prepare()/send()
        → batch IPC → server cursor-ஐ நிலைநிறுத்துகிறது → ack IPC
          → அடுத்த batch; done IPC → server வெற்றியைப் பதிவு செய்கிறது
```

- **அட்டவணை** — ஒரே ஒரு `JobRegistry` cron job, `log_export`; இயல்புநிலை `0 * * * *` (ஒவ்வொரு மணிநேரமும்,
  UTC). இது `src/lib/initCloudSync.ts`-இல் பதிவு செய்யப்படுகிறது; `OMNIROUTE_LOG_EXPORT_CRON` மூலம் மாற்றியமைக்கலாம்.
  ஒவ்வொரு tick-உம் **இயக்கப்பட்டுள்ள** அனைத்து destination-களையும் வரிசையாக முழுமையாகச் செயலாக்குகிறது.
- **Cursor** — SQLite-இன் மறைமுகமான `call_logs.rowid`, ஒவ்வொரு destination-க்கும்
  `log_export_destinations.cursor_row_id`-இல் நிலைநிறுத்தப்படுகிறது. `timestamp` வேண்டுமென்றே cursor-ஆகப் பயன்படுத்தப்படுவதில்லை: அழைப்பாளர்கள்
  தங்களுடைய சொந்த மதிப்பை வழங்கக்கூடும்; எனவே பின்னர் தொடங்கிய வேகமான request-க்குப் பிறகு மெதுவான request எழுதப்படலாம்,
  மேலும் timestamp cursor அதைத் தவிர்த்துவிடும்.
- **Batching** — ஒவ்வொரு request-க்கும் `batch_size` rows (இயல்புநிலை 500), ஒவ்வொரு run-க்கும்
  `max_rows_per_run` rows (இயல்புநிலை 10000); இதனால் பெரிய backlog ஒன்று ஒரே tick-ஐத் தடுப்பதற்குப் பதிலாகப்
  பல tick-களில் படிப்படியாகச் செயலாக்கப்படும்.
- **வழங்கல்** — `send()` நிறைவடைந்த பின்னரே cursor முன்னேறும். தோல்வியுற்ற batch,
  cursor-ஐ இருந்த இடத்திலேயே விட்டுவிடும்; எனவே அடுத்த run-இல் அதே rows மீண்டும் முயற்சிக்கப்படும். உத்தரவாதம்
  at-least-once மற்றும் destination-பக்க de-duplication ஆகியவையே; உண்மையான exactly-once அல்ல: BigQuery ஒவ்வொரு
  row-க்கும் call-log id-ஐ key-ஆகப் பயன்படுத்துகிறது; தனது சொந்த dedup window-க்குள் best-effort அடிப்படையில் இதை மதிக்கிறது.
- **Overlap guard** — cron tick மற்றும் `POST .../run` ஆகியவை ஒரே நேரத்தில் இயங்கலாம். ஏற்கெனவே
  செயலாக்கப்பட்டுக் கொண்டிருக்கும் destination இரண்டாவது முறையாகச் செயலாக்கப்படாமல் தவிர்க்கப்படும் (run result-இல் `skipped: true`);
  எனவே ஒரே நேரத்தில் நடக்கும் run ஒரு batch-ஐ மீண்டும் அனுப்பவோ cursor-ஐப் பின்னோக்கி எழுதவோ முடியாது.
- **Purge recovery** — `cursor_row_id`, `MAX(rowid)`-ஐவிட அதிகமாக இருந்தால் (முழு table-உம்
  purge செய்யப்பட்டு rowid-கள் மீண்டும் தொடங்கியிருந்தால்), runner நிரந்தரமாகத் தரவைப் பார்க்க முடியாமல் போவதற்குப் பதிலாக 0-க்கு மீள்கிறது.

### தனிமைப்படுத்தப்பட்ட runner மற்றும் வரம்புகள்

Node-இல் ஒவ்வொரு destination run-உம் தனியான, குறுகிய காலம் மட்டுமே இயங்கும் OS child process-ஐ (`child_process`
மற்றும் IPC; `worker_threads` அல்ல) தொடங்குகிறது. Body வாசிப்புகள், payload JSON parsing/serialization, destination
`prepare()` மற்றும் destination network I/O அனைத்தும் server-இன் event loop-இல் அல்லாமல் அங்கேயே இயங்குகின்றன.
Configuration மற்றும் சிறிய progress message-கள் மட்டுமே IPC வழியாகச் செல்கின்றன; export செய்யப்பட்ட record-கள் ஒருபோதும்
server-க்குத் திரும்புவதில்லை. cron job மற்றும் இப்போது இயக்கு route ஆகியவை அதே public result மற்றும் overlap guard-ஐத் தக்கவைக்கின்றன.

Child, server தீர்மானித்த `DATA_DIR/storage.sqlite`-ஐ `node:sqlite` பயன்படுத்தி வாசிக்க மட்டும் இயலும் வகையில் திறக்கிறது;
இதில் `busy_timeout=5000` மற்றும் `query_only=ON` பயன்படுத்தப்படுகின்றன. இது எந்த DB singleton-ஐயும் import செய்வதில்லை; மேலும்
migration, backup அல்லது SQLite update எதையும் மேற்கொள்வதில்லை. காணாமல் போன/சிதைந்த artifact bookkeeping (சிதைந்த-artifact
UPDATE உட்பட) dashboard detail path-இல் மட்டுமே தொடர்கிறது. இரண்டு path-களும் ஒரு pure
detail resolver-ஐப் பகிர்கின்றன; export ஒத்திசைவற்ற filesystem வாசிப்புகளையும் அதே artifact → legacy
inline → legacy disk → none resolution order-ஐயும் பயன்படுத்துகிறது. Child தனது reader-ஐத் திறக்கும்போது, ஒரு run அதிகபட்ச insertion rowid-ஐ
snapshot எடுக்கிறது; அதற்குப் பிறகான insert-கள் அடுத்த run வரை காத்திருக்கும். இது insertion
boundary மட்டுமே; நீண்ட காலம் நீடிக்கும் SQLite transaction அல்ல: network காத்திருப்புகளின்போது WAL writer-களும் checkpoint-களும் தடையின்றி இயங்கலாம்.
ஏற்கெனவே உள்ள row-களின் update/delete செயல்பாடுகள் இந்த boundary மூலம் உறையவைக்கப்படுவதில்லை.

ஏற்றுக்கொள்ளப்பட்ட ஒவ்வொரு batch-க்குப் பிறகும் child acknowledgement-க்காகக் காத்திருக்கும். Server முதலில்
`advanceLogExportCursor` மூலம் cursor-ஐ நிலைநிறுத்தி, பின்னர் `ack`-ஐ அனுப்புகிறது; அதற்கு முன் அடுத்த batch தொடங்காது.
Send தோல்வி, crash அல்லது timeout ஏற்பட்டால், அந்த batch முன்னேற்றப்படாமல் தோல்வி பதிவு செய்யப்படும். முன்பு
acknowledge செய்யப்பட்ட batch-கள் commit செய்யப்பட்ட நிலையிலேயே இருக்கும்; acknowledge செய்யப்படாத ஒரே ஒரு batch மட்டுமே மீண்டும் அனுப்பப்படலாம்.
`done` கிடைத்து child சீராக exit ஆன பின்னரே வெற்றி பதிவு செய்யப்படும். தோல்விகள் child-ஐ
SIGTERM மூலம் நிறுத்துகின்றன; 500 ms கழித்தும் அது நிற்காவிட்டால் SIGKILL பயன்படுத்தப்படும், மேலும் runner process மூடப்படும் வரை காத்திருக்கும்.

| சூழல் மாறி                                    | இயல்புநிலை | நோக்கம்                                       |
| --------------------------------------------- | ---------- | --------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | ஒவ்வொரு destination-க்குமான wall-clock வரம்பு |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | MB-இல் child V8 old-space வரம்பு              |

செல்லாத/நேர்மறையல்லாத/முழு எண் அல்லாத மதிப்புகளுக்கு இயல்புநிலைகள் பயன்படுத்தப்படும். Heap அமைப்பு மொத்த
RSS வரம்பு அல்ல; மிகப் பெரிய batch-கள் இன்னும் child memory-ஐத் தீர்த்துவிட்டு run-ஐப் பாதுகாப்பாகத் தோல்வியடையச் செய்யலாம்.
1024 MB இயல்புநிலை, body-கள் இயக்கப்பட்டுள்ள நிலையில் 512 KiB artifact-களைக் கொண்ட இயல்புநிலை 500-row batch-க்கு,
BigQuery-இன் byte-chunked JSON serialization உட்பட, கூடுதல் இடத்தை வழங்குகிறது. ஆனால் இது
10000-row body batch-ஐப் பாதுகாப்பானதாக மாற்றாது. V8 heap தீர்ந்துபோவது, செயல்படுத்தக்கூடிய தோல்விச் செய்தியைப் பதிவு செய்யும்: batch
அளவைக் குறைக்கவும் அல்லது `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`-ஐ உயர்த்தவும்; cursor கடைசியாக
acknowledge செய்யப்பட்ட batch-இலேயே இருக்கும். வரலாற்றுச் சார்ந்த inline/disk body-கள் நவீன artifact வரம்புக்குள் வராது.
குறிப்பாக memory வரம்புள்ள container-களுக்குள், operator-கள் RSS-ஐத் தனியாகத் திட்டமிட வேண்டும்.

Child, தீர்மானிக்கப்பட்ட `DATA_DIR`, `NODE_ENV`, வெளிப்படையாக அமைக்கப்பட்ட `TZ` (legacy filename-இன்
local-time resolution), இருப்பின் `ELECTRON_RUN_AS_NODE`, மற்றும் பின்வரும் outbound input-களை மட்டுமே பெறுகிறது:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (மற்றும் அவற்றின் lowercase வடிவங்கள்),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
ஒரு global Undici dispatcher, server-இன் pure environment-proxy resolution மற்றும் local-host
bypass விதிகளை, `NO_PROXY` உட்பட, பகிர்கிறது; இது `proxyFetch.ts` அல்லது அதன் DB/feature flag-களை import செய்வதில்லை.
Forward செய்யப்படும் output மற்றும் பதிவு செய்யப்பட்ட error-களிலிருந்து proxy credential-கள் மறைக்கப்படுகின்றன. Destination credential-கள்
ஒரே ஒரு start IPC message-இல் மட்டுமே பயணிக்கின்றன; argv அல்லது environment வழியாக ஒருபோதும் அனுப்பப்படுவதில்லை; output/error forwarding-க்கு
prefix சேர்க்கப்பட்டு sanitize செய்யப்படுகிறது. ஒவ்வொரு cron run-இலும் Node-இன் SQLite warning மீண்டும் தோன்றுவதைத் தவிர்க்க,
child exec argument-களில் `ExperimentalWarning` மட்டுமே முடக்கப்படுகிறது; மற்ற warning வகைகள் தொடர்ந்து காண்பிக்கப்படும்.

இலக்கு மாட்யூல்களை Next.js/சர்வர்-மட்டும் சார்புகள் இல்லாமல் இறக்குமதி செய்யக்கூடியதாக இருக்க வேண்டும். தற்போதுள்ள
BigQuery செயலாக்கம் ஏற்கனவே அந்த ஒப்பந்தத்தைப் பூர்த்தி செய்கிறது. அணுகல்-டோக்கன் தற்காலிகச் சேமிப்புகள் துணை
இயக்கத்தின் காலத்திற்கு மட்டுமே நீடிக்கும்; இயக்கங்களுக்கு இடையே நீடிக்காது. Node தான் ஆதரிக்கப்படும் இயக்கச்சூழல் (`package.json` engines), ஆனால் README-இன் Bun
நிறுவல் பகுதியும் `Dockerfile.bun`-உம் `bun:sqlite`-ஐ (`src/lib/db/core.ts` / அடாப்டர்கள்) பயன்படுத்தும்
உற்பத்தி இணக்கப் பாதையையும் அறிவிக்கின்றன. எனவே Bun-இன் கீழ், ஏற்றுமதிகள் முந்தைய
செயல்முறைக்குள்ளான பாதையையே தக்கவைத்து, ஒருமுறை மட்டும் எச்சரிக்கையை வெளியிடும்: துணை heap/timeout தனிமைப்படுத்தல் கிடைக்காது.
event-loop மற்றும் OOM தனிமைப்படுத்தலுக்கு Node-ஐப் பயன்படுத்தவும்; இங்கே Bun உருவாக்கத்திற்காக மட்டும் பயன்படுத்தப்படுவதாகக் கருதப்படவில்லை.

`includeBodies` இயக்கப்பட்டிருக்கும்போது, மணிநேர payload பின்னடைவைச் சேர விடாமல்
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` போன்ற நிமிட-அளவிலான கால அட்டவணையை விரும்பவும்.
தொகுதி மற்றும் வரம்புகள் ஒவ்வொரு இயக்கத்தையும் தொடர்ந்து கட்டுப்படுத்துகின்றன. ஒவ்வொரு இயக்கத்திலும் ஒவ்வொரு இலக்கிற்கும்
செயல்முறைத் தொடக்கச் செலவு ஏற்படும்; இது மொத்த CPU பயன்பாட்டைக் குறைப்பதற்காக அல்ல, சர்வர் event-loop தனிமைப்படுத்தலுக்காக
சிறிய தொடக்கச் செலவை ஏற்கிறது.

### Payload-கள் (prompt-களும் completion-களும்)

இயல்பாக, Logs **பட்டியல்** காட்டும் சுருக்கப் புலங்களை மட்டுமே ஏற்றுமதி கொண்டிருக்கும். **Prompt-களையும் பதில்களையும் ஏற்றுமதி செய்** என்பதை (`includeBodies`) இயக்குவது, ஒவ்வொரு அழைப்பிற்கும் Logs **விவர**
பலகம் காட்டுவதையும் கூடுதலாக அனுப்பும்:

| புலம்                            | அதில் உள்ளவை                                                      |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | dashboard காட்டும் விதத்தில் அழைப்பின் payload-கள்                |
| `pipeline_route_decision`        | router தேர்ந்தெடுத்த இலக்கும் model-உம்                           |
| `pipeline_client_request`        | client அனுப்பியபடியே உள்ள அசல் request                            |
| `pipeline_openai_request`        | உள்நிலை OpenAI வடிவத்திற்கு மாற்றப்பட்ட பிந்தைய request           |
| `pipeline_provider_request`      | provider dialect-இல் upstream-க்கு உண்மையில் அனுப்பப்பட்டது       |
| `pipeline_provider_response`     | அசல் upstream response                                            |
| `pipeline_client_response`       | அழைப்பாளருக்குத் திருப்பி வழங்கப்பட்டது                           |
| `pipeline_error`                 | தோல்வியடைந்த அழைப்பிற்கான pipeline-நிலை error விவரம்              |
| `bodies_truncated`               | மேலுள்ள ஏதேனும் புலம் `maxBodyBytes` வரம்பை எட்டியிருந்தால் உண்மை |

இது prompt உள்ளடக்கம் என்பதால், இது **இயல்பாக முடக்கப்பட்டிருக்கும்**; மேலும் திட்டமிட்டே ஒவ்வொரு இலக்கிற்குமான தனிப்பட்ட தேர்வாகும்.
அனுப்பப்படுவது dashboard காட்டுவதுதான், ஏனெனில் ஏற்றுமதியும் `getCallLogById`-உம் ஒரே விவரத்
தீர்மானத்தைப் பகிர்கின்றன: payload-கள் எழுதப்படும்போதே
PII அகற்றிச் சுத்திகரிக்கப்பட்டு, ரகசியங்கள் மறைக்கப்படுகின்றன; மேலும் `noLog` API key மூலம் செய்யப்பட்ட அழைப்பு
எந்த payload-ஐயும் சேமிக்காது, எனவே ஏற்றுமதி செய்வதற்கு எதுவும் இருக்காது.

ஒவ்வொரு வரிக்கும் filesystem artifact-இலிருந்து payload-கள் படிக்கப்படுகின்றன, எனவே அதைக் கோரிய இலக்குகளுக்கு மட்டுமே
hydration இயங்கும். artifact இல்லாவிட்டாலோ சிதைந்திருந்தாலோ, தொகுதி தோல்வியடைந்து cursor சிக்கிக்கொள்வதற்குப் பதிலாக,
அதன் சுருக்கம் null payload-களுடன் ஏற்றுமதி செய்யப்படும்.

`maxBodyBytes` (இயல்புநிலை 262144) ஒவ்வொரு புலத்திற்கும் உச்ச வரம்பை விதிக்கிறது. நீளமான payload-கள் **நீக்கப்படுவதற்குப் பதிலாக
துண்டிக்கப்படும்** — துண்டிக்கப்பட்ட prompt-உம் "என்ன கேட்கப்பட்டது" என்பதற்குப் பதிலளிக்கும் — மேலும் அந்த வரி
`bodies_truncated` மூலம் குறிக்கப்படும். ஸ்ட்ரீம் செய்யப்பட்ட துண்டு-துண்டான delta-கள் ஏற்றுமதி செய்யப்படாது; ஒன்றுசேர்க்கப்பட்ட response ஏற்கனவே
`pipeline_provider_response` மற்றும் `pipeline_client_response`-இல் உள்ளது.

---

## 2. கோப்புகள்

| பகுதி                         | இருப்பிடம்                                   |
| ----------------------------- | -------------------------------------------- |
| இலக்கு ஒப்பந்தம்              | `src/lib/logExport/types.ts`                 |
| பதிவகம்                       | `src/lib/logExport/registry.ts`              |
| ரகசியக் கையாளுதல்             | `src/lib/logExport/secrets.ts`               |
| இயக்கி (பெற்றோர் IPC)         | `src/lib/logExport/runner.ts`                |
| செயல்முறை வாழ்க்கைச் சுழற்சி  | `src/lib/logExport/childRunner.ts`           |
| சேய் நுழைவுப்புள்ளி           | `src/lib/logExport/exportChild.ts`           |
| வாசிக்க மட்டும் திறப்பான்     | `src/lib/db/logExportReadOnly.ts`            |
| பகிரப்பட்ட வினவல்/வரைபடுத்தல் | `src/lib/usage/callLogExportQueries.ts`      |
| விவரத் தீர்வி                 | `src/lib/usage/callLogDetailResolver.ts`     |
| API முன்னிறுத்தல்             | `src/lib/logExport/presenter.ts`             |
| BigQuery இலக்கு               | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA அங்கீகரிப்பு        | `src/lib/logExport/googleServiceAccount.ts`  |
| அழைப்புப் பதிவு மூலம்         | `src/lib/usage/callLogExportSource.ts`       |
| நிலைத்த சேமிப்பு              | `src/lib/db/logExportDestinations.ts`        |
| Cron பணி                      | `src/lib/jobs/logExportJob.ts`               |
| REST அடுக்கு                  | `src/app/api/log-export/`                    |
| கட்டுப்பாட்டுப் பலகைப் பக்கம் | `src/app/(dashboard)/dashboard/log-export/`  |

தரவுத்தளத் திட்டம்: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

அனைத்து வழித்தடங்களும் மேலாண்மை அங்கீகாரம் செய்யப்பட்டவை (`requireManagementAuth`). இரகசியங்கள் ஒருபோதும் திருப்பி அனுப்பப்படுவதில்லை:
சேமிக்கப்பட்ட இரகசியம் `__stored__` என்ற நேரடி மதிப்பாகத் திரும்பும்; புதுப்பிப்பின்போது அந்த மதிப்பையே மீண்டும் அனுப்புவது
சேமிக்கப்பட்ட நற்சான்றைத் தக்கவைக்கும்.

இரகசியத்தை அறிவிக்கும் வகையைக் கொண்ட இலக்கை உருவாக்க அல்லது புதுப்பிக்க **`STORAGE_ENCRYPTION_KEY`
தேவை**. அது இல்லாமல் `encrypt()` அமைதியாக உள்ளீட்டை அப்படியே அனுப்பிவிடும்; எனவே SQLite-இல் நற்சான்றை
மறைகுறியாக்கப்படாத எளிய உரையாகச் சேமிப்பதற்குப் பதிலாக, எழுதுதல் 400 பிழையுடன் மறுக்கப்படும் (Telegram webhook பயன்படுத்தும் அதே பாதுகாப்பு).

| முறை     | பாதை                                     | நோக்கம்                                                                    |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | இலக்கு வகைகள் + அவற்றின் உள்ளமைவுப் புலங்களின் பட்டியல்                    |
| `GET`    | `/api/log-export/destinations`           | இலக்குகளைப் பட்டியலிடுதல் (இரகசியங்கள் மறைக்கப்படும்)                      |
| `POST`   | `/api/log-export/destinations`           | ஓர் இலக்கை உருவாக்குதல்                                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | ஒன்றை வாசித்தல்                                                            |
| `PUT`    | `/api/log-export/destinations/{id}`      | பெயர் / செயலாக்க நிலை / உள்ளமைவு / தொகுப்பாக்கம் ஆகியவற்றைப் புதுப்பித்தல் |
| `DELETE` | `/api/log-export/destinations/{id}`      | நீக்குதல்                                                                  |
| `POST`   | `/api/log-export/destinations/{id}/test` | நற்சான்றுகளைச் சோதித்தல், எதையும் எழுதாது                                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | இப்போதே வெளியேற்றுதல், திட்டமிடப்பட்ட இயக்கத்தின் அதே பாதை                 |
| `GET`    | `/api/log-export/status`                 | Cron நிலை, அண்மைய இயக்கங்கள், ஒவ்வொரு இலக்கிற்குமான நிலுவை                 |

`GET /api/log-export/types` என்பதே UI-ஐ பொதுவானதாக்குகிறது: திரும்பப் பெறப்படும் புல விவரிப்பான்களிலிருந்து
கட்டுப்பாட்டுப் பலகப் படிவம் உருவாக்கப்படுவதால், ஒரு புதிய இலக்கிற்கு UI மாற்றம் தேவையில்லை.

---

## 4. BigQuery இலக்கு

உள்ளமைவு விசைகள் (`type: "bigquery"`):

| விசை                 | குறிப்புகள்                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `projectId`          | தரவுத்தொகுப்பைக் கொண்டுள்ள GCP திட்டம்                                                         |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                |
| `location`           | தரவுத்தொகுப்பை உருவாக்க வேண்டியிருக்கும் போது மட்டும் பயன்படுத்தப்படும் (இயல்புநிலை `EU`)      |
| `serviceAccountJson` | சேவைக் கணக்கு விசை. இரகசியம்: சேமிப்பில் மறைகுறியாக்கப்படும், ஒருபோதும் திருப்பி அனுப்பப்படாது |
| `autoCreate`         | முதல் ஏற்றுமதியில் தரவுத்தொகுப்பையும் அட்டவணையையும் உருவாக்குதல் (இயல்புநிலை `true`)           |

இலக்கு அட்டவணையில் சேவைக் கணக்கிற்கு `bigquery.tables.updateData` தேவை; மேலும்
`autoCreate` இயக்கப்பட்டிருக்கும்போது `bigquery.datasets.create` / `bigquery.tables.create` தேவை.

உள்ளமைக்கப்பட்ட தொகுப்பு என்பது **கர்சர்** அலகு, HTTP அலகு அல்ல: `send()` அதை அதிகபட்சம் 500 வரிகள் கொண்ட
insertAll அழைப்புகளாகப் பிரிக்கிறது; எனவே ஒரு பெரிய `batch_size`, BigQuery-இன் 10 MB கோரிக்கை வரம்பை மீறச் செய்யாது.
தற்காலிக நிலைகள் (408/429/500/502/503/504), அதே insertIds-ஐ மீண்டும் பயன்படுத்தி, அதிகரிக்கும் இடைவெளியுடன்
மூன்று முறை வரை மீண்டும் முயற்சிக்கப்படும்; அங்கீகாரம் மற்றும் திட்டவடிவத் தோல்விகள் இயக்கத்தை வீணாக்காமல் முதல் முயற்சியிலேயே விதிவிலக்கை எறியும்.

சில நொடிகளுக்கு முன்பு உருவாக்கப்பட்ட அட்டவணை streaming endpoint-க்கு இன்னும் புலப்படாது; அது
சில நொடிகளுக்கு 404 எனப் பதிலளிக்கும். அந்த 404 மீண்டும் முயற்சிக்கப்படும், ஆனால் **இந்த இயக்கம் அட்டவணையை உருவாக்கியிருந்தால் மட்டும்** —
உண்மையாகவே இல்லாத அட்டவணை உடனடியாகத் தோல்வியடையும். அண்மையில் நீக்கப்பட்ட அட்டவணையின் அதே பெயரில் அதை மீண்டும்
உருவாக்குவது, streaming inserts-ஐ பல நிமிடங்களுக்கு BigQuery மறுக்கச் செய்யும் என்பதை நினைவில் கொள்ளவும்; இது
நீக்கிவிட்டு-மீண்டும்-உருவாக்குவதன் இயல்பாகும், எனவே ஒன்றை அகற்றி மீண்டும் சேர்ப்பதற்குப் பதிலாகப் புதிய அட்டவணைப் பெயரைப் பயன்படுத்தவும்.

**ஒரு பகுதியளவுத் தோல்வி, காலியாக இல்லாத `insertErrors[]` உடன் HTTP 200 ஆக வரும்.** அது ஒரு
தோல்வியாகக் கருதப்பட்டு விதிவிலக்கை எறியும்; இதுவே BigQuery ஏற்காத வரிகளைத் தாண்டி கர்சர் முன்னேறுவதைத் தடுக்கிறது;
`tests/unit/log-export-bigquery.test.ts` இந்த நடத்தையை உறுதிப்படுத்துகிறது.

பரிமாற்றம் எளிய REST வழியாகும் — தானே கையொப்பமிட்ட RS256 assertion, அணுகல் token-க்காக
`https://oauth2.googleapis.com/token` இல் பரிமாறப்பட்டு, பின்னர் வரிகள் `tabledata.insertAll`-க்கு அனுப்பப்படுகின்றன. எந்த Google SDK-யும்
சேர்க்கப்படவில்லை. அணுகல் tokens ஒவ்வொரு (சேவைக் கணக்கு, scope) இணைக்கும் செயல்முறைக்குள் தற்காலிகமாகச் சேமிக்கப்படுகின்றன.

உருவாக்கப்பட்ட அட்டவணையில் Logs தாவலின் ஒவ்வொரு புலத்திற்கும் ஒரு நெடுவரிசையும் `exported_at` நெடுவரிசையும் உள்ளன; மேலும்
அழைப்புப் பதிவுகள் உண்மையில் எவ்வாறு வினவப்படுகின்றன என்பதற்கேற்ப அது அமைக்கப்பட்டுள்ளது:

- **`timestamp` அடிப்படையில் நாள்-பகிர்வாக்கம் செய்யப்பட்டது**, எனவே தேதியால் வரம்பிடப்பட்ட வினவல் அந்த நாட்களை மட்டுமே வருடும்.
- **`api_key_name`, `provider`, `model`, `status` ஆகியவற்றால் (அந்த வரிசையில்) தொகுதியாக்கப்பட்டது**, எனவே அதை
  இயக்கியது யார், அது எங்கு சென்றது, அல்லது அது தோல்வியடைந்ததா என்பதன்படி வடிகட்டுவது ஒவ்வொரு பகிர்விற்குள்ளும் உள்ள தொகுதிகளைத் தவிர்க்க உதவும். BigQuery
  அதிகபட்சம் நான்கு தொகுதியாக்க நெடுவரிசைகளை அனுமதிக்கிறது; அவற்றின் வரிசை முக்கியம்: `api_key_name` மட்டும் கொண்ட வடிகட்டி
  தொகுதிகளைத் தவிர்க்கும், ஆனால் `status` மட்டும் கொண்ட வடிகட்டி அவ்வாறு செய்யாது.
- **`partitionExpirationDays` வழியாக விருப்பத்திற்குரிய பகிர்வு தக்கவைப்புக் காலம்** (`0` அனைத்தையும் வைத்திருக்கும்), அட்டவணை
  உருவாக்கப்படும்போது பயன்படுத்தப்படும்.

இரு அமைப்புகளும் உருவாக்கும் நேரத்தில் பயன்படுத்தப்படுகின்றன. ஏற்கனவே உள்ள அட்டவணை அதன் தற்போதைய தளவமைப்பையே தக்கவைத்துக்கொள்ளும்; எனவே
அவற்றைப் பயன்படுத்த விரும்பினால், இலக்கை ஒரு புதிய அட்டவணை id-க்குச் சுட்டிக்காட்டவும்.

`tests/unit/log-export-bigquery.test.ts`, mapper-உம் அட்டவணை schema-வும் ஒன்றுக்கொன்று
ஒத்திசைவாக இருப்பதை உறுதிசெய்கிறது; எனவே புதிய call-log நெடுவரிசை வெளியேற்றப்படும் வழியில் கவனிக்கப்படாமல் தவிர்க்கப்படாது.

தொகுதிகள் வரிசை எண்ணிக்கை மற்றும் தொடர்முறைப்படுத்தப்பட்ட byte-கள் ஆகிய **இரண்டின்** அடிப்படையிலும் பிரிக்கப்படுகின்றன. payload-கள் ஏற்றுமதி செய்யப்படும்போது வரிசை எண்ணிக்கை மட்டும் போதாது:
prompt-களைக் கொண்ட 500 வரிசைகள் பல பத்து megabyte-கள் அளவுக்கு இருக்கலாம்; மேலும் 10 MB-க்கும் அதிகமான கோரிக்கையை insertAll
நிராகரிக்கும். 500 வரிசைகள் அல்லது 9 MB—இவற்றில் எது முதலில் எட்டப்படுகிறதோ அப்போது தொகுதி முடிக்கப்படும்.

---

## 5. ஒரு இலக்கைச் சேர்த்தல்

1. `LogExportDestinationType`-ஐ ஏற்றுமதி செய்யும் `src/lib/logExport/destinations/<name>.ts` கோப்பை உருவாக்கவும்:
   ஒரு Zod `configSchema`, UI-க்கான `fields` விவரிப்பான் வரிசை, `secretFields`, மற்றும்
   `test()` / `prepare()` / `send(records)` ஆகியவற்றை வழங்கும் `createClient(config)`.
2. அதை `src/lib/logExport/registry.ts`-இல் உள்ள `DESTINATIONS` வரிசையில் சேர்க்கவும்.
3. `tests/unit/`-இன் கீழ் சோதனைகளை எழுதவும்.

முழு மாற்றமும் இதுதான்: நிலைத்த சேமிப்பு, cron பணி, REST அடுக்கு, ரகசியக் குறியாக்கம் மற்றும்
டாஷ்போர்டு படிவம் ஆகிய அனைத்தும் பதிவகத்தைப் படிக்கின்றன.

ஒரு புதிய இலக்கிற்கான இரண்டு விதிகள்:

- பகுதியளவு தோல்வி ஏற்பட்டால் `send()` **கட்டாயமாக விதிவிலக்கை எறிய வேண்டும்**. அது வெற்றிகரமாக முடிவது, "இந்த இலக்கில் இந்த வரிசைகள் உள்ளன" என்பதைக் குறிக்கிறது;
  மேலும் கர்சர் அவற்றைக் கடந்து நிரந்தரமாக முன்னேறுகிறது.
- பயனர் வழங்கிய URL-ஐ ஏற்கும் இலக்கு, பெறுதல் செயலுக்கு முன் அதை
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) மூலம் சரிபார்க்க வேண்டும்;
  webhooks செய்வதைப் போலவே. BigQuery-க்கு இது தேவையில்லை: அதன் ஹோஸ்ட்கள் மாறிலிகள்.

---

## 6. இதை இயக்குதல்

- **டாஷ்போர்டு**: Integrations → Log export. ஒரு இலக்கைச் சேர்த்து, வரிசைகளை எழுதாமல் நற்சான்றுகளைச்
  சரிபார்க்க **Test**-ஐ இயக்கி, பின்னர் அதைச் செயல்படுத்தவும்.
- **பின்னிருப்பு**: ஒவ்வொரு இலக்கு அட்டையும் நிலுவையிலுள்ள வரிசைகளையும் கர்சரையும் காட்டுகிறது; `GET
/api/log-export/status` அதே புள்ளிவிவரங்களுடன் கடைசி 20 பணி இயக்கங்களையும் வழங்குகிறது.
- **தோல்வியடையும் ஓர் இலக்கு மற்றவற்றைத் தோல்வியடையச் செய்யாது** — இயக்கச் சுருக்கம் ஒவ்வொரு இலக்கிற்குமான
  நிலையை `last_status` / `last_error`-இல் பதிவு செய்கிறது; மேலும் பணி இயக்க வரலாறு ஒட்டுமொத்த முடிவை வைத்திருக்கிறது.
- **ஓர் இலக்கை நீக்குவது அதன் கர்சரையும் நீக்குகிறது.** அதை மீண்டும் சேர்ப்பது தக்கவைக்கப்பட்டுள்ள மிகப் பழைய
  அழைப்புப் பதிவிலிருந்து தொடங்குவதால், அந்த இலக்கில் ஏற்கனவே இருக்கக்கூடிய வரிசைகளை மீண்டும் அனுப்புகிறது. BigQuery-இல் ஒவ்வொரு வரிசைக்குமான
  `insertId`, BigQuery-இன் சொந்த நகல் நீக்கச் சாளரத்திற்குள் மட்டுமே அதைச் சமாளிக்கிறது; எனவே ஓர் இலக்கை
  நீக்குவதற்குப் பதிலாக அதைச் செயலிழக்கச் செய்வதைத் தேர்வுசெய்யவும்.
