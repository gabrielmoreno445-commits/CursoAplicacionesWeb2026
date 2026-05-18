import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaJavaScript() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>JavaScript Fundamentos</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>🟡 JavaScript Fundamentos</h1>
          <p>
            JavaScript es el lenguaje de programación de la web. Permite agregar interactividad:
            responder a clicks, modificar el contenido, hacer peticiones a servidores y mucho más.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>Variables</h2>
            <p>Las variables almacenan datos. En JavaScript moderno usamos <code>let</code> y <code>const</code>.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// const: valor que no cambia (preferido por defecto)
const nombre = "Ana"
const PI = 3.14159

// let: valor que puede cambiar
let edad = 25
edad = 26  // válido

// var: antigua, evitar (tiene scoping problemático)
var viejo = "no usar"`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>Usá <code>const</code> por defecto. Solo usá <code>let</code> cuando necesites reasignar el valor.</span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Tipos de datos</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// String (texto)
const saludo = "Hola mundo"
const nombre = 'María'
const mensaje = \`Hola, \${nombre}!\`  // template literal

// Number (número)
const edad = 30
const precio = 19.99

// Boolean
const activo = true
const cargando = false

// null (ausencia intencional de valor)
const usuario = null

// undefined (variable declarada sin valor)
let resultado
console.log(resultado)  // undefined

// Array (lista ordenada)
const frutas = ["manzana", "naranja", "pera"]
const numeros = [1, 2, 3, 4, 5]

// Object (conjunto de pares clave-valor)
const persona = {
  nombre: "Carlos",
  edad: 28,
  activo: true
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Funciones</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// Declaración de función
function saludar(nombre) {
  return "Hola, " + nombre + "!"
}

// Expresión de función
const despedir = function(nombre) {
  return "Adiós, " + nombre
}

// Arrow function (ES6+) - forma moderna y concisa
const sumar = (a, b) => a + b

const cuadrado = (n) => n * n

// Arrow function con múltiples líneas
const procesarUsuario = (usuario) => {
  const nombreCompleto = usuario.nombre + " " + usuario.apellido
  return nombreCompleto.toUpperCase()
}

// Llamar funciones
console.log(saludar("Ana"))        // "Hola, Ana!"
console.log(sumar(3, 4))           // 7`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Arrays y métodos</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`const numeros = [1, 2, 3, 4, 5]

// Acceder por índice (empieza en 0)
numeros[0]   // 1
numeros[4]   // 5

// Métodos comunes
numeros.length          // 5
numeros.push(6)         // agrega al final
numeros.pop()           // elimina el último
numeros.includes(3)     // true

// Métodos funcionales (muy usados en React)
const dobles = numeros.map(n => n * 2)
// [2, 4, 6, 8, 10]

const pares = numeros.filter(n => n % 2 === 0)
// [2, 4]

const suma = numeros.reduce((acc, n) => acc + n, 0)
// 15

numeros.forEach(n => console.log(n))

// Encontrar un elemento
const encontrado = numeros.find(n => n > 3)   // 4
const indice = numeros.findIndex(n => n > 3)  // 3`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Objetos</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`const usuario = {
  nombre: "Laura",
  edad: 22,
  hobbies: ["leer", "programar"],
  direccion: {
    ciudad: "Buenos Aires",
    pais: "Argentina"
  }
}

// Acceder a propiedades
usuario.nombre          // "Laura"
usuario["edad"]         // 22
usuario.direccion.ciudad  // "Buenos Aires"

// Modificar
usuario.edad = 23
usuario.email = "laura@email.com"  // agrega nueva propiedad

// Desestructuración (ES6+)
const { nombre, edad } = usuario
console.log(nombre, edad)  // "Laura" 23

// Spread (copiar/mezclar objetos)
const actualizado = { ...usuario, edad: 24 }

// Object.keys / Object.values
Object.keys(usuario)    // ["nombre", "edad", "hobbies", ...]
Object.values(usuario)  // ["Laura", 22, [...], ...]`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Condicionales y bucles</h2>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// if / else if / else
const hora = 14
if (hora < 12) {
  console.log("Buenos días")
} else if (hora < 18) {
  console.log("Buenas tardes")
} else {
  console.log("Buenas noches")
}

// Operador ternario (condicional en una línea)
const mensaje = hora < 12 ? "Mañana" : "Tarde"

// Operador nullish coalescing (??)
const nombreUsuario = usuario.nombre ?? "Anónimo"

// for...of (iterar arrays)
const frutas = ["manzana", "naranja", "pera"]
for (const fruta of frutas) {
  console.log(fruta)
}

// for...in (iterar objetos)
const persona = { nombre: "Ana", edad: 25 }
for (const clave in persona) {
  console.log(clave, persona[clave])
}`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>DOM y Eventos</h2>
            <p>El DOM (Document Object Model) es la representación del HTML como objetos JavaScript que podemos manipular.</p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">JavaScript</span>
              </div>
              <pre><code>{`// Seleccionar elementos
const titulo = document.querySelector("h1")
const botones = document.querySelectorAll(".btn")
const form = document.getElementById("mi-form")

// Modificar contenido
titulo.textContent = "Nuevo título"
titulo.innerHTML = "<strong>Título en negrita</strong>"

// Modificar estilos y clases
titulo.style.color = "red"
titulo.classList.add("activo")
titulo.classList.remove("oculto")
titulo.classList.toggle("visible")

// Crear y agregar elementos
const parrafo = document.createElement("p")
parrafo.textContent = "Nuevo párrafo"
document.body.appendChild(parrafo)

// Eventos
const boton = document.querySelector("#mi-boton")

boton.addEventListener("click", (evento) => {
  console.log("Click!", evento.target)
})

// Tipos de eventos comunes
// click, dblclick, keydown, keyup, submit,
// change, input, mouseover, mouseout, scroll`}</code></pre>
            </div>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-css">← CSS3 y Layouts</Link>
          <Link to="/docs/teoria-js-avanzado">JavaScript ES6+ →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaJavaScript
