import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import characterRoutes from './routes/characterRoutes.js';
import movieRoutes from "./routes/movieRoutes.js";
import { Category } from './models/index.js';

const app = express();
app.use(express.json());

dotenv.config();

(async () => {
    await connectDB();

    await Category.bulkCreate([
        {
            img_url: 'https://www.filmsite.org/images/crimefilms.gif',
            name: 'Action',
        },
        {
            img_url: 'https://www.filmsite.org/images/comedyfilms.gif',
            name: 'Comedy',
        },
        {
            img_url: 'https://www.filmsite.org/images/dramafilms.gif',
            name: 'Drama',
        }
    ]);

    app.use('/auth', authRoutes);
    app.use('/characters', characterRoutes);
    app.use('/movies', movieRoutes);

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})();



