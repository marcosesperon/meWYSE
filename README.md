# meWYSE — Block Editor

Editor WYSIWYG basado en bloques al estilo Notion, desarrollado en JavaScript ECMAScript 5 puro. Sin dependencias, sin build system, un solo archivo.

Autor
------

**Marcos Esperon** - [github.com/marcosesperon](https://github.com/marcosesperon)

Si este proyecto te resulta util, puedes apoyar su desarrollo:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/marcosesperon)

## Características

- **Funciona con cualquier elemento**: `textarea`, `div`, `span`, o cualquier otro elemento HTML
- **Sistema de bloques**: Cada línea es un bloque independiente que puede ser de diferentes tipos
- **12 tipos de bloques**: Párrafo, H1, H2, H3, Cita, Código, Lista con viñetas, Lista numerada, Checklist, Tabla, Imagen, Separador
- **Tablas avanzadas**: Selección de celdas, merge/unmerge, añadir/eliminar filas y columnas, redimensionar columnas, color de fondo
- **Imágenes**: Inserción desde archivo, redimensionado con drag, edición de dimensiones
- **Formato de texto enriquecido**: Menú flotante con negrita, cursiva, subrayado, tachado, enlaces, colores y alineación
- **Sistema de menciones (@)**: Escribe `@` para mencionar usuarios con autocompletado y avatares
- **Emoji picker**: Escribe `:` para insertar emojis con autocompletado
- **Menú slash (/)**: Menú contextual al estilo Notion para insertar cualquier tipo de bloque
- **Resumen y estadísticas**: Índice de navegación, conteo de palabras, caracteres, párrafos y tiempo de lectura
- **Drag & drop**: Reordena bloques arrastrando el handle flotante
- **Selección multi-bloque**: Ctrl+click y Shift+click para seleccionar, formatear o eliminar múltiples bloques
- **Undo/Redo**: Historial de hasta 50 estados con debounce
- **Exportación múltiple**: JSON, HTML, Markdown y texto plano
- **Importación Markdown**: Carga contenido desde cadenas Markdown
- **Buscar y reemplazar**: Panel flotante (`Ctrl/Cmd+F`) con navegación prev/next, case-sensitive, palabra completa y reemplazo masivo
- **Pantalla completa**: Botón en toolbar para expandir el editor a toda la ventana (Escape para salir)
- **Mostrar bloques**: Modo debug que muestra los límites y tipo de cada bloque
- **Contador persistente**: Barra inferior con palabras, caracteres y tiempo de lectura en tiempo real
- **Soporte RTL**: Direccionalidad derecha-a-izquierda para árabe, hebreo, etc.
- **Paste inteligente**: Limpieza automática de markup de Microsoft Word/Excel/Google Docs; convierte listas simuladas con viñetas a `<ul>`/`<ol>` reales; preserva bold/italic/underline inferidos de estilos inline
- **Internacionalización (i18n)**: Español, inglés y traducciones personalizadas
- **Temas**: Dark mode con auto-detección del sistema, tema compact, temas custom
- **Content Styles**: Opción para heredar estilos CSS de la página
- **Accesibilidad**: ARIA attributes, focus-visible, navegación por teclado
- **Compatible ES5**: Funciona en navegadores modernos e IE11+

## Inicio Rápido

### 1. Incluir archivos

```html
<link rel="stylesheet" href="mewyse.css">
<script src="mewyse.js"></script>
```

### 2. Crear contenedor

```html
<!-- Con textarea (ideal para formularios) -->
<textarea id="miEditor"></textarea>

<!-- Con div -->
<div id="miEditor">Contenido inicial...</div>

<!-- Con cualquier elemento -->
<span id="miEditor">Texto editable</span>
```

### 3. Inicializar

```javascript
var editor = new meWYSE({
  target: '#miEditor',
  toolbar: true,
  onChange: function(data) {
    console.log(data.html);      // HTML
    console.log(data.markdown);  // Markdown
    console.log(data.plainText); // Texto plano
    console.log(data.json);      // JSON
    console.log(data.blocks);    // Array de bloques
  }
});
```

## API

### Constructor

