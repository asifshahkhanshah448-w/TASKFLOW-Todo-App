# TASKFLOW ⚡

> **Organize Your Day. Own Your Goals.**  
> *Web Development Internship — Task 2*

---

## 📌 Project Overview

**TaskFlow** is a modern, responsive, high-performance To-Do List Web Application built strictly using **HTML5, CSS3, and Vanilla JavaScript**. It adheres strictly to pure DOM manipulation and client-side programming practices without dependencies on React, Next.js, backend services, or paid third-party libraries.

The application features a sleek dark cyberpunk/fintech aesthetic:
- **Deep Black Background**: `#080A0A`
- **Neon Green Accent**: `#B6FF3B`
- **Dark Charcoal Cards**: `#121817` with subtle borders & glowing highlights
- **Responsive Layout**: Fluid design tailored for mobile, tablet, and desktop

---

## ✨ Features & Functional Requirements

### 1. Add Task
- Clean input field with intuitive placeholder.
- **Add Task** button with glowing hover animation.
- Instant DOM insertion without page reloads.
- Validation prevents empty or whitespace-only tasks with helpful visual feedback (shake effect & error color).
- Keyboard support: Pressing <kbd>Enter</kbd> submits the task immediately.
- Optional priority tags (Low, Medium, High).

### 2. Complete Task
- Custom accessible checkbox button on each item.
- Clicking toggles the task between active and completed states.
- Completed tasks display with a smooth line-through effect and dimmed opacity.
- Can be toggled back to incomplete at any time.

### 3. Delete Task
- Instant delete button (trash icon) for each task.
- Smooth CSS exit animation before item removal from DOM.

### 4. Interactive Dashboard
- **Total Tasks Counter**: Live count of all recorded tasks.
- **Completed Tasks Counter**: Real-time tally of completed items.
- **Remaining Tasks Counter**: Real-time count of pending items.
- **Live Progress Bar**: Visual percentage indicator tracking overall completion rate.
- **Empty State**: Clear, friendly message and icon when no tasks exist.

### 5. Advanced Productivity Tools
- **Filter Tabs**: View *All*, *Active*, or *Completed* tasks.
- **Live Search**: Instant keyword filtering across task descriptions.
- **Clear Completed**: Conveniently purge finished tasks in a single click.
- **LocalStorage Persistence**: Saves your tasks automatically so your progress is preserved across page refreshes.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<form>`, `<ul>`, `<li>`, `<button>`).
- **CSS3**: Custom CSS variables, Flexbox, CSS Grid, smooth transitions, keyframe animations, and media queries.
- **Vanilla JavaScript (ES6+)**:
  - Pure DOM manipulation (`document.getElementById`, `querySelector`, `innerHTML`).
  - Standard event listeners (`DOMContentLoaded`, `submit`, `input`, `keydown`).
  - **Event Delegation** on the task container to handle checkboxes and deletion efficiently.
  - Strict use of `const` and `let` (no `var`).
  - Zero framework dependencies.

---

## 📂 Project Structure

```text
├── index.html        # Main HTML structure and semantic markup
├── style.css         # Styling, dark charcoal theme, neon green accent, responsive design
├── script.js         # Vanilla JavaScript application logic and DOM handling
└── README.md         # Documentation, features overview, and execution instructions
```

---

## 🚀 How to Run the Application

### Option 1: Direct Browser Launch
1. Clone or download this project folder.
2. Double-click `index.html` or right-click and choose **Open with > Chrome / Firefox / Safari / Edge**.
3. The application will run instantly with all styles and scripts functioning offline.

### Option 2: Live Server (VS Code Extension)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The app will open at `http://127.0.0.1:5500`.

---

## 🧪 Testing Checklist

| Test Case | Expected Result | Status |
| :--- | :--- | :---: |
| **Add valid task** | Appends task instantly without page reload; updates counters | ✅ Passed |
| **Submit empty task** | Input shakes, shows red highlight, prevents task creation | ✅ Passed |
| **Toggle complete** | Checkbox activates, text strikes through, completed counter increments | ✅ Passed |
| **Toggle back to active** | Checkmark unchecks, line-through removed, remaining counter increments | ✅ Passed |
| **Delete task** | Task animates out, removed from DOM, counters decrement | ✅ Passed |
| **Filter by status** | "Active" and "Completed" tabs filter the list accurately | ✅ Passed |
| **Search tasks** | Input filters displayed items in real time | ✅ Passed |
| **Refresh page** | LocalStorage reloads all tasks and current state | ✅ Passed |
| **Mobile responsiveness** | Input, cards, and buttons adapt fluidly on screens < 640px | ✅ Passed |

---

## 👨‍💻 Author
- **Web Development Internship — Task 2**
- Project Name: **TASKFLOW**
- Tagline: *Organize Your Day. Own Your Goals.*
