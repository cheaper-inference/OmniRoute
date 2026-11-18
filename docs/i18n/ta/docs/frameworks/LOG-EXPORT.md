# Log export (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute அழைப்புப் பதிவுகளை வெளிப்புறப் பகுப்பாய்வுத் தரவகத்திற்குத் தொடர்ச்சியாகவும் படிப்படியாகவும் ஏற்றுமதி செய்தல்.

Logs டாஷ்போர்டு தாவல் கோரிக்கை வரலாற்றை SQLite (`call_logs`)-இல் வைத்திருக்கிறது; அதன் அளவு
சுழற்சி மற்றும் தக்கவைப்புக் கொள்கைகளால் வரையறுக்கப்படுகிறது. பதிவு ஏற்றுமதி அதே பதிவுத் தொகுப்பை அட்டவணைப்படி வெளியே அனுப்புகிறது; இதனால் அது
உள்ளூர் தரவுத்தளத்தைவிட நீண்ட காலம் நிலைத்திருந்து, பிற தரவுகளுடன் இணைக்கப்படலாம். BigQuery முதலாவது இலக்கு;
இந்தச் செயலாக்கத் தொடர் ஒரு பதிவகமாக இருப்பதால், கூடுதல் இலக்குகளைச் சேர்ப்பது விரிவாக்கமாக அமைகிறது.

---

## 1. இது எவ்வாறு செயல்படுகிறது

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **அட்டவணை** — ஒரு `JobRegistry` cron பணி, `log_export`, இயல்பாக `0 * * * *` (மணிநேரத்திற்கு ஒருமுறை,
  UTC). இது `src/lib/initCloudSync.ts`-இல் பதிவுசெய்யப்படுகிறது; `OMNIROUTE_LOG_EXPORT_CRON` மூலம் மாற்றியமைக்கலாம்.
  ஒவ்வொரு இயக்க நேரத்திலும் **இயக்கப்பட்டுள்ள** ஒவ்வொரு இலக்கிற்கும் பதிவுகள் வரிசையாக அனுப்பப்படுகின்றன.
- **கர்சர்** — SQLite-இன் மறைமுகமான `call_logs.rowid`, ஒவ்வொரு இலக்கிற்கும்
  `log_export_destinations.cursor_row_id`-இல் நிலையாகச் சேமிக்கப்படுகிறது. `timestamp` திட்டமிட்டே கர்சராகப் பயன்படுத்தப்படவில்லை: அழைப்பாளர்கள்
  தங்கள் சொந்த மதிப்பை வழங்கக்கூடும்; எனவே பின்னர் தொடங்கிய வேகமான கோரிக்கைக்குப் பிறகு மெதுவான கோரிக்கை எழுதப்படலாம்,
  அப்போது நேரமுத்திரை கர்சர் அதைத் தவறவிடும்.
- **தொகுப்பாக்கம்** — ஒரு கோரிக்கைக்கு `batch_size` வரிசைகள் (இயல்புநிலை 500), ஓர் இயக்கத்திற்கு `max_rows_per_run` வரிசைகள்
  (இயல்புநிலை 10000); இதனால் பெருமளவு தேங்கிய பதிவுகள் ஓர் இயக்கத்தைத் தடுக்காமல் பல இயக்க நேரங்களில் அனுப்பப்படுகின்றன.
- **வழங்கல்** — `send()` நிறைவடைந்த பிறகே கர்சர் முன்னேறும். ஒரு தொகுப்பு தோல்வியடைந்தால்
  கர்சர் இருந்த இடத்திலேயே இருக்கும்; எனவே அடுத்த இயக்கத்தில் அதே வரிசைகள் மீண்டும் முயற்சிக்கப்படும். வழங்கப்படும் உத்தரவாதம்
  குறைந்தபட்சம் ஒருமுறை வழங்கலுடன் இலக்குப் பக்க நகல் நீக்கமே அன்றி, உண்மையான துல்லியமாக ஒருமுறை வழங்கல் அல்ல: BigQuery ஒவ்வொரு
  வரிசைக்கும் அழைப்புப் பதிவு அடையாளத்தை விசையாகப் பயன்படுத்துகிறது; தனது நகல் நீக்கக் காலவரம்பிற்குள் அதை இயன்றவரை மதிக்கிறது.
- **ஒரே நேர இயக்கத் தடுப்பு** — cron இயக்கமும் `POST .../run`-உம் ஒரே நேரத்தில் தொடங்கலாம். ஏற்கெனவே
  பதிவுகளை அனுப்பிக்கொண்டிருக்கும் இலக்கு, இருமுறை அனுப்பப்படுவதற்குப் பதிலாகத் தவிர்க்கப்படும் (இயக்க முடிவில் `skipped: true`),
  எனவே ஒரே நேரத்தில் நடைபெறும் மற்றொரு இயக்கம் ஒரு தொகுப்பை மீண்டும் அனுப்பவோ கர்சரைப் பின்னோக்கி எழுதவோ முடியாது.
- **முழுநீக்கத்திலிருந்து மீட்பு** — `cursor_row_id`, `MAX(rowid)`-ஐவிட அதிகமாகிவிட்டால் (முழு அட்டவணையும்
  நீக்கப்பட்டு rowid-கள் மீண்டும் தொடங்கியிருந்தால்), இயக்கி நிரந்தரமாகப் பதிவுகளைக் காணத் தவறுவதற்குப் பதிலாக 0-க்குத் திரும்பும்.

### தனிமைப்படுத்தப்பட்ட இயக்கியும் வரம்புகளும்

Node-இல் ஒவ்வொரு இலக்கு இயக்கமும் தனித்த, குறுகிய கால OS துணைச் செயல்முறையைத் தொடங்குகிறது (IPC உடன் `child_process`,
`worker_threads` அல்ல). உள்ளடக்க வாசிப்புகள், payload JSON பகுப்பாய்வு/தொடராக்கம், இலக்கின்
`prepare()` மற்றும் இலக்கு வலைப்பின்னல் I/O அனைத்தும் அங்கேயே இயங்குகின்றன; சேவையகத்தின் நிகழ்வு வளையத்தில் அல்ல.
கட்டமைப்பும் சிறிய முன்னேற்றச் செய்திகளும் மட்டுமே IPC வழியாகக் கடக்கின்றன; ஏற்றுமதி செய்யப்பட்ட பதிவுகள் ஒருபோதும்
சேவையகத்திற்குத் திரும்புவதில்லை. cron பணியும் இப்போது இயக்கு வழியும் அதே பொது முடிவையும் ஒரே நேர இயக்கத் தடுப்பையும் தக்கவைக்கின்றன.

துணைச் செயல்முறை, சேவையகம் தீர்மானித்த `DATA_DIR/storage.sqlite`-ஐ `node:sqlite` மூலம் படிக்க மட்டும் திறக்கிறது;
`busy_timeout=5000` மற்றும் `query_only=ON` பயன்படுத்தப்படுகின்றன. அது எந்த DB singleton-ஐயும் இறக்குமதி செய்வதில்லை; எந்த
இடமாற்றங்களையோ, காப்புப்பிரதிகளையோ, SQLite புதுப்பிப்புகளையோ செய்வதில்லை. காணாமற்போன/சிதைந்த artifact-களுக்கான பதிவுப் பராமரிப்பு (சிதைந்த artifact-க்கான UPDATE உட்பட)
டாஷ்போர்டு விவரப் பாதையில் மட்டுமே தொடர்கிறது. இரு பாதைகளும் பக்கவிளைவற்ற ஒரே
விவரத் தீர்மானிப்பானைப் பகிர்கின்றன; ஏற்றுமதி ஒத்திசைவற்ற கோப்பு முறைமை வாசிப்புகளையும் அதே artifact → பழைய
உட்பொதிவு → பழைய வட்டு → எதுவுமில்லை என்ற தீர்மான வரிசையையும் பயன்படுத்துகிறது. துணைச் செயல்முறை தனது வாசிப்பானைத் திறக்கும்போது, ஓர் இயக்கம் அதிகபட்சச் செருகல் rowid-ஐ
நிலைப்படமாகப் பிடிக்கிறது; அதற்குப் பிந்தைய செருகல்கள் அடுத்த இயக்கம் வரை காத்திருக்கும். இது ஒரு செருகல்
எல்லையே அன்றி, நீண்ட கால SQLite பரிவர்த்தனை அல்ல: வலைப்பின்னல் காத்திருப்புகளின்போது WAL எழுதிகளும் சோதனைப்புள்ளிகளும் தடையின்றிச் செயல்படும்.
ஏற்கெனவே உள்ள வரிசைகளின் புதுப்பிப்புகள்/நீக்கங்கள் இந்த எல்லையால் உறையவைக்கப்படுவதில்லை.

