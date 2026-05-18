import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaContextAPI() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Context API</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>🔄 Context API — Estado Global en React</h1>
          <p>
            Context API es la solución nativa de React para compartir estado entre componentes
            sin necesidad de pasar props a través de múltiples niveles del árbol (prop drilling).
          </p>
        </div>

        <div className="doc-page__content">

          {/* ─── El problema: Prop Drilling ─── */}
          <div className="doc-section">
            <h2>El problema: Prop Drilling</h2>
            <p>
              En React, los datos fluyen de padres a hijos mediante <strong>props</strong>.
              Esto funciona bien cuando los componentes están cerca en el árbol, pero se vuelve
              problemático cuando un dato necesita llegar a un componente muy anidado.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX — Problema</span>
              </div>
              <pre><code>{`// ❌ Prop Drilling: el tema debe pasar por CADA nivel,
//    aunque Layout y Sidebar no lo usen directamente.

function App() {
  const [tema, setTema] = useState('claro')
  return <Layout tema={tema} setTema={setTema} />
}

function Layout({ tema, setTema }) {
  // Layout no usa tema, solo lo pasa hacia abajo ← PROBLEMA
  return <Sidebar tema={tema} setTema={setTema} />
}

function Sidebar({ tema, setTema }) {
  // Sidebar tampoco lo usa, solo lo pasa ← PROBLEMA
  return <BotonTema tema={tema} setTema={setTema} />
}

function BotonTema({ tema, setTema }) {
  // Este sí lo necesita, pero recibió la prop en 3 pasos innecesarios
  return <button onClick={() => setTema(t => t === 'claro' ? 'oscuro' : 'claro')}>
    Cambiar a {tema === 'claro' ? 'oscuro' : 'claro'}
  </button>
}`}</code></pre>
            </div>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                Prop drilling no siempre es malo — para 2 o 3 niveles es perfectamente válido.
                Context es útil cuando el mismo dato se necesita en muchos lugares o a gran profundidad.
              </span>
            </div>
          </div>

          {/* ─── La solución: Context API ─── */}
          <div className="doc-section">
            <h2>La solución: Context API</h2>
            <p>
              Context crea un "canal" directo entre el proveedor del estado y cualquier
              componente que lo necesite, sin importar cuán profundo esté en el árbol.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX — Solución</span>
              </div>
              <pre><code>{`// ✅ Con Context: BotonTema accede al tema directamente,
//    sin que Layout ni Sidebar se enteren.

import { createContext, useContext, useState } from 'react'

// 1. Crear el contexto
const TemaContext = createContext()

// 2. Provider — mantiene y distribuye el estado
function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro')
  const toggleTema = () => setTema(t => t === 'claro' ? 'oscuro' : 'claro')

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  )
}

// 3. Componer la app envolviendo con el Provider
function App() {
  return (
    <TemaProvider>
      <Layout />     {/* Layout NO necesita recibir props de tema */}
    </TemaProvider>
  )
}

function Layout() {
  return <Sidebar />   // Sidebar tampoco
}

function Sidebar() {
  return <BotonTema /> // BotonTema accede directamente al contexto
}

// 4. Consumir el contexto donde se necesita
function BotonTema() {
  const { tema, toggleTema } = useContext(TemaContext)
  return <button onClick={toggleTema}>Modo {tema}</button>
}`}</code></pre>
            </div>
          </div>

          {/* ─── Las 3 piezas de Context ─── */}
          <div className="doc-section">
            <h2>Las 3 piezas de Context API</h2>

            <h3>1. createContext()</h3>
            <p>Crea el objeto contexto. Se llama fuera de los componentes, a nivel de módulo.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { createContext } from 'react'

// Sin valor por defecto (lo más común)
const UsuarioContext = createContext()

// Con valor por defecto (útil para testing)
const TemaContext = createContext({ tema: 'claro', toggleTema: () => {} })

