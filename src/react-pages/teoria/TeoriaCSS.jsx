import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaCSS() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>CSS3 y Layouts</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>🎨 CSS3 y Layouts</h1>
          <p>
            CSS (Cascading Style Sheets) controla la apariencia visual de los elementos HTML:
            colores, tipografías, espaciados, animaciones y la disposición de elementos en pantalla.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>Selectores</h2>
            <p>Los selectores apuntan a qué elementos aplicar los estilos.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">CSS</span>
              </div>
              <pre><code>{`/* Por etiqueta */
p { color: gray; }

/* Por clase */
.titulo { font-size: 2rem; }

/* Por ID */
#menu { background: black; }

/* Descendiente */
.card p { color: #555; }

/* Pseudo-clase */
a:hover { color: blue; }
li:first-child { font-weight: bold; }

/* Pseudo-elemento */
p::first-line { font-weight: bold; }
.btn::after { content: " →"; }`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Box Model</h2>
            <p>
              Todo elemento HTML es una caja rectangular. El <strong>box model</strong> define cómo
              se calcula su tamaño total.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">CSS</span>
              </div>
              <pre><code>{`/* Componentes del box model */
.caja {
  width: 200px;       /* ancho del contenido */
  height: 100px;      /* alto del contenido */
  padding: 16px;      /* espacio interior */
  border: 2px solid #ccc;  /* borde */
  margin: 24px;       /* espacio exterior */

  /* box-sizing: border-box hace que width incluya padding y border */
  box-sizing: border-box;
}`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>Aplicar <code>box-sizing: border-box</code> a todos los elementos (con <code>*</code>) es una buena práctica que evita sorpresas en los tamaños.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Flexbox</h2>
            <p>
              Flexbox es un sistema de layout unidimensional (fila o columna) ideal para
              alinear y distribuir elementos dentro de un contenedor.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">CSS</span>
              </div>
              <pre><code>{`/* Contenedor flex */
.contenedor {
  display: flex;
  flex-direction: row;         /* row | column */
  justify-content: center;     /* eje principal: start|center|end|space-between|space-around */
  align-items: center;         /* eje secundario: stretch|center|start|end */
  gap: 16px;                   /* espacio entre items */
  flex-wrap: wrap;             /* permite salto de línea */
}

/* Item flex */
.item {
  flex: 1;                     /* crece para llenar espacio disponible */
  flex-shrink: 0;              /* no se encoge */
  align-self: flex-start;      /* alineación individual */
}`}</code></pre>
            </div>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr><th>Propiedad</th><th>Valor</th><th>Efecto</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>justify-content</code></td><td><code>space-between</code></td><td>Items con espacio entre ellos</td></tr>
                  <tr><td><code>justify-content</code></td><td><code>center</code></td><td>Items centrados horizontalmente</td></tr>
                  <tr><td><code>align-items</code></td><td><code>center</code></td><td>Items centrados verticalmente</td></tr>
                  <tr><td><code>flex-direction</code></td><td><code>column</code></td><td>Items apilados verticalmente</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="doc-section">
            <h2>CSS Grid</h2>
            <p>
              Grid es un sistema de layout bidimensional (filas Y columnas). Perfecto para estructuras
              de página más complejas.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">CSS</span>
              </div>
              <pre><code>{`/* Grid básico */
.grilla {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 columnas iguales */
  grid-template-rows: auto;
  gap: 24px;
}

/* Grid responsivo sin media queries */
.grilla-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* Span de columnas / filas */
.destacado {
  grid-column: span 2;   /* ocupa 2 columnas */
  grid-row: span 2;      /* ocupa 2 filas */
}

/* Layout de página completa */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Responsive Design y Media Queries</h2>
            <p>Las media queries permiten aplicar estilos según el tamaño de la pantalla.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">CSS</span>
              </div>
              <pre><code>{`/* Estrategia Mobile First: empezar con estilos para móvil */
.contenedor {
  padding: 16px;          /* móvil */
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .contenedor {
    padding: 32px;
  }
  .grilla {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .contenedor {
    padding: 64px;
  }
  .grilla {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Breakpoints comunes */
/* sm: 640px  |  md: 768px  |  lg: 1024px  |  xl: 1280px */`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span><strong>Mobile First</strong>: Diseñar primero para móvil y luego escalar a pantallas más grandes es la mejor práctica actual.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Variables CSS (Custom Properties)</h2>
            <p>Las variables CSS permiten reutilizar valores y crear sistemas de diseño consistentes.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">CSS</span>
              </div>
              <pre><code>{`/* Definir variables en :root (disponibles globalmente) */
:root {
  --color-primary: #6366f1;
  --color-dark: #0f172a;
  --color-gray: #64748b;
  --font-size-base: 1rem;
  --radius: 8px;
  --shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Usar variables */
.boton {
  background: var(--color-primary);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* Sobreescribir en un componente */
.tarjeta {
  --radius: 16px;
  border-radius: var(--radius);  /* usa 16px */
}`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-html">← HTML5 Fundamentos</Link>
          <Link to="/docs/teoria-javascript">JavaScript Fundamentos →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaCSS
