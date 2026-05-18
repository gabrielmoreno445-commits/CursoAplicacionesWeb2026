import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function ReactHooks() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>React Hooks</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--referencia">Referencia</span>
          <h1>⚛️ React Hooks Esenciales</h1>
          <p>
            Referencia rápida de los hooks más usados en React. Con ejemplos prácticos y casos de uso reales.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>useState</h2>
            <p>Agrega estado local a un componente. Retorna el valor actual y una función para actualizarlo.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)  // valor inicial: 0

  return (
    <div>
      <p>Clicks: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(prev => prev - 1)}>-1</button>
    </div>
  )
}`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>
                Usá la forma funcional <code>setCount(prev =&gt; prev + 1)</code> cuando el nuevo estado depende del anterior.
                Evita condiciones de carrera en actualizaciones rápidas.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2>useEffect</h2>
            <p>Ejecuta efectos secundarios: llamadas a APIs, suscripciones, manipulación del DOM, timers.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useState, useEffect } from 'react'

function Perfil({ userId }) {
  const [user, setUser] = useState(null)

  // Se ejecuta cuando cambia userId
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(setUser)

    // Cleanup: se ejecuta antes del próximo efecto
    return () => setUser(null)
  }, [userId])  // array de dependencias

  if (!user) return <p>Cargando...</p>
  return <p>{user.name}</p>
}`}</code></pre>
            </div>

            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Dependencias</th>
                    <th>Cuándo se ejecuta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>[]</code></td><td>Solo al montar el componente</td></tr>
                  <tr><td><code>[a, b]</code></td><td>Al montar y cuando a o b cambian</td></tr>
                  <tr><td>(sin array)</td><td>Después de cada renderizado</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="doc-section">
            <h2>useRef</h2>
            <p>
              Crea una referencia mutable que persiste entre renders. Sirve para acceder al DOM
              directamente o guardar valores sin causar re-renders.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useRef, useEffect } from 'react'

function InputAutoFocus() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()  // enfoca el input al montar
  }, [])

  return <input ref={inputRef} placeholder="Escribe aquí..." />
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>useContext</h2>
            <p>Consume un contexto creado con <code>createContext</code>. Evita el "prop drilling".</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { createContext, useContext, useState } from 'react'

// 1. Crear el contexto
const TemaContext = createContext()

// 2. Proveedor
function App() {
  const [tema, setTema] = useState('claro')
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      <Boton />
    </TemaContext.Provider>
  )
}

// 3. Consumir el contexto en cualquier componente hijo
function Boton() {
  const { tema, setTema } = useContext(TemaContext)
  return (
    <button onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}>
      Tema actual: {tema}
    </button>
  )
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>useMemo y useCallback</h2>
            <p>Optimizaciones para evitar cálculos o funciones innecesarias en cada render.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useMemo, useCallback } from 'react'

function Lista({ items, filtro }) {
  // useMemo: memoriza el resultado de un cálculo costoso
  const itemsFiltrados = useMemo(
    () => items.filter(item => item.includes(filtro)),
    [items, filtro]  // solo recalcula si items o filtro cambian
  )

  // useCallback: memoriza una función
  const handleClick = useCallback((id) => {
    console.log('click en', id)
  }, [])  // la función se crea solo una vez

  return itemsFiltrados.map(item => (
    <div key={item} onClick={() => handleClick(item)}>{item}</div>
  ))
}`}</code></pre>
            </div>
            <div className="alert alert--warning">
              <span className="alert__icon">⚠️</span>
              <span>
                No optimices prematuramente. Usá <strong>useMemo</strong> y <strong>useCallback</strong>
                solo cuando hayas identificado un problema real de performance.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Reglas de los Hooks</h2>
            <ul>
              <li>Solo llamalos en el <strong>nivel superior</strong> del componente (no dentro de ifs, loops o callbacks).</li>
              <li>Solo llamalos desde <strong>componentes funcionales de React</strong> o custom hooks.</li>
              <li>Los custom hooks deben empezar con <strong>use</strong> (ej: <code>useLocalStorage</code>).</li>
            </ul>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/git-cheatsheet">← Git Cheatsheet</Link>
          <Link to="/docs">Ver todos los docs →</Link>
        </div>

      </div>
    </div>
  )
}

export default ReactHooks
