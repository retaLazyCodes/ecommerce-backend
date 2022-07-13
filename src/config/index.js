const DEV_PORT = 8080
const USER_ROLE = true

const config = {
    FILESYSTEM_DB: {
        products: 'products.json',
        carts: 'carts.json'
    },
    USER_ROLE,
    server: {
        PORT: process.env.PORT ? process.env.PORT : DEV_PORT,
        routes: {
            base: '/api',
            products: '/api/productos',
            carts: '/api/carrito',
        },
    },
};

module.exports = { config }