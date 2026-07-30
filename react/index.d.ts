import * as React from 'react';
import meWYSE, { MeWyseOptions, MeWyseBlock, MeWyseChangePayload } from '../mewyse';

/** Props del componente <MeWyse> (wrapper NO controlado). Acepta todas las
 *  opciones del núcleo excepto `target`/`blocks` (gestionadas por el wrapper). */
export interface MeWyseProps
  extends Partial<Omit<MeWyseOptions, 'target' | 'blocks' | 'onChange' | 'onFocus' | 'onBlur'>> {
  /** Contenido inicial: array de bloques o string JSON. No controlado. */
  defaultValue?: MeWyseBlock[] | string;
  onChange?: (data: MeWyseChangePayload) => void;
  onFocus?: (data: MeWyseChangePayload) => void;
  onBlur?: (data: MeWyseChangePayload) => void;
  className?: string;
  style?: React.CSSProperties;
}

/** API imperativa expuesta por el ref del componente. */
export interface MeWyseHandle {
  getEditor(): meWYSE | null;
  getHTML(): string;
  getSafeHTML(): string;
  getJSON(): string;
  getMarkdown(): string;
  getPlainText(): string;
  loadFromJSON(value: string | MeWyseBlock[]): void;
  loadFromHTML(html: string): void;
  loadFromMarkdown(md: string): void;
  clear(): void;
  focus(): void;
}

export declare const MeWyse: React.ForwardRefExoticComponent<
  MeWyseProps & React.RefAttributes<MeWyseHandle>
>;
export default MeWyse;

export { MeWyseBlock, MeWyseChangePayload } from '../mewyse';
