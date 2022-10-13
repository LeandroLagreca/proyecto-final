/*  name STRING
    background_image STRING
    rating_api FLOAT
    rating_user FLOAT
    description TEXT
    released DATE
    price STRING
    images TEXT
    requirements_minimum TEXT
    requirements_recommended TEXT */
require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Videogame,Genre } = require("../db");
const router = Router();
const { API_KEY } = process.env;

const videogameCodeoPost = async (req, res) => {
  try {
    const {
      name,
      background_image,
      rating_api,
      rating_user,
      description,
      released,
      price,
      images,
      requirements_minimum,
      requirements_recommended,
    } = req.body;
    const newVideogame = await Videogame.create({
      name,
      background_image,
      rating_api,
      rating_user,
      description,
      released,
      price,
      images,
      requirements_minimum,
      requirements_recommended,
    });
    res.status(200).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDbInfo = async () => {
  return await Videogame.findAll();
};

const getDbById = async (id) => {
  return await Videogame.findByPk(id);
};

const videogameCodeoByID = async (req, res) => {
  const { id } = req.params;
  try {
    let dbVideogameById = await getDbById(id);
    return res.status(200).json(dbVideogameById);
  } catch {
    return res.status(400).send("Videogame does not exist");
  }
};

const allDataCodeoVideogames = async (req, res) => {
  const { name } = req.query;

  const info = await getDbInfo();

  try {
    if (name !== undefined) {
      if (name !== null) {
        const videogameQuery = info.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );

        if (videogameQuery.length === 0) {
          res.send("Videogame does not exist");
        } else {
          res.status(200).json(videogameQuery);
        }
      }
    } else {
      res.status(200).json(info);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGenres=async (req,res)=> {
    try {
      const data = await Genre.findAll()
      console.log(data)
      if (data.length === 0) {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const { results } = response.data
        const data = results.map(genre => ({ name: genre.name }))
        await Genre.bulkCreate(data)
        res.send(data)
      } else {
        res.send(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
module.exports = {
  videogameCodeoPost,
  videogameCodeoByID,
  allDataCodeoVideogames,
  getGenres
};
