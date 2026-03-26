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
        divider: 'Separador'
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
        divider: 'Línea divisoria'
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
        moveBlockDown: 'Mover bloque abajo'
      },
      blockMenu: {
        insertAbove: 'Insertar bloque arriba',
        insertBelow: 'Insertar bloque abajo',
        duplicate: 'Duplicar bloque',
        delete: 'Eliminar bloque',
        deleteMultiple: 'Eliminar {count} bloques',
        changeType: 'Cambiar tipo de bloque',
        changeTypeMultiple: 'Cambiar tipo de {count} bloques',
        resetTableWidth: 'Ajustar tabla al 100%'
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
        update: 'Actualizar'
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
        cannotDeleteLastColumn: 'No se puede eliminar la única columna de la tabla'
      },
      misc: {
        text: 'Texto',
        addBlock: '+ Añadir bloque',
        image: 'Imagen'
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
        divider: 'Divider'
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
        divider: 'Dividing line'
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
        moveBlockDown: 'Move block down'
      },
      blockMenu: {
        insertAbove: 'Insert block above',
        insertBelow: 'Insert block below',
        duplicate: 'Duplicate block',
        delete: 'Delete block',
        deleteMultiple: 'Delete {count} blocks',
        changeType: 'Change block type',
        changeTypeMultiple: 'Change type of {count} blocks',
        resetTableWidth: 'Fit table to 100%'
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
        update: 'Update'
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
        cannotDeleteLastColumn: 'Cannot delete the only column in the table'
      },
      misc: {
        text: 'Text',
        addBlock: '+ Add block',
        image: 'Image'
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
    redo: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="12,7 14,5 12,3"/><path d="M14,5 H6 A4,4 0 0 0 6,13 H10"/></svg>'
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
    this.target = document.querySelector(this.options.target);
    this.blocks = this.options.blocks || [];
    this.onChange = this.options.onChange || function() {};
    this.currentBlockId = 0;
    this.container = null;

    // ID único de instancia para scoping de estilos de contenido
    this.instanceId = 'mewyse-' + Math.random().toString(36).substr(2, 9);
    this._contentStyleElement = null;
    this.toolbar = null;
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

    // Actualizar currentBlockId si hay bloques iniciales
    if (this.blocks.length > 0) {
      var maxId = 0;
      for (var i = 0; i < this.blocks.length; i++) {
        if (this.blocks[i].id > maxId) {
          maxId = this.blocks[i].id;
        }
      }
      this.currentBlockId = maxId;
    }

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
      this.addBlock('paragraph');
    } else {
      this.render();
    }

    // Crear botón de resumen si está habilitado
    if (this.showSummary) {
      this.createSummaryButton();
    }

    // Enfocar el primer bloque automáticamente
    var self = this;
    setTimeout(function() {
      self.focusFirstBlock();
    }, 100);

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
      editorWrapper.appendChild(this.container);

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
      this.target.parentNode.insertBefore(this.container, this.target.nextSibling);
    }

    // Inyectar estilos de contenido si la opción lo permite (por defecto: true)
    if (this.options.contentStyles !== false) {
      this._injectContentStyles();
    }

    // Cargar contenido del textarea si existe
    if (this.target.value) {
      this.loadFromText(this.target.value);
    }
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

    toolbar.appendChild(blockTypeButton);

    // Separador
    var separator1 = document.createElement('div');
    separator1.className = 'mewyse-toolbar-separator';
    toolbar.appendChild(separator1);

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

    toolbar.appendChild(undoRedoGroup);

    var separator1b = document.createElement('div');
    separator1b.className = 'mewyse-toolbar-separator';
    toolbar.appendChild(separator1b);

    // Grupo de formato de texto
    var formatGroup = document.createElement('div');
    formatGroup.className = 'mewyse-toolbar-group';

    var formatTools = [
      { action: 'bold', labelKey: 'tooltips.bold', icon: '<strong>B</strong>', command: 'bold' },
      { action: 'italic', labelKey: 'tooltips.italic', icon: '<em>I</em>', command: 'italic' },
      { action: 'underline', labelKey: 'tooltips.underline', icon: '<u>U</u>', command: 'underline' },
      { action: 'strikethrough', labelKey: 'tooltips.strikethrough', icon: '<s>S</s>', command: 'strikeThrough' },
      { action: 'toggleCase', labelKey: 'tooltips.toggleCase', icon: '<span style="font-size:13px;font-weight:600">Aa</span>', type: 'toggleCase' }
    ];

    formatTools.forEach(function(tool) {
      var button = document.createElement('button');
      button.className = 'mewyse-toolbar-button';
      button.innerHTML = tool.icon;
      button.title = self.t(tool.labelKey);
      button.onclick = function(e) {
        e.preventDefault();
        if (tool.type === 'toggleCase') {
          self.toggleSelectionCase();
        } else {
          document.execCommand(tool.command, false, null);
          self.triggerChange();
        }
      };
      formatGroup.appendChild(button);
    });

    toolbar.appendChild(formatGroup);

    // Separador
    var separator2 = document.createElement('div');
    separator2.className = 'mewyse-toolbar-separator';
    toolbar.appendChild(separator2);

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

    toolbar.appendChild(extrasGroup);

    // Separador
    var separator3 = document.createElement('div');
    separator3.className = 'mewyse-toolbar-separator';
    toolbar.appendChild(separator3);

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

    toolbar.appendChild(alignGroup);

    // Separador
    var separator4 = document.createElement('div');
    separator4.className = 'mewyse-toolbar-separator';
    toolbar.appendChild(separator4);

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

    toolbar.appendChild(insertGroup);

    // Spacer para empujar los botones de mover a la derecha
    var spacer = document.createElement('div');
    spacer.style.flex = '1';
    toolbar.appendChild(spacer);

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

    toolbar.appendChild(moveGroup);

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

    // Si estamos en una celda de tabla, insertar la imagen directamente en la celda
    if (tableCellElement) {
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';

      fileInput.onchange = function(e) {
        var file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          self.insertImageInTableCell(file, tableCellElement);
        }
        document.body.removeChild(fileInput);
      };

      fileInput.oncancel = function() {
        document.body.removeChild(fileInput);
      };

      document.body.appendChild(fileInput);
      fileInput.click();
      return;
    }

    // Si no estamos en una tabla, determinar la posición de inserción
    var insertIndex;

    if (lastFocusedBlock) {
      // Insertar después del último bloque
      var blockId = parseInt(lastFocusedBlock.getAttribute('data-block-id'));
      insertIndex = this.getBlockIndex(blockId) + 1;
    } else {
      // Si no hay bloques, insertar al principio
      insertIndex = 0;
    }

    // Crear input file oculto para seleccionar imagen
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.onchange = function(e) {
      var file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        self.showImageDimensionsModal(file, insertIndex);
      }
      // Limpiar el input
      document.body.removeChild(fileInput);
    };

    // Cancelar si no se selecciona archivo
    fileInput.oncancel = function() {
      document.body.removeChild(fileInput);
    };

    document.body.appendChild(fileInput);
    fileInput.click();
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

          // Crear el bloque de imagen con el blob
          self.createImageBlock(file, e.target.result, width, height, insertIndex);

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
   * Crea un bloque de imagen con el archivo seleccionado
   */
  meWYSE.prototype.createImageBlock = function(file, dataUrl, width, height, insertIndex) {

    // Crear un nuevo bloque de imagen
    var newBlock = {
      id: ++this.currentBlockId,
      type: 'image',
      content: {
        blob: dataUrl, // Guardamos el dataURL (blob) de la imagen
        fileName: file.name,
        fileType: file.type,
        width: width,
        height: height
      }
    };

    this.blocks.splice(insertIndex, 0, newBlock);
    this.render();
    this.triggerChange();
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
  };

  /**
   * Cambia el tipo de bloque desde la toolbar y restaura el foco
   */
  meWYSE.prototype.changeBlockTypeFromToolbar = function(type) {
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

    // Renderizar bloques con agrupacion de listas
    var i = 0;
    while (i < this.blocks.length) {
      var block = this.blocks[i];

      // Verificar si es un tipo de lista que necesita agrupacion
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listType = block.type;
        var listWrapper;

        // Crear el wrapper apropiado
        if (listType === 'bulletList') {
          listWrapper = document.createElement('ul');
          listWrapper.className = 'mewyse-list-group';
        } else if (listType === 'numberList') {
          listWrapper = document.createElement('ol');
          listWrapper.className = 'mewyse-list-group';
        } else { // checklist
          listWrapper = document.createElement('ul');
          listWrapper.className = 'mewyse-list-group mewyse-checklist-group';
        }

        // Agregar todos los elementos consecutivos del mismo tipo
        while (i < this.blocks.length && this.blocks[i].type === listType) {
          var listItem = this.createBlockElement(this.blocks[i]);
          listWrapper.appendChild(listItem);
          i++;
        }

        self.container.appendChild(listWrapper);
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

    // Restaurar el foco si había uno
    if (focusedBlockId !== null) {
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

    element.ondragover = function(e) {
      if (self.draggedBlockId !== null && self.draggedBlockId !== blockId) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        element.classList.add('drag-over');
      }
    };

    element.ondragleave = function(e) {
      element.classList.remove('drag-over');
    };

    element.ondrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      element.classList.remove('drag-over');

      if (self.draggedBlockId !== null && self.draggedBlockId !== blockId) {
        self.moveBlock(self.draggedBlockId, blockId);
      }
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
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.border = '1px solid #ddd';

    // Si ya hay contenido (tabla cargada), parsearlo
    if (block.content && block.content !== '') {
      table.innerHTML = block.content;

      // Hacer todas las celdas editables y añadir controles
      var cells = table.querySelectorAll('td, th');
      for (var c = 0; c < cells.length; c++) {
        var cell = cells[c];
        cell.style.border = '1px solid #ddd';
        cell.style.padding = '0';

        // Verificar si la celda contiene una imagen
        var imgInCell = cell.querySelector('img.mewyse-image');
        if (imgInCell) {
          imgInCell.onclick = function(e) {
            e.stopPropagation();
            var cellElement = this.closest('td, th');
            self.selectImage(this, null, true, cellElement);
          };
          imgInCell.setAttribute('data-in-table', 'true');
          imgInCell.setAttribute('tabindex', '0');
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
        cellContent.style.padding = '8px';
        cellContent.style.margin = '0';
        cellContent.style.minHeight = '1em';

        this.attachTableCellEvents(cellContent, block.id);
      }
    } else {
      // Crear tabla 3x3 por defecto
      var tbody = document.createElement('tbody');
      for (var r = 0; r < 3; r++) {
        var row = document.createElement('tr');
        for (var col = 0; col < 3; col++) {
          var cell = document.createElement('td');
          cell.style.border = '1px solid #ddd';
          cell.style.padding = '0';

          var cellContent = document.createElement('p');
          cellContent.contentEditable = true;
          cellContent.style.padding = '8px';
          cellContent.style.margin = '0';
          cellContent.style.minHeight = '1em';
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
        element.style.width = '100%';
        element.style.borderCollapse = 'collapse';
        element.style.border = '1px solid #ddd';

        // Si ya hay contenido (tabla cargada), parsearlo
        if (block.content && block.content !== '') {
          element.innerHTML = block.content;

          // Hacer todas las celdas editables y añadir controles
          var cells = element.querySelectorAll('td, th');
          for (var c = 0; c < cells.length; c++) {
            var cell = cells[c];
            cell.style.border = '1px solid #ddd';
            cell.style.padding = '0'; // Sin padding en la celda, lo tendrá el elemento interno

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
            cellContent.style.padding = '8px';
            cellContent.style.margin = '0';
            cellContent.style.minHeight = '1em';

            this.attachTableCellEvents(cellContent, block.id);
          }
        } else {
          // Crear tabla 3x3 por defecto
          var tbody = document.createElement('tbody');
          for (var r = 0; r < 3; r++) {
            var row = document.createElement('tr');
            for (var col = 0; col < 3; col++) {
              var cell = document.createElement('td');
              cell.style.border = '1px solid #ddd';
              cell.style.padding = '0'; // Sin padding en la celda

              // Crear párrafo interno editable
              var cellContent = document.createElement('p');
              cellContent.contentEditable = true;
              cellContent.style.padding = '8px';
              cellContent.style.margin = '0';
              cellContent.style.minHeight = '1em';
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

    // Obtener el contenido del portapapeles
    var clipboardData = e.clipboardData || (window.clipboardData ? window.clipboardData : null);
    if (!clipboardData) return;
    var htmlData = clipboardData.getData('text/html');
    var plainText = clipboardData.getData('text/plain');

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
   * Procesa HTML pegado y crea bloques apropiados
   * @param {string} html
   * @param {number} currentBlockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.processPastedHTML = function(html, currentBlockId, element) {
    this.pushHistory(true);
    var self = this;
    var parser, doc;
    try {
      parser = new DOMParser();
      doc = parser.parseFromString(html, 'text/html');
    } catch (e) {
      // Fallback: tratar como texto plano
      this.processPastedPlainText(html.replace(/<[^>]*>/g, ''), currentBlockId, element);
      return;
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
        // Si hay contenido acumulado antes del BR, ya se habrá procesado
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
        if (tableContent) {
          blocksToInsert.push({
            type: 'table',
            content: tableContent
          });
        }
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
                childTag === 'TABLE' || childTag === 'BR') {
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

    // Si no hay bloques, intentar con el texto plano
    if (blocksToInsert.length === 0) {
      var plainText = doc.body.textContent || '';
      if (plainText.trim()) {
        this.processPastedPlainText(plainText, currentBlockId, element);
      }
      return;
    }

    // Filtrar bloques vacíos y limpiar contenido
    blocksToInsert = blocksToInsert.filter(function(block) {
      return block.content.trim() !== '' || block.type === 'divider';
    });

    if (blocksToInsert.length === 0) {
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
    // Eliminar comentarios de Word
    var comments = doc.querySelectorAll('o\\:p, xml, style, meta');
    for (var i = 0; i < comments.length; i++) {
      comments[i].remove();
    }

    // Eliminar clases y estilos de Microsoft Office
    var allElements = doc.querySelectorAll('*');
    for (var j = 0; j < allElements.length; j++) {
      var el = allElements[j];
      el.removeAttribute('class');
      el.removeAttribute('style');
      el.removeAttribute('id');
      // Eliminar atributos de Word
      var attrs = el.attributes;
      var attrsToRemove = [];
      for (var k = 0; k < attrs.length; k++) {
        var attrName = attrs[k].name;
        if (attrName.indexOf('mso-') === 0 || attrName.indexOf('data-') === 0 ||
            attrName.indexOf('xmlns') === 0 || attrName.indexOf('o:') === 0) {
          attrsToRemove.push(attrName);
        }
      }
      for (var l = 0; l < attrsToRemove.length; l++) {
        el.removeAttribute(attrsToRemove[l]);
      }
    }

    // Reemplazar &nbsp; con espacios normales
    var walker = document.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var textNode;
    while (textNode = walker.nextNode()) {
      textNode.textContent = textNode.textContent.replace(/\u00A0/g, ' ');
    }

    // Desenvolver SPANs vacíos o que solo contienen formato
    var spans = doc.querySelectorAll('span');
    for (var m = spans.length - 1; m >= 0; m--) {
      var span = spans[m];
      // Si el span no tiene atributos útiles, desenvolverlo
      if (!span.getAttribute('href')) {
        while (span.firstChild) {
          span.parentNode.insertBefore(span.firstChild, span);
        }
        span.remove();
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

    // Opción de combinar (solo si hay múltiples celdas)
    if (this.selectedTableCells.length >= 2) {
      var mergeBtn = document.createElement('button');
      mergeBtn.className = 'mewyse-cell-menu-btn';
      mergeBtn.innerHTML = '<span class="icon">' + WYSIWYG_ICONS.mergeCells + '</span> ' + this.t('tableMenu.mergeCells');
      mergeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.mergeSelectedCells(blockId);
        if (menu._cancelAnchor) menu._cancelAnchor();
        menu.remove();
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
        if (menu._cancelAnchor) menu._cancelAnchor();
        menu.remove();
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
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);
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
          menu.remove();
          // Usar setTimeout para evitar conflictos con el evento de "cerrar menú"
          setTimeout(function() {
            self.showTableColorPicker(table, rowIndex, -1, blockId, button);
          }, 50);
        } else {
          self.executeRowAction(table, rowIndex, opt.action, blockId);
          menu.remove();
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
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);
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
          menu.remove();
          // Usar setTimeout para evitar conflictos con el evento de "cerrar menú"
          setTimeout(function() {
            self.showTableColorPicker(table, -1, colIndex, blockId, button);
          }, 50);
        } else {
          self.executeColAction(table, colIndex, opt.action, blockId);
          menu.remove();
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
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);
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
        picker.remove();
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
      picker.remove();
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
          picker.remove();
          document.removeEventListener('click', closePicker);
        }
      });
    }, 10);

    // Evitar que se cierre al hacer clic en el picker
    picker.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });
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

      // Crear input de archivo
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';

      fileInput.onchange = function(e) {
        var file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          self.showImageDimensionsModal(file, blockIndex);
        }
        document.body.removeChild(fileInput);
      };

      fileInput.oncancel = function() {
        document.body.removeChild(fileInput);
      };

      document.body.appendChild(fileInput);
      fileInput.click();
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

    if (isCtrlOrCmd && !e.shiftKey) {
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
    }

    // Enter: crear nuevo bloque
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      // Evitar múltiples llamadas simultáneas
      if (this._isAddingBlock) {
        return;
      }
      this._isAddingBlock = true;

      // CRÍTICO: Quitar el foco del elemento actual ANTES de crear el nuevo bloque
      // Esto evita que el elemento actual robe el foco cuando se crea el nuevo
      element.blur();

      var index = this.getBlockIndex(blockId);
      var self = this;

      // Obtener el tipo del bloque actual para mantener el tipo en listas
      var currentBlock = this.getBlock(blockId);
      var newBlockType = 'paragraph';

      // Obtener el contenido actual del bloque
      var currentContent = element.textContent || '';
      var isEmpty = currentContent.trim() === '';

      // Si el bloque actual es una lista
      if (currentBlock && (currentBlock.type === 'bulletList' || currentBlock.type === 'numberList' || currentBlock.type === 'checklist')) {
        // Si el bloque de lista está vacío, salir de la lista y crear un párrafo
        if (isEmpty) {
          newBlockType = 'paragraph';
        } else {
          // Si tiene contenido, mantener el tipo de lista
          newBlockType = currentBlock.type;
        }
      }

      // Usar setTimeout para asegurar que el blur se completa antes de añadir el bloque
      setTimeout(function() {
        self.addBlock(newBlockType, index + 1);

        // Resetear el flag después de crear el bloque
        setTimeout(function() {
          self._isAddingBlock = false;
        }, 100);
      }, 0);

      return;
    }

    // Backspace en bloque vacío: eliminar bloque
    if (e.key === 'Backspace') {
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

    // Si es una tabla, añadir la opción de "Ajustar al 100%"
    if (isTable && !hasMultipleSelection) {
      options.splice(2, 0, {
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
          if (menu._cancelAnchor) menu._cancelAnchor();
          if (menu._cleanupSelection) menu._cleanupSelection();
          menu.remove();
          self.showBlockTypeMenu(blockId, button);
        } else if (option.action === 'insertAbove') {
          var index = self.getBlockIndex(blockId);
          if (index !== -1) {
            self.addBlock('paragraph', index);
          }
          if (menu._cancelAnchor) menu._cancelAnchor();
          if (menu._cleanupSelection) menu._cleanupSelection();
          menu.remove();
        } else if (option.action === 'insertBelow') {
          var index = self.getBlockIndex(blockId);
          if (index !== -1) {
            self.addBlock('paragraph', index + 1);
          }
          if (menu._cancelAnchor) menu._cancelAnchor();
          if (menu._cleanupSelection) menu._cleanupSelection();
          menu.remove();
        } else if (option.action === 'duplicate') {
          self.duplicateBlock(blockId);
          if (menu._cancelAnchor) menu._cancelAnchor();
          if (menu._cleanupSelection) menu._cleanupSelection();
          menu.remove();
        } else if (option.action === 'resetTableWidth') {
          self.resetTableColumnWidths(blockId);
          if (menu._cancelAnchor) menu._cancelAnchor();
          if (menu._cleanupSelection) menu._cleanupSelection();
          menu.remove();
        } else if (option.action === 'delete') {
          // Si hay selección múltiple, eliminar todos los seleccionados
          if (self.selectedBlocks.length > 1) {
            self.deleteSelectedBlocks();
          } else {
            self.deleteBlock(blockId);
          }
          if (menu._cancelAnchor) menu._cancelAnchor();
          if (menu._cleanupSelection) menu._cleanupSelection();
          menu.remove();
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
          if (menu._cancelAnchor) menu._cancelAnchor();
          if (menu._cleanupSelection) menu._cleanupSelection();
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);
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
        if (menu._cancelAnchor) menu._cancelAnchor();
        if (menu._cleanupSelection) menu._cleanupSelection();
        menu.remove();
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
          if (menu._cancelAnchor) menu._cancelAnchor();
          if (menu._cleanupSelection) menu._cleanupSelection();
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 10);
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
  meWYSE.prototype.addBlock = function(type, index) {
    this.pushHistory(true);
    var block = {
      id: ++this.currentBlockId,
      type: type || 'paragraph',
      content: ''
    };

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
      return block.content || '';
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

    while (i < blocks.length) {
      var block = blocks[i];
      var content = block.content || '';

      // Agrupar listas consecutivas del mismo tipo
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listType = block.type;
        var listTag = listType === 'numberList' ? 'ol' : 'ul';
        var listClass = listType === 'checklist' ? ' class="checklist"' : '';
        html += '<' + listTag + listClass + '>';

        // Añadir todos los elementos de lista consecutivos del mismo tipo
        while (i < blocks.length && blocks[i].type === listType) {
          var listContent = blocks[i].content || '';
          if (listType === 'checklist') {
            var checked = blocks[i].checked ? ' checked' : '';
            html += '<li><input type="checkbox"' + checked + ' disabled> ' + listContent + '</li>';
          } else {
            html += '<li>' + listContent + '</li>';
          }
          i++;
        }

        html += '</' + listTag + '>';
      } else {
        // Procesar bloques que no son listas
        switch (block.type) {
          case 'heading1':
            html += '<h1>' + content + '</h1>';
            break;
          case 'heading2':
            html += '<h2>' + content + '</h2>';
            break;
          case 'heading3':
            html += '<h3>' + content + '</h3>';
            break;
          case 'quote':
            html += '<blockquote>' + content + '</blockquote>';
            break;
          case 'code':
            // Solo escapar HTML en bloques de código
            html += '<pre><code>' + escapeHtml(content) + '</code></pre>';
            break;
          case 'table':
            html += '<table style="width:100%;border-collapse:collapse;border:1px solid #ddd">';
            html += content;
            html += '</table>';
            break;
          case 'image':
            if (typeof block.content === 'object' && block.content.blob) {
              html += '<img src="' + block.content.blob + '" alt="' + escapeHtml(block.content.fileName || 'Imagen') + '" width="' + block.content.width + '" height="' + block.content.height + '" />';
            }
            break;
          case 'divider':
            html += '<hr>';
            break;
          default:
            html += '<p>' + content + '</p>';
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

    while (i < blocks.length) {
      var block = blocks[i];

      // Agrupar listas consecutivas del mismo tipo
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listType = block.type;
        var listTag = listType === 'numberList' ? 'ol' : 'ul';
        var listClass = listType === 'checklist' ? ' class="checklist"' : '';
        html += '<' + listTag + listClass + '>';

        // Añadir todos los elementos de lista consecutivos del mismo tipo
        while (i < blocks.length && blocks[i].type === listType) {
          var content = blocks[i].content || '';
          if (listType === 'checklist') {
            var checked = blocks[i].checked ? ' checked' : '';
            html += '<li><input type="checkbox"' + checked + ' disabled> ' + content + '</li>';
          } else {
            html += '<li>' + content + '</li>';
          }
          i++;
        }

        html += '</' + listTag + '>';
      } else {
        // Para el código fuente HTML, usamos el contenido directo sin escapar
        // ya que el contenido puede contener etiquetas HTML de formato
        var content = block.content || '';

        // Procesar bloques que no son listas
        switch (block.type) {
          case 'heading1':
            html += '<h1>' + content + '</h1>';
            break;
          case 'heading2':
            html += '<h2>' + content + '</h2>';
            break;
          case 'heading3':
            html += '<h3>' + content + '</h3>';
            break;
          case 'quote':
            html += '<blockquote>' + content + '</blockquote>';
            break;
          case 'code':
            html += '<pre><code>' + escapeHtml(content) + '</code></pre>';
            break;
          case 'table':
            html += '<table style="width:100%;border-collapse:collapse;border:1px solid #ddd">';
            html += content;
            html += '</table>';
            break;
          case 'image':
            if (typeof block.content === 'object' && block.content.blob) {
              html += '<img src="' + block.content.blob + '" alt="' + escapeHtml(block.content.fileName || 'Imagen') + '" width="' + block.content.width + '" height="' + block.content.height + '" />';
            }
            break;
          case 'divider':
            html += '<hr>';
            break;
          default:
            html += '<p>' + content + '</p>';
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

    // Proteger bloques de código inline con placeholders
    var codeBlocks = [];
    text = text.replace(/`([^`]+)`/g, function(match, code) {
      var idx = codeBlocks.length;
      codeBlocks.push('<code>' + code + '</code>');
      return '\x00CODE' + idx + '\x00';
    });

    // Links: [texto](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

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

    this.blocks = newBlocks;
    this.currentBlockId = blockId;
    this.render();
    this.triggerChange();
  };

  /**
   * Carga contenido desde JSON
   * @param {string|Object} json
   */
  meWYSE.prototype.loadFromJSON = function(json) {
    this.pushHistory(true);
    var data = typeof json === 'string' ? JSON.parse(json) : json;
    this.blocks = data;

    // Actualizar currentBlockId
    var maxId = 0;
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id > maxId) {
        maxId = this.blocks[i].id;
      }
    }
    this.currentBlockId = maxId;

    this.render();
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

    this.onChange({
      blocks: this.blocks,
      plainText: this.getPlainText(),
      html: this.getHTML(),
      json: this.getJSON(),
      markdown: this.getMarkdown()
    });
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
      { action: 'toggleCase', label: 'Aa', titleKey: 'tooltips.toggleCase', type: 'toggleCase' },
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
          if (tool.type === 'toggleCase') {
            self.toggleCrossBlockCase();
          } else if (tool.type === 'colorPicker') {
            self.showUnifiedColorPicker(button);
          } else if (tool.command === 'createLink') {
            // Links no soportados en cross-block, ignorar
          } else if (tool.command) {
            self.applyCrossBlockFormat(tool.command);
          }
        } else {
          // Normal single-block
          if (tool.type === 'toggleCase') {
            self.toggleSelectionCase();
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
        picker.remove();
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
      picker.remove();
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
          picker.remove();
          document.removeEventListener('click', closePicker);
        }
      });
    }, 10);

    // Evitar que se cierre al hacer clic en el picker
    picker.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });
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
        picker.remove();
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
      picker.remove();
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
        picker.remove();
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
      picker.remove();
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
      picker.remove();
      window.removeEventListener('scroll', scrollHandler, true);
      window.removeEventListener('resize', scrollHandler);
      document.removeEventListener('click', clickHandler);
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
    // Delegar a cross-block si hay selección activa
    if (this.crossBlockSelection) {
      this.toggleCrossBlockCase();
      return;
    }

    var selection = window.getSelection();
    if (!selection.rangeCount) return;

    var range = selection.getRangeAt(0);
    var selectedText = range.toString();
    if (!selectedText) return;

    // Determinar la transformación: si tiene alguna minúscula, pasar a mayúsculas; si no, a minúsculas
    var transformed;
    if (selectedText !== selectedText.toUpperCase()) {
      transformed = selectedText.toUpperCase();
    } else {
      transformed = selectedText.toLowerCase();
    }

    // Insertar el texto transformado manteniendo la selección
    range.deleteContents();
    var textNode = document.createTextNode(transformed);
    range.insertNode(textNode);

    // Restaurar la selección sobre el texto transformado
    var newRange = document.createRange();
    newRange.selectNodeContents(textNode);
    selection.removeAllRanges();
    selection.addRange(newRange);

    this.triggerChange();
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

    // Posicionar tooltip
    var buttonRect = this.summaryButton.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = (buttonRect.bottom + 5) + 'px';
    tooltip.style.right = '10px';

    document.body.appendChild(tooltip);
    this.summaryTooltip = tooltip;
  };

  /**
   * Oculta el tooltip
   */
  meWYSE.prototype.hideSummaryTooltip = function() {
    if (this.summaryTooltip) {
      this.summaryTooltip.remove();
      this.summaryTooltip = null;
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
    if (!this.crossBlockSelection) return;

    var sel = this.crossBlockSelection;

    // Primero, recolectar todo el texto para determinar la transformación
    var allText = '';
    for (var i = 0; i < sel.blockIds.length; i++) {
      var range = this.getRangeForBlock(sel.blockIds[i], sel);
      if (range) allText += range.toString();
    }

    var toUpper = (allText !== allText.toUpperCase());

    // Ahora aplicar la transformación bloque por bloque
    for (var j = 0; j < sel.blockIds.length; j++) {
      var blockId = sel.blockIds[j];
      var range2 = this.getRangeForBlock(blockId, sel);
      if (!range2) continue;

      var text = range2.toString();
      if (!text) continue;

      var transformed = toUpper ? text.toUpperCase() : text.toLowerCase();
      range2.deleteContents();
      range2.insertNode(document.createTextNode(transformed));
    }

    // Limpiar estado cross-block y cerrar menú de formato
    this.clearCrossBlockSelection();
    this.closeFormatMenu();
    this.triggerChange();
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
      s + ' .mewyse-block-content table { width: 100%; border-collapse: collapse; border: 1px solid #ddd; margin: 4px 0; position: relative; }\n' +
      s + ' .mewyse-block-content table td, ' + s + ' .mewyse-block-content table th { border: 1px solid #ddd; padding: 8px; min-width: 50px; outline: none; position: relative; }\n' +
      s + ' .mewyse-block-content table td:focus, ' + s + ' .mewyse-block-content table th:focus { background-color: #f0f8ff; }\n' +
      s + ' .mewyse-block-content table td:empty:before, ' + s + ' .mewyse-block-content table th:empty:before { content: ""; color: #aaa; }\n' +
      s + ' table td > p, ' + s + ' table td > h1, ' + s + ' table td > h2, ' + s + ' table td > h3, ' +
        s + ' table td > blockquote, ' + s + ' table td > pre, ' + s + ' table td > ul, ' + s + ' table td > ol, ' +
        s + ' table th > p, ' + s + ' table th > h1, ' + s + ' table th > h2, ' + s + ' table th > h3, ' +
        s + ' table th > blockquote, ' + s + ' table th > pre, ' + s + ' table th > ul, ' + s + ' table th > ol ' +
        '{ outline: none; width: 100%; min-height: 1em; margin: 0; padding: 8px; }\n' +
      s + ' table td > p:focus, ' + s + ' table th > p:focus { background-color: transparent; }\n' +
      s + ' table td > p:empty:before, ' + s + ' table th > p:empty:before { content: attr(data-placeholder); color: #aaa; pointer-events: none; }\n' +
      s + ' .mewyse-mention { background-color: #e8f0fe; color: #1a73e8; padding: 2px 6px; border-radius: 4px; font-weight: 500; cursor: default; user-select: all; display: inline; white-space: nowrap; }\n' +
      s + ' .mewyse-mention:hover { background-color: #d2e3fc; }\n' +
      s + ' .mewyse-emoji { display: inline; cursor: default; user-select: all; }\n' +
      s + ' .mewyse-list-group { margin: 0; padding-left: 24px; }\n' +
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
