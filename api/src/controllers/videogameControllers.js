
const { Router } = require('express');
const axios = require('axios');
const { Videogame } = require('../db');
const router = Router();
const {
    DB_USER, DB_PASSWORD, DB_HOST, API_KEY
  } = process.env;

//Post
const videogamePost = async (req, res) => {
    try {
        const { name, background_image, rating_api, rating_user, description, released, price, images, requirements_minimum, requirements_recommended } = req.body
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
        res.status(200).json(newVideogame);

    } catch (error) {
        res.status(400).json({error: error.message});
    };
};


const getApiInfo = async (req, res) => {
    const rawgUrl =  await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);

    const apiInfo = await rawgUrl.data.results.map(e => {
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
            

            return ({
                name: e.name,
                background_image: e.background_image,
                rating_api: e.rating,
                released: e.released,
                images: imgs,
                requirements: requirementsData[0].requirements_en,
                id: e.id,
            })

        }
    });
        //console.log(apiInfo)
        return apiInfo;
}


const dataUpload = async (req, res) => {

    const data = await getApiInfo()
    const videogamesUploaded = [];
    try {
    await data.map(async (e) => {
        if (e != null) {
            if (e != undefined) {
                if (e.requirements != null) {
                    if (e.requirements !== undefined) {
                        e.requirements = Object.values(e.requirements)
                        e.requirements = e.requirements.toString()
                    }
                }
            }
        }

        let price = await axios.get(`https://www.cheapshark.com/api/1.0/games?title=${e.name}&limit=1&exact=0`)
        let priceUpload = null;

        if (price != null) {
            if (price != undefined) {
                if (price.data[0] != null) {
                    if (price.data[0] != undefined) {
                        if (price.data[0].cheapest != null) {
                            if (price.data[0].cheapest != undefined) {
                                priceUpload = price.data[0].cheapest
                                console.log(priceUpload)
                            }
                        }
                    }
                }
            }
        }

        let descriptionData = await axios.get(`https://api.rawg.io/api/games/${e.id}?key=${API_KEY}`);
        //let descriptionUpload = 
        let description = descriptionData.data.description;

        e.released = e.released.toString()

        let game = Videogame.findOrCreate({
            where: {
                name: e.name,
                background_image: e.background_image,
                rating_api: e.rating_api,
                released: e.released,
                images: e.images,
                requirements: e.requirements,
                price: priceUpload,
                description: description,
            }
        })

        videogamesUploaded.push(game);
    })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


const getDbInfo = async () => {
    return await Videogame.findAll();
}


const getDbById = async (id) => {
    return await Videogame.findByPk(id);
}


//Get id
const videogameByID = async (req, res) => {
    const { id } = req.params
    try {
        let dbVideogameById = await getDbById(id);
        return res.status(200).json(dbVideogameById)
    } catch {
        return res.status(400).send('Videogame does not exist')
    }
}


//Get todos los datos
const allDataVideogames = async (req, res) => {
    const {name} = req.query;
    
    const data = await dataUpload();
    const info = await getDbInfo();

    if (name !== undefined) {
        if (name !== null) {
            
        }
    }

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
        } else { res.status(200).json(info)}

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


const getGenres = async (req, res) => {
    try {
      const data = await Genre.findAll();
      console.log(data);
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
      console.log(error);
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
      console.log(error);
    }
  };
  



module.exports = {
    videogamePost,
    videogameByID,
    allDataVideogames,
    getGenres,
    updateVideogame,
}