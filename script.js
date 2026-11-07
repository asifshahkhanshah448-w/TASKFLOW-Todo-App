/**
 * TASKFLOW - Vanilla JavaScript Application
 * Project: Web Development Internship - Task 2
 * Author: Student Intern
 * 
 * Features:
 * - Add task with validation (no whitespace / empty tasks)
 * - Complete / Toggle task with line-through effect
 * - Delete task instantly with smooth animation
 * - Live Dashboard counters: Total, Completed, Remaining, Progress Bar
 * - Real-time Filter tabs (All, Active, Completed) & Search
 * - Priority tagging (Low, Medium, High)
 * - LocalStorage state persistence
 * - Event delegation for high performance
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const emptyState = document.getElementById('empty-state');
  
  // Dashboard Counters
  const totalCountEl = document.getElementById('total-count');
  const completedCountEl = document.getElementById('completed-count');
  const remainingCountEl = document.getElementById('remaining-count');
  const progressPercentEl = document.getElementById('progress-percent');
  const progressFillEl = document.getElementById('progress-fill');
  
  // Controls
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('search-input');
  const clearCompletedBtn = document.getElementById('clear-completed-btn');
  const priorityBtns = document.querySelectorAll('.priority-btn');

  // Application State
  const STORAGE_KEY = 'taskflow_tasks_v1';
  let currentFilter = 'all';
  let searchQuery = '';
  let selectedPriority = 'low';

  // Starter demo tasks if first time visiting
  const defaultTasks = [
    {
      id: 'task-1',
      text: 'Review Web Development Internship Task 2 guidelines',
      completed: true,
      priority: 'high',
      createdAt: 'Today, 9:00 AM'
    },
    {
      id: 'task-2',
      text: 'Test TaskFlow: Add, complete, and delete tasks',
      completed: false,
      priority: 'medium',
      createdAt: 'Today, 10:15 AM'
    },
    {
      id: 'task-3',
      text: 'Push completed project to GitHub repository',
      completed: false,
      priority: 'high',
      createdAt: 'Today, 11:30 AM'
    }
  ];

  // Initialize tasks from LocalStorage or default
  let tasks = loadTasks();

  function loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage unavailable, running in-memory mode:', e);
    }
    return [...defaultTasks];
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Failed to save to LocalStorage:', e);
    }
  }

  /**
   * Helper: Format timestamp
   */
  function getCurrentTimeFormatted() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `Today, ${formattedHours}:${minutes} ${ampm}`;
  }

  /**
   * Updates Dashboard Statistics and Progress Bar
   */
  function updateDashboard() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Update Counter Elements
    if (totalCountEl) totalCountEl.textContent = total;
    if (completedCountEl) completedCountEl.textContent = completed;
    if (remainingCountEl) remainingCountEl.textContent = remaining;
    
    // Update Progress Bar
    if (progressPercentEl) progressPercentEl.textContent = `${percentage}%`;
    if (progressFillEl) progressFillEl.style.width = `${percentage}%`;

    // Toggle Clear Completed Button visibility/state
    if (clearCompletedBtn) {
      clearCompletedBtn.style.display = completed > 0 ? 'inline-block' : 'none';
    }
  }

  /**
   * Renders the filtered and searched task list
   */
  function renderTasks() {
    // Filter tasks based on current tab
    let visibleTasks = tasks.filter(task => {
      if (currentFilter === 'active') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true; // 'all'
    });

    // Apply search filter if query is entered
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      visibleTasks = visibleTasks.filter(task =>
        task.text.toLowerCase().includes(query)
      );
    }

    // Toggle empty state
    if (visibleTasks.length === 0) {
      taskList.innerHTML = '';
      emptyState.style.display = 'flex';

      const emptyTitle = emptyState.querySelector('.empty-title');
      const emptyDesc = emptyState.querySelector('.empty-desc');

      if (tasks.length === 0) {
        if (emptyTitle) emptyTitle.textContent = 'No tasks yet';
        if (emptyDesc) emptyDesc.textContent = 'Your task list is clean and clear. Add a task above to get started!';
      } else if (currentFilter === 'completed') {
        if (emptyTitle) emptyTitle.textContent = 'No completed tasks';
        if (emptyDesc) emptyDesc.textContent = 'Finish a task to see it in your completed achievements!';
      } else if (currentFilter === 'active') {
        if (emptyTitle) emptyTitle.textContent = 'All caught up!';
        if (emptyDesc) emptyDesc.textContent = 'You have completed all your tasks. Great job!';
      } else {
        if (emptyTitle) emptyTitle.textContent = 'No matches found';
        if (emptyDesc) emptyDesc.textContent = `No tasks matching "${searchQuery}".`;
      }
    } else {
      emptyState.style.display = 'none';
      
      // Render task items
      taskList.innerHTML = visibleTasks.map(task => createTaskHTML(task)).join('');
    }

    updateDashboard();
  }

  /**
   * Generates HTML markup for a single task item
   */
  function createTaskHTML(task) {
    const isCompletedClass = task.completed ? 'completed' : '';
    const priority = task.priority || 'low';
    
    return `
      <li class="task-item ${isCompletedClass}" data-id="${task.id}" data-priority="${priority}">
        <div class="task-main">
          <button 
            type="button" 
            class="task-checkbox-btn" 
            aria-label="${task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}"
            title="${task.completed ? 'Mark incomplete' : 'Mark complete'}"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
          
          <div class="task-content">
            <span class="task-text">${escapeHTML(task.text)}</span>
            <div class="task-meta">
              <span class="priority-tag ${priority}">${priority}</span>
              <span>•</span>
              <span class="task-time">${task.createdAt || 'Just now'}</span>
            </div>
          </div>
        </div>

        <button 
          type="button" 
          class="btn-delete" 
          aria-label="Delete task" 
          title="Delete task"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </li>
    `;
  }

  /**
   * Helper: Escape HTML to prevent XSS
   */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Add a new task
   */
  function handleAddTask(e) {
    if (e) e.preventDefault();

    const rawText = taskInput.value.trim();

    // Prevent empty or whitespace-only tasks
    if (!rawText) {
      taskInput.classList.add('input-error');
      taskInput.placeholder = 'Please enter a task name...';
      taskInput.focus();

      setTimeout(() => {
        taskInput.classList.remove('input-error');
        taskInput.placeholder = 'Add a new task... e.g. Finish JavaScript assignment';
      }, 1500);
      return;
    }

    const newTask = {
      id: 'task-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      text: rawText,
      completed: false,
      priority: selectedPriority,
      createdAt: getCurrentTimeFormatted()
    };

    // Add to beginning of array
    tasks.unshift(newTask);
    saveTasks();

    // Reset input
    taskInput.value = '';
    taskInput.focus();

    // Render immediately
    renderTasks();

    // Add slide-in animation to top item
    const firstItem = taskList.firstElementChild;
    if (firstItem) {
      firstItem.classList.add('adding');
    }
  }

  /**
   * Toggle task completion state
   */
  function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }

  /**
   * Delete a task
   */
  function deleteTask(taskId, itemElement) {
    if (itemElement) {
      itemElement.classList.add('deleting');
      setTimeout(() => {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks();
        renderTasks();
      }, 200);
    } else {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks();
      renderTasks();
    }
  }

  /**
   * Clear all completed tasks
   */
  function clearAllCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
  }

  // ==========================================
  // EVENT LISTENERS & EVENT DELEGATION
  // ==========================================

  // 1. Form Submit for Adding Task
  if (taskForm) {
    taskForm.addEventListener('submit', handleAddTask);
  }

  // 2. Event Delegation on Task List
  // Efficiently handles Toggle and Delete without attaching listeners to every item
  if (taskList) {
    taskList.addEventListener('click', (event) => {
      const target = event.target;
      const taskItem = target.closest('.task-item');
      if (!taskItem) return;

      const taskId = taskItem.dataset.id;

      // Clicked Checkbox Button (or icon inside it)
      const checkboxBtn = target.closest('.task-checkbox-btn');
      if (checkboxBtn) {
        toggleTaskComplete(taskId);
        return;
      }

      // Clicked Delete Button (or icon inside it)
      const deleteBtn = target.closest('.btn-delete');
      if (deleteBtn) {
        deleteTask(taskId, taskItem);
        return;
      }

      // If user clicked the task text itself, toggle completion as a convenience
      if (target.classList.contains('task-text')) {
        toggleTaskComplete(taskId);
      }
    });
  }

  // 3. Priority Selector Buttons
  priorityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      priorityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPriority = btn.dataset.priority || 'low';
      taskInput.focus();
    });
  });

  // 4. Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter || 'all';
      renderTasks();
    });
  });

  // 5. Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderTasks();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchQuery = '';
        renderTasks();
      }
    });
  }

  // 6. Clear Completed Button
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', clearAllCompleted);
  }

  // Initial Render on page load
  renderTasks();
});
