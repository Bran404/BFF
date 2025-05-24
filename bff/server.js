const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3001;
const BACKEND_URL = "http://localhost:3003"; 

app.use(cors());
app.use(express.json());

// Middleware para transformar datos
const transformTask = (task) => {
  console.log("🟨 BFF: Transformando tarea:", task);
  const transformed = {
    ...task,
    category: task.category.charAt(0).toUpperCase() + task.category.slice(1),
  };
  console.log("🟨 BFF: Tarea transformada:", transformed);
  return transformed;
};

// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  console.log("🟨 BFF: Recibida petición GET /tasks");
  console.log("🟨 BFF: Parámetros de consulta:", req.query);

  try {
    const { category } = req.query;
    const url =
      category && category !== "todas"
        ? `${BACKEND_URL}/tasks?category=${category}`
        : `${BACKEND_URL}/tasks`;

    console.log("🟨 BFF: Enviando petición al backend:", url);
    const response = await axios.get(url);
    console.log("🟨 BFF: Respuesta del backend:", response.data);

    const transformedTasks = response.data.map(transformTask);
    console.log("🟨 BFF: Enviando respuesta al frontend:", transformedTasks);
    res.json(transformedTasks);
  } catch (error) {
    console.error("❌ BFF: Error al obtener tareas:", error.message);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// Crear nueva tarea
app.post("/tasks", async (req, res) => {
  console.log("🟨 BFF: Recibida petición POST /tasks");
  console.log("🟨 BFF: Datos recibidos:", req.body);

  try {
    console.log("🟨 BFF: Enviando petición al backend");
    const response = await axios.post(`${BACKEND_URL}/tasks`, req.body);
    console.log("🟨 BFF: Respuesta del backend:", response.data);

    const transformedTask = transformTask(response.data);
    console.log("🟨 BFF: Enviando respuesta al frontend:", transformedTask);
    res.json(transformedTask);
  } catch (error) {
    console.error("❌ BFF: Error al crear tarea:", error.message);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

// Eliminar tarea
app.delete("/tasks/:id", async (req, res) => {
  console.log("🟨 BFF: Recibida petición DELETE /tasks/:id");
  console.log("🟨 BFF: ID de tarea a eliminar:", req.params.id);

  try {
    console.log("🟨 BFF: Enviando petición al backend");
    await axios.delete(`${BACKEND_URL}/tasks/${req.params.id}`);
    console.log("🟨 BFF: Tarea eliminada exitosamente en el backend");
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    console.error("❌ BFF: Error al eliminar tarea:", error.message);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

// Cambiar estado de tarea
app.put("/tasks/:id/toggle", async (req, res) => {
  console.log("🟨 BFF: Recibida petición PUT /tasks/:id/toggle");
  console.log("🟨 BFF: ID de tarea a actualizar:", req.params.id);

  try {
    console.log("🟨 BFF: Enviando petición al backend");
    const response = await axios.put(
      `${BACKEND_URL}/tasks/${req.params.id}/toggle`
    );
    console.log("🟨 BFF: Respuesta del backend:", response.data);

    const transformedTask = transformTask(response.data);
    console.log("🟨 BFF: Enviando respuesta al frontend:", transformedTask);
    res.json(transformedTask);
  } catch (error) {
    console.error("❌ BFF: Error al actualizar tarea:", error.message);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
});

app.listen(PORT, () => {
  console.log(`🟨 BFF: Servidor iniciado en http://localhost:${PORT}`);
});

app.get("/people", async (req, res) => {
  console.log("🟨 BFF: Recibida petición GET /people");
  console.log("🟨 BFF: Parámetros de consulta:", req.query);

  try {
    const response = await axios.get(`${BACKEND_URL}/people`);
    console.log("🟨 BFF: Respuesta del backend:", response.data);

    // No transformar, solo enviar
    res.json(response.data);
  } catch (error) {
    console.error("❌ BFF: Error al obtener personas:", error.message);
    res.status(500).json({ error: "Error al obtener personas" });
  }
});

// Crear nueva persona
app.post("/people", async (req, res) => {
  console.log("🟨 BFF: Recibida petición POST /people");
  console.log("🟨 BFF: Datos recibidos:", req.body);

  try {
    console.log("🟨 BFF: Enviando petición al backend");
    const response = await axios.post(`${BACKEND_URL}/people`, req.body);
    console.log("🟨 BFF: Respuesta del backend:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("❌ BFF: Error al crear persona:", error.message);
    res.status(500).json({ error: "Error al crear persona" });
  }
});

// Eliminar persona
app.delete("/people/:id", async (req, res) => {
  console.log("🟨 BFF: Recibida petición DELETE /people/:id");
  console.log("🟨 BFF: ID de persona a eliminar:", req.params.id);

  try {
    console.log("🟨 BFF: Enviando petición al backend");
    await axios.delete(`${BACKEND_URL}/people/${req.params.id}`);
    console.log("🟨 BFF: Persona eliminada exitosamente en el backend");
    res.json({ message: "Persona eliminada" });
  } catch (error) {
    console.error("❌ BFF: Error al eliminar persona:", error.message);
    res.status(500).json({ error: "Error al eliminar persona" });
  }
});

// Cambiar estado de persona
app.put("/people/:id/toggle", async (req, res) => {
  console.log("🟨 BFF: Recibida petición PUT /people/:id/toggle");
  console.log("🟨 BFF: ID de persona a actualizar:", req.params.id);

  try {
    console.log("🟨 BFF: Enviando petición al backend");
    const response = await axios.put(
      `${BACKEND_URL}/people/${req.params.id}/toggle`
    );
    console.log("🟨 BFF: Respuesta del backend:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("❌ BFF: Error al actualizar persona:", error.message);
    res.status(500).json({ error: "Error al actualizar persona" });
  }
});