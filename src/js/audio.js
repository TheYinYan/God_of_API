/**
 * @file audio.js
 * @description Controla la música de la aplicación.
 */

let audio;

/**
 * @function obtenerMusica
 * @description Obtiene la música correspondiente a la página actual.
 * @returns {string} Nombre del archivo de música.
 */
function obtenerMusica() {
    if (window.location.pathname.includes('personajes')) {
        return 'The-Summit.mp3'
    }
    else if (window.location.pathname.includes('reinos')) {
        return 'The-Ninth-Realm.mp3'
    }
    else if (window.location.pathname.includes('armas')) {
        return 'Deliverance.mp3'
    }
    else if (window.location.pathname.includes('enemigos')) {
        return 'Valkyries.mp3'
    }
    else if (window.location.pathname.includes('objetos')) {
        return 'Echoes-of-an-Old-Life.mp3'
    }
    else if (window.location.pathname.includes('kratos')) {
        return 'god-of-war-theme.mp3'
    }
    else if (window.location.pathname.includes('sobremi')) {
        return 'Memories-of-Mother.mp3'
    }
    return 'Ashes.mp3'
}

const musica = obtenerMusica();

if (window.location.pathname.includes('pages/')) {
    audio = new Audio(`../assets/audio/${musica}`);
} else {
    audio = new Audio(`assets/audio/${musica}`);
}


audio.loop = true;
audio.volume = 0.18;

audio.play().then(() => {
    console.log('Audio reproduciéndose correctamente');
}).catch(error => {
    console.log('Error al reproducir:', error);
});