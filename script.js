// créer un élément li
const li = document.createElement("li");
li.textContent = taskText;

// Quand on clique sur la tâche, elle est marquée comme terminée
li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
});

// bouton supprimer
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "❌";
deleteBtn.style.marginLeft = "10px";

// quand tu supprimes une tache
deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
});

li.appendChild(deleteBtn);
taskList.appendChild(li);

saveTasks();

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