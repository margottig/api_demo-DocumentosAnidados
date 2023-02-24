// const express = require("express");
const MovieController = require("../controllers/movie.controllers");
const UserController = require("../controllers/user.controller")

// const app = express.Router();

module.exports = (app) =>{
    app.get("",MovieController.obtenerPeliculas);
    app.get("/:id",MovieController.obtenerPelicula);
    app.post("",MovieController.crearPelicula);
    app.put("/review/:id",MovieController.reviewMovie);
    app.put("/removeReview/:id",MovieController.removeReview);
    app.delete("/:id",MovieController.eliminarPelicula); 

    app.post("/api/registro", UserController.registrarUsuario)

}

