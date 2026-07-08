# Plan de mejoras de meWYSE — comparativa con el mercado y roadmap

> Documento de trabajo (aprobado 2026-07-08). Deriva de comparar meWYSE con los editores WYSIWYG
> del mercado. Se desarrolla **sprint a sprint / feature a feature**; antes de implementar cada
> feature se presenta el detalle y se espera aprobación. Marca cada casilla al completarla.
>
> **Invariantes**: núcleo ES5 sin dependencias (deps solo OPCIONALES y lazy si el consumidor
> activa la feature); el modelo `this.blocks` es un **array PLANO**; el **sanitizer** `_sanitizeBlock`
> ([mewyse.js:15992](mewyse.js:15992)) es allow-list destructivo → **toda propiedad/tipo nuevo debe
> registrarse ahí o se pierde en silencio**. Checklist por bloque nuevo: `VALID_BLOCK_TYPES` →
> `createBlockElement` → `render` (si agrupa) → **`_sanitizeBlock`** → `getHTML`/`getHTMLSource`/
> `getMarkdown` → slash menu + i18n.

---

## Comparativa (resumen)

meWYSE ya cubre (paridad o mejor): bloques + JSON limpio (14 tipos), slash/@/#/emoji, formato
inline completo (incl. quitar enlace), tablas avanzadas, media (vídeo/audio/imagen), import/export
HTML·MD·JSON·texto + pegado Word, find&replace, fullscreen, show blocks, contador, RTL, outline,
temas dark/compact/custom, i18n es/en, styleFormats, listas anidadas, undo/redo, cross-block,
read-only, drag&drop, XSS.

Huecos priorizados (detalle y decisiones en el plan aprobado
`~/.claude/plans/analiza-los-editores-wysiwyg-composed-hickey.md`): autoformato Markdown en vivo,
sub/superíndice, callout, toggle, columnas, syntax highlight, fuente/tamaño/interlineado, caracteres
especiales, merge tags, imprimir/PDF/Word, autosave, TOC como bloque, salto de página.

---

## Sprint 1 — Mejoras limpias de alto ROI (bajo esfuerzo, bajo riesgo) ✅ COMPLETADO
- [x] **1.1 ✅ Subíndice / superíndice**: botones en toolbar y format menu (rama `wrapTag` →
  `_wrapSelectionInTag('sub'/'sup')` + `_persistActiveBlockContent`); cross-block vía
  `applyCrossBlockFormat('subscript'/'superscript')`; atajos `Ctrl+.`/`Ctrl+,`. Iconos + i18n.
  VERIFICADO: aplica/toggle y round-trip HTML/Markdown conservan `<sub>/<sup>`.
- [x] **1.2 ✅ Autosave / borrador**: opciones `autosave`+`autosaveKey`; debounce (~800ms) en
  `triggerChange` → `getJSON()` a localStorage (try/catch); timer cancelado en `destroy()`. API
  `hasDraft()`/`restoreDraft()` (vía sanitizer)/`clearDraft()`. NO auto-restaura.
  VERIFICADO: guarda tras el debounce, restaura vía loadFromJSON, no pisa `options.blocks`.
- [x] **1.3 ✅ Salto de página**: tipo `pageBreak` (VALID_BLOCK_TYPES + createBlockElement +
  _sanitizeBlock + getHTML/getHTMLSource/getMarkdown + slash menu + i18n + sets no-editable). Render
  `div.mewyse-page-break` con marcador visual; CSS `@media print { break-after: page }`; export HTML
  = `<div class="mewyse-page-break">`, MD = `<!-- pagebreak -->`. VERIFICADO: sobrevive al sanitizer en round-trip JSON.
- [x] **1.4 ✅ Fuente / tamaño / interlineado + caracteres especiales**: `line-height` añadido a
  `ALLOWED_CSS_PROPS` y `font-family`/`font-size`/`line-height` a `CONTENT_STYLE_PROPS` (sobreviven al
  export). Opción opt-in `fontControls` → `showFontMenu` (familia sin comillas, tamaños en lista
  cerrada, interlineado a todo el bloque) vía `_applyFontStyle`. Picker `showSpecialCharsMenu` inserta
  símbolos con `execCommand('insertText')`. VERIFICADO: los 3 estilos persisten y se exportan; el picker inserta.

