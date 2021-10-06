/**
 * config returns the constants used in app
 */
 require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        port: process.env.MYSQL_PORT,
        timeout: process.env.MYSQL_TIMEOUT,
        databaseTest: process.env.MYSQL_DB_TEST,
        hostTest: process.env.MYSQL_HOST_TEST
    },
}