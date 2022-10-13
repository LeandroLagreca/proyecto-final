const { Router } = require('express');
const { videogamePost, allDataVideogames, videogameByID, getGenres,updateVideogame } = require('../controllers/videogameControllers.js');
const axios = require('axios');
const { allDataUser, UserByID, UserPost, UserEliminated, UserUpdate } = require('../controllers/User.js');
const router = Router();

// Configuración de rutas
router.get("/videogames/:id", videogameByID)

router.post("/videogames", videogamePost)

router.get("/videogames", allDataVideogames)

router.get("/genres",getGenres)

router.get("/user", allDataUser);

router.post('/user', UserPost);

router.get('/user/:id', UserByID);

router.delete('/user/:id', UserEliminated);

router.put('/user/:id', UserUpdate);

router.put('/modify/:id',updateVideogame)



module.exports = router;
