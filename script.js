// Select the form and input elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load saved todos from localStorage
document.addEventListener('DOMContentLoaded', loadTodos);

// Add a new task when the form is submitted
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const task = todoInput.value.trim();
    
    if (task) {
        addTodo(task);
        saveTodoToLocalStorage(task);
        todoInput.value = '';
    }
});

// Function to add a new task to the list
function addTodo(task) {
    const li = document.createElement('li');
    li.innerHTML = `${task} <button class="delete-btn my-2">Delete</button>`;
    
    // Add event listener to delete button
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        removeTodoFromLocalStorage(task);
    });
    
    // Toggle completion state
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });
    
    todoList.appendChild(li);
}

// Save task to localStorage
function saveTodoToLocalStorage(task) {
    let todos = getTodosFromLocalStorage();
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get todos from localStorage
function getTodosFromLocalStorage() {
    let todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

// Load tasks from localStorage
function loadTodos() {
    let todos = getTodosFromLocalStorage();
    todos.forEach(task => {
        addTodo(task);
    });
}

// Remove task from localStorage
function removeTodoFromLocalStorage(task) {
    let todos = getTodosFromLocalStorage();
    todos = todos.filter(t => t !== task);
    localStorage.setItem('todos', JSON.stringify(todos));
}
