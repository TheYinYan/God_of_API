"use strict";
/**
 * @fileArchivo JavaScript.js
 * @description Controla la carga de datos, visualización, control de errores y generación de campos de formulario.
 */
let idEditando = null;

console.log('JavaScript Principal cargado correctamente.');

/**
 * @function getTabla
 * @description Detecta qué tabla mostrar según la URL
 * @returns {string|null} Nombre de la tabla o null
 */
function getTabla() {
    if (window.location.href.includes('personajes')) return 'personajes';
    if (window.location.href.includes('reinos')) return 'reinos';
    if (window.location.href.includes('armas')) return 'armas';
    if (window.location.href.includes('enemigos')) return 'enemigos';
    if (window.location.href.includes('objetos')) return 'objetos';
    if (window.location.href.includes('kratos')) return 'kratos';
    if (window.location.href.includes('sobremi')) return 'sobremi';
    return null;
}

/**
 * @function mostrarCargando
 * @description Muestra mensaje de carga
 * @param {HTMLElement} contenedor - Contenedor donde mostrar
 * @param {string} texto - Texto a mostrar
 */
function mostrarCargando(contenedor, texto = 'Cargando datos...') {
    if (contenedor) {
        contenedor.innerHTML = `<div class="cargando">⏳ ${texto}</div>`;
    }
}

/**
 * @function mostrarError
 * @description Muestra mensaje de error
 * @param {HTMLElement} contenedor - Contenedor donde mostrar
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(contenedor, mensaje) {
    if (contenedor) {
        contenedor.innerHTML = `<div class="error">❌ ${mensaje}</div>`;
    }
}

/**
 * @function generarCamposHTML
 * @description Genera los campos del formulario según la tabla
 * @param {string} tabla - Nombre de la tabla
 * @returns {string} HTML de los campos
 */
function generarCamposHTML(tabla, valores = {}) {
    let html = `
        <div class="campo-formulario">
            <label>Nombre:</label>
            <input type="text" name="nombre" value="${valores.nombre || ''}" placeholder="Nombre" required>
        </div>
        <div class="campo-formulario">
            <label>Descripción:</label>
            <input type="text" name="descripcion" value="${valores.descripcion || ''}" placeholder="Descripción">
        </div>
    `;

    if (tabla === 'personajes') {
        html += `
            <div class="campo-formulario">
                <label>Reino:</label>
                <input type="text" name="reino" value="${valores.reino || ''}" placeholder="Reino">
            </div>
            <div class="campo-formulario">
                <label>Categoría:</label>
                <input type="text" name="categoria" value="${valores.categoria || ''}" placeholder="Categoría">
            </div>
            <div class="campo-formulario">
                <label>Arma principal:</label>
                <input type="text" name="arma_principal" value="${valores.arma_principal || ''}" placeholder="Arma principal">
            </div>
        `;
    }
    else if (tabla === 'reinos') {
        html += `
            <div class="campo-formulario">
                <label>Ubicación:</label>
                <input type="text" name="ubicacion" value="${valores.ubicacion || ''}" placeholder="Ubicación">
            </div>
            <div class="campo-formulario">
                <label>Habitantes:</label>
                <input type="text" name="habitantes" value="${valores.habitantes || ''}" placeholder="Habitantes">
            </div>
        `;
    }
    else if (tabla === 'armas') {
        html += `
            <div class="campo-formulario">
                <label>ID del personaje:</label>
                <input type="number" name="personaje_id" value="${valores.personaje_id || ''}" placeholder="ID del personaje">
            </div>
        `;
    }
    else if (tabla === 'enemigos') {
        const categoriasEnemigos = ['Jefe principal', 'Jefe', 'Jefe final', 'Esbirro', 'Variante'];

        let categoriasOptions = '';
        categoriasEnemigos.forEach(cat => {
            const selected = (valores.categoria === cat) ? 'selected' : '';
            categoriasOptions += `<option value="${cat}" ${selected}>${cat}</option>`;
        });

        html += `
        <div class="campo-formulario">
            <label>Categoría:</label>
            <select name="categoria">
                <option value="">Selecciona una categoría</option>
                ${categoriasOptions}
            </select>
        </div>
        <div class="campo-formulario">
            <label>Debilidad:</label>
            <input type="text" name="debilidad" value="${valores.debilidad || ''}" placeholder="Debilidad">
        </div>
    `;
    }
    else if (tabla === 'objetos') {
        html += `
            <div class="campo-formulario">
                <label>Tipo:</label>
                <input type="text" name="tipo" value="${valores.tipo || ''}" placeholder="Tipo">
            </div>
        `;
    }

    return html;
}