const { Router } = require('express');
const {check} = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioPatch, usuarioDelete } = require('../controllers/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const {esRoleValido, existeEmail, existeUsuarioID} = require('../helpers/db_validators');
const router = Router(); 

router.get('/', usuarioGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
],usuarioPut);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail().custom(existeEmail),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 y menos de 15 caracteres').isLength({min: 6, max: 15}),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
],usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;