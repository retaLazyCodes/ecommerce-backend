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
- Tener MongoDB instalado o cuenta de MongoDB Atlas
- Tener cuenta de Firebase (opcional)

## Como instalar e iniciar el proyecto

### 1 - Clonar el repositorio

Desde la terminal ingresando:

```
git clone -b entrega02 https://github.com/retaLazyCodes/ecommerce-backend
```

### 2 - Instalación de dependencias

Con la terminal posicionada dentro de la carpeta raíz del proyecto, ejecutar el siguiente comando

```
npm install
```

### 3 - Iniciar el servidor

- Se deberá crear un archivo con el nombre `.env` dentro de la carpeta raíz del proyecto.
- El archivo `.env` debe tener las siguientes variables.

```
DEV_PORT=8080
MONGO_DB_URI=mongodb://127.0.0.1:27017/ecommerce_db
DB_SERVICE=<MONGO> | <FIREBASE> # elegir alguno de los valores entre '< >'

# opcional para usar persistencia en Firestore con el valor de DB_SERVICE=FIREBASE
FIREBASE_PROJECT_ID=<your_firebase_project_id>
FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
```

- Con la terminal posicionada en la  carpeta raíz del proyecto correr el comando
```
npm run dev
```

### 4 - Ejecutar tests

- Próximamente...
