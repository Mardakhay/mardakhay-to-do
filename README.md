# Mardakhay To-Do

A clean, Notion-inspired task manager built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just open `index.html` and start managing your tasks.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Add tasks** | Type a task name, pick a priority, and click **Add** (or press `Enter`). |
| **Priority levels** | Three color-coded tiers — *High*, *Medium*, and *Low*. |
| **Toggle completion** | Check / uncheck a task to mark it done. Completed tasks are dimmed with a strikethrough. |
| **Delete tasks** | Hover a task row to reveal the trash icon. |
| **Filter tasks** | Switch between *All*, *High Priority*, and *Completed* views. |
| **Live search** | Instantly filters the list as you type in the search box. |
| **Clear completed** | One-click bulk removal of finished tasks. |
| **Task stats** | Footer shows the total task count and the number of high-priority items. |
| **Responsive layout** | Adapts gracefully to screens narrower than 520 px. |
| **Slide-in animation** | New tasks animate into view for polished UX. |

---

## 📁 File Structure

```
mardakhay to-do!/
├── index.html    ← Page layout and semantic HTML structure
├── styles.css    ← Design tokens, component styles, responsive rules
├── app.js        ← Application logic (IIFE, state, rendering, events)
└── README.md     ← This documentation
```

---

## 🏗️ Architecture Overview

The app follows a **single-page, no-framework** architecture:

```
index.html ──loads──▶ styles.css   (visual layer)
     │
     └──loads──▶ app.js        (logic layer, IIFE)
                   │
                   ├── State          – in-memory task array
                   ├── DOM References – cached element handles
                   ├── Rendering      – builds / refreshes the UI
                   ├── CRUD           – add, delete, toggle, clear
                   ├── Stats          – updates footer counters
                   └── Events         – wires up user interactions
```

All JavaScript is wrapped in an **Immediately Invoked Function Expression (IIFE)** to prevent global namespace pollution. The UI re-renders on every state change via a single `renderTasks()` call.

---

## 📦 Data Model

Each task is a plain JavaScript object:

```js
{
    id: Number,        // Unique identifier (Date.now() at creation)
    text: String,      // Task description
    priority: String,  // "low" | "medium" | "high"
    completed: Boolean // Toggle state
}
```

Tasks are stored in an in-memory array — **there is no persistence** (refreshing the page resets to the default sample tasks).

---

## ⚙️ Core Functions — `app.js`

### Rendering

| Function | Purpose |
|---|---|
| `getVisibleTasks()` | Filters the task array by current filter (`all`, `high`, `completed`) **and** search query. Returns a new array. |
| `createTaskElement(task)` | Builds a single task DOM node: checkbox, priority badge, text, delete button. |
| `renderTasks()` | Clears the list container and re-renders all visible tasks. Shows an empty-state message when the list is empty. |

### CRUD Operations

| Function | Purpose |
|---|---|
| `addTask()` | Reads the input field and priority selector, pushes a new task object, and re-renders. |
| `deleteTask(id)` | Removes the task matching the given `id` via `Array.filter`. |
| `toggleTask(id)` | Flips the `completed` flag for the matching task using `Object.assign`. |
| `clearCompleted()` | Removes all tasks where `completed === true`. |

### Stats & Events

| Function | Purpose |
|---|---|
| `updateStats()` | Updates the **Total** and **High** counters in the footer. |
| `initEventListeners()` | Attaches click, keypress, and input listeners for add, filter, search, and clear actions. |
| `init()` | Entry point — calls `initEventListeners()` then `renderTasks()`. |

---

## 🎨 Design System — `styles.css`

### CSS Custom Properties (Design Tokens)

```
--bg-start / --bg-end       Background gradient endpoints
--surface / --surface-hover  Card and hover colors
--border / --border-light    Border shades
--text-primary / secondary   Typography hierarchy
--accent / --accent-hover    Interactive element highlight (blue)
--priority-high-*            Red badge palette
--priority-medium-*          Amber badge palette
--priority-low-*             Green badge palette
--radius-sm / md / lg        Border-radius scale (6 / 10 / 16 px)
--shadow                     Card elevation
--transition                 Global transition duration (150 ms ease)
```

### Key Styling Decisions

- **Notion-inspired palette** — warm neutrals (#f7f5f2 → #eae6e0) with a blue accent (#2eaadc).
- **Inter font** loaded from Google Fonts with system-font fallbacks.
- **Custom checkbox** built with `appearance: none` and a CSS `::after` checkmark.
- **Delete button reveal** — opacity transitions from `0` to `1` on parent hover.
- **Slide-in keyframe** — tasks fade + translate up 6 px on mount.
- **Responsive breakpoint** at **520 px**: stacks the input row, expands the search box to full width, and reorders the filter section vertically.

---

## 🧩 HTML Semantics — `index.html`

- `<section>` elements with `aria-label` for the input area and filter bar.
- `<main>` wraps the task list for screen-reader landmark navigation.
- `<footer>` contains stats and the clear-completed action.
- All interactive elements have descriptive `aria-label` attributes.
- Meta viewport and description tags are set for mobile and SEO.

---

## 🚀 Getting Started

1. **Clone or download** the project folder.
2. **Open** `index.html` in any modern browser — no server required.
3. Start adding tasks!

> **Tip:** Because state lives only in memory, refreshing the page will reset to the three sample tasks.

---

## 🛠️ Possible Enhancements

- **LocalStorage persistence** — save and load tasks across page refreshes.
- **Drag-and-drop reordering** — let users rearrange task priority visually.
- **Due dates** — add a date picker and sort/filter by deadline.
- **Dark mode** — toggle between light and dark themes using CSS custom properties.
- **Edit in place** — double-click a task to rename it inline.

---

## 📄 License

This project is for personal / educational use by **Mardakhay**.
