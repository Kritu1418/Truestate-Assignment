Architecture Document
1. Backend Architecture

The backend is built using Node.js and Express.
It exposes a single API endpoint for the sales data, which supports search, multiple filters, sorting, and pagination.
The data is stored inside a local SQLite database, created from the provided CSV file using a separate import script.

Key Backend Modules

controllers/ – contains the main logic for handling the sales API.

routes/ – defines all backend routes and maps them to controllers.

utils/db.js – initializes and exports the SQLite connection.

import/ – includes the script used to load the CSV data into the database.

How the backend works

Client sends query parameters (search, filters, sort, page).

The controller dynamically builds an SQL query:

Adds WHERE conditions based on filters

Adds ORDER BY for sorting

Adds LIMIT/OFFSET for pagination

The result is returned as JSON containing:

results

total

page

totalPages

The backend remains simple, fast, and stable because SQLite executes queries locally without any external dependency.

2. Frontend Architecture

The frontend is built using React (Vite) with simple CSS for styling.
The UI follows a dashboard layout similar to the given Figma structure.

Key Frontend Modules

components/

SearchBar

FilterBar

SortDropdown

SalesTable

Pagination

hooks/useSales.js – Manages query params + API calls and returns formatted data.

styles/ – Contains stylesheet used across the UI.

App.jsx – Combines all components and forms the full layout.

How the frontend works

useSales hook keeps track of:

search text

filter values

sorting

current page

Whenever a user changes any filter or search input:

The hook updates query params

Sends a new API request

Displays loading state

The data is passed into:

SalesTable → displays rows

Pagination → controls page switching

Summary cards → shows totals

This separates UI from data logic and keeps the code easy to maintain.

3. Data Flow (End-to-End)
[User Action]
      ↓
Frontend Components (SearchBar / FilterBar / SortDropdown / Pagination)
      ↓
useSales Hook builds query parameters
      ↓
API Request → GET /api/sales?search=...&region=...&page=...
      ↓
Backend Controller (getSales)
      ↓
SQLite Database — filtered + sorted query executed
      ↓
Backend Responds with JSON
      ↓
Frontend Updates UI with new results


This structure ensures every change on the UI immediately syncs with backend data.

4. Folder Structure
  root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   ├── import/
│   ├── sales.db
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── docs/
│   └── architecture.md
│
└── README.md

5. Module Responsibilities
Backend

index.js → Starts server, mounts routes.

sale.routes.js → Defines /api/sales and /api/tags.

sales.controller.js → All logic for search, filters, sorting, pagination.

db.js → Database connection.

loadData.js → One-time CSV import.

Frontend

SearchBar → Handles user text search.

FilterBar → Region, gender, category, tags, age, payment filters.

SortDropdown → Sorts results by date, quantity, name.

SalesTable → Renders transaction rows.

Pagination → Handles page switching.

useSales → Central state + API communication.

styles.css → Simple custom styling for layout.

Conclusion

This architecture keeps the project:

Clean

Modular

Maintainable

Close to real-world production patterns

Every part of the app (search, filters, sorting, pagination) works together smoothly with predictable data flow.