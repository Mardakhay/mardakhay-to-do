(function () {
    'use strict';

    let tasks = [
        { id: 1, text: 'Learn JavaScript Functions', priority: 'high', completed: true },
        { id: 2, text: 'Learn Array Methods', priority: 'high', completed: false },
        { id: 3, text: 'Learn DOM Manipulation', priority: 'medium', completed: false },
    ];

    let currentFilter = 'all';
    let searchQuery = '';

    const dom = {
        taskList: document.getElementById('taskList'),
        taskInput: document.getElementById('taskInput'),
        prioritySelect: document.getElementById('prioritySelect'),
        addBtn: document.getElementById('addBtn'),
        searchInput: document.getElementById('searchInput'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        totalCount: document.getElementById('totalCount'),
        highCount: document.getElementById('highCount'),
        clearCompletedBtn: document.getElementById('clearCompleted'),
    };


    function getVisibleTasks() {
        return tasks
            .filter(function (task) {
                if (currentFilter === 'high') return task.priority === 'high';
                if (currentFilter === 'completed') return task.completed;
                return true;
            })
            .filter(function (task) {
                if (!searchQuery) return true;
                return task.text.toLowerCase().includes(searchQuery.toLowerCase());
            });
    }

    function createTaskElement(task) {
        var item = document.createElement('div');
        item.className = 'task-item' + (task.completed ? ' completed' : '');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label', 'Toggle ' + task.text);
        checkbox.addEventListener('change', function () {
            toggleTask(task.id);
        });

        var badge = document.createElement('span');
        badge.className = 'priority-badge priority-' + task.priority;
        badge.textContent = task.priority;

        var text = document.createElement('span');
        text.className = 'task-text';
        text.textContent = task.text;

        var delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.setAttribute('aria-label', 'Delete ' + task.text);
        delBtn.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 6h18"></path>' +
            '<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>' +
            '<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>' +
            '</svg>';
        delBtn.addEventListener('click', function () {
            deleteTask(task.id);
        });

        item.appendChild(checkbox);
        item.appendChild(badge);
        item.appendChild(text);
        item.appendChild(delBtn);

        return item;
    }

    function renderTasks() {
        var visible = getVisibleTasks();
        dom.taskList.innerHTML = '';

        if (visible.length === 0) {
            var empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = currentFilter === 'all' && !searchQuery
                ? 'No tasks yet — add one above!'
                : 'No matching tasks.';
            dom.taskList.appendChild(empty);
        } else {
            visible.forEach(function (task) {
                dom.taskList.appendChild(createTaskElement(task));
            });
        }

        updateStats();
    }

    function addTask() {
        var text = dom.taskInput.value.trim();
        if (!text) return;

        tasks.push({
            id: Date.now(),
            text: text,
            priority: dom.prioritySelect.value,
            completed: false,
        });

        dom.taskInput.value = '';
        dom.taskInput.focus();
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(function (t) { return t.id !== id; });
        renderTasks();
    }

    function toggleTask(id) {
        tasks = tasks.map(function (t) {
            if (t.id === id) return Object.assign({}, t, { completed: !t.completed });
            return t;
        });
        renderTasks();
    }

    function clearCompleted() {
        tasks = tasks.filter(function (t) { return !t.completed; });
        renderTasks();
    }

    function updateStats() {
        dom.totalCount.textContent = tasks.length;
        dom.highCount.textContent = tasks.filter(function (t) { return t.priority === 'high'; }).length;
    }

    function initEventListeners() {
        dom.addBtn.addEventListener('click', addTask);
        dom.taskInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') addTask();
        });

        dom.searchInput.addEventListener('input', function (e) {
            searchQuery = e.target.value;
            renderTasks();
        });

        dom.filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                dom.filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTasks();
            });
        });

        dom.clearCompletedBtn.addEventListener('click', clearCompleted);
    }

    function init() {
        initEventListeners();
        renderTasks();
    }

    init();
})();
