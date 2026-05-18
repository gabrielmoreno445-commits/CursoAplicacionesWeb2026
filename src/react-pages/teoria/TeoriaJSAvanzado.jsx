import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaJSAvanzado() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>JavaScript ES6+</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>⚡ JavaScript ES6+</h1>
          <p>
            ES6 (ECMAScript 2015) y versiones posteriores introdujeron características modernas que
            hacen el código más limpio, expresivo y poderoso. Son fundamentales para trabajar con React.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>Destructuring</h2>
            <p>Permite extraer valores de arrays u objetos en variables de forma concisa.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// Destructuring de objetos
const usuario = { nombre: "Ana", edad: 25, pais: "Argentina" }

const { nombre, edad } = usuario
console.log(nombre)  // "Ana"

// Con alias
const { nombre: nombreUsuario } = usuario
console.log(nombreUsuario)  // "Ana"

// Con valor por defecto
const { rol = "visitante" } = usuario
console.log(rol)  // "visitante" (no existe en el objeto)

// Destructuring de arrays
const colores = ["rojo", "verde", "azul"]
const [primero, segundo] = colores
console.log(primero)  // "rojo"

// Saltar elementos
const [, , tercero] = colores
console.log(tercero)  // "azul"

// En parámetros de función
function mostrarUsuario({ nombre, edad }) {
  console.log(\`\${nombre} tiene \${edad} años\`)
}
mostrarUsuario(usuario)`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Spread y Rest</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// Spread (...): "expande" un array u objeto

// Copiar arrays sin mutar el original
const numeros = [1, 2, 3]
const copia = [...numeros]

// Combinar arrays
const masNumeros = [...numeros, 4, 5, 6]  // [1, 2, 3, 4, 5, 6]

// Copiar y modificar objetos (muy usado en React)
const usuario = { nombre: "Ana", edad: 25 }
const actualizado = { ...usuario, edad: 26 }  // copia + sobreescribe edad

// Rest (...): "recoge" el resto de argumentos
function sumar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0)
}
sumar(1, 2, 3, 4, 5)  // 15

// En destructuring
const [primero, ...resto] = [10, 20, 30, 40]
console.log(primero)  // 10
console.log(resto)    // [20, 30, 40]`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Template Literals</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`const nombre = "Carlos"
const edad = 30

// Antes (concatenación con +)
const antes = "Hola, " + nombre + ". Tenés " + edad + " años."

// Con template literals (backticks \` \`)
const ahora = \`Hola, \${nombre}. Tenés \${edad} años.\`

// Expresiones dentro del template
const precio = 100
const mensaje = \`Total: $\${precio * 1.21}\`

// Multilínea
const html = \`
  <div class="card">
    <h2>\${nombre}</h2>
    <p>Edad: \${edad}</p>
  </div>
\``}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Módulos (import / export)</h2>
            <p>Los módulos permiten dividir el código en archivos separados y reutilizables.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// --- utils.js ---
// Named exports (pueden ser varios)
export const PI = 3.14159

export function sumar(a, b) {
  return a + b
}

export const saludar = (nombre) => \`Hola, \${nombre}!\`

// Default export (solo uno por archivo)
export default function calcular() { ... }


// --- main.js ---
// Importar named exports
import { PI, sumar, saludar } from './utils.js'

// Importar con alias
import { sumar as add } from './utils.js'

// Importar default
import calcular from './utils.js'

// Importar todo
import * as utils from './utils.js'
utils.sumar(1, 2)`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Promesas y async/await</h2>
            <p>
              Las operaciones asíncronas (como fetch a una API) no bloquean la ejecución.
              Las promesas y async/await son la forma moderna de manejarlas.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// Promesa: representa un valor futuro
const promesa = new Promise((resolve, reject) => {
  // operación asíncrona...
  if (exito) resolve(resultado)
  else reject(new Error("Algo salió mal"))
})

// Consumir con .then() / .catch()
promesa
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error))


// async/await: sintaxis más limpia y legible
async function obtenerUsuario(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
  }
}

// Llamar una función async
const usuario = await obtenerUsuario(1)

// Ejecutar promesas en paralelo
const [usuarios, productos] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/products').then(r => r.json()),
])`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Fetch API</h2>
            <p>Fetch es la forma nativa de hacer peticiones HTTP desde JavaScript.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// GET - obtener datos
async function obtenerPokemon(nombre) {
  const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${nombre}\`)

  if (!response.ok) {
    throw new Error(\`Error HTTP: \${response.status}\`)
  }

  const data = await response.json()
  return data
}

// POST - enviar datos
async function crearUsuario(datos) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),  // convertir objeto a JSON string
  })

  return response.json()
}

// Uso
try {
  const pokemon = await obtenerPokemon("pikachu")
  console.log(pokemon.name)
} catch (error) {
  console.error("No se encontró el pokémon:", error)
}`}</code></pre>
            </div>
            <div className="alert alert--warning">
              <span className="alert__icon">⚠️</span>
              <span>Siempre verificá <code>response.ok</code> — fetch no lanza error automáticamente en respuestas 404 o 500. Solo falla si hay un error de red.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Optional Chaining y Nullish Coalescing</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`const usuario = {
  nombre: "Ana",
  direccion: {
    ciudad: "Buenos Aires"
  }
}

// Optional chaining (?.)
// Accede a propiedades sin tirar error si algo es null/undefined
const ciudad = usuario?.direccion?.ciudad   // "Buenos Aires"
const pais = usuario?.direccion?.pais       // undefined (no tira error)
const zip = usuario?.contacto?.zip          // undefined (contacto no existe)

// Nullish coalescing (??)
// Usa el valor de la derecha si el de la izquierda es null o undefined
const nombre = usuario.nombre ?? "Anónimo"   // "Ana"
const apodo = usuario.apodo ?? "Sin apodo"   // "Sin apodo"

// Combinados: muy útil con APIs
const ciudad2 = usuario?.direccion?.ciudad ?? "Sin ciudad"
// "Buenos Aires"`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-javascript">← JavaScript Fundamentos</Link>
          <Link to="/docs/teoria-react">React.js →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaJSAvanzado
