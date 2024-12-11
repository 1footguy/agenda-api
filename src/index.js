import "dotenv/config"
import express from "express";
import cors from "cors";
import {syncDB} from "./database/synchronize.js";

const app = express();
app.use(cors ({ origin:"*" }) );
app.use(express.json());
const port = 3000;

syncDB();

app.listen(port, () => {
    console.log("Servidor em execução!");
})