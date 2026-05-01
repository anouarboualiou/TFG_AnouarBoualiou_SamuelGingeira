const entrenadorModel = require('./entrenadores.model');

function getEntrenadores(req, res) {

    entrenadorModel.getAll((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
}

function getEntrenadorById(req, res) {

    const { id } = req.params;

    entrenadorModel.getById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Entrenador no encontrado'
            });
        }

        res.json(result[0]);
    });
}

function createEntrenador(req, res) {

    entrenadorModel.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: 'Entrenador creado',
            id: result.insertId
        });
    });
}

function updateEntrenador(req, res) {

    const { id } = req.params;

    entrenadorModel.update(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Entrenador no encontrado'
            });
        }

        res.json({
            message: 'Entrenador actualizado'
        });
    });
}

function deleteEntrenador(req, res) {

    const { id } = req.params;

    entrenadorModel.remove(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Entrenador no encontrado'
            });
        }

        res.json({
            message: 'Entrenador eliminado'
        });
    });
}

module.exports = {
    getEntrenadores,
    getEntrenadorById,
    createEntrenador,
    updateEntrenador,
    deleteEntrenador
};