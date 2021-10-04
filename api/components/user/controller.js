const store = require('../../../store/dummy');

const TABLE = 'user';

function List() {
    return store.List(TABLE);
}

module.exports = {
    List,
}