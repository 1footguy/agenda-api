import { Sequelize } from "sequelize";

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;


if (!host || !username || !password) {
    throw new Error("As variáveis de ambiente (.env) devem estar definidas.");
}

const oldConnection = new Sequelize({
    dialect: "mysql",
    host,
    username,
    password,
    logging: false
});
export {oldConnection}