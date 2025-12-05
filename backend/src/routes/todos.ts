import { Router, Request, Response } from 'express';
import { db } from '../database';
import { validateCreateTodo, validateUpdateTodo } from '../middleware/validation';

const router = Router();

// Get all todos with optional filtering and sorting
router.get('/', (req: Request, res: Response) => {
  try {
    let todos = db.getAllTodos();
    const { status, sortBy } = req.query;

    // Filter by status
    if (status === 'active') {
      todos = todos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      todos = todos.filter(todo => todo.completed);
    }

    // Sort todos
    if (sortBy === 'dueDate') {
      todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (sortBy === 'createdAt') {
      todos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Get todo by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const todo = db.getTodoById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// Create new todo
router.post('/', validateCreateTodo, (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, categoryId } = req.body;

    // Check if category exists
    const category = db.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const todo = db.createTodo({ title, description, dueDate, categoryId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update todo
router.put('/:id', validateUpdateTodo, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If categoryId is being updated, verify it exists
    if (updates.categoryId) {
      const category = db.getCategoryById(updates.categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
    }

    const updatedTodo = db.updateTodo(id, updates);
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete todo
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteTodo(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;

