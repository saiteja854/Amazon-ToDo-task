import { Router, Request, Response } from 'express';
import { db } from '../database';
import { validateCreateCategory } from '../middleware/validation';

const router = Router();

// Get all categories
router.get('/', (req: Request, res: Response) => {
  try {
    const categories = db.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get category by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const category = db.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Create new category
router.post('/', validateCreateCategory, (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;
    const category = db.createCategory({ name, color });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update category
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.name !== undefined && (typeof updates.name !== 'string' || updates.name.trim().length === 0)) {
      return res.status(400).json({ error: 'Category name must be a non-empty string' });
    }

    if (updates.name !== undefined && updates.name.trim().length > 50) {
      return res.status(400).json({ error: 'Category name must be 50 characters or less' });
    }

    const updatedCategory = db.updateCategory(id, updates);
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete category
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;

