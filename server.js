require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const server = express();
const sqlite3 = require('sqlite3').verbose();
const graphqlConfig = require('./graphql/config');
const {graphqlHTTP} = require("express-graphql");

/* Database connection and create database if not exists yet */
const database = new sqlite3.Database("./database/todos.db");

const createTodosTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT
        )`;
    return database.run(query);
}
createTodosTable();


server.use(bodyParser.json());

server.use('/graphql', graphqlHTTP({ schema: graphqlConfig.schema, graphiql: true}));

server.use('/', express.static(__dirname + '/frontend'));

server.listen(process.env.PORT, () => {
    console.log('server listening at port', process.env.PORT);
});
