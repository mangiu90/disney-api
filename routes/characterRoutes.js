import express from 'express';
import {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
} from "../controllers/characterController.js";
import checkAuth from "../middleware/checkAuth.js";


const router = express.Router();

router
    .route('/')
    .get(checkAuth, getCharacters)
    .post(checkAuth, createCharacter)

router
    .route('/:id')
    .get(checkAuth, getCharacterById)
    .put(checkAuth, updateCharacter)
    .delete(checkAuth, deleteCharacter)


export default router