ஏற்கப்பட்ட ஒவ்வொரு தொகுப்பிற்குப் பிறகும், துணைச் செயல்முறை ஒப்புகைக்காகக் காத்திருக்கும். சேவையகம் முதலில்
`advanceLogExportCursor` மூலம் கர்சரை நிலையாகச் சேமித்து, பின்னர் `ack` அனுப்புகிறது; அதற்கு முன் அடுத்த தொகுப்பு தொடங்காது.
அனுப்புதல் தோல்வி, செயலிழப்பு அல்லது காலக்கெடு முடிவு ஏற்பட்டால், அந்தத் தொகுப்பிற்கான கர்சரை முன்னேற்றாமல் தோல்வி பதிவுசெய்யப்படும். முன்பே
ஒப்புகை பெறப்பட்ட தொகுப்புகள் உறுதிசெய்யப்பட்டவையாகத் தொடரும்; அதிகபட்சமாக ஒப்புகை பெறாத அந்த ஒரு தொகுப்பு மட்டுமே மீண்டும் அனுப்பப்படலாம்.
`done` கிடைத்து துணைச் செயல்முறை சிக்கலின்றி வெளியேறிய பிறகே வெற்றி பதிவுசெய்யப்படும். தோல்விகள் துணைச் செயல்முறையை
SIGTERM மூலம் நிறுத்துகின்றன; 500 ms-க்குப் பிறகு SIGKILL-ஆகத் தீவிரப்படுத்துகின்றன; செயல்முறை முழுமையாக மூடப்படும் வரை இயக்கி காத்திருக்கும்.

| சூழல் மாறி                                    | இயல்புநிலை | நோக்கம்                                          |
| --------------------------------------------- | ---------- | ------------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | ஒவ்வொரு இலக்கிற்குமான மொத்த நேர வரம்பு           |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | துணைச் செயல்முறையின் V8 old-space வரம்பு, MB-இல் |

செல்லாத/நேர்மறையல்லாத/முழு எண்ணல்லாத மதிப்புகளுக்கு இயல்புநிலைகள் பயன்படுத்தப்படும். heap அமைப்பு மொத்த
RSS வரம்பல்ல; மிகப் பெரிய தொகுப்புகள் துணைச் செயல்முறையின் நினைவகத்தைத் தீர்த்துவிட்டு, இயக்கத்தைப் பாதுகாப்பாகத் தோல்வியடையச் செய்யக்கூடும்.
1024 MB இயல்புநிலை, உள்ளடக்கங்கள் இயக்கப்பட்ட நிலையில் 512 KiB artifact-களைக் கொண்ட இயல்புநிலை 500-வரிசைத் தொகுப்பிற்கு,
BigQuery-இன் பைட் துண்டுகளாகப் பிரிக்கப்பட்ட JSON தொடராக்கம் உட்பட, கூடுதல் இடத்தை வழங்குகிறது. இது
உள்ளடக்கங்களுடன் கூடிய 10000-வரிசைத் தொகுப்பைப் பாதுகாப்பானதாக்காது. V8 heap தீர்ந்துபோதல், நடவடிக்கை எடுக்கக்கூடிய தோல்வியைப் பதிவுசெய்கிறது: தொகுப்பின்
அளவைக் குறைக்கவும் அல்லது `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`-ஐ உயர்த்தவும்; கர்சர் கடைசியாக
ஒப்புகை பெறப்பட்ட தொகுப்பிலேயே இருக்கும். பழைய உட்பொதிந்த/வட்டில் உள்ள உள்ளடக்கங்களுக்கு நவீன artifact அளவு வரம்பு பொருந்தாது.
இயக்குநர்கள் RSS-க்குத் தனியாக வள ஒதுக்கீட்டைத் திட்டமிட வேண்டும்; குறிப்பாக நினைவக வரம்புள்ள கொள்கலன்களுக்குள்.

துணைச் செயல்முறை, தீர்மானிக்கப்பட்ட `DATA_DIR`, `NODE_ENV`, வெளிப்படையாக அமைக்கப்பட்ட `TZ` (பழைய கோப்புப்பெயர்களின்
உள்ளூர் நேரத் தீர்மானம்), இருந்தால் `ELECTRON_RUN_AS_NODE`, மற்றும் பின்வரும் வெளிச்செல்லும் உள்ளீடுகளை மட்டுமே பெறுகிறது:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (மற்றும் அவற்றின் சிற்றெழுத்து வடிவங்கள்),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
உலகளாவிய Undici dispatcher, சேவையகத்தின் சூழல் மாறிகளை மட்டுமே சார்ந்த proxy தீர்மானத்தையும் உள்ளூர் ஹோஸ்ட்
விலக்கு விதிகளையும், `NO_PROXY` உட்பட, பகிர்கிறது; அது `proxyFetch.ts` அல்லது அதன் DB/அம்சக் கொடிகளை இறக்குமதி செய்வதில்லை.
அனுப்பப்படும் வெளியீட்டிலும் பதிவுசெய்யப்படும் பிழைகளிலும் proxy சான்றுத் தகவல்கள் மறைக்கப்படுகின்றன. இலக்குச் சான்றுத் தகவல்கள்
ஒரே தொடக்க IPC செய்தியில் மட்டுமே அனுப்பப்படுகின்றன; argv அல்லது சூழல் மாறிகளில் ஒருபோதும் அனுப்பப்படுவதில்லை; வெளியீடு/பிழை அனுப்புதலுக்கு
முன்னொட்டு சேர்க்கப்பட்டு, உணர்திறன் மிக்க தகவல்கள் நீக்கப்படுகின்றன. ஒவ்வொரு cron இயக்கத்திலும் Node-இன் SQLite எச்சரிக்கை
மீண்டும் வருவதைத் தவிர்க்க, துணைச் செயல்முறையின் இயக்க மதிப்புருக்களில் `ExperimentalWarning` மட்டும் முடக்கப்படுகிறது; பிற எச்சரிக்கை வகைகள் தொடர்ந்து காட்டப்படும்.

இலக்குத் தொகுதிகள் Next.js/server-only சார்புகள் இல்லாமல் இறக்குமதி செய்யக்கூடியதாக இருக்க வேண்டும். தற்போதைய
BigQuery செயலாக்கம் ஏற்கெனவே அந்த ஒப்பந்தத்தைப் பூர்த்தி செய்கிறது. அணுகல் டோக்கன் தற்காலிகச் சேமிப்புகள் துணைச் செயல்முறையின்
இயக்கத்திற்கு மட்டுமே நீடிக்கும்; இயக்கங்களுக்கு இடையே நீடிப்பதில்லை. Node தான் ஆதரிக்கப்படும் இயக்கச் சூழல் (`package.json` engines), ஆனால் README-இன் Bun
நிறுவல் பகுதியும் `Dockerfile.bun`-உம் `bun:sqlite` (`src/lib/db/core.ts` / அடாப்டர்கள்) பயன்படுத்தும்
உற்பத்திச் சூழலுக்கான இணக்கப் பாதையையும் குறிப்பிடுகின்றன. எனவே Bun-இல், ஏற்றுமதிகள் முந்தைய
அதே செயல்முறைக்குள் இயங்கும் பாதையைத் தக்கவைத்து, ஒருமுறை எச்சரிக்கையை வெளியிடுகின்றன: துணைச் செயல்முறைக்கான heap/நேரவரம்புத் தனிமைப்படுத்தல் கிடைக்காது.
நிகழ்வு வளையம் மற்றும் OOM தனிமைப்படுத்தலுக்கு Node-ஐப் பயன்படுத்தவும்; இங்கே Bun மேம்பாட்டுப் பயன்பாட்டுக்கு மட்டுமானதாகக் கருதப்படுவதில்லை.

