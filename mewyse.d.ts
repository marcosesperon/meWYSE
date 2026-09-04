// Tipos de meWYSE (núcleo). El editor es un constructor ES5 sin dependencias.

export interface MeWyseBlock {
  id: number;
  /** 'paragraph' | 'heading1'..'heading3' | 'quote' | 'code' | 'bulletList' |
   *  'numberList' | 'checklist' | 'table' | 'image' | 'video' | 'audio' |
   *  'divider' | 'pageBreak' | 'callout' | 'toggle' | 'toc' */
  type: string;
  content?: any;
  checked?: boolean;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  indentLevel?: number;
  customClass?: string;
  tableStyle?: string;
  language?: string;
  toggleTitle?: string;
  collapsed?: boolean;
  calloutVariant?: 'info' | 'warning' | 'success' | 'danger';
  width?: number;
  height?: number;
}

export interface MeWyseChangePayload {
  blocks: MeWyseBlock[];
  html: string;
  markdown: string;
  plainText: string;
  json: string;
  focusedBlockId?: number;
  focusedBlockType?: string;
}

export interface MeWyseMention {
  id: string | number;
  name: string;
  avatar?: string;
  [key: string]: any;
}

export interface MeWyseOptions {
  /** Selector CSS o elemento del DOM donde montar el editor. */
  target: string | HTMLElement;
  blocks?: MeWyseBlock[];
  /** Toolbar declarativa (estilo TinyMCE):
   *  - `true` → todos los ítems por defecto
   *  - string → ítems separados por espacios, `|` crea grupos (ej. 'undo redo | bold italic | link')
   *  - string[] → una fila por string (con toolbarOverflow:'wrap')
   *  - `false`/ausente → sin toolbar
   *  Ítems: undo redo blocktype fontsize bold italic underline strikethrough
   *  subscript superscript case removeformat link forecolor font specialchars
   *  mergetags align outdent indent table image video audio find wordwrap summary
   *  showblocks sourcecode markdown fullscreen print exportword exportpdf moveup movedown. */
  toolbar?: boolean | string | string[];
  summary?: boolean;
  /** Tema: 'dark' (oscuro), 'auto' (sigue prefers-color-scheme del OS en vivo),
   *  'compact', o custom. Sin especificar → claro (no auto-detecta). */
  theme?: 'dark' | 'auto' | 'compact' | string;
  readOnly?: boolean;
  rtl?: boolean;
  wordWrap?: boolean;
  contentStyles?: boolean;
  lang?: 'es' | 'en' | Record<string, any>;
  autoFocus?: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
  autoExpand?: boolean;
  /** Tipos de bloque que NO se pueden insertar desde la UI (toolbar, slash, paste
   *  HTML). No afecta a contenido programático (blocks/loadFromJSON). */
  disabledBlocks?: string[];
  charCounter?: boolean;
  mentions?: MeWyseMention[];
  tags?: any[];
  mergeTags?: Array<{ id: string; name: string; label?: string }>;
  styleFormats?: Array<{ title: string; block: string; className: string }>;
  pdfLib?: string;
  autosave?: boolean;
  autosaveKey?: string;
  codeHighlight?: boolean;
  codeHighlightUrl?: string;
  pasteAsText?: boolean;
  imageMaxSize?: number;
  onImageUpload?: (
    file: File,
    cb: (data: { url: string; fileName?: string; width?: number; height?: number }) => void
  ) => void;
  onChange?: (data: MeWyseChangePayload) => void;
  onFocus?: (data: MeWyseChangePayload) => void;
  onBlur?: (data: MeWyseChangePayload) => void;
  [key: string]: any;
}

export default class meWYSE {
  constructor(options: MeWyseOptions);
  blocks: MeWyseBlock[];
  getHTML(): string;
  getSafeHTML(): string;
  getHTMLSource(): string;
  getJSON(): string;
  getMarkdown(): string;
  getPlainText(): string;
  loadFromJSON(json: string | MeWyseBlock[]): void;
  loadFromHTML(html: string): void;
  loadFromMarkdown(md: string): void;
  getResolvedHTML?(values: Record<string, string>): string;
  hasDraft(): boolean;
  restoreDraft(): boolean;
  clearDraft(): void;
  destroy(): void;
  [key: string]: any;
}