```javascript
new meWYSE(options)
```

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `target` | string | *requerido* | Selector CSS del elemento (`'#miEditor'`, `'.editor'`) |
| `toolbar` | boolean | `false` | Mostrar barra de herramientas superior |
| `summary` | boolean | `false` | Mostrar botón de resumen con estadísticas e índice |
| `charCounter` | boolean | `false` | Mostrar barra inferior con contador de palabras, caracteres y tiempo de lectura |
| `findReplace` | boolean | `true` | Habilitar buscar/reemplazar con atajo `Ctrl/Cmd+F` y botón en toolbar |
| `fullscreen` | boolean | `true` | Mostrar botón de pantalla completa en toolbar |
| `showBlocksToggle` | boolean | `true` | Mostrar botón de "mostrar bloques" (modo debug) en toolbar |
| `rtl` | boolean | `false` | Activar dirección derecha-a-izquierda (árabe, hebreo) |
| `theme` | string | auto | Tema: `'dark'`, `'compact'`, o cualquier nombre custom. Sin tema, auto-detecta `prefers-color-scheme` del OS |
| `contentStyles` | boolean | `true` | Inyectar estilos de contenido. Con `false`, la página define sus propios estilos |
| `lang` | string/object | `'es'` | Idioma (`'es'`, `'en'`) o objeto de traducciones personalizadas |
| `mentions` | Array | `[]` | Lista de usuarios para menciones `@` |
| `autoFocus` | boolean | `false` | Enfocar automáticamente el primer bloque al inicializar |
| `blocks` | Array | `[]` | Contenido inicial como array de bloques |
| `onChange` | Function | `function(){}` | Callback cuando cambia el contenido |

### Métodos

#### Exportar contenido

```javascript
editor.getHTML();       // HTML semántico
editor.getMarkdown();   // Markdown
editor.getPlainText();  // Texto plano
editor.getJSON();       // JSON string
```

#### Cargar contenido

```javascript
// Desde JSON
editor.loadFromJSON([
  { id: 1, type: 'heading1', content: 'Mi título' },
  { id: 2, type: 'paragraph', content: 'Mi párrafo con <b>negrita</b>' }
]);

// Desde Markdown
editor.loadFromMarkdown('# Título\n\nTexto con **negrita** y *cursiva*.');
```

#### Manipular bloques

```javascript
editor.addBlock('paragraph');        // Añadir al final
editor.addBlock('heading1', 0);      // Añadir en posición específica
editor.duplicateBlock(blockId);      // Duplicar bloque
editor.deleteBlock(blockId);         // Eliminar bloque
editor.moveBlock(fromId, toId);      // Mover bloque a posición de otro
```

#### Otros

```javascript
editor.focus();          // Enfocar el primer bloque
editor.focus(blockId);   // Enfocar un bloque específico por ID
editor.undo();           // Deshacer
editor.redo();           // Rehacer
editor.destroy();        // Destruir editor y limpiar eventos
```

### Callback onChange

El callback recibe un objeto con todas las exportaciones del contenido:

```javascript
var editor = new meWYSE({
  target: '#editor',
  onChange: function(data) {
    data.blocks;     // Array de objetos bloque
    data.html;       // '<h1>Título</h1><p>Texto...</p>'
    data.markdown;   // '# Título\n\nTexto...'
    data.plainText;  // 'Título\nTexto...'
    data.json;       // '[{"id":1,"type":"heading1",...}]'
  }
});
```

## Tipos de Bloques

| Tipo | Descripción | Trigger (menú slash) |
|------|-------------|----------------------|
| `paragraph` | Párrafo normal | `/texto` |
| `heading1` | Título nivel 1 | `/h1` |
| `heading2` | Título nivel 2 | `/h2` |
| `heading3` | Título nivel 3 | `/h3` |
| `quote` | Cita (blockquote) | `/cita` |
| `code` | Bloque de código | `/codigo` |
| `bulletList` | Lista con viñetas | `/lista` |
| `numberList` | Lista numerada | `/numerada` |
| `checklist` | Lista de tareas | `/checklist` |
| `table` | Tabla (3x3 inicial) | `/tabla` |
| `image` | Imagen desde archivo | `/imagen` |
| `divider` | Separador horizontal | `/separador` |

