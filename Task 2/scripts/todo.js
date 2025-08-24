// To-Do List JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const clearAllBtn = document.getElementById('clearAll');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Todo data
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';
    let todoIdCounter = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    
    // Todo class
    class Todo {
        constructor(text) {
            this.id = todoIdCounter++;
            this.text = text.trim();
            this.completed = false;
            this.createdAt = new Date();
        }
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Add new todo
    function addTodo(text) {
        if (!text || text.trim() === '') {
            showToast('Please enter a task', 'error');
            return;
        }
        
        if (text.length > 100) {
            showToast('Task is too long (max 100 characters)', 'error');
            return;
        }
        
        const todo = new Todo(text);
        todos.unshift(todo); // Add to beginning
        saveTodos();
        renderTodos();
        updateStats();
        
        // Clear input
        todoInput.value = '';
        
        // Show success message
        showToast('Task added successfully!', 'success');
        
        // Add entrance animation
        const firstItem = todoList.querySelector('.todo-item');
        if (firstItem) {
            firstItem.style.opacity = '0';
            firstItem.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                firstItem.style.opacity = '1';
                firstItem.style.transform = 'translateX(0)';
            }, 100);
        }
    }
    
    // Toggle todo completion
    function toggleTodo(id) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
            updateStats();
            
            const action = todo.completed ? 'completed' : 'uncompleted';
            showToast(`Task ${action}!`, 'success');
        }
    }
    
    // Delete todo
    function deleteTodo(id) {
        const todoIndex = todos.findIndex(t => t.id === id);
        if (todoIndex > -1) {
            const todoItem = document.querySelector(`[data-id="${id}"]`);
            
            // Add exit animation
            if (todoItem) {
                todoItem.style.transition = 'all 0.3s ease';
                todoItem.style.opacity = '0';
                todoItem.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    todos.splice(todoIndex, 1);
                    saveTodos();
                    renderTodos();
                    updateStats();
                    showToast('Task deleted!', 'success');
                }, 300);
            }
        }
    }
    
    // Clear completed todos
    function clearCompleted() {
        const completedCount = todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            showToast('No completed tasks to clear', 'error');
            return;
        }
        
        if (confirm(`Delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            todos = todos.filter(t => !t.completed);
            saveTodos();
            renderTodos();
            updateStats();
            showToast(`${completedCount} completed task${completedCount > 1 ? 's' : ''} deleted!`, 'success');
        }
    }
    
    // Clear all todos
    function clearAll() {
        if (todos.length === 0) {
            showToast('No tasks to clear', 'error');
            return;
        }
        
        if (confirm(`Delete all ${todos.length} tasks? This cannot be undone.`)) {
            todos = [];
            saveTodos();
            renderTodos();
            updateStats();
            showToast('All tasks deleted!', 'success');
        }
    }
    
    // Filter todos
    function filterTodos() {
        switch(currentFilter) {
            case 'completed':
                return todos.filter(t => t.completed);
            case 'pending':
                return todos.filter(t => !t.completed);
            default:
                return todos;
        }
    }
    
    // Render todos
    function renderTodos() {
        const filteredTodos = filterTodos();
        
        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <li class="todo-empty">
                    <p>
                        ${currentFilter === 'completed' ? 'No completed tasks' : 
                          currentFilter === 'pending' ? 'No pending tasks' : 
                          'No tasks yet'}
                    </p>
                    ${currentFilter === 'all' ? '<p>Add a task above to get started!</p>' : ''}
                </li>
            `;
            return;
        }
        
        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
                <span class="todo-text" title="${escapeHtml(todo.text)}">${escapeHtml(todo.text)}</span>
                <button class="todo-delete" onclick="deleteTodo(${todo.id})" title="Delete task">×</button>
            </li>
        `).join('');
    }
    
    // Update statistics
    function updateStats() {
        const totalTasks = todos.length;
        const completedTasks = todos.filter(t => t.completed).length;
        
        totalTasksSpan.textContent = totalTasks;
        completedTasksSpan.textContent = completedTasks;
        
        // Update button states
        clearCompletedBtn.disabled = completedTasks === 0;
        clearAllBtn.disabled = totalTasks === 0;
    }
    
    // Set filter
    function setFilter(filter) {
        currentFilter = filter;
        
        // Update active filter button
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        renderTodos();
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Event listeners
    if (addTodoBtn && todoInput) {
        addTodoBtn.addEventListener('click', () => {
            addTodo(todoInput.value);
        });
        
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo(todoInput.value);
            }
        });
        
        todoInput.addEventListener('input', (e) => {
            const remainingChars = 100 - e.target.value.length;
            if (remainingChars < 20) {
                todoInput.style.borderColor = remainingChars < 0 ? '#ef4444' : '#f59e0b';
            } else {
                todoInput.style.borderColor = '';
            }
        });
    }
    
    if (clearCompletedBtn) {
        clearCompletedBtn.addEventListener('click', clearCompleted);
    }
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAll);
    }
    
    // Filter button listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });
    
    // Make functions global for onclick handlers
    window.toggleTodo = toggleTodo;
    window.deleteTodo = deleteTodo;
    
    // Initialize
    renderTodos();
    updateStats();
    
    console.log('Todo app initialized');
});