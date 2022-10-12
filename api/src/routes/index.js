const { Router } = require('express');
const { videogameCodeoPost, videogameCodeoByID, allDataCodeoVideogames,getGenres } = require('../controllers/hardcodeo.js');
const axios = require('axios');
const router = Router();

// Configuración de rutas
router.get("/videogames/:id", videogameCodeoByID)

router.post("/videogames", videogameCodeoPost)

router.get("/videogames", allDataCodeoVideogames)

router.get("/genres",getGenres)

module.exports = router;
