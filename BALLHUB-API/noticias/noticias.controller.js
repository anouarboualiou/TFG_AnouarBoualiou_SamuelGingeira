const noticiaModel = require('./noticias.model');

function getNoticias(req, res) {

    const { equipo } = req.query;



    noticiaModel.getByEquipo(equipo || null, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

}

function getNoticiaById(req, res) {

    const { id } = req.params;

    noticiaModel.getById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Noticia no encontrada'
            });
        }

        res.json(result[0]);
    });
}

function createNoticia(req, res) {

    noticiaModel.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: 'Noticia creada',
            id: result.insertId
        });
    });
}

function updateNoticia(req, res) {

    const { id } = req.params;

    noticiaModel.update(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Noticia no encontrada'
            });
        }

        res.json({
            message: 'Noticia actualizada'
        });
    });
}

function deleteNoticia(req, res) {

    const { id } = req.params;

    noticiaModel.remove(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Noticia no encontrada'
            });
        }

        res.json({
            message: 'Noticia eliminada'
        });
    });
}

module.exports = {
    getNoticias,
    getNoticiaById,
    createNoticia,
    updateNoticia,
    deleteNoticia
};