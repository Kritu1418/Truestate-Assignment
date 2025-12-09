1. Overview

This project is a Retail Sales Management System built for the TruEstate SDE Intern assignment.
The system handles a large sales dataset and provides search, filters, sorting, and pagination on top of a clean and simple UI.
The backend manages data efficiently, and the frontend displays results in an organized dashboard-style layout.

2. Tech Stack

Frontend: React (Vite), Vanilla CSS

Backend: Node.js, Express.js

Database: SQLite (local file-based)

Other Tools: Axios, Nodemon, CSV Parser

3. Search Implementation

Search supports:

Customer Name

Phone Number
Search is case-insensitive and works together with filters + sorting.
The backend builds a dynamic SQL query using LIKE to match text across both fields.

4. Filter Implementation

Filters supported:

Region

Gender

Category

Tags (multi-tag OR matching)

Payment Method

Age Range

Date Range

All filters work independently or in combination.
Each filter updates query params, and the backend applies them in the SQL WHERE clause.

5. Sorting Implementation

Three sorting options:

Date (Newest First)

Quantity (High to Low)

Customer Name (A–Z)

Sorting is handled on the backend and always respects the active search + filters.

6. Pagination Implementation

Page size: 10 items per page

Supports page switching (Next/Previous)

Pagination preserves search, filters, and sorting

Backend calculates total pages + returns paginated results

7. Setup Instructions
Backend Setup
cd backend
npm install
npm run dev


Import script loads the CSV into SQLite (import/loadData.js).

Backend runs by default on http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


Opens React app on http://localhost:5173
 (or nearest available port)