`includeBodies` இயக்கப்பட்டிருக்கும்போது, மணிநேர அளவிலான தரவுச் சுமை நிலுவையைக் குவிப்பதற்குப் பதிலாக
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` போன்ற நிமிட அளவிலான இடைவெளியைத் தேர்ந்தெடுக்கவும்.
தொகுதி மற்றும் வரி வரம்புகள் ஒவ்வொரு இயக்கத்தையும் தொடர்ந்து கட்டுப்படுத்துகின்றன. ஒவ்வொரு இயக்கத்திலும் ஒவ்வொரு இலக்கிற்கும் செயல்முறை தொடக்கச் செலவு ஏற்படுகிறது;
இது சேவையக நிகழ்வு வளையத் தனிமைப்படுத்தலுக்காகச் சிறிய தொடக்கச் செலவை ஏற்கிறது; மொத்த CPU பயன்பாட்டைக் குறைப்பதற்காக அல்ல.

### தரவுச் சுமைகள் (தூண்டுரைகள் மற்றும் நிறைவுகள்)

இயல்பாக, பதிவுகளின் **பட்டியல்** காட்டும் சுருக்கப் புலங்களை மட்டுமே ஏற்றுமதி கொண்டிருக்கும்.
**தூண்டுரைகள் மற்றும் பதில்களை ஏற்றுமதி செய்** (`includeBodies`) என்பதை இயக்கினால், ஒவ்வொரு அழைப்பிற்கும் பதிவுகளின் **விவரப்**
பலகம் காட்டும் தகவல்களும் கூடுதலாக அனுப்பப்படும்:

| புலம்                            | அது கொண்டிருப்பது                                                    |
| -------------------------------- | -------------------------------------------------------------------- |
| `request_body` / `response_body` | கட்டுப்பாட்டுப் பலகத்தில் காட்டப்படும் அழைப்புத் தரவுச் சுமைகள்      |
| `pipeline_route_decision`        | வழிச்செலுத்தி தேர்ந்தெடுத்த இலக்கும் மாதிரியும்                      |
| `pipeline_client_request`        | கிளையன்ட் அனுப்பியபடியே உள்ள மூலக் கோரிக்கை                          |
| `pipeline_openai_request`        | உள் OpenAI வடிவத்திற்கு மாற்றிய பிறகான கோரிக்கை                      |
| `pipeline_provider_request`      | வழங்குநரின் வடிவத்தில், மேல்நிலைக்கு உண்மையில் அனுப்பப்பட்ட கோரிக்கை |
| `pipeline_provider_response`     | மூல மேல்நிலைப் பதில்                                                 |
| `pipeline_client_response`       | அழைப்பாளருக்குத் திருப்பி வழங்கப்பட்டது                              |
| `pipeline_error`                 | தோல்வியடைந்த அழைப்பிற்கான pipeline-நிலைப் பிழை விவரம்                |
| `bodies_truncated`               | மேலுள்ள ஏதேனும் புலம் `maxBodyBytes` வரம்பை எட்டும்போது True         |

இது தூண்டுரை உள்ளடக்கம் என்பதால், **இயல்பாக முடக்கப்பட்டுள்ளது**; மேலும், திட்டமிட்டே ஒவ்வொரு இலக்கிற்குமான தனித் தேர்வாக உள்ளது.
கட்டுப்பாட்டுப் பலகத்தில் காட்டப்படுவதே அனுப்பப்படுகிறது, ஏனெனில் ஏற்றுமதியும் `getCallLogById`-உம் ஒரே விவரத்
தீர்மானத்தைப் பகிர்கின்றன: தரவுச் சுமைகள்
எழுதப்படும்போதே தனிநபர் அடையாளத் தகவல்கள் நீக்கப்பட்டு, இரகசியங்கள் மறைக்கப்படுகின்றன; மேலும்,
`noLog` API விசையைக் கொண்டு செய்யப்படும் அழைப்பு எந்தத் தரவுச் சுமையையும் சேமிப்பதில்லை, எனவே ஏற்றுமதி செய்ய எதுவும் இருப்பதில்லை.

தரவுச் சுமைகள் கோப்பு முறைமைச் சேமிப்புப் பொருளிலிருந்து ஒவ்வொரு வரியாகப் படிக்கப்படுகின்றன; எனவே அவற்றைக் கோரிய
இலக்குகளுக்கு மட்டுமே முழுத் தரவு நிரப்புதல் நடைபெறும். சேமிப்புப் பொருள் இல்லாவிட்டாலோ சிதைந்திருந்தாலோ, தொகுதியைத் தோல்வியடையச் செய்து
கர்சரை முன்னேற முடியாமல் விடுவதற்குப் பதிலாக, null தரவுச் சுமைகளுடன் அதன் சுருக்கம் ஏற்றுமதி செய்யப்படும்.

`maxBodyBytes` (இயல்புநிலை 262144) ஒவ்வொரு புலத்தையும் வரம்பிடுகிறது. நீளமான தரவுச் சுமைகள் **கைவிடப்படுவதற்குப் பதிலாக
வெட்டிச் சுருக்கப்படுகின்றன** — வெட்டப்பட்ட தூண்டுரைகூட "என்ன கேட்கப்பட்டது" என்பதற்குப் பதிலளிக்கிறது — மேலும் அந்த வரி
`bodies_truncated` மூலம் குறிக்கப்படுகிறது. ஸ்ட்ரீமில் துண்டு துண்டாக வரும் மாற்றங்கள் ஏற்றுமதி செய்யப்படுவதில்லை; ஒருங்கிணைக்கப்பட்ட பதில்
ஏற்கெனவே `pipeline_provider_response` மற்றும் `pipeline_client_response` ஆகியவற்றில் உள்ளது.

---

## 2. கோப்புகள்

| கூறு                          | இருப்பிடம்                                   |
| ----------------------------- | -------------------------------------------- |
| இலக்கு ஒப்பந்தம்              | `src/lib/logExport/types.ts`                 |
| பதிவகம்                       | `src/lib/logExport/registry.ts`              |
| ரகசியங்களைக் கையாளுதல்        | `src/lib/logExport/secrets.ts`               |
| இயக்கி (பெற்றோர் IPC)         | `src/lib/logExport/runner.ts`                |
| செயல்முறை வாழ்க்கைச் சுழற்சி  | `src/lib/logExport/childRunner.ts`           |
| சேய் நுழைவுப்புள்ளி           | `src/lib/logExport/exportChild.ts`           |
| படிக்க மட்டும் திறப்பான்      | `src/lib/db/logExportReadOnly.ts`            |
| பகிரப்பட்ட வினவல்/பொருத்துதல் | `src/lib/usage/callLogExportQueries.ts`      |
| விவரத் தீர்வி                 | `src/lib/usage/callLogDetailResolver.ts`     |
| API தரவு வடிவாக்கம்           | `src/lib/logExport/presenter.ts`             |
| BigQuery இலக்கு               | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA அங்கீகாரம்          | `src/lib/logExport/googleServiceAccount.ts`  |
| அழைப்புப் பதிவு மூலம்         | `src/lib/usage/callLogExportSource.ts`       |
| நிலையான சேமிப்பு              | `src/lib/db/logExportDestinations.ts`        |
| Cron பணி                      | `src/lib/jobs/logExportJob.ts`               |
| REST அடுக்கு                  | `src/app/api/log-export/`                    |
| கட்டுப்பாட்டுப் பலகைப் பக்கம் | `src/app/(dashboard)/dashboard/log-export/`  |

தரவுத்தளக் கட்டமைப்பு: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

அனைத்து வழித்தடங்களுக்கும் மேலாண்மை அங்கீகாரம் தேவை (`requireManagementAuth`). ரகசியங்கள் ஒருபோதும் திருப்பி அனுப்பப்படுவதில்லை:
சேமிக்கப்பட்ட ரகசியம் `__stored__` என்ற நேரடி மதிப்பாகத் திருப்பி அனுப்பப்படும்; புதுப்பிக்கும்போது அந்த மதிப்பைத் திருப்பி அனுப்பினால்
சேமிக்கப்பட்ட நற்சான்று தக்கவைக்கப்படும்.

ரகசியத்தை அறிவிக்கும் வகையைச் சேர்ந்த இலக்கை உருவாக்க அல்லது புதுப்பிக்க **`STORAGE_ENCRYPTION_KEY`
தேவை**. அது இல்லாமல் `encrypt()` எந்த மாற்றமும் செய்யாமல் உள்ளீட்டை அப்படியே அனுப்பிவிடும்; எனவே நற்சான்றை
SQLite-இல் சாதாரண உரையாகச் சேமிப்பதற்குப் பதிலாக, எழுதும் செயல் 400 பிழையுடன்
நிராகரிக்கப்படும் (Telegram webhook பயன்படுத்தும் அதே பாதுகாப்பு).

| முறை     | பாதை                                     | நோக்கம்                                                                           |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | இலக்கு வகைகள் + அவற்றின் உள்ளமைவுப் புலப் பட்டியல்                                |
| `GET`    | `/api/log-export/destinations`           | இலக்குகளைப் பட்டியலிடுதல் (ரகசியங்கள் மறைக்கப்பட்டிருக்கும்)                      |
| `POST`   | `/api/log-export/destinations`           | இலக்கை உருவாக்குதல்                                                               |
| `GET`    | `/api/log-export/destinations/{id}`      | ஓர் இலக்கைப் படித்தல்                                                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | பெயர் / இயக்கப்பட்ட நிலை / உள்ளமைவு / தொகுப்பாக்கத்தைப் புதுப்பித்தல்             |
| `DELETE` | `/api/log-export/destinations/{id}`      | நீக்குதல்                                                                         |
| `POST`   | `/api/log-export/destinations/{id}/test` | நற்சான்றுகளைச் சோதித்தல், எதையும் எழுதாமல் இருத்தல்                               |
| `POST`   | `/api/log-export/destinations/{id}/run`  | நிலுவையிலுள்ளவற்றை இப்போதே வெளியேற்றுதல், திட்டமிடப்பட்ட இயக்கத்தின் அதே பாதையில் |
| `GET`    | `/api/log-export/status`                 | Cron நிலை, சமீபத்திய இயக்கங்கள், ஒவ்வொரு இலக்கிற்குமான நிலுவை                     |

`GET /api/log-export/types` தான் UI-ஐப் பொதுவானதாக ஆக்குகிறது: திருப்பி அனுப்பப்படும்
புல விவரிப்புகளிலிருந்து கட்டுப்பாட்டுப் பலகைப் படிவம் உருவாக்கப்படுகிறது; எனவே புதிய இலக்கிற்கு UI மாற்றம் தேவையில்லை.

---

## 4. BigQuery இலக்கு

கட்டமைப்பு விசைகள் (`type: "bigquery"`):

| விசை                 | குறிப்புகள்                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `projectId`          | தரவுத்தொகுப்பைக் கொண்டிருக்கும் GCP திட்டம்                                                                                    |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                                |
| `location`           | தரவுத்தொகுப்பு உருவாக்கப்பட வேண்டியபோது மட்டுமே பயன்படுத்தப்படும் (இயல்புநிலை `EU`)                                            |
| `serviceAccountJson` | சேவை-கணக்கு விசை. ரகசியம்: சேமிப்பில் குறியாக்கம் செய்யப்படும், ஒருபோதும் திருப்பி வழங்கப்படாது                                |
| `autoCreate`         | இல்லாத தரவுத்தொகுப்பு/அட்டவணையை உருவாக்குதல்; nullable usage-evidence நெடுவரிசைகளை நிபந்தனைப்படி சேர்த்தல் (இயல்புநிலை `true`) |

சேவை கணக்கிற்கு இலக்கு அட்டவணையில் `bigquery.tables.updateData` அனுமதி தேவை. மேலும்,
`autoCreate` இயக்கப்பட்டிருக்கும்போது `bigquery.datasets.create` / `bigquery.tables.create`
அனுமதிகளும் தேவை. ஏற்கனவே உள்ள அட்டவணையில் இரண்டு nullable usage-evidence புலங்களைச்
சேர்க்க `bigquery.tables.update` அனுமதியும் தேவை. தேவையான அனுமதி இல்லாவிட்டால், அதன்
கர்சரை முன்னேற்றாமல் ஏற்றுமதி தோல்வியடையும்.

கட்டமைக்கப்பட்ட ஒரு batch என்பது HTTP அலகு அல்ல, **கர்சர்** அலகாகும்: `send()` அதை அதிகபட்சம்
500 வரிகளைக் கொண்ட insertAll அழைப்புகளாகப் பிரிக்கிறது. எனவே பெரிய `batch_size` BigQuery-யின்
10 MB கோரிக்கை வரம்பை மீறச் செய்யாது. தற்காலிக நிலைகள் (408/429/500/502/503/504)
exponential backoff உடன் அதிகபட்சம் மூன்று முறை மீண்டும் முயற்சிக்கப்படும்; அதே insertIds
மீண்டும் பயன்படுத்தப்படும். அங்கீகாரம் மற்றும் schema தோல்விகள் முதல் முயற்சியிலேயே
விதிவிலக்கை ஏற்படுத்தும்; அவற்றுக்காக run வீணாகாது.

சில கணங்களுக்கு முன்பு உருவாக்கப்பட்ட அட்டவணை streaming endpoint-க்கு உடனடியாகத் தெரியாது;
அது சில விநாடிகளுக்கு 404 பதிலை வழங்கும். அந்த 404 மீண்டும் முயற்சிக்கப்படும், ஆனால் **இந்த
run அட்டவணையை உருவாக்கியிருந்தால் மட்டுமே** — உண்மையில் இல்லாத அட்டவணை உடனடியாகத்
தோல்வியடையும். சமீபத்தில் நீக்கப்பட்ட அட்டவணையின் பெயரில் மீண்டும் அட்டவணையை உருவாக்கினால்,
பல நிமிடங்களுக்கு streaming inserts-ஐ BigQuery மறுக்கும். இது delete-then-recreate செயலின்
பண்பாகும்; ஆகவே ஒன்றை நீக்கி மீண்டும் சேர்ப்பதைவிட புதிய அட்டவணைப் பெயரைப் பயன்படுத்துவது
சிறந்தது.

**ஒரு பகுதி தோல்வி, காலியாக இல்லாத `insertErrors[]` உடன் HTTP 200 ஆக வருகிறது.** இது
தோல்வியாகக் கருதப்பட்டு விதிவிலக்கு ஏற்படுத்தும். இதுவே BigQuery ஏற்காத வரிகளைக் கடந்து
கர்சர் முன்னேறுவதைத் தடுக்கிறது; `tests/unit/log-export-bigquery.test.ts` இந்த நடத்தையை
உறுதிப்படுத்துகிறது.

போக்குவரத்து plain REST ஆகும் — self-signed RS256 assertion, `https://oauth2.googleapis.com/token`
இல் access token-க்கு மாற்றப்பட்டு, பின்னர் வரிகள் `tabledata.insertAll` க்கு அனுப்பப்படும்.
Google SDK எதுவும் சேர்க்கப்படாது. Access token-கள் செயல்முறைக்குள், ஒவ்வொரு (service account,
scope) இணைப்புக்கும் cache செய்யப்படும்.

உருவாக்கப்படும் அட்டவணையில் Logs-tab புலம் ஒவ்வொன்றுக்கும் ஒரு நெடுவரிசையும், `exported_at`
என்ற நெடுவரிசையும் இருக்கும். மேலும் call logs உண்மையில் எவ்வாறு வினவப்படுகின்றன என்பதற்கேற்ப
அது அமைக்கப்படும்:

- **`timestamp` அடிப்படையில் நாள்-பகிர்வுகளாகப் பிரிக்கப்படும்**, எனவே தேதியால் வரையறுக்கப்பட்ட
  வினவல் அந்த நாட்களை மட்டுமே scan செய்யும்.
- **`api_key_name`, `provider`, `model`, `status` ஆகியவற்றின் அடிப்படையில் cluster செய்யப்படும்**
  (இந்த வரிசையில்), எனவே அதை யார் இயக்கினர், அது எங்கு சென்றது, அல்லது அது தோல்வியடைந்ததா
  என்பதைக் கொண்டு வடிகட்டுவது ஒவ்வொரு பகிர்வுக்குள்ளும் உள்ள blocks-ஐ prune செய்யும். BigQuery
  அதிகபட்சம் நான்கு clustering நெடுவரிசைகளை அனுமதிக்கிறது; வரிசை முக்கியமானது:
  `api_key_name` மட்டும் கொண்ட filter prune செய்யும், `status` மட்டும் கொண்ட filter செய்யாது.
- `partitionExpirationDays` வழியாக **விருப்பத் தேர்வு partition retention**
  (0 என்றால் அனைத்தையும் வைத்திருக்கும்); அட்டவணை உருவாக்கப்படும்போது பயன்படுத்தப்படும்.

இரண்டு அமைப்புகளும் உருவாக்க நேரத்தில் மட்டுமே பயன்படுத்தப்படும். ஏற்கனவே உள்ள அட்டவணை தன்னிடம்
ஏற்கனவே உள்ள layout-ஐத் தொடரும்; எனவே இவற்றைப் பயன்படுத்த விரும்பினால் destination-ஐ புதிய
அட்டவணை id-க்கு சுட்டிக்காட்டவும்.

`tests/unit/log-export-bigquery.test.ts`, mapper மற்றும் அட்டவணை schema ஆகியவை
ஒத்திசைவில் இருப்பதை உறுதிப்படுத்துகிறது. எனவே புதிய call-log நெடுவரிசை வெளியே செல்லும்
வழியில் அமைதியாக விடுபடாது.

Batches **வரிகளின் எண்ணிக்கை மற்றும் serialised bytes ஆகிய இரண்டின் அடிப்படையிலும்**
பிரிக்கப்படும். Payload-கள் export செய்யப்படும்போது வரிகளின் எண்ணிக்கை மட்டும் போதாது:
prompts கொண்ட 500 வரிகள் பல பத்து megabytes ஆக இருக்கலாம், மேலும் 10 MB-ஐ மீறும் கோரிக்கையை
insertAll நிராகரிக்கும். எது முதலில் நிகழ்கிறதோ அதன்படி 500 வரிகளிலோ அல்லது 9 MB-லோ chunks
முடிவடையும்.

---

## 5. OTLP/HTTP traces இலக்கு

`type: "otlp-http"` என்பதை config பயன்படுத்துகிறது. இது சேமிக்கப்பட்ட call logs-ஐ திட்டமிட்ட நேரத்தில்,
cursor-ஆதரவுடன் export செய்வதாகும்; இது
`open-sse/services/routing/otel.ts`-இல் உள்ள சிறந்த முயற்சி அடிப்படையிலான நேரடி routing-event sink அல்ல.
இது அந்த sink-இன் environment variables, timers அல்லது buffers-ஐ படிக்கவோ மாற்றவோாது. இரண்டையும்
செயல்படுத்தினால், சுயாதீனமான இரண்டு வகையான spans உருவாகலாம்;
இந்த call-log spans-ஐ வேறுபடுத்த `omniroute.log-export` instrumentation scope-ஐப்
பயன்படுத்தவும்.

| Key                      | Default / purpose                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `endpoint`               | முழுமையான HTTP(S) traces URL அவசியம்; `/v1/traces` suffix சேர்க்கப்படாது                           |
| `headers`                | விருப்பத்திற்குரிய `Name: value` வரிகள் அல்லது strings கொண்ட JSON object; குறியாக்கம் செய்யப்படும் |
| `requestHeaderAllowlist` | Empty (off); span attributes ஆகப் பதிவு செய்ய வேண்டிய client header names/prefixes                 |
| `serviceName`            | `omniroute`; resource `service.name`                                                               |
| `langfuseMapping`        | `false`; Langfuse generation/session/user attributes-ஐச் சேர்க்கிறது                               |
| `identity`               | `pseudonymous`, `keyName`, அல்லது `none`                                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                            |
| `timeoutMs`              | ஒவ்வொரு HTTP முயற்சிக்கும் `30000`                                                                 |
| `environment`            | அமைக்கப்படவில்லை; விருப்பத்திற்குரிய `langfuse.environment`                                        |

பொதுவான dashboard இந்த fields-ஐக் காட்டுகிறது. `paths` ஒரு API array-ஐ அல்லது
newline/commas மூலம் பிரிக்கப்பட்ட exact paths கொண்ட textarea-ஐ ஏற்கிறது. Explicitly allow செய்யப்படாவிட்டால்
Embeddings, rerank மற்றும் பிற paths skip செய்யப்படும். Skip செய்யப்பட்ட rows கூட cursor-ஐ நகர்த்தும்;
ஏற்கனவே உள்ள runner-இன் `exported`/`exportedTotal` counters, ஏற்றுக்கொள்ளப்பட்ட spans-ஐயன்றி,
filtered rows உட்பட process செய்யப்பட்ட source rows-ஐ எண்ணும். Filtering child-இல் செய்யப்படுகிறது;
அதன் IPC/cursor contract மாற்றப்படாது.

URL validation, `src/shared/network/outboundUrlGuard.ts`-இலிருந்து DB இல்லாமல் செயல்படும்
`parseAndValidateNonMetadataUrl` helper-ஐப் பயன்படுத்துகிறது: `block-metadata` policy.
private URLs opt in செய்யப்பட்ட நிலையில், webhook validator-இன் அதே
unconditional metadata/protocol/embedded-credential checks இதில் உள்ளன; ஆனால் global
feature-flag override இல்லாமலேயே localhost/LAN targets-ஐ திட்டமிட்டு அனுமதிக்கிறது.
இதனால் private HTTP endpoints உட்பட self-hosted Langfuse, Phoenix, Tempo மற்றும் Collector
endpoints-ஐப் பயன்படுத்த முடியும். Cloud-metadata hosts எப்போதும் block செய்யப்படும்.
Redirects follow செய்யப்படாது; ஆகவே ஒரு collector credentials-ஐ வேறு host-க்கு redirect செய்ய முடியாது.
ஏற்கனவே உள்ள lexical URL guard போலவே, இது DNS resolution-ஐ pin செய்யாது; operator கட்டுப்பாட்டில் உள்ள
hosts-ஐ மட்டுமே configure செய்யவும். Endpoint trusted network-ல் இல்லாதபோது HTTPS-ஐ விரும்பவும்.

### Payload and delivery

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) ஒரு
allowed row-க்கு ஒரு CLIENT span-ஐக் கொண்டுசெல்லும்; அது அந்த exact request path-ஆல் பெயரிடப்படும்.
Path naming, span name-ல் model அல்லது identity data-ஐ உட்பொதிக்காமல்,
Chat Completions, Responses மற்றும் Messages ஆகியவற்றை வேறுபடுத்துகிறது. Resource attributes-ல்
`service.name` மற்றும் package-இன் `service.version` ஆகியவை அடங்கும்.

