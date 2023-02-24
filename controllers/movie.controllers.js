const Movie = require("../models/movie.model");
const User = require("../models/user.model");

const crearPelicula = (request,response) => {
    const {title,id, review} = request.body;
    console.log(title, id, review)
    if(!title || !id || !review){
    
        response.statusMessage = "El titulo, el usuario y la reseña son obligatorios.";
        return response.status(400).end();
    }
    else{
        User.findById({_id:id})
            .then( usuarioEncontrado => {
                if(!usuarioEncontrado){
                    response.statusMessage = "El usuario indicado no existe.";
                    return response.status(404).end();
                }
                else{
                    const nuevaPelicula = {
                        title,user:id
                    }
                    Movie.create(nuevaPelicula)
                        .then(peliculaCreada => {
                            
                            Movie.findByIdAndUpdate({_id:peliculaCreada._id},{$push:{reviews:review}}, {new:true})
                                .then(pelicula => {
                                    return response.status(201).json(pelicula);
                                })
                                .catch(err => {
                                    response.statusMessage = "Hubo un ERROR al intentar crear la película. "+err;
                                    return response.status(400).end();
                                })
                        })
                        .catch(err => {
                            response.statusMessage = "Hubo un error al intentar crear la película. "+err;
                            return response.status(400).end();
                        })
                }
            })
            .catch(err => {
                response.statusMessage = "Hubo un error al intentar crear la película. "+err;
                return response.status(400).end();
            });
    }
}

const obtenerPeliculas = (request,response) => {
    Movie.find()
        .populate({path:'user'})
        .populate({path:"reviews.user"})
        .then( peliculas => {
            let pelisTemp = []
            peliculas.forEach(pelicula => {
                let rating = pelicula.reviews.reduce((total, siguiente) => total+siguiente.rate,0) / pelicula.reviews.length;
                pelisTemp.push({pelicula,rating});
            });

            return response.status(200).json(pelisTemp);
        })
        .catch(err => {
            response.statusMessage = "Hubo un error al obtener las películas."+err;
            return response.status(400).end();
        });
}

const obtenerPelicula = (request,response) => {
    const {id} = request.params;

    Movie.findById({_id:id})
        .populate({path:'user'})
        .populate({path:"reviews.user"})
        .then( pelicula => {
            if(pelicula){
                return response.status(200).json(pelicula);
            }
            else{
                response.statusMessage = "La pelicula indicada no existe.";
                return response.status(404).end();
            }
        })
        .catch(err => {
            response.statusMessage = "Hubo un error al buscar la película."+err;
            return response.status(400).end();
        });
}

const reviewMovie = (request,response) => {
    const {id} = request.params;
    const {review} = request.body;

    Movie.findByIdAndUpdate({_id:id},{$push:{reviews:review}}, {new:true})
        .populate({path:'user'})
        .populate({path:"reviews.user"})
        .then(movie => {
            return response.status(202).json(movie);
        })
        .catch(err => {
            response.statusMessage = "Hubo un error al agregar una reseña. "+err;
            return response.status(400).end();
        })
}

const removeReview = (request,response) => {
    const {id} = request.params;
    const {reviewId} = request.body; //id del review

    Movie.findByIdAndUpdate({_id:id}, {$pull:{ reviews : {_id:reviewId}}}, {new:true})
        .populate({path:'user'})
        .populate({path:"reviews.user"})
        .then(movie => {
            return response.status(202).json(movie);
        })
        .catch(err => {
            response.statusMessage = "Hubo un error al eliminar una reseña. "+err;
            return response.status(400).end();
        })
}

const eliminarPelicula = (request,response) => {
    const {id} = request.params;

    Movie.findByIdAndDelete({_id:id})
        .then(() => {
            return response.status(204).end();
        })
        .catch( err => {
            response.statusMessage = "Hubo un error al intentar eliminar la película. "+err;
            return response.status(400).end();
        });
}

const MovieController = {
    crearPelicula,
    obtenerPeliculas,
    obtenerPelicula,
    reviewMovie,
    removeReview,
    eliminarPelicula
}

module.exports = MovieController;