import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaCustomHooks() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Custom Hooks</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>🪝 Custom Hooks — Semana 23</h1>
          <p>
            Los Custom Hooks permiten extraer lógica de componentes en funciones reutilizables.
            Son la forma idiomática de React para compartir comportamiento sin duplicar código.
          </p>
        </div>

        <div className="doc-page__content">

          {/* ─── ¿Qué es un Custom Hook? ─── */}
          <div className="doc-section">
            <h2>¿Qué es un Custom Hook?</h2>
            <p>
              Un Custom Hook es una <strong>función de JavaScript</strong> cuyo nombre empieza con <code>use</code>
              y que puede llamar a otros hooks internamente. No es una API especial de React, es simplemente
              una convención que el equipo adoptó para aplicar las reglas de los hooks de forma automática.
            </p>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                La idea central es simple: si dos componentes comparten la <em>misma lógica con estado</em>,
                esa lógica puede vivir en un custom hook y ambos componentes pueden usarlo de forma independiente.
              </span>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Antes — lógica duplicada</span>
              </div>
              <pre><code>{`// ComponenteA.jsx
function ComponenteA() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  // ...
}

// ComponenteB.jsx
function ComponenteB() {
  const [count, setCount] = useState(0)  // misma lógica
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  // ...
}`}</code></pre>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Después — lógica en un hook</span>
              </div>
              <pre><code>{`// hooks/useCounter.js
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  return { count, increment, decrement }
}

// ComponenteA.jsx
function ComponenteA() {
  const { count, increment, decrement } = useCounter(0)
  // ...
}

// ComponenteB.jsx
function ComponenteB() {
  const { count, increment, decrement } = useCounter(10) // estado propio
  // ...
}`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>
                Cada componente que llama al mismo custom hook obtiene su <strong>propio estado aislado</strong>.
                Los hooks no comparten estado entre sí, solo comparten la lógica.
              </span>
            </div>
          </div>

          {/* ─── Reglas de los Hooks ─── */}
          <div className="doc-section">
            <h2>Reglas de los Hooks</h2>
            <p>React impone dos reglas para que pueda rastrear correctamente el estado de cada hook:</p>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr><th>Regla</th><th>Correcto</th><th>Incorrecto</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Solo en el nivel superior</strong></td>
                    <td>Llamar el hook directamente en el cuerpo del componente</td>
                    <td>Llamarlo dentro de un <code>if</code>, <code>for</code> o función anidada</td>
                  </tr>
                  <tr>
                    <td><strong>Solo en funciones React</strong></td>
                    <td>Dentro de un componente funcional o de otro custom hook</td>
                    <td>En una función JS ordinaria o clase</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Ejemplos</span>
              </div>
              <pre><code>{`// ✅ Correcto — nivel superior
function Componente() {
  const [activo, setActivo] = useState(false)
  const datos = useFetch('/api/items')
  // ...
}

// ❌ Incorrecto — dentro de un if
function Componente() {
  if (condicion) {
    const [activo, setActivo] = useState(false) // rompe el orden de hooks
  }
}

// ❌ Incorrecto — función normal
function obtenerDatos() {
  const datos = useFetch('/api')  // no es un componente ni un hook
}`}</code></pre>
            </div>
          </div>

          {/* ─── Cómo crear un Custom Hook ─── */}
          <div className="doc-section">
            <h2>Cómo crear un Custom Hook</h2>
            <p>
              Un custom hook es simplemente una función con nombre <code>use…</code> que puede usar otros hooks.
              La clave está en qué <strong>retorna</strong>: podés devolver cualquier valor, array, objeto, función.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Estructura base</span>
              </div>
              <pre><code>{`// 1. Nombrá el archivo hooks/useNombre.js o useNombre.js
// 2. Importá los hooks que necesitás
import { useState, useEffect } from 'react'

// 3. Definí la función con prefijo "use"
function useNombre(parametros) {
  // 4. Usá hooks de React o llamá a otros custom hooks
  const [estado, setEstado] = useState(null)

  useEffect(() => {
    // lógica de efecto
  }, [/* dependencias */])

  // 5. Retorná lo que necesite el componente
  return { estado, setEstado }
}

export default useNombre`}</code></pre>
            </div>
          </div>

          {/* ─── useCounter ─── */}
          <div className="doc-section">
            <h2>Ejemplo 1 — useCounter</h2>
            <p>
              El ejemplo más simple: encapsula un contador con sus operaciones.
              El componente no necesita saber cómo funciona por dentro.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">hooks/useCounter.js</span>
              </div>
              <pre><code>{`import { useState } from 'react'

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset     = () => setCount(initial)

  return { count, increment, decrement, reset }
}

export default useCounter`}</code></pre>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Uso en un componente</span>
              </div>
              <pre><code>{`function Contador() {
  const { count, increment, decrement, reset } = useCounter(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={decrement}>−</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  )
}`}</code></pre>
            </div>
          </div>

          {/* ─── useLocalStorage ─── */}
          <div className="doc-section">
            <h2>Ejemplo 2 — useLocalStorage</h2>
            <p>
              Extiende <code>useState</code> para sincronizar el valor con <code>localStorage</code>.
              El componente lo usa exactamente igual que <code>useState</code> — la persistencia es transparente.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">hooks/useLocalStorage.js</span>
              </div>
              <pre><code>{`import { useState, useEffect } from 'react'

function useLocalStorage(key, initial) {
  // Inicialización perezosa: lee de localStorage solo una vez
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  // Sincroniza con localStorage cada vez que value cambia
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage`}</code></pre>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Uso — misma API que useState</span>
              </div>
              <pre><code>{`function Formulario() {
  const [nombre, setNombre] = useLocalStorage('nombre', '')

  return (
    <input
      value={nombre}
      onChange={e => setNombre(e.target.value)}
      placeholder="Tu nombre"
    />
  )
  // El nombre persiste aunque cierres el navegador
}`}</code></pre>
            </div>
          </div>

          {/* ─── useDebounce ─── */}
          <div className="doc-section">
            <h2>Ejemplo 3 — useDebounce</h2>
            <p>
              Retrasa la propagación de un valor hasta que el usuario deja de escribir.
              Ideal para evitar llamadas a APIs en cada keystroke.
              Este hook compone <code>useState</code> + <code>useEffect</code> con cleanup.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">hooks/useDebounce.js</span>
              </div>
              <pre><code>{`import { useState, useEffect } from 'react'

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    // Programamos la actualización
    const timer = setTimeout(() => {
      setDebounced(value)
    }, delay)

    // Cleanup: cancelamos el timer si value cambia antes de que expire
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

export default useDebounce`}</code></pre>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Uso — búsqueda con debounce</span>
              </div>
              <pre><code>{`function Buscador() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 600)

  useEffect(() => {
    if (!debouncedQuery) return
    // Esta llamada solo se ejecuta 600ms después del último keystroke
    fetch(\`/api/buscar?q=\${debouncedQuery}\`)
      .then(r => r.json())
      .then(setResultados)
  }, [debouncedQuery])

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Buscá..."
    />
  )
}`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>
                La función de <strong>cleanup</strong> del <code>useEffect</code> se ejecuta antes de cada
                re-render que cambia las dependencias. En <code>useDebounce</code> esto cancela el timer anterior,
                haciendo que solo el último keystroke dispare la actualización.
              </span>
            </div>
          </div>

          {/* ─── useFetch ─── */}
          <div className="doc-section">
            <h2>Ejemplo 4 — useFetch</h2>
            <p>
              Encapsula el patrón clásico de fetch: tres estados (<code>data</code>, <code>loading</code>, <code>error</code>)
              más cancelación automática con <code>AbortController</code> al desmontar el componente.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">hooks/useFetch.js</span>
              </div>
              <pre><code>{`import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!url) return              // URL opcional: no fetch si no hay URL
    setLoading(true)
    setError(null)
    setData(null)

    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error(\`Error \${r.status}\`)
        return r.json()
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()  // cancela si el componente se desmonta
  }, [url])

  return { data, loading, error }
}

export default useFetch`}</code></pre>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Uso — componente limpio</span>
              </div>
              <pre><code>{`function Perfil({ id }) {
  const { data, loading, error } = useFetch(\`/api/usuarios/\${id}\`)

  if (loading) return <p>Cargando...</p>
  if (error)   return <p>Error: {error}</p>
  if (!data)   return null

  return <h1>{data.nombre}</h1>
}
// El componente solo decide qué renderizar — el fetch está encapsulado`}</code></pre>
            </div>
          </div>

          {/* ─── Buenas Prácticas ─── */}
          <div className="doc-section">
            <h2>Buenas Prácticas</h2>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr><th>Práctica</th><th>Por qué</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Un archivo por hook (<code>useNombre.js</code>)</td>
                    <td>Facilita importarlos, testearlos y reutilizarlos en otros proyectos</td>
                  </tr>
                  <tr>
                    <td>Siempre el prefijo <code>use</code></td>
                    <td>Activa la validación del linter (eslint-plugin-react-hooks)</td>
                  </tr>
                  <tr>
                    <td>Cleanup en <code>useEffect</code></td>
                    <td>Evita memory leaks y race conditions al desmontar componentes</td>
                  </tr>
                  <tr>
                    <td>Retornar objetos con nombres descriptivos</td>
                    <td><code>{'{ data, loading, error }'}</code> es más claro que un array sin nombres</td>
                  </tr>
                  <tr>
                    <td>Un hook = una responsabilidad</td>
                    <td>Si el hook hace demasiado, dividilo en hooks más pequeños y componelos</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Composición — un hook puede usar otro hook</span>
              </div>
              <pre><code>{`// useSearchWithDebounce compone useFetch + useDebounce
function useSearchWithDebounce(query, delay = 500) {
  const debouncedQuery = useDebounce(query, delay)
  const url = debouncedQuery
    ? \`https://api.ejemplo.com/buscar?q=\${debouncedQuery}\`
    : null
  const { data, loading, error } = useFetch(url)

  return { resultados: data, loading, error, debouncedQuery }
}

// El componente queda muy limpio
function Buscador() {
  const [query, setQuery] = useState('')
  const { resultados, loading } = useSearchWithDebounce(query)

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {loading && <p>Buscando...</p>}
      {resultados?.map(r => <p key={r.id}>{r.titulo}</p>)}
    </>
  )
}`}</code></pre>
            </div>
          </div>

          {/* ─── Cuándo usar un Custom Hook ─── */}
          <div className="doc-section">
            <h2>¿Cuándo extraer un Custom Hook?</h2>
            <div className="alert alert--info">
              <span className="alert__icon">🧠</span>
              <span>
                Extraé un custom hook cuando dos o más componentes necesitan la <strong>misma lógica con estado</strong>,
                o cuando la lógica de un componente es tan larga que oscurece el template.
              </span>
            </div>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr><th>Señal</th><th>Solución</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Copiás y pegás lógica de un componente a otro</td>
                    <td>Extraé esa lógica a un custom hook</td>
                  </tr>
                  <tr>
                    <td>Un componente tiene 50+ líneas de lógica antes del return</td>
                    <td>Separala en uno o varios hooks descriptivos</td>
                  </tr>
                  <tr>
                    <td>Querés testear la lógica de estado por separado</td>
                    <td>Un custom hook es más fácil de testear que un componente completo</td>
                  </tr>
                  <tr>
                    <td>La lógica no tiene relación directa con el render</td>
                    <td>Es una buena candidata para vivir en un hook</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-react-router">← React Router</Link>
          <Link to="/apps/custom-hooks">Ver mini-app →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaCustomHooks
