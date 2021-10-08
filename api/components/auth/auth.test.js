const controller = require('./controller');
const controllerUser = require('../user/controller');
const store = require('../../../store/dummy');

describe('Auth component -> adding new user', () => {
    const user = {
        "name": "Taylor Carlson",
        "username": "taylor",
        "email": "taylor.carlson@example.com",
        "password": "shuai"
    }

    beforeAll(() => {
        const table = 'user';
        const tableAuth = 'auth';
        controllerUser(store).DeleteAll(table);
        controllerUser(store).DeleteAll(tableAuth);
    })

    it('Login user with username and password when is correct', async () => {
        return controllerUser(store).Create(user)
        .then(data => {
            controller(store).Login(data.username, data.password)
            .then((data) => {
                expect(data.username).toBe(user.username)
            }).catch(() => { return false; })
        })
        .catch(() => { return false; })
    })
})
