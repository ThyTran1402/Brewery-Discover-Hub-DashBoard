import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ events, selectedCategory, onCategoryChange }) {
  // Get unique event types from the data
  const eventTypes = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {});

  // Sort categories by count (most popular first)
  const sortedCategories = Object.entries(eventTypes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8); // Show top 8 categories

  const formatCategoryName = (category) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'concert': '🎵',
      'sports': '⚽',
      'theater': '🎭',
      'comedy': '😂',
      'festival': '🎪',
      'family': '👨‍👩‍👧‍👦',
      'conference': '💼',
      'classical': '🎼',
      'dance': '💃',
      'other': '🎯'
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
        <option value="all">All Categories ({events.length})</option>
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