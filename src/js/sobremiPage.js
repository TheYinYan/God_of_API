"use strict";


/**
 * @file sobremi.js
 * @description Funciones específicas para sobremi.
 */


document.addEventListener('DOMContentLoaded', function() {
    console.log("sobremiPage cargado");

    cargarSobremi();
});

/**
 * @description Carga los datos de sobremi
 * @returns {void}
 */
function cargarSobremi() {
    const contenedor = document.getElementById('contenedorDatos');
    if (!contenedor) return;
    
    contenedor.innerHTML = '<div class="cargando">⏳ Cargando información...</div>';
    
    fetch('/api/sobremi')
        .then(res => res.json())
        .then(data => {
            contenedor.innerHTML = `
                <div class="sobremi-card">
                    <img src="${data.imagen || 'Sin imagen'}" alt="${data.nombre}" class="img-sobremi">
                    <h3>${data.nombre || 'Sin nombre'}</h3>
                    <div class="rol">${data.rol || 'Sin rol'}</div>
                    <div class="email">${data.email || 'Sin email'}</div>
                    <div class="fecha">Registrado: ${data.fecha_registro || 'N/A'}</div>
                    <div class="descripcion"><p>${data.descripcion || 'Sin descripción'}</p></div>
                    <div class="runas">ᚱ ᚨ ᚷ ᚾ ᚨ ᚱ ᛟ ᚲ</div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = '<div class="error">❌ Error al cargar datos</div>';
        });
}