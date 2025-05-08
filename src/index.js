import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Criando a raiz do React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizando o componente App dentro do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrando o service worker para habilitar funcionalidades PWA
serviceWorkerRegistration.register();

// Relatar métricas de performance (opcional)
reportWebVitals();
