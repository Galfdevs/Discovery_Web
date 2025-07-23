$(document).ready(function () {

    function addTodoItem(text) {
        if (text === null || text.trim() === "") {
            return;
        }

        const $todoItem = $('<div class="todo-item"></div>').text(text);


        $todoItem.on('click', function () {
            if (confirm("¿Quieres eliminar esta tarea?")) {
                $(this).remove();
                saveTodos();
            }
        });

        $('#ft_list').prepend($todoItem);
        saveTodos();
    }


    function loadTodos() {
        const todos = Cookies.get('todoList');
        if (todos) {
            const todoArray = JSON.parse(todos);
            todoArray.forEach(function (itemText) {
                addTodoItem(itemText);
            });
        }
    }


    function saveTodos() {
        const todoArray = [];
        $('#ft_list .todo-item').each(function () {
            todoArray.push($(this).text());
        });
        Cookies.set('todoList', JSON.stringify(todoArray), { expires: 365 });
    }


    $('#new-todo-btn').on('click', function () {
        const todoText = prompt("Introduce una nueva tarea:");
        if (todoText !== null && todoText.trim() !== "") {
            addTodoItem(todoText);
        }
    });


    loadTodos();
});