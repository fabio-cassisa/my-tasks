# my tasks

a task manager with priorities, drag-to-reorder, persistent storage, and a manual dark/light theme — built to feel like a real tool, not a tutorial exercise.

## context

originally built as a pair project during the technigo bootcamp with [carl öberg](https://github.com/Calleobe). the v1 used redux toolkit and styled-components but had a broken build, default browser checkboxes, and a flat grey design.

v2.0 is a full rewrite: localStorage persistence so nothing is lost on refresh, three priority levels with colour-coded badges, drag-to-reorder via dnd-kit, manual theme toggle, keyboard shortcuts, and subtle entry animations. the redux store, component architecture, and CSS token system were all rebuilt from scratch.

## screenshots

| dark | light |
|------|-------|
| ![dark](docs/screenshot-dark.png) | ![light](docs/screenshot-light.png) |

## stack

`react 18` · `redux toolkit 2` · `@dnd-kit/sortable` · `styled-components 6` · `date-fns` · `vite 6` · `vercel`

## features

- **localStorage persistence** — tasks survive page reload via custom redux middleware
- **priority levels** — low / med / high with colour-coded badges; cycle priority inline when adding
- **drag-to-reorder** — touch and pointer support via @dnd-kit with vertical axis lock
- **theme toggle** — manual dark/light switch, persisted to localStorage, defaults to system preference
- **clear completed** — remove all done tasks in one click
- **complete all** — mark everything done (disables when already complete)
- **keyboard shortcuts** — `⌘K` focus input, `⌘⇧L` toggle theme
- **dynamic tab title** — shows remaining task count: `(3) my tasks`
- **timestamps** — each task shows when it was created
- **custom checkboxes** — styled replacements with teal fill + checkmark
- **entry animations** — tasks slide in on creation
- **empty state** — starts clean, no demo data

## structure

```
src/
├── components/
│   ├── AddTaskForm.jsx   # input + priority picker + add button
│   ├── TaskList.jsx      # dnd-kit sortable list + status bar + actions
│   ├── TaskItem.jsx      # draggable card with checkbox, priority, delete
│   ├── Header.jsx        # title + theme toggle
│   └── Footer.jsx        # credits
├── hooks/
│   ├── useTheme.js       # dark/light toggle with localStorage
│   └── useKeyboardShortcuts.js
├── reducers/
│   └── tasks.js          # redux slice — add, toggle, delete, reorder, clearCompleted
├── store.js              # configureStore + localStorage middleware
├── App.jsx               # provider shell, tab title, context
├── index.css             # theme tokens, animations, reset
└── main.jsx              # entry point
```

## setup

```bash
npm install
npm run dev
```

## status

🟢 live — [project-todo-list-beta.vercel.app](https://project-todo-list-beta.vercel.app)

---

<sub>built by [fabio cassisa](https://github.com/fabio-cassisa) · paired with [carl öberg](https://github.com/Calleobe)</sub>
