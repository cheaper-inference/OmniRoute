# Quota Sharing Engine (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referencia del documento**: `docs/routing/QUOTA_SHARE.md`
> Parte del Grupo B (planes 16 + 22).

---

## Descripción general

El motor de reparto de cuotas distribuye equitativamente la cuota temporal de un proveedor (p. ej., la ventana de 5 horas de Codex, 1500 solicitudes/h de Kimi) entre varias claves de API que comparten la misma conexión.

**Problema que resuelve:** OmniRoute canaliza muchas claves de API a través de la misma cuenta del proveedor ascendente. Sin una lógica de reparto, una ráfaga de la clave A puede agotar la cuota del proveedor para esa hora, dejando bloqueadas las claves B y C hasta que se reinicie la ventana. El motor lo evita mediante:

1. El seguimiento del consumo acumulado de cada clave por dimensión (%, solicitudes, tokens, $).
2. La aplicación de un algoritmo equitativo con conservación del trabajo: una clave puede tomar prestadas las cuotas inactivas mientras el conjunto global no esté saturado.
3. La aplicación del resultado en la ruta crítica (`chatCore.ts`) antes de que la solicitud llegue al ejecutor ascendente.

---

## Algoritmo: conservación del trabajo de reparto justo

Implementado en `src/lib/quota/fairShare.ts`.

### Modos

| Condición                                  | Modo         | Comportamiento                                                           |
| ------------------------------------------ | ------------ | ------------------------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **Generoso** | Key puede pedir prestado hasta el límite global menos el total consumido |
| `globalUsedPercent >= saturationThreshold` | **Estricto** | Hacer cumplir estrictamente la participación justa individual            |

`saturationThreshold = 0.5` predeterminado (env `QUOTA_SATURATION_THRESHOLD`).

