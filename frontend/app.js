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
                <button onclick="deletePersona(${persona.id})">Eliminar</button>
            </div>
        `;
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