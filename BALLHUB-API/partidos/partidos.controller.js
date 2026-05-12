const partidoModel = require('./partidos.model')

function getPartidos(req, res) {

    const { equipo, estado } = req.query;

    partidoModel.getByFiltros(

        equipo || null,
        estado || null,

        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

}

function getPartidoById(req, res){

    const {id} = req.params

    partidoModel.getById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Partido no encontrado'
            })
        }

        res.json(result[0]);
    })
}


function createPartido(req, res){

    partidoModel.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: 'Partido creado',
            id: result.insertId
        })
    })
}

function updatePartido(req, res) {

    const { id } = req.params;

    partidoModel.update(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Partido no encontrado'
            });
        }

        res.json({
            message: 'Partido actualizado'
        });
    });
}


function updateResultado(req, res) {

    const { id } = req.params;

    partidoModel.updateResultado(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Partido no encontrado'
            });
        }

        res.json({
            message: 'Resultado añadido'
        });
    });
}


function deletePartido(req, res){

    const {id} = req.params

     partidoModel.remove(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Partido eliminado'
        })
    })
}


module.exports = {getPartidos, getPartidoById, createPartido, updatePartido, updateResultado, deletePartido}