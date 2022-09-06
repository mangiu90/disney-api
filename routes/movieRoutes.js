import express from 'express';
import {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} from "../controllers/movieController.js";
import checkAuth from "../middleware/checkAuth.js";


const router = express.Router();

router
    .route('/')
    .get(checkAuth, getMovies)
    .post(checkAuth, createMovie)

router
    .route('/:id')
    .get(checkAuth, getMovieById)
    .put(checkAuth, updateMovie)
    .delete(checkAuth, deleteMovie)


export default router