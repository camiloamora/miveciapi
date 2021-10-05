const db = {
    'user': [
        { id: '1', name: 'Camilo Mora' },
    ],
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
}

async function Query(table, q) {
    let collection = await List(table);
    let keys = Object.keys(q);
    let key = keys[0];

    return collection.filter(user => user[key] === q[key])[0] || null;
}

module.exports = {
    List,
    Get,
    Update,
    Query
}