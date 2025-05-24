# Clase Práctica: Frontend-BFF-Backend

Este proyecto demuestra una aplicación simple de Lista de Tareas que implementa una arquitectura Frontend-BFF-Backend.

## Estructura del Proyecto

```
.
├── frontend/          # Aplicación frontend (HTML, CSS, JavaScript)
├── bff/              # Backend for Frontend (Node.js)
└── backend/          # Backend API (Node.js)
```

## Requisitos

- Node.js 14.x o superior
- npm o yarn

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   cd frontend && npm install
   cd ../bff && npm install
   cd ../backend && npm install
   ```

## Ejecución

1. Iniciar el backend:

   ```bash
   cd backend
   npm start
   ```

2. Iniciar el BFF:

   ```bash
   cd bff
   npm start
   ```

3. Abrir el frontend:
   - Abrir el archivo `frontend/index.html` en un navegador

## Características

- Crear, leer, actualizar y eliminar tareas
- Filtrar tareas por categorías
- Autenticación básica
- Transformación de datos en el BFF
