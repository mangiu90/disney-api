import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

const app = express();
app.use(express.json());

dotenv.config();

(async () => {
    await connectDB();

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})();



