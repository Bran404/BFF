const BFF_URL = "http://localhost:3001";

// Función para cargar las tareas
async function loadTasks() {
  console.log("🟦 Frontend: Iniciando carga de tareas...");
  try {
    const response = await fetch(`${BFF_URL}/tasks`);
    const tasks = await response.json();
    console.log("🟦 Frontend: Tareas recibidas:", tasks);
    displayTasks(tasks);
  } catch (error) {
    console.error("❌ Frontend: Error al cargar tareas:", error);
  }
}

// Función para mostrar las tareas
function displayTasks(tasks) {
  console.log("🟦 Frontend: Mostrando tareas en la interfaz");
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
            <span>${task.title} (${task.category})</span>
            <div class="task-actions">
                <button onclick="toggleTask(${task.id})">${
      task.completed ? "Deshacer" : "Completar"
    }</button>
                <button class="delete-btn" onclick="deleteTask(${
                  task.id
                })">Eliminar</button>
            </div>
        `;
    taskList.appendChild(li);
  });
}

// Función para agregar una tarea
async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const categorySelect = document.getElementById("categorySelect");

  const task = {
    title: taskInput.value,
    category: categorySelect.value,
  };

  console.log("🟦 Frontend: Enviando nueva tarea:", task);
  try {
    const response = await fetch(`${BFF_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      console.log("🟦 Frontend: Tarea creada exitosamente");
      taskInput.value = "";
      loadTasks();
    }
  } catch (error) {
    console.error("❌ Frontend: Error al agregar tarea:", error);
  }
}

// Función para eliminar una tarea
async function deleteTask(id) {
  console.log("🟦 Frontend: Eliminando tarea ID:", id);
  try {
    const response = await fetch(`${BFF_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("🟦 Frontend: Tarea eliminada exitosamente");
      loadTasks();
    }
  } catch (error) {
    console.error("❌ Frontend: Error al eliminar tarea:", error);
  }
}

// Función para marcar/desmarcar tarea como completada
async function toggleTask(id) {
  console.log("🟦 Frontend: Cambiando estado de tarea ID:", id);
  try {
    const response = await fetch(`${BFF_URL}/tasks/${id}/toggle`, {
      method: "PUT",
    });

    if (response.ok) {
      console.log("🟦 Frontend: Estado de tarea actualizado exitosamente");
      loadTasks();
    }
  } catch (error) {
    console.error("❌ Frontend: Error al actualizar tarea:", error);
  }
}

// Función para filtrar tareas
async function filterTasks() {
  const filterSelect = document.getElementById("filterSelect");
  const category = filterSelect.value;

  console.log("🟦 Frontend: Filtrando tareas por categoría:", category);
  try {
    const response = await fetch(`${BFF_URL}/tasks?category=${category}`);
    const tasks = await response.json();
    console.log("🟦 Frontend: Tareas filtradas recibidas:", tasks);
    displayTasks(tasks);
  } catch (error) {
    console.error("❌ Frontend: Error al filtrar tareas:", error);
  }
}

// Cargar tareas al iniciar
console.log("🟦 Frontend: Iniciando aplicación...");
loadTasks();
