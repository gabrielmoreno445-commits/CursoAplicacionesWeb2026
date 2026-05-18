import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaReact() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>React.js</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>⚛️ React.js</h1>
          <p>
            React es una biblioteca de JavaScript para construir interfaces de usuario.
            Divide la UI en componentes reutilizables y gestiona el estado de forma declarativa.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>¿Qué es React?</h2>
            <p>
              React fue creado por Facebook en 2013. Sus conceptos clave son:
            </p>
            <ul>
              <li><strong>Componentes</strong>: piezas reutilizables de UI que combinan HTML, CSS y JS.</li>
              <li><strong>Declarativo</strong>: describís <em>qué</em> querés ver, React se encarga del <em>cómo</em>.</li>
              <li><strong>Virtual DOM</strong>: React compara el estado anterior y nuevo, y actualiza solo lo que cambió.</li>
              <li><strong>Unidireccional</strong>: los datos fluyen de padres a hijos (props).</li>
            </ul>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>React es solo la capa de vista. Para routing usamos React Router, para estado global usamos Context API o Zustand/Redux.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>JSX</h2>
            <p>
              JSX es una extensión de sintaxis que permite escribir HTML dentro de JavaScript.
              Babel lo transforma a llamadas de función puras.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`// JSX parece HTML pero tiene algunas diferencias
function Ejemplo() {
  const nombre = "Ana"
  const activo = true

  return (
    <div className="card">        {/* class → className */}
      <h1>{nombre}</h1>           {/* expresiones con {} */}
      <p style={{ color: "red" }}> {/* estilos con objeto */}
        Texto rojo
      </p>
      {activo && <span>Activo</span>}  {/* condicional */}
    </div>
  )
}

// Reglas de JSX:
// 1. Siempre retornar UN solo elemento raíz (o Fragment <>)
// 2. Todas las etiquetas deben cerrarse (<img /> no <img>)
// 3. class → className, for → htmlFor`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Componentes</h2>
            <p>Un componente es una función que retorna JSX. Nombre debe empezar con mayúscula.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`// Componente funcional
function Boton({ texto, onClick, variante = "primario" }) {
  return (
    <button
      className={\`btn btn--\${variante}\`}
      onClick={onClick}
    >
      {texto}
    </button>
  )
}

// Componente padre que usa el hijo
function App() {
  const handleClick = () => alert("¡Clicked!")

  return (
    <div>
      <Boton texto="Guardar" onClick={handleClick} />
      <Boton texto="Cancelar" variante="secundario" onClick={() => {}} />
    </div>
  )
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Props</h2>
            <p>Las props son datos que el componente padre le pasa al hijo. Son de solo lectura.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`// Definir el componente con props
function TarjetaUsuario({ nombre, email, avatar, rol = "Usuario" }) {
  return (
    <div className="tarjeta">
      <img src={avatar} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{email}</p>
      <span className="badge">{rol}</span>
    </div>
  )
}

// Pasar las props al usar el componente
<TarjetaUsuario
  nombre="Carlos Pérez"
  email="carlos@email.com"
  avatar="https://..."
  rol="Admin"
/>

// Renderizar listas con .map()
const usuarios = [
  { id: 1, nombre: "Ana", email: "ana@email.com" },
  { id: 2, nombre: "Luis", email: "luis@email.com" },
]

function ListaUsuarios() {
  return (
    <ul>
      {usuarios.map(usuario => (
        <TarjetaUsuario
          key={usuario.id}   // key obligatoria en listas
          nombre={usuario.nombre}
          email={usuario.email}
        />
      ))}
    </ul>
  )
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Estado con useState</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useState } from 'react'

function Formulario() {
  const [nombre, setNombre] = useState("")
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  if (enviado) {
    return <p>¡Hola, {nombre}!</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
      />
      <button type="submit">Enviar</button>
    </form>
  )
}`}</code></pre>
            </div>
            <div className="alert alert--warning">
              <span className="alert__icon">⚠️</span>
              <span>Nunca mutés el estado directamente (<code>estado.propiedad = valor</code>). Siempre usá el setter: <code>setEstado(nuevoValor)</code>.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Efectos con useEffect</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useState, useEffect } from 'react'

function ListaPokemon() {
  const [pokemon, setPokemon] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Se ejecuta al montar el componente ([] = sin dependencias)
    async function cargar() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      const data = await res.json()
      setPokemon(data.results)
      setCargando(false)
    }
    cargar()
  }, [])  // [] = solo al montar

  if (cargando) return <p>Cargando...</p>

  return (
    <ul>
      {pokemon.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
  )
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>React Router</h2>
            <p>React Router permite navegar entre páginas sin recargar el navegador (SPA).</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'

// Configuración de rutas (main.jsx / App.jsx)
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
      </Routes>
    </BrowserRouter>
  )
}

// Leer parámetros de la URL
function DetalleProducto() {
  const { id } = useParams()
  return <p>Producto #{id}</p>
}

// Navegar programáticamente
function Boton() {
  const navigate = useNavigate()
  return <button onClick={() => navigate('/productos')}>Ver productos</button>
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Context API</h2>
            <p>Context permite compartir estado global sin pasar props a través de múltiples niveles.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { createContext, useContext, useState } from 'react'

// 1. Crear el contexto
const AuthContext = createContext()

// 2. Crear el Provider (envuelve la app)
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  const login = (datos) => setUsuario(datos)
  const logout = () => setUsuario(null)

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. Crear un custom hook para consumir el contexto
export function useAuth() {
  return useContext(AuthContext)
}

// 4. Usar en cualquier componente
function Navbar() {
  const { usuario, logout } = useAuth()

  return (
    <nav>
      {usuario ? (
        <>
          <span>Hola, {usuario.nombre}</span>
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}
    </nav>
  )
}`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-js-avanzado">← JavaScript ES6+</Link>
          <Link to="/docs/teoria-vuejs">Vue.js →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaReact
