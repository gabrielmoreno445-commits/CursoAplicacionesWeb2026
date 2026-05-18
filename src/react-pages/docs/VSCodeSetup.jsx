import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function VSCodeSetup() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>VS Code Setup</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--guia">Guía</span>
          <h1>💙 VS Code para Desarrollo Web</h1>
          <p>
            Configurá VS Code con las extensiones, atajos y settings ideales para desarrollar
            aplicaciones web con React, JavaScript y CSS de manera profesional.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2><span className="step-num">1</span> Extensiones esenciales</h2>
            <p>Instalá estas extensiones desde el Marketplace de VS Code (Ctrl+Shift+X):</p>

            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Extensión</th>
                    <th>Para qué sirve</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>ES7+ React/Redux Snippets</code></td>
                    <td>Snippets para React (rafce, useState, etc.)</td>
                  </tr>
                  <tr>
                    <td><code>Prettier</code></td>
                    <td>Formateador de código automático</td>
                  </tr>
                  <tr>
                    <td><code>ESLint</code></td>
                    <td>Linter para detectar errores en JavaScript</td>
                  </tr>
                  <tr>
                    <td><code>Auto Rename Tag</code></td>
                    <td>Renombra el tag de cierre automáticamente</td>
                  </tr>
                  <tr>
                    <td><code>CSS Peek</code></td>
                    <td>Ver y navegar a definiciones de CSS desde el HTML</td>
                  </tr>
                  <tr>
                    <td><code>GitLens</code></td>
                    <td>Superpoderes de Git dentro del editor</td>
                  </tr>
                  <tr>
                    <td><code>Thunder Client</code></td>
                    <td>Cliente REST para probar APIs (alternativa a Postman)</td>
                  </tr>
                  <tr>
                    <td><code>GitHub Copilot</code></td>
                    <td>Autocompletado con IA (requiere cuenta de GitHub)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal — instalar vía CLI</span>
              </div>
              <pre><code>{`code --install-extension dsznajder.es7-react-js-snippets
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension formulahendry.auto-rename-tag
code --install-extension pranaygp.vscode-css-peek
code --install-extension eamodio.gitlens`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">2</span> Configuración recomendada</h2>
            <p>Abrí <strong>settings.json</strong> con <code>Ctrl+Shift+P → Open User Settings (JSON)</code> y pegá:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">settings.json</span>
              </div>
              <pre><code>{`{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.fontSize": 14,
  "editor.lineHeight": 1.7,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.bracketPairColorization.enabled": true,
  "files.autoSave": "onFocusChange",
  "explorer.confirmDelete": false,
  "terminal.integrated.fontSize": 13,
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme"
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">3</span> Atajos de teclado imprescindibles</h2>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Atajo</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>Ctrl+P</code></td><td>Búsqueda rápida de archivos</td></tr>
                  <tr><td><code>Ctrl+Shift+P</code></td><td>Paleta de comandos</td></tr>
                  <tr><td><code>Ctrl+`</code></td><td>Abrir/cerrar terminal</td></tr>
                  <tr><td><code>Alt+Shift+F</code></td><td>Formatear documento</td></tr>
                  <tr><td><code>Ctrl+D</code></td><td>Seleccionar siguiente ocurrencia</td></tr>
                  <tr><td><code>Alt+↑/↓</code></td><td>Mover línea arriba/abajo</td></tr>
                  <tr><td><code>Ctrl+Shift+K</code></td><td>Eliminar línea</td></tr>
                  <tr><td><code>Ctrl+/</code></td><td>Comentar/descomentar</td></tr>
                  <tr><td><code>Ctrl+B</code></td><td>Ocultar/mostrar sidebar</td></tr>
                  <tr><td><code>F2</code></td><td>Renombrar símbolo</td></tr>
                  <tr><td><code>Ctrl+Click</code></td><td>Ir a definición</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">4</span> Snippets de React (ES7+)</h2>
            <p>Con la extensión de snippets instalada, estos atajos generan código automáticamente:</p>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Snippet</th>
                    <th>Genera</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>rafce</code></td><td>Componente de React con arrow function y export</td></tr>
                  <tr><td><code>useState</code></td><td>Declaración de useState con desestructuración</td></tr>
                  <tr><td><code>useEffect</code></td><td>useEffect con dependencias</td></tr>
                  <tr><td><code>imp</code></td><td>import ... from '...'</td></tr>
                  <tr><td><code>clg</code></td><td>console.log()</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="doc-section">
            <h2>Temas visuales recomendados</h2>
            <ul>
              <li><strong>One Dark Pro</strong> — el más popular, oscuro y cómodo para la vista</li>
              <li><strong>Dracula</strong> — colores vibrantes, muy legible</li>
              <li><strong>GitHub Light/Dark</strong> — familiar si usás mucho GitHub</li>
              <li><strong>Catppuccin</strong> — pastel suave, muy moderno</li>
            </ul>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>
                También instalá <strong>Material Icon Theme</strong> para iconos de archivos claros y
                reconocibles en el explorador de VS Code.
              </span>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/instalar-git">← Instalar Git</Link>
          <Link to="/docs/git-cheatsheet">Git Cheatsheet →</Link>
        </div>

      </div>
    </div>
  )
}

export default VSCodeSetup
