# Plan de implementación — Revisión completa de meWYSE

> Documento de trabajo derivado de la revisión completa del componente (JS/CSS/demo/docs).
> Se desarrolla **fase a fase**, solo cuando se indique. Marca cada tarea al completarla.
> Leyenda de verificación: ✅ = reproducido en vivo en navegador durante la revisión.
>
> **Restricción transversal**: todo el código es **ES5** (`var`, `function`, sin
> `const`/`let`/arrow/template literals/`Promise`). Ninguna corrección debe modernizar la sintaxis.

---

## Fase 0 — Cambio pendiente en el working tree

Antes de empezar, hay un cambio sin commitear en `mewyse.css` (márgenes de títulos).
Es cosmético y coherente; decidir si se commitea aparte o se integra en la Fase 5 (CSS).

- [ ] Revisar/commitear el ajuste de márgenes de `h1`/`h2`/`h3` en [mewyse.css:436](mewyse.css:436).

---

## Fase 1 — Seguridad y datos (CRÍTICO) 🔴

Máxima prioridad: afectan a la integridad de datos y a la seguridad de cualquier consumidor real.
Los tres primeros están **reproducidos en vivo**.

- [x] **1.1 ✅ `getSafeHTML()` devuelve cadena vacía.** RESUELTO. Se separó el flag `tableInnards`
  (controla el wrapper `<table>`) de `allowTable` (permite tags de tabla). `getSafeHTML` ya no envuelve
  en `<table>` → sin foster parenting. → [mewyse.js:15812](mewyse.js:15812) (`_sanitizeBlockContent`), call sites en [mewyse.js:16114](mewyse.js:16114) y [mewyse.js:16228](mewyse.js:16228).
  - VERIFICADO en vivo: devuelve `<h1>...<p>...<ul>...<table>...` completo.

- [x] **1.2 ✅ XSS en pegado. RESUELTO.**
  - `href`: valida con `_isSafeUrl`; si no es seguro emite `href="#"`. → [mewyse.js:5774](mewyse.js:5774).
  - `data-tag-color`: el style construido pasa por `_sanitizeStyle` (elimina `position`/`inset`, etc.). → [mewyse.js:5746](mewyse.js:5746).
  - VERIFICADO: `javascript:`→`#`, https legítimo intacto, inyección CSS eliminada.

- [x] **1.3 ✅ Desincronización modelo↔DOM. RESUELTO.** Nuevo helper `_persistActiveBlockContent()`
  ([mewyse.js:10537](mewyse.js:10537)) llamado desde `applyTextColor`, `applyBackgroundColor`,
  `removeTextColor`, `removeBackgroundColor`, `createLink` y las dos ramas de `applyCaseTransform`.
  Maneja bloque tabla (persiste la tabla, no la celda).
  - VERIFICADO: color y mayúsculas persisten al modelo y sobreviven a `changeBlockType`.
  - ⚠️ **Hallazgo relacionado (fuera de Fase 1)**: `getHTML()`/`getSafeHTML()` hacen strip del `style`
    en spans genéricos, así que el color de texto/fondo se pierde en esos dos exports (sí se conserva en
    `getJSON` y en el modelo). Es preexistente. Candidato a nueva tarea (ver "Pendientes descubiertos").

- [x] **1.4 ✅ Paste en celdas de tabla se saltaba la sanitización. RESUELTO.** Listener `paste` en la
  celda que sanea a inline seguro (`sanitizeHTML`) o texto plano escapado antes de insertar. → [mewyse.js:6558](mewyse.js:6558).
  - VERIFICADO: pegar `javascript:`/estilos Word en celda queda saneado en el modelo.

- [x] **1.5 ✅ `loadFromJSON([])` dejaba el editor sin bloques. RESUELTO.** Garantía de párrafo mínimo
  igual que `loadFromHTML`. → [mewyse.js:11621](mewyse.js:11621).
  - VERIFICADO: `loadFromJSON([])` deja 1 párrafo.

