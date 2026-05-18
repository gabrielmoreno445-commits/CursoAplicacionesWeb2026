import { Link } from 'react-router-dom'
import './DocsIndex.css'

const docs = [
  {
    id: 'instalar-docker',
    titulo: 'Instalar Docker',
    descripcion: 'Instalá Docker Desktop en Windows, macOS y Linux. Incluye configuración de WSL 2 y comandos esenciales.',
    etiquetas: ['Docker', 'Contenedores', 'DevOps'],
    tipo: 'instalacion',
    icono: '🐳',
  },
  {
    id: 'ollama-docker',
    titulo: 'Ollama con Docker Compose',
    descripcion: 'Levantá Ollama y Open WebUI con un solo comando usando el docker-compose del proyecto.',
    etiquetas: ['Docker', 'Ollama', 'IA', 'LLM'],
    tipo: 'guia',
    icono: '🦙',
  },
  {
    id: 'instalar-ollama',
    titulo: 'Instalar Ollama (IA Local)',
    descripcion: 'Ejecutá modelos de IA como Llama 3, Mistral y Gemma directamente en tu computadora, sin internet ni API keys.',
    etiquetas: ['IA', 'LLM', 'Local', 'CLI'],
    tipo: 'instalacion',
    icono: '🦙',
  },
  {
    id: 'instalar-node',
    titulo: 'Instalar Node.js y npm',
    descripcion: 'Configurá Node.js, npm y nvm en Windows, macOS y Linux. Gestión de versiones incluida.',
    etiquetas: ['Node.js', 'npm', 'nvm', 'JavaScript'],
    tipo: 'instalacion',
    icono: '🟢',
  },
  {
    id: 'instalar-git',
    titulo: 'Instalar y Configurar Git',
    descripcion: 'Instalá Git, configurá tu identidad, generá una clave SSH y conectate a GitHub.',
    etiquetas: ['Git', 'GitHub', 'SSH', 'Control de versiones'],
    tipo: 'instalacion',
    icono: '🔀',
  },
  {
    id: 'vscode-setup',
    titulo: 'VS Code para Desarrollo Web',
    descripcion: 'Las mejores extensiones, atajos de teclado y configuraciones para tener un entorno profesional.',
    etiquetas: ['VS Code', 'Editor', 'Extensiones', 'Productividad'],
    tipo: 'guia',
    icono: '💙',
  },
  {
    id: 'git-cheatsheet',
    titulo: 'Git Cheatsheet',
    descripcion: 'Los comandos de Git más usados en el día a día, organizados por situación.',
    etiquetas: ['Git', 'Referencia rápida', 'Comandos'],
    tipo: 'referencia',
    icono: '📋',
  },
  {
    id: 'react-hooks',
    titulo: 'React Hooks Esenciales',
    descripcion: 'Referencia rápida de useState, useEffect, useRef y más. Con ejemplos prácticos.',
    etiquetas: ['React', 'Hooks', 'useState', 'useEffect'],
    tipo: 'referencia',
    icono: '⚛️',
  },
]