வழக்கமான chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`), completion நேரத்தில்
`duration = Date.now() - startTime`-ஐ எழுதுகிறது; timestamp-ஐ வழங்காது;
`src/lib/usage/callLogs.ts`-இல் உள்ள `saveCallLogOperation`, timestamp-ஐ write
(completion) நேரத்திற்கு default செய்கிறது. எனவே export, end-ஐ row timestamp ஆகவும் start-ஐ end − duration
ஆகவும் அமைக்கிறது (milliseconds decimal nanoseconds-ஆக மாற்றப்படும்). Caller வழங்கிய historical
timestamps-ம் end time ஆகப் பாதுகாக்கப்படும்; ஒவ்வொரு row-க்கும் start/completion discriminator இல்லை.
Null duration zero ஆகும். Invalid/missing timestamps batch-ஐ fail செய்யும்; deterministic அல்லாத spans உருவாக்கப்படாது.
`ttftMs` nullable ஆகும்; இது `omniroute.ttft_ms`-க்கு map செய்யப்படும்.

Attributes-ல் `gen_ai.operation.name="chat"`, provider, requested/response model,
input/output tokens, optional cache-read/cache-creation/reasoning tokens, HTTP status,
combo, cache source, session tag மற்றும் correlation id ஆகியவை அடங்கும். Integer OTLP values மற்றும் timestamps
decimal strings ஆகும்; strings, booleans மற்றும் fractional numbers தங்களுடைய native OTLP value
variants-ஐப் பயன்படுத்தும். Error spans ERROR status மற்றும் sanitized status message-ஐக் கொண்டிருக்கும்.
Canonical record-ல் upstream host URL இல்லாததால், collector-ஐ model server என்று தவறாக
அடையாளப்படுத்தாமல் `server.address` விடுபடும். Cost export செய்யப்படாது.

`includeBodies=true` இருந்தால் மட்டுமே content hydrate செய்யப்படும். `langfuseMapping=false` உடன்,
`gen_ai.input.messages` / `gen_ai.output.messages`, OmniRoute சேமித்த sanitized request/response
body JSON-ஐக் கொண்டிருக்கும் (parse செய்யக்கூடியதாக இருந்தால் canonicalized); re-shaped semconv
messages array ஆக இருக்காது. Clipped/non-JSON bodies raw text ஆகவே இருக்கும்.
`langfuseMapping=true` உடன், bodies `langfuse.observation.input` / `langfuse.observation.output`
ஆக மட்டுமே வெளியிடப்படும்; ஒவ்வொரு body-யும் ஒருமுறை மட்டுமே அனுப்பப்படுவதற்காக
`gen_ai.*.messages` attributes விடுபடும். இரண்டு modes-ம் ஏற்கனவே உள்ள hydration path-இலிருந்து
`maxBodyBytes`-ஐப் பெறும்;
clipping-ஐ `omniroute.bodies_truncated=true` குறிக்கும்.
இந்த destination கூடுதல் pipeline snapshots அல்லது unsanitized artifact reads எதையும் சேர்க்காது;
விருப்பத்திற்குரிய request-header capture, கீழே விவரிக்கப்பட்டுள்ள ஏற்கனவே hydrated client snapshot-ஐப் பயன்படுத்துகிறது.
Bodies-ஐ export செய்யும்போது hourly backlog சேர்ப்பதற்குப் பதிலாக,
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` போன்ற minute-level cadence-ஐப் பயன்படுத்தவும்.

### Optional client request headers

Header capture **இயல்பாக முடக்கப்பட்டுள்ளது**. Destination config-ல் `requestHeaderAllowlist`-ஐ அமைத்து,
**Export prompts and responses**-ஐ இயக்கவும் (`destination`-ல் `includeBodies: true`).
Allowlist, API array-ஐ அல்லது newline/comma-separated names கொண்ட textarea-ஐ ஏற்கிறது:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

பெயர்கள் case-insensitively மற்றும் துல்லியமாகப் பொருந்தும்; ஆனால் இறுதியில் வரும் ஒற்றை `*` nonempty header-name prefix-ஐத் தேர்ந்தெடுத்தால் மட்டும் விதிவிலக்கு. வெறும் `*`, உட்பொதிக்கப்பட்ட wildcards மற்றும் செல்லாத HTTP header பெயர்கள் நிராகரிக்கப்படும். அதிகபட்சம் 64 selectors மட்டுமே இருக்கலாம்; ஒவ்வொன்றின் பெயர்/prefix அதிகபட்சம் 256 ASCII bytes ஆகும். இந்த அமைப்பு `headers` இலிருந்து தனித்தது; `headers` exporter-ஐ collector-க்கு authenticate செய்கிறது.

Capture, சேமிக்கப்பட்ட detailed pipeline-இன் `clientRawRequest` (அல்லது legacy `clientRequest`) மூலம் நிரப்பப்படும் `pipeline_client_request`-ஐ மட்டுமே வாசிக்கும். இது provider request headers-க்கு ஒருபோதும் fallback ஆகாது. Request பதிவு செய்யப்பட்டபோது detailed pipeline logging enable செய்யப்பட்டிருக்க வேண்டும். `includeBodies` முடக்கப்பட்டிருந்தாலோ, client-snapshot JSON இல்லாமலிருந்தாலோ, corrupt அல்லது clipped ஆக இருந்தாலோ, header attributes வெளியிடப்படாது. `maxBodyBytes`-ஐ அதிகரிப்பது export-time snapshot clipping-ஐத் தவிர்க்கலாம்; சேமிக்கப்படாத detail-ஐ மீட்டெடுக்க முடியாது. 1 MiB-ஐ மீறும் அல்லது 256-க்கும் அதிகமான header entries கொண்ட snapshot புறக்கணிக்கப்படும். ஏற்கனவே உள்ள prompt/response export header capture-உடன் இணைந்து தொடரும்; allowlist, headers-only hydration mode-ஐ வழங்காது.

தேர்ந்தெடுக்கப்பட்ட values, ஒரு string மட்டுமே இருந்தாலும், `http.request.header.<full lowercase header name>` OTLP string arrays ஆக மாறும். எடுத்துக்காட்டாக, `X-OmniRoute-Meta-Team: example-team` என்பது `http.request.header.x-omniroute-meta-team` ஆகவும், `{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` ஆகவும் மாறும். முழு prefix பாதுகாக்கப்படும்: இவை சாதாரண headers; business-field parsing அல்லது `omniroute.metadata.*` / Langfuse metadata conversion எதுவும் செய்யப்படாது. `langfuseMapping` header semantics-ஐ மாற்றாது. தேர்ந்தெடுக்கப்பட்ட single-valued `User-Agent`, standard scalar `user_agent.original`-ஐயும் அமைக்கும். ஒரே value-க்குள் உள்ள commas பிரிக்கப்படாது. Case variants, சேமிக்கப்பட்ட entry order-இல் merge செய்யப்படும்; ஏதேனும் invalid variant இருந்தால் அந்த முழு header-மும் விடப்படும். Attributes lowercase பெயரின்படி வரிசைப்படுத்தப்படும்.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key headers, auth/token/secret/password/credential markers கொண்ட பெயர்கள் மற்றும் internal gateway credentials ஆகியவை தேர்ந்தெடுக்கப்பட்டிருந்தாலும் அல்லது storage-ல் பகுதியளவு mask செய்யப்பட்டிருந்தாலும் எப்போதும் விலக்கப்படும். Known credential patterns, shared credential detector-ஐ மீண்டும் பயன்படுத்தும்; redaction markers பாதுகாப்பான values ஆக export செய்யப்படாமல் விடப்படும். Strings மற்றும் nonempty string arrays மட்டுமே ஏற்கப்படும்; numbers அல்லது objects coerce செய்யப்படாது. Invalid names, prototype keys, control characters (horizontal tab தவிர) மற்றும் malformed Unicode ஆகியவை batch தோல்வியடையாமல் அல்லது அவற்றின் content errors-ல் பிரதிபலிக்காமல் புறக்கணிக்கப்படும்.