### Pendientes descubiertos durante la Fase 1
- [x] **`getHTML`/`getSafeHTML` hacían strip del color de texto/fondo** (spans genéricos). RESUELTO.
  Nuevo whitelist `CONTENT_STYLE_PROPS` (color/background-color) + helper `_filterContentStyle`;
  `_stripNonNativeStyles` ahora filtra el style en vez de borrarlo entero. → [mewyse.js:17394](mewyse.js:17394).
  - VERIFICADO: color/fondo se conservan, `margin`/`font-family` (junk Word) se descartan, inyección
    `position:fixed;inset:0` bloqueada.

---

## Fase 2 — Bugs funcionales visibles (CRÍTICO/ALTO) 🔴🟠

- [x] **2.1 ✅ Click en menús con filtro insertaba el ítem equivocado. RESUELTO.** Nuevo helper
  `_resolveMenuFullIndex(menu, selector, visualIndex)` que traduce el índice visual (teclado) al real
  (`data-index`). `selectSlashMenuItem`/`selectMentionItem`/`selectEmojiItem`/`selectTagItem` ahora
  reciben SIEMPRE el índice real e indexan el array completo (`slashMenuTypes`/`mentions`/
  `WYSIWYG_EMOJIS`/`tags`); los 4 handlers Enter convierten con el helper. → [mewyse.js:14690](mewyse.js:14690).
  - VERIFICADO: filtrar menciones por "car" y clicar inserta "Carlos Ruiz"; resolver mapea visual→real correctamente.

- [x] **2.2 ✅ Resize de imagen en celda roto al 2º uso + fuga. RESUELTO.** Portado el patrón de
  `createImageElement`: los listeners `mousemove`/`mouseup` se registran dentro de `onmousedown` y se
  quitan en `mouseup` (antes se registraban al insertar y se quitaban tras el 1er resize). → [mewyse.js:2629](mewyse.js:2629).
  - `editImageInTableCell` es un modal, no tenía el bug.

- [x] **2.3 ✅ Soltar archivo no-imagen navegaba fuera. RESUELTO.** `_imageDropHandler` ahora hace
  `preventDefault()`/`stopPropagation()` SIEMPRE que el drop es de ficheros, aunque ninguno sea imagen. → [mewyse.js:1648](mewyse.js:1648).

- [x] **2.4 ✅ Contador "1 min min". RESUELTO.** `updateCharCounter`: `timeEl.textContent = readingTime`
  (sin añadir `' min'`). → [mewyse.js:14843](mewyse.js:14843).
  - VERIFICADO: barra muestra "1 min".

- [x] **2.5 ✅ Find & Replace persistía resaltados. RESUELTO.** `_replaceCurrent` llama
  `_clearSearchHighlights()` antes de leer `innerHTML` (y luego `_searchInEditor` los reconstruye);
  quitado el `triggerChange` redundante. `_replaceAll` ya quedaba limpio. → [mewyse.js:15105](mewyse.js:15105).
  - VERIFICADO: reemplazar 1 de 3 → `getHTML` sin `mewyse-search-highlight`.

- [x] **2.6 ✅ Detección inicial de dark mode rompía el listener. RESUELTO.** Flag `v_theme_explicito`
  capturada antes de la autodetección; el listener `matchMedia` se instala si no hubo theme explícito
  (ya no depende del valor mutado). → [mewyse.js:910](mewyse.js:910).
  - VERIFICADO: con `prefers-color-scheme: dark` al cargar, `themeApplied='dark'` Y listener instalado.

---

## Fase 3 — Tablas matrix-aware y Markdown (ALTO) 🟠

- [x] **3.1 ✅ `findInsertPosition` ignoraba rowspans de filas superiores. RESUELTO.** Reescrita como
  matrix-aware `findInsertPosition(matrix, rowIdx, rowEl, targetCol)` (calcula la columna de inicio real
  de cada celda vía matriz). Actualizados los 3 usos: `_insertTableColumnAt`, `_deleteTableRowAt` y
  `unmergeCell` (reescrito para usar la matriz + `_createEmptyTableCell`). → [mewyse.js:7340](mewyse.js:7340).
  - VERIFICADO: insertar columna en tabla con rowspan coloca la celda en la posición lógica correcta en todas las filas; borrar fila reubica el rowspan; unmerge mantiene la integridad.

