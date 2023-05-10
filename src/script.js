/* 
The interactive bit; allows for: 
  - Adding items to the to do list
  - Due dates
  - Delete individual list items
  - Delete all items
*/

const todoList = document.getElementById('todo-list');
const newTodo = document.getElementById('new-todo');
const addButton = document.getElementById('add-button');
const deleteAllButton = document.getElementById('delete-all-button');

// Saves to do list items 
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodoList() {
    todoList.innerHTML = '';

    // To do list items
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.dataset.index = index;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
        });

        // Input textbox
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.text;
        input.addEventListener('input', () => {
            todos[index].text = input.value;
            localStorage.setItem('todos', JSON.stringify(todos));
        });

        // Calendar date input
        const date = document.createElement('input');
        date.type = 'date';
        date.value = todo.dueDate || '';
        date.addEventListener('input', () => {
            todos[index].dueDate = date.value;
            localStorage.setItem('todos', JSON.stringify(todos));
        });

        // Individ. delete buttons for to do items
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            todos = todos.filter((_, i) => i !== index);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodoList();
        });

        // Adds & stores item qualities in to do list
        li.appendChild(checkbox);
        li.appendChild(input);
        li.appendChild(date);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

renderTodoList();

// Add button
addButton.addEventListener('click', () => {
    const text = newTodo.value.trim();
    if (text !== '') {
        todos.push({
            text,
            completed: false,
            dueDate: '',
        });
        newTodo.value = '';
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodoList();
    }
});

// Adds upon pressing Enter key
newTodo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const text = newTodo.value.trim();
        if (text !== '') {
            todos.push({
                text,
                completed: false,
                dueDate: '',
            });
            newTodo.value = '';
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodoList();
        }
    }
});

// Delete all button
deleteAllButton.addEventListener('click', () => {
    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList();
});
