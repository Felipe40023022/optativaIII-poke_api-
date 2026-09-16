let { pokemons } = require('../data/pokemon.data');

// Las 6 estadísticas requeridas
const STATS_REQUERIDAS = ['ps', 'ataque', 'defensa', 'ataque_especial', 'defensa_especial', 'velocidad'];

// Función auxiliar para validar estadísticas
const validarEstadisticas = (estadisticas) => {
    if (!estadisticas || typeof estadisticas !== 'object') return false;
    return STATS_REQUERIDAS.every(stat => typeof estadisticas[stat] === 'number' && estadisticas[stat] >= 0);
};

// GET /api/pokemon - Obtener todos
const getPokemons = (req, res) => {
    try {
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

// GET /api/pokemon/:id - Obtener por ID
const getPokemonById = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ mensaje: "El ID proporcionado debe ser un número entero válido" });
    }

    const pokemon = pokemons.find(p => p.id === id);

    if (!pokemon) {
        return res.status(404).json({ mensaje: `Pokémon con ID ${id} no encontrado` });
    }

    res.status(200).json(pokemon);
};

// POST /api/pokemon - Crear un Pokémon
const createPokemon = (req, res) => {
    const { id, nombre, foto, estadisticas } = req.body;
    const numericId = parseInt(id, 10);

    // Validación de campos obligatorios básicos
    if (!numericId || !nombre || !foto || !estadisticas) {
        return res.status(400).json({
            mensaje: "Faltan datos obligatorios (id, nombre, foto, estadisticas)"
        });
    }

    // Validación de las 6 estadísticas principales
    if (!validarEstadisticas(estadisticas)) {
        return res.status(400).json({
            mensaje: "Las estadísticas deben incluir valores numéricos para: ps, ataque, defensa, ataque_especial, defensa_especial y velocidad"
        });
    }

    // Comprobar si ya existe el ID
    const existe = pokemons.find(p => p.id === numericId);
    if (existe) {
        return res.status(409).json({ mensaje: `Ya existe un Pokémon con el ID ${numericId}` });
    }

    const nuevoPokemon = {
        id: numericId,
        nombre: nombre.trim(),
        foto: foto.trim(),
        estadisticas: {
            ps: Number(estadisticas.ps),
            ataque: Number(estadisticas.ataque),
            defensa: Number(estadisticas.defensa),
            ataque_especial: Number(estadisticas.ataque_especial),
            defensa_especial: Number(estadisticas.defensa_especial),
            velocidad: Number(estadisticas.velocidad)
        }
    };

    pokemons.push(nuevoPokemon);
    res.status(201).json(nuevoPokemon);
};

// PUT /api/pokemon/:id - Actualizar
const updatePokemon = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ mensaje: "El ID proporcionado debe ser un número entero válido" });
    }

    const index = pokemons.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ mensaje: `Pokémon con ID ${id} no encontrado para actualizar` });
    }

    const { nombre, foto, estadisticas } = req.body;

    // Si se envían estadísticas para actualizar, deben estar completas
    if (estadisticas && !validarEstadisticas(estadisticas)) {
        return res.status(400).json({
            mensaje: "Las estadísticas a actualizar deben contener todos los campos numéricos requeridos"
        });
    }

    pokemons[index] = {
        id, // El ID se conserva intacto
        nombre: nombre ? nombre.trim() : pokemons[index].nombre,
        foto: foto ? foto.trim() : pokemons[index].foto,
        estadisticas: estadisticas ? {
            ps: Number(estadisticas.ps),
            ataque: Number(estadisticas.ataque),
            defensa: Number(estadisticas.defensa),
            ataque_especial: Number(estadisticas.ataque_especial),
            defensa_especial: Number(estadisticas.defensa_especial),
            velocidad: Number(estadisticas.velocidad)
        } : pokemons[index].estadisticas
    };

    res.status(200).json(pokemons[index]);
};

// DELETE /api/pokemon/:id - Eliminar
const deletePokemon = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ mensaje: "El ID proporcionado debe ser un número entero válido" });
    }

    const index = pokemons.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ mensaje: `Pokémon con ID ${id} no encontrado para eliminar` });
    }

    pokemons.splice(index, 1);
    res.status(200).json({ mensaje: `Pokémon con ID ${id} eliminado correctamente` });
};

module.exports = {
    getPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon
};