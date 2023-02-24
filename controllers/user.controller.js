const bcrypt = require('bcryptjs');
const User = require('../models/user.model');


const registrarUsuario = (request,response) => {
    const {firstName,lastName,email,password} = request.body;

    if(!firstName || !lastName || !email || !password){
        response.statusMessage = "Los campos: nombre, apellido, email y contraseña son obligatorios.";
        return response.status(406).end();
    }
    else{
        if(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)){
            console.log("OK") 
        

            bcrypt.hash(password,saltRounds)
                .then(passwordEncriptado => {
                    User.findOne({email}).then(usuarioObtenido => {
                        if(usuarioObtenido){
                            response.statusMessage = "El email utilizado ya existe en la base de datos.";
                            return response.status(406).end();
                        }
                        else{
                            const nuevoUsuario = {firstName,lastName,email,password:passwordEncriptado};
                            User.create(nuevoUsuario)
                                .then(usuarioCreado => {
                                    const payload ={
                                        firstName:usuarioCreado.firstName,
                                        lastName:usuarioCreado.lastName,
                                        email:usuarioCreado.email,
                                        _id:usuarioCreado._id
                                    };

                                    return response.status(200).json({mensaje: "éxito!!!"})
                                })
                                .catch(err => {
                                    response.statusMessage = "Hubo un error al intentar registrar al usuario. "+err;
                                    return response.status(400).end();
                                })
                        }
                    }).catch( err => {
                        response.statusMessage = "Hubo un error al intentar registrar al usuario. "+err;
                        return response.status(400).end();
                    });
                })
        }
        else{
            response.statusMessage = "El email proporcionado no es valido.";
            return response.status(406).end();
        }
    }
}

const UserController = {
    registrarUsuario
}

module.exports = UserController;