const entrenadorModel = require('./entrenadores.model');

function getEntrenadores(req, res) {

    entrenadorModel.getAll((err, result) => {

        console.log(result);

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

function createEntrenadorFull(req, res) {

    const {
        nombre,
        apellidos,
        fecha_nacim,
        id_equipo,
        foto_perfil,
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y password requeridos' });
    }

    db.beginTransaction((err) => {
        if (err) return res.status(500).json(err);

        // 1️⃣ Crear ENTRENADOR
        const sqlEntrenador = `
            INSERT INTO ENTRENADOR (
                nombre,
                apellidos,
                fecha_nacim,
                id_equipo,
                foto_perfil
            ) VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sqlEntrenador, [
            nombre,
            apellidos,
            fecha_nacim,
            id_equipo,
            foto_perfil
        ], async (err, result) => {

            if (err) {
                return db.rollback(() => res.status(500).json(err));
            }

            const id_entrenador = result.insertId;

            try {
                // 2️⃣ Hash password
                const hash = await bcrypt.hash(password, 10);

                // 3️⃣ Crear USUARIO
                const sqlUsuario = `
                    INSERT INTO USUARIO (
                        email,
                        password_hash,
                        rol,
                        id_entrenador
                    ) VALUES (?, ?, 'entrenador', ?)
                `;

                db.query(sqlUsuario, [
                    email,
                    hash,
                    id_entrenador
                ], (err2) => {

                    if (err2) {
                        return db.rollback(() => res.status(500).json(err2));
                    }

                    // 4️⃣ Confirmar todo
                    db.commit((err3) => {
                        if (err3) {
                            return db.rollback(() => res.status(500).json(err3));
                        }

                        res.status(201).json({
                            message: 'Entrenador + usuario creado correctamente',
                            id_entrenador
                        });
                    });
                });

            } catch (error) {
                return db.rollback(() => res.status(500).json(error));
            }
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
    deleteEntrenador,
    createEntrenadorFull
};