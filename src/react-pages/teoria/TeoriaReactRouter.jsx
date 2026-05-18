import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaReactRouter() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>React Router</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>🧭 React Router — Navegación en SPAs</h1>
          <p>
            React Router es la librería estándar para manejar navegación en aplicaciones React.
            Permite crear múltiples "páginas" dentro de una SPA sin recargar el navegador,
            usando la History API del browser para sincronizar la URL con el estado de la app.
          </p>
        </div>

        <div className="doc-page__content">

          {/* ─── ¿Por qué necesitamos React Router? ─── */}
          <div className="doc-section">
            <h2>¿Por qué necesitamos React Router?</h2>
            <p>
              Una SPA (Single Page Application) carga <strong>un solo HTML</strong> y actualiza
              el contenido dinámicamente con JavaScript. Sin React Router, toda la app viviría
              en una única URL — no habría forma de compartir un enlace a una sección específica,
              el botón "atrás" del browser no funcionaría, y el SEO sería muy limitado.
            </p>
            <p>
              React Router resuelve esto escuchando cambios en la URL y renderizando el
              componente correspondiente, <strong>sin recargar la página</strong>.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Concepto</span>
              </div>
              <pre><code>{`// Sin React Router: todo en una URL
// ❌ http://miapp.com/  ← siempre la misma, sin importar qué sección estés viendo

// Con React Router: URLs reales para cada sección
// ✅ http://miapp.com/           → Inicio
// ✅ http://miapp.com/productos  → Lista de productos
// ✅ http://miapp.com/productos/42 → Detalle del producto 42
// ✅ http://miapp.com/perfil     → Perfil del usuario`}</code></pre>
            </div>
          </div>

          {/* ─── Instalación ─── */}
          <div className="doc-section">
            <h2>Instalación</h2>
            <p>
              React Router se instala como paquete aparte. En proyectos modernos
              usamos <strong>react-router-dom</strong> (versión para el browser).
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Terminal</span>
              </div>
              <pre><code>{`npm install react-router-dom`}</code></pre>
            </div>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                Este proyecto ya tiene React Router instalado y configurado.
                Podés ver su uso en <code>src/App.jsx</code>.
              </span>
            </div>
          </div>

          {/* ─── Configuración: BrowserRouter ─── */}
          <div className="doc-section">
            <h2>Configuración: BrowserRouter</h2>
            <p>
              Para que React Router funcione, toda la app debe estar envuelta en un
              <strong> BrowserRouter</strong>. Normalmente se coloca en <code>main.jsx</code>
              (o en <code>App.jsx</code> si preferís).
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX — main.jsx</span>
              </div>
              <pre><code>{`import { BrowserRouter } from 'react-router-dom'
import App from './App'

// BrowserRouter provee el contexto de routing a toda la app.
// Todo lo que use Link, NavLink, useNavigate, etc. debe estar dentro.
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)`}</code></pre>
            </div>
          </div>

          {/* ─── Routes y Route ─── */}
          <div className="doc-section">
            <h2>Routes y Route — el mapa de rutas</h2>
            <p>
              <code>Routes</code> es el contenedor que evalúa qué ruta coincide con la URL actual.
              <code>Route</code> asocia un <code>path</code> (patrón de URL) con un componente (<code>element</code>).
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX — App.jsx</span>
              </div>
              <pre><code>{`import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import Detalle from './pages/Detalle'
import NoEncontrada from './pages/NoEncontrada'

function App() {
  return (
    <Routes>
      {/* path="/" → solo coincide con la raíz exacta */}
      <Route path="/"           element={<Inicio />} />

      {/* path="/productos" → coincide con /productos */}
      <Route path="/productos"  element={<Productos />} />

      {/* :id es un parámetro dinámico → /productos/42, /productos/abc */}
      <Route path="/productos/:id" element={<Detalle />} />

      {/* path="*" → wildcard: se activa si ninguna ruta anterior coincide */}
      <Route path="*"           element={<NoEncontrada />} />
    </Routes>
  )
}`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>
                React Router v6+ evalúa las rutas de forma inteligente — siempre elige
                la más específica, sin importar el orden. El wildcard <code>*</code> siempre
                queda de último porque es la menos específica.
              </span>
            </div>
          </div>

          {/* ─── Link ─── */}
          <div className="doc-section">
            <h2>Link — navegación declarativa</h2>
            <p>
              <code>Link</code> reemplaza al <code>&lt;a href&gt;</code> de HTML.
              Genera un enlace que cambia la URL usando la History API,
              <strong> sin recargar el navegador</strong>.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      {/* ❌ Esto recarga toda la página */}
      <a href="/productos">Productos</a>

      {/* ✅ Esto navega sin recargar */}
      <Link to="/productos">Productos</Link>

      {/* to también acepta un objeto con pathname + search + hash */}
      <Link to={{ pathname: '/productos', search: '?categoria=ropa' }}>
        Ropa
      </Link>
    </nav>
  )
}`}</code></pre>
            </div>
          </div>

          {/* ─── NavLink ─── */}
          <div className="doc-section">
            <h2>NavLink — enlace con estado activo</h2>
            <p>
              <code>NavLink</code> es igual a <code>Link</code>, pero sabe cuándo su ruta
              está activa. Recibe una <strong>función</strong> en <code>className</code>
              (o <code>style</code>) que recibe el objeto <code>{'{ isActive }'}</code>.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      {/* className recibe una función — React Router la llama con { isActive } */}
      <NavLink
        to="/productos"
        className={({ isActive }) => isActive ? 'nav-link nav-link--activo' : 'nav-link'}
      >
        Productos
      </NavLink>

      {/* La prop "end" es importante en la ruta raíz:
          Sin end, "/" estaría activo también en "/productos" (porque "/" es prefijo de todo)
          Con end, solo está activo cuando la URL es exactamente "/" */}
      <NavLink
        to="/"
        end
        className={({ isActive }) => isActive ? 'nav-link nav-link--activo' : 'nav-link'}
      >
        Inicio
      </NavLink>
    </nav>
  )
}

/* CSS */
.nav-link { color: gray; }
.nav-link--activo { color: blue; font-weight: bold; border-bottom: 2px solid blue; }`}</code></pre>
            </div>
          </div>

          {/* ─── useNavigate ─── */}
          <div className="doc-section">
            <h2>useNavigate — navegación programática</h2>
            <p>
              Cuando necesitás navegar desde código JavaScript (no desde JSX), usás
              el hook <code>useNavigate</code>. Es común en submit de formularios,
              después de un login exitoso, o en respuesta a un evento.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useNavigate } from 'react-router-dom'

