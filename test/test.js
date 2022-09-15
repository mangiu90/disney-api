import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from "dotenv";

import server from "../server.js";
import { connectDB } from '../database/db.js';
import { userSeeder, charactersMoviesSeeder } from '../database/seed.js';

dotenv.config();
const expect = chai.expect;
chai.use(chaiHttp);

let user = {
    email: "user1@user.com",
    password: "12345678",
}

let token;

describe('api tests', () => {

    before('connect', async () => {
        await connectDB();
        await userSeeder();
        await charactersMoviesSeeder();
    });

    before(done => {
        chai.request(server)
            .post('/auth/login')
            .send(user)
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    it('successfully create character', (done) => {
        let character = {
            img_url: "https://akns-images.eonline.com/eol_images/Entire_Site/20121016/634.mm.cm.111612_copy.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top",
            name: "Goofy",
            age: 45,
            weight: 90,
            history: "Goofy, o Goofy Goof, es un personaje perruno de ficción de Disney. Es uno de los mejores amigos de Mickey Mouse. Es el padre de Max Goof, a diferencia de la mayoría de los personajes relacionados, que suelen ser tíos.",
            movie_ids: [1]
        }

        chai.request(server)
            .post('/characters')
            .set({ Authorization: `Bearer ${token}` })
            .send(character)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(Object.keys(res.body).length).to.be.equal(8);
                done();
            });
    });

    it('error update invalid age', (done) => {
        let character_update = {
            age: 'cuarenta'
        }

        chai.request(server)
            .put('/characters/1')
            .set({ Authorization: `Bearer ${token}` })
            .send(character_update)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                done();
            });
    });


    it('Character not found', (done) => {
        chai.request(server)
            .get('/characters/101')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                expect(res.status).to.be.equal(404);
                expect(res.body.message).to.be.equal("Character not found");
                done();
            });
    });


})
