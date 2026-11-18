# Chaos Mode (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Modalità Chaos** (barra laterale) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sessione della dashboard) · `POST /api/skills/collect/chaos` (chiave API)  
> **Sorgente:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

La Modalità Chaos invia **un'attività contemporaneamente a diversi provider**: ogni provider partecipante
contribuisce con un'istanza di modello e tutte le risposte vengono presentate affiancate (o concatenate). È una
superficie di esecuzione multi-modello, non una strategia di instradamento: il normale traffico verso
`/v1/chat/completions` non ne viene mai influenzato.

**Disambiguazione: vengono distribuite tre funzionalità diverse che contengono "chaos" nel nome:**

| Elemento                         | Che cos'è                                                                                                                                                                                           | Dove è documentato                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Modalità Chaos**               | La pagina della dashboard e l'API descritte qui: distribuiscono un'attività a più provider (in parallelo o in modo collaborativo).                                                                  | Questa guida                                 |
| `auto/chaos`                     | ID modello Auto-Combo: distribuzione parallela, un modello per provider, una chiamata upstream ciascuno. Non è fault injection ([dettagli](#autochaos-parallel-fan-out)).                           | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configurazione della combo Chaos | Una combo persistente con `config.chaos.enabled` esegue la distribuzione allo stesso modo (solo tramite API); `judgeModel` seleziona soltanto la risposta finale, senza alcuna chiamata di sintesi. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: distribuzione parallela

`auto/chaos` **non** è un'opzione per il fault injection o il test della resilienza. La richiesta di
`model: "auto/chaos"` su `/v1/chat/completions`:

1. Crea un pannello con **un modello per provider**: il primo candidato di ogni
   provider connesso, nell'ordine del pool di candidati, fino a 5 membri
   (`OMNIROUTE_CHAOS_MAX_PANEL`, con un limite massimo di 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Il pacchetto di pesi `chaos-mode`
   imposta soltanto il `weight` di ciascun membro; la distribuzione non lo legge.
2. Invia la stessa richiesta a ogni membro del pannello **in parallelo**, quindi una richiesta
   comporta una chiamata upstream per ciascun membro del pannello
   (`open-sse/services/autoCombo/chaosEngine.ts`, inoltrata da
   `open-sse/services/combo.ts`).
3. Trasmette in streaming una riga di stato per ogni membro del pannello man mano che arriva: per impostazione
   predefinita, un commento SSE (`: chaos <index> ok|fail <model>`), più un evento
   `omni-chaos-part` (`model`, `index`, `ok`, `error`) quando la richiesta imposta
   `stream_options.include_chaos_parts: true`. Questi non contengono il testo della risposta.
4. Invia **una** risposta del pannello come chunk finale in stile OpenAI: quella del primo
   membro del pannello (`auto/chaos` lo imposta come `judgeModel`) se ha esito positivo, altrimenti
   quella dell'ultimo membro che ha avuto esito positivo. Le altre risposte del pannello non vengono restituite, quindi
   si pagano N chiamate e si riceve un solo completamento.

## Impostare

1. Aprire** Dashboard → Modalità caos** (`/dashboard/chaos`).
2. Giralo** SU** — Navi in modalità Caos** disabilitato per impostazione predefinita** (`enabled: false` in `src/lib/chaos/chaosConfig.ts`). Mentre è disabilitato, `POST /api/chaos/run` risponde `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Scegli i partecipanti e le impostazioni predefinite (persistenti per istanza tramite l'archivio delle impostazioni):

   | Campo               | Senso                                                                       | Predefiniti/limiti                    |
   | ------------------- | --------------------------------------------------------------------------- | ------------------------------------- |
   | `enabled`           | Interruttore principale                                                     | `false`                               |
   | `defaultMode`       | `parallel` o `collaborative` (vedi sotto)                                   | `parallel`                            |
   | `providerOverrides` | Partecipazione per fornitore (`providerId`, opzionale `modelId`, `enabled`) | = vuoti ogni provider attivo, max 200 |
   | `systemPrompt`      | Sostituisci il prompt del sistema Chaos integrato                           | opzionale, massimo 10 000 caratteri   |
   | `timeoutMs`         | Tempo massimo per chiamata del modello                                      | `120000` (5 000–600 000)              |
   | `maxTokens`         | `max_tokens` per chiamata modello                                           | `4096` (256–128 000)                  |

4. Dai a ogni fornitore partecipante un** modello** . Il modello di un provider è lo `modelId` del suo override abilitato nella pagina Modalità Caos (vince), altrimenti il** modello predefinito** della sua connessione. Un ID provider non viene mai utilizzato come nome del modello. Un fornitore senza nessuno dei due lo è** non chiamato** : viene visualizzato nei risultati come `status: "error"` con il messaggio _"Nessun modello impostato per questo provider. Imposta un modello nella pagina Modalità caos o un modello predefinito sulla connessione."_ e uno `modelId` vuoto, mentre gli altri provider funzionano normalmente. Se nessun provider selezionato dispone di un modello, l'esecuzione fallisce prima di qualsiasi richiesta upstream con _"Nessun provider ha un modello impostato. …"_ (HTTP 500 su entrambi gli endpoint).
5. Esegui un** prova dalla pagina stessa** — il pannello dei risultati mostra la risposta, lo stato e la durata di ciascun fornitore.

## Modalità di esecuzione

- **`parallel`** — ogni modello riceve contemporaneamente la stessa attività; tutte le risposte
  vengono restituite in modo indipendente.
- **`collaborative`** — i modelli vengono eseguiti **in sequenza**: ciascuno vede l'output del modello precedente e
  riceve la richiesta di perfezionarlo, ampliarlo, criticarlo o proporre un'alternativa. Il campo `summary`
  della risposta concatena gli output riusciti nell'ordine della sequenza (le esecuzioni parallele non hanno
  alcun campo `summary`).

## API

### sessione del dashboard `POST /api/chaos/run` —

Cookie autenticato (la sessione di gestione — vedi [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); utilizzato dalla pagina dashboard.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — API

Variante token al portatore per chiamanti esterni. La chiave deve portare il** Autorizzazione modalità caos** (`chaosModeEnabled`), che è** disattivato per impostazione predefinita** — abilitalo per chiave** Dashboard → API Manager → chiave di modifica → autorizzazioni → Modalità caos** . Stesso corpo di sopra.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Entrambi gli endpoint restituiscono la stessa forma:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## Risoluzione dei problemi

- **`400 Chaos Mode is not enabled`** — passaggio 2 sopra: l'interruttore globale è disattivato.
- **La chiave API viene rifiutata su `/api/skills/collect/chaos`** — la chiave non dispone dell'autorizzazione `chaosModeEnabled` per chiave (disattivata per impostazione predefinita; questa è un'impostazione, non un errore).
- **Un fornitore mostra `No model set for this provider`** — imposta il suo modello nella pagina Modalità Caos o un modello predefinito sulla sua connessione (vedi Configurazione, passaggio 4).
- **Nei risultati manca un fornitore previsto** — controlla `providerOverrides` nella pagina Modalità Caos (un override disabilitato lo esclude) e se la connessione al provider è attiva.
