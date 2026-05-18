import { Link } from 'react-router-dom'
import './AppsIndex.css'

/*
  Para agregar una nueva app de practica:
  1. Crea la carpeta en src/apps/nombre-app/
  2. Agrega el componente y su CSS
  3. Registra la ruta en App.jsx
  4. Suma el objeto a este array
*/
const apps = [
  {
    id: 'hola-mundo',
    titulo: 'Hola Mundo',
    descripcion: 'Tu primera app interactiva. Aprende a usar useState, manejar eventos de inputs y renderizado condicional en React.',
    etiquetas: ['React', 'useState', 'Eventos'],
    modulo: '05',
  },
  {
    id: 'memorama',
    titulo: 'Memorama',
    descripcion: 'Juego de memoria: encontra los 8 pares de cartas. Practica estado, arrays y timers en React.',
    etiquetas: ['React', 'useState', 'setTimeout', 'Array.map'],
    modulo: '05',
  },
  {
    id: 'gestor-tareas',
    titulo: 'Gestor de Tareas',
    descripcion: 'CRUD completo: crea, edita, completa y elimina tareas. Persistencia con localStorage.',
    etiquetas: ['CRUD', 'localStorage', 'useEffect', 'Filtros'],
    modulo: '05',
  },
  {
    id: 'scape-room',
    titulo: 'Scape-Room',
    descripcion: 'Nueva miniapp del curso. Punto de partida para construir un juego por etapas en React.',
    etiquetas: ['React', 'Juego', 'Interaccion'],
    modulo: '05',
  },
  {
    id: 'pokedex',
    titulo: 'Pokedex',
    descripcion: 'Busca cualquier pokemon por nombre o numero usando la PokeAPI. Practica fetch, async/await y manejo de estados de carga.',
    etiquetas: ['fetch', 'async/await', 'try/catch', 'Estados UI'],
    modulo: '04',
  },
  {
    id: 'supermercado-de-colores',
    titulo: 'Supermercado de Colores',
    descripcion: 'Juego para ninos: identifica productos por color dentro de un mini supermercado pensado para practicar interaccion y estado en React.',
    etiquetas: ['React', 'Juego', 'Ninos'],
    modulo: '05',
  },
  {
    id: 'sopa-de-letras',
    titulo: 'Sopa de Letras',
    descripcion: 'Armá tu propia sopa, configurá el tiempo y encontrá todas las palabras antes de que termine el desafío.',
    etiquetas: ['React', 'useState', 'Timers', 'Lógica de juego'],
    modulo: '05',
  },
  {
    id: 'rompecabezas',
    titulo: 'Rompecabezas',
    descripcion: 'Armá la imagen pieza por pieza, elegí la dificultad y completá el puzzle antes de perder el ritmo.',
    etiquetas: ['React', 'Juego', 'Drag & Drop'],
    modulo: '05',
  },
  {
    id: '4-imagenes-1-palabra',
    titulo: '4 Imagenes 1 Palabra',
    descripcion: 'Adivina la palabra correcta segun la imagen antes de que se termine el tiempo.',
    etiquetas: ['React', 'Estado', 'Temporizador', 'Accesibilidad'],
    modulo: '05',
  },
  {
    id: 'bomba-loca',
    titulo: 'Bomba Loca',
    descripcion: 'Juego de reflejos para pasar la bomba antes de la explosion, con IA y dificultad configurable.',
    etiquetas: ['React', 'Juego', 'IA'],
    modulo: '05',
  },
  {
    id: 'monopoly-santafe',
    titulo: 'Monopoly Santa Fe',
    descripcion: 'Juego de mesa estilo Monopoly con ciudades de Santa Fe. Comprá propiedades, construí casas y hoteles, y llevá a todos a la bancarrota.',
    etiquetas: ['React', 'useState', 'Lógica de juego', 'Multijugador'],
    modulo: '05',
  },
  {
    id: 'context-api',
    titulo: 'Context API',
    descripcion: 'Librería con carrito de compras y cambio de tema. Practicá createContext, Provider, useContext y custom hooks sin prop drilling.',
    etiquetas: ['Context API', 'createContext', 'useContext', 'Custom Hook'],
    modulo: '05',
  },
  {
    id: 'pagina-ferreteria',
    titulo: 'Página Ferretería',
    descripcion: 'Landing con catálogo conectado a MockAPI, carrusel dinámico, carrito y chatbot para consultas rápidas.',
    etiquetas: ['React', 'MockAPI', 'Fetch', 'Carrito'],
    modulo: '05',
  },
  {
    id: 'react-router-demo',
    titulo: 'React Router — Navegación',
    descripcion: 'Explorador de destinos con rutas dinámicas, filtros por query string, navegación programática y página 404.',
    etiquetas: ['React Router', 'useParams', 'useNavigate', 'useSearchParams', 'NavLink'],
    modulo: '06',
  },
  {
    id: 'CardBattle-J&G',
    titulo: 'CardBattle-J&G',
    descripcion: 'Nuevo juego de cartas para practicar componentes, estado e interacciones dentro de una app React.',
    etiquetas: ['React', 'Juego', 'Cartas'],
  },
  {
    id: 'custom-hooks',
    titulo: 'Custom Hooks',
    descripcion: 'Probá cuatro hooks en vivo: useCounter, useLocalStorage, useDebounce y useFetch. Cada uno muestra el código del hook junto al demo interactivo.',
    etiquetas: ['Custom Hooks', 'useEffect', 'Composición', 'Buenas prácticas'],
  },
  {
    id: 'contactos-bugueados',
    titulo: 'Gestor de Contactos — Bugueado',
    descripcion: 'Esta app tiene errores intencionales de React Avanzado. Encontrá qué está mal y corregí el código.',
    etiquetas: ['useEffect', 'useMemo', 'useCallback', 'memo', 'Bugs'],
  },
  {
    id: 'gabyapps',
    titulo: 'GabyApps',
    descripcion: 'Coleccion de apps personales con nuevas ideas y proyectos propios para expandir el laboratorio del curso.',
    etiquetas: ['React', 'Proyectos', 'Portfolio'],
    modulo: '06',
  },
]

