"use strict";

/**
 * @file crud.js
 * @description Funciones CRUD reutilizables: cargar, crear, editar, eliminar, modal y modo edición.
 */

console.log("CRUD cargado");

/**
 * @function cargarDatos
 * @description Carga los datos desde el backend
 * @param {string} tabla - Nombre de la tabla
 * @param {Function} callback - Función para mostrar los datos
 */
function cargarDatos(tabla, callback) {
    const contenedor = document.getElementById('contenedorDatos');
    if (typeof mostrarCargando === 'function') {
        mostrarCargando(contenedor, `Cargando ${tabla}...`);
    } else {
        contenedor.innerHTML = '<div class="cargando">⏳ Cargando...</div>';
    }

    fetch(`/api/${tabla}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                contenedor.innerHTML = '<div class="error">📭 No hay datos</div>';
            } else {
                callback(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = '<div class="error">❌ Error al cargar datos</div>';
        });
}

/**
 * @function crearElemento
 * @description Crea un nuevo elemento y verifica que los campos obligatorios no esten vacios
 * @param {string} tabla - Nombre de la tabla
 */
function crearElemento(tabla) {
    if (!validacion('#camposFormulario', tabla)) return;

    const inputs = document.querySelectorAll('#camposFormulario input');
    const datos = {};
    inputs.forEach(input => {
        datos[input.name] = input.value;
    });

    fetch(`/api/${tabla}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'Error al crear');
                });
            }
            return response.json();
        })
        .then(() => {
            document.getElementById('formularioCreacion').style.display = 'none';
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`❌ ${error.message}`);
        });
}

/**
 * @function eliminarElemento
 * @description Elimina un elemento
 * @param {string} tabla - Nombre de la tabla
 * @param {string|number} id - ID del elemento
 */
function eliminarElemento(tabla, id) {
    if (confirm('¿Eliminar este elemento?')) {
        fetch(`/api/${tabla}/${id}`, { method: 'DELETE' })
            .then(() => location.reload())
            .catch(error => console.error('Error:', error));
    }
}

/**
 * @function validacion
 * @description Valida los campos del formulario
 * @param {string} campo - Selector del contenedor (#camposFormulario o #camposEditar)
 * @param {string} tabla - Nombre de la tabla (personajes, reinos, etc.)
 * @returns {boolean} true si es válido, false si hay error
 */
function validacion(campo, tabla) {
    const inputs = document.querySelectorAll(`${campo} input`);

    const nombreInput = document.querySelector(`${campo} input[name="nombre"]`);
    if (!nombreInput || nombreInput.value.trim() === '') {
        alert('❌ El campo NOMBRE es obligatorio');
        return false;
    }

    const descripcionInput = document.querySelector(`${campo} input[name="descripcion"]`);
    if (!descripcionInput || descripcionInput.value.trim() === '') {
        alert('❌ El campo DESCRIPCIÓN es obligatorio');
        return false;
    }

    if (tabla === 'personajes') {
        const reinoInput = document.querySelector(`${campo} input[name="reino"]`);
        if (!reinoInput || reinoInput.value.trim() === '') {
            alert('❌ El campo REINO es obligatorio');
            return false;
        }

        const categoriaInput = document.querySelector(`${campo} input[name="categoria"]`);
        if (!categoriaInput || categoriaInput.value.trim() === '') {
            alert('❌ El campo CATEGORÍA es obligatorio');
            return false;
        }
    }

    if (tabla === 'enemigos') {
        const categoriaSelect = document.querySelector(`${campo} select[name="categoria"]`);
        if (!categoriaSelect || categoriaSelect.value === '') {
            alert('❌ El campo CATEGORÍA es obligatorio');
            return false;
        }
    }

    if (tabla === 'armas') {
        const personajeInput = document.querySelector(`${campo} input[name="personaje_id"]`);
        if (!personajeInput || personajeInput.value.trim() === '') {
            alert('❌ El campo PERSONAJE (ID) es obligatorio');
            return false;
        }
    }

    if (tabla === 'reinos') {
        const ubicacionInput = document.querySelector(`${campo} input[name="ubicacion"]`);
        if (!ubicacionInput || ubicacionInput.value.trim() === '') {
            alert('❌ El campo UBICACIÓN es obligatorio');
            return false;
        }
    }

    if (tabla === 'objetos') {
        const tipoInput = document.querySelector(`${campo} input[name="tipo"]`);
        if (!tipoInput || tipoInput.value.trim() === '') {
            alert('❌ El campo TIPO es obligatorio');
            return false;
        }
    }

    return true;
}

/**
 * @function abrirModalEdicion
 * @description Abre el modal para editar
 * @param {string} tabla - Nombre de la tabla
 * @param {string|number} id - ID del elemento
 */
function abrirModalEdicion(tabla, id) {
    idEditando = id;

    fetch(`/api/${tabla}/${id}`)
        .then(res => res.json())
        .then(item => {
            const html = generarCamposHTML(tabla, item);
            document.getElementById('camposEditar').innerHTML = html;
            document.getElementById('modalEditar').classList.add('active');
        })
        .catch(error => console.error('Error:', error));
}

/**
 * @function guardarEdicion
 * @description Guarda la edición de un elemento y valida los campos antes de guardar
 * @param {string} tabla - Nombre de la tabla
 */
function guardarEdicion(tabla) {
    if (!validacion('#camposEditar', tabla)) return;

    const inputs = document.querySelectorAll('#camposEditar input');
    const datos = {};
    inputs.forEach(input => {
        datos[input.name] = input.value;
    });

    fetch(`/api/${tabla}/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'Error al guardar');
                });
            }
            return response.json();
        })
        .then(() => {
            cerrarModal();
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`❌ ${error.message}`);
        });
}
/**
 * @function cerrarModal
 * @description Cierra el modal de edición
 */
function cerrarModal() {
    const modal = document.getElementById('modalEditar');
    if (modal) modal.classList.remove('active');
    idEditando = null;
}

/**
 * @function initFormularioCreacion
 * @description Inicializa el formulario de creación
 */
function initFormularioCreacion() {
    const btnMostrar = document.getElementById('btnMostrarFormulario');
    const formulario = document.getElementById('formularioCreacion');
    const btnCancelar = document.getElementById('btnCancelar');

    if (!btnMostrar) return;

    btnMostrar.addEventListener('click', () => {
        formulario.style.display = 'block';
    });

    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            formulario.style.display = 'none';
        });
    }
}

/**
 * @function initModoEdicion
 * @description Inicializa el modo edición
 */
function initModoEdicion() {
    const puedeEditar = localStorage.getItem('puedeEditar') === 'true';
    const btnModo = document.getElementById('btnModoEdicion');

    if (!btnModo) return;

    if (!puedeEditar) {
        btnModo.style.display = 'none';
        return;
    }

    btnModo.addEventListener('click', function () {
        const tarjetas = document.querySelectorAll('.tarjeta');
        tarjetas.forEach(t => t.classList.toggle('modo-edicion'));

        if (btnModo.classList.contains('activo')) {
            btnModo.classList.remove('activo');
            btnModo.textContent = 'MODO EDICIÓN (OFF)';
        } else {
            btnModo.classList.add('activo');
            btnModo.textContent = 'MODO EDICIÓN (ON)';
        }
    });
}