import { Todo, Category } from '../types';
import TodoItem from './TodoItem';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  categories: Category[];
}

const TodoList = ({ todos, categories }: TodoListProps) => {
  // Filter out todos with invalid category IDs (todos whose category was deleted)
  const validTodos = todos.filter(todo => {
    // Only show todos that have a valid category
    return categories.some(cat => cat.id === todo.categoryId);
  });

  // Group todos by category
  const todosByCategory = validTodos.reduce((acc, todo) => {
    const category = categories.find(c => c.id === todo.categoryId);
    // At this point, category should always exist since we filtered above
    if (!category) return acc;
    
    const categoryName = category.name;
    
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  if (validTodos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {Object.entries(todosByCategory).map(([categoryName, categoryTodos]) => {
        const category = categories.find(c => c.name === categoryName);
        return (
          <div key={categoryName} className="category-group">
            <h3 
              className="category-header"
              style={{ 
                borderLeftColor: category?.color || '#667eea',
                color: category?.color || '#667eea'
              }}
            >
              {categoryName}
              <span className="todo-count">({categoryTodos.length})</span>
            </h3>
            <div className="todos-container">
              {categoryTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} category={category} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;

