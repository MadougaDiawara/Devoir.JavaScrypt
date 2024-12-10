// Sélection des éléments
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
let tasks = [];

// Ajouter une tâche
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const task = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        todoInput.value = '';
    }
}

// Basculer le statut d'une tâche
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
    );
    renderTasks();
}

// Supprimer une tâche
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Supprimer toutes les tâches
function deleteAllTasks() {
    // Confirmation avant de supprimer toutes les tâches
    const confirmDelete = confirm('Voulez-vous vraiment supprimer toutes les tâches ?');
    if (confirmDelete) {
        tasks = []; // Vide le tableau de tâches
        renderTasks();
    }
}

// Afficher les tâches
function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Restaurer' : 'Terminer'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Supprimer</button>
            </div>
        `;
        todoList.appendChild(li);
    });
    // Mettre à jour les statistiques
    totalTasksSpan.textContent = tasks.length;
    completedTasksSpan.textContent = tasks.filter(task => task.completed).length;
}

// Événements
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initialisation
renderTasks();