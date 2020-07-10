const mysql = require('mysql')

const Db = {
    connection: null,
    init(){
        this.connection = mysql.createConnection({
            host:'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        this.connection.connect();
        return this.connection;
    }
};


module.exports = Db;
