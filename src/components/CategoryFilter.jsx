import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ breweries, selectedCategory, onCategoryChange }) {
  // Get unique brewery types from the data
  const breweryTypes = breweries.reduce((acc, brewery) => {
    acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
    return acc;
  }, {});

  // Sort categories by count (most popular first)
  const sortedCategories = Object.entries(breweryTypes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8); // Show top 8 categories

  const formatCategoryName = (category) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'micro': '🍺',
      'nano': '🍻',
      'regional': '🏭',
      'brewpub': '🍽️',
      'large': '🏪',
      'planning': '🚧',
      'contract': '🤝',
      'proprietor': '👨‍💼',
      'closed': '🔒',
      'bar': '🍻',
      'taproom': '🚰',
      'other': '🏢'
    };
    
    return iconMap[category] || iconMap['other'];
  };

  return (
    <div className="category-filter">
      <div className="filter-header">
        <span className="filter-icon">🎯</span>
        <span className="filter-label">Filter by Type</span>
      </div>
      
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        <option value="all">All Types ({breweries.length})</option>
        {sortedCategories.map(([category, count]) => (
          <option key={category} value={category}>
            {getCategoryIcon(category)} {formatCategoryName(category)} ({count})
          </option>
        ))}
      </select>
      
      {selectedCategory !== 'all' && (
        <div className="active-filter">
          <span className="active-filter-text">
            {getCategoryIcon(selectedCategory)} {formatCategoryName(selectedCategory)}
          </span>
          <button
            className="remove-filter"
            onClick={() => onCategoryChange('all')}
            aria-label="Remove filter"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryFilter; 