import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

function AstroApp() {
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
}

export default AstroApp
