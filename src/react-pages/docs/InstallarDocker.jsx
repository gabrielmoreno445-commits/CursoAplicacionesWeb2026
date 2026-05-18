import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function InstallarDocker() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Instalar Docker</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--instalacion">Instalación</span>
          <h1>🐳 Instalar Docker</h1>
          <p>
            Docker te permite empaquetar y ejecutar aplicaciones en contenedores aislados, sin depender
            de lo que tengas instalado en tu sistema. Es la base para correr herramientas como Ollama,
            bases de datos y servicios web de forma reproducible.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>¿Qué es Docker?</h2>
            <p>
              Un contenedor es como una "caja" que incluye la aplicación y todo lo que necesita para correr:
              sistema de archivos, dependencias y configuración. A diferencia de una máquina virtual,
              los contenedores son livianos y arrancan en segundos.
            </p>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                <strong>Docker Desktop</strong> incluye el motor de Docker, Docker Compose y una interfaz gráfica.
                Es la forma más simple de instalar todo en Windows y macOS.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">1</span> Instalar Docker Desktop en Windows</h2>

            <h3>Requisitos previos</h3>
            <p>Antes de instalar, verificá que tenés WSL 2 habilitado:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">PowerShell (como Administrador)</span>
              </div>
              <pre><code>{`# Instalar WSL 2
wsl --install

# Verificar versión
wsl --list --verbose`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">✅</span>
              <span>
                Si <code>wsl --install</code> ya estaba hecho, el comando simplemente lo confirma. Reiniciá el equipo si te lo pide.
              </span>
            </div>

            <h3>Instalación</h3>
            <p>Descargá e instalá Docker Desktop desde el sitio oficial:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">PowerShell</span>
              </div>
              <pre><code>{`# Con winget
winget install Docker.DockerDesktop

# O descargá el instalador desde https://www.docker.com/products/docker-desktop`}</code></pre>
            </div>
            <p>
              Durante la instalación, asegurate de marcar la opción <strong>"Use WSL 2 instead of Hyper-V"</strong>.
              Luego reiniciá el equipo.
            </p>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">1</span> Instalar en macOS</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# Con Homebrew
brew install --cask docker

# O descargá el .dmg desde https://www.docker.com/products/docker-desktop`}</code></pre>
            </div>
            <p>Abrí Docker Desktop desde Aplicaciones y esperá a que el motor arranque (ícono de ballena en la barra de menú).</p>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">1</span> Instalar en Linux</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Ubuntu / Debian</span>
              </div>
              <pre><code>{`# Agregar el repositorio oficial de Docker
sudo apt update
sudo apt install -y ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Agregar tu usuario al grupo docker (para no necesitar sudo)
sudo usermod -aG docker $USER
newgrp docker`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">2</span> Verificar la instalación</h2>
            <p>Abrí una terminal y ejecutá:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`docker --version
# Docker version 27.x.x, build ...

docker compose version
# Docker Compose version v2.x.x

# Prueba rápida: correr un contenedor de hello-world
docker run hello-world`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">✅</span>
              <span>
                Si ves el mensaje <strong>"Hello from Docker!"</strong>, la instalación fue exitosa.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Comandos básicos de Docker</h2>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Comando</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>docker ps</code></td><td>Ver contenedores en ejecución</td></tr>
                  <tr><td><code>docker ps -a</code></td><td>Ver todos los contenedores (incluidos detenidos)</td></tr>
                  <tr><td><code>docker images</code></td><td>Ver imágenes descargadas</td></tr>
                  <tr><td><code>docker pull {'<imagen>'}</code></td><td>Descargar una imagen</td></tr>
                  <tr><td><code>docker run {'<imagen>'}</code></td><td>Crear y arrancar un contenedor</td></tr>
                  <tr><td><code>docker stop {'<nombre>'}</code></td><td>Detener un contenedor</td></tr>
                  <tr><td><code>docker rm {'<nombre>'}</code></td><td>Eliminar un contenedor</td></tr>
                  <tr><td><code>docker rmi {'<imagen>'}</code></td><td>Eliminar una imagen</td></tr>
                  <tr><td><code>docker logs {'<nombre>'}</code></td><td>Ver los logs de un contenedor</td></tr>
                  <tr><td><code>docker exec -it {'<nombre>'} bash</code></td><td>Abrir terminal dentro de un contenedor</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs">← Volver a Documentación</Link>
          <Link to="/docs/ollama-docker">Ollama con Docker →</Link>
        </div>

      </div>
    </div>
  )
}

export default InstallarDocker
