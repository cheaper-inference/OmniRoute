# Log export (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute ခေါ်ဆိုမှုမှတ်တမ်းများကို ပြင်ပ analytics store တစ်ခုသို့ စဉ်ဆက်မပြတ်၊ တိုးပွားပုံစံဖြင့် export လုပ်ခြင်း။

Logs dashboard tab သည် request history ကို SQLite (`call_logs`) တွင် သိမ်းဆည်းထားပြီး၊ ၎င်းကို
rotation နှင့် retention တို့ဖြင့် ကန့်သတ်ထားသည်။ Log export သည် တူညီသော record အစုကို သတ်မှတ်ထားသည့် အချိန်ဇယားအတိုင်း
ပြင်ပသို့ ပို့ပေးသောကြောင့် local database ထက် ပိုမိုကြာရှည်စွာ သိမ်းဆည်းနိုင်ပြီး အခြား data များနှင့် ချိတ်ဆက်အသုံးပြုနိုင်သည်။ BigQuery သည် ပထမဆုံး destination ဖြစ်ပြီး၊
pipeline သည် registry တစ်ခုဖြစ်သောကြောင့် နောက်ထပ် destination များကို ထပ်မံထည့်သွင်းနိုင်သည်။

---

## 1. အလုပ်လုပ်ပုံ

```
ဆာဗာ (config ကို decrypt လုပ်ပြီး validate လုပ်ခြင်း၊ cursor ကို reconcile လုပ်ခြင်း)
  → IPC ကို စတင်ခြင်း → သီးခြားခွဲထားသော exportChild OS process
    → ဖတ်ရန်သီးသန့် storage.sqlite → မျှဝေထားသော call-log query/mapping
      → artifact များကို asynchronous hydrate လုပ်ခြင်း → destination prepare()/send()
        → batch IPC → ဆာဗာက cursor ကို သိမ်းဆည်းခြင်း → ack IPC
          → နောက် batch; done IPC → ဆာဗာက အောင်မြင်မှုကို မှတ်တမ်းတင်ခြင်း
```

- **အချိန်ဇယား** — `JobRegistry` cron job တစ်ခုဖြစ်သော `log_export` ကို ပုံမှန်အားဖြင့် `0 * * * *` (နာရီတိုင်း၊
  UTC) ဟု သတ်မှတ်ထားသည်။ `src/lib/initCloudSync.ts` တွင် register လုပ်ထားပြီး `OMNIROUTE_LOG_EXPORT_CRON` ဖြင့်
  ပြောင်းလဲသတ်မှတ်နိုင်သည်။ Tick တစ်ကြိမ်စီတွင် **ဖွင့်ထားသော** destination အားလုံးကို အစဉ်လိုက် အပြီးသတ်ပို့ဆောင်သည်။
- **Cursor** — SQLite ၏ implicit `call_logs.rowid` ကို destination တစ်ခုစီအလိုက်
  `log_export_destinations.cursor_row_id` တွင် သိမ်းဆည်းထားသည်။ `timestamp` ကို cursor အဖြစ် ရည်ရွယ်ချက်ရှိရှိ
  အသုံးမပြုပါ။ အကြောင်းမှာ caller များက ၎င်းတို့၏ကိုယ်ပိုင်တန်ဖိုးကို ထည့်သွင်းနိုင်သောကြောင့် နောက်မှစတင်ခဲ့သော
  ပိုမြန်သည့် request တစ်ခုအပြီးတွင် ပိုနှေးသည့် request ကို ရေးသားနိုင်ပြီး timestamp cursor က ၎င်းကို
  ကျော်သွားနိုင်သောကြောင့်ဖြစ်သည်။
- **Batch ခွဲခြင်း** — request တစ်ခုလျှင် `batch_size` row များ (ပုံမှန် 500)၊ run တစ်ကြိမ်လျှင်
  `max_rows_per_run` row များ (ပုံမှန် 10000) သတ်မှတ်ထားသဖြင့် များပြားသော backlog ကို run တစ်ခုတည်းတွင်
  ပိတ်ဆို့နေစေမည့်အစား tick အကြိမ်များစွာဖြင့် အပြီးသတ်ပို့ဆောင်သည်။
- **ပေးပို့ခြင်း** — `send()` ပြီးဆုံးမှသာ cursor ကို ရှေ့တိုးသည်။ မအောင်မြင်သော batch တစ်ခုသည်
  cursor ကို မူလနေရာတွင်ပင် ထားရှိသဖြင့် နောက် run တွင် အဆိုပါ row များကို ထပ်မံကြိုးစားသည်။ အာမခံချက်မှာ
  အမှန်တကယ် exactly-once မဟုတ်ဘဲ at-least-once နှင့် destination ဘက်မှ de-duplication ဖြစ်သည်။ BigQuery သည်
  row တစ်ခုစီကို call-log id ဖြင့် key သတ်မှတ်ပြီး ၎င်း၏ကိုယ်ပိုင် dedup window အတွင်း best-effort အခြေခံဖြင့်
  ယင်းကို လိုက်နာသည်။
- **ထပ်နေမှု ကာကွယ်ချက်** — cron tick နှင့် `POST .../run` သည် တစ်ချိန်တည်းတွင် ဖြစ်ပေါ်နိုင်သည်။
  ပို့ဆောင်နေပြီးသား destination ကို နှစ်ကြိမ်ပို့ဆောင်မည့်အစား ကျော်သွားသည် (run ရလဒ်တွင် `skipped: true`)၊
  ထို့ကြောင့် တစ်ပြိုင်တည်း run တစ်ခုက batch တစ်ခုကို ထပ်မံပို့ခြင်း သို့မဟုတ် cursor ကို နောက်ပြန်ရေးခြင်း
  မပြုနိုင်ပါ။
- **Purge ပြန်လည်ရယူခြင်း** — `cursor_row_id` သည် `MAX(rowid)` ထက် မြင့်သွားပါက (table တစ်ခုလုံးကို
  purge လုပ်ပြီး rowid များ ပြန်လည်စတင်ထားပါက) runner သည် အမြဲတမ်း data မတွေ့တော့မည့်အစား 0 သို့
  ပြန်လှည့်သည်။

### သီးခြားခွဲထားသော runner နှင့် ကန့်သတ်ချက်များ

Node ပေါ်ရှိ destination run တစ်ခုစီသည် သီးခြားဖြစ်ပြီး သက်တမ်းတိုသော OS child process
(`worker_threads` မဟုတ်ဘဲ IPC ပါသည့် `child_process`) တစ်ခုကို စတင်သည်။ Body ဖတ်ခြင်း၊ payload JSON
parse/serialize လုပ်ခြင်း၊ destination `prepare()` နှင့် destination network I/O အားလုံးသည် ဆာဗာ၏
event loop ပေါ်တွင်မဟုတ်ဘဲ ထို process အတွင်း လုပ်ဆောင်သည်။ Configuration နှင့် သေးငယ်သော progress
message များသာ IPC ကို ဖြတ်သန်းသည်။ Export လုပ်ထားသော record များသည် ဆာဗာထံ လုံးဝပြန်မလာပါ။
cron job နှင့် Run now route တို့သည် တူညီသော public result နှင့် overlap guard ကို ဆက်လက်ထိန်းသိမ်းထားသည်။

Child သည် ဆာဗာက resolve လုပ်ထားသော `DATA_DIR/storage.sqlite` ကို `node:sqlite` အသုံးပြု၍ read-only
အနေဖြင့် ဖွင့်ပြီး `busy_timeout=5000` နှင့် `query_only=ON` ကို အသုံးပြုသည်။ ၎င်းသည် DB singleton ကို
import မလုပ်သလို migration၊ backup သို့မဟုတ် SQLite update များလည်း မလုပ်ပါ။ ပျောက်ဆုံးနေသော/ပျက်စီးနေသော
artifact bookkeeping (`corrupt-artifact UPDATE` အပါအဝင်) သည် dashboard detail path တွင်သာ ဆက်လက်ရှိသည်။
Path နှစ်ခုစလုံးသည် side effect မရှိသော detail resolver တစ်ခုကို မျှဝေသည်။ Export သည် asynchronous
filesystem read များနှင့် တူညီသော artifact → legacy inline → legacy disk → none resolution အစဉ်ကို
အသုံးပြုသည်။ Child သည် reader ကို ဖွင့်ချိန်တွင် run တစ်ခုက အမြင့်ဆုံး insertion rowid ကို snapshot
ရယူသည်။ နောက်ပိုင်းမှ ထည့်သွင်းမှုများသည် နောက် run ကို စောင့်ရသည်။ ၎င်းသည် သက်တမ်းရှည် SQLite
transaction မဟုတ်ဘဲ insertion boundary တစ်ခုဖြစ်သည်။ Network ကို စောင့်ဆိုင်းနေစဉ် WAL writer များနှင့်
checkpoint များသည် လွတ်လပ်စွာ ဆက်လက်လုပ်ဆောင်နိုင်သည်။ ရှိပြီးသား row များ၏ update/delete များကို
ဤ boundary က freeze မလုပ်ပါ။

လက်ခံပြီးသော batch တစ်ခုစီနောက်တွင် child သည် acknowledgement တစ်ခုကို စောင့်သည်။ ဆာဗာသည် ဦးစွာ
`advanceLogExportCursor` ဖြင့် cursor ကို သိမ်းဆည်းပြီးနောက် `ack` ကို ပို့သည်။ ထိုသို့မပြုမီ နောက် batch
မစတင်ပါ။ ပို့ဆောင်မှုမအောင်မြင်ခြင်း၊ crash ဖြစ်ခြင်း သို့မဟုတ် timeout ဖြစ်ခြင်းသည် ထို batch ၏ cursor ကို
ရှေ့မတိုးဘဲ failure ကို မှတ်တမ်းတင်သည်။ ယခင်က acknowledge လုပ်ပြီးသော batch များသည် commit ဖြစ်ပြီးသားအဖြစ်
ဆက်လက်ရှိသည်။ Acknowledge မလုပ်ရသေးသော batch တစ်ခုကိုသာ အများဆုံး ပြန်ပို့နိုင်သည်။ `done` ရရှိပြီး
child က error မရှိဘဲ exit လုပ်ပြီးမှသာ အောင်မြင်မှုကို မှတ်တမ်းတင်သည်။ Failure ဖြစ်ပါက child ကို SIGTERM ဖြင့်
ရပ်တန့်စေပြီး 500 ms ကြာပြီးနောက် SIGKILL သို့ အဆင့်မြှင့်ကာ runner သည် process ပိတ်သွားသည်အထိ စောင့်သည်။

| Environment variable                          | ပုံမှန်တန်ဖိုး | ရည်ရွယ်ချက်                                 |
| --------------------------------------------- | -------------- | ------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000         | Destination တစ်ခုစီ၏ wall-clock ကန့်သတ်ချက် |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024           | Child V8 old-space ကန့်သတ်ချက် (MB)         |

မမှန်ကန်သော/သုည သို့မဟုတ် အနုတ်တန်ဖိုးဖြစ်သော/ကိန်းပြည့်မဟုတ်သော တန်ဖိုးများအတွက် ပုံမှန်တန်ဖိုးများကို
အသုံးပြုသည်။ Heap setting သည် စုစုပေါင်း RSS ကန့်သတ်ချက်မဟုတ်ပါ။ အလွန်ကြီးမားသော batch များသည် child
memory ကို ကုန်ဆုံးစေနိုင်သေးပြီး run ကို ဘေးကင်းစွာ မအောင်မြင်စေနိုင်သည်။ ပုံမှန် 1024 MB သည် body များ
ဖွင့်ထားချိန်တွင် 512 KiB artifact 500-row ပါသည့် ပုံမှန် batch အတွက် BigQuery ၏ byte-chunked JSON
serialization အပါအဝင် အပိုနေရာချန်ထားပေးသည်။ သို့သော် ၎င်းက 10000-row body batch တစ်ခုကို ဘေးကင်းစေမည်
မဟုတ်ပါ။ V8 heap ကုန်ဆုံးခြင်းဖြစ်ပါက လက်တွေ့ဖြေရှင်းနိုင်သော failure တစ်ခုကို မှတ်တမ်းတင်သည်။ Batch size ကို
လျှော့ချပါ သို့မဟုတ် `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` ကို မြှင့်ပါ။ Cursor သည် နောက်ဆုံး
acknowledge လုပ်ထားသော batch တွင်ပင် ရှိနေမည်။ ယခင် inline/disk body များသည် ခေတ်မီ artifact cap ဖြင့်
အကျုံးမဝင်ပါ။ အထူးသဖြင့် memory ကန့်သတ်ထားသော container များအတွင်း operator များသည် RSS ကို သီးခြားစီ
တွက်ချက်စီမံရမည်။

Child သည် resolve လုပ်ထားသော `DATA_DIR`၊ `NODE_ENV`၊ အတိအလင်းသတ်မှတ်ထားသော `TZ` (legacy filename
၏ local-time resolution)၊ ရှိပါက `ELECTRON_RUN_AS_NODE` နှင့် အောက်ပါ outbound input များကိုသာ
inherit လုပ်သည်။ `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (နှင့် ၎င်းတို့၏ lowercase
ပုံစံများ), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`,
`SSL_CERT_DIR`။ Global Undici dispatcher တစ်ခုသည် `NO_PROXY` အပါအဝင် ဆာဗာ၏ side effect မရှိသော
environment-proxy resolution နှင့် local-host bypass rule များကို မျှဝေသည်။ ၎င်းသည် `proxyFetch.ts`
သို့မဟုတ် ထိုဖိုင်၏ DB/feature flag များကို import မလုပ်ပါ။ Forward လုပ်ထားသော output နှင့် မှတ်တမ်းတင်ထားသော
error များမှ proxy credential များကို ဖုံးကွယ်ထားသည်။ Destination credential များသည် start IPC message
တစ်ခုတည်းမှသာ သွားလာပြီး argv သို့မဟုတ် environment မှ မသွားပါ။ Output/error forwarding တွင် prefix
ထည့်ပြီး အရေးကြီးအချက်အလက်များကို ဖယ်ရှားသန့်စင်ထားသည်။ Cron run တစ်ကြိမ်စီတွင် Node ၏ SQLite warning
ထပ်မံပေါ်လာခြင်းကို ရှောင်ရှားရန် child exec argument များတွင် `ExperimentalWarning` ကိုသာ ပိတ်ထားသည်။
အခြား warning အမျိုးအစားများကို ဆက်လက်မြင်တွေ့နိုင်သည်။

Destination module များကို Next.js/server-only dependency များမပါဘဲ import လုပ်နိုင်ရမည်။ လက်ရှိ
BigQuery implementation သည် ထို contract ကို ဖြည့်ဆည်းပြီးဖြစ်သည်။ Access-token cache များသည် child
run တစ်ခုအတွင်းသာ တည်ရှိပြီး run များအကြား မတည်ရှိပါ။ Node သည် ပံ့ပိုးထားသော runtime ဖြစ်သည် (`package.json` engines)၊ သို့သော် README ၏ Bun
ထည့်သွင်းခြင်းအပိုင်းနှင့် `Dockerfile.bun` တို့ကလည်း
`bun:sqlite` (`src/lib/db/core.ts` / adapter များ) ကို အသုံးပြုသည့် production compatibility လမ်းကြောင်းကို ဖော်ပြထားသည်။ ထို့ကြောင့် Bun အောက်တွင် export များသည် ယခင်
in-process လမ်းကြောင်းကို ဆက်လက်ထိန်းသိမ်းထားပြီး တစ်ကြိမ်သာ warning ထုတ်ပေးသည်- child heap/timeout isolation ကို အသုံးမပြုနိုင်ပါ။ Event-loop နှင့် OOM isolation အတွက်
Node ကို အသုံးပြုပါ၊ ဤနေရာတွင် Bun ကို dev-only အဖြစ် မသတ်မှတ်ထားပါ။

`includeBodies` ကို ဖွင့်ထားသည့်အခါ တစ်နာရီစာ payload backlog စုပုံစေမည့်အစား
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` ကဲ့သို့ မိနစ်အလိုက် cadence ကို ဦးစားပေးပါ။
Batch နှင့် row limit များက run တစ်ခုချင်းစီကို ဆက်လက်ကန့်သတ်ထားသည်။ Process startup ကုန်ကျစရိတ်ကို run တစ်ခုစီရှိ destination တစ်ခုချင်းစီအတွက် ပေးရသည်၊
ဤနည်းလမ်းသည် စုစုပေါင်း CPU အသုံးပြုမှုကို လျှော့ချခြင်းမဟုတ်ဘဲ server event-loop isolation အတွက် startup ကုန်ကျစရိတ်အနည်းငယ်နှင့် ဖလှယ်ခြင်းဖြစ်သည်။

### Payload များ (prompt များနှင့် completion များ)

မူလသတ်မှတ်ချက်အရ export တွင် Logs **စာရင်း** က ပြသသော summary field များသာ ပါဝင်သည်။ **Prompt များနှင့် response များကို export လုပ်ရန်** (`includeBodies`) ကို ဖွင့်လိုက်ပါက
call တစ်ခုချင်းစီအတွက် Logs **အသေးစိတ်**
pane က ပြသသည့်အရာများကိုလည်း ထပ်မံပို့ပေးသည်-

| Field                            | ပါဝင်သည့်အကြောင်းအရာ                                                 |
| -------------------------------- | -------------------------------------------------------------------- |
| `request_body` / `response_body` | Dashboard က render လုပ်ပြသသည့် call payload များ                     |
| `pipeline_route_decision`        | Router က ရွေးချယ်ခဲ့သည့် target နှင့် model                          |
| `pipeline_client_request`        | Client က ပေးပို့ခဲ့သည့်အတိုင်း အတိအကျဖြစ်သော raw request             |
| `pipeline_openai_request`        | Internal OpenAI ပုံစံသို့ ပြောင်းလဲပြီးနောက်                         |
| `pipeline_provider_request`      | Provider dialect ဖြင့် upstream သို့ အမှန်တကယ် ပေးပို့ခဲ့သည့်အတိုင်း |
| `pipeline_provider_response`     | Raw upstream response                                                |
| `pipeline_client_response`       | Caller ထံ ပြန်လည်ပေးအပ်ခဲ့သည့်အရာ                                    |
| `pipeline_error`                 | မအောင်မြင်သော call အတွက် pipeline-level error အသေးစိတ်               |
| `bodies_truncated`               | အထက်ပါ field တစ်ခုခုက `maxBodyBytes` ကို ထိသည့်အခါ True              |

၎င်းသည် prompt အကြောင်းအရာဖြစ်သောကြောင့် **မူလအတိုင်း ပိတ်ထားပြီး** destination တစ်ခုချင်းစီအလိုက် ရည်ရွယ်ချက်ရှိရှိ ရွေးချယ်နိုင်စေထားသည်။
ပို့လိုက်သည့်အရာသည် dashboard က ပြသသည့်အရာနှင့် တူညီသည်၊ အကြောင်းမှာ export နှင့် `getCallLogById` တို့သည် detail
resolution ကို မျှဝေအသုံးပြုသောကြောင့်ဖြစ်သည်- payload များကို
ရေးသားသိမ်းဆည်းသည့်အချိန်တွင် PII-sanitise နှင့် secret-redact လုပ်ပြီးဖြစ်ကာ
`noLog` API key ဖြင့် ပြုလုပ်သော call တစ်ခုသည် မည်သည့် payload ကိုမျှ သိမ်းဆည်းခြင်းမရှိသဖြင့် export လုပ်ရန် ဘာမျှမရှိပါ။

Payload များကို filesystem artifact မှ row တစ်ခုချင်းစီအလိုက် ဖတ်ယူသောကြောင့် ၎င်းတို့ကို တောင်းဆိုထားသည့် destination များအတွက်သာ
hydration ကို လုပ်ဆောင်သည်။ Artifact ပျောက်ဆုံးနေခြင်း သို့မဟုတ် ပျက်စီးနေခြင်းရှိပါက batch ကို မအောင်မြင်စေဘဲ cursor ကို ပိတ်မိစေခြင်းမှ ရှောင်ရှားရန်
၎င်း၏ summary ကို null payload များဖြင့် export လုပ်သည်။

`maxBodyBytes` (မူလတန်ဖိုး 262144) သည် field တစ်ခုချင်းစီကို ကန့်သတ်သည်။ ပိုရှည်သော payload များကို **ဖယ်ရှားပစ်မည့်အစား
ဖြတ်တောက်သည်** — ဖြတ်တောက်ထားသော prompt တစ်ခုသည်ပင် "ဘာကို မေးခဲ့သလဲ" ဆိုသည်ကို ဖြေဆိုနိုင်ဆဲဖြစ်သည် — ထို့အပြင် row ကို
`bodies_truncated` ဖြင့် အမှတ်အသားပြုသည်။ Stream လုပ်ထားသော chunk-by-chunk delta များကို export မလုပ်ပါ၊ စုစည်းပြီးသား response သည်
`pipeline_provider_response` နှင့် `pipeline_client_response` ထဲတွင် ရှိပြီးဖြစ်သည်။

---

## 2. ဖိုင်များ

| အစိတ်အပိုင်း         | တည်နေရာ                                      |
| -------------------- | -------------------------------------------- |
| Destination contract | `src/lib/logExport/types.ts`                 |
| Registry             | `src/lib/logExport/registry.ts`              |
| Secret ကိုင်တွယ်မှု  | `src/lib/logExport/secrets.ts`               |
| Runner (parent IPC)  | `src/lib/logExport/runner.ts`                |
| Process lifecycle    | `src/lib/logExport/childRunner.ts`           |
| Child entry          | `src/lib/logExport/exportChild.ts`           |
| Read-only opener     | `src/lib/db/logExportReadOnly.ts`            |
| Shared query/mapping | `src/lib/usage/callLogExportQueries.ts`      |
| Detail resolver      | `src/lib/usage/callLogDetailResolver.ts`     |
| API projection       | `src/lib/logExport/presenter.ts`             |
| BigQuery destination | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA auth       | `src/lib/logExport/googleServiceAccount.ts`  |
| Call-log source      | `src/lib/usage/callLogExportSource.ts`       |
| Persistence          | `src/lib/db/logExportDestinations.ts`        |
| Cron job             | `src/lib/jobs/logExportJob.ts`               |
| REST layer           | `src/app/api/log-export/`                    |
| Dashboard စာမျက်နှာ  | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Route အားလုံးတွင် စီမံခန့်ခွဲမှုဆိုင်ရာ အထောက်အထားစစ်ဆေးခြင်း (`requireManagementAuth`) ပါဝင်သည်။ Secret များကို မည်သည့်အခါမျှ ပြန်မပေးပါ-
သိမ်းဆည်းထားသော secret ကို စာသားအတိအကျ `__stored__` အဖြစ် ပြန်ပေးပြီး update လုပ်စဉ် ထိုတန်ဖိုးကို ပြန်ပို့ခြင်းက
သိမ်းဆည်းထားသော credential ကို ဆက်လက်ထိန်းသိမ်းထားသည်။

Secret ပါရှိကြောင်း type က သတ်မှတ်ထားသော destination တစ်ခုကို ဖန်တီးခြင်း သို့မဟုတ် update လုပ်ခြင်းအတွက် **`STORAGE_ENCRYPTION_KEY`
လိုအပ်သည်**။ ၎င်းမရှိပါက `encrypt()` သည် အသံတိတ် passthrough အဖြစ် လုပ်ဆောင်သောကြောင့် credential ကို
SQLite ထဲသို့ plaintext ဖြင့် ထည့်မည့်အစား write ကို 400 ဖြင့် ငြင်းပယ်သည် (Telegram webhook တွင် သုံးသည့် guard နှင့် အတူတူဖြစ်သည်)။

| Method   | Path                                     | ရည်ရွယ်ချက်                                                                 |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destination type များ + ၎င်းတို့၏ config field စာရင်း                       |
| `GET`    | `/api/log-export/destinations`           | Destination များကို စာရင်းပြုစုခြင်း (secret များကို ဖုံးကွယ်ထားသည်)        |
| `POST`   | `/api/log-export/destinations`           | Destination တစ်ခု ဖန်တီးခြင်း                                               |
| `GET`    | `/api/log-export/destinations/{id}`      | တစ်ခုကို ဖတ်ရှုခြင်း                                                        |
| `PUT`    | `/api/log-export/destinations/{id}`      | အမည် / enabled / config / batching ကို update လုပ်ခြင်း                     |
| `DELETE` | `/api/log-export/destinations/{id}`      | ဖျက်ခြင်း                                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | Credential များကို စမ်းသပ်စစ်ဆေးပြီး မည်သည့်အရာမျှ မရေးခြင်း                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ချက်ချင်း drain လုပ်ခြင်း၊ scheduled run နှင့် တူညီသော path ကို အသုံးပြုသည် |
| `GET`    | `/api/log-export/status`                 | Cron အခြေအနေ၊ လတ်တလော run များ၊ target တစ်ခုစီ၏ backlog                     |

`GET /api/log-export/types` ကြောင့် UI သည် generic ဖြစ်လာသည်- dashboard form ကို
ပြန်ရရှိလာသော field descriptor များမှ render လုပ်သောကြောင့် destination အသစ်တစ်ခုအတွက် UI ပြောင်းလဲရန် မလိုအပ်ပါ။

---

## 4. BigQuery destination

Config key များ (`type: "bigquery"`):

| Key                  | မှတ်ချက်များ                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `projectId`          | Dataset ကို ထိန်းသိမ်းထားသော GCP project                                                       |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                |
| `location`           | Dataset ကို ဖန်တီးရန် လိုအပ်မှသာ အသုံးပြုသည် (မူလတန်ဖိုး `EU`)                                 |
| `serviceAccountJson` | Service-account key။ Secret ဖြစ်သည်- သိမ်းဆည်းထားစဉ် encrypt လုပ်ပြီး မည်သည့်အခါမျှ ပြန်မပေးပါ |
| `autoCreate`         | ပထမဆုံး export လုပ်စဉ် dataset နှင့် table ကို ဖန်တီးသည် (မူလတန်ဖိုး `true`)                   |

Service account သည် target table အတွက် `bigquery.tables.updateData` လိုအပ်ပြီး
`autoCreate` ဖွင့်ထားချိန်တွင် `bigquery.datasets.create` / `bigquery.tables.create` ကိုလည်း လိုအပ်သည်။

သတ်မှတ်ထားသော batch သည် HTTP unit မဟုတ်ဘဲ **cursor** unit ဖြစ်သည်- `send()` က ၎င်းကို
အများဆုံး row 500 ပါဝင်သော insertAll call များအဖြစ် ခွဲပေးသောကြောင့် ကြီးမားသော `batch_size` သည် BigQuery ၏ 10 MB request ကန့်သတ်ချက်ကို မကျော်လွန်စေနိုင်ပါ။
ယာယီ status များ (408/429/500/502/503/504) ကို တူညီသော insertIds များအား ပြန်လည်အသုံးပြု၍ exponential
backoff ဖြင့် သုံးကြိမ်အထိ ထပ်မံကြိုးစားသည်။ Auth နှင့် schema failure များအတွက်မူ run ကို အလဟဿကုန်ဆုံးစေမည့်အစား
ပထမဆုံး ကြိုးစားမှုတွင်ပင် throw လုပ်သည်။

မကြာသေးမီက ဖန်တီးထားသော table ကို streaming endpoint က မမြင်နိုင်သေးသဖြင့်
စက္ကန့်အနည်းငယ်ကြာ 404 ပြန်ပေးသည်။ ထို 404 ကို ထပ်မံကြိုးစားသော်လည်း **ဤ run က table ကို ဖန်တီးထားသည့်အခါမှသာ** ဖြစ်သည်-
အမှန်တကယ် မရှိသော table သည် ချက်ချင်းပင် fail ဖြစ်သည်။ မကြာသေးမီက ဖျက်ထားသော table အမည်အောက်တွင်
table တစ်ခုကို ပြန်လည်ဖန်တီးပါက BigQuery သည် streaming insert များကို မိနစ်အတော်ကြာ ငြင်းပယ်မည်ဖြစ်ကြောင်း သတိပြုပါ။ ၎င်းသည်
ဖျက်ပြီးနောက် ပြန်လည်ဖန်တီးခြင်း၏ သဘောသဘာဝဖြစ်သောကြောင့် table ကို ဖျက်ပြီး ပြန်ထည့်ခြင်းထက် table အမည်အသစ်ကို ပိုမိုနှစ်သက်သင့်သည်။

**Partial failure တစ်ခုသည် HTTP 200 နှင့်အတူ အလွတ်မဟုတ်သော `insertErrors[]` အဖြစ် ရောက်ရှိလာသည်။** ၎င်းကို
failure အဖြစ် သတ်မှတ်ပြီး throw လုပ်သည်။ ထို့ကြောင့် BigQuery က လက်မခံခဲ့သော row များကို ကျော်၍ cursor ရှေ့တိုးသွားခြင်းကို
ရပ်တန့်စေသည်။ `tests/unit/log-export-bigquery.test.ts` က ထိုအပြုအမူကို အတည်ပြုထားသည်။

Transport သည် ရိုးရိုး REST ဖြစ်သည်- self-signed RS256 assertion ကို access token တစ်ခုအတွက်
`https://oauth2.googleapis.com/token` တွင် လဲလှယ်ပြီးနောက် row များကို `tabledata.insertAll` သို့ ပို့သည်။ မည်သည့် Google SDK ကိုမျှ
ထည့်သွင်းမထားပါ။ Access token များကို (service account, scope) တစ်စုံစီအလိုက် process အတွင်း cache လုပ်ထားသည်။

ဖန်တီးထားသော table တွင် Logs tab ၏ field တစ်ခုစီအတွက် column တစ်ခုစီနှင့် `exported_at` ပါဝင်ပြီး
call log များကို အမှန်တကယ် query လုပ်ပုံနှင့် ကိုက်ညီအောင် ဖွဲ့စည်းထားသည်-

- **`timestamp` အပေါ် နေ့အလိုက် partition ခွဲထားသည်**၊ ထို့ကြောင့် ရက်စွဲဖြင့် ကန့်သတ်ထားသော query တစ်ခုသည် ထိုရက်များကိုသာ scan လုပ်သည်။
- **`api_key_name`, `provider`, `model`, `status` အလိုက် clustered လုပ်ထားသည်** (ထိုအစဉ်အတိုင်း)၊ ထို့ကြောင့်
  မည်သူက run ခဲ့သည်၊ မည်သည့်နေရာသို့ သွားသည် သို့မဟုတ် fail ဖြစ်ခဲ့ခြင်းရှိမရှိတို့ဖြင့် filter လုပ်သည့်အခါ partition တစ်ခုစီအတွင်းရှိ block များကို ဖယ်ရှားနိုင်သည်။ BigQuery သည်
  clustering column အများဆုံး လေးခုအထိ ခွင့်ပြုပြီး အစဉ်သည် အရေးကြီးသည်- `api_key_name` တစ်ခုတည်းအပေါ် filter လုပ်ခြင်းက
  prune လုပ်နိုင်သော်လည်း `status` တစ်ခုတည်းအပေါ် filter လုပ်ခြင်းက မလုပ်နိုင်ပါ။
- **ရွေးချယ်အသုံးပြုနိုင်သော partition retention** ကို `partitionExpirationDays` မှတစ်ဆင့် သတ်မှတ်နိုင်သည် (`0` သည် အားလုံးကို ထိန်းသိမ်းထားသည်)၊
  table ကို ဖန်တီးသည့်အခါ အသုံးချသည်။

ဆက်တင်နှစ်ခုစလုံးသည် ဖန်တီးချိန်တွင် သက်ရောက်သည်။ ရှိပြီးသား table သည် ၎င်းတွင် ရှိနှင့်ပြီးသော layout ကို ဆက်လက်ထိန်းသိမ်းထားမည်ဖြစ်သောကြောင့်
၎င်းတို့ကို အသုံးပြုလိုပါက destination ကို table ID အသစ်တစ်ခုသို့ ညွှန်ပေးပါ။

`tests/unit/log-export-bigquery.test.ts` သည် mapper နှင့် table schema တို့ အမြဲတမ်း တစ်ပြေးညီရှိနေကြောင်း စစ်ဆေးအတည်ပြုသဖြင့် call-log column အသစ်တစ်ခုကို export လုပ်သည့်လမ်းကြောင်းတွင် အသိပေးခြင်းမရှိဘဲ ချန်လှပ်ထား၍ မရပါ။

Batch များကို row အရေအတွက်နှင့် serialise လုပ်ထားသော byte ပမာဏ **နှစ်ခုစလုံး** အပေါ်မူတည်၍ chunk များအဖြစ် ခွဲထားသည်။ Payload များကို export လုပ်သည့်အခါ row အရေအတွက်တစ်ခုတည်းဖြင့် မလုံလောက်ပါ။ Prompt များပါဝင်သော row 500 ခုသည် megabyte ဆယ်ဂဏန်းအထိ ရှိနိုင်ပြီး insertAll သည် 10 MB ကျော်သော request ကို ငြင်းပယ်သည်။ Row 500 ခု သို့မဟုတ် 9 MB သို့ ရောက်သည်နှင့်၊ မည်သည့်သတ်မှတ်ချက်က အရင်ပြည့်သည်ဖြစ်စေ chunk ကို ပိတ်သည်။

---

## 5. OTLP/HTTP trace များ၏ ပို့ဆောင်ရာနေရာ

ပြင်ဆင်သတ်မှတ်ချက်တွင် `type: "otlp-http"` ကို အသုံးပြုသည်။ ဤသည်မှာ သိမ်းဆည်းထားသော
ခေါ်ဆိုမှုမှတ်တမ်းများကို cursor အခြေပြု၍ အချိန်ဇယားအလိုက် ထုတ်ပို့ခြင်းဖြစ်ပြီး၊
`open-sse/services/routing/otel.ts` ရှိ တတ်နိုင်သမျှသာ လုပ်ဆောင်သည့် တိုက်ရိုက် routing-event လက်ခံစနစ် မဟုတ်ပါ။
၎င်းသည် ထိုလက်ခံစနစ်၏ environment variable များ၊ timer များ သို့မဟုတ် buffer များကို ဖတ်ရှုခြင်း၊ ပြောင်းလဲခြင်း မပြုပါ။
နှစ်ခုလုံးကို ဖွင့်ထားပါက သီးခြားလွတ်လပ်သော span နှစ်မျိုး ထွက်ပေါ်နိုင်သည်။
ဤခေါ်ဆိုမှုမှတ်တမ်း span များကို ခွဲခြားရန် `omniroute.log-export` instrumentation scope ကို အသုံးပြုပါ။

| သော့                     | မူလတန်ဖိုး / ရည်ရွယ်ချက်                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `endpoint`               | HTTP(S) traces URL အပြည့်အစုံ လိုအပ်သည်။ `/v1/traces` နောက်ဆက်ကို ထပ်မထည့်ပါ                         |
| `headers`                | ရွေးချယ်နိုင်သော `Name: value` စာကြောင်းများ သို့မဟုတ် string များပါသည့် JSON object၊ ကုဒ်ဝှက်ထားသည် |
| `requestHeaderAllowlist` | ဗလာ (ပိတ်ထားသည်)၊ span attribute များအဖြစ် ဖမ်းယူမည့် client header အမည်များ/ရှေ့ဆက်များ             |
| `serviceName`            | `omniroute`၊ resource ၏ `service.name`                                                               |
| `langfuseMapping`        | `false`၊ Langfuse generation/session/user attribute များ ထည့်ပေးသည်                                  |
| `identity`               | `pseudonymous`၊ `keyName` သို့မဟုတ် `none`                                                           |
| `paths`                  | `/v1/chat/completions`၊ `/v1/responses`၊ `/v1/messages`                                              |
| `timeoutMs`              | HTTP ကြိုးပမ်းမှုတစ်ကြိမ်လျှင် `30000`                                                               |
| `environment`            | သတ်မှတ်မထားပါ၊ ရွေးချယ်နိုင်သော `langfuse.environment`                                               |

ယေဘုယျ dashboard သည် ဤအကွက်များကို ပြသပေးသည်။ `paths` သည် API array တစ်ခု သို့မဟုတ်
တိကျသော path များကို စာကြောင်းအသစ်များ/ကော်မာများဖြင့် ခွဲထားသော textarea တစ်ခုကို လက်ခံသည်။
Embeddings၊ rerank နှင့် အခြား path များကို အတိအလင်း ခွင့်ပြုမထားလျှင် ကျော်သွားမည်။
ကျော်သွားသော row များလည်း cursor ကို ရှေ့တိုးစေသည်။ ရှိပြီးသား runner ၏
`exported`/`exportedTotal` ကောင်တာများသည် လက်ခံထားသော span များကို မရေတွက်ဘဲ၊
စစ်ထုတ်ထားသော row များအပါအဝင် လုပ်ဆောင်ပြီးသော မူရင်း row များကို ရေတွက်သည်။
စစ်ထုတ်ခြင်းကို child process အတွင်း လုပ်ဆောင်ပြီး ၎င်း၏ IPC/cursor သဘောတူညီချက်ကို မပြောင်းလဲပါ။

URL စစ်ဆေးအတည်ပြုခြင်းသည် `src/shared/network/outboundUrlGuard.ts` မှ DB မလိုအပ်သော
`parseAndValidateNonMetadataUrl` အကူအညီလုပ်ဆောင်ချက်ကို အသုံးပြုသည်။ ၎င်းမှာ `block-metadata` မူဝါဒဖြစ်သည်။
၎င်းတွင် private URL များကို ခွင့်ပြုထားသည့် webhook validator ကဲ့သို့ပင် ခြွင်းချက်မရှိသော
metadata/protocol/URL အတွင်းပါဝင်သည့် အထောက်အထား စစ်ဆေးမှုများ ရှိသော်လည်း၊ global
feature-flag override မလိုဘဲ localhost/LAN ပစ်မှတ်များကို ရည်ရွယ်ချက်ရှိရှိ ခွင့်ပြုထားသည်။
ထို့ကြောင့် private HTTP endpoint များအပါအဝင် ကိုယ်တိုင် host လုပ်ထားသော Langfuse၊ Phoenix၊ Tempo နှင့် Collector
endpoint များကို အသုံးပြုနိုင်သည်။ Cloud-metadata host များကို အမြဲပိတ်ပင်ထားသည်။
Redirect များကို လိုက်မသွားသောကြောင့် collector သည် အထောက်အထားများကို အခြား host သို့ လွှဲပို့မရပါ။
ရှိပြီးသား စာသားအခြေပြု URL guard ကဲ့သို့ပင်၊ ဤစနစ်သည် DNS resolution ကို ပုံသေချည်နှောင်မထားပါ။
စီမံခန့်ခွဲသူ ထိန်းချုပ်ထားသော host များကိုသာ သတ်မှတ်ပါ။ Endpoint သည် ယုံကြည်ရသော ကွန်ရက်ပေါ်တွင် မရှိပါက HTTPS ကို ဦးစားပေးပါ။

### Payload နှင့် ပို့ဆောင်ခြင်း

OTLP/HTTP JSON (`ExportTraceServiceRequest`၊ `Content-Type: application/json`) သည် ခွင့်ပြုထားသော
row တစ်ခုစီအတွက် CLIENT span တစ်ခုကို သယ်ဆောင်ပြီး ၎င်း၏ တိကျသော request path ဖြင့် အမည်ပေးသည်။
Path ဖြင့် အမည်ပေးခြင်းက span အမည်ထဲတွင် model သို့မဟုတ် identity အချက်အလက်များ မထည့်သွင်းဘဲ
Chat Completions၊ Responses နှင့် Messages တို့ကို ခွဲခြားပေးသည်။
Resource attribute များတွင် `service.name` နှင့် package ၏ `service.version` ပါဝင်သည်။

ပုံမှန် chat ကြိုးပမ်းမှု မှတ်တမ်းတင်စနစ် (`open-sse/handlers/chatCore/attemptLogging.ts`) သည်
ပြီးဆုံးချိန်တွင် `duration = Date.now() - startTime` ကို ရေးသားပြီး timestamp ကို မပေးပါ။
`src/lib/usage/callLogs.ts` ရှိ `saveCallLogOperation` သည် timestamp ၏ မူလတန်ဖိုးကို
ရေးသားသည့် (ပြီးဆုံးသည့်) အချိန်အဖြစ် သတ်မှတ်သည်။ ထို့ကြောင့် ထုတ်ပို့ရာတွင် အဆုံးချိန် = row timestamp နှင့်
အစချိန် = အဆုံးချိန် − ကြာချိန်ဟု သတ်မှတ်သည် (မီလီစက္ကန့်မှ ဒဿမ နာနိုစက္ကန့်သို့ ပြောင်းလဲသည်)။
ခေါ်ဆိုသူပေးထားသော ယခင်အချိန် timestamp များကိုလည်း အဆုံးချိန်အဖြစ် ထိန်းသိမ်းထားသည်။
Row တစ်ခုချင်းအလိုက် အစချိန်/ပြီးဆုံးချိန် ခွဲခြားသည့် အမှတ်အသား မရှိပါ။
Null ဖြစ်သော ကြာချိန်သည် သုညဖြစ်သွားသည်။ မမှန်ကန်သော/ပျောက်နေသော timestamp များသည်
မတည်ငြိမ်သော span များ ဖန်တီးမည့်အစား batch ကို မအောင်မြင်စေသည်။
`ttftMs` သည် null ဖြစ်နိုင်ပြီး `omniroute.ttft_ms` သို့ ချိတ်ဆက်သတ်မှတ်သည်။

Attribute များတွင် `gen_ai.operation.name="chat"`၊ provider၊ တောင်းဆိုထားသော/တုံ့ပြန်သော model၊
အဝင်/အထွက် token များ၊ ရွေးချယ်နိုင်သော cache ဖတ်ရှုမှု/cache ဖန်တီးမှု/reasoning token များ၊ HTTP အခြေအနေ၊
combo၊ cache ရင်းမြစ်၊ session tag နှင့် correlation id တို့ ပါဝင်သည်။
ကိန်းပြည့် OTLP တန်ဖိုးများနှင့် timestamp များသည် ဒဿမ string များဖြစ်သည်။ String၊ boolean နှင့်
အပိုင်းကိန်းများသည် ၎င်းတို့၏ မူရင်း OTLP တန်ဖိုးအမျိုးအစားများကို အသုံးပြုသည်။
အမှား span များတွင် ERROR အခြေအနေနှင့် အန္တရာယ်ရှိသော အချက်အလက်များ ဖယ်ရှားထားသည့် အခြေအနေစာသား ပါဝင်သည်။
စံမှတ်တမ်းတွင် upstream host URL မပါသောကြောင့် collector ကို model server ဟု မှားယွင်းသတ်မှတ်မည့်အစား
`server.address` ကို ချန်လှပ်ထားသည်။ ကုန်ကျစရိတ်ကို မထုတ်ပို့ပါ။

`includeBodies=true` ဖြစ်မှသာ အကြောင်းအရာကို ဖြည့်သွင်းရယူသည်။ `langfuseMapping=false` ဖြစ်လျှင်
`gen_ai.input.messages` / `gen_ai.output.messages` တို့သည် ပုံစံပြန်ပြင်ထားသော semconv
messages array မဟုတ်ဘဲ OmniRoute က သိမ်းဆည်းထားသည့်အတိုင်း အန္တရာယ်ရှိသော အချက်အလက်များ ဖယ်ရှားထားသည့်
request/response body JSON ကို သယ်ဆောင်သည် (parse လုပ်နိုင်လျှင် စံပုံစံပြောင်းထားသည်)။
ဖြတ်တောက်ထားသော/JSON မဟုတ်သော body များသည် မူရင်းစာသားအဖြစ် ကျန်ရှိသည်။ `langfuseMapping=true` ဖြစ်လျှင်
body များကို `langfuse.observation.input` / `langfuse.observation.output` အဖြစ်သာ ထုတ်ပေးသည်။
Body တစ်ခုစီ တစ်ကြိမ်သာ ပို့ရန် `gen_ai.*.messages` attribute များကို ချန်လှပ်ထားသည်။
မုဒ်နှစ်မျိုးလုံးသည် ရှိပြီးသား အကြောင်းအရာဖြည့်သွင်းရယူသည့် လမ်းကြောင်းမှ `maxBodyBytes` ကို ဆက်ခံသည်။
`omniroute.bodies_truncated=true` သည် ဖြတ်တောက်ထားမှုကို အမှတ်အသားပြုသည်။
ဤပို့ဆောင်ရာနေရာသည် ထပ်ဆောင်း pipeline snapshot များ သို့မဟုတ် အန္တရာယ်ရှိသော အချက်အလက်များ မဖယ်ရှားထားသည့်
artifact ဖတ်ရှုမှုများကို မထည့်သွင်းပါ။ ရွေးချယ်နိုင်သော request-header ဖမ်းယူမှုသည် အောက်တွင် ဖော်ပြထားသော
ရှိပြီးသား အကြောင်းအရာဖြည့်သွင်းရယူထားသည့် client snapshot ကို အသုံးပြုသည်။
Body များ ထုတ်ပို့ရာတွင် နာရီအလိုက် အလုပ်ကြွေးများ စုပုံစေမည့်အစား
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` ကဲ့သို့ မိနစ်အဆင့် အချိန်ဇယားကို အသုံးပြုပါ။

### ရွေးချယ်နိုင်သော client request header များ

Header ဖမ်းယူမှုကို **မူလအတိုင်း ပိတ်ထားသည်**။ ပို့ဆောင်ရာနေရာ၏ ပြင်ဆင်သတ်မှတ်ချက်တွင်
`requestHeaderAllowlist` ကို သတ်မှတ်ပြီး **Prompt များနှင့် တုံ့ပြန်ချက်များကို ထုတ်ပို့ရန်**
(ပို့ဆောင်ရာနေရာတွင် `includeBodies: true`) ကို ဖွင့်ပါ။
ခွင့်ပြုစာရင်းသည် API array တစ်ခု သို့မဟုတ် စာကြောင်းအသစ်/ကော်မာဖြင့် အမည်များ ခွဲထားသော textarea တစ်ခုကို လက်ခံသည်။

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

အမည်များကို စာလုံးအကြီးအသေး မခွဲခြားဘဲ အတိအကျ ကိုက်ညီစစ်ဆေးသည်။ သို့သော် အဆုံးတွင်ရှိသော `*` တစ်ခုတည်းက ဗလာမဟုတ်သည့်
header အမည်ရှေ့ဆက်ကို ရွေးချယ်ပေးသည်။ သီးသန့် `*`၊ အလယ်တွင် ထည့်ထားသော wildcard များနှင့် မမှန်ကန်သော HTTP header အမည်များကို လက်မခံပါ။
ရွေးချယ်သတ်မှတ်ချက် အများဆုံး 64 ခု ရှိနိုင်ပြီး တစ်ခုစီ၏ အမည်/ရှေ့ဆက်သည် ASCII ဘိုက် 256 ထက် မပိုရပါ။
ဤဆက်တင်သည် exporter ကို collector ထံ အထောက်အထားစိစစ်ပေးသော `headers` နှင့် သီးခြားဖြစ်သည်။

ဖမ်းယူမှုသည် သိမ်းဆည်းထားသော အသေးစိတ် pipeline ၏
`clientRawRequest` (သို့မဟုတ် ယခင်စနစ်၏ `clientRequest`) မှ ဖြည့်သွင်းထားသည့် `pipeline_client_request` ကိုသာ ဖတ်သည်။ Provider request header များကို အစားထိုးအသုံးပြုခြင်း လုံးဝမရှိပါ။
Request ကို မှတ်တမ်းတင်စဉ်က အသေးစိတ် pipeline logging ကို ဖွင့်ထားပြီး ဖြစ်ရမည်။
`includeBodies` ကို ပိတ်ထားလျှင် သို့မဟုတ် client-snapshot JSON ပျောက်နေ၊ ပျက်စီးနေ သို့မဟုတ် ဖြတ်တောက်ခံထားရလျှင် header
attribute များကို မထုတ်ပေးပါ။ `maxBodyBytes` ကို တိုးမြှင့်ခြင်းဖြင့် export လုပ်ချိန် snapshot ဖြတ်တောက်ခံရမှုကို ရှောင်နိုင်သည်။
သို့သော် မူလက မသိမ်းဆည်းခဲ့သော အသေးစိတ်အချက်အလက်ကို ပြန်မရနိုင်ပါ။ 1 MiB ထက်ကြီးသော သို့မဟုတ်
header entry 256 ခုထက်ပိုသော snapshot ကို လျစ်လျူရှုသည်။ လက်ရှိ prompt/response export သည် header ဖမ်းယူမှုနှင့်အတူ
ဆက်လက်ဖွင့်ထားဆဲဖြစ်သည်။ ခွင့်ပြုစာရင်းသည် header များသာ ဖြည့်သွင်းသည့် mode ကို မပေးပါ။

ရွေးချယ်ထားသော တန်ဖိုးများသည် string တစ်ခုတည်း ဖြစ်နေလျှင်ပင် `http.request.header.<full lowercase header name>` OTLP string array များအဖြစ် ပြောင်းလဲသည်။
ဥပမာ `X-OmniRoute-Meta-Team: example-team` သည်
`http.request.header.x-omniroute-meta-team` ဖြစ်လာပြီး တန်ဖိုးမှာ
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` ဖြစ်သည်။
ရှေ့ဆက်အပြည့်အစုံကို မပြောင်းဘဲ ထိန်းသိမ်းထားသည်။ ၎င်းတို့သည် သာမန် header များသာဖြစ်ပြီး လုပ်ငန်းဆိုင်ရာ field ခွဲခြမ်းခြင်း သို့မဟုတ်
`omniroute.metadata.*` / Langfuse metadata အဖြစ် ပြောင်းလဲခြင်း မရှိပါ။ `langfuseMapping` သည် header ၏
အဓိပ္ပာယ်သတ်မှတ်ချက်ကို မပြောင်းလဲပါ။ ရွေးချယ်ထားသော တန်ဖိုးတစ်ခုတည်းရှိသည့် `User-Agent` သည် စံ scalar
`user_agent.original` ကိုလည်း သတ်မှတ်ပေးသည်။ တန်ဖိုးတစ်ခုအတွင်းရှိ ကော်မာများအလိုက် ခွဲမထုတ်ပါ။ စာလုံးအကြီးအသေး ကွဲပြားမှုများကို သိမ်းဆည်းထားသော
entry အစီအစဉ်အတိုင်း ပေါင်းစည်းသည်။ ကွဲပြားမှုတစ်ခုခု မမှန်ကန်လျှင် ထို header တစ်ခုလုံးကို ချန်လှပ်သည်။ Attribute များကို စာလုံးအသေးအမည်အလိုက် စီစဉ်သည်။

Authorization၊ Proxy-Authorization၊ Cookie၊ Set-Cookie၊ API-key header များ၊
auth/token/secret/password/credential အမှတ်အသားများ ပါဝင်သော အမည်များနှင့် အတွင်းပိုင်း gateway အထောက်အထားများကို
ရွေးချယ်ထားလျှင်ဖြစ်စေ၊ သိမ်းဆည်းရာတွင် တစ်စိတ်တစ်ပိုင်း ဖုံးကွယ်ထားလျှင်ဖြစ်စေ အမြဲ ဖယ်ထုတ်သည်။ သိရှိထားသော အထောက်အထားပုံစံများအတွက်
မျှဝေသုံးစွဲသော အထောက်အထားရှာဖွေကိရိယာကို ပြန်သုံးသည်။ ဖုံးကွယ်မှုအမှတ်အသားများကို ဘေးကင်းသောတန်ဖိုးအဖြစ် export မလုပ်ဘဲ ချန်လှပ်သည်။
String များနှင့် ဗလာမဟုတ်သော string array များကိုသာ လက်ခံသည်။ နံပါတ်များ သို့မဟုတ် object များကို အတင်းပြောင်းလဲခြင်း မရှိပါ။
မမှန်ကန်သော အမည်များ၊ prototype key များ၊ control character များ (horizontal tab မှလွဲ၍) နှင့် ပုံစံမမှန်သော Unicode
တို့ကို batch မအောင်မြင်စေခြင်း သို့မဟုတ် ၎င်းတို့၏ အကြောင်းအရာကို error များတွင် ထင်ဟပ်ဖော်ပြခြင်း မရှိဘဲ လျစ်လျူရှုသည်။

Span တစ်ခုစီသည် header အများဆုံး 32 ခု၊ header တစ်ခုလျှင် တန်ဖိုး 16 ခု၊ တန်ဖိုးတစ်ခုလျှင် UTF-8 ဘိုက် 4096၊
ဖမ်းယူထားသော header အမည်များနှင့် တန်ဖိုးများအားလုံး စုစုပေါင်း UTF-8 ဘိုက် 16384 အထိ ဖမ်းယူသည်။ အရွယ်အစားကျော်လွန်သော/မမှန်ကန်သော header များကို
ဖြတ်တောက်ခြင်းမပြုဘဲ တစ်ခုလုံး ချန်လှပ်သည်။ ရွေးချယ်မှုသည် စနစ်လည်ပတ်သူ၏ ကိုယ်ရေးအချက်အလက်ကာကွယ်ရေးဆိုင်ရာ ဆုံးဖြတ်ချက်ဖြစ်သည်။ ဘေးကင်းပုံရသော အမည်များတွင်ပင်
ကိုယ်ရေးအချက်အလက် ပါဝင်နိုင်ပြီး ဤကန့်သတ်ချက်များ/ရှာဖွေကိရိယာများသည် ယေဘုယျ PII ဖယ်ရှားရေးကိရိယာ မဟုတ်ပါ။