ஒவ்வொரு span-மும் அதிகபட்சம் 32 headers, ஒவ்வொரு header-க்கும் 16 values, ஒவ்வொரு value-க்கும் 4096 UTF-8 bytes, மேலும் captured header names மற்றும் values அனைத்திற்கும் மொத்தம் 16384 UTF-8 bytes வரை மட்டுமே capture செய்யும். அளவை மீறும்/invalid headers முழுமையாக விடப்படும்; clipped ஆகாது. Selection என்பது operator privacy முடிவு: பாதுகாப்பாகத் தோன்றும் பெயர்களில்கூட personal data இருக்கலாம்; மேலும் இந்த வரம்புகளும் detectors-உம் பொதுவான PII scrubber அல்ல.

### Delivery limits

Requests, envelope உட்பட, 500 spans மற்றும் 4 MiB UTF-8 JSON வரை வரையறுக்கப்படும். Cursor batch-இன் முதல் request-க்கு முன்பே ஒவ்வொரு allowed span-ன் அளவும் சரிபார்க்கப்படும். வரம்பை மீறும் தனிப்பட்ட span, அந்த batch-இன் எந்தப் பகுதியையும் அனுப்பாமல், `maxBodyBytes`-ஐக் குறைக்குமாறு வழிகாட்டலுடன் தோல்வியடையும்; அது அமைதியாக drop செய்யப்படாது. Preflight, record references மற்றும் byte counts-ஐ மட்டும் வைத்திருந்து, ஒவ்வொரு temporary span/JSON-ஐயும் நீக்கிவிடும்; batch-இன் இரண்டாவது serialized copy-ஐ வைத்திருக்காமல், bounded chunks-க்காக spans மீண்டும் உருவாக்கப்படும். HTTP 408/429/5xx, network failures மற்றும் timeouts அதிகபட்சம்
மூன்று attempts பெறும்; 250/500 ms exponential backoff பயன்படுத்தப்படும். `Retry-After` seconds அல்லது HTTP dates, delay-ஐ 5 seconds வரை நீட்டிக்கலாம். பிற statuses உடனடியாக தோல்வியடையும். OTLP 2xx partial rejection-உம் lost span-ஐ acknowledge செய்வதற்குப் பதிலாக throw செய்யும்; empty அல்லது valid JSON acknowledgements ஏற்கப்படும், response-read cap 64 KiB ஆகும்.

Errors, exporter-க்கு சொந்தமான facts மட்டுமே கொண்டிருக்கும்: HTTP status, retry class, attempts மற்றும் sent span counts, அல்லது fixed acknowledgement/network failure wording. Collector response bodies, partial-success counts மற்றும் response headers ஆகியவை errors, logs அல்லது dashboard-ல் ஒருபோதும் copy செய்யப்படாது. தோல்வியடைந்த அல்லது பகுதியளவு ஏற்கப்பட்ட batch acknowledge செய்யப்படாது: destination அந்த status-உடன் Failing எனக் காட்டும், cursor கடைசியாக acknowledged செய்யப்பட்ட batch-இல் நிலைத்திருக்கும், அடுத்த run அதே rows-ஐ மீண்டும் அனுப்பும். Permanent statuses, collector அல்லது configuration சரிசெய்யப்படும் வரை தொடர்ந்து தோல்வியடையும். Response details-க்கு collector-ன் சொந்த logs-ஐப் பயன்படுத்தவும். Call-log error summaries அவற்றுக்கான தனி redaction-ஐத் தக்கவைத்திருக்கும்.
`prepare()` எதையும் provision செய்யாது; Test சரியாக `{"resourceSpans":[]}`-ஐ post செய்து, call-log spans எதையும் எழுதாமல் HTTP status-ஐ report செய்யும்.

Trace ids மற்றும் span ids, `"omniroute.trace\\0" + callLogId` மற்றும் `"omniroute.span\\0" + callLogId` மீது SHA-256-ன் முதல் 32/16 hex digits ஆகும். Re-sends ஒரே ids-ஐத் தாங்கும். இது deduplication guarantee அல்ல: Langfuse v4 ingestion உட்பட சில backends, ஒரே id கொண்ட spans-ஐ deduplicate செய்யாது. Crash அல்லது partial chunk failure ஏற்பட்டால், acknowledge செய்யப்படாத ஒரே cursor batch அதிகபட்சமாக மீண்டும் அனுப்பப்படலாம்; கடைசி HTTP chunk மட்டும் அல்ல, அந்த முழு batch-மும் duplicate ஆகலாம். இந்த tradeoff-ஐ கருத்தில் கொண்டு cursor batch size-ஐத் தேர்ந்தெடுக்கவும்.

### Langfuse example

Self-hosted Langfuse instance-க்கு இந்த fields-ஐ configure செய்யவும்:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Authorization value-ஐ locally, literal `public-key:secret-key` string-ன் Base64 ஆக உருவாக்கவும் (எடுத்துக்காட்டாக `Buffer.from(publicKey + ":" + secretKey).toString("base64")` மூலம்).
உண்மையான credentials-ஐ logs, screenshots அல்லது issues-ல் paste செய்ய வேண்டாம். Mapping தானாகவே `x-langfuse-ingestion-version: 4`-ஐ அமைக்கும்; Authorization இன்னும் `headers`-ல் வழங்கப்பட வேண்டும்.
Headers மற்றும் உருவாக்கப்பட்ட identity salt இரண்டும் ஏற்கனவே உள்ள encrypted secret-field mechanism மற்றும் API placeholders-ஐப் பயன்படுத்தும்; `STORAGE_ENCRYPTION_KEY` தேவைப்படுகிறது.

மேப்பிங் generation type/model, JSON பயன்பாட்டு விவரங்கள் (input/output/total மற்றும் கிடைக்கக்கூடிய
cache keys), JSON input/output snapshots, ERROR/DEFAULT level, சுத்திகரிக்கப்பட்ட status message,
trace name, session id, விருப்பமான environment மற்றும் provider, requested model, path, combo, cache
source மற்றும் status ஆகியவற்றுக்கான filter செய்யக்கூடிய
`langfuse.observation.metadata.<key>` ஆகியவற்றைச் சேர்க்கிறது. `langfuse.observation.completion_start_time` என்பது
தொடக்க நேரத்தில் ISO 8601 வடிவில் இருக்கும்; TTFT அறியப்பட்டு duration-க்குள் இருந்தால் மட்டுமே

- TTFT சேர்க்கப்படும். Cost attributes எதுவும் அனுப்பப்படாது.

Identity modes, `langfuse.user.id` என்பதற்குப் பொருந்தும்:

- `pseudonymous` (இயல்புநிலை): API key-ன் உள்நிலை id-ஐ random ஆன
  per-destination 32-byte salt கொண்டு HMAC-SHA256 செய்வது. Salt இல்லையெனில் creation-இன் போது உருவாக்கப்பட்டு,
  `identitySalt` ஆக encrypted செய்யப்படும், ஒருபோதும் திருப்பி வழங்கப்படாது, மேலும் edits-இன் போது
  தக்கவைக்கப்படும். Raw key ids, span attributes-ல் ஒருபோதும் சேர்க்கப்படாது. Destination-ன் salt-ஐ
  மீண்டும் உருவாக்குவது/சுழற்றுவது identities-ஐ மாற்றும்.
- `keyName`: கட்டமைக்கப்பட்ட API key name; அந்த operator label வெளிப்படையாகத் தெரிவிக்கப்படும்.
- `none`: user id இல்லை. Session tags இருந்தால் அவை தொடர்ந்து export செய்யப்படும்; இந்த modes
  தன்னிச்சையான prompt content அல்லது operator வழங்கிய session/correlation labels-ஐ anonymize செய்யாது.

### Backfill இல்லாமல் தொடங்குதல்

