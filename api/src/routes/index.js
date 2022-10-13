const { Router } = require('express');
const { videogamePost, allDataVideogames, videogameByID, getGenres,updateVideogame } = require('../controllers/videogameControllers.js');
const axios = require('axios');
const{postComment}=require('../controllers/Comment')
const { allDataUser, UserByID, UserPost, UserEliminated, UserUpdate } = require('../controllers/User.js');
const router = Router();

// Configuración de rutas
//Videogame
router.get("/videogames/:id", videogameByID)

router.post("/videogames", videogamePost)

router.get("/videogames", allDataVideogames)

router.put('/modify/:id',updateVideogame)

router.get("/genres",getGenres)

//User

router.get("/user", allDataUser);

router.post('/user', UserPost);

router.get('/user/:id', UserByID);

router.delete('/user/:id', UserEliminated);

router.put('/user/:id', UserUpdate);




module.exports = router;
