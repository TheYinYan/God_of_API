"use strict";

/**
 * @file objetos.js
 * @description Funciones específicas para objetos.
 */


document.addEventListener('DOMContentLoaded', function () {
    console.log("objetosPage cargado");

    document.getElementById('camposFormulario').innerHTML = generarCamposHTML('objetos');

    initModoEdicion();
    initFormularioCreacion();

    cargarDatos('objetos', mostrarTarjetas);

    document.getElementById('btnGuardar').addEventListener('click', () => crearElemento('objetos'));
    document.getElementById('btnGuardarEditar').addEventListener('click', () => guardarEdicion('objetos'));
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal);
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modalEditar');
        if (e.target === modal) cerrarModal();
    });
});

/**
 * @description Muestra los objetos en tarjetas
 * @param {Array} data - Datos de los objetos
 */
function mostrarTarjetas(data) {
    const contenedor = document.getElementById('contenedorDatos');
    contenedor.innerHTML = '';
    
    data.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        tarjeta.innerHTML = `
            <h3>${item.nombre || 'Sin nombre'}</h3>
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Tipo:</strong> ${item.tipo || 'N/A'}</p>
            <p>${item.descripcion || 'Sin descripción'}</p>
            <div class="botones-accion">
                <button class="btn-editar" data-id="${item.id}"> EDITAR</button>
                <button class="btn-eliminar" data-id="${item.id}">ELIMINAR</button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
    
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => abrirModalEdicion('objetos', btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarElemento('objetos', btn.dataset.id));
    });
}