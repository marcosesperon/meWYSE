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
  toolbar?: boolean;
  summary?: boolean;
  theme?: 'dark' | 'compact' | string;
  readOnly?: boolean;
  rtl?: boolean;
  wordWrap?: boolean;
  wordWrapToggle?: boolean;
  contentStyles?: boolean;
  lang?: 'es' | 'en' | Record<string, any>;
  autoFocus?: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
  autoExpand?: boolean;
  charCounter?: boolean;
  findReplace?: boolean;
  fullscreen?: boolean;
  showBlocksToggle?: boolean;
  mentions?: MeWyseMention[];
  tags?: any[];
  mergeTags?: Array<{ id: string; name: string; label?: string }>;
  styleFormats?: Array<{ title: string; block: string; className: string }>;
  fontControls?: boolean;
  exportTools?: boolean;
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
