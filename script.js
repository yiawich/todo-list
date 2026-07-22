const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addbutton");
const taskList = document.getElementById("taskList");

// Ajouter une tâche
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Écris une tâche !");
        return;
    }

    // créer un élément li
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = taskText;

    li.appendChild(checkbox);
    li.appendChild(span);

    // Quand on clique sur la tâche, elle est marquée comme terminée
    li.addEventListener("click", () => {
        li.classList.toggle("done");
        saveTasks();
    });

    // bouton supprimer
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasks();

    taskInput.value = "";
}

// clic sur le bouton
addButton.addEventListener("click", addTask);


// touche Entrée
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});


// Sauvegarder les tâches
function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            done: li.classList.contains("done")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}