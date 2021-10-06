const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLE = 'user';

module.exports = function(storeDependency) {
    let store = storeDependency;

    if(!store) {
        store = require('../../../store/dummy');
    }

    function List() {
        return store.List(TABLE);
    }

    function Get(id) {
        return store.Get(TABLE, id);
    }

    async function Create(body) {
        const user = {
            name: body.name,
            username: body.username,
            email: body.email,
            id: nanoid()
        }

        if (body.password || body.username) {
            await auth.Update({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.Insert(TABLE, user);
    }

    async function Update(body) {
        const user = {
            name: body.name,
            username: body.username,
            email: body.email,
        }
        
        if(body.password || body.username) {
            await auth.Update({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.Update(TABLE, user);
    }

    async function DeleteAll(TABLE) {
        return store.DeleteAll(TABLE);
    }

    return {
        List,
        Get,
        Create,
        Update,
        DeleteAll
    }
}