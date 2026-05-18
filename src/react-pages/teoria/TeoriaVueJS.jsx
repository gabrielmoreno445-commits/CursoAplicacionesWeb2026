import { Link } from 'react-router-dom'
import '../docs/DocPage.css'

function TeoriaVueJS() {
  return (
    <div className="doc-page">
      <div className="doc-page__inner">

        <div className="doc-page__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span>›</span>
          <span>Mes 7 · Semana 25</span>
        </div>

        <div className="doc-page__header">
          <span className="doc-page__tipo doc-page__tipo--teoria">Teoría</span>
          <h1>Vue.js: fundamentos y comparación con React</h1>
          <p>
            Semana 25 del curso. En esta clase presentamos Vue.js como framework progresivo,
            entendemos su modelo mental y lo comparamos con React para aprovechar lo que ya
            venimos trabajando durante el trimestre anterior.
          </p>
        </div>

        <div className="doc-page__content">

          <div className="doc-section">
            <h2>Objetivos de la clase</h2>
            <p>
              Al terminar esta semana deberías poder leer un componente Vue, identificar sus
              partes principales y construir una pequeña interfaz reactiva con estado, eventos
              y renderizado condicional.
            </p>
            <ul>
              <li>Comprender qué es Vue.js y cuándo conviene usarlo.</li>
              <li>Comparar componentes, estado, eventos y renderizado entre Vue y React.</li>
              <li>Conocer la estructura de un Single File Component con <code>.vue</code>.</li>
              <li>Usar <code>ref</code>, interpolación, directivas y eventos básicos.</li>
              <li>Preparar la base para la Semana 26: componentes, directivas y eventos en Vue.</li>
            </ul>
          </div>

          <div className="doc-section">
            <h2>¿Qué es Vue.js?</h2>
            <p>
              Vue.js es un framework progresivo de JavaScript para construir interfaces de usuario.
              Se lo llama progresivo porque puede usarse de a poco: desde agregar interactividad
              a una página simple hasta construir una SPA completa con rutas, estado global y build
              moderno.
            </p>
            <ul>
              <li><strong>Reactivo</strong>: cuando cambia el estado, la vista se actualiza automáticamente.</li>
              <li><strong>Basado en componentes</strong>: la UI se divide en piezas reutilizables.</li>
              <li><strong>Declarativo</strong>: describimos cómo debe verse la pantalla según los datos actuales.</li>
              <li><strong>Accesible para empezar</strong>: su template se parece mucho a HTML tradicional.</li>
              <li><strong>Escalable</strong>: permite crecer hacia Vue Router, Pinia, testing y TypeScript.</li>
            </ul>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                En React escribimos la UI con JSX. En Vue normalmente usamos un template HTML
                enriquecido con directivas como <code>v-if</code>, <code>v-for</code> y <code>v-model</code>.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Vue y React: misma idea, distinta sintaxis</h2>
            <p>
              Vue y React resuelven problemas parecidos: componentes, estado, eventos, listas,
              formularios y actualización de la UI. La diferencia principal está en cómo se escribe
              cada concepto.
            </p>
            <div className="doc-table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>React</th>
                    <th>Vue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Archivo de componente</td><td><code>.jsx</code></td><td><code>.vue</code></td></tr>
                  <tr><td>Vista</td><td><code>return (...JSX)</code></td><td><code>&lt;template&gt;</code></td></tr>
                  <tr><td>Estado simple</td><td><code>useState()</code></td><td><code>ref()</code></td></tr>
                  <tr><td>Estado objeto</td><td><code>useState({`{}`})</code></td><td><code>reactive({`{}`})</code></td></tr>
                  <tr><td>Eventos</td><td><code>onClick</code></td><td><code>@click</code></td></tr>
                  <tr><td>Condicional</td><td><code>{`{activo && <Panel />}`}</code></td><td><code>v-if="activo"</code></td></tr>
                  <tr><td>Listas</td><td><code>.map()</code></td><td><code>v-for</code></td></tr>
                  <tr><td>Formulario</td><td><code>value + onChange</code></td><td><code>v-model</code></td></tr>
                  <tr><td>Efecto al montar</td><td><code>useEffect(..., [])</code></td><td><code>onMounted()</code></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="doc-section">
            <h2>Estructura de un componente Vue</h2>
            <p>
              Un componente Vue suele escribirse como Single File Component. El mismo archivo contiene
              el template, la lógica y los estilos del componente.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Contador.vue</span>
              </div>
              <pre><code>{`<template>
  <section class="contador">
    <h2>Contador Vue</h2>
    <p>Clicks: {{ clicks }}</p>

    <button @click="sumar">Sumar</button>
    <button @click="restar">Restar</button>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const clicks = ref(0)

function sumar() {
  clicks.value++
}

function restar() {
  clicks.value--
}
</script>

<style scoped>
.contador {
  padding: 20px;
  border: 1px solid #ddd;
}
</style>`}</code></pre>
            </div>
            <div className="alert alert--tip">
              <span className="alert__icon">💡</span>
              <span>
                En el <code>script</code>, un <code>ref</code> se lee y modifica con <code>.value</code>.
                En el <code>template</code>, Vue lo muestra directamente: <code>{'{{ clicks }}'}</code>.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2>El mismo contador en React</h2>
            <p>
              Comparar el mismo ejemplo ayuda a transferir conocimientos. La lógica es casi la misma:
              declarar estado, crear funciones y conectar eventos.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Contador.jsx</span>
              </div>
              <pre><code>{`import { useState } from 'react'

function Contador() {
  const [clicks, setClicks] = useState(0)

  function sumar() {
    setClicks(clicks + 1)
  }

  function restar() {
    setClicks(clicks - 1)
  }

  return (
    <section className="contador">
      <h2>Contador React</h2>
      <p>Clicks: {clicks}</p>

      <button onClick={sumar}>Sumar</button>
      <button onClick={restar}>Restar</button>
    </section>
  )
}

export default Contador`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Interpolación y atributos dinámicos</h2>
            <p>
              Vue permite mostrar valores con doble llave e insertar expresiones simples dentro
              del template. Para atributos dinámicos se usa <code>:</code>, que es el atajo de
              <code>v-bind</code>.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Vue Template</span>
              </div>
              <pre><code>{`<template>
  <article class="perfil">
    <img :src="usuario.avatar" :alt="usuario.nombre" />
    <h2>{{ usuario.nombre }}</h2>
    <p>{{ usuario.rol }}</p>

    <button :disabled="usuario.bloqueado">
      {{ usuario.bloqueado ? 'Usuario bloqueado' : 'Enviar mensaje' }}
    </button>
  </article>
</template>

<script setup>
import { reactive } from 'vue'

const usuario = reactive({
  nombre: 'Ana Torres',
  rol: 'Frontend Developer',
  avatar: '/avatar.png',
  bloqueado: false
})
</script>`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Condicionales y listas</h2>
            <p>
              En React usamos JavaScript puro para condicionales y listas. En Vue usamos directivas
              declarativas que se escriben como atributos HTML.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">Tareas.vue</span>
              </div>
              <pre><code>{`<template>
  <section>
    <h2>Mis tareas</h2>

    <p v-if="tareas.length === 0">No hay tareas cargadas.</p>

    <ul v-else>
      <li v-for="tarea in tareas" :key="tarea.id">
        <span :class="{ terminada: tarea.hecha }">
          {{ tarea.texto }}
        </span>
        <button @click="cambiarEstado(tarea.id)">
          {{ tarea.hecha ? 'Reabrir' : 'Completar' }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const tareas = ref([
  { id: 1, texto: 'Repasar componentes', hecha: true },
  { id: 2, texto: 'Crear una app con Vue', hecha: false },
  { id: 3, texto: 'Comparar Vue con React', hecha: false }
])

function cambiarEstado(id) {
  const tarea = tareas.value.find((item) => item.id === id)
  tarea.hecha = !tarea.hecha
}
</script>`}</code></pre>
            </div>
            <div className="alert alert--warning">
              <span className="alert__icon">⚠️</span>
              <span>
                En listas siempre usá una clave estable con <code>:key</code>. Igual que en React,
                ayuda a que el framework identifique correctamente cada elemento.
              </span>
            </div>
          </div>

          <div className="doc-section">
            <h2>Formularios con v-model</h2>
            <p>
              <code>v-model</code> conecta el input con el estado. Cuando el usuario escribe, el estado
              cambia; cuando el estado cambia, el input se actualiza.
            </p>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">FormularioVue.vue</span>
              </div>
              <pre><code>{`<template>
  <form @submit.prevent="guardar">
    <label>
      Nombre
      <input v-model="form.nombre" type="text" />
    </label>

    <label>
      Tecnología favorita
      <select v-model="form.tecnologia">
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="vue">Vue.js</option>
      </select>
    </label>

    <p>Vista previa: {{ form.nombre }} quiere aprender {{ form.tecnologia }}</p>

    <button :disabled="!form.nombre">Guardar</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  nombre: '',
  tecnologia: 'vue'
})

function guardar() {
  alert(\`Inscripción guardada para \${form.nombre}\`)
}
</script>`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Mini app sugerida para practicar</h2>
            <p>
              Como ejercicio de clase, podemos construir una mini app llamada <strong>Checklist Vue</strong>.
              No necesita backend: solo estado local y componentes simples.
            </p>
            <div className="alert alert--info">
              <span className="alert__icon">ℹ️</span>
              <span>
                El proyecto standalone está en <code>proyectos-vite/vue-semana-25-checklist</code>.
                Se ejecuta con <code>npm install</code> y <code>npm run dev</code> dentro de esa carpeta.
              </span>
            </div>
            <ol>
              <li>Crear un array inicial de temas: HTML, CSS, JavaScript, React y Vue.</li>
              <li>Mostrar la lista con <code>v-for</code>.</li>
              <li>Permitir marcar cada tema como aprendido con <code>@click</code>.</li>
              <li>Mostrar un mensaje con <code>v-if</code> cuando todos estén completados.</li>
              <li>Agregar un input con <code>v-model</code> para sumar un nuevo tema.</li>
            </ol>
            <div className="code-block">
              <div className="code-block__header">
                <span className="code-block__label">ChecklistVue.vue</span>
              </div>
              <pre><code>{`<template>
  <section>
    <h2>Checklist Vue</h2>

    <form @submit.prevent="agregarTema">
      <input v-model="nuevoTema" placeholder="Nuevo tema" />
      <button :disabled="!nuevoTema.trim()">Agregar</button>
    </form>

    <ul>
      <li v-for="tema in temas" :key="tema.id">
        <button @click="alternarTema(tema.id)">
          {{ tema.aprendido ? '✓' : '○' }}
        </button>
        <span :class="{ aprendido: tema.aprendido }">
          {{ tema.nombre }}
        </span>
      </li>
    </ul>

    <p v-if="todosAprendidos">
      Todos los temas están completos.
    </p>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const nuevoTema = ref('')
const temas = ref([
  { id: 1, nombre: 'HTML', aprendido: true },
  { id: 2, nombre: 'CSS', aprendido: true },
  { id: 3, nombre: 'JavaScript', aprendido: true },
  { id: 4, nombre: 'React', aprendido: false },
  { id: 5, nombre: 'Vue.js', aprendido: false }
])

const todosAprendidos = computed(() => {
  return temas.value.every((tema) => tema.aprendido)
})

function alternarTema(id) {
  const tema = temas.value.find((item) => item.id === id)
  tema.aprendido = !tema.aprendido
}

function agregarTema() {
  temas.value.push({
    id: crypto.randomUUID(),
    nombre: nuevoTema.value.trim(),
    aprendido: false
  })

  nuevoTema.value = ''
}
</script>`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>Cierre de la Semana 25</h2>
            <p>
              La idea clave es que Vue no reemplaza lo aprendido con React: lo reorganiza con otra
              sintaxis. Los conceptos de componentes, estado, renderizado declarativo, eventos y
              listas siguen siendo los mismos.
            </p>
            <ul>
              <li>Si entendés <code>useState</code>, podés entender <code>ref</code>.</li>
              <li>Si entendés <code>.map()</code>, podés entender <code>v-for</code>.</li>
              <li>Si entendés renderizado condicional en JSX, podés entender <code>v-if</code>.</li>
              <li>Si entendés formularios controlados en React, <code>v-model</code> te va a resultar natural.</li>
            </ul>
          </div>

        </div>

        <div className="doc-page__nav">
          <Link to="/docs/teoria-react">← React.js</Link>
          <Link to="/docs/teoria-typescript">TypeScript →</Link>
        </div>

      </div>
    </div>
  )
}

export default TeoriaVueJS
