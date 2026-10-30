# Supply-Chain Gates (Phase 8 · Block A) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute pubblica artefatti npm + Docker. Questi gate forniscono provenienza,
inventario (SBOM) e scansione CVE, tutto open source, integrati nei flussi di lavoro di rilascio.
**Approccio basato su avvisi** — segnalano subito, diventano bloccanti dopo la
prima release "verde".

| Gate                  | Tool                                           | Where                         | Blocca?                           | Output                                       |
| :-------------------- | :--------------------------------------------- | :---------------------------- | :-------------------------------- | :------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | solo se la pubblicazione fallisce | badge npmjs / `npm audit signatures`         |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | solo se la generazione fallisce   | Asset di rilascio + artefatto                |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | solo avviso                       | Artefatto CycloneDX                          |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | solo avviso                       | SARIF (HIGH+CRITICAL) → Scheda Sicurezza     |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **bloccante**                     | `exit-code: '1'` su CRITICAL risolvibile     |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **bloccante**                     | ratcheta `metrics.vulnCount` (direzione:giù) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | solo avviso                       | SARIF → Sicurezza + badge                    |

Il ratchet CVE dell'immagine utilizza **due passaggi** in `docker-publish.yml`: il passaggio SARIF
(`HIGH,CRITICAL`, `exit-code: 0`) mantiene HIGH+CRITICAL visibili nella scheda Sicurezza
senza bloccare; il passaggio del _CRITICAL gate_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) fa fallire il rilascio in caso di CVE CRITICAL **con una correzione disponibile**. `ignore-unfixed`
impedisce di bloccare il rilascio per una CVE dell'immagine di base senza una patch a monte.

## ⚠️ Variabilità delle CVE (gate osv/Trivy bloccanti)

osv e Trivy confrontano le dipendenze con database di CVE che **crescono continuamente**. Una PR
che **non modifica alcuna dipendenza** può improvvisamente diventare rossa perché una nuova CVE è stata
divulgata in una dipendenza esistente (osv: valore `vulnCount` misurato > baseline; Trivy: una nuova
vulnerabilità CRITICAL correggibile nell'immagine). **Questo è il comportamento operativo PREVISTO di un gate
CVE bloccante, non una regressione del prodotto.**

Quando osv o Trivy diventano rossi a causa di una CVE appena divulgata, la soluzione è:

1. **Aggiornare la dipendenza interessata** (opzione preferita) — eseguire l'upgrade alla versione corretta tramite
   `overrides` in `package.json` (dipendenze transitive) oppure ricostruire l'immagine su una base corretta.
2. **Se non è disponibile alcuna correzione upstream:**
   - **osv:** ridefinire la baseline di `metrics.vulnCount` in `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` non copre i gate dedicati — modificare il valore
     manualmente, `direction:down`) aggiungendo una nota giustificativa e un issue di tracciamento.
   - **Trivy:** aggiungere una voce in `.trivyignore` (un ID CVE per riga) con un commento
     giustificativo e un issue di tracciamento. `ignore-unfixed: true` gestisce già automaticamente le CVE
     prive di patch.

Le esecuzioni OSV obbligatorie (`check:vuln-ratchet -- --ratchet`) falliscono in modalità chiusa con
`INCOMPLETE` e codice di uscita 2 quando non è possibile convalidare lo scanner, il report o la baseline.
Una regressione misurata restituisce il codice di uscita 1. Un'esecuzione consultiva può comunque segnalare `SKIP` con
codice di uscita 0, il che non dimostra che le dipendenze abbiano superato la scansione. Anche il passaggio
Trivy bloccante richiede una misurazione riuscita: strumenti non disponibili, job non riusciti
e prove mancanti relative all'immagine non possono certificare un'immagine come pulita.

## Rischio relativo a dipendenze ritirate

Il lockfile radice non include più `extract-zip` né una dipendenza che conduce a esso dopo
l'aggiornamento dello strumento di sviluppo promptfoo alla versione fissata. Questo elimina la catena
`promptfoo` → `@openai/codex-security` → `extract-zip`, precedentemente accettata e tracciata nel ticket #14482.
I controlli di regressione in `tests/unit/extract-zip-14482-exposure.test.ts` ne impediscono
la reintroduzione e mantengono il divieto di importazione dal codice di produzione.

L'attuale correzione delle dipendenze limita inoltre gli override di compatibilità al client
MSAL di Azure Identity, al client FTP di get-uri e alla dipendenza Zod dell'SDK OpenCode v1. L'acquisizione
dei token di Azure e il recupero tramite FTP vengono testati con trasporti controllati; entrambi i pacchetti OpenCode
eseguono le proprie suite di build e test. I conteggi degli avvisi del registry sono misurazioni
riferite a un determinato momento e possono cambiare dopo il commit del lockfile.

## Backlog: Avviso Scorecard → bloccante

Dopo la prima release "verde" con il reporting di Scorecard:

- Scorecard: blocco del punteggio (congela il punteggio misurato; non può diminuire).

Integra i gate della Fase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
verifica i workflow stessi; Scorecard misura la postura del repository in aggregato.
