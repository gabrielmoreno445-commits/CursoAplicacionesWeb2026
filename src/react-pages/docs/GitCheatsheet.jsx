import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function GitCheatsheet() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Git Cheatsheet</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--referencia">Referencia</span>
          <h1>📋 Git Cheatsheet</h1>
          <p>
            Los comandos de Git más usados en el día a día, organizados por situación.
            Guardá esta página como referencia rápida.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>Configuración inicial</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Crear y clonar repos</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git init                          # inicializar repo en carpeta actual
git clone <url>                   # clonar repo remoto
git clone <url> mi-carpeta        # clonar en carpeta específica`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Estado y diferencias</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git status                        # ver archivos modificados
git diff                          # ver cambios no staged
git diff --staged                 # ver cambios staged
git log --oneline                 # historial compacto
git log --oneline --graph         # historial con ramas`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Staging y commits</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git add archivo.js                # agregar archivo al stage
git add .                         # agregar todo al stage
git add -p                        # agregar por partes interactivo
git commit -m "mensaje"           # commit con mensaje
git commit --amend                # editar el último commit (no pusheado)`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Ramas (branches)</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git branch                        # listar ramas locales
git branch -a                     # listar todas (incluso remotas)
git branch nueva-rama             # crear rama
git checkout nueva-rama           # cambiar a rama
git checkout -b nueva-rama        # crear y cambiar en un paso
git switch main                   # cambiar a main (alternativa moderna)
git merge feature-branch          # fusionar rama al branch actual
git branch -d rama                # eliminar rama local
git branch -D rama                # forzar eliminación`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Remotos</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git remote -v                     # ver remotos configurados
git remote add origin <url>       # agregar remoto
git push origin main              # subir rama main
git push -u origin main           # subir y trackear rama
git pull                          # bajar y fusionar cambios remotos
git fetch                         # bajar cambios sin fusionar`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Deshacer cambios</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git restore archivo.js            # descartar cambios de un archivo
git restore .                     # descartar todos los cambios
git restore --staged archivo.js   # sacar del stage (sin perder cambios)
git revert <hash>                 # revertir un commit (crea uno nuevo)
git reset --soft HEAD~1           # deshacer último commit (mantiene cambios)
git reset --hard HEAD~1           # deshacer último commit (pierde cambios)`}</code></pre>
            </div>
            <div className="alert alert--warning">
              <span className="alert__icon">⚠️</span>
              <span>
                <strong>git reset --hard</strong> es destructivo. Nunca lo uses en commits que ya
                hayan sido pusheados al repositorio remoto.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Stash (guardar trabajo temporal)</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git stash                         # guardar cambios temporalmente
git stash pop                     # recuperar último stash
git stash list                    # ver todos los stashes
git stash drop                    # eliminar último stash`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Tags</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`git tag                           # listar tags
git tag v1.0.0                    # crear tag ligero
git tag -a v1.0.0 -m "Release"   # crear tag anotado
git push origin v1.0.0           # pushear tag
git push origin --tags            # pushear todos los tags`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/vscode-setup">← VS Code Setup</Link>
          <Link to="/docs/react-hooks">React Hooks →</Link>
        </div>

      </div>
    </div>
  )
}

export default GitCheatsheet
