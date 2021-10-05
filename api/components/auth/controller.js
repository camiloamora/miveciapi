const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = function (storeDependecy) {
    let store = storeDependecy;
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function Login(username, password) {
        console.log(username)
        console.log(password)
        const data = await store.Query(TABLE, { username: username });
        if(data.password === password){
            return auth.Sign(data);
        } else {
            throw new Error('Invalid information');
        }
    }

    function Update(data) {
        const authData = {
            id: data.id,
        }

        if(data.username) {
            authData.username = data.username;
        }

        if(data.password) {
            authData.password = data.password;
        }

        return  store.Update(TABLE, authData);
    }

    return {
        Login,
        Update,
    }
}