### Estructura de un bloque

```javascript
{
  id: 1,                    // ID único (auto-incrementado)
  type: 'paragraph',        // Tipo de bloque
  content: 'Texto <b>HTML</b>', // Contenido (HTML para texto, objeto para imágenes)
  checked: false,           // Solo checklist: estado del checkbox
  alignment: 'left'         // Opcional: 'left', 'center', 'right', 'justify'
}
```

Para bloques de imagen, `content` es un objeto:

```javascript
{
  id: 5,
  type: 'image',
  content: {
    blob: 'data:image/png;base64,...',  // Data URL de la imagen
    fileName: 'foto.png',
    width: 800,
    height: 600
  }
}
```

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd+B` | Negrita |
| `Ctrl/Cmd+I` | Cursiva |
| `Ctrl/Cmd+U` | Subrayado |
| `Ctrl/Cmd+K` | Insertar enlace |
| `Ctrl/Cmd+F` | Buscar y reemplazar |
| `Ctrl/Cmd+Z` | Deshacer |
| `Ctrl/Cmd+Y` o `Ctrl/Cmd+Shift+Z` | Rehacer |
| `Enter` | Nuevo bloque (o nueva línea en listas) |
| `Backspace` en bloque vacío | Eliminar bloque |
| `↑` al inicio del bloque | Ir al bloque anterior |
| `↓` al final del bloque | Ir al bloque siguiente |
| `/` | Abrir menú de tipos de bloque |
| `@` | Abrir menú de menciones |
| `:` | Abrir selector de emojis |
| `Escape` | Cerrar menú abierto |

## Formato de Texto

Al seleccionar texto aparece un menú flotante con:

- **Negrita** / **Cursiva** / **Subrayado** / **Tachado**
- **Enlace**: Crear hipervínculo con modal
- **Color de texto**: Selector de colores
- **Color de fondo**: Selector de colores para highlight
- **Alineación**: Izquierda, centro, derecha, justificado
- **Cambiar mayúsculas/minúsculas**: Toggle de capitalización
- **Limpiar formato**: Eliminar todo el formato inline

## Tablas

Las tablas se crean desde el menú slash (`/tabla`) o el botón de la toolbar. Características:

### Operaciones con celdas
- **Selección por rango**: Click y arrastrar para seleccionar múltiples celdas
- **Merge**: Combinar celdas seleccionadas (soporta colspan y rowspan)
- **Unmerge**: Separar una celda combinada en celdas individuales
- **Color de fondo**: Selector de color para las celdas seleccionadas

### Operaciones con filas
- Insertar fila arriba / abajo
- Duplicar fila
- Limpiar contenido de fila
- Eliminar fila

### Operaciones con columnas
- Insertar columna a la izquierda / derecha
- Duplicar columna
- Limpiar contenido de columna
- Eliminar columna

### Redimensionar columnas
- Arrastrar los bordes entre columnas para ajustar el ancho
- Botón "Resetear ancho" para volver al ancho uniforme

## Imágenes

Las imágenes se insertan desde el menú slash (`/imagen`) o el botón de la toolbar:

1. Se abre un selector de archivo
2. Modal para configurar dimensiones (ancho/alto en píxeles)
3. La imagen se inserta como bloque con redimensionado por drag
4. Click en la imagen para seleccionarla y ver el botón de edición
5. El botón de edición permite cambiar las dimensiones

Las imágenes también se pueden insertar dentro de celdas de tabla.

## Drag & Drop

Cada bloque tiene un handle flotante (icono de arrastre) que aparece al hacer hover en el lado izquierdo:

- **Arrastrar**: Click en el handle y arrastrar a otra posición
- **Click**: Abre el menú contextual del bloque (cambiar tipo, insertar, duplicar, eliminar)

La toolbar también incluye botones de **mover arriba/abajo** para reordenar el bloque con foco sin usar drag.

## Selección Multi-Bloque

Permite seleccionar y operar sobre múltiples bloques simultáneamente:

- **Arrastrar** entre bloques: Selecciona el rango de bloques
- Las operaciones disponibles sobre la selección son:
  - **Copiar** (`Ctrl/Cmd+C`)
  - **Formatear** (negrita, cursiva, etc. desde el menú flotante)
  - **Cambiar mayúsculas/minúsculas**
  - **Eliminar** (`Delete` o `Backspace`)
- **Escape**: Limpiar selección

## Undo / Redo

- Historial de hasta **50 estados** con snapshots del array de bloques
- **Debounce de 300ms** para agrupar ediciones rápidas en un solo estado
- Accesible desde toolbar (botones ⟲/⟳) o atajos de teclado

## Temas

### Dark Mode

```javascript
// Forzar dark mode
var editor = new meWYSE({ target: '#editor', theme: 'dark' });

