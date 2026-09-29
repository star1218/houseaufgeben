const API_URL = 'http://localhost:3000/todos';

const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

async function loadTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.title;

        if (todo.completed) {
            text.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Видалити';

        checkbox.addEventListener('change', async () => {
            await updateTodo(todo._id, {
                completed: checkbox.checked
            });
        });

        deleteButton.addEventListener('click', async () => {
            await deleteTodo(todo._id);
        });

        li.append(checkbox, text, deleteButton);
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const title = todoInput.value.trim();

    if (title === '') {
        return;
    }

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title
        })
    });

    todoInput.value = '';
    loadTodos();
}

async function updateTodo(id, data) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    loadTodos();
}

addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

loadTodos();