- [x] **3.2 ✅ `mergeSelectedCells` no expandía el rectángulo. RESUELTO.** Bucle de expansión iterativa
  hasta contener por completo cualquier celda con span que solape el borde; guard `if (!firstCell) return`
  para tablas irregulares; quitado el `triggerChange` redundante (también en `unmergeCell`). → [mewyse.js:7160](mewyse.js:7160).
  - VERIFICADO: merge con solape parcial de un rowspan expande el rango y no corrompe la tabla.

- [x] **3.3 ✅ Round-trip Markdown (formato inline + saltos). RESUELTO (parcial).** `markdownInlineToHtml`
  protege con placeholders las etiquetas inline que emite `htmlToMarkdownInline` (`<u>`,`<sub>`,`<sup>`,
  `<mark>`,`<span style>`,`<br>`) antes de `escapeHtml` y las restaura después; `<br>` se emite literal
  (no `\n`) para no partir el bloque. → [mewyse.js:11266](mewyse.js:11266), [mewyse.js:11464](mewyse.js:11464).
  - VERIFICADO: subrayado/mark/sub/sup/color y saltos `<br>` sobreviven al round-trip (sin partir bloques);
    markdown estándar hace round-trip exacto; el saneo final (`_sanitizeBlocks`) sigue limpiando estilos peligrosos.

### Pendientes de Fase 3 (requieren capa de escape de Markdown, mayor riesgo)
- [ ] **Metacaracteres sin escapar**: un párrafo cuyo texto empieza por `- `, `# `, `> `, `N. `, o que
  contiene `*`/`_`/`~~`, se reinterpreta como bloque/formato al recargar. Requiere un escaper de Markdown
  (backslash) coordinado entre `getMarkdown` (escapar) y `loadFromMarkdown`/`markdownInlineToHtml`
  (desescapar). Se pospone por el riesgo de regresión en contenido con backslashes.
- [ ] **Dimensiones de imagen a 300×200**: `getMarkdown` emite `![alt](url)` (Markdown estándar no tiene
  sintaxis de tamaño) y al recargar `width/height:'auto'` → `parseInt` NaN → defaults 300×200. Requeriría
  emitir `<img>` HTML con dimensiones (se aparta del Markdown puro) o un formato propio.

---

## Fase 4 — Ciclo de vida, fugas y rendimiento (MEDIO) 🟡

- [x] **4.1 ✅ `triggerChange` serializaba todo aunque no hubiera `onChange`. RESUELTO.** Guarda
  `if (typeof this.onChange !== 'function') return` movida ANTES de construir el payload; `getPlainText()`
  cacheado en `v_plain` (se llamaba hasta 3×). → [mewyse.js:11775](mewyse.js:11775).
  - VERIFICADO: `triggerChange` no lanza y sigue sincronizando el textarea.
- [x] **4.2 ✅ `removeInlineStyle` limpiaba todos los spans del bloque. RESUELTO.** Ahora solo limpia los
  spans que INTERSECTAN la selección (nuevo helper `_rangeIntersectsNode` con `compareBoundaryPoints`).
  → [mewyse.js:12488](mewyse.js:12488).
  - VERIFICADO: quitar color al span "rojo" seleccionado deja intacto el span "azul".
- [x] **4.3 ✅ `deleteBlock` sobre el último bloque no limpiaba props. RESUELTO.** Se reemplaza por un
  objeto limpio `{id, type:'paragraph', content:''}` preservando el id. → [mewyse.js:10513](mewyse.js:10513).
  - VERIFICADO: tras borrar, el bloque solo tiene keys [id, type, content]. (Los otros dos sitios ya creaban objeto fresco.)
