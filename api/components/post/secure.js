const auth = require('../../../auth/index');

function checkAuth(action){
    async function middleware(req, res, next) {
        switch (action) {
            case 'add':
            case 'list_own':
                auth.Check.logged(req);
                next();
            break;
        
            default:
                next();
        }
    }

    return middleware;
}

module.exports = checkAuth;

