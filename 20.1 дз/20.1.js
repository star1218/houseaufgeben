$(document).ready(function () {

    let tasks = JSON.parse(localStorage.getItem('tasks20')) || [];

    function saveTasks() {
        localStorage.setItem('tasks20', JSON.stringify(tasks));
    }

    function renderTasks() {
        $('#taskList').empty();

        $.each(tasks, function (index, task) {

            const item = $('<li>').addClass('list-group-item');

            const checkbox = $('<input>')
                .attr('type', 'checkbox')
                .addClass('form-check-input')
                .prop('checked', task.completed);

            const text = $('<span>')
                .addClass('task-text')
                .text(task.text);

            const deleteButton = $('<button>')
                .addClass('btn btn-danger btn-sm')
                .text('Видалити');

            if (task.completed) {
                text.addClass('completed');
            }

            checkbox.on('change', function () {
                tasks[index].completed = $(this).prop('checked');

                saveTasks();
                renderTasks();
            });

            deleteButton.on('click', function (event) {
                event.stopPropagation();

                tasks.splice(index, 1);

                saveTasks();
                renderTasks();
            });

            text.on('click', function () {
                $('#modalTaskText').text(task.text);

                const modal = new bootstrap.Modal(
                    document.getElementById('taskModal')
                );

                modal.show();
            });

            item.append(checkbox, text, deleteButton);

            $('#taskList').append(item);
        });
    }

    function addTask() {
        const taskText = $('#taskInput').val().trim();

        if (taskText === '') {
            return;
        }

        tasks.push({
            text: taskText,
            completed: false
        });

        saveTasks();

        $('#taskInput').val('');

        renderTasks();
    }

    $('#addTask').on('click', function () {
        addTask();
    });

    $('#taskInput').on('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});