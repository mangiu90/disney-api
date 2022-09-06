import { Character, Movie } from '../models/index.js';



const getCharacters = async (req, res) => {
    const { name, age, weight, movies } = req.query;

    var whereStatement = {};
    if(name) whereStatement.name = name;
    if(age) whereStatement.age = age;
    if(weight) whereStatement.weight = weight;

    var includeStatement = [];
    if(movies) {
        includeStatement = [{
            model: Movie,
            attributes: ['id'],
            where: {
                id: movies,
            }
        }]
    };

    const characters = await Character.findAll({
        attributes: ['id', 'img_url', 'name'],
        where: whereStatement,
        include: includeStatement
    });

    res.status(200).json(characters);
}

const getCharacterById = async (req, res) => {
    const { id } = req.params;

    const character = await Character.findByPk(id, {
        include: Movie
    });

    res.status(200).json(character);
}

const createCharacter = async (req, res) => {
    const { img_url, name, age, weight, history, movie_ids } = req.body;

    try {
        const character = Character.build({ img_url, name, age, weight, history });
        if (movie_ids && movie_ids.length > 0) {
            movie_ids.forEach(async id => {
                const movieRow = await Movie.findByPk(id);
                await character.addMovie(movieRow);
            });
        }
        await character.save();

        res.status(200).json(character.toJSON());
    } catch (error) {
        if (error.errors) {
            const errObj = {};
            error.errors.map(er => {
                errObj[er.path] = er.message;
            })
            return res.status(400).json({ errors: errObj });
        }
        return res.status(400).json({ msj: 'createCharacter error' });
    }
}

const updateCharacter = async (req, res) => {
    const { id } = req.params;
    const { movie_ids } = req.body;

    const character = await Character.findByPk(id);

    if (!character) {
        const error = new Error("character not found");
        return res.status(404).json({ msg: error.message });
    }

    character.img_url = req.body.img_url || character.img_url;
    character.name = req.body.name || character.name;
    character.age = req.body.age || character.age;
    character.weight = req.body.weight || character.weight;
    character.history = req.body.history || character.history;

    try {
        if (movie_ids) {
            await character.setMovies([]);
            movie_ids.forEach(async id => {
                const movieRow = await Movie.findByPk(id);
                await character.addMovie(movieRow);
            });
        }

        await character.save();
        res.status(200).json(character);
    } catch (error) {
        if (error.errors) {
            const errObj = {};
            error.errors.map(er => {
                errObj[er.path] = er.message;
            })
            return res.status(400).json({ errors: errObj });
        }
        return res.status(400).json({ msj: 'updateCharacter error' });
    }
}

const deleteCharacter = async (req, res) => {
    const { id } = req.params;

    const character = await Character.findByPk(id);

    if (!character) {
        const error = new Error("character not found");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await character.destroy();
        res.status(200).json(character);
    } catch (error) {
        return res.status(400).json({ msj: 'deleteCharacter error' });
    }
}



export {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};