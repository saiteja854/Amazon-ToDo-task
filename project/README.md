# Todo App - Full Stack Application

A full-stack todo application built with Node.js, Express.js, React.js, Redux Toolkit, and TypeScript. This application allows users to manage tasks across multiple categories with features like filtering, sorting, and CRUD operations.

## Features

### User Stories Implemented

✅ **Create Todo Items**: Create new todo items with title, description, and due date  
✅ **Category Assignment**: Assign each todo item to a category  
✅ **Grouped View**: View all todo items grouped by their categories  
✅ **Complete/Incomplete**: Mark todo items as complete or incomplete  
✅ **Edit Todos**: Edit the details of existing todo items  
✅ **Delete Todos**: Delete todo items  
✅ **Create Categories**: Create new categories for organizing todo items  
✅ **Filter Todos**: Filter todo items by completion status (all, active, completed)  
✅ **Sort Todos**: Sort todo items by due date or creation date  

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **In-memory Database** - Simple data storage for demo purposes

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern CSS features

## Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express server entry point
│   │   ├── database.ts       # In-memory database
│   │   ├── types/
│   │   │   └── index.ts      # TypeScript type definitions
│   │   ├── routes/
│   │   │   ├── todos.ts      # Todo API routes
│   │   │   └── categories.ts # Category API routes
│   │   └── middleware/
│   │       └── validation.ts # Input validation middleware
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   │   ├── TodoList.tsx
    │   │   ├── TodoItem.tsx
    │   │   ├── TodoForm.tsx
    │   │   ├── CategoryList.tsx
    │   │   ├── CategoryForm.tsx
    │   │   └── FilterBar.tsx
    │   ├── store/            # Redux store and slices
    │   │   ├── store.ts
    │   │   ├── todoSlice.ts
    │   │   ├── categorySlice.ts
    │   │   └── hooks.ts
    │   ├── services/
    │   │   └── api.ts        # API service functions
    │   ├── types/
    │   │   └── index.ts      # TypeScript type definitions
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── index.html
```

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:3001`

   Alternatively, you can build and run the production version:
   ```bash
   npm run build
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend application will run on `http://localhost:3000`

   To build for production:
   ```bash
   npm run build
   npm run preview
   ```

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos (supports `?status=active|completed` and `?sortBy=dueDate|createdAt`)
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Health Check

- `GET /api/health` - Check API health status

## Usage

1. **Start both servers** (backend and frontend) as described above
2. **Create categories** using the category form in the sidebar
3. **Create todos** by filling out the todo form with title, description, due date, and category
4. **View todos** grouped by category in the main content area
5. **Filter todos** using the filter buttons (All, Active, Completed)
6. **Sort todos** using the sort dropdown (Due Date, Creation Date)
7. **Edit todos** by clicking the "Edit" button on any todo item
8. **Mark todos as complete** by checking the checkbox
9. **Delete todos** by clicking the "Delete" button

## Code Quality Features

- ✅ **TypeScript** - Full type safety across frontend and backend
- ✅ **Error Handling** - Comprehensive error handling and validation
- ✅ **Input Validation** - Server-side validation for all inputs
- ✅ **Responsive Design** - Mobile-friendly UI with responsive layouts
- ✅ **Redux Toolkit** - Modern Redux patterns with async thunks
- ✅ **RESTful API** - Clean REST API design
- ✅ **Component Architecture** - Reusable, well-organized components

## Additional Features

- **Overdue Indicators** - Visual indicators for overdue todos
- **Category Colors** - Customizable colors for categories
- **Real-time Updates** - State updates immediately reflect changes
- **Loading States** - Loading indicators during API calls
- **Error Messages** - User-friendly error messages

## Development Notes

- The backend uses an in-memory database, so data will be lost on server restart
- CORS is enabled for development
- The frontend proxies API requests through Vite's dev server
- All dates are stored and handled in ISO format

## GitHub Repository

To set up this project from GitHub:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Follow the setup instructions** above for both backend and frontend.

3. **Create a new repository** (if starting fresh):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Todo App full-stack application"
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

## Testing the Application

### Manual Testing Checklist

- ✅ Create a new category
- ✅ Create a new todo with all required fields
- ✅ View todos grouped by category
- ✅ Toggle todo completion status
- ✅ Edit todo details (title, description, due date)
- ✅ Delete a todo
- ✅ Edit category name and color
- ✅ Delete a category (should also delete associated todos)
- ✅ Filter todos by status (All, Active, Completed)
- ✅ Sort todos by due date
- ✅ Sort todos by creation date
- ✅ Verify responsive design on mobile devices
- ✅ Test error handling (invalid inputs, network errors)

## Troubleshooting

### Backend Issues

- **Port already in use**: Change the PORT in `backend/src/index.ts` or set `PORT` environment variable
- **TypeScript errors**: Run `npm install` in the backend directory
- **Module not found**: Ensure all dependencies are installed with `npm install`

### Frontend Issues

- **API connection errors**: Ensure the backend server is running on port 3001
- **Build errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- **CORS errors**: Backend CORS is configured for development. For production, update CORS settings

## License

This project is created for assessment purposes.

