const equipoModel = require('./equipos.model')


function getEquipos(req, res) {

    equipoModel.getAll((err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        res.json(result)
    })

}

function getEquipoById(req, res) {

    const { id } = req.params;

    equipoModel.getById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Equipo no encontrado'
            });
        }

        res.json(result[0]);
    });
}

function createEquipo(req, res) {

    equipoModel.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: 'Equipo creado correctamente',
            id: result.insertId
        });
    });
}

function updateEquipo(req, res) {

    const { id } = req.params;

    equipoModel.update(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Equipo no encontrado'
            });
        }

        res.json({
            message: 'Equipo actualizado correctamente'
        });
    });
}

function deleteEquipo(req, res) {

    const { id } = req.params;

    equipoModel.remove(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Equipo no encontrado'
            });
        }

        res.json({
            message: 'Equipo eliminado correctamente'
        });
    });
}

module.exports = { getEquipos, getEquipoById, createEquipo, updateEquipo, deleteEquipo }