### ပေးပို့မှု ကန့်သတ်ချက်များ

Request များကို envelope အပါအဝင် span 500 နှင့် UTF-8 JSON 4 MiB အထိ ကန့်သတ်ထားသည်။
Cursor batch တစ်ခု၏ ပထမဆုံး request မပို့မီ ခွင့်ပြုထားသော span တိုင်း၏ အရွယ်အစားကို စစ်ဆေးသည်။ သီးခြား
span တစ်ခုက ကန့်သတ်ချက်ထက် ကြီးနေလျှင် ထို batch ၏ မည်သည့်အစိတ်အပိုင်းကိုမျှ မပို့ဘဲ
`maxBodyBytes` ကို လျှော့ချရန် လမ်းညွှန်ချက်နှင့်အတူ မအောင်မြင်ကြောင်း ပြသည်။ အသိမပေးဘဲ ဖယ်ပစ်ခြင်း မရှိပါ။ ကြိုတင်စစ်ဆေးမှုသည် record ရည်ညွှန်းချက်များနှင့်
ဘိုက်အရေအတွက်များကိုသာ ထိန်းသိမ်းပြီး ယာယီ span/JSON တစ်ခုစီကို ဖယ်ရှားသည်။ Batch ၏ serialize လုပ်ထားသော ဒုတိယမိတ္တူကို
သိမ်းထားမည့်အစား အရွယ်အစားကန့်သတ်ထားသော အပိုင်းများအတွက် span များကို ပြန်တည်ဆောက်သည်။ HTTP 408/429/5xx၊ ကွန်ရက်ချို့ယွင်းမှုနှင့် timeout များအတွက် အများဆုံး
သုံးကြိမ် ကြိုးပမ်းပြီး 250/500 ms အဆတိုး စောင့်ဆိုင်းချိန်ကို သုံးသည်။ `Retry-After` စက္ကန့် သို့မဟုတ် HTTP ရက်စွဲများသည်
စောင့်ဆိုင်းချိန်ကို 5 စက္ကန့်အထိ တိုးစေနိုင်သည်။ အခြား status များသည် ချက်ချင်း မအောင်မြင်ပါ။ OTLP 2xx တစ်စိတ်တစ်ပိုင်း ငြင်းပယ်မှုသည်လည်း
ပျောက်ဆုံးသော span ကို လက်ခံပြီးကြောင်း အတည်ပြုမည့်အစား error ထုတ်သည်။ ဗလာ သို့မဟုတ် မှန်ကန်သော JSON အတည်ပြုတုံ့ပြန်မှုများကို လက်ခံပြီး
တုံ့ပြန်မှုဖတ်ရှုသည့် အရွယ်အစားကို 64 KiB အထိ ကန့်သတ်ထားသည်။

Error များတွင် exporter ကိုယ်တိုင်ပိုင်ဆိုင်သော အချက်အလက်များသာ ပါဝင်သည်။ ၎င်းတို့မှာ HTTP status၊ ပြန်ကြိုးစားမှုအမျိုးအစား၊ ကြိုးပမ်းမှုအရေအတွက်နှင့် ပို့ပြီးသော span
အရေအတွက်များ သို့မဟုတ် ပုံသေ အတည်ပြုတုံ့ပြန်မှု/ကွန်ရက်ချို့ယွင်းမှု စာသားများဖြစ်သည်။ Collector တုံ့ပြန်မှု body များ၊
တစ်စိတ်တစ်ပိုင်း အောင်မြင်မှုအရေအတွက်များနှင့် တုံ့ပြန်မှု header များကို error၊ log သို့မဟုတ်
dashboard ထဲသို့ လုံးဝ မကူးယူပါ။ မအောင်မြင်သော သို့မဟုတ် တစ်စိတ်တစ်ပိုင်းသာ လက်ခံထားသော batch ကို လက်ခံပြီးကြောင်း အတည်မပြုပါ။ Destination တွင်
ထို status နှင့်အတူ မအောင်မြင်နေကြောင်း ပြသပြီး cursor သည် နောက်ဆုံး အတည်ပြုပြီးသော batch တွင်သာ ရှိနေကာ နောက်တစ်ကြိမ် လုပ်ဆောင်သည့်အခါ
တူညီသော row များကို ပြန်ပို့သည်။ အမြဲတမ်းပျက်ကွက်စေသော status များသည် collector သို့မဟုတ် configuration ကို
မပြင်မချင်း ဆက်လက် မအောင်မြင်နေမည်။ တုံ့ပြန်မှုအသေးစိတ်အတွက် collector ၏ ကိုယ်ပိုင် log များကို အသုံးပြုပါ။ Call-log error အကျဉ်းချုပ်များသည်
၎င်းတို့၏ သီးခြား ဖုံးကွယ်မှုကို ဆက်လက်သုံးသည်။
`prepare()` သည် မည်သည့်အရာကိုမျှ ပြင်ဆင်ဖန်တီးမပေးပါ။ Test သည် `{"resourceSpans":[]}` ကို အတိအကျ POST လုပ်ပြီး
call-log span များ မရေးဘဲ HTTP status ကို အစီရင်ခံသည်။

Trace id နှင့် span id များသည်
`"omniroute.trace\0" + callLogId` နှင့် `"omniroute.span\0" + callLogId` တို့အပေါ် SHA-256 တွက်ချက်မှု၏ ပထမဆုံး 32/16 hex ဂဏန်းများ ဖြစ်သည်။ ပြန်ပို့မှုများတွင်
တူညီသော id များ ပါဝင်သည်။ ၎င်းသည် ထပ်နေမှုဖယ်ရှားမည်ဟု အာမခံခြင်း မဟုတ်ပါ။ Langfuse
v4 ingestion အပါအဝင် backend အချို့သည် id တူသော span များ၏ ထပ်နေမှုကို မဖယ်ရှားပါ။ စနစ်ရပ်တန့်မှု သို့မဟုတ် အပိုင်းတစ်စိတ်တစ်ပိုင်း မအောင်မြင်မှုကြောင့်
အတည်မပြုရသေးသော cursor batch တစ်ခုကိုသာ အများဆုံး ပြန်ပို့နိုင်သည်။ ၎င်း၏ နောက်ဆုံး HTTP အပိုင်းသာမက batch တစ်ခုလုံး
ထပ်နေခြင်း ဖြစ်နိုင်သည်။ ဤအပေးအယူကို ထည့်သွင်းစဉ်းစားပြီး cursor batch အရွယ်အစားကို ရွေးချယ်ပါ။

### Langfuse ဥပမာ

ကိုယ်တိုင် host လုပ်ထားသော Langfuse instance အတွက် ဤ field များကို သတ်မှတ်ပါ။

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

Authorization တန်ဖိုးကို မိမိစက်တွင် `public-key:secret-key` စာသားအတိုင်း၏ Base64 အဖြစ် တည်ဆောက်ပါ
(ဥပမာ `Buffer.from(publicKey + ":" + secretKey).toString("base64")` ဖြင့်)။
အမှန်တကယ် အထောက်အထားများကို log၊ screenshot သို့မဟုတ် issue များထဲသို့ မကူးထည့်ပါနှင့်။ Mapping သည်
`x-langfuse-ingestion-version: 4` ကို အလိုအလျောက် သတ်မှတ်ပေးသည်။ Authorization ကိုမူ `headers` တွင် ဆက်လက် ပေးရသည်။
Header များနှင့် ထုတ်ပေးထားသော identity salt နှစ်မျိုးစလုံးသည် လက်ရှိ ကုဒ်ဝှက်ထားသော secret-field
ယန္တရားနှင့် API placeholder များကို သုံးသည်။ `STORAGE_ENCRYPTION_KEY` လိုအပ်သည်။

Mapping သည် generation အမျိုးအစား/မော်ဒယ်၊ JSON အသုံးပြုမှုအသေးစိတ်များ (အဝင်/အထွက်/စုစုပေါင်းနှင့် ရရှိနိုင်သော
cache key များ)၊ JSON အဝင်/အထွက် snapshot များ၊ ERROR/DEFAULT အဆင့်၊ မသင့်လျော်သောအချက်အလက်များ ဖယ်ရှားထားသည့် အခြေအနေစာသား၊
trace အမည်၊ session id၊ မဖြစ်မနေမဟုတ်သော environment နှင့် provider၊ တောင်းဆိုထားသော မော်ဒယ်၊ path၊ combo၊ cache
ရင်းမြစ်နှင့် အခြေအနေတို့အတွက် စစ်ထုတ်နိုင်သော
`langfuse.observation.metadata.<key>` တို့ကို ထည့်သွင်းပေးသည်။ TTFT ကို သိရှိပြီး ကြာချိန်အတွင်း ရှိနေမှသာ
`langfuse.observation.completion_start_time` သည် စတင်ချိန် + TTFT ကို ISO 8601 ပုံစံဖြင့် ဖော်ပြသည်။
ကုန်ကျစရိတ် attribute များကို မပို့ပါ။

Identity မုဒ်များသည် `langfuse.user.id` အပေါ် သက်ရောက်သည်-

- `pseudonymous` (မူလသတ်မှတ်ချက်)- destination တစ်ခုစီအတွက် ကျပန်း 32-byte salt ဖြင့် API key ၏ အတွင်းပိုင်း id ကို
  HMAC-SHA256 ပြုလုပ်ထားသော တန်ဖိုးဖြစ်သည်။ Salt မရှိပါက ဖန်တီးချိန်တွင် ထုတ်ပေးပြီး၊
  `identitySalt` အဖြစ် ကုဒ်ဝှက်သိမ်းဆည်းကာ မည်သည့်အခါမျှ ပြန်မပေးဘဲ ပြင်ဆင်မှုများအတွင်း ဆက်လက်ထိန်းသိမ်းထားသည်။ မူရင်း key id များကို
  span attribute များထဲသို့ မည်သည့်အခါမျှ မထည့်ပါ။ Destination တစ်ခု၏ salt ကို ပြန်ဖန်တီးခြင်း/အသစ်လဲခြင်းသည် identity များကို ပြောင်းလဲစေသည်။
- `keyName`: ပြင်ဆင်သတ်မှတ်ထားသော API key အမည်ဖြစ်ပြီး အော်ပရေတာ၏ ထိုအညွှန်းအမည်ကို ရည်ရွယ်ချက်ရှိရှိ ဖော်ပြပေးသည်။
- `none`: user id မပါဝင်ပါ။ Session tag များ ရှိနေပါက ဆက်လက် export လုပ်ပေးသည်။ ဤမုဒ်များသည်
  မည်သည့် prompt အကြောင်းအရာကိုမဆို သို့မဟုတ် အော်ပရေတာပေးထားသော session/correlation အညွှန်းများကို အမည်မဖော်နိုင်အောင် မပြုလုပ်ပေးပါ။

### ယခင်ဒေတာများ ပြန်ဖြည့်သွင်းခြင်းမပြုဘဲ စတင်ခြင်း

ဖန်တီးချိန်တွင်သာ **လက်ရှိနေရာမှ စတင်ရန် (ရှိပြီးသား log များကို ကျော်ရန်)** ကို ဖွင့်ပါ သို့မဟုတ်
create API payload ၏ ထိပ်ဆုံးအဆင့်တွင် `startFromCurrentPosition: true` ကို ပေးပို့ပါ။ ၎င်းသည် migration မလိုဘဲ
လက်ရှိ cursor helper များကို အသုံးပြု၍ `cursor_row_id` ကို လက်ရှိထိန်းသိမ်းထားသော call-log rowid များထဲမှ အမြင့်ဆုံးတန်ဖိုးဖြင့်
အစပြုသတ်မှတ်ပေးသည်။ မူလသတ်မှတ်ချက်မှာ false ဖြစ်သည် (cursor 0 နှင့် ထိန်းသိမ်းထားသော မှတ်တမ်းဟောင်းများကို ပြန်ဖြည့်သွင်းခြင်း)။
၎င်းသည် အပ်ဒိတ်လုပ်ချိန်တွင် cursor ကို ပြန်သတ်မှတ်ရန် ဆက်တင်မဟုတ်ပါ။

မျှဝေအသုံးပြုသော `ttftMs` ကို ထည့်သွင်းခြင်းသည် BigQuery mapper
နှင့် ဇယားအသစ် schema တွင် null ခွင့်ပြုသော `ttft_ms` ကော်လံကိုလည်း ထည့်ပေးသည်။ ၎င်း၏ schema စမ်းသပ်မှုက စံသတ်မှတ်ထားသော record field တိုင်းအတွက်
ကော်လံတစ်ခုစီ ရှိရန် လိုအပ်သည်။ ရှိပြီးသားဇယားများသည် မပြောင်းလဲဘဲ ဆက်လက် export လုပ်သည်။ `prepare()` သည် ဇယား schema ကို ဖတ်ပြီး
ထိုကော်လံ မရှိသည့်အခါ `ttft_ms` ကိုသာ ချန်လှပ်သည်။ နောက်တစ်ကြိမ် လုပ်ဆောင်ချိန်တွင် TTFT ရရှိရန်
null ခွင့်ပြုသော INT64 ကော်လံကို ထည့်ပါ သို့မဟုတ် ဇယားအသစ်ကို အသုံးပြုပါ။ PATCH၊ အလိုအလျောက် schema ပြောင်းလဲခြင်း သို့မဟုတ် ထပ်ဆောင်း
ခွင့်ပြုချက်များ မလိုအပ်ပါ။ အခြား row field အားလုံးအတွက် တင်းကျပ်သော schema စစ်ဆေးမှုကို ဆက်လက်ထိန်းသိမ်းထားသည်။

---

## 6. Destination တစ်ခု ထည့်သွင်းခြင်း

1. `LogExportDestinationType` ကို export လုပ်သည့် `src/lib/logExport/destinations/<name>.ts` ကို ဖန်တီးပါ။ ၎င်းတွင် Zod `configSchema`၊ UI အတွက် `fields` descriptor array၊ `secretFields` နှင့် `test()` / `prepare()` / `send(records)` တို့ကို ပြန်ပေးသည့် `createClient(config)` ပါဝင်ရမည်။
2. ၎င်းကို `src/lib/logExport/registry.ts` ရှိ `DESTINATIONS` array ထဲသို့ ထည့်ပါ။
3. `tests/unit/` အောက်တွင် စမ်းသပ်မှုများ ရေးပါ။

ပြောင်းလဲရန်မှာ ဤမျှသာ ဖြစ်သည်။ ဒေတာသိမ်းဆည်းမှု၊ cron job၊ REST layer၊ လျှို့ဝှက်ဒေတာ encryption နှင့် dashboard form တို့အားလုံးသည် registry ကို ဖတ်ရှုအသုံးပြုကြသည်။

Destination အသစ်တစ်ခုအတွက် စည်းမျဉ်းနှစ်ခုရှိသည်-

- တစ်စိတ်တစ်ပိုင်း မအောင်မြင်မှုဖြစ်ပါက `send()` သည် **မဖြစ်မနေ throw လုပ်ရမည်**။ Resolve ဖြစ်ခြင်းသည် "destination တွင် ဤ row များ ရှိနေပြီ" ဟု အဓိပ္ပာယ်ရပြီး cursor သည် ၎င်းတို့ကို အပြီးတိုင် ကျော်သွားမည်ဖြစ်သည်။
- အသုံးပြုသူပေးသည့် URL ကို လက်ခံသော destination သည် fetch မလုပ်မီ webhook များလုပ်ဆောင်သည့်နည်းအတိုင်း `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) မှတစ်ဆင့် ၎င်း URL ကို validate လုပ်ရမည်။ BigQuery ၏ host များသည် constants များဖြစ်သောကြောင့် ဤအဆင့် မလိုအပ်ပါ။

---

## 7. လည်ပတ်အသုံးပြုခြင်း

- **Dashboard**: Integrations → Log export သို့ သွားပါ။ Destination တစ်ခု ထည့်ပါ၊ row များ မရေးဘဲ credentials များကို စစ်ဆေးရန် **Test** ကို run လုပ်ပြီးနောက် ၎င်းကို enable လုပ်ပါ။
- **Backlog**: Destination card တစ်ခုစီတွင် pending ဖြစ်နေသော row များနှင့် cursor ကို ပြသသည်။ `GET
/api/log-export/status` သည် အလားတူ ကိန်းဂဏန်းများအပြင် နောက်ဆုံး job run ၂၀ ခုကိုပါ ပြန်ပေးသည်။
- **Destination တစ်ခု မအောင်မြင်ခြင်းကြောင့် အခြား destination များ မအောင်မြင်စေပါ** — run summary သည် destination တစ်ခုချင်းစီ၏ status ကို `last_status` / `last_error` တွင် မှတ်တမ်းတင်ပြီး job run history က စုစုပေါင်းရလဒ်ကို ထိန်းသိမ်းထားသည်။
- **Destination တစ်ခုကို ဖျက်ခြင်းသည် ၎င်း၏ cursor ကိုပါ ဖျက်သည်။** ၎င်းကို ပြန်လည်ထည့်သွင်းပါက ထိန်းသိမ်းထားသော call log များအနက် အဟောင်းဆုံးမှ စတင်မည်ဖြစ်ပြီး destination တွင် ရှိနှင့်ပြီးသား ဖြစ်နိုင်သည့် row များကို ပြန်လည်ပို့မည်။ BigQuery တွင် row တစ်ခုချင်းစီ၏ `insertId` သည် BigQuery ၏ ကိုယ်ပိုင် de-duplication window အတွင်း၌သာ ထိုထပ်ပို့မှုကို စုပ်ယူနိုင်သောကြောင့် destination ကို ဖျက်ခြင်းထက် disable လုပ်ခြင်းကို ဦးစားပေးပါ။
