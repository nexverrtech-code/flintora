import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { preloadRoute } from './routes/routes';
import './styles/index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (root.firstElementChild) {
  // Prerendered page: load this route's chunk, then adopt the existing HTML.
  preloadRoute(location.pathname).finally(() => hydrateRoot(root, app));
} else {
  createRoot(root).render(app);
}
