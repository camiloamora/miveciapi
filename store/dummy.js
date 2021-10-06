const db = {
    'user': [
        { id: '1', name: 'Camilo Mora' },
    ],
    'auth': [
        { id: '1', username: 'camiloamora', password:'123' }
    ]
};

async function List(tabla){
    return db[tabla] || [];
}

async function Get(tabla, id) {
    let colllection = await List(tabla);
    return colllection.filter(user => user.id === id)[0] || null;
}

async function Update(table, data){
    if(!db[table]) {
        db[table] = [];
    }

    db[table].push(data);
    return true;
}

async function Query(table, q) {
    let collection = await List(table);
    let keys = Object.keys(q);
    let key = keys[0];

    console.log('collection', collection)
    return collection.filter(user => user[key] === q[key])[0] || null;
}

async function Insert(table, data) {
    console.log('table db',db[table])
    db[table].push(data);
    return data;
}

async function DeleteAll(table){
    return db[table] = [];
}

module.exports = {
    List,
    Get,
    Update,
    Query,
    Insert,
    DeleteAll
}