const { Router } = require('express');
const db = require("../db");
const { Videogame, Genre } = require('../db');
const router = Router();

const genres = ['Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 'Simulation', 'Racing', 'Arcade', 'Puzzle', 'Platformer', 'Sports', 'Massively Multiplayer', 'Fighting', 'Family', 'Educational', 'Board Games', 'Card'];

const genresToDb = async (req, res) => {
    genres.forEach(e => {
        Genre.findOrCreate({
            where: { name: e}
        })
    });
}


module.exports = { genresToDb }
