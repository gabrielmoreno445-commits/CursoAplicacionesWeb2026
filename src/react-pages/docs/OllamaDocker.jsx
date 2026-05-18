import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function OllamaDocker() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Ollama con Docker</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--guia">Guía</span>
          <h1>🦙 Ollama con Docker Compose</h1>
          <p>
            Esta guía explica cómo levantar Ollama y Open WebUI usando el <code>docker-compose.yml</code> del proyecto.
            En minutos tenés un asistente de IA local con interfaz gráfica, sin necesidad de API keys ni internet.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>¿Qué se levanta?</h2>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>Descripción</th>
                    <th>Puerto local</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>ollama</code></td>
                    <td>Motor de modelos LLM. Expone una API REST compatible con OpenAI.</td>
                    <td><code>11434</code></td>
                  </tr>
                  <tr>
                    <td><code>open-webui</code></td>
                    <td>Interfaz web estilo ChatGPT, conectada automáticamente a Ollama.</td>
                    <td><code>3000</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                <strong>Requisito:</strong> Tener Docker Desktop instalado y corriendo.{' '}
                <Link to="/docs/instalar-docker">Ver guía de instalación →</Link>
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">1</span> Levantar los servicios</h2>
            <p>
              Desde la raíz del proyecto (donde está el <code>docker-compose.yml</code>), ejecutá:
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`docker compose up -d`}</code></pre>
            </div>
            <p>
              La primera vez Docker descarga las imágenes de Ollama y Open WebUI automáticamente.
              Puede tardar varios minutos según tu conexión.
            </p>
            <div className="alert alert--tip">
              <span className="alert__icon">✅</span>
              <span>
                La flag <code>-d</code> corre los contenedores en segundo plano (detached).
                Para ver qué está pasando en tiempo real, omitila: <code>docker compose up</code>.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">2</span> Acceder a los servicios</h2>
            <p>Una vez que los contenedores están corriendo:</p>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Open WebUI (interfaz de chat)</td>
                    <td><code>http://localhost:3000</code></td>
                  </tr>
                  <tr>
                    <td>API de Ollama</td>
                    <td><code>http://localhost:11434</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              La primera vez que entrás a Open WebUI te pedirá crear una cuenta de administrador local
              (no se conecta a ningún servidor externo).
            </p>
          </div>

          <div className="doc-section">
            <h2><span className="step-num">3</span> Descargar un modelo</h2>
            <p>Ollama no incluye modelos por defecto. Tenés que descargarlos.</p>

            <h3>Opción 1 — Desde la terminal</h3>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# Descargar Llama 3.2 (recomendado para empezar, ~2 GB)
docker exec -it ollama ollama pull llama3.2

# Otros modelos disponibles
docker exec -it ollama ollama pull mistral
docker exec -it ollama ollama pull phi3
docker exec -it ollama ollama pull codellama`}</code></pre>
            </div>

            <h3>Opción 2 — Desde Open WebUI</h3>
            <p>
              Entrá a <code>http://localhost:3000</code>, andá a{' '}
              <strong>Settings {'>'} Models</strong> y escribí el nombre del modelo para descargarlo
              desde la interfaz gráfica.
            </p>

            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Tamaño</th>
                    <th>Ideal para</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>llama3.2</code></td><td>~2 GB</td><td>Chat general, rápido</td></tr>
                  <tr><td><code>mistral</code></td><td>~4.1 GB</td><td>Razonamiento, código</td></tr>
                  <tr><td><code>phi3</code></td><td>~2.3 GB</td><td>Eficiente, buena relación peso/calidad</td></tr>
                  <tr><td><code>codellama</code></td><td>~3.8 GB</td><td>Generación de código</td></tr>
                  <tr><td><code>gemma2</code></td><td>~5.4 GB</td><td>Tareas de texto avanzadas</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="doc-section">
            <h2>Comandos útiles</h2>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Comando</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>docker compose up -d</code></td><td>Levantar todos los servicios en segundo plano</td></tr>
                  <tr><td><code>docker compose down</code></td><td>Detener y eliminar los contenedores</td></tr>
                  <tr><td><code>docker compose ps</code></td><td>Ver estado de los contenedores</td></tr>
                  <tr><td><code>docker compose logs -f</code></td><td>Ver logs en tiempo real</td></tr>
                  <tr><td><code>docker compose logs -f ollama</code></td><td>Ver logs solo de Ollama</td></tr>
                  <tr><td><code>docker compose restart ollama</code></td><td>Reiniciar un servicio específico</td></tr>
                  <tr><td><code>docker compose down -v</code></td><td>Eliminar contenedores <strong>y volúmenes</strong> (borra modelos descargados)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="doc-section">
            <h2>Persistencia de datos</h2>
            <p>
              Los datos se guardan en volúmenes de Docker, por lo que no se pierden al reiniciar los contenedores:
            </p>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Volumen</th>
                    <th>Qué guarda</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>ollama_data</code></td><td>Modelos descargados en Ollama</td></tr>
                  <tr><td><code>open_webui_data</code></td><td>Historial de chats y configuración de Open WebUI</td></tr>
                </tbody>
              </table>
            </div>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                <code>docker compose down</code> detiene los contenedores pero <strong>conserva los volúmenes</strong>.
                Solo <code>docker compose down -v</code> los elimina.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Usar la API de Ollama desde código</h2>
            <p>
              Una vez que los contenedores están corriendo, podés consumir la API desde tus apps React o Node.js:
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.2',
    prompt: '¿Qué es React.js en una oración?',
    stream: false,
  }),
})

const data = await response.json()
console.log(data.response)`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/instalar-docker">← Instalar Docker</Link>
          <Link to="/docs">Ver toda la documentación →</Link>
        </div>

      </div>
    </div>
  )
}

export default OllamaDocker
