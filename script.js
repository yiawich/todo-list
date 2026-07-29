// Récupération des éléments HTML
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addbutton");
const taskList = document.getElementById("taskList");
const darkModeBtn = document.getElementById("darkModeBtn");
const taskCount = document.getElementById("taskCount");

// Création d'une tâche
function createTaskElement(taskText, isDone = false) {

    const li = document.createElement("li");

    // Création de la case à cocher
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isDone;

    // Ajout du texte de la tâche
    const span = document.createElement("span");
    span.textContent = taskText;

    // Ajoute le style si la tâche est terminée
    if (isDone) {
        li.classList.add("done");
    }

    // Change l'état de la tâche
    checkbox.addEventListener("change", () => {

        li.classList.toggle("done");

        saveTasks();
        updateTaskCount();

    });

    // Création du bouton supprimer
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    // Supprime la tâche
    deleteBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        li.remove();

        saveTasks();
        updateTaskCount();

    });


    // Ajout des éléments dans la tâche
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);


    return li;
}



// Ajouter une tâche
function addTask() {

    const taskText = taskInput.value.trim();


    // Vérifie si le champ est vide
    if (taskText === "") {

        alert("Écris une tâche !");

        return;

    }


    // Création et ajout de la tâche
    const li = createTaskElement(taskText);

    taskList.appendChild(li);


    saveTasks();

    updateTaskCount();


    // Vide le champ
    taskInput.value = "";

}

// Clique sur le bouton Ajouter
addButton.addEventListener("click", addTask);


// Ajouter avec la touche Entrée
taskInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        addTask();

    }

});


// Sauvegarder les tâches
function saveTasks() {

    const tasks = [];


    document.querySelectorAll("#taskList li").forEach(li => {

        const checkbox = li.querySelector("input");

        const span = li.querySelector("span");


        tasks.push({

            text: span.textContent,

            done: checkbox.checked

        });

    });


    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Charger les tâches sauvegardées
function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


    tasks.forEach(task => {

        const li = createTaskElement(
            task.text,
            task.done
        );


        taskList.appendChild(li);

    });

}

// Compteur des tâches restantes
function updateTaskCount() {

    const tasks = document.querySelectorAll("#taskList li");


    const remainingTasks = Array.from(tasks)
        .filter(task => !task.classList.contains("done"))
        .length;


    if (taskCount) {

        taskCount.textContent =
        `${remainingTasks} tâche${remainingTasks > 1 ? "s" : ""} restante${remainingTasks > 1 ? "s" : ""}`;

    }

}



// Mode sombre sauvegardé
if (localStorage.getItem("darkMode") === "enabled") {

    document.body.classList.add("dark");

}

// Activation du mode sombre
darkModeBtn.addEventListener("click", () => {


    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        localStorage.setItem("darkMode", "enabled");

    } else {

        localStorage.setItem("darkMode", "disabled");

    }


});


// Chargement au démarrage
loadTasks();

updateTaskCount();