// Auto-detección (por defecto, sin especificar theme)
var editor = new meWYSE({ target: '#editor' });
// → Detecta prefers-color-scheme del OS
// → Escucha cambios en tiempo real
```

El dark mode aplica la clase `mewyse-editor-dark` al contenedor y sobreescribe las CSS variables (colores de texto, fondos, bordes, etc.).

Los menús flotantes (slash, menciones, formato, opciones) reciben la clase `mewyse-dark` automáticamente.

### Tema Compact

```javascript
var editor = new meWYSE({ target: '#editor', theme: 'compact' });
```

Reduce padding, fuentes y espaciado. Ideal para sidebars y formularios con espacio limitado.

### Temas Custom

Cualquier valor de `theme` añade la clase `mewyse-editor-{theme}` al contenedor. Define tus propios estilos sobreescribiendo las CSS variables:

```css
.mewyse-editor-miTema {
  --mewyse-bg-primary: #fff8e1;
  --mewyse-text-primary: #3e2723;
  --mewyse-accent: #ff6f00;
}
```

## Estilos de Contenido

Por defecto, el editor inyecta estilos dinámicos para los bloques de contenido. Cada instancia usa un ID único como clase CSS para aislar los estilos entre múltiples editores en la misma página.

Con `contentStyles: false`, el editor **no inyecta ningún estilo** de contenido ni del contenedor. La página es responsable de estilizar todo:

```javascript
var editor = new meWYSE({
  target: '#miEditor',
  toolbar: true,
  contentStyles: false
});
```

```css
/* La página define sus propios estilos para el contenido del editor */
#miEditor .mewyse-editor {
  padding: 16px;
  min-height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
#miEditor h1 { font-size: 2em; color: navy; }
#miEditor h2 { font-size: 1.5em; }
#miEditor blockquote { border-left: 4px solid blue; padding: 12px; }
#miEditor pre { background: #1e293b; color: #e2e8f0; padding: 16px; }
#miEditor table { border-collapse: collapse; width: 100%; }
#miEditor td, #miEditor th { border: 1px solid #ddd; padding: 8px; }
```

Se pueden mezclar editores con y sin estilos inyectados en la misma página:

```javascript
var ed1 = new meWYSE({ target: '#a' });                        // estilos propios
var ed2 = new meWYSE({ target: '#b', contentStyles: false });   // hereda de la página
```

## Menciones (@mentions)

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  mentions: [
    { id: '1', name: 'Juan García', avatar: 'https://ejemplo.com/avatar1.jpg' },
    { id: '2', name: 'María López' },  // avatar es opcional
    { id: '3', name: 'Carlos Ruiz', avatar: 'https://ejemplo.com/avatar3.jpg' }
  ]
});
```

| Propiedad | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `id` | string | Identificador único | Sí |
| `name` | string | Nombre a mostrar | Sí |
| `avatar` | string | URL de la imagen de avatar | No |

**Uso:**
1. Escribe `@` para abrir el menú
2. Continúa escribiendo para filtrar (ej: `@ju` → "Juan García")
3. Navega con `↑` `↓` y selecciona con `Enter`
4. `Escape` para cerrar

**HTML generado:**

```html
<span class="mewyse-mention"
      data-mention-id="1"
      data-mention-name="Juan García"
      contenteditable="false">@Juan García</span>
```

## Emoji Picker