- [x] **4.4 ✅ Fugas de listeners y limpieza en `destroy()`. RESUELTO.**
  - `destroy()` invoca los `closeFn` de todos los modales del backdrop (color picker, case/tag menu...)
    antes de limpiar, para que retiren sus propios listeners. → [mewyse.js:11990](mewyse.js:11990).
  - `showUnifiedColorPicker` expone `_closeColorPicker` y usa `_add_doc_click`/`_remove_doc_click`;
    `closeFormatMenu` lo invoca (antes hacía `picker.remove()` directo). → [mewyse.js:12746](mewyse.js:12746).
  - `showCaseMenu` registra su click con `_add_doc_click` y lo retira en su cierre. → [mewyse.js:13216](mewyse.js:13216).
  - `destroy()` usa `classList.contains('mewyse-editor-wrapper')` (no `===`), que dejaba el wrapper huérfano.
  - VERIFICADO: destroy con picker abierto elimina picker, backdrop y wrapper; `_closeColorPicker` a null.
  - Nota: los modales standalone (summary/tabla/media/link) con overlay propio no se barren en destroy
    (edge case: destruir con un modal-diálogo abierto). No se toca por el riesgo cross-editor de un sweep global.
- [x] **4.5 ✅ `anchorMenu` reescribía estilos cada frame. RESUELTO (conservador).** Se cachean los
  últimos top/left/transform y solo se escribe `style` cuando cambian (rompe el thrash de layout sin
  alterar el posicionamiento). → [mewyse.js:960](mewyse.js:960).
- [x] **4.6 ✅ Reconstrucción cara. RESUELTO.** `_buildTableToolbar` solo reconstruye si cambia la firma
  (bloque + índices lógicos + estado merge/unmerge + identidad de celda). `expandTableCellSelection`
  construye la matriz UNA vez y la reutiliza (`getTableCellCoords`/`getCellsInRange` aceptan matriz
  opcional). → [mewyse.js:7580](mewyse.js:7580), [mewyse.js:6790](mewyse.js:6790).
  - VERIFICADO: toolbar con 20 botones estable; misma firma no reconstruye.
- [x] **4.7 ✅ `_isSafeUrl` permitía `data:` peligrosos en href. RESUELTO.** Bloquea TODO `data:` en
  enlaces. → [mewyse.js:15411](mewyse.js:15411).
  - VERIFICADO: `data:image/svg+xml`/`data:text/xml` → false; https/relativo/mailto → true.
- [x] **4.8 ✅ `_sanitizeStyle` bypass de `url(` con escapes CSS. RESUELTO.** Rechaza cualquier valor con
  backslash (ninguna prop permitida lo necesita). → [mewyse.js:15461](mewyse.js:15461).
  - VERIFICADO: `u\72 l(...)` y `url(x)` → ''; `color: red` conservado.

---

## Fase 5 — CSS (MEDIO/limpieza) 🟡🔵

- [x] **5.1 ✅ Dark mode roto en modales. RESUELTO.** Los contenedores de modal (imagen, enlace, media,
  propiedades de tabla, summary) llaman a `_applyMenuTheme` (añade `mewyse-dark` si el editor está en
  oscuro) y se añadieron `.mewyse-modal-overlay/.mewyse-modal-container/.mewyse-summary-modal.mewyse-dark`
  al grupo de variables dark. Sustituido el `mewyse-editor-'+theme` (incorrecto) de media/tabla.
  - VERIFICADO: modal de propiedades en editor dark → fondo `#1a1a1a`, texto claro.
- [x] **5.2 ✅ Keyframes duplicados. RESUELTO.** Eliminados los duplicados tardíos de `fadeIn`
  (opacity-only, anulaba el slide) y `slideUp`; quedan las versiones con deslizamiento.
  - VERIFICADO: `@keyframes fadeIn` vuelve a incluir `translateY`.
- [x] **5.3 ✅ Hardcodes de color migrados a variables.** `#e8f0fe`→`--mewyse-bg-hover`; `#fee`/`#d33`→
  `--mewyse-danger-bg`/`--mewyse-danger`; familia `#4a9eff`/`#3a8eef`/`#5568d3`→`--mewyse-accent`/`-hover`;
  `#ddd`/`#e0e0e0`/`#aaa`/`#999` de contenido y estados activos/separadores→variables de borde/texto/bg.
  - Se conservan a propósito: `#000` del contenedor de vídeo (letterbox) y el botón claro sobre imagen (`#fff`/`#333`/`#999`).
