import  defineConnection  from "./model/Agendamento.js";
import { updatedConnection } from "./connection.js";



async function createTable(){
    try {
        const connection = await updatedConnection();
        
        const agendamento = defineConnection(connection)
        await agendamento.sync({alter: true});
    } catch (error) {
        console.error(`Ocorreu um erro na criação da tabela: ${error}`);
    }
}

async function syncDB(){
    try {   
        const connection = await updatedConnection();
        await createTable(connection);
        console.log("Banco de dados e tabela sincronizados com sucesso!");
    } catch (error) {
        console.error(`Ocorreu um erro com o banco/tabela: ${error}`);
    }
}

export { syncDB }