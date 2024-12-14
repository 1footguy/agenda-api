import { Sequelize } from "sequelize";
import defineConnection from "./model/Agendamento.js"

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const db = process.env.DB_NAME;

let sequelize = {}

if (!host || !username || !password) {
    throw new Error("As variáveis de ambiente (.env) devem estar definidas.");
}

async function createDB(){

    const connection = new Sequelize({
        dialect: "mysql",
        host,
        username,
        password,
    });

    await connection.authenticate();
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${db}`);
    await connection.close();
}

async function createTable(connection){
    try {
        const Agendamento = defineConnection(connection)
        await Agendamento.sync({alter: true});
        return Agendamento;
    } catch (error) {
        console.error(`Ocorreu um erro na criação da tabela: ${error}`);
    }
}


(async () => {
    await createDB()

    const connection = new Sequelize({
        dialect: "mysql",
        host,
        username,
        password,
        database: db,
        logging: false
    });

    
    const Agendamento = await createTable(connection);
    await connection.authenticate();
    sequelize.Agendamento = Agendamento;
    console.log("conexao estabelecida");
    
})();

export default sequelize 