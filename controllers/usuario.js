const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuarioGet = async(req = request, res = response) => {

    //const {q, nombre = "no name", apikey, page = 1, limit} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    //const usuarios = await Usuario.find(query)
    //.skip(Number(desde))
    //.limit(Number(limite));

    //const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    

    res.json({
        msg: 'get API - controlador',
        total,
        usuarios
    });
  }
const usuarioPost = async (req = request, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
  }
const usuarioPut = async (req = request, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    //validar contra DB
    if(password){
      //Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
  
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
    });
  }
const usuarioPatch = (req = request, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    });
  }
const usuarioDelete = async(req = request, res = response) => {
    const {id} = req.params;
    
    //fisicamente eliminado
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});


    res.json({
        msg: 'delete API - controlador',
        usuario
    });
  }

  module.exports = {
      usuarioGet, usuarioPost, usuarioPut, usuarioPatch, usuarioDelete
    };