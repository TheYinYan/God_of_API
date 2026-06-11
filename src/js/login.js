"use strict";

/**
 * @file login.js
 * @description Funciones para el inicio de sesión.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ login.js cargado');

    pintarLogin();

    const usuario = localStorage.getItem('usuario');
    const puedeEditar = localStorage.getItem('puedeEditar');
    const modal = document.getElementById('modalLogin');
    const main = document.querySelector('main');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');

    console.log('usuario:', usuario);
    console.log('puedeEditar:', puedeEditar);
    console.log('btnCerrarSesion:', btnCerrarSesion);

    // Si hay sesión activa
    if (usuario && puedeEditar !== null) {
        console.log('Sesión activa - ocultando modal');
        if (modal) modal.style.display = 'none';
        if (main) main.style.display = 'block';
        if (btnCerrarSesion) btnCerrarSesion.style.display = 'block';

        if (btnCerrarSesion) {
            btnCerrarSesion.onclick = function () {
                console.log('Cerrando sesión');
                localStorage.removeItem('usuario');
                localStorage.removeItem('puedeEditar');
                location.reload();
            };
        }
        return;
    }

    console.log('No hay sesión - mostrando modal');
    if (modal) modal.style.display = 'flex';
    if (main) main.style.display = 'none';
    if (btnCerrarSesion) btnCerrarSesion.style.display = 'none';

    const btnLogin = document.getElementById('btnLoginModal');
    if (btnLogin) {
        btnLogin.onclick = iniciarSesion;
    }

    const passInput = document.getElementById('loginPassword');
    if (passInput) {
        passInput.onkeypress = function (e) {
            if (e.key === 'Enter') iniciarSesion();
        };
    }
});

/**
 * @function pintarLogin
 * @description Pinta el modal de login en la página.
 */
function pintarLogin() {
    if (document.getElementById('modalLogin')) return;

    const modalHTML = `
        <div id="modalLogin" class="modal-login" style="display: flex;">
            <div class="modal-login-contenido">
                <h2>🔐 INICIO DE SESIÓN</h2>
                <p>Identifícate para acceder a God of API</p>
                <div class="campo-formulario">
                    <label>Email:</label>
                    <input type="email" id="loginEmail" placeholder="tu@email.com">
                </div>
                <div class="campo-formulario">
                    <label>Contraseña:</label>
                    <input type="password" id="loginPassword" placeholder="••••••••">
                </div>
                <button id="btnLoginModal">INICIAR SESIÓN</button>
                <p id="errorLogin" style="display:none; color:#9e1a1a; margin-top:10px;"></p>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', modalHTML);
}

/**
 * @function iniciarSesion
 * @description Inicia sesión en la aplicación. Si el usuario no existe en la base de datos, lo crea automáticamente.
 */
function iniciarSesion() {
    console.log('Iniciando sesión...');

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('errorLogin');

    if (!email) {
        errorDiv.textContent = '❌ Introduce el email';
        errorDiv.style.display = 'block';
        return;
    }

    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(res => res.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);

            if (data.error) {
                errorDiv.textContent = `❌ ${data.error}`;
                errorDiv.style.display = 'block';
                return;
            }

            if (data.usuario) {
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                localStorage.setItem('puedeEditar', data.puedeEditar);

                const modal = document.getElementById('modalLogin');
                const main = document.querySelector('main');
                const btnCerrarSesion = document.getElementById('btnCerrarSesion');

                if (modal) modal.style.display = 'none';
                if (main) main.style.display = 'block';
                if (btnCerrarSesion) btnCerrarSesion.style.display = 'block';

                console.log('Sesión guardada correctamente');
                location.reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorDiv.textContent = '❌ Error al conectar con el servidor';
            errorDiv.style.display = 'block';
        });
}