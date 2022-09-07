import express from 'express';
import authRoutes from './routes/authRoutes.js';
import characterRoutes from './routes/characterRoutes.js';
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/characters', characterRoutes);
app.use('/movies', movieRoutes);


export default app