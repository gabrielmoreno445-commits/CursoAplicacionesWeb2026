import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaTypeScript() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>TypeScript</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>🔷 TypeScript</h1>
          <p>
            TypeScript es JavaScript con tipos. Agrega un sistema de tipos estáticos opcional
            que atrapa errores en tiempo de desarrollo, antes de que el código se ejecute.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>¿Por qué TypeScript?</h2>
            <ul>
              <li><strong>Errores en desarrollo</strong>: el editor te avisa si pasás el tipo de dato incorrecto.</li>
              <li><strong>Autocompletado inteligente</strong>: el editor sabe qué propiedades tiene cada objeto.</li>
              <li><strong>Código autodocumentado</strong>: los tipos sirven como documentación.</li>
              <li><strong>Refactoring seguro</strong>: renombrar una función actualiza todas sus referencias.</li>
            </ul>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>TypeScript se compila a JavaScript. El navegador nunca ve TypeScript — solo el resultado JS.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Tipos básicos</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">TypeScript</span>
              </div>
              <pre><code>{`// Anotación de tipos con :
const nombre: string = "Ana"
const edad: number = 25
const activo: boolean = true

// Arrays
const numeros: number[] = [1, 2, 3]
const nombres: string[] = ["Ana", "Luis"]
const mixto: (string | number)[] = ["hola", 42]

// Null y undefined
let usuario: string | null = null
let resultado: number | undefined = undefined

// any: deshabilita el chequeo de tipos (evitar)
let cosa: any = "cualquier cosa"

// unknown: más seguro que any
let valor: unknown = obtenerDato()
if (typeof valor === "string") {
  console.log(valor.toUpperCase())  // TypeScript sabe que es string aquí
}

// Funciones con tipos
function sumar(a: number, b: number): number {
  return a + b
}

// Parámetro opcional con ?
function saludar(nombre: string, titulo?: string): string {
  return titulo ? \`\${titulo} \${nombre}\` : nombre
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Interfaces</h2>
            <p>Las interfaces definen la "forma" de un objeto.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">TypeScript</span>
              </div>
              <pre><code>{`interface Usuario {
  id: number
  nombre: string
  email: string
  edad?: number           // propiedad opcional
  readonly creado: Date   // solo lectura
}

// Usar la interface como tipo
function mostrarUsuario(usuario: Usuario): string {
  return \`\${usuario.nombre} (\${usuario.email})\`
}

const user: Usuario = {
  id: 1,
  nombre: "Carlos",
  email: "carlos@email.com",
  creado: new Date()
}

// Extender interfaces
interface Admin extends Usuario {
  permisos: string[]
  nivel: "junior" | "senior" | "lead"
}

const admin: Admin = {
  id: 2,
  nombre: "Laura",
  email: "laura@email.com",
  creado: new Date(),
  permisos: ["crear", "eliminar"],
  nivel: "senior"
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Type Alias y Union Types</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">TypeScript</span>
              </div>
              <pre><code>{`// Type alias: nombre para un tipo
type ID = string | number
type Coordenadas = { x: number; y: number }
type Callback = (error: Error | null, data: unknown) => void

// Union types: puede ser uno U otro
type Estado = "cargando" | "exito" | "error"
type Resultado = string | number | null

function manejarEstado(estado: Estado) {
  if (estado === "cargando") return "Espera..."
  if (estado === "error") return "Error :("
  return "Listo!"
}

// Intersection types: combina tipos
type EmpleadoAdmin = Usuario & {
  departamento: string
  salario: number
}

// Tipo literal: el valor exacto
type Direccion = "norte" | "sur" | "este" | "oeste"
let dir: Direccion = "norte"
// dir = "diagonal"  // ❌ Error: no es un valor válido`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Generics</h2>
            <p>Los generics permiten crear componentes reutilizables que funcionan con cualquier tipo.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">TypeScript</span>
              </div>
              <pre><code>{`// Función genérica: <T> es un "tipo variable"
function primero<T>(array: T[]): T {
  return array[0]
}

const num = primero([1, 2, 3])       // T = number → retorna number
const str = primero(["a", "b", "c"]) // T = string → retorna string

// Interface genérica
interface Respuesta<T> {
  data: T
  status: number
  ok: boolean
}

type RespuestaUsuarios = Respuesta<Usuario[]>
type RespuestaProducto = Respuesta<Producto>

// Función con constraint: T debe tener la propiedad id
function encontrar<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id)
}

// Muy usado con fetch
async function obtener<T>(url: string): Promise<T> {
  const res = await fetch(url)
  return res.json() as T
}

const usuarios = await obtener<Usuario[]>('/api/users')`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>TypeScript en React</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">TSX</span>
              </div>
              <pre><code>{`import { useState, FC } from 'react'

// Tipar props con interface
interface BotonProps {
  texto: string
  onClick: () => void
  variante?: "primario" | "secundario" | "peligro"
  deshabilitado?: boolean
}

// FC<Props> o function Component(props: Props)
const Boton: FC<BotonProps> = ({ texto, onClick, variante = "primario", deshabilitado = false }) => {
  return (
    <button
      className={\`btn btn--\${variante}\`}
      onClick={onClick}
      disabled={deshabilitado}
    >
      {texto}
    </button>
  )
}

// useState con tipo explícito
interface Usuario {
  id: number
  nombre: string
}

function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [lista, setLista] = useState<string[]>([])
  const [count, setCount] = useState(0)  // infiere number automáticamente

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.textContent)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return <input onChange={handleChange} />
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Utility Types</h2>
            <p>TypeScript incluye tipos utilitarios que transforman tipos existentes.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">TypeScript</span>
              </div>
              <pre><code>{`interface Usuario {
  id: number
  nombre: string
  email: string
  edad: number
}

// Partial<T>: todas las propiedades son opcionales
type UsuarioParcial = Partial<Usuario>
// { id?: number; nombre?: string; ... }

// Required<T>: todas las propiedades son obligatorias
type UsuarioCompleto = Required<UsuarioParcial>

// Pick<T, K>: selecciona un subconjunto de propiedades
type UsuarioPublico = Pick<Usuario, "nombre" | "email">
// { nombre: string; email: string }

// Omit<T, K>: excluye propiedades
type UsuarioSinId = Omit<Usuario, "id">
// { nombre: string; email: string; edad: number }

// Readonly<T>: todas las propiedades son de solo lectura
type UsuarioFijo = Readonly<Usuario>

// Record<K, V>: objeto con claves K y valores V
type PorRol = Record<"admin" | "editor" | "viewer", Usuario[]>`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-vuejs">← Vue.js</Link>
          <Link to="/docs">Ver todos los docs →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaTypeScript
