const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('taskButton');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');

// Loads tasks, if none, creates array
const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

// Clear button event listener
clearButton.addEventListener('click', () => {
    tasks.length = 0;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskList.innerHTML = '';
});

// Renders tasks
function renderTasks() {
    taskList.innerHTML = '';

    // Iterates through the array and creates a list
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', () => {
            toggleTask(index);
        
        });
        li.appendChild(checkbox);
        
        // Creates a span element for text tasks in order to be able to click on them and edit them
        const taskText = document.createElement('span');
        taskText.textContent = task.name;
        
        taskText.addEventListener('click', () => {
            enterEditMode(taskText, index);
        });

        li.appendChild(taskText);
        taskList.appendChild(li);
    });
}
        
// Creates and edit mode in order to edit already made tasks
function enterEditMode(taskTextElement, index) {
    const newText = prompt('Edit: ', taskTextElement.textContent);
    if (newText !== null) {
        tasks[index].name = newText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskTextElement.textContent = newText.trim();

    }

}


// Adds new task
taskButton.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        // Adds task
        tasks.push({ name: taskName, completed: false });

        // Saves updated tasks 
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Clears field
        taskInput.value = '';

        // Renders task
        renderTasks();
    }
});

// Toggles the completion of tasks
function toggleTask(index) {
    // Toggles
    tasks[index].completed = !tasks[index].completed;

    const listItem = taskList.children[index];

    // Adds or removes completion based on status
    if (tasks[index].completed) {
        listItem.classList.add('completed');
    } else {
        listItem.classList.remove('completed');
    }

    li.appendChild(listItem)

    // Saves
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Renders
    renderTasks();
}

renderTasks();
