const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

// Base de datos en memoria
let personas = [];
let nextId = 1;

// Obtener todas las tareas
app.get("/people", (req, res) => {
  console.log("🟩 Backend: Recibida petición GET /people");
  console.log("🟩 Backend: Parámetros de consulta:", req.query);

  console.log("🟩 Backend: Enviando respuesta:", personas);
  res.json(personas);
});

// Crear nueva tarea
app.post("/people", (req, res) => {
  console.log("🟩 Backend: Recibida petición POST /tasks");
  console.log("🟩 Backend: Datos recibidos:", req.body);

  const { nombre, edad } = req.body;

  if (!nombre || !edad) {
    console.error("❌ Backend: Datos inválidos - nombre o edad faltantes");
    return res.status(400).json({ error: "nombre y edad son requeridos" });
  }

  const newPersona = {
    id: nextId++,
    nombre,
    edad,
    createdAt: new Date(),
  };

  console.log("🟩 Backend: Creando nueva tarea:", newPersona);
  personas.push(newPersona);
  console.log("🟩 Backend: Tarea creada exitosamente");
  res.status(201).json(newPersona);
});

// Eliminar tarea
app.delete("/people/:id", (req, res) => {
  console.log("🟩 Backend: Recibida petición DELETE /people/:id");
  console.log("🟩 Backend: ID de persona a eliminar:", req.params.id);

  const id = parseInt(req.params.id);
  const initialLength = personas.length;

  personas = personas.filter((persona) => persona.id !== id);

  if (personas.length === initialLength) {
    console.error("❌ Backend: Persona no encontrada");
    return res.status(404).json({ error: "Persona no encontrada" });
  }

  console.log("🟩 Backend: Persona eliminada exitosamente");
  res.json({ message: "Persona eliminada" });
});

// Cambiar estado de tarea
app.put("/people/:id/toggle", (req, res) => {
  console.log("🟩 Backend: Recibida petición PUT /people/:id/toggle");
  console.log("🟩 Backend: ID de persona a actualizar:", req.params.id);

  const id = parseInt(req.params.id);
  const persona = personas.find((persona) => persona.id === id);

  if (!persona) {
    console.error("❌ Backend: Persona no encontrada");
    return res.status(404).json({ error: "Persona no encontrada" });
  }

  persona.edad = persona.edad++;
  console.log("🟩 Backend: Estado de tarea actualizado:", persona);
  res.json(persona);
});

app.listen(PORT, () => {
  console.log(`🟩 Backend: Servidor iniciado en http://localhost:${PORT}`);
});
