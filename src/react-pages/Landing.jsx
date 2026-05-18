import './Landing.css'

const trimestres = [
  {
    numero: '01',
    titulo: 'Fundamentos del Desarrollo Web',
    duracion: '12 semanas · 2 clases semanales de 2 horas c/u',
    meses: [
      {
        titulo: 'Mes 1: Introducción a HTML y CSS',
        semanas: [
          'Semana 1: Introducción a la web y tecnologías fundamentales.',
          'Semana 2: Estructura de HTML y elementos básicos.',
          'Semana 3: CSS básico, sintaxis y selectores.',
          'Semana 4: Diseño responsivo con Flexbox y Grid.',
        ],
      },
      {
        titulo: 'Mes 2: JavaScript e Inteligencia Artificial',
        semanas: [
          'Semana 5: JavaScript: repaso, eventos y DOM.',
          'Semana 6: Introducción a la IA y ChatGPT: conceptos básicos aplicados al desarrollo web.',
          'Semana 7: Creación de prompts efectivos para resolver problemáticas comunes.',
          'Semana 8: Potenciando el desarrollo con IA: ejemplos prácticos y generación de código.',
        ],
      },
      {
        titulo: 'Mes 3: Proyectos Iniciales',
        semanas: [
          'Semana 9: Primer proyecto web simple con HTML, CSS y JS.',
          'Semana 10: Introducción a Git y GitHub.',
          'Semana 11: Mobile First Design y optimización.',
          'Semana 12: Primer examen de conceptos básicos.',
        ],
      },
    ],
    temas: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'IA / ChatGPT'],
  },
  {
    numero: '02',
    titulo: 'Interactividad y Frameworks',
    duracion: '12 semanas · 2 clases semanales de 2 horas c/u',
    meses: [
      {
        titulo: 'Mes 4: JavaScript Avanzado',
        semanas: [
          'Semana 13: Objetos y funciones avanzadas.',
          'Semana 14: Arrays, métodos y manipulación de datos.',
          'Semana 15: Promesas y asincronía en JavaScript.',
          'Semana 16: Aplicación interactiva con JavaScript Vanilla.',
        ],
      },
      {
        titulo: 'Mes 5: Introducción a React',
        semanas: [
          'Semana 17: Qué es React, JSX y componentes.',
          'Semana 18: Estado y Props en React.',
          'Semana 19: Ciclo de vida de componentes y hooks básicos.',
          'Semana 20: Proyecto en React: aplicación de tareas o a elección.',
        ],
      },
      {
        titulo: 'Mes 6: React Avanzado',
        semanas: [
          'Semana 21: Manejo del estado global con Context API.',
          'Semana 22: React Router y navegación.',
          'Semana 23: Custom Hooks y buenas prácticas.',
          'Semana 24: Proyecto avanzado con API externa.',
        ],
      },
    ],
    temas: ['JavaScript ES6+', 'React', 'Context API', 'React Router', 'Fetch API'],
  },
  {
    numero: '03',
    titulo: 'Vue.js, TypeScript y Proyectos Integrales',
    duracion: '10 semanas · 2 clases semanales de 2 horas c/u',
    meses: [
      {
        titulo: 'Mes 7: Introducción a Vue.js',
        semanas: [
          'Semana 25: Vue.js: fundamentos y comparación con React.',
          'Semana 26: Componentes, directivas y eventos en Vue.',
          'Semana 27: Manejo de datos con Vue y Vuex.',
        ],
      },
      {
        titulo: 'Mes 8: TypeScript',
        semanas: [
          'Semana 28: Fundamentos de TypeScript, tipos y sintaxis.',
          'Semana 29: Tipos avanzados, interfaces y clases.',
          'Semana 30: Integración de TypeScript en React.',
        ],
      },
      {
        titulo: 'Mes 9: Proyectos Integrales',
        semanas: [
          'Semana 31: Proyecto en equipo: aplicación con React y TypeScript.',
          'Semana 32: Optimización y buenas prácticas en desarrollo web.',
          'Semana 33: Testing y depuración en React/Vue.',
          'Semana 34: Publicación de proyectos en GitHub.',
        ],
      },
    ],
    temas: ['Vue.js', 'Vuex', 'TypeScript', 'Testing', 'Deploy'],
  },
]

