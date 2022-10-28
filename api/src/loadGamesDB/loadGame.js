
const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const router = Router();
const { API_KEY } = process.env;
const json = require ("../harcode.json")


const Game = async () => {

    json.forEach(async (e) => {
        let videogame = await Videogame.findOne({
            where: {
                name: e.name,
            }
        })

        if (!videogame) {
            videogame = await Videogame.create({
                name: e.name,
                trailer: e.trailer,
                background_image: e.background_image,
                trailer: e.trailer,
                rating_api: e.rating_api,
                description: e.description,
                released: e.released,
                price: e.price,
                discount: e.discount,
                images: e.images,
                requirements: e.requirements,
            })

            let genre = await Genre.findAll({
                where: {name: e.genres}
            })
            videogame.addGenre(genre);
            
        }
    })
}
    

module.exports = { Game }
