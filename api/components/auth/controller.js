const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const TABLE = 'auth';

module.exports = function (storeDependecy) {
    let store = storeDependecy;
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function Login(username, password) {
        
        const data = await store.Query(TABLE, { username: username });
        return bcrypt.compare(password, data.password ) 
            .then(areEquals => {
                if(areEquals === true) {
                    return auth.Sign({...data});
                } else {
                throw new Error('Invalid information');
                }    
            });
    }

    async function Update(data) {
        const authData = {
            id: data.id,
        }

        if(data.username) {
            authData.username = data.username;
        }

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return  store.Update(TABLE, authData);
    }

    return {
        Login,
        Update,
    }
}