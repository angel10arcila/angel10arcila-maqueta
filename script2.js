// Configuración de medios predefinidos
const mediaFiles = [

     {
         name: "Lamborghini - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Lamborghini - Ángel José Arcila Parra .mp3",
         type: "audio"
     },
       
     {
         name: "Tú locura - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Tú locura - V+ Letra de Ángel José Arcila Parra.mp3",
         type: "audio"
     },
     
     {
         name: "Somos tal para cuál - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Somos tal para cual - Letra de Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "Mi mayor tesoro - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Mi mayor tesoro - bachata- Letra de Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "Una Comedía Romántica - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Comedia  Romantica v10  - LyM de Ángel José Arcila Parra.mp3",
         type: "audio"
     },
     
     {
         name: "El Reloj - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/El reloj - (2) LyM Ángel José Arcila Parra.mp3",
         type: "audio"
     },
     
    { 
         name: "Fafafa-farai - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Fafafa-farai - V2 - Letra de Ángel José Arcila Parra .mp3",
         type: "audio"
    },

     
    { 
         name: "Noche rara - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Noche rara - Letra de Ángel José Arcila Parra.mp3",
         type: "audio"
    },
 
    { 
         name: "Inspirame con tú arte - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Inspirame con tú arte - LyM de Ángel José Arcila Parra.mp3",
         type: "audio"
    },
    { 
         name: "Crece cómo un árbol  - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Crece cómo un árbol V7 Letra de Ángel José Arcila Parra.mp3",
         type: "audio"
    },
  
    { 
         name: "Me enamoré de tí - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Me enamoré de tí - V1 Letra y Música de Ángel José Arcila Parra .mp3",
         type: "audio"
    },
  
    { 
         name: "Monotematica - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Monotematica - Letra y Música de Ángel José Arcila Parra.mp3",
         type: "audio"
    },
    {
         name: "The clock - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/letraseningles/refs/heads/main/The Clock 1 Letra y Música de Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "The clock - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/letraseningles/refs/heads/main/The Clock  2 Letra y Música de Ángel José Arcila Parra..mp3",
         type: "audio"
     },
   
     {
         name: "And take it now - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/letraseningles/refs/heads/main/And take it now  V1 - Lyrics and music by Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "Because we are such for that - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/letraseningles/refs/heads/main/Because we are such for that V1- Country - Lyrics by Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "A romantic comedy - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/letraseningles/refs/heads/main/_A romantic comedy_ Letra y Música de Ángel José Arcila Parra - Álbum - Debut. (320).mp3",
         type: "audio"
     },
   
];

let currentTrack = 0;
const mediaPlayer = document.getElementById('mediaPlayer');
const playlist = document.getElementById('playlist');

// Inicializar reproductor
function initPlayer() {
    // Generar playlist
    mediaFiles.forEach((media, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            ${media.name}
            <span class="format-badge">${media.type.toUpperCase()}</span>
        `;
        item.onclick = () => loadMedia(index);
        playlist.appendChild(item);
    });

    // Cargar primer medio
    loadMedia(0);
}

function loadMedia(index) {
    currentTrack = index;
    const media = mediaFiles[index];
    
    // Actualizar clase activa en playlist
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Cargar medio según tipo
    if (media.type === 'm3u') {
        loadM3U(media.url);
    } else {
        mediaPlayer.src = media.url;
        mediaPlayer.play();
    }
}

async function loadM3U(url) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        // Procesar M3U y extraer URLs
        const urls = content.match(/^(?!#).+$/gm);
        if (urls && urls.length > 0) {
            mediaPlayer.src = urls[0];
            mediaPlayer.play();
        }
    } catch (error) {
        console.error('Error loading M3U:', error);
    }
}

function playPause() {
    if (mediaPlayer.paused) {
        mediaPlayer.play();
    } else {
        mediaPlayer.pause();
    }
}

function nextTrack() {
    const next = (currentTrack + 1) % mediaFiles.length;
    loadMedia(next);
}

function previousTrack() {
    const prev = (currentTrack - 1 + mediaFiles.length) % mediaFiles.length;
    loadMedia(prev);
}

function toggleMute() {
    mediaPlayer.muted = !mediaPlayer.muted;
}

// Eventos del reproductor
mediaPlayer.addEventListener('ended', () => {
    nextTrack();
});

mediaPlayer.addEventListener('error', (e) => {
    console.error('Error en la reproducción:', e);
    nextTrack();
});

// Inicializar
initPlayer();