const beneficios = [
  {
    icono: '💻',
    titulo: '100% Práctico',
    descripcion: 'Cada módulo incluye ejercicios y mini-proyectos para afianzar lo aprendido.',
  },
  {
    icono: '🤖',
    titulo: 'IA Integrada',
    descripcion: 'Aprendés a usar ChatGPT y herramientas de IA para potenciar tu productividad como desarrollador.',
  },
  {
    icono: '🎯',
    titulo: 'Proyectos Reales',
    descripcion: 'Construís tu portfolio con proyectos que podés mostrar a empleadores.',
  },
  {
    icono: '👥',
    titulo: 'Comunidad',
    descripcion: 'Acceso a un grupo de estudiantes y mentores para resolver dudas en tiempo real.',
  },
  {
    icono: '🏆',
    titulo: 'Certificado',
    descripcion: 'Obtenés un certificado de finalización al completar todas las unidades del curso.',
  },
  {
    icono: '📈',
    titulo: 'Orientado al Mercado',
    descripcion: 'Contenido alineado con las demandas actuales del mercado tecnológico 2026.',
  },
]

const tecnologias = [
  { nombre: 'HTML5', bg: '#fef3ee', color: '#c2410c', borde: '#fdba74' },
  { nombre: 'CSS3', bg: '#eff6ff', color: '#1d4ed8', borde: '#93c5fd' },
  { nombre: 'JavaScript', bg: '#fefce8', color: '#92400e', borde: '#fde68a' },
  { nombre: 'Git', bg: '#fff1f2', color: '#be123c', borde: '#fda4af' },
  { nombre: 'React', bg: '#ecfeff', color: '#0e7490', borde: '#67e8f9' },
  { nombre: 'Vue.js', bg: '#f0fdf4', color: '#15803d', borde: '#86efac' },
  { nombre: 'TypeScript', bg: '#eff6ff', color: '#1e40af', borde: '#bfdbfe' },
  { nombre: 'IA / ChatGPT', bg: '#fdf4ff', color: '#7e22ce', borde: '#d8b4fe' },
]

