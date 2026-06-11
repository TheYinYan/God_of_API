"use strict";

/**
 * @file enemigosPage.js
 * @description Funciones específicas para enemigos con filtros
 */

let todosLosEnemigos = [];
let filtroActual = 'todos';

document.addEventListener('DOMContentLoaded', function() {
    console.log("enemigosPage.js cargado");
    
    document.getElementById('camposFormulario').innerHTML = generarCamposHTML('enemigos');
    
    initModoEdicion();
    initFormularioCreacion();
    
    cargarDatos('enemigos', function(data) {
        todosLosEnemigos = data;
        mostrarTarjetasFiltradas();
    });
    
    document.getElementById('btnGuardar').addEventListener('click', () => crearElemento('enemigos'));
    document.getElementById('btnGuardarEditar').addEventListener('click', () => guardarEdicion('enemigos'));
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal);
    
    initFiltros();
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modalEditar');
        if (e.target === modal) cerrarModal();
    });
});

/**
 * @description Inicializa los botones de filtro
 */
function initFiltros() {
    const botones = document.querySelectorAll('.filtro-btn');
    botones.forEach(btn => {
        btn.addEventListener('click', function() {
            botones.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtroActual = this.getAttribute('data-filtro');
            mostrarTarjetasFiltradas();
        });
    });
}

/**
 * @description Muestra las tarjetas aplicando el filtro actual
 */
function mostrarTarjetasFiltradas() {
    let datosFiltrados = todosLosEnemigos;
    
    if (filtroActual !== 'todos') {
        datosFiltrados = todosLosEnemigos.filter(enemigo => 
            enemigo.categoria === filtroActual
        );
    }
    
    mostrarTarjetas(datosFiltrados, 'enemigos');
}

/**
 * @description Muestra los enemigos en tarjetas
 * @param {Array} data - Datos de los enemigos
 */
function mostrarTarjetas(data, tabla) {
    const contenedor = document.getElementById('contenedorDatos');
    const puedeEditar = localStorage.getItem('puedeEditar') === 'true';
    contenedor.innerHTML = '';
    
    if (data.length === 0) {
        contenedor.innerHTML = '<div class="error">No hay enemigos en esta categoría</div>';
        return;
    }
    
    data.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        
        if (item.categoria === 'Jefe principal') ;
        else if (item.categoria === 'Jefe final');
        else if (item.categoria === 'Jefe');
        else if (item.categoria === 'Esbirro');
        else if (item.categoria === 'Variante');
        
        const botonesHtml = puedeEditar ? `
            <div class="botones-accion">
                <button class="btn-editar" data-id="${item.id}"> EDITAR</button>
                <button class="btn-eliminar" data-id="${item.id}">ELIMINAR</button>
            </div>
        ` : '';
        
        tarjeta.innerHTML = `
            <h3> ${item.nombre || 'Sin nombre'}</h3>
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Categoría:</strong> ${item.categoria || 'N/A'}</p>
            <p><strong>Debilidad:</strong> ${item.debilidad || 'N/A'}</p>
            <p>${item.descripcion || 'Sin descripción'}</p>
            ${botonesHtml}
        `;
        contenedor.appendChild(tarjeta);
    });
    
    if (puedeEditar) {
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', () => abrirModalEdicion('enemigos', btn.dataset.id));
        });
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => eliminarElemento('enemigos', btn.dataset.id));
        });
    }
}