Escribe `:` seguido del nombre del emoji para abrir el selector:

1. Escribe `:` para abrir el menú
2. Continúa escribiendo para filtrar (ej: `:son` → "sonrisa")
3. Navega con `↑` `↓` y selecciona con `Enter`
4. `Escape` para cerrar

## Soporte Markdown

### Exportar

```javascript
var md = editor.getMarkdown();
// # Mi Documento
//
// Un párrafo con **negrita** y *cursiva*.
//
// > Una cita inspiradora
//
// - Item 1
// - Item 2
//
// | Nombre | Rol |
// | --- | --- |
// | Juan | Dev |
//
// ```
// var x = 1;
// ```
//
// ---
```

### Importar

```javascript
editor.loadFromMarkdown('# Título\n\nTexto con **negrita**.\n\n- Item 1\n- Item 2');
```

### Conversión de formatos inline

| Markdown | HTML generado |
|----------|---------------|
| `**texto**` | `<b>texto</b>` |
| `*texto*` | `<i>texto</i>` |
| `~~texto~~` | `<s>texto</s>` |
| `` `código` `` | `<code>código</code>` |
| `[enlace](url)` | `<a href="url">enlace</a>` |
| `- [x] tarea` | Checklist marcado |
| `- [ ] tarea` | Checklist sin marcar |
| `![alt](url)` | Bloque imagen |
| `\| a \| b \|` | Tabla |

Los estilos inline (color, background), `<u>`, `<sub>`, `<sup>` y `<mark>` se conservan como HTML crudo en el Markdown exportado.

### Round-trip

```javascript
var md = editor.getMarkdown();
editor.loadFromMarkdown(md);  // El contenido se preserva
```

## Resumen y Estadísticas

Con `summary: true`, aparece un botón (☰) en la toolbar:

- **Hover**: Tooltip con índice rápido de encabezados (H1, H2, H3)
- **Click**: Modal completo con:
  - **Estadísticas**: Palabras, caracteres, párrafos, tiempo de lectura (~200 palabras/min)
  - **Índice de navegación**: Click en cualquier heading para ir directamente

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  summary: true
});
```

## Internacionalización (i18n)

```javascript
// Español (por defecto)
var editor = new meWYSE({ target: '#editor' });

// Inglés
var editor = new meWYSE({ target: '#editor', lang: 'en' });

// Traducciones personalizadas (parcial o completo)
var editor = new meWYSE({
  target: '#editor',
  lang: {
    blockTypes: {
      paragraph: 'Paragraphe',
      heading1: 'Titre 1'
    },
    tooltips: {
      bold: 'Gras',
      italic: 'Italique'
    },
    modals: {
      cancel: 'Annuler',
      save: 'Enregistrer'
    }
  }
});
```

**Idiomas incluidos:** `'es'` (español, por defecto), `'en'` (inglés)

**Categorías de traducción:**

| Categoría | Descripción |
|-----------|-------------|
| `blockTypes` | Nombres de tipos de bloque |
| `blockTypeDescriptions` | Descripciones en el menú slash |
| `tooltips` | Tooltips de botones y controles |
| `blockMenu` | Opciones del menú contextual de bloque |
| `tableMenu` | Opciones del menú de tabla |
| `modals` | Textos de modales (imagen, enlace, resumen) |
| `summary` | Modal de resumen del documento |
| `colors` | Selector de colores |
| `placeholders` | Placeholders de campos |
| `alerts` | Mensajes de alerta |
| `misc` | Textos varios |

## Herramientas Avanzadas

### Buscar y Reemplazar

Atajo `Ctrl/Cmd+F` (o botón de la lupa en la toolbar) abre un panel flotante con:

- Campo de búsqueda con resaltado en tiempo real
- Campo de reemplazo
- Opciones: distinguir mayúsculas, palabra completa
- Navegación **↑/↓** entre coincidencias (también Shift+Enter para anterior, Enter para siguiente)
- Botones de reemplazar uno / reemplazar todos
- Contador `actual de total` o `sin resultados`

```javascript
// Habilitado por defecto. Para desactivar:
var editor = new meWYSE({
  target: '#editor',
  findReplace: false
});
```

### Pantalla Completa

Expande el editor a toda la ventana del navegador. Pulsa **Escape** para salir.

```javascript
// Habilitado por defecto. Para desactivar el botón:
var editor = new meWYSE({
  target: '#editor',
  fullscreen: false
});
```

### Mostrar Bloques (debug view)

Modo que dibuja bordes punteados alrededor de cada bloque y muestra su tipo. Útil para diseñadores, QA, o al entender la estructura de un documento.

```javascript
var editor = new meWYSE({
  target: '#editor',
  showBlocksToggle: true  // default true
});
```

### Contador de Palabras / Caracteres

Barra inferior que muestra palabras, caracteres y tiempo estimado de lectura en tiempo real.

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  charCounter: true  // default false
});
```

### Soporte RTL (derecha-a-izquierda)

Para idiomas como árabe, hebreo o urdu:

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  rtl: true,
  lang: 'ar'  // si tienes traducción al árabe
});
```

### Pegado desde Word / Excel / Google Docs

meWYSE limpia automáticamente el HTML pegado desde aplicaciones Office:

- Elimina namespaces `mso-*`, `v:*`, `w:*`, `m:*`, comentarios XML y metadatos
- Convierte párrafos simulando listas (con viñetas `·`, `•`, `o` o numeración) en `<ul>`/`<ol>` reales
- Preserva bold/italic/underline inferidos de estilos inline antes de limpiar
- Desenvuelve `<span>` y `<font>` sin atributos útiles
- Elimina párrafos vacíos y zero-width chars

## Personalización CSS

El editor usa clases CSS con prefijo `mewyse-` y CSS custom properties con prefijo `--mewyse-`.

### Clases principales

| Clase | Elemento |
|-------|----------|
| `.mewyse-editor-wrapper` | Wrapper (contiene toolbar + editor) |
| `.mewyse-editor` | Contenedor del editor |
| `.mewyse-toolbar` | Barra de herramientas |
| `.mewyse-block` | Cada bloque de contenido |
| `.mewyse-floating-handle` | Handle de arrastre flotante |
| `.mewyse-format-menu` | Menú flotante de formato |
| `.mewyse-slash-menu` | Menú slash (/) |
| `.mewyse-mention-menu` | Menú de menciones (@) |
| `.mewyse-emoji-menu` | Menú de emojis (:) |
| `.mewyse-options-menu` | Menú contextual de bloque |
| `.mewyse-table-wrapper` | Wrapper de tablas |
| `.mewyse-image-wrapper` | Wrapper de imágenes |
| `.mewyse-find-replace` | Diálogo flotante de buscar/reemplazar |
| `.mewyse-search-highlight` | Marca una coincidencia de búsqueda |
| `.mewyse-search-highlight.current` | Coincidencia actualmente seleccionada |
| `.mewyse-fullscreen` | Editor en modo pantalla completa |
| `.mewyse-show-blocks` | Modo debug con bordes visibles |
| `.mewyse-char-counter` | Barra inferior con contador |
| `.mewyse-rtl` | Editor en modo RTL |

### CSS Variables

Las variables se definen en `:root` y pueden sobreescribirse por tema:

```css
/* Principales variables disponibles */
--mewyse-text-primary      /* Color de texto principal */
--mewyse-text-secondary    /* Color de texto secundario */
--mewyse-text-muted        /* Color de texto atenuado */
--mewyse-bg-primary        /* Fondo principal */
--mewyse-bg-secondary      /* Fondo secundario (toolbar) */
--mewyse-bg-hover          /* Fondo en hover */
--mewyse-border-light      /* Color de bordes */
--mewyse-accent            /* Color de acento */
--mewyse-shadow-sm         /* Sombra pequeña */
--mewyse-shadow-md         /* Sombra mediana */
--mewyse-radius-md         /* Border radius mediano */
--mewyse-radius-xl         /* Border radius grande */
```

## Compatibilidad

- ECMAScript 5 (no requiere transpilación)
- Todos los navegadores modernos (Chrome, Firefox, Safari, Edge)
- IE11+
- No requiere build tools, bundler ni package manager

## Licencia

MIT
