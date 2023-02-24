const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"El nombre es requerido."]
    },
    lastName:{
        type:String,
        required:[true,"El apellido es requerido."]
    },
    email:{
        type:String,
        required:[true,"El email es requerido."],
        unique:[true, "El email debe ser único."]
    },
    password:{
        type:String,
        required:[true,"La contraseña es requerida."]
    }
},{timestamps:true})

const User = mongoose.model("users",UserSchema);

module.exports = User;