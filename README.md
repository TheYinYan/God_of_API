# God of API

> _"El ciclo termina aquí. No hay más caminos que recorrer."_ — Kratos

<div align="center">

![Version](https://img.shields.io/badge/version-4.0-red)
![Node](https://img.shields.io/badge/node-18+-blue)
![MySQL](https://img.shields.io/badge/mysql-8.4-orange)
![License](https://img.shields.io/badge/license-MIT-gold)
![Deploy](https://img.shields.io/badge/deploy-Render-brightgreen)

</div>

---

## Integrantes

- Samuel Ruiz Martin

---

## Descripción

God of API es una aplicación web que permite consultar y gestionar información del universo **God of War** (personajes, reinos, armas, enemigos y objetos). La aplicación está desplegada en la nube y es accesible desde cualquier dispositivo sin necesidad de instalar nada.

### Arquitectura

| Capa | Tecnología | Servicio en producción |
| --- | --- | --- |
| **Base de datos** | MySQL 8.4 | Aiven Cloud (Europa) |
| **Backend** | Node.js + Express | Render |
| **Frontend** | HTML5, CSS3, JavaScript | Servido por Express (mismo servidor) |

---

## 🎯 Objetivos del proyecto

| # | Objetivo | Estado |
|---|----------|--------|
| 1 | Base de datos MySQL con información de God of War | ✅ |
| 2 | API REST con Node.js y Express | ✅ |
| 3 | Web frontal que muestra los datos | ✅ |
| 4 | CRUD completo en `personajes` | ✅ |
| 5 | CRUD completo en `reinos` | ✅ |
| 6 | CRUD completo en `armas` | ✅ |
| 7 | CRUD completo en `enemigos` | ✅ |
| 8 | CRUD completo en `objetos` | ✅ |
| 9 | Backend modular con carpeta `routes/` | ✅ |
| 10 | Página "Sobre Mí" con datos desde la base de datos | ✅ |
| 11 | Sistema de login y panel de administración | ✅ |
| 12 | Página de Kratos con sus armas y objetos | ✅ |
| 13 | Filtros de enemigos por categoría | ✅ |
| 14 | Tabla `usuarios` con roles (admin/desarrollador) | ✅ |
| 15 | Música de fondo temática por página | ✅ |
| 16 | Despliegue en la nube (Render + Aiven) | ✅ |

---

## ⚙️ Funcionalidades principales

### API REST - Endpoints

#### Personajes
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/personajes` | Lista todos los personajes |
| GET | `/api/personajes/:id` | Obtiene un personaje por ID |
| POST | `/api/personajes` | Crea un nuevo personaje |
| PUT | `/api/personajes/:id` | Modifica un personaje |
| DELETE | `/api/personajes/:id` | Elimina un personaje |

#### Reinos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/reinos` | Lista todos los reinos |
| GET | `/api/reinos/:id` | Obtiene un reino por ID |
| POST | `/api/reinos` | Crea un nuevo reino |
| PUT | `/api/reinos/:id` | Modifica un reino |
| DELETE | `/api/reinos/:id` | Elimina un reino |

#### Armas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/armas` | Lista todas las armas |
| GET | `/api/armas/:id` | Obtiene un arma por ID |
| POST | `/api/armas` | Crea un arma |
| PUT | `/api/armas/:id` | Modifica un arma |
| DELETE | `/api/armas/:id` | Elimina un arma |

#### Enemigos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/enemigos` | Lista todos los enemigos |
| GET | `/api/enemigos/:id` | Obtiene un enemigo por ID |
| POST | `/api/enemigos` | Crea un enemigo |
| PUT | `/api/enemigos/:id` | Modifica un enemigo |
| DELETE | `/api/enemigos/:id` | Elimina un enemigo |

#### Objetos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/objetos` | Lista todos los objetos |
| GET | `/api/objetos/:id` | Obtiene un objeto por ID |
| POST | `/api/objetos` | Crea un objeto |
| PUT | `/api/objetos/:id` | Modifica un objeto |
| DELETE | `/api/objetos/:id` | Elimina un objeto |

#### Endpoints especiales
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/kratos` | Datos de Kratos |
| GET | `/api/kratos/armas` | Armas de Kratos |
| GET | `/api/kratos/objetos` | Objetos de Kratos |
| GET | `/api/sobremi` | Información del desarrollador |
| POST | `/api/login` | Autenticación de usuarios |

---

## 📊 Base de datos

| Tabla | Descripción | Registros |
| --- | --- | --- |
| `personajes` | Personajes de la saga | 20 |
| `reinos` | Reinos del universo God of War | 9 |
| `armas` | Armas usadas por los personajes | 11 |
| `enemigos` | Enemigos, esbirros y jefes | 55 |
| `objetos` | Objetos, recursos, encantamientos y runas | 12 |
| `objetos_usados` | Relación personajes ↔ objetos (N:M) | 25 |
| `usuarios` | Usuarios del sistema con roles | 2 |

---

## 👤 Tipos de usuario

| Tipo | Permisos |
|------|----------|
| **Visitante (sin sesión)** | Solo lectura |
| **Desarrollador / Admin** | CRUD completo (crear, editar, eliminar) |

---

## 📁 Estructura del proyecto

```
god-of-api/
├── backend/
│   ├── server.js
│   ├── db/
│   │   └── connection.js
│   └── routes/
│       ├── personajes.js
│       ├── reinos.js
│       ├── armas.js
│       ├── enemigos.js
│       ├── objetos.js
│       ├── kratos.js
│       ├── sobremi.js
│       └── login.js
├── src/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── javascript.js
│   │   ├── crud.js
│   │   ├── login.js
│   │   ├── audio.js
│   │   ├── personajesPage.js
│   │   ├── reinosPage.js
│   │   ├── armasPage.js
│   │   ├── enemigosPage.js
│   │   ├── objetosPage.js
│   │   ├── kratosPage.js
│   │   └── sobremiPage.js
│   ├── pages/
│   │   ├── personajes.html
│   │   ├── reinos.html
│   │   ├── armas.html
│   │   ├── enemigos.html
│   │   ├── objetos.html
│   │   ├── kratos.html
│   │   └── sobremi.html
│   └── assets/
│       ├── images/
│       ├── audio/
│       └── fonts/
├── package.json
├── .gitignore
└── README.md
```

---

## Mejoras optativas

| # | Mejora | Descripción |
|---|--------|-------------|
| 1 | **Audio** | Música de fondo temática por página, con bucle |
| 2 | **Vídeo** | Vídeo de YouTube incrustado en la página de Kratos |
| 3 | **Formularios** | Para crear y editar en todas las páginas CRUD |
| 4 | **Mapa interactivo** | Mapa de Midgard (MapGenie) en la página de inicio |
| 5 | **Filtros** | Filtros de enemigos por categoría (Jefe, Esbirro, etc.) |
| 6 | **Despliegue en la nube** | Aplicación accesible en internet con Render + Aiven |

---

## Control de cambios

### Añadido
- Sistema de despliegue en la nube (Render + Aiven MySQL)
- Variables de entorno para configuración segura de la base de datos
- El servidor Express sirve también los archivos del frontend
- Separación del backend en rutas modulares (`routes/`)
- Separación del frontend en archivos JS por página (`*Page.js`)
- Validaciones de campos en frontend y backend
- Música de fondo para cada página
- Filtros en la tabla de enemigos por categoría

### Modificado
- Rutas de la API en el frontend cambiadas a rutas relativas (`/api/...`)
- Puerto del servidor ahora configurable mediante variable de entorno `PORT`
- Conexión a la base de datos ahora configurable mediante variables de entorno

### Eliminado
- Código duplicado y comentarios innecesarios
- Tabla `jefes` fusionada con la tabla `enemigos`

---

<div align="center">

### ᛏᚺᛖ ᚷᛟᛞ ᛟᚠ ᚹᚨᚱ ᛁᛋ ᚾᛟᛏ ᚨᛚᛟᚾᛖ

**GOD OF API - Hecho con ❤️ para los fans de God of War**
</div>