const mysql = require('mysql');

const config = require('../config');

const { NODE_ENV } = process.env;

const database = NODE_ENV === 'test' ? 
    config.mysql.databaseTest : config.mysql.database;

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: database,
    port: config.mysql.port,
    timeout: config.mysql.timeout
};

let connection;

function HandleConnection() {
    console.log(dbconf);
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.info('[db err]', err);
            // intent connect
            setTimeout(HandleConnection, 2000);
        } else {
            console.info('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            HandleConnection();
        } else {
            throw err;
        }
    })
}

HandleConnection();

function List(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function Get(table, id) {
    console.log('tabla', table);
    console.log('id', id)
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    })
}

function Insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

function Modify(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

function Update(table, data) {
    if (data && data.id) {
        return Modify(table, data);
    }
}

function Query(table, query, join = null) {
    let joinQuery = '';
    if (join) {
        Object.entries(join).forEach(([key, value]) => {
            const [from, to] = value;
            joinQuery+= `JOIN ${key} ON ${table}.${from} = ${key}.${to}`;
        })
    }
    console.log( 'antes del join', (`${table}, ${JSON.stringify(query)}, ${joinQuery}`));
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query,  (error, data) => {
            if (error) return reject(error);
            resolve(data[0] || null);
        })
    });
}

module.exports = {
    List,
    Get,
    Insert,
    Update,
    Query
}; 