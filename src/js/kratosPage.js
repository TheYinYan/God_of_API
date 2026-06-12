"use strict";

/**
 * @file kratosPage.js
 * @description Página especial de Kratos con información, armas, objetos y vídeo de habilidades
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("kratosPage.js cargado");
    cargarKratos();
});

/**
 * @description Carga los datos de Kratos desde la API
 */
function cargarKratos() {
    const contenedor = document.getElementById('contenedorDatos');
    if (!contenedor) return;

    contenedor.innerHTML = '<div class="cargando">⏳ Cargando datos de Kratos...</div>';

    Promise.all([
        fetch('/api/kratos').then(r => r.json()),
        fetch('/api/kratos/armas').then(r => r.json()),
        fetch('/api/kratos/objetos').then(r => r.json())
    ])
        .then(([kratos, armas, objetos]) => mostrarKratos(kratos, armas, objetos))
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = '<div class="error">❌ Error al cargar Kratos</div>';
        });
}

/**
 * @description Muestra la información completa de Kratos
 * @param {Object} kratos - Datos de Kratos
 * @param {Array} armas - Lista de armas de Kratos
 * @param {Array} objetos - Lista de objetos de Kratos
 */
function mostrarKratos(kratos, armas, objetos) {
    const contenedor = document.getElementById('contenedorDatos');

    let armasHtml = '';
    if (armas.length > 0) {
        armas.forEach(arma => {
            armasHtml += `
                <div class="item">
                    <strong>${arma.nombre}</strong>
                    <p>${arma.descripcion || 'Sin descripción'}</p>
                </div>
            `;
        });
    } else {
        armasHtml = '<p>No hay armas registradas</p>';
    }

    let objetosHtml = '';
    if (objetos.length > 0) {
        objetos.forEach(objeto => {
            objetosHtml += `
                <div class="item">
                    <strong>${objeto.nombre}</strong>
                    <p>${objeto.descripcion || 'Sin descripción'}</p>
                </div>
            `;
        });
    } else {
        objetosHtml = '<p>No hay objetos registrados</p>';
    }

    const videoHtml = `
        <div class="video-kratos">
            <h2>HABILIDADES Y ATAQUES RÚNICOS</h2>
            <iframe width="100%" height="400" 
                    src="https://www.youtube.com/embed/uyYeOWpseVo" 
                    title="Kratos Moveset Showcase" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
            </iframe>
            <p>20 curiosidades sobre Kratos: <a href="https://youtu.be/eX-12nXFjnU" target="_blank">Ver vídeo</a></p>
            <p>Referencias al pasado de Kratos: <a href="https://youtu.be/ot8k64fBtzU" target="_blank">Ver vídeo</a></p>
        </div>
    `;

    contenedor.innerHTML = `
        <div class="kratos-card">
            <h2>${kratos.nombre || 'Kratos'}</h2>
            <img src="${kratos.imagen || 'Nada'}" alt="${kratos.nombre || 'Kratos'}" class="avatar">
            <p><strong>Descripción:</strong> ${kratos.descripcion || 'Sin descripción'}</p>
            ${kratos.arma_principal ? `<p><strong>Arma principal:</strong> ${kratos.arma_principal}</p>` : ''}
            ${kratos.categoria ? `<p><strong>Categoría:</strong> ${kratos.categoria}</p>` : ''}
            <p><strong>Reino:</strong> ${kratos.reino || 'N/A'}</p>
        </div>
        <div class="kratos-armas">
            <h2>Armas</h2>
            ${armasHtml}
        </div>
        <div class="kratos-objetos">
            <h2>Objetos</h2>
            ${objetosHtml}
        </div>
        ${videoHtml}
    `;
}