- [x] **5.4 ✅ Selector dark de cita corregido** a `.mewyse-editor-dark blockquote.mewyse-block`.
- [x] **5.5 ✅ Find/replace dark unificado** con la paleta neutra común (añadido al grupo `.mewyse-dark`,
  eliminada la paleta violeta propia).
- [x] **5.6 ✅ Readonly ya no lo pisan los estilos de contenido**: la regla pasa a
  `.mewyse-editor.mewyse-editor-styled.mewyse-readonly` (cubre minimal y con toolbar, mayor especificidad).
- [x] **5.7 ✅ Declaraciones `color` duplicadas eliminadas** (`.mewyse-toolbar-button`,
  `.mewyse-modal-button-cancel`, `.mewyse-summary-button`, `.mewyse-color-remove`) y bloque redundante
  `.mewyse-color-grid .mewyse-color-*` eliminado.
- [x] **5.8 ✅ Reglas muertas eliminadas**: `.mewyse-full`, `.mewyse-block-content`, `::-webkit-scrollbar`
  vacías, spacer RTL vacío; `.mewyse-summary-heading1/2/3` del tooltip reescaladas a tamaños razonables.
- [x] **5.9 ✅ `:focus-visible` añadido** a los ~12 elementos interactivos que faltaban (bloque agrupado al
  final del CSS, misma convención `outline` con el acento del tema).

---

## Fase 6 — Código muerto y deduplicación (limpieza) 🔵

> Pase aparte, sin mezclar con los fixes de comportamiento.

- [x] **6.1 ✅ Código muerto eliminado (parcial).** `createContentElement` (~295 líneas, `@deprecated`,
  sin callers, contenía `document.onmousemove=`); `showColorPicker` (~84 líneas, sin callers);
  `scrollHandlers` (array sin uso) + `clearScrollHandlers` (no-op) + su llamada en `destroy`; emojis
  alias duplicados (`blush`=😊, `cool`=😎).
  - VERIFICADO: las funciones ya no existen en el prototipo; sintaxis OK; editor funciona.
  - PENDIENTE: `updateConsecutiveNumberLists` (no-op) — tiene 7 call sites entrelazados con lógica de
    foco/rAF/minIndex; quitarlo bien exige tocar addBlock/changeBlockType/delete*, con riesgo de
    regresión. Se deja como no-op inofensivo. Ver "Pendientes".
- [x] **6.4 ✅ `_searchInEditor` reutiliza la instancia de regex** (reseteando `lastIndex`) en vez de
  compilar una por nodo de texto. → [mewyse.js:14769](mewyse.js:14769).
  - VERIFICADO: find & replace sigue encontrando todos los matches.

### Pendientes de Fase 6 (refactors DRY pospuestos por relación riesgo/beneficio)
> Son extracciones/optimizaciones **sin ganancia funcional** sobre código que ya funciona. En un fichero
> único ES5 sin tests, el riesgo de regresión no compensa hacerlos "a presión"; conviene abordarlos por
> separado, uno a uno y con verificación dedicada.
- [ ] **6.2 Extraer helpers**: `_buildImageDimensionsModal` (unifica los 4 modales de imagen ~150 líneas
  c/u), dedup `getHTML`/`getHTMLSource`, `_positionMenuAtCaret`/`_updateMenuSelection` (mention/emoji),
  `_findCursorPosition` (duplicada verbatim en changeBlockTypeFromToolbar y changeTableCellBlockType;
  ojo: la 2ª no tiene `self` en scope), helper de snapshot compartido `pushHistory`/`undo`.
- [ ] **6.3 Render incremental** en `duplicateBlock`/`moveBlock`/`deleteBlock` (cambia foco/scroll — probar bien).
- [ ] **6.1b `updateConsecutiveNumberLists`** (no-op) y el trabajo muerto asociado en sus 7 call sites.

