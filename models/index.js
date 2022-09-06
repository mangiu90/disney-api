import Category from "./Category.js";
import Character from "./Character.js";
import Movie from "./Movie.js";


Character.belongsToMany(Movie, { through: 'CharacterMovies' });
Movie.belongsToMany(Character, { through: 'CharacterMovies' });
Movie.belongsTo(Category);
Category.hasMany(Movie);

export { Character, Movie, Category };