Estos dos modos describen un grupo en el modo de préstamo predeterminado, `saturation`. Un pool en modo `consent` siempre aplica reglas estrictas, sea cual sea la saturación. Consulte [Préstamos consentidos (opción por grupo)](#consented-lending-per-pool-opt-in).

### Decisión por dimensión

Para cada dimensión activa en el grupo, el motor calcula:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Para las dimensiones `percent`, `consumed` proviene del libro de atribuciones (consulte [Dimensiones porcentuales: atribución por clave](#percent-dimensions-per-key-attribution) ).

Entonces:

- **`policy = hard`** : si `consumed > fairShareAllowed` y el modo es → estricto** bloquear** .
- **`policy = soft`** : si `consumed > fairShareAllowed` y el modo es → estricto** penalizar** (despriorizar en combo; nunca bloquear).
- **`policy = burst`** : permitir mientras exista margen global independientemente de la participación justa.

### gorra absoluta

`capValue` + `capUnit` en una asignación es un techo rígido independiente del modo o la política. Cualquier dimensión donde siempre `consumed >= capValue`** bloques** la solicitud. Para un `percent` cap, `consumed` es solo la parte atribuida a la clave.

### Verificación multidimensional

Una solicitud se bloquea si** cualquier** dimensión en la piscina la bloquearía. Las dimensiones son independientes — un agotamiento del 5h% no afecta la dimensión del% semanal.

### Préstamo

En modo generoso, una clave cuya asignación está subconsumida puede utilizar el excedente de las acciones no asignadas de otras claves. La fórmula es:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

donde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. El teto global (pool `limit` para esa dimensión) es siempre el techo duro.

### Préstamo consentido (opción por grupo)

Cada grupo tiene un modo de préstamo. `saturation` es el valor predeterminado y mantiene las reglas anteriores. En el modo `consent` una clave `hard` pasa su parte solo dentro de la capacidad que otras claves acordaron prestar. El administrador establece el modo de cada grupo. Cada poseedor de claves establece su propio consentimiento a través [del consentimiento de préstamo](#lending-consent).

Un consentimiento es un porcentaje de 0 a 100 y una fecha límite opcional en milisegundos de época. La clave presta ese porcentaje de su acción ociosa mientras el plazo sea en el futuro.

Para una dimensión, `L` es el límite efectivo: el límite del plan multiplicado por las cuentas del grupo. La puerta calcula, para la clave solicitante:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` es el peso de la clave, o `100 / n` para cada clave cuando ningún peso supera 0. `lend_k` es el porcentaje activo de la clave y 0 una vez pasada la fecha límite. El propio consentimiento del solicitante de la clave nunca cuenta. Una clave `hard` se rechaza una vez que su consumo alcanza su parte más `borrowAvailable`.

La capacidad que ninguna asignación reclama (100 menos la suma de las ponderaciones) no es prestable. Ninguna llave aceptó prestarla.

**Ejemplo.** `L` es 1000.

| Llave | Peso | Compartir | Consumado | presta |
| ----- | ---- | --------- | --------- | ------ |
| A     | 50   | 500       | 530       | 0%     |
| B     | 30   | 300       | 100       | 50%    |
| do    | 0    | 0         | 60        | 0%     |

- B presta el 50% de sus 200 inactivos, que son 100. C ya tomó 60 por encima de su parte. A puede pedir prestado 40.
- A se sirve a 530 y se rechaza una vez que su consumo llega a 540.
- Antes de que C usara algo, con A igual o inferior a su parte, C podía pedir prestado 100.
- Antes de que C usara algo, con A en 530, C podía pedir prestado 70.

**Peso cero.** Una clave con peso 0 tiene una cuota de 0. Se sirve sólo mientras su consumo esté por debajo de lo que otras prestan. Cuando nadie presta, se rechaza desde su primera petición.

**Plazos.** Ninguna tarea en segundo plano expira un consentimiento. Cada solicitud compara el plazo con su propio tiempo y ha pasado un plazo igual a ese tiempo. Una fecha límite almacenada que no sea un número finito, o que haya pasado la fecha más grande que un `Date` puede contener, cuenta como vencida.

**`soft` y `burst`.** Los préstamos no los limitan. Una clave `soft` pierde su prioridad una vez que supera su participación. Una llave `burst` pasa mientras la piscina tiene espacio. El techo de la piscina todavía rechaza todas las llaves una vez que el total de la piscina alcanza su límite.

**Costo en la ruta de solicitud.** Un grupo `saturation` no lee nada más que antes. En un grupo `consent`, una dimensión contable lee las otras claves solo para una clave `hard` igual o superior a su participación mientras otra clave se presta. Luego realiza una lectura por otra clave, en paralelo. Una lectura fallida cuenta como un consumo de 0 para esa clave. Una dimensión `percent` no agrega lectura, porque el libro de atribuciones contiene todas las claves.

**Editar un grupo.** Una edición mantiene el consentimiento de las claves que permanecen. Esto es válido para ediciones de asignaciones, reemplazos de todo el grupo y llamadas `ensure`. Una clave eliminada pierde su consentimiento y una clave agregada nuevamente comienza en 0. Las rutas de administrador devuelven el consentimiento de cada clave y nunca lo escriben. Al volver a cambiar un grupo a `saturation` se mantienen todos los consentimientos almacenados, lo que no tiene ningún efecto en ese modo. Al cambiar el grupo a `consent` nuevamente se reactivan los consentimientos almacenados cuya fecha límite no ha pasado. Un titular de clave puede borrar un consentimiento almacenado en cualquier modo.

**Actualización.** Si las columnas `lending_percent` y `lending_until` ya existen, la migración agrega solo `borrow_mode` y los porcentajes almacenados permanecen como están. Cada grupo comienza en modo `saturation`. Active `consent` por grupo en el asistente de grupos. No se deduce nada de los valores almacenados.

**Limitaciones.**

- Un prestamista puede encontrar el fondo común en su límite máximo antes de utilizar su propia parte. La capacidad que otros tomaron prestada cuenta para el total del grupo.
- El cheque se ejecuta antes de la solicitud y no reserva nada. Las solicitudes simultáneas leen el consumo antes de que se registre, por lo que la capacidad prestada se puede gastar más de una vez, limitada por las solicitudes en curso. La verificación compartida del modo `saturation` tiene la misma propiedad.

---

## Contador de ventana deslizante

Implementado en `src/lib/quota/sqliteQuotaStore.ts` y `redisQuotaStore.ts`.

Dos bloques por `(apiKeyId, dimensionKey)`:

- `curr`: bloque actual (`floor(nowMs / windowMs)`)
- `prev`: bloque anterior (`curr - 1`)

Valor acumulado efectivo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precisión**: ~99 %. El error es, como máximo, del 1 % del tamaño de la ventana en el límite entre bloques (inherente a la aproximación de 2 bloques).

### Concurrencia

Controlador de SQLite: un mutex en memoria por clave `(apiKeyId | dimensionKey)` evita la condición de carrera de lectura-modificación-escritura. El patrón replica el mecanismo contra avalanchas de solicitudes de `src/sse/services/auth.ts`.

Controlador de Redis: script Lua EVAL para realizar incrementos atómicos; se ejecuta como un único comando de Redis.

---

## Controladores

### SQLite (predeterminado, sin instalación)

- Tabla: `quota_consumption` (consulte la migración `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Ideal para despliegues de una sola instancia.
- Toda la persistencia se encuentra en la base de datos SQLite existente de OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opcional, múltiples instancias)

- Requiere el paquete npm `ioredis`.
- Los contadores se almacenan en Redis; los metadatos (grupos/asignaciones) permanecen en SQLite.
- Ideal para despliegues con múltiples réplicas donde los contadores deben compartirse.

### Cambio de controlador

Mediante la interfaz de configuración (`/dashboard/settings` → Almacén de cuotas), o mediante variables de entorno:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

La configuración de la base de datos tiene prioridad sobre las variables de entorno. Si `driver=redis`, pero falta la URL o
`ioredis` no está instalado, la factoría recurre a SQLite y registra una advertencia.

Orden de selección del controlador:

1. Configuración de la base de datos `quotaStore.driver`
2. Variable de entorno `QUOTA_STORE_DRIVER`
3. Predeterminado: `sqlite`

---

## Multidimensional

Una piscina puede tener múltiples dimensiones. Cada dimensión es independiente:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Ejemplo: plan Codex** (5h% + semanal%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Una solicitud debe satisfacer todas las dimensiones para ser permitida.

### Dimensiones porcentuales: atribución por clave

Un plan de porcentaje informa una cifra de uso por cuenta y ventana de plan. El proveedor no proporciona ningún contador por clave API.

Para dividir esa cifra entre claves, cada grupo mantiene un libro de atribuciones por cuenta y ventana de plan. `src/lib/quota/percentLedger.ts` tiene las reglas del libro. `src/lib/quota/percentAttribution.ts` convierte el libro en los números que utiliza la aplicación de la ley. El resultado es una estimación construida a partir de los tokens de cada ruta clave.

#### Lecturas que mueven el libro

El libro se mueve únicamente según la cifra del propio proveedor para la ventana del plan solicitado. Estas conexiones informan uno:

| Proveedor                              | Planificar ventanas |
| -------------------------------------- | ------------------- |
| Claude, a través de una conexión OAuth | `5h`, `weekly`      |
| Codex                                  | `5h`, `weekly`      |

Estos no cuentan como lectura:

- una respuesta que el cliente proveedor marca como obsoleta
- una ventana Claude cuyo porcentaje el proveedor no informó
- la figura de otra ventana, o el peor de los casos entre ventanas
- el respaldo del encabezado de límite de tasa
- una lectura fallida

Otros proveedores, incluido Claude con clave API, no tienen libro. Cada clave tiene un cargo de 0 en sus dimensiones porcentuales, como antes de este cambio.

Una lectura comparte el caché de 30 segundos de la señal de saturación. Una lectura Claude está fechada en el momento en que se observó la cifra en los encabezados de respuesta o se leyó desde el punto final de uso, cuando se conoce ese momento. Otras lecturas están fechadas cuando se creó esa entrada de caché.

#### lo que guarda el libro

Cada solicitud registrada agrega sus tokens, una vez, a un contador por grupo, cuenta y clave. Un contador sólo crece. El libro guarda tres cosas:

- la línea de base: la figura cuando se abrió el libro o se abrió la ventana por última vez
- la última cifra aplicada
- por clave, su contador de fichas en ese mismo momento, llamado su marca

El libro se actualiza cuando la ejecución o la ruta de uso calcula la atribución. Las escrituras se comparan y configuran en un número de revisión. Un escritor que pierde vuelve a intentar una vez una nueva lectura.

#### Cómo se calcula la parte de una clave

La parte de cada clave se calcula cuando se lee el libro. El crecimiento de la cifra desde la línea base se divide entre las claves en proporción a los tokens enrutados cada uno desde su marca.

Together, esos tokens explican como máximo un punto de la cifra por tokens `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (por defecto 1000). El crecimiento que no explican es externo. La línea de base también es externa.

Por ejemplo, un libro se abre en 0. La clave A luego enruta 900 000 tokens y la clave B enruta 100 000. En una cifra de 60, la parte de A es 54 puntos y la parte de B es 6.

Un contador debajo de la marca de su clave se ha reiniciado y cuenta en su totalidad. Una clave sin marca, como una clave que se une al grupo en medio de una ventana, cuenta todos sus tokens. Una cifra que va por detrás de las fichas provoca un error que desaparece en la siguiente lectura. No se acumula.

Se lee `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` en cada atribución. Un valor que no es un número finito de al menos 1 vuelve a ser 1000.

#### Cómo una lectura cambia el libro

Se aplica la primera regla de coincidencia:

1. **Ningún libro todavía:** la lectura abre el libro. Su figura es la línea de base y cada ficha está marcada.
2. **Lectura anterior:** se ignora una lectura fechada antes de la última aplicada. También lo es una lectura cuyo tiempo de reinicio sea más de 30 minutos anterior al almacenado.
3. **Nueva ventana de proveedor:** un tiempo de reinicio superior a 30 minutos más tarde que el almacenado da vuelta el libro. La figura se convierte en la línea de base y cada ficha se marca nuevamente. Las llaves sin contador salen del libro.
4. **Ventana finalizada:** un tiempo de reinicio almacenado que no sea posterior al tiempo de datos de la lectura significa que esa ventana ha finalizado. La lectura da vuelta al libro, sea cual sea su figura.
5. **Cifra más alta:** sólo se mueve la última figura. La línea de base y las marcas quedan.
6. **Misma figura:** la figura, la línea de base y las marcas permanecen. Sólo se escribe un tiempo de reinicio que le falta al libro.
7. **Figura inferior:** nunca se aplica una cifra inferior como tal. Sólo se da vuelta al libro cuando se cumplen tres cosas. Es al menos dos minutos más reciente que la última lectura aplicada. Nada dice que la ventana sea la misma abierta. Está más de un punto por debajo.

La ventana cuenta como la misma abierta cuando se mantienen tres cosas. Se conocen ambos tiempos de reinicio. Están a 30 minutos de diferencia. El almacenado aún está por delante de la lectura. Una figura más baja dentro de esa ventana no cambia nada.

Un tiempo de reinicio se almacena sólo mientras se adelanta al tiempo de datos de la lectura que lo lleva. Una cifra más alta almacena el tiempo de reinicio de su lectura cuando esa es utilizable y mantiene la almacenada en caso contrario. Una cifra igual registra el tiempo de reinicio de su lectura sólo cuando el libro no tiene ninguno. No cambia nada más. Una cifra inferior que no gira el libro registra ningún tiempo de puesta a cero.

#### Cuando se usa el libro.

Después de una lectura, el libro se utiliza a menos que su hora de reinicio almacenada no sea posterior a la hora actual. Ese caso surge cuando una lectura tomada justo antes del reinicio, como una obtenida desde el caché, se observa justo después.

Sin una lectura utilizable, el libro almacenado se utiliza sólo mientras todavía puede ser el libro de la ventana actual. Esto se cumple en dos casos:

- su tiempo de reinicio es conocido y aún está por delante
- no tiene tiempo de reinicio y la última lectura que lo cambió tiene como máximo 15 minutos

De lo contrario no se atribuye nada, como cuando no hay libro. Un libro cuyo tiempo de reinicio almacenado haya pasado nunca se cargará.

#### Aplicación

El consumo de una clave en una dimensión porcentual es su parte atribuida más una parte de la parte externa. La parte externa primero utiliza la capacidad sin reclamaciones de asignación (100 menos la suma de los pesos). Sólo el exceso se reparte entre las llaves por peso.

Ese consumo se compara con la parte justa de la llave como para cualquier otra dimensión. El modo estricto aún comienza cuando la señal de saturación alcanza `QUOTA_SATURATION_THRESHOLD` (predeterminado 0,5). Cada número se escala según el límite efectivo: el límite por cuenta multiplicado por el número de cuentas en el grupo.

Un límite absoluto con `capUnit: "percent"` cuenta solo la parte atribuida a la clave, escalada de la misma manera. Tome un límite por cuenta de 100 y k cuentas. Luego se alcanza un límite de N cuando la parte de la clave de la cifra de la cuenta de servicio alcanza los puntos N/k. Cada cuenta se compara con su propio libro. Por ejemplo, con dos cuentas, se alcanza un límite de 10 en 5 puntos de la cifra de una cuenta.

Cuando no se puede leer la tienda, no se atribuye nada y cada clave se carga 0 en esa dimensión. Cuando falla la escritura de un libro, esa atribución utiliza el libro tal como fue leído. Una escritura de token fallida deja los tokens de esa solicitud fuera del libro. Ninguno de estos errores bloquea una solicitud.

En un grupo `consent`, la fórmula de préstamo utiliza el consumo de cada clave en la dimensión porcentual como se describe anteriormente. Cuando se presta otra clave, el libro se lee una vez y se atribuye a cada clave. Sin un libro utilizable, cada llave se carga 0. Entonces pasa una llave con un peso, y una llave con peso 0 pasa sólo cuando otra llave se presta.

#### Ruta de uso

`GET /api/quota/pools/{id}/usage` informa los mismos números a través de la misma función. Una dimensión porcentual tiene una entrada por conexión de grupo en `accounts`. Sus `consumedTotal` y `perKey` de nivel superior reflejan la primera entrada.

La ruta también aplica la lectura actual, por lo que puede avanzar el libro como lo hace una solicitud. `internal + external` puede diferir de `consumedTotal` cuando no hay lectura utilizable, o cuando no se aplica una cifra inferior.

#### Almacenamiento y retención

Ambas tiendas de cuotas llevan el libro. En SQLite, la limpieza automática de la base de datos, cuando está habilitada, elimina las filas que no se actualizan durante 60 días. En Redis, los libros y contadores de una conexión de grupo comparten una clave. Caduca 60 días después de la última escritura de token o cambio de libro. Un libro que no cambia no se reescribe, por lo que el límite se establece encima de la ventana del plan más larga. El restablecimiento manual del historial de uso también borra los libros de SQLite (consulte Limitaciones).

#### Limitaciones

- Todo el crecimiento de la cifra de la cuenta desde la línea de base se divide por los tokens que cada clave enruta desde entonces. No importa cuándo ocurrió ese crecimiento.
- Por lo tanto, el uso realizado fuera de OmniRoute se carga a las claves hasta lo que permiten sus tokens. Eso incluye el uso realizado antes de la primera solicitud de la ventana por parte de una clave, cuando el libro ya estaba abierto.
- Por ejemplo, el uso exterior aumenta la cuenta 60 puntos mientras no existan rutas clave. Luego, una clave enruta 30.000 tokens y la cifra llega a 60,6.
- Si el libro estaba abierto antes de ese uso, la parte de la llave es de 30 puntos. Lleva también 7,65 de uso externo, con cuatro teclas de peso 25.
- Si el libro se abrió después de ese uso, los 60 puntos son la base. La parte de la llave es de 0,6 puntos y lleva 15 de uso externo.
- Una solicitud o una visita a la ruta de uso abre el libro. Entonces, si dicho uso cuenta como punto de referencia depende de cuándo se abrió el libro.
- Con el piso predeterminado, una clave que enruta 60,000 tokens mientras se usa externamente aumenta la cuenta 60 puntos y obtiene los 60 como su propia parte.
- Con el suelo en 50.000, su propia parte es de 1,2 puntos. Los otros 58,8 son externos y se cargan por peso, como cualquier uso externo.
- Establezca `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` cerca de lo que cuesta un punto en su plan. El uso externo incluye el tráfico en la misma cuenta desde claves fuera del grupo.
- Se aplica un límite porcentual en todos los modos. Se puede rechazar una clave limitada mientras la cuenta esté muy por debajo del umbral de saturación.
- Tome un límite de 10 y 12 puntos de uso exterior antes en la ventana. Luego, una clave que enruta 20.000 tokens se rechaza con una cifra de cuenta del 12,4%.
- La división es una estimación por volumen de tokens. Una solicitud cuenta como sus tokens de aviso más sus tokens de finalización. Los descuentos de caché y los precios de los modelos no cambian ese recuento.
- Una solicitud que no termina con el estado 200 no registra tokens. Algunos ejemplos son una transmisión que el cliente desconecta y un error ascendente después de que se consumió el uso.
- El uso que provocó dicha solicitud se carga a las claves que registraron tokens, hasta lo que permitan sus tokens. El resto es externo. No retrocede. Una respuesta que informa que no hay uso de tokens tampoco registra tokens.
- El uso de una solicitud en curso puede aparecer en la parte de otra clave activa para toda la solicitud. Retrocede sólo cuando la solicitud finaliza con el estado 200.
- El uso que ya está en la cuenta cuando se abre un libro cuenta como externo. Esto cubre una actualización, un nuevo grupo y una nueva cuenta. El uso en una nueva ventana antes de su primera lectura también cuenta como externo.
- Cada clave comienza con su participación en el peso de ese uso, después de la capacidad sin reclamos de asignación. Con una cuenta al 85% y cinco claves de peso 20, cada una comienza con 17 de sus 20 utilizadas.
- En un grupo con varias cuentas, la cifra de la cuenta servidora se aplica al presupuesto sumado. Esto no cambia según el libro.
- No se aplica una cifra inferior dentro de una ventana que el proveedor informa como abierta. Un tiempo de reinicio que retrocede más de 30 minutos se trata como una lectura antigua.
- En ambos casos el libro mantiene su estado hasta que transcurra el tiempo de reseteo almacenado. Después de eso, el libro no se carga hasta que una lectura lo convierte.
- La solución es el restablecimiento manual del historial de uso (`POST /api/settings/purge-usage-history`). Borra los libros de atribución y sus contadores de tokens en la base de datos SQLite.
- El período `all` limpia todos los libros y contadores. Un período más corto primero borra los libros no escritos en él. Luego borra los contadores que no están escritos en él, pero solo para una conexión de grupo a la que no le queda ningún libro. Un libro guardado todavía marca cada llave contra su ficha.
- Un libro cuya figura no se ha movido no se reescribe, por lo que un período más corto también puede borrar el libro de la ventana actual. La siguiente lectura abre un libro nuevo con la cifra actual.
- El reinicio no toca una tienda de cuotas de Redis. Allí un libro termina con su ventana, o caduca a los 60 días de su última escritura.
- Cuando el proveedor no envía tiempo de reinicio, una ventana que se reinicia y se recarga por encima de la cifra anterior entre dos lecturas parece una cifra más alta. El libro mantiene la antigua línea de base y las marcas.
- Las lecturas están fechadas según el reloj local. Cuando se adelanta al del proveedor, o una fuente informa un tiempo de reinicio un poco antes, el libro puede detectar esa diferencia antes.
- El crecimiento en ese corto lapso se divide entre los tokens enrutados en él. La primera lectura de la siguiente ventana lo corrige. Cuando el libro volteado no tiene tiempo de reinicio, esa corrección necesita una cifra más baja al menos dos minutos más reciente que la última lectura aplicada.
- Las instancias que comparten lecturas de fecha de tienda Redis con sus propios relojes, así que mantenga esos relojes sincronizados. Las lecturas de una instancia cuyo reloj está atrasado parecen más antiguas y se ignoran.
- Cuando no llega ninguna lectura utilizable después del tiempo de reinicio almacenado, los porcentajes compartidos y los límites porcentuales por clave no se aplican hasta que se devuelve una lectura. Sin tiempo de reinicio, este comienza 15 minutos después de la última lectura que cambió el libro.
- En la tienda Redis, un libro inactivo durante 60 días puede caducar entre el cheque de emisión y su escritura. Luego se vuelve a crear en una revisión superior a 1, que es un estado válido.

---

## Solucionador de planes

Implementado en `src/lib/quota/planResolver.ts`.

Precedencia (de mayor a menor):

1. **Anulación manual en la base de datos** — tabla `provider_plans`, por `connectionId`.
2. **Catálogo conocido** — `src/lib/quota/planRegistry.ts` (solo datos).
3. **Plan vacío** — sin dimensiones; se requiere configuración manual.

### Catálogo conocido

| Proveedor             | Dimensiones                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, desconocido), `tokens/weekly`           |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Sin valor predeterminado — se requiere configuración manual   |

---

## Integración de tuberías

### gancho PRE (`open-sse/handlers/chatCore.ts`)

Se ejecuta antes del ejecutor ascendente, después de las comprobaciones de autenticación y políticas:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Apertura fallida** : si `enforceQuotaShare` arroja, se permite la solicitud con un registro `pino.warn`. Esto evita que un error del motor de cuotas bloquee todo el tráfico.

**Cuando vuelva la capacidad.** Un rechazo de la parte de la clave o del techo del pool finaliza con una de dos frases, en ambas modalidades de préstamo:

- Ventana `percent` : `. The <window> window resets at <time>.` La hora es el reinicio que informa el proveedor.
- Unidad contable: `. Enough <window> usage is expected to clear by <time>.` El tiempo es un límite superior de la ventana deslizante, si la clave no envía nada más.

`<time>` es un instante ISO 8601 en UTC. La negativa conlleva entonces `Retry-After`: los segundos completos hasta ese instante, más uno. Un cliente que espera tanto tiempo reintenta como máximo un segundo después del instante. Cuando se desconoce el instante, la negativa no lleva ni la sentencia ni el encabezado. Un rechazo absoluto del tope no conlleva ninguna de las dos cosas. El código público permanece `quota_share_blocked`.

Un rechazo de compartir no afecta la conexión compartida. No establece ningún tiempo de reutilización, ningún bloqueo de modelo ni falla del interruptor del proveedor, y las otras claves del grupo siguen siendo entregadas. Cuando cada objetivo de un combo rechaza la llave que le corresponde, el combo responde 429 sin esperar. Su respuesta lleva la pista como `Retry-After`. La ruta de incrustaciones finaliza su rechazo con la misma frase y no envía `Retry-After`.

### gancho POST (consumo récord)

Después de una respuesta exitosa:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**nota de deriva** : si `consume` falla después de la respuesta, el contador rodante cuenta menos. La señal de saturación del proveedor (por ejemplo, `anthropic-ratelimit-unified-5h-utilization`) corrige la estimación global en la siguiente solicitud.

### Penalización suave combinada (`open-sse/services/combo.ts`)

Cuando `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

La penalización se aplica después de todos los demás factores de puntuación. Reduce la probabilidad de combinación automática de seleccionar una clave saturada sin bloquearla.

---

## Tutorial UI

### `/dashboard/costs/quota-share` — Página principal de piscinas

Componentes (todos en `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componente             | Objetivo                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Tarjeta introductoria que explica el reparto de cuotas a los nuevos usuarios            |
| `CreatePoolModal`      | Crear un nuevo grupo de cuotas (conexión + nombre + asignaciones iniciales)             |
| `PoolCard`             | Resumen por grupo: nombre, conexión, recuento de asignaciones                           |
| `DimensionBar`         | Barra apilada por dimensión: cada clave comparte el uso global +                        |
| `AllocationTable`      | Tabla con bandera consumida, parte justa, deficit/surplus endeudamiento                 |
| `BurnRateChart`        | Gráfico de líneas de tasa de grabación EMA (Recharts diferidos a través de `dynamic()`) |
| `EditAllocationsModal` | Editar ponderaciones, límites y políticas de asignación para un grupo                   |
| `BorrowModeField`      | Selector de modo de préstamo (`saturation` o `consent`) en el asistente                 |
| `LendingBadge`         | Insignia de solo lectura en una clave que presta, solo en grupos `consent`              |

La insignia de préstamo muestra el porcentaje y, cuando se establece, la fecha límite en UTC con la zona nombrada. Juzga la fecha límite en el momento de la instantánea de uso. Una fecha límite vencida o ilegible se muestra como `lending expired`.

La página engancha:

- `usePools` — recupera `GET /api/quota/pools` cada 30 segundos.
- `usePoolUsage` — recupera `GET /api/quota/pools/[id]/usage` a pedido.
- `useLocalStoragePoolMigration` — se ejecuta una vez en el montaje para migrar datos LS heredados.

El paso de claves del asistente de piscina tiene un cuadro `Show usage by member to key holders`. Establece la opción `memberBreakdown` del grupo (consulte [Uso de miembros](#member-usage) ). Debajo, el asistente advierte que alguien que sepa qué clave se usó puede hacer coincidir una barra con esa clave. Con la casilla marcada, lo dice cuando el paso enumera menos de tres o más de 20 claves, ya que las barras permanecen ocultas. Cuenta las claves en el paso y no puede decir cuál de ellas puede realizar solicitudes.

### Configuración del plan del proveedor `/dashboard/costs/quota-share/plans` —

- `ProviderPlanConfigClient.tsx`: menú desplegable para seleccionar un proveedor, ver el plan resuelto (automático desde el catálogo o anulación manual) y editar dimensiones.
- Los cambios escriben en `PUT /api/quota/plans/[connectionId]`.
- La eliminación vuelve al catálogo o al plan vacío.

---

## Cuota de autoservicio API (optar por participar)

`GET /api/v1/me/quota/{provider}` (también disponible en `/v1/me/quota/{provider}`) permite al titular de una clave API leer, con su propia clave, qué parte de una suscripción compartida es suya y qué lo está bloqueando. La ruta es una delgada capa sobre `src/server/selfService/quotaHandler.ts`; la vista está construida por `src/lib/quota/selfView.ts` y su contrato de respuesta es `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` en `docs/openapi.yaml`).

### Habilitación y autenticación

- Marca de función `QUOTA_SELF_PANEL`, `false` predeterminado. Mientras está desactivado, una solicitud que llega a la ruta obtiene 404. Con `REQUIRE_API_KEY=true`, la política API del cliente rechaza una clave faltante o no válida con 401 antes de que se ejecute la ruta, cualquiera que sea la bandera. Una solicitud sin clave pero con una sesión iniciada en el panel pasa esa política y obtiene la propia respuesta de la ruta. El indicador se resuelve como cualquier otro indicador (anulación del panel o REST, luego la variable de entorno del mismo nombre); ver [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- El nombre para mostrar de cada grupo y la etiqueta de cada programación se devuelven a los poseedores de claves del grupo exactamente como los escribió el administrador. Antes de encender las banderas, compruebe que sean aptas para ser leídas por los titulares de las llaves.
- La clave se lee únicamente desde los encabezados: `Authorization: Bearer <key>` o `x-api-key: <key>`. Cuando se envían ambos se utiliza el primero que valida. Se ignora una clave en la cadena de consulta o una cookie. Se rechaza la clave de entorno del servidor (401).
- La clave necesita el alcance `self:usage` (403 sin él).
- El segmento de proveedor se recorta, se pone en minúsculas y se compara con `^[a-z0-9][a-z0-9._-]{0,63}$` (de lo contrario, 400), luego se resuelve a través del registro de proveedores, por lo que un alias como `cc` lee los grupos `claude`. `claude` y `anthropic` leen los mismos grupos.

### Lo que muestra cada visibilidad

| Visibilidad     | Requiere                                                                                    | Campos                                                                                                                                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| propia acción   | `self:usage`                                                                                | `pools[]` (ref, nombre, proveedor, política, peso, límite), `dimensions[].yourShare`, `accounts[]` con `yourShare` (en una ventana `percent` sin `attributed` y `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                    |
| Nivel de cuenta | `self:usage` + `self:account-quota` y el proveedor en el `sharedQuotaProviders` de la clave | agrega `dimensions[].total`, `accounts[].dimensions[].account` y `accounts[].modelWindows`, `attributed` y `external` en el `yourShare` de una ventana `percent` y `members` en un grupo con el uso de miembros activado (consulte [Uso de miembros](#member-usage) ). |

- `sharedQuotaProviders` es una configuración por clave (`PUT /api/keys/[id]/self-service`): `null`, el valor predeterminado, significa cada proveedor al que llega la clave; `[]` significa ninguno. `accountVisible` de cada grupo dice qué visibilidad se le aplicó.
- Las barras de cuentas y las ventanas de modelos se muestran solo para las cuentas cuya conexión puede utilizar la clave. Cuando la clave tiene una lista de conexiones permitidas, una cuenta externa mantiene su entrada `Account N` sin `account` o `modelWindows`. Una lista vacía significa que no hay restricciones, como ocurre con `/v1/me/status`. El total del grupo (`dimensions[].total`) no depende de esa lista.
- Dos figuras que se muestran solo con `self:usage` provienen del uso de otras claves. El `exhausted` de un presupuesto de cronograma refleja el consumo de cada clave bajo ese cronograma. En un grupo cuyos pesos son todos cero, el `weight` de la clave es `100 / number of members`. Ambos son los que se aplican a la clave.
- Un grupo se identifica únicamente por `ref`, un valor opaco vinculado a la clave de llamada. Su nombre para mostrar (`name`) se incluye tal como lo escribió el administrador. Un `ref` se deriva de la clave y el grupo con la clave secreta API del servidor (`API_KEY_SECRET`). Los clientes no deben conservarlo: cambia si se rota ese secreto.
- Las cuentas se enumeran como `Account 1`, `Account 2`,… en orden de grupo. No se devuelve ningún ID de grupo, ID de conexión, correo electrónico de cuenta o nombre de cuenta, y la respuesta pasa por el esquema del contrato, que elimina cualquier campo fuera de él.
- Las unidades contables (`requests`, `tokens`, `usd`) se informan como el depósito del grupo que la puerta de cuota aplica: `limit` = límite del plan cuentas × en el grupo, `fairShare` = peso / 100 × `limit` (división igual cuando cada peso es 0), `consumed` = el propio contador de la clave en el almacén de cuotas, `remaining` = `fairShare` − `consumed`, con piso en 0.
- `blocks.schedules` enumera las ventanas de programación de la clave (`open`/`closed`, `blackout` o `outside-window`, `retryAfterSeconds`, pisos de reserva y si se gasta el presupuesto de la ventana); `blocks.modelCaps` enumera sus límites horarios por modelo con consumo.
- Una clave fuera de cada grupo del proveedor obtiene 200 con `pools: []`; `availableModels` (los identificadores `qtSd/` que la clave ve en `/v1/models`), `expiresAt` y `apiBaseUrl` todavía están completos.
- `apiBaseUrl` es `OMNIROUTE_PUBLIC_API_BASE_URL`, luego `OMNIROUTE_PUBLIC_BASE_URL`, si no `null`. Nunca es el origen propio de la solicitud.

### `status` y `reason`

| `status`      | Significado                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Una lectura actual.                                                                                                                                                                                                                                                                                                                                                                                   |
| `stale`       | Una lectura de cuenta en caché marcada como obsoleta, o una cuyo tiempo de reinicio ha pasado desde que fue leída. Los números se mantienen. Una ventana de modelo cuyo tiempo de reinicio ha pasado marca todo el grupo `modelWindows` `stale`. Para la parte de la clave propia de una ventana `percent` : el libro se leyó sin que una cuenta lo leyera en el caché de la puerta para confirmarlo. |
| `unavailable` | Sin lectura; los números son `null`, nunca `0`. `reason` dice por qué.                                                                                                                                                                                                                                                                                                                                |

| `reason`                          | Cuando                                                                                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | No se pudo leer el almacén de cuotas o no se pueden leer los libros de atribución.                                                                         |
| `percent_attribution_unavailable` | La propia parte de la clave de una ventana `percent` : aún no existe ningún libro de atribución para esa cuenta y ventana, o el libro no incluye la clave. |
| `percent_window_ended`            | La propia parte de la clave de una ventana `percent` : el libro pertenece a una ventana del plan que ha finalizado.                                        |
| `account_not_used_by_key`         | La propia clave compartida de una ventana `percent` : la conexión de la cuenta está fuera de las conexiones permitidas de la clave. Su libro no se lee.    |
| `window_not_reported`             | La caché de límites del proveedor no tiene lecturas para esa ventana del plan.                                                                             |
| `connection_lookup_failed`        | No se pudo leer la conexión de la cuenta.                                                                                                                  |
| `not_supported`                   | OmniRoute no puede leer los límites de uso del proveedor de la cuenta.                                                                                     |
| `fetch_failed`                    | No se pudo utilizar ninguna lectura en caché y falló la actualización de los límites del proveedor.                                                        |
| `not_available`                   | La lectura no tiene ventanas de uso o la cuenta no tiene ninguna lectura.                                                                                  |

Cuando el almacén de cuotas no se puede leer, los campos respaldados por el almacén de `blocks` ( `exhausted` de un presupuesto programado, `consumed` y `reached` de un límite de modelo) también son `null`.

### Consentimiento de préstamo

`PATCH /api/v1/me/quota/{provider}` registra el consentimiento de la clave de llamada para un grupo. Utiliza la bandera, los encabezados y las reglas del proveedor de `GET`. El alcance `self:usage` autoriza esta escritura, aunque su nombre se lee como de solo lectura.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` es el `ref` que devuelve `GET` para ese grupo.
- `lendingPercent` es un número entero de 0 a 100. Un valor de 0 borra el consentimiento y su fecha límite. Se acepta un cuerpo con `lendingPercent` 0 en cualquier modo.
- `lendingUntil` es opcional: época de milisegundos o `null` sin fecha límite. Debe ser en el futuro y como máximo 8640000000000000. Un valor inferior a 100000000000 se lee como segundos y se rechaza.
- Cualquier otro campo se rechaza. Se rechaza un cuerpo de más de 4096 bytes. La lectura se detiene en ese tamaño, por lo que un cuerpo más largo nunca se mantiene completo.

Las comprobaciones se ejecutan en el orden de esta tabla. Cada rechazo utiliza el cuerpo de error estándar con un mensaje fijo. Un rechazo de uno de estos cheques no escribe nada.

| Estado | Mensaje                                                                                            | Cuando                                                                      |
| ------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 404    | `Not found`                                                                                        | La bandera `QUOTA_SELF_PANEL` está apagada.                                 |
| 401    | `Valid API key required`                                                                           | La clave falta o no es válida, o es la clave de entorno del servidor.       |
| 403    | `API key lacks the self:usage scope`                                                               | La clave carece `self:usage`.                                               |
| 400    | `Invalid provider`                                                                                 | El segmento de proveedor no es válido.                                      |
| 429    | `Too many lending changes. Retry later.`                                                           | La llave pasó su límite. La respuesta lleva `Retry-After`.                  |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | El cuerpo no es JSON, es demasiado largo o no coincide con el esquema.      |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | El plazo se lee en segundos.                                                |
| 400    | `lendingUntil must be in the future`                                                               | La fecha límite es en o antes del momento de la solicitud.                  |
| 404    | `Pool not found`                                                                                   | El `ref` no nombra ningún grupo de esta clave para este proveedor.          |
| 403    | `Lending is not enabled for this pool`                                                             | El grupo está en modo `saturation` y `lendingPercent` está por encima de 0. |
| 500    | `Failed to build quota view`                                                                       | Cualquier otro fallo. Su causa está registrada en el servidor.              |

El límite es 20 solicitudes cada 60 segundos para cada clave. Cada solicitud que pasa la verificación del proveedor cuenta, incluso una rechazada más tarde o una que no cambia nada. Dispone de su propio contador, además del límite de tasa de solicitud de claves.

Una solicitud que cambia el consentimiento almacenado escribe un registro de auditoría `quota.pool.lending.updated`. Nombra la clave con los valores antiguos y nuevos. El mismo organismo envía dos veces, escribe una vez y audita una vez. La respuesta es 200 con la vista `GET` completa, creada después de la escritura.

La vista `GET` informa los préstamos de la siguiente manera:

- Cada grupo lleva `borrowMode` (`saturation` o `consent`) y los propios `lendingPercent` y `lendingUntil` de la clave.
- `lendingActive` es `true` solo en un grupo `consent`, con un porcentaje superior a 0 y una fecha límite no alcanzada.
- En un grupo `consent`, cada `dimensions[].yourShare` contable lleva `borrowAvailable`. Es lo que la clave puede usar ahora por encima de su parte, prestada por las otras claves.
- `borrowAvailable` usa la fórmula de la puerta. Lee cada dos claves, también mientras la clave está bajo su parte. Para una clave `hard`, es una lectura adicional por otra clave y dimensión contable, en paralelo.
- `borrowAvailable` es `null` para una clave `soft` o `burst`, y `null` cuando falla una lectura.
- `borrowAvailable` es una cifra para todas las demás claves juntas. En un conjunto de dos llaves es la propia figura de la otra llave.
- `borrowAvailable` aún no se informa para `percent` windows ni en `accounts[]`.
- En un grupo `saturation` la vista informa el consentimiento almacenado con `lendingActive: false` y sin `borrowAvailable`.

### Errores

Cada respuesta de esta ruta, éxito o error, lleva `Cache-Control: no-store`. Un rechazo que ocurre antes de que se ejecute la ruta no lo lleva, por ejemplo, el 401 de la política API del cliente o el 403 del filtro IP Los errores de la ruta utilizan el cuerpo de error estándar con un mensaje fijo: 400 (proveedor no válido), 401 (clave faltante o no válida), 403 ( `self:usage` faltante), 404 (marca desactivada) y 500 (`Failed to build quota view`). El 500 cubre cualquier fallo una vez que la solicitud llega a la ruta, incluida la propia búsqueda de claves; su causa se registra en el servidor y nunca se devuelve. Los errores del `PATCH` se enumeran en [Préstamo de consentimiento](#lending-consent).

### Limitaciones

- `remaining` es la parte de la parte justa de la clave que no ha utilizado. No es una garantía. Aún se puede entregar una llave más allá mientras la piscina tenga espacio. Una vez que el total del grupo alcanza `limit`, se rechazan todas las claves del grupo, cualquiera que sea su propio `remaining`, y una clave sin `self:account-quota` no puede ver ese total.
- `remaining` no tiene en cuenta el `cap` absoluto de la asignación. La aplicación de la ley rechaza la clave una vez que su propio consumo en una ventana de la unidad del límite alcanza el valor del límite.
- La barra a nivel de cuenta proviene de la caché de límites del proveedor y puede retrasar la decisión de aplicación unos minutos. Una lectura cuyo tiempo de reinicio ha pasado se informa como `stale`.
- Las ventanas por modelo (`modelWindows`) se informan solo para los proveedores que tienen una asignación de ventana de plan: Claude y Codex hoy. Para otros proveedores, `modelWindows` todavía está presente cuando se muestran los datos de la cuenta, con una lista `windows` vacía.
- La proporción de la clave propia de una ventana `percent` es una estimación. Proviene del libro de atribución y tiene todas las limitaciones enumeradas en "Dimensiones porcentuales: atribución por clave" más arriba.
- `consumed` es el número de cumplimiento que se compara con la parte justa. Es `attributed` más `external`, exactamente. `attributed` es la parte en la que el libro proporciona la clave para los tokens que enruta. `external` es la parte de la clave del uso de la cuenta que las claves del grupo no tienen en cuenta.
- Ambas partes se envían solo cuando el `accountVisible` del grupo es verdadero: la clave tiene `self:account-quota` y el proveedor está en su `sharedQuotaProviders`. Una clave sin ella obtiene `consumed` sola, con los mismos `status` y `reason`.
- Con ambas piezas y su propio peso, un soporte puede calcular el uso que se hace fuera de la piscina que se carga a las llaves de la piscina. Un titular con el alcance de la cuenta ya ve el total de la cuenta.
- Una clave que no enruta nada en la ventana aún puede leer su carga externa desde `consumed`, porque su parte atribuida es entonces 0.
- Por ejemplo, un libro se abre en 0, con las teclas A y B con un peso de 50 cada una. La clave A enruta 900.000 tokens y la clave B 100.000. Luego, la cuenta alcanza el 60% de un límite de 100. Entonces `attributed` es 54 para la clave A y 6 para la clave B, y `external` es 0 para ambas.
- La vista lee el libro y nunca escribe su estado. No abre un libro y nunca solicita una lectura al proveedor. Con la tienda Redis, una lectura elimina los campos de revisión reemplazados en segundo plano, como lo hacen las lecturas de la puerta.
- La participación es `ok` solo mientras el caché de la puerta contiene una lectura de la cuenta. Sin uno, es `stale`, por lo que en un grupo sin una solicitud reciente se muestra como posiblemente desactualizado.
- Hasta que una solicitud pase por el grupo, el recurso compartido no estará disponible. Esa solicitud abre el libro, y la cifra de la cuenta en ese momento cuenta como uso realizado fuera del pool.
- En un grupo con varias cuentas, cada entrada de cuenta utiliza el libro propio de esa cuenta y el límite de una cuenta. La aplicación de la ley escala a ambos lados según el número de cuentas, por lo que la proporción es la misma.
- Las ventanas por modelo no tienen participación en la clave. El libro no guarda datos por modelo.
- La vista no evalúa los pisos de reserva de un cronograma: un cronograma puede mostrarse como `open` mientras que una solicitud se rechaza con el motivo `schedule-reserve`.
- Cuando dos grupos de la misma clave comparten una conexión, la aplicación aplica uno de ellos y la vista enumera ambos.
- No hay límite por dirección para intentos fallidos de clave: detrás de un proxy inverso, las personas que llaman pueden compartir una dirección (depende de si las direcciones de clientes reenviadas son confiables), por lo que un bloqueo podría negar la ruta a todos los poseedores de claves. Con `REQUIRE_API_KEY=true`, la política API del cliente rechaza una clave no válida antes de que se ejecute la ruta, con el cuerpo 401 de esa política en lugar del de esta ruta.

### Uso de miembros

Un administrador puede permitir que los poseedores de claves vean cómo se divide el uso de una ventana entre los miembros del grupo. La opción es `memberBreakdown` del grupo, desactivada de forma predeterminada. Se configura en el asistente del grupo o con `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` y `GET /api/quota/pools/{id}` lo reportan.

Una dimensión de la vista conlleva `members` sólo cuando se cumplen todas estas condiciones:

- La opción del grupo está activada.
- el grupo tiene como máximo 20 claves asignadas, y al menos tres de ellas pueden realizar solicitudes: activas, no revocadas, no prohibidas y no vencidas.
- el `accountVisible` del pool es verdadero: la clave tiene `self:account-quota` y el proveedor está en su `sharedQuotaProviders`
- en una ventana `percent`, la conexión de la cuenta es una que la clave puede usar
- Se leyó la parte de la clave de esa ventana: su `status` no es `unavailable`

De lo contrario, `members` está ausente. Nunca es una lista vacía.

- Cada rebanada es `{ slot, consumed, isYou }`. El esquema de respuesta rechaza cualquier otra propiedad en un segmento y una lista de más de 20 segmentos. Las porciones se enumeran en orden de ranura.
- Hay un segmento por clave asignada, incluida una clave que ya no puede realizar solicitudes. Un miembro sin uso muestra un cero real.
- La ranura 1 es siempre la clave que pregunta, siendo `isYou` verdadero. Los otros números de ranura son rangos de un hash con clave. Está codificado con `API_KEY_SECRET` y cubre el grupo, la clave que solicita y el miembro.
- Por lo tanto, los números no coinciden entre los titulares. Para un titular, permanecen iguales entre visitas. Pueden cambiar cuando una clave se une o abandona el grupo, o cuando se rota ese secreto.
- En una ventana contable, un segmento es el contador del miembro en el almacén de cuotas, el mismo contador que su propio `consumed`.
- En una ventana `percent` una porción es la parte `attributed` del miembro, del mismo libro leída como la parte propia de la clave. El uso realizado fuera de la piscina nunca se divide en porciones. Esa carga se divide por peso, por lo que las rebanadas que la llevaban mostrarían los pesos.
- Cada vista lee un valor por otro miembro y ventana contable, en paralelo. En una ventana `percent` las porciones no cuestan lectura más allá de la lectura del propio libro compartido. Cuando no se puede leer un valor, esa ventana no tiene `members` y el recurso compartido de la clave permanece.
- La opción y la cantidad de claves utilizables se leen una vez por grupo y solo para una clave que puede ver los datos de la cuenta. Una lectura fallida de la opción o del recuento de claves utilizables desactiva las barras para ese grupo. El servidor registra una advertencia y se crea el resto de la vista.

Las barras no llevan nombres ni identificaciones. Todavía le cuentan al poseedor de llaves cosas sobre los otros miembros:

- Los titulares aún pueden hacer coincidir las porciones según sus valores.
- Una numeración estable permite que un titular siga a un miembro a lo largo del tiempo.
- El número de sectores muestra cuántas claves se asignan en el grupo.
- En un grupo de tres claves, alguien que sabe cuál fue la clave utilizada puede saber cuál fue la última clave utilizada.
- Cuando un grupo cae por debajo de tres claves utilizables, las barras desaparecen. Las vistas tomadas anteriormente aún muestran lo que usó cada miembro.
- En una ventana contable, el total del grupo menos los sectores puede mostrar el uso de claves que ya no están asignadas.
- Un miembro que muestra cero en una cuenta y lo usa en otra puede mostrar qué miembro usa qué cuenta.
- En un grupo contable con la política `hard`, una porción que deja de crecer en la proporción justa de un miembro indica el peso de ese miembro.

### Serie de uso (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (también servido en `/v1/me/usage`) devuelve el uso y el costo de las solicitudes propias de la clave de llamada: totales, una entrada por día UTC, por día y modelo, por modelo y por proveedor. Comparte la bandera, las reglas de autenticación, el alcance `self:usage`, `Cache-Control: no-store` y el comportamiento de error de la ruta de cuota anterior. La clave se verifica antes de `range`. Los errores son 400 (`Invalid range`), 401, 403, 404 y 500 (`Failed to build usage`).

- `range` es uno de `1d`, `7d`, `30d` (el valor predeterminado) o `90d`. Cualquier otro valor, un valor vacío o un parámetro repetido es 400. El conjunto se detiene en `90d` para limitar el costo de una llamada. La vista lee únicamente el historial de uso sin procesar, nunca los resúmenes diarios, que no contienen clave.
- Las filas se seleccionan según la identificación de la clave de llamada. La columna de nombre de clave nunca coincide y las filas registradas sin una identificación de clave nunca se cuentan.
- Al crear una serie, se ejecutan cinco consultas agrupadas en las filas de la clave en la ventana. La serie creada se reutiliza durante 60 segundos por tecla y rango, y una llamada reutilizada no ejecuta ninguna. Su `generatedAt` da su edad.
- La ventana finaliza cuando se construye la serie. Una fila marcada más tarde, por ejemplo por desfase horario, no se cuenta.
- `coverage.retentionDays` es la configuración de retención del historial de uso sin procesar del operador (`retention.usageHistory` en la configuración de la base de datos). `coverage.truncatedByRetention` es verdadero cuando el rango solicitado es más largo que esa configuración. Compara los dos números y no comprueba si realmente faltan filas.
- El proveedor se devuelve según lo registrado para las solicitudes propias de la clave. Modelo es el nombre registrado después de su último `/` y las filas se agrupan según él. Una solicitud combinada cuyos objetivos fueron rechazados se registra con la etiqueta de enrutamiento como proveedor (el nombre del combo, `auto` o `combo`) y la cadena de modelo que envió el cliente. Otras solicitudes rechazadas, por ejemplo por un disyuntor abierto, un enfriamiento del modelo o una omisión de cuota estacionada, mantienen el proveedor y el modelo de destino.
- Además de los recuentos y los costos, la respuesta conlleva latencia promedio, tasas de éxito y los tiempos de la primera y la última solicitud.
- `byModel` enumera los 50 pares de proveedor y modelo con más solicitudes. Con más pares, sus entradas no suman `summary` y `summary.uniqueModels` cuenta cada ortografía del modelo registrada. Entonces `byModelTruncated` es verdadera y un modelo cuyos pares caen a ambos lados del corte muestra totales parciales.
- Se reportan dos costos. `costUsd` es el coste facturado, como lo muestran los análisis de uso. Los proveedores de suscripción de tarifa plana, como el plan Claude Code, cuentan allí con $0. `listPriceUsd` es el mismo uso con precio de lista, suscripciones incluidas. Una solicitud cuyo modelo no tiene fila de precio cuenta su costo almacenado: un costo que informó el proveedor o uno calculado cuando se registró la solicitud. Sólo una solicitud sin ninguno cuenta 0, sin marcador, por lo que un total puede ser parcial.
- El contrato de respuesta es `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` en `docs/openapi.yaml`).

### Página de autoservicio

Con `QUOTA_SELF_PANEL` activado, `/quota/{provider}` es una página pública. Un titular de clave escribe una clave API allí y ve los grupos de claves para el proveedor. Cada grupo muestra una tarjeta por ventana de grupo, con el uso del grupo para todos y la clave compartida. Cada cuenta del pool tiene sus propias tarjetas, con el uso de la cuenta y el reparto de claves. El uso de la cuenta aparece sólo cuando la clave puede ver los datos de la cuenta. La página también enumera los límites por modelo de cada cuenta y el uso propio de la clave. Aparece un aviso cuando un horario bloquea la clave en este momento. Una tarjeta enumera cada límite de llave por modelo con su uso y marca los alcanzados. `{provider}` es una identificación de proveedor o su alias (`/quota/claude`, `/quota/cc`). Un proveedor desconocido, y cada ruta `/quota/*` mientras la bandera está apagada, responde 404. Los grupos en un nodo personalizado compatible con OpenAI o Anthropic no tienen página. El API todavía responde por ellos.

La página no tiene sesión. La clave se envía sólo en el encabezado `Authorization` de `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` y `GET /api/v1/me/usage`, nunca en un URL. Una clave que el servidor acepta se guarda en el `sessionStorage` de la pestaña. Con "Recordar en este dispositivo", se mantiene en `localStorage` y "Olvidar clave" la elimina de ambos. Una clave que el servidor rechaza se elimina del almacenamiento.

Un pool en modo `consent` muestra una tarjeta de préstamo. Allí, el poseedor de la clave establece un porcentaje completo de 0 a 100 de la parte inactiva de la clave para prestar. El titular también elige la duración del consentimiento: hasta que se desactive, 1 hora, 8 horas, 24 horas, 7 días o 30 días. La duración cuenta desde el momento del guardado. Mientras esté vigente un plazo, el titular puede conservarlo. Si esa fecha límite pasa antes de Guardar, la tarjeta no envía nada y solicita otra opción. Con 0% no se envía fecha límite. La tarjeta muestra la fecha límite almacenada con su zona horaria nombrada. Un consentimiento cuyo plazo haya transcurrido se muestra como finalizado.

Para una clave `hard` la tarjeta también enumera, por ventana de grupo, qué otras claves se prestan a la clave en este momento. Cada fila es una cifra para todas las demás claves juntas. En un conjunto de dos llaves es la propia figura de la otra llave. Una cifra que la vista no informa se lee como no disponible, no como cero. Para una clave `soft` o `burst` la tarjeta dice que no aplica ninguna cifra.

Un pool en modo `saturation` cuya clave almacena un porcentaje superior a 0 muestra solo un retiro. Dice que el porcentaje almacenado no tiene ningún efecto allí. Su botón Retirar envía 0 sin fecha límite. Un pool en modo `saturation` con un 0 almacenado no muestra ninguna tarjeta de préstamo. Después de guardar, una tarjeta que la vista devuelta ya no necesita permanece con su mensaje hasta que la vista de la página cambie nuevamente.

No se guarda nada hasta que el titular presiona Guardar o Retirar. Cada pulsación envía una solicitud `PATCH /api/v1/me/quota/{provider}` y una segunda pulsación no envía nada mientras la primera está pendiente. El cuerpo lleva el `ref` opaco del pool desde la vista, el porcentaje y el plazo. La respuesta es la vista de cuota reconstruida y la página la muestra sin una segunda lectura. Cuando dos guardados se superponen, la página lee la cuota una vez después de la última respuesta. La página no guarda el consentimiento en el almacenamiento del navegador.

Un cambio rechazado se explica en la tarjeta mediante un texto elegido entre el estado HTTP. El cuerpo del error no se lee. Un 401 dice que la clave no fue aceptada y recarga la cuota. Un 403 dice que el grupo no acepta cambios en los préstamos y un 404 dice que el grupo ya no existe. Ambos ofrecen un botón que recarga la cuota. Una respuesta 400 u otra 4xx pide al titular que compruebe el porcentaje y el plazo. Un 429 pide al titular que espere, con los segundos de `Retry-After` cuando les da la respuesta. Una respuesta 5xx, un 408 o una falla de red indican que es posible que el cambio no se haya guardado y mantiene los valores escritos. Una respuesta fuera del contrato recarga la cuota. Un guardado fallido no elimina la clave por sí solo. Cuando se rechaza la recarga, la página elimina la clave como en cualquier lectura rechazada.

Una vez que se acepta una clave, la página también muestra una tarjeta "Configura tus herramientas" con tres pestañas. "Código Claude " proporciona el bloque `env` para `~/.claude/settings.json`. "Shell" proporciona las mismas variables que las líneas `export`. "Claude Desktop" proporciona los valores de su ventana de inferencia de terceros. Los modelos son los modelos de cuota-participación que la clave puede requerir para ese proveedor. Cuando dicha lista no viene con la clave, el bloque activa el descubrimiento del modelo de puerta de enlace. La dirección de puerta de enlace es el origen API público que informa el servidor (`OMNIROUTE_PUBLIC_API_BASE_URL`, luego `OMNIROUTE_PUBLIC_BASE_URL`). Cuando no se establece ninguno de los dos, la tarjeta muestra un marcador de posición y le indica al titular que pregunte al administrador. La clave se muestra como un marcador de posición. "Incluir mi clave" coloca la clave completa en el texto en pantalla y en lo que se copia un botón de copiar. Eso dura hasta que se borra la casilla, se olvida o reemplaza la clave, o se abandona la página. La tarjeta no envía ninguna solicitud y no ofrece descarga de archivos.

Una lectura de las marcas API `stale` se muestra como posiblemente desactualizada. Una lectura que marca `unavailable` se muestra con su motivo, nunca como cero.

En los planes porcentuales, la página extrae la participación de la clave cuando el API lo informa. Dice que el número es una estimación y nombra sus dos partes. Los límites por modelo muestran solo la cuenta.

Cuando una ventana lleva `members`, su tarjeta también muestra una barra con un segmento por miembro, en el orden de las ranuras. El segmento de la clave de pregunta utiliza el color de acento. Los otros segmentos recorren los colores del gráfico del tema. Una leyenda de texto enumera cada segmento con su valor, por lo que nada depende del color. Los segmentos están etiquetados como `You` o `Member N`, donde N es la ranura.

### Puerto dedicado para la página

`QUOTA_PANEL_PORT` abre un segundo oyente que sirve solo a la página de autoservicio. Está desactivado a menos que se establezca la variable. `QUOTA_PANEL_HOST` es la dirección de enlace y el valor predeterminado es `127.0.0.1`.

El oyente transmite estas rutas al puerto principal y responde 404 para todas las demás rutas:

| Camino                                                                   | Sirve                                          |
| ------------------------------------------------------------------------ | ---------------------------------------------- |
| `/quota/{provider}`                                                      | la pagina                                      |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | La vista de cuota que se lee en la página.     |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | La serie de uso que lee la página.             |
| `/_next/static/`                                                         | Scripts, estilos y fuentes de la construcción. |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Iconos                                         |

`GET` y `HEAD` se retransmiten sin cuerpo. También se transmite una solicitud con un cuerpo: un `PATCH` de la ruta de vista de cuota, que la página envía para guardar una opción de préstamo. Cualquier otro método responde al 404, excepto una solicitud CONNECT, cuya conexión se cierra sin respuesta. Cualquier otra solicitud que declare un cuerpo responde 404 y se cierra su conexión. Las solicitudes de actualización se rechazan y se cierra su conexión. Se rechaza una ruta con un segmento de puntos o un marcador de fragmento, como en el puerto API. También lo es un objetivo de solicitud con un carácter fuera de ASCII imprimible. El analizador HTTP responde 400 a un carácter de control sin formato en el destino, antes de la verificación propia de este puerto. Los encabezados de solicitud que el marco reserva para su propio uso no se retransmiten: nombres que comienzan con `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` o `x-next-`, y los nombres `x-matched-path` y `next-resume`. La solicitud se transmite sin ellos. No se puede acceder al panel de control, la página de inicio de sesión, el API de administración y las rutas de inferencia a través de este puerto.

El `PATCH` debe llevar `Content-Type: application/json`, sin parámetro o solo con `charset=utf-8`. Debe llevar un `Content-Length` del 1 al 4096, escrito como dígitos simples, y ningún `Transfer-Encoding`. Un `PATCH` que infringe una de estas reglas responde 404. Algunas longitudes mal formadas, como una firmada o repetida, reciben una respuesta 400 por parte del analizador HTTP antes de la propia verificación de este puerto. El puerto lee los bytes declarados antes de contactar con el puerto principal y los espera como máximo 5 segundos. Un cuerpo que para entonces no está completo responde al 404 y se cierra su conexión. Nada llega al puerto principal en ese caso, ni cuando el cliente sale primero. El puerto transmite exactamente los bytes declarados, con el mismo `Content-Length`. Los bytes posteriores se leen como la siguiente solicitud en la conexión. Un proxy inverso TLS al frente debe reenviar `Content-Length` y no debe volver a fragmentar el cuerpo de la solicitud. El puerto principal verifica la clave API en el encabezado `Authorization`, al igual que `GET`.

El cuerpo 404 es `{"error":"not_found","message":"Not found."}`. Un relé fallido responde 502 (`api_bridge_unavailable`) o 504 (`api_bridge_timeout`) sin campo `detail`.

El oyente no lee `QUOTA_SELF_PANEL` y no pasa la página. Mientras la bandera está apagada, la página y su API responden a 404 en el puerto principal, y el oyente transmite esa respuesta.

En el servidor de desarrollo (`next dev`), la página no se vuelve interactiva a través de este puerto. El socket de recarga en caliente de desarrollo es una solicitud de actualización y el puerto la rechaza. Utilice el puerto principal mientras desarrolla.

El puerto sirve HTTP simple y la página envía claves API. Mantenga la dirección de enlace predeterminada y coloque un proxy inverso con TLS delante. Una dirección de enlace distinta del loopback registra este aviso:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Un par de loopback que no envía ningún encabezado de reenvío cuenta como local en el puerto principal. Entonces un proxy en el mismo host debe enviar `X-Forwarded-For`. Se confía en un proxy en una dirección privada para ese encabezado solo con `OMNIROUTE_TRUST_PROXY=private` (o `lan`). Cualquier otro par es informado por la dirección de su conexión y los encabezados de reenvío que envió se eliminan.

El oyente mantiene como máximo 256 conexiones a la vez. Un cliente tiene 10 segundos para enviar los encabezados de la solicitud y 30 segundos para enviar la solicitud completa. Una conexión inactiva mantenida activa se cierra después de aproximadamente 5 segundos. Se cierra una conexión sin actividad durante 60 segundos. Estos valores son fijos. Establezca también límites de conexión y velocidad en el proxy inverso que se encuentra al frente. Un proxy inverso al frente debe mantener sus conexiones ascendentes inactivas durante menos de 5 segundos o no reutilizarlas. La retransmisión al puerto principal utiliza los tiempos de espera ascendentes del puerto API (`API_BRIDGE_*`).

El oyente también se inicia cuando `API_PORT` no está configurado. `QUOTA_PANEL_PORT` debe ser un puerto del 1 al 65535, escrito únicamente en dígitos. Debe diferir del puerto del tablero y del puerto API. Mientras el servidor WebSocket en vivo esté encendido, también debe diferir de `LIVE_WS_PORT` (predeterminado 20132). Cualquier otro valor no abre nada y registra una advertencia. Una advertencia sobre un valor rechazado nombra la variable y no repite el valor. Un puerto que ya está en uso no abre nada y registra esta advertencia:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Con `OMNIROUTE_BASE_PATH` configurado, el oyente espera todas las rutas anteriores bajo ese prefijo. Utilice el mismo `OMNIROUTE_BASE_PATH` en tiempo de compilación y en tiempo de ejecución. Escríbalo con una barra diagonal inicial y sin barra diagonal final, por ejemplo `/omniroute`. Otra forma, incluidas `/` y `/omniroute/`, cierra el puerto con una advertencia, aunque la compilación acepta esas formas. Lo mismo ocurre con una ruta base cuyo primer segmento nombra una ruta de aplicación: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` o `connect`, en cualquier caso.

Limitaciones:

- `/quota/{provider}/` con una barra diagonal responde 404 en este puerto.
- El trabajador del servicio y el manifiesto de la aplicación web no se entregan en este puerto.
- Un favicon personalizado configurado en el panel no se muestra en este puerto.
- Los iconos no se muestran cuando la aplicación se ejecuta bajo una ruta base.
- El puerto habla claro HTTP/1.1.
- Un enlace que falla no se vuelve a intentar hasta que se reinicia el proceso.
- El oyente no tiene límite de conexión ni de velocidad por dirección de cliente.
- Esta sección no cubre las configuraciones de contenedores.

---

## Variables de entorno

| Variable                             | Por defecto   | Descripción                                                                            |
| ------------------------------------ | ------------- | -------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`      | Controlador a utilizar: `sqlite` o `redis`                                             |
| `QUOTA_STORE_REDIS_URL`              | _(vacío)_     | Redis URL, por ejemplo, `redis://localhost:6379`                                       |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`         | 0..1; `>= threshold` activa el modo estricto                                           |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`        | Fichas que explican como máximo un punto de una ventana de plan porcentual             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`         | 0..1; multiplicador de puntuación combinada de políticas blandas                       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`          | Días antes de que GC retire los cubos viejos `quota_consumption`                       |
| `QUOTA_PANEL_PORT`                   | _(desarmado)_ | Puerto dedicado para la página de autoservicio. Desarmado significa que no hay oyente. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`   | Dirección de enlace para ese puerto                                                    |

La configuración DB (`quotaStore.*`) anula las variables env.

---

## Solución de problemas

### Redis está configurado, pero no se conecta

Compruebe que `ioredis` esté instalado (`npm ls ioredis`) y que se pueda acceder a
`QUOTA_STORE_REDIS_URL`. Si falla la conexión, la fábrica recurre a SQLite (se registra
con el nivel `warn`).

### `peek` devuelve datos obsoletos / apertura en caso de fallo

Si `peek` genera una excepción, `enforceQuotaShare` interpreta el resultado como
"permitir" (apertura en caso de fallo). Revise los registros de `pino` para buscar
entradas de `quota:enforce` y `quota:factory` e identificar la causa raíz.

### Desviación del contador de consumo

Si el uso real del proveedor difiere de los contadores, es algo esperado: la
ventana deslizante de 2 bloques tiene un error de aproximadamente el 1 % en los límites
de la ventana, y `consume` se ejecuta tras la respuesta sin esperar a que termine.
La señal de saturación (`saturationSignals.ts`) lee la utilización real del proveedor
con un TTL de 30 s y ajusta `globalUsedPercent` en consecuencia.

### El grupo muestra "sin datos" para la tasa de consumo

`computeBurnRate` requiere al menos 2 muestras históricas. Los grupos nuevos sin llamadas
previas a `consume` mostrarán `tokensPerSecond: 0` y `timeToExhaustionMs: null`.

---

## Migración desde localStorage

Cuando `/dashboard/costs/quota-share` se carga por primera vez, el hook `useLocalStoragePoolMigration`
comprueba:

1. Que `localStorage.getItem("omniroute:quota-share:pools")` no esté vacío.
2. Que `GET /api/quota/pools` devuelva `[]` (la BD está vacía).

Si ambas condiciones se cumplen, envía cada pool heredado a `POST /api/quota/pools` por lotes
y, a continuación, elimina la clave de localStorage. La migración es idempotente: la condición 2 evita
que se vuelva a realizar la migración.

---

## Clasificación interna de la estrategia

`quota-share` es una estrategia de enrutamiento **exclusivamente interna** (`INTERNAL_ROUTING_STRATEGY_VALUES` en
`src/shared/constants/routingStrategies.ts`). Se utiliza exclusivamente con las combinaciones de pools `qtSd/`
generadas por el sistema y se excluye deliberadamente de `ROUTING_STRATEGY_VALUES` para que nunca
aparezca como una opción seleccionable por el usuario en la interfaz de usuario o la API.

---

## Cobertura de prueba

Se incluyen dos capas de cobertura automatizada con el motor de cuota compartida:

| Suite                 | Dominio                                                                | lo que cubre                                                                                                                                                                                                                                    |
| :-------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unidad (29 pruebas)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | planificador DRR, control de saturación, límites de concurrencia, matemáticas fairShare, colas de trabajos pendientes                                                                                                                           |
| Matriz de integración | `npm run test:combo:matrix`                                            | Decisión de enrutamiento de un extremo a otro a través de una canalización combinada real; equidad DRR despriorización de saturación + a través de costuras vivas (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

La matriz de integración se ejecuta en CI junto con las 22 estrategias públicas. El conjunto de unidades se puede ejecutar de forma independiente.

---

## Resumen del esquema DB

Tres tablas agregadas por las migraciones `078`, `079` y `085`:

- Definiciones de grupos de `quota_pools` + `quota_allocations` — y asignaciones por clave.
- `quota_consumption` — rodando contadores de 2 cubos por `(apiKeyId, dimensionKey)`.
- Anulaciones manuales del plan del proveedor de `provider_plans` — (dimensiones JSON por connectionId).

Todas las tablas se agregaron mediante migraciones `CREATE TABLE IF NOT EXISTS` idempotentes.

Los préstamos consentidos agregan tres columnas: `quota_allocations.lending_percent` (entero, predeterminado 0), `quota_allocations.lending_until` (época milisegundos o `NULL` sin fecha límite) y `quota_pools.borrow_mode` (predeterminado `saturation`). Su migración solo agrega estas columnas y no escribe ninguna fila existente.

El libro de atribución de porcentaje agrega `quota_percent_ledger` (una fila por grupo, cuenta y ventana de plan) y `quota_percent_ledger_tokens` (un contador de token por grupo, cuenta y clave API ). `src/lib/db/quotaPercentLedger.ts` los lee y escribe.
