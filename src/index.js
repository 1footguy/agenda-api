import "dotenv/config"
import express from "express";
import cors from "cors";
import {syncDB} from "./database/synchronize.js";
import router from "./routes/Routes.js";

const app = express();
const port = 3000;
app.use(cors ({ origin:"*" }) );
app.use(express.json());
app.use(router);


syncDB().then(() => { 
    app.listen(port, () => {
    console.log("Servidor em execução!");
})})