Creation-இன் போது மட்டும், **Start from current position (skip existing logs)** என்பதை enable செய்யவும் அல்லது
create API payload-ன் top level-ல் `startFromCurrentPosition: true` என்பதை அனுப்பவும். இது migration இல்லாமல்,
ஏற்கனவே உள்ள cursor helpers-ஐப் பயன்படுத்தி `cursor_row_id`-ஐ தற்போது retained ஆக இருக்கும் call-log rowid-ன்
அதிகபட்ச மதிப்பாக initialize செய்கிறது. இயல்புநிலை false (cursor 0 மற்றும் retained-history backfill).
இது update-time cursor reset setting அல்ல.

பகிரப்பட்ட `ttftMs` addition, BigQuery mapper மற்றும் new-table schema-க்கு nullable `ttft_ms` column-ஐயும்
சேர்க்கிறது: ஒவ்வொரு canonical record field-க்கும் ஒரு column இருக்க வேண்டும் என அதன் schema test கோருகிறது.
ஏற்கனவே உள்ள tables, தொடர்ந்து மாற்றமின்றி export செய்யப்படும்: `prepare()` table schema-ஐப் படித்து,
அந்த column இல்லாதபோது மட்டும் `ttft_ms`-ஐத் தவிர்க்கிறது. அடுத்த run-ல் TTFT பெற nullable INT64 column-ஐச்
சேர்க்கவும் அல்லது புதிய table-ஐப் பயன்படுத்தவும். விருப்பமான TTFT column schema update-ஐத் தூண்டாது. Usage-evidence columns,
கீழே குறிப்பிடப்பட்டுள்ள conditional, opt-in compatibility flow-ஐப் பின்பற்றும்; பிற row fields strict schema
checking-ஐத் தக்கவைத்துக்கொள்ளும்.

## 6. ஒரு இலக்கைச் சேர்த்தல்

1. `LogExportDestinationType` ஒன்றை ஏற்றுமதி செய்யும் `src/lib/logExport/destinations/<name>.ts` கோப்பை உருவாக்கவும்:
   ஒரு Zod `configSchema`, UI-க்கான `fields` விவரிப்பான் வரிசை, `secretFields`, மற்றும்
   `test()` / `prepare()` / `send(records)` ஆகியவற்றைத் திருப்பியளிக்கும் `createClient(config)`.
2. அதை `src/lib/logExport/registry.ts` கோப்பிலுள்ள `DESTINATIONS` வரிசையில் சேர்க்கவும்.
3. `tests/unit/` என்பதன் கீழ் சோதனைகளை எழுதவும்.

மாற்றம் அவ்வளவுதான்: நிலையான சேமிப்பு, cron பணி, REST அடுக்கு, ரகசியத் தகவல் குறியாக்கம் மற்றும்
கட்டுப்பாட்டுப் பலகைப் படிவம் ஆகிய அனைத்தும் பதிவகத்தைப் படிக்கின்றன.

புதிய இலக்கிற்கான இரண்டு விதிகள்:

- பகுதியளவு தோல்வி ஏற்பட்டால் `send()` **கட்டாயம் விதிவிலக்கை எழுப்ப வேண்டும்**. வெற்றிகரமாக நிறைவடைவது என்பது "இலக்கில் இந்த வரிசைகள் உள்ளன"
  என்பதைக் குறிக்கும்; சுட்டி அவற்றைக் கடந்து நிரந்தரமாக முன்னேறும்.
- பயனர் வழங்கும் URL-ஐ ஏற்கும் இலக்கு, அதிலிருந்து தரவைப் பெறுவதற்கு முன்,
  webhook-கள் செய்வதைப் போலவே `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) மூலம் அதைச் சரிபார்க்க வேண்டும்.
  BigQuery-க்கு இது தேவையில்லை: அதன் ஹோஸ்ட்கள் மாறிலிகள்.

---

## 7. இதை இயக்குதல்

- **டாஷ்போர்டு**: Integrations → Log export. ஒரு இலக்கைச் சேர்த்து, சான்றுகளைச் சரிபார்க்க **சோதனை**யை இயக்கவும்;
  வரிசைகள் எழுதப்படாது. பின்னர் அதை இயக்கவும்.
- **நிலுவை**: ஒவ்வொரு இலக்கு அட்டையும் நிலுவையில் உள்ள வரிசைகளையும் கர்சரையும் காட்டும்; `GET
/api/log-export/status` அதே விவரங்களுடன், சமீபத்திய 20 பணி இயக்கங்களையும் வழங்கும்.
- **தோல்வியடையும் ஒரு இலக்கு, மற்ற இலக்குகளைத் தோல்வியடையச் செய்யாது** — இயக்கச் சுருக்கம் ஒவ்வொரு இலக்கிற்குமான
  நிலையை `last_status` / `last_error` இல் பதிவுசெய்யும்; பணி இயக்க வரலாறு மொத்த நிலையையும் வைத்திருக்கும்.
- **ஒரு இலக்கை நீக்குவது அதன் கர்சரை நீக்கும்.** அதை மீண்டும் சேர்ப்பது, தக்கவைக்கப்பட்டுள்ள மிகப் பழைய
  அழைப்புப் பதிவிலிருந்து தொடங்கும்; இதனால் இலக்கு ஏற்கனவே வைத்திருக்கக்கூடிய வரிசைகள் மீண்டும் அனுப்பப்படும். BigQuery-யில்,
  ஒவ்வொரு வரிசைக்குமான `insertId`, BigQuery-யின் சொந்த நகல்-நீக்கல் காலவரம்பிற்குள் மட்டுமே இதைச் சமாளிக்கும்;
  எனவே இலக்கை நீக்குவதற்குப் பதிலாக முடக்குவது விரும்பத்தக்கது.

### பயன்பாட்டுச் சான்று ஸ்கீமா இணக்கத்தன்மை

புதிய BigQuery அட்டவணைகளில் nullable `usage_evidence` (JSON-ஐக் கொண்ட STRING) மற்றும்
`usage_estimated` (BOOL) ஆகியவை அடங்கும். `autoCreate` இயக்கப்பட்டிருந்தால், ஏற்கனவே உள்ள அட்டவணைக்கு
இந்த விடுபட்ட nullable நெடுவரிசைகளை மட்டும் சேர்க்க முடியும். ஏற்றுமதியாளர், புல மெட்டாடேட்டா உட்பட,
ஏற்கனவே உள்ள முழு ஸ்கீமாவையும் பாதுகாத்து, திரும்பப் பெறப்பட்ட etag-ஐப் பயன்படுத்தி நிபந்தனை PATCH-ஐ
சமர்ப்பிக்கும். ஒரே நேரத்தில் நடைபெறும் ஸ்கீமா மாற்றம், அதை மேலெழுதுவதற்குப் பதிலாக ஏற்றுமதியைத் தோல்வியடையச் செய்யும்;
அடுத்த இயக்கம் அட்டவணையை மீண்டும் வாசிக்கும்.

`autoCreate` முடக்கப்பட்டிருந்தால், பயன்பாட்டுச் சான்றுகளுடன் பதிவுகளை ஏற்றுமதி செய்வதற்கு முன் இந்த
நெடுவரிசைகளை நீங்களே சேர்க்கவும். விடுபட்ட ஸ்கீமா/etag மெட்டாடேட்டா அல்லது தோல்வியடைந்த புதுப்பிப்பு,
சான்றுகளைக் கொண்ட insert செயல்பாடுகளையும் தடுக்கிறது. அந்தத் தோல்வியில் ஏற்றுமதி கர்சர் முன்னேறாது;
சான்றுகள் ஒருபோதும் அமைதியாகக் கைவிடப்படாது. ஏற்றுமதி தடுக்கப்பட்டிருந்தாலும் உள்ளூர் பதிவுத் தக்கவைப்பு
தொடர்ந்து பொருந்தும்; எனவே தக்கவைக்கப்பட்ட மூல வரிசைகள் காலாவதியாகும் முன் தோல்வியைத் தீர்க்கவும்.
