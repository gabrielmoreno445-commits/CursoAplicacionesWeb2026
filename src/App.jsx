import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './react-pages/Landing'
import AppsIndex from './react-pages/AppsIndex'
import HolaMundo from './apps/hola-mundo/HolaMundo'
import Memorama from './apps/memorama/Memorama'
import GestorTareas from './apps/gestor-tareas/GestorTareas'
import ScapeRoom from './apps/scape-room/ScapeRoom'
import Pokedex from './apps/pokedex/Pokedex'
import SopaDeLetras from './apps/sopa-de-letras/SopaDeLetras'
import CuatroImagenesUnaPalabra from './apps/4-imagenes-1-palabra/CuatroImagenesUnaPalabra'
import BombaLoca from './apps/bomba-loca/BombaLoca'
import JuegoSupermercado from './apps/supermercado/JuegoSupermercado'
import PuzzleRaiz from './apps/rompecabezas/ArchivosJSX/PuzzleRaiz'
import ContextAPI from './apps/context-api/ContextAPI'
import MonopolySantaFe from './apps/monopoly-santafe/MonopolySantaFe'
import CardBattleJG from './apps/CardBattle-J&G/CardBattleJG'
import PetBookAgendaDigital from './apps/PetBook/PetBookAgendaDigital'
import PaginaFerreteria from './apps/Pagina-ferreteria/Pagina'
import DocsIndex from './react-pages/DocsIndex'
import GabyAppsIndex from './react-pages/GabyAppsIndex'
import InstallarDocker from './react-pages/docs/InstallarDocker'
import OllamaDocker from './react-pages/docs/OllamaDocker'
import InstallarOllama from './react-pages/docs/InstallarOllama'
import InstallarNode from './react-pages/docs/InstallarNode'
import InstallarGit from './react-pages/docs/InstallarGit'
import VSCodeSetup from './react-pages/docs/VSCodeSetup'
import GitCheatsheet from './react-pages/docs/GitCheatsheet'
import ReactHooks from './react-pages/docs/ReactHooks'
import TeoriaHTML from './react-pages/teoria/TeoriaHTML'
import TeoriaCSS from './react-pages/teoria/TeoriaCSS'
import TeoriaJavaScript from './react-pages/teoria/TeoriaJavaScript'
import TeoriaJSAvanzado from './react-pages/teoria/TeoriaJSAvanzado'
import TeoriaReact from './react-pages/teoria/TeoriaReact'
import TeoriaVueJS from './react-pages/teoria/TeoriaVueJS'
import TeoriaTypeScript from './react-pages/teoria/TeoriaTypeScript'
import TeoriaContextAPI from './react-pages/teoria/TeoriaContextAPI'
import TeoriaReactRouter from './react-pages/teoria/TeoriaReactRouter'
import TeoriaCustomHooks from './react-pages/teoria/TeoriaCustomHooks'
import ReactRouterDemo from './apps/react-router-demo/ReactRouterDemo'
import CustomHooks from './apps/custom-hooks/CustomHooks'
import ContactosBugueados from './apps/contactos-bugueados/ContactosBugueados'
import './App.css'

function App() {
  const location = useLocation()
  const isCardBattleRoute = location.pathname.startsWith('/apps/CardBattle-J&G')
  const isPetBookRoute = location.pathname.startsWith('/apps/gabyapps/petbook-agenda-digital')
  const hideSiteChrome = isCardBattleRoute || isPetBookRoute

  return (
    <div className="site-shell">
      {!hideSiteChrome && <Navbar />}
      <main className={`site-main ${hideSiteChrome ? 'site-main--fullscreen' : ''}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/apps" element={<AppsIndex />} />
          <Route path="/apps/hola-mundo" element={<HolaMundo />} />
          <Route path="/apps/memorama" element={<Memorama />} />
          <Route path="/apps/gestor-tareas" element={<GestorTareas />} />
          <Route path="/apps/scape-room" element={<ScapeRoom />} />
          <Route path="/apps/pokedex" element={<Pokedex />} />
          <Route path="/apps/supermercado-de-colores" element={<JuegoSupermercado />} />
          <Route path="/apps/sopa-de-letras" element={<SopaDeLetras />} />
          <Route path="/apps/rompecabezas" element={<PuzzleRaiz />} />
          <Route path="/apps/4-imagenes-1-palabra" element={<CuatroImagenesUnaPalabra />} />
          <Route path="/apps/bomba-loca" element={<BombaLoca />} />
          <Route path="/apps/context-api" element={<ContextAPI />} />
          <Route path="/apps/monopoly-santafe" element={<MonopolySantaFe />} />
          <Route path="/apps/CardBattle-J&G" element={<CardBattleJG />} />
          <Route path="/apps/gabyapps" element={<GabyAppsIndex />} />
          <Route path="/apps/gabyapps/petbook-agenda-digital/*" element={<PetBookAgendaDigital />} />
          <Route path="/apps/pagina-ferreteria" element={<PaginaFerreteria />} />
          <Route path="/apps/react-router-demo/*" element={<ReactRouterDemo />} />
          <Route path="/apps/custom-hooks" element={<CustomHooks />} />
          <Route path="/apps/contactos-bugueados" element={<ContactosBugueados />} />
          <Route path="/docs" element={<DocsIndex />} />
          <Route path="/docs/instalar-docker" element={<InstallarDocker />} />
          <Route path="/docs/ollama-docker" element={<OllamaDocker />} />
          <Route path="/docs/instalar-ollama" element={<InstallarOllama />} />
          <Route path="/docs/instalar-node" element={<InstallarNode />} />
          <Route path="/docs/instalar-git" element={<InstallarGit />} />
          <Route path="/docs/vscode-setup" element={<VSCodeSetup />} />
          <Route path="/docs/git-cheatsheet" element={<GitCheatsheet />} />
          <Route path="/docs/react-hooks" element={<ReactHooks />} />
          <Route path="/docs/teoria-html" element={<TeoriaHTML />} />
          <Route path="/docs/teoria-css" element={<TeoriaCSS />} />
          <Route path="/docs/teoria-javascript" element={<TeoriaJavaScript />} />
          <Route path="/docs/teoria-js-avanzado" element={<TeoriaJSAvanzado />} />
          <Route path="/docs/teoria-react" element={<TeoriaReact />} />
          <Route path="/docs/teoria-vuejs" element={<TeoriaVueJS />} />
          <Route path="/docs/teoria-typescript" element={<TeoriaTypeScript />} />
          <Route path="/docs/teoria-context-api" element={<TeoriaContextAPI />} />
          <Route path="/docs/teoria-react-router" element={<TeoriaReactRouter />} />
          <Route path="/docs/teoria-custom-hooks" element={<TeoriaCustomHooks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideSiteChrome && <Footer />}
    </div>
  )
}

export default App
