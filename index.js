import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

(async () => {
    await connectDB();

    app.use('/auth', authRoutes);

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})();



