const controller = require('../api/components/user/controller');
const store = require('../store/dummy');

describe('Validate operations controller user', () => {

    const user = {
        "name": "Taylor Carlson",
        "username": "taylor",
        "email": "taylor.carlson@example.com",
        "password": "shuai"
    }

    beforeAll(() => {
        const table = 'user';
        controller(store).DeleteAll(table);
    })

    it('Create an user', async () => {
            return controller(store).Create(user)
            .then(data => {
                expect(user.username).toBe(data.username);
            })
    })

    it('Get one user from db', async () => {
        return controller(store).List()
        .then(data => {
            expect(1).toEqual(data.length)
        })
    })

    it('Get id user', async () => {
        controller(store).Create(user)
        .then(user => {
            controller(store).Get(user.id)
            .then(data => {
                expect(data).toEqual(user)
            })
            .catch(() => {return false; })
        })
        .catch(() => { return false; })
    })
})