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

- [ ] **4.1 `triggerChange` serializa todo (HTML+JSON+MD+plainText) en cada pulsación aunque no haya
  `onChange`.** Mover la guarda `if (typeof this.onChange !== 'function')` antes de construir el payload;
  cachear `getPlainText()` (se llama 3×). → [mewyse.js:11692](mewyse.js:11692).
- [ ] **4.2 `removeInlineStyle` quita el color de TODOS los spans del bloque, no solo de la selección.**
  → [mewyse.js:12383](mewyse.js:12383).
- [ ] **4.3 `deleteBlock` sobre el último bloque no limpia props opcionales** (`alignment`, `checked`,
  `customClass`, `tableStyle`, `indentLevel`). → [mewyse.js:10466](mewyse.js:10466).
- [ ] **4.4 Fugas de listeners y limpieza en `destroy()`**:
  - [ ] `showUnifiedColorPicker`: window scroll/resize + document click no se limpian. → [mewyse.js:12586](mewyse.js:12586).
  - [ ] `destroy()` no cierra tag-menu, case-menu ni modales abiertos (summary/tabla/media). → [mewyse.js:11809](mewyse.js:11809).
  - [ ] `showColorPicker`/`showCaseMenu` usan `addEventListener` crudo en vez de `_add_doc_click`.
  - [ ] `destroy()` deja el wrapper huérfano: usa `===` sobre `className` (que lleva más clases por defecto);
    cambiar a `classList.contains`. → [mewyse.js:11887](mewyse.js:11887).
- [ ] **4.5 `anchorMenu` mantiene un `requestAnimationFrame` perpetuo por menú abierto.** Reposicionar
  solo en scroll/resize. → [mewyse.js:947](mewyse.js:947).
- [ ] **4.6 Reposición/reconstrucción cara**: `_updateTableToolbar` reconstruye ~15 botones SVG en cada
  `selectionchange`; `expandTableCellSelection` reconstruye la matriz 3× por `mousemove`. Cachear.
  → [mewyse.js:7482](mewyse.js:7482), [mewyse.js:6700](mewyse.js:6700).
- [ ] **4.7 `_isSafeUrl` permite `data:image/svg+xml` / `data:text/xml` en `href`** (vector en IE11).
  → [mewyse.js:15159](mewyse.js:15159).
- [ ] **4.8 `_sanitizeStyle`: bypass de `url(` con escapes CSS** (`u\72 l(...)`). Normalizar antes de comparar.
  → [mewyse.js:15208](mewyse.js:15208).

---

## Fase 5 — CSS (MEDIO/limpieza) 🟡🔵

- [ ] **5.1 Dark mode roto en TODOS los modales** (`.mewyse-modal-container`, summary): cuelgan de `body`
  y no cumplen los selectores dark → aparecen en claro. → [mewyse.css:2944](mewyse.css:2944), [mewyse.css:2295](mewyse.css:2295).
- [ ] **5.2 `@keyframes fadeIn` duplicado y contradictorio** (la 2ª anula el deslizamiento). `slideUp`
  también duplicado. → [mewyse.css:1354](mewyse.css:1354), [mewyse.css:1871](mewyse.css:1871), [mewyse.css:1641](mewyse.css:1641).
- [ ] **5.3 Hardcodes de color en dark**: `#e8f0fe` ([mewyse.css:1067](mewyse.css:1067)), `#fee`/`#d33`
  ([mewyse.css:973](mewyse.css:973)), familia `#4a9eff` como 2º acento, más lista de `#ddd`/`#aaa`/`#999`/`#000`
  con variable exacta disponible. Migrar a variables `--mewyse-*`.
- [ ] **5.4 Selector dark de cita probablemente inaplicable**: `.mewyse-editor-dark .mewyse-block blockquote`
  debería ser `blockquote.mewyse-block`. → [mewyse.css:2214](mewyse.css:2214).
- [ ] **5.5 Diálogo find/replace con paleta dark propia inconsistente** (violeta). → [mewyse.css:2519](mewyse.css:2519).
- [ ] **5.6 Modo readonly pisado por estilos de contenido** (misma especificidad, gana el posterior).
  → [mewyse.css:191](mewyse.css:191) vs [mewyse.css:403](mewyse.css:403).
- [ ] **5.7 Declaraciones `color` duplicadas dentro de la misma regla** (`.mewyse-color-remove`,
  `.mewyse-modal-button-cancel`, `.mewyse-summary-button`, `.mewyse-toolbar-button`) y bloque
  `.mewyse-color-grid` que duplica reglas base. → varias, ver [mewyse.css:1531](mewyse.css:1531), [mewyse.css:1575](mewyse.css:1575).
- [ ] **5.8 Reglas muertas** (~40 líneas): `.mewyse-full`, `.mewyse-block-content`, scrollbars vacías,
  spacer RTL vacío. `.mewyse-summary-heading1/2/3` desproporciona el tooltip. → [mewyse.css:386](mewyse.css:386), [mewyse.css:1372](mewyse.css:1372), [mewyse.css:1838](mewyse.css:1838).
- [ ] **5.9 `:focus-visible` ausente en ~13 elementos interactivos** (convención del proyecto).

---

## Fase 6 — Código muerto y deduplicación (limpieza) 🔵

> Pase aparte, sin mezclar con los fixes de comportamiento.

- [ ] **6.1 Eliminar código muerto**: `createContentElement` (~290 líneas, `@deprecated`, contiene
  `document.onmousemove=`) [mewyse.js:5268](mewyse.js:5268); `showColorPicker` (~80 líneas)
  [mewyse.js:12193](mewyse.js:12193); `updateConsecutiveNumberLists` no-op y su trabajo asociado;
  `scrollHandlers`/`clearScrollHandlers`; emojis duplicados en `WYSIWYG_EMOJIS`.
- [ ] **6.2 Extraer helpers ES5 (sin cambiar comportamiento)**:
  - [ ] `_buildImageDimensionsModal(opts, onAccept)` — unifica los 4 modales de imagen (~150 líneas c/u;
    el bug 2.2 nació de esta duplicación).
  - [ ] `getHTML`/`getHTMLSource` — case table/image/video/audio idénticos (~90 líneas).
  - [ ] `_positionMenuAtCaret` / `_updateMenuSelection` — mention y emoji comparten algoritmo.
  - [ ] `_restoreCursorAtOffset(editable, offset)` — `findCursorPosition` duplicada verbatim.
  - [ ] Helper de snapshot compartido entre `pushHistory` y `undo` (y hacer que `redo` también flushee el debounce).
- [ ] **6.3 Render incremental** donde bastaría: `duplicateBlock` (`render(id)`), `moveBlock`, `deleteBlock`.
  → [mewyse.js:10452](mewyse.js:10452).
- [ ] **6.4 `_searchInEditor` recompila la regex por nodo**; reutilizar una instancia con `lastIndex=0`.
  → [mewyse.js:14899](mewyse.js:14899).

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
