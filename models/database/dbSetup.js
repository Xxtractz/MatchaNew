const mysql = require("mysql");
const dbConfig = require("../../config/db.config");
const dbSchema = require('../database/dbschema');
const _dbData = require("../database/dbData");

const connectionNoDB = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD
});

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    multipleStatements: true
});

let setupDb = {};

setupDb.createDB = () => {
    const query = "CREATE DATABASE IF NOT EXISTS utQlqEWfeo;";
        return new Promise((resolve, reject) => {
            connectionNoDB.query(
                query,
                '',
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log(results);
                    return resolve('Database SuccessFully Created');
                }
            );
        });
};

setupDb.createTables = () => {
    const query = dbSchema;
    return new Promise((resolve, reject) => {
        connection.query(
            query,
            '',
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                console.log(results);
                return resolve( '\nDatabase Tables SuccessFully Created');
            }
        );
    });
};


setupDb.populateDB = () => {
    const query = _dbData;
    return new Promise((resolve, reject) => {
        connection.query(
            query,
            '',
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve('\nDatabase SuccessFully populated');
            }
        );
    });
};

setupDb.dropDB = () => {
    const query  = `DROP SCHEMA utqlqewfeo`;
    return new Promise((resolve, reject) => {
        connection.query(
            query,
            '',
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve('\nDatabase Successfully deleted');
            }
        );
    });
};





module.exports = setupDb;