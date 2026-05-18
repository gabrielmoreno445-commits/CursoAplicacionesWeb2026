import { Link } from 'react-router-dom'
import './AppsIndex.css'

const gabyApps = [
  {
    id: 'petbook-agenda-digital',
    titulo: 'PetBook-Agenda Digital',
    descripcion: 'Agenda digital de salud para mascotas con seguimiento de vacunas, recordatorios y fichas personalizadas.',
    etiquetas: ['React', 'Mascotas', 'Agenda'],
    modulo: '06',
  },
]

function GabyAppsIndex() {
  return (
    <div className="apps-index">
      <div className="apps-index__header">
        <h1>GabyApps</h1>
        <p>
          Espacio para tus proyectos propios dentro del ecosistema del curso.
          Desde aca podes entrar a cada miniapp nueva.
        </p>
      </div>

      <div className="apps-index__grilla">
        {gabyApps.map((app) => (
          <Link key={app.id} to={`/apps/gabyapps/${app.id}`} className="app-card">
            <div className="app-card__modulo">Modulo {app.modulo}</div>
            <h2 className="app-card__titulo">{app.titulo}</h2>
            <p className="app-card__descripcion">{app.descripcion}</p>
            <div className="app-card__etiquetas">
              {app.etiquetas.map((etiqueta) => (
                <span key={etiqueta} className="app-card__etiqueta">{etiqueta}</span>
              ))}
            </div>
            <span className="app-card__ir">Ver aplicacion -&gt;</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GabyAppsIndex
