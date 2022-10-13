const { Router } = require('express');
const { videogameCodeoPost, videogameCodeoByID, allDataCodeoVideogames,getGenres,updateVideogame } = require('../controllers/hardcodeo.js');
const axios = require('axios');
const{postComment}=require('../controllers/Comment')
const { allDataUser, UserByID, UserPost, UserEliminated, UserUpdate } = require('../controllers/User.js');
const router = Router();

// Configuración de rutas
router.get("/videogames/:id", videogameCodeoByID)

router.post("/videogames", videogameCodeoPost)

router.get("/videogames", allDataCodeoVideogames)

router.get("/genres",getGenres)
router.get("/user", allDataUser);
router.post('/user', UserPost);
router.get('/user/:id', UserByID);
router.delete('/user/:id', UserEliminated);
router.put('/user/:id', UserUpdate);
router.put('/modify/:id',updateVideogame)
router.post("/comment",postComment)
module.exports = router;
