const db = {
    'user': [
        { id: 1, name: 'Camilo Mora' },
    ],
};

function List(tabla){
    return db[tabla];
}

function Get(tabla, id) {
    let colllection = list(tabla);
    return colllection.filter(user => user.id === id)[0] || null;
}

function Update(data){
    db[colllection].push(data);
}

module.exports = {
    List,
    Get,
    Update
}