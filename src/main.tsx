import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ScorePage from './pages/ScorePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

function Router() {
  const path = window.location.pathname;

  // Route: /score or /business-health-score
  if (path === '/score' || path === '/business-health-score') {
    return <ScorePage />;
  }

  // Route: homepage
  if (path === '/' || path === '') {
    return <App />;
  }

  // All other routes: 404
  return <NotFoundPage />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </StrictMode>,
)