function AppsIndex() {
  return (
    <div className="apps-index">
      <div className="apps-index__header">
        <h1>Aplicaciones de Practica</h1>
        <p>
          Mini-aplicaciones aisladas para practicar los conceptos de cada modulo.
          Cada una esta en su propia carpeta dentro de <code>src/apps/</code>.
        </p>
      </div>

      <div className="apps-index__grilla">
        {apps.map((app) => (
          app.disponible === false ? (
            <div key={app.id} className="app-card app-card--proximamente">
              <div className="app-card__modulo">Proximamente</div>
              <h2 className="app-card__titulo">{app.titulo}</h2>
              <p className="app-card__descripcion">{app.descripcion}</p>
              <div className="app-card__etiquetas">
                {app.etiquetas.map((e) => (
                  <span key={e} className="app-card__etiqueta">{e}</span>
                ))}
              </div>
              <span className="app-card__ir">Disponible pronto</span>
            </div>
          ) : (
            <Link key={app.id} to={`/apps/${app.id}`} className="app-card">
              <div className="app-card__modulo">Modulo {app.modulo}</div>
              <h2 className="app-card__titulo">{app.titulo}</h2>
              <p className="app-card__descripcion">{app.descripcion}</p>
              <div className="app-card__etiquetas">
                {app.etiquetas.map((e) => (
                  <span key={e} className="app-card__etiqueta">{e}</span>
                ))}
              </div>
              <span className="app-card__ir">Ver aplicacion -&gt;</span>
            </Link>
          )
        ))}
      </div>
    </div>
  )
}

export default AppsIndex
