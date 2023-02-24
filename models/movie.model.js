const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "El titulo es requerido."]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:[true, "El usuario es requerido."]
    },
    reviews:[{
        user:{
            type:mongoose.Types.ObjectId,
            ref:"users",
            required:[true, "El usuario es requerido."]
        },
        rate:{
            type:Number,
            min:[0,"El rating debe ser mínimo 0."],
            max:[5,"El rating debe ser máximo 5."],
            required:[true, "El rating es requerido."]
        },
        description:{
            type:String,
            required:[true, "La descripcion es requerido."],
            minlength:[10,"La descripción debe tener minimo 10 caracteres."]
        }
    }]
});

const Movie = mongoose.model("movies",MovieSchema);

module.exports = Movie;