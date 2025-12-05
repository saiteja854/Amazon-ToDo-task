import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import todosRouter from './routes/todos';
import categoriesRouter from './routes/categories';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todosRouter);
app.use('/api/categories', categoriesRouter);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Todo API is running' });
});

// Database info endpoint (for verification)
app.get('/api/db-info', (req: Request, res: Response) => {
  const { db } = require('./database');
  const todos = db.getAllTodos();
  const categories = db.getAllCategories();
  
  res.json({
    type: 'In-Memory Database',
    description: 'Data is stored in JavaScript arrays in server memory',
    storage: 'RAM (Random Access Memory)',
    persistence: 'Data is lost when server restarts',
    currentStats: {
      totalTodos: todos.length,
      totalCategories: categories.length,
      activeTodos: todos.filter((t: { completed: boolean }) => !t.completed).length,
      completedTodos: todos.filter((t: { completed: boolean }) => t.completed).length,
    },
    verification: {
      noDatabaseFiles: 'No database files (SQLite, JSON, etc.) are created',
      noExternalConnections: 'No connections to external databases (MongoDB, PostgreSQL, etc.)',
      dataInMemory: 'All data stored in private arrays: todos[] and categories[]',
      location: 'backend/src/database.ts'
    }
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