// El objeto retornado tiene dos propiedades:
// UsuarioContext.Provider  → componente para proveer
// UsuarioContext.Consumer  → (obsoleto, usamos useContext)`}</code></pre>
            </div>

            <h3>2. Provider</h3>
            <p>
              El Provider es el componente que "posee" el estado y lo distribuye.
              Todo componente dentro del Provider puede acceder al valor del contexto.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  const login = (datos) => setUsuario(datos)
  const logout = () => setUsuario(null)

  // value puede ser cualquier valor JS: objeto, array, función, primitivo
  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  )
}

// Envolvemos la app (o la parte que necesita acceso)
function App() {
  return (
    <UsuarioProvider>
      <Navbar />
      <Main />
      <Footer />
    </UsuarioProvider>
  )
}`}</code></pre>
            </div>

            <h3>3. useContext()</h3>
            <p>
              Hook que lee el valor actual del contexto. El componente se re-renderiza
              automáticamente cada vez que el valor del Provider cambia.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useContext } from 'react'

function Navbar() {
  // Obtenemos exactamente lo que definimos en value={}
  const { usuario, logout } = useContext(UsuarioContext)

  return (
    <nav>
      {usuario
        ? <><span>Hola, {usuario.nombre}</span> <button onClick={logout}>Salir</button></>
        : <Link to="/login">Iniciar sesión</Link>
      }
    </nav>
  )
}`}</code></pre>
            </div>
          </div>

          {/* ─── Patrón recomendado: Custom Hook ─── */}
          <div className="doc-section">
            <h2>Patrón recomendado: Custom Hook</h2>
            <p>
              En lugar de llamar <code>useContext(MiContexto)</code> en cada componente,
              creamos un <strong>custom hook</strong> que lo encapsula. Es el patrón más usado
              en proyectos profesionales.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX — contexts/usuarioContext.jsx</span>
              </div>
              <pre><code>{`import { createContext, useContext, useState } from 'react'

const UsuarioContext = createContext()

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const login  = (datos) => setUsuario(datos)
  const logout = () => setUsuario(null)

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  )
}

// ✅ Custom hook — lo único que exportamos para consumir el contexto
export function useUsuario() {
  const ctx = useContext(UsuarioContext)
  if (!ctx) {
    throw new Error('useUsuario debe usarse dentro de <UsuarioProvider>')
  }
  return ctx
}

// ─────────────────────────────────────────────────────────────
// En cualquier componente:
// import { useUsuario } from '../contexts/usuarioContext'
//
// function Perfil() {
//   const { usuario, logout } = useUsuario()
//   ...
// }
// ─────────────────────────────────────────────────────────────`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>
                El <code>throw new Error</code> dentro del custom hook es una buena práctica:
                si alguien usa <code>useUsuario()</code> fuera del Provider, recibirá un error
                claro en lugar de un fallo silencioso con <code>undefined</code>.
              </span>
            </div>
          </div>

          {/* ─── Múltiples contextos ─── */}
          <div className="doc-section">
            <h2>Múltiples contextos</h2>
            <p>
              Una app real suele tener varios contextos separados por responsabilidad.
              Se anidan sin problema — cada Provider es independiente.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX — main.jsx o App.jsx</span>
              </div>
              <pre><code>{`// Cada contexto tiene su propia responsabilidad
import { UsuarioProvider } from './contexts/usuarioContext'
import { TemaProvider   } from './contexts/temaContext'
import { CarritoProvider } from './contexts/carritoContext'

function App() {
  return (
    // El orden generalmente no importa, salvo que un Provider use otro
    <UsuarioProvider>
      <TemaProvider>
        <CarritoProvider>
          <Router>
            <Navbar />
            <Routes>...</Routes>
          </Router>
        </CarritoProvider>
      </TemaProvider>
    </UsuarioProvider>
  )
}`}</code></pre>
            </div>
          </div>

          {/* ─── Estructura de archivos ─── */}
          <div className="doc-section">
            <h2>Estructura de archivos recomendada</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Estructura</span>
              </div>
              <pre><code>{`src/
├── contexts/
│   ├── usuarioContext.jsx   → createContext + Provider + useUsuario()
│   ├── temaContext.jsx      → createContext + Provider + useTema()
│   └── carritoContext.jsx   → createContext + Provider + useCarrito()
├── components/
│   ├── Navbar.jsx           → import { useUsuario } from '../contexts/...'
│   └── CarritoPanel.jsx     → import { useCarrito } from '../contexts/...'
├── App.jsx                  → envuelve con los Providers
└── main.jsx`}</code></pre>
            </div>
          </div>

          {/* ─── Rendimiento ─── */}
          <div className="doc-section">
            <h2>Rendimiento: cuándo Context re-renderiza</h2>
            <p>
              Cada vez que el valor del Provider cambia, <strong>todos los componentes</strong> que
              consuman ese contexto se re-renderizan. Esto puede ser un problema si el valor
              cambia muy frecuentemente.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX — Buena práctica</span>
              </div>
              <pre><code>{`// ❌ Problema: se crea un objeto nuevo en cada render del Provider
//    → todos los consumidores se re-renderizan siempre
function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro')
  return (
    <TemaContext.Provider value={{ tema, setTema }}> {/* objeto nuevo cada vez */}
      {children}
    </TemaContext.Provider>
  )
}

// ✅ Mejor: separar estado que cambia poco del que cambia mucho
//    O usar useMemo para estabilizar el value
import { useMemo } from 'react'

function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro')
  const toggleTema = () => setTema(t => t === 'claro' ? 'oscuro' : 'claro')

  const value = useMemo(() => ({ tema, toggleTema }), [tema])

  return (
    <TemaContext.Provider value={value}>
      {children}
    </TemaContext.Provider>
  )
}`}</code></pre>
            </div>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                Para estado global muy complejo o performance crítica, considerar
                <strong> Zustand</strong> o <strong>Redux Toolkit</strong>.
                Context es ideal para estado de baja frecuencia de cambio (tema, usuario autenticado, idioma).
              </span>
            </div>
          </div>

          {/* ─── Cuándo usar ─── */}
          <div className="doc-section">
            <h2>¿Cuándo usar Context API?</h2>
            <table>
              <thead>
                <tr>
                  <th>Situación</th>
                  <th>Recomendación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Datos locales de 1-2 componentes</td>
                  <td>useState + props</td>
                </tr>
                <tr>
                  <td>Datos que bajan 2-3 niveles</td>
                  <td>props (prop drilling tolerable)</td>
                </tr>
                <tr>
                  <td>Tema, idioma, usuario autenticado</td>
                  <td>✅ Context API</td>
                </tr>
                <tr>
                  <td>Carrito, preferencias globales</td>
                  <td>✅ Context API</td>
                </tr>
                <tr>
                  <td>Estado muy complejo o de alta frecuencia</td>
                  <td>Zustand / Redux Toolkit</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ─── Resumen visual ─── */}
          <div className="doc-section">
            <h2>Resumen del flujo</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Flujo completo</span>
              </div>
              <pre><code>{`// ① createContext() → crea el canal
const MiContexto = createContext()

// ② Provider → mantiene el estado y lo inyecta
function MiProvider({ children }) {
  const [valor, setValor] = useState(...)
  return (
    <MiContexto.Provider value={{ valor, setValor }}>
      {children}
    </MiContexto.Provider>
  )
}

// ③ Custom hook → encapsula el consumo
function useMiContexto() {
  return useContext(MiContexto)
}

// ④ App.jsx → envuelve la app con el Provider
<MiProvider>
  <App />
</MiProvider>

// ⑤ Cualquier componente → consume con el hook
function ComponenteHijo() {
  const { valor, setValor } = useMiContexto()
  // ... usa valor directamente sin props intermedias
}`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-react">← React.js</Link>
          <Link to="/apps/context-api">App práctica →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaContextAPI
