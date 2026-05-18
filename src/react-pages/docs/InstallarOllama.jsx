import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function InstallarOllama() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Instalar Ollama</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--instalacion">Instalación</span>
          <h1>🦙 Instalar Ollama en Local</h1>
          <p>
            Ollama te permite ejecutar modelos de lenguaje (LLMs) como Llama 3, Mistral, Gemma y muchos más
            directamente en tu computadora, sin necesidad de internet ni API keys. Funciona en Windows, macOS y Linux.
          </p>
        </div>

        <div className="doc-page__content">

          {/* ¿Qué es Ollama? */}
          <div className="doc-section">
            <h2>¿Qué es Ollama?</h2>
            <p>
              Ollama es una herramienta de línea de comandos que simplifica la descarga, configuración y ejecución
              de modelos de IA en tu máquina local. Expone una API compatible con OpenAI, por lo que podés
              integrarlo con tus aplicaciones fácilmente.
            </p>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                <strong>Requisitos mínimos:</strong> 8 GB de RAM para modelos pequeños (7B), 16 GB para modelos medianos (13B).
                Una GPU no es obligatoria, pero acelera mucho la inferencia.
              </span>
            </div>
          </div>

          {/* Paso 1: Instalación */}
          <div className="doc-section">
            <h2><span className="step-num">1</span> Instalación</h2>

            <h3>Windows</h3>
            <p>Descargá el instalador oficial desde el sitio de Ollama y ejecutalo. El instalador agrega Ollama al PATH automáticamente.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">PowerShell</span>
              </div>
              <pre><code>{`# Opción 1: Descargar el instalador desde https://ollama.com/download
# Opción 2: Con winget
winget install Ollama.Ollama`}</code></pre>
            </div>

            <h3>macOS</h3>
            <p>Podés usar el instalador gráfico o Homebrew:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# Con Homebrew
brew install ollama

# O descargar el .dmg desde https://ollama.com/download`}</code></pre>
            </div>

            <h3>Linux</h3>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Bash</span>
              </div>
              <pre><code>{`curl -fsSL https://ollama.com/install.sh | sh`}</code></pre>
            </div>
          </div>

          {/* Paso 2: Verificar instalación */}
          <div className="doc-section">
            <h2><span className="step-num">2</span> Verificar la instalación</h2>
            <p>Abrí una terminal y ejecutá:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`ollama --version
# Salida esperada: ollama version 0.x.x`}</code></pre>
            </div>
          </div>

          {/* Paso 3: Descargar un modelo */}
          <div className="doc-section">
            <h2><span className="step-num">3</span> Descargar tu primer modelo</h2>
            <p>
              Ollama descarga los modelos desde su registro oficial. Algunos modelos recomendados para empezar:
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
                  <tr>
                    <td><code>llama3.2</code></td>
                    <td>~2 GB</td>
                    <td>Chat general, rápido</td>
                  </tr>
                  <tr>
                    <td><code>mistral</code></td>
                    <td>~4.1 GB</td>
                    <td>Razonamiento, código</td>
                  </tr>
                  <tr>
                    <td><code>gemma2</code></td>
                    <td>~5.4 GB</td>
                    <td>Tareas de texto avanzadas</td>
                  </tr>
                  <tr>
                    <td><code>codellama</code></td>
                    <td>~3.8 GB</td>
                    <td>Generación de código</td>
                  </tr>
                  <tr>
                    <td><code>phi3</code></td>
                    <td>~2.3 GB</td>
                    <td>Eficiente, buena relación peso/calidad</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`# Descargar Llama 3.2 (recomendado para empezar)
ollama pull llama3.2

# Descargar Mistral
ollama pull mistral`}</code></pre>
            </div>
          </div>

          {/* Paso 4: Usar en terminal */}
          <div className="doc-section">
            <h2><span className="step-num">4</span> Chatear con el modelo</h2>
            <p>Una vez descargado, podés chatear directamente desde la terminal:</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`ollama run llama3.2
# >>> Escribí tu mensaje aquí...

# Salir del chat
# >>> /bye`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">✅</span>
              <span>
                Usá <strong>/help</strong> dentro del chat para ver los comandos disponibles como <strong>/load</strong>, <strong>/save</strong> o <strong>/clear</strong>.
              </span>
            </div>
          </div>

          {/* Paso 5: API REST */}
          <div className="doc-section">
            <h2><span className="step-num">5</span> Usar la API REST</h2>
            <p>
              Ollama expone una API en <code>http://localhost:11434</code> compatible con la API de OpenAI.
              Podés hacer peticiones desde cualquier lenguaje:
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">cURL</span>
              </div>
              <pre><code>{`curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "¿Qué es React.js?",
  "stream": false
}'`}</code></pre>
            </div>

            <h3>Desde JavaScript / Node.js</h3>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.2',
    prompt: '¿Qué es React.js?',
    stream: false,
  }),
})

const data = await response.json()
console.log(data.response)`}</code></pre>
            </div>

            <h3>Endpoint compatible con OpenAI</h3>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama', // puede ser cualquier string
})

const chat = await client.chat.completions.create({
  model: 'llama3.2',
  messages: [{ role: 'user', content: '¿Hola! ¿Cómo estás?' }],
})

console.log(chat.choices[0].message.content)`}</code></pre>
            </div>
          </div>

          {/* Comandos útiles */}
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
                  <tr><td><code>ollama list</code></td><td>Ver modelos descargados</td></tr>
                  <tr><td><code>ollama pull {'<modelo>'}</code></td><td>Descargar un modelo</td></tr>
                  <tr><td><code>ollama run {'<modelo>'}</code></td><td>Iniciar chat con un modelo</td></tr>
                  <tr><td><code>ollama rm {'<modelo>'}</code></td><td>Eliminar un modelo local</td></tr>
                  <tr><td><code>ollama ps</code></td><td>Ver modelos corriendo en memoria</td></tr>
                  <tr><td><code>ollama serve</code></td><td>Iniciar el servidor manualmente</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="alert alert--tip">
            <span className="alert__icon">🚀</span>
            <span>
              Para una interfaz gráfica, podés instalar <strong>Open WebUI</strong> que te da una experiencia
              similar a ChatGPT conectada a Ollama. Buscá <strong>open-webui</strong> en GitHub.
            </span>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs">← Volver a Documentación</Link>
          <Link to="/docs/instalar-node">Instalar Node.js →</Link>
        </div>

      </div>
    </div>
  )
}

export default InstallarOllama
