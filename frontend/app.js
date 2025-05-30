const BFF_URL = "http://localhost:3002";

//Mostrar el listado de personas en la interfaz
function displayPersonas(personas){
    console.log("🟦 Frontend: Mostrando personas en la interfaz");
    const personasList = document.getElementById("personasList");
    personasList.innerHTML = "";

    personas.forEach((persona) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>Nombre: ${persona.nombre} - Edad: ${persona.edad} - Hobbie: ${persona.hobbie}</span>
            <div class="task-actions">
                <button class="delete-btn" onclick="deletePersona(${persona.id})">Eliminar</button>
                <button class="edit-btn" onclick="formUpdate(${persona.id})">Editar</button>
            </div>
        `;
        li.className = "persona-item";
        personasList.appendChild(li);
    });
}

//Cargar personas
async function loadPersonas() {
    console.log("🟦 Frontend: Iniciando carga de tareas...");
    try {
        const response = await fetch(`${BFF_URL}/personas`);
        const data = await response.json();
        console.log("🟦 Frontend: Personas cargadas:", data);
        displayPersonas(data);
    } catch (error) {
        console.error("🟥 Frontend: Error al cargar personas:", error.message);
    }
}

//Agregar una persona
async function addPersona() {
const nombre = document.getElementById("personasInput");
const edad = document.getElementById("edadInput");
const hobbie = document.getElementById("hobbieSelect");

const persona = {
    nombre: nombre.value,
    edad: edad.value,
    hobbie: hobbie.value,
};
console.log("🟦 Frontend: Enviando petición para añadir persona", persona);

try {
    const response = await fetch(`${BFF_URL}/persona`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(persona),
    });

    if (response.ok) {
        console.log("🟦 Frontend: Persona añadida correctamente");
        nombre.value = "";
        edad.value = "";
        loadPersonas();
    }
} catch (error) {
    console.error("🟥 Frontend: Error al agregar persona:", error.message);
}
}
//Eliminar una persona
async function deletePersona(id) {
    console.log("🟦 Frontend: Enviando petición para eliminar persona con ID:", id);
    try {
        const response = await fetch(`${BFF_URL}/persona/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log("🟦 Frontend: Persona eliminada correctamente");
            loadPersonas();
        } else {
            throw new Error("Error al eliminar persona");
        }
    } catch (error) {
        console.error("🟥 Frontend: Error al eliminar persona:", error.message);
    }
}

async function formUpdate(id) {
    const response = await fetch(`${BFF_URL}/personas`);
    const personas = await response.json();
    const persona = personas.find(p => p.id === id);

    document.getElementById("personasInput").value = persona.nombre;
    document.getElementById("edadInput").value = persona.edad;
    document.getElementById("hobbieSelect").value = persona.hobbie.toLowerCase();

    document.getElementById("addButton").style.display = "none";
    const updateButton = document.getElementById("updateButton");
    updateButton.style.display = "block";

    updateButton.onclick = async function() {
        const personaUpdate = {
            nombre: document.getElementById("personasInput").value,
            edad: document.getElementById("edadInput").value,
            hobbie: document.getElementById("hobbieSelect").value,
        };
        await updatePersona(id, personaUpdate);
    };
}

async function updatePersona(id, persona) {
    console.log("🟦 Frontend: Enviando petición para actualizar persona con ID:", id);
    try {
        const response = await fetch(`${BFF_URL}/persona/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(persona),
        });

        if (response.ok) {
            console.log("🟦 Frontend: Persona actualizada correctamente");
            document.getElementById("addButton").style.display = "block";
            document.getElementById("updateButton").style.display = "none";
            document.getElementById("personasInput").value = "";
            document.getElementById("edadInput").value = "";
            loadPersonas();
        } else {
            throw new Error("Error al actualizar persona");
        }
    } catch (error) {
        console.error("🟥 Frontend: Error al actualizar persona:", error.message);
    }
}

//Filtrar personas por hobbie
async function filterHobbie() {
    const hobbie = document.getElementById("filterSelect").value;
    console.log("🟦 Frontend: Filtrando personas por hobbie:", hobbie);
    
    try {
        const response = await fetch(`${BFF_URL}/personas?hobbie=${hobbie}`);
        const data = await response.json();
        console.log("🟦 Frontend: Personas filtradas:", data);
        displayPersonas(data);
    } catch (error) {
        console.error("🟥 Frontend: Error al filtrar personas:", error.message);
    }
}

// Inicializar la aplicación
console.log("🟦 Frontend: Iniciando aplicación...");
loadPersonas();