## Sprint 2 — UX moderna y documentos (medio, riesgo bajo-medio)
- [ ] **2.1 Autoformato Markdown en vivo (reglas de BLOQUE)**: en `handleKeyDown`
  ([mewyse.js:9130](mewyse.js:9130)) interceptar espacio; `# ## ###`→heading, `- * +`→bullet,
  `1.`→number, `>`→quote, `[] [x]`→checklist, ` ``` `→code, `---`→divider (solo en `paragraph`).
  `preventDefault` + vaciar marcador + `changeBlockType`. Reusar rutas de atajos Ctrl+número.
- [ ] **2.2 Callout / aviso**: tipo `callout` + `calloutVariant` (set cerrado). Render
  `div.mewyse-callout` (icono no editable + div editable). Export HTML = variante como clase; MD =
  `> [!INFO]`. Registrar en `_sanitizeBlock` (patrón `alignment`).
- [ ] **2.3 Imprimir + Word .doc**: `print()` = `window.print()` + `@media print` (oculta chrome), o
  `window.open()` con `getSafeHTML()`. Word: `getSafeHTML()` en header MHTML → Blob `application/msword`
  (.doc), sin librería. Siempre desde `getSafeHTML()`.

## Sprint 3 — ERP y autoformato inline (medio, riesgo bajo-medio)
- [ ] **3.1 Merge tags / variables `{{campo}}`** (mejor encaje ERP): clonar pipeline de `tags`
  (`_renderTagCapsule` [mewyse.js:8893](mewyse.js:8893), `insertTag` [mewyse.js:9065](mewyse.js:9065)).
  Opción `mergeTags`; inserción por botón de toolbar y/o trigger `{{`. Cápsula
  `span.mewyse-mergetag[data-merge-name]`. Sanitizer: clase en `ALLOWED_SPAN_CLASSES` + `data-merge-name`
  (regex `^[\w.]+$`) en `ATTR_WHITELIST.SPAN`. Export dual: plantilla (`{{campo}}` literal) o resuelto
  (`setMergeValues(map)`).
- [ ] **3.2 Autoformato inline**: `**x**`/`*x*`/`` `x` ``/`~~x~~` al cerrar + espacio. Mutar DOM in
  situ (no render) + `updateBlockContent` + `triggerChange`; `pushHistory(true)` para undo atómico.
  Reusar regex de `markdownInlineToHtml`.
- [ ] **3.3 Export PDF**: dep **opcional lazy** (html2pdf/jsPDF) vía helper `_loadScriptOnce`;
  alimentar con `getSafeHTML()`. Fallback: `print()`.

## Sprint 4 — Mayor riesgo (medio, riesgo medio-alto)
- [ ] **4.1 Syntax highlight en código** (dep opcional lazy): opción `codeHighlight`+`codeHighlightUrl`;
  añadir `language` (set cerrado) al bloque code. **Modelo siempre texto plano**: para `type==='code'`
  leer `textContent` (no `innerHTML`), re-pintar highlight en `keyup` con debounce (los `span.token`
  nunca entran al modelo). Export `escapeHtml`+`class="language-xxx"`; MD ` ```lang `. Fallback intacto.
- [ ] **4.2 Toggle / desplegable ligero**: tipo `toggle` (`toggleTitle`+`content`+`collapsed`), render
  `<details>/<summary>`. Cuerpo inline/multilínea (no sub-bloques). Toggle multi-bloque = fuera de alcance.
- [ ] **4.3 (opcional) Tabla de contenidos como bloque**: reusar `getHeadingsIndex`; bloque TOC navegable.

## No-objetivos (justificados)
- [ ] **Columnas / layout multi-columna**: choca con el array de bloques plano; desaconsejado sin
  refactor. Alternativas: tabla sin bordes o CSS `column-count` en el export.
- **Colaboración tiempo real / comentarios / historial de versiones**: requieren backend + CRDT; fuera de alcance.
- **Corrector ortográfico**: el del navegador ya lo cubre.

---

## Verificación (por feature)
- Preview (`.claude/serve.js` :8765): sin errores de consola, correcto en claro/oscuro.
- Serialización: **round-trip** `getJSON/getHTML/getMarkdown` → `loadFrom*`; el bloque/atributo debe
  **sobrevivir al sanitizer** (fallo silencioso más probable si se omite `_sanitizeBlock`).
- Deps lazy: sin activar la opción el núcleo funciona igual (fallback); la lib se carga una sola vez.

## Ficheros
`mewyse.js` (sanitizer/whitelists, `createBlockElement`, `render`, `changeBlockType`, handlers,
export, tags, opciones; nuevo helper `_loadScriptOnce`), `mewyse.css` (callout/toggle/page-break/
merge-tag, `@media print`, tokens highlight, `.mewyse-lh-*`), `index.html` (demos), `README.md`/`CLAUDE.md`.
