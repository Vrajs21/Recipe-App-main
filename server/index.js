import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import insertDataset from "./mongodb/insertData.js";
import userRouter from './routes/user.routes.js'
import recipeRouter from './routes/recipe.routes.js';

dotenv.config({path : './env'});

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));


app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', recipeRouter);


app.get("/", (req, res) => {
    res.send({ message: "hello world" });
});
const startServer = async () => {
    try {
        // connect to the database
       connectDB(process.env.MONGODB_URI);
   insertDataset();
        app.listen(process.env.PORT, () =>
            console.log(`Server started on port ${process.env.PORT}`)
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