const teoria = [
  {
    id: 'teoria-html',
    titulo: 'HTML5 Fundamentos',
    descripcion: 'Estructura de documentos, etiquetas semánticas, formularios y atributos esenciales.',
    etiquetas: ['HTML5', 'Semántica', 'Formularios', 'Trimestre 1'],
    tipo: 'teoria',
    icono: '🌐',
  },
  {
    id: 'teoria-css',
    titulo: 'CSS3 y Layouts',
    descripcion: 'Box model, selectores, Flexbox, CSS Grid, responsive design y variables CSS.',
    etiquetas: ['CSS3', 'Flexbox', 'Grid', 'Trimestre 1'],
    tipo: 'teoria',
    icono: '🎨',
  },
  {
    id: 'teoria-javascript',
    titulo: 'JavaScript Fundamentos',
    descripcion: 'Variables, tipos de datos, funciones, arrays, objetos, DOM y manejo de eventos.',
    etiquetas: ['JavaScript', 'DOM', 'Eventos', 'Trimestre 1'],
    tipo: 'teoria',
    icono: '🟡',
  },
  {
    id: 'teoria-js-avanzado',
    titulo: 'JavaScript ES6+',
    descripcion: 'Destructuring, spread/rest, módulos, promesas, async/await y Fetch API.',
    etiquetas: ['ES6+', 'async/await', 'Fetch', 'Trimestre 2'],
    tipo: 'teoria',
    icono: '⚡',
  },
  {
    id: 'teoria-react',
    titulo: 'React.js',
    descripcion: 'Componentes, JSX, props, estado, efectos, React Router y Context API.',
    etiquetas: ['React', 'Hooks', 'Router', 'Trimestre 2'],
    tipo: 'teoria',
    icono: '⚛️',
  },
  {
    id: 'teoria-vuejs',
    titulo: 'Vue.js',
    descripcion: 'Composition API, directivas (v-if, v-for, v-model), componentes, props y watchers.',
    etiquetas: ['Vue.js', 'Composition API', 'Directivas', 'Trimestre 3'],
    tipo: 'teoria',
    icono: '💚',
  },
  {
    id: 'teoria-typescript',
    titulo: 'TypeScript',
    descripcion: 'Tipos básicos, interfaces, generics, utility types y TypeScript en React.',
    etiquetas: ['TypeScript', 'Tipos', 'Interfaces', 'Trimestre 3'],
    tipo: 'teoria',
    icono: '🔷',
  },
  {
    id: 'teoria-context-api',
    titulo: 'Context API — Estado Global',
    descripcion: 'Prop drilling, createContext, Provider, useContext y el patrón de custom hooks para estado global en React.',
    etiquetas: ['React', 'Context API', 'Estado Global', 'Trimestre 2'],
    tipo: 'teoria',
    icono: '🔄',
  },
  {
    id: 'teoria-react-router',
    titulo: 'React Router — Navegación',
    descripcion: 'Routes, Link, NavLink, useNavigate, useParams, useSearchParams, rutas anidadas y rutas protegidas.',
    etiquetas: ['React', 'React Router', 'Navegación', 'Trimestre 2'],
    tipo: 'teoria',
    icono: '🧭',
  },
  {
    id: 'teoria-custom-hooks',
    titulo: 'Custom Hooks',
    descripcion: 'Extraé lógica reutilizable con custom hooks. useCounter, useLocalStorage, useDebounce, useFetch y buenas prácticas.',
    etiquetas: ['React', 'Custom Hooks', 'Composición', 'Trimestre 2'],
    tipo: 'teoria',
    icono: '🪝',
  },
]

const tipoLabel = {
  instalacion: 'Instalación',
  guia: 'Guía',
  referencia: 'Referencia',
  teoria: 'Teoría',
}

function DocCard({ doc }) {
  return (
    <Link key={doc.id} to={`/docs/${doc.id}`} className="doc-card">
      <div className="doc-card__top">
        <span className="doc-card__icono">{doc.icono}</span>
        <span className={`doc-card__tipo doc-card__tipo--${doc.tipo}`}>
          {tipoLabel[doc.tipo]}
        </span>
      </div>
      <h2 className="doc-card__titulo">{doc.titulo}</h2>
      <p className="doc-card__descripcion">{doc.descripcion}</p>
      <div className="doc-card__etiquetas">
        {doc.etiquetas.map((e) => (
          <span key={e} className="doc-card__etiqueta">{e}</span>
        ))}
      </div>
      <span className="doc-card__ir">Leer guía →</span>
    </Link>
  )
}

function DocsIndex() {
  return (
    <div className="docs-index">
      <div className="docs-index__header">
        <span className="docs-index__badge">Documentación</span>
        <h1>Guías y Referencias</h1>
        <p>
          Instalaciones paso a paso, guías de configuración, referencias rápidas y teoría del curso.
        </p>
      </div>

      <div className="docs-index__seccion">
        <div className="docs-index__seccion-header">
          <h2>Guías y Recursos</h2>
          <p>Instalaciones, configuraciones y referencias rápidas para tu entorno de desarrollo.</p>
        </div>
        <div className="docs-index__grilla">
          {docs.map((doc) => <DocCard key={doc.id} doc={doc} />)}
        </div>
      </div>

      <div className="docs-index__seccion">
        <div className="docs-index__seccion-header">
          <h2>Teoría del Curso</h2>
          <p>Conceptos teóricos ordenados según el temario, del Trimestre 1 al Trimestre 3.</p>
        </div>
        <div className="docs-index__grilla">
          {teoria.map((doc) => <DocCard key={doc.id} doc={doc} />)}
        </div>
      </div>
    </div>
  )
}

export default DocsIndex
