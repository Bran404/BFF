const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3002;
const BACKEND_URL = 'http://localhost:3003';

app.use(cors());
app.use(express.json());

// Middleware para transformar datos
const transformData = (data) => {
    console.log("🟨 BFF: Transformando datos de persona:", data)
    const transformedData = {
        ...data,
        hobbie: data.hobbie.charAt(0).toUpperCase() + data.hobbie.slice(1),
    };
    console.log("🟨 BFF: Datos transformados:", transformedData);
    return transformedData;
};

// Obtener listado de personas
app.get('/personas', async (req, res) => {
    console.log("🟨 BFF: Recibida petición GET /personas");
    console.log("🟨 BFF: Parámetros de consulta:", req.query);

    try {
        const { hobbie } = req.query;
        const url = hobbie && hobbie !== "Todas" ? `${BACKEND_URL}/personas?hobbie=${hobbie}` : BACKEND_URL + "/personas";
        
        console.log("🟨 BFF: Enviando petición al backend:", url);
        const response = await axios.get(url);
        console.log("🟨 BFF: Enviando lista de personas:", response.data);

        const transformedData = response.data.map(transformData);
        console.log("🟨 BFF: Datos transformados:", transformedData);
        res.json(transformedData);
    } catch (error) {
        console.error("🟥 BFF: Error al obtener personas:", error.message);
        res.status(500).json({ error: "Error al obtener personas" });
    }
});

// Agregar una persona
app.post("/persona", async (req, res) => {
    console.log("🟨 BFF: Recibida petición POST /persona");
    console.log("🟨 BFF: Datos recibidos:", req.body);

    try {
        console.log("🟨 BFF: Enviando petición al backend");
        const response = await axios.post(`${BACKEND_URL}/persona`, req.body);
        console.log("🟨 BFF: Persona añadida:", response.data);

        const transformedData = transformData(response.data);
        console.log("🟨 BFF: Enviando respuesta al frontend:", transformedData)
        res.json(transformedData);
    } catch (error) {
        console.error("🟥 BFF: Error al agregar persona:", error.message);
        res.status(500).json({ error: "Error al agregar persona" });
    }
});

// Eliminar una persona
app.delete("/persona/:id", async (req, res) => {
    console.log("🟨 BFF: Recibida petición DELETE /persona/:id");
    console.log("🟨 BFF: ID de persona a eliminar:", req.params.id);
    try {
        console.log("🟨 BFF: Enviando petición al backend");
        const response = await axios.delete(`${BACKEND_URL}/persona/${req.params.id}`);
        console.log("🟨 BFF: Persona eliminada:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("🟥 BFF: Error al eliminar persona:", error.message);
        res.status(500).json({ error: "Error al eliminar persona" });
    }
});

// Actualizar una persona
app.put("/persona/:id", async (req, res) => {
    console.log("🟨 BFF: Recibida petición PUT /persona/:id");
    console.log("🟨 BFF: ID de persona a actualizar:", req.params.id);
    console.log("🟨 BFF: Datos recibidos:", req.body);

    try {
        console.log("🟨 BFF: Enviando petición al backend");
        const response = await axios.put(`${BACKEND_URL}/persona/${req.params.id}`, req.body);
        console.log("🟨 BFF: Persona actualizada:", response.data);

        const transformedData = transformData(response.data);
        console.log("🟨 BFF: Enviando respuesta al frontend:", transformedData)
        res.json(transformedData);
    } catch (error) {
        console.error("🟥 BFF: Error al actualizar persona:", error.message);
        res.status(500).json({ error: "Error al actualizar persona" });
    }
});

app.listen(PORT, () => {
    console.log(`🟨 BFF: Servidor BFF iniciado en http://localhost:${PORT}`);
});
