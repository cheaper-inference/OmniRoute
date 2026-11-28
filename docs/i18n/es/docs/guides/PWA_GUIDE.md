# Progressive Web App (PWA) Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Instale el panel OmniRoute como una aplicación web progresiva para abrirlo desde su pantalla de inicio o escritorio en una ventana independiente. La aplicación instalada aún necesita una conexión a su servidor OmniRoute para navegación, datos del panel y solicitudes de API. Los activos estáticos almacenados en caché no proporcionan una puerta de enlace sin conexión ni un panel de control sin conexión.

## ¿Qué es una PWA?

Una aplicación web progresiva utiliza el panel web con un ícono de aplicación y una ventana separada. Una vez instalado, OmniRoute:

- Se inicia desde su pantalla de inicio o escritorio
- Se abre en modo independiente, sin la barra de direcciones ni las pestañas habituales del navegador.
- Caché de activos estáticos seleccionados
- Admite orientaciones vertical y horizontal

## Instalación

Utilice una dirección HTTPS para un servidor en otro dispositivo. Cuando el servidor se ejecuta en el mismo dispositivo, `http://localhost:20128` también cumple con los requisitos de instalación del navegador. Una dirección `http://YOUR_IP:20128` simple no cumple con esos requisitos. Los menús y las indicaciones de instalación dependen del navegador y del sistema operativo. Consulte [los requisitos de instalación de PWA de MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (cromo)

1. Abra su dirección OmniRoute HTTPS, o `http://localhost:20128` para un servidor en el mismo teléfono.
2. Abre el**⋮** menú y elegir** Instalar aplicación** o** Agregar a la pantalla de inicio** , si se ofrece.
3. Confirme el mensaje.
4. Abra OmniRoute desde la pantalla de inicio.

### iOS (Safari)

1. Abra su dirección OmniRoute HTTPS en Safari.
2. Grifo** Compartir** →** Agregar a la pantalla de inicio** .
3. Confirma el nombre y toca** Agregar** .
4. Abra OmniRoute desde la pantalla de inicio.

### Escritorio (Chrome/Edge)

1. Abre tu panel de OmniRoute.
2. Utilice el icono de instalación del navegador o el** Instalar aplicación** entrada del menú, si se ofrece.
3. Confirme el mensaje para abrir OmniRoute en su propia ventana.

## Características

### Ventana independiente

El manifiesto establece `display: "standalone"` y `start_url: "/dashboard"`. La aplicación instalada abre el panel en una ventana de la aplicación. Los controles del navegador y del sistema operativo aún pueden aparecer; el manifiesto no solicita el modo de pantalla completa.

### Activos almacenados en caché y requisitos de red

El [trabajador del servicio](../../public/sw.js) almacena en caché los recursos seleccionados del mismo origen:

| Solicitud o activo                             | Estrategia     | Comportamiento                                                                                                                      |
| ---------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Recursos durante la instalación                | Pre-caché      | `/`, `/manifest.webmanifest`, `/icon-512.png` y `/apple-touch-icon.png` se almacenan en caché durante la instalación del trabajador |
| activos estáticos Next.js (`/_next/`)          | Primero la red | Las respuestas exitosas actualizan el caché; un error de red recurre a una respuesta almacenada en caché existente                  |
| Otros CSS, JS, imágenes y fuentes estáticas    | Caché primero  | Se reutiliza una respuesta almacenada en caché existente; las respuestas de red exitosas se almacenan en caché en caso de error     |
| Navegación de página                           | Derivación     | El navegador busca la página directamente; no se ofrece ningún respaldo sin conexión                                                |
| API, panel de control y rutas de autenticación | Derivación     | El trabajador no intercepta ni almacena en caché estas solicitudes.                                                                 |
| Otras solicitudes no estáticas                 | Red            | Sin búsqueda de caché ni almacenamiento                                                                                             |

Las rutas excluidas son `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` y `/login`, que coinciden sin distinguir entre mayúsculas y minúsculas en los límites de la ruta. Las solicitudes de origen cruzado y que no son GET también omiten al trabajador.

### Página de conectividad

La página `/offline` proporciona un mensaje de conectividad, un indicador online/offline, un** Reintentar conexión** y un enlace a la página de estado. Es** no almacenado en caché previamente** y el trabajador del servicio lo hace** no** redirigir las navegaciones fallidas a él. Su existencia no hace que se pueda acceder a nuevas páginas sin el servidor.

### Iconos de aplicaciones

El manifiesto anuncia estos íconos PNG :

| Archivo                | Tamaño  | Usar                                       |
| ---------------------- | ------- | ------------------------------------------ |
| `icon-192.png`         | 192×192 | Icono de aplicación general                |
| `icon-512.png`         | 512×512 | Icono de aplicación general y enmascarable |
| `apple-touch-icon.png` | 180×180 | Icono de la pantalla de inicio de Apple    |

El navegador selecciona el icono apropiado para el destino de instalación.

### Registro Automático

`PwaRegister` registra al trabajador en producción cuando el navegador admite trabajadores de servicio. El modo de desarrollo cancela el registro de los trabajadores y borra los cachés para evitar que los activos obsoletos interfieran con la recarga en caliente. Las indicaciones de instalación siguen siendo una decisión del navegador.

## Arquitectura Técnica

### Manifiesto de aplicación web

Next.js genera `/manifest.webmanifest` a partir de [`src/app/manifest.ts`](../../src/app/manifest.ts). Sus configuraciones clave son:

| Configuración           | Valor                                                   |
| ----------------------- | ------------------------------------------------------- |
| `short_name`            | `OmniRoute`                                             |
| `start_url`             | `/dashboard`                                            |
| `scope`                 | `/`                                                     |
| `display`               | `standalone`                                            |
| `orientation`           | `any`                                                   |
| Colores de fondo y tema | La paleta de luces predeterminada de `PWA_THEME_COLORS` |

El nombre y la descripción del manifiesto son valores estáticos en ese archivo fuente. El manifiesto instalado no sigue la configuración del nombre de la instancia ni la paleta activa en cada visita.

### Trabajador de servicio

[`public/sw.js`](../../public/sw.js) no tiene dependencia del marco del trabajador de servicio:

- **Instalar:** almacena en caché los cuatro recursos enumerados anteriormente y activa el nuevo trabajador.
- **Activar:** elimina generaciones de caché más antiguas y reclama clientes.
- **Buscar:** aplica las estrategias de activos estáticos y las exclusiones de rutas anteriores.
- **Versionado:** el nombre de la caché de origen es `omniroute-pwa-v3`; la compilación de producción sella la identidad de la caché.
- **Notificaciones:** maneja eventos `push` entrantes y enfoca o abre una ventana cuando se hace clic en una notificación.

Los controladores de eventos push por sí solos no establecen una suscripción push activa ni una entrega de servidor configurada. No asuma que las notificaciones están habilitadas simplemente porque PWA está instalado.

### Metadatos de diseño y registro

[`src/app/layout.tsx`](../../src/app/layout.tsx) proporciona el enlace del manifiesto, metadatos independientes de Apple, colores del tema y `viewport-fit: cover`. El título de la página y el título de la aplicación web de Apple utilizan el nombre de la instancia. El color del tema del navegador en vivo sigue la paleta; el manifiesto de instalación utiliza el color de luz predeterminado.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) se ejecuta en el cliente y registra `/sw.js` con la compilación ID en su URL. Detecta generaciones de caché que no coinciden y puede restablecer el trabajador y recargarlo una vez para recuperarlo de una instalación anterior. El error de registro no bloquea el panel.

