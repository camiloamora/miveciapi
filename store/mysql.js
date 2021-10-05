const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
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
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, data) => {
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

function Query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (error, res) => {
            if (error) return reject(error);
            resolve(res || null);
        })
    })
}

module.exports = {
    List,
    Get,
    Insert,
    Update,
    Query
}; 