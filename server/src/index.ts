import dotenv from 'dotenv';
dotenv.config();
import { DB } from "./db/db";
DB

import express, { Response } from "express";
import bodyParser from "body-parser"
import router from "./routes/task-routes";
import { responseFormatter } from "./middlewares/responseFormatter";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(bodyParser.json());
app.use(responseFormatter);
app.use('/api', router); 
app.use(errorHandler);

app.get("/", (_req, res: Response) => {
    res.send("Server is running just fine");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err?: Error) => {
    if (err) {
        console.log("ERROR: ", err.message);
    }
    console.log(`LISTENING IN PORT ${PORT}`);
});

export default app;
