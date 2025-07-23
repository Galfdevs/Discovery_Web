document.addEventListener('DOMContentLoaded', () => {
    const ftList = document.getElementById('ft_list');
    const newTodoBtn = document.getElementById('new-todo-btn');


    function createTodoElement(text) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.textContent = text;


        todoItem.addEventListener('click', () => {
            const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar la tarea: "${text}"?`);
            if (confirmDelete) {
                ftList.removeChild(todoItem);
                saveTodos();
            }
        });
        return todoItem;
    }


    function addTodo(text) {
        if (text.trim() === '') {
            alert('La tarea no puede estar vacía.');
            return;
        }
        const todoElement = createTodoElement(text);
        ftList.prepend(todoElement);
        saveTodos();
    }


    newTodoBtn.addEventListener('click', () => {
        const todoText = prompt('Introduce la nueva tarea:');
        if (todoText !== null && todoText.trim() !== '') {
            addTodo(todoText);
        }
    });



    const COOKIE_NAME = 'todoList';


    function saveTodos() {
        const todos = [];
        ftList.querySelectorAll('.todo-item').forEach(item => {
            todos.push(item.textContent);
        });

        const encodedTodos = btoa(JSON.stringify(todos));

        const d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${COOKIE_NAME}=${encodedTodos};${expires};path=/`;
    }


    function loadTodos() {
        const name = `${COOKIE_NAME}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                try {
                    const encodedTodos = c.substring(name.length, c.length);
                    const todos = JSON.parse(atob(encodedTodos));
                    todos.reverse().forEach(todoText => {
                        const todoElement = createTodoElement(todoText);
                        ftList.prepend(todoElement);
                    });
                } catch (e) {
                    console.error("Error al cargar las cookies:", e);
                }
                return;
            }
        }
    }


    loadTodos();
});