function FormularioLogin() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(usuario, password)

    if (ok) {
      // Navegar a una ruta específica
      navigate('/dashboard')
    } else {
      mostrarError('Credenciales incorrectas')
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}

function PaginaDetalle() {
  const navigate = useNavigate()

  return (
    <div>
      {/* navigate(-1) = "ir atrás" en el historial del browser */}
      <button onClick={() => navigate(-1)}>← Volver</button>

      {/* navigate(1) = "ir adelante" */}
      {/* navigate('/inicio', { replace: true }) = navega reemplazando historial */}
    </div>
  )
}`}</code></pre>
            </div>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                <code>navigate(-1)</code> equivale al botón "atrás" del browser.
                <code>navigate('/ruta', {'{ replace: true }'})</code> reemplaza la entrada
                actual del historial en vez de agregar una nueva — útil después de un login
                para que el usuario no pueda volver a la pantalla de login con "atrás".
              </span>
            </div>
          </div>

          {/* ─── useParams ─── */}
          <div className="doc-section">
            <h2>useParams — parámetros dinámicos de la URL</h2>
            <p>
              Cuando una ruta tiene segmentos dinámicos como <code>/productos/:id</code>,
              el hook <code>useParams</code> devuelve esos valores como un objeto.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useParams } from 'react-router-dom'

// Ruta definida como: <Route path="/productos/:id" element={<Detalle />} />
function Detalle() {
  // Si la URL es /productos/42, params = { id: '42' }
  // Si la URL es /productos/zapatillas, params = { id: 'zapatillas' }
  const { id } = useParams()

  // ⚠️ id siempre es un string, incluso si la URL tiene un número.
  //    Si necesitás un número: const idNum = Number(id)

  const producto = productos.find(p => p.id === Number(id))

  if (!producto) {
    return <p>Producto no encontrado</p>
  }

  return (
    <div>
      <h1>{producto.nombre}</h1>
      <p>ID: {id}</p>
    </div>
  )
}

// Múltiples parámetros también son posibles:
// Ruta: /categorias/:categoria/productos/:id
// useParams() → { categoria: 'ropa', id: '42' }`}</code></pre>
            </div>
          </div>

          {/* ─── useSearchParams ─── */}
          <div className="doc-section">
            <h2>useSearchParams — query strings</h2>
            <p>
              Los query strings (<code>?clave=valor</code>) son ideales para filtros,
              búsquedas y paginación — son parte de la URL, por lo que se pueden
              compartir y el botón "atrás" los respeta.
              <code>useSearchParams</code> funciona igual que <code>useState</code> pero
              sincronizado con la URL.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { useSearchParams } from 'react-router-dom'

