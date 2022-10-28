const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const router = Router();
const { API_KEY } = process.env;
const json = require("../harcode.json");
const { Op, Sequelize, DataTypes } = require("sequelize");
//Post

const getRowTableVideoGames = async (req, res) => {
  try {
    const count = await Videogame.count();

    res.status(200).json(count.toString());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const addGenre = async (genres) => {
  if (genres) {
    try {
      let currentGenres = await getGenres();

      if (Array.isArray(genres)) {
        let newGenres = genres.filter(
          (eArr2) =>
            !currentGenres.find((eArr1) => eArr2 == eArr1.dataValues.name)
        );

        if (newGenres.length > 0) {
          let promisesDb = newGenres.map(async (e) => {
            let newGenre = await Genre.create({ name: e });
          });
          let addedGenres = Promise.all(promisesDb);

          let success = `new genres created in db`;

          return success;
        } else {
          let failed = "those genres already exist";
          return failed;
        }
      } else {
        let found = currentGenres.find((e) => e.dataValues.name === genres);

        if (found) {
          let error = "that genre already exist";

          return error;
        } else {
          let newGenre = await Genre.create({ name: genres });
          return { msg: `${genres} was created successfully` };
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404).send("a genre or arr of genres is required");
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
      trailer,
      stock,
      newGenres,
    } = req.body;

    if (name) {
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

      if (newGenres) {
        let response = await addGenre(newGenres);
        res.status(200).send({ msg: "game was created", newgenre: response });
      } else {
        res.status(200).json(newVideogame);
      }
    } else {
      res.status(404).send({ msg: "a name is required" });
    }
  } catch (error) {
    res.send(error);
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
    limit: 10,
  };
  try {
    let { count, rows } = await Videogame.findAndCountAll(config);
    if (rows.length) {
      if (price) {
        rows = rows.filter(game => Number(game.price) <= Number(price))
      }
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
    console.log(error);
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
    const data = await Genre.findAll({ attributes: ['id', 'name']});
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
}

const getDiscounts = async (req, res) => {
  try {
    const discounts = await Videogame.findAll({
      where: {
        "discount.status": true,
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
    trailer,
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
          trailer: trailer ? trailer : find.trailer,
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
