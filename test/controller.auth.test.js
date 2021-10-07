const controller = require('../api/components/auth/controller');
const controllerUser = require('../api/components/user/controller');
const store = require('../store/dummy');

describe('Validate operations controller auth', () => {
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

    it('Login user with username and password', async () => {
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