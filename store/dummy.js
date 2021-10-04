const db = {
    'user': [
        { id: '1', name: 'Camilo Mora' },
    ],
};

async function List(tabla){
    return db[tabla];
}

async function Get(tabla, id) {
    let colllection = await List(tabla);
    return colllection.filter(user => user.id === id)[0] || null;
}

async function Update(table, data){
    db[table].push(data);
}

module.exports = {
    List,
    Get,
    Update
}