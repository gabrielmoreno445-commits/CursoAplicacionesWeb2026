import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaHTML() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>HTML5 Fundamentos</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>🌐 HTML5 Fundamentos</h1>
          <p>
            HTML (HyperText Markup Language) es el lenguaje de marcado que estructura el contenido de la web.
            Define qué es cada elemento: un título, un párrafo, una imagen, un enlace.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>¿Qué es HTML?</h2>
            <p>
              HTML no es un lenguaje de programación — es un lenguaje de <strong>marcado</strong>. Le dice al navegador
              cómo interpretar y mostrar el contenido. Cada instrucción se escribe con <strong>etiquetas</strong> (tags).
            </p>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>HTML define <strong>qué</strong> es el contenido. CSS define <strong>cómo se ve</strong>. JavaScript define <strong>cómo se comporta</strong>.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Estructura básica</h2>
            <p>Todo documento HTML válido tiene esta estructura mínima:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">HTML</span>
              </div>
              <pre><code>{`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi página</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- Acá va el contenido visible -->
    <h1>Hola mundo</h1>
    <p>Mi primera página web.</p>
    <script src="app.js"></script>
  </body>
</html>`}</code></pre>
            </div>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr><th>Etiqueta</th><th>Función</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>Declara el tipo de documento (HTML5)</td></tr>
                  <tr><td><code>&lt;html&gt;</code></td><td>Raíz del documento</td></tr>
                  <tr><td><code>&lt;head&gt;</code></td><td>Metadatos, título, links a CSS/JS</td></tr>
                  <tr><td><code>&lt;body&gt;</code></td><td>Contenido visible de la página</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="doc-section">
            <h2>Etiquetas esenciales</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">HTML</span>
              </div>
              <pre><code>{`<!-- Títulos (h1 es el más importante, h6 el menor) -->
<h1>Título principal</h1>
<h2>Subtítulo</h2>
<h3>Sección</h3>

<!-- Texto -->
<p>Párrafo normal.</p>
<strong>Texto en negrita</strong>
<em>Texto en cursiva</em>
<span>Texto inline sin semántica</span>

<!-- Listas -->
<ul>                         <!-- lista sin orden -->
  <li>Manzana</li>
  <li>Naranja</li>
</ul>

<ol>                         <!-- lista numerada -->
  <li>Primero</li>
  <li>Segundo</li>
</ol>

<!-- Enlace -->
<a href="https://google.com" target="_blank">Ir a Google</a>

<!-- Imagen -->
<img src="foto.jpg" alt="Descripción de la imagen" />

<!-- División (contenedor genérico) -->
<div class="contenedor">...</div>`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>HTML Semántico</h2>
            <p>
              HTML5 introdujo etiquetas semánticas que describen el <em>significado</em> del contenido,
              no solo su apariencia. Mejoran la accesibilidad y el SEO.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">HTML</span>
              </div>
              <pre><code>{`<header>
  <nav>
    <a href="/">Inicio</a>
    <a href="/about">Nosotros</a>
  </nav>
</header>

<main>
  <section>
    <h2>Artículos recientes</h2>
    <article>
      <h3>Título del artículo</h3>
      <p>Contenido del artículo...</p>
    </article>
  </section>

  <aside>
    <p>Contenido relacionado o publicidad</p>
  </aside>
</main>

<footer>
  <p>© 2026 Mi Sitio</p>
</footer>`}</code></pre>
            </div>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr><th>Etiqueta</th><th>Uso</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>&lt;header&gt;</code></td><td>Encabezado de la página o sección</td></tr>
                  <tr><td><code>&lt;nav&gt;</code></td><td>Menú de navegación</td></tr>
                  <tr><td><code>&lt;main&gt;</code></td><td>Contenido principal (único por página)</td></tr>
                  <tr><td><code>&lt;section&gt;</code></td><td>Sección temática del contenido</td></tr>
                  <tr><td><code>&lt;article&gt;</code></td><td>Contenido independiente (post, noticia)</td></tr>
                  <tr><td><code>&lt;aside&gt;</code></td><td>Contenido complementario (sidebar)</td></tr>
                  <tr><td><code>&lt;footer&gt;</code></td><td>Pie de página</td></tr>
                </tbody>
              </table>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>Usar etiquetas semánticas hace tu código más legible y ayuda a lectores de pantalla (accesibilidad). Evitá usar <code>&lt;div&gt;</code> para todo.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Formularios</h2>
            <p>Los formularios permiten al usuario ingresar datos que luego se procesan con JavaScript.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">HTML</span>
              </div>
              <pre><code>{`<form action="/enviar" method="POST">

  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" />

  <label for="edad">Edad:</label>
  <input type="number" id="edad" name="edad" min="1" max="120" />

  <label for="pais">País:</label>
  <select id="pais" name="pais">
    <option value="ar">Argentina</option>
    <option value="mx">México</option>
    <option value="es">España</option>
  </select>

  <label>
    <input type="checkbox" name="terminos" /> Acepto los términos
  </label>

  <textarea name="mensaje" rows="4" placeholder="Tu mensaje..."></textarea>

  <button type="submit">Enviar</button>
</form>`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Atributos importantes</h2>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr><th>Atributo</th><th>Se usa en</th><th>Para qué sirve</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>id</code></td><td>Cualquier elemento</td><td>Identificador único (CSS / JS)</td></tr>
                  <tr><td><code>class</code></td><td>Cualquier elemento</td><td>Clase para CSS (puede repetirse)</td></tr>
                  <tr><td><code>href</code></td><td><code>&lt;a&gt;</code></td><td>URL de destino del enlace</td></tr>
                  <tr><td><code>src</code></td><td><code>&lt;img&gt;</code>, <code>&lt;script&gt;</code></td><td>Ruta del recurso</td></tr>
                  <tr><td><code>alt</code></td><td><code>&lt;img&gt;</code></td><td>Texto alternativo (accesibilidad)</td></tr>
                  <tr><td><code>type</code></td><td><code>&lt;input&gt;</code>, <code>&lt;button&gt;</code></td><td>Tipo de campo o botón</td></tr>
                  <tr><td><code>required</code></td><td><code>&lt;input&gt;</code></td><td>Campo obligatorio en formulario</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs">← Volver a Docs</Link>
          <Link to="/docs/teoria-css">CSS3 y Layouts →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaHTML
