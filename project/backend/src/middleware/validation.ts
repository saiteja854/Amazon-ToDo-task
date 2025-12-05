import { Request, Response, NextFunction } from 'express';
import { CreateTodoDto, UpdateTodoDto, CreateCategoryDto } from '../types';

export const validateCreateTodo = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, dueDate, categoryId }: CreateTodoDto = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    return;
  }

  if (title.trim().length > 100) {
    res.status(400).json({ error: 'Title must be 100 characters or less' });
    return;
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    res.status(400).json({ error: 'Description is required and must be a non-empty string' });
    return;
  }

  if (description.trim().length > 500) {
    res.status(400).json({ error: 'Description must be 500 characters or less' });
    return;
  }

  if (!dueDate || typeof dueDate !== 'string') {
    res.status(400).json({ error: 'Due date is required and must be a string' });
    return;
  }

  if (isNaN(Date.parse(dueDate))) {
    res.status(400).json({ error: 'Due date must be a valid date string' });
    return;
  }

  if (!categoryId || typeof categoryId !== 'string') {
    res.status(400).json({ error: 'Category ID is required and must be a string' });
    return;
  }

  next();
};

export const validateUpdateTodo = (req: Request, res: Response, next: NextFunction): void => {
  const updates: UpdateTodoDto = req.body;

  if (updates.title !== undefined && (typeof updates.title !== 'string' || updates.title.trim().length === 0)) {
    res.status(400).json({ error: 'Title must be a non-empty string' });
    return;
  }

  if (updates.title !== undefined && updates.title.trim().length > 100) {
    res.status(400).json({ error: 'Title must be 100 characters or less' });
    return;
  }

  if (updates.description !== undefined && (typeof updates.description !== 'string' || updates.description.trim().length === 0)) {
    res.status(400).json({ error: 'Description must be a non-empty string' });
    return;
  }

  if (updates.description !== undefined && updates.description.trim().length > 500) {
    res.status(400).json({ error: 'Description must be 500 characters or less' });
    return;
  }

  if (updates.dueDate !== undefined && (typeof updates.dueDate !== 'string' || isNaN(Date.parse(updates.dueDate)))) {
    res.status(400).json({ error: 'Due date must be a valid date string' });
    return;
  }

  if (updates.completed !== undefined && typeof updates.completed !== 'boolean') {
    res.status(400).json({ error: 'Completed must be a boolean' });
    return;
  }

  next();
};

export const validateCreateCategory = (req: Request, res: Response, next: NextFunction): void => {
  const { name }: CreateCategoryDto = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({ error: 'Category name is required and must be a non-empty string' });
    return;
  }

  if (name.trim().length > 50) {
    res.status(400).json({ error: 'Category name must be 50 characters or less' });
    return;
  }

  next();
};