function PaginaProductos() {
  // [lectura, escritura] — igual que useState pero vive en la URL
  const [searchParams, setSearchParams] = useSearchParams()

  // Lee un param: si la URL es /productos?categoria=ropa → 'ropa'
  // Si no existe el param → null, por eso usamos || 'todos' como fallback
  const categoria = searchParams.get('categoria') || 'todos'
  const pagina    = Number(searchParams.get('pagina')) || 1

  const filtrados = categoria === 'todos'
    ? productos
    : productos.filter(p => p.categoria === categoria)

  return (
    <div>
      <h2>Productos — Categoría: {categoria}</h2>

      {/* Filtro: actualiza la URL sin navegar a otra página */}
      <button onClick={() => setSearchParams({ categoria: 'ropa' })}>
        Ropa
      </button>
      <button onClick={() => setSearchParams({ categoria: 'calzado' })}>
        Calzado
      </button>
      <button onClick={() => setSearchParams({})}>
        Todos
      </button>

      {/* Múltiples params a la vez */}
      <button onClick={() => setSearchParams({ categoria: 'ropa', pagina: 2 })}>
        Ropa - Página 2
      </button>
    </div>
  )
}

// URL resultante: /productos?categoria=ropa&pagina=2`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>
                A diferencia de <code>useParams</code>, que viene del <em>path</em> de la ruta,
                <code>useSearchParams</code> trabaja con la parte que va después del <code>?</code>.
                Usá parámetros de ruta para identificar recursos (<code>/productos/42</code>)
                y query strings para filtros y opciones (<code>?orden=precio&pagina=2</code>).
              </span>
            </div>
          </div>

          {/* ─── Rutas anidadas ─── */}
          <div className="doc-section">
            <h2>Rutas anidadas</h2>
            <p>
              Podés definir rutas dentro de otras rutas. Esto es útil para layouts compartidos
              o secciones con sub-navegación. El componente padre usa <code>&lt;Outlet /&gt;</code>
              para indicar dónde se renderiza la ruta hija.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX — App.jsx</span>
              </div>
              <pre><code>{`import { Routes, Route, Outlet } from 'react-router-dom'

// Layout compartido para el panel de administración
function LayoutAdmin() {
  return (
    <div>
      <SidebarAdmin />
      <main>
        {/* Outlet = aquí se renderiza la ruta hija activa */}
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      {/* Ruta padre: renderiza LayoutAdmin */}
      <Route path="/admin" element={<LayoutAdmin />}>
        {/* Rutas hijas: se renderizan dentro del <Outlet /> de LayoutAdmin */}
        <Route index element={<AdminDashboard />} />     {/* /admin        */}
        <Route path="usuarios" element={<Usuarios />} /> {/* /admin/usuarios */}
        <Route path="reportes" element={<Reportes />} /> {/* /admin/reportes */}
      </Route>
    </Routes>
  )
}`}</code></pre>
            </div>
          </div>

          {/* ─── Rutas protegidas ─── */}
          <div className="doc-section">
            <h2>Rutas protegidas</h2>
            <p>
              Un patrón muy común es proteger rutas para que solo usuarios autenticados
              puedan acceder. Se implementa con un componente wrapper que verifica
              el estado de autenticación y redirige si es necesario.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JSX</span>
              </div>
              <pre><code>{`import { Navigate, Outlet } from 'react-router-dom'

// Componente guardia: si no está autenticado, redirige al login
function RutaProtegida({ estaAutenticado }) {
  if (!estaAutenticado) {
    // Navigate hace una redirección declarativa
    // replace=true evita que /login quede en el historial
    return <Navigate to="/login" replace />
  }
  // Si está autenticado, renderiza la ruta solicitada
  return <Outlet />
}

// Uso en App.jsx
function App() {
  const { usuario } = useAuth() // hook de autenticación propio

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Todas las rutas dentro se protegen automáticamente */}
      <Route element={<RutaProtegida estaAutenticado={!!usuario} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil"    element={<Perfil />} />
        <Route path="/config"    element={<Configuracion />} />
      </Route>
    </Routes>
  )
}`}</code></pre>
            </div>
          </div>

          {/* ─── Tabla resumen ─── */}
          <div className="doc-section">
            <h2>Resumen: componentes y hooks</h2>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Para qué sirve</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>BrowserRouter</code></td>
                    <td>Componente</td>
                    <td>Envuelve la app. Provee el contexto de routing.</td>
                  </tr>
                  <tr>
                    <td><code>Routes</code></td>
                    <td>Componente</td>
                    <td>Contenedor de rutas. Renderiza solo la que coincide.</td>
                  </tr>
                  <tr>
                    <td><code>Route</code></td>
                    <td>Componente</td>
                    <td>Asocia un <code>path</code> con un <code>element</code>.</td>
                  </tr>
                  <tr>
                    <td><code>Link</code></td>
                    <td>Componente</td>
                    <td>Navegación declarativa sin recargar la página.</td>
                  </tr>
                  <tr>
                    <td><code>NavLink</code></td>
                    <td>Componente</td>
                    <td>Link con clase/estilo activo cuando la ruta coincide.</td>
                  </tr>
                  <tr>
                    <td><code>Navigate</code></td>
                    <td>Componente</td>
                    <td>Redirige declarativamente al renderizar.</td>
                  </tr>
                  <tr>
                    <td><code>Outlet</code></td>
                    <td>Componente</td>
                    <td>Marca dónde se renderizan las rutas hijas anidadas.</td>
                  </tr>
                  <tr>
                    <td><code>useNavigate</code></td>
                    <td>Hook</td>
                    <td>Navegación programática desde código JS.</td>
                  </tr>
                  <tr>
                    <td><code>useParams</code></td>
                    <td>Hook</td>
                    <td>Lee los parámetros dinámicos del path (<code>:id</code>).</td>
                  </tr>
                  <tr>
                    <td><code>useSearchParams</code></td>
                    <td>Hook</td>
                    <td>Lee y escribe query strings (<code>?clave=valor</code>).</td>
                  </tr>
                  <tr>
                    <td><code>useLocation</code></td>
                    <td>Hook</td>
                    <td>Accede al objeto location actual (pathname, search, hash).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── Flujo completo ─── */}
          <div className="doc-section">
            <h2>Flujo completo de una app con routing</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Estructura de archivos recomendada</span>
              </div>
              <pre><code>{`src/
├── main.jsx          → <BrowserRouter><App /></BrowserRouter>
├── App.jsx           → <Routes> con todas las <Route>
├── pages/
│   ├── Inicio.jsx    → página raíz "/"
│   ├── Productos.jsx → lista en "/productos" — usa useSearchParams
│   ├── Detalle.jsx   → detalle en "/productos/:id" — usa useParams
│   └── NotFound.jsx  → 404 con path="*"
└── components/
    └── Navbar.jsx    → usa NavLink para marcar la ruta activa`}</code></pre>
            </div>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">App.jsx — estructura típica</span>
              </div>
              <pre><code>{`import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import Detalle from './pages/Detalle'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />          {/* Siempre visible — contiene NavLink */}
      <main>
        <Routes>
          <Route path="/"                  element={<Inicio />} />
          <Route path="/productos"         element={<Productos />} />
          <Route path="/productos/:id"     element={<Detalle />} />
          <Route path="*"                  element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-context-api">← Context API</Link>
          <Link to="/apps/react-router-demo">App práctica →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaReactRouter
