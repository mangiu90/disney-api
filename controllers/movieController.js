import { Category, Character, Movie } from '../models/index.js';



const getMovies = async (req, res) => {
    const { title, category, order } = req.query;

    var whereStatement = {};
    if(title) whereStatement.title = title;
    if(category) whereStatement.CategoryId = category;

    var orderStatement = [];
    if(order) {
        if (order == 'ASC' || order == 'DESC') {
            orderStatement = [
                ['creation_date', order]
            ];
        }
    };

    const movies = await Movie.findAll({
        attributes: ['id', 'img_url', 'title', 'creation_date'],
        where: whereStatement,
        order: orderStatement
    });

    res.status(200).json(movies);
}

const getMovieById = async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findByPk(id, {
        include: [Category, Character]
    });

    if (movie !== null) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: "Movie not found" });
    }
}

const createMovie = async (req, res) => {
    const { img_url, title, creation_date, score, CategoryId, character_ids } = req.body;

    if (!CategoryId) {
        const error = new Error("CategoryId is required");
        return res.status(404).json({ msg: error.message });
    }

    const category = await Category.findByPk(CategoryId);

    if (!category) {
        const error = new Error("category not found");
        return res.status(404).json({ msg: error.message });
    }

    try {
        const movie = Movie.build({ img_url, title, creation_date, score, CategoryId });
        if (character_ids && character_ids.length > 0) {
            character_ids.forEach(async id => {
                const characterRow = await Character.findByPk(id);
                await movie.addCharacter(characterRow);
            });
        }
        await movie.save();

        res.status(200).json(movie.toJSON());
    } catch (error) {
        if (error.errors) {
            const errObj = {};
            error.errors.map(er => {
                errObj[er.path] = er.message;
            })
            return res.status(400).json({ errors: errObj });
        }
        return res.status(400).json({ msj: 'createMovie error' });
    }
}

const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { character_ids } = req.body;

    const movie = await Movie.findByPk(id);

    if (!movie) {
        const error = new Error("movie not found");
        return res.status(404).json({ msg: error.message });
    }

    movie.img_url = req.body.img_url || movie.img_url;
    movie.title = req.body.title || movie.title;
    movie.creation_date = req.body.creation_date || movie.creation_date;
    movie.score = req.body.score || movie.score;
    movie.CategoryId = req.body.CategoryId || movie.CategoryId;

    const category = await Category.findByPk(movie.CategoryId);

    if (!category) {
        const error = new Error("category not found");
        return res.status(404).json({ msg: error.message });
    }

    try {
        if (character_ids) {
            await movie.setCharacters([]);
            character_ids.forEach(async id => {
                const characterRow = await Character.findByPk(id);
                await movie.addCharacter(characterRow);
            });
        }

        await movie.save();
        res.status(200).json(movie);
    } catch (error) {
        if (error.errors) {
            const errObj = {};
            error.errors.map(er => {
                errObj[er.path] = er.message;
            })
            return res.status(400).json({ errors: errObj });
        }
        return res.status(400).json({ msj: 'updateMovie error' });
    }
}

const deleteMovie = async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    if (!movie) {
        const error = new Error("movie not found");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await movie.destroy();
        res.status(200).json(movie);
    } catch (error) {
        return res.status(400).json({ msj: 'deleteMovie error' });
    }
}



export {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};