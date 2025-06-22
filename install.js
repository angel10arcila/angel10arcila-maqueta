// ✔️ Service Worker registration restricted to same-origin and HTTPS (o localhost for dev)
function isLocalhost() {
  return Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === ''
  );
}

if (
  'serviceWorker' in navigator &&
  (window.location.protocol === 'https:' || isLocalhost())
) {
  // Solo intenta registrar si el script está en la misma ruta de origen.
  // window.location.origin+window.location.pathname es la raíz.
  // El script debe estar alojado en la misma URL donde se hará deploy!
  // Los SW no pueden cargar desde sitios externos ni a través de un redirect (como en websim).
  navigator.serviceWorker.register('./sw.js').catch(err => {
    // Muestra el error en la consola y opcionalmente lo muestra de forma visible
    console.warn("Error registrando el Service Worker:", err);
  });
}

const installModal = document.getElementById('install-modal');
const closeBtn = document.getElementById('modal-close');
const installBtn = document.getElementById('install-btn');
const instructions = document.getElementById('instructions');

let deferredPrompt = null;

// Manejo para browsers que soportan beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showModal();
});

window.addEventListener('DOMContentLoaded', () => {
  // Si ya está instalada no mostrar el modal
  if (window.matchMedia('(display-mode: standalone)').matches) {
    installModal.style.display = 'none';
    return;
  }
  // Si no soporta beforeinstallprompt, muestra instrucciones manuales en móviles
  if (!('onbeforeinstallprompt' in window)) {
    if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      showModal(true);
    }
  }
});

function showModal(manualOnly = false) {
  installModal.style.display = 'flex';
  if (manualOnly) {
    installBtn.style.display = 'none';
    instructions.style.display = 'block';
  } else {
    installBtn.style.display = 'inline-block';
    instructions.style.display = 'none';
  }
}

closeBtn.onclick = function () {
  installModal.style.display = 'none';
};

installBtn.onclick = async function () {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      installModal.style.display = 'none';
    }
    deferredPrompt = null;
  }
};

// Show a helpful message if SW registration fails due to origin issues (for websim or similar)
// Esto solo para debugging en simuladores como websim donde SW no funcionará bien
if (
  'serviceWorker' in navigator &&
  !(window.location.protocol === 'https:' || isLocalhost())
) {
  setTimeout(() => {
    alert(
      "¡Atención! El Service Worker no se puede registrar porque la página no está alojada con HTTPS ni en localhost.\n\nSe requiere HTTPS y que el script sw.js esté en la misma raíz que index.html para funcionar en dispositivos reales."
    );
  }, 700);
}