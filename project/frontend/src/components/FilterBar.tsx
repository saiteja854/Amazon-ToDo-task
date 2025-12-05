import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter, setSortBy, fetchTodos, fetchAllTodos } from '../store/todoSlice';
import { FilterStatus, SortBy } from '../types';
import './FilterBar.css';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { filter, sortBy, allTodos } = useAppSelector((state) => state.todos);

  // Fetch all todos for count calculations
  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  // Calculate counts
  const allCount = allTodos.length;
  const activeCount = allTodos.filter(t => !t.completed).length;
  const completedCount = allTodos.filter(t => t.completed).length;

  const handleFilterChange = (newFilter: FilterStatus) => {
    dispatch(setFilter(newFilter));
    dispatch(fetchTodos());
  };

  const handleSortChange = (newSort: SortBy) => {
    dispatch(setSortBy(newSort));
    dispatch(fetchTodos());
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Filter:</label>
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => handleFilterChange('all')}
          >
            All
            <span className="filter-count">{allCount}</span>
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => handleFilterChange('active')}
          >
            Active
            <span className="filter-count">{activeCount}</span>
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
            <span className="filter-count">{completedCount}</span>
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortBy)}
          className="sort-select"
        >
          <option value="none">None</option>
          <option value="dueDate">Due Date</option>
          <option value="createdAt">Creation Date</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

