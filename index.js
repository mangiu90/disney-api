import express from 'express';
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

(async () => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})();



