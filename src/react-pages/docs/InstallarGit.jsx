import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function InstallarGit() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Instalar Git</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--instalacion">Instalación</span>
          <h1>🔀 Instalar y Configurar Git</h1>
          <p>
            Git es el sistema de control de versiones más usado en el mundo. Esta guía cubre la instalación,
            configuración inicial y conexión con GitHub mediante SSH.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2><span className="step-num">1</span> Instalación</h2>

            <h3>Windows</h3>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">PowerShell</span>
              </div>
              <pre><code>{`# Con winget
winget install Git.Git

# O descargá el instalador desde https://git-scm.com/download/win
# Recomendado: dejá todas las opciones por defecto durante la instalación`}</code></pre>
            </div>

            <h3>macOS</h3>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# Con Homebrew (recomendado)
brew install git

# O instalando Xcode Command Line Tools
xcode-select --install`}</code></pre>
            </div>

            <h3>Linux (Ubuntu/Debian)</h3>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`sudo apt update && sudo apt install git`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">2</span> Configuración inicial</h2>
            <p>Después de instalar, configurá tu identidad. Esto aparece en cada commit que hacés:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Editor por defecto (VS Code)
git config --global core.editor "code --wait"

# Nombre de la rama principal
git config --global init.defaultBranch main

# Ver toda la configuración
git config --global --list`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">3</span> Generar clave SSH para GitHub</h2>
            <p>
              La autenticación por SSH es más segura y cómoda que usar usuario/contraseña.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# 1. Generar la clave (reemplazá con tu email de GitHub)
ssh-keygen -t ed25519 -C "tu@email.com"
# Presioná Enter para aceptar la ubicación y passphrase opcional

# 2. Iniciar el agente SSH
eval "$(ssh-agent -s)"

# 3. Agregar la clave al agente
ssh-add ~/.ssh/id_ed25519

# 4. Copiar la clave pública al portapapeles
# macOS:
cat ~/.ssh/id_ed25519.pub | pbcopy
# Linux:
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard
# Windows (Git Bash):
cat ~/.ssh/id_ed25519.pub | clip`}</code></pre>
            </div>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                Luego, en GitHub: <strong>Settings → SSH and GPG keys → New SSH key</strong>,
                pegá la clave copiada y guardá.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">4</span> Verificar conexión con GitHub</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`ssh -T git@github.com
# Hi tu-usuario! You've successfully authenticated...`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">5</span> Primer repositorio</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# Crear un repo nuevo
mkdir mi-proyecto && cd mi-proyecto
git init
git add .
git commit -m "first commit"

# Conectar con GitHub (copiá la URL SSH desde GitHub)
git remote add origin git@github.com:tu-usuario/mi-proyecto.git
git push -u origin main`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/instalar-node">← Instalar Node.js</Link>
          <Link to="/docs/vscode-setup">VS Code Setup →</Link>
        </div>

      </div>
    </div>
  )
}

export default InstallarGit
