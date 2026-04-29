/**
 * WYSIWYG Block Editor
 * Editor basado en bloques al estilo Notion
 * Compatible con ECMAScript 5
 */

(function(window) {
  'use strict';

  /**
   * Traducciones del editor
   */
  var WYSIWYG_TRANSLATIONS = {
    es: {
      blockTypes: {
        paragraph: 'Párrafo',
        heading1: 'Título 1',
        heading2: 'Título 2',
        heading3: 'Título 3',
        quote: 'Cita',
        code: 'Código',
        bulletList: 'Lista con viñetas',
        numberList: 'Lista numerada',
        checklist: 'Lista de tareas',
        table: 'Tabla',
        image: 'Imagen',
        divider: 'Separador',
        video: 'Vídeo',
        audio: 'Audio'
      },
      blockTypeDescriptions: {
        paragraph: 'Texto normal',
        heading1: 'Título principal',
        heading2: 'Título secundario',
        heading3: 'Título terciario',
        quote: 'Cita o nota',
        code: 'Bloque de código',
        bulletList: 'Lista simple',
        numberList: 'Lista ordenada',
        checklist: 'Tareas con checkbox',
        table: 'Tabla de datos',
        image: 'Insertar imagen',
        divider: 'Línea divisoria',
        video: 'YouTube, Vimeo o archivo .mp4',
        audio: 'Archivo de audio (mp3, ogg...)'
      },
      tooltips: {
        dragToReorder: 'Arrastrar para reordenar o hacer clic para opciones',
        changeBlockType: 'Cambiar tipo de bloque',
        insertLink: 'Insertar enlace',
        insertTable: 'Insertar tabla',
        insertImage: 'Insertar imagen',
        color: 'Color',
        bold: 'Negrita',
        italic: 'Cursiva',
        underline: 'Subrayado',
        strikethrough: 'Tachado',
        toggleCase: 'Alternar mayúsculas/minúsculas',
        alignLeft: 'Alinear izquierda',
        alignCenter: 'Alinear centro',
        alignRight: 'Alinear derecha',
        justify: 'Justificar',
        editDimensions: 'Editar dimensiones',
        dragToResize: 'Arrastrar para redimensionar',
        addRow: 'Añadir fila',
        addColumn: 'Añadir columna',
        summary: 'Resumen',
        link: 'Enlace',
        undo: 'Deshacer',
        redo: 'Rehacer',
        moveBlockUp: 'Mover bloque arriba',
        moveBlockDown: 'Mover bloque abajo',
        scrollPrev: 'Desplazar barra a la izquierda',
        scrollNext: 'Desplazar barra a la derecha',
        findReplace: 'Buscar y reemplazar',
        fullscreen: 'Pantalla completa',
        fullscreenExit: 'Salir de pantalla completa',
        showBlocks: 'Mostrar bloques',
        removeFormat: 'Limpiar formato',
        insertVideo: 'Insertar vídeo',
        insertAudio: 'Insertar audio',
        caseUpper: 'MAYÚSCULAS',
        caseLower: 'minúsculas',
        caseTitle: 'Tipo Título',
        caseSentence: 'Tipo oración',
        caseToggle: 'Invertir tipo'
      },
      blockMenu: {
        insertAbove: 'Insertar bloque arriba',
        insertBelow: 'Insertar bloque abajo',
        duplicate: 'Duplicar bloque',
        delete: 'Eliminar bloque',
        deleteMultiple: 'Eliminar {count} bloques',
        changeType: 'Cambiar tipo de bloque',
        changeTypeMultiple: 'Cambiar tipo de {count} bloques',
        resetTableWidth: 'Ajustar tabla al 100%',
        tableProperties: 'Propiedades de la tabla'
      },
      tableMenu: {
        rowOptions: 'Opciones de fila',
        columnOptions: 'Opciones de columna',
        backgroundColor: 'Color de fondo',
        insertRowAbove: 'Insertar fila arriba',
        insertRowBelow: 'Insertar fila abajo',
        duplicateRow: 'Duplicar fila',
        clearRowContent: 'Limpiar contenido',
        deleteRow: 'Eliminar fila',
        insertColumnLeft: 'Insertar columna izquierda',
        insertColumnRight: 'Insertar columna derecha',
        duplicateColumn: 'Duplicar columna',
        clearColumnContent: 'Limpiar contenido',
        deleteColumn: 'Eliminar columna',
        mergeCells: 'Combinar celdas',
        unmergeCells: 'Descombinar celda'
      },
      modals: {
        configureImageDimensions: 'Configurar dimensiones de imagen',
        editImageDimensions: 'Editar dimensiones de imagen',
        originalDimensions: 'Dimensiones originales: {width}x{height}px',
        width: 'Ancho (px):',
        height: 'Alto (px):',
        keepProportions: 'Mantener proporciones',
        insertLink: 'Insertar enlace',
        editLink: 'Editar enlace',
        url: 'URL',
        linkText: 'Texto del enlace (opcional)',
        openInNewTab: 'Abrir en nueva pestaña',
        cancel: 'Cancelar',
        insert: 'Insertar',
        save: 'Guardar',
        update: 'Actualizar',
        videoUrl: 'URL del vídeo (YouTube, Vimeo, .mp4, .webm)',
        audioUrl: 'URL del audio (mp3, ogg...)',
        insertVideoTitle: 'Insertar vídeo',
        insertAudioTitle: 'Insertar audio',
        advancedOptions: 'Opciones avanzadas',
        imageBorder: 'Borde',
        imageMargin: 'Márgenes',
        imageAlignment: 'Alineación'
      },
      summary: {
        title: 'Resumen del documento',
        words: 'Palabras:',
        characters: 'Caracteres:',
        paragraphs: 'Párrafos:',
        readingTime: 'Tiempo de lectura:',
        index: 'Índice',
        noHeadings: 'No hay encabezados en el documento'
      },
      colors: {
        textColor: 'Color de texto',
        backgroundColor: 'Color de fondo',
        removeColor: 'Remover color',
        removeTextColor: 'Remover color de texto',
        removeBackgroundColor: 'Remover color de fondo'
      },
      placeholders: {
        quote: 'Cita...',
        urlExample: 'https://ejemplo.com',
        linkTextPlaceholder: 'Texto a mostrar'
      },
      alerts: {
        cannotDeleteLastRow: 'No se puede eliminar la única fila de la tabla',
        cannotDeleteLastColumn: 'No se puede eliminar la única columna de la tabla',
        imageTooLarge: 'La imagen no puede superar {size} de peso.',
        invalidVideoUrl: 'URL de vídeo no válida. Usa YouTube, Vimeo o un archivo .mp4/.webm/.ogg.',
        invalidAudioUrl: 'URL de audio no válida. Usa un archivo .mp3/.ogg/.wav.'
      },
      misc: {
        text: 'Texto',
        addBlock: '+ Añadir bloque',
        image: 'Imagen'
      },
      findReplace: {
        title: 'Buscar y reemplazar',
        findPlaceholder: 'Buscar...',
        replacePlaceholder: 'Reemplazar con...',
        caseSensitive: 'Distinguir mayúsculas',
        wholeWord: 'Palabra completa',
        findNext: 'Siguiente',
        findPrev: 'Anterior',
        replace: 'Reemplazar',
        replaceAll: 'Reemplazar todo',
        close: 'Cerrar',
        noMatches: 'Sin resultados',
        matchesCount: '{current} de {total}',
        replacedCount: '{count} coincidencias reemplazadas'
      },
      counter: {
        words: 'Palabras',
        characters: 'Caracteres',
        readingTime: 'Lectura'
      },
      tableProperties: {
        title: 'Propiedades de la tabla',
        width: 'Ancho',
        height: 'Alto',
        cellSpacing: 'Espacio entre celdas',
        cellPadding: 'Relleno de celda',
        border: 'Borde',
        borderWidth: 'Grosor del borde',
        borderStyle: 'Estilo de borde',
        borderColor: 'Color del borde',
        alignment: 'Alineación',
        backgroundColor: 'Color de fondo',
        alignLeft: 'Izquierda',
        alignCenter: 'Centrado',
        alignRight: 'Derecha',
        styleSolid: 'Sólido',
        styleDashed: 'Discontinuo',
        styleDotted: 'Punteado',
        styleDouble: 'Doble',
        styleNone: 'Sin borde',
        unitPx: 'px',
        unitPct: '%',
        unitAuto: 'Auto',
        apply: 'Aplicar',
        cancel: 'Cancelar',
        reset: 'Restablecer'
      }
    },
    en: {
      blockTypes: {
        paragraph: 'Paragraph',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        quote: 'Quote',
        code: 'Code',
        bulletList: 'Bullet list',
        numberList: 'Numbered list',
        checklist: 'Checklist',
        table: 'Table',
        image: 'Image',
        divider: 'Divider',
        video: 'Video',
        audio: 'Audio'
      },
      blockTypeDescriptions: {
        paragraph: 'Normal text',
        heading1: 'Main heading',
        heading2: 'Secondary heading',
        heading3: 'Tertiary heading',
        quote: 'Quote or note',
        code: 'Code block',
        bulletList: 'Simple list',
        numberList: 'Ordered list',
        checklist: 'Tasks with checkbox',
        table: 'Data table',
        image: 'Insert image',
        divider: 'Dividing line',
        video: 'YouTube, Vimeo or .mp4 file',
        audio: 'Audio file (mp3, ogg...)'
      },
      tooltips: {
        dragToReorder: 'Drag to reorder or click for options',
        changeBlockType: 'Change block type',
        insertLink: 'Insert link',
        insertTable: 'Insert table',
        insertImage: 'Insert image',
        color: 'Color',
        bold: 'Bold',
        italic: 'Italic',
        underline: 'Underline',
        strikethrough: 'Strikethrough',
        toggleCase: 'Toggle uppercase/lowercase',
        alignLeft: 'Align left',
        alignCenter: 'Align center',
        alignRight: 'Align right',
        justify: 'Justify',
        editDimensions: 'Edit dimensions',
        dragToResize: 'Drag to resize',
        addRow: 'Add row',
        addColumn: 'Add column',
        summary: 'Summary',
        link: 'Link',
        undo: 'Undo',
        redo: 'Redo',
        moveBlockUp: 'Move block up',
        moveBlockDown: 'Move block down',
        scrollPrev: 'Scroll toolbar left',
        scrollNext: 'Scroll toolbar right',
        findReplace: 'Find and replace',
        fullscreen: 'Fullscreen',
        fullscreenExit: 'Exit fullscreen',
        showBlocks: 'Show blocks',
        removeFormat: 'Clear formatting',
        insertVideo: 'Insert video',
        insertAudio: 'Insert audio',
        caseUpper: 'UPPERCASE',
        caseLower: 'lowercase',
        caseTitle: 'Title Case',
        caseSentence: 'Sentence case',
        caseToggle: 'tOGGLE cASE'
      },
      blockMenu: {
        insertAbove: 'Insert block above',
        insertBelow: 'Insert block below',
        duplicate: 'Duplicate block',
        delete: 'Delete block',
        deleteMultiple: 'Delete {count} blocks',
        changeType: 'Change block type',
        changeTypeMultiple: 'Change type of {count} blocks',
        resetTableWidth: 'Fit table to 100%',
        tableProperties: 'Table properties'
      },
      tableMenu: {
        rowOptions: 'Row options',
        columnOptions: 'Column options',
        backgroundColor: 'Background color',
        insertRowAbove: 'Insert row above',
        insertRowBelow: 'Insert row below',
        duplicateRow: 'Duplicate row',
        clearRowContent: 'Clear content',
        deleteRow: 'Delete row',
        insertColumnLeft: 'Insert column left',
        insertColumnRight: 'Insert column right',
        duplicateColumn: 'Duplicate column',
        clearColumnContent: 'Clear content',
        deleteColumn: 'Delete column',
        mergeCells: 'Merge cells',
        unmergeCells: 'Unmerge cell'
      },
      modals: {
        configureImageDimensions: 'Configure image dimensions',
        editImageDimensions: 'Edit image dimensions',
        originalDimensions: 'Original dimensions: {width}x{height}px',
        width: 'Width (px):',
        height: 'Height (px):',
        keepProportions: 'Keep proportions',
        insertLink: 'Insert link',
        editLink: 'Edit link',
        url: 'URL',
        linkText: 'Link text (optional)',
        openInNewTab: 'Open in new tab',
        cancel: 'Cancel',
        insert: 'Insert',
        save: 'Save',
        update: 'Update',
        videoUrl: 'Video URL (YouTube, Vimeo, .mp4, .webm)',
        audioUrl: 'Audio URL (mp3, ogg...)',
        insertVideoTitle: 'Insert video',
        insertAudioTitle: 'Insert audio',
        advancedOptions: 'Advanced options',
        imageBorder: 'Border',
        imageMargin: 'Margin',
        imageAlignment: 'Alignment'
      },
      summary: {
        title: 'Document summary',
        words: 'Words:',
        characters: 'Characters:',
        paragraphs: 'Paragraphs:',
        readingTime: 'Reading time:',
        index: 'Index',
        noHeadings: 'No headings in the document'
      },
      colors: {
        textColor: 'Text color',
        backgroundColor: 'Background color',
        removeColor: 'Remove color',
        removeTextColor: 'Remove text color',
        removeBackgroundColor: 'Remove background color'
      },
      placeholders: {
        quote: 'Quote...',
        urlExample: 'https://example.com',
        linkTextPlaceholder: 'Display text'
      },
      alerts: {
        cannotDeleteLastRow: 'Cannot delete the only row in the table',
        cannotDeleteLastColumn: 'Cannot delete the only column in the table',
        imageTooLarge: 'Image size must not exceed {size}.',
        invalidVideoUrl: 'Invalid video URL. Use YouTube, Vimeo or a .mp4/.webm/.ogg file.',
        invalidAudioUrl: 'Invalid audio URL. Use a .mp3/.ogg/.wav file.'
      },
      misc: {
        text: 'Text',
        addBlock: '+ Add block',
        image: 'Image'
      },
      findReplace: {
        title: 'Find and replace',
        findPlaceholder: 'Find...',
        replacePlaceholder: 'Replace with...',
        caseSensitive: 'Match case',
        wholeWord: 'Whole word',
        findNext: 'Next',
        findPrev: 'Previous',
        replace: 'Replace',
        replaceAll: 'Replace all',
        close: 'Close',
        noMatches: 'No results',
        matchesCount: '{current} of {total}',
        replacedCount: '{count} matches replaced'
      },
      counter: {
        words: 'Words',
        characters: 'Characters',
        readingTime: 'Reading'
      },
      tableProperties: {
        title: 'Table properties',
        width: 'Width',
        height: 'Height',
        cellSpacing: 'Cell spacing',
        cellPadding: 'Cell padding',
        border: 'Border',
        borderWidth: 'Border width',
        borderStyle: 'Border style',
        borderColor: 'Border color',
        alignment: 'Alignment',
        backgroundColor: 'Background color',
        alignLeft: 'Left',
        alignCenter: 'Center',
        alignRight: 'Right',
        styleSolid: 'Solid',
        styleDashed: 'Dashed',
        styleDotted: 'Dotted',
        styleDouble: 'Double',
        styleNone: 'None',
        unitPx: 'px',
        unitPct: '%',
        unitAuto: 'Auto',
        apply: 'Apply',
        cancel: 'Cancel',
        reset: 'Reset'
      }
    }
  };

  /**
   * Lista de emojis para el emoji picker
   */
  var WYSIWYG_EMOJIS = [
    // Caras y emociones
    { name: 'smile', emoji: '😊', category: 'faces' },
    { name: 'smiley', emoji: '😃', category: 'faces' },
    { name: 'grin', emoji: '😁', category: 'faces' },
    { name: 'joy', emoji: '😂', category: 'faces' },
    { name: 'rofl', emoji: '🤣', category: 'faces' },
    { name: 'wink', emoji: '😉', category: 'faces' },
    { name: 'blush', emoji: '😊', category: 'faces' },
    { name: 'heart_eyes', emoji: '😍', category: 'faces' },
    { name: 'kissing', emoji: '😘', category: 'faces' },
    { name: 'thinking', emoji: '🤔', category: 'faces' },
    { name: 'neutral', emoji: '😐', category: 'faces' },
    { name: 'expressionless', emoji: '😑', category: 'faces' },
    { name: 'unamused', emoji: '😒', category: 'faces' },
    { name: 'sweat', emoji: '😅', category: 'faces' },
    { name: 'cry', emoji: '😢', category: 'faces' },
    { name: 'sob', emoji: '😭', category: 'faces' },
    { name: 'angry', emoji: '😠', category: 'faces' },
    { name: 'rage', emoji: '😡', category: 'faces' },
    { name: 'scream', emoji: '😱', category: 'faces' },
    { name: 'fearful', emoji: '😨', category: 'faces' },
    { name: 'cold_sweat', emoji: '😰', category: 'faces' },
    { name: 'disappointed', emoji: '😞', category: 'faces' },
    { name: 'relieved', emoji: '😌', category: 'faces' },
    { name: 'sunglasses', emoji: '😎', category: 'faces' },
    { name: 'nerd', emoji: '🤓', category: 'faces' },
    { name: 'confused', emoji: '😕', category: 'faces' },
    { name: 'worried', emoji: '😟', category: 'faces' },
    { name: 'hushed', emoji: '😯', category: 'faces' },
    { name: 'astonished', emoji: '😲', category: 'faces' },
    { name: 'sleeping', emoji: '😴', category: 'faces' },
    { name: 'drool', emoji: '🤤', category: 'faces' },
    { name: 'yum', emoji: '😋', category: 'faces' },
    { name: 'stuck_out_tongue', emoji: '😛', category: 'faces' },
    { name: 'crazy', emoji: '🤪', category: 'faces' },
    { name: 'money_mouth', emoji: '🤑', category: 'faces' },
    { name: 'shushing', emoji: '🤫', category: 'faces' },
    { name: 'zipper_mouth', emoji: '🤐', category: 'faces' },
    { name: 'mask', emoji: '😷', category: 'faces' },
    { name: 'sick', emoji: '🤒', category: 'faces' },
    { name: 'injured', emoji: '🤕', category: 'faces' },
    { name: 'vomit', emoji: '🤮', category: 'faces' },
    { name: 'hot', emoji: '🥵', category: 'faces' },
    { name: 'cold', emoji: '🥶', category: 'faces' },
    { name: 'dizzy', emoji: '😵', category: 'faces' },
    { name: 'exploding_head', emoji: '🤯', category: 'faces' },
    { name: 'cowboy', emoji: '🤠', category: 'faces' },
    { name: 'party', emoji: '🥳', category: 'faces' },
    { name: 'cool', emoji: '😎', category: 'faces' },
    { name: 'angel', emoji: '😇', category: 'faces' },
    { name: 'devil', emoji: '😈', category: 'faces' },
    { name: 'clown', emoji: '🤡', category: 'faces' },
    { name: 'ghost', emoji: '👻', category: 'faces' },
    { name: 'skull', emoji: '💀', category: 'faces' },
    { name: 'alien', emoji: '👽', category: 'faces' },
    { name: 'robot', emoji: '🤖', category: 'faces' },
    { name: 'poop', emoji: '💩', category: 'faces' },

    // Gestos y manos
    { name: 'thumbsup', emoji: '👍', category: 'gestures' },
    { name: 'thumbsdown', emoji: '👎', category: 'gestures' },
    { name: 'ok_hand', emoji: '👌', category: 'gestures' },
    { name: 'pinch', emoji: '🤏', category: 'gestures' },
    { name: 'victory', emoji: '✌️', category: 'gestures' },
    { name: 'crossed_fingers', emoji: '🤞', category: 'gestures' },
    { name: 'rock', emoji: '🤘', category: 'gestures' },
    { name: 'call_me', emoji: '🤙', category: 'gestures' },
    { name: 'point_left', emoji: '👈', category: 'gestures' },
    { name: 'point_right', emoji: '👉', category: 'gestures' },
    { name: 'point_up', emoji: '👆', category: 'gestures' },
    { name: 'point_down', emoji: '👇', category: 'gestures' },
    { name: 'raised_hand', emoji: '✋', category: 'gestures' },
    { name: 'wave', emoji: '👋', category: 'gestures' },
    { name: 'clap', emoji: '👏', category: 'gestures' },
    { name: 'handshake', emoji: '🤝', category: 'gestures' },
    { name: 'pray', emoji: '🙏', category: 'gestures' },
    { name: 'writing_hand', emoji: '✍️', category: 'gestures' },
    { name: 'muscle', emoji: '💪', category: 'gestures' },
    { name: 'fist', emoji: '✊', category: 'gestures' },
    { name: 'punch', emoji: '👊', category: 'gestures' },

    // Corazones y amor
    { name: 'heart', emoji: '❤️', category: 'hearts' },
    { name: 'orange_heart', emoji: '🧡', category: 'hearts' },
    { name: 'yellow_heart', emoji: '💛', category: 'hearts' },
    { name: 'green_heart', emoji: '💚', category: 'hearts' },
    { name: 'blue_heart', emoji: '💙', category: 'hearts' },
    { name: 'purple_heart', emoji: '💜', category: 'hearts' },
    { name: 'black_heart', emoji: '🖤', category: 'hearts' },
    { name: 'white_heart', emoji: '🤍', category: 'hearts' },
    { name: 'broken_heart', emoji: '💔', category: 'hearts' },
    { name: 'sparkling_heart', emoji: '💖', category: 'hearts' },
    { name: 'growing_heart', emoji: '💗', category: 'hearts' },
    { name: 'beating_heart', emoji: '💓', category: 'hearts' },
    { name: 'two_hearts', emoji: '💕', category: 'hearts' },
    { name: 'kiss', emoji: '💋', category: 'hearts' },
    { name: 'fire', emoji: '🔥', category: 'hearts' },
    { name: 'sparkles', emoji: '✨', category: 'hearts' },
    { name: 'star', emoji: '⭐', category: 'hearts' },
    { name: 'boom', emoji: '💥', category: 'hearts' },

    // Símbolos comunes
    { name: 'check', emoji: '✅', category: 'symbols' },
    { name: 'x', emoji: '❌', category: 'symbols' },
    { name: 'warning', emoji: '⚠️', category: 'symbols' },
    { name: 'no_entry', emoji: '⛔', category: 'symbols' },
    { name: 'question', emoji: '❓', category: 'symbols' },
    { name: 'exclamation', emoji: '❗', category: 'symbols' },
    { name: 'info', emoji: 'ℹ️', category: 'symbols' },
    { name: 'plus', emoji: '➕', category: 'symbols' },
    { name: 'minus', emoji: '➖', category: 'symbols' },
    { name: 'arrow_right', emoji: '➡️', category: 'symbols' },
    { name: 'arrow_left', emoji: '⬅️', category: 'symbols' },
    { name: 'arrow_up', emoji: '⬆️', category: 'symbols' },
    { name: 'arrow_down', emoji: '⬇️', category: 'symbols' },
    { name: 'refresh', emoji: '🔄', category: 'symbols' },
    { name: 'infinity', emoji: '♾️', category: 'symbols' },

    // Objetos y tecnología
    { name: 'computer', emoji: '💻', category: 'objects' },
    { name: 'phone', emoji: '📱', category: 'objects' },
    { name: 'camera', emoji: '📷', category: 'objects' },
    { name: 'bell', emoji: '🔔', category: 'objects' },
    { name: 'bulb', emoji: '💡', category: 'objects' },
    { name: 'book', emoji: '📕', category: 'objects' },
    { name: 'books', emoji: '📚', category: 'objects' },
    { name: 'memo', emoji: '📝', category: 'objects' },
    { name: 'pencil', emoji: '✏️', category: 'objects' },
    { name: 'folder', emoji: '📁', category: 'objects' },
    { name: 'calendar', emoji: '📅', category: 'objects' },
    { name: 'chart', emoji: '📊', category: 'objects' },
    { name: 'paperclip', emoji: '📎', category: 'objects' },
    { name: 'lock', emoji: '🔒', category: 'objects' },
    { name: 'unlock', emoji: '🔓', category: 'objects' },
    { name: 'key', emoji: '🔑', category: 'objects' },
    { name: 'gear', emoji: '⚙️', category: 'objects' },
    { name: 'link', emoji: '🔗', category: 'objects' },
    { name: 'alarm', emoji: '⏰', category: 'objects' },
    { name: 'hourglass', emoji: '⏳', category: 'objects' },

    // Comida y bebida
    { name: 'coffee', emoji: '☕', category: 'food' },
    { name: 'tea', emoji: '🍵', category: 'food' },
    { name: 'beer', emoji: '🍺', category: 'food' },
    { name: 'wine', emoji: '🍷', category: 'food' },
    { name: 'pizza', emoji: '🍕', category: 'food' },
    { name: 'hamburger', emoji: '🍔', category: 'food' },
    { name: 'cake', emoji: '🎂', category: 'food' },
    { name: 'cookie', emoji: '🍪', category: 'food' },
    { name: 'apple', emoji: '🍎', category: 'food' },
    { name: 'banana', emoji: '🍌', category: 'food' },

    // Naturaleza y clima
    { name: 'sun', emoji: '☀️', category: 'nature' },
    { name: 'moon', emoji: '🌙', category: 'nature' },
    { name: 'cloud', emoji: '☁️', category: 'nature' },
    { name: 'rain', emoji: '🌧️', category: 'nature' },
    { name: 'snow', emoji: '❄️', category: 'nature' },
    { name: 'rainbow', emoji: '🌈', category: 'nature' },
    { name: 'ocean', emoji: '🌊', category: 'nature' },
    { name: 'tree', emoji: '🌳', category: 'nature' },
    { name: 'flower', emoji: '🌸', category: 'nature' },
    { name: 'rose', emoji: '🌹', category: 'nature' },
    { name: 'earth', emoji: '🌍', category: 'nature' },

    // Animales
    { name: 'dog', emoji: '🐕', category: 'animals' },
    { name: 'cat', emoji: '🐈', category: 'animals' },
    { name: 'rabbit', emoji: '🐰', category: 'animals' },
    { name: 'fox', emoji: '🦊', category: 'animals' },
    { name: 'bear', emoji: '🐻', category: 'animals' },
    { name: 'panda', emoji: '🐼', category: 'animals' },
    { name: 'lion', emoji: '🦁', category: 'animals' },
    { name: 'monkey', emoji: '🐵', category: 'animals' },
    { name: 'penguin', emoji: '🐧', category: 'animals' },
    { name: 'bird', emoji: '🐦', category: 'animals' },
    { name: 'butterfly', emoji: '🦋', category: 'animals' },
    { name: 'unicorn', emoji: '🦄', category: 'animals' },

    // Transporte y viajes
    { name: 'car', emoji: '🚗', category: 'travel' },
    { name: 'airplane', emoji: '✈️', category: 'travel' },
    { name: 'rocket', emoji: '🚀', category: 'travel' },
    { name: 'ship', emoji: '🚢', category: 'travel' },
    { name: 'bike', emoji: '🚲', category: 'travel' },
    { name: 'house', emoji: '🏠', category: 'travel' },
    { name: 'office', emoji: '🏢', category: 'travel' },
    { name: 'mountain', emoji: '⛰️', category: 'travel' },
    { name: 'beach', emoji: '🏖️', category: 'travel' },

    // Actividades y deportes
    { name: 'soccer', emoji: '⚽', category: 'activities' },
    { name: 'basketball', emoji: '🏀', category: 'activities' },
    { name: 'tennis', emoji: '🎾', category: 'activities' },
    { name: 'trophy', emoji: '🏆', category: 'activities' },
    { name: 'medal', emoji: '🏅', category: 'activities' },
    { name: 'video_game', emoji: '🎮', category: 'activities' },
    { name: 'guitar', emoji: '🎸', category: 'activities' },
    { name: 'microphone', emoji: '🎤', category: 'activities' },
    { name: 'art', emoji: '🎨', category: 'activities' },
    { name: 'tada', emoji: '🎉', category: 'activities' },
    { name: 'confetti', emoji: '🎊', category: 'activities' },
    { name: 'gift', emoji: '🎁', category: 'activities' },
    { name: 'balloon', emoji: '🎈', category: 'activities' },

    // Banderas comunes
    { name: 'flag_white', emoji: '🏳️', category: 'flags' },
    { name: 'flag_checkered', emoji: '🏁', category: 'flags' },
    { name: 'es', emoji: '🇪🇸', category: 'flags' },
    { name: 'us', emoji: '🇺🇸', category: 'flags' },
    { name: 'gb', emoji: '🇬🇧', category: 'flags' },
    { name: 'fr', emoji: '🇫🇷', category: 'flags' },
    { name: 'de', emoji: '🇩🇪', category: 'flags' },
    { name: 'it', emoji: '🇮🇹', category: 'flags' },
    { name: 'jp', emoji: '🇯🇵', category: 'flags' },
    { name: 'br', emoji: '🇧🇷', category: 'flags' },
    { name: 'mx', emoji: '🇲🇽', category: 'flags' }
  ];

  /**
   * Iconos SVG del editor
   */
  var WYSIWYG_ICONS = {
    dragHandle: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="3" r="1.5"/><circle cx="10.5" cy="3" r="1.5"/><circle cx="5.5" cy="8" r="1.5"/><circle cx="10.5" cy="8" r="1.5"/><circle cx="5.5" cy="13" r="1.5"/><circle cx="10.5" cy="13" r="1.5"/></svg>',
    chevronDown: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="2,4 6,8 10,4"/></svg>',
    link: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 8.5a3 3 0 004.2.4l2-2a3 3 0 00-4.2-4.2L7.3 3.8"/><path d="M9.5 7.5a3 3 0 00-4.2-.4l-2 2a3 3 0 004.2 4.2L8.7 12.2"/></svg>',
    alignLeft: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="3" x2="14" y2="3"/><line x1="2" y1="6.5" x2="10" y2="6.5"/><line x1="2" y1="10" x2="14" y2="10"/><line x1="2" y1="13.5" x2="10" y2="13.5"/></svg>',
    alignCenter: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="3" x2="14" y2="3"/><line x1="4" y1="6.5" x2="12" y2="6.5"/><line x1="2" y1="10" x2="14" y2="10"/><line x1="4" y1="13.5" x2="12" y2="13.5"/></svg>',
    alignRight: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="3" x2="14" y2="3"/><line x1="6" y1="6.5" x2="14" y2="6.5"/><line x1="2" y1="10" x2="14" y2="10"/><line x1="6" y1="13.5" x2="14" y2="13.5"/></svg>',
    alignJustify: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="3" x2="14" y2="3"/><line x1="2" y1="6.5" x2="14" y2="6.5"/><line x1="2" y1="10" x2="14" y2="10"/><line x1="2" y1="13.5" x2="14" y2="13.5"/></svg>',
    table: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="12" height="12" rx="1"/><line x1="2" y1="6" x2="14" y2="6"/><line x1="2" y1="10" x2="14" y2="10"/><line x1="6" y1="2" x2="6" y2="14"/><line x1="10" y1="2" x2="10" y2="14"/></svg>',
    image: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="12" height="12" rx="1"/><circle cx="5.5" cy="5.5" r="1.5"/><path d="M14 10.5l-3-3L4 14"/></svg>',
    quote: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 3C2.8 4.2 2 6.2 2 8.5c0 2.5 1.5 4.5 3.5 4.5 1.4 0 2.5-1.1 2.5-2.5S6.9 8 5.5 8c-.3 0-.6 0-.9.1C4.9 6 6 4.6 7 4L5 3zm7 0c-2.2 1.2-3 3.2-3 5.5 0 2.5 1.5 4.5 3.5 4.5 1.4 0 2.5-1.1 2.5-2.5S14.9 8 13.5 8c-.3 0-.6 0-.9.1C12.9 6 14 4.6 15 4l-2-1z"/></svg>',
    bulletList: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="4" r="1.5"/><circle cx="3" cy="8" r="1.5"/><circle cx="3" cy="12" r="1.5"/><rect x="7" y="3" width="7" height="2" rx="1"/><rect x="7" y="7" width="7" height="2" rx="1"/><rect x="7" y="11" width="7" height="2" rx="1"/></svg>',
    numberList: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><text x="1" y="5.5" font-size="5" font-family="sans-serif" font-weight="bold">1</text><text x="1" y="9.5" font-size="5" font-family="sans-serif" font-weight="bold">2</text><text x="1" y="13.5" font-size="5" font-family="sans-serif" font-weight="bold">3</text><rect x="7" y="3" width="7" height="2" rx="1"/><rect x="7" y="7" width="7" height="2" rx="1"/><rect x="7" y="11" width="7" height="2" rx="1"/></svg>',
    checklist: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="12" height="12" rx="2"/><polyline points="5,8 7,10.5 11,5.5"/></svg>',
    divider: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="8" x2="14" y2="8"/></svg>',
    paragraph: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h6v1.5h-1.5V14H10V3.5H8.5V14H7V8.5C4.5 8.5 3 7 3 5.2S4.5 2 7 2z"/></svg>',
    heading1: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 3h1.5v4.5H6V3h1.5v11H6V9H2.5v5H1V3z"/><path d="M10 13V5.5L8.5 7V5.2L10.5 3H12v10h-2z"/></svg>',
    heading2: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 3h1.5v4.5H6V3h1.5v11H6V9H2.5v5H1V3z"/><path d="M9 11.5c1.2-1.5 3.5-3.2 3.5-5C12.5 5.5 12 4.8 11 4.8c-.8 0-1.4.6-1.5 1.5H8c.1-1.8 1.3-3 3-3 1.8 0 3 1.1 3 2.8 0 2.3-2.5 3.8-3.5 5.2H14V13H9v-1.5z"/></svg>',
    heading3: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 3h1.5v4.5H6V3h1.5v11H6V9H2.5v5H1V3z"/><path d="M9.5 7.5h1.3c.7 0 1.2-.5 1.2-1.1 0-.6-.5-1.1-1.2-1.1-.7 0-1.2.4-1.3 1.1H8c.1-1.5 1.3-2.6 2.8-2.6 1.6 0 2.7 1 2.7 2.3 0 .8-.5 1.5-1.2 1.8.8.3 1.4 1 1.4 2 0 1.5-1.3 2.6-2.9 2.6-1.7 0-2.9-1.1-3-2.6h1.5c.1.7.7 1.2 1.5 1.2.8 0 1.4-.5 1.4-1.3 0-.8-.6-1.3-1.5-1.3H9.5V7.5z"/></svg>',
    code: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="5,3.5 1,8 5,12.5"/><polyline points="11,3.5 15,8 11,12.5"/><line x1="9.5" y1="2" x2="6.5" y2="14"/></svg>',
    gear: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="2.5"/><path d="M8 .5V3m0 10v2.5M.5 8H3m10 0h2.5M2.1 2.1L4 4m8 8l1.9 1.9M13.9 2.1L12 4M4 12l-1.9 1.9"/></svg>',
    arrowUp: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="13" x2="8" y2="3"/><polyline points="4,7 8,3 12,7"/></svg>',
    arrowDown: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="3" x2="8" y2="13"/><polyline points="4,9 8,13 12,9"/></svg>',
    arrowLeft: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="13" y1="8" x2="3" y2="8"/><polyline points="7,4 3,8 7,12"/></svg>',
    arrowRight: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="8" x2="13" y2="8"/><polyline points="9,4 13,8 9,12"/></svg>',
    duplicate: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M2 11V3a1 1 0 011-1h8"/></svg>',
    trash: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="3,4 13,4"/><path d="M6 4V2.5h4V4"/><path d="M4 4l.8 9.5a1 1 0 001 .9h4.4a1 1 0 001-.9L12 4"/><line x1="6.5" y1="7" x2="6.5" y2="11.5"/><line x1="9.5" y1="7" x2="9.5" y2="11.5"/></svg>',
    palette: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5a6.5 6.5 0 00-1 12.9c1 .2 1.5-.5 1.5-1.2v-.8c0-1 .7-1.4 1.5-1.4h1.5a2.5 2.5 0 002.5-2.5A6.5 6.5 0 008 1.5z"/><circle cx="5" cy="6.5" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="4.5" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>',
    hamburger: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/></svg>',
    mergeCells: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="12" height="12" rx="1"/><line x1="8" y1="2" x2="8" y2="5"/><line x1="8" y1="11" x2="8" y2="14"/><polyline points="5,7 8,5 11,7"/><polyline points="5,9 8,11 11,9"/></svg>',
    unmergeCells: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="12" height="12" rx="1"/><line x1="8" y1="2" x2="8" y2="14"/><polyline points="5,6 8,3 11,6"/><polyline points="5,10 8,13 11,10"/></svg>',
    plus: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg>',
    resetWidth: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="8" x2="13" y2="8"/><polyline points="5,5.5 2,8 5,10.5"/><polyline points="11,5.5 14,8 11,10.5"/></svg>',
    undo: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="4,7 2,5 4,3"/><path d="M2,5 H10 A4,4 0 0 1 10,13 H6"/></svg>',
    redo: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="12,7 14,5 12,3"/><path d="M14,5 H6 A4,4 0 0 0 6,13 H10"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg>',
    fullscreen: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="3,6 3,3 6,3"/><polyline points="10,3 13,3 13,6"/><polyline points="13,10 13,13 10,13"/><polyline points="6,13 3,13 3,10"/></svg>',
    fullscreenExit: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="6,3 6,6 3,6"/><polyline points="13,6 10,6 10,3"/><polyline points="10,13 10,10 13,10"/><polyline points="3,10 6,10 6,13"/></svg>',
    showBlocks: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="12" height="3" rx="0.5"/><rect x="2" y="6.5" width="12" height="3" rx="0.5"/><rect x="2" y="11" width="12" height="3" rx="0.5"/></svg>',
    removeFormat: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h9M6 3v10M5 13h4"/><line x1="11" y1="10" x2="15" y2="14"/><line x1="15" y1="10" x2="11" y2="14"/></svg>',
    video: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="10" rx="1.5"/><polygon points="6.5,6 6.5,10 10,8" fill="currentColor"/></svg>',
    audio: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 3 L9 11 a2 2 0 1 1 -2 -1.7 L7 5 L12 3.5 z"/></svg>'
  };

  /**
   * Constructor del Editor WYSIWYG
   * @param {Object} options - Configuración del editor
   * @param {string} options.target - Selector del elemento objetivo
   * @param {boolean} options.toolbar - (Opcional) Mostrar toolbar en modo minimal
   * @param {Array} options.blocks - Contenido inicial de bloques
   * @param {Function} options.onChange - Callback cuando cambia el contenido
   */
  function meWYSE(options) {
    this.options = options || {};
    this.showToolbar = this.options.toolbar === true; // Nueva opción para toolbar en modo minimal
    this.showSummary = this.options.summary === true; // Nueva opción para mostrar resumen
    this.showCharCounter = this.options.charCounter === true; // Barra inferior con contador de palabras/caracteres
    this.enableFullscreen = this.options.fullscreen !== false; // Habilitar botón fullscreen (default: true)
    this.enableFindReplace = this.options.findReplace !== false; // Habilitar Ctrl+F para buscar (default: true)
    this.enableShowBlocks = this.options.showBlocksToggle !== false; // Habilitar toggle de bloques (default: true)
    this.rtl = this.options.rtl === true; // Dirección derecha-a-izquierda
    // Comportamiento de la toolbar cuando los botones no caben en una fila.
    // 'wrap' (default) = saltan a la siguiente fila como hasta ahora.
    // 'scroll' = todos en una sola fila con scroll horizontal, gradientes en los bordes,
    // flechas de navegación, y los botones de mover bloque anclados a la derecha.
    this.toolbarOverflow = (this.options.toolbarOverflow === 'scroll') ? 'scroll' : 'wrap';
    this.pasteAsText = this.options.pasteAsText === true; // Forzar paste solo como texto plano
    // Por defecto, getHTML() escapa los 5 caracteres de entidad HTML (& < > " ')
    // en los nodos de TEXTO del contenido inline (heading, quote, paragraph,
    // ítems de lista). Es la convención de Quill: garantiza HTML siempre
    // válido aunque el contenido tuviera comillas o ampersands sin escapar.
    // `escapeHtmlEntities: false` desactiva el escape y emite el contenido tal
    // cual (comportamiento legacy).
    this.escapeHtmlEntities = this.options.escapeHtmlEntities !== false;
    // Cuando `escapeHtmlEntities` está activo, este flag adicional escapa
    // también `\` (→ `&#92;`) y todo carácter no-ASCII (charCode >= 128) como
    // referencia numérica HTML. Replica la salida de TinyMCE con
    // `entity_encoding: 'numeric'`. Útil como capa de compat para flujos que
    // venían de TinyMCE y esperaban HTML ASCII-safe. Default: true.
    this.htmlNumericEntities = this.options.htmlNumericEntities !== false;
    this.imageMaxSize = (typeof this.options.imageMaxSize === 'number' && this.options.imageMaxSize > 0)
      ? this.options.imageMaxSize : 0; // Tamaño máx. de imagen en bytes (0 = sin límite)

    // styleFormats: lista de estilos custom definidos por el consumidor.
    // Cada uno: { title, block, className }
    this.styleFormats = [];
    this._customClassWhitelist = {};
    if (Array.isArray(this.options.styleFormats)) {
      for (var sfi = 0; sfi < this.options.styleFormats.length; sfi++) {
        var sf = this.options.styleFormats[sfi];
        if (!sf || typeof sf !== 'object') continue;
        // Validar: title, block (tipo válido), className (string alfanumérico)
        if (typeof sf.title !== 'string' || !sf.title) continue;
        var validTypes = {
          paragraph: 1, heading1: 1, heading2: 1, heading3: 1,
          quote: 1, bulletList: 1, numberList: 1, checklist: 1
        };
        // Aceptar 'blockquote' como alias de 'quote' (compatibilidad TinyMCE)
        var blockType = sf.block === 'blockquote' ? 'quote' :
                        (validTypes[sf.block] ? sf.block : 'paragraph');
        if (typeof sf.className !== 'string' || !/^[a-zA-Z_][\w-]*$/.test(sf.className)) continue;
        this.styleFormats.push({
          title: sf.title,
          block: blockType,
          className: sf.className
        });
        this._customClassWhitelist[sf.className] = 1;
      }
    }

    // Estado para nuevas features
    this.isFullscreen = false;
    this.showingBlocks = false;
    this.findReplaceDialog = null;
    this.findReplaceState = null;
    this.charCounterBar = null;
    this.target = document.querySelector(this.options.target);
    this.onChange = this.options.onChange || function() {};
    this.onFocus = this.options.onFocus || function() {};
    this.onBlur = this.options.onBlur || function() {};
    this._hasFocus = false; // estado actual de foco (para evitar disparar onFocus/onBlur duplicado)
    this.currentBlockId = 0;
    this.container = null;
    // NOTA: this.blocks se asigna más abajo tras sanitizar (necesita this.currentBlockId inicializado)

    // ID único de instancia para scoping de estilos de contenido
    this.instanceId = 'mewyse-' + Math.random().toString(36).substr(2, 9);
    this._contentStyleElement = null;
    this.toolbar = null;
    this.draggedBlockId = null; // ID del bloque siendo arrastrado (reorder)
    this._draggedImage = null;  // estado del drag de imagen interna
    this.slashMenu = null;
    this.formatMenu = null;
    this.formatMenuTimeout = null;
    this.scrollHandlers = [];
    this.lastFocusedElement = null;
    this.summaryButton = null;
    this.selectedBlocks = []; // Array de IDs de bloques seleccionados
    this.lastClickedBlockId = null; // Último bloque clickeado (para Shift+Click)
    this.selectedTableCells = []; // Array de celdas de tabla seleccionadas
    this.tableCellSelectionStart = null; // Celda inicial de selección de tabla
    this.isSelectingTableCells = false; // Flag de selección de celdas en curso
    this.currentSelectionTable = null; // Tabla actual donde se está seleccionando
    this.tableCellMouseDownCell = null; // Celda donde se hizo mousedown
    this.tableCellMouseDownBlockId = null; // BlockId de la celda mousedown

    // Estado del backdrop / overlay invisible que se activa mientras hay un menú o
    // modal flotante abierto. Stack LIFO: el último abierto es el primero en cerrarse
    // al hacer click en el overlay o pulsar Escape.
    this._activeBackdropModals = [];
    this._backdropEl = null;
    this._backdropEscHandler = null;
    this._backdropMouseDownHandler = null;

    // Timestamp hasta el cual el listener de focusout NO debe disparar onBlur,
    // aunque el activeElement quede momentáneamente fuera del editor. Lo usan
    // las operaciones internas (Enter split, Backspace merge) durante las que
    // el foco transiciona entre dos contenteditable y, especialmente en móvil,
    // pasa por `body` un tick. Sin este margen, esa transición se interpreta
    // como un blur real y dispara el callback indebidamente.
    this._suppressBlurUntil = 0;

    // Variables para selección cross-block
    this.crossBlockSelection = null;       // Estado de la selección cross-block
    this.isCrossBlockSelecting = false;     // Flag: arrastrando entre bloques
    this.crossBlockSelectOrigin = null;     // { blockId, node, offset } — punto de mousedown
    this.crossBlockOverlay = null;          // Overlay de selección visual

    // Variables para el sistema de menciones (@mentions)
    this.mentions = this.options.mentions || []; // Lista de elementos mencionables
    this.mentionMenu = null; // Elemento del menu de menciones
    this.mentionMenuElement = null; // Elemento donde se abrio el menu
    this.mentionMenuBlockId = null; // ID del bloque donde se abrio el menu
    this.mentionMenuSelectedIndex = 0; // Indice seleccionado en el menu
    this.mentionMenuItems = []; // Items filtrados del menu
    this.mentionMenuRange = null; // Rango guardado para insercion con click

    // Variables para el sistema de emoji picker
    this.emojiMenu = null; // Elemento del menu de emojis
    this.emojiMenuElement = null; // Elemento donde se abrio el menu
    this.emojiMenuBlockId = null; // ID del bloque donde se abrio el menu
    this.emojiMenuSelectedIndex = 0; // Indice seleccionado en el menu
    this.emojiMenuItems = []; // Items filtrados del menu
    this.emojiMenuRange = null; // Rango guardado para insercion

    // Inicializar traducciones
    if (typeof this.options.lang === 'string') {
      this.translations = WYSIWYG_TRANSLATIONS[this.options.lang] || WYSIWYG_TRANSLATIONS.es;
    } else if (this.options.lang && typeof this.options.lang === 'object') {
      this.translations = this.mergeDeep(WYSIWYG_TRANSLATIONS.es, this.options.lang);
    } else {
      this.translations = WYSIWYG_TRANSLATIONS.es;
    }

    if (!this.target) {
      throw new Error('Target element not found');
    }

    // Sanitizar bloques iniciales contra XSS (maneja currentBlockId internamente)
    this.blocks = this._sanitizeBlocks(this.options.blocks || []);

    // Historial undo/redo
    this.history = [];
    this.historyIndex = -1;
    this.maxHistorySize = 50;
    this.isUndoRedo = false;
    this.historyDebounceTimer = null;
    this.undoButton = null;
    this.redoButton = null;
    this.moveUpButton = null;
    this.moveDownButton = null;

    // Handlers almacenados para cleanup en destroy()
    this._handleDocMouseUp = null;
    this._handleDocMouseDown = null;

    // Auto-detectar dark mode del sistema si no hay theme explícito
    if (!this.options.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.options.theme = 'dark';
    }

    // Escuchar cambios en la preferencia del sistema
    this._darkModeMediaQuery = null;
    if (!options.theme && window.matchMedia) {
      this._darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var self = this;
      this._handleDarkModeChange = function(e) {
        if (e.matches) {
          self._applyTheme('dark');
        } else {
          self._removeTheme('dark');
        }
      };
      if (this._darkModeMediaQuery.addEventListener) {
        this._darkModeMediaQuery.addEventListener('change', this._handleDarkModeChange);
      }
    }

    this.init();
    this.initFormatMenu();
  }

  /**
   * Posiciona un menú anclado a un elemento de referencia
   * @param {HTMLElement} menu - Menú a posicionar
   * @param {HTMLElement} reference - Elemento de referencia
   * @param {Object} options - Opciones de posicionamiento
   */
  meWYSE.prototype.anchorMenu = function(menu, reference, options) {
    options = options || {};
    var offsetY = options.offsetY || 5;
    var offsetX = options.offsetX || 0;
    var centerX = options.centerX || false;

    var animationFrameId = null;
    var isActive = true;

    function updatePosition() {
      if (!isActive || !menu.parentNode) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        return;
      }

      var rect = reference.getBoundingClientRect();
      var menuRect = menu.getBoundingClientRect();
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      menu.style.position = 'fixed';

      // Calcular posición vertical inicial
      var top = rect.bottom + offsetY;

      // Si el menú se sale por abajo del viewport, mostrarlo arriba del elemento
      if (top + menuRect.height > viewportHeight) {
        top = rect.top - menuRect.height - offsetY;
        // Si tampoco cabe arriba, posicionarlo lo más cerca posible del borde superior
        if (top < 0) {
          top = 10; // Margen de 10px desde arriba
        }
      }

      menu.style.top = top + 'px';

      // Calcular posición horizontal inicial
      var left;
      var transform = '';

      if (centerX) {
        left = rect.left + (rect.width / 2);
        transform = 'translateX(-50%)';

        // Verificar si se sale por la derecha
        if (left + (menuRect.width / 2) > viewportWidth) {
          left = viewportWidth - menuRect.width - 10; // 10px de margen
          transform = '';
        }
        // Verificar si se sale por la izquierda
        else if (left - (menuRect.width / 2) < 0) {
          left = 10; // 10px de margen
          transform = '';
        }
      } else {
        left = rect.left + offsetX;

        // Verificar si se sale por la derecha
        if (left + menuRect.width > viewportWidth) {
          left = viewportWidth - menuRect.width - 10; // 10px de margen
        }
        // Verificar si se sale por la izquierda
        if (left < 0) {
          left = 10; // 10px de margen
        }
      }

      menu.style.left = left + 'px';
      menu.style.transform = transform;

      // Continuar actualizando mientras el menú esté activo
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    // Posicionar inicialmente y comenzar el loop de actualización
    updatePosition();

    // Guardar la función de cancelación en el propio menú para que se pueda limpiar individualmente
    menu._cancelAnchor = function() {
      isActive = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  /**
   * Merge profundo de dos objetos (para traducciones personalizadas)
   * @param {Object} target - Objeto base
   * @param {Object} source - Objeto a mezclar
   * @returns {Object} - Objeto combinado
   */
  meWYSE.prototype.mergeDeep = function(target, source) {
    var output = {};
    var key;
    for (key in target) {
      if (target.hasOwnProperty(key)) {
        output[key] = target[key];
      }
    }
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          output[key] = this.mergeDeep(target[key] || {}, source[key]);
        } else {
          output[key] = source[key];
        }
      }
    }
    return output;
  };

  /**
   * Obtiene una traduccion por su clave
   * @param {string} key - Clave de traduccion (ej: 'blockTypes.paragraph')
   * @param {Object} replacements - Valores a reemplazar (ej: {count: 5})
   * @returns {string} - Texto traducido
   */
  meWYSE.prototype.t = function(key, replacements) {
    var keys = key.split('.');
    var value = this.translations;
    var i, j, r;

    for (i = 0; i < keys.length; i++) {
      value = value[keys[i]];
      if (value === undefined) {
        // Fallback a espanol si no existe la clave
        value = WYSIWYG_TRANSLATIONS.es;
        for (j = 0; j < keys.length; j++) {
          value = value[keys[j]];
          if (value === undefined) return key;
        }
        break;
      }
    }

    // Reemplazar placeholders {key}
    if (replacements && typeof value === 'string') {
      for (r in replacements) {
        if (replacements.hasOwnProperty(r)) {
          value = value.replace('{' + r + '}', replacements[r]);
        }
      }
    }

    return value;
  };

  /**
   * Limpia todos los handlers de scroll y animaciones
   * Ya no se usa el array scrollHandlers, cada menú gestiona su propio cancelador
   */
  meWYSE.prototype.clearScrollHandlers = function() {
    // Esta función ahora es un no-op, pero la mantenemos por compatibilidad
    // Cada menú se limpia individualmente cuando se cierra
  };

  /**
   * Inicializa el editor según el modo
   */
  meWYSE.prototype.init = function() {
    this.initDomEditor();

    // Crear el handle flotante
    this.createFloatingHandle();

    // Si no hay bloques, crear uno vacío
    if (this.blocks.length === 0) {
      // Crear bloque sin enfocar (addBlock enfoca por defecto via render(blockId))
      var block = { id: ++this.currentBlockId, type: 'paragraph', content: '' };
      this.blocks.push(block);
      this.render(this.options.autoFocus ? block.id : undefined);
    } else {
      this.render();
    }

    // Crear botón de resumen si está habilitado
    if (this.showSummary) {
      this.createSummaryButton();
    }

    // Inicializar valores del contador de palabras/caracteres
    if (this.showCharCounter) {
      this.updateCharCounter();
    }

    // Enfocar el primer bloque automáticamente solo si autoFocus está habilitado
    var self = this;
    if (this.options.autoFocus) {
      setTimeout(function() {
        self.focusFirstBlock();
      }, 100);
    }

    // Añadir listener para rastrear el último elemento enfocado
    this.container.addEventListener('focusin', function(e) {
      var target = e.target;
      // Guardar solo si es un elemento contenteditable o dentro de una celda de tabla
      if (target.getAttribute('contenteditable') === 'true' ||
          target.tagName === 'TD' ||
          target.tagName === 'TH') {
        self.lastFocusedElement = target;
        self._updateMoveButtons();
      }

      // Disparar onFocus solo cuando el foco entra al editor desde fuera
      // (no cuando se mueve entre bloques internamente)
      if (!self._hasFocus) {
        self._hasFocus = true;
        self._fireFocusCallback(target);
      }
    });

    // focusout: detectar cuando el foco sale del editor a algún elemento externo.
    // Si tras el evento el nuevo activeElement está dentro del container o de
    // cualquier UI del editor (toolbar, menús flotantes, modales), el foco solo
    // se movió internamente y no hay que disparar onBlur.
    //
    // Las operaciones internas que mueven el foco entre contenteditables
    // (Enter, Backspace merge) levantan `_suppressBlurUntil`: durante esa
    // ventana, si activeElement quedó momentáneamente en body (típico en móvil
    // entre un focusout y el focusin del nuevo elemento), reintentamos hasta
    // que la ventana se cierra antes de decidir si fue un blur real.
    this.container.addEventListener('focusout', function(e) {
      function check() {
        if (!self.container) return;

        // Si seguimos dentro de la ventana de supresión, reprogramar para
        // re-chequear cuando termine. El foco interno suele asentarse antes.
        var now = Date.now();
        if (now < self._suppressBlurUntil) {
          setTimeout(check, self._suppressBlurUntil - now + 10);
          return;
        }

        var active = document.activeElement;
        if (!active || active === document.body) {
          if (self._hasFocus) {
            self._hasFocus = false;
            self._fireBlurCallback(e.target);
          }
          return;
        }

        if (self._isPartOfEditorUI(active)) return;

        if (self._hasFocus) {
          self._hasFocus = false;
          self._fireBlurCallback(e.target);
        }
      }
      setTimeout(check, 0);
    });

    // Añadir listener para deseleccionar imagen al hacer clic fuera
    this.container.addEventListener('click', function(e) {
      // Si se hace clic fuera de una imagen seleccionada, deseleccionarla
      if (self.selectedImage && !e.target.classList.contains('mewyse-image')) {
        self.deselectImage();
      }
    });

    // Añadir listener global para finalizar selección de celdas de tabla
    this._handleDocMouseUp = function(e) {
      // Limpiar estado de mousedown
      self.tableCellMouseDownCell = null;
      self.tableCellMouseDownBlockId = null;

      if (self.isSelectingTableCells) {
        self.endTableCellSelection(self.currentSelectionBlockId);
      }
    };
    document.addEventListener('mouseup', this._handleDocMouseUp);

    // Limpiar selección de celdas al hacer clic fuera de la tabla
    this._handleDocMouseDown = function(e) {
      if (self.selectedTableCells.length > 0) {
        var clickedCell = e.target.closest('td, th');
        var clickedMenu = e.target.closest('.mewyse-cell-menu');
        if (!clickedCell && !clickedMenu) {
          self.clearTableCellSelection();
        }
      }
    };
    document.addEventListener('mousedown', this._handleDocMouseDown);

    // Snapshot inicial del historial
    this.pushHistory(true);
  };

  /**
   * Enfoca el primer bloque del editor
   */
  meWYSE.prototype.focusFirstBlock = function() {
    // Solo enfocar el primer bloque si el documento no tiene ningún elemento enfocado
    if (document.activeElement === document.body || document.activeElement === null) {
      if (this.blocks.length > 0) {
        var firstBlockElement = this.container.querySelector('[data-block-id="' + this.blocks[0].id + '"]');
        if (firstBlockElement) {
          var contentEditable = firstBlockElement.querySelector('[contenteditable="true"]');
          if (!contentEditable && firstBlockElement.contentEditable === 'true') {
            contentEditable = firstBlockElement;
          }
          if (contentEditable) {
            contentEditable.focus();
          }
        }
      }
    }
  };

  /**
   * Obtiene el elemento DOM de un bloque por su ID
   * @param {number} blockId - ID del bloque
   * @returns {HTMLElement|null}
   */
  meWYSE.prototype.getBlockElementById = function(blockId) {
    return this.container.querySelector('[data-block-id="' + blockId + '"]');
  };

  /**
   * Obtiene el elemento editable de un bloque
   * @param {HTMLElement} blockElement - Elemento del bloque
   * @returns {HTMLElement|null}
   */
  meWYSE.prototype.getEditableElement = function(blockElement) {
    if (!blockElement) return null;

    // Si el bloque mismo es editable, devolverlo
    if (blockElement.contentEditable === 'true') {
      return blockElement;
    }

    // Buscar elemento editable dentro (para code, table, checklist, etc.)
    var editable = blockElement.querySelector('[contenteditable="true"]');
    return editable;
  };

  /**
   * Enfoca un nuevo bloque recien creado
   * @param {HTMLElement} blockElement - Elemento del bloque
   */
  meWYSE.prototype.focusNewBlock = function(blockElement) {
    if (!blockElement) return;
    // El handler de Enter hace su propio focus síncrono (necesario para no
    // perder el teclado virtual en móvil) y nos pide saltarnos esta versión
    // asíncrona, que dispararía un re-focus fuera del gesto del usuario.
    if (this._skipAutoFocus) return;

    // Buscar el elemento editable dentro del bloque o el bloque mismo si es editable
    var contentEditable = blockElement.querySelector('[contenteditable="true"]');
    if (!contentEditable && blockElement.contentEditable === 'true') {
      contentEditable = blockElement;
    }

    if (contentEditable) {
      setTimeout(function() {
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              var sel = window.getSelection();
              sel.removeAllRanges();

              contentEditable.focus();

              if (document.activeElement !== contentEditable) {
                contentEditable.focus();
              }

              try {
                var range = document.createRange();
                if (contentEditable.childNodes.length === 0) {
                  range.setStart(contentEditable, 0);
                } else if (contentEditable.firstChild.nodeType === 3) {
                  range.setStart(contentEditable.firstChild, 0);
                } else {
                  range.setStart(contentEditable, 0);
                }
                range.collapse(true);
                sel.addRange(range);
              } catch(e) {}
            });
          });
        });
      }, 10);
    }
  };

  /**
   * Inicializa el DOM para el editor
   */
  meWYSE.prototype.initDomEditor = function() {
    // Si el target no es un textarea, crear uno interno
    if (this.target.tagName !== 'TEXTAREA') {
      this.originalTarget = this.target;

      // Crear textarea interno oculto
      var internalTextarea = document.createElement('textarea');
      internalTextarea.style.display = 'none';

      // Copiar contenido del elemento original
      internalTextarea.value = this.originalTarget.textContent || this.originalTarget.innerText || '';

      // Insertar el textarea justo después del elemento original
      this.originalTarget.parentNode.insertBefore(internalTextarea, this.originalTarget.nextSibling);

      // Ocultar el elemento original
      this.originalTarget.style.display = 'none';

      // Usar el textarea interno como target
      this.target = internalTextarea;
    }

    // Ocultar textarea (original o interno)
    this.target.style.display = 'none';

    // Si se solicita toolbar, crear un wrapper
    if (this.showToolbar) {
      var editorWrapper = document.createElement('div');
      editorWrapper.className = 'mewyse-editor-wrapper';
      if (this.options.theme) {
        editorWrapper.classList.add('mewyse-editor-' + this.options.theme);
      }
      if (this.rtl) {
        editorWrapper.classList.add('mewyse-rtl');
        editorWrapper.setAttribute('dir', 'rtl');
      }
      this.editorWrapper = editorWrapper;

      // Crear y añadir toolbar
      this.toolbar = this.createToolbar();
      editorWrapper.appendChild(this.toolbar);

      // Crear contenedor del editor
      this.container = document.createElement('div');
      this.container.className = 'mewyse-editor mewyse-minimal ' + this.instanceId;
      this.container.setAttribute('role', 'textbox');
      this.container.setAttribute('aria-multiline', 'true');
      if (this.options.theme) {
        this.container.classList.add('mewyse-editor-' + this.options.theme);
      }
      if (this.rtl) {
        this.container.classList.add('mewyse-rtl');
        this.container.setAttribute('dir', 'rtl');
      }
      editorWrapper.appendChild(this.container);

      // Barra de contador de palabras/caracteres (opcional)
      if (this.showCharCounter) {
        this.charCounterBar = this.createCharCounterBar();
        editorWrapper.appendChild(this.charCounterBar);
      }

      // Insertar el wrapper después del textarea
      this.target.parentNode.insertBefore(editorWrapper, this.target.nextSibling);
    } else {
      // Sin toolbar: comportamiento original
      this.container = document.createElement('div');
      this.container.className = 'mewyse-editor mewyse-minimal ' + this.instanceId;
      this.container.setAttribute('role', 'textbox');
      this.container.setAttribute('aria-multiline', 'true');
      if (this.options.theme) {
        this.container.classList.add('mewyse-editor-' + this.options.theme);
      }
      if (this.rtl) {
        this.container.classList.add('mewyse-rtl');
        this.container.setAttribute('dir', 'rtl');
      }
      this.target.parentNode.insertBefore(this.container, this.target.nextSibling);

      // Barra de contador sin toolbar: se añade debajo del container
      if (this.showCharCounter) {
        this.charCounterBar = this.createCharCounterBar();
        this.container.parentNode.insertBefore(this.charCounterBar, this.container.nextSibling);
      }
    }

    // Inyectar estilos de contenido si la opción lo permite (por defecto: true)
    if (this.options.contentStyles !== false) {
      this._injectContentStyles();
    }

    // Cargar contenido del textarea si existe
    if (this.target.value) {
      this.loadFromText(this.target.value);
    }

    // Habilitar drag & drop de imágenes sobre el editor
    this._attachImageDropHandlers();
  };

  /**
   * Habilita drag & drop de archivos de imagen sobre el container del editor.
   * No interfiere con el drag de bloques (distintos tipos en dataTransfer).
   */
  meWYSE.prototype._attachImageDropHandlers = function() {
    var self = this;
    if (!this.container) return;

    var hasImageFile = function(dt) {
      if (!dt) return false;
      // types puede ser un DOMStringList o array
      if (dt.types && dt.types.length) {
        for (var i = 0; i < dt.types.length; i++) {
          if (dt.types[i] === 'Files') return true;
        }
      }
      return false;
    };

    this._imageDragEnterHandler = function(e) {
      // Aceptar tanto archivos OS como imágenes internas arrastradas
      if (hasImageFile(e.dataTransfer) || self._draggedImage) {
        e.preventDefault();
        self.container.classList.add('mewyse-image-drop-target');
      }
    };
    this._imageDragOverHandler = function(e) {
      if (hasImageFile(e.dataTransfer)) {
        e.preventDefault();
        try { e.dataTransfer.dropEffect = 'copy'; } catch (err) {}
      } else if (self._draggedImage) {
        e.preventDefault();
        try { e.dataTransfer.dropEffect = 'move'; } catch (err) {}
      }
    };
    this._imageDragLeaveHandler = function(e) {
      // Solo quitar la clase si el leave es fuera del container (no a un hijo)
      if (e.target === self.container) {
        self.container.classList.remove('mewyse-image-drop-target');
      }
    };
    this._imageDropHandler = function(e) {
      // Caso 1: imagen interna arrastrada a un bloque (no celda)
      if (self._draggedImage) {
        // Si el drop ocurre dentro de una celda, dejarlo al handler de la celda
        var cellTarget = e.target && e.target.closest ? e.target.closest('td, th') : null;
        if (cellTarget) return; // el handler de la celda se encarga

        var targetBlockEl = e.target && e.target.closest ? e.target.closest('[data-block-id]') : null;
        if (!targetBlockEl) return;

        e.preventDefault();
        e.stopPropagation();
        self.container.classList.remove('mewyse-image-drop-target');
        self._dropImageIntoBlock(targetBlockEl);
        return;
      }

      // Caso 2: archivos OS (comportamiento existente)
      if (!hasImageFile(e.dataTransfer)) return;
      var files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      // Solo procesar si al menos un archivo es imagen
      var imageFile = null;
      for (var i = 0; i < files.length; i++) {
        if (files[i].type && files[i].type.indexOf('image/') === 0) {
          imageFile = files[i];
          break;
        }
      }
      if (!imageFile) return;

      e.preventDefault();
      e.stopPropagation();
      self.container.classList.remove('mewyse-image-drop-target');

      // Calcular insertIndex: después del bloque sobre el que se soltó, o al final
      var insertIndex = self.blocks.length;
      var targetBlock = e.target && e.target.closest ? e.target.closest('[data-block-id]') : null;
      if (targetBlock) {
        var blockId = parseInt(targetBlock.getAttribute('data-block-id'), 10);
        if (!isNaN(blockId)) {
          insertIndex = self.getBlockIndex(blockId) + 1;
        }
      }

      self._processImageFile(imageFile, function(imgData) {
        if (!imgData) return;
        self.createImageBlock(imageFile, imgData.blob, imgData.width, imgData.height, insertIndex);
      });
    };

    this.container.addEventListener('dragenter', this._imageDragEnterHandler);
    this.container.addEventListener('dragover', this._imageDragOverHandler);
    this.container.addEventListener('dragleave', this._imageDragLeaveHandler);
    this.container.addEventListener('drop', this._imageDropHandler);
  };

  /**
   * Crea el handle flotante que se posiciona junto al bloque activo
   */
  meWYSE.prototype.createFloatingHandle = function() {
    var self = this;

    // Crear el contenedor del handle flotante
    this.floatingHandle = document.createElement('div');
    this.floatingHandle.className = 'mewyse-floating-handle';

    // Crear el boton handle
    var handle = document.createElement('button');
    handle.className = 'mewyse-handle';
    handle.innerHTML = WYSIWYG_ICONS.dragHandle;
    handle.title = this.t('tooltips.dragToReorder');
    handle.setAttribute('aria-label', this.t('tooltips.dragToReorder'));
    handle.draggable = true;

    // Click para mostrar menu
    handle.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (self.currentFloatingBlockId) {
        self.showBlockOptionsMenu(self.currentFloatingBlockId, handle);
      }
    };

    // Eventos de arrastre
    handle.ondragstart = function(e) {
      if (!self.currentFloatingBlockId) return;
      e.stopPropagation();
      var blockElement = self.getBlockElementById(self.currentFloatingBlockId);
      if (blockElement) {
        blockElement.classList.add('dragging');
      }
      self.draggedBlockId = self.currentFloatingBlockId;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', self.currentFloatingBlockId);
    };

    handle.ondragend = function(e) {
      e.stopPropagation();
      self.draggedBlockId = null;
      // Limpiar todos los indicadores de drag-over
      var allBlocks = self.container.querySelectorAll('.mewyse-block');
      for (var i = 0; i < allBlocks.length; i++) {
        allBlocks[i].classList.remove('dragging');
        allBlocks[i].classList.remove('drag-over');
      }
    };

    this.floatingHandle.appendChild(handle);

    // Eventos del handle flotante para mantenerlo visible mientras se interactúa
    this.floatingHandle.addEventListener('mouseenter', function() {
      // Cancelar cualquier timeout de ocultación pendiente
      if (self.floatingHandleHideTimeout) {
        clearTimeout(self.floatingHandleHideTimeout);
        self.floatingHandleHideTimeout = null;
      }
    });

    this.floatingHandle.addEventListener('mouseleave', function(e) {
      // Al salir del handle, verificar si vamos a un bloque
      var relatedTarget = e.relatedTarget;
      var goingToBlock = relatedTarget && (
        relatedTarget.classList.contains('mewyse-block') ||
        relatedTarget.closest('.mewyse-block')
      );
      if (!goingToBlock) {
        self.hideFloatingHandle();
      }
    });

    // Insertar el handle en el contenedor padre del editor
    var editorWrapper = this.container.parentNode;
    editorWrapper.style.position = 'relative';
    editorWrapper.appendChild(this.floatingHandle);

    // Variables para el posicionamiento
    this.currentFloatingBlockId = null;
    this.floatingHandleHideTimeout = null;
  };

  /**
   * Posiciona el handle flotante junto a un bloque
   * @param {HTMLElement} blockElement - Elemento del bloque
   * @param {number} blockId - ID del bloque
   */
  meWYSE.prototype.positionFloatingHandle = function(blockElement, blockId) {
    if (!this.floatingHandle || !blockElement) return;

    this.currentFloatingBlockId = blockId;

    // Obtener posicion del bloque relativa al contenedor padre
    var editorWrapper = this.container.parentNode;
    var wrapperRect = editorWrapper.getBoundingClientRect();
    var blockRect = blockElement.getBoundingClientRect();

    // Compensar padding-top del bloque para alinear con la primera linea de texto
    var paddingTop = parseFloat(window.getComputedStyle(blockElement).paddingTop) || 0;

    // Calcular posicion del handle
    var top = blockRect.top - wrapperRect.top + paddingTop;
    var left = blockRect.left - wrapperRect.left - 35; // a la izquierda del bloque

    this.floatingHandle.style.top = top + 'px';
    this.floatingHandle.style.left = Math.max(-5, left) + 'px';
    this.floatingHandle.classList.add('visible');
  };

  /**
   * Oculta el handle flotante
   */
  meWYSE.prototype.hideFloatingHandle = function() {
    // Limpiar timeout pendiente
    if (this.floatingHandleHideTimeout) {
      clearTimeout(this.floatingHandleHideTimeout);
      this.floatingHandleHideTimeout = null;
    }
    if (this.floatingHandle) {
      this.floatingHandle.classList.remove('visible');
      this.currentFloatingBlockId = null;
    }
  };

  /**
   * Crea la barra de herramientas
   */
  meWYSE.prototype.createToolbar = function() {
    var self = this;
    var toolbar = document.createElement('div');
    toolbar.className = 'mewyse-toolbar';

    // En modo 'scroll' montamos una zona desplazable (track) + zona fija a la derecha
    // con los botones de mover bloque. Los grupos se añaden al `host`, que en modo
    // 'wrap' es la propia toolbar y en modo 'scroll' es el track.
    var scrollMode = this.toolbarOverflow === 'scroll';
    var host = toolbar;
    var scrollArea = null;
    var scrollTrack = null;
    var scrollPrev = null;
    var scrollNext = null;
    if (scrollMode) {
      toolbar.classList.add('mewyse-toolbar-mode-scroll');

      scrollArea = document.createElement('div');
      scrollArea.className = 'mewyse-toolbar-scroll-area';
      if (this.rtl) scrollArea.setAttribute('dir', 'rtl');

      var fadeStart = document.createElement('div');
      fadeStart.className = 'mewyse-toolbar-fade mewyse-toolbar-fade-start';
      fadeStart.setAttribute('aria-hidden', 'true');
      scrollArea.appendChild(fadeStart);

      var fadeEnd = document.createElement('div');
      fadeEnd.className = 'mewyse-toolbar-fade mewyse-toolbar-fade-end';
      fadeEnd.setAttribute('aria-hidden', 'true');
      scrollArea.appendChild(fadeEnd);

      scrollPrev = document.createElement('button');
      scrollPrev.type = 'button';
      scrollPrev.className = 'mewyse-toolbar-scroll-arrow mewyse-toolbar-scroll-arrow-prev';
      scrollPrev.innerHTML = WYSIWYG_ICONS.arrowLeft || WYSIWYG_ICONS.chevronDown;
      scrollPrev.title = this.t('tooltips.scrollPrev');
      scrollPrev.setAttribute('aria-label', this.t('tooltips.scrollPrev'));
      scrollPrev.tabIndex = -1;
      scrollArea.appendChild(scrollPrev);

      scrollNext = document.createElement('button');
      scrollNext.type = 'button';
      scrollNext.className = 'mewyse-toolbar-scroll-arrow mewyse-toolbar-scroll-arrow-next';
      scrollNext.innerHTML = WYSIWYG_ICONS.arrowRight || WYSIWYG_ICONS.chevronDown;
      scrollNext.title = this.t('tooltips.scrollNext');
      scrollNext.setAttribute('aria-label', this.t('tooltips.scrollNext'));
      scrollNext.tabIndex = -1;
      scrollArea.appendChild(scrollNext);

      scrollTrack = document.createElement('div');
      scrollTrack.className = 'mewyse-toolbar-scroll-track';
      scrollArea.appendChild(scrollTrack);

      toolbar.appendChild(scrollArea);
      host = scrollTrack;
    }

    // Botón desplegable para tipos de bloque
    var blockTypeButton = document.createElement('button');
    blockTypeButton.className = 'mewyse-toolbar-button mewyse-toolbar-dropdown';
    blockTypeButton.innerHTML = this.t('misc.text') + ' <span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span>';
    blockTypeButton.title = this.t('tooltips.changeBlockType');
    blockTypeButton.setAttribute('aria-expanded', 'false');
    blockTypeButton.setAttribute('aria-haspopup', 'listbox');
    blockTypeButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.showToolbarBlockTypeMenu(blockTypeButton);
    };

    host.appendChild(blockTypeButton);

    // Separador
    var separator1 = document.createElement('div');
    separator1.className = 'mewyse-toolbar-separator';
    host.appendChild(separator1);

    // Grupo de undo/redo
    var undoRedoGroup = document.createElement('div');
    undoRedoGroup.className = 'mewyse-toolbar-group';

    var undoBtn = document.createElement('button');
    undoBtn.className = 'mewyse-toolbar-button';
    undoBtn.innerHTML = WYSIWYG_ICONS.undo;
    undoBtn.title = this.t('tooltips.undo');
    undoBtn.disabled = true;
    undoBtn.onclick = function(e) {
      e.preventDefault();
      self.undo();
    };
    this.undoButton = undoBtn;
    undoRedoGroup.appendChild(undoBtn);

    var redoBtn = document.createElement('button');
    redoBtn.className = 'mewyse-toolbar-button';
    redoBtn.innerHTML = WYSIWYG_ICONS.redo;
    redoBtn.title = this.t('tooltips.redo');
    redoBtn.disabled = true;
    redoBtn.onclick = function(e) {
      e.preventDefault();
      self.redo();
    };
    this.redoButton = redoBtn;
    undoRedoGroup.appendChild(redoBtn);

    host.appendChild(undoRedoGroup);

    var separator1b = document.createElement('div');
    separator1b.className = 'mewyse-toolbar-separator';
    host.appendChild(separator1b);

    // Grupo de formato de texto
    var formatGroup = document.createElement('div');
    formatGroup.className = 'mewyse-toolbar-group';

    var formatTools = [
      { action: 'bold', labelKey: 'tooltips.bold', icon: '<strong>B</strong>', command: 'bold' },
      { action: 'italic', labelKey: 'tooltips.italic', icon: '<em>I</em>', command: 'italic' },
      { action: 'underline', labelKey: 'tooltips.underline', icon: '<u>U</u>', command: 'underline' },
      { action: 'strikethrough', labelKey: 'tooltips.strikethrough', icon: '<s>S</s>', command: 'strikeThrough' },
      { action: 'caseMenu', labelKey: 'tooltips.toggleCase', icon: '<span style="font-size:13px;font-weight:600">Aa</span> <span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span>', type: 'caseMenu' },
      { action: 'removeFormat', labelKey: 'tooltips.removeFormat', icon: WYSIWYG_ICONS.removeFormat, type: 'removeFormat' }
    ];

    formatTools.forEach(function(tool) {
      var button = document.createElement('button');
      button.className = 'mewyse-toolbar-button';
      if (tool.type === 'caseMenu') button.className += ' mewyse-toolbar-dropdown';
      button.innerHTML = tool.icon;
      button.title = self.t(tool.labelKey);
      button.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (tool.type === 'caseMenu') {
          self.showCaseMenu(button);
        } else if (tool.type === 'removeFormat') {
          self.removeFormat();
        } else {
          document.execCommand(tool.command, false, null);
          self.triggerChange();
        }
      };
      formatGroup.appendChild(button);
    });

    host.appendChild(formatGroup);

    // Separador
    var separator2 = document.createElement('div');
    separator2.className = 'mewyse-toolbar-separator';
    host.appendChild(separator2);

    // Grupo de enlaces y colores
    var extrasGroup = document.createElement('div');
    extrasGroup.className = 'mewyse-toolbar-group';

    // Botón de enlace
    var linkButton = document.createElement('button');
    linkButton.className = 'mewyse-toolbar-button';
    linkButton.innerHTML = WYSIWYG_ICONS.link;
    linkButton.title = this.t('tooltips.insertLink');
    linkButton.onclick = function(e) {
      e.preventDefault();
      self.createLink();
    };
    extrasGroup.appendChild(linkButton);

    // Botón unificado de color
    var colorButton = document.createElement('button');
    colorButton.className = 'mewyse-toolbar-button';
    colorButton.innerHTML = 'A';
    colorButton.title = this.t('tooltips.color');
    colorButton.onclick = function(e) {
      e.preventDefault();
      self.showUnifiedColorPicker(colorButton);
    };
    extrasGroup.appendChild(colorButton);

    host.appendChild(extrasGroup);

    // Separador
    var separator3 = document.createElement('div');
    separator3.className = 'mewyse-toolbar-separator';
    host.appendChild(separator3);

    // Grupo de alineación
    var alignGroup = document.createElement('div');
    alignGroup.className = 'mewyse-toolbar-group';

    var alignTools = [
      { action: 'alignLeft', labelKey: 'tooltips.alignLeft', icon: WYSIWYG_ICONS.alignLeft, command: 'justifyLeft' },
      { action: 'alignCenter', labelKey: 'tooltips.alignCenter', icon: WYSIWYG_ICONS.alignCenter, command: 'justifyCenter' },
      { action: 'alignRight', labelKey: 'tooltips.alignRight', icon: WYSIWYG_ICONS.alignRight, command: 'justifyRight' },
      { action: 'alignJustify', labelKey: 'tooltips.justify', icon: WYSIWYG_ICONS.alignJustify, command: 'justifyFull' }
    ];

    alignTools.forEach(function(tool) {
      var button = document.createElement('button');
      button.className = 'mewyse-toolbar-button';
      button.innerHTML = tool.icon;
      button.title = self.t(tool.labelKey);
      button.onclick = function(e) {
        e.preventDefault();
        document.execCommand(tool.command, false, null);
        self.triggerChange();
      };
      alignGroup.appendChild(button);
    });

    host.appendChild(alignGroup);

    // Separador
    var separator4 = document.createElement('div');
    separator4.className = 'mewyse-toolbar-separator';
    host.appendChild(separator4);

    // Grupo de inserción de elementos
    var insertGroup = document.createElement('div');
    insertGroup.className = 'mewyse-toolbar-group';

    // Botón de tabla
    var tableButton = document.createElement('button');
    tableButton.className = 'mewyse-toolbar-button';
    tableButton.innerHTML = WYSIWYG_ICONS.table;
    tableButton.title = self.t('tooltips.insertTable');
    tableButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.insertTableBlock();
    };
    insertGroup.appendChild(tableButton);

    // Botón de imagen
    var imageButton = document.createElement('button');
    imageButton.className = 'mewyse-toolbar-button';
    imageButton.innerHTML = WYSIWYG_ICONS.image;
    imageButton.title = self.t('tooltips.insertImage');
    imageButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.insertImageBlock();
    };
    insertGroup.appendChild(imageButton);

    // Botón de vídeo (YouTube, Vimeo, archivo .mp4)
    var videoButton = document.createElement('button');
    videoButton.className = 'mewyse-toolbar-button';
    videoButton.innerHTML = WYSIWYG_ICONS.video;
    videoButton.title = self.t('tooltips.insertVideo');
    videoButton.setAttribute('aria-label', self.t('tooltips.insertVideo'));
    videoButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.insertVideoBlock();
    };
    insertGroup.appendChild(videoButton);

    // Botón de audio
    var audioButton = document.createElement('button');
    audioButton.className = 'mewyse-toolbar-button';
    audioButton.innerHTML = WYSIWYG_ICONS.audio;
    audioButton.title = self.t('tooltips.insertAudio');
    audioButton.setAttribute('aria-label', self.t('tooltips.insertAudio'));
    audioButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.insertAudioBlock();
    };
    insertGroup.appendChild(audioButton);

    host.appendChild(insertGroup);

    // Separador antes del grupo de vistas
    var separatorView = document.createElement('div');
    separatorView.className = 'mewyse-toolbar-separator';
    host.appendChild(separatorView);

    // Grupo de vistas/herramientas (find, showBlocks, fullscreen)
    var viewGroup = document.createElement('div');
    viewGroup.className = 'mewyse-toolbar-group';

    // Botón de Buscar y reemplazar
    if (this.enableFindReplace) {
      var findBtn = document.createElement('button');
      findBtn.className = 'mewyse-toolbar-button';
      findBtn.innerHTML = WYSIWYG_ICONS.search;
      findBtn.title = this.t('tooltips.findReplace') + ' (Ctrl+F)';
      findBtn.setAttribute('aria-label', this.t('tooltips.findReplace'));
      findBtn.onclick = function(e) {
        e.preventDefault();
        self.showFindReplace();
      };
      viewGroup.appendChild(findBtn);
    }

    // Botón de Mostrar bloques (show blocks)
    if (this.enableShowBlocks) {
      var showBlocksBtn = document.createElement('button');
      showBlocksBtn.className = 'mewyse-toolbar-button';
      showBlocksBtn.innerHTML = WYSIWYG_ICONS.showBlocks;
      showBlocksBtn.title = this.t('tooltips.showBlocks');
      showBlocksBtn.setAttribute('aria-label', this.t('tooltips.showBlocks'));
      showBlocksBtn.setAttribute('aria-pressed', 'false');
      showBlocksBtn.onclick = function(e) {
        e.preventDefault();
        self.toggleShowBlocks();
        showBlocksBtn.setAttribute('aria-pressed', self.showingBlocks ? 'true' : 'false');
        showBlocksBtn.classList.toggle('active', self.showingBlocks);
      };
      this.showBlocksButton = showBlocksBtn;
      viewGroup.appendChild(showBlocksBtn);
    }

    // Botón de Pantalla completa (fullscreen)
    if (this.enableFullscreen) {
      var fullscreenBtn = document.createElement('button');
      fullscreenBtn.className = 'mewyse-toolbar-button';
      fullscreenBtn.innerHTML = WYSIWYG_ICONS.fullscreen;
      fullscreenBtn.title = this.t('tooltips.fullscreen');
      fullscreenBtn.setAttribute('aria-label', this.t('tooltips.fullscreen'));
      fullscreenBtn.setAttribute('aria-pressed', 'false');
      fullscreenBtn.onclick = function(e) {
        e.preventDefault();
        self.toggleFullscreen();
      };
      this.fullscreenButton = fullscreenBtn;
      viewGroup.appendChild(fullscreenBtn);
    }

    if (viewGroup.children.length > 0) {
      host.appendChild(viewGroup);
    }

    // Grupo de mover bloque arriba/abajo (alineado a la derecha)
    var moveGroup = document.createElement('div');
    moveGroup.className = 'mewyse-toolbar-group';

    var moveUpBtn = document.createElement('button');
    moveUpBtn.className = 'mewyse-toolbar-button';
    moveUpBtn.innerHTML = WYSIWYG_ICONS.arrowUp;
    moveUpBtn.title = this.t('tooltips.moveBlockUp');
    moveUpBtn.setAttribute('aria-label', this.t('tooltips.moveBlockUp'));
    moveUpBtn.disabled = true;
    moveUpBtn.onclick = function(e) {
      e.preventDefault();
      self.moveBlockUp();
    };
    this.moveUpButton = moveUpBtn;
    moveGroup.appendChild(moveUpBtn);

    var moveDownBtn = document.createElement('button');
    moveDownBtn.className = 'mewyse-toolbar-button';
    moveDownBtn.innerHTML = WYSIWYG_ICONS.arrowDown;
    moveDownBtn.title = this.t('tooltips.moveBlockDown');
    moveDownBtn.setAttribute('aria-label', this.t('tooltips.moveBlockDown'));
    moveDownBtn.disabled = true;
    moveDownBtn.onclick = function(e) {
      e.preventDefault();
      self.moveBlockDown();
    };
    this.moveDownButton = moveDownBtn;
    moveGroup.appendChild(moveDownBtn);

    if (scrollMode) {
      // Zona fija a la derecha (no scrollea); contiene el grupo de mover bloque.
      var fixedEnd = document.createElement('div');
      fixedEnd.className = 'mewyse-toolbar-fixed-end';
      fixedEnd.appendChild(moveGroup);
      toolbar.appendChild(fixedEnd);

      // Guardar referencias y cablear lógica de scroll/overflow
      this._toolbarScroll = {
        area: scrollArea,
        track: scrollTrack,
        prev: scrollPrev,
        next: scrollNext
      };
      this._setupToolbarScroll();
    } else {
      // Modo wrap (default): spacer empuja el moveGroup al extremo derecho
      var spacer = document.createElement('div');
      spacer.style.flex = '1';
      toolbar.appendChild(spacer);
      toolbar.appendChild(moveGroup);
    }

    return toolbar;
  };

  /**
   * Cambia el tipo del bloque actual (donde está el cursor)
   */
  meWYSE.prototype.changeCurrentBlockType = function(type) {
    var activeElement = document.activeElement;
    var blockElement = activeElement;

    // Buscar el bloque que contiene el elemento activo
    while (blockElement && !blockElement.hasAttribute('data-block-id')) {
      blockElement = blockElement.parentElement;
    }

    if (blockElement) {
      var blockId = parseInt(blockElement.getAttribute('data-block-id'));
      this.changeBlockType(blockId, type);
    }
  };

  /**
   * Inserta un nuevo bloque de tipo tabla
   */
  meWYSE.prototype.insertTableBlock = function() {
    var activeElement = document.activeElement;
    var blockElement = activeElement;

    // Buscar el bloque que contiene el elemento activo
    while (blockElement && !blockElement.hasAttribute('data-block-id')) {
      blockElement = blockElement.parentElement;
    }

    var insertIndex = this.blocks.length; // Por defecto al final

    if (blockElement) {
      var blockId = parseInt(blockElement.getAttribute('data-block-id'));
      insertIndex = this.getBlockIndex(blockId) + 1;
    }

    // Añadir el nuevo bloque de tabla
    this.addBlock('table', insertIndex);
  };

  /**
   * Inserta un nuevo bloque de tipo imagen
   */
  meWYSE.prototype.insertImageBlock = function() {
    var self = this;

    // Usar el último elemento enfocado que guardamos antes de hacer clic en el botón
    var activeElem = this.lastFocusedElement || document.activeElement;
    var tableCellElement = null;
    var lastFocusedBlock = null;

    // Primero, verificar si el elemento enfocado está dentro de una celda de tabla
    var parent = activeElem;
    while (parent && parent !== document.body) {
      if (parent.tagName === 'TD' || parent.tagName === 'TH') {
        tableCellElement = parent;
        break;
      }
      parent = parent.parentElement;
    }

    // Si no encontramos celda, verificar si el elemento enfocado es un bloque o está dentro de uno
    if (!tableCellElement && activeElem) {
      // Verificar si es un bloque
      if (activeElem.hasAttribute('data-block-id')) {
        lastFocusedBlock = activeElem;
      } else {
        // Buscar el bloque padre más cercano
        var blockParent = activeElem;
        while (blockParent && blockParent !== document.body) {
          if (blockParent.hasAttribute('data-block-id')) {
            lastFocusedBlock = blockParent;
            break;
          }
          blockParent = blockParent.parentElement;
        }
      }
    }

    // Si aún no encontramos ningún bloque, usar el último bloque del editor
    if (!tableCellElement && !lastFocusedBlock) {
      var allBlocks = this.container.querySelectorAll('[data-block-id]');
      if (allBlocks.length > 0) {
        lastFocusedBlock = allBlocks[allBlocks.length - 1];
      }
    }

    // Calcular insertIndex para el caso fuera de tabla
    var insertIndex;
    if (lastFocusedBlock) {
      var blockId = parseInt(lastFocusedBlock.getAttribute('data-block-id'));
      insertIndex = this.getBlockIndex(blockId) + 1;
    } else {
      insertIndex = this.blocks.length;
    }

    // Usar el file input persistente (se crea lazy en _getFileInput).
    // Evita acumular inputs colgantes en el DOM y mejora fiabilidad del picker.
    var fileInput = this._getFileInput();

    // Asignar el handler al input antes de dispararlo
    fileInput.onchange = function() {
      var file = fileInput.files && fileInput.files[0];
      // Reset inmediato del valor para que el próximo click re-dispare change
      // aunque el usuario elija el mismo archivo
      fileInput.value = '';
      if (!file || !/^image\//.test(file.type)) return;
      if (!self._validateImageSize(file)) return;

      if (tableCellElement) {
        self.insertImageInTableCell(file, tableCellElement);
      } else {
        self.showImageDimensionsModal(file, insertIndex);
      }
    };

    // Disparar el file picker
    fileInput.click();
  };

  /**
   * Devuelve el input file persistente del editor (lazy). Se reusa entre clicks
   * para evitar acumulación en el DOM y problemas de compatibilidad con display:none.
   */
  meWYSE.prototype._getFileInput = function() {
    if (this._fileInput && this._fileInput.parentNode) return this._fileInput;
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    // Posicionar fuera de la pantalla (más robusto que display:none en algunos navegadores)
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    input.style.top = '-9999px';
    input.style.opacity = '0';
    input.setAttribute('aria-hidden', 'true');
    input.setAttribute('tabindex', '-1');
    document.body.appendChild(input);
    this._fileInput = input;
    return input;
  };

  /**
   * Inserta una imagen dentro de una celda de tabla
   */
  meWYSE.prototype.insertImageInTableCell = function(file, tableCell) {
    var self = this;

    // Crear el overlay del modal
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'mewyse-modal-overlay';

    var modalContainer = document.createElement('div');
    modalContainer.className = 'mewyse-modal-container';

    // Modal title
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = self.t('modals.configureImageDimensions');
    modalTitle.className = 'mewyse-modal-title';
    modalContainer.appendChild(modalTitle);

    // Leer imagen para obtener dimensiones originales
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var originalWidth = img.width;
        var originalHeight = img.height;
        var aspectRatio = originalWidth / originalHeight;

        // Vista previa
        var previewContainer = document.createElement('div');
        previewContainer.className = 'mewyse-modal-preview';
        var previewImg = document.createElement('img');
        previewImg.src = e.target.result;
        previewImg.style.maxWidth = '100%';
        previewImg.style.maxHeight = '200px';
        previewContainer.appendChild(previewImg);
        modalContainer.appendChild(previewContainer);

        // Información del archivo
        var fileInfo = document.createElement('p');
        fileInfo.className = 'mewyse-modal-info';
        fileInfo.textContent = self.t('modals.originalDimensions', { width: originalWidth, height: originalHeight });
        modalContainer.appendChild(fileInfo);

        // Inputs de ancho/alto
        var inputsContainer = document.createElement('div');
        inputsContainer.className = 'mewyse-modal-inputs';

        var widthGroup = document.createElement('div');
        widthGroup.className = 'mewyse-modal-input-group';
        var widthLabel = document.createElement('label');
        widthLabel.textContent = self.t('modals.width');
        var widthInput = document.createElement('input');
        widthInput.type = 'number';
        widthInput.value = originalWidth;
        widthInput.min = '1';
        widthInput.className = 'mewyse-modal-input';
        widthGroup.appendChild(widthLabel);
        widthGroup.appendChild(widthInput);
        inputsContainer.appendChild(widthGroup);

        var heightGroup = document.createElement('div');
        heightGroup.className = 'mewyse-modal-input-group';
        var heightLabel = document.createElement('label');
        heightLabel.textContent = self.t('modals.height');
        var heightInput = document.createElement('input');
        heightInput.type = 'number';
        heightInput.value = originalHeight;
        heightInput.min = '1';
        heightInput.className = 'mewyse-modal-input';
        heightGroup.appendChild(heightLabel);
        heightGroup.appendChild(heightInput);
        inputsContainer.appendChild(heightGroup);

        modalContainer.appendChild(inputsContainer);

        // Checkbox mantener proporciones
        var proportionsContainer = document.createElement('div');
        proportionsContainer.className = 'mewyse-modal-checkbox-group';
        var proportionsCheckbox = document.createElement('input');
        proportionsCheckbox.type = 'checkbox';
        proportionsCheckbox.checked = true;
        proportionsCheckbox.id = 'mewyse-maintain-proportions-table';
        var proportionsLabel = document.createElement('label');
        proportionsLabel.setAttribute('for', 'mewyse-maintain-proportions-table');
        proportionsLabel.textContent = self.t('modals.keepProportions');
        proportionsContainer.appendChild(proportionsCheckbox);
        proportionsContainer.appendChild(proportionsLabel);
        modalContainer.appendChild(proportionsContainer);

        // Event listeners para mantener proporciones
        widthInput.oninput = function() {
          if (proportionsCheckbox.checked) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
          }
        };

        heightInput.oninput = function() {
          if (proportionsCheckbox.checked) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
          }
        };

        // Botones
        var buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'mewyse-modal-buttons';

        var cancelButton = document.createElement('button');
        cancelButton.textContent = self.t('modals.cancel');
        cancelButton.className = 'mewyse-modal-button mewyse-modal-button-cancel';
        cancelButton.onclick = function() {
          document.body.removeChild(modalOverlay);
        };

        var insertButton = document.createElement('button');
        insertButton.textContent = self.t('modals.insert');
        insertButton.className = 'mewyse-modal-button mewyse-modal-button-primary';
        insertButton.onclick = function() {
          var width = parseInt(widthInput.value);
          var height = parseInt(heightInput.value);

          // Limpiar contenido previo de la celda
          tableCell.innerHTML = '';

          // Crear wrapper de imagen
          var imageWrapper = document.createElement('div');
          imageWrapper.className = 'mewyse-image-wrapper';

          // Crear contenedor de imagen (para controles)
          var imageContainer = document.createElement('div');
          imageContainer.className = 'mewyse-image-container';

          // Crear elemento de imagen
          var imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          imgElement.alt = file.name;
          imgElement.className = 'mewyse-image';
          imgElement.style.width = width + 'px';
          imgElement.style.height = height + 'px';
          imgElement.setAttribute('data-original-width', originalWidth);
          imgElement.setAttribute('data-original-height', originalHeight);

          // Añadir imagen al contenedor
          imageContainer.appendChild(imgElement);

          // Crear botón de edición
          var editButton = document.createElement('button');
          editButton.className = 'mewyse-image-edit-btn';
          editButton.innerHTML = WYSIWYG_ICONS.gear;
          editButton.title = self.t('tooltips.editDimensions');
          editButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.editImageInTableCell(imgElement, tableCell);
          };
          imageContainer.appendChild(editButton);

          // Crear handle de redimensionamiento
          var resizeHandle = document.createElement('div');
          resizeHandle.className = 'mewyse-image-resize-handle';
          resizeHandle.title = self.t('tooltips.dragToResize');

          // Variables para el redimensionamiento
          var isResizing = false;
          var startX, startY, startWidth;
          var cellAspectRatio = width / height;

          resizeHandle.onmousedown = function(e) {
            e.preventDefault();
            e.stopPropagation();

            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(imgElement.style.width);

            document.body.style.cursor = 'nwse-resize';
            imageContainer.classList.add('mewyse-image-resizing');
            document.body.style.userSelect = 'none';
          };

          var mouseMoveHandler = function(e) {
            if (!isResizing) return;

            var deltaX = e.clientX - startX;
            var deltaY = e.clientY - startY;
            var delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

            var newWidth = startWidth + delta;
            var newHeight = Math.round(newWidth / cellAspectRatio);

            if (newWidth < 50) {
              newWidth = 50;
              newHeight = Math.round(newWidth / cellAspectRatio);
            }

            imgElement.style.width = newWidth + 'px';
            imgElement.style.height = newHeight + 'px';
          };

          var mouseUpHandler = function(e) {
            if (!isResizing) return;

            isResizing = false;
            document.body.style.cursor = '';
            imageContainer.classList.remove('mewyse-image-resizing');
            document.body.style.userSelect = '';

            // Remover event listeners
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);

            // Actualizar el contenido de la tabla
            var tableElement = tableCell.closest('table');
            if (tableElement) {
              var tableWrapper = tableElement.closest('.mewyse-table-wrapper');
              if (tableWrapper) {
                var blockElement = tableWrapper.closest('[data-block-id]');
                if (blockElement) {
                  var blockId = parseInt(blockElement.getAttribute('data-block-id'));
                  self.updateBlockContent(blockId, tableElement.innerHTML);
                }
              }
            }

            self.triggerChange();
          };

          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler);

          imageContainer.appendChild(resizeHandle);

          // Añadir contenedor al wrapper
          imageWrapper.appendChild(imageContainer);

          // Hacer la imagen seleccionable y eliminable
          imgElement.onclick = function(e) {
            e.stopPropagation();
            self.selectImage(imgElement, null, true, tableCell);
          };

          // Marcar la imagen como dentro de tabla
          imgElement.setAttribute('data-in-table', 'true');
          imgElement.setAttribute('tabindex', '0'); // Permitir foco con teclado

          // Habilitar drag & drop para mover entre celdas/bloques
          self._attachImageDragHandlers(imgElement, { source: 'cell', tableCell: tableCell });

          // Insertar el wrapper en la celda
          tableCell.appendChild(imageWrapper);

          // Encontrar el elemento table y actualizar el bloque
          var tableElement = tableCell.closest('table');
          if (tableElement) {
            // Buscar el bloque de la tabla
            var tableWrapper = tableElement.closest('.mewyse-table-wrapper');
            if (tableWrapper) {
              var blockElement = tableWrapper.closest('[data-block-id]');
              if (blockElement) {
                var blockId = parseInt(blockElement.getAttribute('data-block-id'));
                // Actualizar el contenido del bloque con el HTML de la tabla
                self.updateBlockContent(blockId, tableElement.innerHTML);
              }
            }
          }

          // Cerrar modal
          document.body.removeChild(modalOverlay);

          // Trigger change
          self.triggerChange();
        };

        buttonsContainer.appendChild(cancelButton);
        buttonsContainer.appendChild(insertButton);
        modalContainer.appendChild(buttonsContainer);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Cerrar al hacer clic en el overlay
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    };
  };

  /**
   * Editar dimensiones de una imagen existente en una celda de tabla
   */
  meWYSE.prototype.editImageInTableCell = function(imgElement, tableCell) {
    var self = this;

    // Obtener dimensiones actuales
    var currentWidth = parseInt(imgElement.style.width) || imgElement.width;
    var currentHeight = parseInt(imgElement.style.height) || imgElement.height;
    var originalWidth = parseInt(imgElement.getAttribute('data-original-width')) || currentWidth;
    var originalHeight = parseInt(imgElement.getAttribute('data-original-height')) || currentHeight;
    var aspectRatio = originalWidth / originalHeight;

    // Crear el overlay del modal
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'mewyse-modal-overlay';

    var modalContainer = document.createElement('div');
    modalContainer.className = 'mewyse-modal-container';

    // Modal title
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = self.t('modals.editImageDimensions');
    modalTitle.className = 'mewyse-modal-title';
    modalContainer.appendChild(modalTitle);

    // Vista previa
    var previewContainer = document.createElement('div');
    previewContainer.className = 'mewyse-modal-preview';
    var previewImg = document.createElement('img');
    previewImg.src = imgElement.src;
    previewImg.style.maxWidth = '100%';
    previewImg.style.maxHeight = '200px';
    previewContainer.appendChild(previewImg);
    modalContainer.appendChild(previewContainer);

    // Información del archivo
    var fileInfo = document.createElement('p');
    fileInfo.className = 'mewyse-modal-info';
    fileInfo.textContent = self.t('modals.originalDimensions', { width: originalWidth, height: originalHeight });
    modalContainer.appendChild(fileInfo);

    // Inputs de ancho/alto
    var inputsContainer = document.createElement('div');
    inputsContainer.className = 'mewyse-modal-inputs';

    var widthGroup = document.createElement('div');
    widthGroup.className = 'mewyse-modal-input-group';
    var widthLabel = document.createElement('label');
    widthLabel.textContent = self.t('modals.width');
    var widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.value = currentWidth;
    widthInput.min = '1';
    widthInput.className = 'mewyse-modal-input';
    widthGroup.appendChild(widthLabel);
    widthGroup.appendChild(widthInput);
    inputsContainer.appendChild(widthGroup);

    var heightGroup = document.createElement('div');
    heightGroup.className = 'mewyse-modal-input-group';
    var heightLabel = document.createElement('label');
    heightLabel.textContent = self.t('modals.height');
    var heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.value = currentHeight;
    heightInput.min = '1';
    heightInput.className = 'mewyse-modal-input';
    heightGroup.appendChild(heightLabel);
    heightGroup.appendChild(heightInput);
    inputsContainer.appendChild(heightGroup);

    modalContainer.appendChild(inputsContainer);

    // Checkbox mantener proporciones
    var proportionsContainer = document.createElement('div');
    proportionsContainer.className = 'mewyse-modal-checkbox-group';
    var proportionsCheckbox = document.createElement('input');
    proportionsCheckbox.type = 'checkbox';
    proportionsCheckbox.checked = true;
    proportionsCheckbox.id = 'mewyse-maintain-proportions-edit-table';
    var proportionsLabel = document.createElement('label');
    proportionsLabel.setAttribute('for', 'mewyse-maintain-proportions-edit-table');
    proportionsLabel.textContent = self.t('modals.keepProportions');
    proportionsContainer.appendChild(proportionsCheckbox);
    proportionsContainer.appendChild(proportionsLabel);
    modalContainer.appendChild(proportionsContainer);

    // Event listeners para mantener proporciones
    widthInput.oninput = function() {
      if (proportionsCheckbox.checked) {
        heightInput.value = Math.round(widthInput.value / aspectRatio);
      }
    };

    heightInput.oninput = function() {
      if (proportionsCheckbox.checked) {
        widthInput.value = Math.round(heightInput.value * aspectRatio);
      }
    };

    // Botones
    var buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'mewyse-modal-buttons';

    var cancelButton = document.createElement('button');
    cancelButton.textContent = self.t('modals.cancel');
    cancelButton.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelButton.onclick = function() {
      document.body.removeChild(modalOverlay);
    };

    var saveButton = document.createElement('button');
    saveButton.textContent = self.t('modals.save');
    saveButton.className = 'mewyse-modal-button mewyse-modal-button-primary';
    saveButton.onclick = function() {
      var width = parseInt(widthInput.value);
      var height = parseInt(heightInput.value);

      // Actualizar dimensiones de la imagen
      imgElement.style.width = width + 'px';
      imgElement.style.height = height + 'px';

      // Encontrar el elemento table y actualizar el bloque
      var tableElement = tableCell.closest('table');
      if (tableElement) {
        var tableWrapper = tableElement.closest('.mewyse-table-wrapper');
        if (tableWrapper) {
          var blockElement = tableWrapper.closest('[data-block-id]');
          if (blockElement) {
            var blockId = parseInt(blockElement.getAttribute('data-block-id'));
            self.updateBlockContent(blockId, tableElement.innerHTML);
          }
        }
      }

      // Cerrar modal
      document.body.removeChild(modalOverlay);

      // Trigger change
      self.triggerChange();
    };

    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(saveButton);
    modalContainer.appendChild(buttonsContainer);

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Cerrar al hacer clic en el overlay
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    };
  };

  /**
   * Selecciona una imagen y la marca visualmente como seleccionada
   */
  /**
   * Habilita drag & drop en una imagen del editor (celda o bloque independiente).
   * Permite mover la imagen a otra celda o entre celda y bloque.
   *
   * @param {HTMLImageElement} img
   * @param {Object} meta - { source: 'cell'|'block', blockId?, tableCell? }
   */
  meWYSE.prototype._attachImageDragHandlers = function(img, meta) {
    var self = this;
    img.setAttribute('draggable', 'true');

    img.addEventListener('dragstart', function(e) {
      // Capturar estado de la imagen al inicio del drag
      var imageSnapshot = {
        src: img.src,
        width: parseInt(img.style.width || img.getAttribute('width'), 10) || parseInt(img.getAttribute('data-original-width'), 10) || 300,
        height: parseInt(img.style.height || img.getAttribute('height'), 10) || parseInt(img.getAttribute('data-original-height'), 10) || 200,
        alt: img.getAttribute('alt') || 'image',
        inlineStyle: img.getAttribute('style') || ''
      };

      self._draggedImage = {
        img: img,
        source: meta.source,
        blockId: meta.blockId || null,
        tableCell: meta.tableCell || null,
        snapshot: imageSnapshot
      };

      // Marcar visualmente la imagen como siendo arrastrada
      img.classList.add('mewyse-image-dragging');

      // Usar un tipo custom para distinguir de files OS; el valor es irrelevante
      try {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/x-mewyse-image', '1');
        // Algunos navegadores (Firefox) requieren setData('text/plain') también
        e.dataTransfer.setData('text/plain', 'mewyse-image');
      } catch (err) {}
    });

    img.addEventListener('dragend', function() {
      img.classList.remove('mewyse-image-dragging');
      // Limpiar el estado tras un pequeño delay para que los drop handlers
      // puedan leerlo primero
      setTimeout(function() {
        self._draggedImage = null;
        // Quitar cualquier marcador visual de drop-target restante
        var targets = document.querySelectorAll('.mewyse-image-drop-target-cell');
        for (var i = 0; i < targets.length; i++) {
          targets[i].classList.remove('mewyse-image-drop-target-cell');
        }
      }, 50);
    });
  };

  /**
   * Procesa el drop de una imagen arrastrada en una celda de tabla.
   * Mueve la imagen: elimina del origen (celda o bloque) y la inserta en la celda destino.
   */
  meWYSE.prototype._dropImageIntoCell = function(destCell, destBlockId) {
    var drag = this._draggedImage;
    if (!drag) return;

    // No hacer nada si se suelta en la misma celda de origen
    if (drag.source === 'cell' && drag.tableCell === destCell) return;

    this.pushHistory(true);

    var snapshot = drag.snapshot;

    // 1. Eliminar del origen
    if (drag.source === 'cell' && drag.tableCell) {
      // Limpiar la celda origen (dejar <p contenteditable> vacío)
      drag.tableCell.innerHTML = '';
      var emptyP = document.createElement('p');
      emptyP.contentEditable = true;
      emptyP.setAttribute('data-placeholder', '');
      drag.tableCell.appendChild(emptyP);
      this.attachTableCellEvents(emptyP, this._getBlockIdForCell(drag.tableCell));

      // Update del bloque origen
      var srcTable = drag.tableCell.closest('table');
      if (srcTable) {
        var srcBlockId = this._getBlockIdForCell(drag.tableCell);
        if (srcBlockId != null) {
          this.updateBlockContent(srcBlockId, srcTable.innerHTML);
        }
      }
    } else if (drag.source === 'block' && drag.blockId != null) {
      // Eliminar el bloque imagen independiente del modelo
      var blockIdx = this.getBlockIndex(drag.blockId);
      if (blockIdx !== -1) {
        this.blocks.splice(blockIdx, 1);
      }
    }

    // 2. Insertar en la celda destino (reusando la estructura de imagen en celda)
    this._createImageInCellFromSnapshot(destCell, snapshot);

    // 3. Update del bloque destino
    var destTable = destCell.closest('table');
    if (destTable) {
      var destTableBlockId = this._getBlockIdForCell(destCell);
      if (destTableBlockId != null) {
        this.updateBlockContent(destTableBlockId, destTable.innerHTML);
      }
    }

    // 4. Re-render si eliminamos un bloque (para evitar DOM inconsistente)
    if (drag.source === 'block') {
      this.render();
    }

    this._draggedImage = null;
    this.triggerChange();
  };

  /**
   * Procesa el drop de una imagen arrastrada en un bloque (fuera de celda).
   * Crea un nuevo bloque imagen en la posición del bloque destino y elimina origen.
   */
  meWYSE.prototype._dropImageIntoBlock = function(destBlockElement) {
    var drag = this._draggedImage;
    if (!drag) return;

    // No hacer nada si se suelta en el mismo bloque de origen
    var destBlockId = parseInt(destBlockElement.getAttribute('data-block-id'), 10);
    if (isNaN(destBlockId)) return;
    if (drag.source === 'block' && drag.blockId === destBlockId) return;

    this.pushHistory(true);

    var snapshot = drag.snapshot;

    // 1. Crear nuevo bloque imagen con el snapshot
    var insertIndex = this.getBlockIndex(destBlockId) + 1;
    var newBlock = {
      id: ++this.currentBlockId,
      type: 'image',
      content: {
        blob: snapshot.src,
        fileName: snapshot.alt || 'image',
        width: snapshot.width,
        height: snapshot.height
      }
    };

    // 2. Eliminar del origen
    if (drag.source === 'cell' && drag.tableCell) {
      var sourceCell = drag.tableCell;
      sourceCell.innerHTML = '';
      var emptyP = document.createElement('p');
      emptyP.contentEditable = true;
      emptyP.setAttribute('data-placeholder', '');
      sourceCell.appendChild(emptyP);
      this.attachTableCellEvents(emptyP, this._getBlockIdForCell(sourceCell));

      var srcTable = sourceCell.closest('table');
      if (srcTable) {
        var srcBlockId = this._getBlockIdForCell(sourceCell);
        if (srcBlockId != null) {
          this.updateBlockContent(srcBlockId, srcTable.innerHTML);
        }
      }
    } else if (drag.source === 'block' && drag.blockId != null) {
      var blockIdx = this.getBlockIndex(drag.blockId);
      if (blockIdx !== -1) {
        this.blocks.splice(blockIdx, 1);
        // Ajustar insertIndex si el bloque origen era anterior al destino
        if (blockIdx < insertIndex) insertIndex--;
      }
    }

    // 3. Insertar en modelo
    this.blocks.splice(insertIndex, 0, newBlock);

    // 4. Re-render
    this.render();

    this._draggedImage = null;
    this.triggerChange();
  };

  /**
   * Helper: obtiene el blockId de la tabla que contiene una celda.
   */
  meWYSE.prototype._getBlockIdForCell = function(cell) {
    var tableEl = cell.closest('table');
    if (!tableEl) return null;
    var wrapper = tableEl.closest('.mewyse-table-wrapper');
    if (!wrapper) return null;
    var blockEl = wrapper.closest('[data-block-id]');
    if (!blockEl) return null;
    var id = parseInt(blockEl.getAttribute('data-block-id'), 10);
    return isNaN(id) ? null : id;
  };

  /**
   * Helper: crea la estructura de imagen en una celda a partir de un snapshot.
   * Reusa la lógica de insertImageInTableCell pero sin modal (para drop directo).
   */
  meWYSE.prototype._createImageInCellFromSnapshot = function(tableCell, snapshot) {
    var self = this;

    // Limpiar contenido previo de la celda
    tableCell.innerHTML = '';

    var imageWrapper = document.createElement('div');
    imageWrapper.className = 'mewyse-image-wrapper';
    var imageContainer = document.createElement('div');
    imageContainer.className = 'mewyse-image-container';

    var imgElement = document.createElement('img');
    imgElement.src = snapshot.src;
    imgElement.alt = snapshot.alt || 'image';
    imgElement.className = 'mewyse-image';
    imgElement.style.width = snapshot.width + 'px';
    imgElement.style.height = snapshot.height + 'px';
    imgElement.setAttribute('data-original-width', snapshot.width);
    imgElement.setAttribute('data-original-height', snapshot.height);
    imgElement.setAttribute('data-in-table', 'true');
    imgElement.setAttribute('tabindex', '0');

    imageContainer.appendChild(imgElement);

    // Botón edit
    var editButton = document.createElement('button');
    editButton.className = 'mewyse-image-edit-btn';
    editButton.innerHTML = WYSIWYG_ICONS.gear;
    editButton.title = self.t('tooltips.editDimensions');
    editButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.editImageInTableCell(imgElement, tableCell);
    };
    imageContainer.appendChild(editButton);

    // Click: seleccionar
    imgElement.onclick = function(e) {
      e.stopPropagation();
      self.selectImage(imgElement, null, true, tableCell);
    };

    // Drag handlers
    self._attachImageDragHandlers(imgElement, { source: 'cell', tableCell: tableCell });

    imageWrapper.appendChild(imageContainer);
    tableCell.appendChild(imageWrapper);
  };

  meWYSE.prototype.selectImage = function(imgElement, blockId, isInTable, tableCell) {
    var self = this;

    // Deseleccionar cualquier imagen previamente seleccionada
    var previousSelected = this.container.querySelector('.mewyse-image.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
      previousSelected.style.border = '2px solid transparent';
    }

    // Seleccionar la nueva imagen
    imgElement.classList.add('selected');
    imgElement.style.border = '2px solid #4a9eff';
    imgElement.focus();

    // Guardar referencia a la imagen seleccionada
    this.selectedImage = {
      element: imgElement,
      blockId: blockId,
      isInTable: isInTable,
      tableCell: tableCell
    };

    // Añadir event listener para tecla Delete/Backspace/Enter si no existe
    if (!this.imageKeydownHandler) {
      this.imageKeydownHandler = function(e) {
        if (!self.selectedImage) return;

        // Eliminar imagen con Delete o Backspace
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
          self.deleteSelectedImage();
        }
        // Deseleccionar al presionar Escape
        else if (e.key === 'Escape') {
          self.deselectImage();
        }
        // Crear nuevo bloque al presionar Enter
        else if (e.key === 'Enter') {
          e.preventDefault();
          self.createBlockAfterImage();
        }
      };
      document.addEventListener('keydown', this.imageKeydownHandler);
    }
  };

  /**
   * Deselecciona la imagen actual
   */
  meWYSE.prototype.deselectImage = function() {
    if (this.selectedImage) {
      this.selectedImage.element.classList.remove('selected');
      this.selectedImage.element.style.border = '2px solid transparent';
      this.selectedImage = null;
    }
  };

  /**
   * Elimina la imagen seleccionada
   */
  meWYSE.prototype.deleteSelectedImage = function() {
    if (!this.selectedImage) return;

    var self = this;

    if (this.selectedImage.isInTable) {
      // Imagen en tabla: eliminar imagen y crear párrafo vacío en la celda
      var tableCell = this.selectedImage.tableCell;

      // Limpiar contenido de la celda
      tableCell.innerHTML = '';

      // Crear párrafo vacío
      var paragraph = document.createElement('p');
      paragraph.contentEditable = true;
      paragraph.style.padding = '8px';
      paragraph.style.margin = '0';
      paragraph.style.minHeight = '1em';
      paragraph.setAttribute('data-placeholder', '');
      tableCell.appendChild(paragraph);

      // Actualizar el bloque de la tabla
      var tableElement = tableCell.closest('table');
      if (tableElement) {
        var tableWrapper = tableElement.closest('.mewyse-table-wrapper');
        if (tableWrapper) {
          var blockElement = tableWrapper.closest('[data-block-id]');
          if (blockElement) {
            var blockId = parseInt(blockElement.getAttribute('data-block-id'));
            this.updateBlockContent(blockId, tableElement.innerHTML);

            // Añadir eventos a la nueva celda
            this.attachTableCellEvents(paragraph, blockId);
          }
        }
      }

      // Enfocar el nuevo párrafo
      paragraph.focus();
    } else {
      // Imagen en bloque: eliminar el bloque completo
      var blockId = this.selectedImage.blockId;
      this.deleteBlock(blockId);
    }

    // Limpiar selección
    this.selectedImage = null;

    // Trigger change
    this.triggerChange();
  };

  /**
   * Crea un nuevo bloque después de la imagen seleccionada
   */
  meWYSE.prototype.createBlockAfterImage = function() {
    if (!this.selectedImage) return;

    if (this.selectedImage.isInTable) {
      // Si la imagen está en una tabla, no crear nuevo bloque
      // Solo deseleccionar la imagen
      this.deselectImage();
      return;
    }

    // Imagen en bloque: crear nuevo bloque después del bloque de la imagen
    var blockId = this.selectedImage.blockId;
    var blockIndex = this.getBlockIndex(blockId);

    if (blockIndex !== -1) {
      // Crear nuevo bloque de párrafo después de la imagen
      this.addBlock('paragraph', blockIndex + 1);

      // Deseleccionar la imagen
      this.deselectImage();

      // Enfocar el nuevo bloque
      var self = this;
      setTimeout(function() {
        var newBlock = self.blocks[blockIndex + 1];
        if (newBlock) {
          var blockElement = self.container.querySelector('[data-block-id="' + newBlock.id + '"]');
          if (blockElement) {
            var contentEditable = blockElement.querySelector('[contenteditable="true"]');
            if (contentEditable) {
              contentEditable.focus();
            }
          }
        }
      }, 50);
    }
  };

  /**
   * Construye el HTML anidado de una lista consecutiva del mismo tipo.
   * Se usa desde getHTML y getHTMLSource.
   *
   * @param {Array} blocks - array de bloques filtrados
   * @param {number} startIndex - índice del primer bloque de la lista
   * @param {Function} classAttrFn - función que devuelve ' class="..."' por bloque
   * @returns {Object} { html, consumed }
   */
  meWYSE.prototype._buildNestedListHTML = function(blocks, startIndex, classAttrFn, inlineFn) {
    var startType = blocks[startIndex].type;
    var tag = startType === 'numberList' ? 'ol' : 'ul';
    var listClass = startType === 'checklist' ? ' class="checklist"' : '';
    // inlineFn es el transformer de contenido inline (ej. escape de entities).
    // Si no se pasa, identidad — preserva el comportamiento clásico.
    var inline = typeof inlineFn === 'function' ? inlineFn : function(c) { return c; };

    var renderLi = function(block) {
      var content = inline(block.content || '');
      var classStr = classAttrFn(block);
      if (startType === 'checklist') {
        var checked = block.checked ? ' checked' : '';
        return '<li' + classStr + '><input type="checkbox"' + checked + ' disabled> ' + content;
      }
      return '<li' + classStr + '>' + content;
    };

    // Stack basado en niveles. Emite HTML progresivamente.
    var html = '<' + tag + listClass + '>';
    var stack = [{ level: blocks[startIndex].indentLevel || 0, openLi: false }];
    var i = startIndex;

    while (i < blocks.length && blocks[i].type === startType) {
      var level = blocks[i].indentLevel || 0;

      // Si subimos de nivel: abrir listas anidadas dentro del último <li>
      while (level > stack[stack.length - 1].level) {
        // Para que el nested <ul> esté DENTRO del <li>, el anterior <li> no debe tener </li> aún
        html += '<' + tag + listClass + '>';
        stack.push({ level: stack[stack.length - 1].level + 1, openLi: false });
      }

      // Si bajamos de nivel: cerrar listas
      while (level < stack[stack.length - 1].level) {
        if (stack[stack.length - 1].openLi) html += '</li>';
        html += '</' + tag + '>';
        stack.pop();
        // Cerrar el <li> del padre al que volvemos (había quedado abierto para el nested)
        if (stack.length > 0 && stack[stack.length - 1].openLi) {
          html += '</li>';
          stack[stack.length - 1].openLi = false;
        }
      }

      // Si hay un <li> abierto al mismo nivel, cerrarlo antes de abrir el nuevo
      if (stack[stack.length - 1].openLi) {
        html += '</li>';
      }

      html += renderLi(blocks[i]);
      stack[stack.length - 1].openLi = true;
      i++;
    }

    // Cerrar todos los <li> y <ul> restantes
    while (stack.length > 0) {
      if (stack[stack.length - 1].openLi) html += '</li>';
      html += '</' + tag + '>';
      stack.pop();
    }

    return { html: html, consumed: i - startIndex };
  };

  /**
   * Cambia el nivel de indentación de un bloque de lista.
   * @param {number} blockId
   * @param {number} delta - +1 para indent, -1 para outdent
   */
  meWYSE.prototype.indentBlock = function(blockId, delta) {
    var block = this.getBlock(blockId);
    if (!block) return;
    if (block.type !== 'bulletList' && block.type !== 'numberList' && block.type !== 'checklist') return;

    var currentLevel = block.indentLevel || 0;
    var newLevel = Math.max(0, Math.min(5, currentLevel + delta));
    if (newLevel === currentLevel) return;

    // Validación: no se puede indent si no hay un item anterior en el mismo grupo
    // con nivel >= al nuevo que sería nuestro padre.
    if (delta > 0) {
      var index = this.getBlockIndex(blockId);
      if (index <= 0) return; // primer bloque del editor no puede anidar
      var prevBlock = this.blocks[index - 1];
      if (prevBlock.type !== block.type) return; // no hay padre del mismo tipo
      var prevLevel = prevBlock.indentLevel || 0;
      if (newLevel > prevLevel + 1) return; // no se puede saltar niveles
    }

    this.pushHistory(true);
    block.indentLevel = newLevel;
    this.render();
    this.triggerChange();

    // Restaurar foco al bloque
    var self = this;
    setTimeout(function() {
      var el = self.container.querySelector('[data-block-id="' + blockId + '"]');
      if (el) {
        var editable = el.querySelector('[contenteditable="true"]') || el;
        if (editable) editable.focus();
      }
    }, 0);
  };

  /**
   * Construye una estructura de lista anidada a partir de bloques consecutivos
   * tipo bulletList/numberList/checklist. Agrupa por tipo y anida según indentLevel.
   *
   * @param {Array} blocks - array completo de bloques del editor
   * @param {number} startIndex - índice desde donde empezar
   * @returns {Object} { wrapper: HTMLElement, consumed: number }
   */
  meWYSE.prototype._buildNestedListWrapper = function(blocks, startIndex) {
    var self = this;
    var startType = blocks[startIndex].type;

    var createListEl = function(type) {
      var el;
      if (type === 'bulletList') {
        el = document.createElement('ul');
        el.className = 'mewyse-list-group';
      } else if (type === 'numberList') {
        el = document.createElement('ol');
        el.className = 'mewyse-list-group';
      } else { // checklist
        el = document.createElement('ul');
        el.className = 'mewyse-list-group mewyse-checklist-group';
      }
      return el;
    };

    // Crear root al nivel 0 del primer ítem
    var rootLevel = blocks[startIndex].indentLevel || 0;
    var root = createListEl(startType);
    // Stack de { level, list, lastLi }
    var stack = [{ level: rootLevel, list: root, lastLi: null, type: startType }];

    var i = startIndex;
    while (i < blocks.length && blocks[i].type === startType) {
      var item = blocks[i];
      var level = item.indentLevel || 0;

      // Pop stack hasta encontrar un nivel <= current
      while (stack.length > 1 && stack[stack.length - 1].level > level) {
        stack.pop();
      }

      var currentFrame = stack[stack.length - 1];

      // Si necesitamos subir un nivel (anidar)
      if (level > currentFrame.level && currentFrame.lastLi) {
        var nested = createListEl(startType);
        currentFrame.lastLi.appendChild(nested);
        currentFrame = { level: level, list: nested, lastLi: null, type: startType };
        stack.push(currentFrame);
      }

      // Crear el <li> y añadirlo a la lista actual
      var li = self.createBlockElement(item);
      currentFrame.list.appendChild(li);
      currentFrame.lastLi = li;
      i++;
    }

    return { wrapper: root, consumed: i - startIndex };
  };

  /**
   * Aplica estilos avanzados (border/margin/alignment) al <img> y wrapper.
   * @param {HTMLImageElement} img
   * @param {HTMLElement} wrapper - .mewyse-image-wrapper
   * @param {Object} advanced - { border, margin, alignment } o null/undefined
   */
  meWYSE.prototype._applyImageAdvancedStyles = function(img, wrapper, advanced) {
    if (!advanced) return;
    if (advanced.border && advanced.border.width) {
      var b = advanced.border;
      img.style.border = b.width + 'px ' + (b.style || 'solid') + ' ' + (b.color || '#000000');
    }
    if (advanced.margin && typeof advanced.margin.all === 'number') {
      img.style.margin = advanced.margin.all + 'px';
    }
    if (advanced.alignment) {
      // Alineación: left/right usan float; center usa margin auto + display block
      if (advanced.alignment === 'left') {
        wrapper.style.float = 'left';
        wrapper.style.marginRight = '16px';
      } else if (advanced.alignment === 'right') {
        wrapper.style.float = 'right';
        wrapper.style.marginLeft = '16px';
      } else if (advanced.alignment === 'center') {
        wrapper.style.textAlign = 'center';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
        img.style.display = 'block';
      }
    }
  };

  /**
   * Crea el panel de "Opciones avanzadas" para el modal de imagen.
   * Incluye: borde (width/style/color), margin, alineación.
   *
   * @param {Object} initial - valores iniciales { border, margin, alignment }
   * @returns {Object} { panel: HTMLElement, getValues: Function, toggle: Function }
   */
  meWYSE.prototype._createImageAdvancedPanel = function(initial) {
    var self = this;
    initial = initial || {};
    var iBorder = initial.border || {};
    var iMargin = initial.margin || {};
    var iAlignment = initial.alignment || '';

    // Toggle button (colapsable)
    var toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'mewyse-modal-advanced-toggle';
    toggleBtn.innerHTML = '<span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span> ' + self.t('modals.advancedOptions');

    var panel = document.createElement('div');
    panel.className = 'mewyse-modal-advanced-panel';
    panel.style.display = 'none';

    // --- Borde: width / style / color ---
    var borderGroup = document.createElement('div');
    borderGroup.className = 'mewyse-modal-advanced-row';
    var borderLabel = document.createElement('label');
    borderLabel.textContent = self.t('modals.imageBorder');
    var borderWidthInput = document.createElement('input');
    borderWidthInput.type = 'number';
    borderWidthInput.min = '0';
    borderWidthInput.className = 'mewyse-modal-input';
    borderWidthInput.placeholder = '0';
    borderWidthInput.value = iBorder.width || '';
    borderWidthInput.style.width = '70px';
    var borderStyleSelect = document.createElement('select');
    borderStyleSelect.className = 'mewyse-modal-input';
    ['solid', 'dashed', 'dotted', 'double'].forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      if (iBorder.style === s) opt.selected = true;
      borderStyleSelect.appendChild(opt);
    });
    var borderColorInput = document.createElement('input');
    borderColorInput.type = 'color';
    borderColorInput.className = 'mewyse-modal-input mewyse-modal-color';
    borderColorInput.value = iBorder.color || '#000000';
    borderColorInput.dataset.userSet = iBorder.color ? 'true' : 'false';
    borderColorInput.oninput = function() { borderColorInput.dataset.userSet = 'true'; };
    var borderRow = document.createElement('div');
    borderRow.className = 'mewyse-modal-advanced-inline';
    borderRow.appendChild(borderWidthInput);
    borderRow.appendChild(borderStyleSelect);
    borderRow.appendChild(borderColorInput);
    borderGroup.appendChild(borderLabel);
    borderGroup.appendChild(borderRow);
    panel.appendChild(borderGroup);

    // --- Margin (shorthand: un número aplicado a los 4 lados) ---
    var marginGroup = document.createElement('div');
    marginGroup.className = 'mewyse-modal-advanced-row';
    var marginLabel = document.createElement('label');
    marginLabel.textContent = self.t('modals.imageMargin');
    var marginInput = document.createElement('input');
    marginInput.type = 'number';
    marginInput.min = '0';
    marginInput.className = 'mewyse-modal-input';
    marginInput.placeholder = '0';
    marginInput.value = (typeof iMargin.all === 'number' ? iMargin.all : '');
    marginInput.style.width = '70px';
    marginGroup.appendChild(marginLabel);
    marginGroup.appendChild(marginInput);
    panel.appendChild(marginGroup);

    // --- Alineación ---
    var alignGroup = document.createElement('div');
    alignGroup.className = 'mewyse-modal-advanced-row';
    var alignLabel = document.createElement('label');
    alignLabel.textContent = self.t('modals.imageAlignment');
    var alignSelect = document.createElement('select');
    alignSelect.className = 'mewyse-modal-input';
    ['', 'left', 'center', 'right'].forEach(function(a) {
      var opt = document.createElement('option');
      opt.value = a;
      opt.textContent = a || '—';
      if (iAlignment === a) opt.selected = true;
      alignSelect.appendChild(opt);
    });
    alignGroup.appendChild(alignLabel);
    alignGroup.appendChild(alignSelect);
    panel.appendChild(alignGroup);

    // Toggle open/close
    toggleBtn.onclick = function(e) {
      e.preventDefault();
      var isOpen = panel.style.display !== 'none';
      panel.style.display = isOpen ? 'none' : 'block';
      toggleBtn.classList.toggle('expanded', !isOpen);
    };

    return {
      toggle: toggleBtn,
      panel: panel,
      getValues: function() {
        var result = {};
        var bw = parseInt(borderWidthInput.value, 10);
        if (!isNaN(bw) && bw > 0) {
          result.border = {
            width: bw,
            style: borderStyleSelect.value,
            color: borderColorInput.dataset.userSet === 'true' ? borderColorInput.value : '#000000'
          };
        }
        var m = parseInt(marginInput.value, 10);
        if (!isNaN(m) && m >= 0 && marginInput.value !== '') {
          result.margin = { all: m };
        }
        if (alignSelect.value) {
          result.alignment = alignSelect.value;
        }
        return result;
      }
    };
  };

  /**
   * Muestra el modal para editar las dimensiones de la imagen
   */
  meWYSE.prototype.showImageDimensionsModal = function(file, insertIndex) {
    var self = this;

    // Crear el overlay del modal
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'mewyse-modal-overlay';

    // Crear el contenedor del modal
    var modalContainer = document.createElement('div');
    modalContainer.className = 'mewyse-modal-container';

    // Título
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = self.t('modals.configureImageDimensions');
    modalTitle.className = 'mewyse-modal-title';
    modalContainer.appendChild(modalTitle);

    // Leer la imagen para obtener sus dimensiones originales
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var originalWidth = img.width;
        var originalHeight = img.height;
        var aspectRatio = originalWidth / originalHeight;

        // Crear preview de la imagen
        var previewContainer = document.createElement('div');
        previewContainer.className = 'mewyse-modal-preview';
        var previewImg = document.createElement('img');
        previewImg.src = e.target.result;
        previewImg.style.maxWidth = '100%';
        previewImg.style.maxHeight = '200px';
        previewContainer.appendChild(previewImg);
        modalContainer.appendChild(previewContainer);

        // Información del archivo
        var fileInfo = document.createElement('p');
        fileInfo.className = 'mewyse-modal-info';
        fileInfo.textContent = self.t('modals.originalDimensions', { width: originalWidth, height: originalHeight });
        modalContainer.appendChild(fileInfo);

        // Contenedor de inputs
        var inputsContainer = document.createElement('div');
        inputsContainer.className = 'mewyse-modal-inputs';

        // Input ancho
        var widthGroup = document.createElement('div');
        widthGroup.className = 'mewyse-modal-input-group';
        var widthLabel = document.createElement('label');
        widthLabel.textContent = self.t('modals.width');
        var widthInput = document.createElement('input');
        widthInput.type = 'number';
        widthInput.value = originalWidth;
        widthInput.min = '1';
        widthInput.className = 'mewyse-modal-input';
        widthGroup.appendChild(widthLabel);
        widthGroup.appendChild(widthInput);
        inputsContainer.appendChild(widthGroup);

        // Input alto
        var heightGroup = document.createElement('div');
        heightGroup.className = 'mewyse-modal-input-group';
        var heightLabel = document.createElement('label');
        heightLabel.textContent = self.t('modals.height');
        var heightInput = document.createElement('input');
        heightInput.type = 'number';
        heightInput.value = originalHeight;
        heightInput.min = '1';
        heightInput.className = 'mewyse-modal-input';
        heightGroup.appendChild(heightLabel);
        heightGroup.appendChild(heightInput);
        inputsContainer.appendChild(heightGroup);

        modalContainer.appendChild(inputsContainer);

        // Checkbox para mantener proporciones
        var proportionsContainer = document.createElement('div');
        proportionsContainer.className = 'mewyse-modal-checkbox-group';
        var proportionsCheckbox = document.createElement('input');
        proportionsCheckbox.type = 'checkbox';
        proportionsCheckbox.checked = true;
        proportionsCheckbox.id = 'mewyse-maintain-proportions';
        var proportionsLabel = document.createElement('label');
        proportionsLabel.setAttribute('for', 'mewyse-maintain-proportions');
        proportionsLabel.textContent = self.t('modals.keepProportions');
        proportionsContainer.appendChild(proportionsCheckbox);
        proportionsContainer.appendChild(proportionsLabel);
        modalContainer.appendChild(proportionsContainer);

        // Event listeners para mantener proporciones
        widthInput.oninput = function() {
          if (proportionsCheckbox.checked) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
          }
        };

        heightInput.oninput = function() {
          if (proportionsCheckbox.checked) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
          }
        };

        // Opciones avanzadas (colapsables)
        var advanced = self._createImageAdvancedPanel({});
        modalContainer.appendChild(advanced.toggle);
        modalContainer.appendChild(advanced.panel);

        // Botones
        var buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'mewyse-modal-buttons';

        var cancelButton = document.createElement('button');
        cancelButton.textContent = self.t('modals.cancel');
        cancelButton.className = 'mewyse-modal-button mewyse-modal-button-cancel';
        cancelButton.onclick = function() {
          document.body.removeChild(modalOverlay);
        };

        var insertButton = document.createElement('button');
        insertButton.textContent = self.t('modals.insert');
        insertButton.className = 'mewyse-modal-button mewyse-modal-button-primary';
        insertButton.onclick = function() {
          var width = parseInt(widthInput.value);
          var height = parseInt(heightInput.value);

          // Crear el bloque de imagen con el blob + opciones avanzadas
          self.createImageBlock(file, e.target.result, width, height, insertIndex, advanced.getValues());

          document.body.removeChild(modalOverlay);
        };

        buttonsContainer.appendChild(cancelButton);
        buttonsContainer.appendChild(insertButton);
        modalContainer.appendChild(buttonsContainer);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Cerrar al hacer click fuera del modal
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    };
  };

  /**
   * Crea un bloque de imagen con el archivo seleccionado.
   * Si options.onImageUpload está definido, delega el upload al consumidor
   * y usa la URL devuelta como blob. Si no, usa el dataURL base64 local.
   *
   * @param {Object} advanced - Opciones avanzadas opcionales: { border, margin, alignment }
   */
  meWYSE.prototype.createImageBlock = function(file, dataUrl, width, height, insertIndex, advanced) {
    var self = this;

    var doCreate = function(finalBlob, finalWidth, finalHeight) {
      var content = {
        blob: finalBlob,
        fileName: file.name,
        fileType: file.type,
        width: finalWidth || width,
        height: finalHeight || height
      };
      // Adjuntar opciones avanzadas si hay
      if (advanced && (advanced.border || advanced.margin || advanced.alignment)) {
        content.advanced = advanced;
      }
      var newBlock = {
        id: ++self.currentBlockId,
        type: 'image',
        content: content
      };
      self.blocks.splice(insertIndex, 0, newBlock);
      self.render();
      self.triggerChange();
    };

    if (typeof this.options.onImageUpload === 'function') {
      this.options.onImageUpload(file, function(result) {
        if (!result || !result.url) return; // hook rechazó → abortar
        doCreate(result.url, result.width, result.height);
      });
    } else {
      doCreate(dataUrl);
    }
  };

  /**
   * Edita las dimensiones de una imagen existente
   */
  meWYSE.prototype.editImageDimensions = function(blockId, imgElement) {
    var self = this;
    var block = this.getBlock(blockId);

    if (!block || block.type !== 'image') return;

    var currentWidth = parseInt(imgElement.style.width) || block.content.width;
    var currentHeight = parseInt(imgElement.style.height) || block.content.height;
    var aspectRatio = currentWidth / currentHeight;

    // Crear el overlay del modal
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'mewyse-modal-overlay';

    // Crear el contenedor del modal
    var modalContainer = document.createElement('div');
    modalContainer.className = 'mewyse-modal-container';

    // Título
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = self.t('modals.editImageDimensions');
    modalTitle.className = 'mewyse-modal-title';
    modalContainer.appendChild(modalTitle);

    // Preview de la imagen
    var previewContainer = document.createElement('div');
    previewContainer.className = 'mewyse-modal-preview';
    var previewImg = document.createElement('img');
    previewImg.src = block.content.blob;
    previewImg.style.maxWidth = '100%';
    previewImg.style.maxHeight = '200px';
    previewContainer.appendChild(previewImg);
    modalContainer.appendChild(previewContainer);

    // Contenedor de inputs
    var inputsContainer = document.createElement('div');
    inputsContainer.className = 'mewyse-modal-inputs';

    // Input ancho
    var widthGroup = document.createElement('div');
    widthGroup.className = 'mewyse-modal-input-group';
    var widthLabel = document.createElement('label');
    widthLabel.textContent = self.t('modals.width');
    var widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.value = currentWidth;
    widthInput.min = '1';
    widthInput.className = 'mewyse-modal-input';
    widthGroup.appendChild(widthLabel);
    widthGroup.appendChild(widthInput);
    inputsContainer.appendChild(widthGroup);

    // Input alto
    var heightGroup = document.createElement('div');
    heightGroup.className = 'mewyse-modal-input-group';
    var heightLabel = document.createElement('label');
    heightLabel.textContent = self.t('modals.height');
    var heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.value = currentHeight;
    heightInput.min = '1';
    heightInput.className = 'mewyse-modal-input';
    heightGroup.appendChild(heightLabel);
    heightGroup.appendChild(heightInput);
    inputsContainer.appendChild(heightGroup);

    modalContainer.appendChild(inputsContainer);

    // Checkbox para mantener proporciones
    var proportionsContainer = document.createElement('div');
    proportionsContainer.className = 'mewyse-modal-checkbox-group';
    var proportionsCheckbox = document.createElement('input');
    proportionsCheckbox.type = 'checkbox';
    proportionsCheckbox.checked = true;
    proportionsCheckbox.id = 'mewyse-maintain-proportions-edit';
    var proportionsLabel = document.createElement('label');
    proportionsLabel.setAttribute('for', 'mewyse-maintain-proportions-edit');
    proportionsLabel.textContent = self.t('modals.keepProportions');
    proportionsContainer.appendChild(proportionsCheckbox);
    proportionsContainer.appendChild(proportionsLabel);
    modalContainer.appendChild(proportionsContainer);

    // Event listeners para mantener proporciones
    widthInput.oninput = function() {
      if (proportionsCheckbox.checked) {
        heightInput.value = Math.round(widthInput.value / aspectRatio);
      }
    };

    heightInput.oninput = function() {
      if (proportionsCheckbox.checked) {
        widthInput.value = Math.round(heightInput.value * aspectRatio);
      }
    };

    // Botones
    var buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'mewyse-modal-buttons';

    var cancelButton = document.createElement('button');
    cancelButton.textContent = self.t('modals.cancel');
    cancelButton.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelButton.onclick = function() {
      document.body.removeChild(modalOverlay);
    };

    var saveButton = document.createElement('button');
    saveButton.textContent = self.t('modals.save');
    saveButton.className = 'mewyse-modal-button mewyse-modal-button-primary';
    saveButton.onclick = function() {
      var width = parseInt(widthInput.value);
      var height = parseInt(heightInput.value);

      // Actualizar las dimensiones del bloque
      block.content.width = width;
      block.content.height = height;

      // Actualizar las dimensiones de la imagen
      imgElement.style.width = width + 'px';
      imgElement.style.height = height + 'px';

      self.triggerChange();
      document.body.removeChild(modalOverlay);
    };

    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(saveButton);
    modalContainer.appendChild(buttonsContainer);

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Cerrar al hacer click fuera del modal
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    };
  };

  /**
   * Muestra el menú desplegable de tipos de bloque en la toolbar
   */
  meWYSE.prototype.showToolbarBlockTypeMenu = function(buttonElement) {
    var self = this;

    // Cerrar menú existente si está abierto
    if (this.activeToolbarMenu) {
      this.closeToolbarMenu();
      return;
    }

    buttonElement.setAttribute('aria-expanded', 'true');

    // Guardar el bloque actual y la posición del cursor
    // Primero intentar usar el último bloque enfocado guardado
    var blockElement = null;
    var contentEditable = null;

    // Buscar cualquier contentEditable que tenga el foco actualmente
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      var range = selection.getRangeAt(0);
      var node = range.startContainer;

      // Si es un nodo de texto, obtener su padre
      if (node.nodeType === 3) {
        node = node.parentElement;
      }

      // Buscar el contentEditable
      while (node && node !== this.container) {
        if (node.contentEditable === 'true') {
          contentEditable = node;
          break;
        }
        node = node.parentElement;
      }

      // Buscar el bloque que contiene el contentEditable
      if (contentEditable) {
        node = contentEditable;
        while (node && !node.hasAttribute('data-block-id')) {
          node = node.parentElement;
        }
        blockElement = node;
      }
    }

    // Si no encontramos un bloque con el método anterior, buscar el primer bloque
    if (!blockElement) {
      var allBlocks = this.container.querySelectorAll('[data-block-id]');
      if (allBlocks.length > 0) {
        blockElement = allBlocks[0];
        contentEditable = blockElement.querySelector('[contenteditable="true"]');
      }
    }

    if (blockElement) {
      var blockId = parseInt(blockElement.getAttribute('data-block-id'));

      // Guardar la selección actual
      var savedRange = null;
      if (selection.rangeCount > 0) {
        savedRange = selection.getRangeAt(0).cloneRange();
      }

      this.toolbarMenuContext = {
        blockId: blockId,
        contentEditable: contentEditable,
        savedRange: savedRange
      };
    } else {
      // Si no hay bloque activo, no guardar contexto
      this.toolbarMenuContext = null;
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-type-menu mewyse-toolbar-menu';

    var blockTypes = [
      { type: 'paragraph', icon: WYSIWYG_ICONS.paragraph },
      { type: 'heading1', icon: WYSIWYG_ICONS.heading1 },
      { type: 'heading2', icon: WYSIWYG_ICONS.heading2 },
      { type: 'heading3', icon: WYSIWYG_ICONS.heading3 },
      { type: 'quote', icon: WYSIWYG_ICONS.quote },
      { type: 'code', icon: WYSIWYG_ICONS.code },
      { type: 'bulletList', icon: WYSIWYG_ICONS.bulletList },
      { type: 'numberList', icon: WYSIWYG_ICONS.numberList },
      { type: 'checklist', icon: WYSIWYG_ICONS.checklist },
      { type: 'table', icon: WYSIWYG_ICONS.table },
      { type: 'image', icon: WYSIWYG_ICONS.image },
      { type: 'divider', icon: WYSIWYG_ICONS.divider }
    ];

    blockTypes.forEach(function(blockType) {
      var item = document.createElement('div');
      item.className = 'mewyse-type-menu-item';
      item.innerHTML = '<span class="icon">' + blockType.icon + '</span>' + self.t('blockTypes.' + blockType.type);
      item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.changeBlockTypeFromToolbar(blockType.type);
        self.closeToolbarMenu();
      };
      menu.appendChild(item);
    });

    // Estilos custom (styleFormats) — se añaden después de los types estándar
    if (this.styleFormats && this.styleFormats.length > 0) {
      var sep = document.createElement('div');
      sep.className = 'mewyse-type-menu-separator';
      menu.appendChild(sep);

      this.styleFormats.forEach(function(sf) {
        var item = document.createElement('div');
        item.className = 'mewyse-type-menu-item';
        // Preview: aplicar la clase al span del label para que el usuario vea el estilo
        item.innerHTML = '<span class="icon">' + (WYSIWYG_ICONS[sf.block] || WYSIWYG_ICONS.paragraph) +
                        '</span><span class="mewyse-style-preview ' + sf.className + '">' + sf.title + '</span>';
        item.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.changeBlockTypeFromToolbar(sf.block, sf.className);
          self.closeToolbarMenu();
        };
        menu.appendChild(item);
      });
    }

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this.activeToolbarMenu = menu;

    // Posicionar el menú debajo del botón
    this.anchorMenu(menu, buttonElement, { offsetY: 5, offsetX: 0 });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', self.closeToolbarMenuHandler = function() {
        self.closeToolbarMenu();
      });
    }, 0);

    this._showBackdrop('toolbarMenu', function() { self.closeToolbarMenu(); });
  };

  /**
   * Cambia el tipo de bloque desde la toolbar y restaura el foco
   */
  meWYSE.prototype.changeBlockTypeFromToolbar = function(type, customClass) {
    var self = this;

    // Si hay contexto guardado, usarlo
    if (this.toolbarMenuContext && this.toolbarMenuContext.blockId) {
      var blockId = this.toolbarMenuContext.blockId;
      var savedRange = this.toolbarMenuContext.savedRange;

      // Guardar la posición del cursor antes del cambio como offset de texto plano
      var cursorOffset = 0;
      var contentEditable = this.toolbarMenuContext.contentEditable;

      if (savedRange && contentEditable) {
        try {
          // Crear un rango temporal desde el inicio del contentEditable hasta el cursor
          var tempRange = document.createRange();
          tempRange.setStart(contentEditable, 0);
          tempRange.setEnd(savedRange.startContainer, savedRange.startOffset);

          // El toString() del rango nos da el texto antes del cursor
          cursorOffset = tempRange.toString().length;
        } catch (e) {
          cursorOffset = 0;
        }
      }

      // Verificar si el contentEditable está dentro de una celda de tabla
      var tableCell = contentEditable ? contentEditable.closest('td, th') : null;

      if (tableCell) {
        // Estamos dentro de una celda de tabla - cambiar solo el elemento interno
        this.changeTableCellBlockType(tableCell, contentEditable, type, blockId, cursorOffset);
        return;
      }

      // Cambiar el tipo de bloque
      this.changeBlockType(blockId, type);

      // Aplicar customClass (styleFormats) si se pasó. Se asigna al block tras
      // el cambio de tipo para que sobreviva al render.
      var targetBlock = this.getBlock(blockId);
      if (targetBlock) {
        if (customClass && this._customClassWhitelist && this._customClassWhitelist[customClass]) {
          targetBlock.customClass = customClass;
        } else {
          delete targetBlock.customClass;
        }
        this.render();
      }

      // Restaurar el foco y la selección después del render
      setTimeout(function() {
        var blockElement = self.container.querySelector('[data-block-id="' + blockId + '"]');
        if (blockElement) {
          var contentEditable = blockElement.querySelector('[contenteditable="true"]');
          if (contentEditable) {
            contentEditable.focus();

            // Intentar restaurar la posición del cursor
            try {
              var selection = window.getSelection();
              selection.removeAllRanges();
              var range = document.createRange();

              // Función para recorrer el árbol de nodos y encontrar la posición del cursor
              function findCursorPosition(node, targetOffset) {
                var currentOffset = 0;

                function traverse(n) {
                  if (n.nodeType === 3) {
                    // Nodo de texto
                    if (currentOffset + n.length >= targetOffset) {
                      // El cursor está en este nodo
                      return { node: n, offset: targetOffset - currentOffset };
                    }
                    currentOffset += n.length;
                  } else if (n.nodeType === 1) {
                    // Nodo elemento
                    for (var i = 0; i < n.childNodes.length; i++) {
                      var result = traverse(n.childNodes[i]);
                      if (result) return result;
                    }
                  }
                  return null;
                }

                return traverse(node);
              }

              var position = findCursorPosition(contentEditable, cursorOffset);
              if (position) {
                range.setStart(position.node, position.offset);
                range.collapse(true);
              } else {
                // Si no se encuentra la posición, colocar al final
                var lastChild = contentEditable;
                while (lastChild.lastChild) {
                  lastChild = lastChild.lastChild;
                }
                if (lastChild.nodeType === 3) {
                  range.setStart(lastChild, lastChild.length);
                } else {
                  range.setStart(lastChild, 0);
                }
                range.collapse(true);
              }

              selection.addRange(range);
            } catch (e) {
              // Si falla la restauración, simplemente enfocar sin posicionar cursor
            }
          }
        }
      }, 10);
    } else {
      // Si no hay contexto, usar el método estándar
      this.changeCurrentBlockType(type);
    }

    // Limpiar el contexto
    this.toolbarMenuContext = null;
  };

  /**
   * Cambia el tipo de elemento dentro de una celda de tabla
   * @param {HTMLElement} tableCell - La celda (td o th)
   * @param {HTMLElement} currentElement - El elemento actual editable
   * @param {string} newType - El nuevo tipo de bloque
   * @param {number} blockId - ID del bloque de tabla
   * @param {number} cursorOffset - Posición del cursor
   */
  meWYSE.prototype.changeTableCellBlockType = function(tableCell, currentElement, newType, blockId, cursorOffset) {
    // Mapeo de tipos de bloque a elementos HTML
    var typeToElement = {
      'paragraph': 'p',
      'heading1': 'h1',
      'heading2': 'h2',
      'heading3': 'h3',
      'quote': 'blockquote',
      'code': 'pre',
      'bulletList': 'ul',
      'numberList': 'ol'
    };

    var newElementTag = typeToElement[newType] || 'p';

    // Si es el mismo tipo, no hacer nada
    if (currentElement.tagName.toLowerCase() === newElementTag.toLowerCase()) {
      // Limpiar el contexto
      this.toolbarMenuContext = null;
      return;
    }

    // Guardar el contenido actual
    var content = currentElement.innerHTML;

    // Crear el nuevo elemento
    var newElement = document.createElement(newElementTag);
    newElement.innerHTML = content;
    newElement.contentEditable = true;
    newElement.style.padding = '8px';
    newElement.style.margin = '0';
    newElement.style.minHeight = '1em';

    // Reemplazar solo el elemento editable, no toda la celda
    tableCell.replaceChild(newElement, currentElement);

    // Volver a adjuntar eventos al nuevo elemento
    this.attachTableCellEvents(newElement, blockId);

    // Actualizar el contenido del bloque tabla
    var blockElement = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (blockElement) {
      var tableElement = blockElement.querySelector('table');
      if (tableElement) {
        this.updateBlockContent(blockId, tableElement.innerHTML);
      }
    }

    // Restaurar el foco y la posición del cursor
    setTimeout(function() {
      newElement.focus();

      // Intentar restaurar la posición del cursor
      try {
        var selection = window.getSelection();
        selection.removeAllRanges();
        var range = document.createRange();

        // Función para recorrer el árbol de nodos y encontrar la posición del cursor
        function findCursorPosition(node, targetOffset) {
          var currentOffset = 0;

          function traverse(n) {
            if (n.nodeType === 3) {
              // Nodo de texto
              if (currentOffset + n.length >= targetOffset) {
                // El cursor está en este nodo
                return { node: n, offset: targetOffset - currentOffset };
              }
              currentOffset += n.length;
            } else if (n.nodeType === 1) {
              // Nodo elemento
              for (var i = 0; i < n.childNodes.length; i++) {
                var result = traverse(n.childNodes[i]);
                if (result) return result;
              }
            }
            return null;
          }

          return traverse(node);
        }

        var position = findCursorPosition(newElement, cursorOffset);
        if (position) {
          range.setStart(position.node, position.offset);
          range.collapse(true);
        } else {
          // Si no se encuentra la posición, colocar al final
          var lastChild = newElement;
          while (lastChild.lastChild) {
            lastChild = lastChild.lastChild;
          }
          if (lastChild.nodeType === 3) {
            range.setStart(lastChild, lastChild.length);
          } else {
            range.setStart(lastChild, 0);
          }
          range.collapse(true);
        }

        selection.addRange(range);
      } catch (e) {
        // Si falla la restauración, simplemente enfocar sin posicionar cursor
      }
    }, 10);

    // Limpiar el contexto
    this.toolbarMenuContext = null;
  };

  /**
   * Cierra el menú desplegable de la toolbar
   */
  meWYSE.prototype.closeToolbarMenu = function() {
    if (this.activeToolbarMenu) {
      document.body.removeChild(this.activeToolbarMenu);
      this.activeToolbarMenu = null;
    }
    if (this.closeToolbarMenuHandler) {
      document.removeEventListener('click', this.closeToolbarMenuHandler);
      this.closeToolbarMenuHandler = null;
    }
    // Actualizar aria-expanded en botones del toolbar
    if (this.toolbar) {
      var expandedButtons = this.toolbar.querySelectorAll('[aria-expanded="true"]');
      for (var i = 0; i < expandedButtons.length; i++) {
        expandedButtons[i].setAttribute('aria-expanded', 'false');
      }
    }
    // Limpiar el contexto guardado si el menú se cierra sin seleccionar
    this.toolbarMenuContext = null;
    this._hideBackdrop('toolbarMenu');
  };

  /**
   * Renderiza todos los bloques
   * @param {number} focusBlockId - ID del bloque que debe recibir el foco (opcional)
   */
  meWYSE.prototype.render = function(focusBlockId) {
    var self = this;

    // Si estamos añadiendo un nuevo bloque (focusBlockId existe), verificar si ya existe en el DOM
    // Solo añadir el nuevo bloque si NO existe en el DOM aún
    if (focusBlockId) {
      // Verificar si el bloque ya tiene un elemento DOM
      var existingElement = this.container.querySelector('[data-block-id="' + focusBlockId + '"]');

      if (!existingElement) {
        // El bloque NO existe en el DOM, es un bloque nuevo - insertarlo
        var newBlock = null;
        var newBlockIndex = -1;

        for (var i = 0; i < this.blocks.length; i++) {
          if (this.blocks[i].id === focusBlockId) {
            newBlock = this.blocks[i];
            newBlockIndex = i;
            break;
          }
        }

        if (newBlock) {
          // Para listas, necesitamos manejar la agrupacion
          var isListType = newBlock.type === 'bulletList' || newBlock.type === 'numberList' || newBlock.type === 'checklist';

          if (isListType) {
            // Verificar si el bloque anterior es del mismo tipo de lista
            var prevBlock = newBlockIndex > 0 ? this.blocks[newBlockIndex - 1] : null;
            var nextBlock = newBlockIndex < this.blocks.length - 1 ? this.blocks[newBlockIndex + 1] : null;

            if (prevBlock && prevBlock.type === newBlock.type) {
              // El bloque anterior es del mismo tipo, buscar su wrapper y añadir ahi
              var prevBlockElement = this.container.querySelector('[data-block-id="' + prevBlock.id + '"]');
              if (prevBlockElement && prevBlockElement.parentNode &&
                  (prevBlockElement.parentNode.tagName === 'UL' || prevBlockElement.parentNode.tagName === 'OL')) {
                var listWrapper = prevBlockElement.parentNode;
                var newBlockElement = this.createBlockElement(newBlock);

                // Insertar despues del bloque anterior
                if (prevBlockElement.nextSibling) {
                  listWrapper.insertBefore(newBlockElement, prevBlockElement.nextSibling);
                } else {
                  listWrapper.appendChild(newBlockElement);
                }

                // Enfocar el nuevo elemento
                this.focusNewBlock(newBlockElement);
                return;
              }
            } else if (nextBlock && nextBlock.type === newBlock.type) {
              // El bloque siguiente es del mismo tipo, buscar su wrapper y añadir al inicio
              var nextBlockElement = this.container.querySelector('[data-block-id="' + nextBlock.id + '"]');
              if (nextBlockElement && nextBlockElement.parentNode &&
                  (nextBlockElement.parentNode.tagName === 'UL' || nextBlockElement.parentNode.tagName === 'OL')) {
                var listWrapper = nextBlockElement.parentNode;
                var newBlockElement = this.createBlockElement(newBlock);
                listWrapper.insertBefore(newBlockElement, nextBlockElement);

                this.focusNewBlock(newBlockElement);
                return;
              }
            }

            // Crear nuevo wrapper de lista
            var newBlockElement = this.createBlockElement(newBlock);
            var listWrapper;
            if (newBlock.type === 'bulletList') {
              listWrapper = document.createElement('ul');
              listWrapper.className = 'mewyse-list-group';
            } else if (newBlock.type === 'numberList') {
              listWrapper = document.createElement('ol');
              listWrapper.className = 'mewyse-list-group';
            } else {
              listWrapper = document.createElement('ul');
              listWrapper.className = 'mewyse-list-group mewyse-checklist-group';
            }
            listWrapper.appendChild(newBlockElement);

            // Insertar el wrapper en la posicion correcta
            if (newBlockIndex === this.blocks.length - 1) {
              this.container.appendChild(listWrapper);
            } else {
              var nextBlockEl = this.container.querySelector('[data-block-id="' + this.blocks[newBlockIndex + 1].id + '"]');
              if (nextBlockEl) {
                // Si el siguiente es una lista, insertar antes de su wrapper
                var insertBefore = nextBlockEl.parentNode.tagName === 'UL' || nextBlockEl.parentNode.tagName === 'OL'
                  ? nextBlockEl.parentNode
                  : nextBlockEl;
                this.container.insertBefore(listWrapper, insertBefore);
              } else {
                this.container.appendChild(listWrapper);
              }
            }

            this.focusNewBlock(newBlockElement);
            return;
          }

          // Bloque no es lista - insertar normalmente
          var newBlockElement = this.createBlockElement(newBlock);

          // Insertar el bloque en la posición correcta
          if (newBlockIndex === this.blocks.length - 1) {
            // Es el último bloque, simplemente añadir al final
            this.container.appendChild(newBlockElement);
          } else {
            // Insertar antes del bloque siguiente
            var nextBlock = this.blocks[newBlockIndex + 1];
            var nextBlockElement = this.container.querySelector('[data-block-id="' + nextBlock.id + '"]');
            if (nextBlockElement) {
              // Si el siguiente es una lista, insertar antes de su wrapper
              var insertBefore = nextBlockElement.parentNode &&
                (nextBlockElement.parentNode.tagName === 'UL' || nextBlockElement.parentNode.tagName === 'OL')
                ? nextBlockElement.parentNode
                : nextBlockElement;
              this.container.insertBefore(newBlockElement, insertBefore);
            } else {
              // Si no encontramos el siguiente, añadir al final
              this.container.appendChild(newBlockElement);
            }
          }

          // Enfocar el nuevo bloque
          this.focusNewBlock(newBlockElement);

          return; // Salir temprano, no hacer render completo
        }
      }
      // Si existingElement existe, significa que el bloque ya está en el DOM
      // No hacer nada aquí, seguir con el render completo más abajo
    }

    // Render completo: solo cuando NO estamos añadiendo un nuevo bloque
    // Guardar el foco actual antes de renderizar
    var focusedBlockId = focusBlockId || null; // Usar el focusBlockId si se proporciona
    var selection = null;
    var activeElement = document.activeElement;

    // Si no se proporciona focusBlockId, intentar capturar del elemento activo
    if (!focusedBlockId && activeElement && activeElement.isContentEditable) {
      var blockElement = activeElement.closest('[data-block-id]');
      if (blockElement) {
        focusedBlockId = parseInt(blockElement.getAttribute('data-block-id'));
        // Guardar posición del cursor
        try {
          var sel = window.getSelection();
          if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            selection = {
              startOffset: range.startOffset,
              endOffset: range.endOffset
            };
          }
        } catch(e) {}
      }
    }

    this.container.innerHTML = '';

    // Renderizar bloques con agrupacion de listas (incluyendo anidación por indentLevel)
    var i = 0;
    while (i < this.blocks.length) {
      var block = this.blocks[i];

      // Verificar si es un tipo de lista que necesita agrupacion
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var result = this._buildNestedListWrapper(this.blocks, i);
        self.container.appendChild(result.wrapper);
        i += result.consumed;
      } else {
        // Bloque normal (no es lista)
        var blockElement = self.createBlockElement(block);
        self.container.appendChild(blockElement);
        i++;
      }
    }

    // Recrear botón de resumen si está habilitado
    if (this.showSummary) {
      this.createSummaryButton();
    }

    // Restaurar el foco si había uno.
    // Si el caller activó `_skipAutoFocus` es porque va a colocar el foco
    // síncronamente — saltarse este setTimeout evita un re-focus async que
    // rompería el gesto del usuario en móvil (oculta el teclado virtual).
    if (focusedBlockId !== null && !this._skipAutoFocus) {
      setTimeout(function() {
        var blockElement = self.container.querySelector('[data-block-id="' + focusedBlockId + '"]');
        if (blockElement) {
          var contentEditable = blockElement.querySelector('[contenteditable="true"]');
          // Si el bloque es directamente contenteditable (no tiene un hijo contenteditable)
          if (!contentEditable && blockElement.getAttribute('contenteditable') === 'true') {
            contentEditable = blockElement;
          }
          if (contentEditable) {
            contentEditable.focus();
            try {
              var range = document.createRange();
              var sel = window.getSelection();

              // Si hay una selección guardada, restaurarla
              if (selection && selection.startOffset !== undefined) {
                if (contentEditable.firstChild && contentEditable.firstChild.nodeType === 3) {
                  var offset = Math.min(selection.startOffset, contentEditable.firstChild.length);
                  range.setStart(contentEditable.firstChild, offset);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
                } else if (contentEditable.childNodes.length > 0) {
                  range.setStart(contentEditable.childNodes[0], 0);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
                } else {
                  range.setStart(contentEditable, 0);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
                }
              } else {
                // Si no hay selección guardada, colocar el cursor al final
                range.selectNodeContents(contentEditable);
                range.collapse(false); // false = colapsar al final
                sel.removeAllRanges();
                sel.addRange(range);
              }
            } catch(e) {}
          }
        }
      }, 10);
    }
  };

  /**
   * Crea el elemento DOM de un bloque (elemento semantico directo)
   * @param {Object} block - Datos del bloque
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createBlockElement = function(block) {
    var self = this;
    var element;

    // Crear el elemento semantico segun el tipo
    switch (block.type) {
      case 'heading1':
        element = document.createElement('h1');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', 'Encabezado 1');
        this.attachBlockEvents(element, block.id);
        break;

      case 'heading2':
        element = document.createElement('h2');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', 'Encabezado 2');
        this.attachBlockEvents(element, block.id);
        break;

      case 'heading3':
        element = document.createElement('h3');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', 'Encabezado 3');
        this.attachBlockEvents(element, block.id);
        break;

      case 'quote':
        element = document.createElement('blockquote');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', self.t('placeholders.quote'));
        this.attachBlockEvents(element, block.id);
        break;

      case 'code':
        element = document.createElement('pre');
        var code = document.createElement('code');
        code.contentEditable = true;
        code.innerHTML = block.content || '';
        element.appendChild(code);
        this.attachBlockEvents(code, block.id);
        break;

      case 'bulletList':
        // Para listas, el bloque es el <li> directamente
        // El <ul> wrapper se crea en render()
        element = document.createElement('li');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', 'Elemento de lista');
        this.attachBlockEvents(element, block.id);
        break;

      case 'numberList':
        // Para listas ordenadas, el bloque es el <li> directamente
        // El <ol> wrapper se crea en render()
        element = document.createElement('li');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', 'Elemento de lista');
        this.attachBlockEvents(element, block.id);
        break;

      case 'checklist':
        // Para checklist, creamos un <li> con checkbox
        element = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = block.checked || false;
        checkbox.onchange = function() {
          block.checked = checkbox.checked;
          if (checkbox.checked) {
            element.classList.add('checked');
          } else {
            element.classList.remove('checked');
          }
          self.triggerChange();
        };
        var contentSpan = document.createElement('span');
        contentSpan.className = 'mewyse-checklist-content';
        contentSpan.contentEditable = true;
        contentSpan.innerHTML = block.content || '';
        contentSpan.setAttribute('data-placeholder', 'Tarea...');
        element.appendChild(checkbox);
        element.appendChild(contentSpan);
        if (block.checked) {
          element.classList.add('checked');
        }
        this.attachBlockEvents(contentSpan, block.id);
        break;

      case 'table':
        // Las tablas mantienen su wrapper
        element = this.createTableElement(block);
        break;

      case 'image':
        // Las imagenes mantienen su wrapper
        element = this.createImageElement(block);
        break;

      case 'video':
        element = this.createVideoElement(block);
        break;

      case 'audio':
        element = this.createAudioElement(block);
        break;

      case 'divider':
        element = document.createElement('hr');
        break;

      default: // paragraph
        element = document.createElement('p');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', 'Escribe "/" para ver los comandos...');
        this.attachBlockEvents(element, block.id);
    }

    // Añadir clase y atributos comunes
    element.classList.add('mewyse-block');
    element.setAttribute('data-block-id', block.id);
    element.setAttribute('data-block-type', block.type);

    // Aplicar customClass (styleFormats) si existe
    if (block.customClass && typeof block.customClass === 'string') {
      element.classList.add(block.customClass);
    }

    // Eventos para drag & drop
    this.attachDragDropEvents(element, block.id);

    // Eventos para mostrar el handle flotante
    this.attachFloatingHandleEvents(element, block.id);

    return element;
  };

  /**
   * Adjunta eventos de drag & drop a un elemento de bloque
   * @param {HTMLElement} element
   * @param {number} blockId
   */
  meWYSE.prototype.attachDragDropEvents = function(element, blockId) {
    var self = this;

    // Helper para comprobar si hay un bloque siendo arrastrado (compatible con null/undefined)
    var hasActiveBlockDrag = function() {
      return self.draggedBlockId != null && self.draggedBlockId !== blockId;
    };

    element.ondragover = function(e) {
      // Drag de bloque (reordenar)
      if (hasActiveBlockDrag()) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        element.classList.add('drag-over');
        return;
      }
      // Drag de imagen interna (mover entre bloques)
      if (self._draggedImage) {
        e.preventDefault();
        try { e.dataTransfer.dropEffect = 'move'; } catch (err) {}
      }
      // Para drag de archivos externos, NO hacer preventDefault aquí — el handler
      // del container se encarga (evita que el block intercepte el drop).
    };

    element.ondragleave = function(e) {
      element.classList.remove('drag-over');
    };

    element.ondrop = function(e) {
      // Si es drag de imagen interna, delegar al manejo específico
      if (self._draggedImage) {
        // Si el target está dentro de una celda, el handler de la celda se encargará
        var cellTarget = e.target && e.target.closest ? e.target.closest('td, th') : null;
        if (cellTarget) return; // dejar propagar al handler de la celda
        e.preventDefault();
        e.stopPropagation();
        self._dropImageIntoBlock(element);
        return;
      }

      // Si es reordenamiento de bloque, manejar aquí
      if (hasActiveBlockDrag()) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('drag-over');
        self.moveBlock(self.draggedBlockId, blockId);
        return;
      }

      // Caso: drag de archivos externos (imágenes del OS).
      // NO hacer preventDefault ni stopPropagation — dejar que burbujee al
      // handler del container (_imageDropHandler) para procesar el archivo.
      element.classList.remove('drag-over');
    };
  };

  /**
   * Adjunta eventos para mostrar/ocultar el handle flotante
   * @param {HTMLElement} element
   * @param {number} blockId
   */
  meWYSE.prototype.attachFloatingHandleEvents = function(element, blockId) {
    var self = this;

    element.addEventListener('mouseenter', function() {
      // Cancelar cualquier timeout de ocultación pendiente
      if (self.floatingHandleHideTimeout) {
        clearTimeout(self.floatingHandleHideTimeout);
        self.floatingHandleHideTimeout = null;
      }
      self.positionFloatingHandle(element, blockId);
    });

    element.addEventListener('mouseleave', function(e) {
      // Solo ocultar si no estamos entrando en el handle flotante
      var relatedTarget = e.relatedTarget;
      if (!relatedTarget || !self.floatingHandle.contains(relatedTarget)) {
        // Usar un pequeño delay para dar tiempo a llegar al handle
        self.floatingHandleHideTimeout = setTimeout(function() {
          self.hideFloatingHandle();
        }, 100);
      }
    });

    element.addEventListener('focus', function() {
      self.positionFloatingHandle(element, blockId);
    }, true);
  };

  /**
   * Crea el elemento de tabla (con wrapper)
   * @param {Object} block - Datos del bloque
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createTableElement = function(block) {
    var self = this;

    // Crear wrapper para la tabla
    var tableWrapper = document.createElement('div');
    tableWrapper.className = 'mewyse-table-wrapper';

    var table = document.createElement('table');
    // Solo aplicar inline el tableStyle personalizado (desde "Propiedades de la tabla").
    // Sin tableStyle: sin style inline — los defaults visuales vienen del CSS inyectado
    // (.mewyse-block-content table { width:100%; border-collapse:collapse }).
    if (typeof block.tableStyle === 'string' && block.tableStyle) {
      table.setAttribute('style', block.tableStyle);
    }

    // Si ya hay contenido (tabla cargada), parsearlo
    if (block.content && block.content !== '') {
      table.innerHTML = block.content;

      // Hacer todas las celdas editables y añadir controles
      // NO aplicamos border/padding default inline: los cubre el CSS inyectado
      // durante la edición, pero el export queda limpio si el user no configuró nada.
      var cells = table.querySelectorAll('td, th');
      for (var c = 0; c < cells.length; c++) {
        var cell = cells[c];

        // Verificar si la celda contiene una imagen (con o sin la clase mewyse-image)
        var imgInCell = cell.querySelector('img');
        if (imgInCell) {
          // Asegurar que tenga la clase para que los selectores funcionen
          if (!imgInCell.classList.contains('mewyse-image')) {
            imgInCell.classList.add('mewyse-image');
          }
          // Si la imagen está dentro de un <p> (HTML legacy), envolverla en el wrapper estándar
          if (!imgInCell.closest('.mewyse-image-wrapper')) {
            var wrapper = document.createElement('div');
            wrapper.className = 'mewyse-image-wrapper';
            var container = document.createElement('div');
            container.className = 'mewyse-image-container';
            imgInCell.parentNode.replaceChild(wrapper, imgInCell);
            container.appendChild(imgInCell);
            wrapper.appendChild(container);
            // Limpiar el <p> o texto vacío que quedó alrededor
            var pParent = wrapper.parentNode;
            if (pParent && pParent.tagName === 'P') {
              // Sacar el wrapper fuera del <p>
              var cellEl = pParent.parentNode;
              cellEl.insertBefore(wrapper, pParent);
              if (!pParent.textContent.trim() && pParent.children.length === 0) {
                cellEl.removeChild(pParent);
              }
            }
          }
          imgInCell.onclick = function(e) {
            e.stopPropagation();
            var cellElement = this.closest('td, th');
            self.selectImage(this, null, true, cellElement);
          };
          imgInCell.setAttribute('data-in-table', 'true');
          imgInCell.setAttribute('tabindex', '0');
          // Habilitar drag & drop
          self._attachImageDragHandlers(imgInCell, { source: 'cell', tableCell: cell });
          continue;
        }

        var existingContent = cell.innerHTML.trim();
        var cellContent;

        if (cell.firstElementChild && ['P', 'H1', 'H2', 'H3', 'BLOCKQUOTE', 'PRE', 'UL', 'OL'].indexOf(cell.firstElementChild.tagName) !== -1) {
          cellContent = cell.firstElementChild;
        } else {
          cellContent = document.createElement('p');
          cellContent.innerHTML = existingContent || '';
          cell.innerHTML = '';
          cell.appendChild(cellContent);
        }

        cellContent.contentEditable = true;
        // Estilos del <p> interno cubiertos por CSS inyectado (table td > p)

        this.attachTableCellEvents(cellContent, block.id);
      }
    } else {
      // Crear tabla 3x3 por defecto (sin border/padding inline — los cubre el CSS inyectado)
      var tbody = document.createElement('tbody');
      for (var r = 0; r < 3; r++) {
        var row = document.createElement('tr');
        for (var col = 0; col < 3; col++) {
          var cell = document.createElement('td');

          var cellContent = document.createElement('p');
          cellContent.contentEditable = true;
          cellContent.setAttribute('data-placeholder', '');

          cell.appendChild(cellContent);
          this.attachTableCellEvents(cellContent, block.id);
          row.appendChild(cell);
        }
        tbody.appendChild(row);
      }
      table.appendChild(tbody);
    }

    // Añadir controles de fila/columna
    this.addTableControls(table, block.id);
    this.addTableSelectionEvents(table, block.id);
    this.enableColumnResizing(table, block.id);

    tableWrapper.appendChild(table);

    // Botón para añadir fila
    var addRowBtn = document.createElement('button');
    addRowBtn.className = 'mewyse-table-add-row';
    addRowBtn.innerHTML = WYSIWYG_ICONS.plus;
    addRowBtn.title = self.t('tooltips.addRow');
    addRowBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.addTableRow(table, block.id);
    };
    tableWrapper.appendChild(addRowBtn);

    // Botón para añadir columna
    var addColBtn = document.createElement('button');
    addColBtn.className = 'mewyse-table-add-col';
    addColBtn.innerHTML = WYSIWYG_ICONS.plus;
    addColBtn.title = self.t('tooltips.addColumn');
    addColBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.addTableColumn(table, block.id);
    };
    tableWrapper.appendChild(addColBtn);

    return tableWrapper;
  };

  /**
   * Crea el elemento de imagen (con wrapper)
   * @param {Object} block - Datos del bloque
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createImageElement = function(block) {
    var self = this;

    var imageWrapper = document.createElement('div');
    imageWrapper.className = 'mewyse-image-wrapper';

    var imageContainer = document.createElement('div');
    imageContainer.className = 'mewyse-image-container';

    var img = document.createElement('img');
    img.className = 'mewyse-image';

    if (typeof block.content === 'object' && block.content.blob) {
      img.src = block.content.blob;
      img.alt = block.content.fileName || 'Imagen';
      img.style.width = block.content.width + 'px';
      img.style.height = block.content.height + 'px';
      img.setAttribute('data-original-width', block.content.width);
      img.setAttribute('data-original-height', block.content.height);

      // Aplicar opciones avanzadas (border/margin/alignment)
      this._applyImageAdvancedStyles(img, imageWrapper, block.content.advanced);
    }

    imageContainer.appendChild(img);

    // Botón para editar dimensiones
    var editImageBtn = document.createElement('button');
    editImageBtn.className = 'mewyse-image-edit-btn';
    editImageBtn.innerHTML = WYSIWYG_ICONS.gear;
    editImageBtn.title = self.t('tooltips.editDimensions');
    editImageBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.editImageDimensions(block.id, img);
    };
    imageContainer.appendChild(editImageBtn);

    // Handle de redimensionamiento
    var resizeHandle = document.createElement('div');
    resizeHandle.className = 'mewyse-image-resize-handle';
    resizeHandle.title = self.t('tooltips.dragToResize');

    var isResizing = false;
    var startX, startY, startWidth;
    var aspectRatio = block.content && block.content.width && block.content.height
      ? block.content.width / block.content.height
      : 1;

    resizeHandle.onmousedown = function(e) {
      e.preventDefault();
      e.stopPropagation();
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(img.style.width) || 200;
      document.body.style.cursor = 'nwse-resize';
      imageContainer.classList.add('mewyse-image-resizing');
      document.body.style.userSelect = 'none';
    };

    var mousemoveHandler = function(e) {
      if (!isResizing) return;
      var deltaX = e.clientX - startX;
      var deltaY = e.clientY - startY;
      var delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
      var newWidth = startWidth + delta;
      var newHeight = Math.round(newWidth / aspectRatio);
      if (newWidth < 50) {
        newWidth = 50;
        newHeight = Math.round(newWidth / aspectRatio);
      }
      img.style.width = newWidth + 'px';
      img.style.height = newHeight + 'px';
    };

    var mouseupHandler = function(e) {
      if (!isResizing) return;
      isResizing = false;
      document.body.style.cursor = '';
      imageContainer.classList.remove('mewyse-image-resizing');
      document.body.style.userSelect = '';

      // Remover event listeners
      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mouseupHandler);

      var finalWidth = parseInt(img.style.width);
      var finalHeight = parseInt(img.style.height);
      if (block.content) {
        block.content.width = finalWidth;
        block.content.height = finalHeight;
      }
      self.triggerChange();
    };

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);

    imageContainer.appendChild(resizeHandle);
    imageWrapper.appendChild(imageContainer);

    img.onclick = function(e) {
      e.stopPropagation();
      self.selectImage(img, block.id, false);
    };

    img.setAttribute('data-block-id', block.id);
    img.setAttribute('tabindex', '0');

    // Habilitar drag & drop para mover entre bloques/celdas
    self._attachImageDragHandlers(img, { source: 'block', blockId: block.id });

    return imageWrapper;
  };

  /**
   * Crea el elemento de contenido según el tipo de bloque (LEGACY - mantener por compatibilidad)
   * @param {Object} block - Datos del bloque
   * @returns {HTMLElement}
   * @deprecated Usar createBlockElement en su lugar
   */
  meWYSE.prototype.createContentElement = function(block) {
    var self = this;
    var element;

    switch (block.type) {
      case 'heading1':
        element = document.createElement('h1');
        break;
      case 'heading2':
        element = document.createElement('h2');
        break;
      case 'heading3':
        element = document.createElement('h3');
        break;
      case 'quote':
        element = document.createElement('blockquote');
        break;
      case 'code':
        element = document.createElement('pre');
        var code = document.createElement('code');
        code.contentEditable = true;
        code.innerHTML = block.content || '';
        element.appendChild(code);
        this.attachBlockEvents(code, block.id);
        return element;
      case 'bulletList':
        element = document.createElement('ul');
        var li = document.createElement('li');
        li.contentEditable = true;
        li.innerHTML = block.content || '';
        element.appendChild(li);
        this.attachBlockEvents(li, block.id);
        return element;
      case 'numberList':
        element = document.createElement('ol');

        // Calcular el número de inicio basado en bloques consecutivos anteriores
        var startNumber = 1;
        var currentIndex = this.getBlockIndex(block.id);

        if (currentIndex > 0) {
          // Contar cuántos bloques numberList consecutivos hay antes de este
          for (var i = currentIndex - 1; i >= 0; i--) {
            var prevBlock = this.blocks[i];
            if (prevBlock.type === 'numberList') {
              startNumber++;
            } else {
              break; // Dejar de contar si encontramos un bloque que no es numberList
            }
          }
        }

        element.setAttribute('start', startNumber);
        var oli = document.createElement('li');
        oli.contentEditable = true;
        oli.innerHTML = block.content || '';
        element.appendChild(oli);
        this.attachBlockEvents(oli, block.id);
        return element;
      case 'table':
        // Crear wrapper para la tabla
        var tableWrapper = document.createElement('div');
        tableWrapper.className = 'mewyse-table-wrapper';

        element = document.createElement('table');
        // Solo aplicar inline el tableStyle personalizado. Sin él, los defaults
        // vienen del CSS inyectado y quedan fuera del export.
        if (typeof block.tableStyle === 'string' && block.tableStyle) {
          element.setAttribute('style', block.tableStyle);
        }

        // Si ya hay contenido (tabla cargada), parsearlo
        if (block.content && block.content !== '') {
          element.innerHTML = block.content;

          // Hacer todas las celdas editables y añadir controles
          // Estilos default cubiertos por CSS inyectado (no inline para que el export quede limpio)
          var cells = element.querySelectorAll('td, th');
          for (var c = 0; c < cells.length; c++) {
            var cell = cells[c];

            // Verificar si la celda contiene una imagen
            var imgInCell = cell.querySelector('img.mewyse-image');
            if (imgInCell) {
              // La celda contiene una imagen, añadir event listeners
              imgInCell.onclick = function(e) {
                e.stopPropagation();
                var cellElement = this.closest('td, th');
                self.selectImage(this, null, true, cellElement);
              };
              imgInCell.setAttribute('data-in-table', 'true');
              imgInCell.setAttribute('tabindex', '0');
              // Habilitar drag & drop
              self._attachImageDragHandlers(imgInCell, { source: 'cell', tableCell: cell });
              continue; // Saltar al siguiente elemento, esta celda ya está procesada
            }

            var existingContent = cell.innerHTML.trim();
            var cellContent;

            // Si ya existe un elemento de bloque válido, mantenerlo
            if (cell.firstElementChild && ['P', 'H1', 'H2', 'H3', 'BLOCKQUOTE', 'PRE', 'UL', 'OL'].indexOf(cell.firstElementChild.tagName) !== -1) {
              cellContent = cell.firstElementChild;
            } else {
              // Crear nuevo párrafo con el contenido existente
              cellContent = document.createElement('p');
              cellContent.innerHTML = existingContent || '';
              cell.innerHTML = '';
              cell.appendChild(cellContent);
            }

            cellContent.contentEditable = true;

            this.attachTableCellEvents(cellContent, block.id);
          }
        } else {
          // Crear tabla 3x3 por defecto (sin estilos inline — CSS inyectado)
          var tbody = document.createElement('tbody');
          for (var r = 0; r < 3; r++) {
            var row = document.createElement('tr');
            for (var col = 0; col < 3; col++) {
              var cell = document.createElement('td');

              var cellContent = document.createElement('p');
              cellContent.contentEditable = true;
              cellContent.setAttribute('data-placeholder', '');

              cell.appendChild(cellContent);
              this.attachTableCellEvents(cellContent, block.id);
              row.appendChild(cell);
            }
            tbody.appendChild(row);
          }
          element.appendChild(tbody);
        }

        // Añadir controles de fila/columna a las celdas
        this.addTableControls(element, block.id);

        // Añadir eventos de selección de celdas a la tabla
        this.addTableSelectionEvents(element, block.id);

        // Habilitar redimensionamiento de columnas
        this.enableColumnResizing(element, block.id);

        tableWrapper.appendChild(element);

        // Botón para añadir fila
        var addRowBtn = document.createElement('button');
        addRowBtn.className = 'mewyse-table-add-row';
        addRowBtn.innerHTML = WYSIWYG_ICONS.plus;
        addRowBtn.title = self.t('tooltips.addRow');
        addRowBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.addTableRow(element, block.id);
        };
        tableWrapper.appendChild(addRowBtn);

        // Botón para añadir columna
        var addColBtn = document.createElement('button');
        addColBtn.className = 'mewyse-table-add-col';
        addColBtn.innerHTML = WYSIWYG_ICONS.plus;
        addColBtn.title = self.t('tooltips.addColumn');
        addColBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.addTableColumn(element, block.id);
        };
        tableWrapper.appendChild(addColBtn);

        return tableWrapper;
      case 'image':
        // Crear wrapper para la imagen
        var imageWrapper = document.createElement('div');
        imageWrapper.className = 'mewyse-image-wrapper';

        // Crear contenedor interno con posición relativa
        var imageContainer = document.createElement('div');
        imageContainer.className = 'mewyse-image-container';

        element = document.createElement('img');
        element.className = 'mewyse-image';

        // Si el contenido es un objeto con la información de la imagen
        if (typeof block.content === 'object' && block.content.blob) {
          element.src = block.content.blob;
          element.alt = block.content.fileName || 'Imagen';
          element.style.width = block.content.width + 'px';
          element.style.height = block.content.height + 'px';

          // Guardar las dimensiones en atributos data
          element.setAttribute('data-original-width', block.content.width);
          element.setAttribute('data-original-height', block.content.height);
        }

        imageContainer.appendChild(element);

        // Botón para editar dimensiones
        var editImageBtn = document.createElement('button');
        editImageBtn.className = 'mewyse-image-edit-btn';
        editImageBtn.innerHTML = WYSIWYG_ICONS.gear;
        editImageBtn.title = self.t('tooltips.editDimensions');
        editImageBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.editImageDimensions(block.id, element);
        };
        imageContainer.appendChild(editImageBtn);

        // Handle de redimensionamiento
        var resizeHandle = document.createElement('div');
        resizeHandle.className = 'mewyse-image-resize-handle';
        resizeHandle.title = self.t('tooltips.dragToResize');

        // Variables para el redimensionamiento
        var isResizing = false;
        var startX, startY, startWidth;
        var aspectRatio = block.content.width / block.content.height;

        resizeHandle.onmousedown = function(e) {
          e.preventDefault();
          e.stopPropagation();

          isResizing = true;
          startX = e.clientX;
          startY = e.clientY;
          startWidth = parseInt(element.style.width);

          // Añadir clase para cambiar cursor globalmente
          document.body.style.cursor = 'nwse-resize';
          imageContainer.classList.add('mewyse-image-resizing');

          // Prevenir selección de texto durante el resize
          document.body.style.userSelect = 'none';
        };

        document.onmousemove = function(e) {
          if (!isResizing) return;

          var deltaX = e.clientX - startX;
          var deltaY = e.clientY - startY;

          // Usar el mayor delta para mantener proporciones
          var delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

          var newWidth = startWidth + delta;
          var newHeight = Math.round(newWidth / aspectRatio);

          // Límites mínimos
          if (newWidth < 50) {
            newWidth = 50;
            newHeight = Math.round(newWidth / aspectRatio);
          }

          // Aplicar nuevas dimensiones
          element.style.width = newWidth + 'px';
          element.style.height = newHeight + 'px';
        };

        document.onmouseup = function(e) {
          if (!isResizing) return;

          isResizing = false;
          document.body.style.cursor = '';
          imageContainer.classList.remove('mewyse-image-resizing');
          document.body.style.userSelect = '';

          // Actualizar las dimensiones en el bloque
          var finalWidth = parseInt(element.style.width);
          var finalHeight = parseInt(element.style.height);

          block.content.width = finalWidth;
          block.content.height = finalHeight;

          self.triggerChange();
        };

        imageContainer.appendChild(resizeHandle);
        imageWrapper.appendChild(imageContainer);

        // Hacer la imagen seleccionable y eliminable
        element.onclick = function(e) {
          e.stopPropagation();
          self.selectImage(element, block.id, false);
        };

        // Marcar la imagen con el ID del bloque para poder eliminarla
        element.setAttribute('data-block-id', block.id);
        element.setAttribute('tabindex', '0'); // Permitir foco con teclado

        return imageWrapper;
      case 'video':
        return this.createVideoElement(block);
      case 'audio':
        return this.createAudioElement(block);
      case 'divider':
        element = document.createElement('hr');
        return element;
      default: // paragraph
        element = document.createElement('p');
    }

    element.contentEditable = true;
    element.innerHTML = block.content || '';
    element.setAttribute('data-placeholder', 'Escribe "/" para ver los comandos...');

    this.attachBlockEvents(element, block.id);

    return element;
  };

  /**
   * Adjunta eventos a un elemento de bloque
   * @param {HTMLElement} element
   * @param {number} blockId
   */
  meWYSE.prototype.attachBlockEvents = function(element, blockId) {
    var self = this;

    // Event listener para input
    element.addEventListener('input', function(e) {
      self.updateBlockContent(blockId, element.innerHTML);
    });

    // Event listener para keydown
    element.addEventListener('keydown', function(e) {
      self.handleKeyDown(e, blockId, element);
    });

    // Event listener para keyup (para detectar "/")
    element.addEventListener('keyup', function(e) {
      self.handleKeyUp(e, blockId, element);
    });

    // Event listener para paste (pegado)
    element.addEventListener('paste', function(e) {
      self.handlePaste(e, blockId, element);
    });

    // Event listener para mousedown (selección múltiple)
    element.addEventListener('mousedown', function(e) {
      self.handleBlockClick(e, blockId);
    });
  };

  /**
   * Maneja el evento de pegado (paste)
   * @param {ClipboardEvent} e
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.handlePaste = function(e, blockId, element) {
    e.preventDefault();
    var self = this;

    // Obtener el contenido del portapapeles
    var clipboardData = e.clipboardData || (window.clipboardData ? window.clipboardData : null);
    if (!clipboardData) return;

    // Detectar imagen en el clipboard (Ctrl+V tras copiar imagen)
    // Iterar items y si hay un image/*, procesarlo e insertar un bloque imagen.
    if (clipboardData.items && clipboardData.items.length > 0) {
      for (var i = 0; i < clipboardData.items.length; i++) {
        var item = clipboardData.items[i];
        if (item.kind === 'file' && item.type && item.type.indexOf('image/') === 0) {
          var file = item.getAsFile();
          if (!file) continue;
          var insertIndex = this.getBlockIndex(blockId);
          if (insertIndex < 0) insertIndex = this.blocks.length - 1;
          insertIndex++;
          self._processImageFile(file, function(imgData) {
            if (!imgData) return;
            self.createImageBlock(file, imgData.blob, imgData.width, imgData.height, insertIndex);
          });
          return;
        }
      }
    }

    var htmlData = clipboardData.getData('text/html');
    var plainText = clipboardData.getData('text/plain');

    // Si pasteAsText está habilitado, forzar siempre plaintext
    if (this.pasteAsText) {
      // Si solo hay HTML, extraer el texto visible
      if (!plainText && htmlData) {
        var tmp = document.createElement('div');
        tmp.innerHTML = htmlData;
        plainText = tmp.textContent || tmp.innerText || '';
      }
      if (plainText && plainText.trim()) {
        this.processPastedPlainText(plainText, blockId, element);
      }
      return;
    }

    // Si hay HTML del portapapeles, procesarlo
    if (htmlData && htmlData.trim()) {
      this.processPastedHTML(htmlData, blockId, element);
    } else if (plainText && plainText.trim()) {
      // Verificar si el texto plano contiene etiquetas HTML
      if (this.containsHTMLTags(plainText)) {
        // Procesar como HTML
        this.processPastedHTML(plainText, blockId, element);
      } else {
        // Procesar como texto plano
        this.processPastedPlainText(plainText, blockId, element);
      }
    }
  };

  /**
   * Verifica si un texto contiene etiquetas HTML
   * @param {string} text
   * @returns {boolean}
   */
  meWYSE.prototype.containsHTMLTags = function(text) {
    // Detectar etiquetas HTML comunes
    var htmlPattern = /<\s*(p|div|span|h[1-6]|ul|ol|li|table|tr|td|th|br|hr|blockquote|pre|code|a|strong|b|em|i|u|s|img)[\s>\/]/i;
    return htmlPattern.test(text);
  };

  /**
   * Sanea HTML eliminando estilos, clases, data attributes y otros atributos innecesarios
   * @param {HTMLElement} element
   * @returns {string}
   */
  meWYSE.prototype.sanitizeHTML = function(element) {
    // Lista de etiquetas permitidas para formato inline
    var allowedInlineTags = ['B', 'STRONG', 'I', 'EM', 'U', 'S', 'STRIKE', 'DEL', 'A', 'CODE', 'SUB', 'SUP', 'MARK', 'BR'];

    // Lista de atributos permitidos por etiqueta
    var allowedAttributes = {
      'A': ['href', 'title', 'target', 'rel']
    };

    function cleanNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // Escapar caracteres HTML especiales en texto
        var text = node.textContent;
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        var tagName = node.tagName;

        // BR se convierte en <br>
        if (tagName === 'BR') {
          return '<br>';
        }

        // Si no es una etiqueta permitida, extraer el contenido de sus hijos
        if (allowedInlineTags.indexOf(tagName) === -1) {
          var childContent = '';
          for (var i = 0; i < node.childNodes.length; i++) {
            childContent += cleanNode(node.childNodes[i]);
          }
          return childContent;
        }

        // Construir la etiqueta limpia
        var html = '<' + tagName.toLowerCase();

        // Solo añadir atributos permitidos
        var allowed = allowedAttributes[tagName] || [];
        for (var j = 0; j < allowed.length; j++) {
          var attrName = allowed[j];
          var attrValue = node.getAttribute(attrName);
          if (attrValue) {
            // Sanitizar el valor del atributo
            var safeValue = attrValue
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');
            html += ' ' + attrName + '="' + safeValue + '"';
          }
        }

        html += '>';

        // Procesar hijos
        for (var k = 0; k < node.childNodes.length; k++) {
          html += cleanNode(node.childNodes[k]);
        }

        html += '</' + tagName.toLowerCase() + '>';
        return html;
      }

      return '';
    }

    return cleanNode(element);
  };

  /**
   * Convierte un string HTML en un array de bloques listos para insertar en el modelo.
   * Detecta automáticamente iframes de YouTube/Vimeo y tags <video>/<audio> y los
   * convierte a bloques 'video'/'audio' respectivamente.
   *
   * @param {string} html - HTML a convertir
   * @returns {Array} array de bloques sin ids (los asigna _sanitizeBlocks o el caller)
   */
  meWYSE.prototype._htmlToBlocks = function(html) {
    var self = this;
    var parser, doc;
    try {
      parser = new DOMParser();
      doc = parser.parseFromString(html, 'text/html');
    } catch (e) {
      // Fallback: texto plano
      var text = (html || '').replace(/<[^>]*>/g, '').trim();
      return text ? [{ type: 'paragraph', content: escapeHtml(text) }] : [];
    }

    // Preprocesar: limpiar elementos de Word/Google Docs
    this.cleanPastedDocument(doc);

    var blocksToInsert = [];

    // Mapeo de etiquetas HTML a tipos de bloque
    var tagToBlockType = {
      'P': 'paragraph',
      'H1': 'heading1',
      'H2': 'heading2',
      'H3': 'heading3',
      'H4': 'heading3',
      'H5': 'heading3',
      'H6': 'heading3',
      'BLOCKQUOTE': 'quote',
      'PRE': 'code',
      'UL': 'bulletList',
      'OL': 'numberList',
      'HR': 'divider',
      'DIV': 'paragraph',
      'ARTICLE': 'paragraph',
      'SECTION': 'paragraph',
      'HEADER': 'paragraph',
      'FOOTER': 'paragraph'
    };

    /**
     * Procesa un nodo recursivamente y extrae bloques
     */
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent.trim();
        if (text) {
          blocksToInsert.push({
            type: 'paragraph',
            content: text
          });
        }
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      var tagName = node.tagName;

      // Ignorar elementos ocultos y scripts
      if (tagName === 'SCRIPT' || tagName === 'STYLE' || tagName === 'META' || tagName === 'LINK') {
        return;
      }

      // Manejar BR como separador de bloques
      if (tagName === 'BR') {
        return;
      }

      // Iframe: detectar YouTube/Vimeo → bloque video
      if (tagName === 'IFRAME') {
        var src = node.getAttribute('src') || '';
        var info = self._detectVideoProvider(src);
        if (info && (info.provider === 'youtube' || info.provider === 'vimeo')) {
          var w = parseInt(node.getAttribute('width'), 10);
          var h = parseInt(node.getAttribute('height'), 10);
          blocksToInsert.push({
            type: 'video',
            content: {
              provider: info.provider,
              videoId: info.videoId,
              url: info.url,
              width: (isNaN(w) || w < 1) ? 640 : w,
              height: (isNaN(h) || h < 1) ? 360 : h
            }
          });
        }
        // iframes de otros dominios se descartan (Sprint 2 para iframe genérico)
        return;
      }

      // Video nativo → bloque video (provider file)
      if (tagName === 'VIDEO') {
        var vsrc = node.getAttribute('src');
        if (!vsrc) {
          var sourceEl = node.querySelector('source');
          if (sourceEl) vsrc = sourceEl.getAttribute('src');
        }
        if (vsrc && self._isSafeMediaUrl(vsrc)) {
          var vw = parseInt(node.getAttribute('width'), 10);
          var vh = parseInt(node.getAttribute('height'), 10);
          blocksToInsert.push({
            type: 'video',
            content: {
              provider: 'file',
              videoId: null,
              url: vsrc,
              width: (isNaN(vw) || vw < 1) ? 640 : vw,
              height: (isNaN(vh) || vh < 1) ? 360 : vh
            }
          });
        }
        return;
      }

      // Audio nativo → bloque audio
      if (tagName === 'AUDIO') {
        var asrc = node.getAttribute('src');
        if (!asrc) {
          var asource = node.querySelector('source');
          if (asource) asrc = asource.getAttribute('src');
        }
        if (asrc && self._isSafeMediaUrl(asrc)) {
          blocksToInsert.push({
            type: 'audio',
            content: { url: asrc, title: node.getAttribute('title') || '' }
          });
        }
        return;
      }

      // IMG suelto (no dentro de un bloque) → bloque image
      if (tagName === 'IMG') {
        var imgSrc = node.getAttribute('src');
        if (imgSrc && self._isSafeImageUrl(imgSrc)) {
          var imgW = parseInt(node.getAttribute('width'), 10);
          var imgH = parseInt(node.getAttribute('height'), 10);
          blocksToInsert.push({
            type: 'image',
            content: {
              blob: imgSrc,
              fileName: node.getAttribute('alt') || 'image',
              width: (isNaN(imgW) || imgW < 1) ? 300 : imgW,
              height: (isNaN(imgH) || imgH < 1) ? 200 : imgH
            }
          });
        }
        return;
      }

      // Manejar listas
      if (tagName === 'UL' || tagName === 'OL') {
        var listType = tagName === 'UL' ? 'bulletList' : 'numberList';
        var listItems = node.querySelectorAll(':scope > li');
        for (var j = 0; j < listItems.length; j++) {
          var liContent = self.sanitizeHTML(listItems[j]).trim();
          if (liContent) {
            blocksToInsert.push({
              type: listType,
              content: liContent
            });
          }
        }
        return;
      }

      // Manejar tablas - convertir a bloque de tabla
      if (tagName === 'TABLE') {
        var tableContent = self.cleanTableHTML(node);
        var tableStyle = node.getAttribute('style') || '';
        var tableBlock = {
          type: 'table',
          content: tableContent
        };
        if (tableStyle) {
          var cleanStyle = self._sanitizeStyle(tableStyle);
          if (cleanStyle) tableBlock.tableStyle = cleanStyle;
        }
        if (tableContent) blocksToInsert.push(tableBlock);
        return;
      }

      // Manejar HR
      if (tagName === 'HR') {
        blocksToInsert.push({
          type: 'divider',
          content: ''
        });
        return;
      }

      // Manejar PRE/CODE
      if (tagName === 'PRE') {
        var codeContent = node.textContent || '';
        if (codeContent.trim()) {
          blocksToInsert.push({
            type: 'code',
            content: codeContent
          });
        }
        return;
      }

      // Verificar si es un elemento de bloque
      var isBlockElement = tagToBlockType[tagName] !== undefined;

      if (isBlockElement) {
        // Verificar si contiene otros elementos de bloque anidados
        var hasBlockChildren = false;
        var children = node.childNodes;

        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.nodeType === Node.ELEMENT_NODE) {
            var childTag = child.tagName;
            if (tagToBlockType[childTag] || childTag === 'UL' || childTag === 'OL' ||
                childTag === 'TABLE' || childTag === 'BR' || childTag === 'IFRAME' ||
                childTag === 'VIDEO' || childTag === 'AUDIO' || childTag === 'IMG') {
              hasBlockChildren = true;
              break;
            }
          }
        }

        if (hasBlockChildren) {
          // Procesar hijos recursivamente
          for (var k = 0; k < children.length; k++) {
            processNode(children[k]);
          }
        } else {
          // Es un bloque sin hijos de bloque, extraer contenido
          var blockType = tagToBlockType[tagName] || 'paragraph';
          var content = self.sanitizeHTML(node).trim();

          if (content) {
            blocksToInsert.push({
              type: blockType,
              content: content
            });
          }
        }
      } else {
        // Elemento inline o desconocido - procesar hijos
        var nodeChildren = node.childNodes;
        for (var m = 0; m < nodeChildren.length; m++) {
          processNode(nodeChildren[m]);
        }
      }
    }

    // Procesar todos los nodos del body
    var bodyChildren = doc.body.childNodes;
    for (var i = 0; i < bodyChildren.length; i++) {
      processNode(bodyChildren[i]);
    }

    // Filtrar bloques vacíos pero preservar dividers, imágenes, videos, audios
    blocksToInsert = blocksToInsert.filter(function(block) {
      if (block.type === 'divider' || block.type === 'image' ||
          block.type === 'video' || block.type === 'audio') return true;
      if (typeof block.content === 'string') return block.content.trim() !== '';
      return !!block.content;
    });

    return blocksToInsert;
  };

  /**
   * Procesa HTML pegado y crea bloques apropiados (inserta en posición actual).
   * @param {string} html
   * @param {number} currentBlockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.processPastedHTML = function(html, currentBlockId, element) {
    this.pushHistory(true);

    var blocksToInsert = this._htmlToBlocks(html);

    // Si no hay bloques, intentar con el texto plano
    if (blocksToInsert.length === 0) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var plainText = doc.body.textContent || '';
      if (plainText.trim()) {
        this.processPastedPlainText(plainText, currentBlockId, element);
      }
      return;
    }

    // Insertar los bloques
    var currentIndex = this.getBlockIndex(currentBlockId);
    var currentContent = element.textContent || element.innerText || '';

    if (currentContent.trim() === '') {
      // Reemplazar el bloque actual con el primer bloque pegado
      var firstBlock = blocksToInsert[0];
      var block = this.getBlock(currentBlockId);
      if (block) {
        block.type = firstBlock.type;
        block.content = firstBlock.content;
        // Re-renderizar el bloque actual
        var blockElement = this.container.querySelector('[data-block-id="' + currentBlockId + '"]');
        if (blockElement) {
          var newBlockElement = this.createBlockElement(block);
          blockElement.parentNode.replaceChild(newBlockElement, blockElement);
        }
      }
      // Insertar los bloques restantes
      for (var n = 1; n < blocksToInsert.length; n++) {
        this.insertBlockAt(currentIndex + n, blocksToInsert[n].type, blocksToInsert[n].content);
      }
    } else {
      // Si el bloque actual tiene contenido, insertar todos los bloques después
      for (var o = 0; o < blocksToInsert.length; o++) {
        this.insertBlockAt(currentIndex + 1 + o, blocksToInsert[o].type, blocksToInsert[o].content);
      }
    }

    this.triggerChange();
  };

  /**
   * Limpia el documento de elementos específicos de Word/Google Docs
   * @param {Document} doc
   */
  meWYSE.prototype.cleanPastedDocument = function(doc) {
    // 1. Eliminar elementos de Word/Office completamente (+ XML, style, meta, script, link)
    var junkSelector = 'o\\:p, v\\:*, w\\:*, m\\:*, xml, style, meta, link, script, title, head > *';
    var junkNodes;
    try {
      junkNodes = doc.querySelectorAll(junkSelector);
    } catch (e) {
      junkNodes = doc.querySelectorAll('xml, style, meta, link, script');
    }
    for (var i = 0; i < junkNodes.length; i++) {
      if (junkNodes[i].parentNode) junkNodes[i].remove();
    }

    // 2. Eliminar comentarios condicionales de Word (aparecen como texto "[if gte mso ...]")
    var allNodes = doc.querySelectorAll('*');
    for (var ci = 0; ci < allNodes.length; ci++) {
      var cn = allNodes[ci];
      // Nodo de comentario IE/Word
      if (cn.nodeType === 8) cn.remove();
    }

    // 3. Convertir párrafos "ListParagraph" de Word (que simulan listas con texto) en items reales
    this._convertWordListsToReal(doc);

    // 4. Eliminar clases y estilos de Microsoft Office + atributos propietarios
    var allElements = doc.querySelectorAll('*');
    for (var j = 0; j < allElements.length; j++) {
      var el = allElements[j];

      // Detectar si tenía ciertos estilos útiles antes de limpiar (bold/italic implícitos de Word)
      var styleStr = el.getAttribute('style') || '';
      var inheritedBold = /font-weight\s*:\s*(bold|[6-9]00)/i.test(styleStr);
      var inheritedItalic = /font-style\s*:\s*italic/i.test(styleStr);
      var inheritedUnderline = /text-decoration[^;]*underline/i.test(styleStr);

      el.removeAttribute('class');
      el.removeAttribute('style');
      el.removeAttribute('id');
      el.removeAttribute('lang');
      el.removeAttribute('align');
      el.removeAttribute('width');
      el.removeAttribute('height');

      // Eliminar atributos MS Office (mso-*), datos internos, xmlns, namespaces
      var attrs = el.attributes;
      var attrsToRemove = [];
      for (var k = 0; k < attrs.length; k++) {
        var attrName = attrs[k].name;
        if (attrName.indexOf('mso-') === 0 || attrName.indexOf('data-') === 0 ||
            attrName.indexOf('xmlns') === 0 || attrName.indexOf('o:') === 0 ||
            attrName.indexOf('v:') === 0 || attrName.indexOf('w:') === 0 ||
            attrName.indexOf('m:') === 0 || attrName === 'bgcolor' ||
            attrName === 'cellpadding' || attrName === 'cellspacing' || attrName === 'border') {
          attrsToRemove.push(attrName);
        }
      }
      for (var l = 0; l < attrsToRemove.length; l++) {
        el.removeAttribute(attrsToRemove[l]);
      }

      // Preservar formato inline inferido de estilos (bold/italic/underline) envolviendo el contenido
      if (inheritedBold && el.tagName !== 'B' && el.tagName !== 'STRONG' && el.tagName !== 'H1' &&
          el.tagName !== 'H2' && el.tagName !== 'H3' && el.tagName !== 'H4' && el.tagName !== 'H5' &&
          el.tagName !== 'H6' && el.tagName !== 'TH' && el.childNodes.length > 0) {
        var bWrap = doc.createElement('b');
        while (el.firstChild) bWrap.appendChild(el.firstChild);
        el.appendChild(bWrap);
      }
      if (inheritedItalic && el.tagName !== 'I' && el.tagName !== 'EM' && el.childNodes.length > 0) {
        var iWrap = doc.createElement('i');
        while (el.firstChild) iWrap.appendChild(el.firstChild);
        el.appendChild(iWrap);
      }
      if (inheritedUnderline && el.tagName !== 'U' && el.childNodes.length > 0) {
        var uWrap = doc.createElement('u');
        while (el.firstChild) uWrap.appendChild(el.firstChild);
        el.appendChild(uWrap);
      }
    }

    // 5. Reemplazar &nbsp; con espacios normales y normalizar saltos de línea
    var walker = document.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var textNode;
    while (textNode = walker.nextNode()) {
      textNode.textContent = textNode.textContent
        .replace(/\u00A0/g, ' ')       // nbsp → espacio
        .replace(/\u2028|\u2029/g, '') // separadores de línea/párrafo Unicode
        .replace(/[\u200B-\u200D\uFEFF]/g, ''); // zero-width chars
    }

    // 6. Desenvolver SPANs/FONTs vacíos o que solo contienen formato (no aportan nada)
    var unwrapTags = ['SPAN', 'FONT'];
    for (var ut = 0; ut < unwrapTags.length; ut++) {
      var toUnwrap = doc.querySelectorAll(unwrapTags[ut].toLowerCase());
      for (var m = toUnwrap.length - 1; m >= 0; m--) {
        var elUnwrap = toUnwrap[m];
        if (!elUnwrap.getAttribute('href')) {
          while (elUnwrap.firstChild) {
            elUnwrap.parentNode.insertBefore(elUnwrap.firstChild, elUnwrap);
          }
          elUnwrap.remove();
        }
      }
    }

    // 7. Eliminar párrafos/divs completamente vacíos (resultado típico de Word)
    // Preservar los que contienen medios (img, iframe, video, audio, table, hr, br)
    var emptyCandidates = doc.querySelectorAll('p, div');
    for (var ec = emptyCandidates.length - 1; ec >= 0; ec--) {
      var candidate = emptyCandidates[ec];
      var txt = (candidate.textContent || '').replace(/\s/g, '');
      if (txt === '' && candidate.querySelectorAll('img, br, hr, table, iframe, video, audio').length === 0) {
        candidate.remove();
      }
    }
  };

  /**
   * Convierte párrafos "ListParagraph" de Word (con viñetas visuales como texto) en
   * verdaderos <ul>/<ol>. Word suele exportar listas como <p class="MsoListParagraph">
   * con un bullet "·" o "o" al principio del texto.
   */
  meWYSE.prototype._convertWordListsToReal = function(doc) {
    var paragraphs = doc.querySelectorAll('p');
    // Patrones típicos de Word/Excel al inicio del texto de una "lista"
    var bulletPattern = /^[\s\u00A0]*[·•●○◦o\u25CF\u25E6\u2022\u2043\u2219\u25AA\u25AB]\s+/;
    var numberPattern = /^[\s\u00A0]*(\d+|[a-zA-Z])[.)\-]\s+/;

    var currentList = null;
    var currentType = null;

    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i];
      var text = p.textContent || '';
      var cls = p.getAttribute('class') || '';
      var isWordList = /MsoList|ListParagraph/i.test(cls);

      var matchBullet = bulletPattern.exec(text);
      var matchNumber = numberPattern.exec(text);

      if (isWordList || matchBullet || matchNumber) {
        var listType = matchNumber ? 'ol' : 'ul';

        // Crear o continuar lista
        if (!currentList || currentType !== listType) {
          currentList = doc.createElement(listType);
          currentType = listType;
          p.parentNode.insertBefore(currentList, p);
        }

        // Crear <li> y mover contenido (eliminando el bullet/numeración visual)
        var li = doc.createElement('li');
        // Remover el bullet/número del primer nodo de texto
        if (p.firstChild && p.firstChild.nodeType === 3) {
          var firstText = p.firstChild.textContent;
          if (matchBullet) {
            p.firstChild.textContent = firstText.replace(bulletPattern, '');
          } else if (matchNumber) {
            p.firstChild.textContent = firstText.replace(numberPattern, '');
          }
        }
        while (p.firstChild) li.appendChild(p.firstChild);
        currentList.appendChild(li);
        p.remove();
      } else {
        // Cualquier párrafo normal rompe la lista actual
        currentList = null;
        currentType = null;
      }
    }
  };

  /**
   * Limpia el HTML de una tabla para usar en el editor
   * @param {HTMLElement} table
   * @returns {string}
   */
  meWYSE.prototype.cleanTableHTML = function(table) {
    // Crear una copia limpia de la tabla
    var cleanTable = document.createElement('tbody');
    var rows = table.querySelectorAll('tr');

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var cleanRow = document.createElement('tr');
      var cells = row.querySelectorAll('td, th');

      for (var j = 0; j < cells.length; j++) {
        var cell = cells[j];
        var cleanCell = document.createElement(cell.tagName.toLowerCase());

        // Preservar colspan y rowspan
        if (cell.getAttribute('colspan')) {
          cleanCell.setAttribute('colspan', cell.getAttribute('colspan'));
        }
        if (cell.getAttribute('rowspan')) {
          cleanCell.setAttribute('rowspan', cell.getAttribute('rowspan'));
        }

        // Limpiar el contenido de la celda
        var cellContent = this.sanitizeHTML(cell).trim() || '';
        cleanCell.innerHTML = '<p style="padding: 8px; margin: 0; min-height: 1em;">' + cellContent + '</p>';

        cleanRow.appendChild(cleanCell);
      }

      cleanTable.appendChild(cleanRow);
    }

    return cleanTable.innerHTML;
  };

  /**
   * Procesa texto plano pegado y crea bloques por línea
   * @param {string} text
   * @param {number} currentBlockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.processPastedPlainText = function(text, currentBlockId, element) {
    this.pushHistory(true);
    var lines = text.split(/\r?\n/);

    // Filtrar líneas vacías al inicio y al final, pero mantener las del medio
    var startIndex = 0;
    var endIndex = lines.length - 1;

    while (startIndex < lines.length && lines[startIndex].trim() === '') {
      startIndex++;
    }
    while (endIndex >= 0 && lines[endIndex].trim() === '') {
      endIndex--;
    }

    if (startIndex > endIndex) {
      // Todo es vacío, pegar texto vacío en el bloque actual
      element.textContent = '';
      this.updateBlockContent(currentBlockId, '');
      return;
    }

    lines = lines.slice(startIndex, endIndex + 1);

    // Eliminar completamente las líneas vacías del contenido pegado
    var filteredLines = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      // Solo incluir líneas que tengan contenido
      if (line.trim() !== '') {
        filteredLines.push(line);
      }
    }

    lines = filteredLines;

    if (lines.length === 0) {
      return;
    }

    var currentIndex = this.getBlockIndex(currentBlockId);
    var currentContent = element.textContent || element.innerText || '';

    if (lines.length === 1) {
      // Una sola línea, insertar en el bloque actual
      var selection = window.getSelection();
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(lines[0]));
        this.updateBlockContent(currentBlockId, element.innerHTML);
      } else {
        element.textContent = lines[0];
        this.updateBlockContent(currentBlockId, lines[0]);
      }
    } else {
      // Múltiples líneas
      if (currentContent.trim() === '') {
        // Si el bloque actual está vacío, reemplazarlo con la primera línea
        element.textContent = lines[0];
        this.updateBlockContent(currentBlockId, lines[0]);

        // Insertar las líneas restantes como nuevos bloques
        for (var i = 1; i < lines.length; i++) {
          this.insertBlockAt(currentIndex + i, 'paragraph', lines[i]);
        }
      } else {
        // Si tiene contenido, insertar todas las líneas después
        for (var j = 0; j < lines.length; j++) {
          this.insertBlockAt(currentIndex + 1 + j, 'paragraph', lines[j]);
        }
      }

      this.triggerChange();
    }
  };

  /**
   * Inserta un bloque en una posición específica con contenido
   * @param {number} index
   * @param {string} type
   * @param {string} content
   */
  meWYSE.prototype.insertBlockAt = function(index, type, content) {
    var block = {
      id: ++this.currentBlockId,
      type: type || 'paragraph',
      content: content || ''
    };

    this.blocks.splice(index, 0, block);

    // Renderizar el nuevo bloque
    this.render(block.id);

    // Actualizar listas numeradas si es necesario
    if (index < this.blocks.length) {
      var self = this;
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          self.updateConsecutiveNumberLists(index);
        });
      });
    }
  };

  /**
   * Adjunta eventos a una celda de tabla
   * @param {HTMLElement} cell
   * @param {number} blockId
   */
  meWYSE.prototype.attachTableCellEvents = function(cell, blockId) {
    var self = this;

    // Event listener para input - actualizar el contenido de toda la tabla
    cell.addEventListener('input', function(e) {
      var block = self.getBlock(blockId);
      if (block) {
        // Encontrar el elemento table
        var tableElement = cell.closest('table');
        if (tableElement) {
          // Guardar el HTML completo de la tabla (limpio, sin divs internos)
          self.updateBlockContent(blockId, tableElement.innerHTML);
        }
      }
    });

    // Evitar que Enter cree nuevos bloques en las celdas
    cell.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Permitir Enter en la celda pero prevenir la creación de bloque
        e.stopPropagation();
      }
      // Escape: limpiar selección de celdas
      if (e.key === 'Escape' && self.selectedTableCells.length > 0) {
        e.preventDefault();
        self.clearTableCellSelection();
      }
    });

    // Obtener la celda contenedora (td o th)
    var tdCell = cell.closest('td, th');
    if (tdCell && !tdCell._hasSelectionEvents) {
      tdCell._hasSelectionEvents = true;

      // Mousedown: preparar para posible selección
      tdCell.addEventListener('mousedown', function(e) {
        // Solo si no es click en controles y es botón izquierdo
        if (e.button !== 0) return;
        if (e.target.classList.contains('mewyse-table-row-control') ||
            e.target.classList.contains('mewyse-table-col-control')) {
          return;
        }
        // Guardar la celda donde se hizo clic para posible inicio de selección
        self.tableCellMouseDownCell = tdCell;
        self.tableCellMouseDownBlockId = blockId;
      });

      // Drag & drop de imágenes sobre la celda
      tdCell.addEventListener('dragover', function(e) {
        if (!self._draggedImage) return;
        // Detectar que es una imagen interna del editor
        e.preventDefault();
        e.stopPropagation();
        try { e.dataTransfer.dropEffect = 'move'; } catch (err) {}
        tdCell.classList.add('mewyse-image-drop-target-cell');
      });

      tdCell.addEventListener('dragleave', function(e) {
        // Solo quitar la clase si se sale de la celda (no de un hijo)
        if (e.target === tdCell || !tdCell.contains(e.relatedTarget)) {
          tdCell.classList.remove('mewyse-image-drop-target-cell');
        }
      });

      tdCell.addEventListener('drop', function(e) {
        if (!self._draggedImage) return;
        e.preventDefault();
        e.stopPropagation();
        tdCell.classList.remove('mewyse-image-drop-target-cell');
        self._dropImageIntoCell(tdCell, blockId);
      });
    }
  };

  /**
   * Añade eventos de selección a nivel de tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.addTableSelectionEvents = function(table, blockId) {
    var self = this;

    if (table._hasSelectionEvents) return;
    table._hasSelectionEvents = true;

    // Mousemove a nivel de tabla para capturar movimiento entre celdas
    table.addEventListener('mousemove', function(e) {
      // Si hay una celda donde se hizo mousedown y el botón sigue presionado
      if (self.tableCellMouseDownCell && e.buttons === 1) {
        var currentCell = e.target.closest('td, th');

        // Si nos movimos a una celda diferente, iniciar selección
        if (currentCell && currentCell !== self.tableCellMouseDownCell) {
          if (!self.isSelectingTableCells) {
            // Iniciar selección con la celda original
            self.startTableCellSelection(self.tableCellMouseDownCell, self.tableCellMouseDownBlockId);
          }
          // Expandir a la celda actual
          self.expandTableCellSelection(currentCell);
        }
      }

      // Si ya estamos seleccionando, seguir expandiendo
      if (self.isSelectingTableCells) {
        var cell = e.target.closest('td, th');
        if (cell && cell.closest('table') === self.currentSelectionTable) {
          self.expandTableCellSelection(cell);
        }
      }
    });

    // Mouseup a nivel de tabla
    table.addEventListener('mouseup', function(e) {
      self.tableCellMouseDownCell = null;
      self.tableCellMouseDownBlockId = null;

      if (self.isSelectingTableCells) {
        self.endTableCellSelection(blockId);
      }
    });

    // Mouseleave de la tabla
    table.addEventListener('mouseleave', function(e) {
      // Si estamos arrastrando fuera de la tabla, mantener el estado
      // El mouseup global manejará la limpieza
    });
  };

  /**
   * Inicia la selección de celdas de tabla
   * @param {HTMLElement} cell - Celda td o th
   * @param {number} blockId
   */
  meWYSE.prototype.startTableCellSelection = function(cell, blockId) {
    // Evitar iniciar múltiples veces
    if (this.isSelectingTableCells) return;

    var table = cell.closest('table');
    if (!table) return;

    this.clearTableCellSelection();
    this.isSelectingTableCells = true;
    this.tableCellSelectionStart = cell;
    this.currentSelectionTable = table;
    this.currentSelectionBlockId = blockId;

    // Seleccionar la celda inicial inmediatamente
    cell.classList.add('mewyse-cell-selected');
    this.selectedTableCells.push(cell);

    // Prevenir selección de texto durante el arrastre
    table.classList.add('mewyse-table-selecting');
  };

  /**
   * Expande la selección de celdas mientras se arrastra
   * @param {HTMLElement} cell - Celda actual bajo el cursor
   */
  meWYSE.prototype.expandTableCellSelection = function(cell) {
    if (!this.isSelectingTableCells || !this.tableCellSelectionStart) return;

    var table = cell.closest('table');
    if (table !== this.currentSelectionTable) return;

    // Obtener las coordenadas de las celdas
    var startCoords = this.getTableCellCoords(this.tableCellSelectionStart);
    var endCoords = this.getTableCellCoords(cell);

    if (!startCoords || !endCoords) return;

    // Calcular el rectángulo de selección
    var minRow = Math.min(startCoords.row, endCoords.row);
    var maxRow = Math.max(startCoords.row, endCoords.row);
    var minCol = Math.min(startCoords.col, endCoords.col);
    var maxCol = Math.max(startCoords.col, endCoords.col);

    // Limpiar selección visual anterior
    this.selectedTableCells.forEach(function(c) {
      c.classList.remove('mewyse-cell-selected');
    });
    this.selectedTableCells = [];

    // Obtener todas las celdas en el rango usando la matriz lógica
    var cellsInRange = this.getCellsInRange(table, minRow, maxRow, minCol, maxCol);

    // Seleccionar las celdas
    for (var i = 0; i < cellsInRange.length; i++) {
      cellsInRange[i].classList.add('mewyse-cell-selected');
      this.selectedTableCells.push(cellsInRange[i]);
    }
  };

  /**
   * Finaliza la selección de celdas
   * @param {number} blockId
   */
  meWYSE.prototype.endTableCellSelection = function(blockId) {
    this.isSelectingTableCells = false;

    // Quitar clase de selección de la tabla
    if (this.currentSelectionTable) {
      this.currentSelectionTable.classList.remove('mewyse-table-selecting');
    }

    // Mostrar menú si hay más de una celda seleccionada
    if (this.selectedTableCells.length > 1) {
      this.showTableCellSelectionMenu(blockId);
    }
    // O si hay una única celda combinada seleccionada
    else if (this.selectedTableCells.length === 1) {
      var cell = this.selectedTableCells[0];
      var colspan = parseInt(cell.getAttribute('colspan')) || 1;
      var rowspan = parseInt(cell.getAttribute('rowspan')) || 1;
      if (colspan > 1 || rowspan > 1) {
        this.showTableCellSelectionMenu(blockId);
      }
    }
  };

  /**
   * Obtiene las coordenadas lógicas (fila, columna) de una celda
   * considerando colspan y rowspan de otras celdas
   * @param {HTMLElement} cell
   * @returns {Object|null}
   */
  meWYSE.prototype.getTableCellCoords = function(cell) {
    var row = cell.closest('tr');
    if (!row) return null;

    var table = row.closest('table');
    if (!table) return null;

    // Construir una matriz lógica de la tabla
    var matrix = this.buildTableMatrix(table);

    // Buscar la celda en la matriz
    for (var r = 0; r < matrix.length; r++) {
      for (var c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] === cell) {
          return { row: r, col: c };
        }
      }
    }

    return null;
  };

  /**
   * Construye una matriz lógica de la tabla considerando colspan/rowspan
   * @param {HTMLElement} table
   * @returns {Array}
   */
  meWYSE.prototype.buildTableMatrix = function(table) {
    var rows = table.querySelectorAll('tr');
    var matrix = [];
    var maxCols = 0;

    // Inicializar matriz vacía
    for (var i = 0; i < rows.length; i++) {
      matrix[i] = [];
    }

    // Llenar la matriz
    for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
      var cells = rows[rowIdx].querySelectorAll('td, th');
      var colIdx = 0;

      for (var cellIdx = 0; cellIdx < cells.length; cellIdx++) {
        var cell = cells[cellIdx];
        var colspan = parseInt(cell.getAttribute('colspan')) || 1;
        var rowspan = parseInt(cell.getAttribute('rowspan')) || 1;

        // Encontrar la primera columna disponible
        while (matrix[rowIdx][colIdx]) {
          colIdx++;
        }

        // Llenar las celdas ocupadas por esta celda
        for (var r = 0; r < rowspan; r++) {
          for (var c = 0; c < colspan; c++) {
            if (matrix[rowIdx + r]) {
              matrix[rowIdx + r][colIdx + c] = cell;
            }
          }
        }

        colIdx += colspan;
        if (colIdx > maxCols) maxCols = colIdx;
      }
    }

    return matrix;
  };

  /**
   * Obtiene todas las celdas únicas en un rango de la matriz
   * @param {HTMLElement} table
   * @param {number} minRow
   * @param {number} maxRow
   * @param {number} minCol
   * @param {number} maxCol
   * @returns {Array}
   */
  meWYSE.prototype.getCellsInRange = function(table, minRow, maxRow, minCol, maxCol) {
    var matrix = this.buildTableMatrix(table);
    var cells = [];
    var seen = [];

    for (var r = minRow; r <= maxRow; r++) {
      if (!matrix[r]) continue;
      for (var c = minCol; c <= maxCol; c++) {
        var cell = matrix[r][c];
        if (cell && seen.indexOf(cell) === -1) {
          seen.push(cell);
          cells.push(cell);
        }
      }
    }

    return cells;
  };

  /**
   * Limpia la selección de celdas de tabla
   */
  meWYSE.prototype.clearTableCellSelection = function() {
    // Quitar clase de selección de la tabla
    if (this.currentSelectionTable) {
      this.currentSelectionTable.classList.remove('mewyse-table-selecting');
    }

    this.selectedTableCells.forEach(function(cell) {
      cell.classList.remove('mewyse-cell-selected');
    });
    this.selectedTableCells = [];
    this.tableCellSelectionStart = null;
    this.isSelectingTableCells = false;
    this.currentSelectionTable = null;

    // Cerrar menú de celdas si existe
    var menu = document.querySelector('.mewyse-cell-menu');
    if (menu) {
      if (menu._cancelAnchor) menu._cancelAnchor();
      menu.remove();
    }
  };

  /**
   * Muestra el menú de opciones para celdas seleccionadas
   * @param {number} blockId
   */
  meWYSE.prototype.showTableCellSelectionMenu = function(blockId) {
    var self = this;

    // Cerrar menú existente
    var existingMenu = document.querySelector('.mewyse-cell-menu');
    if (existingMenu) {
      if (existingMenu._cancelAnchor) existingMenu._cancelAnchor();
      existingMenu.remove();
    }

    // Verificar si hay una celda combinada seleccionada (para opción de descombinar)
    var hasMergedCell = false;
    var mergedCell = null;
    if (this.selectedTableCells.length === 1) {
      var cell = this.selectedTableCells[0];
      var colspan = parseInt(cell.getAttribute('colspan')) || 1;
      var rowspan = parseInt(cell.getAttribute('rowspan')) || 1;
      if (colspan > 1 || rowspan > 1) {
        hasMergedCell = true;
        mergedCell = cell;
      }
    }

    // Si no hay múltiples celdas ni celda combinada, salir
    if (this.selectedTableCells.length < 2 && !hasMergedCell) return;

    var menu = document.createElement('div');
    menu.className = 'mewyse-cell-menu';

    var closeCellMenu = function() {
      if (menu._cancelAnchor) menu._cancelAnchor();
      if (menu.parentNode) menu.remove();
      self._hideBackdrop('tableCellMenu');
    };

    // Opción de combinar (solo si hay múltiples celdas)
    if (this.selectedTableCells.length >= 2) {
      var mergeBtn = document.createElement('button');
      mergeBtn.className = 'mewyse-cell-menu-btn';
      mergeBtn.innerHTML = '<span class="icon">' + WYSIWYG_ICONS.mergeCells + '</span> ' + this.t('tableMenu.mergeCells');
      mergeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.mergeSelectedCells(blockId);
        closeCellMenu();
      };
      menu.appendChild(mergeBtn);
    }

    // Opción de descombinar (solo si hay una celda combinada)
    if (hasMergedCell) {
      var unmergeBtn = document.createElement('button');
      unmergeBtn.className = 'mewyse-cell-menu-btn';
      unmergeBtn.innerHTML = '<span class="icon">' + WYSIWYG_ICONS.unmergeCells + '</span> ' + this.t('tableMenu.unmergeCells');
      unmergeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.unmergeCell(mergedCell, blockId);
        closeCellMenu();
      };
      menu.appendChild(unmergeBtn);
    }

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Posicionar el menú cerca de las celdas seleccionadas
    var lastCell = this.selectedTableCells[this.selectedTableCells.length - 1];
    this.anchorMenu(menu, lastCell, { offsetY: 5, centerX: true });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target)) {
          self.clearTableCellSelection();
          self._hideBackdrop('tableCellMenu');
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('tableCellMenu', function() {
      self.clearTableCellSelection();
      closeCellMenu();
    });
  };

  /**
   * Combina las celdas seleccionadas
   * @param {number} blockId
   */
  meWYSE.prototype.mergeSelectedCells = function(blockId) {
    if (this.selectedTableCells.length < 2) return;

    var table = this.currentSelectionTable;
    if (!table) return;

    // Construir matriz lógica
    var matrix = this.buildTableMatrix(table);

    // Obtener los límites de la selección usando coordenadas lógicas
    var minRow = Infinity, maxRow = -1, minCol = Infinity, maxCol = -1;
    var self = this;

    this.selectedTableCells.forEach(function(cell) {
      var coords = self.getTableCellCoords(cell);
      if (coords) {
        // También considerar el colspan/rowspan de la celda
        var colspan = parseInt(cell.getAttribute('colspan')) || 1;
        var rowspan = parseInt(cell.getAttribute('rowspan')) || 1;

        minRow = Math.min(minRow, coords.row);
        maxRow = Math.max(maxRow, coords.row + rowspan - 1);
        minCol = Math.min(minCol, coords.col);
        maxCol = Math.max(maxCol, coords.col + colspan - 1);
      }
    });

    var rowSpan = maxRow - minRow + 1;
    var colSpan = maxCol - minCol + 1;

    // Obtener todas las celdas únicas en el rango
    var cellsToMerge = this.getCellsInRange(table, minRow, maxRow, minCol, maxCol);

    // Obtener el contenido combinado de todas las celdas
    var combinedContent = '';
    cellsToMerge.forEach(function(cell) {
      var cellContent = cell.querySelector('p, h1, h2, h3, blockquote, pre');
      if (cellContent && cellContent.innerHTML.trim()) {
        if (combinedContent) combinedContent += '<br>';
        combinedContent += cellContent.innerHTML;
      }
    });

    // La primera celda en la matriz será la celda combinada
    var firstCell = matrix[minRow][minCol];

    // Eliminar atributos anteriores
    firstCell.removeAttribute('colspan');
    firstCell.removeAttribute('rowspan');

    // Establecer nuevos atributos
    if (rowSpan > 1) firstCell.setAttribute('rowspan', rowSpan);
    if (colSpan > 1) firstCell.setAttribute('colspan', colSpan);

    // Establecer el contenido combinado
    var contentElement = firstCell.querySelector('p, h1, h2, h3, blockquote, pre');
    if (contentElement) {
      contentElement.innerHTML = combinedContent;
    }

    // Eliminar las demás celdas (excepto la primera)
    cellsToMerge.forEach(function(cell) {
      if (cell !== firstCell) {
        cell.remove();
      }
    });

    // Limpiar selección
    this.clearTableCellSelection();

    // Refrescar controles de tabla
    this.refreshTableControls(table, blockId);

    // Guardar cambios
    this.updateBlockContent(blockId, table.innerHTML);
    this.triggerChange();
  };

  /**
   * Descombina una celda combinada
   * @param {HTMLElement} cell - La celda combinada
   * @param {number} blockId
   */
  meWYSE.prototype.unmergeCell = function(cell, blockId) {
    var table = cell.closest('table');
    if (!table) return;

    var colspan = parseInt(cell.getAttribute('colspan')) || 1;
    var rowspan = parseInt(cell.getAttribute('rowspan')) || 1;

    if (colspan === 1 && rowspan === 1) return; // No está combinada

    var coords = this.getTableCellCoords(cell);
    if (!coords) return;

    var rows = table.querySelectorAll('tr');
    var startRow = coords.row;
    var startCol = coords.col;

    // Eliminar atributos de combinación de la celda original
    cell.removeAttribute('colspan');
    cell.removeAttribute('rowspan');

    // Crear las celdas faltantes fila por fila
    for (var r = 0; r < rowspan; r++) {
      var row = rows[startRow + r];
      if (!row) continue;

      // Para la primera fila, insertar celdas después de la celda original
      // Para las demás filas, encontrar la posición correcta
      var insertAfter = null;

      if (r === 0) {
        insertAfter = cell;
      } else {
        // Encontrar la celda después de la cual insertar
        // Buscar la última celda antes de startCol en esta fila
        var existingCells = row.querySelectorAll('td, th');
        var colCount = 0;
        for (var i = 0; i < existingCells.length; i++) {
          var cellColspan = parseInt(existingCells[i].getAttribute('colspan')) || 1;
          if (colCount + cellColspan > startCol) {
            insertAfter = existingCells[i - 1] || null;
            break;
          }
          colCount += cellColspan;
          insertAfter = existingCells[i];
        }
      }

      for (var c = 0; c < colspan; c++) {
        // Saltar la celda original
        if (r === 0 && c === 0) continue;

        // Crear nueva celda
        var newCell = document.createElement(cell.tagName.toLowerCase());
        newCell.style.border = '1px solid #ddd';
        newCell.style.padding = '0';

        // Crear contenido editable interno
        var cellContent = document.createElement('p');
        cellContent.contentEditable = true;
        cellContent.style.padding = '8px';
        cellContent.style.margin = '0';
        cellContent.style.minHeight = '1em';

        newCell.appendChild(cellContent);
        this.attachTableCellEvents(cellContent, blockId);

        // Insertar la celda
        if (insertAfter && insertAfter.nextSibling) {
          row.insertBefore(newCell, insertAfter.nextSibling);
        } else if (insertAfter) {
          row.appendChild(newCell);
        } else {
          // Insertar al principio de la fila
          row.insertBefore(newCell, row.firstChild);
        }

        insertAfter = newCell;
      }
    }

    // Limpiar selección
    this.clearTableCellSelection();

    // Refrescar controles de tabla
    this.refreshTableControls(table, blockId);

    // Guardar cambios
    this.updateBlockContent(blockId, table.innerHTML);
    this.triggerChange();
  };

  /**
   * Encuentra la posición de inserción correcta para una celda en una fila
   * @param {HTMLElement} row - La fila
   * @param {number} targetCol - Columna objetivo
   * @returns {HTMLElement|null}
   */
  meWYSE.prototype.findInsertPosition = function(row, targetCol) {
    var cells = row.querySelectorAll('td, th');
    var currentCol = 0;

    for (var i = 0; i < cells.length; i++) {
      if (currentCol >= targetCol) {
        return cells[i];
      }
      var colspan = parseInt(cells[i].getAttribute('colspan')) || 1;
      currentCol += colspan;
    }

    return null;
  };

  /**
   * Añade controles de fila/columna a una tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.addTableControls = function(table, blockId) {
    var self = this;
    var rows = table.querySelectorAll('tr');

    rows.forEach(function(row, rowIndex) {
      var cells = row.querySelectorAll('td, th');

      // Añadir control de fila (solo a la primera celda)
      if (cells.length > 0) {
        var firstCell = cells[0];
        firstCell.style.position = 'relative';

        var rowControl = document.createElement('button');
        rowControl.className = 'mewyse-table-row-control';
        rowControl.innerHTML = WYSIWYG_ICONS.hamburger;
        rowControl.title = self.t('tableMenu.rowOptions');
        rowControl.tabIndex = -1;
        rowControl.contentEditable = false; // Evitar que sea editable

        // Usar mousedown en lugar de click para capturar antes que focus
        rowControl.onmousedown = function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.showTableRowMenu(table, rowIndex, blockId, rowControl);
          return false;
        };

        firstCell.appendChild(rowControl);
      }

      // Añadir control de columna (solo en la primera fila)
      if (rowIndex === 0) {
        cells.forEach(function(cell, colIndex) {
          cell.style.position = 'relative';

          var colControl = document.createElement('button');
          colControl.className = 'mewyse-table-col-control';
          colControl.innerHTML = WYSIWYG_ICONS.hamburger;
          colControl.title = self.t('tableMenu.columnOptions');
          colControl.tabIndex = -1;
          colControl.contentEditable = false;

          colControl.onmousedown = function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.showTableColMenu(table, colIndex, blockId, colControl);
            return false;
          };

          cell.appendChild(colControl);
        });
      }
    });
  };

  /**
   * Añade una nueva fila a la tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.addTableRow = function(table, blockId) {
    var tbody = table.querySelector('tbody');
    var firstRow = table.querySelector('tr');
    var colCount = firstRow ? firstRow.querySelectorAll('td, th').length : 3;

    var newRow = document.createElement('tr');
    for (var i = 0; i < colCount; i++) {
      var cell = document.createElement('td');
      cell.style.border = '1px solid #ddd';
      cell.style.padding = '0';

      // Crear párrafo interno editable
      var cellContent = document.createElement('p');
      cellContent.contentEditable = true;
      cellContent.style.padding = '8px';
      cellContent.style.margin = '0';
      cellContent.style.minHeight = '1em';

      cell.appendChild(cellContent);
      this.attachTableCellEvents(cellContent, blockId);
      newRow.appendChild(cell);
    }

    tbody.appendChild(newRow);

    // Actualizar controles
    this.refreshTableControls(table, blockId);

    // Guardar cambios
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Añade una nueva columna a la tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.addTableColumn = function(table, blockId) {
    var rows = table.querySelectorAll('tr');

    rows.forEach(function(row) {
      var cell = document.createElement('td');
      cell.style.border = '1px solid #ddd';
      cell.style.padding = '0';

      // Crear párrafo interno editable
      var cellContent = document.createElement('p');
      cellContent.contentEditable = true;
      cellContent.style.padding = '8px';
      cellContent.style.margin = '0';
      cellContent.style.minHeight = '1em';

      cell.appendChild(cellContent);
      this.attachTableCellEvents(cellContent, blockId);
      row.appendChild(cell);
    }, this);

    // Actualizar controles
    this.refreshTableControls(table, blockId);

    // Guardar cambios
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Refresca los controles de una tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.refreshTableControls = function(table, blockId) {
    // Eliminar controles existentes
    var existingControls = table.querySelectorAll('.mewyse-table-row-control, .mewyse-table-col-control');
    for (var i = 0; i < existingControls.length; i++) {
      existingControls[i].remove();
    }

    // Añadir controles nuevamente
    this.addTableControls(table, blockId);

    // Asegurar eventos de selección
    this.addTableSelectionEvents(table, blockId);
  };

  /**
   * Muestra el menú contextual de fila
   * @param {HTMLElement} table
   * @param {number} rowIndex
   * @param {number} blockId
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showTableRowMenu = function(table, rowIndex, blockId, button) {
    var self = this;

    // Cerrar menú existente
    var existingMenu = document.querySelector('.mewyse-table-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-table-menu';

    var closeRowMenu = function() {
      if (menu.parentNode) menu.remove();
      self._hideBackdrop('tableRowMenu');
    };

    var options = [
      { labelKey: 'tableMenu.backgroundColor', icon: WYSIWYG_ICONS.palette, action: 'bgColor' },
      { labelKey: 'tableMenu.insertRowAbove', icon: WYSIWYG_ICONS.arrowUp, action: 'insertBefore' },
      { labelKey: 'tableMenu.insertRowBelow', icon: WYSIWYG_ICONS.arrowDown, action: 'insertAfter' },
      { labelKey: 'tableMenu.duplicateRow', icon: WYSIWYG_ICONS.duplicate, action: 'duplicate' },
      { labelKey: 'tableMenu.clearRowContent', icon: WYSIWYG_ICONS.trash, action: 'clear' },
      { labelKey: 'tableMenu.deleteRow', icon: WYSIWYG_ICONS.close, action: 'delete', danger: true }
    ];

    options.forEach(function(opt) {
      var item = document.createElement('div');
      item.className = 'mewyse-table-menu-item' + (opt.danger ? ' danger' : '');
      item.innerHTML = '<span class="icon">' + opt.icon + '</span>' + self.t(opt.labelKey);
      item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (opt.action === 'bgColor') {
          closeRowMenu();
          // Usar setTimeout para evitar conflictos con el evento de "cerrar menú"
          setTimeout(function() {
            self.showTableColorPicker(table, rowIndex, -1, blockId, button);
          }, 50);
        } else {
          self.executeRowAction(table, rowIndex, opt.action, blockId);
          closeRowMenu();
        }
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this.anchorMenu(menu, button, { offsetY: 5 });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', function closeMenu(e) {
        if (menu && !menu.contains(e.target) && !button.contains(e.target)) {
          closeRowMenu();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('tableRowMenu', closeRowMenu);
  };

  /**
   * Muestra el menú contextual de columna
   * @param {HTMLElement} table
   * @param {number} colIndex
   * @param {number} blockId
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showTableColMenu = function(table, colIndex, blockId, button) {
    var self = this;

    // Cerrar menú existente
    var existingMenu = document.querySelector('.mewyse-table-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-table-menu';

    var closeColMenu = function() {
      if (menu.parentNode) menu.remove();
      self._hideBackdrop('tableColMenu');
    };

    var options = [
      { labelKey: 'tableMenu.backgroundColor', icon: WYSIWYG_ICONS.palette, action: 'bgColor' },
      { labelKey: 'tableMenu.insertColumnLeft', icon: WYSIWYG_ICONS.arrowLeft, action: 'insertBefore' },
      { labelKey: 'tableMenu.insertColumnRight', icon: WYSIWYG_ICONS.arrowRight, action: 'insertAfter' },
      { labelKey: 'tableMenu.duplicateColumn', icon: WYSIWYG_ICONS.duplicate, action: 'duplicate' },
      { labelKey: 'tableMenu.clearColumnContent', icon: WYSIWYG_ICONS.trash, action: 'clear' },
      { labelKey: 'tableMenu.deleteColumn', icon: WYSIWYG_ICONS.close, action: 'delete', danger: true }
    ];

    options.forEach(function(opt) {
      var item = document.createElement('div');
      item.className = 'mewyse-table-menu-item' + (opt.danger ? ' danger' : '');
      item.innerHTML = '<span class="icon">' + opt.icon + '</span>' + self.t(opt.labelKey);
      item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (opt.action === 'bgColor') {
          closeColMenu();
          // Usar setTimeout para evitar conflictos con el evento de "cerrar menú"
          setTimeout(function() {
            self.showTableColorPicker(table, -1, colIndex, blockId, button);
          }, 50);
        } else {
          self.executeColAction(table, colIndex, opt.action, blockId);
          closeColMenu();
        }
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this.anchorMenu(menu, button, { offsetY: 5 });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', function closeMenu(e) {
        if (menu && !menu.contains(e.target) && !button.contains(e.target)) {
          closeColMenu();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('tableColMenu', closeColMenu);
  };

  /**
   * Muestra el selector de color para tabla
   * @param {HTMLElement} table
   * @param {number} rowIndex - Índice de fila (-1 si es columna)
   * @param {number} colIndex - Índice de columna (-1 si es fila)
   * @param {number} blockId
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showTableColorPicker = function(table, rowIndex, colIndex, blockId, button) {
    var self = this;

    // Verificar que button existe
    if (!button || !button.getBoundingClientRect) {
      console.error('Button no válido para showTableColorPicker', button);
      return;
    }

    // Cerrar picker existente
    var existingPicker = document.querySelector('.mewyse-color-picker');
    if (existingPicker) {
      existingPicker.remove();
    }

    var picker = document.createElement('div');
    picker.className = 'mewyse-color-picker';

    var closeTablePicker = function() {
      if (picker.parentNode) picker.remove();
      self._hideBackdrop('tableColorPicker');
    };

    var colors = [
      '#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#ffffff',
      '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
      '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc'
    ];

    colors.forEach(function(color) {
      var colorBtn = document.createElement('button');
      colorBtn.className = 'mewyse-color-button';
      colorBtn.style.backgroundColor = color;
      colorBtn.title = color;

      colorBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Aplicar color a fila o columna
        if (rowIndex >= 0) {
          // Es una fila
          var rows = table.querySelectorAll('tr');
          var row = rows[rowIndex];
          if (row) {
            var cells = row.querySelectorAll('td, th');
            for (var i = 0; i < cells.length; i++) {
              cells[i].style.backgroundColor = color;
            }
          }
        } else if (colIndex >= 0) {
          // Es una columna
          var rows = table.querySelectorAll('tr');
          rows.forEach(function(row) {
            var cells = row.querySelectorAll('td, th');
            if (cells[colIndex]) {
              cells[colIndex].style.backgroundColor = color;
            }
          });
        }

        self.updateBlockContent(blockId, self.getCleanTableHTML(table));
        closeTablePicker();
      };

      picker.appendChild(colorBtn);
    });

    // Botón para remover color
    var removeBtn = document.createElement('button');
    removeBtn.className = 'mewyse-color-button mewyse-color-remove';
    removeBtn.innerHTML = WYSIWYG_ICONS.close;
    removeBtn.title = self.t('colors.removeColor');
    removeBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Remover color de fila o columna
      if (rowIndex >= 0) {
        // Es una fila
        var rows = table.querySelectorAll('tr');
        var row = rows[rowIndex];
        if (row) {
          var cells = row.querySelectorAll('td, th');
          for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = '';
          }
        }
      } else if (colIndex >= 0) {
        // Es una columna
        var rows = table.querySelectorAll('tr');
        rows.forEach(function(row) {
          var cells = row.querySelectorAll('td, th');
          if (cells[colIndex]) {
            cells[colIndex].style.backgroundColor = '';
          }
        });
      }

      self.updateBlockContent(blockId, table.innerHTML);
      closeTablePicker();
    };
    picker.appendChild(removeBtn);

    // Posicionar el picker
    var rect = button.getBoundingClientRect();
    picker.style.position = 'fixed';
    picker.style.top = (rect.bottom + 5) + 'px';
    picker.style.left = rect.left + 'px';

    document.body.appendChild(picker);

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', function closePicker(e) {
        if (!picker.contains(e.target) && !button.contains(e.target)) {
          closeTablePicker();
          document.removeEventListener('click', closePicker);
        }
      });
    }, 10);

    // Evitar que se cierre al hacer clic en el picker
    picker.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    this._showBackdrop('tableColorPicker', closeTablePicker);
  };

  /**
   * Ejecuta una acción sobre una fila
   * @param {HTMLElement} table
   * @param {number} rowIndex
   * @param {string} action
   * @param {number} blockId
   */
  meWYSE.prototype.executeRowAction = function(table, rowIndex, action, blockId) {
    var rows = table.querySelectorAll('tr');
    var row = rows[rowIndex];

    if (!row) return;

    switch (action) {
      case 'insertBefore':
        var newRow = row.cloneNode(true);
        var cells = newRow.querySelectorAll('td, th');
        for (var i = 0; i < cells.length; i++) {
          cells[i].innerHTML = '';
          cells[i].style.backgroundColor = '';
          this.attachTableCellEvents(cells[i], blockId);
        }
        row.parentNode.insertBefore(newRow, row);
        break;

      case 'insertAfter':
        var newRow = row.cloneNode(true);
        var cells = newRow.querySelectorAll('td, th');
        for (var i = 0; i < cells.length; i++) {
          cells[i].innerHTML = '';
          cells[i].style.backgroundColor = '';
          this.attachTableCellEvents(cells[i], blockId);
        }
        if (row.nextSibling) {
          row.parentNode.insertBefore(newRow, row.nextSibling);
        } else {
          row.parentNode.appendChild(newRow);
        }
        break;

      case 'duplicate':
        var newRow = row.cloneNode(true);
        var cells = newRow.querySelectorAll('td, th');
        for (var i = 0; i < cells.length; i++) {
          this.attachTableCellEvents(cells[i], blockId);
        }
        if (row.nextSibling) {
          row.parentNode.insertBefore(newRow, row.nextSibling);
        } else {
          row.parentNode.appendChild(newRow);
        }
        break;

      case 'clear':
        var cells = row.querySelectorAll('td, th');
        for (var i = 0; i < cells.length; i++) {
          cells[i].innerHTML = '';
        }
        break;

      case 'delete':
        if (rows.length > 1) {
          row.remove();
        } else {
          alert(this.t('alerts.cannotDeleteLastRow'));
          return;
        }
        break;
    }

    // Actualizar controles y guardar
    this.refreshTableControls(table, blockId);
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Ejecuta una acción sobre una columna
   * @param {HTMLElement} table
   * @param {number} colIndex
   * @param {string} action
   * @param {number} blockId
   */
  meWYSE.prototype.executeColAction = function(table, colIndex, action, blockId) {
    var rows = table.querySelectorAll('tr');

    switch (action) {
      case 'insertBefore':
        rows.forEach(function(row) {
          var cells = row.querySelectorAll('td, th');
          if (cells[colIndex]) {
            var newCell = document.createElement('td');
            newCell.contentEditable = true;
            newCell.style.border = '1px solid #ddd';
            newCell.style.padding = '8px';
            this.attachTableCellEvents(newCell, blockId);
            row.insertBefore(newCell, cells[colIndex]);
          }
        }, this);
        break;

      case 'insertAfter':
        rows.forEach(function(row) {
          var cells = row.querySelectorAll('td, th');
          if (cells[colIndex]) {
            var newCell = document.createElement('td');
            newCell.contentEditable = true;
            newCell.style.border = '1px solid #ddd';
            newCell.style.padding = '8px';
            this.attachTableCellEvents(newCell, blockId);
            if (cells[colIndex].nextSibling) {
              row.insertBefore(newCell, cells[colIndex].nextSibling);
            } else {
              row.appendChild(newCell);
            }
          }
        }, this);
        break;

      case 'duplicate':
        rows.forEach(function(row) {
          var cells = row.querySelectorAll('td, th');
          if (cells[colIndex]) {
            var newCell = cells[colIndex].cloneNode(true);
            this.attachTableCellEvents(newCell, blockId);
            if (cells[colIndex].nextSibling) {
              row.insertBefore(newCell, cells[colIndex].nextSibling);
            } else {
              row.appendChild(newCell);
            }
          }
        }, this);
        break;

      case 'clear':
        rows.forEach(function(row) {
          var cells = row.querySelectorAll('td, th');
          if (cells[colIndex]) {
            cells[colIndex].innerHTML = '';
          }
        });
        break;

      case 'delete':
        var firstRow = rows[0];
        var cellCount = firstRow ? firstRow.querySelectorAll('td, th').length : 0;

        if (cellCount > 1) {
          rows.forEach(function(row) {
            var cells = row.querySelectorAll('td, th');
            if (cells[colIndex]) {
              cells[colIndex].remove();
            }
          });
        } else {
          alert(this.t('alerts.cannotDeleteLastColumn'));
          return;
        }
        break;
    }

    // Actualizar controles y guardar
    this.refreshTableControls(table, blockId);
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Restablece los anchos de columna de una tabla al 100%
   * @param {number} blockId
   */
  meWYSE.prototype.resetTableColumnWidths = function(blockId) {
    var blockElement = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (!blockElement) return;

    var table = blockElement.querySelector('table');
    if (!table) return;

    // Eliminar los atributos de ancho de todas las celdas y la tabla
    table.style.width = '100%';
    table.style.tableLayout = '';

    var cells = table.querySelectorAll('td, th');
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.width = '';
      cells[i].removeAttribute('width');
    }

    // Guardar cambios
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Habilita el redimensionamiento de columnas en una tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.enableColumnResizing = function(table, blockId) {
    var self = this;

    // Establecer table-layout fixed para que funcione el redimensionamiento
    table.style.tableLayout = 'fixed';

    // Obtener todas las celdas de la primera fila para añadir los handles de redimensionamiento
    var firstRow = table.querySelector('tr');
    if (!firstRow) return;

    var cells = firstRow.querySelectorAll('td, th');

    for (var i = 0; i < cells.length; i++) {
      // No añadir handle a la última columna
      if (i === cells.length - 1) continue;

      var cell = cells[i];
      var nextCell = cells[i + 1];

      // Crear el handle de redimensionamiento
      var resizeHandle = document.createElement('div');
      resizeHandle.className = 'mewyse-table-resize-handle';
      resizeHandle.contentEditable = false;

      // Posicionar el handle
      cell.style.position = 'relative';
      cell.appendChild(resizeHandle);

      // Usar un closure para capturar las variables correctas
      (function(currentCell, currentNextCell) {
        // Variables para el arrastre
        var startX, startWidth, nextStartWidth;

        resizeHandle.addEventListener('mousedown', function(e) {
          e.preventDefault();
          e.stopPropagation();

          startX = e.pageX;
          startWidth = currentCell.offsetWidth;
          nextStartWidth = currentNextCell ? currentNextCell.offsetWidth : 0;

          // Añadir clase de redimensionamiento
          table.classList.add('mewyse-table-resizing');

          // Event listeners para el arrastre
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
          var diff = e.pageX - startX;

          // Calcular nuevos anchos
          var newWidth = startWidth + diff;
          var newNextWidth = nextStartWidth - diff;

          // Establecer anchos mínimos
          var minWidth = 50;
          if (newWidth >= minWidth && newNextWidth >= minWidth) {
            currentCell.style.width = newWidth + 'px';
            if (currentNextCell) {
              currentNextCell.style.width = newNextWidth + 'px';
            }
          }
        }

        function onMouseUp() {
          // Remover clase de redimensionamiento
          table.classList.remove('mewyse-table-resizing');

          // Remover event listeners
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          // Guardar cambios
          self.updateBlockContent(blockId, table.innerHTML);
        }
      })(cell, nextCell);
    }
  };

  /**
   * Maneja los eventos keyup para detectar "/"
   * @param {KeyboardEvent} e
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.handleKeyUp = function(e, blockId, element) {
    // Ignorar teclas de navegación para no interferir con los menús
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' || e.key === 'Enter' || e.key === 'Escape' ||
        e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
      return;
    }

    var text = element.textContent;

    // ===== MENÚ SLASH =====
    // Buscar "/" al inicio o después de espacio
    var slashMatch = text.match(/(^|\s)\/(\w*)$/);

    if (slashMatch) {
      var searchText = slashMatch[2]; // Texto después del "/"

      if (!this.slashMenu) {
        // Abrir el menú si no está ya abierto
        this.showSlashMenu(blockId, element);
      }

      // Filtrar el menú con el texto de búsqueda
      if (this.slashMenu) {
        this.filterSlashMenu(searchText);
      }
      return; // No procesar menciones si estamos en slash menu
    } else if (this.slashMenu) {
      // Cerrar menú si el "/" ya no está
      this.closeSlashMenu();
    }

    // ===== MENÚ DE MENCIONES (@) =====
    if (this.mentions.length > 0) {
      // Buscar "@" al inicio o después de espacio
      var mentionMatch = text.match(/(^|\s)@(\w*)$/);

      if (mentionMatch) {
        var mentionSearchText = mentionMatch[2]; // Texto después del "@"

        if (!this.mentionMenu) {
          // Abrir el menú si no está ya abierto
          this.showMentionMenu(blockId, element);
        }

        // Filtrar el menú con el texto de búsqueda
        if (this.mentionMenu) {
          this.filterMentionMenu(mentionSearchText);
        }
        return; // No procesar emojis si estamos en menú de menciones
      } else if (this.mentionMenu) {
        // Cerrar menú si el "@" ya no está
        this.closeMentionMenu();
      }
    }

    // ===== MENÚ DE EMOJI PICKER (:) =====
    // Buscar ":" al inicio o después de espacio (no pegado a palabra)
    var emojiMatch = text.match(/(^|\s):([a-zA-Z0-9_]*)$/);

    if (emojiMatch) {
      var emojiSearchText = emojiMatch[2]; // Texto después del ":"

      if (!this.emojiMenu) {
        // Abrir el menú si no está ya abierto
        this.showEmojiMenu(blockId, element);
      }

      // Filtrar el menú con el texto de búsqueda
      if (this.emojiMenu) {
        this.filterEmojiMenu(emojiSearchText);
      }
    } else if (this.emojiMenu) {
      // Cerrar menú si el ":" ya no está
      this.closeEmojiMenu();
    }
  };

  /**
   * Muestra el menú de comandos con "/"
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.showSlashMenu = function(blockId, element) {
    var self = this;

    // Cerrar menú existente
    this.closeSlashMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-slash-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', this.t('blockMenu.changeType'));
    this.slashMenu = menu;
    this.slashMenuSelectedIndex = 0;
    this.slashMenuElement = element;
    this.slashMenuBlockId = blockId;

    var types = [
      { type: 'paragraph', icon: WYSIWYG_ICONS.paragraph },
      { type: 'heading1', icon: WYSIWYG_ICONS.heading1 },
      { type: 'heading2', icon: WYSIWYG_ICONS.heading2 },
      { type: 'heading3', icon: WYSIWYG_ICONS.heading3 },
      { type: 'quote', icon: WYSIWYG_ICONS.quote },
      { type: 'code', icon: WYSIWYG_ICONS.code },
      { type: 'bulletList', icon: WYSIWYG_ICONS.bulletList },
      { type: 'numberList', icon: WYSIWYG_ICONS.numberList },
      { type: 'checklist', icon: WYSIWYG_ICONS.checklist },
      { type: 'table', icon: WYSIWYG_ICONS.table },
      { type: 'image', icon: WYSIWYG_ICONS.image },
      { type: 'video', icon: WYSIWYG_ICONS.video },
      { type: 'audio', icon: WYSIWYG_ICONS.audio },
      { type: 'divider', icon: WYSIWYG_ICONS.divider }
    ];

    this.slashMenuTypes = types;

    types.forEach(function(typeInfo, index) {
      var item = document.createElement('div');
      item.className = 'mewyse-slash-menu-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);
      item.innerHTML = '<span class="icon">' + typeInfo.icon + '</span>' +
                       '<div class="info"><div class="label">' + self.t('blockTypes.' + typeInfo.type) + '</div>' +
                       '<div class="description">' + self.t('blockTypeDescriptions.' + typeInfo.type) + '</div></div>';
      item.onclick = function() {
        self.selectSlashMenuItem(index);
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Anclar el menú al elemento
    this.anchorMenu(menu, element, { offsetY: 5 });

    // Seleccionar el primer elemento por defecto
    this.updateSlashMenuSelection();

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', function closeMenu(e) {
        if (self.slashMenu && !self.slashMenu.contains(e.target) && e.target !== element) {
          self.closeSlashMenu();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('slashMenu', function() { self.closeSlashMenu(); });
  };

  /**
   * Actualiza la selección visual del menú slash
   */
  meWYSE.prototype.updateSlashMenuSelection = function() {
    if (!this.slashMenu) return;

    // Solo considerar elementos visibles
    var visibleItems = this.slashMenu.querySelectorAll('.mewyse-slash-menu-item:not([style*="display: none"])');

    for (var i = 0; i < visibleItems.length; i++) {
      if (i === this.slashMenuSelectedIndex) {
        visibleItems[i].classList.add('selected');
        visibleItems[i].setAttribute('aria-selected', 'true');
        visibleItems[i].scrollIntoView({ block: 'nearest', behavior: 'auto' });
      } else {
        visibleItems[i].classList.remove('selected');
        visibleItems[i].setAttribute('aria-selected', 'false');
      }
    }
  };

  /**
   * Normaliza un texto eliminando tildes y caracteres especiales
   * @param {string} text - Texto a normalizar
   * @returns {string}
   */
  meWYSE.prototype.normalizeText = function(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Eliminar diacríticos (tildes, acentos, etc.)
  };

  /**
   * Filtra el menú slash según el texto de búsqueda
   * @param {string} searchText - Texto a buscar
   */
  meWYSE.prototype.filterSlashMenu = function(searchText) {
    if (!this.slashMenu || !this.slashMenuTypes) return;

    var self = this;
    var items = this.slashMenu.querySelectorAll('.mewyse-slash-menu-item');
    var searchNormalized = this.normalizeText(searchText);
    var visibleCount = 0;

    // Filtrar elementos
    this.slashMenuTypes.forEach(function(typeInfo, index) {
      var item = items[index];
      if (!item) return;

      // Obtener el label traducido y normalizarlo
      var label = self.t('blockTypes.' + typeInfo.type);
      var labelNormalized = self.normalizeText(label);

      // Mostrar solo si el texto de búsqueda está en el label (normalizado)
      if (searchText === '' || labelNormalized.indexOf(searchNormalized) !== -1) {
        item.style.display = '';
        item.setAttribute('data-visible-index', visibleCount);
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.removeAttribute('data-visible-index');
      }
    });

    // Resetear índice de selección al primer elemento visible
    this.slashMenuSelectedIndex = 0;
    this.updateSlashMenuSelection();
  };

  /**
   * Navega hacia arriba en el menú slash
   */
  meWYSE.prototype.slashMenuNavigateUp = function() {
    this._navigateMenu('slashMenu', '.mewyse-slash-menu-item', 'slashMenuSelectedIndex', 'updateSlashMenuSelection', 'up');
  };

  /**
   * Navega hacia abajo en el menú slash
   */
  meWYSE.prototype.slashMenuNavigateDown = function() {
    this._navigateMenu('slashMenu', '.mewyse-slash-menu-item', 'slashMenuSelectedIndex', 'updateSlashMenuSelection', 'down');
  };

  /**
   * Selecciona un elemento del menú slash
   * @param {number} index
   */
  meWYSE.prototype.selectSlashMenuItem = function(index) {
    if (!this.slashMenu || !this.slashMenuElement) return;

    // Si el índice es el índice visual (de elementos visibles), necesitamos encontrar el índice real
    var visibleItems = this.slashMenu.querySelectorAll('.mewyse-slash-menu-item:not([style*="display: none"])');
    var actualIndex = index;

    // Si index es menor que visibleItems.length, es un índice visual
    if (index < visibleItems.length) {
      var selectedItem = visibleItems[index];
      actualIndex = parseInt(selectedItem.getAttribute('data-index'));
    }

    var typeInfo = this.slashMenuTypes[actualIndex];
    var element = this.slashMenuElement;
    var blockId = this.slashMenuBlockId;

    // Eliminar el "/" y el texto de búsqueda del contenido del bloque
    var block = this.getBlock(blockId);
    if (block) {
      var text = block.content;
      // Usar regex para encontrar y eliminar "/" seguido de texto de búsqueda
      var slashMatch = text.match(/(^|\s)\/\w*$/);
      if (slashMatch) {
        block.content = text.substring(0, text.length - slashMatch[0].length + (slashMatch[1] ? 1 : 0));
      }
    }

    this.closeSlashMenu();

    // Manejo especial para imagen: abrir selector de archivos
    if (typeInfo.type === 'image') {
      var self = this;
      var blockIndex = this.getBlockIndex(blockId);

      // Si el bloque actual está vacío, lo eliminamos y usamos su posición
      if (block && (!block.content || block.content.trim() === '')) {
        this.deleteBlock(blockId);
      } else {
        // Si tiene contenido, insertamos después
        blockIndex++;
      }

      // Usar el file input persistente
      var fileInput = this._getFileInput();
      fileInput.onchange = function() {
        var file = fileInput.files && fileInput.files[0];
        fileInput.value = '';
        if (!file || !/^image\//.test(file.type)) return;
        if (!self._validateImageSize(file)) return;
        self.showImageDimensionsModal(file, blockIndex);
      };
      fileInput.click();
    } else if (typeInfo.type === 'video' || typeInfo.type === 'audio') {
      // video/audio: si el bloque actual está vacío, eliminarlo y abrir modal.
      // insertVideoBlock/insertAudioBlock calculan el insertIndex por su cuenta.
      if (block && (!block.content || (typeof block.content === 'string' && block.content.trim() === ''))) {
        this.deleteBlock(blockId);
      }
      if (typeInfo.type === 'video') this.insertVideoBlock();
      else this.insertAudioBlock();
    } else {
      // Para otros tipos, cambiar el tipo de bloque normalmente
      this.changeBlockType(blockId, typeInfo.type);
    }
  };

  /**
   * Cierra el menú de comandos "/"
   */
  meWYSE.prototype.closeSlashMenu = function() {
    this._closeMenu('slashMenu');
    this.slashMenuSelectedIndex = 0;
    this.slashMenuElement = null;
    this.slashMenuBlockId = null;
    this.slashMenuTypes = null;
    this._hideBackdrop('slashMenu');
  };

  // =========================================================================
  // SISTEMA DE MENCIONES (@mentions)
  // =========================================================================

  /**
   * Muestra el menú de menciones
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.showMentionMenu = function(blockId, element) {
    var self = this;

    // Cerrar menú existente
    this.closeMentionMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-mention-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', 'Mentions');
    this.mentionMenu = menu;
    this.mentionMenuSelectedIndex = 0;
    this.mentionMenuElement = element;
    this.mentionMenuBlockId = blockId;
    this.mentionMenuItems = this.mentions.slice(); // Copia del array

    // Guardar la selección actual para usarla al insertar con click
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      this.mentionMenuRange = selection.getRangeAt(0).cloneRange();
    }

    // Crear items del menú
    this.mentions.forEach(function(mention, index) {
      var item = document.createElement('div');
      item.className = 'mewyse-mention-menu-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);

      // Avatar si existe
      if (mention.avatar) {
        var avatar = document.createElement('img');
        avatar.className = 'mewyse-mention-avatar';
        avatar.src = mention.avatar;
        avatar.alt = mention.name;
        item.appendChild(avatar);
      } else {
        // Avatar placeholder con inicial
        var avatarPlaceholder = document.createElement('span');
        avatarPlaceholder.className = 'mewyse-mention-avatar-placeholder';
        avatarPlaceholder.textContent = mention.name.charAt(0).toUpperCase();
        item.appendChild(avatarPlaceholder);
      }

      var nameSpan = document.createElement('span');
      nameSpan.className = 'mewyse-mention-name';
      nameSpan.textContent = mention.name;
      item.appendChild(nameSpan);

      // Usar mousedown para evitar pérdida de foco
      item.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Restaurar la selección guardada antes de insertar
        if (self.mentionMenuRange) {
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(self.mentionMenuRange);
        }
        self.selectMentionItem(index);
      });

      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Posicionar el menú cerca del cursor (donde se escribió @)
    this.positionMentionMenuAtCaret(menu);

    // Actualizar selección inicial
    this.updateMentionMenuSelection();

    this._showBackdrop('mentionMenu', function() { self.closeMentionMenu(); });
  };

  /**
   * Posiciona el menú de menciones cerca del cursor/caret
   * @param {HTMLElement} menu
   */
  meWYSE.prototype.positionMentionMenuAtCaret = function(menu) {
    var self = this;

    function updatePosition() {
      if (!menu.parentNode || !self.mentionMenu) {
        return;
      }

      var selection = window.getSelection();
      if (!selection.rangeCount) {
        return;
      }

      // Obtener la posición del cursor
      var range = selection.getRangeAt(0);
      var caretRect = range.getBoundingClientRect();

      // Si no hay rect válido (cursor al inicio), usar el elemento
      if (caretRect.width === 0 && caretRect.height === 0) {
        var tempRange = range.cloneRange();
        var tempSpan = document.createElement('span');
        tempSpan.textContent = '\u200B'; // Zero-width space
        tempRange.insertNode(tempSpan);
        caretRect = tempSpan.getBoundingClientRect();
        tempSpan.parentNode.removeChild(tempSpan);
        // Restaurar selección
        selection.removeAllRanges();
        selection.addRange(range);
      }

      var menuRect = menu.getBoundingClientRect();
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      menu.style.position = 'fixed';

      // Posición horizontal: alineado con el cursor
      var left = caretRect.left;

      // Si el menú se sale por la derecha, ajustar
      if (left + menuRect.width > viewportWidth - 10) {
        left = viewportWidth - menuRect.width - 10;
      }

      // Si se sale por la izquierda, ajustar
      if (left < 10) {
        left = 10;
      }

      // Posición vertical: debajo del cursor
      var top = caretRect.bottom + 5;

      // Si el menú se sale por abajo, mostrarlo arriba del cursor
      if (top + menuRect.height > viewportHeight - 10) {
        top = caretRect.top - menuRect.height - 5;
      }

      // Si tampoco cabe arriba, posicionarlo lo mejor posible
      if (top < 10) {
        top = 10;
      }

      menu.style.left = left + 'px';
      menu.style.top = top + 'px';

      // Continuar actualizando mientras el menú esté abierto
      if (self.mentionMenu) {
        menu._animationFrameId = requestAnimationFrame(updatePosition);
      }
    }

    // Iniciar el bucle de posicionamiento
    updatePosition();

    // Guardar referencia para cancelar
    menu._cancelAnchor = function() {
      if (menu._animationFrameId) {
        cancelAnimationFrame(menu._animationFrameId);
      }
    };
  };

  /**
   * Filtra el menú de menciones según el texto de búsqueda
   * @param {string} searchText
   */
  meWYSE.prototype.filterMentionMenu = function(searchText) {
    if (!this.mentionMenu) return;

    var self = this;
    var searchLower = searchText.toLowerCase();
    var items = this.mentionMenu.querySelectorAll('.mewyse-mention-menu-item');
    var visibleCount = 0;

    this.mentionMenuItems = [];

    this.mentions.forEach(function(mention, index) {
      var item = items[index];
      var matches = mention.name.toLowerCase().indexOf(searchLower) !== -1;

      if (matches) {
        item.style.display = '';
        self.mentionMenuItems.push(mention);
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // Resetear selección si está fuera de rango
    if (this.mentionMenuSelectedIndex >= visibleCount) {
      this.mentionMenuSelectedIndex = 0;
    }

    this.updateMentionMenuSelection();

    // Cerrar menú si no hay resultados
    if (visibleCount === 0) {
      this.closeMentionMenu();
    }
  };

  /**
   * Actualiza la selección visual del menú de menciones
   */
  meWYSE.prototype.updateMentionMenuSelection = function() {
    if (!this.mentionMenu) return;

    var items = this.mentionMenu.querySelectorAll('.mewyse-mention-menu-item');
    var visibleItems = this.mentionMenu.querySelectorAll('.mewyse-mention-menu-item:not([style*="display: none"])');

    items.forEach(function(item) {
      item.classList.remove('selected');
      item.setAttribute('aria-selected', 'false');
    });

    if (visibleItems[this.mentionMenuSelectedIndex]) {
      visibleItems[this.mentionMenuSelectedIndex].classList.add('selected');
      visibleItems[this.mentionMenuSelectedIndex].setAttribute('aria-selected', 'true');
    }
  };

  /**
   * Navega hacia arriba en el menú de menciones
   */
  meWYSE.prototype.mentionMenuNavigateUp = function() {
    this._navigateMenu('mentionMenu', '.mewyse-mention-menu-item', 'mentionMenuSelectedIndex', 'updateMentionMenuSelection', 'up');
  };

  /**
   * Navega hacia abajo en el menú de menciones
   */
  meWYSE.prototype.mentionMenuNavigateDown = function() {
    this._navigateMenu('mentionMenu', '.mewyse-mention-menu-item', 'mentionMenuSelectedIndex', 'updateMentionMenuSelection', 'down');
  };

  /**
   * Selecciona un item del menú de menciones e inserta la mención
   * @param {number} index - Índice en el array original de mentions
   */
  meWYSE.prototype.selectMentionItem = function(index) {
    if (!this.mentionMenu || !this.mentionMenuElement) return;

    // Obtener el item visible seleccionado
    var visibleItems = this.mentionMenu.querySelectorAll('.mewyse-mention-menu-item:not([style*="display: none"])');
    if (!visibleItems[index]) {
      // Si se llama desde click, buscar el índice real
      var mention = this.mentions[index];
      if (!mention) return;
      this.insertMention(mention);
      return;
    }

    // Si se navega con teclado, usar mentionMenuItems filtrado
    var mention = this.mentionMenuItems[index];
    if (!mention) return;

    this.insertMention(mention);
  };

  /**
   * Inserta una mención en el contenido
   * @param {Object} mention - Objeto con id y name
   */
  meWYSE.prototype.insertMention = function(mention) {
    var element = this.mentionMenuElement;

    // Crear el span de mención
    var mentionSpan = document.createElement('span');
    mentionSpan.className = 'mewyse-mention';
    mentionSpan.setAttribute('data-mention-id', mention.id);
    mentionSpan.setAttribute('data-mention-name', mention.name);
    mentionSpan.setAttribute('contenteditable', 'false');
    mentionSpan.textContent = '@' + mention.name;

    // Obtener la selección actual
    var selection = window.getSelection();
    if (!selection.rangeCount) {
      this.closeMentionMenu();
      return;
    }

    // Buscar y eliminar el "@..." que activó el menú
    var textContent = element.textContent;
    var mentionMatch = textContent.match(/(^|\s)@(\w*)$/);

    if (mentionMatch) {
      // Encontrar la posición del @ en el texto
      var atPosition = textContent.lastIndexOf('@');

      // Crear un TreeWalker para encontrar el nodo de texto correcto
      var walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      var currentPos = 0;
      var targetNode = null;
      var nodeOffset = 0;

      while (walker.nextNode()) {
        var node = walker.currentNode;
        var nodeLength = node.textContent.length;

        if (currentPos + nodeLength > atPosition) {
          targetNode = node;
          nodeOffset = atPosition - currentPos;
          break;
        }
        currentPos += nodeLength;
      }

      if (targetNode) {
        // Crear rango para seleccionar desde @ hasta el final del texto filtrado
        var deleteRange = document.createRange();
        deleteRange.setStart(targetNode, nodeOffset);
        deleteRange.setEndAfter(element.lastChild || element);

        // Eliminar el texto @...
        deleteRange.deleteContents();

        // Insertar el span de mención
        deleteRange.insertNode(mentionSpan);

        // Insertar un espacio después de la mención para poder continuar escribiendo
        var spaceNode = document.createTextNode('\u00A0'); // Non-breaking space
        mentionSpan.parentNode.insertBefore(spaceNode, mentionSpan.nextSibling);

        // Mover el cursor después del espacio
        var newRange = document.createRange();
        newRange.setStartAfter(spaceNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }

    // Actualizar el contenido del bloque con el innerHTML (incluyendo la mención)
    this.updateBlockContent(this.mentionMenuBlockId, element.innerHTML);

    this.closeMentionMenu();
  };

  /**
   * Cierra el menú de menciones
   */
  meWYSE.prototype.closeMentionMenu = function() {
    this._closeMenu('mentionMenu');
    this.mentionMenuSelectedIndex = 0;
    this.mentionMenuElement = null;
    this.mentionMenuBlockId = null;
    this.mentionMenuItems = [];
    this.mentionMenuRange = null;
    this._hideBackdrop('mentionMenu');
  };

  // ============================================
  // SISTEMA DE EMOJI PICKER
  // ============================================

  /**
   * Muestra el menú de selección de emojis
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.showEmojiMenu = function(blockId, element) {
    var self = this;

    // Cerrar menú existente
    this.closeEmojiMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-emoji-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', 'Emoji');

    // Guardar la selección actual antes de crear el menú
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      this.emojiMenuRange = selection.getRangeAt(0).cloneRange();
    }

    // Crear items del menú
    this.emojiMenuItems = [];
    for (var i = 0; i < WYSIWYG_EMOJIS.length; i++) {
      var emojiData = WYSIWYG_EMOJIS[i];
      this.emojiMenuItems.push(emojiData);

      var item = document.createElement('div');
      item.className = 'mewyse-emoji-menu-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', i);

      // Emoji
      var emojiSpan = document.createElement('span');
      emojiSpan.className = 'emoji';
      emojiSpan.textContent = emojiData.emoji;
      item.appendChild(emojiSpan);

      // Nombre
      var nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.textContent = ':' + emojiData.name + ':';
      item.appendChild(nameSpan);

      // Click handler
      (function(index) {
        item.addEventListener('mousedown', function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.selectEmojiItem(index);
        });
      })(i);

      menu.appendChild(item);
    }

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this.emojiMenu = menu;
    this.emojiMenuSelectedIndex = 0;
    this.emojiMenuElement = element;
    this.emojiMenuBlockId = blockId;

    // Posicionar el menú
    this.positionEmojiMenuAtCaret(menu);

    // Actualizar selección visual
    this.updateEmojiMenuSelection();

    this._showBackdrop('emojiMenu', function() { self.closeEmojiMenu(); });
  };

  /**
   * Posiciona el menú de emojis en la posición del cursor
   * @param {HTMLElement} menu
   */
  meWYSE.prototype.positionEmojiMenuAtCaret = function(menu) {
    var self = this;
    var cancelled = false;

    function updatePosition() {
      if (cancelled || !self.emojiMenu) return;

      var selection = window.getSelection();
      if (!selection.rangeCount) {
        requestAnimationFrame(updatePosition);
        return;
      }

      var range = selection.getRangeAt(0);
      var caretRect = range.getBoundingClientRect();

      // Si el cursor está al inicio y no tiene bounding box visible
      if (caretRect.width === 0 && caretRect.height === 0 && caretRect.top === 0) {
        var tempSpan = document.createElement('span');
        tempSpan.textContent = '\u200B';
        range.insertNode(tempSpan);
        caretRect = tempSpan.getBoundingClientRect();
        tempSpan.parentNode.removeChild(tempSpan);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      var menuRect = menu.getBoundingClientRect();
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;

      // Posición horizontal
      var left = caretRect.left;
      if (left + menuRect.width > viewportWidth - 10) {
        left = viewportWidth - menuRect.width - 10;
      }
      if (left < 10) left = 10;

      // Posición vertical (debajo del cursor)
      var top = caretRect.bottom + 5;
      if (top + menuRect.height > viewportHeight - 10) {
        top = caretRect.top - menuRect.height - 5;
      }

      menu.style.left = left + 'px';
      menu.style.top = top + 'px';

      requestAnimationFrame(updatePosition);
    }

    updatePosition();

    // Guardar función de cancelación
    menu._cancelAnchor = function() {
      cancelled = true;
    };
  };

  /**
   * Filtra el menú de emojis según el texto de búsqueda
   * @param {string} searchText
   */
  meWYSE.prototype.filterEmojiMenu = function(searchText) {
    if (!this.emojiMenu) return;

    var searchLower = searchText.toLowerCase();
    var items = this.emojiMenu.querySelectorAll('.mewyse-emoji-menu-item');
    var visibleCount = 0;

    this.emojiMenuItems = [];

    for (var i = 0; i < WYSIWYG_EMOJIS.length; i++) {
      var emojiData = WYSIWYG_EMOJIS[i];
      var item = items[i];
      var matches = emojiData.name.toLowerCase().indexOf(searchLower) !== -1;

      if (matches) {
        item.style.display = '';
        this.emojiMenuItems.push(emojiData);
        item.setAttribute('data-visible-index', visibleCount);
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    }

    // Ajustar índice seleccionado si está fuera de rango
    if (this.emojiMenuSelectedIndex >= visibleCount) {
      this.emojiMenuSelectedIndex = 0;
    }

    this.updateEmojiMenuSelection();

    // Cerrar si no hay resultados
    if (visibleCount === 0) {
      this.closeEmojiMenu();
    }
  };

  /**
   * Actualiza la selección visual en el menú de emojis
   */
  meWYSE.prototype.updateEmojiMenuSelection = function() {
    if (!this.emojiMenu) return;

    var items = this.emojiMenu.querySelectorAll('.mewyse-emoji-menu-item');
    var visibleIndex = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.style.display !== 'none') {
        if (visibleIndex === this.emojiMenuSelectedIndex) {
          item.classList.add('selected');
          item.setAttribute('aria-selected', 'true');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('selected');
          item.setAttribute('aria-selected', 'false');
        }
        visibleIndex++;
      } else {
        item.classList.remove('selected');
      }
    }
  };

  /**
   * Navega hacia arriba en el menú de emojis
   */
  meWYSE.prototype.emojiMenuNavigateUp = function() {
    this._navigateMenu('emojiMenu', '.mewyse-emoji-menu-item', 'emojiMenuSelectedIndex', 'updateEmojiMenuSelection', 'up');
  };

  /**
   * Navega hacia abajo en el menú de emojis
   */
  meWYSE.prototype.emojiMenuNavigateDown = function() {
    this._navigateMenu('emojiMenu', '.mewyse-emoji-menu-item', 'emojiMenuSelectedIndex', 'updateEmojiMenuSelection', 'down');
  };

  /**
   * Selecciona un emoji del menú
   * @param {number} index
   */
  meWYSE.prototype.selectEmojiItem = function(index) {
    if (index >= 0 && index < this.emojiMenuItems.length) {
      var emojiData = this.emojiMenuItems[index];
      this.insertEmoji(emojiData);
    }
  };

  /**
   * Inserta un emoji en el contenido
   * @param {Object} emojiData - Objeto con name y emoji
   */
  meWYSE.prototype.insertEmoji = function(emojiData) {
    var element = this.emojiMenuElement;
    var blockId = this.emojiMenuBlockId;

    if (!element || !emojiData) {
      this.closeEmojiMenu();
      return;
    }

    // Obtener la selección actual
    var selection = window.getSelection();
    if (!selection.rangeCount) {
      this.closeEmojiMenu();
      return;
    }

    var range = selection.getRangeAt(0);

    // Buscar el patrón ":texto" antes del cursor
    var container = range.startContainer;
    var offset = range.startOffset;

    // Si es un nodo de texto
    if (container.nodeType === 3) {
      var text = container.textContent;
      var textBeforeCursor = text.substring(0, offset);

      // Buscar el patrón :palabra al final
      var match = textBeforeCursor.match(/(^|\s):([a-zA-Z0-9_]*)$/);

      if (match) {
        var colonIndex = textBeforeCursor.lastIndexOf(':');
        // Si hay espacio antes del ":", incluirlo en el cálculo
        var startIndex = colonIndex;
        if (colonIndex > 0 && textBeforeCursor[colonIndex - 1] === ' ') {
          startIndex = colonIndex; // Mantener el espacio
        }

        // Crear el rango para eliminar ":texto"
        var deleteRange = document.createRange();
        deleteRange.setStart(container, startIndex);
        deleteRange.setEnd(container, offset);

        // Eliminar el texto ":busqueda"
        deleteRange.deleteContents();

        // Crear el span del emoji
        var emojiSpan = document.createElement('span');
        emojiSpan.setAttribute('data-name', emojiData.name);
        emojiSpan.setAttribute('data-type', 'emoji');
        emojiSpan.setAttribute('contenteditable', 'false');
        emojiSpan.className = 'mewyse-emoji';
        emojiSpan.textContent = emojiData.emoji;

        // Insertar el emoji
        deleteRange.insertNode(emojiSpan);

        // Añadir un espacio después del emoji
        var spaceNode = document.createTextNode('\u00A0');
        emojiSpan.parentNode.insertBefore(spaceNode, emojiSpan.nextSibling);

        // Mover el cursor después del espacio
        var newRange = document.createRange();
        newRange.setStartAfter(spaceNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);

        // Actualizar el contenido del bloque
        this.updateBlockContent(blockId, element.innerHTML);
      }
    }

    this.closeEmojiMenu();
  };

  /**
   * Cierra el menú de emojis
   */
  meWYSE.prototype.closeEmojiMenu = function() {
    this._closeMenu('emojiMenu');
    this.emojiMenuSelectedIndex = 0;
    this.emojiMenuElement = null;
    this.emojiMenuBlockId = null;
    this.emojiMenuItems = [];
    this.emojiMenuRange = null;
    this._hideBackdrop('emojiMenu');
  };

  /**
   * Maneja los eventos de teclado en los bloques
   * @param {KeyboardEvent} e
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.handleKeyDown = function(e, blockId, element) {
    // Si hay selección cross-block activa
    if (this.crossBlockSelection) {
      var isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (isCtrlOrCmd && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        this.executeCrossBlockCopy();
        return;
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        this.deleteCrossBlockSelection();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        this.clearCrossBlockSelection();
        this.closeFormatMenu();
        return;
      }
    }

    // Si hay bloques seleccionados, manejar Delete/Backspace
    if (this.selectedBlocks.length > 0) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        this.deleteSelectedBlocks();
        return;
      }
      // Escape: limpiar selección
      if (e.key === 'Escape') {
        e.preventDefault();
        this.clearSelection();
        return;
      }
    }

    // Si el menú slash está abierto, manejar navegación
    if (this.slashMenu) {
      // Flecha arriba: navegar hacia arriba en el menú
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.slashMenuNavigateUp();
        return;
      }

      // Flecha abajo: navegar hacia abajo en el menú
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.slashMenuNavigateDown();
        return;
      }

      // Enter: seleccionar elemento del menú
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectSlashMenuItem(this.slashMenuSelectedIndex);
        return;
      }

      // Backspace cuando solo hay "/": cerrar menú y borrar "/"
      if (e.key === 'Backspace') {
        var content = element.textContent;
        if (content === '/' || content === ' /') {
          e.preventDefault();
          this.closeSlashMenu();
          element.textContent = content === '/' ? '' : ' ';
          // Mover cursor al final
          var range = document.createRange();
          var sel = window.getSelection();
          if (element.firstChild) {
            range.setStart(element.firstChild, element.textContent.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
          return;
        }
      }

      // Escape: cerrar menú
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeSlashMenu();
        return;
      }
    }

    // Si el menú de menciones está abierto, manejar navegación
    if (this.mentionMenu) {
      // Flecha arriba: navegar hacia arriba en el menú
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.mentionMenuNavigateUp();
        return;
      }

      // Flecha abajo: navegar hacia abajo en el menú
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.mentionMenuNavigateDown();
        return;
      }

      // Enter: seleccionar elemento del menú
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectMentionItem(this.mentionMenuSelectedIndex);
        return;
      }

      // Escape: cerrar menú
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeMentionMenu();
        return;
      }
    }

    // Si el menú de emojis está abierto, manejar navegación
    if (this.emojiMenu) {
      // Flecha arriba: navegar hacia arriba en el menú
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.emojiMenuNavigateUp();
        return;
      }

      // Flecha abajo: navegar hacia abajo en el menú
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.emojiMenuNavigateDown();
        return;
      }

      // Enter: seleccionar elemento del menú
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectEmojiItem(this.emojiMenuSelectedIndex);
        return;
      }

      // Escape: cerrar menú
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeEmojiMenu();
        return;
      }
    }

    // Atajos de teclado (Ctrl/Cmd + tecla)
    var isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Ctrl+Shift+Z: rehacer (debe ir antes de Ctrl+Z)
    if (isCtrlOrCmd && e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      this.redo();
      return;
    }

    // Ctrl+Shift+...: atajos con Shift
    if (isCtrlOrCmd && e.shiftKey) {
      // Ctrl+Shift+K → removeFormat
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        this.removeFormat();
        return;
      }
      // Ctrl+Shift+X → strikethrough
      if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        document.execCommand('strikeThrough', false, null);
        this.updateBlockContent(blockId, element.innerHTML);
        this.triggerChange();
        return;
      }
      // Ctrl+Shift+7 → lista numerada
      if (e.key === '7' || e.key === '&' || e.key === '/') {
        e.preventDefault();
        this.changeBlockType(blockId, 'numberList');
        return;
      }
      // Ctrl+Shift+8 → lista con viñetas
      if (e.key === '8' || e.key === '*' || e.key === '(') {
        e.preventDefault();
        this.changeBlockType(blockId, 'bulletList');
        return;
      }
    }

    // Ctrl+Alt+...: cambio rápido a headings
    if (isCtrlOrCmd && e.altKey && !e.shiftKey) {
      if (e.key === '1' || e.code === 'Digit1') {
        e.preventDefault();
        this.changeBlockType(blockId, 'heading1');
        return;
      }
      if (e.key === '2' || e.code === 'Digit2') {
        e.preventDefault();
        this.changeBlockType(blockId, 'heading2');
        return;
      }
      if (e.key === '3' || e.code === 'Digit3') {
        e.preventDefault();
        this.changeBlockType(blockId, 'heading3');
        return;
      }
      if (e.key === '0' || e.code === 'Digit0') {
        e.preventDefault();
        this.changeBlockType(blockId, 'paragraph');
        return;
      }
    }

    if (isCtrlOrCmd && !e.shiftKey && !e.altKey) {
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        document.execCommand('bold', false, null);
        this.updateBlockContent(blockId, element.innerHTML);
        this.triggerChange();
        return;
      }
      if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        document.execCommand('italic', false, null);
        this.updateBlockContent(blockId, element.innerHTML);
        this.triggerChange();
        return;
      }
      if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        document.execCommand('underline', false, null);
        this.updateBlockContent(blockId, element.innerHTML);
        this.triggerChange();
        return;
      }
      // Ctrl+E → code inline (envuelve selección en <code>)
      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        this._wrapSelectionInTag('code');
        this.updateBlockContent(blockId, element.innerHTML);
        this.triggerChange();
        return;
      }
      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        this.undo();
        return;
      }
      if (e.key === 'y' || e.key === 'Y') {
        e.preventDefault();
        this.redo();
        return;
      }
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        this.createLink();
        return;
      }
      if (this.enableFindReplace && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        this.showFindReplace();
        return;
      }
    }

    // Tab / Shift+Tab: indentar/desindentar en listas
    if (e.key === 'Tab') {
      var currentBlock = this.getBlock(blockId);
      if (currentBlock && (currentBlock.type === 'bulletList' ||
                           currentBlock.type === 'numberList' ||
                           currentBlock.type === 'checklist')) {
        e.preventDefault();
        this.indentBlock(blockId, e.shiftKey ? -1 : 1);
        return;
      }
    }

    // Enter: dividir el bloque o crear uno nuevo según la posición del cursor.
    //  - Cursor al final  → comportamiento clásico: bloque nuevo vacío después.
    //  - Cursor en medio  → split: el bloque actual se queda con la parte previa,
    //    se crea un bloque nuevo del mismo tipo con la parte siguiente.
    //  - Cursor al inicio → split degenerado (parte previa vacía, parte siguiente
    //    con todo el contenido) — equivalente a "empujar" el contenido abajo.
    //
    // CRÍTICO MÓVIL: todo el flujo (crear bloque + foco) es síncrono dentro del
    // gesto del usuario. iOS/Android sólo muestran el teclado virtual cuando
    // focus() ocurre síncronamente desde un evento de usuario; cualquier
    // setTimeout/rAF intermedio rompe la cadena y oculta el teclado.
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (this._isAddingBlock) return;
      this._isAddingBlock = true;

      var index = this.getBlockIndex(blockId);
      var self = this;
      var currentBlock = this.getBlock(blockId);

      // Bloques que NO se pueden dividir como texto (image, divider, video, audio,
      // table, code). Para estos mantenemos el comportamiento clásico (paragraph
      // nuevo a continuación).
      var nonSplittable = { image: 1, divider: 1, video: 1, audio: 1, table: 1, code: 1 };
      var canSplit = currentBlock && !nonSplittable[currentBlock.type];

      // Tipo del nuevo bloque cuando NO se hace split (clásico).
      // Listas vacías → paragraph (salir de la lista). Listas con contenido → mismo
      // tipo. Heading/quote → paragraph (más natural tras cerrar el heading).
      // Resto → paragraph.
      function endTypeFor(block) {
        if (!block) return 'paragraph';
        var listTypes = { bulletList: 1, numberList: 1, checklist: 1 };
        if (listTypes[block.type]) {
          var isEmpty = (element.textContent || '').trim() === '';
          return isEmpty ? 'paragraph' : block.type;
        }
        return 'paragraph';
      }

      // Determinar si hay contenido después del cursor. compareBoundaryPoints
      // no es fiable comparando ranges en distinto container (text node vs
      // elemento padre), así que extraemos el "after" y miramos su texto.
      var sel = window.getSelection();
      var range = (sel && sel.rangeCount > 0) ? sel.getRangeAt(0) : null;
      var beforeHTML = '';
      var afterHTML = '';
      var atEnd = true;
      if (canSplit && range && range.collapsed) {
        var beforeRange = document.createRange();
        beforeRange.selectNodeContents(element);
        beforeRange.setEnd(range.startContainer, range.startOffset);
        var afterRange = document.createRange();
        afterRange.selectNodeContents(element);
        afterRange.setStart(range.startContainer, range.startOffset);

        var tmp = document.createElement('div');
        tmp.appendChild(beforeRange.cloneContents());
        beforeHTML = tmp.innerHTML;
        tmp.innerHTML = '';
        tmp.appendChild(afterRange.cloneContents());
        afterHTML = tmp.innerHTML;

        // atEnd: no queda texto visible después del cursor.
        atEnd = afterRange.toString().length === 0;
      }

      // Ventana de supresión de blur: estos handlers mueven o reescriben el
      // foco entre contenteditables. En móvil, durante esa transición, el
      // navegador puede pasar momentáneamente por document.body y disparar el
      // focusout antes de que el nuevo elemento reciba focusin. Sin este
      // margen, el callback onBlur se dispararía indebidamente.
      this._suppressBlurUntil = Date.now() + 300;

      if (!canSplit || atEnd) {
        // Comportamiento clásico: bloque vacío después. Todo síncrono para
        // mantener vivo el gesto del usuario (teclado virtual en móvil).
        var newType = endTypeFor(currentBlock);
        this._skipAutoFocus = true;
        var newBlockId = this.addBlock(newType, index + 1);
        this._skipAutoFocus = false;
        this._focusBlockSync(newBlockId);
        this._isAddingBlock = false;
        return;
      }

      // Tipo del nuevo bloque al hacer split: SIEMPRE el mismo del actual. Esto
      // hace que Enter funcione como un "salto de línea" que respeta el formato.
      var splitType = currentBlock.type;

      // Split SIN cambiar el foco — clave para móvil: en lugar de crear el
      // nuevo bloque ABAJO con la mitad nueva y mover el cursor allí, creamos
      // el nuevo bloque ARRIBA con la mitad anterior y dejamos el bloque
      // actual con la mitad nueva. El elemento sigue enfocado (no se llama
      // a focus() en otro nodo) y el cursor queda al inicio de su contenido
      // — exactamente la posición lógica donde estaba el cursor tras el split.
      // Como bonus, el teclado virtual no se mueve y no se dispara onBlur.
      var safeBefore = this._sanitizeBlockContent(beforeHTML);
      var safeAfter = this._sanitizeBlockContent(afterHTML);

      var splitProps = {};
      if (currentBlock.alignment) splitProps.alignment = currentBlock.alignment;
      if (currentBlock.customClass) splitProps.customClass = currentBlock.customClass;
      if (typeof currentBlock.indentLevel === 'number') splitProps.indentLevel = currentBlock.indentLevel;
      // Checklist: la mitad anterior (que va al bloque nuevo arriba) hereda
      // el estado checked del original; el bloque actual (mitad nueva, que se
      // queda con el cursor) arranca sin marcar como suele hacer Notion.
      if (splitType === 'checklist' && currentBlock.checked) splitProps.checked = true;

      // Insertar nuevo bloque ARRIBA del actual con la mitad anterior.
      this._skipAutoFocus = true;
      this.addBlock(splitType, index, safeBefore, splitProps);
      this._skipAutoFocus = false;

      // El bloque actual conserva su id, su elemento DOM y el foco. Solo
      // actualizamos su contenido a la mitad posterior.
      currentBlock.content = safeAfter;
      if (splitType === 'checklist') currentBlock.checked = false;
      element.innerHTML = safeAfter;

      // Cursor al inicio del elemento (donde quedaba lógicamente el cursor
      // tras el split). El elemento no perdió focus en ningún momento.
      this._setCursorAtTextOffset(element, 0);

      this.triggerChange();
      this._isAddingBlock = false;
      return;
    }

    // Backspace:
    //  - Bloque vacío  → eliminar el bloque y enfocar el anterior (al final).
    //  - Cursor al inicio de un bloque CON contenido → fusionar con el anterior
    //    (inverso del split en Enter): el contenido del actual se concatena al
    //    final del anterior, y el cursor queda en la frontera.
    if (e.key === 'Backspace' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
      var content = element.textContent;
      if (content === '' || content === '\n') {
        e.preventDefault();

        if (this.blocks.length > 1) {
          var index = this.getBlockIndex(blockId);
          this.deleteBlock(blockId);

          // Enfocar el bloque anterior
          if (index > 0) {
            var self = this;
            setTimeout(function() {
              var prevBlock = self.blocks[index - 1];
              if (prevBlock) {
                var prevBlockElement = self.container.querySelector('[data-block-id="' + prevBlock.id + '"]');
                if (prevBlockElement) {
                  var contentEditable = prevBlockElement.querySelector('[contenteditable="true"]');
                  if (contentEditable) {
                    contentEditable.focus();
                    // Mover cursor al final
                    var range = document.createRange();
                    var sel = window.getSelection();
                    if (contentEditable.firstChild) {
                      range.setStart(contentEditable.firstChild, contentEditable.textContent.length);
                      range.collapse(true);
                      sel.removeAllRanges();
                      sel.addRange(range);
                    }
                  }
                }
              }
            }, 10);
          }
        }
        return;
      }

      // Bloque con contenido: si el cursor está al inicio, intentar fusionar
      // con el anterior. Sólo aplica si la selección está colapsada (no hay
      // texto seleccionado a borrar) y el bloque anterior es de tipo texto.
      var sel = window.getSelection();
      var range = (sel && sel.rangeCount > 0) ? sel.getRangeAt(0) : null;
      if (range && range.collapsed) {
        var beforeRange = document.createRange();
        beforeRange.selectNodeContents(element);
        beforeRange.setEnd(range.startContainer, range.startOffset);
        var atStart = beforeRange.toString().length === 0;
        if (atStart) {
          var idx = this.getBlockIndex(blockId);
          if (idx > 0) {
            var prevBlock = this.blocks[idx - 1];
            var nonMergeable = { table: 1, image: 1, divider: 1, video: 1, audio: 1 };
            if (prevBlock && !nonMergeable[prevBlock.type]) {
              e.preventDefault();
              this._mergeBlockIntoPrevious(blockId);
              return;
            }
          }
        }
      }
    }

    // Flecha arriba: ir al bloque anterior
    if (e.key === 'ArrowUp') {
      var sel = window.getSelection();
      if (sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        // Solo si estamos al inicio del bloque
        if (range.startOffset === 0) {
          e.preventDefault();
          var index = this.getBlockIndex(blockId);
          if (index > 0) {
            var prevBlock = this.blocks[index - 1];
            var prevBlockElement = this.container.querySelector('[data-block-id="' + prevBlock.id + '"]');
            if (prevBlockElement) {
              var contentEditable = prevBlockElement.querySelector('[contenteditable="true"]');
              if (contentEditable) {
                contentEditable.focus();
              }
            }
          }
        }
      }
    }

    // Flecha abajo: ir al bloque siguiente
    if (e.key === 'ArrowDown') {
      var sel = window.getSelection();
      if (sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        // Solo si estamos al final del bloque
        if (range.startOffset === element.textContent.length) {
          e.preventDefault();
          var index = this.getBlockIndex(blockId);
          if (index < this.blocks.length - 1) {
            var nextBlock = this.blocks[index + 1];
            var nextBlockElement = this.container.querySelector('[data-block-id="' + nextBlock.id + '"]');
            if (nextBlockElement) {
              var contentEditable = nextBlockElement.querySelector('[contenteditable="true"]');
              if (contentEditable) {
                contentEditable.focus();
              }
            }
          }
        }
      }
    }
  };

  /**
   * Obtiene el icono del tipo de bloque
   * @param {string} type
   * @returns {string}
   */
  meWYSE.prototype.getBlockTypeIcon = function(type) {
    var icons = {
      'paragraph': WYSIWYG_ICONS.paragraph,
      'heading1': WYSIWYG_ICONS.heading1,
      'heading2': WYSIWYG_ICONS.heading2,
      'heading3': WYSIWYG_ICONS.heading3,
      'quote': WYSIWYG_ICONS.quote,
      'code': WYSIWYG_ICONS.code,
      'bulletList': WYSIWYG_ICONS.bulletList,
      'numberList': WYSIWYG_ICONS.numberList,
      'table': WYSIWYG_ICONS.table,
      'image': WYSIWYG_ICONS.image,
      'divider': WYSIWYG_ICONS.divider
    };
    return icons[type] || WYSIWYG_ICONS.paragraph;
  };

  /**
   * Muestra el menú de opciones del bloque (handle)
   * @param {number} blockId
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showBlockOptionsMenu = function(blockId, button) {
    var self = this;

    // Cerrar menú existente si hay alguno
    var existingMenu = document.querySelector('.mewyse-options-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    // Marcar el bloque como seleccionado visualmente
    var blockElement = this.getBlockElementById(blockId);
    if (blockElement) {
      blockElement.classList.add('mewyse-block-selected');
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-options-menu';

    // Función para limpiar la selección al cerrar el menú
    menu._cleanupSelection = function() {
      if (blockElement) {
        blockElement.classList.remove('mewyse-block-selected');
      }
    };

    var closeBlockOptionsMenu = function() {
      if (menu._cancelAnchor) menu._cancelAnchor();
      if (menu._cleanupSelection) menu._cleanupSelection();
      if (menu.parentNode) menu.remove();
      self._hideBackdrop('blockOptions');
    };

    // Obtener el bloque para ver si es una tabla
    var block = this.getBlock(blockId);
    var isTable = block && block.type === 'table';

    // Verificar si hay múltiples bloques seleccionados
    var hasMultipleSelection = this.selectedBlocks.length > 1;
    var selectionCount = this.selectedBlocks.length;

    // Etiquetas dinámicas según la selección
    var deleteLabel = hasMultipleSelection ? this.t('blockMenu.deleteMultiple', { count: selectionCount }) : this.t('blockMenu.delete');
    var changeTypeLabel = hasMultipleSelection ? this.t('blockMenu.changeTypeMultiple', { count: selectionCount }) : this.t('blockMenu.changeType');

    var options = [
      {
        action: 'changeType',
        label: changeTypeLabel,
        icon: WYSIWYG_ICONS.gear,
        submenu: true
      },
      {
        action: 'insertAbove',
        label: this.t('blockMenu.insertAbove'),
        icon: WYSIWYG_ICONS.arrowUp
      },
      {
        action: 'insertBelow',
        label: this.t('blockMenu.insertBelow'),
        icon: WYSIWYG_ICONS.arrowDown
      },
      {
        action: 'duplicate',
        label: this.t('blockMenu.duplicate'),
        icon: WYSIWYG_ICONS.duplicate
      },
      {
        action: 'delete',
        label: deleteLabel,
        icon: WYSIWYG_ICONS.trash,
        danger: true
      }
    ];

    // Si es una tabla, añadir opciones específicas de tabla
    if (isTable && !hasMultipleSelection) {
      options.splice(2, 0, {
        action: 'tableProperties',
        label: this.t('blockMenu.tableProperties'),
        icon: WYSIWYG_ICONS.gear
      }, {
        action: 'resetTableWidth',
        label: this.t('blockMenu.resetTableWidth'),
        icon: WYSIWYG_ICONS.resetWidth
      });
    }

    options.forEach(function(option) {
      var item = document.createElement('div');
      item.className = 'mewyse-options-menu-item' + (option.danger ? ' danger' : '');
      item.innerHTML = '<span class="icon">' + option.icon + '</span> ' + option.label;

      item.onclick = function(e) {
        e.stopPropagation();

        if (option.action === 'changeType') {
          closeBlockOptionsMenu();
          self.showBlockTypeMenu(blockId, button);
        } else if (option.action === 'insertAbove') {
          var index = self.getBlockIndex(blockId);
          if (index !== -1) {
            self.addBlock('paragraph', index);
          }
          closeBlockOptionsMenu();
        } else if (option.action === 'insertBelow') {
          var index = self.getBlockIndex(blockId);
          if (index !== -1) {
            self.addBlock('paragraph', index + 1);
          }
          closeBlockOptionsMenu();
        } else if (option.action === 'duplicate') {
          self.duplicateBlock(blockId);
          closeBlockOptionsMenu();
        } else if (option.action === 'resetTableWidth') {
          self.resetTableColumnWidths(blockId);
          closeBlockOptionsMenu();
        } else if (option.action === 'tableProperties') {
          closeBlockOptionsMenu();
          self.showTablePropertiesModal(blockId);
        } else if (option.action === 'delete') {
          // Si hay selección múltiple, eliminar todos los seleccionados
          if (self.selectedBlocks.length > 1) {
            self.deleteSelectedBlocks();
          } else {
            self.deleteBlock(blockId);
          }
          closeBlockOptionsMenu();
        }
      };

      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Anclar el menú al botón
    this.anchorMenu(menu, button, { offsetY: 5 });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) {
          closeBlockOptionsMenu();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('blockOptions', closeBlockOptionsMenu);
  };

  /**
   * Muestra el menú de tipo de bloque
   * @param {number} blockId
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showBlockTypeMenu = function(blockId, button) {
    var self = this;

    // Cerrar menú existente si hay alguno
    var existingMenu = document.querySelector('.mewyse-type-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    // Marcar el bloque como seleccionado visualmente
    var blockElement = this.getBlockElementById(blockId);
    if (blockElement) {
      blockElement.classList.add('mewyse-block-selected');
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-type-menu';

    // Función para limpiar la selección al cerrar el menú
    menu._cleanupSelection = function() {
      if (blockElement) {
        blockElement.classList.remove('mewyse-block-selected');
      }
    };

    var closeBlockTypeMenu = function() {
      if (menu._cancelAnchor) menu._cancelAnchor();
      if (menu._cleanupSelection) menu._cleanupSelection();
      if (menu.parentNode) menu.remove();
      self._hideBackdrop('blockTypeMenu');
    };

    var types = [
      { type: 'paragraph', icon: WYSIWYG_ICONS.paragraph },
      { type: 'heading1', icon: WYSIWYG_ICONS.heading1 },
      { type: 'heading2', icon: WYSIWYG_ICONS.heading2 },
      { type: 'heading3', icon: WYSIWYG_ICONS.heading3 },
      { type: 'quote', icon: WYSIWYG_ICONS.quote },
      { type: 'code', icon: WYSIWYG_ICONS.code },
      { type: 'bulletList', icon: WYSIWYG_ICONS.bulletList },
      { type: 'numberList', icon: WYSIWYG_ICONS.numberList },
      { type: 'checklist', icon: WYSIWYG_ICONS.checklist },
      { type: 'divider', icon: WYSIWYG_ICONS.divider }
    ];

    types.forEach(function(typeInfo) {
      var item = document.createElement('div');
      item.className = 'mewyse-type-menu-item';
      item.innerHTML = '<span class="icon">' + typeInfo.icon + '</span> ' + self.t('blockTypes.' + typeInfo.type);
      item.onclick = function() {
        // Si hay selección múltiple, cambiar tipo de todos los seleccionados
        if (self.selectedBlocks.length > 1) {
          self.changeSelectedBlocksType(typeInfo.type);
        } else {
          self.changeBlockType(blockId, typeInfo.type);
        }
        closeBlockTypeMenu();
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Anclar el menú al botón
    this.anchorMenu(menu, button, { offsetY: 5 });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) {
          closeBlockTypeMenu();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('blockTypeMenu', closeBlockTypeMenu);
  };

  /**
   * Cambia el tipo de un bloque
   * @param {number} blockId
   * @param {string} newType
   */
  meWYSE.prototype.changeBlockType = function(blockId, newType) {
    this.pushHistory(true);
    var block = this.getBlock(blockId);
    if (block) {
      var oldType = block.type;
      block.type = newType;
      this.render(blockId);

      // Si el cambio involucra listas numeradas, actualizar la numeración
      if (oldType === 'numberList' || newType === 'numberList') {
        var index = this.getBlockIndex(blockId);
        if (index !== -1) {
          this.updateConsecutiveNumberLists(index);
        }
      }

      this.triggerChange();
    }
  };

  /**
   * Crea el botón para añadir bloques
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createAddBlockButton = function() {
    var self = this;
    var button = document.createElement('button');
    button.className = 'mewyse-add-block';
    button.innerHTML = this.t('misc.addBlock');
    button.onclick = function(e) {
      e.preventDefault();
      self.addBlock('paragraph');
    };
    return button;
  };

  /**
   * Actualiza listas numeradas consecutivas (si es necesario)
   * Con la nueva arquitectura semantica, las listas consecutivas se agrupan
   * automaticamente en un solo <ol>, por lo que la numeracion es automatica.
   * Esta funcion se mantiene por compatibilidad pero puede no necesitar hacer nada.
   * @param {number} fromIndex - Índice desde donde empezar a actualizar
   */
  meWYSE.prototype.updateConsecutiveNumberLists = function(fromIndex) {
    // Con la nueva arquitectura, las listas consecutivas ya estan en un <ol> comun
    // La numeracion es automatica gracias al navegador
    // Solo re-renderizar si hay cambios que afecten la agrupacion
    // Por ahora, no hacer nada - la agrupacion se maneja en render()
  };

  /**
   * Añade un nuevo bloque
   * @param {string} type - Tipo de bloque
   * @param {number} index - Posición donde insertar (opcional)
   * @returns {number} - ID del bloque creado
   */
  meWYSE.prototype.addBlock = function(type, index, content, props) {
    this.pushHistory(true);
    var block = {
      id: ++this.currentBlockId,
      type: type || 'paragraph',
      content: ''
    };

    // content opcional: se usa al hacer split de un bloque (Enter en medio).
    // Pasa por el sanitizador igual que cualquier contenido externo.
    if (typeof content === 'string' && content.length > 0) {
      block.content = this._sanitizeBlockContent(content);
    }

    // props opcional: propiedades a heredar antes del render (alignment,
    // customClass, indentLevel, checked). Permite que el render inicial ya
    // emita las clases/estilos correctos sin tener que disparar un segundo
    // render — crítico para no romper el gesto del usuario en móvil.
    if (props && typeof props === 'object') {
      if (typeof props.alignment === 'string') block.alignment = props.alignment;
      if (typeof props.customClass === 'string' && this._customClassWhitelist[props.customClass]) {
        block.customClass = props.customClass;
      }
      if (typeof props.indentLevel === 'number' && props.indentLevel >= 0) {
        block.indentLevel = Math.min(5, Math.floor(props.indentLevel));
      }
      if (props.checked === true || props.checked === false) block.checked = props.checked;
    }

    if (typeof index === 'number') {
      this.blocks.splice(index, 0, block);
    } else {
      this.blocks.push(block);
    }

    // Renderizar y enfocar el nuevo bloque
    this.render(block.id);

    // Si se insertó una lista numerada o se insertó en medio de listas numeradas,
    // re-renderizar las listas consecutivas posteriores para actualizar los números
    if (typeof index === 'number') {
      var self = this;
      // Usar requestAnimationFrame doble para asegurar que el DOM esté completamente actualizado
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          self.updateConsecutiveNumberLists(index);
        });
      });
    }

    this.triggerChange();

    return block.id;
  };

  /**
   * Duplica un bloque
   * @param {number} blockId
   */
  meWYSE.prototype.duplicateBlock = function(blockId) {
    this.pushHistory(true);
    var block = this.getBlock(blockId);
    if (block) {
      var index = this.getBlockIndex(blockId);
      var duplicatedBlock = {
        id: ++this.currentBlockId,
        type: block.type,
        content: block.content
      };
      // Preservar propiedades opcionales (tableStyle, checked, alignment)
      if (typeof block.tableStyle === 'string') duplicatedBlock.tableStyle = block.tableStyle;
      if (block.checked === true) duplicatedBlock.checked = true;
      if (typeof block.alignment === 'string') duplicatedBlock.alignment = block.alignment;

      this.blocks.splice(index + 1, 0, duplicatedBlock);
      this.render();
      this.triggerChange();
    }
  };

  /**
   * Elimina un bloque
   * @param {number} blockId
   */
  meWYSE.prototype.deleteBlock = function(blockId) {
    this.pushHistory(true);
    var index = this.getBlockIndex(blockId);
    if (index !== -1) {
      // Si es el último bloque, vaciarlo en vez de eliminarlo
      if (this.blocks.length === 1) {
        this.blocks[0].type = 'paragraph';
        this.blocks[0].content = '';
        this.render(this.blocks[0].id);
        this.triggerChange();
        return;
      }

      this.blocks.splice(index, 1);
      this.render();

      // Actualizar las listas numeradas si es necesario
      if (index < this.blocks.length) {
        this.updateConsecutiveNumberLists(index);
      }

      this.triggerChange();
    }
  };

  /**
   * Mueve un bloque a la posición de otro bloque
   * @param {number} draggedBlockId - ID del bloque arrastrado
   * @param {number} targetBlockId - ID del bloque destino
   */
  meWYSE.prototype.moveBlock = function(draggedBlockId, targetBlockId) {
    this.pushHistory(true);
    var draggedIndex = this.getBlockIndex(draggedBlockId);
    var targetIndex = this.getBlockIndex(targetBlockId);

    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }

    // Obtener el bloque arrastrado
    var draggedBlock = this.blocks[draggedIndex];

    // Eliminar el bloque de su posición actual
    this.blocks.splice(draggedIndex, 1);

    // Ajustar el índice destino si es necesario
    if (draggedIndex < targetIndex) {
      targetIndex--;
    }

    // Insertar el bloque en la nueva posición
    this.blocks.splice(targetIndex, 0, draggedBlock);

    // Re-renderizar
    this.render();
    this.triggerChange();
  };

  /**
   * Actualiza el contenido de un bloque
   * @param {number} blockId
   * @param {string} content
   */
  meWYSE.prototype.updateBlockContent = function(blockId, content) {
    var block = this.getBlock(blockId);
    if (block) {
      // Para bloques de tabla, limpiar controles del editor antes de guardar
      // en el modelo (botones row/col-control, resize-handle, etc.)
      if (block.type === 'table' && typeof content === 'string') {
        content = this._cleanTableContent(content);
      }
      block.content = content;
      this.triggerChange();
    }
  };

  /**
   * Obtiene un bloque por su ID
   * @param {number} blockId
   * @returns {Object|null}
   */
  meWYSE.prototype.getBlock = function(blockId) {
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id === blockId) {
        return this.blocks[i];
      }
    }
    return null;
  };

  /**
   * Obtiene el índice de un bloque
   * @param {number} blockId
   * @returns {number}
   */
  meWYSE.prototype.getBlockIndex = function(blockId) {
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id === blockId) {
        return i;
      }
    }
    return -1;
  };

  /**
   * Verifica si un bloque está seleccionado
   * @param {number} blockId
   * @returns {boolean}
   */
  meWYSE.prototype.isBlockSelected = function(blockId) {
    return this.selectedBlocks.indexOf(blockId) !== -1;
  };

  /**
   * Selecciona un bloque
   * @param {number} blockId
   */
  meWYSE.prototype.selectBlock = function(blockId) {
    if (!this.isBlockSelected(blockId)) {
      this.selectedBlocks.push(blockId);
      this.updateBlockSelectionVisual(blockId, true);
    }
  };

  /**
   * Deselecciona un bloque
   * @param {number} blockId
   */
  meWYSE.prototype.deselectBlock = function(blockId) {
    var index = this.selectedBlocks.indexOf(blockId);
    if (index !== -1) {
      this.selectedBlocks.splice(index, 1);
      this.updateBlockSelectionVisual(blockId, false);
    }
  };

  /**
   * Limpia toda la selección
   */
  meWYSE.prototype.clearSelection = function() {
    var self = this;
    var blocksToDeselect = this.selectedBlocks.slice();
    blocksToDeselect.forEach(function(blockId) {
      self.updateBlockSelectionVisual(blockId, false);
    });
    this.selectedBlocks = [];
  };

  /**
   * Alterna la selección de un bloque (para Ctrl+Click)
   * @param {number} blockId
   */
  meWYSE.prototype.toggleBlockSelection = function(blockId) {
    if (this.isBlockSelected(blockId)) {
      this.deselectBlock(blockId);
    } else {
      this.selectBlock(blockId);
    }
  };

  /**
   * Selecciona un rango de bloques (para Shift+Click)
   * @param {number} fromBlockId
   * @param {number} toBlockId
   */
  meWYSE.prototype.selectBlockRange = function(fromBlockId, toBlockId) {
    var fromIndex = this.getBlockIndex(fromBlockId);
    var toIndex = this.getBlockIndex(toBlockId);

    if (fromIndex === -1 || toIndex === -1) {
      return;
    }

    // Asegurar que fromIndex sea menor que toIndex
    var startIndex = Math.min(fromIndex, toIndex);
    var endIndex = Math.max(fromIndex, toIndex);

    // Limpiar selección anterior
    this.clearSelection();

    // Seleccionar todos los bloques en el rango
    for (var i = startIndex; i <= endIndex; i++) {
      this.selectBlock(this.blocks[i].id);
    }
  };

  /**
   * Actualiza la visualización de selección de un bloque
   * @param {number} blockId
   * @param {boolean} selected
   */
  meWYSE.prototype.updateBlockSelectionVisual = function(blockId, selected) {
    var blockWrapper = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (blockWrapper) {
      if (selected) {
        blockWrapper.classList.add('mewyse-block-selected');
      } else {
        blockWrapper.classList.remove('mewyse-block-selected');
      }
    }
  };

  /**
   * Maneja el clic en un bloque para selección
   * @param {MouseEvent} e
   * @param {number} blockId
   */
  meWYSE.prototype.handleBlockClick = function(e, blockId) {
    var isCtrlOrCmd = e.ctrlKey || e.metaKey;
    var isShift = e.shiftKey;

    if (isShift && this.lastClickedBlockId !== null) {
      // Shift+Click: seleccionar rango
      e.preventDefault();
      this.clearCrossBlockSelection();
      this.selectBlockRange(this.lastClickedBlockId, blockId);
    } else if (isCtrlOrCmd) {
      // Ctrl/Cmd+Click: alternar selección
      e.preventDefault();
      this.clearCrossBlockSelection();
      this.toggleBlockSelection(blockId);
      this.lastClickedBlockId = blockId;
    } else {
      // Click normal: limpiar selección y establecer último clickeado
      if (this.crossBlockSelection) {
        this.clearCrossBlockSelection();
        this.closeFormatMenu();
      }
      if (this.selectedBlocks.length > 0) {
        this.clearSelection();
      }
      this.lastClickedBlockId = blockId;
      // Iniciar tracking para posible selección cross-block
      this.startCrossBlockTracking(e, blockId);
    }
  };

  /**
   * Elimina todos los bloques seleccionados
   */
  meWYSE.prototype.deleteSelectedBlocks = function() {
    if (this.selectedBlocks.length === 0) {
      return;
    }
    this.pushHistory(true);

    var self = this;
    // Ordenar los índices de mayor a menor para eliminar sin afectar índices anteriores
    var indices = this.selectedBlocks.map(function(blockId) {
      return self.getBlockIndex(blockId);
    }).filter(function(index) {
      return index !== -1;
    }).sort(function(a, b) {
      return b - a;
    });

    // Eliminar los bloques
    indices.forEach(function(index) {
      self.blocks.splice(index, 1);
    });

    // Limpiar selección
    this.selectedBlocks = [];

    // Si no quedan bloques, crear un párrafo vacío
    if (this.blocks.length === 0) {
      this.blocks.push({
        id: ++this.currentBlockId,
        type: 'paragraph',
        content: ''
      });
    }

    // Re-renderizar
    this.render();

    // Actualizar listas numeradas si es necesario
    if (indices.length > 0) {
      var minIndex = Math.min.apply(null, indices);
      if (minIndex < this.blocks.length) {
        this.updateConsecutiveNumberLists(minIndex);
      }
    }

    this.triggerChange();
  };

  /**
   * Cambia el tipo de todos los bloques seleccionados
   * @param {string} newType
   */
  meWYSE.prototype.changeSelectedBlocksType = function(newType) {
    if (this.selectedBlocks.length === 0) {
      return;
    }
    this.pushHistory(true);

    var self = this;
    var hasNumberListChange = false;
    var minIndex = this.blocks.length;

    this.selectedBlocks.forEach(function(blockId) {
      var block = self.getBlock(blockId);
      if (block) {
        var oldType = block.type;
        block.type = newType;

        // Verificar si involucra listas numeradas
        if (oldType === 'numberList' || newType === 'numberList') {
          hasNumberListChange = true;
          var index = self.getBlockIndex(blockId);
          if (index !== -1 && index < minIndex) {
            minIndex = index;
          }
        }
      }
    });

    // Re-renderizar
    this.render();

    // Actualizar listas numeradas si es necesario
    if (hasNumberListChange && minIndex < this.blocks.length) {
      this.updateConsecutiveNumberLists(minIndex);
    }

    // Limpiar selección después de cambiar tipo
    this.selectedBlocks = [];

    this.triggerChange();
  };

  /**
   * Carga contenido desde texto plano
   * @param {string} text
   */
  meWYSE.prototype.loadFromText = function(text) {
    var lines = text.split('\n');
    var self = this;

    lines.forEach(function(line) {
      self.blocks.push({
        id: ++self.currentBlockId,
        type: 'paragraph',
        content: line
      });
    });
  };

  /**
   * Filtra los bloques excluyendo el último si está vacío
   * @returns {Array}
   */
  meWYSE.prototype.getFilteredBlocks = function() {
    var blocks = this.blocks.slice();

    // Red de seguridad: limpiar controles de editor en tablas (por si algún
    // path no pasó por updateBlockContent o el contenido viene de un guardado
    // anterior al fix).
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].type === 'table' && typeof blocks[i].content === 'string') {
        var cleaned = this._cleanTableContent(blocks[i].content);
        if (cleaned !== blocks[i].content) {
          // No mutar el bloque original, devolver una copia
          blocks[i] = {
            id: blocks[i].id,
            type: blocks[i].type,
            content: cleaned,
            checked: blocks[i].checked,
            alignment: blocks[i].alignment
          };
        }
      }
    }

    // Si el último bloque está vacío, no incluirlo
    if (blocks.length > 0) {
      var lastBlock = blocks[blocks.length - 1];
      var isEmpty = !lastBlock.content ||
                    (typeof lastBlock.content === 'string' && lastBlock.content.trim() === '');

      if (isEmpty && lastBlock.type !== 'divider' && lastBlock.type !== 'image') {
        blocks.pop();
      }
    }

    return blocks;
  };

  /**
   * Obtiene el contenido como texto plano
   * @returns {string}
   */
  meWYSE.prototype.getPlainText = function() {
    return this.getFilteredBlocks().map(function(block) {
      var c = block.content;

      // Bloques con content como objeto: extraer texto representativo
      // (evita que Object.toString() produzca "[object Object]")
      if (block.type === 'image') {
        return (c && typeof c === 'object') ? (c.fileName || c.alt || '') : '';
      }
      if (block.type === 'video') {
        return (c && typeof c === 'object') ? (c.url || '') : '';
      }
      if (block.type === 'audio') {
        return (c && typeof c === 'object') ? (c.title || c.url || '') : '';
      }
      if (block.type === 'divider') {
        return '';
      }

      // Bloques con content HTML string — devolver tal cual para compat
      // (el consumidor puede hacer el strip si quiere solo texto)
      return (typeof c === 'string') ? c : '';
    }).join('\n');
  };

  /**
   * Obtiene el contenido como HTML
   * @returns {string}
   */
  meWYSE.prototype.getHTML = function() {
    var html = '';
    var blocks = this.getFilteredBlocks();
    var i = 0;
    var self = this;

    // Helper: devuelve ' class="custom"' si block.customClass existe, '' si no
    var classAttr = function(b) {
      return b.customClass ? ' class="' + b.customClass + '"' : '';
    };

    // Transformer del contenido inline. Si la opción `escapeHtmlEntities` está
    // activa (default), todos los nodos de texto del contenido se re-escapan
    // con las cinco entidades HTML. Si está desactivada, identidad (legacy).
    // No se aplica al contenido de tablas (estructura compleja con tags
    // anidados que el parser DOM no resuelve sin un wrapper de tabla) ni a
    // bloques de código (que ya escapan TODO el HTML para emitir como source).
    var inline = this.escapeHtmlEntities
      ? function(c) { return self._emitInlineHTMLWithEscape(c); }
      : function(c) { return c; };

    while (i < blocks.length) {
      var block = blocks[i];
      var content = block.content || '';

      // Agrupar listas consecutivas del mismo tipo (con anidación por indentLevel)
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listRes = this._buildNestedListHTML(blocks, i, classAttr, inline);
        html += listRes.html;
        i += listRes.consumed;
        continue;
      } else {
        // Procesar bloques que no son listas
        switch (block.type) {
          case 'heading1':
            html += '<h1' + classAttr(block) + '>' + inline(content) + '</h1>';
            break;
          case 'heading2':
            html += '<h2' + classAttr(block) + '>' + inline(content) + '</h2>';
            break;
          case 'heading3':
            html += '<h3' + classAttr(block) + '>' + inline(content) + '</h3>';
            break;
          case 'quote':
            html += '<blockquote' + classAttr(block) + '>' + inline(content) + '</blockquote>';
            break;
          case 'code':
            // Solo escapar HTML en bloques de código
            html += '<pre><code>' + escapeHtml(content) + '</code></pre>';
            break;
          case 'table':
            // Solo incluir style si el usuario configuró propiedades de tabla
            if (typeof block.tableStyle === 'string' && block.tableStyle) {
              html += '<table style="' + block.tableStyle + '">';
            } else {
              html += '<table>';
            }
            html += content;
            html += '</table>';
            break;
          case 'image':
            if (typeof block.content === 'object' && block.content.blob) {
              // Construir atributo style con las opciones avanzadas
              var imgStyle = '';
              var adv = block.content.advanced;
              if (adv) {
                var parts = [];
                if (adv.border && adv.border.width) {
                  parts.push('border: ' + adv.border.width + 'px ' + (adv.border.style || 'solid') + ' ' + (adv.border.color || '#000000'));
                }
                if (adv.margin && typeof adv.margin.all === 'number') {
                  parts.push('margin: ' + adv.margin.all + 'px');
                }
                if (adv.alignment === 'center') {
                  parts.push('display: block');
                  parts.push('margin-left: auto');
                  parts.push('margin-right: auto');
                } else if (adv.alignment === 'left') {
                  parts.push('float: left');
                  parts.push('margin-right: 16px');
                } else if (adv.alignment === 'right') {
                  parts.push('float: right');
                  parts.push('margin-left: 16px');
                }
                if (parts.length) imgStyle = ' style="' + parts.join('; ') + '"';
              }
              html += '<img src="' + block.content.blob + '" alt="' + escapeHtml(block.content.fileName || 'Imagen') + '" width="' + block.content.width + '" height="' + block.content.height + '"' + imgStyle + ' />';
            }
            break;
          case 'video':
            if (typeof block.content === 'object') {
              var vc = block.content;
              if (vc.provider === 'youtube' && vc.videoId) {
                html += '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vc.videoId) +
                        '" frameborder="0" allowfullscreen width="' + (vc.width || 640) + '" height="' + (vc.height || 360) + '"></iframe>';
              } else if (vc.provider === 'vimeo' && vc.videoId) {
                html += '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(vc.videoId) +
                        '" frameborder="0" allowfullscreen width="' + (vc.width || 640) + '" height="' + (vc.height || 360) + '"></iframe>';
              } else if (vc.provider === 'file' && vc.url) {
                html += '<video controls src="' + escapeHtml(vc.url) + '" width="' + (vc.width || 640) + '" height="' + (vc.height || 360) + '"></video>';
              }
            }
            break;
          case 'audio':
            if (typeof block.content === 'object' && block.content.url) {
              html += '<audio controls src="' + escapeHtml(block.content.url) + '"></audio>';
            }
            break;
          case 'divider':
            html += '<hr>';
            break;
          default:
            html += '<p' + classAttr(block) + '>' + inline(content) + '</p>';
        }
        i++;
      }
    }

    return html;
  };

  /**
   * Obtiene el contenido como código fuente HTML (con formato inline)
   * @returns {string}
   */
  meWYSE.prototype.getHTMLSource = function() {
    var html = '';
    var blocks = this.getFilteredBlocks();
    var i = 0;
    var classAttr = function(b) { return b.customClass ? ' class="' + b.customClass + '"' : ''; };

    while (i < blocks.length) {
      var block = blocks[i];

      // Agrupar listas consecutivas del mismo tipo (con anidación por indentLevel)
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listRes = this._buildNestedListHTML(blocks, i, classAttr);
        html += listRes.html;
        i += listRes.consumed;
        continue;
      } else {
        // Para el código fuente HTML, usamos el contenido directo sin escapar
        // ya que el contenido puede contener etiquetas HTML de formato
        var content = block.content || '';

        // Procesar bloques que no son listas
        switch (block.type) {
          case 'heading1':
            html += '<h1' + classAttr(block) + '>' + content + '</h1>';
            break;
          case 'heading2':
            html += '<h2' + classAttr(block) + '>' + content + '</h2>';
            break;
          case 'heading3':
            html += '<h3' + classAttr(block) + '>' + content + '</h3>';
            break;
          case 'quote':
            html += '<blockquote' + classAttr(block) + '>' + content + '</blockquote>';
            break;
          case 'code':
            html += '<pre><code>' + escapeHtml(content) + '</code></pre>';
            break;
          case 'table':
            // Solo incluir style si el usuario configuró propiedades de tabla
            if (typeof block.tableStyle === 'string' && block.tableStyle) {
              html += '<table style="' + block.tableStyle + '">';
            } else {
              html += '<table>';
            }
            html += content;
            html += '</table>';
            break;
          case 'image':
            if (typeof block.content === 'object' && block.content.blob) {
              // Construir atributo style con las opciones avanzadas
              var imgStyle = '';
              var adv = block.content.advanced;
              if (adv) {
                var parts = [];
                if (adv.border && adv.border.width) {
                  parts.push('border: ' + adv.border.width + 'px ' + (adv.border.style || 'solid') + ' ' + (adv.border.color || '#000000'));
                }
                if (adv.margin && typeof adv.margin.all === 'number') {
                  parts.push('margin: ' + adv.margin.all + 'px');
                }
                if (adv.alignment === 'center') {
                  parts.push('display: block');
                  parts.push('margin-left: auto');
                  parts.push('margin-right: auto');
                } else if (adv.alignment === 'left') {
                  parts.push('float: left');
                  parts.push('margin-right: 16px');
                } else if (adv.alignment === 'right') {
                  parts.push('float: right');
                  parts.push('margin-left: 16px');
                }
                if (parts.length) imgStyle = ' style="' + parts.join('; ') + '"';
              }
              html += '<img src="' + block.content.blob + '" alt="' + escapeHtml(block.content.fileName || 'Imagen') + '" width="' + block.content.width + '" height="' + block.content.height + '"' + imgStyle + ' />';
            }
            break;
          case 'video':
            if (typeof block.content === 'object') {
              var vc = block.content;
              if (vc.provider === 'youtube' && vc.videoId) {
                html += '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vc.videoId) +
                        '" frameborder="0" allowfullscreen width="' + (vc.width || 640) + '" height="' + (vc.height || 360) + '"></iframe>';
              } else if (vc.provider === 'vimeo' && vc.videoId) {
                html += '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(vc.videoId) +
                        '" frameborder="0" allowfullscreen width="' + (vc.width || 640) + '" height="' + (vc.height || 360) + '"></iframe>';
              } else if (vc.provider === 'file' && vc.url) {
                html += '<video controls src="' + escapeHtml(vc.url) + '" width="' + (vc.width || 640) + '" height="' + (vc.height || 360) + '"></video>';
              }
            }
            break;
          case 'audio':
            if (typeof block.content === 'object' && block.content.url) {
              html += '<audio controls src="' + escapeHtml(block.content.url) + '"></audio>';
            }
            break;
          case 'divider':
            html += '<hr>';
            break;
          default:
            html += '<p' + classAttr(block) + '>' + content + '</p>';
        }
        i++;
      }
    }

    return html;
  };

  /**
   * Obtiene el contenido como JSON
   * @returns {string}
   */
  meWYSE.prototype.getJSON = function() {
    return JSON.stringify(this.getFilteredBlocks(), null, 2);
  };

  /**
   * Convierte HTML inline a Markdown inline
   * @param {string} html - HTML con formato inline
   * @returns {string} Markdown equivalente
   */
  meWYSE.prototype.htmlToMarkdownInline = function(html) {
    if (!html) return '';

    var parser = new DOMParser();
    var doc = parser.parseFromString('<body>' + html + '</body>', 'text/html');

    function processNode(node) {
      if (node.nodeType === 3) {
        // Nodo de texto
        return node.textContent;
      }

      if (node.nodeType !== 1) return '';

      var tag = node.tagName.toLowerCase();
      var inner = '';
      for (var i = 0; i < node.childNodes.length; i++) {
        inner += processNode(node.childNodes[i]);
      }

      // Menciones: conservar como @Name
      if (tag === 'span' && node.classList.contains('mewyse-mention')) {
        return inner;
      }

      // Estilos inline (color, background) y otros spans con style: conservar como HTML
      if (tag === 'span' && node.getAttribute('style')) {
        return '<span style="' + node.getAttribute('style') + '">' + inner + '</span>';
      }

      switch (tag) {
        case 'b':
        case 'strong':
          return '**' + inner + '**';
        case 'i':
        case 'em':
          return '*' + inner + '*';
        case 's':
        case 'del':
        case 'strike':
          return '~~' + inner + '~~';
        case 'code':
          return '`' + inner + '`';
        case 'a':
          var href = node.getAttribute('href') || '';
          return '[' + inner + '](' + href + ')';
        case 'u':
          return '<u>' + inner + '</u>';
        case 'sub':
          return '<sub>' + inner + '</sub>';
        case 'sup':
          return '<sup>' + inner + '</sup>';
        case 'mark':
          return '<mark>' + inner + '</mark>';
        case 'br':
          return '\n';
        default:
          return inner;
      }
    }

    var body = doc.body;
    var result = '';
    for (var i = 0; i < body.childNodes.length; i++) {
      result += processNode(body.childNodes[i]);
    }
    return result;
  };

  /**
   * Obtiene el contenido como Markdown
   * @returns {string}
   */
  meWYSE.prototype.getMarkdown = function() {
    var self = this;
    var blocks = this.getFilteredBlocks();
    var lines = [];
    var i = 0;

    while (i < blocks.length) {
      var block = blocks[i];
      var content = block.content || '';

      // Agrupar listas consecutivas
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listType = block.type;
        var num = 1;
        var listLines = [];

        while (i < blocks.length && blocks[i].type === listType) {
          var itemContent = blocks[i].content || '';
          var inlineMd = self.htmlToMarkdownInline(itemContent);

          if (listType === 'bulletList') {
            listLines.push('- ' + inlineMd);
          } else if (listType === 'numberList') {
            listLines.push(num + '. ' + inlineMd);
            num++;
          } else if (listType === 'checklist') {
            var check = blocks[i].checked ? '[x]' : '[ ]';
            listLines.push('- ' + check + ' ' + inlineMd);
          }
          i++;
        }

        lines.push(listLines.join('\n'));
      } else {
        switch (block.type) {
          case 'heading1':
            lines.push('# ' + self.htmlToMarkdownInline(content));
            break;
          case 'heading2':
            lines.push('## ' + self.htmlToMarkdownInline(content));
            break;
          case 'heading3':
            lines.push('### ' + self.htmlToMarkdownInline(content));
            break;
          case 'quote':
            lines.push('> ' + self.htmlToMarkdownInline(content));
            break;
          case 'code':
            // Unescape HTML entities en bloques de código
            var codeContent = content
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'");
            lines.push('```\n' + codeContent + '\n```');
            break;
          case 'divider':
            lines.push('---');
            break;
          case 'table':
            // Parsear HTML de tabla
            var tableParser = new DOMParser();
            var tableDoc = tableParser.parseFromString('<table>' + content + '</table>', 'text/html');
            var table = tableDoc.querySelector('table');
            if (table) {
              var rows = table.querySelectorAll('tr');
              var tableLines = [];
              for (var r = 0; r < rows.length; r++) {
                var cells = rows[r].querySelectorAll('th, td');
                var cellTexts = [];
                for (var c = 0; c < cells.length; c++) {
                  var cellHtml = cells[c].innerHTML;
                  var colspan = parseInt(cells[c].getAttribute('colspan')) || 1;
                  cellTexts.push(self.htmlToMarkdownInline(cellHtml));
                  // Celdas adicionales por colspan
                  for (var cs = 1; cs < colspan; cs++) {
                    cellTexts.push('');
                  }
                }
                tableLines.push('| ' + cellTexts.join(' | ') + ' |');
                // Separador después de la primera fila
                if (r === 0) {
                  var seps = [];
                  for (var s = 0; s < cellTexts.length; s++) {
                    seps.push('---');
                  }
                  tableLines.push('| ' + seps.join(' | ') + ' |');
                }
              }
              lines.push(tableLines.join('\n'));
            }
            break;
          case 'image':
            if (typeof content === 'object' && content.blob) {
              var alt = content.fileName || 'image';
              lines.push('![' + alt + '](' + content.blob + ')');
            }
            break;
          case 'video':
            if (typeof content === 'object' && content.url) {
              lines.push('[Video](' + content.url + ')');
            }
            break;
          case 'audio':
            if (typeof content === 'object' && content.url) {
              lines.push('[Audio](' + content.url + ')');
            }
            break;
          default:
            // paragraph
            lines.push(self.htmlToMarkdownInline(content));
        }
        i++;
      }
    }

    return lines.join('\n\n');
  };

  /**
   * Convierte Markdown inline a HTML inline
   * @param {string} text - Texto Markdown con formato inline
   * @returns {string} HTML equivalente
   */
  meWYSE.prototype.markdownInlineToHtml = function(text) {
    if (!text) return '';
    var self = this;

    // Proteger bloques de código inline con placeholders (ANTES de escapar)
    // El contenido dentro de `code` se escapa como texto también.
    var codeBlocks = [];
    text = text.replace(/`([^`]+)`/g, function(match, code) {
      var idx = codeBlocks.length;
      codeBlocks.push('<code>' + escapeHtml(code) + '</code>');
      return '\x00CODE' + idx + '\x00';
    });

    // Escapar HTML del texto restante ANTES de aplicar transformaciones MD
    // Esto evita que `**<img onerror=...>**` se convierta en HTML peligroso.
    text = escapeHtml(text);

    // Los marcadores de Markdown que el usuario escribió ahora están en texto plano,
    // pero los propios asteriscos/guiones no se escapan (no son HTML).
    // Los <, >, & que el usuario escribió ya están como &lt; &gt; &amp;.

    // Links: [texto](url) con validación de esquema URL
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(_, linkText, url) {
      // url y linkText ya están escapados por escapeHtml, pero hay que decodificar
      // los placeholders markdown en url si los hay (no debería pero por seguridad)
      var decodedUrl = url
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      var safe = self._isSafeUrl(decodedUrl) ? decodedUrl : '#';
      // Re-escape el href final
      var safeHref = safe
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return '<a href="' + safeHref + '">' + linkText + '</a>';
    });

    // Bold: **texto** o __texto__
    text = text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    text = text.replace(/__(.+?)__/g, '<b>$1</b>');

    // Italic: *texto* o _texto_
    text = text.replace(/\*(.+?)\*/g, '<i>$1</i>');
    text = text.replace(/(^|[^\w])_(.+?)_([^\w]|$)/g, '$1<i>$2</i>$3');

    // Strikethrough: ~~texto~~
    text = text.replace(/~~(.+?)~~/g, '<s>$1</s>');

    // Restaurar bloques de código
    text = text.replace(/\x00CODE(\d+)\x00/g, function(match, idx) {
      return codeBlocks[parseInt(idx)];
    });

    return text;
  };

  /**
   * Carga contenido desde Markdown
   * @param {string} markdown - Contenido en formato Markdown
   */
  meWYSE.prototype.loadFromMarkdown = function(markdown) {
    this.pushHistory(true);
    var self = this;
    var lines = markdown.split('\n');
    var newBlocks = [];
    var blockId = 0;
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      // Líneas vacías: separador, saltar
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Bloque de código (code fence)
      if (line.trim().match(/^```/)) {
        var codeLines = [];
        i++;
        while (i < lines.length && !lines[i].trim().match(/^```/)) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // saltar el ``` de cierre
        newBlocks.push({
          id: ++blockId,
          type: 'code',
          content: escapeHtml(codeLines.join('\n'))
        });
        continue;
      }

      // Tabla: detectar línea que empieza con |
      if (line.trim().charAt(0) === '|') {
        var tableRows = [];
        while (i < lines.length && lines[i].trim().charAt(0) === '|') {
          var rowLine = lines[i].trim();
          // Ignorar fila de separadores (| --- | --- |)
          if (rowLine.match(/^\|[\s\-:|]+\|$/)) {
            i++;
            continue;
          }
          // Parsear celdas
          var cellsRaw = rowLine.split('|');
          var cells = [];
          for (var c = 1; c < cellsRaw.length - 1; c++) {
            cells.push(cellsRaw[c].trim());
          }
          tableRows.push(cells);
          i++;
        }

        // Construir HTML de tabla
        if (tableRows.length > 0) {
          var tableHtml = '';
          for (var r = 0; r < tableRows.length; r++) {
            tableHtml += '<tr>';
            for (var c = 0; c < tableRows[r].length; c++) {
              var cellTag = r === 0 ? 'th' : 'td';
              var cellContent = self.markdownInlineToHtml(tableRows[r][c]);
              tableHtml += '<' + cellTag + ' style="border:1px solid #ddd;padding:8px">' + cellContent + '</' + cellTag + '>';
            }
            tableHtml += '</tr>';
          }
          newBlocks.push({
            id: ++blockId,
            type: 'table',
            content: tableHtml
          });
        }
        continue;
      }

      // Headings
      var headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        var level = headingMatch[1].length;
        newBlocks.push({
          id: ++blockId,
          type: 'heading' + level,
          content: self.markdownInlineToHtml(headingMatch[2])
        });
        i++;
        continue;
      }

      // Quote
      var quoteMatch = line.match(/^>\s*(.*)$/);
      if (quoteMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'quote',
          content: self.markdownInlineToHtml(quoteMatch[1])
        });
        i++;
        continue;
      }

      // Checklist: - [x] o - [ ]
      var checklistMatch = line.match(/^-\s+\[([ xX])\]\s+(.*)$/);
      if (checklistMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'checklist',
          content: self.markdownInlineToHtml(checklistMatch[2]),
          checked: checklistMatch[1].toLowerCase() === 'x'
        });
        i++;
        continue;
      }

      // Bullet list: - o *
      var bulletMatch = line.match(/^[-*]\s+(.+)$/);
      if (bulletMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'bulletList',
          content: self.markdownInlineToHtml(bulletMatch[1])
        });
        i++;
        continue;
      }

      // Number list: N.
      var numberMatch = line.match(/^\d+\.\s+(.+)$/);
      if (numberMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'numberList',
          content: self.markdownInlineToHtml(numberMatch[1])
        });
        i++;
        continue;
      }

      // Divider: ---, ***, ___
      if (line.trim().match(/^(---+|\*\*\*+|___+)$/)) {
        newBlocks.push({
          id: ++blockId,
          type: 'divider',
          content: ''
        });
        i++;
        continue;
      }

      // Image: ![alt](url)
      var imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'image',
          content: {
            blob: imageMatch[2],
            fileName: imageMatch[1] || 'image',
            width: 'auto',
            height: 'auto'
          }
        });
        i++;
        continue;
      }

      // Paragraph (default)
      newBlocks.push({
        id: ++blockId,
        type: 'paragraph',
        content: self.markdownInlineToHtml(line)
      });
      i++;
    }

    // Si no hay bloques, crear uno vacío
    if (newBlocks.length === 0) {
      newBlocks.push({
        id: ++blockId,
        type: 'paragraph',
        content: ''
      });
    }

    // Pasar por sanitizer (defensa final: aunque markdownInlineToHtml ya escapa,
    // confirmamos whitelist de tags y validamos URLs/imágenes)
    this.currentBlockId = blockId;
    this.blocks = this._sanitizeBlocks(newBlocks);
    this.render();
    this.triggerChange();
  };

  /**
   * Carga contenido desde JSON
   * @param {string|Object} json
   */
  meWYSE.prototype.loadFromJSON = function(json) {
    this.pushHistory(true);
    var data;
    try {
      data = typeof json === 'string' ? JSON.parse(json) : json;
    } catch (e) {
      data = [];
    }
    if (!Array.isArray(data)) data = [];

    // Sanitizar contra XSS (maneja currentBlockId internamente)
    this.blocks = this._sanitizeBlocks(data);

    this.render();
  };

  /**
   * Carga contenido desde una cadena HTML.
   * Útil para migrar contenido guardado por editores WYSIWYG previos (TinyMCE, CKEditor).
   * Detecta automáticamente iframes de YouTube/Vimeo, <video>, <audio>, <img>, tablas
   * y listas, y los convierte al modelo de bloques de meWYSE.
   *
   * @param {string} html - HTML source
   */
  meWYSE.prototype.loadFromHTML = function(html) {
    this.pushHistory(true);
    var blocks = this._htmlToBlocks(html || '');
    this.blocks = this._sanitizeBlocks(blocks);
    // Garantizar que siempre haya al menos un bloque
    if (this.blocks.length === 0) {
      this.blocks.push({ id: ++this.currentBlockId, type: 'paragraph', content: '' });
    }
    this.render();
    this.triggerChange();
  };

  /**
   * Dispara el evento onChange
   */
  meWYSE.prototype.triggerChange = function() {
    if (!this.isUndoRedo) {
      this.pushHistory();
    }

    // Actualizar textarea en modo minimal
    if (this.target.tagName === 'TEXTAREA') {
      this.target.value = this.getPlainText();

      // Si hay un elemento original (no-textarea), sincronizarlo también
      if (this.originalTarget) {
        this.originalTarget.textContent = this.getPlainText();
      }
    }

    // Actualizar contador de palabras/caracteres si está visible
    if (this.showCharCounter) {
      this.updateCharCounter();
    }

    this.onChange({
      blocks: this.blocks,
      plainText: this.getPlainText(),
      html: this.getHTML(),
      json: this.getJSON(),
      markdown: this.getMarkdown()
    });
  };

  /**
   * Determina si un elemento pertenece a la UI de este editor (wrapper, toolbar,
   * char counter, menús flotantes, modales, pickers, tooltips, etc).
   * Usado para evitar disparar onBlur cuando el foco se mueve a UI propia del editor.
   *
   * @param {Element} el
   * @returns {boolean}
   */
  meWYSE.prototype._isPartOfEditorUI = function(el) {
    if (!el || !el.closest) return false;

    // 1. Dentro del wrapper completo del editor (incluye toolbar + container + char counter)
    if (this.editorWrapper && (this.editorWrapper === el || this.editorWrapper.contains(el))) {
      return true;
    }

    // 2. Dentro del container del editor (caso sin toolbar/wrapper)
    if (this.container && (this.container === el || this.container.contains(el))) {
      return true;
    }

    // 3. Dentro del floating handle (no está en el container, está en body)
    if (this.floatingHandle && this.floatingHandle.contains(el)) {
      return true;
    }

    // 4. Dentro de algún menú/modal/picker flotante del editor (todos en body, todos
    //    con clase prefijo mewyse-). Selector amplio que cubre todos los casos:
    var floatingSelector =
      '.mewyse-slash-menu, .mewyse-mention-menu, .mewyse-emoji-menu, ' +
      '.mewyse-format-menu, .mewyse-options-menu, .mewyse-type-menu, ' +
      '.mewyse-toolbar-menu, .mewyse-table-menu, .mewyse-cell-menu, ' +
      '.mewyse-color-picker, .mewyse-unified-color-picker, ' +
      '.mewyse-modal-overlay, .mewyse-find-replace, ' +
      '.mewyse-summary-tooltip, .mewyse-floating-handle, ' +
      '[class*="mewyse-"][class*="-menu"], [class*="mewyse-"][class*="-modal"], ' +
      '[class*="mewyse-"][class*="-picker"], [class*="mewyse-"][class*="-tooltip"]';
    try {
      if (el.closest(floatingSelector)) return true;
    } catch (e) {}

    return false;
  };

  /**
   * Construye el payload estándar pasado a callbacks (onChange/onFocus/onBlur).
   * Incluye el snapshot del contenido + info opcional del bloque enfocado.
   */
  meWYSE.prototype._buildEventPayload = function(focusedElement) {
    var payload = {
      blocks: this.blocks,
      plainText: this.getPlainText(),
      html: this.getHTML(),
      json: this.getJSON(),
      markdown: this.getMarkdown(),
      focusedBlockId: null,
      focusedBlockType: null
    };
    if (focusedElement && focusedElement.closest) {
      var blockEl = focusedElement.closest('[data-block-id]');
      if (blockEl) {
        var bid = parseInt(blockEl.getAttribute('data-block-id'), 10);
        if (!isNaN(bid)) {
          payload.focusedBlockId = bid;
          payload.focusedBlockType = blockEl.getAttribute('data-block-type') || null;
        }
      }
    }
    return payload;
  };

  /**
   * Dispara onFocus con el payload estándar.
   */
  meWYSE.prototype._fireFocusCallback = function(focusedElement) {
    if (typeof this.onFocus !== 'function') return;
    try {
      this.onFocus(this._buildEventPayload(focusedElement));
    } catch (e) {}
  };

  /**
   * Dispara onBlur con el payload estándar.
   */
  meWYSE.prototype._fireBlurCallback = function(blurredElement) {
    if (typeof this.onBlur !== 'function') return;
    try {
      this.onBlur(this._buildEventPayload(blurredElement));
    } catch (e) {}
  };

  /**
   * Destruye el editor
   */
  meWYSE.prototype.destroy = function() {
    // Cerrar menús abiertos
    this.closeSlashMenu();
    this.closeFormatMenu();
    this.closeToolbarMenu();
    this.closeMentionMenu();
    this.closeEmojiMenu();

    // Cerrar find/replace si estaba abierto
    this.closeFindReplace();

    // Salir de fullscreen si estaba activo
    if (this.isFullscreen) {
      this.exitFullscreen();
    }

    // Limpiar barra de contador
    if (this.charCounterBar && this.charCounterBar.parentNode) {
      this.charCounterBar.remove();
      this.charCounterBar = null;
    }

    // Limpiar estilos de contenido inyectados
    this._removeContentStyles();

    // Limpiar listener de dark mode del sistema
    if (this._darkModeMediaQuery && this._handleDarkModeChange) {
      if (this._darkModeMediaQuery.removeEventListener) {
        this._darkModeMediaQuery.removeEventListener('change', this._handleDarkModeChange);
      }
    }

    // Limpiar selección cross-block
    this.clearCrossBlockSelection();
    if (this.crossBlockOverlay && this.crossBlockOverlay.parentNode) {
      this.crossBlockOverlay.remove();
      this.crossBlockOverlay = null;
    }

    // Limpiar handlers de scroll
    this.clearScrollHandlers();

    // Remover event listener de selección
    if (this.handleSelectionChange) {
      document.removeEventListener('selectionchange', this.handleSelectionChange);
    }

    // Limpiar botón de resumen
    if (this.summaryButton && this.summaryButton.parentNode) {
      this.summaryButton.remove();
    }
    this.hideSummaryTooltip();

    // Retirar overlay/backdrop si quedaba activo
    if (this._activeBackdropModals) this._activeBackdropModals.length = 0;
    this._removeBackdrop();

    // Limpiar listeners y observer del scroll horizontal de la toolbar
    if (this._toolbarScrollListeners) {
      for (var tsi = 0; tsi < this._toolbarScrollListeners.length; tsi++) {
        var l = this._toolbarScrollListeners[tsi];
        if (l && l.el && l.fn) {
          l.el.removeEventListener(l.type, l.fn, l.opts || false);
        }
      }
      this._toolbarScrollListeners = null;
    }
    if (this._toolbarResizeObserver) {
      try { this._toolbarResizeObserver.disconnect(); } catch (e) {}
      this._toolbarResizeObserver = null;
    }

    // Limpiar toolbar y wrapper si existen
    if (this.toolbar && this.toolbar.parentNode) {
      // El toolbar está dentro de un wrapper, eliminar el wrapper completo
      var wrapper = this.toolbar.parentNode;
      if (wrapper.className === 'mewyse-editor-wrapper') {
        wrapper.remove();
      } else {
        this.toolbar.remove();
      }
    }

    // Eliminar container si no fue eliminado con el wrapper
    if (this.container && this.container.parentNode) {
      this.container.remove();
    }

    // Remover listeners globales de document
    if (this._handleDocMouseUp) {
      document.removeEventListener('mouseup', this._handleDocMouseUp);
    }
    if (this._handleDocMouseDown) {
      document.removeEventListener('mousedown', this._handleDocMouseDown);
    }
    if (this.imageKeydownHandler) {
      document.removeEventListener('keydown', this.imageKeydownHandler);
    }
    if (this.closeToolbarMenuHandler) {
      document.removeEventListener('click', this.closeToolbarMenuHandler);
    }

    // Remove image drop handlers
    if (this.container) {
      if (this._imageDragEnterHandler) this.container.removeEventListener('dragenter', this._imageDragEnterHandler);
      if (this._imageDragOverHandler) this.container.removeEventListener('dragover', this._imageDragOverHandler);
      if (this._imageDragLeaveHandler) this.container.removeEventListener('dragleave', this._imageDragLeaveHandler);
      if (this._imageDropHandler) this.container.removeEventListener('drop', this._imageDropHandler);
    }

    // Limpiar file input persistente
    if (this._fileInput && this._fileInput.parentNode) {
      this._fileInput.parentNode.removeChild(this._fileInput);
      this._fileInput = null;
    }

    if (this.originalTarget) {
      // Si había un elemento original no-textarea
      this.originalTarget.style.display = '';  // Restaurar visibilidad
      this.target.remove();  // Eliminar textarea interno creado
    } else if (this.target.tagName === 'TEXTAREA') {
      // Era un textarea original
      this.target.style.display = '';
    }

  };

  /**
   * Inicializa el menú de formato (solo en modo minimalista)
   */
  meWYSE.prototype.initFormatMenu = function() {
    var self = this;

    // Escuchar cambios en la selección
    this.handleSelectionChange = function() {
      self.onSelectionChange();
    };

    document.addEventListener('selectionchange', this.handleSelectionChange);
  };

  /**
   * Maneja cambios en la selección de texto
   */
  meWYSE.prototype.onSelectionChange = function() {
    var self = this;

    // Si estamos en modo cross-block selecting, no interferir
    if (this.isCrossBlockSelecting || this.crossBlockSelection) {
      return;
    }

    // Limpiar timeout anterior
    if (this.formatMenuTimeout) {
      clearTimeout(this.formatMenuTimeout);
    }

    // Esperar un momento para asegurar que la selección está completa
    this.formatMenuTimeout = setTimeout(function() {
      var selection = window.getSelection();

      // Verificar si hay texto seleccionado
      if (!selection || selection.isCollapsed || selection.toString().trim() === '') {
        self.closeFormatMenu();
        return;
      }

      // Verificar que la selección está dentro del editor
      var range = selection.getRangeAt(0);
      var container = range.commonAncestorContainer;
      var isInEditor = false;

      // Buscar si el contenedor está dentro del editor
      var node = container.nodeType === 3 ? container.parentNode : container;
      while (node) {
        if (node === self.container) {
          isInEditor = true;
          break;
        }
        node = node.parentNode;
      }

      if (!isInEditor) {
        self.closeFormatMenu();
        return;
      }

      // Verificar si la selección está dentro de una mención/emoji o contiene menciones/emojis
      var selectionContainsSpecial = false;

      // Verificar si el contenedor común es o está dentro de una mención o emoji
      var checkNode = container.nodeType === 3 ? container.parentNode : container;
      while (checkNode && checkNode !== self.container) {
        if (checkNode.classList && (checkNode.classList.contains('mewyse-mention') || checkNode.classList.contains('mewyse-emoji'))) {
          selectionContainsSpecial = true;
          break;
        }
        checkNode = checkNode.parentNode;
      }

      // Verificar si hay menciones o emojis dentro del rango seleccionado
      if (!selectionContainsSpecial) {
        var fragment = range.cloneContents();
        var mentionsInRange = fragment.querySelectorAll('.mewyse-mention');
        var emojisInRange = fragment.querySelectorAll('.mewyse-emoji');
        if (mentionsInRange.length > 0 || emojisInRange.length > 0) {
          selectionContainsSpecial = true;
        }
      }

      // No mostrar menú de formato si hay menciones o emojis involucrados
      if (selectionContainsSpecial) {
        self.closeFormatMenu();
        return;
      }

      self.showFormatMenu(selection, range);
    }, 100);
  };

  /**
   * Muestra el menú de formato
   * @param {Selection} selection
   * @param {Range} range
   */
  meWYSE.prototype.showFormatMenu = function(selection, range, crossBlockReference) {
    var self = this;
    var isCrossBlock = !!crossBlockReference;

    // Si la toolbar está activa, las acciones de formato (B/I/U, color, etc.)
    // ya están disponibles ahí — el menú flotante sería redundante. Evitamos
    // mostrarlo y cerramos cualquier menú abierto por si quedaba uno previo.
    if (this.showToolbar) {
      this.closeFormatMenu();
      return;
    }

    // Cerrar menú existente
    this.closeFormatMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-format-menu';
    this.formatMenu = menu;

    var tools = [
      { action: 'bold', label: 'B', titleKey: 'tooltips.bold', command: 'bold' },
      { action: 'italic', label: 'I', titleKey: 'tooltips.italic', command: 'italic' },
      { action: 'underline', label: 'U', titleKey: 'tooltips.underline', command: 'underline' },
      { action: 'strikethrough', label: 'S', titleKey: 'tooltips.strikethrough', command: 'strikeThrough' },
      { action: 'caseMenu', label: 'Aa', titleKey: 'tooltips.toggleCase', type: 'caseMenu' },
      { action: 'removeFormat', label: WYSIWYG_ICONS.removeFormat, titleKey: 'tooltips.removeFormat', type: 'removeFormat' },
      { action: 'separator', type: 'separator' },
      { action: 'link', label: WYSIWYG_ICONS.link, titleKey: 'tooltips.insertLink', command: 'createLink' },
      { action: 'separator', type: 'separator' },
      { action: 'color', label: 'A', titleKey: 'tooltips.color', type: 'colorPicker' },
      { action: 'separator', type: 'separator' },
      { action: 'alignLeft', label: WYSIWYG_ICONS.alignLeft, titleKey: 'tooltips.alignLeft', command: 'justifyLeft' },
      { action: 'alignCenter', label: WYSIWYG_ICONS.alignCenter, titleKey: 'tooltips.alignCenter', command: 'justifyCenter' },
      { action: 'alignRight', label: WYSIWYG_ICONS.alignRight, titleKey: 'tooltips.alignRight', command: 'justifyRight' },
      { action: 'alignJustify', label: WYSIWYG_ICONS.alignJustify, titleKey: 'tooltips.justify', command: 'justifyFull' }
    ];

    tools.forEach(function(tool) {
      if (tool.type === 'separator') {
        var separator = document.createElement('div');
        separator.className = 'mewyse-format-separator';
        menu.appendChild(separator);
        return;
      }

      var button = document.createElement('button');
      button.className = 'mewyse-format-button';
      button.innerHTML = tool.label;
      button.title = self.t(tool.titleKey);
      button.setAttribute('aria-label', self.t(tool.titleKey));
      button.setAttribute('data-action', tool.action);

      // Aplicar estilos especiales según el botón
      if (tool.action === 'bold') button.style.fontWeight = 'bold';
      if (tool.action === 'italic') button.style.fontStyle = 'italic';
      if (tool.action === 'underline') button.style.textDecoration = 'underline';
      if (tool.action === 'strikethrough') button.style.textDecoration = 'line-through';
      if (tool.action === 'toggleCase') { button.style.fontSize = '13px'; button.style.fontWeight = '600'; }

      button.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (self.crossBlockSelection) {
          // Cross-block: delegar al sistema cross-block
          if (tool.type === 'caseMenu') {
            self.showCaseMenu(button);
          } else if (tool.type === 'removeFormat') {
            self.removeFormat();
          } else if (tool.type === 'colorPicker') {
            self.showUnifiedColorPicker(button);
          } else if (tool.command === 'createLink') {
            // Links no soportados en cross-block, ignorar
          } else if (tool.command) {
            self.applyCrossBlockFormat(tool.command);
          }
        } else {
          // Normal single-block
          if (tool.type === 'caseMenu') {
            self.showCaseMenu(button);
          } else if (tool.type === 'removeFormat') {
            self.removeFormat();
          } else if (tool.type === 'colorPicker') {
            self.showUnifiedColorPicker(button);
          } else if (tool.command === 'createLink') {
            self.createLink();
          } else if (tool.command) {
            document.execCommand(tool.command, false, null);
            self.triggerChange();
          }
        }
      };

      menu.appendChild(button);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Guardar el range para poder calcular su posición dinámicamente
    this.formatMenuRange = range;

    var rangeReference;
    if (crossBlockReference) {
      // Para selección cross-block, usar el reference proporcionado
      rangeReference = crossBlockReference;
    } else {
      // Crear un objeto que simula un elemento con getBoundingClientRect
      rangeReference = {
        getBoundingClientRect: function() {
          return range.getBoundingClientRect();
        }
      };
    }

    // Anclar el menú al range
    this.anchorMenu(menu, rangeReference, { offsetY: -65, centerX: true });

    // Evitar que se cierre al hacer clic en el menú
    menu.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    this._showBackdrop('formatMenu', function() { self.closeFormatMenu(); });
  };

  /**
   * Muestra un selector de color
   * @param {string} command - 'foreColor' o 'backColor'
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showColorPicker = function(command, button) {
    var self = this;

    // Cerrar picker existente
    var existingPicker = document.querySelector('.mewyse-color-picker');
    if (existingPicker) {
      existingPicker.remove();
    }

    var picker = document.createElement('div');
    picker.className = 'mewyse-color-picker';

    var closeLegacyPicker = function() {
      if (picker.parentNode) picker.remove();
      self._hideBackdrop('legacyColorPicker');
    };

    var colors = [
      '#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#ffffff',
      '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
      '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc'
    ];

    colors.forEach(function(color) {
      var colorBtn = document.createElement('button');
      colorBtn.className = 'mewyse-color-button';
      colorBtn.style.backgroundColor = color;
      colorBtn.title = color;

      colorBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        document.execCommand(command, false, color);
        self.triggerChange();
        closeLegacyPicker();
      };

      picker.appendChild(colorBtn);
    });

    // Botón para remover color
    var removeBtn = document.createElement('button');
    removeBtn.className = 'mewyse-color-button mewyse-color-remove';
    removeBtn.innerHTML = WYSIWYG_ICONS.close;
    removeBtn.title = self.t('colors.removeColor');
    removeBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      document.execCommand(command, false, 'transparent');
      self.triggerChange();
      closeLegacyPicker();
    };
    picker.appendChild(removeBtn);

    // Posicionar el picker
    var rect = button.getBoundingClientRect();
    picker.style.position = 'fixed';
    picker.style.top = (rect.bottom + 5) + 'px';
    picker.style.left = rect.left + 'px';

    document.body.appendChild(picker);

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', function closePicker(e) {
        if (!picker.contains(e.target) && !button.contains(e.target)) {
          closeLegacyPicker();
          document.removeEventListener('click', closePicker);
        }
      });
    }, 10);

    // Evitar que se cierre al hacer clic en el picker
    picker.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    this._showBackdrop('legacyColorPicker', closeLegacyPicker);
  };

  /**
   * Aplica color de texto a la selección
   * @param {string} color - Color en formato hexadecimal
   */
  meWYSE.prototype.applyTextColor = function(color) {
    this.applyInlineStyle('color', color);
  };

  /**
   * Aplica color de fondo a la selección
   * @param {string} color - Color en formato hexadecimal
   */
  meWYSE.prototype.applyBackgroundColor = function(color) {
    this.applyInlineStyle('backgroundColor', color);
  };

  /**
   * Aplica un estilo inline a la selección actual
   * @param {string} styleProperty - Propiedad CSS (color, backgroundColor, etc.)
   * @param {string} styleValue - Valor del estilo
   */
  meWYSE.prototype.applyInlineStyle = function(styleProperty, styleValue) {
    var selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;

    var range = selection.getRangeAt(0);
    var selectedText = range.toString();

    // Guardar el elemento contenedor
    var container = range.commonAncestorContainer;
    if (container.nodeType === 3) {
      container = container.parentElement;
    }

    // Verificar si ya hay un span directo que envuelve toda la selección
    var parentSpan = container.closest('span');

    if (parentSpan && parentSpan.textContent === selectedText) {
      // Si la selección es exactamente el contenido de un span, actualizar ese span
      parentSpan.style[styleProperty] = styleValue;
    } else {
      // Crear nuevo span
      var span = document.createElement('span');
      span.style[styleProperty] = styleValue;

      // Extraer contenido y envolverlo
      try {
        var fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);

        // Seleccionar el nuevo span
        range.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (e) {
        // En caso de error, revertir
        console.error('Error al aplicar estilo:', e);
      }
    }
  };

  /**
   * Elimina el color de texto del texto seleccionado
   */
  meWYSE.prototype.removeTextColor = function() {
    this.removeInlineStyle('color');
  };

  /**
   * Elimina el color de fondo del texto seleccionado
   */
  meWYSE.prototype.removeBackgroundColor = function() {
    this.removeInlineStyle('backgroundColor');
  };

  /**
   * Elimina un estilo inline de la selección actual
   * @param {string} styleProperty - Propiedad CSS a eliminar (color, backgroundColor, etc.)
   */
  meWYSE.prototype.removeInlineStyle = function(styleProperty) {
    var selection = window.getSelection();
    if (!selection.rangeCount) return;

    var range = selection.getRangeAt(0);
    var container = range.commonAncestorContainer;

    // Si es un nodo de texto, obtener el padre
    if (container.nodeType === 3) {
      container = container.parentElement;
    }

    // Buscar el span más cercano que contenga el estilo
    var targetSpan = container.closest('span');

    if (targetSpan && targetSpan.style[styleProperty]) {
      // Eliminar la propiedad de estilo
      targetSpan.style[styleProperty] = '';

      // Si el span no tiene más estilos, desenvolverlo
      if (!targetSpan.getAttribute('style') || targetSpan.getAttribute('style').trim() === '') {
        this.unwrapElement(targetSpan);
      }
    }

    // Buscar spans dentro de la selección que tengan el estilo
    var spans = [];
    if (container.querySelectorAll) {
      var allSpans = container.querySelectorAll('span');
      for (var i = 0; i < allSpans.length; i++) {
        if (allSpans[i].style[styleProperty]) {
          spans.push(allSpans[i]);
        }
      }
    }

    // Limpiar todos los spans encontrados
    for (var j = 0; j < spans.length; j++) {
      spans[j].style[styleProperty] = '';

      // Si no quedan estilos, desenvolver el elemento
      if (!spans[j].getAttribute('style') || spans[j].getAttribute('style').trim() === '') {
        this.unwrapElement(spans[j]);
      }
    }
  };

  /**
   * Desenvuelve un elemento, moviendo su contenido al padre y eliminando el elemento
   * @param {HTMLElement} element - Elemento a desenvolver
   */
  meWYSE.prototype.unwrapElement = function(element) {
    if (!element || !element.parentNode) return;

    var parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  };

  /**
   * Muestra un selector unificado de color para texto y fondo
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showUnifiedColorPicker = function(button) {
    var self = this;

    // Cerrar picker existente
    var existingPicker = document.querySelector('.mewyse-color-picker');
    if (existingPicker) {
      existingPicker.remove();
    }

    var picker = document.createElement('div');
    picker.className = 'mewyse-color-picker mewyse-unified-color-picker';

    // Array de colores actualizado
    var colors = [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7',
      '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
      '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
      '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
      '#795548', '#9E9E9E', '#607D8B', '#000000',
      '#FFFFFF'
    ];

    // Sección de color de texto
    var textColorSection = document.createElement('div');
    textColorSection.className = 'mewyse-color-section';

    var textColorLabel = document.createElement('div');
    textColorLabel.className = 'mewyse-color-section-label';
    textColorLabel.textContent = self.t('colors.textColor');
    textColorSection.appendChild(textColorLabel);

    var textColorGrid = document.createElement('div');
    textColorGrid.className = 'mewyse-color-grid';

    colors.forEach(function(color) {
      var colorBtn = document.createElement('button');
      colorBtn.className = 'mewyse-color-button';
      colorBtn.style.backgroundColor = color;
      colorBtn.title = color;

      // Añadir borde para color blanco
      if (color === '#FFFFFF') {
        colorBtn.style.border = '2px solid #ddd';
      }

      colorBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.applyTextColor(color);
        self.triggerChange();
        closePicker();
      };

      textColorGrid.appendChild(colorBtn);
    });

    // Botón para remover color de texto
    var removeTextBtn = document.createElement('button');
    removeTextBtn.className = 'mewyse-color-button mewyse-color-remove';
    removeTextBtn.innerHTML = WYSIWYG_ICONS.close;
    removeTextBtn.title = self.t('colors.removeTextColor');
    removeTextBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.removeTextColor();
      self.triggerChange();
      closePicker();
    };
    textColorGrid.appendChild(removeTextBtn);

    textColorSection.appendChild(textColorGrid);
    picker.appendChild(textColorSection);

    // Sección de color de fondo
    var bgColorSection = document.createElement('div');
    bgColorSection.className = 'mewyse-color-section';

    var bgColorLabel = document.createElement('div');
    bgColorLabel.className = 'mewyse-color-section-label';
    bgColorLabel.textContent = self.t('colors.backgroundColor');
    bgColorSection.appendChild(bgColorLabel);

    var bgColorGrid = document.createElement('div');
    bgColorGrid.className = 'mewyse-color-grid';

    colors.forEach(function(color) {
      var colorBtn = document.createElement('button');
      colorBtn.className = 'mewyse-color-button';
      colorBtn.style.backgroundColor = color;
      colorBtn.title = color;

      // Añadir borde para color blanco
      if (color === '#FFFFFF') {
        colorBtn.style.border = '2px solid #ddd';
      }

      colorBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.applyBackgroundColor(color);
        self.triggerChange();
        closePicker();
      };

      bgColorGrid.appendChild(colorBtn);
    });

    // Botón para remover color de fondo
    var removeBgBtn = document.createElement('button');
    removeBgBtn.className = 'mewyse-color-button mewyse-color-remove';
    removeBgBtn.innerHTML = WYSIWYG_ICONS.close;
    removeBgBtn.title = self.t('colors.removeBackgroundColor');
    removeBgBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.removeBackgroundColor();
      self.triggerChange();
      closePicker();
    };
    bgColorGrid.appendChild(removeBgBtn);

    bgColorSection.appendChild(bgColorGrid);
    picker.appendChild(bgColorSection);

    document.body.appendChild(picker);

    // Función para posicionar el picker
    var positionPicker = function() {
      var rect = button.getBoundingClientRect();
      var pickerRect = picker.getBoundingClientRect();

      var top = rect.bottom + 5;
      var left = rect.left;

      // Ajustar si se sale por la derecha del viewport
      if (left + pickerRect.width > window.innerWidth) {
        left = window.innerWidth - pickerRect.width - 10;
      }

      // Ajustar si se sale por la izquierda del viewport
      if (left < 10) {
        left = 10;
      }

      // Ajustar si se sale por abajo del viewport
      if (top + pickerRect.height > window.innerHeight) {
        top = rect.top - pickerRect.height - 5;
      }

      // Si tampoco cabe arriba, colocarlo en la parte superior visible
      if (top < 10) {
        top = 10;
      }

      picker.style.position = 'fixed';
      picker.style.top = top + 'px';
      picker.style.left = left + 'px';
    };

    // Posicionar inicialmente
    positionPicker();

    // Reposicionar durante el scroll
    var scrollHandler = function() {
      positionPicker();
    };
    window.addEventListener('scroll', scrollHandler, true);
    window.addEventListener('resize', scrollHandler);

    // Función para cerrar el picker
    var closePicker = function() {
      if (picker.parentNode) picker.remove();
      window.removeEventListener('scroll', scrollHandler, true);
      window.removeEventListener('resize', scrollHandler);
      document.removeEventListener('click', clickHandler);
      self._hideBackdrop('colorPicker');
    };

    // Cerrar al hacer clic fuera
    var clickHandler = function(e) {
      if (!picker.contains(e.target) && !button.contains(e.target)) {
        closePicker();
      }
    };

    setTimeout(function() {
      document.addEventListener('click', clickHandler);
    }, 10);

    // Evitar que se cierre al hacer clic en el picker
    picker.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    this._showBackdrop('colorPicker', closePicker);
  };

  /**
   * Crea un enlace
   */
  meWYSE.prototype.createLink = function() {
    var self = this;

    // Guardar la selección actual antes de abrir el modal
    var selection = window.getSelection();
    var savedRange = null;
    if (selection.rangeCount > 0) {
      savedRange = selection.getRangeAt(0).cloneRange();
    }

    // Obtener el texto seleccionado
    var selectedText = selection.toString();

    // Verificar si ya hay un enlace seleccionado para editar
    var existingLink = null;
    var existingUrl = '';
    if (selection.anchorNode) {
      var parentElement = selection.anchorNode.parentElement;
      if (parentElement && parentElement.tagName === 'A') {
        existingLink = parentElement;
        existingUrl = parentElement.getAttribute('href') || '';
      }
    }

    // Crear el modal
    var overlay = document.createElement('div');
    overlay.className = 'mewyse-modal-overlay';

    var container = document.createElement('div');
    container.className = 'mewyse-modal-container';

    var title = document.createElement('h3');
    title.className = 'mewyse-modal-title';
    title.textContent = existingLink ? self.t('modals.editLink') : self.t('modals.insertLink');
    container.appendChild(title);

    // Campo de URL
    var urlGroup = document.createElement('div');
    urlGroup.className = 'mewyse-modal-input-group';
    urlGroup.style.marginBottom = '16px';

    var urlLabel = document.createElement('label');
    urlLabel.textContent = self.t('modals.url');
    urlGroup.appendChild(urlLabel);

    var urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.className = 'mewyse-modal-input';
    urlInput.placeholder = self.t('placeholders.urlExample');
    urlInput.value = existingUrl;
    urlGroup.appendChild(urlInput);

    container.appendChild(urlGroup);

    // Campo de texto (opcional)
    var textGroup = document.createElement('div');
    textGroup.className = 'mewyse-modal-input-group';
    textGroup.style.marginBottom = '16px';

    var textLabel = document.createElement('label');
    textLabel.textContent = self.t('modals.linkText');
    textGroup.appendChild(textLabel);

    var textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.className = 'mewyse-modal-input';
    textInput.placeholder = self.t('placeholders.linkTextPlaceholder');
    textInput.value = selectedText || (existingLink ? existingLink.textContent : '');
    textGroup.appendChild(textInput);

    container.appendChild(textGroup);

    // Checkbox para abrir en nueva pestaña
    var checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'mewyse-modal-checkbox-group';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'mewyse-link-new-tab';
    if (existingLink && existingLink.getAttribute('target') === '_blank') {
      checkbox.checked = true;
    }

    var checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', 'mewyse-link-new-tab');
    checkboxLabel.textContent = self.t('modals.openInNewTab');

    checkboxGroup.appendChild(checkbox);
    checkboxGroup.appendChild(checkboxLabel);
    container.appendChild(checkboxGroup);

    // Botones
    var buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'mewyse-modal-buttons';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelBtn.textContent = self.t('modals.cancel');

    var submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'mewyse-modal-button mewyse-modal-button-primary';
    submitBtn.textContent = existingLink ? self.t('modals.update') : self.t('modals.insert');

    buttonsDiv.appendChild(cancelBtn);
    buttonsDiv.appendChild(submitBtn);
    container.appendChild(buttonsDiv);

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Focus en el campo URL
    setTimeout(function() {
      urlInput.focus();
      urlInput.select();
    }, 50);

    // Función para cerrar el modal
    function closeModal() {
      overlay.remove();
    }

    // Función para restaurar la selección
    function restoreSelection() {
      if (savedRange) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange);
      }
    }

    // Función para insertar el enlace
    function insertLink() {
      var url = urlInput.value.trim();
      if (!url) {
        urlInput.focus();
        return;
      }

      // Añadir protocolo si no tiene
      if (!/^https?:\/\//i.test(url) && !/^mailto:/i.test(url)) {
        url = 'https://' + url;
      }

      var linkText = textInput.value.trim();
      var openInNewTab = checkbox.checked;

      closeModal();

      // Restaurar la selección
      restoreSelection();

      if (existingLink) {
        // Editar enlace existente
        existingLink.setAttribute('href', url);
        if (linkText) {
          existingLink.textContent = linkText;
        }
        if (openInNewTab) {
          existingLink.setAttribute('target', '_blank');
          existingLink.setAttribute('rel', 'noopener noreferrer');
        } else {
          existingLink.removeAttribute('target');
          existingLink.removeAttribute('rel');
        }
      } else {
        // Crear nuevo enlace
        if (linkText && !selectedText) {
          // No hay texto seleccionado, insertar el texto del enlace
          var link = document.createElement('a');
          link.href = url;
          link.textContent = linkText;
          if (openInNewTab) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          }

          if (savedRange) {
            savedRange.deleteContents();
            savedRange.insertNode(link);
            // Mover cursor después del enlace
            var newRange = document.createRange();
            newRange.setStartAfter(link);
            newRange.collapse(true);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(newRange);
          }
        } else {
          // Hay texto seleccionado, usar execCommand
          document.execCommand('createLink', false, url);

          // Aplicar atributos adicionales al enlace creado
          var sel = window.getSelection();
          if (sel.anchorNode) {
            var newLink = sel.anchorNode.parentElement;
            if (newLink && newLink.tagName === 'A') {
              if (openInNewTab) {
                newLink.setAttribute('target', '_blank');
                newLink.setAttribute('rel', 'noopener noreferrer');
              }
              if (linkText) {
                newLink.textContent = linkText;
              }
            }
          }
        }
      }

      self.triggerChange();
    }

    // Event listeners
    cancelBtn.addEventListener('click', function() {
      closeModal();
      restoreSelection();
    });

    submitBtn.addEventListener('click', insertLink);

    // Enter para enviar
    urlInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        insertLink();
      }
      if (e.key === 'Escape') {
        closeModal();
        restoreSelection();
      }
    });

    textInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        insertLink();
      }
      if (e.key === 'Escape') {
        closeModal();
        restoreSelection();
      }
    });

    // Clic fuera del modal para cerrar
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeModal();
        restoreSelection();
      }
    });
  };

  /**
   * Alterna el texto seleccionado entre mayúsculas y minúsculas
   */
  meWYSE.prototype.toggleSelectionCase = function() {
    // Mantener compatibilidad: toggle binario (smart: si tiene alguna minúscula → UPPER, si no → lower)
    this.applyCaseTransform('smart');
  };

  /**
   * Helpers puros de transformación de texto por modo.
   * Usados por applyCaseTransform para normal y cross-block selection.
   */
  var CASE_TRANSFORMERS = {
    'upper': function(s) { return s.toUpperCase(); },
    'lower': function(s) { return s.toLowerCase(); },
    'title': function(s) {
      // Primera letra de cada palabra en mayúscula, resto en minúscula
      return s.toLowerCase().replace(/\b([a-záéíóúñü])/gi, function(m) {
        return m.toUpperCase();
      });
    },
    'sentence': function(s) {
      // Primera letra de cada oración en mayúscula (inicio y tras . ? !)
      var lowered = s.toLowerCase();
      return lowered.replace(/(^|[.?!]\s+)([a-záéíóúñü])/g, function(m, prefix, letter) {
        return prefix + letter.toUpperCase();
      });
    },
    'toggle': function(s) {
      // Invierte case letra por letra
      var out = '';
      for (var i = 0; i < s.length; i++) {
        var ch = s.charAt(i);
        var up = ch.toUpperCase();
        var lo = ch.toLowerCase();
        out += (ch === up && ch !== lo) ? lo : up;
      }
      return out;
    },
    'smart': function(s) {
      // Comportamiento legacy: UPPER si tiene minúsculas, si no LOWER
      return s !== s.toUpperCase() ? s.toUpperCase() : s.toLowerCase();
    }
  };

  /**
   * Aplica una transformación de caso al texto seleccionado.
   * @param {string} mode - 'upper' | 'lower' | 'title' | 'sentence' | 'toggle' | 'smart'
   */
  meWYSE.prototype.applyCaseTransform = function(mode) {
    var transformer = CASE_TRANSFORMERS[mode];
    if (!transformer) return;

    // Cross-block selection: aplicar bloque por bloque
    if (this.crossBlockSelection) {
      var sel = this.crossBlockSelection;
      this.pushHistory(true);
      for (var j = 0; j < sel.blockIds.length; j++) {
        var blockId = sel.blockIds[j];
        var range2 = this.getRangeForBlock(blockId, sel);
        if (!range2) continue;
        var text = range2.toString();
        if (!text) continue;
        range2.deleteContents();
        range2.insertNode(document.createTextNode(transformer(text)));
      }
      this.clearCrossBlockSelection();
      this.closeFormatMenu();
      this.triggerChange();
      return;
    }

    // Selección normal en un bloque
    var selection = window.getSelection();
    if (!selection.rangeCount) return;
    var range = selection.getRangeAt(0);
    var selectedText = range.toString();
    if (!selectedText) return;

    this.pushHistory(true);
    range.deleteContents();
    var textNode = document.createTextNode(transformer(selectedText));
    range.insertNode(textNode);

    var newRange = document.createRange();
    newRange.selectNodeContents(textNode);
    selection.removeAllRanges();
    selection.addRange(newRange);

    this.triggerChange();
  };

  /**
   * Envuelve la selección actual en un tag inline simple (ej: <code>).
   * Si ya está envuelta en ese tag, lo desenvuelve (toggle).
   */
  meWYSE.prototype._wrapSelectionInTag = function(tagName) {
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    var range = selection.getRangeAt(0);
    if (range.collapsed) return;

    // Detectar si la selección ya está dentro de este tag → desenvolver (toggle)
    var anchorNode = selection.anchorNode;
    var ancestor = anchorNode && anchorNode.nodeType === 1 ? anchorNode : (anchorNode && anchorNode.parentNode);
    while (ancestor && ancestor.tagName) {
      if (ancestor.tagName.toLowerCase() === tagName.toLowerCase()) {
        // Desenvolver: mover hijos al padre
        var parent = ancestor.parentNode;
        while (ancestor.firstChild) parent.insertBefore(ancestor.firstChild, ancestor);
        parent.removeChild(ancestor);
        parent.normalize();
        return;
      }
      ancestor = ancestor.parentNode;
    }

    // Envolver: extraer contents y meterlos en el nuevo tag
    try {
      var wrapper = document.createElement(tagName);
      wrapper.appendChild(range.extractContents());
      range.insertNode(wrapper);
      // Restaurar selección sobre el nuevo tag
      var newRange = document.createRange();
      newRange.selectNodeContents(wrapper);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } catch (e) {}
  };

  /**
   * Muestra el dropdown de opciones de caso (UPPER/lower/Title/Sentence/Toggle).
   * Anclado al botón "Aa" del toolbar o del format menu.
   */
  meWYSE.prototype.showCaseMenu = function(button) {
    var self = this;
    // Si ya hay uno abierto, cerrarlo (toggle)
    if (this._caseMenu && this._caseMenu.parentNode) {
      this._caseMenu.remove();
      this._caseMenu = null;
      return;
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-options-menu';
    menu.setAttribute('role', 'menu');

    var options = [
      { mode: 'upper',    label: this.t('tooltips.caseUpper'),    sample: 'AA' },
      { mode: 'lower',    label: this.t('tooltips.caseLower'),    sample: 'aa' },
      { mode: 'title',    label: this.t('tooltips.caseTitle'),    sample: 'Aa' },
      { mode: 'sentence', label: this.t('tooltips.caseSentence'), sample: 'A.' },
      { mode: 'toggle',   label: this.t('tooltips.caseToggle'),   sample: 'aA' }
    ];

    var closeCaseMenu = function() {
      if (self._caseMenu && self._caseMenu.parentNode) {
        self._caseMenu.remove();
      }
      self._caseMenu = null;
      self._hideBackdrop('caseMenu');
    };

    options.forEach(function(opt) {
      var item = document.createElement('div');
      item.className = 'mewyse-options-menu-item';
      item.setAttribute('role', 'menuitem');
      item.innerHTML = '<span class="icon" style="font-family: var(--mewyse-font-mono, monospace); font-weight: 600; font-size: 12px">' + opt.sample + '</span> ' + opt.label;
      item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Guardar selección antes de perder foco por el click
        self.applyCaseTransform(opt.mode);
        closeCaseMenu();
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this._caseMenu = menu;
    this.anchorMenu(menu, button, { offsetY: 5 });

    // Cerrar al hacer click fuera
    setTimeout(function() {
      var closeHandler = function(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) {
          closeCaseMenu();
          document.removeEventListener('click', closeHandler);
        }
      };
      document.addEventListener('click', closeHandler);
    }, 0);

    this._showBackdrop('caseMenu', closeCaseMenu);
  };

  /**
   * Cierra el menú de formato
   */
  meWYSE.prototype.closeFormatMenu = function() {
    if (this.formatMenu) {
      // Cancelar la animación de anclaje antes de eliminar el menú
      if (this.formatMenu._cancelAnchor) {
        this.formatMenu._cancelAnchor();
      }
      this.formatMenu.remove();
      this.formatMenu = null;
    }

    // Limpiar el range guardado
    this.formatMenuRange = null;

    this._hideBackdrop('formatMenu');

    // Cerrar también el color picker si está abierto
    var picker = document.querySelector('.mewyse-color-picker');
    if (picker) {
      picker.remove();
    }
  };

  /**
   * Crea el botón de resumen
   */
  meWYSE.prototype.createSummaryButton = function() {
    var self = this;

    // Si el botón ya existe, eliminarlo primero
    if (this.summaryButton && this.summaryButton.parentNode) {
      this.summaryButton.remove();
    }

    // Crear el botón
    this.summaryButton = document.createElement('button');
    this.summaryButton.className = 'mewyse-summary-button';
    this.summaryButton.innerHTML = WYSIWYG_ICONS.hamburger;
    this.summaryButton.title = this.t('tooltips.summary');

    // Evento hover para mostrar tooltip con índice rápido
    this.summaryButton.addEventListener('mouseenter', function() {
      // Cancelar el timeout de cierre si existe
      if (self.summaryTooltipTimeout) {
        clearTimeout(self.summaryTooltipTimeout);
        self.summaryTooltipTimeout = null;
      }
      self.showSummaryTooltip();
    });

    this.summaryButton.addEventListener('mouseleave', function() {
      // Delay antes de cerrar para permitir mover el ratón al tooltip
      self.summaryTooltipTimeout = setTimeout(function() {
        self.hideSummaryTooltip();
      }, 300);
    });

    // Evento click para mostrar modal completo
    this.summaryButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.showSummaryModal();
    });

    // Añadir el botón como primer elemento del contenedor
    if (this.container.firstChild) {
      this.container.insertBefore(this.summaryButton, this.container.firstChild);
    } else {
      this.container.appendChild(this.summaryButton);
    }
  };

  /**
   * Obtiene el índice de encabezados
   */
  meWYSE.prototype.getHeadingsIndex = function() {
    var headings = [];

    this.getFilteredBlocks().forEach(function(block, index) {
      if (block.type === 'heading1' || block.type === 'heading2' || block.type === 'heading3') {
        var text = block.content || '';
        // Eliminar etiquetas HTML del contenido
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        var cleanText = tempDiv.textContent || tempDiv.innerText || '';

        headings.push({
          id: block.id,
          type: block.type,
          text: cleanText,
          index: index
        });
      }
    });

    return headings;
  };

  /**
   * Muestra el tooltip con índice rápido
   */
  meWYSE.prototype.showSummaryTooltip = function() {
    var self = this;

    // Cerrar tooltip anterior si existe
    this.hideSummaryTooltip();

    var headings = this.getHeadingsIndex();

    // Si no hay encabezados, no mostrar tooltip
    if (headings.length === 0) {
      return;
    }

    // Crear tooltip
    var tooltip = document.createElement('div');
    tooltip.className = 'mewyse-summary-tooltip';

    headings.forEach(function(heading) {
      var item = document.createElement('div');
      item.className = 'mewyse-summary-tooltip-item mewyse-summary-' + heading.type;
      item.textContent = heading.text;
      item.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.navigateToHeading(heading.id);
        self.hideSummaryTooltip();
      });
      tooltip.appendChild(item);
    });

    // Añadir eventos para mantener tooltip abierto
    tooltip.addEventListener('mouseenter', function() {
      // Cancelar el timeout de cierre si existe
      if (self.summaryTooltipTimeout) {
        clearTimeout(self.summaryTooltipTimeout);
        self.summaryTooltipTimeout = null;
      }
    });

    tooltip.addEventListener('mouseleave', function() {
      // Cerrar tooltip cuando el ratón sale
      self.summaryTooltipTimeout = setTimeout(function() {
        self.hideSummaryTooltip();
      }, 200);
    });

    // Añadir al DOM primero para poder medir dimensiones reales
    document.body.appendChild(tooltip);
    this.summaryTooltip = tooltip;

    // Aplicar clase de tema si procede (para CSS variables dark)
    this._applyMenuTheme && this._applyMenuTheme(tooltip);

    // Posicionar tooltip anclado al botón de summary
    var buttonRect = this.summaryButton.getBoundingClientRect();
    var tooltipRect = tooltip.getBoundingClientRect();
    var margin = 8;
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Alinear el borde derecho del tooltip al borde derecho del botón por defecto
    var left = buttonRect.right - tooltipRect.width;
    var top = buttonRect.bottom + 5;

    // Si se sale por la izquierda del viewport, alinear al borde izquierdo del botón
    if (left < margin) {
      left = Math.min(buttonRect.left, viewportWidth - tooltipRect.width - margin);
      if (left < margin) left = margin;
    }

    // Si se sale por abajo, mostrar arriba del botón
    if (top + tooltipRect.height > viewportHeight - margin) {
      top = buttonRect.top - tooltipRect.height - 5;
      if (top < margin) top = margin;
    }

    tooltip.style.position = 'fixed';
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    tooltip.style.right = 'auto';

    this._showBackdrop('summaryTooltip', function() { self.hideSummaryTooltip(); });
  };

  /**
   * Oculta el tooltip
   */
  meWYSE.prototype.hideSummaryTooltip = function() {
    if (this.summaryTooltip) {
      this.summaryTooltip.remove();
      this.summaryTooltip = null;
      this._hideBackdrop('summaryTooltip');
    }
  };

  /**
   * Muestra el modal de resumen completo
   */
  meWYSE.prototype.showSummaryModal = function() {
    var self = this;

    // Crear overlay
    var overlay = document.createElement('div');
    overlay.className = 'mewyse-summary-overlay';

    // Crear modal
    var modal = document.createElement('div');
    modal.className = 'mewyse-summary-modal';

    // Título del modal
    var header = document.createElement('div');
    header.className = 'mewyse-summary-modal-header';
    header.innerHTML = '<h3>' + this.t('summary.title') + '</h3>';

    // Botón cerrar
    var closeBtn = document.createElement('button');
    closeBtn.className = 'mewyse-summary-close';
    closeBtn.innerHTML = WYSIWYG_ICONS.close;
    closeBtn.addEventListener('click', function() {
      overlay.remove();
    });
    header.appendChild(closeBtn);

    modal.appendChild(header);

    // Contenido del modal
    var content = document.createElement('div');
    content.className = 'mewyse-summary-modal-content';

    // Bloque de estadísticas
    var stats = document.createElement('div');
    stats.className = 'mewyse-summary-stats';

    var wordCount = this.getWordCount();
    var charCount = this.getCharacterCount();
    var paragraphCount = this.getParagraphCount();
    var readingTime = this.getReadingTime();

    stats.innerHTML = '<div class="mewyse-summary-stats-grid">' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.words') + '</span> <span class="mewyse-summary-stat-value">' + wordCount + '</span></div>' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.characters') + '</span> <span class="mewyse-summary-stat-value">' + charCount + '</span></div>' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.paragraphs') + '</span> <span class="mewyse-summary-stat-value">' + paragraphCount + '</span></div>' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.readingTime') + '</span> <span class="mewyse-summary-stat-value">' + readingTime + '</span></div>' +
      '</div>';

    content.appendChild(stats);

    // Índice de navegación
    var headings = this.getHeadingsIndex();

    if (headings.length > 0) {
      var indexSection = document.createElement('div');
      indexSection.className = 'mewyse-summary-index';

      var indexTitle = document.createElement('h4');
      indexTitle.textContent = this.t('summary.index');
      indexSection.appendChild(indexTitle);

      var indexList = document.createElement('div');
      indexList.className = 'mewyse-summary-index-list';

      headings.forEach(function(heading) {
        var item = document.createElement('div');
        item.className = 'mewyse-summary-index-item mewyse-summary-' + heading.type;
        item.textContent = heading.text;
        item.addEventListener('click', function() {
          self.navigateToHeading(heading.id);
          overlay.remove();
        });
        indexList.appendChild(item);
      });

      indexSection.appendChild(indexList);
      content.appendChild(indexSection);
    } else {
      var noHeadings = document.createElement('p');
      noHeadings.className = 'mewyse-summary-no-headings';
      noHeadings.textContent = this.t('summary.noHeadings');
      content.appendChild(noHeadings);
    }

    modal.appendChild(content);
    overlay.appendChild(modal);

    // Cerrar al hacer clic en el overlay
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.remove();
      }
    });

    document.body.appendChild(overlay);
  };

  /**
   * Navega a un encabezado específico
   */
  meWYSE.prototype.navigateToHeading = function(blockId) {
    var blockElement = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (blockElement) {
      blockElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Enfocar el bloque
      var contentEditable = blockElement.querySelector('[contenteditable="true"]');
      if (contentEditable) {
        setTimeout(function() {
          contentEditable.focus();
        }, 500);
      }
    }
  };

  /**
   * Obtiene el número de palabras
   */
  meWYSE.prototype.getWordCount = function() {
    var text = this.getPlainText();
    if (!text || text.trim() === '') {
      return 0;
    }

    // Eliminar múltiples espacios y contar palabras
    var words = text.trim().split(/\s+/);
    return words.length;
  };

  /**
   * Obtiene el número de caracteres
   */
  meWYSE.prototype.getCharacterCount = function() {
    var text = this.getPlainText();
    return text.length;
  };

  /**
   * Obtiene el número de párrafos
   */
  meWYSE.prototype.getParagraphCount = function() {
    var count = 0;

    this.getFilteredBlocks().forEach(function(block) {
      // Contar solo bloques que contengan texto
      if (block.type === 'paragraph' ||
          block.type === 'heading1' ||
          block.type === 'heading2' ||
          block.type === 'heading3' ||
          block.type === 'quote' ||
          block.type === 'bulletList' ||
          block.type === 'numberList') {
        var content = block.content || '';
        if (content.trim() !== '') {
          count++;
        }
      }
    });

    return count;
  };

  /**
   * Obtiene el tiempo estimado de lectura
   */
  meWYSE.prototype.getReadingTime = function() {
    var wordCount = this.getWordCount();

    // Promedio de lectura: 200 palabras por minuto
    var minutes = Math.ceil(wordCount / 200);

    if (minutes === 0) {
      return '< 1 min';
    } else if (minutes === 1) {
      return '1 min';
    } else {
      return minutes + ' min';
    }
  };

  // ============================================
  // CROSS-BLOCK SELECTION
  // ============================================

  /**
   * Obtiene el blockId del bloque en una coordenada de pantalla
   * @param {number} clientX
   * @param {number} clientY
   * @returns {string|null}
   */
  meWYSE.prototype.getBlockIdAtPoint = function(clientX, clientY) {
    var el = document.elementFromPoint(clientX, clientY);
    while (el && el !== this.container) {
      if (el.classList && el.classList.contains('mewyse-block') && el.getAttribute('data-block-id')) {
        return parseInt(el.getAttribute('data-block-id'), 10);
      }
      el = el.parentNode;
    }
    return null;
  };

  /**
   * Obtiene información del caret en una coordenada de pantalla (cross-browser)
   * @param {number} clientX
   * @param {number} clientY
   * @returns {{ node: Node, offset: number }|null}
   */
  meWYSE.prototype.getCaretInfoAtPoint = function(clientX, clientY) {
    if (document.caretRangeFromPoint) {
      // Chrome, Safari
      var range = document.caretRangeFromPoint(clientX, clientY);
      if (range) {
        return { node: range.startContainer, offset: range.startOffset };
      }
    } else if (document.caretPositionFromPoint) {
      // Firefox
      var pos = document.caretPositionFromPoint(clientX, clientY);
      if (pos) {
        return { node: pos.offsetNode, offset: pos.offset };
      }
    }
    return null;
  };

  /**
   * Crea el overlay de selección visual si no existe
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createSelectionOverlay = function() {
    if (!this.crossBlockOverlay) {
      var overlay = document.createElement('div');
      overlay.className = 'mewyse-selection-overlay';
      this.container.appendChild(overlay);
      this.crossBlockOverlay = overlay;
    }
    return this.crossBlockOverlay;
  };

  /**
   * Inicia el tracking de mouse para detectar selección cross-block
   * @param {MouseEvent} e
   * @param {number} blockId
   */
  meWYSE.prototype.startCrossBlockTracking = function(e, blockId) {
    var self = this;
    if (this.crossBlockSelection) {
      this.clearCrossBlockSelection();
    }
    var originCaret = this.getCaretInfoAtPoint(e.clientX, e.clientY);
    if (!originCaret) return;

    this.crossBlockSelectOrigin = {
      blockId: blockId,
      node: originCaret.node,
      offset: originCaret.offset,
      clientX: e.clientX,
      clientY: e.clientY
    };

    var moved = false;

    function onMouseMove(ev) {
      var currentBlockId = self.getBlockIdAtPoint(ev.clientX, ev.clientY);
      if (currentBlockId === null) return;

      if (currentBlockId !== self.crossBlockSelectOrigin.blockId) {
        if (!self.isCrossBlockSelecting) {
          // Comenzamos selección cross-block
          self.isCrossBlockSelecting = true;
          self.container.classList.add('mewyse-cross-selecting');
          // Limpiar selección nativa
          var sel = window.getSelection();
          if (sel) sel.removeAllRanges();
        }
        moved = true;
        self.updateCrossBlockSelection(ev.clientX, ev.clientY, currentBlockId);
      } else if (self.isCrossBlockSelecting) {
        // Volvió al bloque origen pero ya estaba en modo cross-block
        moved = true;
        self.updateCrossBlockSelection(ev.clientX, ev.clientY, currentBlockId);
      }
    }

    function onMouseUp(ev) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (self.isCrossBlockSelecting) {
        self.finalizeCrossBlockSelection();
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * Actualiza la selección cross-block mientras se arrastra el mouse
   * @param {number} clientX
   * @param {number} clientY
   * @param {number} currentBlockId
   */
  meWYSE.prototype.updateCrossBlockSelection = function(clientX, clientY, currentBlockId) {
    var origin = this.crossBlockSelectOrigin;
    if (!origin) return;

    var originIndex = this.getBlockIndex(origin.blockId);
    var currentIndex = this.getBlockIndex(currentBlockId);
    if (originIndex === -1 || currentIndex === -1) return;

    var startIndex = Math.min(originIndex, currentIndex);
    var endIndex = Math.max(originIndex, currentIndex);
    var forward = currentIndex >= originIndex;

    // Obtener caret en la posición actual del mouse
    var currentCaret = this.getCaretInfoAtPoint(clientX, clientY);

    // Recolectar IDs de bloques entre origen y destino
    var blockIds = [];
    for (var i = startIndex; i <= endIndex; i++) {
      blockIds.push(this.blocks[i].id);
    }

    this.crossBlockSelection = {
      blockIds: blockIds,
      forward: forward,
      originBlockId: origin.blockId,
      originNode: origin.node,
      originOffset: origin.offset,
      endBlockId: currentBlockId,
      endNode: currentCaret ? currentCaret.node : null,
      endOffset: currentCaret ? currentCaret.offset : 0
    };

    this.renderCrossBlockHighlight();
  };

  /**
   * Crea un Range nativo para la porción seleccionada de un bloque
   * @param {number} blockId
   * @param {Object} sel - El objeto crossBlockSelection
   * @returns {Range|null}
   */
  meWYSE.prototype.getRangeForBlock = function(blockId, sel) {
    var blockEl = this.getBlockElementById(blockId);
    if (!blockEl) return null;

    var editableEl = this.getEditableElement(blockEl);
    if (!editableEl) return null;

    var range = document.createRange();
    var isOrigin = (blockId === sel.originBlockId);
    var isEnd = (blockId === sel.endBlockId);

    try {
      if (isOrigin && isEnd) {
        // Selección dentro del mismo bloque (puede ocurrir si se vuelve al origen)
        if (sel.forward) {
          range.setStart(sel.originNode, sel.originOffset);
          if (sel.endNode) {
            range.setEnd(sel.endNode, sel.endOffset);
          } else {
            range.selectNodeContents(editableEl);
            range.setStart(sel.originNode, sel.originOffset);
          }
        } else {
          if (sel.endNode) {
            range.setStart(sel.endNode, sel.endOffset);
          } else {
            range.setStart(editableEl, 0);
          }
          range.setEnd(sel.originNode, sel.originOffset);
        }
      } else if (isOrigin) {
        if (sel.forward) {
          // Desde el caret origen hasta el final del bloque
          range.setStart(sel.originNode, sel.originOffset);
          range.setEndAfter(editableEl.lastChild || editableEl);
        } else {
          // Desde el inicio del bloque hasta el caret origen
          range.setStartBefore(editableEl.firstChild || editableEl);
          range.setEnd(sel.originNode, sel.originOffset);
        }
      } else if (isEnd) {
        if (sel.forward) {
          // Desde el inicio del bloque hasta el caret actual
          range.setStartBefore(editableEl.firstChild || editableEl);
          if (sel.endNode) {
            range.setEnd(sel.endNode, sel.endOffset);
          } else {
            range.selectNodeContents(editableEl);
          }
        } else {
          // Desde el caret actual hasta el final del bloque
          if (sel.endNode) {
            range.setStart(sel.endNode, sel.endOffset);
          } else {
            range.setStart(editableEl, 0);
          }
          range.setEndAfter(editableEl.lastChild || editableEl);
        }
      } else {
        // Bloque intermedio: seleccionar todo
        range.selectNodeContents(editableEl);
      }
    } catch (ex) {
      // Si hay un error de rango (nodo movido, etc.), seleccionar todo el contenido
      try {
        range.selectNodeContents(editableEl);
      } catch (ex2) {
        return null;
      }
    }

    return range;
  };

  /**
   * Renderiza el highlight visual de la selección cross-block
   */
  meWYSE.prototype.renderCrossBlockHighlight = function() {
    var self = this;
    if (this._crossBlockRafId) {
      cancelAnimationFrame(this._crossBlockRafId);
    }
    this._crossBlockRafId = requestAnimationFrame(function() {
      self._renderCrossBlockHighlightNow();
    });
  };

  /**
   * Implementación real del renderizado de highlight
   */
  meWYSE.prototype._renderCrossBlockHighlightNow = function() {
    var overlay = this.createSelectionOverlay();
    // Limpiar rectángulos anteriores
    overlay.innerHTML = '';

    if (!this.crossBlockSelection) return;

    var sel = this.crossBlockSelection;
    var containerRect = this.container.getBoundingClientRect();
    var scrollLeft = this.container.scrollLeft;
    var scrollTop = this.container.scrollTop;

    for (var i = 0; i < sel.blockIds.length; i++) {
      var blockId = sel.blockIds[i];
      var range = this.getRangeForBlock(blockId, sel);
      if (!range) continue;

      var rects = range.getClientRects();
      for (var j = 0; j < rects.length; j++) {
        var r = rects[j];
        if (r.width === 0 && r.height === 0) continue;
        var div = document.createElement('div');
        div.className = 'mewyse-cross-selection-rect';
        div.style.left = (r.left - containerRect.left + scrollLeft) + 'px';
        div.style.top = (r.top - containerRect.top + scrollTop) + 'px';
        div.style.width = r.width + 'px';
        div.style.height = r.height + 'px';
        overlay.appendChild(div);
      }
    }
  };

  /**
   * Finaliza la selección cross-block al soltar el mouse
   */
  meWYSE.prototype.finalizeCrossBlockSelection = function() {
    this.isCrossBlockSelecting = false;
    this.container.classList.remove('mewyse-cross-selecting');
    this.crossBlockSelectOrigin = null;

    if (!this.crossBlockSelection || this.crossBlockSelection.blockIds.length === 0) {
      this.clearCrossBlockSelection();
      return;
    }

    // Mostrar el menú de formato centrado sobre la selección
    var overlay = this.crossBlockOverlay;
    if (overlay && overlay.childNodes.length > 0) {
      // Calcular el bounding box de todos los rects
      var firstRect = overlay.childNodes[0];
      var lastRect = overlay.childNodes[overlay.childNodes.length - 1];

      var sel = this.crossBlockSelection;
      var self = this;

      // Crear un reference object para anclar el menú
      var rangeReference = {
        getBoundingClientRect: function() {
          // Recalcular en cada frame basándonos en los rects del overlay
          if (!self.crossBlockOverlay || self.crossBlockOverlay.childNodes.length === 0) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
          }
          var allRects = self.crossBlockOverlay.childNodes;
          var minLeft = Infinity, minTop = Infinity, maxRight = -Infinity, maxBottom = -Infinity;
          var containerRect = self.container.getBoundingClientRect();
          for (var i = 0; i < allRects.length; i++) {
            var r = allRects[i];
            var rl = parseFloat(r.style.left) + containerRect.left;
            var rt = parseFloat(r.style.top) + containerRect.top - self.container.scrollTop;
            var rr = rl + parseFloat(r.style.width);
            var rb = rt + parseFloat(r.style.height);
            if (rl < minLeft) minLeft = rl;
            if (rt < minTop) minTop = rt;
            if (rr > maxRight) maxRight = rr;
            if (rb > maxBottom) maxBottom = rb;
          }
          return {
            top: minTop,
            bottom: maxBottom,
            left: minLeft,
            right: maxRight,
            width: maxRight - minLeft,
            height: maxBottom - minTop
          };
        }
      };

      // Mostrar el menú de formato usando la lógica existente
      this.showFormatMenu(null, null, rangeReference);
    }
  };

  /**
   * Limpia toda la selección cross-block
   */
  meWYSE.prototype.clearCrossBlockSelection = function() {
    this.crossBlockSelection = null;
    this.isCrossBlockSelecting = false;
    this.crossBlockSelectOrigin = null;
    this.container.classList.remove('mewyse-cross-selecting');

    if (this._crossBlockRafId) {
      cancelAnimationFrame(this._crossBlockRafId);
      this._crossBlockRafId = null;
    }

    // Limpiar overlay
    if (this.crossBlockOverlay) {
      this.crossBlockOverlay.innerHTML = '';
    }
  };

  /**
   * Copia el contenido de la selección cross-block al clipboard
   */
  meWYSE.prototype.executeCrossBlockCopy = function() {
    if (!this.crossBlockSelection) return;

    var sel = this.crossBlockSelection;
    var textParts = [];
    var htmlParts = [];

    for (var i = 0; i < sel.blockIds.length; i++) {
      var blockId = sel.blockIds[i];
      var range = this.getRangeForBlock(blockId, sel);
      if (!range) continue;

      var cloned = range.cloneContents();
      textParts.push(range.toString());

      // Construir HTML del fragmento
      var tempDiv = document.createElement('div');
      tempDiv.appendChild(cloned);
      htmlParts.push(tempDiv.innerHTML);
    }

    var textContent = textParts.join('\n');
    var htmlContent = htmlParts.join('<br>');

    // Intentar usar Clipboard API primero
    if (navigator.clipboard && navigator.clipboard.write) {
      try {
        var blob = new Blob([htmlContent], { type: 'text/html' });
        var textBlob = new Blob([textContent], { type: 'text/plain' });
        var item = new ClipboardItem({
          'text/html': blob,
          'text/plain': textBlob
        });
        navigator.clipboard.write([item]);
        return;
      } catch (ex) {
        // Fallback abajo
      }
    }

    // Fallback compatible ES5: textarea temporal + execCommand
    var ta = document.createElement('textarea');
    ta.value = textContent;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (ex) {
      // Silenciar error
    }
    document.body.removeChild(ta);
  };

  /**
   * Aplica un comando de formato a la selección cross-block
   * @param {string} command - Comando execCommand (bold, italic, etc.)
   * @param {string} [value] - Valor opcional del comando
   */
  meWYSE.prototype.applyCrossBlockFormat = function(command, value) {
    if (!this.crossBlockSelection) return;

    var sel = this.crossBlockSelection;
    var nativeSel = window.getSelection();

    for (var i = 0; i < sel.blockIds.length; i++) {
      var blockId = sel.blockIds[i];
      var range = this.getRangeForBlock(blockId, sel);
      if (!range) continue;

      var blockEl = this.getBlockElementById(blockId);
      var editableEl = this.getEditableElement(blockEl);
      if (!editableEl) continue;

      // Focar el elemento editable y aplicar la selección
      editableEl.focus();
      nativeSel.removeAllRanges();
      nativeSel.addRange(range);

      // Ejecutar el comando
      document.execCommand(command, false, value || null);
    }

    // Limpiar selección nativa y estado cross-block (los nodos son stale tras execCommand)
    nativeSel.removeAllRanges();
    this.clearCrossBlockSelection();
    this.closeFormatMenu();
    this.triggerChange();
  };

  /**
   * Toggle case para la selección cross-block
   */
  meWYSE.prototype.toggleCrossBlockCase = function() {
    // Compat: toggle binario smart
    this.applyCaseTransform('smart');
  };

  /**
   * Elimina el contenido de la selección cross-block
   */
  meWYSE.prototype.deleteCrossBlockSelection = function() {
    if (!this.crossBlockSelection) return;
    this.pushHistory(true);

    var sel = this.crossBlockSelection;
    var originIndex = this.getBlockIndex(sel.originBlockId);
    var endIndex = this.getBlockIndex(sel.endBlockId);
    if (originIndex === -1 || endIndex === -1) return;

    var startIndex = Math.min(originIndex, endIndex);
    var endIdx = Math.max(originIndex, endIndex);

    // Procesar bloques en orden inverso para no alterar los índices
    var blocksToRemove = [];
    for (var i = endIdx; i >= startIndex; i--) {
      var blockId = this.blocks[i].id;
      var isFirst = (i === startIndex);
      var isLast = (i === endIdx);

      var range = this.getRangeForBlock(blockId, sel);
      if (!range) continue;

      var blockEl = this.getBlockElementById(blockId);
      var editableEl = this.getEditableElement(blockEl);
      if (!editableEl) continue;

      var fullText = editableEl.textContent || '';
      var rangeText = range.toString();

      if (!isFirst && !isLast) {
        // Bloque intermedio: eliminar completamente
        blocksToRemove.push(blockId);
      } else if (rangeText.length >= fullText.length) {
        // Bloque completamente seleccionado
        if (isFirst && isLast) {
          // Solo un bloque: vaciar contenido
          range.deleteContents();
        } else if (isFirst) {
          // Primer bloque completamente seleccionado: vaciar
          range.deleteContents();
        } else {
          // Último bloque completamente seleccionado: eliminar
          blocksToRemove.push(blockId);
        }
      } else {
        // Parcialmente seleccionado
        range.deleteContents();
      }
    }

    // Eliminar bloques marcados
    for (var k = 0; k < blocksToRemove.length; k++) {
      var removeId = blocksToRemove[k];
      var removeIndex = this.getBlockIndex(removeId);
      if (removeIndex !== -1) {
        this.blocks.splice(removeIndex, 1);
        var removeEl = this.getBlockElementById(removeId);
        if (removeEl) {
          // Si está en un grupo de lista, manejar correctamente
          var parent = removeEl.parentNode;
          removeEl.remove();
          if (parent && (parent.classList.contains('mewyse-list-group') || parent.classList.contains('mewyse-checklist-group'))) {
            if (parent.children.length === 0) {
              parent.remove();
            }
          }
        }
      }
    }

    this.clearCrossBlockSelection();
    this.closeFormatMenu();

    // Si no quedan bloques, crear un párrafo vacío
    if (this.blocks.length === 0) {
      this.blocks.push({
        id: ++this.currentBlockId,
        type: 'paragraph',
        content: ''
      });
      this.render(this.blocks[0].id);
    }

    // Focar el primer bloque restante
    if (this.blocks.length > 0) {
      var focusIndex = Math.min(startIndex, this.blocks.length - 1);
      var focusBlock = this.blocks[focusIndex];
      var focusEl = this.getBlockElementById(focusBlock.id);
      var focusEditable = this.getEditableElement(focusEl);
      if (focusEditable) {
        focusEditable.focus();
      }
    }

    this.triggerChange();
  };

  /**
   * Guarda un snapshot del estado actual en el historial
   * @param {boolean} force - Si true, guarda inmediatamente sin debounce
   */
  meWYSE.prototype.pushHistory = function(force) {
    if (this.isUndoRedo) return;

    var self = this;

    var doSnapshot = function() {
      var snapshot = JSON.parse(JSON.stringify(self.blocks));

      // Comparar con el último snapshot para evitar duplicados
      if (self.history.length > 0) {
        var last = self.history[self.historyIndex];
        if (JSON.stringify(last) === JSON.stringify(snapshot)) return;
      }

      // Truncar futuro si estamos en medio del historial
      if (self.historyIndex < self.history.length - 1) {
        self.history = self.history.slice(0, self.historyIndex + 1);
      }

      self.history.push(snapshot);

      // Recortar si excede el límite
      if (self.history.length > self.maxHistorySize) {
        self.history = self.history.slice(self.history.length - self.maxHistorySize);
      }

      self.historyIndex = self.history.length - 1;
      self.updateUndoRedoButtons();
    };

    if (force) {
      clearTimeout(this.historyDebounceTimer);
      this.historyDebounceTimer = null;
      doSnapshot();
    } else {
      clearTimeout(this.historyDebounceTimer);
      this.historyDebounceTimer = setTimeout(function() {
        self.historyDebounceTimer = null;
        doSnapshot();
      }, 300);
    }
  };

  /**
   * Deshace el último cambio
   */
  meWYSE.prototype.undo = function() {
    // Flush debounce pendiente
    if (this.historyDebounceTimer) {
      clearTimeout(this.historyDebounceTimer);
      this.historyDebounceTimer = null;
      // Guardar estado actual antes de deshacer
      var snapshot = JSON.parse(JSON.stringify(this.blocks));
      if (this.history.length > 0) {
        var last = this.history[this.historyIndex];
        if (JSON.stringify(last) !== JSON.stringify(snapshot)) {
          if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
          }
          this.history.push(snapshot);
          if (this.history.length > this.maxHistorySize) {
            this.history = this.history.slice(this.history.length - this.maxHistorySize);
          }
          this.historyIndex = this.history.length - 1;
        }
      }
    }

    if (this.historyIndex <= 0) return;

    this.historyIndex--;
    this.isUndoRedo = true;
    this.blocks = JSON.parse(JSON.stringify(this.history[this.historyIndex]));

    // Recalcular currentBlockId
    var maxId = 0;
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id > maxId) {
        maxId = this.blocks[i].id;
      }
    }
    this.currentBlockId = maxId;

    this.render();
    this.triggerChange();
    this.isUndoRedo = false;
    this.updateUndoRedoButtons();
  };

  /**
   * Rehace el último cambio deshecho
   */
  meWYSE.prototype.redo = function() {
    if (this.historyIndex >= this.history.length - 1) return;

    this.historyIndex++;
    this.isUndoRedo = true;
    this.blocks = JSON.parse(JSON.stringify(this.history[this.historyIndex]));

    // Recalcular currentBlockId
    var maxId = 0;
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id > maxId) {
        maxId = this.blocks[i].id;
      }
    }
    this.currentBlockId = maxId;

    this.render();
    this.triggerChange();
    this.isUndoRedo = false;
    this.updateUndoRedoButtons();
  };

  /**
   * Actualiza el estado de los botones undo/redo en la toolbar
   */
  meWYSE.prototype.updateUndoRedoButtons = function() {
    if (this.undoButton) {
      this.undoButton.disabled = (this.historyIndex <= 0);
    }
    if (this.redoButton) {
      this.redoButton.disabled = (this.historyIndex >= this.history.length - 1);
    }
  };

  // =========================================================================
  // INYECCIÓN DE ESTILOS DE CONTENIDO
  // =========================================================================

  /**
   * Inyecta los estilos de contenido en el documento, scopeados al instanceId
   */
  meWYSE.prototype._injectContentStyles = function() {
    var id = this.instanceId;
    var s = '.' + id; // scope selector

    var w = '.mewyse-editor-wrapper:has(> ' + s + ')'; // wrapper scope via instanceId child

    var css = '' +
      '/* Content styles for ' + id + ' */\n' +
      w + ' { border: 1px solid var(--mewyse-border-light); border-radius: var(--mewyse-radius-xl); background: var(--mewyse-bg-primary); color: var(--mewyse-text-primary); }\n' +
      s + ' { padding: 16px; min-height: 200px; max-height: 500px; overflow-y: auto; margin-left: 0; }\n' +
      s + '.mewyse-minimal { border-radius: var(--mewyse-radius-xl); padding: 16px; background: var(--mewyse-bg-primary); color: var(--mewyse-text-primary); min-height: 150px; max-height: 400px; overflow-y: auto; }\n' +
      s + ' .mewyse-block { display: block; position: relative; margin: 0 0 8px 0; padding: 0; outline: none; box-sizing: border-box; }\n' +
      s + ' p.mewyse-block, ' + s + ' h1.mewyse-block, ' + s + ' h2.mewyse-block, ' + s + ' h3.mewyse-block { margin: 0 0 8px 0; padding: 0; }\n' +
      s + ' blockquote.mewyse-block { margin: 0 0 8px 0; padding: 8px 16px; border-left: 3px solid #ddd; }\n' +
      s + ' hr.mewyse-block { margin: 0 0 8px 0; padding: 0; }\n' +
      s + ' .mewyse-block-selected { background-color: rgba(59, 130, 246, 0.1); border-radius: 4px; }\n' +
      s + ' .mewyse-block:empty:before, ' + s + ' .mewyse-block[data-placeholder]:empty:before { content: attr(data-placeholder); color: #aaa; pointer-events: none; }\n' +
      s + ' pre.mewyse-block { margin: 0 0 8px 0; padding: 8px 12px; overflow-x: auto; }\n' +
      s + ' pre.mewyse-block code { display: block; outline: none; }\n' +
      s + ' div.mewyse-block.mewyse-table-wrapper, ' + s + ' div.mewyse-block.mewyse-image-wrapper { display: block; }\n' +
      s + ' .mewyse-table-wrapper { position: relative; display: inline-block; width: 100%; }\n' +
      // Defaults visuales para tabla durante edición (los estilos inline del usuario ganan por especificidad)
      s + ' .mewyse-table-wrapper table { width: 100%; border-collapse: collapse; margin: 4px 0; position: relative; }\n' +
      s + ' .mewyse-table-wrapper table td, ' + s + ' .mewyse-table-wrapper table th { border: 1px solid var(--mewyse-border-medium); padding: 8px; min-width: 50px; outline: none; position: relative; vertical-align: top; }\n' +
      s + ' .mewyse-table-wrapper table td:focus, ' + s + ' .mewyse-table-wrapper table th:focus { background-color: var(--mewyse-bg-hover); }\n' +
      s + ' .mewyse-table-wrapper table td:empty:before, ' + s + ' .mewyse-table-wrapper table th:empty:before { content: ""; color: var(--mewyse-text-muted); }\n' +
      s + ' .mewyse-table-wrapper table td > p, ' + s + ' .mewyse-table-wrapper table td > h1, ' + s + ' .mewyse-table-wrapper table td > h2, ' + s + ' .mewyse-table-wrapper table td > h3, ' +
        s + ' .mewyse-table-wrapper table td > blockquote, ' + s + ' .mewyse-table-wrapper table td > pre, ' + s + ' .mewyse-table-wrapper table td > ul, ' + s + ' .mewyse-table-wrapper table td > ol, ' +
        s + ' .mewyse-table-wrapper table th > p, ' + s + ' .mewyse-table-wrapper table th > h1, ' + s + ' .mewyse-table-wrapper table th > h2, ' + s + ' .mewyse-table-wrapper table th > h3, ' +
        s + ' .mewyse-table-wrapper table th > blockquote, ' + s + ' .mewyse-table-wrapper table th > pre, ' + s + ' .mewyse-table-wrapper table th > ul, ' + s + ' .mewyse-table-wrapper table th > ol ' +
        '{ outline: none; width: 100%; min-height: 1em; margin: 0; }\n' +
      s + ' .mewyse-table-wrapper table td > p:focus, ' + s + ' .mewyse-table-wrapper table th > p:focus { background-color: transparent; }\n' +
      s + ' .mewyse-table-wrapper table td > p:empty:before, ' + s + ' .mewyse-table-wrapper table th > p:empty:before { content: attr(data-placeholder); color: var(--mewyse-text-muted); pointer-events: none; }\n' +
      s + ' .mewyse-mention { background-color: #e8f0fe; color: #1a73e8; padding: 2px 6px; border-radius: 4px; font-weight: 500; cursor: default; user-select: all; display: inline; white-space: nowrap; }\n' +
      s + ' .mewyse-mention:hover { background-color: #d2e3fc; }\n' +
      s + ' .mewyse-emoji { display: inline; cursor: default; user-select: all; }\n' +
      s + ' .mewyse-list-group { margin: 0; padding-left: 24px; }\n' +
      s + ' .mewyse-list-group .mewyse-list-group { padding-left: 24px; margin-top: 4px; }\n' +
      s + ' .mewyse-list-group > li.mewyse-block { display: list-item; margin-bottom: 4px; }\n' +
      s + ' .mewyse-list-group > li.mewyse-block:focus { outline: none; }\n' +
      s + ' ul.mewyse-checklist-group { list-style: none; padding-left: 0; }\n' +
      s + ' ul.mewyse-checklist-group > li.mewyse-block { display: flex; align-items: flex-start; gap: 8px; }\n' +
      s + ' ul.mewyse-checklist-group > li.mewyse-block input[type="checkbox"] { margin-top: 4px; flex-shrink: 0; }\n' +
      s + ' ul.mewyse-checklist-group > li.mewyse-block .mewyse-checklist-content { flex: 1; outline: none; }\n' +
      s + ' ul.mewyse-checklist-group > li.mewyse-block.checked .mewyse-checklist-content { text-decoration: line-through; color: #999; }\n' +
      s + ' .mewyse-image-wrapper { display: inline-block; max-width: 100%; margin: 12px 0; }\n' +
      s + ' .mewyse-image-container { position: relative; display: inline-block; }\n' +
      s + ' .mewyse-image { display: block; max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 2px solid transparent; transition: border-color 0.2s ease; }\n' +
      s + ' .mewyse-image-container:hover .mewyse-image { border-color: #4a9eff; }\n' +
      s + ' .mewyse-image.selected { border-color: #4a9eff !important; box-shadow: 0 4px 16px rgba(74,158,255,0.3); cursor: pointer; }\n' +
      s + ' .mewyse-image-edit-btn { position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.95); border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px; cursor: pointer; opacity: 0; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(0,0,0,0.15); z-index: 2; display: flex; align-items: center; justify-content: center; color: #555; }\n' +
      s + ' .mewyse-image-edit-btn svg { width: 16px; height: 16px; }\n' +
      s + ' .mewyse-image-container:hover .mewyse-image-edit-btn { opacity: 1; }\n' +
      s + ' .mewyse-image-edit-btn:hover { background: #fff; color: #333; border-color: #999; transform: scale(1.05); }\n' +
      s + ' .mewyse-image-resize-handle { position: absolute; bottom: 0; right: 0; width: 16px; height: 16px; background: #4a9eff; border: 2px solid #fff; border-radius: 2px; cursor: nwse-resize; opacity: 0; transition: all 0.2s ease; box-shadow: 0 2px 6px rgba(0,0,0,0.2); z-index: 2; }\n' +
      s + ' .mewyse-image-container:hover .mewyse-image-resize-handle { opacity: 1; }\n' +
      s + ' .mewyse-image-resize-handle:hover { background: #3a8eef; transform: scale(1.1); }\n' +
      s + ' .mewyse-image-resizing { user-select: none; }\n' +
      s + ' .mewyse-image-resizing .mewyse-image { pointer-events: none; }\n';

    var style = document.createElement('style');
    style.setAttribute('data-mewyse-instance', id);
    style.textContent = css;
    document.head.appendChild(style);
    this._contentStyleElement = style;
  };

  /**
   * Elimina los estilos de contenido inyectados
   */
  meWYSE.prototype._removeContentStyles = function() {
    if (this._contentStyleElement && this._contentStyleElement.parentNode) {
      this._contentStyleElement.parentNode.removeChild(this._contentStyleElement);
      this._contentStyleElement = null;
    }
  };

  // =========================================================================
  // MOVER BLOQUE ARRIBA/ABAJO
  // =========================================================================

  /**
   * Obtiene el ID del bloque con foco actual
   * @returns {number|null}
   */
  meWYSE.prototype._getFocusedBlockId = function() {
    var el = this.lastFocusedElement || document.activeElement;
    if (!el) return null;
    var blockEl = el.closest ? el.closest('[data-block-id]') : null;
    if (!blockEl) return null;
    return parseInt(blockEl.getAttribute('data-block-id'));
  };

  /**
   * Mueve el bloque con foco una posición arriba
   */
  meWYSE.prototype.moveBlockUp = function() {
    var blockId = this._getFocusedBlockId();
    if (blockId === null) return;
    var index = this.getBlockIndex(blockId);
    if (index <= 0) return;
    var targetId = this.blocks[index - 1].id;
    this.moveBlock(blockId, targetId);
    // Re-enfocar el bloque movido
    var self = this;
    requestAnimationFrame(function() {
      var el = self.container.querySelector('[data-block-id="' + blockId + '"] [contenteditable="true"]');
      if (el) el.focus();
    });
    this._updateMoveButtons();
  };

  /**
   * Mueve el bloque con foco una posición abajo
   */
  meWYSE.prototype.moveBlockDown = function() {
    var blockId = this._getFocusedBlockId();
    if (blockId === null) return;
    var index = this.getBlockIndex(blockId);
    if (index === -1 || index >= this.blocks.length - 1) return;
    // Para mover abajo, el target es el bloque dos posiciones adelante (o fin)
    var targetIndex = index + 2;
    if (targetIndex < this.blocks.length) {
      this.moveBlock(blockId, this.blocks[targetIndex].id);
    } else {
      // Mover al final: splice manual
      this.pushHistory(true);
      var block = this.blocks.splice(index, 1)[0];
      this.blocks.push(block);
      this.render();
      this.triggerChange();
    }
    // Re-enfocar el bloque movido
    var self = this;
    requestAnimationFrame(function() {
      var el = self.container.querySelector('[data-block-id="' + blockId + '"] [contenteditable="true"]');
      if (el) el.focus();
    });
    this._updateMoveButtons();
  };

  /**
   * Actualiza el estado enabled/disabled de los botones de mover
   */
  meWYSE.prototype._updateMoveButtons = function() {
    if (!this.moveUpButton || !this.moveDownButton) return;
    var blockId = this._getFocusedBlockId();
    if (blockId === null) {
      this.moveUpButton.disabled = true;
      this.moveDownButton.disabled = true;
      return;
    }
    var index = this.getBlockIndex(blockId);
    this.moveUpButton.disabled = (index <= 0);
    this.moveDownButton.disabled = (index === -1 || index >= this.blocks.length - 1);
  };

  // =========================================================================
  // HELPERS DE TEMA
  // =========================================================================

  /**
   * Aplica un tema al editor y sus elementos
   * @param {string} theme - nombre del tema (ej: 'dark')
   */
  meWYSE.prototype._applyTheme = function(theme) {
    var themeClass = 'mewyse-editor-' + theme;
    if (this.container) {
      this.container.classList.add(themeClass);
    }
    if (this.toolbar && this.toolbar.parentNode) {
      this.toolbar.parentNode.classList.add(themeClass);
    }
    this.options.theme = theme;
  };

  /**
   * Elimina un tema del editor y sus elementos
   * @param {string} theme - nombre del tema a eliminar
   */
  meWYSE.prototype._removeTheme = function(theme) {
    var themeClass = 'mewyse-editor-' + theme;
    if (this.container) {
      this.container.classList.remove(themeClass);
    }
    if (this.toolbar && this.toolbar.parentNode) {
      this.toolbar.parentNode.classList.remove(themeClass);
    }
    this.options.theme = null;
  };

  /**
   * Devuelve true si el editor está en modo dark
   */
  meWYSE.prototype._isDark = function() {
    return this.options.theme === 'dark';
  };

  // =========================================================================
  // HELPERS COMPARTIDOS DE MENÚS
  // =========================================================================

  /**
   * Aplica la clase dark a un menú flotante si el editor está en dark mode
   * @param {HTMLElement} menuElement
   */
  meWYSE.prototype._applyMenuTheme = function(menuElement) {
    if (this._isDark()) {
      menuElement.classList.add('mewyse-dark');
    }
  };

  /**
   * Cierra un menú genérico: cancela anchor, remueve del DOM, nullifica referencia
   * @param {string} menuProp - nombre de la propiedad del menú (ej: 'slashMenu')
   */
  meWYSE.prototype._closeMenu = function(menuProp) {
    var menu = this[menuProp];
    if (menu) {
      if (menu._cancelAnchor) {
        menu._cancelAnchor();
      }
      menu.remove();
      this[menuProp] = null;
    }
  };

  /**
   * Navega un menú genérico hacia arriba o abajo con wrapping
   * @param {string} menuProp - propiedad del menú
   * @param {string} itemSelector - selector CSS de los items
   * @param {string} indexProp - propiedad del índice seleccionado
   * @param {string} updateMethod - nombre del método de actualización visual
   * @param {string} direction - 'up' o 'down'
   */
  meWYSE.prototype._navigateMenu = function(menuProp, itemSelector, indexProp, updateMethod, direction) {
    var menu = this[menuProp];
    if (!menu) return;

    var visibleItems = menu.querySelectorAll(itemSelector + ':not([style*="display: none"])');
    if (visibleItems.length === 0) return;

    if (direction === 'up') {
      this[indexProp]--;
      if (this[indexProp] < 0) {
        this[indexProp] = visibleItems.length - 1;
      }
    } else {
      this[indexProp]++;
      if (this[indexProp] >= visibleItems.length) {
        this[indexProp] = 0;
      }
    }

    this[updateMethod]();
  };

  /**
   * Enfoca el editor (primer bloque o bloque especificado)
   * @param {number} [blockId] - ID del bloque a enfocar. Sin parámetro, enfoca el primer bloque.
   */
  meWYSE.prototype.focus = function(blockId) {
    var targetId = (blockId !== undefined) ? blockId : (this.blocks.length > 0 ? this.blocks[0].id : null);
    if (targetId === null) return;

    var blockElement = this.container.querySelector('[data-block-id="' + targetId + '"]');
    if (blockElement) {
      var contentEditable = blockElement.querySelector('[contenteditable="true"]');
      if (!contentEditable && blockElement.contentEditable === 'true') {
        contentEditable = blockElement;
      }
      if (contentEditable) {
        contentEditable.focus();
      }
    }
  };

  /**
   * ============================================
   * FULLSCREEN MODE
   * ============================================
   * Alterna el modo pantalla completa del editor
   */
  meWYSE.prototype.toggleFullscreen = function() {
    if (this.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  };

  meWYSE.prototype.enterFullscreen = function() {
    // Determinar qué elemento expandir: wrapper si hay toolbar, container si no
    var target = this.editorWrapper || this.container;
    if (!target) return;

    target.classList.add('mewyse-fullscreen');
    document.body.classList.add('mewyse-fullscreen-lock');
    this.isFullscreen = true;

    if (this.fullscreenButton) {
      this.fullscreenButton.innerHTML = WYSIWYG_ICONS.fullscreenExit;
      this.fullscreenButton.title = this.t('tooltips.fullscreenExit');
      this.fullscreenButton.setAttribute('aria-label', this.t('tooltips.fullscreenExit'));
      this.fullscreenButton.setAttribute('aria-pressed', 'true');
      this.fullscreenButton.classList.add('active');
    }

    // Escape para salir
    var self = this;
    this._fullscreenEscHandler = function(e) {
      if (e.key === 'Escape' && self.isFullscreen && !self.findReplaceDialog) {
        self.exitFullscreen();
      }
    };
    document.addEventListener('keydown', this._fullscreenEscHandler);
  };

  meWYSE.prototype.exitFullscreen = function() {
    var target = this.editorWrapper || this.container;
    if (!target) return;

    target.classList.remove('mewyse-fullscreen');
    document.body.classList.remove('mewyse-fullscreen-lock');
    this.isFullscreen = false;

    if (this.fullscreenButton) {
      this.fullscreenButton.innerHTML = WYSIWYG_ICONS.fullscreen;
      this.fullscreenButton.title = this.t('tooltips.fullscreen');
      this.fullscreenButton.setAttribute('aria-label', this.t('tooltips.fullscreen'));
      this.fullscreenButton.setAttribute('aria-pressed', 'false');
      this.fullscreenButton.classList.remove('active');
    }

    if (this._fullscreenEscHandler) {
      document.removeEventListener('keydown', this._fullscreenEscHandler);
      this._fullscreenEscHandler = null;
    }
  };

  /**
   * ============================================
   * SHOW BLOCKS (Debug view)
   * ============================================
   * Alterna la visualización de bordes en cada bloque
   */
  meWYSE.prototype.toggleShowBlocks = function() {
    this.showingBlocks = !this.showingBlocks;
    if (this.container) {
      this.container.classList.toggle('mewyse-show-blocks', this.showingBlocks);
    }
  };

  /**
   * ============================================
   * CHARACTER COUNTER BAR
   * ============================================
   * Crea la barra inferior con contador de palabras, caracteres y tiempo de lectura
   */
  meWYSE.prototype.createCharCounterBar = function() {
    var bar = document.createElement('div');
    bar.className = 'mewyse-char-counter';
    if (this.options.theme) {
      bar.classList.add('mewyse-editor-' + this.options.theme);
    }
    bar.setAttribute('role', 'status');
    bar.setAttribute('aria-live', 'polite');

    bar.innerHTML =
      '<span class="mewyse-char-counter-item"><span class="label">' + this.t('counter.words') + ':</span> <span class="value" data-counter="words">0</span></span>' +
      '<span class="mewyse-char-counter-item"><span class="label">' + this.t('counter.characters') + ':</span> <span class="value" data-counter="chars">0</span></span>' +
      '<span class="mewyse-char-counter-item"><span class="label">' + this.t('counter.readingTime') + ':</span> <span class="value" data-counter="time">0 min</span></span>';

    return bar;
  };

  /**
   * Actualiza los valores del contador
   */
  meWYSE.prototype.updateCharCounter = function() {
    if (!this.showCharCounter || !this.charCounterBar) return;

    var words = this.getWordCount ? this.getWordCount() : 0;
    var chars = this.getCharacterCount ? this.getCharacterCount() : 0;
    var readingTime = this.getReadingTime ? this.getReadingTime() : 0;

    var wordsEl = this.charCounterBar.querySelector('[data-counter="words"]');
    var charsEl = this.charCounterBar.querySelector('[data-counter="chars"]');
    var timeEl = this.charCounterBar.querySelector('[data-counter="time"]');

    if (wordsEl) wordsEl.textContent = words;
    if (charsEl) charsEl.textContent = chars;
    if (timeEl) timeEl.textContent = readingTime + ' min';
  };

  /**
   * ============================================
   * FIND & REPLACE
   * ============================================
   * Muestra el diálogo de buscar y reemplazar
   */
  meWYSE.prototype.showFindReplace = function() {
    if (this.findReplaceDialog) {
      // Ya abierto: enfocar el campo
      var input = this.findReplaceDialog.querySelector('.mewyse-fr-find-input');
      if (input) input.focus();
      return;
    }

    var self = this;
    var t = function(key) { return self.t('findReplace.' + key); };

    var dialog = document.createElement('div');
    dialog.className = 'mewyse-find-replace';
    if (this.options.theme) {
      dialog.classList.add('mewyse-dark');
    }
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-label', t('title'));

    dialog.innerHTML =
      '<div class="mewyse-fr-header">' +
        '<span class="mewyse-fr-title">' + t('title') + '</span>' +
        '<button class="mewyse-fr-close" aria-label="' + t('close') + '" title="' + t('close') + '">' + WYSIWYG_ICONS.close + '</button>' +
      '</div>' +
      '<div class="mewyse-fr-row">' +
        '<input type="text" class="mewyse-fr-find-input" placeholder="' + t('findPlaceholder') + '" aria-label="' + t('findPlaceholder') + '">' +
        '<span class="mewyse-fr-counter" aria-live="polite">0</span>' +
      '</div>' +
      '<div class="mewyse-fr-row">' +
        '<input type="text" class="mewyse-fr-replace-input" placeholder="' + t('replacePlaceholder') + '" aria-label="' + t('replacePlaceholder') + '">' +
      '</div>' +
      '<div class="mewyse-fr-options">' +
        '<label><input type="checkbox" class="mewyse-fr-case"> ' + t('caseSensitive') + '</label>' +
        '<label><input type="checkbox" class="mewyse-fr-whole"> ' + t('wholeWord') + '</label>' +
      '</div>' +
      '<div class="mewyse-fr-actions">' +
        '<button class="mewyse-fr-btn mewyse-fr-prev" title="' + t('findPrev') + '" aria-label="' + t('findPrev') + '">' + WYSIWYG_ICONS.arrowUp + '</button>' +
        '<button class="mewyse-fr-btn mewyse-fr-next" title="' + t('findNext') + '" aria-label="' + t('findNext') + '">' + WYSIWYG_ICONS.arrowDown + '</button>' +
        '<button class="mewyse-fr-btn mewyse-fr-replace">' + t('replace') + '</button>' +
        '<button class="mewyse-fr-btn mewyse-fr-replace-all">' + t('replaceAll') + '</button>' +
      '</div>';

    document.body.appendChild(dialog);
    this.findReplaceDialog = dialog;
    this.findReplaceState = { matches: [], currentIndex: -1 };

    // Posicionar en top-right del editor
    this._positionFindReplace();

    // Event bindings
    var findInput = dialog.querySelector('.mewyse-fr-find-input');
    var replaceInput = dialog.querySelector('.mewyse-fr-replace-input');
    var caseInput = dialog.querySelector('.mewyse-fr-case');
    var wholeInput = dialog.querySelector('.mewyse-fr-whole');

    findInput.addEventListener('input', function() { self._searchInEditor(); });
    caseInput.addEventListener('change', function() { self._searchInEditor(); });
    wholeInput.addEventListener('change', function() { self._searchInEditor(); });

    findInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) self._findNavigate(-1);
        else self._findNavigate(1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        self.closeFindReplace();
      }
    });
    replaceInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        self._replaceCurrent();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        self.closeFindReplace();
      }
    });

    dialog.querySelector('.mewyse-fr-close').onclick = function() { self.closeFindReplace(); };
    dialog.querySelector('.mewyse-fr-prev').onclick = function() { self._findNavigate(-1); };
    dialog.querySelector('.mewyse-fr-next').onclick = function() { self._findNavigate(1); };
    dialog.querySelector('.mewyse-fr-replace').onclick = function() { self._replaceCurrent(); };
    dialog.querySelector('.mewyse-fr-replace-all').onclick = function() { self._replaceAll(); };

    setTimeout(function() { findInput.focus(); }, 10);

    this._showBackdrop('findReplace', function() { self.closeFindReplace(); });
  };

  meWYSE.prototype._positionFindReplace = function() {
    if (!this.findReplaceDialog || !this.container) return;
    var rect;
    // En fullscreen posicionar respecto al viewport
    if (this.isFullscreen) {
      this.findReplaceDialog.style.position = 'fixed';
      this.findReplaceDialog.style.top = '16px';
      this.findReplaceDialog.style.right = '16px';
      this.findReplaceDialog.style.left = 'auto';
      return;
    }
    this.findReplaceDialog.style.position = 'absolute';
    rect = this.container.getBoundingClientRect();
    this.findReplaceDialog.style.top = (rect.top + window.scrollY + 8) + 'px';
    this.findReplaceDialog.style.left = (rect.right + window.scrollX - 360) + 'px';
    this.findReplaceDialog.style.right = 'auto';
  };

  meWYSE.prototype.closeFindReplace = function() {
    this._clearSearchHighlights();
    if (this.findReplaceDialog) {
      this.findReplaceDialog.remove();
      this.findReplaceDialog = null;
    }
    this.findReplaceState = null;
    this._hideBackdrop('findReplace');
  };

  meWYSE.prototype._clearSearchHighlights = function() {
    if (!this.container) return;
    var highlights = this.container.querySelectorAll('.mewyse-search-highlight');
    for (var i = 0; i < highlights.length; i++) {
      var h = highlights[i];
      var parent = h.parentNode;
      while (h.firstChild) parent.insertBefore(h.firstChild, h);
      parent.removeChild(h);
      parent.normalize();
    }
  };

  meWYSE.prototype._searchInEditor = function() {
    if (!this.findReplaceDialog) return;
    this._clearSearchHighlights();

    var query = this.findReplaceDialog.querySelector('.mewyse-fr-find-input').value;
    var caseSensitive = this.findReplaceDialog.querySelector('.mewyse-fr-case').checked;
    var wholeWord = this.findReplaceDialog.querySelector('.mewyse-fr-whole').checked;
    var counter = this.findReplaceDialog.querySelector('.mewyse-fr-counter');

    if (!query) {
      counter.textContent = '0';
      this.findReplaceState = { matches: [], currentIndex: -1 };
      return;
    }

    // Construir regex segura
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (wholeWord) escaped = '\\b' + escaped + '\\b';
    var flags = caseSensitive ? 'g' : 'gi';
    var regex;
    try { regex = new RegExp(escaped, flags); } catch (e) { return; }

    // Iterar por todos los text nodes del editor y envolver matches
    var matches = [];
    var walker = document.createTreeWalker(this.container, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) {
      // No buscar dentro de elementos ya highlight
      if (n.parentNode && !n.parentNode.closest('.mewyse-search-highlight')) {
        textNodes.push(n);
      }
    }

    for (var i = 0; i < textNodes.length; i++) {
      var tn = textNodes[i];
      var text = tn.textContent;
      if (!text) continue;
      var local = new RegExp(escaped, flags);
      var m, lastIndex = 0;
      var parent = tn.parentNode;
      if (!parent) continue;
      var frag = document.createDocumentFragment();
      var found = false;
      while ((m = local.exec(text)) !== null) {
        if (m.index > lastIndex) {
          frag.appendChild(document.createTextNode(text.substring(lastIndex, m.index)));
        }
        var span = document.createElement('span');
        span.className = 'mewyse-search-highlight';
        span.textContent = m[0];
        frag.appendChild(span);
        matches.push(span);
        lastIndex = m.index + m[0].length;
        found = true;
        // Evitar bucle infinito con regex de match vacío
        if (m[0].length === 0) local.lastIndex++;
      }
      if (found) {
        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        parent.replaceChild(frag, tn);
      }
    }

    this.findReplaceState = {
      matches: matches,
      currentIndex: matches.length > 0 ? 0 : -1
    };
    this._highlightCurrentMatch();
    this._updateFindCounter();
  };

  meWYSE.prototype._highlightCurrentMatch = function() {
    if (!this.findReplaceState) return;
    var matches = this.findReplaceState.matches;
    for (var i = 0; i < matches.length; i++) {
      matches[i].classList.remove('current');
    }
    var idx = this.findReplaceState.currentIndex;
    if (idx >= 0 && idx < matches.length) {
      matches[idx].classList.add('current');
      try { matches[idx].scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {}
    }
  };

  meWYSE.prototype._updateFindCounter = function() {
    if (!this.findReplaceDialog || !this.findReplaceState) return;
    var counter = this.findReplaceDialog.querySelector('.mewyse-fr-counter');
    var total = this.findReplaceState.matches.length;
    if (total === 0) {
      counter.textContent = this.t('findReplace.noMatches');
    } else {
      counter.textContent = this.t('findReplace.matchesCount', {
        current: this.findReplaceState.currentIndex + 1,
        total: total
      });
    }
  };

  meWYSE.prototype._findNavigate = function(dir) {
    if (!this.findReplaceState || this.findReplaceState.matches.length === 0) return;
    var total = this.findReplaceState.matches.length;
    this.findReplaceState.currentIndex =
      (this.findReplaceState.currentIndex + dir + total) % total;
    this._highlightCurrentMatch();
    this._updateFindCounter();
  };

  meWYSE.prototype._replaceCurrent = function() {
    if (!this.findReplaceState || this.findReplaceState.currentIndex < 0) return;
    var idx = this.findReplaceState.currentIndex;
    var span = this.findReplaceState.matches[idx];
    if (!span || !span.parentNode) return;

    var replaceInput = this.findReplaceDialog.querySelector('.mewyse-fr-replace-input');
    var replacement = replaceInput ? replaceInput.value : '';

    this.pushHistory(true);

    // Reemplazar el span por un text node con el nuevo valor
    var parent = span.parentNode;
    var textNode = document.createTextNode(replacement);
    parent.replaceChild(textNode, span);
    parent.normalize();

    // Actualizar el bloque correspondiente en el array de blocks
    var blockElement = parent.closest && parent.closest('[data-block-id]');
    if (blockElement) {
      var blockId = parseInt(blockElement.getAttribute('data-block-id'));
      var contentEditable = blockElement.querySelector('[contenteditable="true"]') ||
                            (blockElement.getAttribute('contenteditable') === 'true' ? blockElement : null);
      if (contentEditable) {
        this.updateBlockContent(blockId, contentEditable.innerHTML);
      }
    }

    // Re-buscar para actualizar posiciones
    this._searchInEditor();
    this.triggerChange();
  };

  meWYSE.prototype._replaceAll = function() {
    if (!this.findReplaceState || this.findReplaceState.matches.length === 0) return;
    var replaceInput = this.findReplaceDialog.querySelector('.mewyse-fr-replace-input');
    var replacement = replaceInput ? replaceInput.value : '';
    var count = this.findReplaceState.matches.length;

    this.pushHistory(true);

    // Recolectar bloques afectados para actualizar el modelo después
    var affectedBlockIds = {};
    for (var i = 0; i < this.findReplaceState.matches.length; i++) {
      var span = this.findReplaceState.matches[i];
      if (!span || !span.parentNode) continue;

      var blockElement = span.parentNode.closest && span.parentNode.closest('[data-block-id]');
      if (blockElement) {
        affectedBlockIds[blockElement.getAttribute('data-block-id')] = blockElement;
      }

      var parent = span.parentNode;
      parent.replaceChild(document.createTextNode(replacement), span);
      parent.normalize();
    }

    // Actualizar el modelo
    for (var id in affectedBlockIds) {
      if (affectedBlockIds.hasOwnProperty(id)) {
        var el = affectedBlockIds[id];
        var ce = el.querySelector('[contenteditable="true"]') ||
                 (el.getAttribute('contenteditable') === 'true' ? el : null);
        if (ce) {
          this.updateBlockContent(parseInt(id), ce.innerHTML);
        }
      }
    }

    // Feedback al usuario via contador
    if (this.findReplaceDialog) {
      var counter = this.findReplaceDialog.querySelector('.mewyse-fr-counter');
      counter.textContent = this.t('findReplace.replacedCount', { count: count });
    }

    this.findReplaceState = { matches: [], currentIndex: -1 };
    this.triggerChange();
  };

  /**
   * ============================================
   * SANITIZACIÓN (XSS PROTECTION)
   * ============================================
   * Whitelist estricto aplicado a todo block.content que entra al modelo.
   * Ver plan en /plans/refactored-beaming-turing.md.
   */

  // Tags que se eliminan completamente (con su contenido)
  var DANGEROUS_TAGS = {
    'SCRIPT': 1, 'STYLE': 1, 'IFRAME': 1, 'OBJECT': 1, 'EMBED': 1,
    'FORM': 1, 'INPUT': 1, 'BUTTON': 1, 'TEXTAREA': 1, 'SELECT': 1,
    'OPTION': 1, 'META': 1, 'LINK': 1, 'BASE': 1, 'SVG': 1, 'MATH': 1,
    'VIDEO': 1, 'AUDIO': 1, 'SOURCE': 1, 'TRACK': 1, 'PORTAL': 1
  };

  // Tags inline permitidos en cualquier bloque
  var INLINE_TAGS = {
    'B': 1, 'STRONG': 1, 'I': 1, 'EM': 1, 'U': 1, 'S': 1, 'STRIKE': 1,
    'DEL': 1, 'CODE': 1, 'MARK': 1, 'SUB': 1, 'SUP': 1, 'BR': 1,
    'A': 1, 'SPAN': 1, 'FONT': 1
  };

  // Tags de estructura dentro de celdas de tabla
  var BLOCK_TAGS_IN_CELL = {
    'P': 1, 'H1': 1, 'H2': 1, 'H3': 1, 'H4': 1, 'H5': 1, 'H6': 1,
    'BLOCKQUOTE': 1, 'PRE': 1, 'UL': 1, 'OL': 1, 'LI': 1, 'DIV': 1
  };

  // Tags de tabla
  var TABLE_TAGS = {
    'TABLE': 1, 'TBODY': 1, 'THEAD': 1, 'TFOOT': 1, 'TR': 1,
    'TD': 1, 'TH': 1, 'COLGROUP': 1, 'COL': 1, 'CAPTION': 1
  };

  // Whitelist de atributos por tag (además de los comunes globales)
  var ATTR_WHITELIST = {
    'A': { 'href': 1, 'title': 1, 'target': 1, 'rel': 1 },
    'SPAN': { 'class': 1, 'style': 1, 'contenteditable': 1,
              'data-mention-id': 1, 'data-mention-name': 1,
              'data-name': 1, 'data-type': 1 },
    'FONT': { 'color': 1, 'face': 1, 'size': 1 },
    'TD': { 'colspan': 1, 'rowspan': 1, 'style': 1 },
    'TH': { 'colspan': 1, 'rowspan': 1, 'style': 1 },
    'TABLE': { 'style': 1 },
    'COL': { 'span': 1, 'style': 1 },
    'IMG': { 'src': 1, 'alt': 1, 'width': 1, 'height': 1, 'title': 1 },
    'IFRAME': { 'src': 1, 'width': 1, 'height': 1, 'frameborder': 1, 'allowfullscreen': 1, 'allow': 1, 'title': 1 },
    'VIDEO': { 'src': 1, 'width': 1, 'height': 1, 'controls': 1, 'poster': 1, 'preload': 1 },
    'AUDIO': { 'src': 1, 'controls': 1, 'preload': 1 },
    'SOURCE': { 'src': 1, 'type': 1 }
  };

  // Clases CSS permitidas en SPAN (whitelisted por meWYSE)
  var ALLOWED_SPAN_CLASSES = {
    'mewyse-mention': 1,
    'mewyse-emoji': 1,
    'mewyse-search-highlight': 1
  };

  // Propiedades CSS permitidas en el atributo style
  var ALLOWED_CSS_PROPS = {
    'color': 1, 'background-color': 1, 'background': 1,
    'font-weight': 1, 'font-style': 1, 'font-size': 1, 'font-family': 1,
    'text-decoration': 1, 'text-align': 1,
    'width': 1, 'height': 1, 'min-width': 1, 'min-height': 1,
    'max-width': 1, 'max-height': 1,
    'padding': 1, 'padding-top': 1, 'padding-right': 1,
    'padding-bottom': 1, 'padding-left': 1,
    'margin': 1, 'margin-top': 1, 'margin-right': 1,
    'margin-bottom': 1, 'margin-left': 1,
    'border': 1, 'border-color': 1, 'border-width': 1, 'border-style': 1,
    'border-collapse': 1, 'border-spacing': 1,
    'vertical-align': 1
  };

  // Tipos de bloque válidos
  var VALID_BLOCK_TYPES = {
    'paragraph': 1, 'heading1': 1, 'heading2': 1, 'heading3': 1,
    'quote': 1, 'code': 1, 'bulletList': 1, 'numberList': 1,
    'checklist': 1, 'table': 1, 'image': 1, 'divider': 1,
    'video': 1, 'audio': 1
  };

  /**
   * Valida un URL contra esquemas peligrosos (XSS via javascript:)
   * Permite: http(s), mailto, tel, relativos (/, ./, ../), anchors (#), sin protocolo
   * Bloquea: javascript:, vbscript:, data:text/html, file:
   */
  meWYSE.prototype._isSafeUrl = function(url) {
    if (!url || typeof url !== 'string') return false;
    var trimmed = url.trim().toLowerCase();
    // Bloquear esquemas peligrosos (con o sin espacios/control chars al inicio)
    // Normalizar: eliminar caracteres de control (tabs, newlines) que eluden filtros
    var normalized = trimmed.replace(/[\x00-\x20]/g, '');
    if (normalized.indexOf('javascript:') === 0) return false;
    if (normalized.indexOf('vbscript:') === 0) return false;
    if (normalized.indexOf('livescript:') === 0) return false;
    if (normalized.indexOf('data:text/html') === 0) return false;
    if (normalized.indexOf('data:application') === 0) return false;
    if (normalized.indexOf('file:') === 0) return false;
    return true;
  };

  /**
   * Valida URL de imagen: solo http(s) y data:image/*
   */
  meWYSE.prototype._isSafeImageUrl = function(url) {
    if (!url || typeof url !== 'string') return false;
    var normalized = url.trim().toLowerCase().replace(/[\x00-\x20]/g, '');
    if (normalized.indexOf('http://') === 0) return true;
    if (normalized.indexOf('https://') === 0) return true;
    if (normalized.indexOf('data:image/') === 0) return true;
    // Rutas relativas
    if (normalized.indexOf('/') === 0 || normalized.indexOf('./') === 0 ||
        normalized.indexOf('../') === 0) return true;
    return false;
  };

  /**
   * Sanitiza un string de CSS style, devolviendo solo las propiedades seguras
   */
  meWYSE.prototype._sanitizeStyle = function(styleStr) {
    if (!styleStr || typeof styleStr !== 'string') return '';
    var parts = styleStr.split(';');
    var clean = [];
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var colonIdx = part.indexOf(':');
      if (colonIdx < 0) continue;
      var prop = part.substring(0, colonIdx).trim().toLowerCase();
      var value = part.substring(colonIdx + 1).trim();
      if (!ALLOWED_CSS_PROPS[prop]) continue;
      // Bloquear valores peligrosos
      var valueLower = value.toLowerCase();
      if (valueLower.indexOf('url(') >= 0) continue;
      if (valueLower.indexOf('expression(') >= 0) continue;
      if (valueLower.indexOf('@import') >= 0) continue;
      if (valueLower.indexOf('javascript:') >= 0) continue;
      if (valueLower.indexOf('vbscript:') >= 0) continue;
      if (value.indexOf('<') >= 0 || value.indexOf('>') >= 0) continue;
      // value razonablemente corto (anti-DoS)
      if (value.length > 200) continue;
      clean.push(prop + ': ' + value);
    }
    return clean.join('; ');
  };

  /**
   * ============================================
   * IMAGE PIPELINE
   * ============================================
   * Helpers centralizados para validación de tamaño y upload de imágenes.
   * Usados por insertImageBlock (toolbar), paste de imagen, drag&drop.
   */

  /**
   * Formatea bytes en una unidad legible (KB/MB).
   */
  meWYSE.prototype._formatFileSize = function(bytes) {
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(bytes % 1048576 === 0 ? 0 : 1) + ' MB';
    if (bytes >= 1024) return Math.round(bytes / 1024) + ' KB';
    return bytes + ' B';
  };

  /**
   * Valida que un File no supere this.imageMaxSize.
   * Si falla, muestra alert con mensaje configurable y devuelve false.
   * @returns {boolean} true si el archivo es válido
   */
  meWYSE.prototype._validateImageSize = function(file) {
    if (!this.imageMaxSize) return true;
    if (!file || typeof file.size !== 'number') return true;
    if (file.size <= this.imageMaxSize) return true;
    var msg = this.options.imageMaxSizeError ||
              this.t('alerts.imageTooLarge', { size: this._formatFileSize(this.imageMaxSize) });
    try { window.alert(msg); } catch (e) {}
    return false;
  };

  /**
   * Procesa un File de imagen: valida tamaño, obtiene URL final (upload o base64)
   * y resuelve dimensiones. Callback recibe { blob, fileName, width, height } o null si rechaza.
   *
   * Si options.onImageUpload está definido, se delega el upload al consumidor.
   * Si no, se convierte a base64 inline (comportamiento por defecto).
   */
  meWYSE.prototype._processImageFile = function(file, callback) {
    var self = this;
    if (!file) { callback(null); return; }
    if (!this._validateImageSize(file)) { callback(null); return; }

    var resolveWithDimensions = function(url, fileName, knownW, knownH) {
      if (knownW && knownH) {
        callback({ blob: url, fileName: fileName, width: knownW, height: knownH });
        return;
      }
      var tmp = new Image();
      tmp.onload = function() {
        callback({ blob: url, fileName: fileName, width: tmp.width, height: tmp.height });
      };
      tmp.onerror = function() {
        callback({ blob: url, fileName: fileName, width: 300, height: 200 });
      };
      tmp.src = url;
    };

    if (typeof this.options.onImageUpload === 'function') {
      // Hook externo: el consumidor sube al servidor y devuelve la URL
      this.options.onImageUpload(file, function(result) {
        if (!result || !result.url) { callback(null); return; }
        resolveWithDimensions(
          result.url,
          result.fileName || file.name,
          result.width, result.height
        );
      });
    } else {
      // Comportamiento por defecto: base64 inline
      var reader = new FileReader();
      reader.onload = function(e) {
        resolveWithDimensions(e.target.result, file.name);
      };
      reader.onerror = function() { callback(null); };
      reader.readAsDataURL(file);
    }
  };

  /**
   * ============================================
   * MEDIA BLOCKS (video / audio)
   * ============================================
   * Soporta embeds de YouTube/Vimeo y archivos nativos (.mp4/.webm/.ogg para video,
   * .mp3/.ogg/.wav para audio). Sin upload local — solo URL externa.
   */

  // Whitelist estricto de hosts permitidos para iframe embeds
  var EMBED_HOSTS = {
    'www.youtube.com': 1, 'youtube.com': 1, 'youtu.be': 1,
    'www.youtube-nocookie.com': 1, 'youtube-nocookie.com': 1,
    'www.vimeo.com': 1, 'vimeo.com': 1, 'player.vimeo.com': 1
  };

  /**
   * Detecta el proveedor y extrae el ID del vídeo desde una URL.
   * @returns {Object|null} { provider: 'youtube'|'vimeo'|'file', videoId: string|null, url: string }
   */
  meWYSE.prototype._detectVideoProvider = function(url) {
    if (!url || typeof url !== 'string') return null;
    var trimmed = url.trim();
    if (!trimmed) return null;

    // YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube-nocookie.com/embed/ID
    var ytMatch = trimmed.match(/(?:(?:www\.)?youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) return { provider: 'youtube', videoId: ytMatch[1], url: trimmed };

    // Vimeo: vimeo.com/ID, player.vimeo.com/video/ID
    var vmMatch = trimmed.match(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/);
    if (vmMatch) return { provider: 'vimeo', videoId: vmMatch[1], url: trimmed };

    // Archivo de vídeo: extensiones comunes
    if (/\.(mp4|webm|ogg|ogv|mov|m4v)($|\?|#)/i.test(trimmed)) {
      return { provider: 'file', videoId: null, url: trimmed };
    }

    return null;
  };

  /**
   * Valida URL de iframe embed: debe ser https y host whitelisted.
   */
  meWYSE.prototype._isSafeEmbedUrl = function(url) {
    if (!url || typeof url !== 'string') return false;
    var m = url.trim().match(/^https:\/\/([^\/]+)/i);
    if (!m) return false;
    return EMBED_HOSTS.hasOwnProperty(m[1].toLowerCase());
  };

  /**
   * Valida URL de media file (video/audio): http(s) o data:video/audio.
   */
  meWYSE.prototype._isSafeMediaUrl = function(url) {
    if (!url || typeof url !== 'string') return false;
    var normalized = url.trim().toLowerCase().replace(/[\x00-\x20]/g, '');
    if (normalized.indexOf('http://') === 0) return true;
    if (normalized.indexOf('https://') === 0) return true;
    if (normalized.indexOf('data:video/') === 0) return true;
    if (normalized.indexOf('data:audio/') === 0) return true;
    return false;
  };

  /**
   * Valida URL de audio file: extensiones comunes + esquema seguro.
   */
  meWYSE.prototype._isAudioUrl = function(url) {
    if (!this._isSafeMediaUrl(url)) return false;
    return /\.(mp3|ogg|oga|wav|m4a|aac|flac)($|\?|#)/i.test(url);
  };

  /**
   * Muestra un modal pidiendo URL para insertar media (video o audio).
   */
  meWYSE.prototype.showMediaUrlModal = function(type, onAccept) {
    var self = this;
    var t = function(key) { return self.t(key); };

    var overlay = document.createElement('div');
    overlay.className = 'mewyse-modal-overlay';
    var modal = document.createElement('div');
    modal.className = 'mewyse-modal-container';
    if (self.options.theme) modal.classList.add('mewyse-editor-' + self.options.theme);

    var title = document.createElement('h3');
    title.className = 'mewyse-modal-title';
    title.textContent = type === 'audio' ? t('modals.insertAudioTitle') : t('modals.insertVideoTitle');
    modal.appendChild(title);

    var inputsContainer = document.createElement('div');
    inputsContainer.className = 'mewyse-modal-inputs';

    var group = document.createElement('div');
    group.className = 'mewyse-modal-input-group';
    var label = document.createElement('label');
    label.textContent = type === 'audio' ? t('modals.audioUrl') : t('modals.videoUrl');
    var urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.className = 'mewyse-modal-input';
    urlInput.placeholder = type === 'audio'
      ? 'https://.../audio.mp3'
      : 'https://www.youtube.com/watch?v=...';
    group.appendChild(label);
    group.appendChild(urlInput);
    inputsContainer.appendChild(group);
    modal.appendChild(inputsContainer);

    var buttons = document.createElement('div');
    buttons.className = 'mewyse-modal-buttons';
    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelBtn.textContent = t('modals.cancel');
    cancelBtn.onclick = function() { document.body.removeChild(overlay); };
    var okBtn = document.createElement('button');
    okBtn.type = 'button';
    okBtn.className = 'mewyse-modal-button mewyse-modal-button-primary';
    okBtn.textContent = t('modals.insert');
    var submit = function() {
      var url = urlInput.value.trim();
      if (!url) return;
      // Validación según tipo
      if (type === 'audio') {
        if (!self._isAudioUrl(url)) {
          try { window.alert(t('alerts.invalidAudioUrl')); } catch (e) {}
          return;
        }
        document.body.removeChild(overlay);
        onAccept({ url: url });
        return;
      }
      // video
      var info = self._detectVideoProvider(url);
      if (!info) {
        try { window.alert(t('alerts.invalidVideoUrl')); } catch (e) {}
        return;
      }
      document.body.removeChild(overlay);
      onAccept(info);
    };
    okBtn.onclick = submit;
    urlInput.onkeydown = function(e) {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
      else if (e.key === 'Escape') { e.preventDefault(); document.body.removeChild(overlay); }
    };

    buttons.appendChild(cancelBtn);
    buttons.appendChild(okBtn);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    setTimeout(function() { urlInput.focus(); }, 10);
  };

  /**
   * Inserta un bloque de vídeo abriendo un modal de URL.
   */
  meWYSE.prototype.insertVideoBlock = function() {
    var self = this;
    var insertIndex = this._getInsertIndexForNewBlock();
    this.showMediaUrlModal('video', function(info) {
      self.pushHistory(true);
      var block = {
        id: ++self.currentBlockId,
        type: 'video',
        content: {
          provider: info.provider,
          videoId: info.videoId,
          url: info.url,
          width: 640,
          height: 360
        }
      };
      self.blocks.splice(insertIndex, 0, block);
      self.render();
      self.triggerChange();
    });
  };

  /**
   * Inserta un bloque de audio abriendo un modal de URL.
   */
  meWYSE.prototype.insertAudioBlock = function() {
    var self = this;
    var insertIndex = this._getInsertIndexForNewBlock();
    this.showMediaUrlModal('audio', function(info) {
      self.pushHistory(true);
      var block = {
        id: ++self.currentBlockId,
        type: 'audio',
        content: {
          url: info.url,
          title: ''
        }
      };
      self.blocks.splice(insertIndex, 0, block);
      self.render();
      self.triggerChange();
    });
  };

  /**
   * Calcula el índice donde insertar un nuevo bloque (después del último enfocado).
   */
  meWYSE.prototype._getInsertIndexForNewBlock = function() {
    var activeElem = this.lastFocusedElement || document.activeElement;
    if (activeElem && activeElem.closest) {
      var blockElement = activeElem.closest('[data-block-id]');
      if (blockElement) {
        var blockId = parseInt(blockElement.getAttribute('data-block-id'), 10);
        if (!isNaN(blockId)) return this.getBlockIndex(blockId) + 1;
      }
    }
    return this.blocks.length;
  };

  /**
   * Crea el elemento DOM para un bloque de video.
   */
  meWYSE.prototype.createVideoElement = function(block) {
    var wrapper = document.createElement('div');
    wrapper.className = 'mewyse-video-wrapper';
    wrapper.contentEditable = 'false';

    var c = block.content || {};
    var media;

    if (c.provider === 'youtube' && c.videoId) {
      media = document.createElement('iframe');
      media.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(c.videoId);
      media.setAttribute('frameborder', '0');
      media.setAttribute('allowfullscreen', 'true');
      media.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    } else if (c.provider === 'vimeo' && c.videoId) {
      media = document.createElement('iframe');
      media.src = 'https://player.vimeo.com/video/' + encodeURIComponent(c.videoId);
      media.setAttribute('frameborder', '0');
      media.setAttribute('allowfullscreen', 'true');
    } else if (c.provider === 'file' && this._isSafeMediaUrl(c.url)) {
      media = document.createElement('video');
      media.controls = true;
      media.src = c.url;
    } else {
      // fallback: placeholder si los datos no son válidos
      media = document.createElement('div');
      media.className = 'mewyse-video-placeholder';
      media.textContent = '(video no disponible)';
    }

    wrapper.appendChild(media);
    return wrapper;
  };

  /**
   * Crea el elemento DOM para un bloque de audio.
   */
  meWYSE.prototype.createAudioElement = function(block) {
    var wrapper = document.createElement('div');
    wrapper.className = 'mewyse-audio-wrapper';
    wrapper.contentEditable = 'false';

    var c = block.content || {};
    if (this._isSafeMediaUrl(c.url)) {
      var audio = document.createElement('audio');
      audio.controls = true;
      audio.src = c.url;
      wrapper.appendChild(audio);
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'mewyse-audio-placeholder';
      placeholder.textContent = '(audio no disponible)';
      wrapper.appendChild(placeholder);
    }

    return wrapper;
  };

  /**
   * ============================================
   * REMOVE FORMAT
   * ============================================
   * Elimina todo el formato inline (bold, italic, color, etc.) de la selección actual.
   * Funciona con selección normal y cross-block selection.
   */
  meWYSE.prototype.removeFormat = function() {
    var self = this;

    // Caso 1: selección cross-block → limpiar cada bloque seleccionado
    if (this.crossBlockSelection && this.crossBlockSelection.blockIds && this.crossBlockSelection.blockIds.length > 0) {
      this.pushHistory(true);
      var ids = this.crossBlockSelection.blockIds.slice();
      for (var i = 0; i < ids.length; i++) {
        var block = this.getBlock(ids[i]);
        if (!block || typeof block.content !== 'string') continue;
        // Convertir HTML a texto plano preservando <br> como \n
        var tmp = document.createElement('div');
        tmp.innerHTML = block.content;
        // Reemplazar <br> por saltos de línea antes de extraer texto
        var brs = tmp.querySelectorAll('br');
        for (var b = 0; b < brs.length; b++) brs[b].replaceWith('\n');
        var plainText = tmp.textContent || '';
        // Escapar HTML del texto resultante
        block.content = escapeHtml(plainText).replace(/\n/g, '<br>');
      }
      this.clearCrossBlockSelection();
      this.render();
      this.triggerChange();
      return;
    }

    // Caso 2: selección normal dentro de un bloque
    var selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    this.pushHistory(true);

    // execCommand removeFormat quita b/i/u/s/font y attrs básicos
    document.execCommand('removeFormat', false, null);

    // execCommand no quita spans con style (colores custom) ni algunas clases.
    // Iterar el bloque actual y desenvolver spans residuales con style.
    var activeElement = document.activeElement;
    var blockElement = activeElement && activeElement.closest ? activeElement.closest('[data-block-id]') : null;
    if (blockElement) {
      var editable = blockElement.querySelector('[contenteditable="true"]') ||
                     (blockElement.getAttribute('contenteditable') === 'true' ? blockElement : null);
      if (editable) {
        self._unwrapResidualFormatting(editable);

        // Persistir en modelo
        var blockId = parseInt(blockElement.getAttribute('data-block-id'), 10);
        if (!isNaN(blockId)) {
          self.updateBlockContent(blockId, editable.innerHTML);
        }
      }
    }

    this.triggerChange();
  };

  /**
   * Desenvuelve spans/fonts/marks residuales tras removeFormat
   * Preserva links (no se consideran "formato")
   */
  meWYSE.prototype._unwrapResidualFormatting = function(root) {
    // Seleccionar spans con style, font, mark, code inline (pero NO dentro de bloques de código)
    var selectors = ['span[style]', 'span.mewyse-search-highlight', 'font', 'mark'];
    for (var s = 0; s < selectors.length; s++) {
      var nodes = root.querySelectorAll(selectors[s]);
      for (var n = nodes.length - 1; n >= 0; n--) {
        var node = nodes[n];
        // Preservar mentions/emojis (tienen clase específica)
        if (node.className && (node.className.indexOf('mewyse-mention') >= 0 ||
                               node.className.indexOf('mewyse-emoji') >= 0)) continue;
        // Desenvolver: mover hijos al padre y eliminar el nodo
        var parent = node.parentNode;
        if (!parent) continue;
        while (node.firstChild) parent.insertBefore(node.firstChild, node);
        parent.removeChild(node);
      }
    }
  };

  // Clases de la UI del editor que NO deben persistir en block.content de tablas
  // (se añaden dinámicamente en createTableElement/addTableControls/enableColumnResizing)
  var EDITOR_UI_CLASSES = [
    'mewyse-table-row-control',
    'mewyse-table-col-control',
    'mewyse-table-resize-handle',
    'mewyse-table-add-row',
    'mewyse-table-add-col',
    'mewyse-cell-selected'
  ];

  /**
   * Limpia el HTML de una tabla (block.content de tipo 'table') de los controles
   * que el editor añade dinámicamente al renderizar. Este método garantiza que
   * block.content contiene solo el markup semántico de la tabla, no la UI del editor.
   *
   * Qué elimina:
   * - <button class="mewyse-table-*-control"> (botones de fila/columna con SVG hamburger)
   * - <div class="mewyse-table-resize-handle"> (handles de redimensionado)
   * - <button class="mewyse-table-add-row|col"> (botones +row/+col)
   * - atributos tabindex="-1", contenteditable="false" en controles ya eliminados
   * - style inline generado por el editor en <td>/<th> (position:relative usado por los controles)
   * - contenteditable="true" y data-placeholder en los <p> de las celdas
   *
   * Preserva:
   * - Estructura <tbody>/<tr>/<td>/<th> + colspan/rowspan
   * - Contenido de texto e inline formatting
   * - Estilos de usuario (color, background-color, border, width, height) — ver _sanitizeStyle
   */
  meWYSE.prototype._cleanTableContent = function(html) {
    if (typeof html !== 'string' || !html) return html;

    // Envolver directamente en <table> — el navegador genera/normaliza tbody según contenido.
    // Si el input ya tiene <tbody>, se usa; si no, lo genera.
    var doc;
    try {
      doc = new DOMParser().parseFromString(
        '<!DOCTYPE html><html><body><table>' + html + '</table></body></html>',
        'text/html'
      );
    } catch (e) {
      return html;
    }
    var table = doc.querySelector('table');
    if (!table) return html;
    // Obtener el tbody (generado por el navegador o presente en el input)
    var tbody = table.querySelector('tbody');
    if (!tbody) {
      // Caso raro: si no hay tbody, trabajar directamente con la tabla
      tbody = table;
    }

    // 1. Eliminar botones/divs con clases de UI del editor
    for (var i = 0; i < EDITOR_UI_CLASSES.length; i++) {
      var uiNodes = tbody.querySelectorAll('.' + EDITOR_UI_CLASSES[i]);
      for (var j = uiNodes.length - 1; j >= 0; j--) {
        if (uiNodes[j].parentNode) uiNodes[j].parentNode.removeChild(uiNodes[j]);
      }
    }

    // 2. Limpiar atributos innecesarios del editor en <td>/<th>
    var cells = tbody.querySelectorAll('td, th');
    for (var c = 0; c < cells.length; c++) {
      var cell = cells[c];
      // Limpiar style: preservar solo propiedades de usuario (background-color, border, etc.)
      // pero eliminar position:relative que pone el editor para los controles
      var styleAttr = cell.getAttribute('style');
      if (styleAttr) {
        var cleanStyle = this._sanitizeStyle(styleAttr);
        // Eliminar también position:relative que es exclusivo del editor
        cleanStyle = cleanStyle.replace(/\bposition\s*:\s*relative\s*;?/gi, '').trim();
        if (cleanStyle) {
          cell.setAttribute('style', cleanStyle);
        } else {
          cell.removeAttribute('style');
        }
      }
    }

    // 3. Limpiar atributos del editor en los <p> dentro de celdas
    var paragraphs = tbody.querySelectorAll('td > p, th > p');
    for (var p = 0; p < paragraphs.length; p++) {
      var para = paragraphs[p];
      para.removeAttribute('contenteditable');
      para.removeAttribute('data-placeholder');
      para.removeAttribute('tabindex');
      // Limpiar style: eliminar padding/margin/min-height del editor
      var pStyle = para.getAttribute('style');
      if (pStyle) {
        // Eliminar las props que el editor fuerza en los <p> de celdas
        pStyle = pStyle
          .replace(/\bpadding\s*:[^;]+;?/gi, '')
          .replace(/\bmargin\s*:[^;]+;?/gi, '')
          .replace(/\bmin-height\s*:[^;]+;?/gi, '')
          .trim();
        if (pStyle && pStyle !== ';') {
          para.setAttribute('style', pStyle);
        } else {
          para.removeAttribute('style');
        }
      }
    }

    return tbody.innerHTML;
  };

  /**
   * Sanitiza HTML string contra whitelist.
   * @param {string} html - HTML a sanitizar
   * @param {Object} opts - { allowTable: boolean, allowImg: boolean }
   * @returns {string} HTML sanitizado seguro para innerHTML
   */
  meWYSE.prototype._sanitizeBlockContent = function(html, opts) {
    if (typeof html !== 'string') return html; // no string: devolver tal cual
    if (html === '') return '';
    opts = opts || {};
    var allowTable = opts.allowTable === true;
    var allowImg = opts.allowImg === true;
    var allowMedia = opts.allowMedia === true;
    var self = this;

    // Parsear en DOM desechable.
    // Si se permite contenido de tabla (tbody/tr/td son hijos), envolver en <table>
    // porque <div> no es un padre válido para ellos y el navegador los descartaría.
    var doc;
    var wrapperOpen, wrapperClose, rootSelector;
    if (allowTable) {
      wrapperOpen = '<table id="__mewyse_root__">';
      wrapperClose = '</table>';
      rootSelector = 'table#__mewyse_root__';
    } else {
      wrapperOpen = '<div id="__mewyse_root__">';
      wrapperClose = '</div>';
      rootSelector = '#__mewyse_root__';
    }
    try {
      doc = new DOMParser().parseFromString(
        '<!DOCTYPE html><html><body>' + wrapperOpen + html + wrapperClose + '</body></html>',
        'text/html'
      );
    } catch (e) {
      return '';
    }
    var root = doc.querySelector(rootSelector);
    if (!root) return '';

    // Recorrer el árbol en profundidad y sanitizar cada elemento
    // Usamos un recorrido manual para poder eliminar/unwrapp nodos con seguridad
    function processNode(node) {
      // Nodo de texto: seguro tal cual
      if (node.nodeType === 3) return;
      // Nodo de comentario: eliminar
      if (node.nodeType === 8) {
        node.parentNode.removeChild(node);
        return;
      }
      if (node.nodeType !== 1) return;

      var tag = node.tagName.toUpperCase();

      // 1. Tag peligroso: eliminar con todos sus hijos
      // Excepción: si allowMedia=true, permitir IFRAME/VIDEO/AUDIO/SOURCE con src validado
      var isMediaTag = (tag === 'IFRAME' || tag === 'VIDEO' || tag === 'AUDIO' || tag === 'SOURCE');
      if (DANGEROUS_TAGS[tag] && !(allowMedia && isMediaTag)) {
        node.parentNode.removeChild(node);
        return;
      }

      // 2. Determinar si el tag está permitido según contexto
      var isAllowed = false;
      if (INLINE_TAGS[tag]) {
        isAllowed = true;
      } else if (allowTable && (TABLE_TAGS[tag] || BLOCK_TAGS_IN_CELL[tag])) {
        isAllowed = true;
      } else if (allowImg && tag === 'IMG') {
        isAllowed = true;
      } else if (allowTable && tag === 'IMG') {
        // Permitir imágenes dentro de celdas de tabla (valida src por seguridad)
        var imgSrc = node.getAttribute('src');
        if (self._isSafeImageUrl(imgSrc)) isAllowed = true;
        if (!isAllowed) { node.parentNode.removeChild(node); return; }
      } else if (allowMedia && isMediaTag) {
        // Validar src según tipo: IFRAME solo whitelist, VIDEO/AUDIO/SOURCE URLs seguras
        var srcAttr = node.getAttribute('src');
        if (tag === 'IFRAME') {
          if (self._isSafeEmbedUrl(srcAttr)) isAllowed = true;
        } else {
          if (self._isSafeMediaUrl(srcAttr)) isAllowed = true;
        }
        if (!isAllowed) {
          // Si no pasa validación, eliminar el nodo completo
          node.parentNode.removeChild(node);
          return;
        }
      }

      // Procesar hijos primero (antes de posible unwrap del padre)
      var child = node.firstChild;
      while (child) {
        var next = child.nextSibling;
        processNode(child);
        child = next;
      }

      if (!isAllowed) {
        // Unwrap: mover hijos al padre y eliminar el nodo.
        //
        // Caso especial — tags block-level (DIV, P, H*, BLOCKQUOTE, PRE, LI,
        // UL, OL, etc.) que se desempacan en un contexto inline: si solo
        // movemos los hijos arriba se pierde el salto de línea visual. Esto
        // afecta especialmente a contenido pegado o a Shift+Enter en algunos
        // navegadores que insertan <div> en lugar de <br>. Insertamos <br>
        // antes y/o después de los hijos para preservar la separación.
        var blockUnwrap = {
          DIV: 1, P: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1,
          BLOCKQUOTE: 1, PRE: 1, LI: 1, UL: 1, OL: 1, DL: 1, DT: 1, DD: 1,
          ARTICLE: 1, SECTION: 1, ASIDE: 1, HEADER: 1, FOOTER: 1, NAV: 1
        };
        var parent = node.parentNode;
        if (parent) {
          var needsBr = blockUnwrap[tag] && !!node.firstChild;
          if (needsBr) {
            var prev = node.previousSibling;
            var prevIsBr = prev && prev.nodeType === 1 && prev.tagName === 'BR';
            if (prev && !prevIsBr) {
              parent.insertBefore(doc.createElement('br'), node);
            }
          }
          while (node.firstChild) {
            parent.insertBefore(node.firstChild, node);
          }
          if (needsBr) {
            // Tras mover los hijos, node sigue ocupando su posición original
            // (los hijos quedaron antes). Su nextSibling es el original.
            var next = node.nextSibling;
            var nextIsBr = next && next.nodeType === 1 && next.tagName === 'BR';
            if (next && !nextIsBr) {
              parent.insertBefore(doc.createElement('br'), node);
            }
          }
          parent.removeChild(node);
        }
        return;
      }

      // 3. Tag permitido: limpiar atributos
      var tagWhitelist = ATTR_WHITELIST[tag] || {};
      // Recorrer atributos a la inversa (mutación segura)
      for (var i = node.attributes.length - 1; i >= 0; i--) {
        var attr = node.attributes[i];
        var attrName = attr.name.toLowerCase();

        // Event handlers: eliminar siempre (doble seguridad)
        if (attrName.indexOf('on') === 0) {
          node.removeAttribute(attr.name);
          continue;
        }
        // xmlns: eliminar
        if (attrName.indexOf('xmlns') === 0) {
          node.removeAttribute(attr.name);
          continue;
        }
        // Atributo no whitelisteado
        if (!tagWhitelist[attrName]) {
          node.removeAttribute(attr.name);
          continue;
        }

        // Validaciones especiales
        if (tag === 'A' && attrName === 'href') {
          if (!self._isSafeUrl(attr.value)) {
            node.setAttribute('href', '#');
          }
        } else if (tag === 'IMG' && attrName === 'src') {
          if (!self._isSafeImageUrl(attr.value)) {
            node.removeAttribute(attr.name);
          }
        } else if (attrName === 'style') {
          var clean = self._sanitizeStyle(attr.value);
          if (clean) {
            node.setAttribute('style', clean);
          } else {
            node.removeAttribute(attr.name);
          }
        } else if (tag === 'SPAN' && attrName === 'class') {
          // Filtrar clases: solo whitelisteadas
          var classes = attr.value.split(/\s+/);
          var okClasses = [];
          for (var j = 0; j < classes.length; j++) {
            if (ALLOWED_SPAN_CLASSES[classes[j]]) okClasses.push(classes[j]);
          }
          if (okClasses.length > 0) {
            node.setAttribute('class', okClasses.join(' '));
          } else {
            node.removeAttribute('class');
          }
        } else if (attrName === 'contenteditable') {
          // Solo permitir "false" (para mentions/emojis)
          if (attr.value !== 'false') node.removeAttribute(attr.name);
        } else if (attrName === 'target') {
          // Forzar rel="noopener noreferrer" si target="_blank"
          if (attr.value === '_blank') {
            node.setAttribute('rel', 'noopener noreferrer');
          }
        } else if (attrName === 'colspan' || attrName === 'rowspan') {
          // Asegurar que sea un número positivo razonable
          var num = parseInt(attr.value, 10);
          if (isNaN(num) || num < 1 || num > 1000) {
            node.removeAttribute(attr.name);
          } else {
            node.setAttribute(attrName, String(num));
          }
        }
      }
    }

    // Procesar hijos directos de root
    var c = root.firstChild;
    while (c) {
      var n = c.nextSibling;
      processNode(c);
      c = n;
    }

    return root.innerHTML;
  };

  /**
   * Sanitiza un bloque individual: valida type, id, content según tipo.
   * @returns {Object|null} bloque sanitizado o null si es inválido
   */
  meWYSE.prototype._sanitizeBlock = function(block, fallbackId) {
    if (!block || typeof block !== 'object') return null;

    // Validar type
    var type = VALID_BLOCK_TYPES[block.type] ? block.type : 'paragraph';

    // Validar id
    var id = (typeof block.id === 'number' && isFinite(block.id)) ? block.id : fallbackId;
    if (typeof id !== 'number') id = ++this.currentBlockId;
    if (id > this.currentBlockId) this.currentBlockId = id;

    // Construir bloque limpio (descartando cualquier propiedad no esperada)
    var clean = { id: id, type: type, content: '' };

    // Procesar content según tipo
    if (type === 'image') {
      // content debe ser objeto con blob/fileName/width/height
      var c = block.content;
      if (!c || typeof c !== 'object') return null;
      if (typeof c.blob !== 'string' || !this._isSafeImageUrl(c.blob)) return null;
      var w = parseInt(c.width, 10);
      var h = parseInt(c.height, 10);
      clean.content = {
        blob: c.blob,
        fileName: typeof c.fileName === 'string' ? c.fileName.substring(0, 200) : 'image',
        width: (isNaN(w) || w < 1) ? 300 : Math.min(w, 10000),
        height: (isNaN(h) || h < 1) ? 200 : Math.min(h, 10000)
      };
      // Preservar opciones avanzadas (border/margin/alignment) si existen y son válidas
      if (c.advanced && typeof c.advanced === 'object') {
        var adv = {};
        if (c.advanced.border && typeof c.advanced.border === 'object') {
          var bw = parseInt(c.advanced.border.width, 10);
          if (!isNaN(bw) && bw >= 0 && bw <= 50) {
            var validStyles = { solid: 1, dashed: 1, dotted: 1, double: 1, none: 1 };
            adv.border = {
              width: bw,
              style: validStyles[c.advanced.border.style] ? c.advanced.border.style : 'solid',
              color: /^#[0-9a-fA-F]{3,6}$/.test(c.advanced.border.color) ? c.advanced.border.color : '#000000'
            };
          }
        }
        if (c.advanced.margin && typeof c.advanced.margin === 'object') {
          var m = parseInt(c.advanced.margin.all, 10);
          if (!isNaN(m) && m >= 0 && m <= 200) {
            adv.margin = { all: m };
          }
        }
        if (typeof c.advanced.alignment === 'string') {
          var validAligns = { left: 1, center: 1, right: 1 };
          if (validAligns[c.advanced.alignment]) {
            adv.alignment = c.advanced.alignment;
          }
        }
        if (adv.border || adv.margin || adv.alignment) {
          clean.content.advanced = adv;
        }
      }
    } else if (type === 'code') {
      // No es HTML, solo texto. Igual escapamos para seguridad.
      clean.content = typeof block.content === 'string' ? block.content : '';
    } else if (type === 'table') {
      clean.content = this._sanitizeBlockContent(
        typeof block.content === 'string' ? block.content : '',
        { allowTable: true }
      );
      // Preservar estilos de tabla (aplicados vía "Propiedades de la tabla")
      if (typeof block.tableStyle === 'string' && block.tableStyle) {
        var cleanTableStyle = this._sanitizeStyle(block.tableStyle);
        if (cleanTableStyle) clean.tableStyle = cleanTableStyle;
      }
    } else if (type === 'divider') {
      clean.content = '';
    } else if (type === 'video') {
      // content: { provider, videoId, url, width, height }
      var vc = block.content;
      if (!vc || typeof vc !== 'object') return null;
      var provider = (vc.provider === 'youtube' || vc.provider === 'vimeo' || vc.provider === 'file')
        ? vc.provider : null;
      if (!provider) return null;

      var videoId = null;
      if (provider === 'youtube' || provider === 'vimeo') {
        if (typeof vc.videoId !== 'string' || !/^[a-zA-Z0-9_-]{1,20}$/.test(vc.videoId)) return null;
        videoId = vc.videoId;
      }

      var url = (typeof vc.url === 'string') ? vc.url : '';
      if (provider === 'file' && !this._isSafeMediaUrl(url)) return null;

      var w = parseInt(vc.width, 10);
      var h = parseInt(vc.height, 10);
      clean.content = {
        provider: provider,
        videoId: videoId,
        url: url,
        width: (isNaN(w) || w < 1) ? 640 : Math.min(w, 10000),
        height: (isNaN(h) || h < 1) ? 360 : Math.min(h, 10000)
      };
    } else if (type === 'audio') {
      // content: { url, title }
      var ac = block.content;
      if (!ac || typeof ac !== 'object') return null;
      if (!this._isSafeMediaUrl(ac.url)) return null;
      clean.content = {
        url: ac.url,
        title: (typeof ac.title === 'string') ? ac.title.substring(0, 200) : ''
      };
    } else {
      // paragraph, heading1-3, quote, bulletList, numberList, checklist
      clean.content = this._sanitizeBlockContent(
        typeof block.content === 'string' ? block.content : ''
      );
    }

    // Preservar propiedades opcionales whitelisteadas
    if (type === 'checklist' && block.checked === true) {
      clean.checked = true;
    }
    if (typeof block.alignment === 'string') {
      var align = block.alignment.toLowerCase();
      if (align === 'left' || align === 'center' || align === 'right' || align === 'justify') {
        clean.alignment = align;
      }
    }
    // Preservar customClass (estilos custom via styleFormats) solo si está en el whitelist
    if (typeof block.customClass === 'string' && this._customClassWhitelist &&
        this._customClassWhitelist[block.customClass]) {
      clean.customClass = block.customClass;
    }
    // Preservar indentLevel en listas (0-5)
    if ((type === 'bulletList' || type === 'numberList' || type === 'checklist') &&
        typeof block.indentLevel === 'number') {
      var lvl = Math.floor(block.indentLevel);
      if (!isNaN(lvl) && lvl >= 0 && lvl <= 5) {
        clean.indentLevel = lvl;
      }
    }

    return clean;
  };

  /**
   * Sanitiza un array de bloques. Filtra los inválidos.
   */
  meWYSE.prototype._sanitizeBlocks = function(blocks) {
    if (!Array.isArray(blocks)) return [];
    var result = [];
    // Primera pasada: actualizar currentBlockId con todos los ids válidos
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      if (b && typeof b.id === 'number' && b.id > this.currentBlockId) {
        this.currentBlockId = b.id;
      }
    }
    // Segunda pasada: sanitizar
    for (var j = 0; j < blocks.length; j++) {
      var clean = this._sanitizeBlock(blocks[j], ++this.currentBlockId);
      if (clean) result.push(clean);
    }
    return result;
  };

  /**
   * Devuelve el HTML de salida ya sanitizado, seguro para insertar en otra app.
   */
  meWYSE.prototype.getSafeHTML = function() {
    var raw = this.getHTML();
    return this._sanitizeBlockContent(raw, { allowTable: true, allowImg: true, allowMedia: true });
  };

  /**
   * ============================================
   * MODAL DE PROPIEDADES DE TABLA
   * ============================================
   * Permite editar: width, height, cell-spacing, cell-padding,
   * border (width/style/color), alignment, background-color
   */
  meWYSE.prototype.showTablePropertiesModal = function(blockId) {
    var self = this;
    var block = this.getBlock(blockId);
    if (!block || block.type !== 'table') return;

    var blockElement = this.getBlockElementById(blockId);
    if (!blockElement) return;
    var table = blockElement.querySelector('table');
    if (!table) return;

    var t = function(key) { return self.t('tableProperties.' + key); };

    // Leer valores actuales de la tabla
    var current = self._readTableProperties(table);

    // Crear overlay
    var overlay = document.createElement('div');
    overlay.className = 'mewyse-modal-overlay';

    // Contenedor
    var modal = document.createElement('div');
    modal.className = 'mewyse-modal-container mewyse-table-properties-modal';
    if (self.options.theme) modal.classList.add('mewyse-editor-' + self.options.theme);

    // Título
    var title = document.createElement('h3');
    title.className = 'mewyse-modal-title';
    title.textContent = t('title');
    modal.appendChild(title);

    // Contenedor de campos (grid 2 columnas)
    var grid = document.createElement('div');
    grid.className = 'mewyse-table-properties-grid';

    // --- Ancho / Alto (aceptan px, %, auto o vacío) ---
    var widthInput = self._makeDimensionInput(current.width, '500px / 100% / auto');
    var heightInput = self._makeDimensionInput(current.height, '300px / auto');
    grid.appendChild(self._makeField(t('width'), widthInput));
    grid.appendChild(self._makeField(t('height'), heightInput));

    // --- Espacio entre celdas / Relleno de celda ---
    // Vacíos = no modificar el valor actual de las celdas / tabla
    var spacingInput = self._makeNumberInput(current.cellSpacing, 0);
    var paddingInput = self._makeNumberInput(current.cellPadding, 0);
    grid.appendChild(self._makeField(t('cellSpacing'), spacingInput));
    grid.appendChild(self._makeField(t('cellPadding'), paddingInput));

    // --- Borde: grosor / estilo / color ---
    // Vacío = no modificar el borde de las celdas
    var borderWidthInput = self._makeNumberInput(current.borderWidth, 0);
    var borderStyleSelect = document.createElement('select');
    borderStyleSelect.className = 'mewyse-modal-input';
    var styles = [
      { value: 'solid', label: t('styleSolid') },
      { value: 'dashed', label: t('styleDashed') },
      { value: 'dotted', label: t('styleDotted') },
      { value: 'double', label: t('styleDouble') },
      { value: 'none', label: t('styleNone') }
    ];
    styles.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.value;
      opt.textContent = s.label;
      if (s.value === current.borderStyle) opt.selected = true;
      borderStyleSelect.appendChild(opt);
    });
    // Border color con tracking userSet (patrón similar al bg)
    var borderColorInput = document.createElement('input');
    borderColorInput.type = 'color';
    borderColorInput.className = 'mewyse-modal-input mewyse-modal-color';
    borderColorInput.value = current.borderColor || '#dddddd';
    var borderColorWrapper = document.createElement('div');
    borderColorWrapper.className = 'mewyse-modal-color-wrap';
    borderColorWrapper.appendChild(borderColorInput);
    var borderColorClearBtn = document.createElement('button');
    borderColorClearBtn.type = 'button';
    borderColorClearBtn.className = 'mewyse-modal-btn-small';
    borderColorClearBtn.textContent = t('reset');
    borderColorClearBtn.onclick = function() {
      borderColorInput.value = '#dddddd';
      borderColorInput.dataset.userSet = 'false';
    };
    borderColorInput.oninput = function() {
      borderColorInput.dataset.userSet = 'true';
    };
    borderColorInput.dataset.userSet = current.borderColor ? 'true' : 'false';
    borderColorWrapper.appendChild(borderColorClearBtn);

    grid.appendChild(self._makeField(t('borderWidth'), borderWidthInput));
    grid.appendChild(self._makeField(t('borderStyle'), borderStyleSelect));
    grid.appendChild(self._makeField(t('borderColor'), borderColorWrapper));

    // --- Alineación ---
    var alignSelect = document.createElement('select');
    alignSelect.className = 'mewyse-modal-input';
    var aligns = [
      { value: 'left', label: t('alignLeft') },
      { value: 'center', label: t('alignCenter') },
      { value: 'right', label: t('alignRight') }
    ];
    aligns.forEach(function(a) {
      var opt = document.createElement('option');
      opt.value = a.value;
      opt.textContent = a.label;
      if (a.value === current.alignment) opt.selected = true;
      alignSelect.appendChild(opt);
    });
    grid.appendChild(self._makeField(t('alignment'), alignSelect));

    // --- Color de fondo ---
    var bgColorInput = document.createElement('input');
    bgColorInput.type = 'color';
    bgColorInput.className = 'mewyse-modal-input mewyse-modal-color';
    bgColorInput.value = current.backgroundColor || '#ffffff';
    // Checkbox para "sin fondo"
    var bgWrapper = document.createElement('div');
    bgWrapper.className = 'mewyse-modal-color-wrap';
    bgWrapper.appendChild(bgColorInput);
    var bgClearBtn = document.createElement('button');
    bgClearBtn.type = 'button';
    bgClearBtn.className = 'mewyse-modal-btn-small';
    bgClearBtn.textContent = t('reset');
    bgClearBtn.onclick = function() {
      bgColorInput.value = '#ffffff';
      bgColorInput.removeAttribute('data-user-set');
      bgColorInput.dataset.userSet = 'false';
    };
    bgColorInput.oninput = function() {
      bgColorInput.dataset.userSet = 'true';
    };
    // Marcar si había color al abrir
    bgColorInput.dataset.userSet = current.backgroundColor ? 'true' : 'false';
    bgWrapper.appendChild(bgClearBtn);
    grid.appendChild(self._makeField(t('backgroundColor'), bgWrapper));

    modal.appendChild(grid);

    // --- Botones Aplicar / Cancelar ---
    var buttons = document.createElement('div');
    buttons.className = 'mewyse-modal-buttons';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelBtn.textContent = t('cancel');
    cancelBtn.onclick = function() { document.body.removeChild(overlay); };

    var applyBtn = document.createElement('button');
    applyBtn.type = 'button';
    applyBtn.className = 'mewyse-modal-button mewyse-modal-button-primary';
    applyBtn.textContent = t('apply');
    applyBtn.onclick = function() {
      self.pushHistory(true);
      self._applyTableProperties(blockId, table, {
        width: widthInput.value,
        height: heightInput.value,
        cellSpacing: spacingInput.value,
        cellPadding: paddingInput.value,
        borderWidth: borderWidthInput.value,
        borderStyle: borderStyleSelect.value,
        borderColor: borderColorInput.value,
        borderColorUserSet: borderColorInput.dataset.userSet === 'true',
        alignment: alignSelect.value,
        backgroundColor: bgColorInput.value,
        backgroundColorUserSet: bgColorInput.dataset.userSet === 'true'
      });
      document.body.removeChild(overlay);
    };

    buttons.appendChild(cancelBtn);
    buttons.appendChild(applyBtn);
    modal.appendChild(buttons);

    overlay.appendChild(modal);
    // Cerrar al click fuera
    overlay.onclick = function(e) {
      if (e.target === overlay) document.body.removeChild(overlay);
    };
    // Escape para cerrar
    var escHandler = function(e) {
      if (e.key === 'Escape') {
        if (overlay.parentNode) document.body.removeChild(overlay);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    document.body.appendChild(overlay);
  };

  /**
   * Helper: crea un <input type="number"> con valor inicial
   */
  meWYSE.prototype._makeNumberInput = function(value, min) {
    var input = document.createElement('input');
    input.type = 'number';
    input.className = 'mewyse-modal-input';
    if (typeof min === 'number') input.min = String(min);
    if (value !== undefined && value !== null && value !== '') {
      input.value = String(value);
    }
    return input;
  };

  /**
   * Helper: crea un <input type="text"> para dimensiones CSS (px/%/auto/vacío)
   * Acepta: "500", "500px", "100%", "auto", "" (vacío = sin declaración)
   */
  meWYSE.prototype._makeDimensionInput = function(value, placeholder) {
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'mewyse-modal-input';
    if (placeholder) input.placeholder = placeholder;
    if (value !== undefined && value !== null && value !== '') {
      input.value = String(value);
    }
    return input;
  };

  /**
   * Normaliza un valor de dimensión del usuario a un string CSS válido.
   * - "" / null → null (no aplicar)
   * - "500" → "500px"
   * - "500px", "100%", "auto" → tal cual
   * - "abc" → null (inválido)
   */
  meWYSE.prototype._normalizeDimension = function(value) {
    if (value === undefined || value === null) return null;
    var trimmed = String(value).trim();
    if (trimmed === '') return null;
    if (/^auto$/i.test(trimmed)) return 'auto';
    if (/^\d+(\.\d+)?%$/.test(trimmed)) return trimmed;
    if (/^\d+(\.\d+)?px$/.test(trimmed)) return trimmed;
    if (/^\d+(\.\d+)?$/.test(trimmed)) return trimmed + 'px';
    return null;
  };

  /**
   * Helper: crea un <div> con label + input
   */
  meWYSE.prototype._makeField = function(labelText, inputEl) {
    var wrap = document.createElement('div');
    wrap.className = 'mewyse-modal-input-group';
    var label = document.createElement('label');
    label.textContent = labelText;
    wrap.appendChild(label);
    wrap.appendChild(inputEl);
    return wrap;
  };

  /**
   * Lee las propiedades visuales actuales de una tabla
   * @returns {Object} { width, height, cellSpacing, cellPadding,
   *                     borderWidth, borderStyle, borderColor,
   *                     alignment, backgroundColor }
   */
  meWYSE.prototype._readTableProperties = function(table) {
    var self = this;
    var result = {
      width: '', height: '',
      cellSpacing: '', cellPadding: '',
      borderWidth: '', borderStyle: 'solid', borderColor: '',
      alignment: 'left', backgroundColor: ''
    };

    // Ancho/alto: preservar la unidad original (px, %, auto) si está declarada inline
    var inlineStyle = table.getAttribute('style') || '';
    var widthMatch = inlineStyle.match(/\bwidth\s*:\s*([^;]+)/i);
    var heightMatch = inlineStyle.match(/\bheight\s*:\s*([^;]+)/i);
    if (widthMatch) {
      result.width = widthMatch[1].trim();
    }
    if (heightMatch) {
      result.height = heightMatch[1].trim();
    }

    // Border-collapse y spacing
    var bc = inlineStyle.match(/\bborder-collapse\s*:\s*([^;]+)/i);
    var collapsed = !bc || /collapse/i.test(bc[1]);
    if (!collapsed) {
      var sp = inlineStyle.match(/\bborder-spacing\s*:\s*([^;]+)/i);
      if (sp) result.cellSpacing = parseInt(sp[1], 10) || 0;
    }

    // Cell padding: leer del primer <td>/<th>
    var firstCell = table.querySelector('td, th');
    if (firstCell) {
      var cellInline = firstCell.getAttribute('style') || '';
      var padMatch = cellInline.match(/\bpadding\s*:\s*([^;]+)/i);
      if (padMatch) {
        result.cellPadding = parseInt(padMatch[1], 10) || 0;
      }
    }

    // Borde: leer del primer <td>/<th> (preferencia) o de la tabla
    var borderTarget = firstCell || table;
    var btInline = borderTarget.getAttribute('style') || '';
    var borderShort = btInline.match(/\bborder\s*:\s*([^;]+)/i);
    if (borderShort) {
      var bv = borderShort[1];
      var wm = bv.match(/(\d+)px/);
      var sm = bv.match(/\b(solid|dashed|dotted|double|none)\b/);
      var cm = bv.match(/#[0-9a-fA-F]{3,6}|rgb\([^)]+\)/);
      if (wm) result.borderWidth = parseInt(wm[1], 10);
      if (sm) result.borderStyle = sm[1];
      if (cm) result.borderColor = self._colorToHex(cm[0]);
    } else {
      var bw = btInline.match(/\bborder-width\s*:\s*(\d+)/i);
      var bs = btInline.match(/\bborder-style\s*:\s*([a-z]+)/i);
      var bcl = btInline.match(/\bborder-color\s*:\s*([^;]+)/i);
      if (bw) result.borderWidth = parseInt(bw[1], 10);
      if (bs) result.borderStyle = bs[1];
      if (bcl) result.borderColor = self._colorToHex(bcl[1].trim());
    }

    // Alineación: margin-left: auto & margin-right: auto → center. float → left/right.
    var ma = inlineStyle.match(/\bmargin\s*:\s*([^;]+)/i);
    var mLeft = inlineStyle.match(/\bmargin-left\s*:\s*([^;]+)/i);
    var mRight = inlineStyle.match(/\bmargin-right\s*:\s*([^;]+)/i);
    var flt = inlineStyle.match(/\bfloat\s*:\s*([^;]+)/i);
    if (flt) {
      if (/left/i.test(flt[1])) result.alignment = 'left';
      else if (/right/i.test(flt[1])) result.alignment = 'right';
    } else if ((mLeft && /auto/i.test(mLeft[1]) && mRight && /auto/i.test(mRight[1])) ||
               (ma && /auto/i.test(ma[1]))) {
      result.alignment = 'center';
    } else {
      result.alignment = 'left';
    }

    // Background color
    var bgMatch = inlineStyle.match(/\bbackground-color\s*:\s*([^;]+)/i);
    if (bgMatch) {
      result.backgroundColor = self._colorToHex(bgMatch[1].trim());
    }

    return result;
  };

  /**
   * Convierte color CSS (rgb, nombre, hex3) a hex6
   */
  meWYSE.prototype._colorToHex = function(color) {
    if (!color) return '';
    color = color.trim();
    if (color.indexOf('#') === 0) {
      if (color.length === 4) {
        // #abc → #aabbcc
        return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
      }
      return color.toLowerCase();
    }
    var rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (rgbMatch) {
      var toHex = function(n) {
        var h = parseInt(n, 10).toString(16);
        return h.length === 1 ? '0' + h : h;
      };
      return '#' + toHex(rgbMatch[1]) + toHex(rgbMatch[2]) + toHex(rgbMatch[3]);
    }
    // Nombres CSS: usar un div temporal para que el navegador los normalice
    var tmp = document.createElement('div');
    tmp.style.color = color;
    document.body.appendChild(tmp);
    var computed = window.getComputedStyle(tmp).color;
    document.body.removeChild(tmp);
    var computedMatch = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (computedMatch) {
      var toHex2 = function(n) {
        var h = parseInt(n, 10).toString(16);
        return h.length === 1 ? '0' + h : h;
      };
      return '#' + toHex2(computedMatch[1]) + toHex2(computedMatch[2]) + toHex2(computedMatch[3]);
    }
    return '';
  };

  /**
   * Aplica las propiedades seleccionadas a la tabla del DOM y actualiza el modelo.
   * Los estilos del <table> se guardan en block.tableStyle (persistido en el modelo);
   * los estilos de las celdas van en el innerHTML como hasta ahora.
   */
  meWYSE.prototype._applyTableProperties = function(blockId, table, props) {
    // Construir style string para la tabla (se guarda en block.tableStyle)
    // Reglas: si un campo está vacío, se omite la declaración CSS correspondiente.
    var tableStyles = [];

    // Width: normalizar unidad (px/%/auto). Vacío → no declarar.
    var normWidth = this._normalizeDimension(props.width);
    if (normWidth) tableStyles.push('width: ' + normWidth);

    var normHeight = this._normalizeDimension(props.height);
    if (normHeight) tableStyles.push('height: ' + normHeight);

    // Cell spacing — si vacío, no declarar border-collapse/spacing
    var spacingStr = (props.cellSpacing || '').toString().trim();
    if (spacingStr !== '') {
      var spacing = parseInt(spacingStr, 10);
      if (!isNaN(spacing) && spacing > 0) {
        tableStyles.push('border-collapse: separate');
        tableStyles.push('border-spacing: ' + spacing + 'px');
      } else {
        tableStyles.push('border-collapse: collapse');
      }
    }

    // Alineación: solo generar declaración si != 'left' (default del navegador)
    if (props.alignment === 'center') {
      tableStyles.push('margin-left: auto');
      tableStyles.push('margin-right: auto');
    } else if (props.alignment === 'right') {
      tableStyles.push('margin-left: auto');
      tableStyles.push('margin-right: 0');
    }
    // alignment === 'left' → no añadir margins (es el comportamiento default)

    // Background color: solo si userSet=true
    if (props.backgroundColorUserSet && props.backgroundColor) {
      tableStyles.push('background-color: ' + props.backgroundColor);
    }

    var tableStyleStr = tableStyles.join('; ');

    // ---- Aplicar a celdas ----
    // Semántica: si borderWidth/cellPadding están VACÍOS, preservar el valor
    // inline actual de cada celda. Solo si el usuario puso un valor explícito,
    // sobreescribir. Para borderColor: si userSet=false, preservar el color actual.
    var cells = table.querySelectorAll('td, th');
    var borderWidthStr = (props.borderWidth || '').toString().trim();
    var cellPaddingStr = (props.cellPadding || '').toString().trim();
    var borderWidth = parseInt(borderWidthStr, 10);
    var cellPadding = parseInt(cellPaddingStr, 10);
    var hasBorderWidth = borderWidthStr !== '' && !isNaN(borderWidth);
    var hasCellPadding = cellPaddingStr !== '' && !isNaN(cellPadding);
    var borderStyleChanged = !!props.borderStyle;

    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var existingStyle = cell.getAttribute('style') || '';

      // Extraer declaraciones existentes
      var existingMap = this._parseStyleMap(existingStyle);

      // Aplicar border solo si el usuario puso width o cambió color (userSet)
      if (hasBorderWidth || props.borderColorUserSet ||
          (borderStyleChanged && existingMap.border)) {
        // Componer el border nuevo, mezclando user values con defaults razonables
        var useWidth = hasBorderWidth ? borderWidth :
          (this._extractBorderWidth(existingMap.border) || 1);
        var useStyle = props.borderStyle || 'solid';
        var useColor = props.borderColorUserSet ? props.borderColor :
          (this._extractBorderColor(existingMap.border) || '#dddddd');

        if (useStyle === 'none' || useWidth === 0) {
          existingMap.border = 'none';
        } else {
          existingMap.border = useWidth + 'px ' + useStyle + ' ' + useColor;
        }
      }

      // Aplicar padding solo si el usuario puso valor
      if (hasCellPadding) {
        existingMap.padding = cellPadding + 'px';
      }

      // Reconstruir style string (conservando otras props como background-color
      // que pudieran estar ya definidas por el color-picker de celda)
      cell.setAttribute('style', this._serializeStyleMap(existingMap));
    }

    // Guardar el estilo de la tabla en el modelo
    var block = this.getBlock(blockId);
    if (block) {
      if (tableStyleStr) {
        block.tableStyle = tableStyleStr;
      } else {
        delete block.tableStyle;
      }
    }

    // Guardar innerHTML con los estilos de celdas (updateBlockContent limpia controles)
    this.updateBlockContent(blockId, table.innerHTML);

    // Re-renderizar para aplicar todos los estilos y regenerar controles del editor
    this.render();
  };

  /**
   * Parsea un string CSS inline a un objeto { prop: value }.
   * Las keys se guardan en lowercase para comparación consistente.
   */
  meWYSE.prototype._parseStyleMap = function(styleStr) {
    var map = {};
    if (!styleStr) return map;
    var parts = styleStr.split(';');
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var colonIdx = part.indexOf(':');
      if (colonIdx < 0) continue;
      var prop = part.substring(0, colonIdx).trim().toLowerCase();
      var value = part.substring(colonIdx + 1).trim();
      if (prop && value) map[prop] = value;
    }
    return map;
  };

  /**
   * Serializa un objeto { prop: value } a un string CSS inline.
   */
  meWYSE.prototype._serializeStyleMap = function(map) {
    var parts = [];
    for (var prop in map) {
      if (map.hasOwnProperty(prop)) {
        parts.push(prop + ': ' + map[prop]);
      }
    }
    return parts.join('; ');
  };

  /**
   * Extrae el width de una declaración border shorthand (ej. "2px dashed #ff0000")
   */
  meWYSE.prototype._extractBorderWidth = function(borderValue) {
    if (!borderValue) return null;
    var m = borderValue.match(/(\d+)px/);
    return m ? parseInt(m[1], 10) : null;
  };

  /**
   * Extrae el color de una declaración border shorthand
   */
  meWYSE.prototype._extractBorderColor = function(borderValue) {
    if (!borderValue) return null;
    var m = borderValue.match(/#[0-9a-fA-F]{3,6}|rgb\([^)]+\)/);
    return m ? m[0] : null;
  };

  /**
   * Coloca el cursor en un offset de TEXTO dentro de un elemento contenteditable.
   * Camina los nodos de texto descendientes hasta consumir `offset` caracteres y
   * coloca el cursor allí. Si el offset excede el texto disponible, queda al final.
   *
   * Lo usa `_mergeBlockIntoPrevious` para situar el cursor en la frontera entre
   * el contenido previo y el contenido recién concatenado.
   */
  meWYSE.prototype._setCursorAtTextOffset = function(element, offset) {
    if (!element) return;
    try {
      element.focus();
      var range = document.createRange();
      var sel = window.getSelection();
      var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
      var charsLeft = Math.max(0, offset);
      var targetNode = null;
      var targetOffset = 0;
      var node;
      while ((node = walker.nextNode())) {
        var len = node.textContent.length;
        if (charsLeft <= len) {
          targetNode = node;
          targetOffset = charsLeft;
          break;
        }
        charsLeft -= len;
      }
      if (targetNode) {
        range.setStart(targetNode, targetOffset);
      } else {
        // No hay text nodes (o offset > total): cursor al final del elemento.
        range.selectNodeContents(element);
        range.collapse(false);
      }
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (e) {}
  };

  /**
   * Fusiona el bloque indicado con el bloque anterior. Inverso del split:
   * el contenido del bloque se concatena al final del anterior, el bloque
   * actual se elimina del modelo, y el cursor queda en la frontera (donde
   * empezaba el contenido absorbido).
   *
   * El TIPO del bloque resultante es el del anterior — coherente con el
   * comportamiento clásico de editores: backspace al inicio de un párrafo
   * tras un heading lo fusiona en el heading.
   *
   * Síncrono dentro del gesto del usuario para no perder el teclado virtual
   * en móvil (mismo motivo que en `_focusBlockSync`).
   */
  meWYSE.prototype._mergeBlockIntoPrevious = function(blockId) {
    var index = this.getBlockIndex(blockId);
    if (index <= 0) return;
    var currentBlock = this.getBlock(blockId);
    var prevBlock = this.blocks[index - 1];
    if (!currentBlock || !prevBlock) return;

    // El render() destruye el contenteditable actual y enfocamos el del bloque
    // previo. En móvil esa transición pasa un instante por document.body —
    // suprimimos onBlur durante 300ms para que esa transición no se reporte
    // como un blur real.
    this._suppressBlurUntil = Date.now() + 300;

    this.pushHistory(true);

    // Longitud de TEXTO del contenido previo: futura posición del cursor
    // (carácter justo después del último char del bloque anterior original).
    var probe = document.createElement('div');
    probe.innerHTML = prevBlock.content || '';
    var prevTextLen = probe.textContent.length;

    // Concatenar HTML crudo y pasarlo por el sanitizador (también unifica
    // `<div>` accidentales en `<br>` gracias al fix reciente del unwrap).
    var mergedRaw = (prevBlock.content || '') + (currentBlock.content || '');
    prevBlock.content = this._sanitizeBlockContent(mergedRaw);

    // Quitar el bloque actual del modelo
    this.blocks.splice(index, 1);

    // Re-renderizar todo (manera más simple de manejar correctamente la
    // re-agrupación de listas: si bloques de lista del mismo tipo quedan
    // ahora consecutivos, deben unirse en el mismo `<ul>/<ol>`).
    // Saltamos el focus async del render para no romper el gesto.
    this._skipAutoFocus = true;
    this.render();
    this._skipAutoFocus = false;

    // Cursor síncrono en la frontera (dentro del bloque previo).
    var prevElement = this.container.querySelector('[data-block-id="' + prevBlock.id + '"]');
    if (prevElement) {
      var ce = prevElement.querySelector('[contenteditable="true"]');
      if (!ce && prevElement.getAttribute('contenteditable') === 'true') ce = prevElement;
      if (ce) this._setCursorAtTextOffset(ce, prevTextLen);
    }

    // Si era una lista numerada, refrescar la numeración consecutiva.
    if (prevBlock.type === 'numberList' || currentBlock.type === 'numberList') {
      this.updateConsecutiveNumberLists(Math.max(0, index - 1));
    }

    this.triggerChange();
  };

  /**
   * Foco SÍNCRONO sobre el contenteditable de un bloque, con cursor al inicio.
   *
   * Existe como complemento a `focusNewBlock` (que es asíncrono — usa
   * setTimeout + 3×rAF). Este es síncrono porque el handler de Enter lo
   * invoca dentro del propio gesto del usuario: si focus() ocurre fuera del
   * gesto, iOS y Android ocultan el teclado virtual al crear un bloque nuevo.
   *
   * No reemplaza a `focusNewBlock` para el resto de callers; sólo lo usa el
   * Enter handler, en combinación con el flag `_skipAutoFocus` que evita el
   * focus asíncrono de fondo cuando ya hicimos el síncrono.
   */
  meWYSE.prototype._focusBlockSync = function(blockId) {
    if (!blockId || !this.container) return;
    var blockElement = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (!blockElement) return;
    var ce = blockElement.querySelector('[contenteditable="true"]');
    if (!ce && blockElement.getAttribute('contenteditable') === 'true') {
      ce = blockElement;
    }
    if (!ce) return;
    ce.focus();
    try {
      var range = document.createRange();
      var sel = window.getSelection();
      if (ce.firstChild && ce.firstChild.nodeType === 3) {
        range.setStart(ce.firstChild, 0);
      } else {
        range.setStart(ce, 0);
      }
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (e) {}
  };

  /**
   * Backdrop / overlay invisible para menús flotantes y modales.
   *
   * Cuando un menú/modal se abre, llama a `_showBackdrop(name, closeFn)`. Si era el
   * primero del stack, se inserta un <div.mewyse-overlay> en body que intercepta
   * clicks y la tecla Escape. Click u Escape llaman al `closeFn` del top del stack.
   *
   * Cuando el menú se cierra por sus propios medios, debe llamar `_hideBackdrop(name)`
   * para sacar su entrada del stack y, si era la última, retirar el overlay.
   *
   * El overlay es transparente (z-index 999) — los menús viven en 1000+ y los
   * modales en 9998+, así que el overlay queda automáticamente por debajo de
   * cualquier UI flotante y por encima del editor.
   */
  meWYSE.prototype._showBackdrop = function(name, closeFn) {
    if (!name || typeof closeFn !== 'function') return;
    // Eliminar entrada previa con el mismo nombre (re-aperturas no apilan).
    for (var i = this._activeBackdropModals.length - 1; i >= 0; i--) {
      if (this._activeBackdropModals[i].name === name) {
        this._activeBackdropModals.splice(i, 1);
      }
    }
    this._activeBackdropModals.push({ name: name, closeFn: closeFn });
    this._ensureBackdrop();
  };

  meWYSE.prototype._hideBackdrop = function(name) {
    if (!name || !this._activeBackdropModals) return;
    for (var i = this._activeBackdropModals.length - 1; i >= 0; i--) {
      if (this._activeBackdropModals[i].name === name) {
        this._activeBackdropModals.splice(i, 1);
        break;
      }
    }
    if (!this._activeBackdropModals.length) this._removeBackdrop();
  };

  meWYSE.prototype._ensureBackdrop = function() {
    if (this._backdropEl) return;
    var self = this;

    var el = document.createElement('div');
    el.className = 'mewyse-overlay';
    // mousedown (no click) para ganar la carrera contra otros listeners que
    // pudieran inspeccionar selección o foco al click. preventDefault evita que
    // el editor pierda la selección al hacer click en el overlay.
    this._backdropMouseDownHandler = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self._closeTopmostBackdropModal();
    };
    el.addEventListener('mousedown', this._backdropMouseDownHandler);
    document.body.appendChild(el);
    this._backdropEl = el;

    // Capture phase: nos colamos antes que listeners de bloque/teclado del editor.
    this._backdropEscHandler = function(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();
        self._closeTopmostBackdropModal();
      }
    };
    document.addEventListener('keydown', this._backdropEscHandler, true);
  };

  meWYSE.prototype._removeBackdrop = function() {
    if (this._backdropEl && this._backdropEl.parentNode) {
      this._backdropEl.parentNode.removeChild(this._backdropEl);
    }
    this._backdropEl = null;
    this._backdropMouseDownHandler = null;
    if (this._backdropEscHandler) {
      document.removeEventListener('keydown', this._backdropEscHandler, true);
      this._backdropEscHandler = null;
    }
  };

  meWYSE.prototype._closeTopmostBackdropModal = function() {
    if (!this._activeBackdropModals || !this._activeBackdropModals.length) return;
    var entry = this._activeBackdropModals[this._activeBackdropModals.length - 1];
    // Llamar al closeFn primero. Se espera que limpie llamando _hideBackdrop;
    // si no lo hace (defensivo), forzamos la limpieza después.
    try { entry.closeFn(); } catch (e) {}
    for (var i = this._activeBackdropModals.length - 1; i >= 0; i--) {
      if (this._activeBackdropModals[i] === entry) {
        this._activeBackdropModals.splice(i, 1);
        break;
      }
    }
    if (!this._activeBackdropModals.length) this._removeBackdrop();
  };

  /**
   * Configura el comportamiento de scroll horizontal de la toolbar cuando se
   * usa toolbarOverflow: 'scroll'. Cablea:
   *  - Indicadores de overflow (clases has-overflow-start/end en .mewyse-toolbar-scroll-area)
   *  - Wheel vertical → scroll horizontal
   *  - focusin → scrollIntoView del botón con foco
   *  - Click en flechas prev/next → scroll suave por ~70% del ancho visible
   *  - ResizeObserver (con fallback a window.resize) para recalcular en cambios de tamaño
   *
   * Las referencias a los elementos viven en this._toolbarScroll (creado en createToolbar).
   * Los listeners se guardan en this._toolbarScrollListeners para poder limpiarlos en destroy().
   */
  meWYSE.prototype._setupToolbarScroll = function() {
    var ts = this._toolbarScroll;
    if (!ts || !ts.track) return;
    var self = this;
    var track = ts.track;
    var area = ts.area;

    var listeners = [];
    this._toolbarScrollListeners = listeners;

    // Calcula si hay contenido oculto en cada extremo y togglea las clases.
    // Las clases controlan visibilidad de fades y flechas en CSS.
    function updateOverflow() {
      // En RTL la lógica es la misma con scrollLeft normalizado en navegadores modernos:
      // scrollLeft 0 = inicio (visualmente derecha en RTL); scrollWidth - clientWidth = final.
      var max = track.scrollWidth - track.clientWidth;
      var sl = Math.abs(track.scrollLeft); // abs por si algún navegador devuelve negativo en RTL
      var hasStart = sl > 1;
      var hasEnd = sl < max - 1;
      area.classList.toggle('has-overflow-start', hasStart);
      area.classList.toggle('has-overflow-end', hasEnd);
    }
    this._updateToolbarOverflow = updateOverflow;

    // Wheel vertical → scroll horizontal. Si el usuario hace scroll predominantemente
    // vertical encima del track, lo redirigimos a horizontal. Movimiento horizontal
    // explícito (touchpads, shift+wheel) se respeta sin alterar.
    function onWheel(e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        var max = track.scrollWidth - track.clientWidth;
        if (max <= 0) return; // nada que scrollear
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    }
    track.addEventListener('wheel', onWheel, { passive: false });
    listeners.push({ el: track, type: 'wheel', fn: onWheel, opts: { passive: false } });

    // Mantener el botón con foco (Tab) visible dentro del track.
    function onFocusIn(e) {
      var btn = e.target;
      if (!btn || typeof btn.getBoundingClientRect !== 'function') return;
      var trackRect = track.getBoundingClientRect();
      var btnRect = btn.getBoundingClientRect();
      if (btnRect.left < trackRect.left || btnRect.right > trackRect.right) {
        // scrollIntoView con inline:nearest desplaza solo lo necesario y respeta block actual.
        try {
          btn.scrollIntoView({ inline: 'nearest', block: 'nearest' });
        } catch (err) {
          // Navegadores muy antiguos sin opciones de scrollIntoView: fallback básico.
          btn.scrollIntoView();
        }
      }
    }
    track.addEventListener('focusin', onFocusIn);
    listeners.push({ el: track, type: 'focusin', fn: onFocusIn });

    // Listener de scroll: recalcular indicadores.
    function onScroll() { updateOverflow(); }
    track.addEventListener('scroll', onScroll, { passive: true });
    listeners.push({ el: track, type: 'scroll', fn: onScroll, opts: { passive: true } });

    // Flechas prev/next: scrollBy ~70% del ancho visible. behavior:smooth si está soportado.
    function scrollByDir(dir) {
      var step = Math.max(120, Math.floor(track.clientWidth * 0.7));
      try {
        track.scrollBy({ left: dir * step, behavior: 'smooth' });
      } catch (err) {
        track.scrollLeft += dir * step;
      }
    }
    if (ts.prev) {
      ts.prev.addEventListener('click', function(e) {
        e.preventDefault();
        // En RTL la flecha "prev" sigue significando "el lado de inicio", lo cual visualmente
        // es la derecha. scrollBy con left negativo ya respeta dir=rtl en navegadores modernos.
        scrollByDir(-1);
      });
    }
    if (ts.next) {
      ts.next.addEventListener('click', function(e) {
        e.preventDefault();
        scrollByDir(1);
      });
    }

    // ResizeObserver: recalcular cuando cambia el ancho disponible (responsive, fullscreen).
    // Fallback a window.resize si no está disponible.
    if (typeof window.ResizeObserver === 'function') {
      var ro = new window.ResizeObserver(function() { updateOverflow(); });
      ro.observe(track);
      this._toolbarResizeObserver = ro;
    } else {
      var onWinResize = function() { updateOverflow(); };
      window.addEventListener('resize', onWinResize);
      listeners.push({ el: window, type: 'resize', fn: onWinResize });
    }

    // Primer cálculo. requestAnimationFrame asegura que el layout esté listo
    // (el toolbar puede no estar aún en el DOM cuando se llama desde createToolbar).
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(updateOverflow);
    } else {
      setTimeout(updateOverflow, 0);
    }
  };

  /**
   * Reescribe un fragmento de HTML aplicando escape estricto de los 5 caracteres
   * de entidad HTML (`&` `<` `>` `"` `'`) sobre los nodos de TEXTO. Los
   * elementos y sus atributos se preservan; sólo cambia el texto humano.
   *
   * Convención al estilo Quill: el HTML resultante es siempre válido y robusto
   * incluso si el contenido del bloque contenía caracteres especiales sin
   * escapar (típico al cargar contenido vía `loadFromJSON` con texto crudo).
   *
   * El round-trip por `DOMParser` ya normaliza muchos casos, pero el browser
   * NO escapa `"` ni `'` en text nodes (sólo en atributos), así que este
   * serializador escribe el HTML manualmente para forzar las cinco entidades.
   */
  meWYSE.prototype._emitInlineHTMLWithEscape = function(html) {
    if (typeof html !== 'string' || html === '') return html || '';
    var doc;
    try {
      doc = new DOMParser().parseFromString(
        '<!DOCTYPE html><html><body><div id="__mewyse_root__">' + html + '</div></body></html>',
        'text/html'
      );
    } catch (e) {
      return html;
    }
    var root = doc.querySelector('#__mewyse_root__');
    if (!root) return html;
    var out = '';
    var c = root.firstChild;
    while (c) {
      out += this._serializeNodeWithEntityEscape(c);
      c = c.nextSibling;
    }
    return out;
  };

  // void elements de HTML5 (no llevan </tag>)
  var VOID_ELEMENTS = {
    AREA: 1, BASE: 1, BR: 1, COL: 1, EMBED: 1, HR: 1, IMG: 1,
    INPUT: 1, LINK: 1, META: 1, PARAM: 1, SOURCE: 1, TRACK: 1, WBR: 1
  };

  meWYSE.prototype._serializeNodeWithEntityEscape = function(node) {
    if (!node) return '';
    if (node.nodeType === 3) {
      // text node — escape los 5 entities
      return this._escapeTextEntities(node.nodeValue);
    }
    if (node.nodeType === 8) return ''; // comments: drop
    if (node.nodeType !== 1) return '';

    var tag = node.tagName;
    var tagLower = tag.toLowerCase();
    var attrs = '';
    for (var i = 0; i < node.attributes.length; i++) {
      var a = node.attributes[i];
      // Atributos: aplicar el mismo encoder que para text nodes (5 entities y,
      // si htmlNumericEntities está activo, también `\` y non-ASCII numérico).
      // Sobre-escapar `<`/`>`/`'` en atributos delimitados por `"` es legal
      // y mantiene un único criterio en todo el output.
      var val = this._escapeTextEntities(a.value);
      attrs += ' ' + a.name + '="' + val + '"';
    }
    if (VOID_ELEMENTS[tag]) return '<' + tagLower + attrs + '>';

    var inner = '';
    var c = node.firstChild;
    while (c) {
      inner += this._serializeNodeWithEntityEscape(c);
      c = c.nextSibling;
    }
    return '<' + tagLower + attrs + '>' + inner + '</' + tagLower + '>';
  };

  meWYSE.prototype._escapeTextEntities = function(text) {
    if (text == null) return '';
    var s = String(text);

    // Modo extendido (TinyMCE-compat): además de las 5 entities, escapar `\`
    // como `&#92;` y todo char no-ASCII (incluidos pares de subrogados Unicode
    // > U+FFFF) como referencia numérica.
    if (this.htmlNumericEntities) {
      var out = '';
      for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        var code = s.charCodeAt(i);
        // Detectar pair de subrogados → recombinar al codepoint real
        if (code >= 0xD800 && code <= 0xDBFF && i + 1 < s.length) {
          var low = s.charCodeAt(i + 1);
          if (low >= 0xDC00 && low <= 0xDFFF) {
            var cp = ((code - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
            out += '&#' + cp + ';';
            i++; // saltar el low surrogate
            continue;
          }
        }
        if (c === '&') out += '&amp;';
        else if (c === '<') out += '&lt;';
        else if (c === '>') out += '&gt;';
        else if (c === '"') out += '&quot;';
        else if (c === "'") out += '&#39;';
        else if (c === '\\') out += '&#92;';
        else if (code >= 128) out += '&#' + code + ';';
        else out += c;
      }
      return out;
    }

    // Modo Quill: solo las 5 entities HTML.
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  /**
   * Función auxiliar para escapar HTML
   * @param {string} text
   * @returns {string}
   */
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Exportar el constructor
  window.meWYSE = meWYSE;

})(window);
