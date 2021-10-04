const nanoId = require('nanoId');
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

    function Update(body) {
        const user = {
            user: body.name
        }

        if(body.id) {
            user.id = body.id;
        } else {
            user.id = nanoId();
        }

        return store.Update(TABLE, user);
    }

    return {
        List,
        Get,
        Update
    }
}