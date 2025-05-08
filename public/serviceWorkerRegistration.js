// serviceWorkerRegistration.js

// Este é o arquivo que facilita o registro do service worker
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname === '127.0.0.1'
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // O service worker só será registrado em produção
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) return;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // O novo conteúdo foi instalado
              console.log('Novo conteúdo está disponível; atualize para usar.');
            } else {
              // O conteúdo foi armazenado em cache pela primeira vez
              console.log('Conteúdo em cache agora está disponível para uso offline.');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Erro ao registrar o service worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl)
    .then((response) => {
      if (
        response.status === 404 ||
        response.headers.get('content-type')?.indexOf('javascript') === -1
      ) {
        // Não encontrou o service worker, desativa o registro
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister();
        });
      } else {
        // O service worker está válido
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('Sem conexão com a rede. O aplicativo funcionará offline.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

