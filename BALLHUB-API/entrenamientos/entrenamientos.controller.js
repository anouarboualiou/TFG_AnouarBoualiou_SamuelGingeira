const entrenamientoModel = require('./entrenamientos.model');

function getEntrenamientos(req, res) {

    entrenamientoModel.getAll((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
}

function getEntrenamientoById(req, res) {

    const { id } = req.params;

    entrenamientoModel.getById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Entrenamiento no encontrado'
            });
        }

        res.json(result[0]);
    });
}

function createEntrenamiento(req, res) {

    entrenamientoModel.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: 'Entrenamiento creado',
            id: result.insertId
        });
    });
}

function updateEntrenamiento(req, res) {

    const { id } = req.params;

    entrenamientoModel.update(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Entrenamiento no encontrado'
            });
        }

        res.json({
            message: 'Entrenamiento actualizado'
        });
    });
}

function updateAsistencia(req, res) {

    const { id } = req.params;

    entrenamientoModel.updateAsistencia(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Entrenamiento no encontrado'
            });
        }

        res.json({
            message: 'Asistencia actualizada'
        });
    });
}

function deleteEntrenamiento(req, res) {

    const { id } = req.params;

    entrenamientoModel.remove(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Entrenamiento no encontrado'
            });
        }

        res.json({
            message: 'Entrenamiento eliminado'
        });
    });
}

module.exports = {
    getEntrenamientos,
    getEntrenamientoById,
    createEntrenamiento,
    updateEntrenamiento,
    updateAsistencia,
    deleteEntrenamiento
};
