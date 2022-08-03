# ecommerce-backend
Microservicio para un Ecommerce. Proyecto final del curso de programación backend de Coderhouse.
#### La arquitectura del proyecto está ligeramente basada en la [Bulletproof Node.js architecture](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=github&utm_medium=readme) 🛡️

## ENDPOINTS de la api
### Productos
- `GET    http://localhost:8080/productos` Obtiene todos los productos de la BD.
- `GET    http://localhost:8080/productos/<id>` Obtiene un producto por su id.
- `POST   http://localhost:8080/productos` Registra un nuevo producto en la BD.
- `PUT    http://localhost:8080/productos/<id>` Actualiza un producto por su id.
- `DELETE http://localhost:8080/productos/<id>` Elimina un producto por su id.

### Carrito
- `POST     http://localhost:8080/api/carrito/` Registra un nuevo carrito en la BD.
- `DELETE   http://localhost:8080/api/carrito/<id>` Elimina un carrito por su id.
- `GET      http://localhost:8080/api/carrito/<id_carrito>/productos` Obtiene todos los productos de un carrito dado su id.
- `POST     http://localhost:8080/api/carrito/<id_carrito>/productos/<id_prod>` Agrega un nuevo producto al carrito dado el id de producto y de carrito.
- `DELETE   http://localhost:8080/api/carrito/<id_carrito>/productos/<id_prod>` Elimina un producto del carrito dado el id de producto y de carrito.

## Ver [Guía de commits](https://github.com/retaLazyCodes/guia-commits) utilizada

## Requisitos para correr el proyecto de forma local
- Tener NPM y Node.js instalado
- Tener GIT instalado
- Tener MongoDB instalado

## Como instalar e iniciar el proyecto

### 1 - Clonar el repositorio

Desde la terminal ingresando:

```
git clone -b entrega02 https://github.com/retaLazyCodes/ecommerce-backend
```
o haciendo click en el botón verde **Code** y finalmente en **Download ZIP**, luego descomprimirlo.

### 2 - Instalación de dependencias

Con la consola posicionada dentro de la carpeta raíz del proyecto, ejecutar el siguiente comando

```
npm install
```

### 3 - Iniciar el servidor

- Se deberá crear un archivo `.env` dentro de la carpeta raíz del proyecto.
- El archivo `.env` debe tener las siguientes variables.

```
DEV_PORT=8080
MONGO_DB_URI_DEV=mongodb://127.0.0.1:27017/ecommerce_db
```

- Con la consola posicionada en la  carpeta raíz del proyecto correr el comando `npm run dev`

### 4 - Ejecutar tests

- Próximamente...