---

## Fase 7 — Compatibilidad IE11 (decisión de alcance) ⚠️

El proyecto declara IE11+ pero usa APIs no soportadas **sin polyfill**, que rompen funciones enteras:
`String.prototype.normalize`, `Element.remove()`, `NodeList.forEach`, `Element.closest()`,
selector `:scope > li`, `scrollIntoView({block:'nearest'})`.

- [ ] **7.1 Decidir**: (a) añadir polyfills ES5 en el IIFE, o (b) actualizar la afirmación de compatibilidad
  en README/CLAUDE.md a los navegadores realmente soportados.
- [ ] **7.2** Según la decisión, corregir los usos o documentar el nuevo baseline.

---

## Fase 8 — i18n y accesibilidad 🟡

- [ ] **8.1 i18n**: mover a `this.t()` los strings hardcodeados: placeholders 'Encabezado 1/2/3',
  'Elemento de lista', 'Tarea...', 'Escribe "/"...' ([mewyse.js:4776](mewyse.js:4776)), '(video/audio no
  disponible)' ([mewyse.js:15555](mewyse.js:15555)), aria-labels 'Mentions'/'Emoji'/'Tags', etiquetas
  `[Video]`/`[Audio]` del Markdown. Añadir las claves a `WYSIWYG_TRANSLATIONS`.
- [ ] **8.2** Regex de triggers `\w` no cubren acentos/ñ (`@josé`, `/título` cierran el menú). Ampliar.
- [ ] **8.3 Accesibilidad**: `aria-label` en los ~14 botones icon-only de la toolbar; `role="listbox"`/
  `role="option"` en el menú de tipos; `aria-selected="false"` en ítems ocultos de emoji menu.

---

## Fase 9 — Documentación y demo 🔵

- [ ] **9.1 README**: corregir default de `summary` (es `true`, no `false`) [README.md:138];
  documentar las 7 opciones faltantes (`readOnly`, `toolbarOverflow`, `wordWrap`, `wordWrapToggle`,
  `escapeHtmlEntities`, `htmlNumericEntities`, `tags`) y el sistema de tags `#`; actualizar secciones
  obsoletas (handle por foco no hover, propiedades de tabla en toolbar contextual, summary = panel lateral,
  ya no hay inyección de estilos con ID único); documentar métodos públicos faltantes
  (`loadFromText`, `getHTMLSource`, `removeFormat`, `applyCaseTransform`, `indentBlock`, fullscreen,
  `toggleWordWrap`, `toggleOutlinePanel`, `showFindReplace`, stats).
- [ ] **9.2 CLAUDE.md**: actualizar tamaños de fichero (17.490 / 2.958 líneas), la tabla de organización
  por líneas (corrida ~2.000–3.900), y la instrucción "añade métodos antes de `escapeHtml()` ~línea 10449"
  (real: ~17.464). Documentar features recientes ausentes (readOnly, toolbarOverflow, tags, escapeHtmlEntities).
- [ ] **9.3 Demo `index.html`**:
  - [ ] Analítica GoatCounter rota: host `//gc.zaraz.io/count.js` (TLS falla) → usar `gc.zgo.at`. → [index.html:412](index.html:412).
  - [ ] Clase CSS huérfana `.gh-link` (el enlace real es `.github-link`). → [index.html:407](index.html:407).
  - [ ] Footer depende de `body.light-mode` que nunca se aplica (contraste roto). → [index.html:380](index.html:380).
  - [ ] "12 tipos de bloques" → son 14 (faltan video/audio); añadir sección de demo de media.
  - [ ] Textareas sin `label`/`aria-label`; contenido árabe/inglés sin atributo `lang`.

---

## Notas

- Sin dependencias ni build: probar abriendo `index.html` (o `.claude/serve.js` en :8765).
- Verificación en vivo posible con las herramientas de preview del editor.
- Este plan es **solo diagnóstico**; no se ha modificado código de producción.
