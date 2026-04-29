const jugadorModel = require('./jugadores.model')

function getJugadores(req, res){

    jugadorModel.getAll((err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        res.json(result)
    })

}

function getJugadorById(req, res){

    const {id} = req.params

    jugadorModel.getById(id, (err, result) => {

        if(err){
            return res.status(500).json(err)

        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Jugador no encontrado'
            })
        }

        res.json(result[0])
    })
    
}

function createJugador(req, res){

    jugadorModel.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: 'Jugador creado',
            id: result.insertId
        })

    })
    
}

function updateJugador(req, res){

    const {id} = req.params

    jugadorModel.update(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Jugador no encontrado'
            });
        }

        res.json({
            message: 'Jugador actualizado'
        });
    })
    
}

function deleteJugador(req, res){

    const {id} = req.params

    jugadorModel.remove(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Jugador no encontrado'
            })
        }

        res.json({
            message: 'Jugador eliminado'
        })

    })
    
}


module.exports = { getJugadores, getJugadorById, createJugador, updateJugador, deleteJugador} 