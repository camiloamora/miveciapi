const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const TABLE = 'auth';
const error = require('../../../utils/error');

module.exports = function (storeDependecy) {
    let store = storeDependecy;
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function Login(username, password) {
        
        const data = await store.Query(TABLE, { username: username });
        const userData = {...data}
        console.log('pass', userData.password)
        if(userData.password === undefined) {
            throw new error('Invalid information');
        }

        return bcrypt.compare(password, userData.password)
        .then(areEquals => {
            console.log(areEquals)
            if(areEquals === true) {
                return auth.Sign(JSON.parse(JSON.stringify(data)));
            } else {
            throw new Error('Invalid information');
            }
        })
    }

    async function Update(data) {
        const authData = {
            id: data.id,
        }

        if(data.username) {
            authData.username = data.username;
        }

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return  store.Insert(TABLE, authData);
    }

    return {
        Login,
        Update,
    }
}