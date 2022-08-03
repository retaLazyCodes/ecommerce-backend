# ecommerce-backend
Proyecto final del curso de backend de Coderhouse

## ENDPOINTS de la api
### Productos
- `GET http://localhost:8080/productos` Obtiene todos los productos de la BD.

### Carrito
- `GET http://localhost:8080/api/carrito/<id_carrito>/productos` Obtiene todos los productos de un carrito dado su id.

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
