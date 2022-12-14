import dotenv from "dotenv";
import app from "./server.js";
import { connectDB } from './database/db.js';
import { charactersMoviesSeeder } from "./database/seed.js";

dotenv.config();
const port = process.env.PORT || 4000;

const main = async () => {
    await connectDB();

    await charactersMoviesSeeder();

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
};

main();
