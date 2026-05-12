const usuariosModel = require('./usuarios.model')
const bcrypt = require('bcrypt')

function getUsuarios(req, res){

    usuariosModel.getAll((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result)
    })
}

function getUsuarioById(req, res){

    const {id} = req.params

    usuariosModel.getById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        res.json(result[0]);
    })
}

function createUsuario(req, res){

    const { email, password, rol, id_entrenador } = req.body

    bcrypt.hash(password, 10, (err, hash) => {

        if (err) {
            return res.status(500).json(err);
        }

        usuariosModel.create({
            email,
            password_hash: hash,
            rol,
            id_entrenador
        }, (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: 'Usuario creado',
                id: result.insertId
            })
        })
    })
}

function updateUsuario(req, res) {

    const { id } = req.params;

    const {
        email,
        password,
        rol,
        id_entrenador
    } = req.body;

    // SI CAMBIA PASSWORD
    if (password) {

        bcrypt.hash(password, 10, (err, hash) => {

            if (err) {
                return res.status(500).json(err);
            }

            usuariosModel.update(
                id,
                {
                    email,
                    password_hash: hash,
                    rol,
                    id_entrenador
                },
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.json({
                        message: 'Usuario actualizado'
                    });

                }
            );

        });

    }

    // SIN CAMBIAR PASSWORD
    else {

        usuariosModel.update(
            id,
            {
                email,
                rol,
                id_entrenador
            },
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: 'Usuario actualizado'
                });

            }
        );

    }

}

function deleteUsuario(req, res){

    const {id} = req.params

    usuariosModel.remove(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Usuario eliminado'
        })
    })
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
}