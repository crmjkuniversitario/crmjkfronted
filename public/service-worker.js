// service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  // Aqui você pode adicionar cache de arquivos se necessário
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
});

