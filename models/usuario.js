/*
{
    nombre: '',
    correo: 'ssas@asas',
    password: 'pass',
    img:'www.urlalaimagen.cl',
    rol: 'role'
    estado: false,
    google: false si lo creo el sistema, true si hizo sign in con google
}
*/
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun:['ADMIN_ROL', 'USER_ROL'] 
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});
//tiene q si o si ser una funcion normal
UsuarioSchema.methods.toJSON = function() {
    //version y password
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}      

module.exports = model('Usuario', UsuarioSchema);