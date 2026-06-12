/**
 * @file audio.js
 * @description Controla la música de la aplicación.
 */

let audio;
let audioIniciado = false;

/**
 * @function obtenerMusica
 * @description Obtiene la música correspondiente a la página actual.
 * @returns {string} Nombre del archivo de música.
 */
function obtenerMusica() {
    const path = window.location.pathname;
    if (path.includes('personajes')) return 'The-Summit.mp3';
    if (path.includes('reinos')) return 'The-Ninth-Realm.mp3';
    if (path.includes('armas')) return 'Deliverance.mp3';
    if (path.includes('enemigos')) return 'Valkyries.mp3';
    if (path.includes('objetos')) return 'Echoes-of-an-Old-Life.mp3';
    if (path.includes('kratos')) return 'god-of-war-theme.mp3';
    if (path.includes('sobremi')) return 'Memories-of-Mother.mp3';
    return 'Ashes.mp3';
}

function iniciarAudio() {
    if (audioIniciado) return;
    
    const musica = obtenerMusica();
    let rutaAudio;
    
    if (window.location.pathname.includes('pages/')) {
        rutaAudio = `../assets/audio/${musica}`;
    } else {
        rutaAudio = `assets/audio/${musica}`;
    }
    
    audio = new Audio(rutaAudio);
    audio.loop = true;
    audio.volume = 0.18;
    
    audio.play()
        .then(() => {
            audioIniciado = true;
            console.log('✅ Audio iniciado correctamente');
        })
        .catch(error => {
            console.log('⚠️ Error al iniciar audio:', error);
        });
}

// Escuchar el primer clic del usuario en cualquier parte de la página
document.addEventListener('click', function iniciarAlPrimerClic() {
    iniciarAudio();
    document.removeEventListener('click', iniciarAlPrimerClic);
}, { once: true });