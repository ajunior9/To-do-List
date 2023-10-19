const addTask = document.getElementById('add-task');
const taskContainer = document.getElementById('task-container');
const inputTask = document.getElementById('input-task');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (const taskText of storedTasks) {
        createTask(taskText);
    }
});

addTask.addEventListener('click', function() {
    const taskText = inputTask.value.trim();
    if (taskText === "") {
        alert("Please Enter a task");
    } else {
        createTask(taskText);
        inputTask.value = "";
    }
});

function createTask(taskText) {
    const task = document.createElement('div');
    task.classList.add('task');

    const li = document.createElement('li');
    li.innerText = taskText;
    task.appendChild(li);

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkButton.classList.add('checkTask');
    task.appendChild(checkButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add('deleteTask');
    task.appendChild(deleteButton);

    taskContainer.appendChild(task);

    checkButton.addEventListener("click", function() {
        li.style.textDecoration = "line-through";
        updateLocalStorage();
    });

    deleteButton.addEventListener("click", function() {
        task.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('.task li')).map(li => li.innerText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}