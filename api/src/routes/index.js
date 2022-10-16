const { Router } = require('express');
const { videogamePost, allDataVideogames, videogameByID, getGenres,updateVideogame } = require('../controllers/videogameControllers.js');
const axios = require('axios');
const { allDataUser, UserByID, UserPost, UserEliminated, UserUpdate, LoginPost } = require('../controllers/User.js');
const router = Router();

// Configuración de rutas
//Videogame
router.get("/videogames/:id", videogameByID)

router.post("/videogames", videogamePost)

router.get("/videogames", allDataVideogames)

router.put('/videogames/:id',updateVideogame)

router.get("/genres",getGenres)

//User
router.get("/user", allDataUser);

router.post('/register', UserPost);

router.post('/login', LoginPost);

router.get('/user/:id', UserByID);

router.delete('/user/:id', UserEliminated);

router.put('/user/:id', UserUpdate);

//sesion




module.exports = router;
