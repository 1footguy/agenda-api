import { Sequelize } from "sequelize";

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;


if (!host || !username || !password) {
    throw new Error("As variáveis de ambiente (.env) devem estar definidas.");
}

const initConnection = new Sequelize({
    dialect: "mysql",
    host,
    username,
    password,
    logging: false
});

let connection

async function updatedConnection() {
    const db = process.env.DB_NAME;
    if (!connection) {
        try {
            await initConnection.authenticate();
            await initConnection.query(`CREATE DATABASE IF NOT EXISTS ${db}`);

            const { host, username, password } = initConnection.config;

            connection = new Sequelize({
                dialect: "mysql",
                host,
                username,
                password,
                database: db,
                logging: false
            });

            await connection.authenticate(); 
            await initConnection.close();
        } catch (error) {
            console.error(`Erro ao conectar com banco de dados: ${error}`);
        } 
    }
    return connection;
}

export {initConnection, updatedConnection}