function Landing() {
  return (
    <div className="landing">

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__badge">🎓 Escuela de Oficios · Eprenda</div>
          <h1 className="hero__titulo">
            Programación{' '}
            <span className="hero__titulo-destacado">Frontend Web</span>
            <br />y Aplicaciones Web con IA
          </h1>
          <p className="hero__subtitulo">
            Aprendé a crear interfaces modernas, interactivas e inteligentes con
            HTML, CSS, JavaScript, React, Vue.js, TypeScript e Inteligencia Artificial.
          </p>
          <div className="hero__acciones">
            <a href="#inscribirse" className="btn btn--primario btn--grande">
              Quiero inscribirme
            </a>
            <a href="#temario" className="btn btn--contorno btn--grande">
              Ver temario
            </a>
          </div>
          <div className="hero__estadisticas">
            <div className="hero__stat">
              <strong>3</strong>
              <span>Trimestres</span>
            </div>
            <div className="hero__stat">
              <strong>34</strong>
              <span>Semanas</span>
            </div>
            <div className="hero__stat">
              <strong>+130</strong>
              <span>Horas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECNOLOGÍAS ===== */}
      <section className="tech-strip">
        <div className="tech-strip__container">
          <p className="tech-strip__label">Tecnologías que vas a dominar</p>
          <div className="tech-strip__items">
            {tecnologias.map((tech) => (
              <div
                key={tech.nombre}
                className="tech-badge"
                style={{ background: tech.bg, color: tech.color, borderColor: tech.borde }}
              >
                {tech.nombre}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUÉ ES FRONTEND ===== */}
      <section className="intro-frontend">
        <div className="intro-frontend__container">
          <div className="seccion-header">
            <h2 className="seccion-titulo">¿Qué es la programación en frontend?</h2>
          </div>
          <p className="intro-frontend__texto">
            La programación en frontend se refiere al desarrollo de la parte visual e interactiva
            de los sitios web y aplicaciones. Incluye el diseño de la interfaz de usuario, la
            experiencia del usuario (UX), y la implementación de lógica en el navegador utilizando
            tecnologías como HTML, CSS, y JavaScript. Con la adición de inteligencia artificial,
            el frontend puede optimizarse para ofrecer interfaces más dinámicas, personalizadas y
            con mayor eficiencia, haciendo que las aplicaciones sean más interactivas y adaptativas.
            Un desarrollador frontend con conocimientos en IA puede crear experiencias más
            inteligentes, fluidas y atractivas para los usuarios.
          </p>
          <p className="intro-frontend__texto">
            Esta capacitación está diseñada para brindarte las herramientas necesarias para
            destacar en el ámbito del desarrollo web, alineada con las demandas actuales del
            mercado tecnológico y el uso de inteligencia artificial en el desarrollo de
            aplicaciones frontend.
          </p>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className="beneficios" id="features">
        <div className="beneficios__container">
          <div className="seccion-header">
            <h2 className="seccion-titulo">¿Por qué elegir esta carrera?</h2>
            <p className="seccion-subtitulo">
              Un enfoque práctico y moderno para aprender desarrollo web frontend con IA
            </p>
          </div>
          <div className="beneficios__grilla">
            {beneficios.map((b) => (
              <div key={b.titulo} className="beneficio-card">
                <div className="beneficio-card__icono">{b.icono}</div>
                <h3 className="beneficio-card__titulo">{b.titulo}</h3>
                <p className="beneficio-card__descripcion">{b.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEMARIO ===== */}
      <section className="temario" id="temario">
        <div className="temario__container">
          <div className="seccion-header">
            <h2 className="seccion-titulo">Plan de Estudios</h2>
            <p className="seccion-subtitulo">
              3 trimestres de formación intensiva desde los fundamentos hasta tecnologías avanzadas
            </p>
          </div>
          <div className="trimestres-lista">
            {trimestres.map((tri) => (
              <div key={tri.numero} className="trimestre-card">
                <div className="trimestre-card__header">
                  <span className="trimestre-card__numero">Trimestre {tri.numero}</span>
                  <h3 className="trimestre-card__titulo">{tri.titulo}</h3>
                  <span className="trimestre-card__duracion">{tri.duracion}</span>
                </div>
                <div className="trimestre-card__meses">
                  {tri.meses.map((mes) => (
                    <div key={mes.titulo} className="trimestre-mes">
                      <h4 className="trimestre-mes__titulo">{mes.titulo}</h4>
                      <ul className="trimestre-mes__semanas">
                        {mes.semanas.map((semana) => (
                          <li key={semana} className="trimestre-mes__semana">{semana}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="trimestre-card__temas">
                  {tri.temas.map((tema) => (
                    <span key={tema} className="tema-tag">{tema}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSTRUCTOR ===== */}
      <section className="instructor">
        <div className="instructor__container">
          <div className="seccion-header">
            <h2 className="seccion-titulo">Tu instructor</h2>
          </div>
          <div className="instructor__card">
            <div className="instructor__avatar">
              <span className="instructor__avatar-inicial">J</span>
            </div>
            <div className="instructor__info">
              <span className="instructor__etiqueta">Docente a cargo</span>
              <h3 className="instructor__nombre">Jorge Emiliano Maldonado</h3>
              <p className="instructor__bio">
                Desarrollador web frontend con experiencia en proyectos reales y formación de
                nuevos talentos en tecnología. Especialista en HTML, CSS, JavaScript, React y
                herramientas modernas del ecosistema frontend.
              </p>
              <div className="instructor__temas">
                <span>HTML &amp; CSS</span>
                <span>JavaScript</span>
                <span>React</span>
                <span>Vue.js</span>
                <span>TypeScript</span>
                <span>IA aplicada al desarrollo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-final" id="inscribirse">
        <div className="cta-final__container">
          <div className="cta-final__badge">Escuela de Oficios · Eprenda</div>
          <h2 className="cta-final__titulo">
            No es solo una capacitación, es tu puerta de entrada a una nueva etapa.
          </h2>
          <p className="cta-final__subtitulo">
            ¡Anímate. Apuesta por ti! ¡Te esperamos!
          </p>
          <a href="mailto:cursos@eprenda.com" className="btn btn--blanco btn--grande">
            Inscribirme ahora
          </a>
          <div className="cta-final__contacto">
            <span>cursos@eprenda.com</span>
            <span>·</span>
            <span>www.eprenda.com</span>
            <span>·</span>
            <span>www.cyberoficios.com</span>
            <span>·</span>
            <span>www.eprendaplay.com</span>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Landing
