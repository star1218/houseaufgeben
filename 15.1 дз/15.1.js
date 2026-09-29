const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');


// Отримуємо завдання з LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Зберігаємо завдання
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Відображаємо список
function renderTasks() {

    taskList.innerHTML = '';

    tasks.forEach(function (task, index) {

        const li = document.createElement('li');

        li.classList.add('task');

        if (task.completed) {
            li.classList.add('completed');
        }


        // Checkbox
        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;


        // Текст завдання
        const text = document.createElement('span');

        text.classList.add('task-text');
        text.textContent = task.text;


        // Кнопка видалення
        const deleteButton = document.createElement('button');

        deleteButton.textContent = 'Видалити';
        deleteButton.classList.add('delete-button');


        // Виконане / невиконане
        checkbox.addEventListener('change', function () {

            tasks[index].completed = checkbox.checked;

            saveTasks();
            renderTasks();

        });


        // Видалення
        deleteButton.addEventListener('click', function () {

            tasks.splice(index, 1);

            saveTasks();
            renderTasks();

        });


        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


// Додавання нового завдання
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = '';
}


// Кнопка "Додати"
addButton.addEventListener('click', addTask);


// Додавання через Enter
taskInput.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
        addTask();
    }

});


// Показуємо збережені завдання при запуску
renderTasks();