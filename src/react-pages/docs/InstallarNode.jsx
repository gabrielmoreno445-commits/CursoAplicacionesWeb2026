import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function InstallarNode() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Instalar Node.js</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--instalacion">Instalación</span>
          <h1>🟢 Instalar Node.js y npm</h1>
          <p>
            Node.js es el entorno de ejecución de JavaScript fuera del navegador. npm es su gestor de paquetes.
            Juntos son la base del desarrollo web moderno con React, Vite, Express y más.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>Opción recomendada: nvm</h2>
            <p>
              En lugar de instalar Node.js directamente, se recomienda usar <strong>nvm</strong> (Node Version Manager).
              Esto te permite tener múltiples versiones de Node.js y cambiar entre ellas fácilmente.
            </p>
            <div className="alert alert--tip">
              <span className="alert__icon">✅</span>
              <span>
                Si sos desarrollador profesional, usá nvm. Si solo querés empezar rápido, podés instalar
                Node.js directamente desde el sitio oficial.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">1</span> Instalar con nvm</h2>

            <h3>Linux / macOS</h3>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Recargar el shell
source ~/.bashrc   # o ~/.zshrc si usás Zsh

# Verificar instalación
nvm --version`}</code></pre>
            </div>

            <h3>Windows</h3>
            <p>En Windows usá <strong>nvm-windows</strong>, un proyecto separado:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">PowerShell (como Administrador)</span>
              </div>
              <pre><code>{`# Con winget
winget install CoreyButler.NVMforWindows

# O descargá el instalador desde:
# https://github.com/coreybutler/nvm-windows/releases`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">2</span> Instalar Node.js con nvm</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# Instalar la versión LTS (recomendada)
nvm install --lts

# O una versión específica
nvm install 20

# Usar la versión instalada
nvm use --lts

# Ver versiones instaladas
nvm list`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">3</span> Instalación directa (sin nvm)</h2>
            <p>Si preferís instalar Node.js directamente:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">macOS (Homebrew)</span>
              </div>
              <pre><code>{`brew install node`}</code></pre>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Ubuntu / Debian</span>
              </div>
              <pre><code>{`sudo apt update
sudo apt install nodejs npm`}</code></pre>
            </div>
            <p>En Windows y macOS también podés descargar el instalador desde <strong>nodejs.org</strong>.</p>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">4</span> Verificar la instalación</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`node --version   # v20.x.x
npm --version    # 10.x.x`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Comandos npm esenciales</h2>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Comando</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>npm init -y</code></td><td>Crear un proyecto nuevo</td></tr>
                  <tr><td><code>npm install</code></td><td>Instalar dependencias del package.json</td></tr>
                  <tr><td><code>npm install {'<paquete>'}</code></td><td>Instalar un paquete</td></tr>
                  <tr><td><code>npm install -D {'<paquete>'}</code></td><td>Instalar como devDependency</td></tr>
                  <tr><td><code>npm uninstall {'<paquete>'}</code></td><td>Desinstalar un paquete</td></tr>
                  <tr><td><code>npm run {'<script>'}</code></td><td>Ejecutar un script del package.json</td></tr>
                  <tr><td><code>npm outdated</code></td><td>Ver paquetes desactualizados</td></tr>
                  <tr><td><code>npm update</code></td><td>Actualizar paquetes</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/instalar-ollama">← Instalar Ollama</Link>
          <Link to="/docs/instalar-git">Instalar Git →</Link>
        </div>

      </div>
    </div>
  )
}

export default InstallarNode
