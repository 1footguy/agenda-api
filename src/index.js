import "dotenv/config"
import express from "express";
import cors from "cors";
import router from "./routes/Routes.js";
import "./database/connection.js";

const app = express();
const port = 3000;
app.use(cors ({ origin:"*" }) );
app.use(express.json());
app.use(router);



app.listen(port, () => {
    console.log("Servidor em execução!");
})