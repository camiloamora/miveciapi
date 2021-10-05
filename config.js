/**
 * config returns the constants used in app
 */
module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret!'
    },
}