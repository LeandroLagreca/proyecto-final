const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const router = Router();
const { API_KEY } = process.env;
const json = require("../harcode.json");
const { Op, Sequelize } = require("sequelize");
//Post

const getRowTableVideoGames = async (req, res) => {
  try {
    const count = await Videogame.count();

    res.status(200).json(count.toString());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const videogamePost = async (req, res) => {
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
      requirements,
      genres,
      stock,
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
      requirements,
      stock,
    });

    let genresDb = await Genre.findAll({
      where: { name: genres },
    });
    newVideogame.addGenres(genresDb);

    res.status(200).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGamesDb = async (req, res) => {
  try {
    let games = await Videogame.findAll({
      where: {
        stock: { [Op.lt]: 0 },
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return games;
  } catch (error) {
    console.log(error);
  }
};

const getAllGames = async (req, res) => {
  const { filter = "" } = req.query;
  const { name, rating, price, genre } = filter;
  const { options = "" } = req.query;
  let { page = 1 } = options;
  const order = options?.sort && [["name", options.sort.toUpperCase()]];
  if (page < 1) page = 1;

  const where = {};
  const genreFilter = {};

  if (name)
    where.name = {
      [Op.iLike]: `%${name}%`,
    };

  if (rating) {
    where.rating_api = Sequelize.where(
      Sequelize.fn("ROUND", Sequelize.col("rating_api")),
      {
        [Op.eq]: rating,
      }
    );
  }

  if (price) {
    where.price = Sequelize.where(
      Sequelize.fn('TO_NUMBER', Sequelize.col("price"), '999,999.99'),
      {
        [Op.lte]: Number(price)
      }
    );
  }

  if (genre)
    genreFilter.name = {
      [Op.iLike]: genre,
    };

  let config = {
    distinct: true,
    include: {
      model: Genre,
      where: genreFilter,
      through: {
        attributes: [],
      },
      attributes: ["name"],
    },
    where,
    order,
    offset: (Number(page) - 1) * 10,
    limit: 10
  };
  try {
    const { count, rows } = await Videogame.findAndCountAll(config);
    if (rows.length) {
      // const position = (Number(page) - 1) * 10
      // const results = rows.slice(position, position + 10)
      res.json({
        status: "success",
        offset: (page - 1) * 10,
        total: count,
        results: rows.length,
        games: rows,
      });
    } else {
      let message;
      if (filter?.name) message = "No se encontro el juego buscado";
      else message = "No hay juegos disponibles";
      res.status(404).send(message);
    }
  } catch (error) {
	console.log(error)
    res.status(400).send(error);
  }
};

const videogameByID = async (req, res) => {
  const { id } = req.params;

  try {
    const videoGameDb = await Videogame.findOne({
      where: { id: id },

      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    res.json(videoGameDb);
  } catch (error) {
    res.send(error);
  }
};

const getGenres = async (req, res) => {
  try {
    const data = await Genre.findAll();
    res.send(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getDiscounts = async (req, res) => {
  try {
    const discounts = await Videogame.findAll({
      where: {
        "discount.status": true
      },
    });
    if (!discounts.length) {
      return res.status(404).send("Don't exist any discount");
    }
    res.json(discounts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateVideogame = async (req, res) => {
  let { id } = req.params;
  let {
    name,
    background_image,
    rating_api,
    rating_user,
    description,
    released,
    price,
    images,
    requirements,
  } = req.body;

  try {
    let find = await Videogame.findOne({ where: { id: id } });
    if (find) {
      await Videogame.update(
        {
          name: name ? name : find.name,
          background_image: background_image
            ? background_image
            : find.background_image,
          rating_api: rating_api ? rating_api : find.rating_api,
          rating_user: rating_user ? rating_user : find.rating_user,
          description: description ? description : find.description,
          released: released ? released : find.released,
          price: price ? price : find.price,
          images: images ? images : find.images,
          requirements: requirements ? requirements : find.requirements,
        },
        { where: { id: id } }
      );
      return res.send({ msg: "Updated successfully" });
    }
    res.send({ msg: "Videogame doesn't exist" });
  } catch (error) {
    res.status.send(error);
  }
};

module.exports = {
  videogamePost,
  videogameByID,
  getGenres,
  updateVideogame,
  getAllGames,
  getDiscounts,
  getRowTableVideoGames,
};
