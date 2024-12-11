import  defineConnection  from "./model/Agendamento.js";
import { oldConnection } from "./connection.js";
import { Sequelize } from "sequelize";

const db = process.env.DB_NAME;
let connection;

async function syncDB(){
    try {   
        const connection = await createDB();
        await createTable(connection);
        console.log("Banco de dados e tabela sincronizados com sucesso!");
    } catch (error) {
        console.error(`Ocorreu um erro com o banco ou com a tabela: ${error}`);
    }
}

async function createDB(){
    try {
        await oldConnection.authenticate();
        await oldConnection.query(`CREATE DATABASE IF NOT EXISTS ${db}`);

        const {host, username, password} = oldConnection.config;

        connection = new Sequelize({
            dialect: "mysql",
            host,
            username,
            password,
            database: db,
            logging: false
        });

        await connection.authenticate();
        return connection;
    } catch (error) {
        console.error(`Ocorreu um erro na criação do banco de dados: ${error}`);
        return null;
    } finally {
        await oldConnection.close();
    }
}

async function createTable(connection){
    try {
        const agendamento = defineConnection(connection)
        await agendamento.sync({alter: true});
    } catch (error) {
        console.error(`Ocorreu um erro na criação da tabela: ${error}`);
    }
}

export { syncDB, connection }