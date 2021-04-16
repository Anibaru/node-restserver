const Role = require('../models/rol')
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const exist = await Role.findOne({rol});
    if (!exist){
        throw new Error(`El rol ${rol} no esta registrado en la base de Datos`);
     }
    }
const existeEmail = async(correo = '') => {
    const exist = await Usuario.findOne({correo});
    if(exist) {
        throw new Error(`El correo ${correo} ya esta registrado en la base de Datos`);
    }
}

const existeUsuarioID = async(id) => {
    const exist = await Usuario.findById(id);
    if(!exist) {
        throw new Error(`El usuario ${id} no existe`);
    }
}

    
module.exports = { esRoleValido,existeEmail, existeUsuarioID};