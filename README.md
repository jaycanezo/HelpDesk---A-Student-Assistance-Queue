# Student Help Desk

A Vite + React app for managing student assistance requests during lab sessions. Students can submit a concern with a priority, while the queue can be filtered, resolved, or cleared. Requests and statuses persist in this browser on this device; there is no cross-device sync or instructor authentication.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local URL after the development server starts.

## Build

```sh
npm run build
npm run preview
```

The interface is composed from `src/components/Header.jsx`, `RequestForm.jsx`, `QueueSummary.jsx`, `RequestList.jsx`, and `RequestCard.jsx`. `src/App.jsx` owns queue state, while `src/queue.js` validates and orders request data. The shared light/dark theme is provided through `src/context/ThemeContext.jsx`.