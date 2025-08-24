// Todo App JavaScript
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.editingId = null;
        
        this.initializeEventListeners();
        this.render();
        this.updateStats();
    }

    // Load todos from localStorage
    loadTodos() {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : [];
    }

    // Save todos to localStorage
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Form submission
        const todoForm = document.getElementById('todoForm');
        todoForm.addEventListener('submit', (e) => this.handleSubmit(e));

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.handleSearch(e));

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.addEventListener('change', (e) => this.handleCategoryFilter(e));

        // Clear all button
        const clearAllBtn = document.getElementById('clearAllBtn');
        clearAllBtn.addEventListener('click', () => this.clearAllTodos());

        // Modal event listeners
        const closeModal = document.getElementById('closeModal');
        const cancelEdit = document.getElementById('cancelEdit');
        const editForm = document.getElementById('editTaskForm');
        
        closeModal.addEventListener('click', () => this.closeModal());
        cancelEdit.addEventListener('click', () => this.closeModal());
        editForm.addEventListener('submit', (e) => this.handleEditSubmit(e));

        // Close modal when clicking outside
        const modal = document.getElementById('taskModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();
        
        const taskInput = document.getElementById('taskInput');
        const categorySelect = document.getElementById('categorySelect');
        const prioritySelect = document.getElementById('prioritySelect');
        
        const text = taskInput.value.trim();
        if (!text) return;

        const newTodo = {
            id: this.generateId(),
            text: text,
            category: categorySelect.value,
            priority: prioritySelect.value,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.todos.unshift(newTodo);
        this.saveTodos();
        this.render();
        this.updateStats();

        // Reset form
        taskInput.value = '';
        categorySelect.value = 'personal';
        prioritySelect.value = 'low';

        // Show success feedback
        this.showNotification('Task added successfully!', 'success');
    }

    // Handle search
    handleSearch(e) {
        this.searchTerm = e.target.value.toLowerCase();
        this.render();
    }

    // Handle filter button clicks
    handleFilterClick(e) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        this.currentFilter = e.target.getAttribute('data-filter');
        this.render();
    }

    // Handle category filter
    handleCategoryFilter(e) {
        this.currentCategory = e.target.value;
        this.render();
    }

    // Toggle todo completion
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.completedAt = todo.completed ? new Date().toISOString() : null;
            this.saveTodos();
            this.render();
            this.updateStats();
            
            const message = todo.completed ? 'Task completed!' : 'Task marked as pending';
            this.showNotification(message, 'success');
        }
    }

    // Delete todo
    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.render();
            this.updateStats();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    // Edit todo
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            this.editingId = id;
            
            // Populate modal form
            document.getElementById('editTaskText').value = todo.text;
            document.getElementById('editTaskCategory').value = todo.category;
            document.getElementById('editTaskPriority').value = todo.priority;
            
            // Show modal
            document.getElementById('taskModal').classList.add('active');
        }
    }

    // Handle edit form submission
    handleEditSubmit(e) {
        e.preventDefault();
        
        if (!this.editingId) return;
        
        const todo = this.todos.find(t => t.id === this.editingId);
        if (todo) {
            todo.text = document.getElementById('editTaskText').value.trim();
            todo.category = document.getElementById('editTaskCategory').value;
            todo.priority = document.getElementById('editTaskPriority').value;
            
            this.saveTodos();
            this.render();
            this.closeModal();
            this.showNotification('Task updated successfully!', 'success');
        }
    }

    // Close modal
    closeModal() {
        document.getElementById('taskModal').classList.remove('active');
        this.editingId = null;
    }

    // Clear all todos
    clearAllTodos() {
        if (confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
            this.todos = [];
            this.saveTodos();
            this.render();
            this.updateStats();
            this.showNotification('All tasks cleared!', 'success');
        }
    }

    // Filter todos based on current filters
    getFilteredTodos() {
        let filtered = this.todos;

        // Filter by completion status
        if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        } else if (this.currentFilter === 'pending') {
            filtered = filtered.filter(t => !t.completed);
        }

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(t => t.category === this.currentCategory);
        }

        // Filter by search term
        if (this.searchTerm) {
            filtered = filtered.filter(t => 
                t.text.toLowerCase().includes(this.searchTerm)
            );
        }

        return filtered;
    }

    // Render todos
    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.style.display = 'none';
            emptyState.style.display = 'block';
            
            if (this.todos.length === 0) {
                emptyState.innerHTML = `
                    <div class="empty-icon">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <h3>No tasks yet!</h3>
                    <p>Add your first task above to get started with productivity.</p>
                `;
            } else {
                emptyState.innerHTML = `
                    <div class="empty-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>No matching tasks found!</h3>
                    <p>Try adjusting your search or filters.</p>
                `;
            }
        } else {
            todoList.style.display = 'grid';
            emptyState.style.display = 'none';
            
            todoList.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
            
            // Add event listeners to dynamically created elements
            this.attachTodoEventListeners();
        }
    }

    // Create HTML for a todo item
    createTodoHTML(todo) {
        const createdDate = new Date(todo.createdAt).toLocaleDateString();
        const createdTime = new Date(todo.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="todoApp.toggleTodo('${todo.id}')">
                </div>
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-meta">
                        <span class="category-badge ${todo.category}">${this.capitalize(todo.category)}</span>
                        <span class="priority-badge ${todo.priority}">${this.capitalize(todo.priority)} Priority</span>
                        <span class="todo-timestamp">${createdDate} at ${createdTime}</span>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="action-btn edit-btn" onclick="todoApp.editTodo('${todo.id}')" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="todoApp.deleteTodo('${todo.id}')" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Attach event listeners to todo items
    attachTodoEventListeners() {
        // Event delegation is used in the HTML onclick attributes
        // This method can be used for additional event listeners if needed
    }

    // Update statistics
    updateStats() {
        const totalTasks = this.todos.length;
        const completedTasks = this.todos.filter(t => t.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;
        document.getElementById('progressPercent').textContent = progressPercent + '%';
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Add notification styles if not already present
        if (!document.querySelector('.notification-styles')) {
            const style = document.createElement('style');
            style.className = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    background: rgba(15, 20, 25, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    z-index: 3000;
                    transform: translateX(100%);
                    transition: all 0.3s ease;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    border-left: 4px solid #10b981;
                }
                .notification-success i {
                    color: #10b981;
                }
            `;
            document.head.appendChild(style);
        }

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize the Todo App when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize Todo App
    window.todoApp = new TodoApp();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to add task
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const taskInput = document.getElementById('taskInput');
            if (taskInput && taskInput.value.trim()) {
                document.getElementById('todoForm').dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('taskModal');
            if (modal.classList.contains('active')) {
                todoApp.closeModal();
            }
        }
    });

    console.log('Todo App initialized successfully! 📝');
});