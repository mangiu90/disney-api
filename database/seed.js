import { Category } from '../models/index.js';


const categorySeed = async () => {

    await Category.bulkCreate([
        {
            id: 1,
            img_url: 'https://www.filmsite.org/images/crimefilms.gif',
            name: 'Action',
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
        }
    ]);
}


export {
    categorySeed
}