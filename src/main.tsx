import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ScorePage from './pages/ScorePage.tsx'

function Router() {
  const path = window.location.pathname;

  // Route: /score or /business-health-score
  if (path === '/score' || path === '/business-health-score') {
    return <ScorePage />;
  }

  // Default: homepage
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
