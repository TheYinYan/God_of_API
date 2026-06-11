"use strict";

/**
 * @file armas.js
 * @description Funciones específicas para armas.
 */


document.addEventListener('DOMContentLoaded', function() {
    console.log("ArmasPage cargado");
    
    document.getElementById('camposFormulario').innerHTML = generarCamposHTML('armas');
    
    initModoEdicion();
    initFormularioCreacion();
    
    cargarDatos('armas', mostrarTarjetas);
    
    document.getElementById('btnGuardar').addEventListener('click', () => crearElemento('armas'));
    document.getElementById('btnGuardarEditar').addEventListener('click', () => guardarEdicion('armas'));
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal);
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modalEditar');
        if (e.target === modal) cerrarModal();
    });
});

/**
 * @description Muestra las armas en tarjetas
 * @param {Array} data - Datos de las armas
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
            <p><strong>ID del personaje:</strong> ${item.personaje_id || 'N/A'}</p>
            <p><strong>Personaje:</strong> ${item.personaje_nombre || 'N/A'}</p>
            <p>${item.descripcion || 'Sin descripción'}</p>
            <div class="botones-accion">
                <button class="btn-editar" data-id="${item.id}"> EDITAR</button>
                <button class="btn-eliminar" data-id="${item.id}">ELIMINAR</button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
    
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => abrirModalEdicion('armas', btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarElemento('armas', btn.dataset.id));
    });
}