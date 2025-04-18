const toggleBtn = document.getElementById("toggleTheme");
  const body = document.getElementById("pageBody");
  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentTheme = body.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    body.setAttribute("data-bs-theme", newTheme);

    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
  });

const addTaskBtn = document.querySelector('.btn-add-task-cs');
const taskList = document.getElementById('taskList');
const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
const newTaskInput = document.getElementById('newTaskInput');
const saveTaskBtn = document.getElementById('saveTask');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  
    filterTasks();

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
    addTaskModal.show();
});

saveTaskBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        tasks.push({
            text: taskText,
            completed: false
        });
        newTaskInput.value = '';
        addTaskModal.hide();
        renderTasks();
    }
});

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchTerm)
    );
    renderFilteredTasks(filteredTasks);
});

function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskElement.innerHTML = `
            <div class="d-flex align-items-center">
                <input type="checkbox" class="form-check-input me-2" ${task.completed ? 'checked' : ''}>
                <span class="${task.completed ? 'text-decoration-line-through' : ''}">${task.text}</span>
            </div>
            <button class="btn btn-danger btn-sm delete-task">
                <i class="bi bi-trash"></i>
            </button>
        `;
        taskList.appendChild(taskElement);
    });
}

const taskFilter = document.getElementById('taskFilter');

function filterTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = taskFilter.value;

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchTerm);
        const matchesFilter = 
            filterValue === 'ALL' ? true :
            filterValue === 'DONE' ? task.completed :
            filterValue === 'UNFINISHED' ? !task.completed :
            true;

        return matchesSearch && matchesFilter;
    });

    renderFilteredTasks(filteredTasks);
}

searchInput.addEventListener('input', filterTasks);
taskFilter.addEventListener('change', filterTasks);

function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskElement.innerHTML = `
            <div class="d-flex align-items-center">
                <input type="checkbox" class="form-check-input me-2" ${task.completed ? 'checked' : ''}>
                <span class="${task.completed ? 'text-decoration-line-through' : ''}">${task.text}</span>
            </div>
            <button class="btn btn-danger btn-sm delete-task">
                <i class="bi bi-trash"></i>
            </button>
        `;

        const checkbox = taskElement.querySelector('input[type="checkbox"]');
        const originalIndex = tasks.findIndex(t => t.text === task.text);
        checkbox.addEventListener('change', () => toggleTaskStatus(originalIndex));

        const deleteBtn = taskElement.querySelector('.delete-task');
        deleteBtn.addEventListener('click', () => deleteTask(originalIndex));

        taskList.appendChild(taskElement);
    });
}

renderTasks();


