import bcrypt from "bcrypt";
import { sequelize } from './db.js';
import { Category, Character, Movie } from '../models/index.js';
import User from '../models/User.js';


const userSeeder = async () => {
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash("12345678", salt);
    await User.create({
        username: "User 1",
        email: "user1@user.com",
        password
    });

    console.log('user seeded successfully.');
}

const characterSeeder = async () => {

    await Character.bulkCreate([
        {
            id: 1,
            img_url: "https://akns-images.eonline.com/eol_images/Entire_Site/20121016/634.mm.cm.111612_copy.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top",
            name: "Mickey Mouse",
            age: 66,
            weight: 30.5,
            history: "Mickey Mouse es un personaje ficticio estadounidense de la serie del mismo nombre, emblema de la compañía Disney. Creado el 18 de noviembre de 1928, este ratón tiene un origen disputado.",
        },
        {
            id: 2,
            img_url: "https://i.pinimg.com/736x/68/14/a7/6814a73489b9e3b94d8031ab23c65540--hair-png-ariel-disney.jpg",
            name: "Ariel",
            age: 20,
            weight: 50.5,
            history: "Ariel, es un personaje ficticio y el personaje protagonista de la película de animación de 1989, La sirenita, propiedad de Walt Disney.",
        },
        {
            id: 3,
            img_url: "https://static.wikia.nocookie.net/doblaje/images/7/7b/Donald.jpg/revision/latest?cb=20220512112816&path-prefix=es",
            name: "Pato Donald",
            age: 50,
            weight: 70.1,
            history: "El Pato Donald es un personaje de Disney, caracterizado como un pato blanco antropomórfico de ojos celestes, pico, piernas y pies anaranjados. Generalmente viste una camisa de estilo marinero y un sombrero, sin pantalones, excepto cuando va a nadar.",
        },
        {
            id: 4,
            img_url: "https://static.wikia.nocookie.net/esstarwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20180105191224",
            name: "Yoda",
            age: 900,
            weight: 20,
            history: "Yoda es un personaje ficticio del universo de Star Wars, era uno de los más renombrados y poderosos maestros Jedi durante toda la historia de la Galaxia, y uno de los pocos Jedis de la República Galáctica en sobrevivir hasta la Guerra Civil Galáctica.",
        },
        {
            id: 5,
            img_url: "https://static.wikia.nocookie.net/disney/images/4/44/Capit%C3%A1nGarfio.png/revision/latest?cb=20121207105436&path-prefix=es",
            name: "Capitán Garfio",
            age: 65,
            weight: 66.6,
            history: "El capitán Garfio fue un personaje ficticio de Peter Pan, creado por J. M. Barrie como intrépido capitán pirata del Jolly Roger y némesis del protagonista homónimo. ",
        },
        {
            id: 6,
            img_url: "https://static.wikia.nocookie.net/disney/images/5/5f/Stitch.png/revision/latest/top-crop/width/360/height/360?cb=20140703072656&path-prefix=es",
            name: "Stitch",
            age: 10,
            weight: 33.3,
            history: "Stitch es un personaje ficticio, el protagonista de la serie animada Lilo & Stitch: La serie y las películas Lilo & Stitch, La película de Stitch, Lilo & Stitch 2: Stitch Has a Glitch y Leroy & Stitch.",
        },
    ]);
}

const categorySeeder = async () => {
    await Category.bulkCreate([
        {
            id: 1,
            img_url: 'https://www.filmsite.org/images/crimefilms.gif',
            name: 'Crime',
        },
        {
            id: 2,
            img_url: 'https://www.filmsite.org/images/comedyfilms.gif',
            name: 'Comedy',
        },
        {
            id: 3,
            img_url: 'https://www.filmsite.org/images/dramafilms.gif',
            name: 'Drama',
        },
        {
            id: 4,
            img_url: 'https://www.filmsite.org/images/animatedfilms.gif',
            name: 'Animated',
        },
        {
            id: 5,
            img_url: 'https://www.filmsite.org/images/horrorfilms.gif',
            name: 'Horror',
        }
    ]);
}

const moviesSeeder = async () => {
    await Movie.bulkCreate([
        {
            id: 1,
            img_url: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae48aa31f5aef579cc4123c52b92570b9385d105cc888f68d2e6b1bd5b816555._RI_V_TTW_.jpg",
            title: "Mickey, Donald, Goofy: Los tres mosqueteros",
            creation_date: "2004-08-17",
            score: 3,
            CategoryId: 4,
        },
        {
            id: 2,
            img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm0w3u4AiQ1JAD4akydHcw2LkD3rhJcwOkdC4M0wIKqRTevYKQEi5JEXTC&s",
            title: "La sirenita",
            creation_date: "1989-12-07",
            score: 5,
            CategoryId: 4,
        },
        {
            id: 3,
            img_url: "https://static.wikia.nocookie.net/esstarwars/images/d/dd/Star_Wars_epI.jpg/revision/latest/top-crop/width/360/height/450?cb=20060331023235",
            title: "Star Wars: episodio I - la amenaza fantasma",
            creation_date: "1999-07-08",
            score: 5,
            CategoryId: 2,
        },
        {
            id: 4,
            img_url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSr0xFpEk8JOUKZNwOtvmTVNpovHPs7o0zkGHVHYzp_5j7gV6W4",
            title: "Peter Pan",
            creation_date: "1953-07-07",
            score: 4,
            CategoryId: 5,
        },
        {
            id: 5,
            img_url: "https://static.wikia.nocookie.net/doblaje/images/6/69/Lilo-and-stitch.jpg/revision/latest?cb=20161221220904&path-prefix=es",
            title: "Lilo y Stitch",
            creation_date: "2002-07-06",
            score: 5,
            CategoryId: 2,
        }
    ])
}

const charactersMoviesSeeder = async () => {
    await characterSeeder();
    await categorySeeder();
    await moviesSeeder();

    let mickey = await Character.findByPk(1);
    let ariel = await Character.findByPk(2);
    let pato = await Character.findByPk(3);
    let yoda = await Character.findByPk(4);
    let garfio = await Character.findByPk(5);
    let stich = await Character.findByPk(6);

    (await Movie.findByPk(1)).addCharacters([mickey, pato]);
    (await Movie.findByPk(2)).addCharacter(ariel);
    (await Movie.findByPk(3)).addCharacter(yoda);
    (await Movie.findByPk(4)).addCharacter(garfio);
    (await Movie.findByPk(5)).addCharacter(stich);

    console.log('data seeded successfully.');
}


export {
    userSeeder,
    charactersMoviesSeeder
}