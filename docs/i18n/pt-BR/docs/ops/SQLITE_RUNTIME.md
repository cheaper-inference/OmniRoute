# SQLite Runtime Resolution (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

O OmniRoute resolve seu driver SQLite na inicialização por meio de uma cadeia de fallback de 5 etapas:

1. **`better-sqlite3` incluído** (via `dependencies` no `package.json`)
   — mais rápido, binário nativo, instalado pelo `npm install` quando as ferramentas de compilação estão presentes.

2. **`better-sqlite3` instalado em tempo de execução** (em `~/.omniroute/runtime/`)
   — instalado sob demanda na primeira execução **OU** por `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Valida os magic bytes do arquivo `.node` nativo (ELF / Mach-O / PE) antes de carregá-lo
   para proteger contra binários corrompidos ou destinados à plataforma errada.

3. **`node:sqlite`** (biblioteca padrão do Node ≥22.5) — nenhuma compilação nativa necessária; usado quando
   ambos os caminhos do better-sqlite3 falham. Conjunto limitado de recursos.

4. **`sql.js`** (WASM) — fallback final. Funciona em qualquer ambiente, mas é mais lento
   e grava os dados em intervalos, em vez de fazê-lo de forma síncrona.

## Por que essa complexidade?

- **EBUSY no Windows**: `npm install -g omniroute@latest` pode falhar se o
  `better_sqlite3.node` da versão anterior estiver bloqueado por um processo em execução. A instalação
  em tempo de execução em `~/.omniroute/runtime/` contorna o cache global do npm.
- **Ausência de ferramentas de compilação**: alguns ambientes (Windows corporativo sem VS Build
  Tools, imagens Docker mínimas) não conseguem compilar o `better-sqlite3`. O instalador
  em tempo de execução obtém um binário pré-compilado do registro do npm; os drivers de fallback
  garantem que o OmniRoute ainda seja inicializado mesmo se isso falhar.
- **Sistemas isolados da rede**: se o registro do npm estiver inacessível, `node:sqlite`
  ou `sql.js` garantem a funcionalidade básica.

## Validação de magic bytes

Antes de carregar um arquivo `.node` instalado em tempo de execução, o OmniRoute lê os primeiros 8
bytes e os compara com as assinaturas conhecidas das plataformas:

| Plataforma            | Bytes (hex)   | Rótulo      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64 bits BE      | `FE ED FA CF` | `macho`     |
| macOS 64 bits LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Uma assinatura incompatível → o arquivo é ignorado e o fallback continua para a próxima etapa.

## Verificando o driver ativo

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Controle manual

```bash
# Ignorar o aquecimento pós-instalação (para instalações rápidas em CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forçar a reinstalação do better-sqlite3 em tempo de execução
rm -rf ~/.omniroute/runtime
omniroute  # será reinstalado na próxima inicialização

# Verificar qual driver está ativo
omniroute config db-info  # (se o comando da CLI existir)
```

## Diagnosticando bloqueios síncronos

Com o `better-sqlite3`, defina `OMNIROUTE_SQLITE_SLOW_MS=200` antes da inicialização para habilitar
a medição de tempo do adaptador síncrono. Por padrão, ela fica desabilitada. Uma operação concluída que leve
pelo menos essa quantidade de milissegundos emite um aviso `[SQLITE-SLOW]`, no máximo uma vez a cada
dez segundos por adaptador. O aviso contém somente o driver, a classe da operação
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transação ou manutenção) e os
milissegundos decorridos: nenhum SQL, parâmetro, linha, caminho ou texto de exceção.

Esse é um auxílio de diagnóstico, não um timeout nem uma otimização de consulta. Ele não consegue relatar
uma operação que nunca retorna, distinguir o trabalho de CPU das esperas de disco, identificar
o SQL exato nem observar operações realizadas por meio do identificador bruto do driver.
A duração do backup assíncrono é deliberadamente excluída; outros drivers SQLite não são
instrumentados por essa opção. Desabilitar a variável restaura o adaptador original
sem wrappers de medição de tempo. Nenhum esquema de banco de dados ou configuração armazenada é alterado.

O aviso de atraso do `/healthz` relata o pico do loop de eventos desde a amostra anterior,
não a média de toda a execução. Correlacione seus timestamps com os avisos de operações lentas
e as métricas do host/armazenamento antes de atribuir um bloqueio ao SQLite ou a uma falha de disco.

## Referência

Implementação:

- `bin/cli/runtime/magicBytes.mjs` — auxiliares para validação de magic bytes de binários
- `bin/cli/runtime/sqliteRuntime.mjs` — resolvedor em tempo de execução de 5 etapas + instalador sob demanda
- `bin/cli/runtime/index.mjs` — orquestrador de inicialização (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook de pós-instalação do npm (aquecimento não fatal)
- `src/lib/db/core.ts` — exportações de `ensureDbInitialized()` / `getDriverInfo()`

## Topologia de gravador único (HA não suportada)

A cadeia de fallback de drivers acima ainda é executada em **um processo**. Por padrão, o SQLite
do OmniRoute usa **um único gravador**:

- Não conecte duas réplicas do OmniRoute ao mesmo arquivo `storage.sqlite`.
- Uma reinicialização de contêiner, implantação Recreate, encerramento por OOM ou reinicialização por HEALTHCHECK interrompe
  todas as sessões SSE em andamento. Não há drenagem de sessões no fluxo padrão.
- Uma verificação de atividade do orquestrador que trate um `/healthz` lento como inativo encerrará a única
  réplica. Prefira verificação de atividade via TCP + verificação de prontidão via HTTP `/healthz`. Consulte o
  [Guia do Docker — disponibilidade](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  e as [recomendações de probes do Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
