"use strict";

/**
 * @file reinos.js
 * @description Funciones específicas para reinos.
 */


document.addEventListener("DOMContentLoaded", () => {
    console.log("ReinosPage cargado");
    
    document.getElementById('camposFormulario').innerHTML = generarCamposHTML('reinos');
    
    initFormularioCreacion();
    initModoEdicion();
    
    cargarDatos("reinos", mostrarReinos);
    
    document.getElementById('btnGuardar').addEventListener('click', () => crearElemento("reinos"));
    
    document.getElementById('btnGuardarEditar').addEventListener('click', () => guardarEdicion("reinos"));
    
    document.getElementById('btnCerrarModal').addEventListener('click', () => cerrarModal());
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modalEditar');
        if (e.target === modal) cerrarModal();
    });
});

/** 
 * @description Muestra los reinos en tarjetas
 * @param {Array} data - Datos de los reinos
 */
function mostrarReinos(data) {
    const contenedor = document.getElementById('contenedorDatos');
    contenedor.innerHTML = '';
    
    data.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        tarjeta.innerHTML = `
            <h3>${item.nombre || 'Sin nombre'}</h3>
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Ubicación:</strong> ${item.ubicacion || 'N/A'}</p>
            <p><strong>Habitantes:</strong> ${item.habitantes || 'N/A'}</p>
            <p>${item.descripcion || 'Sin descripción'}</p>
            <div class="botones-accion">
                <button class="btn-editar" data-id="${item.id}">EDITAR</button>
                <button class="btn-eliminar" data-id="${item.id}">ELIMINAR</button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
    
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => abrirModalEdicion('reinos', btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarElemento('reinos', btn.dataset.id));
    });
}