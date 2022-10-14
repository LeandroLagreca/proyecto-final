
const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const router = Router();
const { API_KEY } = process.env;

//Post
const videogamePost = async (req, res) => {
    try {
        const { name, background_image, rating_api, rating_user, description, released, price, images, requirements, genres} = req.body
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
        })

        let genresDb = await Genre.findAll({
            where: {name: genres}
        })
        newVideogame.addGenres(genresDb)

        res.status(200).json(newVideogame);

    } catch (error) {
        res.status(400).json({error: error.message});
    };
};


//Sube los datos de la api
const allDataVideogames = async (req, res) => {
    const {name} = req.query;

    try {
        let rawgUrl;
        if (name) {
            rawgUrl = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        } else {rawgUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);}


        const apiInfo = await rawgUrl.data.results.map((e) => {
            let forPC = e.platforms.map(element=> {
                if (element.platform.name == "PC") {return true}
            })
            if (forPC) {
                let imgs = e.short_screenshots.map(el => {
                    return el.image;
                });
                imgs = imgs.join();
    
                let requirementsData = e.platforms.filter(function(el){
                    return el.platform.name == "PC";
                })

                let requirements;

                if (requirementsData[0] != null) {
                    if (requirementsData[0] != undefined) {
                        if (requirementsData[0].requirements_en != null) {
                            if (requirementsData[0].requirements_en !== undefined) {
                                requirements = Object.values(requirementsData[0].requirements_en)
                                requirements = requirements.toString()
                            }  else {requirements = null}
                        } else {requirements = null}
                    }  else {requirements = null}
                }  else {requirements = null}

                if (e != null) {
                    if (e != undefined) {
                        if (requirements != null) {
                            if (requirements !== undefined) {
                                requirements = requirements.toString()
                            }
                        }
                    }
                }

                /*let price = await axios.get(`https://www.cheapshark.com/api/1.0/games?title=${e.name}&limit=1&exact=0`)
                let priceUpload = null;
        
                if (price != null) {
                    if (price != undefined) {
                        if (price.data[0] != null) {
                            if (price.data[0] != undefined) {
                                if (price.data[0].cheapest != null) {
                                    if (price.data[0].cheapest != undefined) {
                                        priceUpload = price.data[0].cheapest
                                    }
                                }
                            }
                        }
                    }
                }*/
                
        
                /*let descriptionData = axios.get(`https://api.rawg.io/api/games/${e.id}?key=${API_KEY}`);
        
                let description = descriptionData.data.description;*/
        
                e.released = e.released.toString()
                
                const game = {
                    id: e.id,   
                    name: e.name,
                    background_image: e.background_image,
                    rating_api: e.rating,
                    released: e.released,
                    images: imgs,
                    requirements: requirements,
                    genres: e.genres.map((e) => e.name),
                }
                //description: description,
                //price: priceUpload,
                //console.log(game)
                return game;
            }
        });
    const dbInfo = await Videogame.findAll();
    const apiDbInfo = apiInfo.concat(dbInfo)
    res.status(200).send(apiDbInfo);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


//Get id
const videogameByID = async (req, res) => {
    const { id } = req.params;
    
    try {
      if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
        const videoGameDb = await Videogame.findOne({
          where: {
            id: id,
          },
        });
        res.json(videoGameDb);
      } else {
        const videoGameApiId = ( 
            await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        ).data;
        const price = (
            await axios.get(`https://www.cheapshark.com/api/1.0/games?title=${videoGameApiId.name}&limit=1&exact=0`)
        )
        const images = (
            await axios.get(`https://api.rawg.io/api/games?search=${videoGameApiId.name}&limit=1&exact=0&key=${API_KEY}`)
        ).data.results[0];

        let imgs = images.short_screenshots.map(el => {
            return el.image;
        });

        imgs = imgs.join();


        let priceUpload = null;
        if (price != null) {
            if (price != undefined) {
                if (price.data[0] != null) {
                    if (price.data[0] != undefined) {
                        if (price.data[0].cheapest != null) {
                            if (price.data[0].cheapest != undefined) {
                                priceUpload = price.data[0].cheapest
                            }
                        }
                    }
                }
            }
        }

        const videoGameApi = {
          name: videoGameApiId.name,
          description: videoGameApiId.description,
          background_image: videoGameApiId.background_image,
          released: videoGameApiId.released,
          rating_api: videoGameApiId.rating,
          price: priceUpload,
          images: imgs,
          genres: videoGameApiId.genres.map((e) => e.name),
        }
        console.log(videoGameApi)
        res.json(videoGameApi)
      }
    } catch (error) {
      res.send(error);
    }
}


//Conseguir generos
const getGenres = async (req, res) => {
    try {
      const data = await Genre.findAll();
      if (data.length === 0) {
        const response = await axios.get(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        const { results } = response.data;
        const data = results.map((genre) => ({ name: genre.name }));
        await Genre.bulkCreate(data);
        res.send(data);
      } else {
        res.send(data);
      }
    } catch (error) {
      res.status(400).send(error);
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
            requirements: requirements
              ? requirements
              : find.requirements,
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
    allDataVideogames,
    getGenres,
    updateVideogame,
}
