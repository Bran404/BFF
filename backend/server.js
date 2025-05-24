const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Base de datos en memoria
let tasks = [];
let nextId = 1;

// Obtener todas las tareas
app.get("/tasks", (req, res) => {
  console.log("🟩 Backend: Recibida petición GET /tasks");
  console.log("🟩 Backend: Parámetros de consulta:", req.query);

  const { category } = req.query;
  let filteredTasks = tasks;

  if (category && category !== "todas") {
    console.log("🟩 Backend: Filtrando tareas por categoría:", category);
    filteredTasks = tasks.filter((task) => task.category === category);
  }

  console.log("🟩 Backend: Enviando respuesta:", filteredTasks);
  res.json(filteredTasks);
});

// Crear nueva tarea
app.post("/tasks", (req, res) => {
  console.log("🟩 Backend: Recibida petición POST /tasks");
  console.log("🟩 Backend: Datos recibidos:", req.body);

  const { title, category } = req.body;

  if (!title || !category) {
    console.error("❌ Backend: Datos inválidos - título o categoría faltante");
    return res.status(400).json({ error: "Título y categoría son requeridos" });
  }

  const newTask = {
    id: nextId++,
    title,
    category,
    completed: false,
    createdAt: new Date(),
  };

  console.log("🟩 Backend: Creando nueva tarea:", newTask);
  tasks.push(newTask);
  console.log("🟩 Backend: Tarea creada exitosamente");
  res.status(201).json(newTask);
});

// Eliminar tarea
app.delete("/tasks/:id", (req, res) => {
  console.log("🟩 Backend: Recibida petición DELETE /tasks/:id");
  console.log("🟩 Backend: ID de tarea a eliminar:", req.params.id);

  const id = parseInt(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === initialLength) {
    console.error("❌ Backend: Tarea no encontrada");
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  console.log("🟩 Backend: Tarea eliminada exitosamente");
  res.json({ message: "Tarea eliminada" });
});

// Cambiar estado de tarea
app.put("/tasks/:id/toggle", (req, res) => {
  console.log("🟩 Backend: Recibida petición PUT /tasks/:id/toggle");
  console.log("🟩 Backend: ID de tarea a actualizar:", req.params.id);

  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    console.error("❌ Backend: Tarea no encontrada");
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  task.completed = !task.completed;
  console.log("🟩 Backend: Estado de tarea actualizado:", task);
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`🟩 Backend: Servidor iniciado en http://localhost:${PORT}`);
});
