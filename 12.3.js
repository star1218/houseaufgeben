const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');

// Видалення завдань через делегування подій
taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }
});

// Додавання нового завдання
addButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');

        li.innerHTML = taskText + ' <button class="delete">Видалити</button>';

        taskList.appendChild(li);

        taskInput.value = '';
    }
});