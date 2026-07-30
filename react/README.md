# meWYSE — componente React

Wrapper **no controlado** del editor meWYSE. El núcleo sigue siendo ES5 sin
dependencias; este envoltorio no necesita build (ESM + `React.createElement`).

## Instalación

```bash
npm install mewyse react react-dom
```

## Uso

```jsx
import { useRef } from 'react';
import { MeWyse } from 'mewyse/react';
import 'mewyse/style.css'; // estilos del editor

export default function Editor() {
  const ref = useRef(null);

  return (
    <>
      <MeWyse
        ref={ref}
        toolbar
        theme="dark"
        minHeight={200}
        defaultValue={[
          { id: 1, type: 'heading1', content: 'Hola' },
          { id: 2, type: 'paragraph', content: 'Escribe aquí…' }
        ]}
        onChange={(data) => console.log(data.json)}
      />
      <button onClick={() => console.log(ref.current.getHTML())}>Ver HTML</button>
      <button onClick={() => ref.current.clear()}>Limpiar</button>
    </>
  );
}
```

## Props

- `defaultValue`: contenido inicial (array de bloques o string JSON). **No
  controlado** — cambiarlo después NO recarga; usa la API por `ref`.
- `onChange(data)` / `onFocus(data)` / `onBlur(data)`: reciben
  `{ blocks, html, markdown, plainText, json, focusedBlockId, focusedBlockType }`.
- `className` / `style`: se aplican al contenedor externo.
- **Cualquier otra prop** se pasa como opción del núcleo: `toolbar`, `summary`,
  `theme`, `readOnly`, `rtl`, `minHeight`, `maxHeight`, `autoExpand`, `mentions`,
  `mergeTags`, `codeHighlight`, `codeHighlightUrl`, `autosave`, etc.
  (ver opciones en el README principal).

## API imperativa (por `ref`)

`getEditor()`, `getHTML()`, `getSafeHTML()`, `getJSON()`, `getMarkdown()`,
`getPlainText()`, `loadFromJSON(v)`, `loadFromHTML(h)`, `loadFromMarkdown(m)`,
`clear()`, `focus()`.

## SSR (Next.js)

El editor solo se crea en el cliente (en `useEffect`), así que importar el
componente en servidor es seguro. Si tu framework ejecuta el render de cliente
con hidratación, no hace falta nada especial. Si prefieres cargarlo solo en
cliente:

```jsx
'use client';
// o con carga dinámica:
import dynamic from 'next/dynamic';
const MeWyse = dynamic(() => import('mewyse/react').then(m => m.MeWyse), { ssr: false });
```

## Notas

- **No controlado por diseño**: evita saltos de cursor. El source of truth es el
  contenido interno; sincroniza hacia fuera con `onChange` y hacia dentro con la
  API por `ref`.
- StrictMode (React 18): el `destroy()` del núcleo es idempotente, el
  montaje/desmontaje doble en desarrollo está soportado.