## Usar con Termux (Android)

1. Inicie OmniRoute en Termux: `npx -y omniroute@latest`.
2. Abra Chrome en el mismo teléfono: `http://localhost:20128`.
3. Instale el PWA a través del menú de instalación del navegador.
4. Mantenga el servidor Termux en funcionamiento mientras utiliza el panel.

El teléfono alberga tanto la puerta de enlace como su tablero. Las solicitudes a proveedores remotos AI aún necesitan acceso a la red. Consulte la [guía de Termux](TERMUX_GUIDE.md) para conocer las consideraciones sobre la configuración y la duración del proceso de Android.

## Usar desde otros dispositivos

Abra la dirección HTTPS del servidor en un teléfono, tableta o computadora de escritorio, luego siga el flujo de instalación de ese navegador. El servidor debe permanecer accesible desde cada dispositivo. Consulte la [guía del túnel](../ops/TUNNELS_GUIDE.md) para conocer las opciones de acceso remoto.

## Personalización

### Nombre de instancia

El** Nombre de instancia** La configuración cambia los metadatos del panel, incluido el título de la página y el título de la aplicación web de Apple. El manifiesto generado utiliza un nombre estático, por lo que esta configuración no garantiza que se cambie el nombre de una aplicación ya instalada.

### Favicón personalizado

Un favicon personalizado cambia el favicon del navegador. El manifiesto de instalación todavía anuncia los archivos PNG anteriores; Cambiar el favicon no reemplaza esos íconos de la pantalla de inicio.

## Limitaciones

- **Se requiere conexión al servidor:** La navegación de la página, el estado del panel y las solicitudes API no tienen un respaldo fuera de línea.
- **Sin sincronización en segundo plano:** Las acciones fuera de línea no están en cola para su reproducción.
- **Diferencias del navegador:** Los menús de instalación, la presentación de ventanas y la compatibilidad con notificaciones varían según la plataforma.
- **Sin caché de respuesta API :** el trabajador excluye API, el panel y las rutas de autenticación.
- **Iconos de instalación estática:** actualizar esos íconos requiere cambiar los activos anunciados; Los navegadores pueden conservar los metadatos instalados.

## Referencia de archivos

| Archivo                                                                                | Objetivo                                                                        |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Manifiesto de aplicación web generado                                           |
| [public/sw.js](../../public/sw.js)                                                     | Almacenamiento en caché, exclusiones y controladores de eventos de notificación |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registro de producción y recuperación de caché obsoleta                         |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Página de conectividad, no un respaldo automático sin conexión                  |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadatos de página y configuración de ventana gráfica                          |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Valores de color de tema compartidos                                            |
| [public/icon-512.png](../../public/icon-512.png)                                       | icono de la aplicación 512 × 512                                                |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 icono de Apple                                                        |
