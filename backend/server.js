const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

let personas = [];
let idPersona = 1;

//Obtener listado de personas
app.get('/personas', (req, res) => {
    console.log("🟩 Backend: Recibida petición GET /personas");
    console.log("🟩 Backend: Parámetros de consulta:", req.query);

    console.log("🟩 Backend: Enviando lista de personas: ",personas);
    res.json(personas);
});
//Agregar una persona
app.post('/persona', (req, res) => {
    console.log("🟩 Backend: Recibida petición POST /persona");
    console.log("🟩 Backend: Datos recibidos:", req.body);

    const { nombre, edad , hobbie} = req.body;
    if (!nombre || !edad) {
        console.log("🟥 Backend: Error - Datos incompletos");
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const nuevaPersona = {
        id: idPersona++,
        nombre,
        edad,
        hobbie,
        createdAt: new Date(),
    };

    console.log("🟩 Backend: Verificando persona", nuevaPersona);
    personas.push(nuevaPersona);
    console.log("🟩 Backend: Persona añadida");
    res.status(201).json(nuevaPersona);
});

// Eliminar una persona
app.delete('/persona/:id', (req, res) => {
    console.log("🟩 Backend: Recibida petición DELETE /persona/:id");
    console.log("🟩 Backend: ID de persona a eliminar:", req.params.id);

    const id = parseInt(req.params.id);
    const initialLength = personas.length;

    personas = personas.filter(persona => persona.id !== id);

    if (personas.length === initialLength) {
        console.log("🟥 Backend: Error - Persona no encontrada");
        return res.status(404).json({ error: "Persona no encontrada" });
    }

    console.log("🟩 Backend: Persona eliminada");
    res.json({ message: "Persona eliminada correctamente." });
});

// Actualizar una persona
app.put("/persona/:id", (req, res) => {
    console.log("🟩 Backend: Recibida petición PUT /persona/:id");
    console.log("🟩 Backend: ID de persona a actualizar:", req.params.id);

    const id = parseInt(req.params.id);
    const persona = personas.find((persona) => persona.id === id);

    if (!persona) {
        console.log("🟥 Backend: Error - Persona no encontrada");
        return res.status(404).json({ error: "Persona no encontrada" });
    }
    //Editar hoobie de persona
    persona.edad = persona.edad++;
    console.log("🟩 Backend: Persona actualizada", persona);
    res.json(persona);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🟩 Backend: Servidor escuchando en http://localhost:${PORT}`);
});

